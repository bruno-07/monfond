// stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const API_BASE_URL = 'https://mighty-kindness-3674f7b18e.strapiapp.com'; // Votre URL Strapi

  const user = useStorage('auth-user', null);
  const token = useStorage('auth-token', null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);

  // Initialisation de l'état d'authentification
  if (token.value) {
    isAuthenticated.value = true;
  }

  const apiCall = async (endpoint, method, data = null) => {
    loading.value = true;
    error.value = null;
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`;
      }

      const config = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      };

      const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, config);
      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error && responseData.error.message) {
          throw new Error(responseData.error.message);
        }
        throw new Error(`Erreur API: ${response.statusText}`);
      }
      return responseData;
    } catch (e) {
      error.value = e.message || 'Une erreur inattendue est survenue.';
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Enregistrement de l'utilisateur
  const registerUser = async (email, username, password) => {
    const response = await apiCall('auth/local/register', 'POST', {
      email,
      username,
      password,
    });
    // Si l'enregistrement réussit, Strapi devrait maintenant gérer l'envoi de l'email de confirmation.
    // Nous ne logguons pas l'utilisateur ici car il doit confirmer son email.
    if (response && response.user) {
      return { success: true, user: response.user };
    }
    return { success: false };
  };

  // Connexion de l'utilisateur
  const login = async (identifier, password) => {
    const response = await apiCall('auth/local', 'POST', {
      identifier,
      password,
    });
    if (response && response.jwt) {
      token.value = response.jwt;
      user.value = response.user;
      isAuthenticated.value = true;
      return true;
    }
    return false;
  };

  // NOUVELLE FONCTION : Gérer le JWT reçu après confirmation d'email
  const handleConfirmationJwt = async (jwt) => {
    if (!jwt) {
      error.value = "Jeton de confirmation manquant ou invalide.";
      return false;
    }
    token.value = jwt; // Définir le jeton
    isAuthenticated.value = true;

    // Tenter de récupérer les informations utilisateur avec le nouveau token
    const fetchedUser = await apiCall('users/me', 'GET');
    if (fetchedUser) {
      user.value = fetchedUser;
      return true;
    } else {
      // Si la récupération échoue, le token est peut-être invalide ou expiré
      await logout();
      error.value = "Impossible de récupérer les informations utilisateur avec le jeton fourni.";
      return false;
    }
  };

  // Déconnexion de l'utilisateur
  const logout = async () => {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
    return true;
  };

  // Récupérer les informations de l'utilisateur avec le token actuel
  const fetchUserWithToken = async () => {
    if (token.value && !user.value) {
      const response = await apiCall('users/me', 'GET');
      if (response) {
        user.value = response;
        isAuthenticated.value = true;
      } else {
        await logout();
      }
    } else if (!token.value) {
      isAuthenticated.value = false;
    }
  };

  // Mettre à jour les informations de l'utilisateur
  const updateUser = async (userId, userData) => {
    const response = await apiCall(`users/${userId}`, 'PUT', userData);
    if (response) {
      user.value = response;
      return true;
    }
    return false;
  };

  // Effacer les erreurs
  const clearError = () => {
    error.value = null;
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    registerUser,
    login,
    logout,
    fetchUserWithToken,
    updateUser,
    handleConfirmationJwt, // Exporter la nouvelle fonction
    clearError
  };
});