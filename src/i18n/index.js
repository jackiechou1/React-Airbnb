import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "airbnb_lang";

const messages = {
  zh: {
    common: {
      login: "登录",
      register: "注册",
      backHome: "返回首页",
      language: "语言",
      chinese: "中文",
      english: "English",
      formCheckError: "请先检查表单填写",
    },
    header: {
      allStays: "全部房源",
      search: "搜索",
      searchPlaceholder: "搜索房源（名称/城市/描述）",
      searchEmptyWarning: "请输入想要搜索的房源关键词",
      themeLight: "日间模式",
      themeDark: "夜间模式",
      musicPlay: "播放音乐",
      musicPause: "暂停音乐",
      musicPlayFailed: "音乐播放失败（可能被浏览器拦截）",
      menuAccount: "账户菜单",
      menuProfile: "个人资料",
      menuSettings: "账号设置",
      menuLogout: "退出登录",
      menuTodo: "该功能待接入",
    },
    profile: {
      title: "个人资料",
      username: "用户名",
      email: "邮箱",
      userId: "用户ID",
      logout: "退出登录",
    },
    entire: {
      staysSuffix: "处住所",
      experienceTitle: "精选体验",
      experienceSuffix: "条体验",
      searchResultFor: "搜索结果",
      empty: "暂无匹配结果",
      paginationInfoPrefix: "显示第",
      paginationInfoSuffix: "个房源，共",
      paginationInfoTotalSuffix: "个",
    },
    filters: {
      guests: "人数",
      roomType: "房源类型",
      area: "位置区域",
      price: "价格",
      freeCancel: "可免费取消",
      instantBook: "闪定",
      any: "不限",
      reset: "重置",
    },
    login: {
      title: "登录",
      subtitle: "使用账号与密码登录后继续。",
      accountLabel: "账号",
      accountPlaceholder: "邮箱 / 手机号 / 用户名",
      accountRequired: "请输入账号（邮箱/手机号/用户名）",
      passwordLabel: "密码",
      passwordPlaceholder: "请输入密码",
      passwordRequired: "请输入密码",
      remember: "记住我",
      submit: "登录",
      noAccount: "没有账号？去注册",
      success: "登录成功（示例）",
    },
    register: {
      title: "注册",
      subtitle: "创建账号后即可登录使用。",
      emailLabel: "邮箱",
      emailPlaceholder: "name@example.com",
      usernameLabel: "用户名",
      usernamePlaceholder: "请输入用户名",
      passwordLabel: "密码",
      passwordPlaceholder: "至少 6 位",
      confirmPasswordLabel: "确认密码",
      confirmPasswordPlaceholder: "再次输入密码",
      agreement: "我已阅读并同意服务条款",
      submit: "注册",
      haveAccount: "已有账号？去登录",
      emailRequired: "请输入邮箱",
      emailInvalid: "邮箱格式不正确",
      usernameRequired: "请输入用户名",
      passwordRequired: "请输入密码",
      passwordMin: "密码至少 8 位",
      passwordPattern: "密码需包含字母与数字",
      confirmRequired: "请再次输入密码",
      confirmMismatch: "两次输入的密码不一致",
      agreementRequired: "请先同意服务条款",
      success: "注册成功（示例），请登录",
    },
  },
  en: {
    common: {
      login: "Login",
      register: "Sign up",
      backHome: "Back to home",
      language: "Language",
      chinese: "中文",
      english: "English",
      formCheckError: "Please check the form fields",
    },
    header: {
      allStays: "All stays",
      search: "Search",
      searchPlaceholder: "Search stays (name/city/description)",
      searchEmptyWarning: "Please enter a keyword to search",
      themeLight: "Light mode",
      themeDark: "Dark mode",
      musicPlay: "Play music",
      musicPause: "Pause music",
      musicPlayFailed: "Failed to play (may be blocked by the browser)",
      menuAccount: "Account menu",
      menuProfile: "Profile",
      menuSettings: "Account settings",
      menuLogout: "Logout",
      menuTodo: "Not connected yet",
    },
    profile: {
      title: "Profile",
      username: "Username",
      email: "Email",
      userId: "User ID",
      logout: "Logout",
    },
    entire: {
      staysSuffix: "stays",
      experienceTitle: "Featured experiences",
      experienceSuffix: "experiences",
      searchResultFor: "Results for",
      empty: "No results",
      paginationInfoPrefix: "Showing",
      paginationInfoSuffix: "items, total",
      paginationInfoTotalSuffix: "",
    },
    filters: {
      guests: "Guests",
      roomType: "Room type",
      area: "Area",
      price: "Price",
      freeCancel: "Free cancellation",
      instantBook: "Instant book",
      any: "Any",
      reset: "Reset",
    },
    login: {
      title: "Login",
      subtitle: "Sign in with your account and password.",
      accountLabel: "Account",
      accountPlaceholder: "Email / Phone / Username",
      accountRequired: "Please enter your account",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      passwordRequired: "Please enter your password",
      remember: "Remember me",
      submit: "Login",
      noAccount: "No account? Create one",
      success: "Logged in (demo)",
    },
    register: {
      title: "Sign up",
      subtitle: "Create an account to continue.",
      emailLabel: "Email",
      emailPlaceholder: "name@example.com",
      usernameLabel: "Username",
      usernamePlaceholder: "Enter a username",
      passwordLabel: "Password",
      passwordPlaceholder: "At least 6 characters",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "Re-enter your password",
      agreement: "I agree to the terms",
      submit: "Sign up",
      haveAccount: "Already have an account? Login",
      emailRequired: "Please enter your email",
      emailInvalid: "Invalid email address",
      usernameRequired: "Please enter a username",
      passwordRequired: "Please enter a password",
      passwordMin: "Password must be at least 8 characters",
      passwordPattern: "Password must contain letters and numbers",
      confirmRequired: "Please confirm your password",
      confirmMismatch: "Passwords do not match",
      agreementRequired: "Please accept the terms",
      success: "Signed up (demo), please login",
    },
  },
};

function getDefaultLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "zh" || saved === "en") return saved;
  } catch (_) {}
  const navLang = (typeof navigator !== "undefined" && navigator.language) || "";
  return navLang.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function getByPath(obj, path) {
  if (!obj) return undefined;
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getDefaultLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }, [lang]);

  const t = useCallback(
    (key) => {
      const dict = messages[lang] || messages.en;
      return getByPath(dict, key) ?? getByPath(messages.en, key) ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
