const baseUrl = "http://localhost:8080/api";

async function request(path, { method = "GET", body } = {}) {
  const options = { method, credentials: "include" };
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${baseUrl}${path}`, options);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.message || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
}

export const sendOtp = (email) =>
  request("/auth/send-otp", { method: "POST", body: { email } });

export const registerUser = (payload) =>
  request("/auth/register", { method: "POST", body: payload });

export const loginUser = (email, password) =>
  request("/auth/login", { method: "POST", body: { email, password } });

export const logoutUser = () =>
  request("/auth/logout", { method: "POST" });

export const getCurrentUser = () => request("/auth/me");
