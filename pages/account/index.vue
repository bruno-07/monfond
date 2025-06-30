<template>
  <div class="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">
        Bienvenue, {{ authStore.user ? authStore.user.username : 'utilisateur' }} !
      </h2>
      <p class="mt-4 text-center text-lg text-gray-600">
        Ceci est votre tableau de bord de compte.
        Vous êtes connecté avec l'email: <span class="font-medium text-primary">{{ authStore.user ? authStore.user.email : 'N/A' }}</span>
      </p>
      <div class="mt-6 flex ">
        <button @click="handleLogout"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Déconnexion
        </button>
        <NuxtLink 
                to="/"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Boutique
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

// Protection de la route : si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion.
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
  }
  // Tente de récupérer les données utilisateur si un token existe mais que l'objet user est vide (par ex. après un rechargement)
  authStore.fetchUserWithToken();
});

// Gère la déconnexion
const handleLogout = async () => {
  await authStore.logout();
  router.push('/'); // Redirige vers la page d'accueil après déconnexion
};
</script>

<style scoped>
/* Styles spécifiques à cette page si nécessaire */
</style>