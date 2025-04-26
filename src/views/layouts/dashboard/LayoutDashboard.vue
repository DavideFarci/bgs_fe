<script setup lang="ts">
import { logout } from "../../../api/auth/auth";
import { useAuthGuard } from "../../../composables/useAuthGuard";
import { useRouter } from "vue-router";

const { user } = useAuthGuard();
console.log("user: ", user);
const router = useRouter();
const handleLogout = () => {
  logout();

  router.replace({ name: "home" });
};
</script>

<template>
  <div>
    <header>
      <nav class="h-20 border-b bg-white shadow-md">
        <ul
          class="max-w-6xl mx-auto h-full flex items-center gap-10 text-lg font-medium text-gray-700"
        >
          <li class="hover:text-blue-600 transition">
            <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
          </li>
          <li class="hover:text-blue-600 transition">
            <router-link :to="{ name: 'new-game' }">Aggiungi gioco</router-link>
          </li>
          <li class="hover:text-blue-600 transition">
            <router-link :to="{ name: 'games-list' }"
              >I tuoi giochi</router-link
            >
          </li>
          <li class="hover:text-blue-600 transition">
            <button @click="handleLogout()">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>
