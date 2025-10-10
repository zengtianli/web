# 📧 Resend API 配置指南

## 简介

联系表单功能使用 [Resend](https://resend.com) 服务来发送邮件。Resend 提供免费额度：**每天100封邮件**，对于个人网站完全够用。

---

## 🚀 快速配置步骤

### 1. 注册 Resend 账号

1. 访问：https://resend.com
2. 点击 "Sign Up" 注册账号
3. 使用 GitHub 或 Google 账号登录即可

### 2. 获取 API Key

1. 登录后，进入 Dashboard
2. 左侧菜单点击 "API Keys"
3. 点击 "Create API Key" 按钮
4. 输入名称（例如：`Portfolio Contact Form`）
5. 选择权限：`Full Access` 或 `Sending access`
6. 点击 "Create"
7. **复制生成的 API Key**（以 `re_` 开头）

⚠️ **重要**：API Key 只显示一次，请务必保存好！

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# 接收联系表单消息的邮箱地址
# ⚠️ 重要：免费账户只能发送到注册 Resend 使用的邮箱
CONTACT_EMAIL=zengtianli1@gmail.com
```

**说明**：
- `RESEND_API_KEY`：填入你刚才复制的 API Key
- `CONTACT_EMAIL`：填入你想接收消息的邮箱地址

⚠️ **免费账户限制**：
- 只能发送测试邮件到**注册 Resend 使用的邮箱**
- 如果需要发送到其他邮箱，请验证自定义域名（见下方"高级配置"）

### 4. 重启开发服务器

```bash
pnpm run dev
```

---

## ✅ 测试表单

1. 打开网站：http://localhost:3000/contact
2. 滚动到"发送消息"表单
3. 填写测试信息并提交
4. 检查你的邮箱是否收到通知

---

## 🎯 功能说明

### 发件地址

默认使用 Resend 提供的测试发件地址：
```
onboarding@resend.dev
```

### 回复地址

表单会自动将提交者的邮箱设置为回复地址，你可以直接点击"回复"按钮回复对方。

### 邮件内容

邮件包含：
- 提交者姓名
- 提交者邮箱
- 消息主题
- 消息内容
- 提交时间

### 防垃圾邮件

已实现简单的 Rate Limiting：
- 每个 IP 地址每小时最多提交 5 次
- 超过限制会返回 429 错误

---

## 🔧 高级配置（可选）

### 验证自定义域名

如果你想使用自己的域名作为发件地址（如 `noreply@tianlizeng.cloud`）：

1. 在 Resend Dashboard 中点击 "Domains"
2. 点击 "Add Domain"
3. 输入你的域名
4. 按照提示添加 DNS 记录（MX、TXT、CNAME）
5. 等待验证通过（通常需要几分钟到几小时）

验证后，修改 `app/api/contact/route.ts`：

```typescript
await resend.emails.send({
  from: "Contact Form <noreply@tianlizeng.cloud>", // 改为你的域名
  to: recipientEmail,
  // ... 其他配置
})
```

---

## 📊 监控使用量

在 Resend Dashboard 可以查看：
- 每天发送的邮件数量
- 成功率
- 失败日志

---

## ❓ 常见问题

### 1. 没有收到邮件？

**检查事项**：
- ✅ API Key 是否正确配置
- ✅ `.env.local` 文件是否在根目录
- ✅ 是否重启了开发服务器
- ✅ 检查垃圾邮件箱
- ✅ 查看浏览器控制台是否有错误

### 2. 显示 "邮件服务未配置"？

说明 `RESEND_API_KEY` 环境变量未设置，请检查 `.env.local` 文件。

### 3. 提交后显示 "请求过于频繁"？

触发了 Rate Limiting，请等待 1 小时后再试。

### 4. 想要禁用表单？

暂时注释掉 `app/contact/page.tsx` 中的 `<ContactForm />` 组件即可。

---

## 🎉 完成

配置完成后，你的网站就有了一个功能完整的联系表单！

访问：https://tianlizeng.cloud/contact

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Resend 官方文档：https://resend.com/docs
2. 检查浏览器控制台和服务器日志
3. 联系我获取支持

---

*最后更新：2025年1月10日*

