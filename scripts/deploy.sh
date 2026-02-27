#!/bin/bash
# 部署脚本：将 symlink 临时替换为实际文件，提交推送后恢复
# 用法: bash scripts/deploy.sh "commit message"

set -e

cd "$(git rev-parse --show-toplevel)"

COMMIT_MSG="${1:-deploy: 更新内容}"

# 需要处理的 symlink 列表（只处理 git 跟踪的、指向外部目录的 symlink）
SYMLINKS=()
TARGETS=()

# 自动发现项目中被 git 跟踪的 symlink（排除 node_modules/.next/.cursor）
while IFS= read -r file; do
  [[ "$file" == .cursor/* ]] && continue
  [[ "$file" == node_modules/* ]] && continue
  [[ "$file" == .next/* ]] && continue
  if [ -L "$file" ]; then
    target=$(readlink "$file")
    if [ -e "$target" ]; then
      SYMLINKS+=("$file")
      TARGETS+=("$target")
    else
      echo "⚠️  跳过: $file -> $target (目标不存在)"
    fi
  fi
done < <(git ls-files -s | awk '$1 == "120000" {print $4}')

if [ ${#SYMLINKS[@]} -eq 0 ]; then
  echo "没有需要处理的 symlink，直接提交推送"
  git add -A
  git commit -m "$COMMIT_MSG" || echo "没有新的改动需要提交"
  git push origin main
  exit 0
fi

echo "📋 发现 ${#SYMLINKS[@]} 个 symlink 需要处理:"
for i in "${!SYMLINKS[@]}"; do
  echo "   ${SYMLINKS[$i]} -> ${TARGETS[$i]}"
done

# 步骤 1: 替换 symlink 为实际文件
echo ""
echo "🔄 替换 symlink 为实际文件..."
for i in "${!SYMLINKS[@]}"; do
  link="${SYMLINKS[$i]}"
  target="${TARGETS[$i]}"
  rm "$link"
  if [ -d "$target" ]; then
    cp -r "$target" "$link"
  else
    cp "$target" "$link"
  fi
  echo "   ✅ $link"
done

# 步骤 2: 提交并推送
echo ""
echo "📦 提交并推送..."
git add -A
git commit -m "$COMMIT_MSG" || echo "没有新的改动需要提交"
git push origin main

# 步骤 3: 恢复 symlink
echo ""
echo "🔗 恢复 symlink..."
for i in "${!SYMLINKS[@]}"; do
  link="${SYMLINKS[$i]}"
  target="${TARGETS[$i]}"
  rm -rf "$link"
  ln -s "$target" "$link"
  echo "   ✅ $link -> $target"
done

echo ""
echo "🎉 部署完成！本地 symlink 已恢复。"
