import type { ReactNode } from "react";
import * as s from "./EnvelopeOpening.css";

type Props = {
  phase: "sealed" | "opening" | "revealed";
  onSkip: () => void;
  tapToOpenText: string;
  children: ReactNode;
};

export function EnvelopeOpening({
  phase,
  onSkip,
  tapToOpenText,
  children,
}: Props) {
  const isOpen = phase === "opening" || phase === "revealed";
  const isRevealed = phase === "revealed";

  return (
    <>
      <div
        className={`${s.overlay} ${isRevealed ? s.overlayHidden : ""}`}
        onClick={onSkip}
      >
        <div className={s.envelope}>
          <div className={s.envelopeBody}>
            {/* Flap */}
            <div className={s.flapContainer}>
              <div
                className={`${s.flap} ${isOpen ? s.flapOpen : ""}`}
              />
            </div>

            {/* Card inside */}
            <div
              className={`${s.cardInner} ${isOpen ? s.cardSlideUp : ""}`}
            >
              <span className={s.sealIcon}>&hearts;</span>
            </div>

            {/* Wax seal */}
            <div
              className={`${s.waxSeal} ${isOpen ? s.waxSealHidden : ""}`}
            >
              <span className={s.sealIcon}>&hearts;</span>
            </div>
          </div>

          {!isOpen && <div className={s.tapHint}>{tapToOpenText}</div>}
        </div>
      </div>

      {children}
    </>
  );
}
