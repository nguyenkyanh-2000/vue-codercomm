import { Angry, Frown, Heart, Laugh, ThumbsUp } from "lucide-vue-next";
import type { Component } from "vue";

export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface EmojiConfig {
  emoji: string;
  icon: Component;
}

export const EMOJIS: EmojiConfig[] = [
  {
    emoji: "LIKE",
    icon: ThumbsUp,
  },
  {
    emoji: "LOVE",
    icon: Heart,
  },
  {
    emoji: "LAUGH",
    icon: Laugh,
  },
  {
    emoji: "SAD",
    icon: Frown,
  },
  {
    emoji: "ANGRY",
    icon: Angry,
  },
];
