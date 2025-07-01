<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Sécurité & mot de passe</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Changer votre mot de passe</h2>

      <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ authStore.error }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="authStore.clearMessages()">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 11-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 011.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 011.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 010 1.698z"/></svg>
        </span>
      </div>

      <div v-if="authStore.successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ authStore.successMessage }}</span>
      </div>

      <form @submit.prevent="changePassword" class="space-y-4 max-w-md">
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
          <label for="confirm-new-password" class="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
          <input type="password" id="confirm-new-password" v-model="confirmNewPassword" required
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
          <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Les mots de passe ne correspondent pas.</p>
        </div>

        <div>
          <button type="submit" :disabled="authStore.loading || passwordMismatch"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="authStore.loading">Mise à jour...</span>
            <span v-else>Changer le mot de passe</span>
          </button>
        </div>
      </form>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Double Authentification (2FA)</h2>
      <p class="text-gray-600 mb-4">
        Renforcez la sécurité de votre compte en activant la double authentification.
      </p>
      <button class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed">
        Activer la 2FA (Bientôt disponible)
      </button>
    </div>

    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Gérer les sessions</h2>
      <p class="text-gray-600 mb-4">
        Déconnectez-vous de tous les appareils où votre compte est actuellement connecté.
      </p>
      <button @click="disconnectAllDevices" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        Déconnexion de tous les appareils
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const passwordMismatch = computed(() => {
  return newPassword.value && confirmNewPassword.value && newPassword.value !== confirmNewPassword.value;
});

const changePassword = async () => {
  authStore.clearMessages();

  if (passwordMismatch.value) {
    authStore.setError("Les nouveaux mots de passe ne correspondent pas.");
    return;
  }

  if (!currentPassword.value || !newPassword.value) {
    authStore.setError("Veuillez remplir tous les champs de mot de passe.");
    return;
  }

  // L'endpoint Strapi pour changer le mot de passe d'un utilisateur connecté est /api/auth/change-password
  // Il nécessite 'currentPassword' et 'password' (le nouveau mot de passe), 'passwordConfirmation'
  const success = await authStore.apiCall('auth/change-password', 'POST', {
    currentPassword: currentPassword.value,
    password: newPassword.value,
    passwordConfirmation: confirmNewPassword.value,
  });

  if (success) {
    authStore.setSuccess("Votre mot de passe a été modifié avec succès !");
    // Réinitialiser les champs du formulaire
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
  }
  // Si échec, l'erreur est déjà dans authStore.error via apiCall
};

const disconnectAllDevices = async () => {
  authStore.clearMessages();
  // Il n'y a pas d'endpoint standard dans Strapi pour "déconnecter tous les appareils"
  // car Strapi gère les tokens JWT de manière stateless. Un token émis est valide jusqu'à son expiration.
  // Pour implémenter cela, vous auriez besoin d'une logique côté serveur Strapi
  // pour révoquer les tokens ou les marquer comme invalides dans une base de données.
  // Une solution simple côté client est de forcer une déconnexion locale.
  // Mais cela ne déconnecte pas les autres sessions actives.
  // Pour une vraie "déconnexion de tous les appareils", vous devriez invalider le token côté serveur.
  // Pour l'instant, on peut juste simuler une action :
  authStore.setError("La fonctionnalité de déconnexion de tous les appareils n'est pas encore implémentée côté serveur.");
  // Ou simplement faire un logout côté client, qui ne déconnectera que l'appareil actuel
  // await authStore.logout();
};
</script>

<style scoped>
/* Vos couleurs primaires */
</style>