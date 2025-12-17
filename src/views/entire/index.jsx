import React, { memo, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import EntireFilter from "./c-cpns/entire-filter";
import EntirePagination from "./c-cpns/entire-pagination";
import EntireRooms from "./c-cpns/entire-rooms";
import { EntireWrapper } from "./style";
import { getEntireRoomList } from "@/services/modules/entire";
import { enrichRooms } from "./filtering/enrichRooms";

function parseSearch(search) {
  const params = new URLSearchParams(search || "");
  const keyword = (params.get("keyword") || "").trim();
  return { keyword };
}

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, value]);
  return debounced;
}

const Entire = memo(() => {
  const location = useLocation();
  const { keyword } = useMemo(() => parseSearch(location.search), [location.search]);

  const [loading, setLoading] = useState(false);
  const [rawRooms, setRawRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const enriched = useMemo(() => enrichRooms(rawRooms), [rawRooms]);

  const [filters, setFilters] = useState(() => ({
    guests: null,
    freeCancel: false,
    instantBook: false,
    roomType: null,
    area: null,
    priceRange: [0, 0],
  }));

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getEntireRoomList(0, 150)
      .then((res) => {
        if (!mounted) return;
        setRawRooms(res?.list || []);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!enriched.meta.maxPrice) return;
    setFilters((prev) => {
      if (prev.priceRange?.[1]) return prev;
      return { ...prev, priceRange: [enriched.meta.minPrice, enriched.meta.maxPrice] };
    });
  }, [enriched.meta.maxPrice, enriched.meta.minPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const debouncedFilters = useDebouncedValue(filters, 2000);
  const debouncedKeyword = useDebouncedValue(keyword, 2000);

  const filteredRooms = useMemo(() => {
    const kw = debouncedKeyword.trim().toLowerCase();
    const [minPrice, maxPrice] = debouncedFilters.priceRange || [enriched.meta.minPrice, enriched.meta.maxPrice];

    return (enriched.rooms || []).filter((room) => {
      const e = room.__enriched || {};
      if (debouncedFilters.guests && e.guestCount < debouncedFilters.guests) return false;
      if (debouncedFilters.freeCancel && !e.isFreeCancel) return false;
      if (debouncedFilters.instantBook && !e.isInstantBook) return false;
      if (debouncedFilters.roomType && e.roomType !== debouncedFilters.roomType) return false;
      if (debouncedFilters.area && e.area !== debouncedFilters.area) return false;
      if (Number.isFinite(room.price) && (room.price < minPrice || room.price > maxPrice)) return false;

      if (!kw) return true;
      const text = `${room.name || ""} ${(room.verify_info?.messages || []).join(" ")} ${e.area || ""} ${
        e.roomType || ""
      } ${e.mockCity || ""}`.toLowerCase();
      return text.includes(kw);
    });
  }, [debouncedFilters, debouncedKeyword, enriched.meta.maxPrice, enriched.meta.minPrice, enriched.rooms]);

  const totalCount = filteredRooms.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const pageRooms = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredRooms.slice(start, start + pageSize);
  }, [filteredRooms, safePage]);

  return (
    <EntireWrapper>
      <EntireFilter meta={enriched.meta} filters={filters} onChange={setFilters} disabled={loading} />
      <EntireRooms rooms={pageRooms} totalCount={totalCount} loading={loading} keyword={keyword} />
      <EntirePagination
        currentPage={safePage}
        totalCount={totalCount}
        pageSize={pageSize}
        onChange={setCurrentPage}
      />
    </EntireWrapper>
  );
});

export default Entire;
