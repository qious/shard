#### 项目状态

##### Master

[![Build Status](https://travis-ci.org/qious/shard.svg?branch=master)](https://travis-ci.org/qious/shard)
[![Coverage Status](https://coveralls.io/repos/github/qious/shard/badge.svg?branch=master)](https://coveralls.io/github/qious/shard?branch=master)

##### Develop

[![Build Status](https://travis-ci.org/qious/shard.svg?branch=develop)](https://travis-ci.org/qious/shard)
[![Coverage Status](https://coveralls.io/repos/github/qious/shard/badge.svg?branch=develop)](https://coveralls.io/github/qious/shard?branch=develop)

#### **依赖安装**

```bash
git submodule init
git submodule update
npm install
```

#### **线上运行**

```bash
cp server/config/default.js server/config/local.js
cp pm2.sample.json pm2.json
npm run start
```

#### **协作开发**

* 启动服务器

```bash
npm run dev
```

* 执行测试

```bash
npm run test                # 运行所有测试
npm run test -- -g network  # 只测试 network
npm run cover               # 测试覆盖率
```

* 代码风格/质量检查

```bash
npm run lint
```

#### **目录结构**

    .
    ├── client                // 前端
    └── server
        ├── api               // API定义
        ├── config            // 配置文件
        ├── cron              // 计划任务
        ├── lib               // 通用函数
        ├── middleware        // 中间件
        ├── model             // 数据模型
        ├── resource          // 资源文件
        ├── service           // 业务逻辑
        ├── spec              // swagger
        └── app.js            // 入口文件
        └── cron.js           // 计划任务入口文件

#### **关联项目**
* [shard-front](https://github.com/qious/shard-front) 提供前端页面展示
* [shadowsocks-manyuser](https://github.com/qious/shadowsocks-manyuser) 提供SS服务支持
