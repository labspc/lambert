# 使用 GitHub Actions 自动化构建 VitePress 内容：从入门到实战


痛点：本站点内容更新每次都需要进行本地化的手动构建，而后进行推送，一方面占用了本地的硬盘资源，另一方面，每次更新都需要手动构建，非常麻烦，我们应该更专注于内容而不被其他事所打扰。
需求：在使用 VitePress 构建的文档项目中，当有新的内容提交到仓库时，自动触发 GitHub Actions 。


## 引言
在现代化的开发工作流中，自动化已成为提高效率的关键因素之一。GitHub Actions 是一个强大的 CI/CD 工具，能够帮助开发者自动化代码构建、测试、部署等任务。本文将介绍 GitHub Actions 的基础知识，并通过一个具体示例讲解如何使用 GitHub Actions 实现 VitePress 内容的自动化构建与部署。

---

## 什么是 GitHub Actions？
GitHub Actions 是 GitHub 提供的 CI/CD（持续集成与持续交付）服务。它允许开发者通过定义 `.yml` 文件配置不同的工作流（Workflow），并根据触发条件自动执行这些工作流。GitHub Actions 的一些核心概念包括：

- **Workflow（工作流）**：由多个步骤（steps）组成的自动化任务。
- **Job（任务）**：工作流中的独立任务，每个 Job 都在独立的虚拟环境中运行。
- **Step（步骤）**：任务中的单个执行步骤，可以是一个 Shell 命令或是第三方操作（Action）。
- **Event（事件）**：触发工作流的条件，比如推送（push）、拉取请求（pull request）、发布（release）等。

GitHub Actions 提供了丰富的现成 Actions 和灵活的配置选项，能帮助开发者快速实现复杂的自动化需求。

---

## 为什么选择 GitHub Actions 来自动构建 VitePress 内容？
VitePress 是一个基于 Vite 构建的静态网站生成器，适合用于创建文档站点。当你频繁更新站点内容时，手动构建并部署会变得非常繁琐。通过 GitHub Actions，我们可以在每次内容更新时，自动触发构建并发布网站，大大提高效率。下面，我们将一步步实现这一流程。

---

### 步骤一：准备 VitePress 项目

略

#### 步骤二：创建 GitHub Actions 工作流
在你的 GitHub 仓库中，创建 `.github/workflows` 文件夹，然后在其中创建一个名为 `deploy.yml` 的文件，添加以下内容：

```yaml
name: Deploy VitePress Site

on:
  push:
    branches:
      - main  # 设置触发工作流的分支

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'  # 可根据需要调整 Node.js 版本

    - name: Install dependencies
      run: npm install

    - name: Build VitePress site
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs/.vitepress/dist
```

#### 配置详解：
- **on**：定义触发工作流的事件，这里选择了 `push` 到 `main` 分支时触发。
- **jobs**：定义工作流中的任务。在这个示例中，只有一个任务 `build-and-deploy`，在 `ubuntu-latest` 虚拟机上运行。
- **steps**：步骤部分由多个操作组成。
    - `actions/checkout@v2`：从仓库中检出代码。
    - `actions/setup-node@v2`：安装指定版本的 Node.js。
    - `npm install`：安装项目依赖。
    - `npm run build`：执行项目构建命令。
    - `peaceiris/actions-gh-pages@v3`：将生成的静态站点部署到 GitHub Pages。`publish_dir` 是构建生成文件所在目录，通常是 `./docs/.vitepress/dist`。

#### 步骤三：配置 GitHub Pages
完成工作流配置后，前往 GitHub 仓库的 **Settings** > **Pages**，选择 `gh-pages` 分支作为 GitHub Pages 的发布源。每当你向 `main` 分支推送内容时，GitHub Actions 将自动运行，并将最新内容发布到 GitHub Pages。

---

#### 步骤四：验证自动化构建和部署
完成配置后，你可以尝试向 `main` 分支推送一次更新。进入 GitHub 仓库的 **Actions** 页面，查看最新触发的工作流状态。成功运行后，你应该能够在 GitHub Pages 上看到更新后的站点内容。

---

#### 总结
GitHub Actions 提供了便捷的自动化构建和部署支持，尤其适合像 VitePress 这样需要频繁更新的文档站点。通过设置一个简单的工作流文件，你可以显著提高工作效率，减少手动操作。希望本文能帮助你更好地掌握 GitHub Actions 的基础用法，并应用到实际项目中去。

---
**更新于**：2024年10月14日