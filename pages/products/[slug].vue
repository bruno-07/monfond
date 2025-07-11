<template>
  <div v-if="productStore.loading" class="text-center py-8">
    <p class="text-lg text-gray-600">Chargement du produit...</p>
  </div>
  <div v-else-if="productStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
    <span class="block sm:inline">{{ productStore.error }}</span>
  </div>
  <div v-else-if="!productStore.product" class="text-center py-8">
    <p class="text-lg text-gray-600">Produit non trouvé.</p>
  </div>
  <div v-else class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          v-if="productStore.product.mainImage"
          :src="getProductImageUrl(productStore.product.mainImage)"
          :alt="productStore.product.name || 'Image produit'"
          class="w-full h-96 object-cover rounded-lg shadow-md"
        />
        <div v-else class="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
          Pas d'image disponible
        </div>
        </div>

      <div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ productStore.product.name }}</h1>
        <p class="text-gray-600 text-lg mb-4">{{ productStore.product.shortDescription }}</p>

        <div class="mb-6">
          <p v-if="productStore.product.ancienPrix" class="text-gray-500 line-through text-xl mr-2">
            {{ formatCurrency(productStore.product.ancienPrix) }}
          </p>
          <p class="text-3xl font-bold text-primary-600">
            {{ formatCurrency(productStore.product.price) }}
            <span v-if="productStore.product.prix_reduit && productStore.product.prix_reduit < productStore.product.price" class="text-lg text-red-500 ml-2">
              (Promo: {{ formatCurrency(productStore.product.prix_reduit) }})
            </span>
          </p>
        </div>

        <div class="mb-6">
          <p class="text-gray-700"><strong>Stock :</strong> {{ productStore.product.stock }}</p>
          <p v-if="productStore.product.weight" class="text-gray-700"><strong>Poids :</strong> {{ productStore.product.weight }} kg</p>
          <p v-if="productStore.product.dimensions" class="text-gray-700"><strong>Dimensions :</strong> {{ productStore.product.dimensions }} cm</p>
          <p v-if="productStore.product.brand" class="text-gray-700"><strong>Marque :</strong> {{ productStore.product.brand.name }}</p>
          <p v-if="productStore.product.category" class="text-gray-700"><strong>Catégorie :</strong> {{ productStore.product.category.name }}</p>
        </div>

        <div class="flex items-center space-x-4 mb-6">
          <input
            type="number"
            min="1"
            :max="productStore.product.stock"
            v-model.number="quantity"
            class="w-20 p-2 border border-gray-300 rounded-md text-center"
          />
          <button
            @click="addToCart"
            :disabled="quantity <= 0 || quantity > productStore.product.stock"
            class="bg-primary-500 text-white py-3 px-6 rounded-md hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ajouter au panier
          </button>
        </div>

        <div v-if="productStore.product.description" class="prose max-w-none">
          <h3 class="text-2xl font-semibold text-gray-800 mb-3">Description</h3>
          <p>{{ productStore.product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '~/stores/products'; 

const route = useRoute();
const productStore = useProductsStore(); 
const quantity = ref(1);

onMounted(async () => {
  const slug = route.params.slug;
  if (slug) {
    await productStore.loadProductBySlug(slug);
  } else {
    productStore.error = "URL de produit invalide : slug manquant.";
  }
});

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(value);
};

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

  return '/no-image.png';
};

const addToCart = () => {
  console.log(`Ajout de ${quantity.value} de ${productStore.product.name} au panier`);
};
</script>

<style scoped>
/* Vos styles ici */
</style>