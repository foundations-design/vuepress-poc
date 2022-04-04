path = require("path");
require("dotenv").config();

module.exports = {
   title: "VuePress POC",
   description: "Just playing around",
   port: 3000,
   head: [["script", { src: "https://js.chargebee.com/v2/chargebee.js" }]],
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
      sidebar: ["/gated-example-message.md", "/gated-example-page.md", "payments.md", "sandbox-loader.md"],
   },
};
