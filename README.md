#### 项目状态

##### Master
[![build status](https://gitlab.ticknet.cn/qiujun/shard/badges/master/build.svg)](https://gitlab.ticknet.cn/qiujun/shard/commits/master)
[![coverage report](https://gitlab.ticknet.cn/qiujun/shard/badges/master/coverage.svg)](https://gitlab.ticknet.cn/qiujun/shard/commits/master)

##### Develop
[![build status](https://gitlab.ticknet.cn/qiujun/shard/badges/develop/build.svg)](https://gitlab.ticknet.cn/qiujun/shard/commits/develop)
[![coverage report](https://gitlab.ticknet.cn/qiujun/shard/badges/develop/coverage.svg)](https://gitlab.ticknet.cn/qiujun/shard/commits/develop)

#### **开发环境搭建**

```bash
git submodule init
git submodule update
npm install
sudo npm install -g commitizen cz-conventional-changelog
```

#### **后端开发**

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

* commit代码

```bash
git cz # 也可使用 npm run commit
```

#### **线上运行**

```bash
cp pm2.sample.json pm2.json
npm run start
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
