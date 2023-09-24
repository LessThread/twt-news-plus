
module.exports = {
  //根目录
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '天外天新闻网'
        return args
      })
  }
};

  