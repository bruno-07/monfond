'bg-gradient-to-r from-primary/90 to-blue-400/90 shadow-lg': !scrolled,
<template>
  <header
    :class="{
    'bg-gradient-to-r from-primary/90 to-blue-400/90 shadow-lg': !scrolled,
      'bg-white/90 backdrop-blur-sm shadow-md': scrolled
    }"
    class="py-4 px-6 md:px-8 lg:px-12 relative z-50 transition-all duration-300 ease-in-out"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center h-16">
      <NuxtLink to="/" class="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-primary transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.309L18.818 7 12 9.691 5.182 7 12 4.309zM4 9l8 4 8-4v6l-8 4-8-4V9z"/>
        </svg>
        <span class="font-barlow">MonShop</span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center space-x-8">
         <NuxtLink to="/categories" class="flex-shrink-0 flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span class="text-gray-800">Catégories</span>
            </NuxtLink>
        <ul class="flex space-x-8 main-nav">
          <li v-for="category in productsStore.categories.filter(c => !c.parentCategory)" :key="category.id" class="relative group">
            <NuxtLink
              :to="`/categorie/${category.slug}`"
              class="text-gray-700 hover:text-primary font-semibold text-lg py-2 transition-colors duration-200"
            >
              {{ category.Nom }}
            </NuxtLink>
            <ul v-if="category.subCategories && category.subCategories.length > 0"
                class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out invisible z-10">
              <li v-for="subCategory in category.subCategories" :key="subCategory.id">
                <NuxtLink
                  :to="`/categorie/${subCategory.slug}`"
                  class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm"
                >
                  {{ subCategory.Nom }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="flex items-center space-x-6">
        <SearchBar class="hidden lg:block" />

        <div class="relative group">
          <NuxtLink to="/account" class="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors duration-200 group-hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="hidden md:inline">{{ authStore.isAuthenticated ? (authStore.user ? authStore.user.username : 'Compte') : 'Compte' }}</span>
          </NuxtLink>

          <ul class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden opacity-0 group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out invisible z-10">
            <li v-if="!authStore.isAuthenticated">
              <NuxtLink to="/login" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm" @click="closeMobileMenu">
                Se connecter
              </NuxtLink>
            </li>
            <li v-if="!authStore.isAuthenticated">
              <NuxtLink to="/register" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm" @click="closeMobileMenu">
                Créer un compte
              </NuxtLink>
            </li>
            <li v-if="authStore.isAuthenticated">
                <NuxtLink to="/account" class="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-primary text-sm" @click="closeMobileMenu">
                    Mon Compte
                </NuxtLink>
            </li>
            <li v-if="authStore.isAuthenticated">
              <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 text-sm">
                Déconnexion
              </button>
            </li>
          </ul>
        </div>

        <NuxtLink to="/cart" class="relative flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors duration-200 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-105 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          <span class="hidden md:inline">Panier</span>
          <span v-if="cartStore.totalItems > 0" class="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {{ cartStore.totalItems }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <div class="lg:hidden max-w-7xl mx-auto flex items-center justify-between mt-4 px-6 md:px-8 pb-4">
      <SearchBar class="flex-grow mr-4" />
      <button @click="toggleMobileMenu" class="text-gray-600 hover:text-primary p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded">
        <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="sub-nav-ba text-white py-2">
        <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <NuxtLink to="/top-ventes" class="flex-shrink-0 flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-4 2.5-4h1.037z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 6l-4.5 4.5M14 6l4.5 4.5M14 6c1.5-1.5 3-3 4.5-3" />
                </svg>
                <span>Top Ventes</span>
            </NuxtLink>

            <NuxtLink to="/nouveautes" class="flex-shrink-0 flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Nouveautés</span>
            </NuxtLink>

            <NuxtLink to="/promotions" class="flex-shrink-0 flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300 text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Promotions</span>
            </NuxtLink>

            <NuxtLink to="/toutes-categories" class="flex-shrink-0 flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Toutes Catégories</span>
            </NuxtLink>

            <NuxtLink to="/support-client" class="flex-shrink-0 flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200 text-sm md:text-base">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9.228a4.5 4.5 0 117.5 0M15 13H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Support Client</span>
            </NuxtLink>
        </div>
    </div>

    <transition name="slide-down">
      <div v-if="mobileMenuOpen" class="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-40 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div class="px-6 md:px-8">
          <nav>
            <h3 class="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Catégories</h3>
            <ul class="flex flex-col space-y-2 mb-6">
              <li v-for="category in productsStore.categories.filter(c => !c.parentCategory)" :key="category.id">
                <NuxtLink :to="`/categorie/${category.slug}`"
                          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200"
                          @click="closeMobileMenu">
                  {{ category.Nom }}
                </NuxtLink>
              </li>
              <li>
                  <NuxtLink to="/top-ventes" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                    Top Ventes
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink to="/nouveautes" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                    Nouveautés
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink to="/promotions" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                    Promotions
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink to="/toutes-categories" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                    Toutes Catégories
                  </NuxtLink>
              </li>
              <li>
                  <NuxtLink to="/support-client" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                    Support Client
                  </NuxtLink>
              </li>
            </ul>

            <h3 class="text-xl font-bold text-gray-900 mb-3 border-b pb-2 pt-4">Mon Compte</h3>
            <ul class="flex flex-col space-y-2">
              <li v-if="!authStore.isAuthenticated">
                <NuxtLink to="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                  Se connecter
                </NuxtLink>
              </li>
              <li v-if="!authStore.isAuthenticated">
                <NuxtLink to="/register" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                  Créer un compte
                </NuxtLink>
              </li>
              <li v-if="authStore.isAuthenticated">
                <NuxtLink to="/account" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary font-semibold text-lg transition-colors duration-200" @click="closeMobileMenu">
                  Mon Compte
                </NuxtLink>
              </li>
              <li v-if="authStore.isAuthenticated">
                <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold text-lg transition-colors duration-200">
                  Déconnexion
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
import { useProductsStore } from '@/stores/products';
import { useAuthStore } from '@/stores/auth';
import SearchBar from '~/components/shared/SearchBar.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const cartStore = useCartStore();
const productsStore = useProductsStore();
const authStore = useAuthStore();
const router = useRouter();

const scrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'; // Empêche le défilement du corps
  } else {
    document.body.style.overflow = ''; // Rétablit le défilement
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const handleLogout = async () => {
    await authStore.logout();
    closeMobileMenu();
    router.push('/');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});

onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.loadAllData();
  }
  authStore.fetchUserWithToken();
});
</script>

<style scoped>
/* Pour l'effet de transition du menu mobile (slide-down) */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* Styles pour les liens de navigation de bureau existants */
.main-nav a:hover {
  @apply underline underline-offset-4 decoration-primary; /* Changed from blue-500 to primary for consistency */
}

/* Masquer la scrollbar sur les éléments défilables horizontalement */
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}
</style>