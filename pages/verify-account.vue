<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Vérifiez votre compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Un code de vérification a été envoyé à l'adresse e-mail
          <span v-if="email" class="font-medium text-primary-500">{{ email }}</span>.
          Veuillez entrer ce code ci-dessous pour activer votre compte.
        </p>
      </div>

      <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{{ authStore.error }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" @click="authStore.clearError()">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 01-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 11-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 011.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 011.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 010 1.698z"/></svg>
        </span>
      </div>

      <form @submit.prevent="handleVerification" class="space-y-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2v-5a2 2 0 012-2h5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17l4 4M3 3l4 4" />
            </svg>
          </div>
          <input id="verification-code" name="verification-code" type="text" required v-model="verificationCode"
                 class="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                 placeholder="Entrez votre code de vérification" />
        </div>

        <div>
          <button type="submit" :disabled="authStore.loading"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span v-if="authStore.loading">Vérification...</span>
            <span v-else>Vérifier mon compte</span>
          </button>
        </div>

        <p class="mt-4 text-center text-sm text-gray-600">
          Vous n'avez pas reçu l'e-mail ?
          <button @click="resendVerificationEmail" :disabled="resendLoading"
                  class="font-medium text-primary-500 hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed">
            Renvoyer le code
          </button>
          <span v-if="resendSuccess" class="text-green-600 ml-2">Envoyé !</span>
          <span v-if="resendError" class="text-red-600 ml-2">{{ resendError }}</span>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute(); // Pour accéder aux paramètres de l'URL
const email = ref(''); // Pour afficher l'email à l'utilisateur
const verificationCode = ref('');
const resendLoading = ref(false);
const resendSuccess = ref(false);
const resendError = ref(null);

// Récupère l'email de l'URL si fourni
onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email;
  }
  authStore.clearError(); // Nettoie les erreurs précédentes
});

const handleVerification = async () => {
  authStore.clearError();
  const success = await authStore.confirmAccount(verificationCode.value);
  if (success) {
    // Si la vérification est réussie, l'utilisateur est connecté et peut être redirigé
    router.push('/account'); // Ou une page de bienvenue
  } else {
    // L'erreur sera gérée par le store et affichée dans le v-if="authStore.error"
  }
};

const resendVerificationEmail = async () => {
  if (!email.value) {
    resendError.value = "Impossible de renvoyer, l'email n'est pas disponible.";
    return;
  }
  resendLoading.value = true;
  resendSuccess.value = false;
  resendError.value = null;

  try {
    // Strapi a un endpoint pour renvoyer l'email de confirmation
    const response = await fetch(`${authStore.API_BASE_URL}/api/auth/send-email-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value })
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error?.message || 'Erreur lors du renvoi de l\'e-mail.');
    }
    resendSuccess.value = true;
    setTimeout(() => resendSuccess.value = false, 5000); // Masquer le message après 5 secondes
  } catch (err) {
    resendError.value = err.message || 'Échec du renvoi de l\'e-mail.';
  } finally {
    resendLoading.value = false;
  }
};
</script>

<style scoped>
/* Assurez-vous que ces couleurs sont définies dans votre tailwind.config.js */
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