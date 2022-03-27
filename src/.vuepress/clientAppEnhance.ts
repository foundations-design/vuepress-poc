import { defineClientAppEnhance } from '@vuepress/client'
import { createRouter, createWebHashHistory } from 'vue-router';
import { createAuth0, authGuard } from '@auth0/auth0-vue'


export default defineClientAppEnhance(({ app, router, siteData }) => {
   
   // IDK if this is required for authGuards, but it's included in the Auth0 docs
   // update: next line seems to be causing problems at build
   // router.options.history = createWebHashHistory()
   

   
   if (!__VUEPRESS_SSR__) { // for non-SSR-friendly features 

      // Add Route Guards based on markdown frontmatter
      router.beforeResolve(to => {
         if (to.meta.requiresAuth) {
            return authGuard(to)
         }
      })
      
      // Initialize Auth0 plugin
      app.use(
         createAuth0({
            // domain: 'moonriselabs.us.auth0.com',
            // client_id: 'WMsT695PH1j7fGGwvmpns1F6WzogKSmB',
            domain: 'dev--gfwsnfx.us.auth0.com',
            client_id: 'nG7u9oSmtffIkMRSNbCb96vqFcb4voqa',
            redirect_uri: window.location.origin, //causes build error
            audience: 'https://api.moonriselabs.com'
         })
      );
   }
})