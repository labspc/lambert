import{_ as i,c as a,a4 as n,o as e}from"./chunks/framework.DUbUI6ZK.js";const d=JSON.parse('{"title":"使用 GitHub Actions 自动化构建 VitePress 内容","description":"","frontmatter":{},"headers":[],"relativePath":"major/tips/使用 GitHub Actions 自动化构建 VitePress 内容.md","filePath":"major/tips/使用 GitHub Actions 自动化构建 VitePress 内容.md"}'),t={name:"major/tips/使用 GitHub Actions 自动化构建 VitePress 内容.md"};function l(p,s,h,r,k,o){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="使用-github-actions-自动化构建-vitepress-内容" tabindex="-1">使用 GitHub Actions 自动化构建 VitePress 内容 <a class="header-anchor" href="#使用-github-actions-自动化构建-vitepress-内容" aria-label="Permalink to &quot;使用 GitHub Actions 自动化构建 VitePress 内容&quot;">​</a></h1><p>痛点：本站点内容更新每次都需要进行本地化的手动构建，而后进行推送，一方面占用了本地的硬盘资源，另一方面，每次更新都需要手动构建，非常麻烦，我们应该更专注于内容而不被其他事所打扰。 需求：在使用 VitePress 构建的文档项目中，当有新的内容提交到仓库时，自动触发 GitHub Actions 。</p><p><strong>更新</strong>：使用 <code>Vercel</code> 部署，不再需要手动构建，只需要提交代码，即可自动构建并部署。 (<strong>强烈推荐！</strong>)</p><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>在现代化的开发工作流中，自动化已成为提高效率的关键因素之一。GitHub Actions 是一个强大的 CI/CD 工具，能够帮助开发者自动化代码构建、测试、部署等任务。本文将介绍 GitHub Actions 的基础知识，并通过一个具体示例讲解如何使用 GitHub Actions 实现 VitePress 内容的自动化构建与部署。</p><hr><h2 id="什么是-github-actions" tabindex="-1">什么是 GitHub Actions？ <a class="header-anchor" href="#什么是-github-actions" aria-label="Permalink to &quot;什么是 GitHub Actions？&quot;">​</a></h2><p>GitHub Actions 是 GitHub 提供的 CI/CD（持续集成与持续交付）服务。它允许开发者通过定义 <code>.yml</code> 文件配置不同的工作流（Workflow），并根据触发条件自动执行这些工作流。GitHub Actions 的一些核心概念包括：</p><ul><li><strong>Workflow（工作流）</strong>：由多个步骤（steps）组成的自动化任务。</li><li><strong>Job（任务）</strong>：工作流中的独立任务，每个 Job 都在独立的虚拟环境中运行。</li><li><strong>Step（步骤）</strong>：任务中的单个执行步骤，可以是一个 Shell 命令或是第三方操作（Action）。</li><li><strong>Event（事件）</strong>：触发工作流的条件，比如推送（push）、拉取请求（pull request）、发布（release）等。</li></ul><p>GitHub Actions 提供了丰富的现成 Actions 和灵活的配置选项，能帮助开发者快速实现复杂的自动化需求。</p><hr><h2 id="为什么选择-github-actions-来自动构建-vitepress-内容" tabindex="-1">为什么选择 GitHub Actions 来自动构建 VitePress 内容？ <a class="header-anchor" href="#为什么选择-github-actions-来自动构建-vitepress-内容" aria-label="Permalink to &quot;为什么选择 GitHub Actions 来自动构建 VitePress 内容？&quot;">​</a></h2><p>VitePress 是一个基于 Vite 构建的静态网站生成器，适合用于创建文档站点。当你频繁更新站点内容时，手动构建并部署会变得非常繁琐。通过 GitHub Actions，我们可以在每次内容更新时，自动触发构建并发布网站，大大提高效率。下面，我们将一步步实现这一流程。</p><hr><h3 id="步骤一-准备-vitepress-项目" tabindex="-1">步骤一：准备 VitePress 项目 <a class="header-anchor" href="#步骤一-准备-vitepress-项目" aria-label="Permalink to &quot;步骤一：准备 VitePress 项目&quot;">​</a></h3><p>略</p><h4 id="步骤二-创建-github-actions-工作流" tabindex="-1">步骤二：创建 GitHub Actions 工作流 <a class="header-anchor" href="#步骤二-创建-github-actions-工作流" aria-label="Permalink to &quot;步骤二：创建 GitHub Actions 工作流&quot;">​</a></h4><p>在你的 GitHub 仓库中，创建 <code>.github/workflows</code> 文件夹，然后在其中创建一个名为 <code>deploy.yml</code> 的文件，添加以下内容：</p><div class="language-yaml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Deploy VitePress Site</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    branches</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">main</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 设置触发工作流的分支</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">jobs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  build-and-deploy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    runs-on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ubuntu-latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    steps</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Checkout repository</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">actions/checkout@v2</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Setup Node.js</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">actions/setup-node@v2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        node-version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;18&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 可根据需要调整 Node.js 版本</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Install dependencies</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">npm install</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Build VitePress site</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">npm run build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Deploy to GitHub Pages</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 部署到 xxx (你想部署的地方)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      uses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">peaceiris/actions-gh-pages@v3</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 这里是部署到 GitHub Pages </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        github_token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        publish_dir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">./docs/.vitepress/dist</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 构建生成的静态站点目录(按实际进行修改)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h4 id="配置详解" tabindex="-1">配置详解： <a class="header-anchor" href="#配置详解" aria-label="Permalink to &quot;配置详解：&quot;">​</a></h4><ul><li><strong>on</strong>：定义触发工作流的事件，这里选择了 <code>push</code> 到 <code>main</code> 分支时触发。</li><li><strong>jobs</strong>：定义工作流中的任务。在这个示例中，只有一个任务 <code>build-and-deploy</code>，在 <code>ubuntu-latest</code> 虚拟机上运行。</li><li><strong>steps</strong>：步骤部分由多个操作组成。 <ul><li><code>actions/checkout@v2</code>：从仓库中检出代码。</li><li><code>actions/setup-node@v2</code>：安装指定版本的 Node.js。</li><li><code>npm install</code>：安装项目依赖。</li><li><code>npm run build</code>：执行项目构建命令。</li><li><code>peaceiris/actions-gh-pages@v3</code>：将生成的静态站点部署到 GitHub Pages。<code>publish_dir</code> 是构建生成文件所在目录，通常是 <code>./docs/.vitepress/dist</code>。</li></ul></li></ul><h4 id="步骤三-配置-github-pages" tabindex="-1">步骤三：配置 GitHub Pages <a class="header-anchor" href="#步骤三-配置-github-pages" aria-label="Permalink to &quot;步骤三：配置 GitHub Pages&quot;">​</a></h4><p>完成工作流配置后，前往 GitHub 仓库的 <strong>Settings</strong> &gt; <strong>Pages</strong>，选择 <code>gh-pages</code> 分支作为 GitHub Pages 的发布源。每当你向 <code>main</code> 分支推送内容时，GitHub Actions 将自动运行，并将最新内容发布到 GitHub Pages。</p><hr><h4 id="步骤四-验证自动化构建和部署" tabindex="-1">步骤四：验证自动化构建和部署 <a class="header-anchor" href="#步骤四-验证自动化构建和部署" aria-label="Permalink to &quot;步骤四：验证自动化构建和部署&quot;">​</a></h4><p>完成配置后，你可以尝试向 <code>main</code> 分支推送一次更新。进入 GitHub 仓库的 <strong>Actions</strong> 页面，查看最新触发的工作流状态。成功运行后，你应该能够在 GitHub Pages 上看到更新后的站点内容。</p><hr><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>GitHub Actions 提供了便捷的自动化构建和部署支持，尤其适合像 VitePress 这样需要频繁更新的文档站点。通过设置一个简单的工作流文件，你可以显著提高工作效率，减少手动操作。</p><hr><p><strong>更新于</strong>：2024年10月14日</p>`,31)]))}const E=i(t,[["render",l]]);export{d as __pageData,E as default};
