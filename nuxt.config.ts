import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app/',
  modules: ['@pinia/nuxt', 'dayjs-nuxt', '@nuxtjs/leaflet'],
  typescript: {
    strict: true,
    typeCheck: false,
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {},
  },
  vite: {
    plugins: [
      // @ts-expect-error - Vite version mismatch in Nuxt dependencies causing incompatible Plugin types
      tailwindcss(),
    ],
  },
  dayjs: {
    locales: ['es'],
    defaultLocale: 'es',
    plugins: ['relativeTime', 'utc', 'timezone'],
  },
})
