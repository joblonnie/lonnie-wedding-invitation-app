import { useState, useEffect, useRef } from "react";
import { type Language, t } from "./i18n";
import {
  overlay,
  modal,
  title,
  inputGroup,
  label,
  input,
  buttons,
  cancelButton,
  confirmButton,
  kakaoButton,
} from "./ShareModal.css";
import { shareKakao } from "../kakao";

type Props = {
  language: Language;
  imageUrl: string;
  onClose: () => void;
  onShare: (name: string) => void;
};

export function ShareModal({ language, imageUrl, onClose, onShare }: Props) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const strings = t(language);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKakaoShare = () => {
    const success = shareKakao({
      title: strings.title,
      description: strings.subtitle,
      imageUrl,
      recipientName: name.trim(),
      language,
    });

    if (success) {
      onClose();
    } else {
      // Fallback to regular share
      onShare(name.trim());
    }
  };

  const handleUrlShare = () => {
    onShare(name.trim());
  };

  return (
    <div className={overlay} onClick={handleOverlayClick}>
      <div className={modal}>
        <h2 className={title}>{strings.shareTitle}</h2>

        <div className={inputGroup}>
          <label className={label}>{strings.recipientName}</label>
          <input
            ref={inputRef}
            className={input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={strings.recipientPlaceholder}
          />
        </div>

        <div className={buttons}>
          <button type="button" className={kakaoButton} onClick={handleKakaoShare}>
            {strings.kakaoShare}
          </button>
          <button type="button" className={confirmButton} onClick={handleUrlShare}>
            {strings.copyLink}
          </button>
        </div>

        <button type="button" className={cancelButton} onClick={onClose}>
          {strings.cancel}
        </button>
      </div>
    </div>
  );
}
