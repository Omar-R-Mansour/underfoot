// Underfoot: if the game fails to start, say so on screen with the error and the browser,
// so a player on a phone (no console) can report it. Plain old JavaScript on purpose.
(function () {
  var shown = false;
  function show(message) {
    if (shown || window.game) return; // only before the game is up
    shown = true;
    var box = document.createElement('div');
    box.style.cssText =
      'position:fixed;left:0;top:0;right:0;bottom:0;z-index:20;display:flex;flex-direction:column;align-items:center;' +
      'justify-content:center;padding:24px;background:#1d1c1b;color:#f4f1ea;font:16px/1.45 -apple-system,system-ui,sans-serif;text-align:center';
    var title = document.createElement('div');
    title.style.cssText = 'font-size:21px;margin-bottom:12px';
    title.textContent = 'Underfoot could not start in this browser.';
    var detail = document.createElement('code');
    detail.style.cssText = 'opacity:0.85;max-width:92vw;word-break:break-word;margin-bottom:12px';
    detail.textContent = String(message).slice(0, 300);
    var browser = document.createElement('small');
    browser.style.cssText = 'opacity:0.55;max-width:92vw';
    browser.textContent = navigator.userAgent;
    box.appendChild(title);
    box.appendChild(detail);
    box.appendChild(browser);
    (document.body || document.documentElement).appendChild(box);
  }
  window.addEventListener('error', function (e) {
    show(e.message || (e.error && e.error.message) || 'script error');
  });
  window.addEventListener('unhandledrejection', function (e) {
    var r = e.reason;
    show((r && (r.message || String(r))) || 'promise rejected');
  });
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (!window.game) show('The game did not finish loading.');
    }, 10000);
  });
})();
