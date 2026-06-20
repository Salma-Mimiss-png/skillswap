import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDO5kVF3gIb_TwEkeGcZolPhT0tKta6jU8",
  authDomain: "skillswap-e80c9.firebaseapp.com",
  projectId: "skillswap-e80c9",
  storageBucket: "skillswap-e80c9.firebasestorage.app",
  messagingSenderId: "495663047280",
  appId: "1:495663047280:web:4b0b2367c73c22b43d4ab5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);