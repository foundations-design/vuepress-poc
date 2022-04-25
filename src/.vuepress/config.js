path = require("path");
require("dotenv").config();

module.exports = {
   title: "VuePress POC",
   description: "Just playing around",
   port: 3000,
   theme: path.resolve(__dirname, './theme'),
   head: [["script", { src: "https://js.chargebee.com/v2/chargebee.js" }],
   ['script', {}, `
      window.$crisp=[];window.CRISP_WEBSITE_ID="d1a80d59-2880-4eb6-b1b4-7a7e5605e1aa";(function(){let d=document;let s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
    `]
],
   plugins: [
      {
         define: {
            envVar: process.env,
         },
      },
      [
         "@vuepress/register-components",
         {
            componentsDir: path.resolve(__dirname, "./components"),
         },
      ],
   ],
   themeConfig: {
      sidebar: ["/gated-example-message.md", "/gated-example-page.md", "payments.md", "sandbox-loader.md", "custom-markdown-text.md", "mux-video.md"],
   },
};
