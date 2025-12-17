import React, { memo } from "react";
import { Button, Divider, Select, Slider, Space, Switch } from "antd";
import { useI18n } from "@/i18n";
import { FilterWrapper } from "./style";

const EntireFilter = memo(({ meta, filters, onChange, disabled }) => {
  const { t } = useI18n();
  const handleReset = () => {
    onChange({
      guests: null,
      freeCancel: false,
      instantBook: false,
      roomType: null,
      area: null,
      priceRange: [meta.minPrice, meta.maxPrice],
    });
  };

  return (
    <FilterWrapper>
      <div className="bar">
        <Space size={10} wrap>
          <div className="item">
            <div className="label">{t("filters.guests")}</div>
            <Select
              value={filters.guests}
              onChange={(v) => onChange({ ...filters, guests: v })}
              allowClear
              placeholder={t("filters.any")}
              options={[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => ({ value: n, label: `${n}+` }))}
              style={{ width: 110 }}
              disabled={disabled}
            />
          </div>

          <div className="item">
            <div className="label">{t("filters.roomType")}</div>
            <Select
              value={filters.roomType}
              onChange={(v) => onChange({ ...filters, roomType: v })}
              allowClear
              placeholder={t("filters.any")}
              options={meta.roomTypes.map((rt) => ({ value: rt, label: rt }))}
              style={{ width: 160 }}
              disabled={disabled}
            />
          </div>

          <div className="item">
            <div className="label">{t("filters.area")}</div>
            <Select
              value={filters.area}
              onChange={(v) => onChange({ ...filters, area: v })}
              allowClear
              placeholder={t("filters.any")}
              options={meta.areas.map((a) => ({ value: a, label: a }))}
              style={{ width: 140 }}
              disabled={disabled}
            />
          </div>

          <div className="item price">
            <div className="label">{t("filters.price")}</div>
            <div className="control">
              <Slider
                range
                min={meta.minPrice}
                max={meta.maxPrice}
                step={10}
                value={filters.priceRange}
                onChange={(v) => onChange({ ...filters, priceRange: v })}
                tooltip={{ formatter: (v) => `¥ ${v}` }}
                disabled={disabled}
              />
            </div>
          </div>

          <div className="item">
            <div className="label">{t("filters.freeCancel")}</div>
            <Switch
              checked={filters.freeCancel}
              onChange={(v) => onChange({ ...filters, freeCancel: v })}
              disabled={disabled}
            />
          </div>

          <div className="item">
            <div className="label">{t("filters.instantBook")}</div>
            <Switch
              checked={filters.instantBook}
              onChange={(v) => onChange({ ...filters, instantBook: v })}
              disabled={disabled}
            />
          </div>

          <Divider type="vertical" />

          <Button onClick={handleReset} disabled={disabled}>
            {t("filters.reset")}
          </Button>
        </Space>
      </div>
    </FilterWrapper>
  );
});

export default EntireFilter;
