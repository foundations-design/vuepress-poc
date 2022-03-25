import { defineClientAppEnhance } from '@vuepress/client'
import { createAuth0 } from '@auth0/auth0-vue'


export default defineClientAppEnhance(({ app, router, siteData }) => {

   app.use(
      createAuth0({
         domain: 'moonriselabs.us.auth0.com',
         client_id: 'WMsT695PH1j7fGGwvmpns1F6WzogKSmB',
         redirect_uri: window.location.origin,
         audience: 'https://api.moonriselabs.com'
      })
   );
})