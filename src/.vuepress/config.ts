import { path } from '@vuepress/utils'
import { defineUserConfig } from 'vuepress'
import { localTheme } from './theme'
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components')

export default defineUserConfig(
   {
      title: "VuePress POC",
      description: "Just playing around",
      port: 3000,
      theme: localTheme({
         sidebar: ["/gated-example-message.md", "/gated-example-page.md", "payments.md", "sandbox-loader.md", "custom-markdown-text.md", "mux-video.md"],
       }),
      head: [["script", { src: "https://js.chargebee.com/v2/chargebee.js" }],
      ['script', {}, `
         window.$crisp=[];window.CRISP_WEBSITE_ID="d1a80d59-2880-4eb6-b1b4-7a7e5605e1aa";(function(){let d=document;let s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
       `]
   ],
      plugins: [
         {
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


