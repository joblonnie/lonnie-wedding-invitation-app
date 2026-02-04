declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: KakaoShareOptions) => void;
      };
    };
  }
}

type KakaoShareOptions = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
};

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;

export function initKakao(): boolean {
  if (!window.Kakao) {
    console.warn("Kakao SDK not loaded");
    return false;
  }

  if (!window.Kakao.isInitialized() && KAKAO_JS_KEY) {
    window.Kakao.init(KAKAO_JS_KEY);
  }

  return window.Kakao.isInitialized();
}

export function shareKakao({
  title,
  description,
  imageUrl,
  recipientName,
  language,
}: {
  title: string;
  description: string;
  imageUrl: string;
  recipientName: string;
  language: string;
}): boolean {
  if (!initKakao()) {
    return false;
  }

  const url = new URL(window.location.origin + window.location.pathname);
  if (recipientName) {
    url.searchParams.set("to", recipientName);
  }
  if (language) {
    url.searchParams.set("lang", language);
  }
  const shareUrl = url.toString();

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "청첩장 보기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });

  return true;
}
