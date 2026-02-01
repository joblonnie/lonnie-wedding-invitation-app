import type { Invitation } from "./types";

export const DEFAULT_INVITATION: Invitation = {
  theme: "classic",
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
  photos: [
    {
      src: "/images/photo-placeholder.svg",
      alt: {
        ko: "사진 1",
        en: "Photo 1",
        zh: "照片 1",
      },
    },
    {
      src: "/images/photo-placeholder.svg",
      alt: {
        ko: "사진 2",
        en: "Photo 2",
        zh: "照片 2",
      },
    },
    {
      src: "/images/photo-placeholder.svg",
      alt: {
        ko: "사진 3",
        en: "Photo 3",
        zh: "照片 3",
      },
    },
  ],
  event: {
    start: new Date("2026-05-23T03:00:00.000Z"),
    end: new Date("2026-05-23T05:00:00.000Z"),
    locationIcs: "Seoul, Korea",
    addressText: {
      ko: "서울특별시 (예시 주소)",
      en: "Seoul, Korea (example address)",
      zh: "韩国首尔（示例地址）",
    },
    mapEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=126.958%2C37.551%2C127.028%2C37.585&layer=mapnik&marker=37.568%2C126.993",
    mapQuery: "Seoul, Korea",
    whenText: {
      ko: "2026년 5월 23일 (토) 오후 12:00",
      en: "Sat, May 23, 2026 12:00 PM",
      zh: "2026年5月23日（周六）12:00",
    },
    whereText: {
      ko: "서울 어딘가 예식장",
      en: "Wedding Hall, Seoul",
      zh: "首尔某婚礼殿堂",
    },
  },
};
