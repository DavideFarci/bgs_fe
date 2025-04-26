<script setup lang="ts">
// types
import type { SelectedGame } from "../../api/game/types";
// import components
import GameDetails from "./GameDetails.vue";
import GamesListResults from "./GamesListResults.vue";
// all
import { ref } from "vue";

const emit = defineEmits(["onGameSelected"]);

const search = ref<string>("");
const gamesResults = ref<SelectedGame[]>([]);
const selectedGame = ref<SelectedGame>();
const detailsGame = ref({});
const isLoading = ref<boolean>(false);

const searchForGame = async () => {
  if (!search.value.trim()) {
    console.error("Il campo di ricerca è vuoto.");
    return;
  }

  try {
    isLoading.value = true;
    const response = await fetch(
      `/api/search?search=${encodeURIComponent(search.value.trim())}`
    );
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    const items = xmlDoc.querySelectorAll("boardgame");

    // controllo
    if (items.length === 0) {
      console.log("Nessun gioco trovato per la ricerca:", search.value);
      gamesResults.value = [];
      return;
    }

    // estrazione dei giochi riisultanti
    gamesResults.value = Array.from(items).map((item) => ({
      id: item.getAttribute("objectid") || "",
      name: item.querySelector("name")?.textContent || "",
      yearPublished: item.querySelector("yearpublished")?.textContent || "",
    }));
    isLoading.value = false;
  } catch (error) {
    console.error("Errore durante la chiamata all'API:", error);
  }
};

// chiamata dettagli del gioco selezionato
const getDetailsName = async (game: SelectedGame) => {
  selectedGame.value = game;
  gamesResults.value = [];
  try {
    isLoading.value = true;
    const response = await fetch(`/api/boardgame/${selectedGame.value?.id}`);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    const item = xmlDoc.querySelector("boardgame");

    // Controllo
    if (!item) {
      console.log("Nessun gioco trovato per la ricerca:", search.value);
      gamesResults.value = [];
      return;
    }

    // estrazione di tutte le chiavi del gioco
    detailsGame.value = {
      id: item.getAttribute("objectid"),
      name: item.querySelector('name[primary="true"]')?.textContent,
      thumbnail: item.querySelector("thumbnail")?.textContent,
      image: item.querySelector("image")?.textContent,
      description: item.querySelector("description")?.textContent,
      yearPublished: item.querySelector("yearpublished")?.textContent,
      minPlayers: item.querySelector("minplayers")?.textContent,
      maxPlayers: item.querySelector("maxplayers")?.textContent,
      minPlaytime: item.querySelector("minplaytime")?.textContent,
      maxPlaytime: item.querySelector("maxplaytime")?.textContent,
      minAge: item.querySelector("age")?.textContent,
      categories: Array.from(item.querySelectorAll("boardgamecategory")).map(
        (el) => el.textContent
      ),
      designers: Array.from(item.querySelectorAll("boardgamedesigner")).map(
        (el) => el.textContent
      ),
      artists: Array.from(item.querySelectorAll("boardgameartist")).map(
        (el) => el.textContent
      ),
      publishers: Array.from(item.querySelectorAll("boardgamepublisher")).map(
        (el) => el.textContent
      ),
    };
    isLoading.value = false;
    selectedGame.value = { id: "", name: "", yearPublished: "" };
  } catch (error) {
    console.log("Errore nel recupero dei dettagli: ", error);
  }
};

const handleSelectedGame = (game: any) => {
  detailsGame.value = [];
  emit("onGameSelected", game);
};
</script>

<template>
  <div
    class="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
  >
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Cerca un Gioco</h1>
    <div class="flex gap-2 mb-4">
      <input
        type="text"
        v-model="search"
        class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Inserisci il nome del gioco"
      />
      <button
        class="py-2 px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        @click="searchForGame"
      >
        Cerca
      </button>
    </div>
    <!-- Mostra il loader durante la ricerca -->
    <div v-if="isLoading" class="text-center text-gray-500">Caricamento...</div>

    <GamesListResults
      :onGamesResults="gamesResults"
      :onGetDetailsName="getDetailsName"
    />
    <GameDetails
      :onDetailsGame="detailsGame"
      @gameSelected="handleSelectedGame"
    />
  </div>
</template>
