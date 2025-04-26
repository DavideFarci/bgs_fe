<script setup lang="ts"></script>

<template>
  <div>
    <header>
      <nav class="h-20 border-b bg-white shadow-md">
        <ul
          class="max-w-6xl mx-auto h-full flex items-center gap-10 text-lg font-medium text-gray-700"
        >
          <li class="hover:text-blue-600 transition">
            <router-link :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="hover:text-blue-600 transition">
            <router-link :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="hover:text-blue-600 transition">
            <router-link :to="{ name: 'register' }">Register</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>
