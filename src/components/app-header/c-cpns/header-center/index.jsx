import React, { memo, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Space, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useI18n } from "@/i18n";
import { CenterWrapper } from "./style";

function parseKeyword(search) {
  const params = new URLSearchParams(search || "");
  return (params.get("keyword") || "").trim();
}

const HeaderCenter = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();

  const keywordFromUrl = useMemo(() => parseKeyword(location.search), [location.search]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (location.pathname !== "/entire") return;
    setKeyword(keywordFromUrl);
  }, [keywordFromUrl, location.pathname]);

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (!trimmed) {
      message.warning(t("header.searchEmptyWarning"));
      return;
    }
    const params = new URLSearchParams();
    params.set("keyword", trimmed);
    navigate(`/entire?${params.toString()}`);
  };

  return (
    <CenterWrapper>
      <Space size={10}>
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onPressEnter={handleSearch}
          allowClear
          placeholder={t("header.searchPlaceholder")}
          className="keyword"
        />
        <Button type="primary" className="search-btn" icon={<SearchOutlined />} onClick={handleSearch}>
          {t("header.search")}
        </Button>
      </Space>
    </CenterWrapper>
  );
});

export default HeaderCenter;
