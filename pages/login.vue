<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Se connecter à votre compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <NuxtLink to="/register" class="font-medium text-primary-500 hover:text-primary-900">
            créez un nouveau compte
          </NuxtLink>
        </p>
      </div>

      <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ authStore.error }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="authStore.clearError()">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 11-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 011.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 011.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 010 1.698z"/></svg>
        </span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
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

        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2zm0-11V2m0 2a2 2 0 012 2h4a2 2 0 012 2v1H6v-1a2 2 0 012-2H8a2 2 0 012-2z" />
            </svg>
          </div>
          <input :type="showPassword ? 'text' : 'password'" id="password" name="password" autocomplete="current-password" required v-model="password"
                 class="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                 placeholder="Mot de passe" />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" @click="togglePasswordVisibility">
            <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7 1.274 4.057-1.178 8.943-5.942 8.943a3.799 3.799 0 01-4.313-1.707c-.007.003-.01-.003-.01-.004-.209-.077-.567-.134-.922-.134-.22 0-.41.07-.58.198a3.8 3.8 0 01-2.869 1.707C5.232 21.057 2.78 16.162 3.981 12 " />
            </svg>
            <svg v-else class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.75a1.875 1.875 0 01-3.75 0M14.15 17.25a3.375 3.375 0 01-6.3 0m9.75-8.325a5.25 5.25 0 01-10.5 0M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-8.75a3.375 3.375 0 016.75 0m-.003 5.25a6.75 6.75 0 01-13.497 0" />
            </svg>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
                   class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink to="/forgot-password" class="font-medium text-primary-500 hover:text-primary-900">
              Mot de passe oublié ?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="authStore.loading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span v-if="authStore.loading">Connexion...</span>
            <span v-else>Se connecter</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false); // État pour la visibilité du mot de passe

// Gère la connexion de l'utilisateur
const handleLogin = async () => {
  authStore.clearError(); // Efface les erreurs précédentes
  const success = await authStore.login(email.value, password.value);
  if (success) {
    router.push('/account'); // Redirige vers la page du compte en cas de succès
  }
};

// Bascule la visibilité du mot de passe
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

onMounted(() => {
  // Redirige si déjà authentifié
  if (authStore.isAuthenticated) {
    router.push('/account');
  }
  authStore.clearError(); // Efface les erreurs au montage du composant
});
</script>

<style scoped>
/*
  Ces styles Tailwind CSS sont des exemples. Assurez-vous que vos couleurs 'primary-500' et 'primary-900'
  sont bien définies dans votre configuration Tailwind pour qu'elles correspondent à votre thème.
*/
.text-primary-500 {
  color: #007bff; /* Exemple de couleur primaire bleue */
}
.hover\:text-primary-900:hover {
  color: #0056b3;
}
.bg-primary-500 {
  background-color: #007bff;
}
.hover\:bg-primary-700:hover {
  background-color: #0056b3;
}
.focus\:ring-primary-500:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}
</style>