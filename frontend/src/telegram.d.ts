export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        MainButton: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          button_color?: string;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}
