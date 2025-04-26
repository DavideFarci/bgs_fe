<script setup>
const props = defineProps({
  onGame: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    :to="{ name: 'game', params: { gameId: onGame.id } }"
    v-if="onGame"
    class="bg-white rounded-2xl shadow-md p-4 flex flex-col"
  >
    <img
      v-if="onGame.immagine"
      :src="onGame.immagine"
      alt="Copertina gioco"
      class="w-full h-50 object-fill rounded-xl mb-4"
    />
    <div class="flex-grow">
      <h3 class="text-xl font-semibold">{{ onGame.nome }}</h3>
    </div>
  </RouterLink>
</template>
