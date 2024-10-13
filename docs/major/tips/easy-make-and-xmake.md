# 写在前头
本内容涉及了 **make** 和 **xmake** 的介绍、使用场景、特性对比以及如何在不同情境下简化编译流程。

### 日期：2024-04-14

参考资料：
- YouTube 视频：[希尔伯特曲线简述](https://youtu.be/HfzPFniCnHw?si=mUPuHwpBuC0O7cn2)
- 快速上手 xmake：[xmake 项目简单构建](https://tboox.org/cn/2018/03/26/build-project-so-simply/)
- Makefile 基础教程（来源于 Bilibili，作者：yushiqi 老师）：[Makefile 入门教程](https://www.bilibili.com/video/BV188411L7d2/?share_source=copy_web&vd_source=59d47afd43812c161ca8ef67a1dfea4d)

## 1. make 工具

### 为什么使用 make？

**make** 本身不是编译器，而是一种自动化工具，可以根据 **makefile** 描述的规则高效编译代码。尤其在文件数量多的项目中，make 可以自动重新编译仅修改的文件，避免手动逐个编译，显著提升编译效率。

![make 的特性](https://img.imotao.com/i/2024/04/14/661be76887063.png)

例如，在使用 gcc 编译大项目时，每次编译都会浪费大量时间。make 可以通过分步编译，节省编译时间。

以下是简单的 Makefile 文件示例：

```makefile
# 源文件
SRC = $(wildcard *.c)
OBJ = $(patsubst %.c, %.o, $(SRC))

# 生成目标文件的规则
$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)

# .PHONY 声明 clean 是伪目标，不是文件
.PHONY: clean
clean:
	rm -f $(TARGET) $(OBJ)
```

---

## 2. xmake 工具

### xmake 的便捷之处

**xmake** 是一种更现代的构建工具，它使用简单、语法友好，并能自动处理依赖管理，尤其适合快速上手。在一个新项目中，甚至可以不用学习 xmake 的 lua 脚本语法，直接生成和管理项目：

```sh
# 创建项目并进入 src 文件夹
xmake create project_name
cd project_name/src/
# 进行构建
xmake
# 清理构建结果
xmake clean
```

xmake 脚本示例：

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

---

## 3. Makefile 编写示例

```makefile
# 指定编译器
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

# 单个文件规则
%.o: %.c
	$(CXX) $(CXXFLAGS) -c $< -o $@

# 清理规则
.PHONY: clean
clean:
	rm -f $(TARGET) $(OBJ)
```

---

## 4. make 与 xmake 对比

### Makefile 示例
```makefile
# 指定编译器
CXX = gcc
# 编译标志
CXXFLAGS = -Wall -g
# 目标文件
TARGET = main
# 源文件和目标文件
SRC = $(wildcard *.c)
OBJ = $(patsubst %.c, %.o, $(SRC))
# 编译规则
$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)
%.o: %.c
	$(CXX) $(CXXFLAGS) -c $< -o $@
.PHONY: clean
clean:
	rm -f $(TARGET) $(OBJ)
```

### xmake lua 示例

```lua
target("myprogram")
    set_kind("binary")
    add_files("src/*.c")
    add_cxflags("-Wall", "-g")
after_clean(function ()
    os.rm("main")
    os.rm("*.o")
end)
```

--- 

make 和 xmake 各有优缺点，make 更适合长期维护的 C/C++ 项目，而 xmake 以其简便和现代化的脚本语言（lua）更适合快速开发和原型制作。

---
**更新于**：2024年4月14日 