# C++ 笔记1：RAII

- 自动内存管理 RAII
- 编程范式
- 智能指针

## 1.自动内存管理



> 与托管语言不同，C++ 没有自动回收垃圾，这是在程序运行时释放堆内存和其他资源的一个内部进程。 C++ 程序负责将所有已获取的资源返回到操作系统。 未能释放未使用的资源称为“泄漏”。 在进程退出之前，泄漏的资源无法用于其他程序。 特别是内存泄漏是 C 样式编程中 bug 的常见原因。
>
> https://learn.microsoft.com/zh-cn/cpp/cpp/object-lifetime-and-resource-management-modern-cpp?view=msvc-170



#### 1.1什么是托管语言？

**托管语言（Managed Language）是一种编程语言，其运行时环境提供了自动内存管理和其他高级特性，**以简化程序员的工作并提高程序的安全性。托管语言通常在运行时环境中提供了一些额外的功能，如垃圾回收、类型安全检查、异常处理等，这些功能在编译后的代码中被添加或实现。

主要的托管语言包括：

1. **C#（C Sharp）**：由微软开发，运行于 .NET Framework 和 .NET Core 等环境中。
2. **Java**：由Sun Microsystems（现在是Oracle）开发，运行于Java虚拟机（JVM）上。
3. **Python**：是一种解释型的托管语言，由Python软件基金会维护。

托管语言的特点包括：

1. **自动内存管理**：托管语言使用垃圾回收器（Garbage Collector）自动管理内存，程序员不需要手动分配和释放内存，减少了内存泄漏和段错误等问题。

2. **类型安全**：托管语言提供了类型安全检查，防止了一些常见的编程错误，如数组越界、空指针引用等。

3. **异常处理**：托管语言提供了异常处理机制，使得程序能够更加健壮和容错。

4. **跨平台性**：许多托管语言具有跨平台的特性，能够在不同的操作系统上运行，这大大提高了程序的可移植性。

5. **丰富的库支持**：托管语言通常拥有丰富的标准库和第三方库支持，提供了丰富的功能和工具集。

总的来说，托管语言通过提供自动化的内存管理和其他高级特性，简化了程序员的工作，提高了程序的安全性和可靠性，但也可能会带来一些运行时性能损失。



而，在C++中，与托管语言（如C#和Java）不同，内存和其他资源的管理是由程序员显式地负责的，而不是由运行时环境或垃圾回收器自动管理的。这意味着，当你在C++中使用堆内存、文件句柄、数据库连接等资源时，你需要手动管理这些资源的生命周期，包括分配和释放。



#### 1.2堆内存管理：

在C++中，通过 `new` 运算符分配的内存需要使用 `delete` 运算符手动释放。如果你分配了内存却没有释放，就会造成内存泄漏，这意味着你的程序会持续占用系统内存，直到程序结束。

```c++
cppCopy code
int* ptr = new int; // 分配内存
delete ptr; // 释放内存
```

#### 1.3文件句柄管理：

在C++中打开的文件句柄需要使用 `fclose` 或者对应的C++文件流类的关闭函数来关闭文件。如果不正确地关闭文件，可能会导致文件句柄泄漏，使得程序无法打开更多的文件。

```c++
cppCopy code
FILE* file = fopen("example.txt", "r");
// 使用文件
fclose(file); // 关闭文件
```



---

## 2.程序空间申请与内存逻辑区域

