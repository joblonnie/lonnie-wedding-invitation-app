export type Language = "ko" | "en" | "zh";

type Strings = {
  title: string;
  subtitle: string;
  eventTitle: string;
  photosTitle: string;
  mapTitle: string;
  openInMaps: string;
  address: string;
  addToCalendar: string;
  share: string;
  copiedLink: string;
};

const DICT: Record<Language, Strings> = {
  ko: {
    title: "청첩장",
    subtitle: "모바일/웹에서 확인 가능한 초안 화면입니다.",
    eventTitle: "예식 정보",
    photosTitle: "사진",
    mapTitle: "오시는 길",
    openInMaps: "지도 앱에서 열기",
    address: "주소",
    addToCalendar: "일정 등록",
    share: "공유",
    copiedLink: "링크를 복사했어요.",
  },
  en: {
    title: "Wedding Invitation",
    subtitle: "Draft screen viewable on mobile and web.",
    eventTitle: "Event",
    photosTitle: "Photos",
    mapTitle: "Map",
    openInMaps: "Open in maps",
    address: "Address",
    addToCalendar: "Add to calendar",
    share: "Share",
    copiedLink: "Link copied.",
  },
  zh: {
    title: "婚礼请柬",
    subtitle: "可在手机与网页查看的草稿画面。",
    eventTitle: "活动信息",
    photosTitle: "照片",
    mapTitle: "地图",
    openInMaps: "在地图中打开",
    address: "地址",
    addToCalendar: "添加到日历",
    share: "分享",
    copiedLink: "已复制链接。",
  },
};

export function t(language: Language): Strings {
  return DICT[language];
}

export function detectDefaultLanguage(): Language {
  const locale =
    (typeof navigator !== "undefined" && (navigator.languages?.[0] ?? navigator.language)) ||
    "en";

  const normalized = locale.toLowerCase();
  if (normalized.startsWith("ko")) return "ko";
  if (normalized.startsWith("zh")) return "zh";
  return "en";
}
