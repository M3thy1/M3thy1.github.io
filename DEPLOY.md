# GitHub Pages 部署说明

## 部署前配置

### 1. 开启 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. 在 **Source** 部分选择 **GitHub Actions**

### 2. 推送代码到 main 分支

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 3. 查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 查看工作流运行状态
3. 部署完成后，访问: `https://m3thy1.github.io`

## 项目配置说明

- **base**: `/` - 用户站点使用根路径
- **输出目录**: `dist`
- **构建命令**: `npm run build`

## 手动部署（可选）

如果需要手动部署到 gh-pages 分支：

```bash
npm run build
cd dist
git init
git add .
git commit -m "Deploy"
git push -f git@github.com:M3thy1/M3thy1.github.io.git main:gh-pages
```
