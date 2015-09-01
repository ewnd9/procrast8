var bads = ['twitter.com', 'vk.com'];
var good = 'http://www.memrise.com/home/';

if (bads.indexOf(window.location.host) > -1) {
  window.location.replace(good);
}
