<template>
  <div class="relative w-full max-w-xs md:max-w-md">
    <input 
      type="text" 
      v-model="searchQuery" 
      @input="handleSearchInput" 
      placeholder="Rechercher des produits..." 
      class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
    />
    <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
// Les logiques de recherche, suggestions et debounce peuvent être ajoutées plus tard
const handleSearchInput = () => {
  // console.log("Recherche:", searchQuery.value);
  // Implémentation de la recherche et des suggestions ici
};

// const suggestions = ref([]);
// const showSuggestions = ref(false);
// const selectSuggestion = (item) => { /* ... */ };
</script>

<style scoped>
/* Aucun style spécifique supplémentaire n'est nécessaire si Tailwind est utilisé correctement */
</style>