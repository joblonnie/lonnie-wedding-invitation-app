import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue, set, get } from "firebase/database";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

// Firebase 설정 - 환경변수 또는 직접 입력
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// 익명 인증
let currentUserId: string | null = null;

export function initAuth(): Promise<string> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUserId = user.uid;
        resolve(user.uid);
      } else {
        try {
          const result = await signInAnonymously(auth);
          currentUserId = result.user.uid;
          resolve(result.user.uid);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

// 좋아요 카운트 참조
const celebrationCountRef = ref(database, "celebration/count");

// 좋아요 수 실시간 구독
export function subscribeToCelebrationCount(callback: (count: number) => void) {
  return onValue(celebrationCountRef, (snapshot) => {
    const count = snapshot.val() ?? 0;
    callback(count);
  });
}

// 사용자 좋아요 여부 확인
export async function checkUserLiked(): Promise<boolean> {
  if (!currentUserId) return false;
  const userLikeRef = ref(database, `celebration/users/${currentUserId}`);
  const snapshot = await get(userLikeRef);
  return snapshot.val() === true;
}

// 사용자 좋아요 여부 실시간 구독
export function subscribeToUserLiked(callback: (liked: boolean) => void) {
  if (!currentUserId) {
    callback(false);
    return () => {};
  }
  const userLikeRef = ref(database, `celebration/users/${currentUserId}`);
  return onValue(userLikeRef, (snapshot) => {
    callback(snapshot.val() === true);
  });
}

// 좋아요 토글 (증가만 - 중복 클릭 허용)
export async function incrementCelebration() {
  if (!currentUserId) return;

  const userLikeRef = ref(database, `celebration/users/${currentUserId}`);

  // 사용자 좋아요 표시
  await set(userLikeRef, true);

  // 카운트 증가
  await runTransaction(celebrationCountRef, (currentCount) => {
    return (currentCount ?? 0) + 1;
  });
}

// 기존 함수 유지 (사용하지 않지만 호환성)
export async function decrementCelebration() {
  await runTransaction(celebrationCountRef, (currentCount) => {
    return Math.max(0, (currentCount ?? 0) - 1);
  });
}
