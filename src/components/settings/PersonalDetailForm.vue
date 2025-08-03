<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Avatar and Name -->
    <div class="flex items-center gap-4">
      <Avatar class="h-16 w-16 border relative group">
        <AvatarImage :src="form.avatarUrl" :alt="form.name" />
        <AvatarFallback class="text-xl">
          {{ getInitials(form.name) }}
        </AvatarFallback>
      </Avatar>
      <div class="flex-1">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                v-model="form.name"
                placeholder="Enter your name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </div>

    <!-- Location Fields -->
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="city">
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              v-model="form.city"
              placeholder="Enter your city"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="country">
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              v-model="form.country"
              placeholder="Enter your country"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Work Fields -->
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="company">
        <FormItem>
          <FormLabel>Company</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              v-model="form.company"
              placeholder="Enter your company"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="jobTitle">
        <FormItem>
          <FormLabel>Job Title</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              v-model="form.jobTitle"
              placeholder="Enter your job title"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- About Me -->
    <FormField v-slot="{ componentField }" name="aboutMe">
      <FormItem>
        <FormLabel>About Me</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            v-model="form.aboutMe"
            placeholder="Tell us about yourself..."
            class="min-h-[100px]"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <Button
        type="submit"
        :disabled="isSubmitting || !isDirty"
        class="min-w-[120px]"
      >
        <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
        Save Changes
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getInitials } from "@/utils/get-initials";
import { Loader2 } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/components/ui/toast/use-toast";

const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

const form = ref({
  name: currentUser.value?.name || "",
  avatarUrl: currentUser.value?.avatarUrl || "",
  city: currentUser.value?.city || "",
  country: currentUser.value?.country || "",
  company: currentUser.value?.company || "",
  jobTitle: currentUser.value?.jobTitle || "",
  aboutMe: currentUser.value?.aboutMe || "",
});

const originalForm = ref({ ...form.value });
const isSubmitting = ref(false);

// Watch for currentUser changes and update form
watch(
  currentUser,
  (newUser) => {
    if (newUser) {
      form.value = {
        name: newUser.name || "",
        avatarUrl: newUser.avatarUrl || "",
        city: newUser.city || "",
        country: newUser.country || "",
        company: newUser.company || "",
        jobTitle: newUser.jobTitle || "",
        aboutMe: newUser.aboutMe || "",
      };
      originalForm.value = { ...form.value };
    }
  },
  { immediate: true }
);

const isDirty = computed(() => {
  return JSON.stringify(form.value) !== JSON.stringify(originalForm.value);
});

const onSubmit = async () => {
  try {
    isSubmitting.value = true;

    // Extract avatar file handling if needed (simplified for now)
    const updateData = {
      name: form.value.name,
      city: form.value.city,
      country: form.value.country,
      company: form.value.company,
      jobTitle: form.value.jobTitle,
      aboutMe: form.value.aboutMe,
    };

    await authStore.updateUser(updateData);
    originalForm.value = { ...form.value };

    // Success feedback
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    });
  } catch (error) {
    console.error("Failed to update profile:", error);
    // Error feedback
    toast({
      title: "Error",
      description: "Failed to update profile. Please try again.",
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
