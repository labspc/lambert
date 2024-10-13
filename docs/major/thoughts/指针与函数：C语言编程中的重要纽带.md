# 指针与函数：C语言编程中的重要纽带

主要内容如下：

- 指针作为函数参数
- 函数与指针
- 指针的指针

## 1.指针作为函数参数

函数参数有两个，一个是普通参数，一个是指针参数。而，普通参数是传值拷贝，为什么又要有指针参数？

两变量交换问题，老生常谈用指针：

```c
#include <stdio.h>

void swap(int *ptr1, int *ptr2) {
    int temp = *ptr1;
    *ptr1 = *ptr2;
    *ptr2 = temp;
}

int main() {
    int a = 5, b = 10;

    printf("Before swapping:\n");
    printf("a = %d\n", a);
    printf("b = %d\n", b);

    // 传递变量地址给 swap 函数
    swap(&a, &b);

    printf("\nAfter swapping:\n");
    printf("a = %d\n", a);
    printf("b = %d\n", b);

    return 0;
}
```

为什么要有指针参数，就是传值此时已经失效，但是指针参数可以完成这件事。

```c
// 传递变量地址给 swap 函数
    swap(&a, &b);
```

这行代码解释如下，这里我也老是搞混，这里调用 swap 函数，该函数需要两个 int * 类型的参数，但此时传递的是 int 类型的参数，就会出现上述 bug。 我们需要使用 & 运算符**获取变量的地址**。

![img](https://img.imotao.com/i/2024/03/29/66067cdb104ba.png)

这样，swap 函数将接收到指向 a 和 b 的指针，而不是它们的值。取地址之后，传进去的就是指针？为什么？此时指针即地址。就是说 swap 函数是要传两个地址进去，地址地址传进去的就是指针。


![img](https://img.imotao.com/i/2024/03/29/66067cdd3905f.jpeg)

p49


**注意：就是说，要在被调函数中改变实参的值，就要通过指针变量作为函数参数来实现。形参和实参必须类型相同，无论是普通参数，还是指针参数。 这一点，从上述的 bug 就能验证。**



## 2.函数与指针

### 2.1 函数的指针

此时，说的指针是地址，不是指针变量。

先说定义，**函数的指针，其实就是函数入口的地址。**在计算**机内存中，所有需要存储的数据，都有自己的地址。**函数在编译的时候，也会在内存中存储，那有没有地址呢？肯定有的，只是和数组不一样，数组我们知道，数组的指针，就是数组首元素的地址，但是函数的地址只有一个，上面说的这个是函数的入口地址。



指针变量是可以通过指针来访问指向的变量，那指针变量能不能通过指针来访问指向的函数呢？这个问题很有意思。

好来看看，函数指针的定义：

```c
return_type (*pointer_name)(parameter_type1, parameter_type2, ...);
```

- return_type 是函数返回值的类型；
- pointer_name 是函数指针变量的名称；
- (parameter_type1, parameter_type2, ...) 是函数参数的类型列表。

```c
#include <stdio.h>

// 声明两个函数，它们的类型为 int(int, int)
int add(int a, int b) {
    return a + b;
}

int main() {
    // 定义一个函数指针，指向返回类型为 int，参数为两个整数的函数
    int (*ptr)(int, int);

    // 初始化函数指针，使其指向 add 函数
    ptr = add;

    // 使用函数指针调用 add 函数
    printf("Result of addition: %d\n", ptr(5, 3));

    return 0;
}
```

![img](https://img.imotao.com/i/2024/03/29/66067cdc147cb.png)

![img](https://img.imotao.com/i/2024/03/29/66067cdc51ec6.png)

看这段代码，尤其是图片中标箭头的地方，我们主要学习怎么用，我们关心用法。在初始化之后，指针变量已经指向了函数。

### 2.2 指针函数

指针函数就是，它返回值是指针，记住这是个函数，不是变量。嗯，知道是函数就够了。

```c
#include <stdio.h>

// 定义一个函数，返回一个整数的指针（即地址）
int* get_integer() {
    static int num = 10; 
    // 静态变量，存储在静态存储区，其生命周期与程序的生命周期相同
    return &num; // 返回静态变量的地址（地址即指针，指针即地址）
}

int main() {

    // 调用 get_integer 函数，并接收返回的指针
    //int *ptr = get_integer();
    // 使用返回的指针访问整数，并打印出来
    //printf("Value of integer: %d\n", *ptr); // 解引用找到num的值
    
    printf("%p\n", get_integer()); // 返回的是地址
    
    return 0;
}
```

![img](https://img.imotao.com/i/2024/03/29/66067cdcc91f3.png)

这里就能看到，函数返回值是一个指针。 这就是函数指针，本质上是一个函数。

## 3.指针的指针

这一部分内容我也是第一次学，来一起学学看。

p64

**需要注意的是，指针的指针的类型为：指针变量指向的数据的类型**

![img](https://img.imotao.com/i/2024/03/29/66067cde43bb1.jpeg)

这段论述很清楚，指针变量也需要被存储。下面，通过两个 demo 来体会指针的指针：

### 3.1 指针的指针的大小

```c
#include <stdio.h>

int main() {
  int a = 10;
  int *p = &a; // p 指向 a
  int **q = &p; // q 指向 p

  printf("sizeof(a): %zu\n", sizeof(a));
  printf("sizeof(p): %zu\n", sizeof(p));
  printf("sizeof(q): %zu\n", sizeof(q));

  return 0;
}
```

![img](https://img.imotao.com/i/2024/03/29/66067cde6e2b4.png)

我们怎么理解指针的指针和指针大小是一样的呢？什么是指针变量？我们说**指针变量指向 XXX** ，指针的指针是什么？指向指针的指针，故此指针的指针本质还是指针变量，那是指针变量，不管你指了多少个，都是一样的。

### 3.2 访问问题

```c
#include <stdio.h>

int main() {
  int a = 10;
  int *p = &a;  // p 指向 a
  int **q = &p; // q 指向 p

  // 打印指针的值
  printf("p 的值：%p\n", p);

  // 打印指针的指针的值
  printf("q 的值：%p\n", q);

  // 通过 q 修改变量 a 的值
  **q = 20;

  // 打印 a 的值
  printf("a 的值：%d\n", a);

  return 0;
}
```

![img](https://img.imotao.com/i/2024/03/29/66067cde57120.png)

## 参考书籍

- 《C指针编程之道》ISBN 9787115250841

---
**更新于**：2023年11月11日