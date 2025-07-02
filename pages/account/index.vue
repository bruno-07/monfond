<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Tableau de bord</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Bienvenue, {{ authStore.user?.username || 'Utilisateur' }} !</h2>
      <p class="text-gray-600">
        Bienvenue sur votre tableau de bord personnel. Vous trouverez ici un aperçu rapide de vos activités.
      </p>
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-blue-50 p-4 rounded-md shadow-sm">
          <h3 class="font-medium text-blue-800">Commandes récentes</h3>
          <p class="text-sm text-gray-700 mt-1">Vous avez 3 commandes récentes. <NuxtLink to="/account/orders" class="text-blue-600 hover:underline">Voir toutes les commandes</NuxtLink></p>
        </div>
        <div class="bg-green-50 p-4 rounded-md shadow-sm">
          <h3 class="font-medium text-green-800">Statut du compte</h3>
          <p class="text-sm text-gray-700 mt-1">Votre compte est actif. <NuxtLink to="/account/profile" class="text-green-600 hover:underline">Gérer votre profil</NuxtLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// IMPORTANT : Définir le layout et le middleware pour cette page
definePageMeta({
  layout: 'account', // Utilise le layout account.vue que vous avez créé
  middleware: ['auth'] // Protège cette page avec le middleware d'authentification
});
</script>

<style scoped>
/* Styles spécifiques si besoin */
</style>