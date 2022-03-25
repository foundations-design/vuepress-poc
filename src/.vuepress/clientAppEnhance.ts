import { defineClientAppEnhance } from '@vuepress/client'
import { createRouter, createWebHashHistory } from 'vue-router';
import { createAuth0, authGuard } from '@auth0/auth0-vue'



export default defineClientAppEnhance(({ app, router, siteData }) => {

   // IDK if this is required for authGuards, but it's included in the Auth0 docs
   router.options.history = createWebHashHistory()

   // There's probably a cleaner way to do this
   router.beforeResolve(to => {
      // If I can access the frontmatter here, I can automatically block routes by setting the a frontmatter field (ex. requiresAuth:true)
      if (to.meta.title === "Gated Example Page") {
         console.log(to.meta.title)
         return authGuard(to)
      }
   })
   
   app.use(
      createAuth0({
         domain: 'moonriselabs.us.auth0.com',
         client_id: 'WMsT695PH1j7fGGwvmpns1F6WzogKSmB',
         redirect_uri: window.location.origin,
         audience: 'https://api.moonriselabs.com'
      })
   );

})