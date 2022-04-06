// For electron-vue app, config "build" here instead

module.exports = {
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        extraFiles: [
          "static"
        ]
      }
    }
  }
}