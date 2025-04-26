<script setup lang="ts">
import { reactive, ref } from "vue";
// impot componenti
import SearchForGame from "../../components/game/SearchForGame.vue";
import GameForm from "../../components/game/GameForm.vue";
// import funzioni
// import { CreateGame } from "../../api/game/games";
import { GameClient } from "../../api/game/games";
import router from "../../router";

type Option = {
  id: number;
  type: "text" | "number";
  name: string;
  label: string;
};

type GameSelected = {
  nome: string;
  descrizione?: string;
  min_giocatori: number;
  max_giocatori: number;
  anno_di_pubblicazione?: string;
  autori?: string;
  artisti?: string;
  pubblicato_da?: string;
  params: Array<string>;
};

type Param = {
  nome: string;
};

const defaultGameSeleted = {
  nome: "",
  min_giocatori: 0,
  max_giocatori: 0,
  params: [],
};
const gameSelected = ref<GameSelected>(defaultGameSeleted);
const isOpenForm = ref(false);

const options = reactive<Option[]>([
  { id: 1, type: "text", name: "nome", label: "Nome*" },
  { id: 3, type: "text", name: "descrizione", label: "Descrizione" },
  {
    id: 4,
    type: "text",
    name: "anno_di_pubblicazione",
    label: "Anno di pubblicazione",
  },
  { id: 5, type: "text", name: "tempo_di_gioco", label: "Tempo di gioco" },
  { id: 5, type: "number", name: "min_giocatori", label: "Giocatori minimi*" },
  { id: 5, type: "number", name: "max_giocatori", label: "Giocatori massimi" },
  {
    id: 6,
    type: "text",
    name: "autori",
    label: "Autore/i (nomi separati da virgola)",
  },
  {
    id: 7,
    type: "text",
    name: "artisti",
    label: "Artista/i (nomi separati da virgola)",
  },
  {
    id: 8,
    type: "text",
    name: "pubblicato_da",
    label: "Pubblicato da (nomi separati da virgola)",
  },
  { id: 9, type: "text", name: "param-1", label: "Parametro 1*" },
]);

// METODI
const addParam = (): void => {
  const len = options.length;
  let l = options[len - 1].id + 1;
  options.push({
    id: l,
    type: "text",
    name: `param-${l - 8}`,
    label: `Parametro ${l - 8}`,
  });
};

const addGame = async (formValues: any) => {
  const params: Array<Param> = [];
  const param_values = Object.entries(formValues)
    .filter(([key, _]) => key.startsWith("param"))
    .map(([_, value]) => value);

  param_values.map((param) => {
    params.push({
      nome: param as string,
    });
  });

  formValues["params"] = params;

  try {
    GameClient.create(formValues);
    gameSelected.value = { ...defaultGameSeleted }; // pulizia form
    isOpenForm.value = false;
    router.push("games-list");
  } catch (error) {
    console.error(error);
    // throw new Error('Non è stato possibile creare il gioco')
  }
};

const handleGameSelected = (selectedGame: any) => {
  gameSelected.value = selectedGame;
  isOpenForm.value = true;
};
</script>

<template>
  <div
    class="container mx-auto py-8 max-w-2xl bg-white shadow-md rounded-xl p-6 border border-gray-300"
  >
    <h1 class="text-3xl font-bold text-gray-800 mb-2">Nuovo gioco</h1>
    <p class="text-gray-600 mb-4">
      Aggiungi un gioco alla tua collezione e inizia a tenere traccia delle tue
      partite
    </p>

    <SearchForGame @onGameSelected="handleGameSelected" />

    <p v-if="!isOpenForm" class="mt-4 text-gray-700">
      Non hai trovato quello che cercavi?
      <button
        class="font-bold text-blue-500 hover:underline"
        @click="isOpenForm = true"
      >
        Aggiungilo manualmente
      </button>
    </p>

    <GameForm
      :onOpen="isOpenForm"
      :onOptions="options"
      :onSelectedGame="gameSelected"
      :onAddGame="addGame"
      :onAddParam="addParam"
    />
  </div>
</template>
