# ✅ Vercel 环境变量配置检查清单

## 1. 确认环境变量已添加

访问 Vercel Dashboard 检查：

### 步骤：

1. 访问：https://vercel.com/dashboard
2. 选择你的项目（portfolio）
3. 点击 **Settings** 标签
4. 左侧菜单点击 **Environment Variables**

### 必须添加的变量：

```
变量名：RESEND_API_KEY
值：re_bbznNopa_CSyURHqvSobRA38tasEB2UFM
应用环境：✅ Production ✅ Preview ✅ Development

变量名：CONTACT_EMAIL  
值：zengtianli1@gmail.com
应用环境：✅ Production ✅ Preview ✅ Development
```

⚠️ **重要**：
- 确保变量名**完全一致**（大小写敏感）
- 确保值中**没有多余的空格**
- 确保选中了 **Production** 环境

---

## 2. 重新部署

添加或修改环境变量后，**必须重新部署**才能生效！

### 方法 1：触发新部署（推荐）

1. 进入项目 Dashboard
2. 点击 **Deployments** 标签
3. 找到最新的部署
4. 点击右侧的 **...** 菜单
5. 选择 **Redeploy**
6. 确认 **Redeploy**

### 方法 2：推送新代码

```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

---

## 3. 检查部署日志

### 查看构建日志：

1. 进入 **Deployments** 标签
2. 点击最新的部署
3. 查看 **Building** 日志
4. 确认没有错误信息

### 查看运行时日志：

1. 点击 **Functions** 标签
2. 找到 `/api/contact` 函数
3. 查看最近的请求日志
4. 查看是否有错误信息

---

## 4. 测试部署后的表单

### 在线测试：

访问你的生产网站：
```
https://tianlizeng.cloud/contact
```

填写表单并提交，然后：

1. 打开浏览器开发者工具（F12）
2. 切换到 **Network** 标签
3. 提交表单
4. 找到 `/api/contact` 请求
5. 查看响应状态和内容

### 预期响应：

**成功 (200)**：
```json
{
  "success": true,
  "message": "消息发送成功"
}
```

**失败 (500)**：
```json
{
  "error": "邮件服务未配置，请联系管理员"
}
```
→ 说明环境变量未配置或未生效

---

## 5. 常见问题排查

### 问题 1：环境变量未生效

**症状**：
- 提交表单后显示"邮件服务未配置"
- 或返回 500 错误

**解决**：
1. 检查环境变量名称是否正确（区分大小写）
2. 确保选中了 **Production** 环境
3. **重新部署**（这是关键！）
4. 清除浏览器缓存

### 问题 2：API Key 无效

**症状**：
- 返回 403 或 401 错误
- 显示"Unauthorized"

**解决**：
1. 登录 Resend Dashboard
2. 检查 API Key 是否有效
3. 如果需要，重新生成 API Key
4. 更新 Vercel 环境变量
5. 重新部署

### 问题 3：收件地址限制

**症状**：
- 返回 403 错误
- 消息："You can only send testing emails to your own email"

**解决**：
- Resend 免费账户只能发送到注册邮箱
- 确保 `CONTACT_EMAIL` 设置为 `zengtianli1@gmail.com`
- 或验证自定义域名

### 问题 4：部署后函数超时

**症状**：
- 请求超过 10 秒没有响应
- 返回 504 错误

**解决**：
1. 检查 Resend API 是否正常
2. 查看函数日志
3. 考虑添加超时处理

---

## 6. 手动测试 API

### 使用 curl 测试：

```bash
curl -X POST https://tianlizeng.cloud/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "subject": "测试",
    "message": "这是测试消息"
  }'
```

### 预期输出：

**成功**：
```json
{"success":true,"message":"消息发送成功"}
```

**失败**：
```json
{"error":"错误信息"}
```

---

## 7. 验证邮件接收

### 检查 Gmail：

1. 登录 `zengtianli1@gmail.com`
2. 检查"主要邮件"
3. 检查"垃圾邮件"
4. 检查"社交"标签

### 邮件特征：

- 发件人：Portfolio Contact Form
- 标题：[网站留言] XXX
- 包含表单提交的所有信息

---

## 8. Debug 模式

### 临时添加日志（可选）：

修改 `app/api/contact/route.ts`，添加更多日志：

```typescript
export async function POST(request: NextRequest) {
  console.log('📧 Contact form request received')
  console.log('API Key exists:', !!process.env.RESEND_API_KEY)
  console.log('Contact email:', process.env.CONTACT_EMAIL)
  
  // ... 其他代码
}
```

然后：
1. 提交代码
2. 部署
3. 查看 Vercel Functions 日志

---

## ✅ 检查清单

在联系我之前，请确认：

- [ ] Vercel 环境变量已添加（RESEND_API_KEY, CONTACT_EMAIL）
- [ ] 环境变量选中了 Production 环境
- [ ] 已经重新部署（这是最常见的遗漏！）
- [ ] 构建日志没有错误
- [ ] 浏览器控制台没有错误
- [ ] 已检查 Gmail 邮箱（包括垃圾邮件）
- [ ] API Key 格式正确（re_xxxxx）
- [ ] 收件邮箱是 zengtianli1@gmail.com

---

## 🔧 快速修复方案

如果以上都检查过了还是不行，尝试：

### 方案 1：完全重新配置

1. 删除现有环境变量
2. 重新添加（复制粘贴，避免手误）
3. 确保选中所有环境
4. 强制重新部署

### 方案 2：检查 API Key

```bash
# 测试 API Key 是否有效
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer re_bbznNopa_CSyURHqvSobRA38tasEB2UFM' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "onboarding@resend.dev",
    "to": "zengtianli1@gmail.com",
    "subject": "Test",
    "html": "<p>Test</p>"
  }'
```

如果返回成功，说明 API Key 有效。

---

## 📞 需要帮助？

如果完成以上所有步骤后仍然无法发送邮件，请提供：

1. Vercel 部署日志（截图或文字）
2. 浏览器 Network 标签中 `/api/contact` 的响应
3. 表单提交时的错误信息

这样我可以更精准地帮助你解决问题！

---

*最后更新：2025年1月10日*

