<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg text-center">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Vérifiez votre e-mail !
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Nous avons envoyé un e-mail de confirmation à votre adresse.
        Veuillez cliquer sur le lien dans cet e-mail pour activer votre compte.
      </p>
      <p class="mt-4 text-sm text-gray-500">
        Si vous ne le trouvez pas, vérifiez votre dossier de spam/courrier indésirable.
      </p>
      <NuxtLink to="/auth/login" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
        Retour à la connexion
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Pas de script nécessaire pour cette page simple
</script>

<style scoped>
/* Assurez-vous que ces couleurs sont définies dans votre tailwind.config.js */
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