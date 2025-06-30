<template>
  <div class="newsletter-signup bg-gray-800 py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto text-center">
      <h3 class="text-2xl font-extrabold text-white mb-4">Restez informé !</h3>
      <p class="text-gray-300 text-base mb-6">
        Abonnez-vous à notre newsletter pour recevoir nos dernières offres, nouveautés et actualités directement dans votre boîte de réception.
      </p>
      <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="email"
          v-model="email"
          placeholder="Votre adresse e-mail"
          required
          class="w-full sm:flex-1 px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <button
          type="submit"
          :disabled="loading"
          class="w-full sm:w-auto px-6 py-2 rounded-md shadow-sm text-base font-medium text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <span v-if="loading">Chargement...</span>
          <span v-else>S'abonner</span>
        </button>
      </form>

      <p v-if="successMessage" class="mt-4 text-green-400">{{ successMessage }}</p>
      <p v-if="errorMessage" class="mt-4 text-red-400">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const loading = ref(false);
const successMessage = ref(null);
const errorMessage = ref(null);

const subscribe = async () => {
  loading.value = true;
  successMessage.value = null;
  errorMessage.value = null;

  try {
    // --- REMPLACEZ CETTE PARTIE AVEC VOTRE VÉRITABLE LOGIQUE D'ENVOI À STRAPI OU AUTRE SERVICE ---
    // Exemple d'appel API vers Strapi (nécessite la création d'un Content-Type pour les abonnés newsletter)
    // Ou vers un service d'emailing tiers comme Mailchimp, SendGrid, etc.

    // Pour l'exemple, nous allons simuler un appel API
    const response = await new Promise(resolve => setTimeout(() => {
      if (email.value.includes('@') && email.value.includes('.')) {
        resolve({ ok: true });
      } else {
        resolve({ ok: false, message: "Veuillez entrer une adresse e-mail valide." });
      }
    }, 1000));

    if (response.ok) {
      successMessage.value = "Merci de votre abonnement ! Vérifiez votre boîte de réception.";
      email.value = ''; // Réinitialise le champ
    } else {
      errorMessage.value = response.message || "Une erreur est survenue lors de l'abonnement.";
    }

  } catch (error) {
    errorMessage.value = "Une erreur réseau est survenue. Veuillez réessayer.";
    console.error("Erreur d'abonnement à la newsletter:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/*
  Assurez-vous que la couleur 'primary-500' est définie dans votre tailwind.config.js
  pour correspondre à la couleur d'accentuation de votre site.
*/
.bg-primary-500 { background-color: #007bff; } /* Exemple: Bleu. À remplacer par votre couleur d'accent. */
.hover\:bg-primary-700:hover { background-color: #0056b3; }
.focus\:ring-primary-500:focus { box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }
</style>