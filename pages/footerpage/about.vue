<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">À Propos de Nous</h1>
      
      <div class="prose max-w-none text-gray-700">
        <p>Bienvenue chez [Votre Marque] ! Nous sommes passionnés par [votre passion, ex: les produits de qualité, l'innovation, le service client]. Notre mission est de vous offrir une expérience d'achat en ligne agréable et des produits qui répondent à vos attentes.</p>
        <p>Fondée en [Année de fondation], nous avons commencé avec l'idée simple de [votre idée originale]. Aujourd'hui, nous sommes fiers de servir des clients partout dans [votre zone de service].</p>
        <h3>Notre Équipe</h3>
        <p>Nous sommes une équipe dédiée de professionnels travaillant ensemble pour vous garantir le meilleur service et les meilleurs produits. Votre satisfaction est notre priorité absolue.</p>
      </div>
      <button type="submit" class="mt-2 w-20 bg-primary-500 bg-red-800 text-white py-2 rounded hover:bg-blue-400 transition-colors duration-300"><NuxtLink  NuxtLink to="/">boutique</NuxtLink></button>
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