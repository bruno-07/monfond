// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', // <--- Assurez-vous que cette ligne est présente
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/color-mode', // Si vous l'avez ajouté
    // ... autres modules que vous pourriez avoir
  ],
  css: [
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      title: 'Mon E-commerce Incroyable',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Votre description de site e-commerce' }
      ],
      // ...
    }
  },
  runtimeConfig: {
    public: {
      strapiBaseUrl: process.env.NUXT_PUBLIC_STRAPI_BASE_URL || 'https://mighty-kindness-3674f7b18e.strapiapp.com/',
    }
  },
  // Si vous avez configuré pinia-plugin-persistedstate, assurez-vous que le plugin est aussi là
  plugins: [
     '~/plugins/pinia-persistedstate.client.ts', // Si vous l'avez créé
  ],
})