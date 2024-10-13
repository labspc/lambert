# 从迭代器到多态：深入理解 C++ 编程中的核心概念
ppp2e 进阶版疑难合集

## 0.🍊

> 软件设计的理念不是构造一个可以做任何事情的程序，而是构造很多类，这些类可以准确反映我们的思想，可以组合在一起工作，允许我们来构造漂亮的应用程序，并且具有最小的工作量（相对于任务的复杂度而言）、足够高的性能以及保证产生正确的结果等优点。


## 1.迭代器 iterator

《ppp2e》p8 有关

![img](https://img.imotao.com/i/2024/03/28/66045501acc01.png)

迭代器作为一个抽象概念，在 C++ 中有很重要的地位。我们把迭代器理解成存储细节和使用方法之间的桥梁即可。


> 迭代器（iterators）是一个超级接口！ 是可以遍历集合的对象，为各种容器提供了公共的操作接口，隔离对容器的遍历操作和底层实现，从而解耦。
> 迭代器是类似指针一样的东西，因为它的用法就是模拟指针，但是它不是指针。
> 迭代器是行为型 设计模式 ，提供了一种方法来遍历一个聚合的容器(集合)中的各个元素，而不用暴露其内部的表示。
> 对于容器的访问而不需要关注容器内部的实现细节，可以使用迭代器， 也就是说，不管你是什么容器，都可以用迭代器进行遍历操作和底层实现。
> 
> https://zhuanlan.zhihu.com/p/548591910

简单找了几个答案读了下，配合书中附图。如果桥梁不好理解，这里说的超级接口，可能更好理解。我们知道，STL 提供了很多容器，容器怎么用？ 来说说容器和迭代器的关系，这里只提接口的关系：

1. **提供访问机制**：

- 容器提供了数据的存储和组织结构，而迭代器则**提供了一种统一的访问机制**，允许用户对容器中的元素进行遍历、访问和修改。

2. **封装底层实现**：

- 迭代器封装了对容器底层数据结构的访问，使得用户不需要了解容器内部的具体实现细节就能够对容器中的元素进行操作。

3. **统一的访问接口**：

- 尽管不同类型的容器具有不同类型的迭代器，但它们都遵循了相同的访问接口，例如**begin()**和**end()**方法，这样就可以使用**统一的方式来遍历**各种容器。

从下面这个 demo 来看看 iterator 的具体用法：

```cpp
#include <iostream>
#include <vector>

int main() {
    // 创建一个整数向量
    std::vector<int> vec = {1, 2, 3, 4, 5};

    // 使用迭代器遍历向量并输出每个元素
    std::cout << "Original vector: ";
    for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {   
        // it是定义的一个迭代器变量，可以理解其类型为std::vector<int>::iterator
        // 而后= 是一个赋值 vec.begin()，具体解释为：vec.begin()：返回指向向量第一个元素的迭代器

        std::cout << *it << " ";  // 这里回忆指针的用法，*解引用后获取it变量指到的元素，这里我们可以思考这句话：
        // 迭代器模拟指针的用法，但是底层不是指针 
    }
    std::cout << std::endl;

    // 使用迭代器修改向量中的元素
    std::cout << "Modified vector: ";
    for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {
        *it *= 2; // 将每个元素乘以2  // 循环体要做的事情
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

![img](https://img.imotao.com/i/2024/03/28/66045500b57f6.png)



重点看这个片段的分析：

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};

    // 使用迭代器遍历向量并输出每个元素
    std::cout << "Original vector: ";
    for (std::vector<int>::iterator it = vec.begin(); it != vec.end(); ++it) {   
        // it是定义的一个迭代器变量，可以理解其类型为std::vector<int>::iterator
        // 而后= 是一个赋值 vec.begin()，具体解释为：vec.begin()：返回指向向量第一个元素的迭代器

        std::cout << *it << " ";  // 这里回忆指针的用法，*解引用后获取it变量指到的元素，这里我们可以思考这句话：
        // 迭代器模拟指针的用法，但是底层不是指针 
    }
    std::cout << std::endl;
```

这段也可以抽象出一个更加通用的使用形式：

```cpp
for (std::vector<T>::iterator it = vec.begin(); it != vec.end(); ++it) {
    // 使用 *it 访问当前元素
}
```

## 2.常见容器一览

p27

![img](https://img.imotao.com/i/2024/03/28/66045501acfd5.png)

往后看会发现，vector 非常好用，目前阶段能用 vector 解决的就用 vector 来解决，不用花里胡哨的。

## 3.lambda 表达式

在 ppp2e 中讲解的篇幅不多，在之前读 python 的时候，遇到过 python 的 lambda 关键字来定义匿名函数。现在我们先通过定义来看看 C++ lambda 的语法定义是怎么样，使用场景又是什么。

### 3.1 定义

以下是Lambda表达式的基本语法：

```cpp
[capture list] (parameters) -> return_type {
    // lambda body
}
```

- **capture list**：捕获列表，用于捕获外部变量，可以是空的、引用捕获或值捕获。
- **parameters**：参数列表，类似于函数参数列表。
- **return_type**：返回类型，可以省略，根据lambda表达式的内容自动推断。
- **lambda body**：lambda函数体，包含了具体的操作逻辑。

### 3.2 使用

具体化 demo：

```cpp
#include <iostream>

int main() {
    int x = 5, y = 3;

    // Lambda表达式用于计算两个数的和
    auto sum = [](int a, int b) { return a + b; };

    // 调用Lambda表达式计算和并输出结果
    std::cout << "Sum: " << sum(x, y) << std::endl;

    return 0;
}
```

现在让我们将C++的Lambda表达式与Python的Lambda表达式进行比较：

1. **语法**：

- C++的Lambda表达式的语法更加复杂，需要指定捕获列表和参数列表，并且支持显式指定返回类型。
- Python的Lambda表达式语法更加简洁，只需要使用关键字**lambda**和参数列表，不需要指定返回类型，因为它是动态类型语言。

1. **作用**：

- 在C++中，Lambda表达式通常用于创建函数对象，用作STL算法中的谓词、函数参数或返回值等。
- 在Python中，Lambda表达式通常用于创建简单的匿名函数，通常用于函数式编程风格中的高阶函数、列表解析等。

1. **捕获外部变量**：

- 在C++中，Lambda表达式可以通过捕获列表捕获外部变量，包括值捕获和引用捕获。
- 在Python中，Lambda表达式可以访问外部作用域的变量，但是不能进行修改，因为它们是“纯”函数。

```cpp
auto value_capture = [x, y]() {
    std::cout << "Value capture: x = " << x << ", y = " << y << std::endl;
};
// () 参数可以为空
```

Lambda表达式的值捕获使得我们可以在Lambda内部使用外部变量的值，而不需要担心外部变量的生命周期。这种特性使得Lambda表达式在C++中非常灵活和实用。

## 4.关联容器

p46

![img](https://img.imotao.com/i/2024/03/28/66045500b6c10.png)

关联容器的底层实现主要使用平衡搜索二叉树和哈希表实现的，有键值对的概念，而序列容器没有。这个，具体的对比在这里不提及，具体使用到了再说。

## 5.虚函数与多态性

这一节有点难理解，我读 ppp2e 的时候就卡在这里了。

p129

![img](https://img.imotao.com/i/2024/03/28/6604550137e6d.png)

书中解释的很抽象，什么是虚函数？什么是运行时多态？还有虚函数背后的机制，比如虚函数指针、虚函数表，这些都是比较复杂的概念。

借助 ChatGPT 有下面这样一个例子：

假设你有一份作业，需要求一个形状的面积。你知道有很多种形状，比如圆形、矩形、三角形等。你希望写一个函数来计算任何形状的面积，但是不同的形状计算面积的方式是不同的。

在这种情况下，你可以定义一个基类 Shape，并在其中声明一个虚函数 calculateArea()。然后，每个具体的形状类（如 Circle、Rectangle、Triangle 等）都可以覆盖（重写）这个虚函数，以实现各自特定形状的面积计算方法。

这就好比你告诉你的朋友，“我要写一个函数来计算形状的面积，但是不同的形状计算方法不同。你可以写一个函数来计算圆形的面积，我可以写一个函数来计算矩形的面积，我们都使用这个名字 calculateArea()，这样当我调用 calculateArea() 时，根据具体的形状不同，会调用不同的函数来计算面积。”

我们细品这句话，“我们都使用这个名字 calculateArea()，这样当我调用 calculateArea() 时，根据具体的形状不同，会调用不同的函数来计算面积。”。

从上述例子，我们反复读读，用心感受一下虚函数、覆盖这两个概念。而后，我们来看实例：

```cpp
#include <iostream>

// 基类 Shape
class Shape {
public:
    // 声明虚函数 calculateArea()
    virtual double calculateArea() const {
        return 0.0; // 基类的默认实现，假设面积为0
    }
};

// 派生类 Circle
class Circle : public Shape {
private:
    double radius;

public:
    // 构造函数
    Circle(double r) : radius(r) {}

    // 重写基类的虚函数 calculateArea()
    double calculateArea() const override {
        return 3.14159 * radius * radius; // 计算圆形的面积
    }
};

// 派生类 Rectangle
class Rectangle : public Shape {
private:
    double width;
    double height;

public:
    // 构造函数
    Rectangle(double w, double h) : width(w), height(h) {}

    // 重写基类的虚函数 calculateArea()
    double calculateArea() const override {
        return width * height; // 计算矩形的面积
    }
};

int main() {
    // 创建一个基类指针，指向 Circle 对象
    Shape* circle = new Circle(5.0);

    // 创建一个基类指针，指向 Rectangle 对象
    Shape* rectangle = new Rectangle(4.0, 6.0);

    // 通过基类指针调用虚函数 calculateArea()
    std::cout << "Area of Circle: " << circle->calculateArea() << std::endl;
    std::cout << "Area of Rectangle: " << rectangle->calculateArea() << std::endl;

    // 释放内存
    delete circle;
    delete rectangle;

    return 0;
}
```

现在拆解上述代码：

第一，定义基类 Shape

```cpp
class Shape {
public:
    // 声明虚函数 calculateArea()
    virtual double calculateArea() const {
        return 0.0; // 基类的默认实现，假设面积为0
    }
};
```

- 虚函数是在基类中声明为虚函数的成员函数。
- 在派生类中可以重写（覆盖）基类的虚函数，以实现不同的行为。

第二，定义派生类

```cpp
class Circle : public Shape {
private:
    double radius;

public:
    // 构造函数
    Circle(double r) : radius(r) {}

    // 重写基类的虚函数 calculateArea()
    double calculateArea() const override {
        return 3.14159 * radius * radius; // 计算圆形的面积
    }
};
```

在C++中，派生类（也称为子类）是从一个或多个基类（也称为父类）继承属性和行为的类。派生类通常会添加新的方法和属性，或者覆盖（重写）基类中的方法。

派生类的写法如下：

```cpp
class DerivedClass : public BaseClass {
    // 新的成员和方法
};
```

在这个例子中，DerivedClass 是派生类，BaseClass 是基类。public 关键字表示继承类型是公有的，这意味着基类的公有和保护成员将成为派生类的公有和保护成员。

在你提供的代码中，Circle 是从 Shape 类派生的：

```cpp
class Circle : public Shape {
    // ...
};
```

Circle 类添加了一个新的私有成员 radius，并且重写了基类的 calculateArea 方法。

再来看看，`override` 的用法：

```cpp
class DerivedClass : public BaseClass {
public:
    returnType functionName(parameters) override {
        // 函数体
    }
};
```

具体化，

```cpp
double calculateArea() const override {
        return 3.14159 * radius * radius; // 计算圆形的面积
    }
```

第三，看 main 函数怎么写

```cpp
int main() {
    // 创建一个基类指针，指向 Circle 对象
    Shape* circle = new Circle(5.0);

    // 创建一个基类指针，指向 Rectangle 对象
    Shape* rectangle = new Rectangle(4.0, 6.0);

    // 通过基类指针调用虚函数 calculateArea()
    std::cout << "Area of Circle: " << circle->calculateArea() << std::endl;
    std::cout << "Area of Rectangle: " << rectangle->calculateArea() << std::endl;

    // 释放内存
    delete circle;
    delete rectangle;

    return 0;
}
```

这里基类指针是什么？ 就是，通过指向基类对象或其派生类对象的指针，实现对这些对象的访问和操作。具体用法如下：

1. **语法**：

- 声明一个基类指针的语法为：**BaseClass\* ptr;**

```cpp
Shape* circle = new Circle(5.0);
```

在这个例子中，创建了一个 Shape 类型的指针 circle，并使其指向一个新创建的 Circle 对象。

- 将指针指向派生类对象的语法为：**ptr = &derivedObject;**

这里可以这样理解，类似于前面常见的指针用法。

```c
int num;
int *pnum;
punm=&num;
*punm=5;
```

1. **指针指向对象的含义**：

- 当**基类指针指向对象时**，意味着该指针可以通过基类的接口来访问这个对象的成员和方法。
- 如果指针指向的是基类对象，则只能访问基类的成员和方法。
- 如果指针指向的是派生类对象，则可以访问基类和派生类的成员和方法。但是，如果通过基类指针调用了虚函数，会根据对象的实际类型来动态选择调用对应的函数版本，实现了多态性。

```cpp
// 通过基类指针调用虚函数 calculateArea()
    std::cout << "Area of Circle: " << circle->calculateArea() << std::endl;
    std::cout << "Area of Rectangle: " << rectangle->calculateArea() << std::endl;
```

然后，通过这两个基类指针，调用了 calculateArea 虚函数。**由于 calculateArea 是虚函数，所以实际调用的是派生类 Circle 和 Rectangle 中的 calculateArea 函数**，而不是基类 Shape 中的 calculateArea 函数。这就是多态性的体现。



具体来说，**多态性可以通过虚函数和基类指针（或引用）实现**。当派生类重写基类的虚函数时，可以通过基类指针或引用来调用这个虚函数，实际调用的是派生类中重写的版本。这样的行为使得在编写代码时无需知道对象的具体类型，而可以通过基类接口来操作对象，从而实现了对不同类型对象的统一处理。

至此，虚函数与多态性就说清楚了。

## 6.纯虚函数与接口继承

p134 书中概念还是讲的一如既往的抽象，看完书中的 demo，我们再来看一个 demo：

![img](https://img.imotao.com/i/2024/03/28/660455015f0fb.png)

先看这段，基类 Shape 没有数据成员，没有构造函数，就写了个虚函数。这里的虚函数就是纯虚函数，这个基类 Shape 就是来做纯粹的接口的，可以把这就理解成接口继承。

```cpp
// 基类 Shape
class Shape {
public:
    // 纯虚函数，用于表示接口继承
    virtual void draw() const = 0;
};

// 派生类 Circle
class Circle : public Shape {
public:
    // 重写基类的纯虚函数 draw()
    void draw() const override {
        std::cout << "Drawing a circle." << std::endl;
    }
};
#include <iostream>

// 基类 Shape
class Shape {
public:
    // 纯虚函数，用于表示接口继承
    virtual void draw() const = 0;
};

// 派生类 Circle
class Circle : public Shape {
public:
    // 重写基类的纯虚函数 draw()
    void draw() const override {
        std::cout << "Drawing a circle." << std::endl;
    }
};

// 派生类 Rectangle
class Rectangle : public Shape {
public:
    // 重写基类的纯虚函数 draw()
    void draw() const override {
        std::cout << "Drawing a rectangle." << std::endl;
    }
};

int main() {
    // 创建 Circle 和 Rectangle 对象
    Circle circle;
    Rectangle rectangle;

    // 使用基类指针调用纯虚函数 draw()，实现了多态性
    Shape* ptr1 = &circle;
    Shape* ptr2 = &rectangle;
    
    ptr1->draw(); // 调用 Circle 类中的 draw() 函数
    ptr2->draw(); // 调用 Rectangle 类中的 draw() 函数

    return 0;
}
```

## 7.理念与历史

### 7.1 其他语言

p182 本章内容为我认为最重要的部分就在此段 B.S. 的论述，上午特意录制了对此段内容的体会的音频，而后发布在小宇宙。

![img](https://img.imotao.com/i/2024/03/28/6604550762de2.png)

根据此，再来看看自己的学习路线，也走了不少弯路，这就是上述说的这些“似是而非”的内容。真正有意义的东西是什么？就是经过实践检验，经过时间沉淀的东西，而 C++ 可以说正是符合这个要求。回顾自己半个月来的学习历程，深感“抽象”二字。  还有就是，paradigm 多范式，这个要在具体的场景和任务中去体会，简单来说就是，在一个大型的任务中，引入多个设计范式，而 C++ 正好是支持多范式的。



p191 B.S. 这段论述，可以好好看看，我们强调与语言相关联的关键人物。具体可以看看，很有批判性的一段论述。

![img](https://img.imotao.com/i/2024/03/28/660455070d25a.png)


p206 了解 C 语言发展历史的一段很有意思的我文字，

![img](https://img.imotao.com/i/2024/03/28/66045505e09c5.png)

### 7.2 C++语言

p192

![img](https://img.imotao.com/i/2024/03/28/66045509c92fb.png)


p208

![img](https://img.imotao.com/i/2024/03/28/66045508e73fd.png)

通过上述内容，我们知道 3 个非常重要的人物，一个是 B.S. 、 一个是 David Wheeler 和 Alexander Stepanov，B.S. 是 David Wheeler 的学生，这里想说真的做学术挺重要的 B.S. 学术功底很厚，做出 C++ 也不足为奇，就是真的要好好读书，要有学界的积淀。

---
**更新于**：2024年3月28日