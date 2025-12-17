import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider as MyThemeProvider } from "styled-components";
import App from "@/App";
import "normalize.css";
import "antd/dist/reset.css";
import "@/assets/css/index.less";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "./store";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { LanguageProvider } from "@/i18n";
import AntdLocaleProvider from "@/i18n/AntdLocaleProvider";
import { ThemeModeProvider, useThemeMode } from "@/theme";
import { useMemo } from "react";
import { MusicProvider } from "@/music";
import { AuthProvider } from "@/auth";
const root = ReactDOM.createRoot(document.getElementById("root"));

function AppProviders() {
  const { mode, theme } = useThemeMode();
  const materialTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  return (
    <AntdLocaleProvider>
      <MyThemeProvider theme={theme}>
        <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
          <HashRouter>
            <App />
          </HashRouter>
        </ThemeProvider>
      </MyThemeProvider>
    </AntdLocaleProvider>
  );
}

root.render(
  <Provider store={store}>
    <Suspense fallback="loading">
      <LanguageProvider>
        <ThemeModeProvider>
          <MusicProvider>
            <AuthProvider>
              <AppProviders />
            </AuthProvider>
          </MusicProvider>
        </ThemeModeProvider>
      </LanguageProvider>
    </Suspense>
  </Provider>
);
