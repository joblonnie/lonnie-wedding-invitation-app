import type { Language } from "./i18n";
import { picker, pickerButton, pickerButtonActive, pickerLabel } from "./LanguagePicker.css";

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
  return (
    <div className={picker} role="group" aria-label="Language">
      {OPTIONS.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            className={`${pickerButton} ${isActive ? pickerButtonActive : ""}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            title={opt.label}
          >
            <span aria-hidden="true">{opt.flag}</span>
            <span className={pickerLabel}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

