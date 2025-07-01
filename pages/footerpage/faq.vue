<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Foire aux Questions (FAQ)</h1>
      
      <div class="prose max-w-none text-gray-700">
        <p>Vous trouverez ici les réponses aux questions les plus fréquemment posées par nos clients.</p>
        
        <h3 class="mt-6 text-xl font-semibold text-gray-800">Commandes & Paiements</h3>
        <details class="mb-4 p-4 border border-gray-200 rounded-md cursor-pointer">
          <summary class="font-medium text-gray-900">Comment puis-je passer une commande ?</summary>
          <p class="mt-2 text-gray-600">Pour passer une commande, parcourez notre site, ajoutez les articles à votre panier et suivez les étapes du processus de paiement.</p>
        </details>
        <details class="mb-4 p-4 border border-gray-200 rounded-md cursor-pointer">
          <summary class="font-medium text-gray-900">Quels modes de paiement acceptez-vous ?</summary>
          <p class="mt-2 text-gray-600">Nous acceptons les cartes de crédit (UBA),  et d'autres méthodes de paiement locales(Mtnmobile money,Orange money).</p>
        </details>
        
        <h3 class="mt-6 text-xl font-semibold text-gray-800">Livraison</h3>
        <details class="mb-4 p-4 border border-gray-200 rounded-md cursor-pointer">
          <summary class="font-medium text-gray-900">Quels sont vos délais de livraison ?</summary>
          <p class="mt-2 text-gray-600">Les délais de livraison varient en fonction de votre localisation et du produit. Généralement, les livraisons standard prennent entre 3 et 7 jours ouvrables.</p>
        </details>
        <details class="mb-4 p-4 border border-gray-200 rounded-md cursor-pointer">
          <summary class="font-medium text-gray-900">Puis-je suivre ma commande ?</summary>
          <p class="mt-2 text-gray-600">Oui, un numéro de suivi vous sera fourni par e-mail une fois votre commande expédiée.</p>
        </details>
      </div>
      <button type="submit" class="mt-2 w-20 bg-primary-500 bg-red-800 text-white py-2 rounded hover:bg-blue-400 transition-colors duration-300"><NuxtLink  NuxtLink to="/">boutique</NuxtLink></button>
    </div>
  </div>
</template>

<script setup>
// Pas de logique spécifique nécessaire pour cette page
</script>

<style scoped>
/* Les styles de base proviennent de Tailwind CSS.
   Vous pouvez ajouter des styles spécifiques ici si nécessaire.
*/
.prose {
  /* TailwindCSS 'prose' plugin styles HTML content. */
}
</style>