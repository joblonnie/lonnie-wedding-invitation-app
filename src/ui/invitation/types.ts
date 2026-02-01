import type { SocialMeta } from "../meta/setSocialMeta";
import type { ThemeName } from "../theme/theme";

export type Invitation = {
  theme: ThemeName;
  meta: SocialMeta;
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
    whenText: { ko: string; en: string; zh: string };
    whereText: { ko: string; en: string; zh: string };
  };
};
