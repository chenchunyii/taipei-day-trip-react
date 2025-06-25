declare global {
  interface Window {
    TPDirect?: {
      setupSDK: (
        appId: number,
        appKey: string,
        env: "sandbox" | "production"
      ) => void;
      card: {
        setup: (options: TPCardSetupOptions) => void;
        onUpdate: (callback: (update: TPCardUpdate) => void) => void;
        getPrime: (callback: (result: TPCardGetPrimeResult) => void) => void;
        // 您可能還需要其他方法，請根據 TapPay 文件自行擴充
      };
      // 您可能還需要其他支付方式的型別，例如 LINE Pay, JKOPay 等
    };
  }
}

interface TPCardSetupOptions {
  fields: {
    number: TPCardField;
    expirationDate: TPCardField;
    ccv: TPCardField;
  };
  styles?: {
    [key: string]: React.CSSProperties; // 允許 CSS 屬性
  };
}

interface TPCardField {
  element: HTMLElement | null;
  placeholder?: string;
  // 其他可能屬性，例如 className, style 等
}

interface TPCardUpdate {
  status: {
    number: number; // 0: 初始, 1: 填寫中, 2: 錯誤, 3: 正確
    expirationDate: number;
    ccv: number;
  };
  cardType: number;
  canGetPrime: boolean;
  // 其他可能的更新狀態
}

interface TPCardGetPrimeResult {
  status: number; // 0 為成功
  msg: string;
  card?: {
    prime: string;
    // 其他卡片資訊，例如 binCode, lastFour, issuer, funding, type, country, expiryFront, expiryBack
  };
  // 其他錯誤資訊，例如 error
}

export {};
