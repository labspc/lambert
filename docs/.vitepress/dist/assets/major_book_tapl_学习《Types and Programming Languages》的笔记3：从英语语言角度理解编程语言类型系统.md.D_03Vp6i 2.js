import{_ as e,c as r,a4 as t,o as n}from"./chunks/framework.DUbUI6ZK.js";const c=JSON.parse('{"title":"学习《Types and Programming Languages》的笔记3：从英语语言角度理解编程语言类型系统","description":"","frontmatter":{},"headers":[],"relativePath":"major/book/tapl/学习《Types and Programming Languages》的笔记3：从英语语言角度理解编程语言类型系统.md","filePath":"major/book/tapl/学习《Types and Programming Languages》的笔记3：从英语语言角度理解编程语言类型系统.md"}'),o={name:"major/book/tapl/学习《Types and Programming Languages》的笔记3：从英语语言角度理解编程语言类型系统.md"};function p(i,a,s,l,g,h){return n(),r("div",null,a[0]||(a[0]=[t('<h1 id="学习《types-and-programming-languages》的笔记3-从英语语言角度理解编程语言类型系统" tabindex="-1">学习《Types and Programming Languages》的笔记3：从英语语言角度理解编程语言类型系统 <a class="header-anchor" href="#学习《types-and-programming-languages》的笔记3-从英语语言角度理解编程语言类型系统" aria-label="Permalink to &quot;学习《Types and Programming Languages》的笔记3：从英语语言角度理解编程语言类型系统&quot;">​</a></h1><p><img src="https://www.cis.upenn.edu/~bcpierce/tapl/taplcover.jpg" alt="Types and Programming Languages"><a href="https://www.cis.upenn.edu/~bcpierce/tapl/taplcover.jpg" target="_blank" rel="noreferrer">https://www.cis.upenn.edu/~bcpierce/tapl/taplcover.jpg</a></p><p>在过去的一周中，我反思了自己学习 C 语言的必要性。虽然这条学习道路可能漫长，但我始终相信掌握这门语言是成为高级程序员的第一步。</p><h2 id="一、再聊数据类型与类型系统" tabindex="-1">一、再聊数据类型与类型系统 <a class="header-anchor" href="#一、再聊数据类型与类型系统" aria-label="Permalink to &quot;一、再聊数据类型与类型系统&quot;">​</a></h2><p>在编程中，数据类型可以理解为一组规则，规定了如何表达、存储和计算数据。正如一位作者所说：“将数据类型称为类型，表达一个数据集合。”例如，在 C 语言中，当我们定义一个整型变量 <code>int a = 5;</code> 时，数字 <code>5</code> 就是一个整数，表明我们使用的是整型。</p><p>类型系统将类型与计算的值关联起来，以确保不会发生类型错误（type error）。它通常是编程语言的一部分，构建在该语言的编译器或解释器中。无论在编译时还是运行时，编程语言都必须能够依据类型系统中的规则进行类型检查。</p><h3 id="为什么需要类型" tabindex="-1">为什么需要类型？ <a class="header-anchor" href="#为什么需要类型" aria-label="Permalink to &quot;为什么需要类型？&quot;">​</a></h3><p>这个问题值得深入思考。类型的存在是为了让编写程序的过程更加方便、清晰。就像学习高等数学中的微分概念一样，刚开始接触时，老师可能会问大家是否有疑问。在这个过程中，定义就是引入概念。将类型系统视为一组规则，熟悉这些规则的使用是非常重要的，而后再深入理解其背后的定义。</p><h2 id="二、类型检查" tabindex="-1">二、类型检查 <a class="header-anchor" href="#二、类型检查" aria-label="Permalink to &quot;二、类型检查&quot;">​</a></h2><p>在程序语言的世界中，类型检查可以被视为“执法者”。当你在这个世界中进行编码时，创世者创造了一套称为“类型系统”的规则。为了确保你遵循这些规则，创世者派出一个名为“类型检查”的“小弟”，检查你是否符合规则。如果不符合，检查者会指出错误并要求你整改。简单来说，类型检查负责维护规则的执行，对理解隐式类型和显式类型具有重要意义。</p><h2 id="三、隐式类型与显式类型" tabindex="-1">三、隐式类型与显式类型 <a class="header-anchor" href="#三、隐式类型与显式类型" aria-label="Permalink to &quot;三、隐式类型与显式类型&quot;">​</a></h2><p>在某些语言（如 PHP）中，当你尝试将字符串与整型拼接时，编译器不会报错，而是会自动将整数转换为字符串，这称为隐式类型转换（implicit type change）。与之相对的是显式类型转换（explicit type change）。</p><p>隐式类型转换是弱类型语言的特征，例如 PHP。在这种语言中，类型检查相对较轻，因此较少抛出类型错误异常。而在强类型语言（如 Python）中，如果存在类型不匹配，则会抛出类型错误异常，表明类型检查相对严格。</p><p>另一个判断类型强弱的角度是该语言是否会阻止访问不该访问的内存。C 和 C++ 显然不满足这一点，因此可以被认为是典型的弱类型语言。</p><h2 id="四、从英语语言角度理解编程语言类型系统" tabindex="-1">四、从英语语言角度理解编程语言类型系统 <a class="header-anchor" href="#四、从英语语言角度理解编程语言类型系统" aria-label="Permalink to &quot;四、从英语语言角度理解编程语言类型系统&quot;">​</a></h2><p>有关类型系统的学习到此为止，但我觉得从英语语言的角度理解类型系统会更加直观。C 编程语言的类型系统可以与英语的语法和词法规则进行类比：</p><ol><li><p><strong>类型系统相当于语法规则</strong>：英语中有一套语法规则来定义句子的结构和组织方式，C 编程语言也有类型规则来定义如何构建和使用数据。这包括如何声明变量、分配内存、执行运算等。就像英语句子必须符合语法规则以便被理解，C 程序必须遵循类型规则以便被编译和执行。</p></li><li><p><strong>数据类型相当于词法规则</strong>：在英语中，不同的词汇有不同的词法规则，例如名词、动词和形容词等。在 C 语言中，不同的数据类型（如整数、字符、浮点数等）就像不同的词汇，它们具有不同的内部表示和操作。</p></li><li><p><strong>类型检查相当于语法检查</strong>：英语中的语法检查用来确保句子符合语法规则，C 编程中的类型检查也是一种检查，以确保程序遵循类型规则。就像语法检查可以捕捉语法错误，类型检查可以捕捉类型错误。</p></li><li><p><strong>错误处理相当于语法错误处理</strong>：在英语中，如果句子不符合语法规则，需要进行错误处理和修正。在 C 编程中，如果代码不符合类型规则，编译器或程序会生成错误消息，处理这些错误与英语中的语法错误处理类似。</p></li></ol><p>综上所述，C 编程语言的类型系统相当于英语中的语法和词法规则，规定了如何构建和使用数据，以确保程序正确运行。就像理解英语句子需要遵循语法规则一样，编写 C 代码也需要遵循类型规则。同时，错误处理机制也帮助捕捉和纠正类型和语法错误。</p><h3 id="结论" tabindex="-1">结论 <a class="header-anchor" href="#结论" aria-label="Permalink to &quot;结论&quot;">​</a></h3><p>通过将类型系统与英语的语法和词法规则进行类比，我们可以更直观地理解编程语言的类型系统。这种理解不仅有助于提升我们的编程能力，也为深入掌握编程语言的核心概念奠定了基础。希望这篇文章能为你在学习编程的过程中提供一些启发和帮助！</p><h3 id="参考资源" tabindex="-1">参考资源 <a class="header-anchor" href="#参考资源" aria-label="Permalink to &quot;参考资源&quot;">​</a></h3><ul><li><a href="https://zhuyinjun.me/2019/type_system_in_programming_languages/" target="_blank" rel="noreferrer">https://zhuyinjun.me/2019/type_system_in_programming_languages/</a></li></ul><hr><p><strong>更新于</strong>：2023年11月3日</p>',24)]))}const m=e(o,[["render",p]]);export{c as __pageData,m as default};
