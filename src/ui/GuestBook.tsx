import { useState, useEffect, useCallback, type FormEvent } from "react";
import type { Language } from "./i18n";
import { t } from "./i18n";
import {
  addGuestMessage,
  subscribeToGuestMessages,
  deleteGuestMessage,
  type GuestMessage,
} from "../firebase";
import {
  container,
  form,
  inputRow,
  inputField,
  textareaField,
  submitButton,
  messageList,
  messageCard,
  messageHeader,
  messageName,
  messageTime,
  messageText,
  deleteButton,
  loadMoreButton,
  emptyMessage,
} from "./GuestBook.css";

const PAGE_SIZE = 5;

function formatRelativeTime(timestamp: number, language: Language): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (language === "ko") {
    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  }
  if (language === "zh") {
    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  }
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function GuestBook({ language }: { language: Language }) {
  const strings = t(language);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToGuestMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !message.trim() || !password.trim()) return;

      setSubmitting(true);
      try {
        await addGuestMessage(name.trim(), message.trim(), password.trim());
        setName("");
        setMessage("");
        setPassword("");
      } finally {
        setSubmitting(false);
      }
    },
    [name, message, password]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const pw = prompt(strings.guestPasswordForDelete);
      if (!pw) return;

      const success = await deleteGuestMessage(id, pw);
      if (!success) {
        alert(strings.guestPasswordWrong);
      }
    },
    [strings]
  );

  const visibleMessages = messages.slice(0, visibleCount);
  const hasMore = visibleCount < messages.length;

  return (
    <div className={container}>
      <form className={form} onSubmit={handleSubmit}>
        <div className={inputRow}>
          <input
            className={inputField}
            type="text"
            placeholder={strings.guestNamePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
          />
          <input
            className={inputField}
            type="password"
            placeholder={strings.guestPasswordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={20}
          />
        </div>
        <textarea
          className={textareaField}
          placeholder={strings.guestMessagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
        />
        <button
          type="submit"
          className={submitButton}
          disabled={submitting || !name.trim() || !message.trim() || !password.trim()}
        >
          {strings.guestSubmit}
        </button>
      </form>

      {messages.length === 0 ? (
        <p className={emptyMessage}>{strings.guestEmpty}</p>
      ) : (
        <div className={messageList}>
          {visibleMessages.map((msg) => (
            <div key={msg.id} className={messageCard}>
              <div className={messageHeader}>
                <span className={messageName}>{msg.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className={messageTime}>
                    {formatRelativeTime(msg.timestamp, language)}
                  </span>
                  <button
                    type="button"
                    className={deleteButton}
                    onClick={() => handleDelete(msg.id)}
                  >
                    {strings.guestDelete}
                  </button>
                </div>
              </div>
              <p className={messageText}>{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          type="button"
          className={loadMoreButton}
          onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
        >
          {strings.guestLoadMore}
        </button>
      )}
    </div>
  );
}
