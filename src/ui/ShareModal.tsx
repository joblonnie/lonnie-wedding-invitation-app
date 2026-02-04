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
} from "./ShareModal.css";

type Props = {
  language: Language;
  onClose: () => void;
  onShare: (name: string) => void;
};

export function ShareModal({ language, onClose, onShare }: Props) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const strings = t(language);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare(name.trim());
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={overlay} onClick={handleOverlayClick}>
      <form className={modal} onSubmit={handleSubmit}>
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
          <button type="button" className={cancelButton} onClick={onClose}>
            {strings.cancel}
          </button>
          <button type="submit" className={confirmButton}>
            {strings.share}
          </button>
        </div>
      </form>
    </div>
  );
}