![](https://img.imotao.com/i/2024/03/13/65f15e9be975b.jpeg)
摘自《ppp2e》中文版p272

程序申请空间不仅仅在堆上,内存空间可分为几个逻辑区域:

1. **栈内存(Stack)**
    - 用于存储函数的参数值、局部变量的值等
    - 空间较小,有严格的生存周期约束
    - 通常位于高地址,由高位向低位增长
2. **堆内存(Heap)**
    - 用于动态内存分配
    - 通过new/malloc等动态分配内存
    - 通常位于较低的内存地址
    - 需要手动或自动回收
3. **全局/静态存储区(Data Segment)**
    - 用于存放全局变量和静态变量
    - 在程序运行期间一直存在
4. **代码段(Code/Text Segment)**
    - 存储可执行程序的代码
5. **常量区(Literal Pool)**
    - 存储字符串常量等常量



所以,**程序申请空间的位置取决于变量或对象的存储区域。**如**局部变量存储在栈上,动态分配的对象存储在堆上,全局变量存储在数据段**等。



思考：内存区域的划分同寄存器有无什么关系？8088处理器寄存器～



```cpp
#include <iostream>
#include <string>

// 全局变量,存储在数据段
int global_var = 10;

void func(int x) {
    // 常量字符串存储在常量区
    const char* str = "Hello";
    
    // 局部变量存储在栈上
    int local_var = 20;
    std::string dynamic_str = "World"; // 字符串对象存储在堆上

    // 输出地址,查看所在区域
    std::cout << "Address of global_var: " << &global_var << std::endl;
    std::cout << "Address of str: " << (void*)str << std::endl;
    std::cout << "Address of local_var: " << &local_var << std::endl;
    std::cout << "Address of dynamic_str: " << &dynamic_str << std::endl;

    // 动态分配内存,存储在堆上
    int* heap_var = new int(30);
    std::cout << "Address of heap_var: " << (void*)heap_var << std::endl;

    delete heap_var; // 释放堆内存
}

int main() {
    func(5); // 调用函数,参数通过寄存器或栈传递
    return 0; // 程序代码存储在代码段
}
```

解释:

1. `global_var`: 全局变量,存储在数据段。
2. `str`: 常量字符串,存储在常量区。
3. `local_var`: 局部变量,存储在栈上。
4. `dynamic_str`: 对象动态分配,存储在堆上。
5. `heap_var`: 动态分配的整型变量,存储在堆上。
6. `main()`函数的代码存储在代码段。
7. 调用 `func(5)` 时,参数 `5` 通过寄存器或栈传递。

运行结果示例:

```
Copy code

Address of global_var: 0x1008015f0
Address of str: 0x100603118
Address of local_var: 0x7ffee3f07fb0
Address of dynamic_str: 0x7ffee3f07fa0
Address of heap_var: 0x600001ec0020
```

可以看到全局变量、常量字符串、局部变量、动态对象和动态分配的内存分别存储在不同的内存区域。通过地址可以大致判断出它们所在的区域,符合预期。



重写C语言版：

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 全局变量,存储在数据段
int global_var = 10;

void func(int x) {
    // 常量字符串存储在常量区
    const char* str = "Hello";
    
    // 局部变量存储在栈上
    int local_var = 20;
    char* dynamic_str = malloc(sizeof(char) * 6); // 动态分配字符串存储在堆上
    strcpy(dynamic_str, "World");

    // 输出地址,查看所在区域
    printf("Address of global_var: %p\n", &global_var);
    printf("Address of str: %p\n", str);
    printf("Address of local_var: %p\n", &local_var);
    printf("Address of dynamic_str: %p\n", dynamic_str);

    // 动态分配内存,存储在堆上
    int* heap_var = malloc(sizeof(int));
    *heap_var = 30;
    printf("Address of heap_var: %p\n", heap_var);

    free(heap_var); // 释放堆内存
    free(dynamic_str); // 释放动态字符串
}

int main() {
    func(5); // 调用函数,参数通过寄存器或栈传递
    return 0; // 程序代码存储在代码段
}
```



堆内存主要用于存储程序运行时动态分配的对象和数据结构。具体来说,以下几种情况下会使用堆内存:

1. **动态对象创建**
    - 使用 `new` 在堆上创建对象实例,例如 `MyClass* obj = new MyClass();`
    - 使用 `malloc` 或 `calloc` 在堆上分配原始内存块

2. **动态数据结构**
    - 链表、树、图等动态数据结构的节点通常都存储在堆上
    - 例如链表节点通过 `new` 创建并链接

3. **动态数组或缓冲区**
    - 当数组大小不确定时,可以在堆上动态分配内存
    - 例如 `int* arr = new int[n];` 或 `arr = malloc(n * sizeof(int));`

4. **第三方库或框架的内部数据**
    - 一些库或框架的内部数据和缓存可能存储在堆上

5. **代码执行时的临时数据**
    - 一些算法或计算过程中的临时数据可能在堆上存储

总的来说,**堆内存主要用于存储那些在编译时无法确定大小或存储时间的数据。动态分配和释放内存是管理堆内存的关键**。



**至于函数的执行,函数本身的代码存储在代码段(Code/Text Segment)中,而函数的局部变量、参数和临时数据则存储在栈(Stack)上。函数执行时,CPU会在栈上分配一个栈帧(Stack Frame),**用于存储该函数的局部数据和控制信息,函数返回后栈帧被销毁。  （之前有笔记写到，函数栈帧的创建与销毁）

因此,函数执行时主要使用代码段和栈,而堆内存则主要用于存储动态分配的对象和数据结构。合理利用堆和栈是编程时内存管理的关键所在。



## 3.RAII 是什么？

RAII（Resource Acquisition Is Initialization）的概念起源于C++语言，并且是由 Bjarne Stroustrup 在他的著作《The C++ Programming Language》中提出的。该书首次出版于1985年，其后的各版也进一步阐述了RAII的概念。

Bjarne Stroustrup是C++的创造者之一，他在书中详细介绍了C++的设计理念和编程技术。RAII被视为C++语言中的一个重要编程范式之一，它充分利用了C++的对象生命周期管理机制，使得资源的获取和释放与对象的生命周期紧密相关。

虽然Bjarne Stroustrup没有专门提出“RAII”这个术语，但他在书中描述了资源获取和释放与对象的构造和析构之间的关系，这就是RAII的核心思想。RAII成为了C++编程的重要范式，被广泛应用于资源管理、异常处理等方面，为C++的高效、安全编程提供了重要的支持。



在堆栈上声明 **拥有资源的对象** 本身。 对象拥有资源的原则也称为“资源获取即初始化”(RAII)"(Resource Acquisition Is Initialization, RAII)。这里理解，RAII我个人认为是比较难的，首先什么是资源？什么是堆栈？什么是对象？有哪些对象？ 这是一个多个概念组合在一起的新概念。 简单这样理解，我们不用去管什么是RAII，不要同其定义较真，RAII就是一个编程技术，有很长的历史，这就够了。 我们重点关注，目前现代C++有什么来实现自动内存管理。



**资源**可以是任何需要获取和释放的东西,例如内存、文件句柄、互斥锁、网络连接等。在 C++ 中,这些资源通常是通过构造函数获取,并在相应的析构函数中释放。

**在堆栈上声明拥有资源的对象**是指,将拥有资源的对象声明在栈上,而不是在堆上动态分配。这样做的好处是, **当对象的生存期结束时,对象的析构函数会自动被调用,从而确保资源被正确释放**。  现代C++就是使用智能指针，让这个内存管理更加方便，这背后体现的就是RAII思想，OK理解到这就够了。



## 4.智能指针

智能指针的概念也是很复杂的，现代C++提供了自动内存管理的机制,其中智能指针(Smart Pointer)是一种重要的实现方式。就把，智能指针理解成可以简化内存管理就行，可以让C++代码更加安全的一个方式就行。不是很多人说C++不安全么，这个我也体会不到，但是CppCon23上面 Bjarne Stroustrup提到 Safe C++，C++也在这上面发力。



提出一个问题：**有传统C++到 new / delete了，现代c++ 的 智能指针 又有什么作用？ raii 这个东西又是怎么体现的？**



直接上代码！



## 5.场景及代码实例

两种方式对比

#### 5.1**场景：** 读取文件并计算其中字符的数量

```c++
// g++ -std=c++14 str.smart.cc

#include <iostream>
#include <fstream>
#include <memory>

int main() {
    std::ifstream file("example.txt"); // 打开文件
    if (!file.is_open()) {
        std::cerr << "无法打开文件" << std::endl;
        return 1;
    }

    // 使用智能指针管理文件资源
    std::unique_ptr<std::ifstream> filePtr = std::make_unique<std::ifstream>("example.txt");

    // 计算文件中字符的数量
    char ch;
    int count = 0;
    while (filePtr->get(ch)) {
        ++count;
    }

    std::cout << "文件中字符的数量为: " << count << std::endl;

    // 文件会在 filePtr 离开作用域时自动关闭

    return 0;
}

```



#### 5.2**场景：** 加载图像数据，进行简单处理，并在程序结束时释放内存

会使用到OpenCV，涉及如何在VSCode里面配置的问题～

```
brew install opencv

pkg-config --modversion opencv4
```

在这里用的时间太多了，直接跳过有关OpenCV的使用，

关于智能指针的使用，可以使用`new` 也可以使用别的，下面使用`std::make_unique<Image>()`

`std::make_unique` 是一个 C++14 引入的辅助函数,它的作用是在内部使用 `new` 动态分配内存,并将所有权直接转移给一个新创建的 `std::unique_ptr` 对象。这种方式比直接使用 `new` 创建原始指针更安全、更简洁。



使用 `std::make_unique` 有以下优点:

1. **自动内存管理**: 通过智能指针自动管理动态分配的资源,避免了手动释放内存的麻烦。
2. **异常安全**: 如果在构造对象的过程中抛出异常,`std::make_unique` 会自动释放已分配的内存,保证不会发生内存泄漏。
3. **简洁语法**: 使用 `std::make_unique` 可以在一行代码中创建和初始化智能指针,语法更加简洁。
4. **符合现代 C++ 实践**: 使用 `std::make_unique` 符合现代 C++ 的最佳实践,避免了直接使用 `new` 可能带来的风险。

总之,`std::make_unique` 作为辅助函数,提供了一种更安全、更简洁的方式来创建和管理动态分配的资源,是使用现代 C++ 智能指针时的一种推荐做法。它体现了 C++ 对资源管理安全性和代码可维护性的重视,是 RAII 原则在实践中的一种体现。



![截屏2024-03-11 17.50.24](https://img.imotao.com/i/2024/03/11/65eed3f447da3.png)

![截屏2024-03-11 17.51.28](https://img.imotao.com/i/2024/03/11/65eed42e507d7.png)

这里只要知道，使用智能指针的时候，可以使用`new` ，也可以使用别的比如`std::make_unique` 。

传统的 `new/delete` 来重写这个程序：

```c++
#include <iostream>

class MyClass {
public:
    MyClass(int value) : value_(value) {}
    ~MyClass() { std::cout << "MyClass destructor called" << std::endl; }

    void print() const {
        std::cout << "Value: " << value_ << std::endl;
    }

private:
    int value_;
};

int main() {
    // 使用 new 动态分配对象
    MyClass* ptr = new MyClass(42);

    // 使用对象
    ptr->print();

    // 手动删除对象
    delete ptr;

    return 0;
}
```

上述两个代码片段，从中可以对比出使用智能指针后，可以不用手动 delete，就是这是一个思维的转变，在写pure c 的时候，我们可能会回想起 malloc/free，尤其在写链表的时候。



```c++
// 使用 new 动态分配对象
    MyClass* ptr = new MyClass(42);


// 使用 std::make_unique 创建智能指针
    std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>(42);

```

智能指针的写法，更符合现代C++编程实践，我们要尝试去学习和使用。作为初学者，乍一看就是写法上有些繁琐，其余部分其实也没什么不一样的qwq。



## 6.总结

现代C++编程实践，很强调RAII：**资源的获取和释放由对象的生存期自动管理**。   一句话道明什么是RAII，具体使用可以使用智能指针（或许还有别的方法，我还没接触到）。

插入一句，在学习RAII的时候，还接触到了 `auto` 自动类型关键字可以说“减轻了我的心智负担”。



> C++如同一副色彩非常丰富的水彩笔，新手容易被它的绚烂所迷惑，但是真正的画师只往往只取其中几支即可。
>
> C++ 的核心究竟是什么？学到什么程度才算精通？ - 知乎用户的回答 - 知乎
> https://www.zhihu.com/question/444555079/answer/2902014709



> 如果你是想从事码农这份工作，那么最为重要的就是使用代码，解决业务当中问题，并且少制造别的问题（少挖坑）的能力。
>
> 这个意义上的C++（学习）的核心，就是掌握如何用C++描述实际问题的解决方案，并且知道C++所采取的模型，在这一描述过程当中的优点和缺点，人们常犯的错误，以及回避方法。
>
> 作者：知乎用户
> 链接：https://www.zhihu.com/question/444555079/answer/1826016516
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

---
**更新于**：2024年3月11日