<template>
  <div class="container mx-auto px-4 py-8 relative">
    <div v-if="productStore.loading" class="text-center py-8">
      <p class="text-lg text-gray-600">Chargement du produit...</p>
    </div>
    <div v-else-if="productStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
      <span class="block sm:inline">{{ productStore.error }}</span>
    </div>
    <div v-else-if="!productStore.product" class="text-center py-8">
      <p class="text-lg text-gray-600">Produit non trouvé.</p>
      <NuxtLink to="/" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700">
        Retour à la boutique
      </NuxtLink>
    </div>
    <div v-else>
      <div class="mb-6 flex items-center space-x-2 text-sm text-gray-600">
        <NuxtLink to="/" class="hover:underline">Accueil</NuxtLink>
        <span>></span>
        <span class="font-semibold">{{ productStore.product.name }}</span>
      </div>

      <div class="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
        <div class="md:w-1/2 flex justify-center items-center">
          <img
            :src="getProductImageUrl(productStore.product.image)"
            :alt="productStore.product.name"
            class="max-w-full h-auto rounded-lg shadow-md object-contain"
            v-if="productStore.product.image"
            style="max-height: 500px;"
          />
          <div v-else class="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500 text-lg rounded-lg">
            Image non disponible
          </div>
        </div>

        <div class="md:w-1/2 space-y-4">
          <h1 class="text-4xl font-extrabold text-gray-900">{{ productStore.product.name }}</h1>

          <div class="flex items-center text-yellow-500">
            <span class="flex">
              <svg v-for="i in 5" :key="i" :class="{'text-yellow-400': i <= 4, 'text-gray-300': i > 4}" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.922 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
            </span>
            <span class="ml-2 text-gray-600">(4.5 / 5)</span>
            <a href="#reviews" class="ml-2 text-primary-500 hover:underline text-sm">Lire les 120 avis</a>
          </div>

          <div class="flex items-baseline space-x-2">
            <p class="text-5xl font-extrabold text-primary-600">{{ formatCurrency(productStore.product.price) }}</p>
            </div>

          <div class="flex items-center space-x-2 text-sm">
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">Livraison Gratuite</span>
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">Nouveauté</span>
          </div>

          <p class="text-gray-700 text-lg leading-relaxed">{{ productStore.product.description.substring(0, 150) + '...' }}</p>

          <div class="space-y-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Couleur:</label>
              <div class="flex space-x-2">
                <button class="w-8 h-8 rounded-full border-2 border-primary-500 bg-red-500 focus:outline-none focus:ring-2 focus:ring-primary-500"></button>
                <button class="w-8 h-8 rounded-full border-2 border-gray-300 bg-blue-500 focus:outline-none focus:ring-2 focus:ring-primary-500"></button>
                <button class="w-8 h-8 rounded-full border-2 border-gray-300 bg-black focus:outline-none focus:ring-2 focus:ring-primary-500"></button>
              </div>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Taille:</label>
              <div class="flex space-x-2">
                <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">S</button>
                <button class="px-4 py-2 border border-primary-500 bg-primary-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">M</button>
                <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">L</button>
              </div>
            </div>
            <div>
              <label for="quantity" class="block text-gray-700 font-semibold mb-2">Quantité:</label>
              <input type="number" id="quantity" value="1" min="1" class="w-24 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 mt-6">
            <button class="flex-1 bg-primary-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              🛒 Ajouter au panier
            </button>
            <button class="flex-1 bg-green-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors duration-200">
              💳 Acheter maintenant
            </button>
          </div>
          <button class="w-full flex items-center justify-center space-x-2 mt-2 py-3 px-6 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-50 transition-colors duration-200">
            ❤️ Ajouter à la wishlist
          </button>

          <div class="mt-6 text-sm text-gray-600 space-y-2">
            <p class="flex items-center"><span class="text-green-500 mr-2">✅</span> Livraison rapide en 24/48h</p>
            <p class="flex items-center"><span class="text-green-500 mr-2">✅</span> Paiement 100% sécurisé</p>
            <p class="flex items-center"><span class="text-green-500 mr-2">✅</span> Retours faciles sous 30 jours</p>
          </div>
        </div>
      </div>

      <div class="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Détails du Produit</h2>
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              @click="activeTab = 'description'"
              :class="{'border-primary-500 text-primary-600': activeTab === 'description', 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'description'}"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              Description détaillée
            </button>
            <button
              @click="activeTab = 'specs'"
              :class="{'border-primary-500 text-primary-600': activeTab === 'specs', 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'specs'}"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              Spécifications techniques
            </button>
            <button
              @click="activeTab = 'reviews'"
              :class="{'border-primary-500 text-primary-600': activeTab === 'reviews', 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'reviews'}"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              Avis clients
            </button>
            <button
              @click="activeTab = 'faq'"
              :class="{'border-primary-500 text-primary-600': activeTab === 'faq', 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': activeTab !== 'faq'}"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
            >
              FAQ
            </button>
          </nav>
        </div>

        <div class="mt-6">
          <div v-if="activeTab === 'description'" class="prose max-w-none" v-html="productStore.product.description">
            </div>
          <div v-if="activeTab === 'specs'">
            <h3 class="text-xl font-semibold mb-3">Caractéristiques techniques (Exemple)</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
              <li>Dimensions: 10cm x 5cm x 2cm</li>
              <li>Poids: 150g</li>
              <li>Matériau: Aluminium brossé</li>
              <li>Connectivité: Bluetooth 5.0, USB-C</li>
              <li>Autonomie: Jusqu'à 10 heures</li>
            </ul>
          </div>
          <div v-if="activeTab === 'reviews'" id="reviews">
            <h3 class="text-xl font-semibold mb-3">Avis des clients (Exemple)</h3>
            <div class="space-y-4">
              <div class="border-b pb-4 last:border-b-0">
                <div class="flex items-center text-yellow-500 mb-1">
                  <span class="flex">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.922 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                  </span>
                  <span class="ml-2 text-sm text-gray-600">par Jean Dupont, 12/03/2025</span>
                </div>
                <p class="text-gray-800">"Produit excellent, je suis très satisfait de mon achat. La qualité est au rendez-vous et la livraison a été rapide."</p>
              </div>
              </div>
          </div>
          <div v-if="activeTab === 'faq'">
            <h3 class="text-xl font-semibold mb-3">Questions Fréquemment Posées (Exemple)</h3>
            <div class="space-y-3">
              <details class="bg-gray-50 p-3 rounded-md cursor-pointer">
                <summary class="font-semibold text-gray-800">Quelle est la durée de la garantie ?</summary>
                <p class="text-gray-700 mt-2">Ce produit est couvert par une garantie de 2 ans.</p>
              </details>
              <details class="bg-gray-50 p-3 rounded-md cursor-pointer">
                <summary class="font-semibold text-gray-800">Est-il compatible avec tous les appareils ?</summary>
                <p class="text-gray-700 mt-2">Il est compatible avec les appareils disposant d'une connectivité Bluetooth.</p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <svg class="h-12 w-12 text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 class="font-semibold text-lg text-gray-800">Paiement Sécurisé</h3>
          <p class="text-gray-600 text-sm">Vos transactions sont 100% protégées.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <svg class="h-12 w-12 text-blue-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 class="font-semibold text-lg text-gray-800">Livraison Rapide</h3>
          <p class="text-gray-600 text-sm">Recevez votre commande en 24/48h.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <svg class="h-12 w-12 text-purple-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 0A9 9 0 0012 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c1.927 0 3.702.623 5.166 1.688m0 0L14.364 9.636m0 0l-3.536 3.536m0 0L9 18l-3.536-3.536m0 0L5.636 18.364m12.728 0A9 9 0 0021 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c1.927 0 3.702-.623 5.166-1.688"></path></svg>
          <h3 class="font-semibold text-lg text-gray-800">Support Client 24/7</h3>
          <p class="text-gray-600 text-sm">Nous sommes là pour vous aider.</p>
        </div>
      </div>

      <div class="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Produits que vous pourriez aimer</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="border rounded-lg p-4 text-center">
            <div class="w-full h-32 bg-gray-200 mb-3 rounded-md"></div>
            <p class="font-semibold">Produit Associé {{ i }}</p>
            <p class="text-primary-600 font-bold mt-1">XXX XAF</p>
          </div>
        </div>
      </div>

      <div class="mt-12 bg-yellow-500 text-white p-4 text-center rounded-lg shadow-md">
        <p class="text-lg font-semibold">📦 Commandez dans les 2h 30min pour une livraison demain !</p>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 flex items-center justify-between z-40 md:hidden">
      <p class="text-2xl font-bold text-primary-600">{{ formatCurrency(productStore.product?.price) }}</p>
      <button class="bg-primary-600 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '~/stores/product';

