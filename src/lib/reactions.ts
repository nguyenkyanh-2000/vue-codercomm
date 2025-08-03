import { ThumbsUp, Heart, Laugh, Angry, Frown } from "lucide-vue-next";

export const REACTION_EMOJIS = [
  {
    emoji: "LIKE",
    icon: ThumbsUp,
    textColor: "text-green-500",
    borderColor: "border-green-500",
  },
  {
    emoji: "LOVE",
    icon: Heart,
    textColor: "text-pink-300",
    borderColor: "border-pink-300",
  },
  {
    emoji: "HAHA",
    icon: Laugh,
    textColor: "text-yellow-500",
    borderColor: "border-yellow-500",
  },
  {
    emoji: "SAD",
    icon: Frown,
    textColor: "text-blue-500",
    borderColor: "border-blue-500",
  },
  {
    emoji: "ANGRY",
    icon: Angry,
    textColor: "text-red-500",
    borderColor: "border-red-500",
  },
];

export type ReactionEmoji = (typeof REACTION_EMOJIS)[number]["emoji"];
