import axios from "axios";
import { useEffect, useState } from "react";
import { MemberInterface } from "../interfaces/member";
import Register from "./Register";

const Navigator = () => {
  const Server = import.meta.env.VITE_API_MEMBER_URL;
  const [openRegister, setOpenRegister] = useState(false);
  const [member, setMember] = useState<MemberInterface | null>(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const token = document.cookie.split("=")[1];

    if (!token) return;
    axios
      .post(
        `${Server}/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setMember({
            Id: res.data.id,
            Nickname: res.data.nickname,
            Email: res.data.email,
          });
        }
      })
      .catch((err) => {
        console.error("取得會員資料失敗：", err);

        setMember(null);
      });
  }, [Server]);

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setMember(null);
    setShowLogout(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div className="navigator_bg">
        <nav className="navigator display_flex">
          <a className="navigator_title" href="/">
            台北一日遊
          </a>
          <div className="navigator_links">
            <div className="navigator_book cursor_pointer">預定行程</div>

            <div>
              {member ? (
                <div>
                  Hi{" "}
                  <span
                    className="username cursor_pointer"
                    onMouseEnter={() => setShowLogout(true)}
                    onMouseLeave={() => setShowLogout(false)}
                  >
                    {member.Nickname}
                    {showLogout && (
                      <div
                        className="logout cursor_pointer"
                        onClick={handleLogout}
                      >
                        登出
                      </div>
                    )}
                  </span>
                  ，歡迎回來
                </div>
              ) : (
                <div
                  className="navigator_singup cursor_pointer"
                  onClick={() => setOpenRegister(true)}
                >
                  登入/註冊
                </div>
              )}
            </div>
          </div>
        </nav>
        <Register
          openRegister={openRegister}
          setOpenRegister={setOpenRegister}
        />
      </div>
      <nav className="nv-bg" />
    </>
  );
};

export default Navigator;
