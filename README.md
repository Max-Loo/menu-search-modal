<!-- omit in toc -->
# menu-search-modal

A popup modal component based on vue3 and antdv, that can search menu.

English | [中文](./doc/README.zh-CN.md) 
<!-- omit in toc -->
## Examples
<img width="132" alt="image" src="https://user-images.githubusercontent.com/40628455/181225680-1a1398c5-ae15-41fa-9116-67630b52f69c.png">
<img width="540" alt="image" src="https://user-images.githubusercontent.com/40628455/181225792-389221ec-4a84-4af8-acff-6173a9e10e5c.png">



<!-- omit in toc -->
## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Events](#events)


## Installation
```bash
npm i -S menu-search-modal
# or
pnpm add -S menu-search-modal
```
## Usage

import the component where you want to use it.
```js
import MenuSearchModal from 'menu-search-modal'
import 'menu-search-modal/lib/MenuSearchModal/style.css'
```

if you are using `typescript`, you might also need to import the type.
```js
import type { MenuSearchModalOption } from 'menu-search-modal'
```

## Props
| **Prop**              | **Description**                                          | **Type**                                         | **Default**                                          |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| buttonType            | Type of the button component, same as antdv's            | primary / ghost / dashed / link / text / default | default                                              |
| buttonSize            | Size of th button component, same as antdv's             | large / middle / small                           | middle                                               |
| buttonShape           | Shape of the button component, same as antdv's           | default / circle / round                         | default                                              |
| buttonContent         | The text inside button                                   | string                                           | `⌘ + K` in macOS, and `Ctrl + K` in windows or linux |
| modalVisible(v-model) | The visibility of modal                                  | boolean                                          | false                                                |
| autofocus             | Whether auto focus on the input box while open the modal | boolean                                          | true                                                 |
| options               | The data that you want to deal with(search)              | MenuSearchModalOption[]                          | []                                                   |


## Events
| **Event** | **Description**                 | **Callback**                         |
| -------- | ------------------------ | ------------------------------------ |
| select   | Select the menu in result list | function({ label, value, disabled }) |

