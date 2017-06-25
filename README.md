#### 项目状态

##### Master

[![Build Status](https://travis-ci.org/qious/ss-panel.svg?branch=master)](https://travis-ci.org/qious/ss-panel)
[![Coverage Status](https://coveralls.io/repos/github/qious/ss-panel/badge.svg?branch=master)](https://coveralls.io/github/qious/ss-panel?branch=master)


##### Develop

[![Build Status](https://travis-ci.org/qious/ss-panel.svg?branch=develop)](https://travis-ci.org/qious/ss-panel)
[![Coverage Status](https://coveralls.io/repos/github/qious/ss-panel/badge.svg?branch=develop)](https://coveralls.io/github/qious/ss-panel?branch=develop)


### **线上运行**

```bash
cd /path/to/ss-panel/server/
npm install
cp config/default.js config/local.js
cp pm2.sample.json pm2.json
npm run start
```

### **协作开发**

```bash
# 后端开发
cd /path/to/ss-panel/server
npm install
npm run dev

# 前端开发
cd /path/to/ss-panel/client
npm install
npm run dev
```

#### **单元测试**

```bash
cd /path/to/ss-panel/server
npm run test                # 运行所有测试
npm run test -- -g network  # 只测试 network
npm run cover               # 测试覆盖率
```

### **效果展示**

成员角色分为用户与管理员，下图展示为管理员角色

![效果展示](screenshot/1.gif)

### **关联项目**

* [shadowsocks-manyuser](https://github.com/qious/shadowsocks-manyuser)
