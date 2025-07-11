<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Nos Produits</h1>

    <div v-if="productsStore.loading" class="text-center py-8"> <p class="text-lg text-gray-600">Chargement des produits...</p>
    </div>
    <div v-else-if="productsStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"> <span class="block sm:inline">{{ productsStore.error }}</span>
    </div>
    <div v-else-if="productsStore.products.length === 0" class="text-center py-8"> <p class="text-lg text-gray-600">Aucun produit disponible pour le moment.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in productsStore.products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"> <NuxtLink :to="`/products/${product.slug}`">
          <img
            v-if="product.mainImage"
            :src="getProductImageUrl(product.mainImage)"
            :alt="product.name || 'Image produit'" class="w-full h-48 object-cover"
          />
          <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            Pas d'image
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h2> <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ product.shortDescription || (product.description ? product.description.substring(0, 100) + '...' : '') }}</p>
            <p class="text-2xl font-bold text-primary-600">{{ formatCurrency(product.price) }}</p>
          </div>
        </NuxtLink>
        <div class="p-4 border-t border-gray-200">
          <button class="w-full bg-primary-500 text-black py-2 px-4 rounded-md hover:bg-primary-600 transition-colors duration-200">
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductsStore } from '~/stores/products';

const productsStore = useProductsStore();

onMounted(async () => {
  await productsStore.loadAllData();
});

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(value);
};

// getProductImageUrl est déjà adapté à la structure d'image "plate" de votre API Strapi
const getProductImageUrl = (imageObject) => {
  const config = useRuntimeConfig();
  const API_BASE_URL = config.public.strapiBaseUrl.replace(/\/+$/, '');

  if (imageObject && imageObject.url) {
    if (imageObject.url.startsWith('http://') || imageObject.url.startsWith('https://')) {
      return imageObject.url;
    }
    return `${API_BASE_URL}${imageObject.url}`;
  }
  
  if (imageObject && imageObject.formats && imageObject.formats.thumbnail && imageObject.formats.thumbnail.url) {
    if (imageObject.formats.thumbnail.url.startsWith('http://') || imageObject.formats.thumbnail.url.startsWith('https://')) {
      return imageObject.formats.thumbnail.url;
    }
    return `${API_BASE_URL}${imageObject.formats.thumbnail.url}`;
  }

  return '/no-image.png'; // Assurez-vous d'avoir ce fichier dans votre dossier public
};
</script>

<style scoped>
/* Vos styles TailwindCSS ou CSS custom ici */
</style>