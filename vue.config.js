const path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/a-v-datatable/" : "/",
    configureWebpack: {
        // if (process.env.NODE_ENV === "production") {
        //     // mutate config for production...
        // } else {
        //     // mutate for development...
        // }
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist")
        }
    },
    // chainWebpack: config => {
    //     config.entryPoints.delete("app");
    //     config.entry("main").clear();
    //     config.entry("main").add("./src/install.js");
    // }
};
