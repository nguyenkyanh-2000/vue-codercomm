<template>
  <header
    class="sticky top-0 z-40 h-16 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="h-full container flex items-center justify-between">
      <div class="flex items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          class="lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu class="h-5 w-5" />
        </Button>

        <RouterLink
          to="/"
          class="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          CoderComm
        </RouterLink>
      </div>

      <DropdownMenu v-if="currentUser" :modal="false">
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="relative h-9 w-9 rounded-full">
            <Avatar class="h-9 w-9 border">
              <AvatarImage
                :src="currentUser.avatarUrl || ''"
                :alt="currentUser.name || 'User'"
              />
              <AvatarFallback>
                {{ getInitials(currentUser.name) }}
              </AvatarFallback>
            </Avatar>
            <span class="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">
                {{ currentUser.name || "User" }}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem as-child>
            <RouterLink to="/settings" class="cursor-pointer">
              <Settings class="mr-2 h-4 w-4" />
              <span>Settings</span>
            </RouterLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout" class="cursor-pointer">
            <LogOut class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { getInitials } from "@/utils/get-initials";
import { LogOut, Settings, Menu } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const authStore = useAuthStore();
const router = useRouter();
const currentUser = computed(() => authStore.currentUser);

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
