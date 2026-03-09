// === 인증 (localStorage UUID) ===

function getUserId(): string {
  let id = localStorage.getItem("wedding_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("wedding_user_id", id);
  }
  return id;
}

export function initAuth(): Promise<string> {
  return Promise.resolve(getUserId());
}

// === 해시 함수 (방명록 비밀번호용) ===

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash;
}

// === 축하 (Celebration) ===

export function subscribeToCelebration(callback: (data: { count: number; liked: boolean }) => void): () => void {
  let active = true;
  const userId = getUserId();

  const poll = async () => {
    try {
      const res = await fetch(`/api/celebration?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const data = await res.json();
        if (active) callback(data);
      }
    } catch {
      // ignore network errors
    }
  };

  poll();
  const interval = setInterval(poll, 3000);

  return () => {
    active = false;
    clearInterval(interval);
  };
}

export async function incrementCelebration(): Promise<void> {
  const userId = getUserId();
  await fetch("/api/celebration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
}

// === 방명록 (Guestbook) ===

export type GuestMessage = {
  id: string;
  name: string;
  message: string;
  passwordHash: number;
  timestamp: number;
};

export function subscribeToGuestMessages(callback: (messages: GuestMessage[]) => void): () => void {
  let active = true;

  const poll = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        if (active) callback(data.messages);
      }
    } catch {
      // ignore network errors
    }
  };

  poll();
  const interval = setInterval(poll, 3000);

  return () => {
    active = false;
    clearInterval(interval);
  };
}

export async function addGuestMessage(name: string, message: string, password: string): Promise<void> {
  await fetch("/api/guestbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      message,
      passwordHash: simpleHash(password),
      timestamp: Date.now(),
    }),
  });
}

export async function deleteGuestMessage(id: string, password: string): Promise<boolean> {
  const res = await fetch("/api/guestbook", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      passwordHash: simpleHash(password),
    }),
  });
  const data = await res.json();
  return data.success;
}
