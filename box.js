/* Escape Box hero: scroll-driven 3D spy box opening. Vanilla JS, no deps. */
(function () {
  var root = document.getElementById('box-hero');
  if (!root) return;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INK = '#1F2430', RED = '#D64933', MUS = '#E8B04B', TEAL = '#2F7F86', CREAM = '#F6EFE3', KD = '#9C7148', NAVY = '#232A36';
  var S = 'stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';

  /* Toys and spy gadgets: tiny inline SVGs */
  var ITEMS = [
    // dinosaur
    '<svg viewBox="0 0 120 90"><path d="M14 70c4-14 16-24 32-26l6-18c3-10 12-16 22-14 9 2 14 9 13 16-1 5-6 7-11 6l-3 14c10 4 18 12 22 24l12 2-2 6-18-2c-2 2-3 4-3 6H74v-8H52v8H40v-6c-10-1-20-2-26-8z" fill="#7FB069" ' + S + '/><circle cx="80" cy="21" r="2.6" fill="' + INK + '"/><path d="M50 28l-6-6m10-6-4-8m12 2-1-8" ' + S + ' fill="none"/></svg>',
    // rocket
    '<svg viewBox="0 0 80 120"><path d="M40 6c16 12 22 32 18 62H22C18 38 24 18 40 6z" fill="' + CREAM + '" ' + S + '/><path d="M22 54L8 74l2 18 14-12m34-26 14 20-2 18-14-12" fill="' + RED + '" ' + S + '/><circle cx="40" cy="40" r="9" fill="' + TEAL + '" ' + S + '/><path d="M26 68h28l-4 12H30z" fill="' + KD + '" ' + S + '/><path d="M32 82c0 12 8 22 8 22s8-10 8-22z" fill="' + MUS + '" ' + S + '/><path d="M40 6c5 4 9 9 12 14H28c3-5 7-10 12-14z" fill="' + RED + '" ' + S + '/></svg>',
    // binoculars
    '<svg viewBox="0 0 120 90"><rect x="10" y="30" width="40" height="50" rx="12" fill="' + NAVY + '" ' + S + '/><rect x="70" y="30" width="40" height="50" rx="12" fill="' + NAVY + '" ' + S + '/><rect x="46" y="38" width="28" height="18" rx="4" fill="#4A5260" ' + S + '/><rect x="16" y="12" width="28" height="22" rx="5" fill="#4A5260" ' + S + '/><rect x="76" y="12" width="28" height="22" rx="5" fill="#4A5260" ' + S + '/><circle cx="30" cy="66" r="10" fill="#7FC4CB" ' + S + '/><circle cx="90" cy="66" r="10" fill="#7FC4CB" ' + S + '/><path d="M26 62l4-3m56 3 4-3" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>',
    // whale
    '<svg viewBox="0 0 130 90"><path d="M10 50c0-20 22-32 46-32 26 0 44 14 46 30l14-14c4 0 5 3 4 6l-6 16 8 12c1 4-2 5-5 4l-15-8c-8 12-28 20-48 18C28 80 10 68 10 50z" fill="#5FA3C9" ' + S + '/><circle cx="34" cy="44" r="3" fill="' + INK + '"/><path d="M50 18c-2-8 2-14 2-14m0 14c4-7 10-9 10-9M50 18c-6-5-12-5-12-5" fill="none" ' + S + '/></svg>',
    // treasure chest
    '<svg viewBox="0 0 120 100"><path d="M14 46h92v44H14z" fill="' + KD + '" ' + S + '/><path d="M14 46c0-22 14-32 46-32s46 10 46 32z" fill="#B5814F" ' + S + '/><path d="M28 18v72M92 18v72" stroke="' + MUS + '" stroke-width="8"/><rect x="50" y="40" width="20" height="22" rx="3" fill="' + MUS + '" ' + S + '/><circle cx="60" cy="50" r="3" fill="' + INK + '"/></svg>',
    // walkie-talkie
    '<svg viewBox="0 0 80 120"><path d="M54 6v24" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/><rect x="14" y="26" width="52" height="88" rx="10" fill="' + RED + '" ' + S + '/><rect x="22" y="36" width="36" height="22" rx="3" fill="#BFE3C0" ' + S + '/><path d="M24 70h32M24 78h32M24 86h32" ' + S + '/><circle cx="40" cy="102" r="5" fill="' + MUS + '" ' + S + '/></svg>',
    // puzzle pieces
    '<svg viewBox="0 0 120 100"><path d="M8 34h16a9 9 0 1 1 18 0h16v16a9 9 0 1 1 0 18v16H8z" fill="' + MUS + '" ' + S + ' transform="rotate(-8 34 60)"/><path d="M64 20h16a9 9 0 1 1 18 0h16v16a9 9 0 1 0 0 18v16H64z" fill="' + TEAL + '" ' + S + ' transform="rotate(10 90 46)"/></svg>',
    // week envelope
    '<svg viewBox="0 0 120 86"><rect x="6" y="10" width="108" height="70" rx="4" fill="' + CREAM + '" ' + S + '/><path d="M6 14l54 38 54-38" fill="none" ' + S + '/><circle cx="60" cy="50" r="10" fill="' + RED + '" ' + S + '/><text x="60" y="76" text-anchor="middle" font-family="Courier New,monospace" font-weight="700" font-size="11" fill="' + INK + '">WEEK 1</text></svg>',
    // magnifying glass
    '<svg viewBox="0 0 100 100"><path d="M60 60l28 28" stroke="' + KD + '" stroke-width="12" stroke-linecap="round"/><circle cx="40" cy="40" r="26" fill="#CFE6E8" fill-opacity=".85" stroke="' + INK + '" stroke-width="7"/><path d="M26 32a16 16 0 0 1 12-10" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>'
  ];

  /* Landing spots, in units of box size s, relative to box centre: x, y, rotate */
  var PORTRAIT = [[-0.84,-0.95,-10],[0.84,-0.95,10],[-0.82,-1.78,6],[0.82,-1.78,-8],[0,-2.25,-3],[-0.72,-2.72,8],[0.72,-2.72,-6],[-0.86,0.3,-6],[0.86,0.3,7]];
  var LANDSCAPE = [[-2.15,0.05,-10],[-1.85,-1.0,8],[-0.95,-1.6,-6],[0.95,-1.6,7],[1.85,-1.0,-8],[2.15,0.05,10],[-1.5,0.95,-4],[1.5,0.95,5],[0,-2.05,-3]];
  var SPIN = [-160, 140, -120, 180, -200, 150, -140, 170, -150];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  root.classList.add('bx-ready');
  var stage = el('div', 'bx-stage');
  var shadow = el('div', 'bx-shadow');
  var glow = el('div', 'bx-glow');
  var box = el('div', 'bx-box');
  var itemsWrap = el('div', 'bx-items');
  var caps = el('div', 'bx-caps');
  var hint = el('div', 'bx-hint', 'Scroll to open');
  var CAPS = ['A new <em>mission</em> arrives every month.', 'Open it <em>together</em>.', 'No screens. Just <em>clues</em>.'];
  var capEls = CAPS.map(function (t) { var p = el('p', 'bx-cap', t); caps.appendChild(p); return p; });
  stage.setAttribute('aria-hidden', 'true');
  var sr = el('p', '', CAPS.join(' ').replace(/<[^>]+>/g, ''));
  sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)';
  root.appendChild(sr);

  function face(cls, html) { return el('div', 'bx-f ' + cls, html); }
  var F = {
    bottom: face('bx-wall bx-l3'), floor: face('bx-floor'),
    iFront: face('bx-in'), iBack: face('bx-in'), iLeft: face('bx-in'), iRight: face('bx-in'),
    tFront: face('bx-rimtop'), tBack: face('bx-rimtop'), tLeft: face('bx-rimtop'), tRight: face('bx-rimtop'),
    back: face('bx-wall bx-l3'), left: face('bx-wall bx-l2'), right: face('bx-wall bx-l2'),
    front: face('bx-wall bx-front bx-l1', '<b>TOP SECRET</b><span class="bx-fp"></span><span class="bx-latch"></span><small>CLASSIFIED &middot; CASE N&deg;01</small>')
  };
  for (var k in F) box.appendChild(F[k]);
  var lid = el('div', 'bx-lid'), lidIn = el('div', 'bx-lid-in');
  var L = {
    under: face('bx-lid-under'), rb: face('bx-rim bx-l3'), rl: face('bx-rim bx-l2'), rr: face('bx-rim bx-l2'),
    rf: face('bx-rim bx-l1'), top: face('bx-lid-top', '<i>?</i>')
  };
  for (k in L) lidIn.appendChild(L[k]);
  lid.appendChild(lidIn); box.appendChild(lid);

  // toys get fake extrusion: stacked darker copies behind the front SVG
  var items = ITEMS.map(function (svg) {
    var d = el('div', 'bx-item'), h = '';
    for (var j = 3; j >= 1; j--) h += '<div class="bx-x" data-z="' + j + '">' + svg + '</div>';
    d.innerHTML = h + '<div class="bx-top">' + svg + '</div>';
    itemsWrap.appendChild(d); return d;
  });
  stage.appendChild(shadow); stage.appendChild(box); stage.appendChild(glow); stage.appendChild(itemsWrap); stage.appendChild(hint); stage.appendChild(caps);
  root.appendChild(stage);

  function place(f, w, h, t) { f.style.width = w + 'px'; f.style.height = h + 'px'; f.style.transform = 'translate(-50%,-50%) ' + t; }

  var s, H, R, T, vw, vh, portrait, bx, by, iw, spots;
  function layout() {
    vw = stage.clientWidth; vh = stage.clientHeight; portrait = vw / vh < 0.9;
    s = Math.round(portrait ? Math.min(vw * 0.42, vh * 0.2, 240) : Math.min(vh * 0.22, vw * 0.19, 220));
    H = Math.round(s * 0.62); R = Math.round(s * 0.2); T = Math.max(4, Math.round(s * 0.05));
    var Wl = Math.round(s * 1.06), h2 = H / 2, d2 = s / 2, l2 = Wl / 2, di = d2 - T;
    bx = 0; by = portrait ? vh * 0.18 : vh * 0.1;
    iw = Math.round(s * (portrait ? 0.56 : 0.66));
    spots = portrait ? PORTRAIT : LANDSCAPE;
    place(F.front, s, H, 'translateZ(' + d2 + 'px)');
    place(F.back, s, H, 'rotateY(180deg) translateZ(' + d2 + 'px)');
    place(F.right, s, H, 'rotateY(90deg) translateZ(' + d2 + 'px)');
    place(F.left, s, H, 'rotateY(-90deg) translateZ(' + d2 + 'px)');
    place(F.bottom, s, s, 'rotateX(-90deg) translateZ(' + h2 + 'px)');
    // inner walls (wall thickness T), facing inward
    place(F.iFront, s - 2 * T, H - T, 'translateY(' + T / 2 + 'px) translateZ(' + di + 'px)');
    place(F.iBack, s - 2 * T, H - T, 'translateY(' + T / 2 + 'px) rotateY(180deg) translateZ(' + di + 'px)');
    place(F.iRight, s - 2 * T, H - T, 'translateY(' + T / 2 + 'px) rotateY(90deg) translateZ(' + di + 'px)');
    place(F.iLeft, s - 2 * T, H - T, 'translateY(' + T / 2 + 'px) rotateY(-90deg) translateZ(' + di + 'px)');
    // top edges of the walls
    var e = 'translateY(' + (-h2) + 'px) ';
    place(F.tFront, s, T, e + 'translateZ(' + (d2 - T / 2) + 'px) rotateX(90deg)');
    place(F.tBack, s, T, e + 'rotateY(180deg) translateZ(' + (d2 - T / 2) + 'px) rotateX(90deg)');
    place(F.tRight, s, T, e + 'rotateY(90deg) translateZ(' + (d2 - T / 2) + 'px) rotateX(90deg)');
    place(F.tLeft, s, T, e + 'rotateY(-90deg) translateZ(' + (d2 - T / 2) + 'px) rotateX(90deg)');
    place(F.floor, s - 2 * T, s - 2 * T, 'rotateX(90deg) translateZ(' + (-h2 + T) + 'px)');
    lid.style.transformOrigin = '0 0';
    lidIn.style.transform = 'translateY(' + (-R) + 'px) translateZ(' + l2 + 'px)';
    place(L.top, Wl, Wl, 'rotateX(90deg)');
    place(L.under, Wl - 2, Wl - 2, 'translateY(' + T + 'px) rotateX(-90deg)');
    place(L.rf, Wl, R, 'translateY(' + R / 2 + 'px) translateZ(' + l2 + 'px)');
    place(L.rb, Wl, R, 'translateY(' + R / 2 + 'px) rotateY(180deg) translateZ(' + l2 + 'px)');
    place(L.rr, Wl, R, 'translateY(' + R / 2 + 'px) rotateY(90deg) translateZ(' + l2 + 'px)');
    place(L.rl, Wl, R, 'translateY(' + R / 2 + 'px) rotateY(-90deg) translateZ(' + l2 + 'px)');
    box.style.setProperty('--bx-fs', Math.max(10, s * 0.11) + 'px');
    box.style.setProperty('--bx-q', Math.round(s * 0.24) + 'px');
    box.style.setProperty('--bx-s', s + 'px');
    shadow.style.width = s * 2.1 + 'px'; shadow.style.height = s * 0.6 + 'px';
    glow.style.width = s * 2.4 + 'px'; glow.style.height = s * 1.6 + 'px';
    var dz = Math.max(1.5, iw * 0.022);
    items.forEach(function (it) {
      it.style.width = iw + 'px'; it.style.marginLeft = -iw / 2 + 'px'; it.style.marginTop = -iw / 2 + 'px';
      [].forEach.call(it.querySelectorAll('.bx-x'), function (x) { x.style.transform = 'translateZ(' + (-x.getAttribute('data-z') * dz) + 'px)'; });
    });
  }

  function clamp(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function seg(p, a, b) { return clamp((p - a) / (b - a)); }
  function eOut(t) { return 1 - Math.pow(1 - t, 3); }
  function eInOut(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function eBack(t) { var c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }

  var shown = RM ? 1 : 0, visible = true, capIdx = -1, px = 0, py = 0, tx = 0, ty = 0;

  function render(p, tm) {
    var hop = Math.sin(seg(p, 0.03, 0.12) * Math.PI) * s * 0.08;
    var ry = -38 + eInOut(p) * 22 + px * 10, rx = -30 + eInOut(p) * 4 - py * 6;
    box.style.transform = 'translate3d(' + bx + 'px,' + (by - hop) + 'px,0) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    var lift = hop / s;
    shadow.style.transform = 'translate(-50%,-50%) translate(' + bx + 'px,' + (by + H * 0.66) + 'px) scale(' + (1 - lift * 1.5) + ')';
    shadow.style.opacity = 1 - lift * 3;
    var lo = seg(p, 0.1, 0.3);
    lid.style.transform = 'translate3d(0,' + (-H / 2 + R - 1 - eOut(lo) * 3) + 'px,' + (-Math.round(s * 1.06) / 2) + 'px) rotateX(' + (118 * eBack(lo)) + 'deg)';
    var g = eOut(seg(p, 0.14, 0.32));
    box.style.setProperty('--bx-glow', g.toFixed(3));
    glow.style.opacity = (g * 0.8).toFixed(3);
    glow.style.transform = 'translate(-50%,-50%) translate(' + bx + 'px,' + (by - H * 0.55) + 'px)';
    itemsWrap.style.transform = 'rotateY(' + (px * 8) + 'deg) rotateX(' + (-py * 5) + 'deg)';
    var ox = bx, oy = by - H * 0.4;
    for (var i = 0; i < items.length; i++) {
      var t = seg(p, 0.26 + i * 0.06, 0.26 + i * 0.06 + 0.22), it = items[i];
      if (t <= 0) { it.style.opacity = 0; it.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(.2)'; continue; }
      var sp = spots[i], X = ox + sp[0] * s, Y = by + sp[1] * s;
      var e = eOut(t), u = 1 - e;
      var cx = ox + (X - ox) * 0.25, cy = Math.min(oy, Y) - s * 0.9;
      var x = u * u * ox + 2 * u * e * cx + e * e * X, y = u * u * oy + 2 * u * e * cy + e * e * Y;
      var rot = sp[2] + SPIN[i] * (1 - e) * 0.6, sc = 0.25 + 0.75 * eBack(t);
      var yr = (1 - e) * (i % 2 ? 300 : -300) + (sp[0] < 0 ? 16 : -16);
      if (t >= 1 && !RM) { y += Math.sin(tm * 1.6 + i * 1.3) * s * 0.03; rot += Math.sin(tm * 1.1 + i) * 2; yr += Math.sin(tm * 0.9 + i * 2) * 10; }
      it.style.opacity = Math.min(1, t * 6);
      it.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,' + (40 * e).toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) rotateY(' + yr.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
    }
    var ci = p < 0.22 ? 0 : p < 0.62 ? 1 : 2;
    if (ci !== capIdx) { capEls.forEach(function (c, j) { c.classList.toggle('on', j === ci); }); capIdx = ci; }
    hint.style.visibility = p < 0.04 ? "visible" : "hidden";
  }

  function progress() {
    var r = root.getBoundingClientRect(), total = r.height - stage.clientHeight;
    return total > 0 ? clamp(-r.top / total) : 1;
  }

  var last = 0, running = false;
  function loop(ts) {
    if (!visible) { running = false; return; }
    var target = progress(), k = Math.min(1, (ts - last) / 1000 * 9 || 0.15);
    shown += (target - shown) * k; last = ts;
    if (Math.abs(target - shown) < 0.0005) shown = target;
    px += (tx - px) * k * 0.6; py += (ty - py) * k * 0.6;
    render(shown, ts / 1000);
    requestAnimationFrame(loop);
  }
  function start() { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } }

  layout();
  if (RM) { render(1, 0); window.addEventListener('resize', function () { layout(); render(1, 0); }); return; }
  shown = progress(); render(shown, 0);
  window.addEventListener('resize', layout);
  window.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') { tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; } }, { passive: true });
  window.addEventListener('deviceorientation', function (e) { if (e.gamma != null) { tx = Math.max(-1, Math.min(1, e.gamma / 30)); ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); } }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(root);
  }
  start();
})();
