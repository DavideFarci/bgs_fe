<script setup>
// types
// import type { Game } from "../../api/game/types";

// composables
import { useRoute } from "vue-router";
import { GameClient } from "../../api/game/games";

import { computed, onBeforeMount, ref } from "vue";

const route = useRoute();
const gameId = computed(() => route.params.gameId);
const gameRef = ref({});

onBeforeMount(async () => {
  gameRef.value = await GameClient.getOne(gameId.value);
});
</script>

<template>
  <div>Vista di dettaglio del gioco {{ gameRef?.nome }}</div>
</template>
