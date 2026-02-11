import type { Invitation } from "./types";

export const DEFAULT_INVITATION: Invitation = {
  theme: "botanical",
  meta: {
    title: {
      ko: "우리 결혼합니다",
      en: "We’re getting married",
      zh: "我们结婚啦",
    },
    description: {
      ko: "소중한 분들을 초대합니다.",
      en: "We would love to celebrate with you.",
      zh: "诚挚邀请您一同见证。",
    },
    imageUrl: "",
  },
  couple: {
    groom: {
      ko: "김동현",
      en: "Donghyun Kim",
      zh: "金东贤",
    },
    bride: {
      ko: "정수진",
      en: "Sujin Jung",
      zh: "郑秀珍",
    },
    firstMet: new Date("2017-05-16"),
    story: {
      ko: "학교에서 처음 만나 사랑을 시작했습니다.",
      en: "We first met at school and fell in love.",
      zh: "我们在学校相遇，开始了我们的爱情。",
    },
  },
  photos: [
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      alt: {
        ko: "웨딩 커플",
        en: "Wedding couple",
        zh: "新婚夫妇",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      alt: {
        ko: "웨딩 케이크",
        en: "Wedding cake",
        zh: "婚礼蛋糕",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      alt: {
        ko: "웨딩 테이블",
        en: "Wedding table",
        zh: "婚礼桌",
      },
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      alt: {
        ko: "커플 실루엣",
        en: "Couple silhouette",
        zh: "情侣剪影",
      },
    },
  ],
  accounts: {
    groom: [
      { bank: "신한은행", accountNumber: "110-123-456789", holder: "김동현" },
      { bank: "국민은행", accountNumber: "123-45-6789012", holder: "김철수 (부)" },
    ],
    bride: [
      { bank: "우리은행", accountNumber: "1002-123-456789", holder: "정수진" },
      { bank: "하나은행", accountNumber: "456-78-9012345", holder: "정영희 (모)" },
    ],
  },
  event: {
    start: new Date("2026-10-17T05:00:00.000Z"),
    end: new Date("2026-10-17T07:00:00.000Z"),
    locationIcs: "루클라비 더화이트, 서울 강남구 논현로 742",
    addressText: {
      ko: "서울 강남구 논현로 742",
      en: "742 Nonhyeon-ro, Gangnam-gu, Seoul",
      zh: "首尔江南区论岘路742号",
    },
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=127.025%2C37.508%2C127.035%2C37.518&layer=mapnik&marker=37.513%2C127.030",
    mapQuery: "서울 강남구 논현로 742 루클라비 더화이트",
    lat: 37.5135,
    lng: 127.0305,
    whenText: {
      ko: "2026년 10월 17일 (토) 오후 2:00",
      en: "Sat, Oct 17, 2026 2:00 PM",
      zh: "2026年10月17日（周六）14:00",
    },
    whereText: {
      ko: "루클라비 더화이트",
      en: "LUKLAVI THE WHITE",
      zh: "LUKLAVI THE WHITE",
    },
    transportation: {
      subway: {
        ko: "7호선 학동역 10번 출구 도보 5분",
        en: "Line 7 Hakdong Station Exit 10, 5 min walk",
        zh: "7号线鹤洞站10号出口步行5分钟",
      },
      bus: {
        ko: "간선 147, 240, 463 / 지선 3411, 4211",
        en: "Bus 147, 240, 463 / 3411, 4211",
        zh: "干线147、240、463 / 支线3411、4211",
      },
      car: {
        ko: "네비게이션 '루클라비 더화이트' 검색",
        en: "Search 'LUKLAVI THE WHITE' in navigation",
        zh: "导航搜索'LUKLAVI THE WHITE'",
      },
      parking: {
        ko: "건물 내 주차장 이용 (2시간 무료)",
        en: "Building parking available (2 hours free)",
        zh: "大厦停车场可用（2小时免费）",
      },
    },
  },
};
