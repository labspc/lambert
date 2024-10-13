import{_ as e,c as r,a2 as t,o}from"./chunks/framework.DPuwY6B9.js";const u=JSON.parse('{"title":"学习《Types and Programming Languages》的笔记1：深入理解类型系统与数据结构","description":"","frontmatter":{},"headers":[],"relativePath":"major/book/tapl/学习《Types and Programming Languages》的笔记1：深入理解类型系统与数据结构.md","filePath":"major/book/tapl/学习《Types and Programming Languages》的笔记1：深入理解类型系统与数据结构.md"}'),p={name:"major/book/tapl/学习《Types and Programming Languages》的笔记1：深入理解类型系统与数据结构.md"};function l(n,a,i,s,h,g){return o(),r("div",null,a[0]||(a[0]=[t('<h1 id="学习《types-and-programming-languages》的笔记1-深入理解类型系统与数据结构" tabindex="-1">学习《Types and Programming Languages》的笔记1：深入理解类型系统与数据结构 <a class="header-anchor" href="#学习《types-and-programming-languages》的笔记1-深入理解类型系统与数据结构" aria-label="Permalink to &quot;学习《Types and Programming Languages》的笔记1：深入理解类型系统与数据结构&quot;">​</a></h1><p><img src="https://www.cis.upenn.edu/~bcpierce/tapl/taplcover.jpg" alt="Types and Programming Languages"><a href="https://www.cis.upenn.edu/~bcpierce/tapl/taplcover.jpg" target="_blank" rel="noreferrer">https://www.cis.upenn.edu/~bcpierce/tapl/taplcover.jpg</a></p><h2 id="写在前头" tabindex="-1">写在前头 <a class="header-anchor" href="#写在前头" aria-label="Permalink to &quot;写在前头&quot;">​</a></h2><p>**在学习编程的过程中，是否曾有过那种“突然懂了”的瞬间？**我最近在阅读《类型与编程语言》这本书时，恰好体会到了这样的感受。</p><h2 id="书籍概述" tabindex="-1">书籍概述 <a class="header-anchor" href="#书籍概述" aria-label="Permalink to &quot;书籍概述&quot;">​</a></h2><p>《Types and Programming Languages》是由Pierce教授撰写的一本经典书籍。中译本是在2005年翻译的，原书于2002年出版。可以在<a href="https://www.cis.upenn.edu/~bcpierce/tapl/" target="_blank" rel="noreferrer">这里找到原书的链接</a>。</p><h2 id="学习过程中的反思" tabindex="-1">学习过程中的反思 <a class="header-anchor" href="#学习过程中的反思" aria-label="Permalink to &quot;学习过程中的反思&quot;">​</a></h2><p>最近在学习编程时，类型系统频频被提及。在群里讨论时，大家对于类型系统的看法让我产生了浓厚的兴趣，因此我开始查阅相关文献。</p><p>在学习过程中，保持怀疑的态度非常重要。在学习新的概念时，不仅要关注表面，更要深入思考其背后的逻辑。</p><h3 id="学习方法的思考" tabindex="-1">学习方法的思考 <a class="header-anchor" href="#学习方法的思考" aria-label="Permalink to &quot;学习方法的思考&quot;">​</a></h3><p>通过阅读相关文献，我渐渐意识到，学习的最佳方式是聚焦于当前遇到的问题，然后有针对性地进行深入学习。这种“小孩子学习母语”的思维方式尤为重要。不必准备过多的材料，防止精力的过度消耗。抓住感兴趣的主题，去查阅、去学习，往往能够达到最佳效果。</p><p>此外，学习中对词汇和概念的精准使用也显得尤为重要，比如“集合”、“约束”等。当前，我在这一方面仍显不足。</p><hr><h3 id="总结和回顾" tabindex="-1">总结和回顾 <a class="header-anchor" href="#总结和回顾" aria-label="Permalink to &quot;总结和回顾&quot;">​</a></h3><p>通过阅读这些文章，你会看到好的文章是什么样子的，作者的一些观点，你边看边思考，会有自己的取舍。越来越觉得，<strong>在学习过程中遇到问题，针对性去学，这样效果最好</strong>，类似于“小孩子学母语”的思维方式。</p><p>我越来越认同这种思维方式：不需要搞太多准备工作，然后再开始学习，这样会很累。准备工作完成后，往往热情和精力也随之耗尽。<strong>遇到什么感兴趣的问题，就查查学习就足够了，这种状态才是最好的</strong>。</p><p>同时，要注重用词和概念的准确性：</p><ul><li>集合</li><li>约束</li><li>等等…</li></ul><p>如何准确用词表达想要的意思是很重要的，我现在对此能力欠缺。此外，还有一些我看不懂的概念，例如：</p><ul><li>动态内存分配技术</li></ul><hr><h3 id="篇一" tabindex="-1">篇一 <a class="header-anchor" href="#篇一" aria-label="Permalink to &quot;篇一&quot;">​</a></h3><p><a href="https://github.com/FrankHB/pl-docs/blob/master/zh-CN/typing-vs-typechecking.md" target="_blank" rel="noreferrer">关于类型的讨论</a>，这篇文章我没完全看懂，但感觉写得很严谨，引用了许多观点。摘录一些我能理解的内容：</p><ul><li><p><strong>类型是什么？</strong> 这个问题值得深思。</p><blockquote><p>基于足够的理由，我旗帜鲜明地站在前者一边——谁告诉你看不出显式的类型可读性就差了？谁规定显式类型就是所谓“可读性”了？又有谁规定理解程序源代码片段的含义应该先从了解具体的项的某一个类型开始？</p></blockquote></li><li><p>显式类型和隐式类型的讨论，提出了一些问题。</p></li><li><p>类型安全问题。</p></li><li><p>强类型与弱类型的区别。</p></li></ul><hr><h3 id="篇二" tabindex="-1">篇二 <a class="header-anchor" href="#篇二" aria-label="Permalink to &quot;篇二&quot;">​</a></h3><p>两段来自知乎的答案转载：<a href="https://www.cnblogs.com/feng9exe/p/10740346.html" target="_blank" rel="noreferrer">知乎链接</a>。</p><blockquote><p>程序是类型的证明。计算机程序是建立在计算机硬件和一系列规则、协议、规范、算法基础之上的；程序是建立在逻辑和严格证明基础之上的。逻辑学的基本要素是：概念、判断、推理；类型系统相当于逻辑和科学中的概念，在此基础上才能进行运算和推理。编程语言不过是建立了类型系统和在类型系统基础上的一系列运算法则而已。</p></blockquote><p>作者：匿名用户<br> 链接：<a href="https://www.zhihu.com/question/23434097/answer/42374622" target="_blank" rel="noreferrer">知乎</a></p><p>这个回答直观地解释了“为什么需要类型”。实际上，这也说明了什么是类型，只是定义得不够准确：类型是“规则”。</p><p>根据此回答，可以推导出：</p><ul><li>类型是前提，因为这是逻辑推理的“概念”。</li><li>判断是否需要运算符等，这点是我的臆想。</li></ul><blockquote><p>发现和《Types and Programming Languages》的内容一模一样，安全性有了类型系统后可以实现，程序变成一个严格的数学证明过程，编译器可以机械地验证程序的某种程度正确性，从而杜绝许多错误的发生。</p></blockquote><p>正面例子：Haskell、Rust<br> 反面例子：C、动态语言</p><p>抽象能力，在安全的前提下，一个强大的类型系统的标准是抽象能力。强类型的编程语言比动态类型的语言更适合大型软件构建。虽然类型检查和标注增加了学习成本和编码时间，但个人觉得是值得的。</p><hr><h3 id="篇三" tabindex="-1">篇三 <a class="header-anchor" href="#篇三" aria-label="Permalink to &quot;篇三&quot;">​</a></h3><p><a href="http://laomst.site/article/38" target="_blank" rel="noreferrer">详细讨论类型系统的文章</a>。</p><blockquote><p>类型系统是一门语言的世界观的基本规则，只有理解了一门语言的类型系统，才能真正掌握这门语言的核心。</p></blockquote><p>**左值（变量）**代表一个数据存储区域，称其为变量是因为这个容器中的值是可以改变的。<strong>数据类型是值的固有属性</strong>，高级语言抽象出数据类型的目的在于为存储、读取和使用值提供元数据信息和约束。</p><p>静态类型和动态类型描述的是左值是否具有数据类型约束。换句话说，其描述的是变量是否只能存储某种类型的值。</p><blockquote><p>静态类型的核心是变量只能存储某种类型的值，因此，一个变量在静态期必须具有一个明确且唯一的类型，而到了运行时，变量中的值肯定与声明的类型兼容。</p></blockquote><hr><h3 id="高级数据结构" tabindex="-1">高级数据结构 <a class="header-anchor" href="#高级数据结构" aria-label="Permalink to &quot;高级数据结构&quot;">​</a></h3><p>高级数据结构的特征是随着程序运行，它的值和结构可能发生变化。实现高级数据结构需要复杂的技术，基本的就是动态内存分配技术。</p><p>常见的高级数据结构有链表、哈希表、树、图等。这些数据结构有无限的可能性和灵活性。</p><hr><h3 id="数据结构与算法的关系" tabindex="-1">数据结构与算法的关系 <a class="header-anchor" href="#数据结构与算法的关系" aria-label="Permalink to &quot;数据结构与算法的关系&quot;">​</a></h3><p>总体来说，数据结构是为算法服务的。选择合适的数据结构可以使程序更简单高效。</p><p>算法需要作用于特定的数据结构，场景要求特定操作，选择合适的数据结构来支持这些操作。</p><hr><p>希望这篇博客能够帮助更多学习编程的朋友们理解类型系统和数据结构的重要性。</p><hr><p><strong>更新于</strong>：2023年10月15日</p>',54)]))}const d=e(p,[["render",l]]);export{u as __pageData,d as default};
