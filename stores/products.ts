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
      const baseUrl = config.public.strapiBaseUrl

      // CORRECTION : Utilisez 'mainImage' et assurez-vous que baseUrl est sans slash final
      const productsResponse = await $fetch(`${baseUrl}/api/produits?populate=mainImage,category,brand`)
      products.value = (productsResponse as any).data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        // CORRECTION : Mappage simplifié de l'image
        mainImage: item.attributes.mainImage || null,
        category: item.attributes.category?.data?.attributes ? { id: item.attributes.category.data.id, ...item.attributes.category.data.attributes } : null,
        anscienPrix: item.attributes.prixReduit || null,
      }))

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
  }
})