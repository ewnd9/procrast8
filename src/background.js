'use strict';

chrome.runtime.onMessage.addListener((request, options, sendResponse) => {
  if (request.type === 'reload') {
    init();
  }
});

let badDomains;
let redirectTo;

chrome.tabs.onCreated.addListener(checkNewTab);
chrome.tabs.onUpdated.addListener(checkUpdatedTab);

init();

function init() {
  chrome.storage.sync.get({
    badDomains: 'twitter.com',
    redirectTo: 'reddit.com'
  }, function({ badDomains: _badDomains, redirectTo: _redirectTo }) {
    badDomains = (_badDomains || '').split(/,\s/g);
    redirectTo = _redirectTo.indexOf('http') === 0 ? _redirectTo : `https://${_redirectTo}`;
  });
}

function checkUpdatedTab(id, status, tab) {
  checkNewTab(tab);
}

function checkNewTab(tab) {
  const el = document.createElement('a');
  el.href = tab.url;
  const host = el.hostname;

  if (badDomains.indexOf(host) > -1) {
    chrome.tabs.update(tab.id, { url: redirectTo });
  }
}
