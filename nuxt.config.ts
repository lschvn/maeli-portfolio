// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },


  routeRules: {
    '/**': { static: true }
  },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/scripts'],
  css: ['~/assets/css/main.css']
})
