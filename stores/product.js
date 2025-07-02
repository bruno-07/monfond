// stores/product.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNuxtApp } from '#app'; // Pour accéder à $api ou API_BASE_URL si défini globalement

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const product = ref(null); // Pour un seul produit (détail)
  const loading = ref(false);
  const error = ref(null);

  // Vous devrez peut-être ajuster comment vous obtenez API_BASE_URL
  // Si vous l'avez défini globalement via un runtimeConfig ou un plugin, utilisez-le.
  // Sinon, reprenez-le de authStore ou définissez-le ici.
  // Exemple si vous le reprenez de authStore (moins idéal mais fonctionne):
  const API_BASE_URL = 'https://mighty-kindness-3674f7b18e.strapiapp.com'; // Assurez-vous que c'est la bonne URL de base de votre Strapi

  const clearMessages = () => {
    error.value = null;
  };

  // Action pour récupérer tous les produits
  const fetchProducts = async () => {
    loading.value = true;
    clearMessages();
    try {
      // populate=* pour inclure les images ou autres relations si elles sont configurées
      const response = await fetch(`${API_BASE_URL}/api/produits?populate=*`);
      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error && responseData.error.message) {
          throw new Error(responseData.error.message);
        }
        throw new Error(`Erreur lors de la récupération des produits: ${response.statusText}`);
      }

      products.value = responseData.data.map(item => ({
        id: item.id,
        ...item.attributes
      })); // Map pour obtenir les attributs directement
      return true;

    } catch (e) {
      console.error("Erreur de récupération des produits:", e);
      error.value = e.message || 'Impossible de récupérer les produits.';
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Action pour récupérer un seul produit par son slug ou ID
  const fetchProductBySlug = async (slug) => {
    loading.value = true;
    clearMessages();
    try {
      // Utilisez un filtre sur le slug pour récupérer un produit spécifique
      // Le `populate=*` est important pour avoir l'image du produit
      const response = await fetch(`${API_BASE_URL}/api/produits?filters[slug][$eq]=${slug}&populate=*`);
      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error && responseData.error.message) {
          throw new Error(responseData.error.message);
        }
        throw new Error(`Erreur lors de la récupération du produit: ${response.statusText}`);
      }

      if (responseData.data && responseData.data.length > 0) {
        product.value = {
          id: responseData.data[0].id,
          ...responseData.data[0].attributes
        };
        return true;
      } else {
        product.value = null; // Produit non trouvé
        return false;
      }

    } catch (e) {
      console.error("Erreur de récupération du produit:", e);
      error.value = e.message || 'Impossible de récupérer le produit.';
      return false;
    } finally {
      loading.value = false;
    }
  };


  return {
    products,
    product,
    loading,
    error,
    fetchProducts,
    fetchProductBySlug,
    clearMessages,
  };
});