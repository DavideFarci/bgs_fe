<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  onOptions: {
    type: Array,
    required: true,
  },
  onAddGame: {
    type: Function,
    required: true,
  },
  onAddParam: {
    type: Function,
    required: true,
  },
  onOpen: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  onSelectedGame: {
    type: Object,
    required: false,
    default: () => undefined,
  },
});

const formValues = ref({});

watch(
  () => props.onSelectedGame,
  () => {
    formValues.value = props.onSelectedGame;
  }
);
</script>

<template>
  <form
    v-if="onOpen"
    @submit.prevent="onAddGame(formValues)"
    class="max-w-md mt-4 mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
  >
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Crea un Gioco</h2>
    <div v-for="op in onOptions" :key="op.id" class="flex flex-col mb-4">
      <label :for="op.name" class="text-gray-700 font-medium">{{
        op.label
      }}</label>
      <div class="flex items-center gap-2 mt-1">
        <input
          v-model="formValues[op.name]"
          :type="op.type"
          :id="op.name"
          :name="op.name"
          class="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click.prevent="onAddParam"
          v-if="op.label === 'Parametro 1*'"
          class="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          +
        </button>
      </div>
    </div>
    <button
      type="submit"
      class="w-full py-3 mt-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
    >
      Crea
    </button>
  </form>
</template>
