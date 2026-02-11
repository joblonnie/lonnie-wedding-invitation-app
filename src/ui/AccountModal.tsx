import { useState, useCallback } from "react";
import type { Language } from "./i18n";
import { t } from "./i18n";
import type { BankAccount } from "./invitation/types";
import {
  overlay,
  modal,
  modalTitle,
  tabContainer,
  tab,
  tabActive,
  accountCard,
  bankName,
  accountNumber,
  holderName,
  copyButton,
  copyButtonCopied,
  closeButton,
} from "./AccountModal.css";

type Props = {
  language: Language;
  groomAccounts: BankAccount[];
  brideAccounts: BankAccount[];
  onClose: () => void;
};

export function AccountModal({ language, groomAccounts, brideAccounts, onClose }: Props) {
  const strings = t(language);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const accounts = activeTab === "groom" ? groomAccounts : brideAccounts;

  const handleCopy = useCallback(async (account: BankAccount, key: string) => {
    const text = `${account.bank} ${account.accountNumber} (${account.holder})`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <div className={overlay} onClick={onClose}>
      <div className={modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={modalTitle}>{strings.accountInfo}</h3>

        <div className={tabContainer}>
          <button
            type="button"
            className={`${tab} ${activeTab === "groom" ? tabActive : ""}`}
            onClick={() => setActiveTab("groom")}
          >
            {strings.groomSide}
          </button>
          <button
            type="button"
            className={`${tab} ${activeTab === "bride" ? tabActive : ""}`}
            onClick={() => setActiveTab("bride")}
          >
            {strings.brideSide}
          </button>
        </div>

        {accounts.map((account, index) => {
          const key = `${activeTab}-${index}`;
          const isCopied = copiedIndex === key;
          return (
            <div key={key} className={accountCard}>
              <div className={bankName}>{account.bank}</div>
              <div className={accountNumber}>{account.accountNumber}</div>
              <div className={holderName}>
                {strings.accountHolder}: {account.holder}
              </div>
              <button
                type="button"
                className={`${copyButton} ${isCopied ? copyButtonCopied : ""}`}
                onClick={() => handleCopy(account, key)}
              >
                {isCopied ? strings.copiedAccount : strings.copyAccount}
              </button>
            </div>
          );
        })}

        <button type="button" className={closeButton} onClick={onClose}>
          {strings.cancel}
        </button>
      </div>
    </div>
  );
}
