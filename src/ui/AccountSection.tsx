import { useState, useCallback, useRef, useEffect } from "react";
import type { Language } from "./i18n";
import { t } from "./i18n";
import type { BankAccount } from "./invitation/types";
import {
  container,
  label,
  tabGroup,
  tabButton,
  tabButtonActive,
  tabButtonFirst,
  accountCard,
  bankName,
  accountNumber,
  holderName,
  copyButton,
  copyButtonCopied,
} from "./AccountSection.css";

type Props = {
  language: Language;
  groomAccounts: BankAccount[];
  brideAccounts: BankAccount[];
};

export function AccountSection({ language, groomAccounts, brideAccounts }: Props) {
  const strings = t(language);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const accounts = activeTab === "groom" ? groomAccounts : brideAccounts;

  const handleCopy = useCallback(async (account: BankAccount, key: string) => {
    const text = `${account.bank} ${account.accountNumber} (${account.holder})`;
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  const tabs = [
    { id: "groom" as const, label: strings.groomSide },
    { id: "bride" as const, label: strings.brideSide },
  ];

  return (
    <div className={container}>
      <p className={label}>{strings.accountInfo}</p>

      <div className={tabGroup}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${tabButton} ${activeTab === tab.id ? tabButtonActive : ""} ${i === 0 ? tabButtonFirst : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {accounts.map((account, i) => {
        const key = `${activeTab}-${i}`;
        const isCopied = copiedKey === key;
        return (
          <div key={key} className={accountCard}>
            <p className={bankName}>{account.bank}</p>
            <p className={accountNumber}>{account.accountNumber}</p>
            <p className={holderName}>{account.holder}</p>
            <button
              type="button"
              onClick={() => handleCopy(account, key)}
              className={`${copyButton} ${isCopied ? copyButtonCopied : ""}`}
            >
              {isCopied ? strings.copiedAccount : strings.copyAccount}
            </button>
          </div>
        );
      })}
    </div>
  );
}
