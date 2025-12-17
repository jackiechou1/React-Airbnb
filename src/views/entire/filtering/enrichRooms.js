function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function parseNumberBetween(text, startChar, endChar) {
  const start = text.indexOf(startChar);
  if (start === -1) return null;
  const rest = text.slice(start + startChar.length);
  const end = rest.indexOf(endChar);
  const target = (end === -1 ? rest : rest.slice(0, end)).trim();
  const num = Number.parseInt(target, 10);
  return Number.isFinite(num) ? num : null;
}

function parseRoomSummary(messages) {
  const second = messages?.[1] || "";
  const bedrooms = parseNumberBetween(second, "", "室");
  const bathrooms = parseNumberBetween(second, "室", "卫");
  const beds = parseNumberBetween(second, "卫", "床");
  return {
    bedrooms: bedrooms ?? null,
    bathrooms: bathrooms ?? null,
    beds: beds ?? null,
  };
}

function getRoomType(messages) {
  const first = messages?.[0];
  if (!first) return "整套房源";
  return first;
}

function getArea(lat, lng, midLat, midLng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "未知区域";
  const north = lat >= midLat;
  const east = lng >= midLng;
  if (north && east) return "东北区域";
  if (north && !east) return "西北区域";
  if (!north && east) return "东南区域";
  return "西南区域";
}

export function enrichRooms(rawRooms) {
  const rooms = rawRooms || [];
  const lats = rooms.map((r) => r.lat).filter(Number.isFinite).sort((a, b) => a - b);
  const lngs = rooms.map((r) => r.lng).filter(Number.isFinite).sort((a, b) => a - b);
  const midLat = lats.length ? lats[Math.floor(lats.length / 2)] : 0;
  const midLng = lngs.length ? lngs[Math.floor(lngs.length / 2)] : 0;

  const prices = rooms.map((r) => r.price).filter(Number.isFinite).sort((a, b) => a - b);
  const minPrice = prices.length ? prices[0] : 0;
  const maxPrice = prices.length ? prices[prices.length - 1] : 0;

  const roomTypesSet = new Set();
  const areasSet = new Set();
  const cities = ["成都", "广州", "重庆", "长沙", "杭州"];
  const citiesSet = new Set();

  const enriched = rooms.map((r) => {
    const messages = r.verify_info?.messages || [];
    const roomType = getRoomType(messages);
    const { bedrooms, bathrooms, beds } = parseRoomSummary(messages);
    const seed = hashString(String(r._id || r.id || r.name || ""));
    const guestCount = Math.min(12, Math.max(1, (beds ?? 2) * 2 + (seed % 2)));
    const isFreeCancel = seed % 3 !== 0;
    const isInstantBook = seed % 5 === 0;
    const area = getArea(r.lat, r.lng, midLat, midLng);
    const mockCity = cities[seed % cities.length];

    roomTypesSet.add(roomType);
    areasSet.add(area);
    citiesSet.add(mockCity);

    return {
      ...r,
      __enriched: {
        roomType,
        bedrooms,
        bathrooms,
        beds,
        guestCount,
        isFreeCancel,
        isInstantBook,
        area,
        mockCity,
      },
    };
  });

  return {
    rooms: enriched,
    meta: {
      minPrice,
      maxPrice,
      roomTypes: Array.from(roomTypesSet).sort(),
      areas: Array.from(areasSet).sort(),
      cities: Array.from(citiesSet).sort(),
    },
  };
}
