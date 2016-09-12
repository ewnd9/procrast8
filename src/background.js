'use strict';

chrome.runtime.onMessage.addListener(request => {
  if (request.type === 'reload') {
    init();
  }
});

let badDomains;
let redirectTo;

chrome.tabs.onCreated.addListener(checkNewTab);
chrome.tabs.onUpdated.addListener(checkUpdatedTab);

init();

chrome.contextMenus.create({
  title: 'procrastin8: set as the redirect destination',
  contexts: ['all'],
  onclick: onContextMenuClick
});

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
  for (let url of badDomains) {
    if (tab.url.indexOf(url) > -1) {
      chrome.tabs.update(tab.id, { url: redirectTo });
      break;
    }
  }
}

function onContextMenuClick(info) {
  chrome.storage.sync.set({
    redirectTo: info.pageUrl
  }, function() {
    init();
  });
}
