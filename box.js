/* Escape Box hero: scroll-driven 3D box opening. Vanilla JS, no deps. */
(function () {
  var root = document.getElementById('box-hero');
  if (!root) return;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INK = '#1F2430', RED = '#D64933', MUS = '#E8B04B', TEAL = '#2F7F86', CREAM = '#F6EFE3', KD = '#9C7148';
  var S = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';

  /* Toy items: tiny inline SVGs */
  var ITEMS = [
    // dinosaur
    '<svg viewBox="0 0 120 90"><path d="M14 70c4-14 16-24 32-26l6-18c3-10 12-16 22-14 9 2 14 9 13 16-1 5-6 7-11 6l-3 14c10 4 18 12 22 24l12 2-2 6-18-2c-2 2-3 4-3 6H74v-8H52v8H40v-6c-10-1-20-2-26-8z" fill="#7FB069" ' + S + '/><circle cx="80" cy="21" r="2.6" fill="' + INK + '"/><path d="M50 28l-6-6m10-6-4-8m12 2-1-8" ' + S + ' fill="none"/><path d="M46 52c6 4 14 5 22 2" ' + S + ' fill="none" opacity=".5"/></svg>',
    // rocket
    '<svg viewBox="0 0 80 120"><path d="M40 6c16 12 22 32 18 62H22C18 38 24 18 40 6z" fill="' + CREAM + '" ' + S + '/><path d="M22 54L8 74l2 18 14-12m34-26 14 20-2 18-14-12" fill="' + RED + '" ' + S + '/><circle cx="40" cy="40" r="9" fill="' + TEAL + '" ' + S + '/><path d="M26 68h28l-4 12H30z" fill="' + KD + '" ' + S + '/><path d="M32 82c0 12 8 22 8 22s8-10 8-22z" fill="' + MUS + '" ' + S + '/><path d="M40 6c5 4 9 9 12 14H28c3-5 7-10 12-14z" fill="' + RED + '" ' + S + '/></svg>',
    // whale
    '<svg viewBox="0 0 130 90"><path d="M10 50c0-20 22-32 46-32 26 0 44 14 46 30l14-14c4 0 5 3 4 6l-6 16 8 12c1 4-2 5-5 4l-15-8c-8 12-28 20-48 18C28 80 10 68 10 50z" fill="#5FA3C9" ' + S + '/><path d="M14 58c18 12 54 14 80 2" fill="none" ' + S + ' opacity=".5"/><circle cx="34" cy="44" r="3" fill="' + INK + '"/><path d="M50 18c-2-8 2-14 2-14m0 14c4-7 10-9 10-9M50 18c-6-5-12-5-12-5" fill="none" ' + S + '/></svg>',
    // treasure chest
    '<svg viewBox="0 0 120 100"><path d="M14 46h92v44H14z" fill="' + KD + '" ' + S + '/><path d="M14 46c0-22 14-32 46-32s46 10 46 32z" fill="#B5814F" ' + S + '/><path d="M28 18v72M92 18v72" stroke="' + MUS + '" stroke-width="8"/><path d="M28 18v72M92 18v72" fill="none" ' + S + ' opacity=".35"/><rect x="50" y="40" width="20" height="22" rx="3" fill="' + MUS + '" ' + S + '/><circle cx="60" cy="50" r="3" fill="' + INK + '"/><path d="M40 12l4-8 4 8m26-2 5-7 3 8" fill="none" stroke="' + MUS + '" stroke-width="3" stroke-linecap="round"/></svg>',
    // puzzle pieces
    '<svg viewBox="0 0 120 100"><path d="M8 34h16a9 9 0 1 1 18 0h16v16a9 9 0 1 1 0 18v16H8z" fill="' + MUS + '" ' + S + ' transform="rotate(-8 34 60)"/><path d="M64 20h16a9 9 0 1 1 18 0h16v16a9 9 0 1 0 0 18v16H64z" fill="' + TEAL + '" ' + S + ' transform="rotate(10 90 46)"/></svg>',
    // week envelope
    '<svg viewBox="0 0 120 86"><rect x="6" y="10" width="108" height="70" rx="4" fill="' + CREAM + '" ' + S + '/><path d="M6 14l54 38 54-38" fill="none" ' + S + '/><circle cx="60" cy="50" r="10" fill="' + RED + '" ' + S + '/><text x="60" y="76" text-anchor="middle" font-family="Courier New,monospace" font-weight="700" font-size="11" fill="' + INK + '">WEEK 1</text></svg>',
    // magnifying glass
    '<svg viewBox="0 0 100 100"><path d="M60 60l28 28" stroke="' + KD + '" stroke-width="12" stroke-linecap="round"/><path d="M60 60l28 28" stroke="' + INK + '" stroke-width="3" stroke-linecap="round" opacity=".4"/><circle cx="40" cy="40" r="26" fill="#CFE6E8" fill-opacity=".8" stroke="' + INK + '" stroke-width="7"/><path d="M26 32a16 16 0 0 1 12-10" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>'
  ];

  /* Landing spots, in units of box size s, relative to box centre */
  var PORTRAIT = [[-0.82,-0.95,-10],[0.82,-0.95,10],[-0.8,-1.8,6],[0.8,-1.8,-8],[0,-2.25,-3],[-0.7,-2.7,8],[0.7,-2.7,-6]];
  var LANDSCAPE = [[-2.15,0.05,-10],[-1.85,-1.0,8],[-0.95,-1.55,-6],[0.95,-1.55,7],[1.85,-1.0,-8],[2.15,0.05,10],[-1.5,0.95,-4]];
  var SPIN = [-160, 140, -120, 180, -200, 150, -140];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  root.classList.add('bx-ready');
  var stage = el('div', 'bx-stage');
  var shadow = el('div', 'bx-shadow');
  var box = el('div', 'bx-box');
  var itemsWrap = el('div', 'bx-items');
  var caps = el('div', 'bx-caps');
  var hint = el('div', 'bx-hint', 'Scroll to open');
  var CAPS = ['Every month, a new <em>mystery</em> arrives.', 'Open it <em>together</em>.', 'No screens. Just <em>clues</em>.'];
  var capEls = CAPS.map(function (t) { var p = el('p', 'bx-cap', t); caps.appendChild(p); return p; });
  stage.setAttribute('aria-hidden', 'true');
  var sr = el('p', '', CAPS.join(' ').replace(/<[^>]+>/g, ''));
  sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
  root.appendChild(sr);

  // faces
  function face(cls, html) { var f = el('div', 'bx-f ' + cls, html); return f; }
  var F = {
    front: face('bx-wall bx-front', '<b>ESCAPE BOX</b><small>CASE N&deg;01</small>'),
    back: face('bx-wall bx-back'), left: face('bx-wall bx-side'), right: face('bx-wall bx-side'),
    floor: face('bx-floor'), bottom: face('bx-wall bx-back')
  };
  ['floor', 'bottom', 'back', 'left', 'right', 'front'].forEach(function (k) { box.appendChild(F[k]); });
  var lid = el('div', 'bx-lid'), lidIn = el('div', 'bx-lid-in');
  var L = {
    top: face('bx-lid-top', '<i>?</i>'), under: face('bx-lid-under'),
    rf: face('bx-rim'), rb: face('bx-rim bx-side'), rl: face('bx-rim bx-side'), rr: face('bx-rim bx-side')
  };
  for (var k in L) lidIn.appendChild(L[k]);
  lid.appendChild(lidIn); box.appendChild(lid);

  var items = ITEMS.map(function (svg) { var d = el('div', 'bx-item', svg); itemsWrap.appendChild(d); return d; });
  stage.appendChild(shadow); stage.appendChild(box); stage.appendChild(itemsWrap); stage.appendChild(hint); stage.appendChild(caps);
  root.appendChild(stage);

  function place(f, w, h, t) { f.style.width = w + 'px'; f.style.height = h + 'px'; f.style.transform = 'translate(-50%,-50%) ' + t; }

  var s, H, vw, vh, portrait, bx, by, iw, spots;
  function layout() {
    vw = stage.clientWidth; vh = stage.clientHeight; portrait = vw / vh < 0.9;
    s = portrait ? Math.min(vw * 0.42, vh * 0.2, 240) : Math.min(vh * 0.25, vw * 0.2, 230);
    s = Math.round(s);
    H = Math.round(s * 0.62);
    var R = Math.round(s * 0.2), Wl = Math.round(s * 1.06), h2 = H / 2, d2 = s / 2, l2 = Wl / 2;
    bx = 0; by = portrait ? vh * 0.18 : vh * 0.07;
    iw = Math.round(s * (portrait ? 0.62 : 0.7));
    spots = portrait ? PORTRAIT : LANDSCAPE;
    place(F.front, s, H, 'translateZ(' + d2 + 'px)');
    place(F.back, s, H, 'rotateY(180deg) translateZ(' + d2 + 'px)');
    place(F.right, s, H, 'rotateY(90deg) translateZ(' + d2 + 'px)');
    place(F.left, s, H, 'rotateY(-90deg) translateZ(' + d2 + 'px)');
    place(F.bottom, s, s, 'rotateX(-90deg) translateZ(' + h2 + 'px)');
    place(F.floor, s - 2, s - 2, 'rotateX(90deg) translateZ(' + (-h2 + 3) + 'px)');
    lid.style.transformOrigin = '0 0';
    lidIn.style.transform = 'translateZ(' + l2 + 'px)';
    place(L.top, Wl, Wl, 'rotateX(90deg)');
    place(L.under, Wl - 2, Wl - 2, 'translateY(1px) rotateX(-90deg)');
    place(L.rf, Wl, R, 'translateY(' + R / 2 + 'px) translateZ(' + l2 + 'px)');
    place(L.rb, Wl, R, 'translateY(' + R / 2 + 'px) rotateY(180deg) translateZ(' + l2 + 'px)');
    place(L.rr, Wl, R, 'translateY(' + R / 2 + 'px) rotateY(90deg) translateZ(' + l2 + 'px)');
    place(L.rl, Wl, R, 'translateY(' + R / 2 + 'px) rotateY(-90deg) translateZ(' + l2 + 'px)');
    box.style.setProperty('--bx-fs', Math.max(10, s * 0.1) + 'px');
    box.style.setProperty('--bx-q', Math.round(s * 0.24) + 'px');
    shadow.style.width = s * 2 + 'px'; shadow.style.height = s * 0.55 + 'px';
    items.forEach(function (it) { it.style.width = iw + 'px'; it.style.marginLeft = -iw / 2 + 'px'; it.style.marginTop = -iw / 2 + 'px'; });
    cur = -1; // force redraw
  }

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(p, a, b) { return clamp((p - a) / (b - a)); }
  function eOut(t) { return 1 - Math.pow(1 - t, 3); }
  function eInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function eBack(t) { var c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }

  var target = RM ? 1 : 0, cur = -1, shown = RM ? 1 : 0, time = 0, visible = true, capIdx = -1;

  function render(p, tm) {
    // box: gentle turn + small hop before opening
    var hop = Math.sin(seg(p, 0.03, 0.12) * Math.PI) * s * 0.06;
    var ry = -32 + eInOut(p) * 12;
    box.style.transform = 'translate3d(' + bx + 'px,' + (by - hop) + 'px,0) rotateX(-24deg) rotateY(' + ry + 'deg)';
    shadow.style.transform = 'translate(-50%,-50%) translate(' + bx + 'px,' + (by + H * 0.62) + 'px) scale(' + (1 - hop / s) + ')';
    // lid hinges open about its back edge
    var lo = seg(p, 0.1, 0.3);
    var ang = 118 * eBack(lo);
    var Wl = Math.round(s * 1.06);
    lid.style.transform = 'translate3d(0,' + (-H / 2 - 1 - eOut(lo) * 4) + 'px,' + (-Wl / 2) + 'px) rotateX(' + ang + 'deg)';
    // items fly out one after another
    var ox = bx, oy = by - H * 0.35;
    for (var i = 0; i < items.length; i++) {
      var t = seg(p, 0.27 + i * 0.075, 0.27 + i * 0.075 + 0.24), it = items[i];
      if (t <= 0) { it.style.opacity = 0; it.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(.2)'; continue; }
      var sp = spots[i], tx = ox + sp[0] * s, ty = by + sp[1] * s;
      var e = eOut(t), u = 1 - e;
      var cx = ox + (tx - ox) * 0.25, cy = Math.min(oy, ty) - s * 0.9;
      var x = u * u * ox + 2 * u * e * cx + e * e * tx, y = u * u * oy + 2 * u * e * cy + e * e * ty;
      var rot = sp[2] + SPIN[i] * (1 - e), sc = 0.25 + 0.75 * eBack(t);
      if (t >= 1 && !RM) { y += Math.sin(tm * 1.6 + i * 1.3) * s * 0.03; rot += Math.sin(tm * 1.1 + i) * 2; }
      it.style.opacity = Math.min(1, t * 6);
      it.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
    }
    var ci = p < 0.22 ? 0 : p < 0.62 ? 1 : 2;
    if (ci !== capIdx) { capEls.forEach(function (c, j) { c.classList.toggle('on', j === ci); }); capIdx = ci; }
    hint.style.opacity = p < 0.04 ? 1 : 0;
  }

  function progress() {
    var r = root.getBoundingClientRect(), total = r.height - stage.clientHeight;
    return total > 0 ? clamp(-r.top / total) : 1;
  }

  var last = 0;
  function loop(ts) {
    if (!visible) { running = false; return; }
    time = ts / 1000;
    target = progress();
    shown += (target - shown) * Math.min(1, (ts - last) / 1000 * 9 || 0.15);
    last = ts;
    if (Math.abs(target - shown) < 0.0005) shown = target;
    render(shown, time);
    requestAnimationFrame(loop);
  }
  var running = false;
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }

  layout();
  if (RM) { render(1, 0); window.addEventListener('resize', function () { layout(); render(1, 0); }); return; }
  shown = progress(); render(shown, 0);
  window.addEventListener('resize', layout);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(root);
  }
  start();
})();
