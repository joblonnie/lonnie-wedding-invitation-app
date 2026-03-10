const S = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" } as const;
const L = { stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** 하트 두 개 - 우리 이야기 */
export function IconStory() {
  return (
    <svg {...S}>
      <path d="M9 12c-1.5-4 3-7 5.5-3.5C17 4.5 21.5 7.5 20 12c-1.2 3.5-6.5 8-6.5 8S9.8 14.5 9 12z" {...L} />
      <path d="M4.5 9c-1-2.5 2-4.5 3.5-2.2C9.5 4.3 12.5 6 11.5 9c-.8 2.2-4 5-4 5S5 10.5 4.5 9z" {...L} opacity="0.5" />
    </svg>
  );
}

/** 반지 - 예식 안내 */
export function IconCeremony() {
  return (
    <svg {...S}>
      <ellipse cx="14" cy="16" rx="7.5" ry="7" {...L} />
      <path d="M10 10.5c1-2 3-3 4-3s3 1 4 3" {...L} />
      {/* 보석 */}
      <path d="M12 10l2-3.5 2 3.5" {...L} />
      <line x1="14" y1="6.5" x2="14" y2="4" {...L} />
      <line x1="12" y1="7.5" x2="10.5" y2="5.5" {...L} opacity="0.5" />
      <line x1="16" y1="7.5" x2="17.5" y2="5.5" {...L} opacity="0.5" />
    </svg>
  );
}

/** 카메라 - 갤러리 */
export function IconGallery() {
  return (
    <svg {...S}>
      <rect x="4" y="9" width="20" height="14" rx="3" {...L} />
      <path d="M10 9l1.5-3h5L18 9" {...L} />
      <circle cx="14" cy="16" r="4" {...L} />
      <circle cx="14" cy="16" r="1.5" {...L} opacity="0.4" />
      <circle cx="20" cy="12" r="1" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** 지도 핀 - 오시는 길 */
export function IconMap() {
  return (
    <svg {...S}>
      <path d="M14 3c-4.5 0-8 3.3-8 7.5C6 16 14 25 14 25s8-9 8-14.5C22 6.3 18.5 3 14 3z" {...L} />
      <circle cx="14" cy="10.5" r="3" {...L} />
      {/* 작은 깃발 느낌 */}
      <path d="M14 7.5v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** 연필+종이 - 방명록 */
export function IconGuestbook() {
  return (
    <svg {...S}>
      {/* 종이 */}
      <path d="M7 4h10l4 4v16H7V4z" {...L} />
      <path d="M17 4v4h4" {...L} />
      {/* 글줄 */}
      <line x1="10" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="15.5" x2="16" y2="15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      {/* 연필 */}
      <path d="M20 18l3.5-3.5c.5-.5.5-1.2 0-1.7l-.3-.3c-.5-.5-1.2-.5-1.7 0L18 16l-.5 2.5L20 18z" {...L} />
    </svg>
  );
}
