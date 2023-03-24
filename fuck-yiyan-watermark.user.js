// ==UserScript==
// @name         去你大爷的文心一言水印
// @namespace    eb-watermark
// @version      -1
// @description  FUCK WATERMARK
// @author       LufsX, GPT3.5-turbo
// @match        https://yiyan.baidu.com/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var markID;
  var findDone = false;

  function findWatermark() {
    const reg = /[0-9a-z]{8}-([0-9a-z]{4}-){3}[0-9a-z]{12}/;
    const divs = document.querySelectorAll("div");
    divs.forEach((div) => {
      if (reg.test(div.id)) {
        markID = div.id;
        console.log("find");
        console.log(div.id);
        findDone = true;
      }
    });
    console.log("no found");
    if (!findDone) {
      setTimeout(findWatermark, 500);
      return;
    }
  }

  function cleanWatermark() {
    console.log("clean" + markID);
    var watermark = document.getElementById(markID);

    watermark.style = null;
    watermark.style.display = "none";
  }

  var observer = new MutationObserver(function (mutationsList) {
    for (var mutation of mutationsList) {
      if (!findDone) {
        findWatermark();
      }
      if (mutation.type === "childList" && mutation.addedNodes.length > 0 && findDone) {
        cleanWatermark();
        console.log("tir");
      }
    }
  });

  observer.observe(document.body, { childList: true });
})();
