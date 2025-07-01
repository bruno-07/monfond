<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Politique de Confidentialité</h1>
      
      <div class="prose max-w-none text-gray-700">
        <p>Nous nous engageons à protéger la vie privée de nos utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.</p>
        
        <h3>Collecte des Informations</h3>
        <p>Nous collectons des informations lorsque vous vous inscrivez sur notre site, passez une commande, vous abonnez à notre newsletter ou remplissez un formulaire. Les informations collectées peuvent inclure votre nom, adresse e-mail, adresse postale, numéro de téléphone et informations de paiement.</p>

        <h3>Utilisation des Informations</h3>
        <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
        <ul>
          <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
          <li>Améliorer notre site Web</li>
          <li>Améliorer le service client</li>
          <li>Traiter les transactions</li>
          <li>Envoyer des e-mails transactionnels ou marketing</li>
        </ul>

        <h3>Protection des Informations</h3>
        <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles lorsque vous passez une commande ou accédez à vos informations personnelles.</p>
        <p>Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne.</p>

        <h3>Divulgation à des Tiers</h3>
        <p>Nous ne vendons, n'échangeons ni ne transférons de quelque manière que ce soit vos informations personnelles identifiables à des tiers.</p>
        <p>Ceci n'inclut pas les tierces parties de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.</p>
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