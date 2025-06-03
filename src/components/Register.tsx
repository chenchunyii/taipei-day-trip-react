import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface RegisterProps {
  openRegister: boolean;
  setOpenRegister: (open: boolean) => void;
}

const Register = ({ openRegister, setOpenRegister }: RegisterProps) => {
  const Server = import.meta.env.VITE_API_MEMBER_URL;
  const [showRegister, setShowRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(Boolean);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");

  const [thisRegistrantUsername, setThisRegistrantUsername] = useState("");
  const [thisRegistrantEmail, setThisRegistrantEmail] = useState("");
  const [thisRegistrantPassword, setThisRegistrantPassword] = useState("");

  const [thisUserEmail, setThisUserEmail] = useState("test@test.com");
  const [thisUserPassword, setThisUserPassword] = useState("Chun:123");

  // Add effect to handle page reload after successful login
  useEffect(() => {
    if (isSuccess && successMessage === "登入成功") {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, successMessage]);

  // Add event listener for Escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openRegister) {
        setOpenRegister(false);
      }
    };

    if (openRegister) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [openRegister, setOpenRegister]);

  // 註冊功能
  const handleRegister = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${Server}/signup`, {
        userName: thisRegistrantUsername,
        email: thisRegistrantEmail,
        password: thisRegistrantPassword,
      });

      if (response.data && response.data.token) {
        document.cookie = `user=${response.data.token};`;

        setShowRegister(false);
        setIsSuccess(true);
        setSuccessMessage(response.data.message);
      } else {
        setIsSuccess(false);
        setFailureMessage("註冊失敗");
      }
    } catch (err) {
      console.error("註冊失敗：", err);
    }
  };
  // 登入功能
  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${Server}/login`, {
        email: thisUserEmail,
        password: thisUserPassword,
      });

      document.cookie = `user=${response.data.token};`;

      setShowRegister(false);
      setIsSuccess(true);
      setSuccessMessage(response.data.message);
    } catch (err) {
      setIsSuccess(false);
      setFailureMessage("登入失敗");
      console.error("登入失敗：", err);
    }
  };

  return (
    <>
      <div
        className="cover_pg_bg cursor_pointer"
        style={{ display: openRegister ? "block" : "none" }}
        onClick={() => {
          setOpenRegister(false);
        }}
      />
      <div
        className="register_bg"
        style={{ display: openRegister ? "block" : "none" }}
      >
        <div className="register_top"></div>
        <h2 className="register_title">
          {showRegister ? "註冊會員帳號" : "登入會員帳號"}
        </h2>
        <IoIosCloseCircle
          className="register_close_btn"
          onClick={() => {
            setOpenRegister(false);
          }}
        />
        <div
          className="login"
          style={{ display: showRegister ? "none" : "block" }}
        >
          <form onSubmit={handleLogin} className="login_form">
            <input
              type="text"
              className="login_input login_input_email"
              placeholder="請輸入帳號"
              value={thisUserEmail}
              onChange={(e) => setThisUserEmail(e.target.value)}
            />
            <input
              type="password"
              className="login_input login_input_password"
              placeholder="請輸入密碼"
              value={thisUserPassword}
              onChange={(e) => setThisUserPassword(e.target.value)}
            />
            <button className="cursor_pointer login_btn" type="submit">
              登入帳戶
            </button>
          </form>
          <p className="register_text">
            還沒有帳戶？點此
            <span
              className="cursor_pointer point_text"
              onClick={() => setShowRegister(true)}
            >
              註冊
            </span>
          </p>
        </div>
        <div
          className="register"
          style={{ display: showRegister ? "block" : "none" }}
        >
          <form onSubmit={handleRegister} className="register_form">
            <input
              type="text"
              className="register_input_name"
              placeholder="請輸入姓名"
              onChange={(e) => setThisRegistrantUsername(e.target.value)}
              value={thisRegistrantUsername}
            />
            <input
              type="text"
              className="register_input_email"
              placeholder="請輸入電子郵件"
              onChange={(e) => setThisRegistrantEmail(e.target.value)}
              value={thisRegistrantEmail}
            />
            <input
              type="password"
              className="register_input_password"
              placeholder="請輸入密碼"
              onChange={(e) => setThisRegistrantPassword(e.target.value)}
              value={thisRegistrantPassword}
            />
            <button className="cursor_pointer register_btn" type="submit">
              註冊帳戶
            </button>
          </form>
          <p className="login_text">
            已經有帳戶？點此
            <span
              className="cursor_pointer point_text"
              onClick={() => setShowRegister(false)}
            >
              登入
            </span>
          </p>
        </div>
        {isSuccess ? (
          <div className="success_msg response_msg">{successMessage}</div>
        ) : (
          <div className="failure_msg response_msg">{failureMessage}</div>
        )}
      </div>
    </>
  );
};

export default Register;
