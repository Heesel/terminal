import VueGtag from 'vue-gtag-next'
import { useRuntimeConfig } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: config.private.G_TAG
    }
  })
})