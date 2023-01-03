import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    buildModules: ['@nuxtjs/tailwindcss'],
    app: {
        head: {
          meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ],
          script: [
            {
              hid: 'gtm',
              children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.G_TAG_MANAGER}');`,
              type: 'text/javascript'
            }
          ],
          link: [
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300;1,400&display=swap' },
            { rel: 'stylesheet', href: 'main.css' }
          ],
        }
      },
    server: {
        watch: {
          usePolling: true
        }
      },
      privateRuntimeConfig: {
        G_TAG: process.env.G_TAG,
        G_TAG_MANAGER: process.env.G_TAG_MANAGER
    },
})