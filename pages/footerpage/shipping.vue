<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Informations sur la Livraison</h1>
      
      <div class="prose max-w-none text-gray-700">
        <p>Nous nous efforçons de livrer vos commandes rapidement et en toute sécurité. Voici les détails de nos politiques de livraison :</p>
        
        <h3>Délais de Livraison</h3>
        <ul>
          <li><strong>Livraison Standard :</strong> 3-7 jours ouvrables</li>
          <li><strong>Livraison Express :</strong> 1-2 jours ouvrables (des frais supplémentaires s'appliquent)</li>
        </ul>

        <h3>Frais de Livraison</h3>
        <p>Les frais de livraison sont calculés au moment du paiement en fonction du poids, de la taille de votre commande et de votre adresse de livraison. La livraison est offerte pour toute commande supérieure à X€.</p>

        <h3>Suivi de Commande</h3>
        <p>Dès que votre commande est expédiée, vous recevrez un e-mail de confirmation avec un numéro de suivi. Vous pourrez utiliser ce numéro pour suivre l'état de votre livraison en temps réel.</p>
        
        <h3>Zones de Livraison</h3>
        <p>Nous livrons actuellement dans [listez les pays/régions, ex: tous les pays de l'Union Européenne, France métropolitaine].</p>
        <button type="submit" class="mt-2 w-20 bg-primary-500 bg-red-800 text-white py-2 rounded hover:bg-blue-400 transition-colors duration-300"><NuxtLink  NuxtLink to="/">boutique</NuxtLink></button>
      </div>
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