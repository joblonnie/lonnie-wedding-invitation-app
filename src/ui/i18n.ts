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
  googleCalendar: string;
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
  shareTitle: string;
  recipientName: string;
  recipientPlaceholder: string;
  cancel: string;
  kakaoShare: string;
  copyLink: string;
  bulkShare: string;
  // 축의금
  accountInfo: string;
  groomSide: string;
  brideSide: string;
  copyAccount: string;
  copiedAccount: string;
  accountHolder: string;
  // 방명록
  guestBook: string;
  guestName: string;
  guestNamePlaceholder: string;
  guestMessage: string;
  guestMessagePlaceholder: string;
  guestPassword: string;
  guestPasswordPlaceholder: string;
  guestSubmit: string;
  guestDelete: string;
  guestDeleteConfirm: string;
  guestPasswordWrong: string;
  guestLoadMore: string;
  guestEmpty: string;
  guestPasswordForDelete: string;
  tapToOpen: string;
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
    googleCalendar: "구글 캘린더",
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
    shareTitle: "청첩장 공유",
    recipientName: "받는 분 성함",
    recipientPlaceholder: "예: 홍길동",
    cancel: "취소",
    kakaoShare: "카카오톡",
    copyLink: "링크 복사",
    bulkShare: "단체 전송",
    // 축의금
    accountInfo: "축의금 안내",
    groomSide: "신랑측",
    brideSide: "신부측",
    copyAccount: "복사",
    copiedAccount: "복사 완료",
    accountHolder: "예금주",
    // 방명록
    guestBook: "방명록",
    guestName: "이름",
    guestNamePlaceholder: "이름을 입력해주세요",
    guestMessage: "메시지",
    guestMessagePlaceholder: "축하 메시지를 남겨주세요",
    guestPassword: "비밀번호",
    guestPasswordPlaceholder: "삭제 시 필요합니다",
    guestSubmit: "등록",
    guestDelete: "삭제",
    guestDeleteConfirm: "이 메시지를 삭제하시겠습니까?",
    guestPasswordWrong: "비밀번호가 올바르지 않습니다.",
    guestLoadMore: "더보기",
    guestEmpty: "첫 번째 축하 메시지를 남겨주세요!",
    guestPasswordForDelete: "비밀번호를 입력해주세요",
    tapToOpen: "터치하여 열기",
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
    googleCalendar: "Google Calendar",
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
    shareTitle: "Share Invitation",
    recipientName: "Recipient Name",
    recipientPlaceholder: "e.g. John Doe",
    cancel: "Cancel",
    kakaoShare: "KakaoTalk",
    copyLink: "Copy Link",
    bulkShare: "Bulk Send",
    // Account info
    accountInfo: "Account Info",
    groomSide: "Groom's Side",
    brideSide: "Bride's Side",
    copyAccount: "Copy",
    copiedAccount: "Copied",
    accountHolder: "Account Holder",
    // Guest book
    guestBook: "Guest Book",
    guestName: "Name",
    guestNamePlaceholder: "Enter your name",
    guestMessage: "Message",
    guestMessagePlaceholder: "Leave a congratulatory message",
    guestPassword: "Password",
    guestPasswordPlaceholder: "Required for deletion",
    guestSubmit: "Submit",
    guestDelete: "Delete",
    guestDeleteConfirm: "Delete this message?",
    guestPasswordWrong: "Incorrect password.",
    guestLoadMore: "Load More",
    guestEmpty: "Be the first to leave a message!",
    guestPasswordForDelete: "Enter password",
    tapToOpen: "Tap to open",
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
    googleCalendar: "谷歌日历",
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
    shareTitle: "分享请柬",
    recipientName: "收件人姓名",
    recipientPlaceholder: "例如: 张三",
    cancel: "取消",
    kakaoShare: "KakaoTalk",
    copyLink: "复制链接",
    bulkShare: "批量发送",
    // 账户信息
    accountInfo: "转账信息",
    groomSide: "新郎方",
    brideSide: "新娘方",
    copyAccount: "复制",
    copiedAccount: "已复制",
    accountHolder: "户名",
    // 留言板
    guestBook: "留言板",
    guestName: "姓名",
    guestNamePlaceholder: "请输入姓名",
    guestMessage: "留言",
    guestMessagePlaceholder: "留下祝福的话",
    guestPassword: "密码",
    guestPasswordPlaceholder: "删除时需要",
    guestSubmit: "提交",
    guestDelete: "删除",
    guestDeleteConfirm: "确定删除这条留言吗？",
    guestPasswordWrong: "密码不正确。",
    guestLoadMore: "加载更多",
    guestEmpty: "成为第一个留言的人吧！",
    guestPasswordForDelete: "请输入密码",
    tapToOpen: "点击打开",
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
