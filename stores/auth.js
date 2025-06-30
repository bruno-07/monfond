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

  // Enregistrement de l'utilisateur (NE CONNECTE PAS AUTOMATIQUEMENT)
  const registerUser = async (email, username, password) => {
    const response = await apiCall('auth/local/register', 'POST', {
      email,
      username,
      password,
    });
    // Si l'enregistrement réussit, mais pas de JWT (car confirmation email activée)
    if (response && response.user) {
      // Si Strapi renvoie l'utilisateur sans JWT, cela signifie que la confirmation est nécessaire
      return { success: true, needsConfirmation: !response.jwt };
    }
    return { success: false, needsConfirmation: false };
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
    // Gérer spécifiquement le cas où l'utilisateur n'est pas confirmé
    if (error.value && error.value.includes("Your account is not confirmed")) {
        // Optionnel: Vous pouvez définir une erreur plus spécifique ou un état ici
        // pour indiquer à l'UI que le compte n'est pas confirmé.
    }
    return false;
  };

  // NOUVELLE FONCTION : Confirmer le compte avec le jeton
  const confirmAccount = async (confirmationToken) => {
    // Strapi utilise l'endpoint auth/email-confirmation avec le token en paramètre d'URL
    const response = await apiCall(`auth/email-confirmation?confirmation=${confirmationToken}`, 'GET');

    if (response && response.jwt) {
      // Si la confirmation réussit et un JWT est renvoyé, connecter l'utilisateur
      token.value = response.jwt;
      user.value = response.user;
      isAuthenticated.value = true;
      return true;
    }
    // Si la confirmation échoue (token invalide, expiré, etc.)
    return false;
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
    confirmAccount, // Exporter la nouvelle fonction
    clearError
  };
});