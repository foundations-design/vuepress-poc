import { defineClientAppEnhance } from '@vuepress/client'
import { createRouter, createWebHashHistory } from 'vue-router';
import { createAuth0, authGuard } from '@auth0/auth0-vue'


export default defineClientAppEnhance(({ app, router, siteData }) => {
   
   // IDK if this is required for authGuards, but it's included in the Auth0 docs
   // router.options.history = createWebHashHistory()
   // update: prev line seems to be causing problems at build
   
   // There's probably a cleaner way to do this
   router.beforeResolve(to => {
      // If I can access the frontmatter here, I can automatically block routes by setting the a frontmatter field (ex. requiresAuth:true)
      if (to.meta.requiresAuth) {
         // return authGuard(to)
      }
   })
   
   if (typeof window !== "undefined") {
      // This will only run in the browser where window is defined, so add your event listeners here
      app.use(
         createAuth0({
            domain: 'moonriselabs.us.auth0.com',
            client_id: 'WMsT695PH1j7fGGwvmpns1F6WzogKSmB',
            redirect_uri: window.location.origin, //causes build error
            audience: 'https://api.moonriselabs.com'
         })
      );
   }

   // const isBrowser = typeof window !== "undefined"
   // if (!isBrowser) {
   // }
})