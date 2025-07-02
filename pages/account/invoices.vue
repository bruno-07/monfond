<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Mes factures</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="loadingInvoices" class="text-center py-4">Chargement de vos factures...</div>
      <div v-else-if="invoices.length === 0" class="text-center py-4 text-gray-600">
        Vous n'avez pas encore de factures disponibles.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Numéro de facture
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #INV-{{ invoice.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(invoice.date).toLocaleDateString('fr-FR') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ invoice.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' }) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a :href="invoice.pdfUrl" target="_blank" class="text-primary-600 hover:text-primary-900 mr-4">
                  Voir PDF
                </a>
                <NuxtLink :to="`/account/invoices/${invoice.id}`" class="text-primary-600 hover:text-primary-900">
                  Détails
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'account', // Indique d'utiliser layouts/account.vue
  middleware: ['auth'] // Pour protéger la page (si applicable)
});

import { ref, onMounted } from 'vue';

const invoices = ref([]);
const loadingInvoices = ref(true);

const fetchInvoices = async () => {
  loadingInvoices.value = true;
  // --- Simulation de données de factures ---
  await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai API
  invoices.value = [
    { id: 'F001', date: '2025-06-15', amount: 15000, pdfUrl: 'https://www.africau.edu/images/default/sample.pdf' },
    { id: 'F002', date: '2025-06-20', amount: 25500, pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'F003', date: '2025-06-25', amount: 8000, pdfUrl: 'https://pdfobject.com/pdf/sample.pdf' },
  ];
  // --- Fin de la simulation ---

  // --- Pour une intégration réelle avec Strapi, vous auriez besoin d'un type de contenu 'Invoice'
  // --- et de la logique pour générer/stocker les PDFs, puis une requête API :
  // try {
  //   const response = await authStore.apiCall('invoices?filters[user][id][$eq]=${authStore.user.id}', 'GET');
  //   if (response && response.data) {
  //     invoices.value = response.data.map(item => ({
  //       id: item.id,
  //       date: item.attributes.createdAt,
  //       amount: item.attributes.totalAmount, // Ou un champ 'invoiceAmount'
  //       pdfUrl: item.attributes.pdfFile.data.attributes.url, // Si Strapi gère les fichiers PDF
  //     }));
  //   }
  // } catch (e) {
  //   console.error("Erreur lors de la récupération des factures:", e);
  // }
  loadingInvoices.value = false;
};

onMounted(() => {
  fetchInvoices();
});
</script>

<style scoped>
/* Vos couleurs primaires */
.text-primary-600 { color: #2563eb; }
.hover\:text-primary-900:hover { color: #1e3a8a; }
</style>