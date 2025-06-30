// plugins/pinia-persistedstate.client.ts
import { createNuxtApp } from '#app'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
  // Ensure pinia is created
  const pinia = nuxtApp.$pinia || createPinia()
  pinia.use(piniaPluginPersistedstate)
})