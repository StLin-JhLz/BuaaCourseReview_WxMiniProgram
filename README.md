# 小程序端说明文档

## 基于`TDesign`模板开发

- 基于TDesign开源模板，方便起见目前没有删除模板中原有的页面文件，后续可以删除

- `./miniprogram_npm`为模板文件，（应该）不能删除

## 本commit当前进度说明

已初步完成：登录页、注册页

## Pages说明

- 课程评价部分：发布页、查看页
  - 发布页
  - 查看页

- 信息筛选及展示部分：
  - 课程列表筛选
  - 课程搜索
  - 首页

- 其他：
  - 账户注册页 `login_register/register`
  - 登录页 `login_register/login`
  - 访问统计信息展示页
  - 软件信息页
  - 信息反馈页
  - tabBar

### 登录页

- `data`：formData记录账号密码、showPassword

- `login`：检查账号、密码，若错误则提示，若正确则发送请求，校验账号密码是否正确
- `register`：跳转至注册页
- `inputChange`：更新输入文本框对应的数据

### 注册页

- `data`：formData记录账号密码、showPassword、showPasswordConfirm

- `login`：跳转至登录页
- `register`：跳转至注册页
- `inputChange`：更新输入文本框对应的数据

