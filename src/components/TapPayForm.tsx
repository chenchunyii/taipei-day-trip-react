import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const appId = import.meta.env.VITE_API_TAPPAY_APP_ID;
const appKey = import.meta.env.VITE_API_TAPPAY_APP_KEY;

interface PaymentFormProps {
  amount?: number;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const TapPayForm: React.FC<PaymentFormProps> = ({ amount, contactInfo }) => {
  const Server = import.meta.env.VITE_API_URL;
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const expiryDateRef = useRef<HTMLDivElement>(null);
  const ccvRef = useRef<HTMLDivElement>(null);
  const { member } = useAuth(); // 假設 useAuth 提供會員資訊

  // 新增：追蹤是否已經初始化
  const isInitializedRef = useRef<boolean>(false);

  const [canGetPrime, setCanGetPrime] = useState<boolean>(false);
  const [isTapPayLoaded, setIsTapPayLoaded] = useState<boolean>(false);
  const [cardStatus, setCardStatus] = useState<{
    number: number;
    expirationDate: number;
    ccv: number;
  }>({ number: 0, expirationDate: 0, ccv: 0 });

  useEffect(() => {
    // 檢查 TapPay SDK 是否已載入且尚未初始化
    if (window.TPDirect && !isInitializedRef.current) {
      setIsTapPayLoaded(true);

      try {
        // 設定 SDK
        window.TPDirect.setupSDK(appId, appKey, "sandbox");

        // 設定 TapPay 支付欄位
        window.TPDirect.card.setup({
          fields: {
            number: {
              element: cardNumberRef.current,
              placeholder: "**** **** **** ****",
            },
            expirationDate: {
              element: expiryDateRef.current,
              placeholder: "MM / YY",
            },
            ccv: {
              element: ccvRef.current,
              placeholder: "CCV",
            },
          },
          styles: {
            // Style all elements
            input: {
              color: "gray",
            },
            // Styling ccv field
            "input.ccv": {
              // 'font-size': '16px'
            },
            // Styling expiration-date field
            "input.expiration-date": {
              // 'font-size': '16px'
            },
            // Styling card-number field
            "input.card-number": {
              // 'font-size': '16px'
            },
            // style focus state
            ":focus": {
              // 'color': 'black'
            },
            // style valid state
            ".valid": {
              color: "green",
            },
            // style invalid state
            ".invalid": {
              color: "red",
            },
            // Media queries
            // Note that these apply to the iframe, not the root window.
            "@media screen and (max-width: 400px)": {
              input: {
                color: "orange",
              },
            },
          } as any,
        });

        // 監聽卡片資訊輸入狀態
        window.TPDirect.card.onUpdate((update) => {
          setCanGetPrime(update.canGetPrime);
          setCardStatus(update.status);
        });

        // 標記為已初始化
        isInitializedRef.current = true;
      } catch (error) {
        console.error("TapPay 初始化失敗:", error);
      }
    } else if (!window.TPDirect) {
      console.warn("TapPay SDK 尚未載入。請確認 public/index.html 設定正確。");
    }

    return () => {};
  }, []); // 空依賴陣列確保只執行一次

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate contact information
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      alert("請先完成聯絡資訊填寫");
      return;
    }

    if (!isTapPayLoaded) {
      alert("TapPay SDK 尚未載入，請稍後再試。");
      return;
    }

    if (canGetPrime) {
      // 呼叫 TapPay 取得 Prime
      window.TPDirect?.card.getPrime(async (result) => {
        if (result.status === 0) {
          if (result.card?.prime) {
            // // Pass the prime to the parent component for payment processing
            // onPrimeReceived(result.card.prime);

            const data = await axios.post(`${Server}/attraction/payment`, {
              prime: result.card.prime,
              amount: amount,
              cardholder: {
                phoneNumber: contactInfo.phone,
                name: contactInfo.name,
                email: contactInfo.email,
              },
              userId: member?.Id,
              accountEmail: member?.Email,
            });
            if (data.status === 200) {
              window.location.href = `/thanks?number=${data.data.orderNumber}`;
            }
          }
        } else {
          console.error("取得 Prime 失敗:", result.msg);
          alert("取得 Prime 失敗: " + result.msg);
        }
      });
    } else {
      alert("請檢查信用卡資訊是否完整且正確填寫。");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bp_user_info_form">
      <div className="bp_ur_info">
        卡片號碼：
        <div
          id="card-number"
          ref={cardNumberRef}
          className="tpfield bp_input"
        ></div>
        {cardStatus.number === 2 && (
          <p style={{ color: "red" }}>卡號格式錯誤</p>
        )}
      </div>
      <div className="bp_ur_info">
        過期時間：
        <div
          id="card-expiration-date"
          ref={expiryDateRef}
          className="tpfield"
        ></div>
        {cardStatus.expirationDate === 2 && (
          <p style={{ color: "red" }}>有效期格式錯誤</p>
        )}
      </div>
      <div className="bp_ur_info">
        安全三碼：
        <div id="card-ccv" ref={ccvRef} className="tpfield bp_input"></div>
        {cardStatus.ccv === 2 && <p style={{ color: "red" }}>安全碼格式錯誤</p>}
      </div>
      <div className="tp_btn_bg">
        <div className="bp_container">
          <button
            className="tappay_btn display_flex_center"
            type="submit"
            disabled={!canGetPrime || !isTapPayLoaded}
          >
            {isTapPayLoaded
              ? canGetPrime
                ? "確認訂購並支付"
                : "請完整填寫資訊"
              : "載入中..."}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TapPayForm;
