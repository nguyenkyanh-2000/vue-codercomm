<template>
  <div class="container flex gap-4 py-6">
    <!-- Left Sidebar -->
    <div class="w-64 flex flex-col h-[calc(100vh-10rem)] sticky top-20">
      <div class="flex flex-col gap-2">
        <Button
          v-for="item in navItems"
          :key="item.label"
          variant="ghost"
          class="justify-start gap-4 h-12"
          as-child
        >
          <RouterLink :to="item.href">
            <component :is="item.icon" class="h-5 w-5" />
            <span class="text-lg">{{ item.label }}</span>
          </RouterLink>
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 max-w-2xl">
      <HomePostSection />
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 flex flex-col h-[calc(100vh-10rem)] sticky top-20 px-4">
      <div class="flex flex-col gap-6">
        <!-- Trending Topics -->
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-semibold">Trending Topics</h3>
          <div
            v-for="topic in trendingTopics"
            :key="topic.topic"
            class="flex flex-col gap-1"
          >
            <div class="flex items-center gap-2">
              <Hash class="h-4 w-4 text-muted-foreground" />
              <span class="font-medium">{{ topic.topic }}</span>
            </div>
            <span class="text-sm text-muted-foreground">
              {{ topic.posts }}
            </span>
          </div>
        </div>

        <!-- Suggested Users -->
        <div class="flex flex-col gap-4">
          <h3 class="text-lg font-semibold">You May Know</h3>
          <div class="flex flex-col gap-3">
            <div
              v-for="user in suggestedUsers"
              :key="user._id"
              class="flex items-center justify-between"
            >
              <RouterLink
                :to="`/users/${user._id}`"
                class="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity"
              >
                <Avatar class="h-10 w-10">
                  <AvatarImage :src="user.avatarUrl" />
                  <AvatarFallback>{{ getInitials(user.name) }}</AvatarFallback>
                </Avatar>
                <div class="flex flex-col">
                  <span class="font-medium">{{ user.name }}</span>
                </div>
              </RouterLink>
              <Button variant="outline" size="sm"> Follow </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Search,
  User,
  Settings,
  Hash,
  Users,
  Handshake,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import HomePostSection from "@/components/home/HomePostSection.vue";

const trendingTopics = [
  { topic: "React", posts: "25.4K posts" },
  { topic: "JavaScript", posts: "18.2K posts" },
  { topic: "TypeScript", posts: "12.8K posts" },
  { topic: "Web Development", posts: "9.5K posts" },
];

const navItems = [
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: User, label: "Profile", href: "/users/me" },
  // { icon: Handshake, label: "Requests", href: "/friend-requests" },
  // { icon: Users, label: "Friends", href: "/friends" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const suggestedUsers = [
  { _id: "techhub", name: "TechHub Academy" },
  { _id: "learnspace", name: "LearnSpace" },
];
</script>
