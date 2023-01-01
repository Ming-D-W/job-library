const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置端口号
  devServer: {
    port: 3080
  },
  lintOnSave:false
})