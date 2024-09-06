# whistle.json-hacker

该whistle插件主要用于实现在 请求request 和 返回response 时，对原来JSON请求里面请求/响应参数 特定key的value 进行JSON反序列化等自定义函数转换处理，同时在原来whistle界面新增tab展示支持。

## 安装

1. 该应用是whistle插件，需要先安装whistle：https://github.com/avwo/whistle

2. 安装插件：

```bash
npm i -g whistle.json-hacker
```

> 推荐使用淘宝镜像： npm i -g whistle.json-hacker --registry=https://registry.npm.taobao.org

## 快速上手

### JSON 多层Tree反序列化&渲染处理

可以针对特定请求参数里面的某些key对应的value 为JSON序列化的数据，可自动执行反序列化处理，并且展示 JSON Tree的方式。

![Plugin-snapshot](https://raw.githubusercontent.com/leoswing/whistle.json-hacker/main/img/capture-main.png)

### JSON Tree 展开/收回

支持在whistle扩展 `JSONDeepView` tab界面快速展开和收回JSON展示

![Plugin-right-menu](https://raw.githubusercontent.com/leoswing/whistle.json-hacker/main/img/plugin-right-menu.png)

- Expand All: 展开 JSON Tree 所有节点
- Collapse All： 收回 JSON Tree 所有节点

也可以针对特定的JSON 节点手动点击展开/收回

### JSON 拷贝功能

在光标移动到对应的JSON 文件中，右上角会展示 Copy 按钮

![Plugin-copy-menu](https://raw.githubusercontent.com/leoswing/whistle.json-hacker/main/img/menu-function-desc.png)

点击 `Copy` 按钮即可实现复制

### JSON --> Text 互转功能

可以在 `JSONDeepView` tab 对JSON 文件进行 JSON <--> Text 的相互快速格式转换

- 当前是 `JSON` 格式，则点击 `Text` 即可转换成 Text 文本格式
- 当前是 `Text` 格式，则点击 `JSON` 即可转换成 JSON 对象格式

![Plugin-text-json-transform](https://raw.githubusercontent.com/leoswing/whistle.json-hacker/main/img/text-json-transform.png)

## TODO

- 支持配置化方式传递 request key 和 对应的函数转换处理
- 支持配置方式对 Response 的key 进行转换函数处理，自动处理和展示 Response 转换后的 JSONDeepView tab
