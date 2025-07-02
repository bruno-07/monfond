<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Informations personnelles</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="authStore.loading" class="text-center py-4">Chargement des informations...</div>
      <div v-else-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ authStore.error }}</span>
      </div>
      <div v-else-if="authStore.successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <span class="block sm:inline">{{ authStore.successMessage }}</span>
      </div>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="formData.username"
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                 :disabled="!isEditing" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="formData.email"
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                 :disabled="true" /> </div>
        <div>
          <label for="telephone" class="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input type="tel" id="telephone" v-model="formData.telephone" 
                 class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                 :disabled="!isEditing" />
        </div>
        <div>
          <label for="Genre" class="block text-sm font-medium text-gray-700">Genre</label>
          <select id="Genre" v-model="formData.Genre" 
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  :disabled="!isEditing">
            <option value="">Sélectionner</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autres">Autre</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button v-if="!isEditing" @click.prevent="isEditing = true"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Modifier
          </button>
          <button v-if="isEditing" type="button" @click="cancelEdit"
                  class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Annuler
          </button>
          <button v-if="isEditing" type="submit" :disabled="authStore.loading"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
            <span v-if="authStore.loading">Sauvegarde...</span>
            <span v-else>Sauvegarder les modifications</span>
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

import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isEditing = ref(false);

const formData = ref({
  username: '',
  email: '',
  telephone: '', // <-- CHANGÉ ICI : de 'phone' à 'telephone'
  Genre: '',     // <-- CHANGÉ ICI : de 'gender' à 'Genre'
});

let originalFormData = {};

const initializeFormData = () => {
  if (authStore.user) {
    formData.value.username = authStore.user.username || '';
    formData.value.email = authStore.user.email || '';
    // IMPORTANT : Utilisez authStore.user.telephone et authStore.user.Genre
    formData.value.telephone = authStore.user.telephone || ''; // <-- CHANGÉ ICI
    formData.value.Genre = authStore.user.Genre || '';       // <-- CHANGÉ ICI
    originalFormData = { ...formData.value };
  }
};

onMounted(() => {
  authStore.clearMessages();
  initializeFormData();
});

watch(() => authStore.user, (newUser) => {
  if (newUser) {
    initializeFormData();
  }
}, { immediate: true });

const updateProfile = async () => {
  authStore.clearMessages();

  const payload = {
    username: formData.value.username,
    telephone: formData.value.telephone, // <-- CHANGÉ ICI
    Genre: formData.value.Genre,         // <-- CHANGÉ ICI
  };

  const changedPayload = {};
  for (const key in payload) {
    if (payload[key] !== originalFormData[key]) {
      changedPayload[key] = payload[key];
    }
  }

  if (Object.keys(changedPayload).length === 0) {
    authStore.setError("Aucune modification détectée.");
    isEditing.value = false;
    return;
  }

  const success = await authStore.updateUser(authStore.user.id, changedPayload);

  if (success) {
    isEditing.value = false;
    originalFormData = { ...formData.value }; // Met à jour l'original après succès
    // Assurez-vous que le store met à jour authStore.user après la réponse de Strapi
    // Cela se fait généralement dans la fonction updateUser du store si elle utilise la réponse de l'API.
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  authStore.clearMessages();
  formData.value = { ...originalFormData };
};
</script>

<style scoped>
/* Vos styles */
</style>