import { useState, useCallback, useEffect } from "react";
import type { Language } from "./i18n";
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
  recipientUrl,
  removeButton,
  addForm,
  nameInput,
  langSelect,
  addButton,
  actionButtons,
  copyAllButton,
  copyAllButtonSuccess,
  kakaoLoginButton,
  sendToMeButton,
  emptyState,
  copyUrlButton,
} from "./BulkShare.css";
import { initKakao, loginWithKakao, sendToMe, isKakaoLoggedIn } from "../kakao";

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
  onBack: () => void;
};

function buildShareUrl(name: string, language: Language): string {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.delete("mode");
  if (name) url.searchParams.set("to", name);
  if (language) url.searchParams.set("lang", language);
  return url.toString();
}

export function BulkShare({ onBack }: Props) {
  const [recipients, setRecipients] = useState<Recipient[]>(() => {
    const saved = localStorage.getItem("bulkShareRecipients");
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = useState("");
  const [newLang, setNewLang] = useState<Language>("ko");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);
  const [kakaoLoggedIn, setKakaoLoggedIn] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    const ready = initKakao();
    setKakaoReady(ready);
    if (ready) {
      setKakaoLoggedIn(isKakaoLoggedIn());
    }
  }, []);

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

  const handleCopyUrl = async (recipient: Recipient) => {
    const url = buildShareUrl(recipient.name, recipient.language);
    await navigator.clipboard.writeText(url);
    setCopiedId(recipient.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = async () => {
    const text = recipients
      .map((r) => {
        const url = buildShareUrl(r.name, r.language);
        return `${r.name}님 청첩장\n${url}`;
      })
      .join("\n\n");

    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleKakaoLogin = () => {
    loginWithKakao();
  };

  const handleSendToMe = async () => {
    if (recipients.length === 0) return;

    setSending(true);
    const text = recipients
      .map((r) => {
        const url = buildShareUrl(r.name, r.language);
        return `📩 ${r.name}님 청첩장\n${url}`;
      })
      .join("\n\n");

    const success = await sendToMe(text);
    setSending(false);

    if (success) {
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3000);
    } else {
      alert("메시지 전송에 실패했습니다. 다시 로그인해주세요.");
      setKakaoLoggedIn(false);
    }
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
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className={recipientName}>{recipient.name}</span>
                    <span className={recipientLang}>
                      {LANGUAGE_LABELS[recipient.language]}
                    </span>
                  </div>
                  <div className={recipientUrl}>
                    {buildShareUrl(recipient.name, recipient.language)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                  <button
                    type="button"
                    className={copyUrlButton}
                    onClick={() => handleCopyUrl(recipient)}
                  >
                    {copiedId === recipient.id ? "✓ 복사됨" : "복사"}
                  </button>
                  <button
                    type="button"
                    className={removeButton}
                    onClick={() => handleRemove(recipient.id)}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={actionButtons}>
            {kakaoReady && !kakaoLoggedIn && (
              <button
                type="button"
                className={kakaoLoginButton}
                onClick={handleKakaoLogin}
              >
                카카오 로그인
              </button>
            )}

            {kakaoReady && kakaoLoggedIn && (
              <button
                type="button"
                className={sendToMeButton}
                onClick={handleSendToMe}
                disabled={sending}
              >
                {sending
                  ? "전송 중..."
                  : sendSuccess
                  ? "✓ 전송 완료!"
                  : `나에게 보내기 (${recipients.length}명)`}
              </button>
            )}

            <button
              type="button"
              className={copiedAll ? copyAllButtonSuccess : copyAllButton}
              onClick={handleCopyAll}
            >
              {copiedAll ? "✓ 전체 복사됨!" : `전체 URL 복사 (${recipients.length}명)`}
            </button>
          </div>

          {kakaoLoggedIn ? (
            <p style={{ fontSize: 13, opacity: 0.6, textAlign: "center", marginTop: 16 }}>
              "나에게 보내기"로 카카오톡에서 URL을 받아 전달하세요
            </p>
          ) : (
            <p style={{ fontSize: 13, opacity: 0.6, textAlign: "center", marginTop: 16 }}>
              카카오 로그인하면 나에게 보내기 가능
            </p>
          )}
        </>
      )}
    </div>
  );
}
