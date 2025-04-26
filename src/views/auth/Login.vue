<script setup lang="ts">
import { ref } from "vue";
import { login } from "../../api/auth/auth";
import type { LoginData } from "../../api/auth/types";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref<LoginData>({
  username: "",
  password: "",
});

const error = ref<string | null>(null);

const handleLogin = async () => {
  try {
    error.value = "";
    await login(form.value);
    router.replace({ name: "dashboard" });
  } catch (e) {
    error.value = "Login fallito";
  }
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="form.username" placeholder="Username" />
    <input type="password" v-model="form.password" placeholder="Password" />
    <button type="submit">Login</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>
