<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { GameClient } from "../../api/game/games";
import { Game } from "../../api/game/types";
import GameComponent from "../../components/game/Game.vue";

const gamesList = ref<Game[]>([]);

const getGames = async () => {
  try {
    gamesList.value = await GameClient.getAll();
  } catch (err) {
    console.error("Errore nel recupero dei giochi:", err);
  }
};

onBeforeMount(async () => {
  await getGames();
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Lista giochi</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <GameComponent v-for="game in gamesList" :key="game.id" :onGame="game" />
    </div>
    <!-- Vista del gioco -->
    <router-view />
  </div>
</template>
