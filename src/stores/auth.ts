import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/lib/api";
import type { User } from "@/types";
import type { AuthResponse } from "@/types/api";
import { toast } from "@/components/ui/toast/use-toast";

export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref<User | null>(null);
  const isLoading = ref(false);
  const isInitialized = ref(false);
  const error = ref<string | null>(null);

  const setCurrentUser = (user: User | null) => {
    currentUser.value = user;
  };

  const init = async () => {
    try {
      error.value = null;
      const response: AuthResponse = await api.get("/users/me");
      setCurrentUser(response.user);
    } catch (err: any) {
      console.error("Failed to initialize user:", err);
      error.value = err.response?.data?.message || "Failed to initialize user";
    } finally {
      isInitialized.value = true;
    }
  };

  const login = async (data: { email: string; password: string }) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response: AuthResponse = await api.post("/auth/login", data);
      setCurrentUser(response.user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (err: any) {
      console.error("Login failed:", err);
      console.error("Auth store error response:", err.response);
      console.error("Auth store error response data:", err.response?.data);
      error.value = err.response?.data?.message || "Login failed";
      toast({
        title: "Login Failed",
        description: error.value || undefined,
        variant: "destructive",
      });
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      isLoading.value = true;
      error.value = null;
      const response: AuthResponse = await api.post("/auth/register", data);
      setCurrentUser(response.user);
      toast({
        title: "Account created!",
        description:
          "Welcome to CoderComm! Your account has been created successfully.",
      });
    } catch (err: any) {
      console.error("Registration failed:", err);
      error.value = err.response?.data?.message || "Registration failed";
      toast({
        title: "Registration Failed",
        description: error.value || undefined,
        variant: "destructive",
      });
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      await api.post("/auth/logout");
      setCurrentUser(null);
    } catch (err: any) {
      console.error("Logout failed:", err);
      error.value = err.response?.data?.message || "Logout failed";
      // Even if API call fails, clear local state
      setCurrentUser(null);
    } finally {
      isLoading.value = false;
    }
  };

  const updateUser = async (updateData: any) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await api.put("/users/me", updateData);
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (err: any) {
      console.error("Failed to update user:", err);
      error.value = err.response?.data?.message || "Failed to update user";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    currentUser,
    isLoading,
    isInitialized,
    error,
    setCurrentUser,
    init,
    login,
    register,
    logout,
    updateUser,
  };
});
