import type { SocialMeta } from "../meta/setSocialMeta";
import type { ThemeName } from "../theme/theme";

export type Invitation = {
  theme: ThemeName;
  meta: SocialMeta;
  couple: {
    groom: { ko: string; en: string; zh: string };
    bride: { ko: string; en: string; zh: string };
    firstMet: Date;
    story?: { ko: string; en: string; zh: string };
  };
  photos: Array<{
    src: string;
    alt: { ko: string; en: string; zh: string };
  }>;
  event: {
    start: Date;
    end: Date;
    locationIcs: string;
    addressText: { ko: string; en: string; zh: string };
    mapEmbedUrl: string;
    mapQuery: string;
    lat: number;
    lng: number;
    whenText: { ko: string; en: string; zh: string };
    whereText: { ko: string; en: string; zh: string };
    transportation: {
      subway?: { ko: string; en: string; zh: string };
      bus?: { ko: string; en: string; zh: string };
      car?: { ko: string; en: string; zh: string };
      parking?: { ko: string; en: string; zh: string };
    };
  };
};
