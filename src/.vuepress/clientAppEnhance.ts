import { defineClientAppEnhance } from '@vuepress/client'
import { createAuth0 } from '@auth0/auth0-vue'


export default defineClientAppEnhance(({ app, router, siteData }) => {

   app.use(
      createAuth0({
         domain: 'dev--gfwsnfx.us.auth0.com',
         client_id: 'nG7u9oSmtffIkMRSNbCb96vqFcb4voqa',
         // redirect_uri: '<MY_CALLBACK_URL>'
      })
   );
})