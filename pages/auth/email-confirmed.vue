<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Confirmation de compte
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
      <p v-else-if="authStore.successMessage" class="mt-2 text-sm text-green-600">
        {{ authStore.successMessage }}
      </p>
      <p v-else class="mt-2 text-sm text-gray-600">
        Tentative de confirmation du compte...
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  const jwt = route.query.jwt;

  authStore.clearMessages(); // Cette ligne est correcte avec le store mis à jour

  if (jwt) {
    await authStore.handleConfirmationJwt(jwt);
  } else {
    authStore.setError("Lien de confirmation invalide ou manquant.");
    setTimeout(() => {
      // Assurez-vous d'importer useRouter si vous l'utilisez ici
      // import { useRouter } from 'vue-router';
      // const router = useRouter();
      // router.push('/login');
      // Ou directement comme ci-dessous si le router est bien configuré globalement
      useRouter().push('/login');
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