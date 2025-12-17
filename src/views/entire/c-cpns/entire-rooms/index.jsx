import RoomItem from "@/components/room-item";
import React, { memo, useMemo } from "react";
import { Empty } from "antd";
import { useI18n } from "@/i18n";
import { RoomsWrapper } from "./style";

const EntireRooms = memo(({ rooms = [], totalCount = 0, loading = false, keyword = "" }) => {
  const { t } = useI18n();
  const title = useMemo(() => {
    if (!keyword) return `${totalCount} ${t("entire.staysSuffix")}`;
    return `${t("entire.searchResultFor")} "${keyword}" · ${totalCount} ${t("entire.staysSuffix")}`;
  }, [keyword, t, totalCount]);

  return (
    <RoomsWrapper>
      <h1 className="title">{title}</h1>
      {rooms.length > 0 ? (
        <div className="list">
          {rooms.map((item) => (
            <RoomItem itemData={item} itemWidth="20%" key={item._id} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Empty description={t("entire.empty")} />
        </div>
      )}

      {loading && <div className="cover"></div>}
    </RoomsWrapper>
  );
});

export default EntireRooms;
