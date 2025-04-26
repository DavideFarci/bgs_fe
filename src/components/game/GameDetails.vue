<script setup>
import { computed } from 'vue';

const props = defineProps({
  onDetailsGame: {
    type: Object,
    required: false,
    default: () => {},
  },
});

const selectedGame = computed(() => {
  const g = props.onDetailsGame;
  return {
    nome: g.name,
    descrizione: g.description,
    anno_di_pubblicazione: g.yearPublished,
    n_giocatori: `${g.minPlayers} - ${g.maxPlayers}`,
    min_giocatori: g.minPlayers,
    max_giocatori: g.maxPlayers,
    tempo_di_gioco: g.maxPlaytime,
    categorie: g.categories?.length ? g.categories.join(", ") : "Nessuna",
    artisti: g.artists?.length ? g.artists.join(", ") : "Nessuno",
    autori: g.designers?.length ? g.designers.join(", ") : "Nessuno",
    pubblicato_da: g.publishers?.length ? g.publishers.join(", ") : "Nessuno",
    immagine: g.thumbnail,
  };
});
</script>

<template>
  <div
    v-if="onDetailsGame && Object.keys(onDetailsGame).length > 0"
    class="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
  >
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Dettagli del Gioco</h2>
    <p class="text-gray-700"><strong>Nome:</strong> {{ onDetailsGame.name }}</p>
    <p class="text-gray-600 mt-1">
      <strong>Descrizione:</strong> {{ onDetailsGame.description }}
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Anno di Pubblicazione:</strong> {{ onDetailsGame.yearPublished }}
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Numero di Giocatori:</strong> {{ onDetailsGame.minPlayers }} -
      {{ onDetailsGame.maxPlayers }}
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Tempo di Gioco:</strong> {{ onDetailsGame.minPlaytime }} -
      {{ onDetailsGame.maxPlaytime }} minuti
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Età Minima:</strong> {{ onDetailsGame.minAge }} anni
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Categorie:</strong>
      {{
        onDetailsGame.categories?.length
          ? onDetailsGame.categories.join(", ")
          : "Nessuna"
      }}
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Designer:</strong>
      {{
        onDetailsGame.designers?.length
          ? onDetailsGame.designers.join(", ")
          : "Nessuno"
      }}
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Artisti:</strong>
      {{
        onDetailsGame.artists?.length
          ? onDetailsGame.artists.join(", ")
          : "Nessuno"
      }}
    </p>
    <p class="text-gray-700 mt-1">
      <strong>Publisher:</strong>
      {{
        onDetailsGame.publishers?.length
          ? onDetailsGame.publishers.join(", ")
          : "Nessuno"
      }}
    </p>
    <img
      v-if="onDetailsGame.thumbnail"
      :src="onDetailsGame.thumbnail"
      alt="Immagine del gioco"
      class="mt-4 w-full h-48 object-cover rounded-lg shadow-sm"
    />
    <button @click="$emit('gameSelected', selectedGame)">Aggiungi</button>
  </div>
</template>
