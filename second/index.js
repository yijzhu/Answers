// • 实现一个前端缓存模块，主要用于缓存 xhr 返回的结果，避免多余的网络请求浪费，要求：
// 1. 生命周期为一次页面打开
// 2. 如果有相同的请求同时并行发起，要求其中一个能挂起并且等待另外一个请求返回并读取该缓存

const cache = {};
export default function FetchWithCache() {
    const url = arguments[0];
    const options = arguments[1];

    // For non-GET requests, just fire
    if (options && options.method !== 'GET') {
        return window.fetch.apply(window, arguments);
    }

    // For GET requests
    if (!cache[url]) {
        cache[url] = window.fetch.apply(window, arguments).finally(() => {
            cache[url] = null;
        });
    }
    return cache[url];
}
