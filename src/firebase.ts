import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue } from "firebase/database";

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

// 좋아요 카운트 참조
const celebrationRef = ref(database, "celebration/count");

// 좋아요 수 실시간 구독
export function subscribeToCelebrationCount(callback: (count: number) => void) {
  return onValue(celebrationRef, (snapshot) => {
    const count = snapshot.val() ?? 0;
    callback(count);
  });
}

// 좋아요 증가
export async function incrementCelebration() {
  await runTransaction(celebrationRef, (currentCount) => {
    return (currentCount ?? 0) + 1;
  });
}

// 좋아요 감소
export async function decrementCelebration() {
  await runTransaction(celebrationRef, (currentCount) => {
    return Math.max(0, (currentCount ?? 0) - 1);
  });
}
