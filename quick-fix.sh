#!/bin/bash
# 快速修复脚本 - 一键优化性能问题

echo "🚀 开始优化..."

# 1. 清理缓存
echo "📦 清理缓存..."
rm -rf .next
rm -rf node_modules/.cache
echo "✅ 缓存已清理"

# 2. 创建临时 SVG favicon（如果不存在）
if [ ! -f "public/favicon.svg" ]; then
    echo "🎨 创建临时 favicon..."
    cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#0ea5e9"/>
  <text x="50" y="70" font-size="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">曾</text>
</svg>
EOF
    echo "✅ Favicon 已创建"
fi

# 3. 检查未使用的粒子包
echo "🔍 检查未使用的包..."
if grep -q "react-particles" package.json; then
    echo "⚠️  发现 react-particles 包"
    echo "💡 提示：如果不使用粒子效果，可以运行："
    echo "   pnpm remove react-particles tsparticles-engine tsparticles-slim"
fi

echo ""
echo "✨ 优化完成！"
echo ""
echo "📋 下一步："
echo "1. 停止开发服务器 (Ctrl+C)"
echo "2. 运行: pnpm dev"
echo "3. 访问 http://localhost:3000/tools 测试性能"
echo ""

