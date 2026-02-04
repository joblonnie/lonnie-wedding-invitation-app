export type Language = "ko" | "en" | "zh";

type Strings = {
  title: string;
  subtitle: string;
  greeting: (name: string) => string;
  ourStoryTitle: string;
  firstMet: string;
  togetherFor: string;
  untilWedding: string;
  days: string;
  eventTitle: string;
  photosTitle: string;
  mapTitle: string;
  openInMaps: string;
  address: string;
  addToCalendar: string;
  share: string;
  copiedLink: string;
  celebrate: string;
  celebrateCount: (count: number) => string;
  publicTransport: string;
  byCar: string;
  subway: string;
  bus: string;
  parking: string;
  navigation: string;
  kakaoNavi: string;
  tmap: string;
  naverMap: string;
};

const DICT: Record<Language, Strings> = {
  ko: {
    title: "청첩장",
    subtitle: "소중한 분들을 초대합니다.",
    greeting: (name: string) => `${name}님께 전하는`,
    ourStoryTitle: "우리의 이야기",
    firstMet: "처음 만난 날",
    togetherFor: "함께한 시간",
    untilWedding: "결혼까지",
    days: "일",
    eventTitle: "예식 정보",
    photosTitle: "사진",
    mapTitle: "오시는 길",
    openInMaps: "지도 앱에서 열기",
    address: "주소",
    addToCalendar: "일정 등록",
    share: "공유",
    copiedLink: "링크를 복사했어요.",
    celebrate: "축하하기",
    celebrateCount: (count: number) => `${count}명이 축하했어요`,
    publicTransport: "대중교통",
    byCar: "자가용",
    subway: "지하철",
    bus: "버스",
    parking: "주차",
    navigation: "네비게이션",
    kakaoNavi: "카카오내비",
    tmap: "티맵",
    naverMap: "네이버지도",
  },
  en: {
    title: "Wedding Invitation",
    subtitle: "We invite you to celebrate with us.",
    greeting: (name: string) => `Dear ${name},`,
    ourStoryTitle: "Our Story",
    firstMet: "First Met",
    togetherFor: "Together For",
    untilWedding: "Until Wedding",
    days: "days",
    eventTitle: "Event",
    photosTitle: "Photos",
    mapTitle: "Map",
    openInMaps: "Open in maps",
    address: "Address",
    addToCalendar: "Add to calendar",
    share: "Share",
    copiedLink: "Link copied.",
    celebrate: "Celebrate",
    celebrateCount: (count: number) => `${count} people celebrated`,
    publicTransport: "Public Transport",
    byCar: "By Car",
    subway: "Subway",
    bus: "Bus",
    parking: "Parking",
    navigation: "Navigation",
    kakaoNavi: "Kakao Navi",
    tmap: "T-map",
    naverMap: "Naver Map",
  },
  zh: {
    title: "婚礼请柬",
    subtitle: "诚挚邀请您一同见证。",
    greeting: (name: string) => `致 ${name}`,
    ourStoryTitle: "我们的故事",
    firstMet: "初次相遇",
    togetherFor: "相伴时光",
    untilWedding: "距离婚礼",
    days: "天",
    eventTitle: "活动信息",
    photosTitle: "照片",
    mapTitle: "地图",
    openInMaps: "在地图中打开",
    address: "地址",
    addToCalendar: "添加到日历",
    share: "分享",
    copiedLink: "已复制链接。",
    celebrate: "祝福",
    celebrateCount: (count: number) => `${count}人送上祝福`,
    publicTransport: "公共交通",
    byCar: "自驾",
    subway: "地铁",
    bus: "公交",
    parking: "停车",
    navigation: "导航",
    kakaoNavi: "Kakao导航",
    tmap: "T-map",
    naverMap: "Naver地图",
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
