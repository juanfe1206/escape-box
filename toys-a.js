/* Escape Box toys (set A): rocket, chest, decoder, envelope, puzzle. Pure CSS 3D. */
(function(){ window.EBToys = window.EBToys || {};
  var E = window.EBToys, M = Math, PI = M.PI,
    NAVY='#232A36', RED='#D64933', MUS='#E8B04B', TEAL='#2F7F86', CREAM='#F6EFE3', INK='#1F2430', KRAFT='#C89B6D';

  if (!document.getElementById('ebtoys-a')) {
    var st = document.createElement('style'); st.id = 'ebtoys-a';
    st.textContent = '.tya-r,.tya-g{position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d}' +
      '.tya-f{position:absolute;left:0;top:0;box-sizing:border-box;border:.8px solid rgba(31,36,48,.32)}' +
      '.tya-w{background-image:repeating-linear-gradient(0deg,rgba(80,50,20,.16) 0 1px,transparent 1px 8px)}' +
      '.tya-t{display:flex;align-items:center;justify-content:center;font:700 9px/1 "Courier New",monospace;letter-spacing:.08em;white-space:nowrap}';
    (document.head || document.documentElement).appendChild(st);
  }

  /* colour shade: f>0 toward white, f<0 toward black */
  function sh(c, f) {
    var n = parseInt(c.slice(1), 16), v = [n >> 16, n >> 8 & 255, n & 255], t = f > 0 ? 255 : 0, k = M.abs(f);
    return 'rgb(' + v.map(function (x) { return M.round(x + (t - x) * k); }).join(',') + ')';
  }
  /* light from above-front: x = side, u = up, z = front */
  function lt(x, u, z) { return .22 * u - .13 * M.abs(x) + .04 * z; }
  function ex(o, w) { return o ? (w ? o.k || 0 : o.f || 0) : 0; }
  function T(x, y, z) { return 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) '; }
  function G(p, tf) { var g = document.createElement('div'); g.className = 'tya-g'; g.style.transform = tf || ''; p.appendChild(g); return g; }
  function F(p, w, h, tf, bg, o) {
    var d = document.createElement('div'), s = d.style;
    d.className = 'tya-f' + (o && o.c ? ' ' + o.c : '');
    s.width = w + 'px'; s.height = h + 'px'; s.marginLeft = -w / 2 + 'px'; s.marginTop = -h / 2 + 'px';
    s.transform = tf; s.backgroundColor = bg;
    if (o) { if (o.t) d.textContent = o.t; if (o.s) s.cssText += ';' + o.s; }
    p.appendChild(d); return d;
  }
  /* cuboid */
  function B(p, w, h, d, x, y, z, c, rot, o) {
    var g = G(p, T(x, y, z) + (rot || ''));
    [[w, h, '', 0, 0, 1, d], [w, h, 'rotateY(180deg)', 0, 0, -1, d], [d, h, 'rotateY(90deg)', 1, 0, 0, w],
     [d, h, 'rotateY(-90deg)', -1, 0, 0, w], [w, d, 'rotateX(90deg)', 0, 1, 0, h], [w, d, 'rotateX(-90deg)', 0, -1, 0, h]]
      .forEach(function (q) { F(g, q[0], q[1], q[2] + ' translateZ(' + q[6] / 2 + 'px)', sh(c, lt(q[3], q[4], q[5]) + ex(o, !q[5])), o); });
    return g;
  }
  function poly(n, half) {
    var pts = [], i, a;
    for (i = 0; i <= (half ? n : n - 1); i++) {
      a = half ? -PI / 2 + i * PI / n : (i + .5) * 2 * PI / n;
      pts.push((50 + 50 * M.sin(a)).toFixed(1) + '% ' + (half ? 50 - 50 * M.cos(a) : 50 + 50 * M.cos(a)).toFixed(1) + '%');
    }
    return 'clip-path:polygon(' + pts.join(',') + ');border:0';
  }
  /* prism / cylinder along Y: apothem a, height h, n (even) sides */
  function C(p, a, h, n, x, y, z, c, rot, cap, zx) {
    var g = G(p, T(x, y, z) + (rot || '')), w = 2 * a * M.tan(PI / n) + .8, i, t, r = a / M.cos(PI / n) + .3;
    for (i = 0; i < n; i++) { t = i * 2 * PI / n; F(g, w, h, 'rotateY(' + t + 'rad) translateZ(' + a + 'px)', sh(c, (zx ? lt(M.sin(t), M.cos(t), 0) : lt(M.sin(t), 0, M.cos(t))) + ex(zx, 1)), zx); }
    if (cap !== 0) {
      F(g, 2 * r, 2 * r, 'rotateX(90deg) translateZ(' + h / 2 + 'px)', sh(cap || c, (zx ? lt(0, 0, -1) : lt(0, 1, 0)) + ex(zx, 0)), { s: poly(n) });
      F(g, 2 * r, 2 * r, 'rotateX(-90deg) translateZ(' + h / 2 + 'px)', sh(cap || c, (zx ? lt(0, 0, 1) : lt(0, -1, 0)) + ex(zx, 0)), { s: poly(n) });
    }
    return g;
  }
  /* cone, apex up (-y), base at +h/2 */
  function K(p, a, h, n, x, y, z, c, rot) {
    var g = G(p, T(x, y, z) + (rot || '')), w = 2 * a * M.tan(PI / n) + .8, L = M.sqrt(h * h + a * a) + .6, ph = M.atan2(a, h), i, t;
    for (i = 0; i < n; i++) {
      t = i * 2 * PI / n;
      F(g, w, L, 'rotateY(' + t + 'rad) translateZ(' + a / 2 + 'px) rotateX(' + ph + 'rad)',
        sh(c, lt(M.sin(t) * M.cos(ph), M.sin(ph), M.cos(t) * M.cos(ph))), { s: 'clip-path:polygon(50% 0,100% 100%,0 100%);border:0' });
    }
    return g;
  }
  /* half-round arch along X (chest lid): width w, apothem r, n segments, flat side at y */
  function A(p, w, r, n, x, y, z, c, o) {
    var g = G(p, T(x, y, z)), s = 2 * r * M.tan(PI / (2 * n)) + .8, R2 = 2 * (r / M.cos(PI / (2 * n))), i, f;
    for (i = 0; i < n; i++) {
      f = -PI / 2 + (i + .5) * PI / n;
      F(g, w, s, 'rotateX(' + f + 'rad) rotateX(90deg) translateZ(' + r + 'px)', sh(c, lt(0, M.cos(f), -M.sin(f))), o);
    }
    F(g, R2, R2, 'rotateY(90deg) translateZ(' + w / 2 + 'px)', sh(c, lt(1, 0, 0)), { s: poly(n, 1) });
    F(g, R2, R2, 'rotateY(-90deg) translateZ(' + w / 2 + 'px)', sh(c, lt(-1, 0, 0)), { s: poly(n, 1) });
    return g;
  }
  function R(size) {
    var r = document.createElement('div'); r.className = 'tya-r';
    var k = (size || 100) / 100;
    return [r, G(r, 'scale3d(' + k + ',' + k + ',' + k + ')')];
  }

  E.rocket = function (size) {
    var o = R(size), g = o[1], k;
    C(g, 17, 46, 10, 0, 4, 0, CREAM);
    K(g, 17, 28, 10, 0, -33, 0, RED);
    C(g, 18, 6, 10, 0, -16, 0, RED, '', 0);
    C(g, 18, 5, 10, 0, 18, 0, TEAL, '', 0);
    F(g, 13, 13, T(0, -3, 17.4), TEAL, { s: 'border-radius:50%;border:2.5px solid ' + NAVY + ';box-shadow:inset 3px 3px 0 rgba(255,255,255,.35)' });
    for (k = 0; k < 4; k++) B(G(g, 'rotateY(' + (45 + 90 * k) + 'deg)'), 3.5, 22, 15, 0, 19, 23, RED);
    C(g, 11, 7, 8, 0, 30.5, 0, NAVY);
    K(g, 8, 14, 8, 0, 41, 0, MUS, 'rotateX(180deg)');
    return o[0];
  };

  E.chest = function (size) {
    var o = R(size), g = o[1], W = { c: 'tya-w' }, s;
    B(g, 72, 32, 46, 0, 14, 0, KRAFT, '', W);
    B(g, 72, 8, 47.6, 0, -6, 0, KRAFT, '', W);
    A(g, 72, 23, 6, 0, -10, 0, KRAFT, W);
    B(g, 75, 4, 49, 0, 29, 0, '#9C7148');
    for (s = -1; s < 2; s += 2) {
      B(g, 7, 30, 47.4, 24 * s, 13, 0, MUS);
      B(g, 7, 8.4, 49.2, 24 * s, -6, 0, MUS);
      A(g, 7, 24, 6, 24 * s, -10, 0, MUS);
    }
    B(g, 13, 15, 4, 0, -2, 25, MUS);
    F(g, 4, 7, T(0, -1, 27.1), INK, { s: 'border-radius:2px 2px 1px 1px;border:0' });
    return o[0];
  };

  E.decoder = function (size) {
    var o = R(size), g = o[1], L = 'ABCDEFGHIJKL', i, a, X = 'rotateX(90deg)';
    C(g, 42, 13, 10, 0, 0, -7, CREAM, X, '', { k: -.2 });
    C(g, 28, 10, 10, 0, 0, 4.5, MUS, X, '', { k: -.22, f: .04 });
    C(g, 4, 7, 8, 0, 0, 12.5, RED, X);
    B(g, 4, 22, 2, 0, -14, 10.6, RED);
    for (i = 0; i < 12; i++) {
      a = i * 30;
      F(g, 9, 9, 'rotateZ(' + a + 'deg) ' + T(0, -35, -.1), 'transparent', { c: 'tya-t', t: L[i], s: 'color:' + INK + ';border:0;font-size:8px' });
      F(g, 1.6, 6, 'rotateZ(' + (a + 15) + 'deg) ' + T(0, -36, -.1), NAVY, { s: 'border:0' });
      F(g, 1.6, 7, 'rotateZ(' + a + 'deg) ' + T(0, -36, -13.9), NAVY, { s: 'border:0' });
    }
    for (i = 0; i < 8; i++) F(g, 7, 7, 'rotateZ(' + (i * 45 + 22.5) + 'deg) ' + T(0, -21, 9.9), 'transparent', { c: 'tya-t', t: '' + (i + 1), s: 'color:' + INK + ';border:0;font-size:7px' });
    F(g, 40, 10, T(0, 0, -13.9) + 'rotateY(180deg)', 'transparent', { c: 'tya-t', t: 'CIPHER', s: 'color:' + RED + ';border:2px solid ' + RED + ';font-size:8px;border-radius:2px' });
    return o[0];
  };

  E.envelope = function (size) {
    var o = R(size), g = o[1], z = 4.2;
    B(g, 84, 56, 8, 0, 0, 0, CREAM);
    F(g, 46, 17, T(0, 6, z) + 'rotateZ(-8deg)', 'transparent', { c: 'tya-t', t: 'WEEK 1', s: 'color:' + RED + ';border:3px double ' + RED + ';font-size:11px;border-radius:3px' });
    F(g, 40, 8, T(-16, -17, z), 'transparent', { c: 'tya-t', t: 'MISSION', s: 'color:' + INK + ';font-size:6px;border:0' });
    F(g, 14, 16, T(32, -18, z), TEAL, { s: 'border:2px dotted ' + CREAM + ';outline:1px solid ' + TEAL });
    F(g, 84, 34, T(0, -11, -z) + 'rotateY(180deg)', sh(CREAM, -.1), { s: 'clip-path:polygon(0 0,100% 0,50% 100%);border:0' });
    F(g, 84, 28, T(0, 14, -z) + 'rotateY(180deg)', sh(CREAM, -.05), { s: 'clip-path:polygon(0 100%,50% 0,100% 100%);border:0' });
    C(g, 8, 3, 10, 0, 6, -5.6, RED, 'rotateX(90deg)');
    return o[0];
  };

  E.puzzle = function (size) {
    var o = R(size), g = o[1], P = MUS, X = 'rotateX(90deg)', N = { s: 'border:0', k: -.17, f: .07 };
    B(g, 50, 50, 26, 0, 5, 0, P, '', N);
    B(g, 12, 12, 25.6, 28, 5, 0, P, '', N);
    C(g, 10.5, 25.6, 12, 35, 5, 0, P, X, '', N);
    B(g, 12, 12, 25.6, -28, 5, 0, P, '', N);
    C(g, 10.5, 25.6, 12, -35, 5, 0, P, X, '', N);
    B(g, 12, 12, 25.6, 0, -23, 0, P, '', N);
    C(g, 10.5, 25.6, 12, 0, -30, 0, P, X, '', N);
    return o[0];
  };
})();
