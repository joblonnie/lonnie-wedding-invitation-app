declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string; scope?: string }) => void;
        setAccessToken: (token: string) => void;
        getAccessToken: () => string | null;
        logout: () => Promise<void>;
      };
      API: {
        request: (options: {
          url: string;
          data?: Record<string, unknown>;
          success?: (response: unknown) => void;
          fail?: (error: unknown) => void;
        }) => Promise<unknown>;
      };
    };
  }
}

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

export function isKakaoLoggedIn(): boolean {
  if (!initKakao()) return false;
  return !!window.Kakao.Auth.getAccessToken();
}

export function loginWithKakao(): void {
  if (!initKakao()) return;

  const redirectUri = `${window.location.origin}${window.location.pathname}?mode=bulk&kakao_auth=1`;

  window.Kakao.Auth.authorize({
    redirectUri,
    scope: "talk_message",
  });
}

export function handleKakaoCallback(): boolean {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code && urlParams.get("kakao_auth") === "1") {
    // Exchange code for token via backend would be ideal,
    // but for client-side only, we'll use implicit flow
    // Clean up URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("code");
    newUrl.searchParams.delete("kakao_auth");
    window.history.replaceState({}, "", newUrl.toString());
    return true;
  }
  return false;
}

export function logoutKakao(): Promise<void> {
  if (!initKakao()) return Promise.resolve();
  return window.Kakao.Auth.logout();
}

export async function sendToMe(message: string): Promise<boolean> {
  if (!initKakao()) return false;

  try {
    await window.Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "text",
          text: message,
          link: {
            web_url: window.location.origin + window.location.pathname,
            mobile_web_url: window.location.origin + window.location.pathname,
          },
          button_title: "청첩장 열기",
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to send Kakao message:", error);
    return false;
  }
}

export async function sendFeedToMe(params: {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText: string;
  buttonUrl: string;
}): Promise<boolean> {
  if (!initKakao()) return false;

  try {
    await window.Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed",
          content: {
            title: params.title,
            description: params.description,
            image_url: params.imageUrl || "",
            link: {
              web_url: params.buttonUrl,
              mobile_web_url: params.buttonUrl,
            },
          },
          buttons: [
            {
              title: params.buttonText,
              link: {
                web_url: params.buttonUrl,
                mobile_web_url: params.buttonUrl,
              },
            },
          ],
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Failed to send Kakao feed:", error);
    return false;
  }
}
