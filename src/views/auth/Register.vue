<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../../api/auth/auth";
import type { RegisterData } from "../../api/auth/types";

const router = useRouter();

const form = ref<RegisterData>({
  username: "",
  email: "",
  password: "",
});

const error = ref("");
const success = ref(false);
const loading = ref(false);

const handleRegister = async () => {
  error.value = "";
  success.value = false;
  loading.value = true;
  try {
    await register(form.value);
    success.value = true;

    setTimeout(() => {
      router.push({ name: "dashboard" });
    }, 1500);
  } catch (err: any) {
    if (err.response && err.response.data) {
      error.value = JSON.stringify(err.response.data);
    } else {
      error.value = "Errore durante la registrazione";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 class="text-2xl font-bold text-center">Registrazione</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="form.username"
            id="username"
            type="text"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="form.password"
            id="password"
            type="password"
            required
            class="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
          :disabled="loading"
        >
          {{ loading ? "Registrazione in corso..." : "Registrati" }}
        </button>
      </form>

      <div v-if="error" class="text-red-500 text-sm text-center mt-4">
        {{ error }}
      </div>
      <div v-if="success" class="text-green-500 text-sm text-center mt-4">
        Registrazione avvenuta! Redirect in corso...
      </div>
    </div>
  </div>
</template>
