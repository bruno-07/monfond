<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Mot de passe oublié ?
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
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

      <form @submit.prevent="handleForgotPassword" class="space-y-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0l-3-3m3 3l-3 3M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                 class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                 placeholder="Adresse email" />
        </div>

        <div>
          <button type="submit" :disabled="authStore.loading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span v-if="authStore.loading">Envoi...</span>
            <span v-else>Envoyer le lien de réinitialisation</span>
          </button>
        </div>
      </form>
      <div class="text-center">
        <NuxtLink to="/login" class="font-medium text-primary-500 hover:text-primary-900">
          Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const email = ref('');

const handleForgotPassword = async () => {
  // Les messages d'erreur/succès et le loading sont gérés par le store
  await authStore.forgotPassword(email.value);
  // Si succès, le message est déjà défini par le store.
  // On peut vider l'email si on veut, mais ce n'est pas obligatoire.
  // email.value = '';
};
</script>

<style scoped>
.text-primary-500 { color: #007bff; }
.hover\:text-primary-900:hover { color: #0056b3; }
.bg-primary-500 { background-color: #007bff; }
.hover\:bg-primary-700:hover { background-color: #0056b3; }
.focus\:ring-primary-500:focus { box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }
</style>