import axios from "axios";
import {
  AuthResponse,
  LoginFormData,
  MemberInfo,
  RegisterFormData,
} from "../interfaces/auth";
import { getAuthToken, removeAuthToken, setAuthToken } from "./storage";

const API_URL = import.meta.env.VITE_API_MEMBER_URL;

export const registerUser = async (
  userData: RegisterFormData
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);

    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      return {
        token: response.data.token,
        message: response.data.message || "註冊成功",
      };
    } else {
      return {
        message: "註冊失敗",
      };
    }
  } catch (error) {
    console.error("註冊失敗：", error);
    return {
      message: "註冊失敗",
    };
  }
};

export const loginUser = async (
  credentials: LoginFormData
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      return {
        token: response.data.token,
        message: response.data.message || "登入成功",
      };
    } else {
      return {
        message: "登入失敗",
      };
    }
  } catch (error) {
    console.error("登入失敗：", error);
    return {
      message: "登入失敗",
    };
  }
};

export const getCurrentMember = async (): Promise<MemberInfo | null> => {
  const token = getAuthToken();

  if (!token) return null;

  try {
    const response = await axios.post(
      `${API_URL}/me`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      return {
        Id: response.data.id,
        Nickname: response.data.nickname,
        Email: response.data.email,
      };
    }
    return null;
  } catch (error) {
    console.error("取得會員資料失敗：", error);
    return null;
  }
};

export const logoutUser = (): void => {
  removeAuthToken();
};
