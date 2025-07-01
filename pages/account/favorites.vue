<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Mes favoris</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="loadingFavorites" class="text-center py-4">Chargement de vos favoris...</div>
      <div v-else-if="favorites.length === 0" class="text-center py-4 text-gray-600">
        Vous n'avez pas encore d'articles favoris.
        <br>
        <NuxtLink to="/" class="text-primary-600 hover:underline">Découvrir des produits</NuxtLink>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in favorites" :key="item.id" class="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <NuxtLink :to="`/products/${item.id}`">
            <img :src="item.imageUrl" :alt="item.name" class="w-full h-48 object-cover">
          </NuxtLink>
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 text-lg mb-1">{{ item.name }}</h3>
            <p class="text-gray-600 text-sm mb-2">{{ item.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-primary-700 font-bold text-lg">
                {{ item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' }) }}
              </span>
              <button @click="removeFavorite(item.id)" class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favorites = ref([]);
const loadingFavorites = ref(true);

const fetchFavorites = async () => {
  loadingFavorites.value = true;
  // --- Simulation de données de favoris ---
  await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai API
  favorites.value = [
    { id: 'prod1', name: 'Smartphone Pro', description: 'Un téléphone puissant et élégant.', price: 450000, imageUrl: 'https://via.placeholder.com/200/2563eb/FFFFFF?text=Smartphone' },
    { id: 'prod2', name: 'Casque Audio BT', description: 'Son immersif, confort optimal.', price: 75000, imageUrl: 'https://via.placeholder.com/200/10b981/FFFFFF?text=Casque' },
    { id: 'prod3', name: 'Montre Connectée', description: 'Suivez votre activité au quotidien.', price: 120000, imageUrl: 'https://via.placeholder.com/200/5000b3/FFFFFF?text=Montre' },
  ];
  // --- Fin de la simulation ---

  // --- Pour une intégration réelle avec Strapi, vous auriez besoin d'un type de contenu 'Favorite'
  // --- ou d'une relation Many-to-Many entre User et Product, puis une requête API :
  // try {
  //   const response = await authStore.apiCall('favorites?filters[user][id][$eq]=${authStore.user.id}&populate=product', 'GET');
  //   if (response && response.data) {
  //     favorites.value = response.data.map(item => ({
  //       id: item.attributes.product.data.id,
  //       name: item.attributes.product.data.attributes.name,
  //       description: item.attributes.product.data.attributes.description,
  //       price: item.attributes.product.data.attributes.price,
  //       imageUrl: item.attributes.product.data.attributes.image.data.attributes.url,
  //     }));
  //   }
  // } catch (e) {
  //   console.error("Erreur lors de la récupération des favoris:", e);
  // }
  loadingFavorites.value = false;
};

const removeFavorite = (itemId) => {
  // Logique pour retirer un article des favoris
  // Cela nécessiterait aussi un appel API à Strapi pour mettre à jour les favoris de l'utilisateur
  console.log(`Retirer l'article ${itemId} des favoris.`);
  favorites.value = favorites.value.filter(item => item.id !== itemId);
  // Appel API réel (exemple) :
  // authStore.apiCall(`favorites/${favoriteId}`, 'DELETE');
};

onMounted(() => {
  fetchFavorites();
});
</script>

<style scoped>
/* Vos couleurs primaires */
.text-primary-600 { color: #2563eb; }
/* Remplacez ces couleurs par celles de votre tailwind.config.js */
</style>