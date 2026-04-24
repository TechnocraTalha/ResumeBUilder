import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../utils/firebase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  init: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },

  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  logIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  logOut: async () => {
    try {
      set({ loading: true, error: null });
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  clearError: () => set({ error: null })
}));
