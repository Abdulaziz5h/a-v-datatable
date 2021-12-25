const path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/vue-datatable/" : "/",
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
    chainWebpack: conf => {
        conf.entry("plugin").add("./src/install.js");
    }
};
