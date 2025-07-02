<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Contactez-Nous</h1>
      
      <div class="prose max-w-none text-gray-700">
        <p>Nous sommes là pour vous aider ! N'hésitez pas à nous contacter pour toute question, commentaire ou préoccupation.</p>
        
        <p><strong>Email:</strong> <a href="mailto:contact@votremarque.com" class="text-primary-500 hover:text-primary-700">contact@monchop.com</a></p>
        <p><strong>Téléphone:</strong> <a href="tel:+33123456789" class="text-primary-500 hover:text-primary-700">+237 699 115 314</a></p>
        <p><strong>Adresse:</strong> Akwa douche, douala, Cameroun</p>

        <h3>Heures d'Ouverture</h3>
        <p>Lundi - Vendredi : 9h00 - 18h00</p>
        <p>Samedi - Dimanche : Fermé</p>

        <h3>Envoyez-nous un message</h3>
        <form class="mt-4 space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
            <input type="text" id="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
          </div>
          <div class="flex gap-1">
              <button type="submit" class="mt-2 w-20  bg-red-800 text-white py-2 rounded hover:bg-blue-400 transition-colors duration-300">
               <a href=""> Envoyer</a> 
            </button>
            <button type="submit" class="mt-2 w-20  bg-red-800 text-white py-2 rounded hover:bg-blue-400 transition-colors duration-300"><NuxtLink  NuxtLink to="/">
                boutique
            </NuxtLink></button>
          </div>
        </form>
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
.bg-primary-500 { background-color: #007bff; }
.hover\:bg-primary-700:hover { background-color: #0056b3; }
.focus\:ring-primary-500:focus { box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5); }
.prose {
  /* TailwindCSS 'prose' plugin styles HTML content. */
}
</style>