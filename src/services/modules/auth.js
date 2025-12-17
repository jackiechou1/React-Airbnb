import axios from "axios";

const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL || "";

const authClient = axios.create({
  baseURL: AUTH_BASE_URL ? `${AUTH_BASE_URL}/api/auth` : "/api/auth",
  timeout: 10000,
  withCredentials: true,
});

export async function registerAccount({ email, username, password }) {
  const res = await authClient.post("/register", { email, username, password });
  return res.data?.data;
}

export async function loginAccount({ account, password }) {
  const res = await authClient.post("/login", { account, password });
  return res.data?.data;
}

export async function getMe(accessToken) {
  const res = await authClient.get("/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data?.data;
}

export async function refresh() {
  const res = await authClient.post("/refresh");
  return res.data?.data;
}

export async function logout() {
  const res = await authClient.post("/logout");
  return res.data?.data;
}
