path = require("path");

module.exports = {
   title: "VuePress POC",
   description: "Just playing around",
   port: 3000,
   head: [["script", { src: "https://js.chargebee.com/v2/chargebee.js" }]],
   plugins: [
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
