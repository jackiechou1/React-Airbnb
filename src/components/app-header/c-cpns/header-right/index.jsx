import IconAvator from '@/assets/svg/icon_avator';
import IconGlobal from '@/assets/svg/icon_global';
import IconMenu from '@/assets/svg/icon_menu';
import React, { memo } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, message, Tooltip } from "antd";
import { useI18n } from "@/i18n";
import { LogoutOutlined, MoonOutlined, PauseCircleFilled, PlayCircleFilled, SettingOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import { useThemeMode } from "@/theme";
import { useMusic } from "@/music";
import { useAuth } from "@/auth";
import { RightWrapper } from './style'
const HeaderRight = memo(() => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();
  const { mode, toggle } = useThemeMode();
  const { isPlaying, toggle: toggleMusic } = useMusic();
  const { isAuthed, user, logout } = useAuth();

  const languageItems = [
    { key: "zh", label: t("common.chinese") },
    { key: "en", label: t("common.english") },
  ];

  const handleLanguageClick = ({ key }) => {
    if (key === lang) return;
    setLang(key);
  };

  const profileItems = [
    ...(isAuthed
      ? [
          {
            key: "profile",
            label: user?.username ? `${t("header.menuProfile")}（${user.username}）` : t("header.menuProfile"),
            icon: <UserOutlined />,
          },
          { key: "settings", label: t("header.menuSettings"), icon: <SettingOutlined /> },
          { type: "divider" },
          { key: "logout", label: t("header.menuLogout"), icon: <LogoutOutlined /> },
        ]
      : [
          { key: "login", label: t("common.login") },
          { key: "register", label: t("common.register") },
        ]),
  ];

  const handleProfileClick = ({ key }) => {
    if (key === "login") navigate("/login");
    if (key === "register") navigate("/register");
    if (key === "logout") {
      logout().then(() => navigate("/home"));
    }
    if (key === "profile") navigate("/profile");
    if (key === "settings") message.info(t("header.menuTodo"));
  };
  return (
    <RightWrapper>
      <div className="btns">
        <Tooltip title={isPlaying ? t("header.musicPause") : t("header.musicPlay")}>
          <span className="music-toggle">
            <Button
              type="text"
              shape="circle"
              onClick={async () => {
                const ok = await toggleMusic();
                if (!ok && !isPlaying) message.warning(t("header.musicPlayFailed"));
              }}
              icon={isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
              aria-label={isPlaying ? t("header.musicPause") : t("header.musicPlay")}
            />
          </span>
        </Tooltip>
        <Tooltip title={mode === "dark" ? t("header.themeLight") : t("header.themeDark")}>
          <span className="theme-toggle">
            <Button
              type="text"
              shape="circle"
              onClick={toggle}
              icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
              aria-label={mode === "dark" ? t("header.themeLight") : t("header.themeDark")}
            />
          </span>
        </Tooltip>
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{ items: languageItems, onClick: handleLanguageClick, selectable: true, selectedKeys: [lang] }}
        >
          <span className="language" role="button" tabIndex={0} aria-label={t("common.language")}>
            <IconGlobal />
          </span>
        </Dropdown>
      </div>
      <Dropdown trigger={["click"]} placement="bottomRight" menu={{ items: profileItems, onClick: handleProfileClick }}>
        <div className="profile" role="button" tabIndex={0} aria-label={t("header.menuAccount")}>
          <div className="menu">
            <IconMenu />
          </div>
          <div className="avatar">
            <IconAvator />
          </div>
        </div>
      </Dropdown>
    </RightWrapper>
  );
})

export default HeaderRight
