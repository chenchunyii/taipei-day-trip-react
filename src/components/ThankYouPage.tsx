import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Navigator from "./Navigator";

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    const number = searchParams.get("number");
    if (number) {
      setOrderNumber(number);
    }
  }, [searchParams]);

  return (
    <>
      <Navigator />
      <div className="thankyou-container">
        <div className="thankyou-card">
          <div className="thankyou-icon">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path
                fill="#4CAF50"
                d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"
              />
            </svg>
          </div>
          <h1 className="thankyou-title">感謝您的預訂！</h1>
          {orderNumber ? (
            <p className="thankyou-message">
              您的訂單已成功確認，訂單編號為：
              <span className="order-number">{orderNumber}</span>
            </p>
          ) : (
            <p className="thankyou-message">無法取得訂單編號，請聯絡客服</p>
          )}
          <p className="thankyou-info">
            行程詳情已寄送到您註冊的電子郵件，請在出發前查看您的信箱。
          </p>
          <a href="/" className="return-home-button">
            返回首頁
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThankYouPage;
