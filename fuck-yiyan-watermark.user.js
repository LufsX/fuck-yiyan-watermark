// ==UserScript==
// @name         去你大爷的文心一言水印
// @namespace    eb-watermark
// @version      1
// @description  FUCK WATERMARK
// @author       ChatGPT, LufsX
// @match        https://yiyan.baidu.com/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function cleanWatermark() {
    // 查询元素
    var watermark = document.getElementById("eb-watermark");

    // 如果不存在，等待 0.5s 再重试
    if (!watermark) {
      setTimeout(cleanWatermark, 500);
      return;
    }

    // 如果存在，清空 style ，并隐藏它
    watermark.style = null;
    watermark.style.display = "none";
  }

  // 使用 MutationObserver 监听 body，当子元素发生变化时执行清空函数
  var observer = new MutationObserver(function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        cleanWatermark();
      }
    }
  });

  observer.observe(document.body, { childList: true });
})();
