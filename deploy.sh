#!/bin/bash
set -e
VPS="root@104.218.100.67"
REMOTE_DIR="/opt/website"

echo "📦 Building..."
pnpm build

echo "📦 Syncing standalone to VPS..."
rsync -avzL --delete .next/standalone/ "$VPS:$REMOTE_DIR/"
rsync -avz --delete .next/static/ "$VPS:$REMOTE_DIR/.next/static/"
rsync -avz --delete public/ "$VPS:$REMOTE_DIR/public/"

echo "🔄 Restarting service..."
ssh "$VPS" "systemctl restart website"

echo "✅ Deployed! https://tianlizeng.cloud"
