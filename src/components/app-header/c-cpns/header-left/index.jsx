import React, { memo } from 'react'
import { LeftWrapper } from './style'
import IconLogo from '@/assets/svg/icon_logo';
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";
const HeaderLeft = memo(() => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const handleGotoHome = () => {
    navigate("/home");
  };
  const handleGotoEntire = () => {
    navigate("/entire");
  };
  return (
    <LeftWrapper>
      <div className="left">
        <div className="logo" onClick={handleGotoHome}>
          <IconLogo />
        </div>
        <div className="all-stays" onClick={handleGotoEntire}>
          {t("header.allStays")}
        </div>
      </div>
    </LeftWrapper>
  );
});

export default HeaderLeft
