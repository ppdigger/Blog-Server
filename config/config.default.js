'use strict';

module.exports = appInfo => {
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'shaoxuhui33',
        // 数据库名
        database: 'blog',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    jwt: {
      secret: "shao"
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524882005699_8000';

  // add your config here
  config.middleware = ['notfoundHandler', 'errorHandler'];

  return config;
};
