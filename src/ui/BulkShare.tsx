import { useState, useCallback } from "react";
import type { Language } from "./i18n";
import { shareKakao } from "../kakao";
import {
  bulkShareContainer,
  headerRow,
  backButton,
  pageTitle,
  recipientList,
  recipientItem,
  recipientInfo,
  recipientName,
  recipientLang,
  removeButton,
  addForm,
  nameInput,
  langSelect,
  addButton,
  sendAllButton,
  emptyState,
  sendingOverlay,
  sendingText,
} from "./BulkShare.css";

type Recipient = {
  id: string;
  name: string;
  language: Language;
};

const LANGUAGE_LABELS: Record<Language, string> = {
  ko: "한국어",
  en: "English",
  zh: "中文",
};

type Props = {
  imageUrl: string;
  onBack: () => void;
};

export function BulkShare({ imageUrl, onBack }: Props) {
  const [recipients, setRecipients] = useState<Recipient[]>(() => {
    const saved = localStorage.getItem("bulkShareRecipients");
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = useState("");
  const [newLang, setNewLang] = useState<Language>("ko");
  const [sending, setSending] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const saveRecipients = useCallback((list: Recipient[]) => {
    localStorage.setItem("bulkShareRecipients", JSON.stringify(list));
    setRecipients(list);
  }, []);

  const handleAdd = () => {
    if (!newName.trim()) return;

    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name: newName.trim(),
      language: newLang,
    };

    saveRecipients([...recipients, newRecipient]);
    setNewName("");
  };

  const handleRemove = (id: string) => {
    saveRecipients(recipients.filter((r) => r.id !== id));
  };

  const handleSendAll = async () => {
    if (recipients.length === 0) return;

    setSending(true);
    setCurrentIndex(0);

    for (let i = 0; i < recipients.length; i++) {
      setCurrentIndex(i);
      const recipient = recipients[i];

      shareKakao({
        title: "청첩장",
        description: "소중한 분들을 초대합니다.",
        imageUrl,
        recipientName: recipient.name,
        language: recipient.language,
      });

      // Wait for user to complete the share action
      if (i < recipients.length - 1) {
        await new Promise<void>((resolve) => {
          const handleFocus = () => {
            window.removeEventListener("focus", handleFocus);
            setTimeout(resolve, 500);
          };
          window.addEventListener("focus", handleFocus);
          // Fallback timeout
          setTimeout(() => {
            window.removeEventListener("focus", handleFocus);
            resolve();
          }, 10000);
        });
      }
    }

    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={bulkShareContainer}>
      <div className={headerRow}>
        <button type="button" className={backButton} onClick={onBack}>
          ← 돌아가기
        </button>
        <h1 className={pageTitle}>명단 관리</h1>
      </div>

      <div className={addForm}>
        <input
          type="text"
          className={nameInput}
          placeholder="이름"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <select
          className={langSelect}
          value={newLang}
          onChange={(e) => setNewLang(e.target.value as Language)}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
        <button type="button" className={addButton} onClick={handleAdd}>
          추가
        </button>
      </div>

      {recipients.length === 0 ? (
        <div className={emptyState}>
          아직 명단이 없습니다.
          <br />
          위에서 받는 분을 추가해주세요.
        </div>
      ) : (
        <>
          <ul className={recipientList}>
            {recipients.map((recipient) => (
              <li key={recipient.id} className={recipientItem}>
                <div className={recipientInfo}>
                  <span className={recipientName}>{recipient.name}</span>
                  <span className={recipientLang}>
                    {LANGUAGE_LABELS[recipient.language]}
                  </span>
                </div>
                <button
                  type="button"
                  className={removeButton}
                  onClick={() => handleRemove(recipient.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={sendAllButton}
            onClick={handleSendAll}
            disabled={sending}
          >
            {sending
              ? `전송 중... (${currentIndex + 1}/${recipients.length})`
              : `카카오톡으로 전송 (${recipients.length}명)`}
          </button>
        </>
      )}

      {sending && (
        <div className={sendingOverlay}>
          <div className={sendingText}>
            {recipients[currentIndex]?.name}님께 전송 중...
            <br />
            <small>카카오톡에서 전송을 완료해주세요</small>
          </div>
        </div>
      )}
    </div>
  );
}
