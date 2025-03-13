export default  function chainWebpack(config) {
  config.module
      .rule("glsl")
      .test(/\.(glsl|vs|fs)$/) // 匹配 .glsl / .vs / .fs 文件
      .type('javascript/auto') // 防止 Webpack 解析成 URL
      .use('shader-loader')
      .loader('shader-loader');

  config.module
    .rule('vtk-js')
    .test(/\.js$/i)
    .include.add(/vtk\.js[/\\]Sources/)
    .end()
    .use('babel-loader')
    .loader('babel-loader')
    .end();

  config.module
    .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader');

/*  config.module
    .rule('vtk-css')
    .test(/\.css$/)
    .exclude.add(/\.module\.css$/)
    .end()
    .include.add(/vtk\.js[/\\]Sources/)
    .end()
    .use('styles')
    .loader('style-loader')
    .loader('css-loader')
    .loader('postcss-loader')
    .end();*/

  config.module
    .rule('vtk-svg')
    .test(/\.svg$/)
    .include.add(/vtk\.js[/\\]Sources/)
    .end()
    .use('raw-loader')
    .loader('raw-loader')
    .end();

 /* config.module
    .rule('vtk-module-css')
    .test(/\.css$/)
    .include.add(/vtk\.js[/\\]Sources/)
    .add(/\.module\.css$/)
    .end()
    .use('styles')
    .loader('style-loader')
    .loader('css-loader')
    .options({
      modules: {
        localIdentName: '[name]-[local]_[sha512:hash:base64:5]',
      },
    })
    .loader('postcss-loader')
    .end();*/

}
