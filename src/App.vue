<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const layoutComponent = computed(() => {
  // Usa direttamente il componente salvato nel meta
  return (
    route.meta.layout || (() => import("./views/layouts/guest/LayoutHome.vue"))
  );
});
</script>

<template>
  <component :is="layoutComponent" />
</template>
