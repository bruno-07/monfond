<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Mes commandes</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="loadingOrders" class="text-center py-4">Chargement de vos commandes...</div>
      <div v-else-if="orders.length === 0" class="text-center py-4 text-gray-600">
        Vous n'avez pas encore passé de commandes.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Numéro de commande
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Détails</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ order.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(order.date).toLocaleDateString('fr-FR') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ order.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF' }) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink :to="`/account/orders/${order.id}`" class="text-primary-600 hover:text-primary-900">
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
import { ref, onMounted } from 'vue';
// import { useAuthStore } from '~/stores/auth'; // Si vous avez besoin du store auth ici

// const authStore = useAuthStore();
const orders = ref([]);
const loadingOrders = ref(true);

const fetchOrders = async () => {
  loadingOrders.value = true;
  // --- Simulation de données de commandes ---
  await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai API
  orders.value = [
    { id: '1001', date: '2025-06-15', amount: 15000, status: 'Livré' },
    { id: '1002', date: '2025-06-20', amount: 25500, status: 'En cours' },
    { id: '1003', date: '2025-06-25', amount: 8000, status: 'Annulée' },
    { id: '1004', date: '2025-06-28', amount: 42000, status: 'En attente' },
  ];
  // --- Fin de la simulation ---

  // --- Pour une intégration réelle avec Strapi, vous auriez quelque chose comme ceci :
  // try {
  //   const response = await authStore.apiCall('orders?filters[user][id][$eq]=${authStore.user.id}', 'GET');
  //   if (response && response.data) {
  //     orders.value = response.data.map(item => ({
  //       id: item.id,
  //       date: item.attributes.createdAt,
  //       amount: item.attributes.totalAmount, // Assurez-vous que votre modèle de commande a ces attributs
  //       status: item.attributes.status,
  //       // etc.
  //     }));
  //   }
  // } catch (e) {
  //   console.error("Erreur lors de la récupération des commandes:", e);
  //   // authStore.setError("Impossible de charger les commandes.");
  // }
  loadingOrders.value = false;
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Livré': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    case 'En cours': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
    case 'Annulée': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
    case 'En attente': return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
    default: return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
/* Les styles de couleur primary-500 etc. doivent être définis dans tailwind.config.js */
.text-primary-600 { color: #2563eb; }
.hover\:text-primary-900:hover { color: #1e3a8a; }
</style>