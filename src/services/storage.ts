/**
 * Local Storage Wrapper (AsyncStorage / MMKV abstraction) for Offline Caching
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  },

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage setItem failed:', e);
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn('Storage removeItem failed:', e);
    }
  },
};