const route = useRoute();
const productStore = useProductStore();
const activeTab = ref('description'); // Pour les onglets de description

// Exécute la récupération du produit au montage du composant, en utilisant le slug de l'URL
onMounted(async () => {
  const slug = route.params.slug;
  if (slug) {
    await productStore.fetchProductBySlug(slug);
  }
});

// Fonction utilitaire pour le formatage de la devise
const formatCurrency = (value) => {
  if (value === undefined || value === null) return ''; // Gérer le cas où la valeur est nulle au chargement
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF' }).format(value);
};

// Fonction pour construire l'URL de l'image Strapi
const getProductImageUrl = (image) => {
    const API_BASE_URL = 'https://mighty-kindness-3674f7b18e.strapiapp.com';
    if (image && image.data && image.data.attributes) {
        return `${API_BASE_URL}${image.data.attributes.url}`;
    }
    return ''; // Ou une image par défaut
};

// Utilisez `useHead` pour mettre à jour le titre de la page dynamiquement
useHead(() => ({
  title: productStore.product ? productStore.product.name : 'Produit',
  meta: [
    { name: 'description', content: productStore.product ? productStore.product.description.substring(0, 160) : 'Détails du produit' }
  ]
}));
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire, mais Tailwind devrait couvrir la plupart des besoins */

/* Pour les onglets: ajustez la couleur principale si nécessaire */
.border-primary-500 { border-color: var(--color-primary-500, #3B82F6); }
.text-primary-600 { color: var(--color-primary-600, #2563EB); }
.bg-primary-100 { background-color: var(--color-primary-100, #DBEAFE); }
.text-primary-500 { color: var(--color-primary-500, #3B82F6); }
.hover\:bg-primary-700:hover { background-color: var(--color-primary-700, #1D4ED8); }
.bg-primary-600 { background-color: var(--color-primary-600, #2563EB); }
</style>