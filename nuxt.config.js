import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    buildModules: ['@nuxtjs/tailwindcss'],
    app: {
        head: {
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
          script: [
          ],
          link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300;1,400&display=swap' },
            { rel: 'stylesheet', href: './public/scrollbar.css' }
          ],
        }
      },
    server: {
        watch: {
          usePolling: true
        }
      }
})