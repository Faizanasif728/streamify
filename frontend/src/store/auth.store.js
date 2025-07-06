import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// Set axios to send cookies with requests.
axios.defaults.withCredentials = true;

// Base URL for API requests.
// const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:8000/api/v1/account' : '/api/v1/account';

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  setError: () => set({ error: null }),
  /**
   * Signs up a new user with the provided username, email, and password.
   */
  signup: async (credentials) => {
    set({ user: null, isSigningUp: true, error: null });
    try {
      const res = await axios.post('/api/v1/account/signup', credentials);
      set({ user: res.data.user, isSigningUp: false });
    } catch (error) {
      set({ isSigningUp: false, error: error.response.data.message });
      throw error;
    }
  },

  /**
   * Logs in the user with the provided credentials.
   */
  login: async (credentials) => {
    set({ user: null, isLoggingIn: true, error: null });
    try {
      const res = await axios.post('/api/v1/account/login', credentials);
      set({ user: res.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, error: error.response.data.message });
      throw error;
    }
  },

  /**
   * Logs out the current user.
   *
   * This function sends a request to the server to log out the user.
   * It clears the user data from the store and sets the authentication status to false.
   */
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post('/api/v1/account/logout');
      set({ user: null, isLoggingOut: false });
      toast.success('Logged out successfully');
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || 'Failed to logout');
    }
  },

  /**
   * Checks the user's authentication status by making a request to the server.
   *
   * If the user is authenticated, it updates the store with the user's data and sets the authentication status to true.
   * If the user is not authenticated, it clears the user data from the store and sets the authentication status to false.
   */
  checkAuth: async () => {
    set({ user: null, isCheckingAuth: true });
    try {
      const res = await axios.get('/api/v1/account/auth');
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false });
    }
  },

  /**
   * Resets the user's password using the provided reset token and new password.
   *
   * This function makes a POST request to the server's reset password endpoint.
   * If the reset token is valid and the new password is provided, the server resets the user's password.
   */
  resetPassword: async (resetToken, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/api/v1/account/reset/password/${resetToken}`, { password: newPassword });
      set({ isLoading: false, error: null });
    } catch (error) {
      set({ error: error.response.data.message || 'Error resetting password', isLoading: false });
      throw error;
    }
  },
}));
