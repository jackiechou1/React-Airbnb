import React, { memo, useMemo } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { useI18n } from "./index";
import { useThemeMode } from "@/theme";

const AntdLocaleProvider = memo(({ children }) => {
  const { lang } = useI18n();
  const { mode, theme } = useThemeMode();
  const locale = useMemo(() => (lang === "zh" ? zhCN : enUS), [lang]);
  const algorithm = useMemo(
    () => (mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm),
    [mode]
  );
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        algorithm,
        token: {
          colorPrimary: theme.color.primaryColor,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
});

export default AntdLocaleProvider;
