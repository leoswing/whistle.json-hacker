const HIDE_CLASS = 'hide';
const WRAPPER_CLASS = 'w-iframe';

/**
 * whistle >= 2.10.8 的 inspector 插件面板容器恒定带 `hide` 类。
 *
 * 上游 render 把 `tabs.map()` 内联到了 createElement 的 children 参数位，而标记
 * "存在可见子层" 的那个局部变量是在 map 回调里才置 false 的；props 对象先于 children
 * 求值，className 拼好时它仍是初始的 true，于是容器永远被隐藏。
 *
 * 每个 `.w-iframe` 子层自身的 `display` 仍由上游正确维护，所以这里以子层为准回算容器
 * 的可见性。仅在观察到「容器已隐藏但存在可见子层」这一矛盾状态后才接管，修复版 whistle
 * 上不会触发。
 */
export function fixPluginPanelVisibility(): () => void {
  const noop = () => {};

  let frame: Element | null = null;

  try {
    frame = window.frameElement;
  } catch {
    // 跨域时不可访问，说明不在 whistle 控制台内
    return noop;
  }

  const wrapper = frame?.parentElement;
  const container = wrapper?.parentElement;

  if (!wrapper?.classList.contains(WRAPPER_CLASS) || !container) {
    return noop;
  }

  // 这些元素属于父文档的 realm，不能用 instanceof HTMLElement 判别（构造器不同源）
  const getWrappers = () =>
    Array.from(container.children).filter((el) =>
      el.classList.contains(WRAPPER_CLASS),
    ) as HTMLElement[];

  let engaged = false;

  const sync = () => {
    const wrappers = getWrappers();

    if (!wrappers.length) {
      return;
    }

    const anyVisible = wrappers.some((el) => el.style.display !== 'none');

    if (!engaged) {
      if (!(container.classList.contains(HIDE_CLASS) && anyVisible)) {
        return;
      }

      engaged = true;
    }

    container.classList.toggle(HIDE_CLASS, !anyVisible);
  };

  // 子层的 display 由 React 内联样式驱动，是判断激活态的可靠信号；容器 childList 变化
  // 意味着有插件 tab 新挂载，需要重新纳入统计。
  const observer = new MutationObserver(sync);

  observer.observe(container, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });

  sync();

  return () => observer.disconnect();
}
