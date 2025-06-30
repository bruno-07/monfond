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
    // Logique de filtrage basée sur selectedCategory/selectedSubcategory
    let filtered = products.value;
    if (selectedCategory.value) {
      filtered = filtered.filter(p => p.category?.id === selectedCategory.value);
    }
    // Ajouter la logique pour selectedSubcategory ici si applicable
    return filtered;
  })

  const loadAllData = async () => {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const baseUrl = config.public.strapiBaseUrl

      // Exemple de fetch pour les produits avec population
      // Assurez-vous que Strapi est configuré pour renvoyer les images et catégories
      const productsResponse = await $fetch(`${baseUrl}/api/products?populate=image,category,brand`)
      products.value = (productsResponse as any).data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        // Adapter la structure si l'image est un tableau ou un objet simple
        image: item.attributes.image?.data ? item.attributes.image.data[0]?.attributes : null,
        category: item.attributes.category?.data?.attributes ? { id: item.attributes.category.data.id, ...item.attributes.category.data.attributes } : null,
        // ansienPrix doit être prixReduit ou similaire, si c'est le cas dans Strapi
        anscienPrix: item.attributes.prixReduit || null, // Adapter le nom de l'attribut
      }))

      // Exemple de fetch pour les catégories avec population de sous-catégories
      // Assurez-vous que votre modèle Category dans Strapi a une relation 'subCategories'
      const categoriesResponse = await $fetch(`${baseUrl}/api/categories?populate=subCategories.parentCategory`)
      categories.value = (categoriesResponse as any).data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        subCategories: item.attributes.subCategories?.data ? item.attributes.subCategories.data.map((subItem: any) => ({
            id: subItem.id,
            ...subItem.attributes
        })) : [],
      }));

    } catch (err: any) {
      error.value = `Erreur de chargement des données: ${err.message}`
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const setSelectedCategory = (categoryId: number | null) => {
    selectedCategory.value = categoryId
    selectedSubcategory.value = null // Réinitialiser la sous-catégorie lors du changement de catégorie principale
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
  }
})