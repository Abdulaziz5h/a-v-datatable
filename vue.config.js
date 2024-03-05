const { defineConfig } = require("@vue/cli-service");
// const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === "production" ? "/a-v-datatable/" : "/",
  lintOnSave: false,
  configureWebpack: {
    // if (process.env.NODE_ENV === "production") {
    //     // mutate config for production...
    // } else {
    //     // mutate for development...
    // }
    // output: {
    //   filename: "[name].bundle.js",
    //   path: path.resolve(__dirname, "dist"),
    // },
  },
  // chainWebpack: (config) => {
  //   config.entryPoints.delete("app");
  //   config.entry("main").clear();
  //   config.entry("main").add("./src/install.js");
  // },
});
