// middleware/auth.js
import { useAuthStore } from '~/stores/auth'; // Assurez-vous du bon chemin

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Si l'utilisateur n'est PAS authentifié et tente d'accéder à une page du compte
  if (!authStore.isAuthenticated && to.path.startsWith('/account')) {
    // Redirige vers la page de connexion
    // Et stocke la page d'origine pour y revenir après connexion
    return navigateTo('/auth/login');
  }

  // Si l'utilisateur est authentifié, on ne fait rien et on le laisse passer
});