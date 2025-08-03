<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-primary">CoderComm</h1>
        <h2 class="mt-6 text-2xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>

      <Card class="p-6">
        <Alert v-if="errorMessage" variant="destructive" class="mb-4">
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>

        <Form
          :validation-schema="registerSchema"
          :on-submit="onSubmit"
          class="space-y-4"
        >
          <FormField name="name" v-slot="{ field, errorMessage }">
            <Label for="name">Name</Label>
            <Input
              id="name"
              v-bind="field"
              type="text"
              placeholder="Enter your name"
              :class="{ 'border-destructive': errorMessage }"
            />
          </FormField>

          <FormField name="email" v-slot="{ field, errorMessage }">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-bind="field"
              type="email"
              placeholder="Enter your email"
              :class="{ 'border-destructive': errorMessage }"
            />
          </FormField>

          <FormField name="password" v-slot="{ field, errorMessage }">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-bind="field"
              type="password"
              placeholder="Enter your password"
              :class="{ 'border-destructive': errorMessage }"
            />
          </FormField>

          <Button type="submit" class="w-full" :disabled="authStore.isLoading">
            {{ authStore.isLoading ? "Creating account..." : "Sign up" }}
          </Button>
        </Form>

        <div class="mt-4 text-center">
          <p class="text-sm text-muted-foreground">
            Already have an account?
            <router-link to="/login" class="text-primary hover:underline">
              Sign in
            </router-link>
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { registerSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

const router = useRouter();
const authStore = useAuthStore();
const errorMessage = ref("");

const onSubmit = async (values: any, _actions: any) => {
  try {
    errorMessage.value = "";
    await authStore.register(values);
    router.push("/");
  } catch (error: any) {
    console.error("Registration failed:", error);
    errorMessage.value =
      error.response?.data?.message || "Registration failed. Please try again.";
  }
};
</script>
