<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Politique de Retours & Remboursements</h1>
      
      <div class="prose max-w-none text-gray-700">
        <p>Votre satisfaction est notre priorité. Si vous n'êtes pas entièrement satisfait de votre achat, nous sommes là pour vous aider.</p>
        
        <h3>Conditions de Retour</h3>
        <p>Vous disposez de <strong>14 jours</strong> à compter de la réception de votre commande pour nous retourner un article. Les articles doivent être non utilisés, dans leur emballage d'origine et en parfait état.</p>

        <h3>Processus de Retour</h3>
        <ol>
          <li>Contactez notre service client à <a href="mailto:support@votremarque.com" class="text-primary-500 hover:text-primary-700">support@votremarque.com</a> pour obtenir un numéro d'autorisation de retour.</li>
          <li>Emballez soigneusement l'article avec tous les accessoires et le reçu original.</li>
          <li>Expédiez l'article à l'adresse que notre service client vous indiquera. Les frais de retour sont à la charge du client, sauf en cas de défaut du produit.</li>
        </ol>

        <h3>Remboursements</h3>
        <p>Une fois votre retour reçu et inspecté, nous vous informerons de l'approbation ou du refus de votre remboursement. Si approuvé, votre remboursement sera traité et un crédit sera automatiquement appliqué à votre mode de paiement original dans un délai de 7 à 10 jours ouvrables.</p>
        
        <h3>Articles non Remboursables</h3>
        <p>Certains articles ne peuvent pas être retournés, comme les cartes cadeaux, les produits numériques ou les articles personnalisés.</p>
        <button type="submit" class="mt-2 w-20 bg-primary-500 bg-red-800 text-white py-2 rounded hover:bg-blue-400 transition-colors duration-300"><NuxtLink  NuxtLink to="/">boutique</NuxtLink></button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Pas de logique spécifique nécessaire pour cette page
</script>

<style scoped>
/* Assurez-vous que les couleurs primary sont définies dans tailwind.config.js */
.text-primary-500 { color: #007bff; }
.hover\:text-primary-700:hover { color: #0056b3; }
.prose {
  /* TailwindCSS 'prose' plugin styles HTML content. */
}
</style>