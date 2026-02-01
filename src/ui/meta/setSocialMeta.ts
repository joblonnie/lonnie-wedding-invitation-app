type MetaText = { ko: string; en: string; zh: string };

export type SocialMeta = {
  title: MetaText;
  description: MetaText;
  imageUrl: string;
};

function setMetaByName(name: string, content: string) {
  const el = (document.querySelector(`meta[name="${name}"]`) ??
    document.head.appendChild(Object.assign(document.createElement("meta"), { name }))) as HTMLMetaElement;
  el.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  const el = (document.querySelector(`meta[property="${property}"]`) ??
    document.head.appendChild(
      Object.assign(document.createElement("meta"), { property }),
    )) as HTMLMetaElement;
  el.setAttribute("content", content);
}

export function setSocialMeta(meta: SocialMeta, language: "ko" | "en" | "zh" = "en") {
  document.title = meta.title[language] || meta.title.en;

  const url = window.location.href;
  const title = meta.title[language] || meta.title.en;
  const description = meta.description[language] || meta.description.en;

  setMetaByProperty("og:title", title);
  setMetaByProperty("og:description", description);
  setMetaByProperty("og:url", url);

  setMetaByName("twitter:title", title);
  setMetaByName("twitter:description", description);
  if (meta.imageUrl) {
    setMetaByProperty("og:image", meta.imageUrl);
    setMetaByName("twitter:image", meta.imageUrl);
  }
}
