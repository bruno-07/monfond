<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppMainHeader />

    <main class="flex-1 p-6 overflow-y-auto">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
// Assurez-vous que les chemins sont corrects pour vos composants existants
import AppMainHeader from '~/components/layout/AppMainHeader.vue'; // Ajustez si le chemin est différent
import AppFooter from '~/components/Footer/AppFooter.vue'; // Ajustez si le chemin est différent
</script>