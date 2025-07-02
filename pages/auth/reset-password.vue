<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Réinitialiser votre mot de passe
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Veuillez saisir votre nouveau mot de passe ci-dessous.
        </p>
      </div>

      <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ authStore.error }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="authStore.clearError()">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 11-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 011.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 011.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 010 1.698z"/></svg>
        </span>
      </div>

      <div v-if="authStore.successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ authStore.successMessage }}</span>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="new-password" class="sr-only">Nouveau mot de passe</label>
            <input
              id="new-password"
              name="newPassword"
              type="password"
              autocomplete="new-password"
              required
              v-model="newPassword"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirmer le nouveau mot de passe</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              v-model="confirmPassword"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm mt-3"
              placeholder="Confirmer le nouveau mot de passe"
            />
          </div>
        </div>

        <p v-if="passwordMismatch" class="text-red-500 text-sm mt-2">
          Les mots de passe ne correspondent pas.
        </p>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading || passwordMismatch || !resetCode"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="authStore.loading">Réinitialisation en cours...</span>
            <span v-else>Réinitialiser le mot de passe</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Chemin corrigé si nécessaire

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const newPassword = ref('');
const confirmPassword = ref('');
const resetCode = ref(''); // Pour stocker le code de l'URL

const passwordMismatch = computed(() => {
  return (newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value);
});

onMounted(() => {
  authStore.clearMessages(); // Utilise clearMessages du store
  if (route.query.code) {
    resetCode.value = route.query.code;
  } else {
    authStore.setError("Code de réinitialisation manquant dans l'URL. Veuillez vérifier votre lien.");
  }
});

const handleResetPassword = async () => {
  authStore.clearMessages(); // Utilise clearMessages du store

  if (!resetCode.value) {
    authStore.setError("Code de réinitialisation introuvable. Veuillez réessayer le processus de 'Mot de passe oublié'.");
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    authStore.setError("Les mots de passe ne correspondent pas.");
    return;
  }

  if (!newPassword.value) {
    authStore.setError("Veuillez saisir un nouveau mot de passe.");
    return;
  }

  // L'action resetPassword du store gère déjà les messages de succès et la redirection
  await authStore.resetPassword(resetCode.value, newPassword.value, confirmPassword.value);
};
</script>

<style scoped>
/* Assurez-vous que les couleurs primary sont définies dans tailwind.config.js */
.text-primary-500 { color: #007bff; }
.hover\:text-primary-900:hover { color: #0056b3; }
.bg-primary-500 { background-color: #007bff; }
.hover\:bg-primary-700:hover { background-color: #0056b3; }
.focus\:ring-primary-500:focus { box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }
.focus\:border-primary-500:focus { border-color: #007bff; }
</style>