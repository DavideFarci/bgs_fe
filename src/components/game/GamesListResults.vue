<script setup>
const props = defineProps({
  onGamesResults: {
    type: Array,
    required: true,
  },
  onGetDetailsName: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    v-if="onGamesResults && onGamesResults.length > 0"
    class="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
  >
    <h1 class="text-2xl font-bold text-gray-800 mb-4">
      Seleziona un risultato
    </h1>
    <div
      v-for="game in onGamesResults"
      :key="game.name"
      class="flex justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 cursor-pointer transition"
      @click="onGetDetailsName(game)"
    >
      <div class="text-gray-700 font-medium">Titolo: {{ game.name }}</div>
      <div class="text-gray-600">Anno: {{ game.yearPublished }}</div>
    </div>
  </div>
</template>
