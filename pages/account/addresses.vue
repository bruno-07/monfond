<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Mes adresses de livraison</h1>

    <div class="bg-white p-6 rounded-lg shadow">
      <div v-if="loadingAddresses" class="text-center py-4">Chargement de vos adresses...</div>
      <div v-else-if="addresses.length === 0" class="text-center py-4 text-gray-600">
        Vous n'avez pas encore enregistré d'adresse.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="address in addresses" :key="address.id" class="border border-gray-200 rounded-lg p-4 shadow-sm">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-semibold text-gray-800">{{ address.name }}</h3>
            <span v-if="address.isDefault" class="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              Par défaut
            </span>
          </div>
          <p class="text-gray-600 text-sm">
            {{ address.street }}<br>
            {{ address.city }}, {{ address.zipCode }}<br>
            {{ address.country }}
          </p>
          <p v-if="address.phone" class="text-gray-600 text-sm mt-1">Tel: {{ address.phone }}</p>
          <div class="mt-4 flex space-x-2">
            <button @click="editAddress(address)"
                    class="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Modifier
            </button>
            <button @click="deleteAddress(address.id)"
                    class="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Supprimer
            </button>
            <button v-if="!address.isDefault" @click="setAsDefault(address.id)"
                    class="px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Définir par défaut
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <button @click="showAddAddressForm = true"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          Ajouter une nouvelle adresse
        </button>
      </div>

      <div v-if="showAddAddressForm" class="mt-8 p-6 bg-gray-50 rounded-lg shadow-inner">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ isEditingAddress ? 'Modifier l\'adresse' : 'Nouvelle adresse' }}</h2>
        <form @submit.prevent="saveAddress" class="space-y-4 max-w-lg">
          <div>
            <label for="address-name" class="block text-sm font-medium text-gray-700">Nom de l'adresse (ex: Maison, Bureau)</label>
            <input type="text" id="address-name" v-model="currentAddress.name" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label for="street" class="block text-sm font-medium text-gray-700">Rue et numéro</label>
            <input type="text" id="street" v-model="currentAddress.street" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700">Ville</label>
              <input type="text" id="city" v-model="currentAddress.city" required
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label for="zipCode" class="block text-sm font-medium text-gray-700">Code postal</label>
              <input type="text" id="zipCode" v-model="currentAddress.zipCode" required
                     class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
          </div>
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700">Pays</label>
            <input type="text" id="country" v-model="currentAddress.country" required
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label for="address-phone" class="block text-sm font-medium text-gray-700">Téléphone (optionnel)</label>
            <input type="tel" id="address-phone" v-model="currentAddress.phone"
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div class="flex items-center">
            <input id="isDefault" type="checkbox" v-model="currentAddress.isDefault"
                   class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label for="isDefault" class="ml-2 block text-sm text-gray-900">Définir comme adresse par défaut</label>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="cancelAddressForm"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
              {{ isEditingAddress ? 'Sauvegarder' : 'Ajouter l\'adresse' }}
            </button>
          </div>
        </form>
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
// import { useAuthStore } from '~/stores/auth'; // Si vous avez besoin du store auth ici

// const authStore = useAuthStore();
const addresses = ref([]);
const loadingAddresses = ref(true);
const showAddAddressForm = ref(false);
const isEditingAddress = ref(false);
const currentAddress = ref({
  id: null,
  name: '',
  street: '',
  city: '',
  zipCode: '',
  country: '',
  phone: '',
  isDefault: false,
});

const defaultNewAddress = () => ({
  id: null,
  name: '',
  street: '',
  city: '',
  zipCode: '',
  country: '',
  phone: '',
  isDefault: false,
});

