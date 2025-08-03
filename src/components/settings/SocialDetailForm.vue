<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Facebook -->
    <FormField v-slot="{ componentField }" name="facebookLink">
      <FormItem>
        <FormLabel>Facebook</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="form.facebookLink"
            placeholder="https://facebook.com/yourprofile"
            type="url"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Instagram -->
    <FormField v-slot="{ componentField }" name="instagramLink">
      <FormItem>
        <FormLabel>Instagram</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="form.instagramLink"
            placeholder="https://instagram.com/yourprofile"
            type="url"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- LinkedIn -->
    <FormField v-slot="{ componentField }" name="linkedinLink">
      <FormItem>
        <FormLabel>LinkedIn</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="form.linkedinLink"
            placeholder="https://linkedin.com/in/yourprofile"
            type="url"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Twitter -->
    <FormField v-slot="{ componentField }" name="twitterLink">
      <FormItem>
        <FormLabel>Twitter</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="form.twitterLink"
            placeholder="https://twitter.com/yourprofile"
            type="url"
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
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { toast } from "@/components/ui/toast/use-toast";

const authStore = useAuthStore();
const currentUser = computed(() => authStore.currentUser);

const form = ref({
  facebookLink: currentUser.value?.facebookLink || "",
  instagramLink: currentUser.value?.instagramLink || "",
  linkedinLink: currentUser.value?.linkedinLink || "",
  twitterLink: currentUser.value?.twitterLink || "",
});

const originalForm = ref({ ...form.value });
const isSubmitting = ref(false);

// Watch for currentUser changes and update form
watch(
  currentUser,
  (newUser) => {
    if (newUser) {
      form.value = {
        facebookLink: newUser.facebookLink || "",
        instagramLink: newUser.instagramLink || "",
        linkedinLink: newUser.linkedinLink || "",
        twitterLink: newUser.twitterLink || "",
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

    const updateData = {
      facebookLink: form.value.facebookLink,
      instagramLink: form.value.instagramLink,
      linkedinLink: form.value.linkedinLink,
      twitterLink: form.value.twitterLink,
    };

    await authStore.updateUser(updateData);
    originalForm.value = { ...form.value };

    // Success feedback
    toast({
      title: "Success",
      description: "Social links updated successfully!",
    });
  } catch (error) {
    console.error("Failed to update social links:", error);
    // Error feedback
    toast({
      title: "Error",
      description: "Failed to update social links. Please try again.",
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
