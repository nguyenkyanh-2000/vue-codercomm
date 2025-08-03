import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/lib/api";
import type { User } from "@/types";
import type { UserResponse } from "@/types/api";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchUser = async (userId: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response: UserResponse = await api.get(`/users/${userId}`);
      user.value = response.user;
    } catch (err: any) {
      console.error("Failed to fetch user:", err);
      error.value = err.response?.data?.message || "Failed to fetch user";
    } finally {
      isLoading.value = false;
    }
  };

  const resetStore = () => {
    user.value = null;
    error.value = null;
    isLoading.value = false;
  };

  return {
    user,
    isLoading,
    error,
    fetchUser,
    resetStore,
  };
});
