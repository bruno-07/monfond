<template>
  <nav class="p-4 bg-white shadow-md rounded-lg h-full">
    <ul class="space-y-2 hidden md:block">
      <li v-for="item in menuItems" :key="item.name">
        <NuxtLink :to="item.path"
                  class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  :class="{ 'bg-primary-100 text-primary-700 font-semibold': $route.path === item.path || ($route.path.startsWith(item.path) && item.path !== '/account') }">
          <component :is="item.icon" class="h-5 w-5 mr-3" /> {{ item.name }}
        </NuxtLink>
      </li>
      <li class="border-t border-gray-200 pt-2 mt-2">
        <button @click="authStore.logout()"
                class="w-full flex items-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
          <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Déconnexion
        </button>
      </li>
    </ul>

    <div class="md:hidden">
      <button @click="toggleMobileMenu" class="w-full flex items-center justify-between p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
        <span>Menu du compte</span>
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <ul v-if="isMobileMenuOpen" class="mt-2 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg">
        <li v-for="item in menuItems" :key="item.name">
          <NuxtLink :to="item.path" @click="closeMobileMenu"
                    class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    :class="{ 'bg-primary-100 text-primary-700 font-semibold': $route.path === item.path || ($route.path.startsWith(item.path) && item.path !== '/account') }">
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.name }}
          </NuxtLink>
        </li>
        <li class="border-t border-gray-200 pt-2 mt-2">
          <button @click="authStore.logout(); closeMobileMenu();"
                  class="w-full flex items-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Déconnexion
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);

// Icônes temporaires (vous les remplacerez par de vrais composants d'icônes si vous en utilisez)
// Pour l'exemple, nous utilisons des SVGs simples ou vous pouvez importer une bibliothèque d'icônes.
// Par exemple, si vous utilisez 'lucide-vue-next':
// import { Home, User, Package, Heart, MapPin, FileText, Lock } from 'lucide-vue-next';
// Dans ce cas, les icônes seraient des composants importés.
// Pour l'instant, je les simule avec des noms de chaînes.
const DashboardIcon = 'svg'; // Remplacer par un composant <Home />
const UserIcon = 'svg'; // Remplacer par un composant <User />
const PackageIcon = 'svg'; // Remplacer par un composant <Package />
const HeartIcon = 'svg'; // Remplacer par un composant <Heart />
const MapPinIcon = 'svg'; // Remplacer par un composant <MapPin />
const FileTextIcon = 'svg'; // Remplacer par un composant <FileText />
const LockIcon = 'svg'; // Remplacer par un composant <Lock />

const menuItems = [
  { name: 'Tableau de bord', path: '/account', icon: DashboardIcon },
  { name: 'Informations personnelles', path: '/account/profile', icon: UserIcon },
  { name: 'Mes commandes', path: '/account/orders', icon: PackageIcon },
  { name: 'Mes favoris', path: '/account/favorites', icon: HeartIcon },
  { name: 'Adresses de livraison', path: '/account/addresses', icon: MapPinIcon },
  { name: 'Factures', path: '/account/invoices', icon: FileTextIcon },
  { name: 'Sécurité & mot de passe', path: '/account/security', icon: LockIcon },
];

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<style scoped>
/* Définissez vos couleurs primaires dans tailwind.config.js si ce n'est pas déjà fait */
/*
  Exemple dans tailwind.config.js:
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Utilisez cette couleur pour le primaire
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
*/
</style>