import { useState, useRef, useEffect } from "react";
import type { Language } from "./i18n";
import {
  floatingContainer,
  toggleButton,
  dropdown,
  dropdownItem,
  dropdownItemActive,
  flag,
} from "./LanguagePicker.css";

type Option = {
  value: Language;
  label: string;
  flag: string;
};

const OPTIONS: Option[] = [
  { value: "ko", label: "한국어", flag: "🇰🇷" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "zh", label: "中文", flag: "🇨🇳" },
];

export function LanguagePicker({
  value,
  onChange,
}: {
  value: Language;
  onChange: (next: Language) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = OPTIONS.find((opt) => opt.value === value) ?? OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={floatingContainer} ref={containerRef}>
      <button
        type="button"
        className={toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 9h17M3.5 15h17" />
          <path d="M12 3c-3 3-3 9 0 18" />
          <path d="M12 3c3 3 3 9 0 18" />
        </svg>
      </button>

      {isOpen && (
        <div className={dropdown} role="menu">
          {OPTIONS.map((opt) => {
            const isActive = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="menuitem"
                className={`${dropdownItem} ${isActive ? dropdownItemActive : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <span className={flag}>{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
