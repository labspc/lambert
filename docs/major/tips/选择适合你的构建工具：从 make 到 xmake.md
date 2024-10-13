# 选择适合你的构建工具：从 make 到 xmake


## 写在前头

本篇博客将介绍 **make** 和 **xmake** 的概念、特性对比、使用场景，并探讨如何在不同情境下选择最适合的编译工具来简化构建流程。

---

## 1. make 工具

### 为什么使用 make？

**make** 本身不是编译器，而是自动化工具，能够基于 **Makefile** 中描述的规则高效地编译代码。特别是在文件数量多的项目中，make 会自动重新编译仅修改的文件，节省时间并提升效率。make 尤其适合用于长期维护的项目，因为其格式简单易维护。

以下是一个简单的 Makefile 示例：

```makefile
# 源文件
SRC = $(wildcard *.c)
OBJ = $(patsubst %.c, %.o, $(SRC))

# 生成目标文件的规则
$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)

# .PHONY 声明 clean 是伪目标
.PHONY: clean
clean:
	rm -f $(TARGET) $(OBJ)
```

这种配置方式使得我们能够通过自动管理项目中的文件，降低项目手动编译的负担。

---

## 2. xmake 工具

### xmake 的便捷之处

相比 make，**xmake** 更现代化，语法友好，并且自动处理依赖管理。特别适合新项目开发。xmake 使用 Lua 作为配置语言，其代码可读性更强。

xmake 项目的构建示例：

```sh
# 创建并进入项目
xmake create project_name
cd project_name/src/
# 构建项目
xmake
# 清理构建
xmake clean
```

而 xmake 脚本的配置非常简洁：

```lua
-- 设置目标
target("myprogram")
    set_kind("binary")
    add_files("src/*.c")
    add_cxflags("-Wall", "-g")

-- 清理规则
after_clean(function ()
    os.rm("myprogram")
    os.rm("*.o")
end)
```

xmake 的优势在于更友好的配置语言和简化的脚本，尤其适合快速开发和原型制作。

---

## 3. Makefile 编写示例

```makefile
# 编译器
CXX = gcc

# 编译标志
CXXFLAGS = -Wall -g

# 目标文件
TARGET = main

# 源文件和目标文件
SRC = $(wildcard *.c)
OBJ = $(patsubst %.c, %.o, $(SRC))

# 生成目标文件
$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)

# 单文件编译规则
%.o: %.c
	$(CXX) $(CXXFLAGS) -c $< -o $@

# 清理规则
.PHONY: clean
clean:
	rm -f $(TARGET) $(OBJ)
```

---

## 4. make 与 xmake 对比

| 特性        | make                   | xmake                |
| ----------- | ---------------------- | -------------------- |
| 语法        | Makefile 配置，较为固定 | Lua 脚本配置，更灵活 |
| 学习曲线    | 较平缓                 | 较平缓                |
| 自动依赖管理 | 手动管理               | 自动管理              |
| 编译速度    | 根据文件增量编译       | 自动增量编译          |
| 使用场景    | 适合长期维护的大项目    | 快速开发和原型制作    |

---

### 总结与建议

- **选择 make**：如果你正在开发一个规模较大的项目，并希望在多个系统上通用，make 是一个成熟且高效的选择。它简单且兼容性强，适合大型的 C/C++ 项目。
- **选择 xmake**：对于新项目或需要快速构建和测试的小项目，xmake 更适合。xmake 提供更友好的配置语法，且自动处理依赖，能够大幅简化构建过程。

---
### 参考资料
- 快速上手 xmake：[xmake 项目简单构建](https://tboox.org/cn/2018/03/26/build-project-so-simply/)
- Makefile 基础教程（来源于 Bilibili，作者：yushiqi 老师）：[Makefile 入门教程](https://www.bilibili.com/video/BV188411L7d2/?share_source=copy_web&vd_source=59d47afd43812c161ca8ef67a1dfea4d)

---
**更新于**：2024年4月14日
