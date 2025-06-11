import { useEffect, useState } from "react";
import {
  LoginFormData,
  MemberInfo,
  RegisterFormData,
} from "../interfaces/auth";
import {
  getCurrentMember,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

export const useAuth = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState<MemberInfo | null>(null);

  // 初始加載時獲取會員資訊
  useEffect(() => {
    const fetchMember = async () => {
      const memberData = await getCurrentMember();
      setMember(memberData);
    };

    fetchMember();
  }, []);

  const register = async (userData: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(userData);

      if (response.token) {
        setIsSuccess(true);
        setSuccessMessage(response.message);
      } else {
        setIsSuccess(false);
        setFailureMessage(response.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setFailureMessage("註冊失敗");
    } finally {
      setIsLoading(false);
    }

    return isSuccess;
  };

  const login = async (credentials: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await loginUser(credentials);

      if (response.token) {
        setIsSuccess(true);
        setSuccessMessage(response.message);
      } else {
        setIsSuccess(false);
        setFailureMessage(response.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setFailureMessage("登入失敗");
    } finally {
      setIsLoading(false);
    }

    return isSuccess;
  };

  const logout = () => {
    logoutUser();
    setMember(null);
    return true;
  };

  return {
    register,
    login,
    logout,
    member,
    isSuccess,
    successMessage,
    failureMessage,
    isLoading,
  };
};
