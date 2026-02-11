import { useState, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";
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
  initAuth,
  subscribeToCelebrationCount,
  subscribeToUserLiked,
  incrementCelebration,
} from "../firebase";
import { THEME_CONFETTI_COLORS } from "./theme/theme";
import type { ThemeName } from "./theme/theme";

type Props = { themeName?: ThemeName };

type FloatingHeart = {
  id: number;
  x: number;
};

// 미니 하트 위치 (메인 하트 주변)
const MINI_HEART_POSITIONS = [
  { x: -20, y: -18, size: 10, delay: 0 },
  { x: 22, y: -14, size: 8, delay: 0.1 },
  { x: -18, y: 16, size: 9, delay: 0.15 },
  { x: 20, y: 18, size: 11, delay: 0.05 },
  { x: -8, y: -24, size: 7, delay: 0.2 },
  { x: 10, y: 22, size: 8, delay: 0.12 },
];

export function CelebrationButton({ themeName = "botanical" }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [animating, setAnimating] = useState(false);

  // Firebase 인증 초기화
  useEffect(() => {
    initAuth()
      .then(() => setIsReady(true))
      .catch(console.error);
  }, []);

  // Firebase에서 실시간 카운트 구독
  useEffect(() => {
    const unsubscribe = subscribeToCelebrationCount((newCount) => {
      setCount(newCount);
    });

    return () => unsubscribe();
  }, []);

  // Firebase에서 사용자 좋아요 여부 구독
  useEffect(() => {
    if (!isReady) return;

    const unsubscribe = subscribeToUserLiked((userLiked) => {
      setLiked(userLiked);
    });

    return () => unsubscribe();
  }, [isReady]);

  const handleClick = useCallback(async () => {
    setLiked(true);
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

    // Confetti 축포 효과
    const colors = THEME_CONFETTI_COLORS[themeName ?? "botanical"];
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors,
    });
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 250);

    // Firebase에 저장
    await incrementCelebration();
  }, [themeName]);

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
