import { useState, useCallback, useEffect } from "react";
import {
  container,
  heartButton,
  heartIcon,
  heartIconActive,
  heartEmpty,
  heartFilled,
  miniHearts,
  miniHeart,
  heartsContainer,
  floatingHeart,
} from "./CelebrationButton.css";
import {
  subscribeToCelebrationCount,
  incrementCelebration,
  decrementCelebration,
} from "../firebase";

type FloatingHeart = {
  id: number;
  x: number;
};

const LIKED_KEY = "wedding_celebration_liked";

// 미니 하트 위치 (메인 하트 주변)
const MINI_HEART_POSITIONS = [
  { x: -20, y: -18, size: 10, delay: 0 },
  { x: 22, y: -14, size: 8, delay: 0.1 },
  { x: -18, y: 16, size: 9, delay: 0.15 },
  { x: 20, y: 18, size: 11, delay: 0.05 },
  { x: -8, y: -24, size: 7, delay: 0.2 },
  { x: 10, y: 22, size: 8, delay: 0.12 },
];

export function CelebrationButton() {
  const [liked, setLiked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LIKED_KEY) === "true";
    }
    return false;
  });
  const [count, setCount] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [animating, setAnimating] = useState(false);

  // Firebase에서 실시간 카운트 구독
  useEffect(() => {
    const unsubscribe = subscribeToCelebrationCount((newCount) => {
      setCount(newCount);
    });

    return () => unsubscribe();
  }, []);

  const handleClick = useCallback(async () => {
    setLiked(true);
    localStorage.setItem(LIKED_KEY, "true");
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    // 하트 올라가는 효과
    const newHearts: FloatingHeart[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 800);

    // Firebase에 저장
    await incrementCelebration();
  }, []);

  const showMiniHearts = count >= 2;

  return (
    <div className={container}>
      <div className={heartsContainer}>
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className={floatingHeart}
            style={{
              left: `calc(50% + ${heart.x}px)`,
              animationDelay: `${Math.random() * 0.15}s`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <button type="button" className={heartButton} onClick={handleClick}>
        {showMiniHearts && (
          <span className={miniHearts}>
            {MINI_HEART_POSITIONS.map((pos, i) => (
              <span
                key={i}
                className={miniHeart}
                style={{
                  left: pos.x,
                  top: pos.y,
                  fontSize: pos.size,
                  animationDelay: `${pos.delay}s`,
                }}
              >
                ♥
              </span>
            ))}
          </span>
        )}
        <span
          className={`${heartIcon} ${liked ? heartFilled : heartEmpty} ${animating ? heartIconActive : ""}`}
        >
          {liked ? "♥" : "♡"}
        </span>
      </button>
    </div>
  );
}
