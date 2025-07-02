// stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const API_BASE_URL = 'https://mighty-kindness-3674f7b18e.strapiapp.com';

  const user = useStorage('auth-user', null);
  const token = useStorage('auth-token', null);
  const isAuthenticated = ref(false);
  const loading = ref(false);
  const error = ref(null);
  const successMessage = ref(null);

  if (token.value) {
    isAuthenticated.value = true;
  }

  // Fonctions d'aide pour gérer les messages d'état
  const clearMessages = () => {
    error.value = null;
    successMessage.value = null;
  };

  const setSuccess = (message) => {
    successMessage.value = message;
    error.value = null;
  };

  const setError = (message) => {
    error.value = message;
    successMessage.value = null;
  };

  const apiCall = async (endpoint, method, data = null) => {
    loading.value = true;
    clearMessages(); // <-- S'assure que cela est appelé pour effacer les messages précédents
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
        // Gérer les erreurs spécifiques de Strapi
        if (responseData.error && responseData.error.message) {
          throw new Error(responseData.error.message);
        }
        throw new Error(`Erreur API: ${response.statusText}`);
      }
      return responseData;
    } catch (e) {
      setError(e.message || 'Une erreur inattendue est survenue.');
      return null;
    } finally {
      loading.value = false;
    }
  };

  const registerUser = async (email, username, password) => {
    const response = await apiCall('auth/local/register', 'POST', {
      email,
      username,
      password,
    });
    if (response && response.user) {
      setSuccess("Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.");
      router.push('/check-your-email');
      return { success: true, user: response.user };
    }
    return { success: false };
  };

  const login = async (identifier, password) => {
    const response = await apiCall('auth/local', 'POST', {
      identifier,
      password,
    });
    if (response && response.jwt) {
      token.value = response.jwt;
      user.value = response.user;
      isAuthenticated.value = true;
      setSuccess("Connexion réussie ! Redirection...");
      router.push('/');
      return true;
    }
    return false;
  };

  const handleConfirmationJwt = async (jwt) => {
    if (!jwt) {
      setError("Jeton de confirmation manquant ou invalide.");
      return false;
    }

    const response = await apiCall(`auth/email-confirmation?confirmation=${jwt}`, 'GET');
    if (response && response.jwt && response.user) {
        token.value = response.jwt;
        user.value = response.user;
        isAuthenticated.value = true;
        setSuccess("Votre compte a été vérifié avec succès. Redirection...");
        router.push('/account');
        return true;
    } else {
        setError(error.value || "Impossible de confirmer le compte. Lien invalide ou expiré.");
        return false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    isAuthenticated.value = false;
    clearMessages();
    router.push('/auth/login');
    return true;
  };

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

  const updateUser = async (userId, userData) => {
    const response = await apiCall(`users/${userId}`, 'PUT', userData);
    if (response) {
      user.value = response;
      setSuccess("Profil mis à jour avec succès !");
      return true;
    }
    return false;
  };

  const forgotPassword = async (email) => {
    const response = await apiCall('auth/forgot-password', 'POST', { email });
    if (response) {
      setSuccess("Si l'adresse e-mail existe, un lien de réinitialisation vous a été envoyé.");
      return true;
    }
    return false;
  };

  const resetPassword = async (code, password, passwordConfirmation) => {
    const response = await apiCall('auth/reset-password', 'POST', {
      code,
      password,
      passwordConfirmation,
    });
    if (response && response.jwt) {
      token.value = response.jwt;
      user.value = response.user;
      isAuthenticated.value = true;
      setSuccess("Votre mot de passe a été réinitialisé avec succès ! Redirection vers la page de connexion...");
      router.push('/login');
      return true;
    }
    return false;
  };

  // NOUVELLE ACTION : changer le mot de passe de l'utilisateur connecté
  const changePassword = async (payload) => {
    // payload doit contenir currentPassword, password, passwordConfirmation
    const response = await apiCall('auth/change-password', 'POST', payload);
    if (response) {
        setSuccess("Votre mot de passe a été modifié avec succès !");
        return true;
    }
    return false;
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    successMessage,
    registerUser,
    login,
    logout,
    fetchUserWithToken,
    updateUser,
    handleConfirmationJwt,
    forgotPassword,
    resetPassword,
    changePassword, // <--- TRÈS IMPORTANT : Ajouté ici pour l'exporter !
    clearError: clearMessages, // <-- C'est un alias pour la rétrocompatibilité
    setSuccess,
    setError, // <-- S'assure que setError est exporté
    clearMessages // <-- S'assure que clearMessages est exporté directement
  };
});