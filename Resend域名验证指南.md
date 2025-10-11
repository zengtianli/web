# 🌐 Resend 自定义域名验证指南

## 📋 前提条件

1. ✅ 拥有自己的域名（你有：`tianlizeng.cloud`）
2. ✅ 能够访问域名的 DNS 管理后台
3. ✅ 已注册 Resend 账户

---

## 🎯 验证后的好处

| 功能 | 免费账户（未验证） | 验证域名后 |
|------|------------------|-----------|
| 发件地址 | `onboarding@resend.dev` | `noreply@tianlizeng.cloud` ✨ |
| 收件地址 | 仅注册邮箱 | **任意邮箱** ✨ |
| 邮件额度 | 100封/天 | 100封/天 |
| 专业度 | 普通 | **专业** ✨ |
| 送达率 | 一般 | **更高** ✨ |

---

## 📝 详细步骤

### 步骤 1：登录 Resend

访问：https://resend.com/login

### 步骤 2：进入域名管理

1. 登录后，点击左侧菜单的 **"Domains"**
2. 点击右上角的 **"Add Domain"** 按钮

![Resend Dashboard](https://via.placeholder.com/800x400?text=Resend+Dashboard)

### 步骤 3：添加你的域名

在输入框中填入你的域名：
```
tianlizeng.cloud
```

**注意**：
- ✅ 不要加 `http://` 或 `https://`
- ✅ 不要加 `www.`
- ✅ 只填主域名即可

点击 **"Add"** 按钮。

### 步骤 4：复制 DNS 记录

Resend 会显示需要添加的 DNS 记录，通常包括 3 类：

#### 4.1 MX 记录（用于接收退信）

```
类型：MX
名称：@（或留空）
值：feedback-smtp.us-east-1.amazonses.com
优先级：10
```

#### 4.2 TXT 记录（用于 SPF 验证）

```
类型：TXT
名称：@（或留空）
值：v=spf1 include:amazonses.com ~all
```

#### 4.3 CNAME 记录（用于 DKIM 签名）

通常有 3 条 CNAME 记录，类似：

```
类型：CNAME
名称：resend._domainkey
值：resend._domainkey.tianlizeng.cloud.resend.com

类型：CNAME
名称：resend2._domainkey
值：resend2._domainkey.tianlizeng.cloud.resend.com

类型：CNAME
名称：resend3._domainkey
值：resend3._domainkey.tianlizeng.cloud.resend.com
```

**重要**：具体的值会由 Resend 自动生成，请以 Resend Dashboard 显示的为准！

---

### 步骤 5：添加 DNS 记录到你的域名服务商

你的域名 `tianlizeng.cloud` 应该托管在某个域名服务商，常见的有：

- **Cloudflare**（最推荐，免费且好用）
- **阿里云（万网）**
- **腾讯云 DNSPod**
- **GoDaddy**
- **Namecheap**

#### 5.1 登录你的域名服务商

例如，如果你用的是 **Cloudflare**：

1. 访问：https://dash.cloudflare.com
2. 登录账户
3. 选择域名 `tianlizeng.cloud`
4. 点击左侧菜单的 **"DNS"**
5. 点击 **"Add record"**

#### 5.2 逐条添加 DNS 记录

**添加 MX 记录**：
- Type: `MX`
- Name: `@`
- Mail server: `feedback-smtp.us-east-1.amazonses.com`
- Priority: `10`
- TTL: `Auto`（或 `3600`）
- 点击 **"Save"**

**添加 TXT 记录**：
- Type: `TXT`
- Name: `@`
- Content: `v=spf1 include:amazonses.com ~all`
- TTL: `Auto`
- 点击 **"Save"**

**添加 3 条 CNAME 记录**：
- 对每条 CNAME 记录重复以下步骤：
  - Type: `CNAME`
  - Name: 复制 Resend 提供的名称（如 `resend._domainkey`）
  - Target: 复制 Resend 提供的目标值
  - TTL: `Auto`
  - ⚠️ **关闭橙色云朵**（如果是 Cloudflare）→ 改为 **"DNS only"**
  - 点击 **"Save"**

#### 5.3 特别注意（Cloudflare 用户）

如果你使用 Cloudflare：
- ✅ CNAME 记录的 **Proxy status** 必须是 **"DNS only"**（灰色云朵）
- ❌ 不能是 **"Proxied"**（橙色云朵）

---

### 步骤 6：等待 DNS 传播

添加完 DNS 记录后，需要等待：
- ⏱️ **快的话**：5-10 分钟
- ⏱️ **一般情况**：1-2 小时
- ⏱️ **最慢**：24-48 小时

---

### 步骤 7：验证域名

1. 返回 Resend Dashboard
2. 在 **Domains** 页面找到你的域名
3. 点击域名旁边的 **"Verify"** 按钮

如果一切正确，会显示：
```
✅ Domain verified successfully!
```

如果失败，Resend 会告诉你哪些记录有问题。

---

### 步骤 8：更新代码

验证成功后，修改你的代码：

#### 8.1 更新 API 路由

文件：`app/api/contact/route.ts`

```typescript
await resend.emails.send({
  // 改成你的域名邮箱
  from: "联系表单 <noreply@tianlizeng.cloud>", // ⬅️ 这里改
  to: recipientEmail,
  replyTo: email,
  subject: `[网站留言] ${subject}`,
  // ... 其他配置
})
```

#### 8.2 更新环境变量

文件：`.env.local`

```bash
RESEND_API_KEY=re_bbznNopa_CSyURHqvSobRA38tasEB2UFM
# 现在可以改成任意邮箱了！
CONTACT_EMAIL=zengtianli1@126.com  # ⬅️ 可以用 126 邮箱了
```

---

## 🧪 测试

验证成功后，提交联系表单测试：

1. 访问：http://localhost:3000/contact
2. 填写表单并提交
3. 检查邮箱：`zengtianli1@126.com`
4. 应该能收到邮件，且发件人是 `noreply@tianlizeng.cloud`

---

## 🔍 常见问题

### 1. DNS 记录添加后多久生效？

**答**：通常 10 分钟到 2 小时。可以用以下工具检查：

```bash
# 检查 MX 记录
dig tianlizeng.cloud MX

# 检查 TXT 记录
dig tianlizeng.cloud TXT

# 检查 CNAME 记录
dig resend._domainkey.tianlizeng.cloud CNAME
```

### 2. Resend 一直显示 "Pending verification"？

**可能原因**：
- DNS 记录还没传播完成 → 再等等
- DNS 记录填写错误 → 检查拼写
- Cloudflare 的 CNAME 开启了代理 → 改成 "DNS only"

### 3. 验证失败怎么办？

**步骤**：
1. 点击域名旁的详情查看具体错误
2. Resend 会告诉你哪些记录有问题
3. 返回 DNS 管理后台修改
4. 等待传播后重新验证

### 4. 需要删除旧的 DNS 记录吗？

**答**：
- 如果你的域名之前没有配置过邮件服务，不需要删除
- 如果之前有 MX/SPF 记录，可能需要修改或替换

### 5. 验证域名要花钱吗？

**答**：
- ✅ **完全免费**
- ✅ 不需要付费升级 Resend 账户
- ✅ 免费账户也能验证域名

### 6. 可以验证多个域名吗？

**答**：
- ✅ 可以，免费账户可以验证多个域名
- ✅ 建议先验证主域名即可

---

## 📊 域名服务商 DNS 配置截图

### Cloudflare

```
DNS Records
────────────────────────────────────────────────────
Type    Name                    Content                             Proxy  TTL
MX      tianlizeng.cloud        feedback-smtp.us-east-1...          -      Auto
TXT     tianlizeng.cloud        v=spf1 include:amazonses.com ~all   -      Auto
CNAME   resend._domainkey       resend._domainkey.ti...resend.com   🔘     Auto
CNAME   resend2._domainkey      resend2._domainkey.t...resend.com   🔘     Auto
CNAME   resend3._domainkey      resend3._domainkey.t...resend.com   🔘     Auto
```

**注意**：CNAME 的 Proxy 列必须是灰色圆圈（DNS only），不能是橙色云朵！

---

## 🎉 完成后的效果

验证域名后：

### 邮件外观

```
发件人：联系表单 <noreply@tianlizeng.cloud>  ⬅️ 使用你的域名
收件人：zengtianli1@126.com                  ⬅️ 任意邮箱
主题：[网站留言] 咨询合作

内容：...
```

### 更专业的形象

- ✅ 发件地址是你自己的域名
- ✅ 不会被标记为垃圾邮件
- ✅ 可以发送到任意邮箱
- ✅ 提升品牌形象

---

## 💡 建议

### 对于个人网站

**当前方案（不验证域名）**：
- ✅ 已经够用了
- ✅ 发送到 Gmail 完全正常
- ✅ 省时省力

**建议**：先不急着验证，等网站正式上线再考虑

### 对于商业网站

**强烈建议验证域名**：
- ✅ 更专业
- ✅ 更灵活（可以发送到任意邮箱）
- ✅ 更好的送达率

---

## 📞 需要帮助？

如果在配置过程中遇到问题：

1. **查看 Resend 文档**：https://resend.com/docs/dashboard/domains/introduction
2. **检查 DNS 传播**：https://www.whatsmydns.net/
3. **联系我**：我可以帮你检查配置

---

## ✅ 总结

| 步骤 | 预计时间 | 难度 |
|------|---------|------|
| 1. 在 Resend 添加域名 | 1 分钟 | ⭐ |
| 2. 获取 DNS 记录 | 1 分钟 | ⭐ |
| 3. 添加 DNS 记录 | 5-10 分钟 | ⭐⭐ |
| 4. 等待 DNS 传播 | 10分钟-2小时 | - |
| 5. 验证域名 | 1 分钟 | ⭐ |
| 6. 更新代码 | 2 分钟 | ⭐ |
| **总计** | **约 20-30 分钟** | **⭐⭐** |

---

## 🎯 下一步

**建议操作顺序**：

1. ✅ **先保持现状**：当前配置完全可用（发送到 Gmail）
2. ✅ **测试表单**：确保功能正常
3. ✅ **部署到 Vercel**：配置环境变量
4. 🔜 **有空再验证域名**：不着急，随时可以验证

---

*最后更新：2025年1月10日*


