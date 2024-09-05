# whistle.json-hacker

## 开发模式

```
npm run dev
```

这会启动一个`vite`服务，链接为: http://localhost:2333

## 生产模式

```
npm run serve
```

这会先执行 `npm run build` 将代码打包到 `dist` 文件夹，包含 `dist/client` 和 `dist/server` ，随后启动 `Koa` 静态服务，链接为: http://localhost:2333

## 文件

`index.html` - `vite` 入口文件，包括客户端的入口引用

`prerender.ts` - 预渲染 HTML

`server.ts` - 具有服务端渲染的应用服务器

`src/entry-client.tsx` - 客户端渲染入口，将应用挂载到一个 DOM 元素上

`src/entry-server.tsx` - 服务端渲染入口，使用`React`框架的 SSR API 渲染该应用

`src/App.tsx` - `React`应用主入口

`src/pages` - 不同路由的页面文件夹

`.eslintrc.js` - `ESLint` 配置

`tsconfig.json` - `TypeScript` 配置

`vite.config.ts` - `Vite` 配置


# Reference

- [plugins development](https://wproxy.org/whistle/plugins.html)
- [whistle lack](https://github.com/avwo/lack)
- [example whistle.view-md5](https://github.com/whistle-plugins/examples/tree/master/whistle.view-md5)
- [example whistle.test-ui](https://github.com/whistle-plugins/examples/tree/master/whistle.test-ui)
