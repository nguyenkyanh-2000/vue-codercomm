<template>
  <div class="max-w-2xl mx-auto space-y-6 py-10">
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile details.</CardDescription>
      </CardHeader>
      <CardContent class="space-y-6 pt-4">
        <PersonalDetailForm />
      </CardContent>
    </Card>

    <!-- Socials Card -->
    <Card>
      <CardHeader>
        <CardTitle>Socials</CardTitle>
        <CardDescription>Add your social media links here.</CardDescription>
      </CardHeader>
      <CardContent>
        <SocialDetailForm />
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PersonalDetailForm from "@/components/settings/PersonalDetailForm.vue";
import SocialDetailForm from "@/components/settings/SocialDetailForm.vue";
</script>
