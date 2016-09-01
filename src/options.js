'use strict';

document.addEventListener('DOMContentLoaded', init);

let badDomainsInput;
let redirectToInput;

function init() {
  badDomainsInput = document.getElementById('bad-domains');
  badDomainsInput.addEventListener('input', saveOptions);

  redirectToInput = document.getElementById('redirect');
  redirectToInput.addEventListener('input', saveOptions);

  chrome.storage.sync.get({
    badDomains: 'twitter.com',
    redirectTo: 'reddit.com'
  }, function({ badDomains, redirectTo }) {
    badDomainsInput.value = badDomains;
    redirectToInput.value = redirectTo;
  });
}

function saveOptions() {
  const badDomains = badDomainsInput.value;
  const redirectTo = redirectToInput.value;

  chrome.storage.sync.set({
    badDomains,
    redirectTo
  }, function() {
    chrome.runtime.sendMessage({ type: 'reload' }, function(response) {
      console.log(response)
    });
  });
}
