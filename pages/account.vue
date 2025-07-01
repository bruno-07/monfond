<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow p-4 flex justify-between items-center z-10">
       <NuxtLink to="/" class="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-primary transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.309L18.818 7 12 9.691 5.182 7 12 4.309zM4 9l8 4 8-4v6l-8 4-8-4V9z"/>
        </svg>
        <span class="font-barlow">MonShop</span>
      </NuxtLink>
      <div class="flex items-center space-x-4">
        <NuxtLink to="/cart" class="text-gray-700 hover:text-primary-500">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </NuxtLink>
        <button @click="authStore.logout()" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
          Déconnexion
        </button>
      </div>
    </header>

    <div class="flex flex-1 flex-col md:flex-row overflow-hidden">
      <div class="w-full md:w-64 bg-white shadow-md p-4 flex-shrink-0">
        <AccountSidebar />
      </div>

      <main class="flex-1 p-6 overflow-y-auto">
        <NuxtPage />
      </main>
    </div>

    <footer class="bg-gray-800 text-white p-6 text-center">
      <div class="container mx-auto">
        <p>&copy; {{ new Date().getFullYear() }} Votre Application. Tous droits réservés.</p>
        <div class="mt-4 flex justify-center space-x-6">
          <NuxtLink to="/legal/mentions-legales" class="text-gray-300 hover:text-white">Mentions Légales</NuxtLink>
          <NuxtLink to="/legal/politique-confidentialite" class="text-gray-300 hover:text-white">Politique de Confidentialité</NuxtLink>
          <NuxtLink to="/legal/cgv" class="text-gray-300 hover:text-white">CGV</NuxtLink>
          </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'; // Assurez-vous du bon chemin
import AccountSidebar from '~/components/AccountSidebar.vue'; // Nous allons créer ce fichier

const authStore = useAuthStore();

// Middleware pour protéger la route
definePageMeta({
  middleware: ['auth'] // Nous allons créer ce middleware
});
</script>

<style scoped>
/* Styles spécifiques si besoin */
</style>