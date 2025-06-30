<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha384- [VOTRE HASH] " crossorigin="anonymous" referrerpolicy="no-referrer" />
  <footer class="bg-gradient-to-r from-primary/90 to-blue-400/90 shadow-lg text-red-800 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center mb-4">
            <NuxtLink to="/" class="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-primary transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.309L18.818 7 12 9.691 5.182 7 12 4.309zM4 9l8 4 8-4v6l-8 4-8-4V9z"/>
        </svg>
        <span class="font-barlow">MonShop</span>
      </NuxtLink>
          </div>
          <p class="text-sm text-white">
            Votre destination e-commerce pour les meilleurs produits. Découvrez notre collection unique et profitez d'une expérience d'achat inégalée.
          </p>
        </div>

        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg  text-gray-900 font-barlow mb-4">Navigation</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-white hover:text-primary-500 transition-colors duration-300">Accueil</NuxtLink></li>
            <li><NuxtLink to="/products" class="text-white hover:text-primary-500 transition-colors duration-300">Produits</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-white hover:text-primary-500 transition-colors duration-300">Catégories</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-white hover:text-primary-500 transition-colors duration-300">À Propos</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-white hover:text-primary-500 transition-colors duration-300">Contact</NuxtLink></li>
          </ul>
        </div>

        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg  text-gray-900 font-barlow mb-4">Aide & Support</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/faq" class="text-white hover:text-primary-500 transition-colors duration-300">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="text-white hover:text-primary-500 transition-colors duration-300">Livraison</NuxtLink></li>
            <li><NuxtLink to="/returns" class="text-white hover:text-primary-500 transition-colors duration-300">Retours</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy" class="text-white hover:text-primary-500 transition-colors duration-300">Politique de Confidentialité</NuxtLink></li>
            <li><NuxtLink to="/terms-of-service" class="text-white hover:text-primary-500 transition-colors duration-300">Conditions d'Utilisation</NuxtLink></li>
          </ul>
        </div>

        <div class="col-span-1 md:col-span-1">
          <h3 class="text-lg font-semibold text-gray-900 font-barlow mb-4">Nous Contacter</h3>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-white hover:text-primary-500 transition-colors duration-300" aria-label="Facebook">
              <i class="fab fa-facebook-f text-xl"></i> </a>
            <a href="#" class="text-white hover:text-primary-500 transition-colors duration-300" aria-label="Twitter">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-white hover:text-primary-500 transition-colors duration-300" aria-label="Instagram">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-white hover:text-primary-500 transition-colors duration-300" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-white">
        &copy; {{ new Date().getFullYear() }} Votre Marque. Tous droits réservés.
      </div>
    </div>
  </footer>
</template>

<script setup>
// Pas de logique spécifique ici pour un footer simple
</script>

<style scoped>
/*
  Assurez-vous que la couleur 'primary-500' est définie dans votre tailwind.config.js
  pour correspondre à la couleur d'accentuation de votre en-tête.
  Par exemple dans tailwind.config.js:
  module.exports = {
    theme: {
      extend: {
        colors: {
          primary: {
            500: '#FF6347', // Exemple: Rouge orangé. À remplacer par votre couleur d'accent.
            // Vous pouvez aussi définir d'autres teintes si nécessaire
            // 700: '#E64A19',
          },
        },
      },
    },
  };
*/
</style>