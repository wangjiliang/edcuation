module.exports= {
  configureWebpack:{
    resolve:{
      alias: {
        "assets" : "@/assets",
        "components" : "@/components",
        "views" : "@/views"
      }
    }
  },
	outputDir:'fr',
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.3:8088',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
