# Windows桌面开发思考：技术选择与未来趋势

## Win桌面应用开发的思考与探索

在当今的开发环境中，无论是传统桌面应用还是跨平台应用，微软都给出了明确的建议。

对于想要入门Windows应用开发的开发者，微软的[官方文档](https://learn.microsoft.com/en-us/windows/apps/get-started/?tabs=winappsdk-winui%2Cnet-maui)提供了丰富的资源与指导。

## Windows操作系统的复杂性

经过一整天的资料查阅与文字撰写，我意识到Windows是一个极其复杂的操作系统。微软作为一个拥有深厚历史背景的公司，其技术演变反映了历史的局限性与技术发展的必然性。在这条演进的道路上，技术的选择并不是简单的“新旧”问题，而是如何把握经典与现代技术的平衡，成为了一个值得深思的命题。

## WinAppSDK：新的开发者组件

Windows 应用 SDK 是一组新的开发者组件和工具，标志着Windows应用开发平台的下一步发展。它提供了统一的API与工具，旨在为从Windows 11到Windows 10版本1809的桌面应用开发提供一致的支持。

详细信息可以参考微软的[官方文档](https://learn.microsoft.com/zh-cn/windows/apps/windows-app-sdk/)以及[Windows SDK下载](https://developer.microsoft.com/zh-cn/windows/downloads/windows-sdk/)。

由于我已经安装了VS2022，因此可以省去许多繁琐的步骤。对于Win10应用开发的官方教程，您可以访问[这里](https://learn.microsoft.com/zh-cn/training/modules/get-started-with-visual-studio-for-windows10-app-dev/1-visual-studio-features)。

## 现代化桌面应用（Modernize Desktop Apps）

随着技术的发展，桌面应用也需要不断地进行现代化改造。以下是几个值得关注的方面：

- **语言选择**：C#.NET、C++都可以选择，视具体需求而定。
- **用户界面（UI）**：WinUI3是一个非常不错的选择，它成功实现了与操作系统的解耦合。
- **API层面**：可以使用Win32或WinRT进行开发。
- **打包格式**：MSIX打包格式在一定程度上丰富了应用的打包与发布流程。

## MSVC单行版安装

对于开发现代Win桌面应用，微软推荐使用`C# + xxx`的组合。然而，由于我有课程需要使用C++，所以不得不深入学习这一语言。虽然我对.NET技术也非常感兴趣，尤其是其多年的发展与演进。

由于VS的安装包庞大且复杂，我想到了一个解决方案：是否可以单独安装MSVC而不依赖于整个Visual Studio？我找到了一些有用的资源：

- [Standalone MSVC Gist](https://gist.github.com/mmozeiko/7f3162ec2988e81e56d5c4e22cde9977)：该项目下载独立的64位MSVC编译器、链接器及其他工具，适用于64位本地桌面应用开发，而无需安装Visual Studio。

- 另一个更简单的选择是[PortableBuildTools](https://github.com/Data-Oriented-House/PortableBuildTools)，这个项目已经打包好了需要的工具。

## 回归C++：现代C++的学习

在微软的学习平台上，我发现了很不错的现代C++教程，[这篇文档](https://learn.microsoft.com/en-us/cpp/cpp/welcome-back-to-cpp-modern-cpp?view=msvc-170)。通过这段学习过程，我感受到了微软对于现代C++（尤其是C++17）的推荐与支持，这为我后续学习C++提供了明确的方向。

---
**更新于**：2024年1月3日
