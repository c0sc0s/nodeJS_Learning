const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    "/api": {
      target: "http://localhost:9527",
    }
  }
})
