<!-- omit in toc -->
# menu-search-modal

一个基于 vue3 和 antdv 的可以搜索菜单的弹出框组件

[English](../README.md) | 中文

<!-- omit in toc -->
## Table of contents
- [安装](#安装)
  - [NPM](#npm)
- [用法](#用法)
- [组件参数](#组件参数)
- [组件事件](#组件事件)


## 安装

### NPM

```bash
npm i -S menu-search-modal
# or
pnpm add -S menu-search-modal
```

## 用法

在你需要使用此组件的地方引入它。
```js
import MenuSearchModal from 'menu-search-modal'
import 'menu-search-modal/lib/MenuSearchModal/style.css'
```

如果你有使用到 `typescript`，你可能需要引入类型。
```js
import type { MenuSearchModalOption } from 'menu-search-modal'
```


## 组件参数
| **参数**              | **说明**                                                 | **类型**                                         | **默认值**                                          |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| buttonType            | 弹窗按钮的类型，和 antdv 的 button 组件的 type 参数一致  | primary / ghost / dashed / link / text / default | default                                             |
| buttonSize            | 弹窗按钮的尺寸，和 antdv 的 button 组件的 size 参数一致  | large / middle / small                           | middle                                              |
| buttonShape           | 弹窗按钮的形状，和 antdv 的 button 组件的 shape 参数一致 | default / circle / round                         | default                                             |
| buttonContent         | 弹窗按钮的文案                                           | string                                           | 在 macOS 下为 `⌘ + K`，在 windows/linux 下为 `Ctrl + K` |
| modalVisible(v-model) | 弹窗是否可见                                             | boolean                                          | false                                               |
| autofocus             | 打开弹窗后是否自动聚焦到输入框                           | boolean                                          | true                                                |
| options               | 菜单可选项的数据                                         | MenuSearchModalOption[]                          | []                                                  |


## 组件事件
| **事件** | **说明**                 | **回调函数**                         |
| -------- | ------------------------ | ------------------------------------ |
| select   | 点击或选择某一条菜单记录 | function({ label, value, disabled }) |
