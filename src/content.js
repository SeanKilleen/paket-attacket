'use strict';

injectScript('script.js');

function injectScript(scriptPath) {
  const script = document.createElement('script');
  script.src = chrome.extension.getURL(scriptPath);
  script.onload = function () { this.remove() };
  document.body.appendChild(script);
}
