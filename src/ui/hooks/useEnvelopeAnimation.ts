import { useState, useEffect, useCallback } from "react";

export type EnvelopePhase = "sealed" | "opening" | "revealed";

export function useEnvelopeAnimation(autoOpenDelay = 800) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [phase, setPhase] = useState<EnvelopePhase>(
    prefersReduced ? "revealed" : "sealed"
  );

  const skip = useCallback(() => {
    setPhase("revealed");
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    if (phase !== "sealed") return;

    const timer = setTimeout(() => {
      setPhase("opening");
    }, autoOpenDelay);

    return () => clearTimeout(timer);
  }, [phase, autoOpenDelay, prefersReduced]);

  useEffect(() => {
    if (phase !== "opening") return;

    const timer = setTimeout(() => {
      setPhase("revealed");
    }, 2200);

    return () => clearTimeout(timer);
  }, [phase]);

  return { phase, skip };
}
