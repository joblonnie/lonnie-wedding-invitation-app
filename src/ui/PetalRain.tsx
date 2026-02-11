import { useEffect, useRef } from "react";
import { canvasOverlay } from "./PetalRain.css";

type Props = { active: boolean };

const PETAL_COLORS = ["#ffffff", "#e8f5e3", "#d4edda", "#fce4ec"];

type Petal = {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
};

function createPetal(canvasWidth: number, canvasHeight: number): Petal {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight * -1,
    rotation: Math.random() * Math.PI * 2,
    speed: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    swayOffset: Math.random() * Math.PI * 2,
    swaySpeed: 0.3 + Math.random() * 0.7,
  };
}

export function PetalRain({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    if (!active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(rafRef.current);
      petalsRef.current = [];
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const petalCount = window.innerWidth <= 320 ? 15 : 25;
    petalsRef.current = Array.from({ length: petalCount }, () =>
      createPetal(canvas.width, canvas.height),
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const petal of petalsRef.current) {
        petal.y += petal.speed;
        petal.x +=
          Math.sin(petal.y * 0.01 + petal.swayOffset) * petal.swaySpeed;
        petal.rotation += 0.02;

        if (petal.y > canvas.height) {
          petal.y = -petal.size;
          petal.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = petal.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size * 0.5, petal.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className={canvasOverlay} />;
}
