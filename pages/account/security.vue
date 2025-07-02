<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Sécurité & mot de passe</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="authStore.loading" class="text-center py-4">Opération en cours...</div>
      <div v-else-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ authStore.error }}</span>
      </div>
      <div v-else-if="authStore.successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ authStore.successMessage }}</span>
      </div>

      <form @submit.prevent="handleChangePassword" class="space-y-4">
        <div>
          <label for="current-password" class="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
          <input type="password" id="current-password" v-model="currentPassword" required
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
          <input type="password" id="new-password" v-model="newPassword" required
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>

        <div v-if="passwordMismatch" class="text-red-500 text-sm">
          Les nouveaux mots de passe ne correspondent pas.
        </div>

        <div class="flex justify-end">
          <button type="submit" :disabled="authStore.loading || passwordMismatch"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="authStore.loading">Changement...</span>
            <span v-else>Changer le mot de passe</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'account', // Indique d'utiliser layouts/account.vue
  middleware: ['auth'] // Pour protéger la page (si applicable)
});

import { ref, computed, onMounted } from 'vue'; // Assurez-vous que onMounted est importé
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const passwordMismatch = computed(() => {
  return newPassword.value !== confirmPassword.value && newPassword.value !== '' && confirmPassword.value !== '';
});

// NOUVEAU : Efface les messages du store lorsque le composant est monté
onMounted(() => {
  authStore.clearMessages();
});

const handleChangePassword = async () => {
  authStore.clearMessages(); // Nettoie les messages précédents

  if (passwordMismatch.value) {
    authStore.setError("Les nouveaux mots de passe ne correspondent pas.");
    return;
  }

  const payload = {
    currentPassword: currentPassword.value,
    password: newPassword.value,
    passwordConfirmation: confirmPassword.value, // Strapi attend ce champ
  };

  const success = await authStore.changePassword(payload);

  if (success) {
    // Si le changement de mot de passe réussit, réinitialise les champs du formulaire
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  }
};
</script>

<style scoped>
/* Vos styles */
</style>