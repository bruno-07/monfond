<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Compte confirmé !
      </h2>
      <p v-if="authStore.loading" class="mt-2 text-sm text-gray-600">
        Connexion en cours...
      </p>
      <p v-else-if="authStore.error" class="mt-2 text-sm text-red-600">
        {{ authStore.error }}
        <br>
        <NuxtLink to="/login" class="font-medium text-primary-500 hover:text-primary-900">
          Retour à la page de connexion
        </NuxtLink>
      </p>
      <p v-else class="mt-2 text-sm text-green-600">
        Votre compte a été vérifié avec succès. Vous allez être redirigé.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const jwt = route.query.jwt; // Récupère le JWT du paramètre d'URL

  if (jwt) {
    authStore.clearError();
    const success = await authStore.handleConfirmationJwt(jwt);
    if (success) {
      // Rediriger vers le compte si la connexion réussit
      router.push('/account');
    } else {
      // L'erreur est déjà définie dans le store
      // Rester sur cette page pour afficher l'erreur
    }
  } else {
    // Si pas de JWT dans l'URL, c'est une erreur
    authStore.error = "Lien de confirmation invalide ou manquant.";
    // Rediriger vers la connexion après un court délai
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }
});
</script>

<style scoped>
.text-primary-500 {
  color: #007bff;
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