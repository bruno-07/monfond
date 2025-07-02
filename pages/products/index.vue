<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Nos Produits</h1>

    <div v-if="productStore.loading" class="text-center py-8">
      <p class="text-lg text-gray-600">Chargement des produits...</p>
    </div>
    <div v-else-if="productStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
      <span class="block sm:inline">{{ productStore.error }}</span>
    </div>
    <div v-else-if="productStore.products.length === 0" class="text-center py-8">
      <p class="text-lg text-gray-600">Aucun produit disponible pour le moment.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in productStore.products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <NuxtLink :to="`/products/${product.slug}`">
          <img
            :src="getProductImageUrl(product.image)"
            :alt="product.name"
            class="w-full h-48 object-cover"
            v-if="product.image"
          />
          <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            Pas d'image
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h2>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            <p class="text-2xl font-bold text-primary-600">{{ formatCurrency(product.price) }}</p>
          </div>
        </NuxtLink>
        <div class="p-4 border-t border-gray-200">
          <button class="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 transition-colors duration-200">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/product'; // Assurez-vous du chemin correct

const productStore = useProductStore();

// Exécute la récupération des produits au montage du composant
onMounted(async () => {
  await productStore.fetchProducts();
});

// Fonction utilitaire pour le formatage de la devise
const formatCurrency = (value) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(value);
};

// Fonction pour construire l'URL de l'image Strapi
const getProductImageUrl = (image) => {
    // Vérifiez si l'objet image et son format 'thumbnail' ou 'small' existent
    // Adaptez 'url' et 'formats.thumbnail.url' selon la structure réelle de votre Strapi
    const API_BASE_URL = 'https://mighty-kindness-3674f7b18e.strapiapp.com'; // Ou importez-le depuis une config si c'est global
    if (image && image.data && image.data.attributes) {
        // Souvent, l'URL est dans formats.thumbnail.url ou directement dans url
        return `${API_BASE_URL}${image.data.attributes.url}`;
    }
    return ''; // Ou une image par défaut
};
</script>

<style scoped>
/* Vos styles spécifiques si besoin */
</style>