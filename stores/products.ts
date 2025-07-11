// stores/products.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref<any[]>([])
  const categories = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedCategory = ref<number | null>(null)
  const selectedSubcategory = ref<number | null>(null)

  const filteredProducts = computed(() => {
    let filtered = products.value;
    if (selectedCategory.value) {
      filtered = filtered.filter(p => p.category?.id === selectedCategory.value);
    }
    return filtered;
  })

  const loadAllData = async () => {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      let baseUrl = config.public.strapiBaseUrl

      baseUrl = baseUrl.replace(/\/+$/, '');

      const productsResponse = await $fetch(`${baseUrl}/api/produits?populate=*`)

      // CORRECTION CLÉ : Mappage des produits pour la structure "plate" de votre API Strapi.
      // Les attributs comme Nom, price, mainImage sont directement sur l'objet 'item'.
      products.value = (productsResponse as any).data.map((item: any) => {
        // Vérifie si l'item est valide et a au moins un ID
        if (!item || !item.id) {
          console.warn('Produit mal formé ou sans ID reçu de Strapi, cet élément sera ignoré:', item);
          return null;
        }

        return {
          id: item.id,
          name: item.Nom || null, // Mapper 'Nom' de Strapi vers 'name' dans votre store
          shortDescription: item.shortDescription || null,
          description: item.description || null,
          price: item.price || 0,
          prix_reduit: item.prix_reduit || null,
          ancienPrix: item.ancienPrix || null,
          stock: item.stock || 0,
          dimensions: item.dimensions || null,
          weight: item.weight || null,
          slug: item.slug || null,
          
          // mainImage est directement sur l'objet 'item'
          mainImage: item.mainImage || null,
          
          // Les relations comme category et brand devraient toujours suivre la structure data.attributes si peuplées
          category: item.category?.data?.attributes ? { id: item.category.data.id, ...item.category.data.attributes } : null,
          brand: item.brand?.data?.attributes ? { id: item.brand.data.id, ...item.brand.data.attributes } : null,
          // Ajoutez ici d'autres champs si nécessaire, en accédant directement à item.<nom_du_champ>
        };
      }).filter(Boolean); // Filtre les éléments 'null'

      // CORRECTION CLÉ : Mappage robuste pour les CATÉGORIES
      // Supposons que les catégories ont la même structure "plate" pour les champs primaires,
      // mais des relations comme sousCategories et parentCategorie sont toujours imbriquées avec data.attributes.
      const categoriesResponse = await $fetch(`${baseUrl}/api/categories?populate[0]=sousCategories&populate[1]=parentCategorie`)
      categories.value = (categoriesResponse as any).data.map((item: any) => {
        // Vérifie si l'item de catégorie est valide et a au moins un ID
        if (!item || !item.id) {
          console.warn('Catégorie mal formée ou sans ID reçu de Strapi, cet élément sera ignoré:', item);
          return null;
        }
        
        return {
            id: item.id,
            name: item.name || null, // Utilisez 'name' ou 'Nom' selon le champ réel de votre catégorie dans Strapi
            description: item.description || null,
            // Les sous-catégories sont une relation et devraient être dans data.attributes
            sousCategories: item.sousCategories?.data ? item.sousCategories.data.map((subItem: any) => ({
                id: subItem.id,
                name: subItem.attributes.name || null, // Accédez aux attributs de la sous-catégorie
            })) : [],
            // De même pour parentCategory
            parentCategory: item.parentCategory?.data?.attributes ? { id: item.parentCategory.data.id, ...item.parentCategory.data.attributes } : null,
        };
      }).filter(Boolean); // Filtre les éléments 'null' pour les catégories aussi

    } catch (err: any) {
      error.value = `Erreur de chargement des données: ${err.message}`
      console.error("Erreur complète de chargement de données :", err)
    } finally {
      loading.value = false
    }
  }
  // Dans stores/products.ts, à l'intérieur de defineStore:
// ...
const product = ref<any | null>(null); // Ajoutez cette ligne pour stocker le produit unique

const loadProductBySlug = async (slug: string) => {
  loading.value = true;
  error.value = null;
  product.value = null; // Réinitialiser le produit précédent
  try {
    const config = useRuntimeConfig();
    let baseUrl = config.public.strapiBaseUrl;
    baseUrl = baseUrl.replace(/\/+$/, '');

    // Assurez-vous que le champ 'slug' est unique dans Strapi pour une recherche par slug
    // Et peuplez les images et relations nécessaires
    const response = await $fetch(`${baseUrl}/api/produits?filters[slug][$eq]=${slug}&populate=*`);

    if ((response as any).data && (response as any).data.length > 0) {
      const item = (response as any).data[0];
      // Appliquez la même logique de mappage "plate" que pour loadAllData
      if (item && item.id) {
        product.value = {
          id: item.id,
          name: item.Nom || null,
          shortDescription: item.shortDescription || null,
          description: item.description || null,
          price: item.price || 0,
          prix_reduit: item.prix_reduit || null,
          ancienPrix: item.ancienPrix || null,
          stock: item.stock || 0,
          dimensions: item.dimensions || null,
          weight: item.weight || null,
          slug: item.slug || null,
          mainImage: item.mainImage || null,
          category: item.category?.data?.attributes ? { id: item.category.data.id, ...item.category.data.attributes } : null,
          brand: item.brand?.data?.attributes ? { id: item.brand.data.id, ...item.brand.data.attributes } : null,
        };
      } else {
        error.value = "Données de produit mal formées.";
      }
    } else {
      error.value = "Produit non trouvé.";
    }
  } catch (err: any) {
    error.value = `Erreur de chargement du produit: ${err.message}`;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// N'oubliez pas de retourner 'product' et 'loadProductBySlug' dans votre return {}
// return { products, categories, loading, error, ..., product, loadProductBySlug }
// ...

  const setSelectedCategory = (categoryId: number | null) => {
    selectedCategory.value = categoryId
    selectedSubcategory.value = null
  }

  const setSelectedSubcategory = (subcategoryId: number | null) => {
    selectedSubcategory.value = subcategoryId
  }

  const resetFilters = () => {
    selectedCategory.value = null
    selectedSubcategory.value = null
  }

  return {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    selectedSubcategory,
    filteredProducts,
    loadAllData,
    setSelectedCategory,
    setSelectedSubcategory,
    resetFilters,
    loadProductBySlug,
  }
})