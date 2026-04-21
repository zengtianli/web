#!/bin/bash
set -e
source ~/Dev/devtools/lib/vps_config.sh
REMOTE_DIR="/opt/website"

echo "🧹 Cleaning previous build..."
rm -rf .next

echo "📦 Building..."
pnpm build

echo "🔍 Building search index..."
python3 scripts/build-search-index.py || echo "⚠️  Search index build failed, skipping"

echo "📦 Syncing to VPS..."
# standalone（-L 解析 symlink）
rsync -avzL --delete .next/standalone/ "$VPS:$REMOTE_DIR/" || true
# static 和 public 必须来自同一次构建
rsync -avz --delete .next/static/ "$VPS:$REMOTE_DIR/.next/static/" || true
rsync -avz --delete public/ "$VPS:$REMOTE_DIR/public/" || true
rsync -avz data/ "$VPS:$REMOTE_DIR/data/" || true

# Next.js standalone trace 在 pnpm + Next 15 下经常漏 next 自己的运行时依赖
# (styled-jsx / @swc/helpers 等)。standalone/node_modules 只有 3 个顶层 dirs。
# 简单粗暴 fix: 把本地完整 node_modules (含 .pnpm symlink 结构) sync 过去，
# 覆盖 standalone 不全的 node_modules。约 153MB 增量 sync。
# (2026-04-21 事故：deploy 后 502，Cannot find module 'styled-jsx/package.json')
echo "📦 Syncing full node_modules (covers standalone trace miss)..."
rsync -avz node_modules/ "$VPS:$REMOTE_DIR/node_modules/" >/dev/null

echo "🔄 Restarting service..."
ssh "$VPS" "systemctl restart website"

# 部署后验证
echo "🔍 Verifying deployment..."
sleep 3
HTTP_CODE=$(curl --noproxy '*' -s -o /dev/null -w "%{http_code}" https://tianlizeng.cloud)
if [ "$HTTP_CODE" = "200" ]; then
  # 检查 CSS 是否匹配
  CSS_IN_HTML=$(curl --noproxy '*' -s https://tianlizeng.cloud | grep -o '/_next/static/css/[^"]*' | head -1)
  CSS_FILE=$(basename "$CSS_IN_HTML" 2>/dev/null)
  CSS_EXISTS=$(ssh "$VPS" "test -f $REMOTE_DIR/.next/static/css/$CSS_FILE && echo yes || echo no")
  if [ "$CSS_EXISTS" = "yes" ]; then
    echo "✅ Deployed! CSS OK. https://tianlizeng.cloud"
  else
    echo "⚠️  HTTP 200 but CSS mismatch: $CSS_FILE not found on VPS"
    echo "    Re-syncing static..."
    rsync -avz --delete .next/static/ "$VPS:$REMOTE_DIR/.next/static/"
    ssh "$VPS" "systemctl restart website"
    echo "✅ Re-synced and restarted."
  fi
  # 检查服务端有无报错
  ERRORS=$(ssh "$VPS" "journalctl -u website --no-pager -n 5 --since '5 sec ago' 2>/dev/null" | grep -c '⨯' || true)
  if [ "$ERRORS" -gt 0 ]; then
    echo "⚠️  Server has $ERRORS error(s) in recent logs. Check: ssh $VPS journalctl -u website -n 20"
  fi
else
  echo "❌ Deploy failed! HTTP $HTTP_CODE"
  echo "   Check: ssh $VPS journalctl -u website -n 20"
fi
