(function () {
  var framed = false;
  try { framed = window.self !== window.top; } catch (e) { framed = true; }

  // Turn decimals like 0.333 into kitchen fractions like ⅓
  var FR = [[0, ''], [0.125, '⅛'], [0.25, '¼'], [1 / 3, '⅓'], [0.375, '⅜'], [0.5, '½'], [0.625, '⅝'], [2 / 3, '⅔'], [0.75, '¾'], [0.875, '⅞'], [1, '']];
  function fmt(n) {
    if (n >= 10) return String(Math.round(n));
    var w = Math.floor(n), f = n - w, best = FR[0];
    FR.forEach(function (c) { if (Math.abs(c[0] - f) < Math.abs(best[0] - f)) best = c; });
    if (best[0] === 1) { w += 1; best = FR[0]; }
    if (w === 0 && !best[1]) return '⅛';
    return (w ? String(w) : '') + best[1];
  }

  function initBook(book) {
    if (!book || book.dataset.ready) return;
    book.dataset.ready = '1';
    var base = parseFloat(book.dataset.base) || 1;
    var cur = base;
    var step = base <= 8 ? 1 : Math.max(1, Math.round(base / 4));
    var count = book.querySelector('.serv-count');
    var qtys = Array.prototype.slice.call(book.querySelectorAll('.qty'));
    var minus = book.querySelector('.scale-btn[data-dir="-1"]');
    var plus = book.querySelector('.scale-btn[data-dir="1"]');
    function render() {
      var k = cur / base;
      qtys.forEach(function (q) {
        var v = parseFloat(q.dataset.qty);
        if (!isNaN(v)) q.textContent = fmt(v * k);
      });
      if (count) count.textContent = String(cur);
      if (minus) minus.disabled = cur - step < step;
      if (plus) plus.disabled = cur + step > base * 8;
    }
    [minus, plus].forEach(function (btn) {
      if (!btn) return;
      btn.addEventListener('click', function () {
        cur += step * parseInt(btn.dataset.dir, 10);
        render();
      });
    });
    render();
  }

  document.querySelectorAll('.book').forEach(initBook);

  // Book pop-up on the shelf
  var dlg = document.getElementById('book-dialog');
  var slot = dlg && dlg.querySelector('.book-slot');
  var full = dlg && dlg.querySelector('.full-link');
  if (full && framed) full.hidden = true;

  function openBook(slug, href, label) {
    var t = document.getElementById('book-' + slug);
    if (!t || !dlg || typeof dlg.showModal !== 'function') return false;
    slot.replaceChildren(t.content.cloneNode(true));
    initBook(slot.querySelector('.book'));
    if (full) { full.href = href; full.textContent = label || 'Open the full recipe page →'; }
    dlg.showModal();
    slot.scrollTop = 0;
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-recipe]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (openBook(a.dataset.recipe, a.href, a.dataset.fullLabel)) e.preventDefault();
  });

  if (dlg) {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) dlg.close();
    });
  }

  // Bookshelf tabs: Recipes / Premade meals
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.shelf-tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-case-panel]'));
  function showCase(name) {
    tabs.forEach(function (t) { t.setAttribute('aria-pressed', String(t.dataset.case === name)); });
    panels.forEach(function (p) { p.hidden = p.dataset.casePanel !== name; });
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { showCase(t.dataset.case); }); });
  function activeCase() {
    var on = tabs.filter(function (t) { return t.getAttribute('aria-pressed') === 'true'; })[0];
    return on ? on.dataset.case : null;
  }

  // Search the shelf
  var input = document.getElementById('recipe-search');
  var status = document.getElementById('search-status');
  if (input) {
    var spines = Array.prototype.slice.call(document.querySelectorAll('.spine'));
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var n = 0, perCase = {};
      spines.forEach(function (s) {
        var hit = !q || s.dataset.search.indexOf(q) !== -1;
        s.classList.toggle('dim', !hit);
        s.classList.toggle('match', !!q && hit);
        if (q && hit) {
          n++;
          var panel = s.closest('[data-case-panel]');
          if (panel) perCase[panel.dataset.casePanel] = (perCase[panel.dataset.casePanel] || 0) + 1;
        }
      });
      var cur = activeCase();
      if (q && cur && !perCase[cur]) {
        var other = Object.keys(perCase)[0];
        if (other) showCase(other);
      }
      if (status) {
        status.textContent = !q ? '' : n ? n + (n === 1 ? ' recipe' : ' recipes') + ' found' : 'Nothing matches yet. Try another ingredient!';
      }
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var shelf = document.getElementById('shelf');
        if (shelf) shelf.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Print button on recipe pages
  document.querySelectorAll('[data-print]').forEach(function (b) {
    if (framed) { b.hidden = true; return; }
    b.addEventListener('click', function () { window.print(); });
  });
})();