const fetchAddresses = async () => {
  loadingAddresses.value = true;
  // --- Simulation de données d'adresses ---
  await new Promise(resolve => setTimeout(resolve, 800)); // Simuler un délai API
  addresses.value = [
    { id: 'addr1', name: 'Maison', street: '123 Rue de la Liberté', city: 'Yaoundé', zipCode: '00100', country: 'Cameroun', phone: '237677889900', isDefault: true },
    { id: 'addr2', name: 'Bureau', street: '456 Avenue des Entreprises', city: 'Douala', zipCode: '00200', country: 'Cameroun', phone: '237699887766', isDefault: false },
  ];
  // --- Fin de la simulation ---

  // --- Pour une intégration réelle avec Strapi, vous auriez besoin d'un type de contenu 'Address'
  // --- avec une relation avec User, puis une requête API :
  // try {
  //   const response = await authStore.apiCall('addresses?filters[user][id][$eq]=${authStore.user.id}', 'GET');
  //   if (response && response.data) {
  //     addresses.value = response.data.map(item => ({
  //       id: item.id,
  //       name: item.attributes.name,
  //       street: item.attributes.street,
  //       city: item.attributes.city,
  //       zipCode: item.attributes.zipCode,
  //       country: item.attributes.country,
  //       phone: item.attributes.phone,
  //       isDefault: item.attributes.isDefault,
  //     }));
  //   }
  // } catch (e) {
  //   console.error("Erreur lors de la récupération des adresses:", e);
  // }
  loadingAddresses.value = false;
};

const saveAddress = async () => {
  console.log("Sauvegarde de l'adresse:", currentAddress.value);
  // Logique d'appel API pour ajouter ou modifier une adresse
  await new Promise(resolve => setTimeout(resolve, 500)); // Simuler un délai

  if (isEditingAddress.value) {
    // Logique de modification
    addresses.value = addresses.value.map(addr =>
      addr.id === currentAddress.value.id ? { ...currentAddress.value } : addr
    );
    // Gestion du défaut : si cette adresse devient par défaut, les autres ne le sont plus
    if (currentAddress.value.isDefault) {
      addresses.value = addresses.value.map(addr =>
        addr.id === currentAddress.value.id ? addr : { ...addr, isDefault: false }
      );
    }
    console.log("Adresse modifiée:", currentAddress.value.id);
    // Appel API réel : authStore.apiCall(`addresses/${currentAddress.value.id}`, 'PUT', currentAddress.value);
  } else {
    // Logique d'ajout
    const newId = `addr${Math.random().toString(36).substr(2, 9)}`;
    const newAddr = { ...currentAddress.value, id: newId };
    if (newAddr.isDefault) {
      // Si la nouvelle adresse est par défaut, les autres ne le sont plus
      addresses.value = addresses.value.map(addr => ({ ...addr, isDefault: false }));
    }
    addresses.value.push(newAddr);
    console.log("Adresse ajoutée:", newAddr);
    // Appel API réel : authStore.apiCall('addresses', 'POST', currentAddress.value);
  }

  // Après la sauvegarde, réinitialise et cache le formulaire
  currentAddress.value = defaultNewAddress();
  showAddAddressForm.value = false;
  isEditingAddress.value = false;
  await fetchAddresses(); // Recharger les adresses pour s'assurer que les données sont à jour
};

const editAddress = (address) => {
  currentAddress.value = { ...address };
  isEditingAddress.value = true;
  showAddAddressForm.value = true;
};

const deleteAddress = async (id) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) {
    console.log(`Suppression de l'adresse ${id}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simuler un délai
    addresses.value = addresses.value.filter(addr => addr.id !== id);
    // Appel API réel : authStore.apiCall(`addresses/${id}`, 'DELETE');
  }
};

const setAsDefault = async (id) => {
  console.log(`Définir l'adresse ${id} comme par défaut`);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simuler un délai
  addresses.value = addresses.value.map(addr => ({
    ...addr,
    isDefault: addr.id === id,
  }));
  // Vous devrez envoyer une requête PUT/PATCH à l'API Strapi pour l'adresse spécifique
  // et potentiellement d'autres requêtes pour désactiver le statut par défaut des autres.
  // Appel API réel : authStore.apiCall(`addresses/${id}`, 'PUT', { isDefault: true });
};

const cancelAddressForm = () => {
  showAddAddressForm.value = false;
  isEditingAddress.value = false;
  currentAddress.value = defaultNewAddress();
};

onMounted(() => {
  fetchAddresses();
});
</script>

<style scoped>
/* Vos couleurs primaires */
.bg-primary-100 { background-color: #dbeafe; } /* Exemple pour primary-100 */
.text-primary-700 { color: #1d4ed8; } /* Exemple pour primary-700 */
.text-primary-600 { color: #2563eb; } /* Exemple pour primary-600 */
</style>