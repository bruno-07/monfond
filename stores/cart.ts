// stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string // URL de l'image
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const addItem = (product: { id: number; name: string; price: number; image?: string }) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (productId: number) => {
    items.value = items.value.filter(item => item.id !== productId)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
}, {
  // Pour persister le panier entre les sessions
  // Vous devrez installer pinia-plugin-persistedstate: npm install pinia-plugin-persistedstate
  // Et l'ajouter à votre nuxt.config.ts dans les plugins
  // plugins: ['~/plugins/pinia-persistedstate.client.ts']
  // Et dans nuxt.config.ts, dans la section modules, assurez-vous d'avoir '@pinia/nuxt'
  persist: true 
})