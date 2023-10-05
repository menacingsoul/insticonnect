import { applyAuthTokenInterceptor } from "axios-jwt";
import axios from "axios";
import { clearAuthTokens, setAuthTokens } from "axios-jwt";
import Cookies from 'js-cookie';

const BASE_URL = "https://localhost:5000";

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({ baseURL: BASE_URL });

const saveUserData = async (user) => {
  try {
    // You can use cookies or local storage in Next.js
    // For example, using cookies:
    Cookies.set("user", JSON.stringify(user));
    console.log("User data saved successfully!");
  } catch (error) {
    console.log("Error saving user data:", error);
  }
};

// 2. Define token refresh function.
const requestRefresh = async (refresh) => {
  // Notice that this is the global axios instance, not the axiosInstance!
  const response = await axios.post(`${BASE_URL}/auth/refresh_token`, {
    refresh,
  });
  const user = response.data.user;
  saveUserData(user);
  return response.data.accessToken;
};

// 3. Apply interceptor
// Notice that this uses the axiosInstance instance.
applyAuthTokenInterceptor(axiosInstance, { requestRefresh });
