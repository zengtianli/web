import { NextResponse } from "next/server"

/**
 * 调试接口 - 检查环境变量配置
 * 仅用于开发/测试，生产环境应该删除
 */
export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {
      resendApiKey: {
        exists: !!process.env.RESEND_API_KEY,
        length: process.env.RESEND_API_KEY?.length || 0,
        prefix: process.env.RESEND_API_KEY?.substring(0, 5) || 'N/A',
        valid: process.env.RESEND_API_KEY?.startsWith('re_') || false,
      },
      contactEmail: {
        exists: !!process.env.CONTACT_EMAIL,
        value: process.env.CONTACT_EMAIL || 'N/A',
        isGmail: process.env.CONTACT_EMAIL?.includes('@gmail.com') || false,
      },
    },
    recommendation: [] as string[],
  }

  // 添加建议
  if (!debugInfo.checks.resendApiKey.exists) {
    debugInfo.recommendation.push('❌ RESEND_API_KEY 未配置')
  } else if (!debugInfo.checks.resendApiKey.valid) {
    debugInfo.recommendation.push('⚠️ RESEND_API_KEY 格式不正确（应该以 re_ 开头）')
  } else {
    debugInfo.recommendation.push('✅ RESEND_API_KEY 配置正确')
  }

  if (!debugInfo.checks.contactEmail.exists) {
    debugInfo.recommendation.push('❌ CONTACT_EMAIL 未配置')
  } else if (!debugInfo.checks.contactEmail.isGmail) {
    debugInfo.recommendation.push('⚠️ CONTACT_EMAIL 不是 Gmail 邮箱（免费账户限制）')
  } else {
    debugInfo.recommendation.push('✅ CONTACT_EMAIL 配置正确')
  }

  return NextResponse.json(debugInfo, { status: 200 })
}

