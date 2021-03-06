import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import { localTheme } from './theme'
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')
require('dotenv').config()

export default defineUserConfig(
   {
      title: "Moonrise Labs",
      description: "A lab-based education platform for software development and cloud computing.",
      port: 3000,
      theme: localTheme({

         // THEME SETTINGS 
         logo: '/logo.png',
         sidebar: ["/gated-example-message.md", "/gated-example-page.md", "payments.md", "sandbox-loader.md", "custom-markdown-text.md", "mux-video.md"],

   
       }),
      head: [
         ['link', { rel: 'icon', href: '/favicon.png' }],
         ["script", { src: "https://js.chargebee.com/v2/chargebee.js" }],
         ['script', {}, `
            window.$crisp=[];window.CRISP_WEBSITE_ID="d1a80d59-2880-4eb6-b1b4-7a7e5605e1aa";(function(){let d=document;let s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
         `]
   ],
      plugins: [
         {
            name: 'environment-variables',
            define: { //currently being ignored in the latest beta
               envVar: process.env, 
            },
         },
         registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
          }),
      ]
   }
)


