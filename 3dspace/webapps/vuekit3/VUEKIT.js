import { openBlock as l, createElementBlock as r, normalizeClass as k, resolveComponent as $, resolveDirective as _e, withDirectives as H, createCommentVNode as f, renderSlot as C, createTextVNode as X, toDisplayString as w, createBlock as S, mergeProps as J, toHandlers as lt, ref as x, readonly as En, watch as le, getCurrentScope as fo, onScopeDispose as po, unref as K, toRef as mo, customRef as vo, onMounted as Ot, nextTick as Gt, getCurrentInstance as Ws, shallowRef as qs, computed as Y, defineComponent as Ae, watchEffect as jt, createVNode as T, Transition as It, withCtx as V, createElementVNode as b, Fragment as M, withModifiers as re, Teleport as Nn, normalizeStyle as G, vShow as Me, renderList as U, pushScopeId as et, popScopeId as tt, createStaticVNode as go, inject as xe, resolveDynamicComponent as Wt, shallowReactive as mt, markRaw as Rn, reactive as pt, isRef as bo, h as Ue, vModelSelect as Ss, vModelText as yo, normalizeProps as Ke, guardReactiveProps as Xe, withKeys as Ct, mergeModels as Bt, useModel as sn, TransitionGroup as _o, useSlots as wo, onBeforeMount as ko, createSlots as Ks, vModelRadio as Is, toValue as wn, onUnmounted as So, render as Hn } from "vue";
const Tt = {
  props: {
    color: {
      type: String,
      default: () => "default"
    }
  }
}, $e = {
  props: {
    disabled: {
      type: Boolean,
      default: () => !1
    }
  }
}, F = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [i, o] of n)
    t[i] = o;
  return t;
}, Io = {
  name: "vu-divider",
  props: {
    vertical: {
      type: Boolean
    }
  }
};
function Co(e, n, t, i, o, s) {
  return l(), r("hr", {
    class: k(["vu-divider", { vertical: t.vertical }])
  }, null, 2);
}
const Gs = /* @__PURE__ */ F(Io, [["render", Co], ["__scopeId", "data-v-35db60fe"]]), Bo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gs
}, Symbol.toStringTag, { value: "Module" })), $o = {
  name: "vu-badge",
  mixins: [Tt, $e],
  emits: ["close", "selected", "update:modelValue"],
  components: { VuDivider: Gs },
  props: {
    value: {
      type: Boolean,
      default: () => {
      }
    },
    text: {
      type: String,
      default: () => ""
    },
    rounded: {
      type: Boolean
    },
    alternate: {
      type: Boolean
    },
    badge2: {
      type: String,
      default: () => ""
    },
    badge3: {
      type: String,
      default: () => ""
    },
    icon: {
      type: String,
      default: () => ""
    },
    selectable: {
      type: Boolean,
      default: () => !1
    },
    selected: {
      type: Boolean,
      default: () => !1
    },
    togglable: {
      type: Boolean,
      default: () => !0
    },
    closable: {
      type: Boolean,
      default: () => !1
    }
  },
  data() {
    return {
      isSelected: !1
    };
  },
  computed: {
    classes() {
      return [
        "vu-badge",
        `badge-root badge badge-${this.color}`,
        {
          "badge-alternate": this.alternate,
          rounded: this.rounded,
          "badge-closable": this.closable,
          "badge-selectable": this.selectable,
          disabled: this.disabled,
          "badge-selected": this.isSelected || this.selected || this.value,
          "badge-icon": this.icon
        }
      ];
    },
    iconClasses() {
      return `fonticon fonticon-${this.icon} badge-icon`;
    },
    showContent() {
      return typeof this.$slots.default == "function" || this.text;
    }
  },
  methods: {
    onClickOutside() {
      this.selectable && this.value === void 0 && this.togglable && (this.isSelected = !1);
    },
    selectBadge() {
      this.selectable && (this.value === void 0 && (this.isSelected = this.togglable ? !this.isSelected : !0), this.$emit("selected", this.isSelected), this.$emit("update:modelValue", this.isSelected));
    }
  }
}, Oo = {
  key: 1,
  class: "badge-content"
}, To = {
  key: 5,
  class: "badge-content"
};
function xo(e, n, t, i, o, s) {
  const a = $("VuDivider"), u = _e("click-outside");
  return H((l(), r("span", {
    class: k(s.classes),
    onClick: n[1] || (n[1] = (c) => s.selectBadge(c))
  }, [
    t.icon ? (l(), r("span", {
      key: 0,
      class: k(s.iconClasses)
    }, null, 2)) : f("", !0),
    s.showContent ? (l(), r("span", Oo, [
      C(e.$slots, "default", {}, () => [
        X(w(t.text), 1)
      ], !0)
    ])) : f("", !0),
    t.badge2 ? (l(), S(a, {
      key: 2,
      vertical: ""
    })) : f("", !0),
    t.badge2 ? (l(), r("span", {
      key: 3,
      class: k(["badge-content", { "badge-center": t.badge3 }])
    }, w(t.badge2), 3)) : f("", !0),
    t.badge3 ? (l(), S(a, {
      key: 4,
      vertical: ""
    })) : f("", !0),
    t.badge3 ? (l(), r("span", To, w(t.badge3), 1)) : f("", !0),
    t.closable ? (l(), r("span", {
      key: 6,
      class: "fonticon fonticon-cancel",
      onClick: n[0] || (n[0] = (c) => e.$emit("close"))
    })) : f("", !0)
  ], 2)), [
    [u, s.onClickOutside]
  ]);
}
const jn = /* @__PURE__ */ F($o, [["render", xo], ["__scopeId", "data-v-d0431d52"]]), Mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jn
}, Symbol.toStringTag, { value: "Module" })), Ys = {
  props: {
    size: {
      type: String,
      default: () => ""
    }
  }
}, Vo = /^on[^a-z]/, Po = (e) => Vo.test(e), Ze = (e, n) => {
  const t = {};
  for (const i in e)
    Po(i) && (t[n ? i[2].toLowerCase() + i.slice(3) : i] = e[i]);
  return t;
}, Lo = {
  name: "vu-icon",
  mixins: [Tt, Ys],
  data: () => ({
    getListenersFromAttrs: Ze
  }),
  props: {
    icon: {
      required: !0,
      type: String
    },
    withinText: {
      default: !0,
      type: Boolean
    }
  }
};
function Do(e, n, t, i, o, s) {
  return l(), r("span", J({
    class: ["vu-icon fonticon", [t.withinText ? "fonticon-within-text" : "", `fonticon-${t.icon}`, `${e.color}`, `${e.size}`]]
  }, lt(e.getListenersFromAttrs(e.$attrs), !0)), null, 16);
}
const ue = /* @__PURE__ */ F(Lo, [["render", Do], ["__scopeId", "data-v-887cd079"]]), Ao = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue
}, Symbol.toStringTag, { value: "Module" }));
function Fo(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Xs = { exports: {} }, ge = Xs.exports = {}, We, qe;
function $n() {
  throw new Error("setTimeout has not been defined");
}
function On() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? We = setTimeout : We = $n;
  } catch {
    We = $n;
  }
  try {
    typeof clearTimeout == "function" ? qe = clearTimeout : qe = On;
  } catch {
    qe = On;
  }
})();
function Js(e) {
  if (We === setTimeout)
    return setTimeout(e, 0);
  if ((We === $n || !We) && setTimeout)
    return We = setTimeout, setTimeout(e, 0);
  try {
    return We(e, 0);
  } catch {
    try {
      return We.call(null, e, 0);
    } catch {
      return We.call(this, e, 0);
    }
  }
}
function zo(e) {
  if (qe === clearTimeout)
    return clearTimeout(e);
  if ((qe === On || !qe) && clearTimeout)
    return qe = clearTimeout, clearTimeout(e);
  try {
    return qe(e);
  } catch {
    try {
      return qe.call(null, e);
    } catch {
      return qe.call(this, e);
    }
  }
}
var Je = [], St = !1, ht, nn = -1;
function Eo() {
  !St || !ht || (St = !1, ht.length ? Je = ht.concat(Je) : nn = -1, Je.length && Zs());
}
function Zs() {
  if (!St) {
    var e = Js(Eo);
    St = !0;
    for (var n = Je.length; n; ) {
      for (ht = Je, Je = []; ++nn < n; )
        ht && ht[nn].run();
      nn = -1, n = Je.length;
    }
    ht = null, St = !1, zo(e);
  }
}
ge.nextTick = function(e) {
  var n = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var t = 1; t < arguments.length; t++)
      n[t - 1] = arguments[t];
  Je.push(new Qs(e, n)), Je.length === 1 && !St && Js(Zs);
};
function Qs(e, n) {
  this.fun = e, this.array = n;
}
Qs.prototype.run = function() {
  this.fun.apply(null, this.array);
};
ge.title = "browser";
ge.browser = !0;
ge.env = {};
ge.argv = [];
ge.version = "";
ge.versions = {};
function nt() {
}
ge.on = nt;
ge.addListener = nt;
ge.once = nt;
ge.off = nt;
ge.removeListener = nt;
ge.removeAllListeners = nt;
ge.emit = nt;
ge.prependListener = nt;
ge.prependOnceListener = nt;
ge.listeners = function(e) {
  return [];
};
ge.binding = function(e) {
  throw new Error("process.binding is not supported");
};
ge.cwd = function() {
  return "/";
};
ge.chdir = function(e) {
  throw new Error("process.chdir is not supported");
};
ge.umask = function() {
  return 0;
};
var No = Xs.exports;
const Ro = /* @__PURE__ */ Fo(No);
function at(e) {
  return fo() ? (po(e), !0) : !1;
}
function Ho(e, n) {
  if (typeof Symbol < "u") {
    const t = { ...e };
    return Object.defineProperty(t, Symbol.iterator, {
      enumerable: !1,
      value() {
        let i = 0;
        return {
          next: () => ({
            value: n[i++],
            done: i > n.length
          })
        };
      }
    }), t;
  } else
    return Object.assign([...n], e);
}
function ie(e) {
  return typeof e == "function" ? e() : K(e);
}
const un = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const jo = Object.prototype.toString, ei = (e) => jo.call(e) === "[object Object]", Uo = () => +Date.now(), Be = () => {
}, qt = /* @__PURE__ */ Wo();
function Wo() {
  var e, n;
  return un && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((n = window == null ? void 0 : window.navigator) == null ? void 0 : n.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Un(e, n) {
  function t(...i) {
    return new Promise((o, s) => {
      Promise.resolve(e(() => n.apply(this, i), { fn: n, thisArg: this, args: i })).then(o).catch(s);
    });
  }
  return t;
}
const qo = (e) => e();
function Ko(e, n = {}) {
  let t, i, o = Be;
  const s = (u) => {
    clearTimeout(u), o(), o = Be;
  };
  return (u) => {
    const c = ie(e), d = ie(n.maxWait);
    return t && s(t), c <= 0 || d !== void 0 && d <= 0 ? (i && (s(i), i = null), Promise.resolve(u())) : new Promise((h, p) => {
      o = n.rejectOnCancel ? p : h, d && !i && (i = setTimeout(() => {
        t && s(t), i = null, h(u());
      }, d)), t = setTimeout(() => {
        i && s(i), i = null, h(u());
      }, c);
    });
  };
}
function ti(e, n = !0, t = !0, i = !1) {
  let o = 0, s, a = !0, u = Be, c;
  const d = () => {
    s && (clearTimeout(s), s = void 0, u(), u = Be);
  };
  return (p) => {
    const _ = ie(e), v = Date.now() - o, y = () => c = p();
    return d(), _ <= 0 ? (o = Date.now(), y()) : (v > _ && (t || !a) ? (o = Date.now(), y()) : n && (c = new Promise((L, B) => {
      u = i ? B : L, s = setTimeout(() => {
        o = Date.now(), a = !0, L(y()), d();
      }, Math.max(0, _ - v));
    })), !t && !s && (s = setTimeout(() => a = !0, _)), a = !1, c);
  };
}
const Go = {
  mounted: "mounted",
  updated: "updated",
  unmounted: "unmounted"
};
function Yo(e) {
  const n = /* @__PURE__ */ Object.create(null);
  return (t) => n[t] || (n[t] = e(t));
}
const Xo = /-(\w)/g, Jo = Yo((e) => e.replace(Xo, (n, t) => t ? t.toUpperCase() : ""));
function Zo(e) {
  return e || Ws();
}
function Wn(...e) {
  if (e.length !== 1)
    return mo(...e);
  const n = e[0];
  return typeof n == "function" ? En(vo(() => ({ get: n, set: Be }))) : x(n);
}
function Tn(e, n = 200, t = {}) {
  return Un(
    Ko(n, t),
    e
  );
}
function Qo(e, n = 200, t = !1, i = !0, o = !1) {
  return Un(
    ti(n, t, i, o),
    e
  );
}
function el(e, n, t = {}) {
  const {
    eventFilter: i = qo,
    ...o
  } = t;
  return le(
    e,
    Un(
      i,
      n
    ),
    o
  );
}
function dn(e, n = !0, t) {
  Zo() ? Ot(e, t) : n ? e() : Gt(e);
}
function tl(e, n = {}) {
  var t;
  const i = x((t = n.initialValue) != null ? t : null);
  return le(
    e,
    () => i.value = Uo(),
    n
  ), i;
}
function nl(e, n, t = {}) {
  const {
    immediate: i = !0
  } = t, o = x(!1);
  let s = null;
  function a() {
    s && (clearTimeout(s), s = null);
  }
  function u() {
    o.value = !1, a();
  }
  function c(...d) {
    a(), o.value = !0, s = setTimeout(() => {
      o.value = !1, s = null, e(...d);
    }, ie(n));
  }
  return i && (o.value = !0, un && c()), at(u), {
    isPending: En(o),
    start: c,
    stop: u
  };
}
function xn(e, n, t = {}) {
  const {
    throttle: i = 0,
    trailing: o = !0,
    leading: s = !0,
    ...a
  } = t;
  return el(
    e,
    n,
    {
      ...a,
      eventFilter: ti(i, o, s)
    }
  );
}
function Mn(e, n, t) {
  return le(
    e,
    (i, o, s) => {
      i && n(i, o, s);
    },
    t
  );
}
function on(e = {}) {
  const {
    inheritAttrs: n = !0
  } = e, t = qs(), i = /* @__PURE__ */ Ae({
    setup(s, { slots: a }) {
      return () => {
        t.value = a.default;
      };
    }
  }), o = /* @__PURE__ */ Ae({
    inheritAttrs: n,
    setup(s, { attrs: a, slots: u }) {
      return () => {
        var c;
        if (!t.value && Ro.env.NODE_ENV !== "production")
          throw new Error("[VueUse] Failed to find the definition of reusable template");
        const d = (c = t.value) == null ? void 0 : c.call(t, { ...sl(a), $slots: u });
        return n && (d == null ? void 0 : d.length) === 1 ? d[0] : d;
      };
    }
  });
  return Ho(
    { define: i, reuse: o },
    [i, o]
  );
}
function sl(e) {
  const n = {};
  for (const t in e)
    n[Jo(t)] = e[t];
  return n;
}
function ye(e) {
  var n;
  const t = ie(e);
  return (n = t == null ? void 0 : t.$el) != null ? n : t;
}
const st = un ? window : void 0;
function pe(...e) {
  let n, t, i, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([t, i, o] = e, n = st) : [n, t, i, o] = e, !n)
    return Be;
  Array.isArray(t) || (t = [t]), Array.isArray(i) || (i = [i]);
  const s = [], a = () => {
    s.forEach((h) => h()), s.length = 0;
  }, u = (h, p, _, v) => (h.addEventListener(p, _, v), () => h.removeEventListener(p, _, v)), c = le(
    () => [ye(n), ie(o)],
    ([h, p]) => {
      if (a(), !h)
        return;
      const _ = ei(p) ? { ...p } : p;
      s.push(
        ...t.flatMap((v) => i.map((y) => u(h, v, y, _)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    c(), a();
  };
  return at(d), d;
}
let Cs = !1;
function il(e, n, t = {}) {
  const { window: i = st, ignore: o = [], capture: s = !0, detectIframe: a = !1 } = t;
  if (!i)
    return Be;
  qt && !Cs && (Cs = !0, Array.from(i.document.body.children).forEach((_) => _.addEventListener("click", Be)), i.document.documentElement.addEventListener("click", Be));
  let u = !0;
  const c = (_) => o.some((v) => {
    if (typeof v == "string")
      return Array.from(i.document.querySelectorAll(v)).some((y) => y === _.target || _.composedPath().includes(y));
    {
      const y = ye(v);
      return y && (_.target === y || _.composedPath().includes(y));
    }
  }), h = [
    pe(i, "click", (_) => {
      const v = ye(e);
      if (!(!v || v === _.target || _.composedPath().includes(v))) {
        if (_.detail === 0 && (u = !c(_)), !u) {
          u = !0;
          return;
        }
        n(_);
      }
    }, { passive: !0, capture: s }),
    pe(i, "pointerdown", (_) => {
      const v = ye(e);
      u = !c(_) && !!(v && !_.composedPath().includes(v));
    }, { passive: !0 }),
    a && pe(i, "blur", (_) => {
      setTimeout(() => {
        var v;
        const y = ye(e);
        ((v = i.document.activeElement) == null ? void 0 : v.tagName) === "IFRAME" && !(y != null && y.contains(i.document.activeElement)) && n(_);
      }, 0);
    })
  ].filter(Boolean);
  return () => h.forEach((_) => _());
}
function ol(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (n) => n.key === e : Array.isArray(e) ? (n) => e.includes(n.key) : () => !0;
}
function Vn(...e) {
  let n, t, i = {};
  e.length === 3 ? (n = e[0], t = e[1], i = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (n = !0, t = e[0], i = e[1]) : (n = e[0], t = e[1]) : (n = !0, t = e[0]);
  const {
    target: o = st,
    eventName: s = "keydown",
    passive: a = !1,
    dedupe: u = !1
  } = i, c = ol(n);
  return pe(o, s, (h) => {
    h.repeat && ie(u) || c(h) && t(h);
  }, a);
}
function Bs(e, n, t = {}) {
  return Vn(e, n, { ...t, eventName: "keydown" });
}
function ll() {
  const e = x(!1);
  return Ws() && Ot(() => {
    e.value = !0;
  }), e;
}
function qn(e) {
  const n = ll();
  return Y(() => (n.value, !!e()));
}
function al(e, n = {}) {
  const { window: t = st } = n, i = qn(() => t && "matchMedia" in t && typeof t.matchMedia == "function");
  let o;
  const s = x(!1), a = (d) => {
    s.value = d.matches;
  }, u = () => {
    o && ("removeEventListener" in o ? o.removeEventListener("change", a) : o.removeListener(a));
  }, c = jt(() => {
    i.value && (u(), o = t.matchMedia(ie(e)), "addEventListener" in o ? o.addEventListener("change", a) : o.addListener(a), s.value = o.matches);
  });
  return at(() => {
    c(), u(), o = void 0;
  }), s;
}
function rl(e, n, t = {}) {
  const { window: i = st, ...o } = t;
  let s;
  const a = qn(() => i && "MutationObserver" in i), u = () => {
    s && (s.disconnect(), s = void 0);
  }, c = le(
    () => ye(e),
    (p) => {
      u(), a.value && i && p && (s = new MutationObserver(n), s.observe(p, o));
    },
    { immediate: !0 }
  ), d = () => s == null ? void 0 : s.takeRecords(), h = () => {
    u(), c();
  };
  return at(h), {
    isSupported: a,
    stop: h,
    takeRecords: d
  };
}
function Kn(e, n, t = {}) {
  const { window: i = st, ...o } = t;
  let s;
  const a = qn(() => i && "ResizeObserver" in i), u = () => {
    s && (s.disconnect(), s = void 0);
  }, c = Y(() => Array.isArray(e) ? e.map((p) => ye(p)) : [ye(e)]), d = le(
    c,
    (p) => {
      if (u(), a.value && i) {
        s = new ResizeObserver(n);
        for (const _ of p)
          _ && s.observe(_, o);
      }
    },
    { immediate: !0, flush: "post", deep: !0 }
  ), h = () => {
    u(), d();
  };
  return at(h), {
    isSupported: a,
    stop: h
  };
}
function ln(e, n = {}) {
  const {
    reset: t = !0,
    windowResize: i = !0,
    windowScroll: o = !0,
    immediate: s = !0
  } = n, a = x(0), u = x(0), c = x(0), d = x(0), h = x(0), p = x(0), _ = x(0), v = x(0);
  function y() {
    const L = ye(e);
    if (!L) {
      t && (a.value = 0, u.value = 0, c.value = 0, d.value = 0, h.value = 0, p.value = 0, _.value = 0, v.value = 0);
      return;
    }
    const B = L.getBoundingClientRect();
    a.value = B.height, u.value = B.bottom, c.value = B.left, d.value = B.right, h.value = B.top, p.value = B.width, _.value = B.x, v.value = B.y;
  }
  return Kn(e, y), le(() => ye(e), (L) => !L && y()), rl(e, y, {
    attributeFilter: ["style", "class"]
  }), o && pe("scroll", y, { capture: !0, passive: !0 }), i && pe("resize", y, { passive: !0 }), dn(() => {
    s && y();
  }), {
    height: a,
    bottom: u,
    left: c,
    right: d,
    top: h,
    width: p,
    x: _,
    y: v,
    update: y
  };
}
function ni(e, n = { width: 0, height: 0 }, t = {}) {
  const { window: i = st, box: o = "content-box" } = t, s = Y(() => {
    var p, _;
    return (_ = (p = ye(e)) == null ? void 0 : p.namespaceURI) == null ? void 0 : _.includes("svg");
  }), a = x(n.width), u = x(n.height), { stop: c } = Kn(
    e,
    ([p]) => {
      const _ = o === "border-box" ? p.borderBoxSize : o === "content-box" ? p.contentBoxSize : p.devicePixelContentBoxSize;
      if (i && s.value) {
        const v = ye(e);
        if (v) {
          const y = i.getComputedStyle(v);
          a.value = Number.parseFloat(y.width), u.value = Number.parseFloat(y.height);
        }
      } else if (_) {
        const v = Array.isArray(_) ? _ : [_];
        a.value = v.reduce((y, { inlineSize: L }) => y + L, 0), u.value = v.reduce((y, { blockSize: L }) => y + L, 0);
      } else
        a.value = p.contentRect.width, u.value = p.contentRect.height;
    },
    t
  );
  dn(() => {
    const p = ye(e);
    p && (a.value = "offsetWidth" in p ? p.offsetWidth : n.width, u.value = "offsetHeight" in p ? p.offsetHeight : n.height);
  });
  const d = le(
    () => ye(e),
    (p) => {
      a.value = p ? n.width : 0, u.value = p ? n.height : 0;
    }
  );
  function h() {
    c(), d();
  }
  return {
    width: a,
    height: u,
    stop: h
  };
}
function kn(e) {
  return typeof Window < "u" && e instanceof Window ? e.document.documentElement : typeof Document < "u" && e instanceof Document ? e.documentElement : e;
}
const ul = {
  page: (e) => [e.pageX, e.pageY],
  client: (e) => [e.clientX, e.clientY],
  screen: (e) => [e.screenX, e.screenY],
  movement: (e) => e instanceof Touch ? null : [e.movementX, e.movementY]
};
function si(e = {}) {
  const {
    type: n = "page",
    touch: t = !0,
    resetOnTouchEnds: i = !1,
    initialValue: o = { x: 0, y: 0 },
    window: s = st,
    target: a = s,
    scroll: u = !0,
    eventFilter: c
  } = e;
  let d = null;
  const h = x(o.x), p = x(o.y), _ = x(null), v = typeof n == "function" ? n : ul[n], y = (D) => {
    const P = v(D);
    d = D, P && ([h.value, p.value] = P, _.value = "mouse");
  }, L = (D) => {
    if (D.touches.length > 0) {
      const P = v(D.touches[0]);
      P && ([h.value, p.value] = P, _.value = "touch");
    }
  }, B = () => {
    if (!d || !s)
      return;
    const D = v(d);
    d instanceof MouseEvent && D && (h.value = D[0] + s.scrollX, p.value = D[1] + s.scrollY);
  }, R = () => {
    h.value = o.x, p.value = o.y;
  }, ee = c ? (D) => c(() => y(D), {}) : (D) => y(D), ce = c ? (D) => c(() => L(D), {}) : (D) => L(D), Z = c ? () => c(() => B(), {}) : () => B();
  if (a) {
    const D = { passive: !0 };
    pe(a, ["mousemove", "dragover"], ee, D), t && n !== "movement" && (pe(a, ["touchstart", "touchmove"], ce, D), i && pe(a, "touchend", R, D)), u && n === "page" && pe(s, "scroll", Z, { passive: !0 });
  }
  return {
    x: h,
    y: p,
    sourceType: _
  };
}
function dl(e, n) {
  const t = qs(n);
  return le(
    Wn(e),
    (i, o) => {
      t.value = o;
    },
    { flush: "sync" }
  ), En(t);
}
function ii(e) {
  const n = window.getComputedStyle(e);
  if (n.overflowX === "scroll" || n.overflowY === "scroll" || n.overflowX === "auto" && e.clientWidth < e.scrollWidth || n.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const t = e.parentNode;
    return !t || t.tagName === "BODY" ? !1 : ii(t);
  }
}
function cl(e) {
  const n = e || window.event, t = n.target;
  return ii(t) ? !1 : n.touches.length > 1 ? !0 : (n.preventDefault && n.preventDefault(), !1);
}
const Qt = /* @__PURE__ */ new WeakMap();
function hl(e, n = !1) {
  const t = x(n);
  let i = null, o;
  le(Wn(e), (u) => {
    const c = kn(ie(u));
    if (c) {
      const d = c;
      Qt.get(d) || Qt.set(d, o), t.value && (d.style.overflow = "hidden");
    }
  }, {
    immediate: !0
  });
  const s = () => {
    const u = kn(ie(e));
    !u || t.value || (qt && (i = pe(
      u,
      "touchmove",
      (c) => {
        cl(c);
      },
      { passive: !1 }
    )), u.style.overflow = "hidden", t.value = !0);
  }, a = () => {
    var u;
    const c = kn(ie(e));
    !c || !t.value || (qt && (i == null || i()), c.style.overflow = (u = Qt.get(c)) != null ? u : "", Qt.delete(c), t.value = !1);
  };
  return at(a), Y({
    get() {
      return t.value;
    },
    set(u) {
      u ? s() : a();
    }
  });
}
function fl(e = {}) {
  const {
    window: n = st,
    initialWidth: t = Number.POSITIVE_INFINITY,
    initialHeight: i = Number.POSITIVE_INFINITY,
    listenOrientation: o = !0,
    includeScrollbar: s = !0
  } = e, a = x(t), u = x(i), c = () => {
    n && (s ? (a.value = n.innerWidth, u.value = n.innerHeight) : (a.value = n.document.documentElement.clientWidth, u.value = n.document.documentElement.clientHeight));
  };
  if (c(), dn(c), pe("resize", c, { passive: !0 }), o) {
    const d = al("(orientation: portrait)");
    le(d, () => c());
  }
  return { width: a, height: u };
}
const xt = {
  props: {
    show: { type: [Boolean, Object], default: !1 }
  },
  emits: ["update:show"],
  data() {
    return {
      innerShow: !1
    };
  },
  watch: {
    show: {
      immediate: !0,
      handler(e) {
        this.innerShow = !!e;
      }
    },
    innerShow(e) {
      !!e !== this.show && this.$emit("update:show", e);
    }
  }
}, Gn = (e) => {
  const n = typeof e;
  return n === "boolean" || n === "string" ? !0 : e.nodeType === Node.ELEMENT_NODE;
}, Yn = {
  name: "detachable",
  props: {
    attach: {
      default: () => !1,
      validator: Gn
    },
    contentClass: {
      type: [String, Object],
      default: ""
    },
    contentStyle: {
      type: [String, Object],
      default: () => ""
    }
  },
  data: () => ({
    hasDetached: !1,
    // the final value of renderTo
    target: null
  }),
  inject: {
    vuDebug: {
      default: !0
    }
  },
  watch: {
    attach() {
      this.hasDetached = !1, this.initDetach();
    }
  },
  mounted() {
    this.initDetach();
  },
  methods: {
    initDetach() {
      if (this._isDestroyed || this.hasDetached || this.attach === "" || this.attach === !0 || this.attach === "attach")
        return;
      let e;
      if (this.attach ? typeof this.attach == "string" ? e = document.querySelector(this.attach) : e = this.attach : e = document.body, !e) {
        this.vuDebug && console.warn(`Unable to locate target ${this.attach}`, this);
        return;
      }
      this.vuDebug && e.tagName.toLowerCase() !== "body" && window.getComputedStyle(e).position !== "relative" && console.warn(`target (${e.tagName.toLowerCase()}${e.id && ` #${e.id}`}${e.className && ` .${e.className}`}) element should have a relative position`), this.target = e, this.hasDetached = !0;
    }
  }
}, Pn = function(n, t) {
  let i, o;
  return function(...a) {
    const u = this, c = +/* @__PURE__ */ new Date();
    i && c < i + t ? (clearTimeout(o), o = setTimeout(() => {
      i = c, n.apply(u, a);
    }, t)) : (i = c, n.apply(u, a));
  };
}, Xn = (e, n, t, i = { width: 0, x: 0, y: 0 }, { scrollTop: o = 0, scrollLeft: s = 0 } = {}, a = !1, u = { left: 2, right: 2, top: 0, bottom: 0 }, c = { x: 0, y: 0 }) => {
  let d = n.y - i.y + o + (c.y || 0), h = n.x - i.x + s + (c.x || 0);
  isNaN(n.width) && (n.width = 0), isNaN(n.height) && (n.height = 0), /-right/.test(e) ? h += n.width - t.width : /^(top|bottom)$/.test(e) && (h += n.width / 2 - t.width / 2), /^bottom/.test(e) ? d += n.height : /^(left|right)(-top|-bottom)?$/.test(e) ? (h -= t.width, /^(right|right-\w{3,6})$/.test(e) && (h += n.width + t.width), /(-top|-bottom)/.test(e) ? /-bottom/.test(e) && (d += n.height - t.height) : d += n.height / 2 - t.height / 2) : d -= t.height;
  let p = 0, _ = 0;
  const v = n.width / 2;
  if (a) {
    const y = u.left, L = i.width - t.width - u.right, B = Math.max(y, Math.min(h, L));
    p = h - B, h = B;
  }
  return {
    left: h,
    top: d,
    shiftX: p,
    shiftY: _,
    offset: v
  };
}, pl = {
  name: "vu-tooltip",
  mixins: [xt],
  data: () => ({
    setPosition: Xn
  }),
  props: {
    type: {
      type: String,
      default: () => "tooltip"
    },
    side: {
      type: String,
      default: () => "top"
    },
    arrow: {
      type: Boolean,
      default: !0
    },
    text: {
      type: String,
      default: () => ""
    },
    animated: {
      type: Boolean,
      default: !0
    },
    contentClass: {
      type: String,
      required: !1,
      default: ""
    },
    prerender: {
      type: Boolean,
      required: !1
    }
  }
}, ml = ["innerHTML"];
function vl(e, n, t, i, o, s) {
  return l(), r("div", {
    ref: "content",
    class: k([`${t.side} ${t.type} ${t.type}-root`, { "without-arrow": !t.arrow }, { prerender: t.prerender }, t.contentClass])
  }, [
    T(It, {
      name: t.animated ? "fade" : ""
    }, {
      default: V(() => [
        e.show ? (l(), r("div", {
          key: 0,
          class: k([`${t.type}-wrapper`])
        }, [
          C(e.$slots, "arrow", { side: t.side }, () => [
            t.arrow ? (l(), r("div", {
              key: 0,
              class: k(`${t.type}-arrow`)
            }, null, 2)) : f("", !0)
          ], !0),
          C(e.$slots, "title", { side: t.side }, void 0, !0),
          b("div", {
            ref: "body",
            class: k(`${t.type}-body`)
          }, [
            t.text ? (l(), r("span", {
              key: 0,
              innerHTML: t.text
            }, null, 8, ml)) : C(e.$slots, "default", {
              key: 1,
              side: t.side
            }, void 0, !0)
          ], 2)
        ], 2)) : f("", !0)
      ]),
      _: 3
    }, 8, ["name"])
  ], 2);
}
const Jn = /* @__PURE__ */ F(pl, [["render", vl], ["__scopeId", "data-v-e6942483"]]), gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jn
}, Symbol.toStringTag, { value: "Module" })), bl = ["top", "top-right", "right-bottom", "right", "right-top", "bottom-right", "bottom", "bottom-left", "left-top", "left", "left-bottom", "top-left"], yl = (e, n, t, i) => {
  const o = t.indexOf(e), s = t[(o + 1) % t.length];
  return i.includes(s) ? n : s;
}, _l = ({ intersectionRatio: e }) => e < 1, wl = {
  name: "vu-popover",
  mixins: [xt, Yn],
  expose: ["updatePosition", "toggle"],
  emits: ["unpositionable"],
  components: { VuTooltip: Jn },
  props: {
    type: {
      type: String,
      default: "popover"
    },
    side: {
      type: String,
      default: "bottom"
    },
    arrow: {
      type: Boolean,
      default: !1
    },
    shift: {
      type: Boolean,
      default: !1
    },
    offsets: {
      type: Object,
      default: void 0
    },
    animated: {
      type: Boolean,
      default: !0
    },
    overlay: {
      type: Boolean,
      default: !1
    },
    click: {
      type: Boolean,
      default: !0
    },
    hover: {
      type: Boolean,
      default: !1
    },
    hoverImmediate: {
      type: Boolean,
      default: !1
    },
    hoverDelay: {
      type: Number,
      default: 500
    },
    title: {
      type: String,
      default: () => ""
    },
    persistent: {
      type: Boolean,
      default: !1
    },
    positions: {
      type: Array,
      required: !1,
      default: () => bl
    },
    getNextPosition: {
      type: Function,
      required: !1,
      default: yl
    },
    checkPosition: {
      type: Function,
      required: !1,
      default: _l
    },
    syncWidth: {
      type: Boolean,
      default: !1
    },
    ignoreEscapeKey: {
      type: Boolean,
      default: !1
    },
    ignoreClickOutside: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    open: !1,
    width: 0,
    resizeObs: null,
    debounce() {
    },
    useDebounceFn: Tn,
    intersectionObs: null,
    setPositionBound: null,
    shifted: !1,
    positioned: !1,
    fadeTimeout: void 0,
    positionAttempts: [],
    scrollableAncestors: [],
    // put in positionable
    innerSide: "",
    keyboardListener() {
    }
  }),
  watch: {
    innerShow: {
      immediate: !0,
      async handler(e) {
        e ? (this.fadeTimeout && (this.fadeTimeout = void 0), await new Promise((n) => setTimeout(n, 10)), this.positioned = !1, this.open = !0, this.positionAttempts = [], await this.$nextTick(), this.setPositionBound(), this.intersectionObs.observe(this.$refs.tooltip.$el), this.resizeObs || (this.resizeObs = new ResizeObserver(async () => {
          this.setPositionBound(!0);
        })), this.listenScrolls()) : (this.$refs.tooltip && (this.intersectionObs.unobserve(this.$refs.tooltip.$el), this.resizeObs.disconnect()), this.stopScrollListening(), this.animated ? this.fadeTimeout = setTimeout(() => {
          this.open = !1;
        }, 500) : this.open = !1);
      }
    },
    innerSide: {
      handler() {
        this.updatePosition();
      }
    },
    attach() {
      this.innerShow && this.updatePosition();
    },
    open: {
      handler(e) {
        this.target && (e && !this.ignoreEscapeKey ? this.keyboardListener = pe(this.target, "keydown", (n) => {
          n.code === "Escape" && (this.innerShow = !1);
        }) : this.keyboardListener());
      }
    },
    hover: {
      immediate: !0,
      handler() {
        this.attachHover();
      }
    },
    hoverImmediate() {
      this.attachHover();
    },
    hoverDelay() {
      this.attachHover();
    }
  },
  created() {
    this.setPositionBound = Pn(this.setPosition.bind(this), 1);
  },
  async mounted() {
    await this.$nextTick();
    let e = 0;
    const n = 5;
    for (; e < n && this.$refs.activator === void 0 && this.$refs.tooltip === void 0; )
      e++, await this.$nextTick();
    const { target: t, positionAttempts: i } = this;
    this.intersectionObs = new IntersectionObserver(([{ boundingClientRect: o, rootBounds: s, intersectionRatio: a, intersectionRect: u }]) => {
      if (this.$refs.tooltip && this.intersectionObs.unobserve(this.$refs.tooltip.$el), this.checkPosition({ intersectionRatio: a, elementRect: o, targetRect: s, intersectionRect: u, positionAttempts: i })) {
        const c = this.getNextPosition(this.innerSide || this.side, this.side, this.positions, this.positionAttempts);
        if (this.positionAttempts.length > this.positions.length) {
          this.$emit("unpositionable"), this.positioned = !0, this.positionAttempts = [];
          return;
        }
        this.innerSide = c, this.positionAttempts.push(this.innerSide);
      } else
        this.positioned = !0, this.positionAttempts = [], this.resizeObs.observe(this.$refs.tooltip.$el), this.resizeObs.observe(this.target);
    }, { root: t !== document.body ? t : document });
  },
  beforeUnmount() {
    try {
      this.innerShow = !1, this.stopScrollListening(), this.intersectionObs.disconnect(), this.resizeObs.disconnect();
    } catch {
    }
  },
  methods: {
    listenScrolls() {
      const e = [];
      let n = this.$refs.activator.parentElement;
      for (; n && (this.target.contains(n) || n === this.target); ) {
        const { overflow: t } = window.getComputedStyle(n), i = t.split(" ");
        ["auto", "scroll"].some((o) => i.includes(o)) && e.push(n), n = n.parentElement;
      }
      this.scrollableAncestors = e, this.scrollableAncestors.forEach((t) => t.addEventListener("scroll", this.setPositionBound));
    },
    stopScrollListening() {
      this.scrollableAncestors.forEach((e) => e.removeEventListener("scroll", this.setPositionBound));
    },
    updatePosition() {
      var e;
      this.setPositionBound(), this.intersectionObs.observe((e = this.$refs.tooltip) == null ? void 0 : e.$el);
    },
    async setPosition(e) {
      var u;
      e && await this.$nextTick();
      let n = this.$refs.activator.getBoundingClientRect();
      const t = (u = this.$refs.tooltip) == null ? void 0 : u.$el;
      if (!t)
        return;
      let i = t.getBoundingClientRect();
      this.syncWidth && i.width !== n.width && (this.width = n.width, await this.$nextTick(), n = this.$refs.activator.getBoundingClientRect(), i = this.$refs.tooltip.$el.getBoundingClientRect());
      const o = this.target.getBoundingClientRect(), s = this.offsets && this.offsets[this.innerSide || this.side] || {};
      this.positionAttempts.push(this.innerSide || this.side);
      const a = Xn(
        this.innerSide || this.side,
        n,
        i,
        o,
        this.target,
        this.shift,
        { left: 0, right: 0 },
        s
      );
      this.shifted = a.shiftX, t.style.top = `${a.top}px`, t.style.left = `${a.left}px`, this.overlay && (this.$refs.overlay.style.top = `${this.target === document.body ? document.scrollingElement.scrollTop : this.target.scrollTop}px`);
    },
    onClickOutside(e, n = !1) {
      if (this.ignoreClickOutside || !this.innerShow)
        return;
      const { target: t } = e;
      n && e.preventDefault(), !(this.$refs.tooltip && (t === this.$refs.tooltip.$el || this.$refs.tooltip.$el.contains(t))) && (this.innerShow = !1);
    },
    onHover(e) {
      this.debounce(e).then((n) => {
        this.openedByClick || (n === "mouseenter" ? this.innerShow = !0 : (this.innerShow = !1, this.openedByClick = !1));
      }).catch(() => {
      });
    },
    attachHover() {
      this.hover && !this.hoverImmediate ? this.debounce = Tn(({ type: e }) => e, this.hoverDelay, { rejectOnCancel: !0 }) : this.debounce = function() {
      };
    },
    onClick() {
      this.toggle(), this.hover && this.innerShow ? this.openedByClick = !0 : this.openedByClick = !1;
    },
    toggle(e = void 0) {
      e !== void 0 ? this.innerShow = e : this.innerShow = !this.innerShow;
    }
  }
};
function kl(e, n, t, i, o, s) {
  const a = $("VuTooltip"), u = _e("click-outside");
  return l(), r(M, null, [
    H((l(), r("span", J({
      ref: "activator",
      class: "vu-popover__activator"
    }, e.$attrs, {
      onClick: n[0] || (n[0] = (c) => t.click && s.onClick(!0)),
      onContextmenu: n[1] || (n[1] = re(() => {
      }, ["prevent", "stop"])),
      onMouseenter: n[2] || (n[2] = (c) => t.hover && s.onHover(c)),
      onMouseleave: n[3] || (n[3] = (c) => t.hover && s.onHover(c))
    }), [
      C(e.$slots, "default", {}, void 0, !0)
    ], 16)), [
      [u, { handler: s.onClickOutside, innerShow: e.innerShow }]
    ]),
    e.open || t.persistent ? H((l(), S(Nn, {
      key: 0,
      to: e.target
    }, [
      T(It, {
        name: t.animated ? "fade" : ""
      }, {
        default: V(() => [
          e.innerShow && t.overlay ? (l(), r("div", {
            key: 0,
            ref: "overlay",
            class: "mask popover-mask",
            onWheel: n[4] || (n[4] = re((...c) => s.onClickOutside && s.onClickOutside(...c), ["prevent"])),
            onTouchstart: n[5] || (n[5] = (c) => s.onClickOutside(c, !0))
          }, null, 544)) : f("", !0)
        ]),
        _: 1
      }, 8, ["name"]),
      T(It, {
        appear: "",
        name: t.animated ? "fade" : ""
      }, {
        default: V(() => [
          H(T(a, {
            ref: "tooltip",
            arrow: t.arrow,
            prerender: !e.positioned,
            type: t.type,
            show: !0,
            side: e.innerSide || t.side,
            class: k(e.contentClass),
            style: G([e.width ? `width: ${e.width}px` : {}, e.contentStyle]),
            "onUpdate:show": n[6] || (n[6] = (c) => e.open = !1),
            onMouseenter: n[7] || (n[7] = (c) => t.hover && s.onHover(c)),
            onMouseleave: n[8] || (n[8] = (c) => t.hover && s.onHover(c))
          }, {
            arrow: V(({ side: c }) => [
              C(e.$slots, "arrow", {
                side: e.innerSide || c,
                shift: e.shifted
              }, void 0, !0)
            ]),
            title: V(({ side: c }) => [
              C(e.$slots, "title", {
                side: e.innerSide || c
              }, () => [
                t.title ? (l(), r(M, { key: 0 }, [
                  X(w(t.title), 1)
                ], 64)) : f("", !0)
              ], !0)
            ]),
            default: V(() => [
              C(e.$slots, "body", {}, void 0, !0)
            ]),
            _: 3
          }, 8, ["arrow", "prerender", "type", "side", "class", "style"]), [
            [Me, e.innerShow || e.show]
          ])
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["to"])), [
      [Me, e.open]
    ]) : f("", !0)
  ], 64);
}
const Ge = /* @__PURE__ */ F(wl, [["render", kl], ["__scopeId", "data-v-d46bd11b"]]), Sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ge
}, Symbol.toStringTag, { value: "Module" })), Il = {
  name: "vu-status-bar",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    constrained: Boolean
  },
  data() {
    return {
      overflows: !1,
      ellipsis: !1,
      intObs: null,
      intObs2: null,
      visibleAmount: 0
    };
  },
  mounted() {
    this.watchSize();
  },
  computed: {
    visibleItems() {
      return this.items.slice(0, this.visibleAmount);
    },
    hiddenItems() {
      return this.overflows ? this.items.slice(this.visibleAmount) : [];
    }
  },
  watch: {
    items: {
      immediate: !0,
      // eslint-disable-next-line object-shorthand, func-names
      handler: function(e) {
        this.visibleAmount = e.length, this.ellipsis = !1, this.overflows = !1, this.$el && this.$nextTick(() => this.watchSize());
      }
    }
  },
  methods: {
    watchSize() {
      this.intObs = new IntersectionObserver(this.intersects, {
        root: this.$refs.container,
        threshold: 1
      }), this.intObs.observe(this.$refs.inner), this.intObs2 = new IntersectionObserver(this.intersects2, {
        root: this.$refs.inner,
        threshold: 1
      });
    },
    async intersects() {
      this.intObs.disconnect(), this.ellipsis = !0;
      const e = this.$refs.inner.querySelectorAll(".vu-badge");
      await this.$nextTick(), e.forEach((n) => {
        this.intObs2.observe(n);
      });
    },
    intersects2(e) {
      const n = e.filter((i) => i.intersectionRatio < 1);
      let { length: t } = n;
      if (t) {
        const i = this.$refs.inner.getBoundingClientRect(), { right: o } = i, s = n.shift();
        s && o - s.target.getBoundingClientRect().left - 22 < 0 && (t += 1), this.visibleAmount -= t, this.overflows = !0;
      }
      this.intObs2.disconnect();
    },
    units(e) {
      return this.ellipsis ? e > 99 ? "99+" : `${e}` : `${e}`;
    },
    destroyed() {
      this.intObs1 && delete this.intObs1, this.intObs2 && delete this.intObs2;
    }
  },
  components: { VuBadge: jn, VuPopover: Ge, VuIcon: ue }
}, Cl = {
  class: "status-bar__inner",
  ref: "inner"
};
function Bl(e, n, t, i, o, s) {
  const a = $("VuBadge"), u = $("VuIcon"), c = $("VuPopover"), d = _e("tooltip");
  return l(), r("div", {
    class: k(["vu-status-bar", { "status-bar--constrained": t.constrained }]),
    ref: "container"
  }, [
    b("div", Cl, [
      (l(!0), r(M, null, U(s.visibleItems, (h) => H((l(), S(a, {
        key: h.id,
        icon: h.icon,
        text: h.text || h.amount && s.units(h.amount) || "",
        color: h.color || "copy-grey",
        value: h.value,
        togglable: !1,
        style: G([h.amount && h.icon ? "min-width: 45px" : ""])
      }, null, 8, ["icon", "text", "color", "value", "style"])), [
        [
          d,
          h.tooltip || h.text || h.amount || "",
          void 0,
          { hover: !0 }
        ]
      ])), 128)),
      o.overflows ? (l(), S(c, {
        key: 0,
        type: "tooltip",
        "content-class": "vu-status-bar",
        shift: "",
        arrow: ""
      }, {
        default: V(() => [
          T(u, {
            icon: "menu-dot",
            style: { transform: "rotate(90deg)" }
          })
        ]),
        body: V(() => [
          (l(!0), r(M, null, U(s.hiddenItems, (h) => (l(), S(a, {
            key: h.id,
            icon: h.icon,
            text: h.text || `${h.amount}` || "",
            color: h.color || "copy-grey",
            value: h.value,
            togglable: !1
          }, null, 8, ["icon", "text", "color", "value"]))), 128))
        ]),
        _: 1
      })) : f("", !0)
    ], 512)
  ], 2);
}
const Zn = /* @__PURE__ */ F(Il, [["render", Bl], ["__scopeId", "data-v-5fdbcbd9"]]), $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" })), Ol = {
  name: "vu-lazy",
  props: {
    height: {
      type: [Number, String],
      default: () => "10px"
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["intersect"],
  data: () => ({
    observer: null,
    intersected: !1
  }),
  mounted() {
    "IntersectionObserver" in window ? (this.observer = new IntersectionObserver((e) => {
      const n = e == null ? void 0 : e.pop();
      n != null && n.isIntersecting && (this.intersected = !0, this.observer.disconnect(), this.$emit("intersect"));
    }, this.options), this.observer.observe(this.$el)) : (this.intersected = !0, this.$emit("intersect"));
  },
  beforeUnmount() {
    "IntersectionObserver" in window && this.observer && this.observer.disconnect(), delete this.observer;
  }
};
function Tl(e, n, t, i, o, s) {
  return l(), r("div", {
    style: G(e.intersected ? "" : `min-height: ${t.height}${typeof t.height == "number" && "px" || ""}`)
  }, [
    e.intersected ? C(e.$slots, "default", { key: 0 }) : C(e.$slots, "placeholder", { key: 1 })
  ], 4);
}
const Qn = /* @__PURE__ */ F(Ol, [["render", Tl]]), xl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qn
}, Symbol.toStringTag, { value: "Module" })), Ml = {
  name: "vu-image",
  components: { VuLazy: Qn },
  props: {
    lazy: {
      type: Boolean,
      required: !1
    },
    src: {
      type: [URL, String],
      required: !0
    },
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String],
    contain: Boolean,
    aspectRatio: String
  },
  emits: ["load", "error"],
  data: () => ({
    image: void 0,
    calculatedAspectRatio: void 0,
    naturalWidth: void 0,
    isLoading: !0,
    hasError: !1
  }),
  inject: {
    vuDebug: {
      default: !1
    }
  },
  computed: {
    computedAspectRatio() {
      return Number(this.aspectRatio || this.calculatedAspectRatio);
    },
    imageSizerStyle() {
      return this.computedAspectRatio ? { paddingBottom: `${1 / this.computedAspectRatio * 100}%` } : void 0;
    },
    imageStyle() {
      return [
        Number.isNaN(this.width) ? "" : { width: `${this.width}px` },
        Number.isNaN(this.height) ? "" : { height: `${this.height}px` },
        Number.isNaN(this.minHeight) ? "" : { minHeight: `${this.minHeight}px` },
        Number.isNaN(this.maxHeight) ? "" : { maxHeight: `${this.maxHeight}px` },
        Number.isNaN(this.minWidth) ? "" : { minWidth: `${this.minWidth}px` },
        Number.isNaN(this.maxWidth) ? "" : { maxWidth: `${this.maxWidth}px` }
      ];
    },
    imageClasses() {
      return `vu-image__image--${this.contain ? "contain" : "cover"}`;
    }
  },
  watch: {
    src() {
      this.isLoading ? this.loadImage() : this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.lazy || this.loadImage();
    },
    loadImage() {
      const e = new Image();
      this.image = e, this.isLoading = !0, e.onload = () => {
        e.decode ? e.decode().catch((n) => {
          this.vuDebug && console.warn(
            `Failed to decode image, trying to render anyway

src: ${this.src}` + (n.message ? `
Original error: ${n.message}` : ""),
            this
          );
        }).then(this.onLoad) : this.onLoad();
      }, e.onerror = this.onError, e.src = this.src, this.aspectRatio || this.pollForSize(e);
    },
    pollForSize(e, n = 100) {
      const t = () => {
        const { naturalHeight: i, naturalWidth: o } = e;
        i || o ? (this.naturalWidth = o, this.calculatedAspectRatio = o / i, this.image = null) : !e.complete && this.isLoading && !this.hasError && n != null && setTimeout(t, n);
      };
      t();
    },
    onLoad() {
      this.isLoading = !1, this.$emit("load", this.src);
    },
    onError() {
      this.hasError = !0, this.$emit("error", this.src);
    }
  }
}, Vl = (e) => (et("data-v-2025e901"), e = e(), tt(), e), Pl = /* @__PURE__ */ Vl(() => /* @__PURE__ */ b("div", { class: "vu-image__fill" }, null, -1));
function Ll(e, n, t, i, o, s) {
  const a = $("VuLazy");
  return l(), r("div", {
    class: "vu-image",
    style: G(s.imageStyle)
  }, [
    b("div", {
      class: "vu-image__sizer",
      style: G(s.imageSizerStyle)
    }, null, 4),
    t.lazy ? (l(), S(a, {
      key: 0,
      height: t.height || t.maxHeight || t.minHeight || 10,
      onIntersect: n[0] || (n[0] = (u) => s.loadImage())
    }, {
      default: V(() => [
        b("div", {
          class: k(["vu-image__image", s.imageClasses]),
          style: G([[e.isLoading ? "" : { backgroundImage: `url(${t.src})` }], { "background-position": "center center" }])
        }, null, 6)
      ]),
      _: 1
    }, 8, ["height"])) : (l(), r("div", {
      key: 1,
      class: k(["vu-image__image", s.imageClasses]),
      style: G([[e.isLoading ? "" : { backgroundImage: `url(${t.src})` }], { "background-position": "center center" }])
    }, null, 6)),
    Pl,
    C(e.$slots, "default", {}, void 0, !0)
  ], 4);
}
const it = /* @__PURE__ */ F(Ml, [["render", Ll], ["__scopeId", "data-v-2025e901"]]), Dl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it
}, Symbol.toStringTag, { value: "Module" })), Yt = Symbol("vuIsMobileOrTablet"), es = Symbol("vuIsIOS"), ts = Symbol("vuMessageNoProgress"), oi = Symbol("vuAlertDialogConfirmButtonLabel"), li = Symbol("vuAlertDialogCloseButtonLabel"), ai = Symbol("vuAlertDialogRiskyButtonLabel"), ri = Symbol("vuAlertDialogCloseButtonAltLabel"), ui = Symbol("vuDropdownMenuOverlay"), di = Symbol("vuTimelineDividerAncestorDepth"), ci = Symbol("vuTimelineDividerStickyContainer"), hi = Symbol("vuThumbnailListItemActionsActiveClass"), ns = Symbol("vuHasWUX"), eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AlertDialogCloseButtonAltLabelKey: ri,
  AlertDialogCloseButtonLabelKey: li,
  AlertDialogConfirmButtonLabelKey: oi,
  AlertDialogRiskyButtonLabelKey: ai,
  DropdownMenuOverlayKey: ui,
  HasWUXKey: ns,
  IsIOSKey: es,
  IsMobileOrTabletKey: Yt,
  MessageNoProgressKey: ts,
  ThumbnailListItemActionsActiveClassKey: hi,
  TimelineDividerAncestorKey: di,
  TimelineDividerStickyContainerKey: ci
}, Symbol.toStringTag, { value: "Module" }));
function Re() {
  return window ? ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, (e) => (e ^ (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16)) : (void 0)();
}
function ss(e, n = !0) {
  let t = n;
  return ie(e).forEach((o) => {
    !o.text && !o.label && (!o.class || !o.class.includes("divider")) && (t = !1), o.items && (t = ss(o.items, t));
  }), t;
}
function Al() {
  return window ? navigator.userAgent.toLowerCase().indexOf("firefox") >= 0 : !1;
}
const Fl = {
  name: "vu-spinner",
  props: {
    mask: {
      type: Boolean,
      default: () => !1
    },
    text: {
      type: String,
      default: () => ""
    }
  }
}, zl = { class: "mask-wrapper" }, El = { class: "mask-content" }, Nl = /* @__PURE__ */ go('<div class="spinner spinning fade in"><span class="spinner-bar"></span><span class="spinner-bar spinner-bar1"></span><span class="spinner-bar spinner-bar2"></span><span class="spinner-bar spinner-bar3"></span></div>', 1), Rl = {
  key: 0,
  class: "text"
};
function Hl(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k({ mask: t.mask })
  }, [
    b("div", zl, [
      b("div", El, [
        Nl,
        t.text.length ? (l(), r("span", Rl, w(t.text), 1)) : f("", !0)
      ])
    ])
  ], 2);
}
const is = /* @__PURE__ */ F(Fl, [["render", Hl]]), jl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: is
}, Symbol.toStringTag, { value: "Module" })), Ul = {
  name: "vu-scroller",
  exposes: ["stopLoading", "stopLoadingBefore"],
  props: {
    lock: {
      type: Boolean,
      default: !1
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    infinite: {
      type: Boolean,
      default: !1
    },
    showLoading: {
      type: Boolean,
      default: !1
    },
    // alias for infinite
    dataAfter: {
      type: Boolean,
      default: !1
    },
    dataBefore: {
      type: Boolean,
      default: !1
    },
    infiniteMargin: {
      type: Number,
      default: 200
    },
    infiniteHeight: {
      type: String,
      default: "50px"
    },
    infiniteBeforeHeight: {
      type: String,
      default: "50px"
    },
    loadingText: {
      type: String,
      default: ""
    },
    horizontal: {
      type: Boolean,
      default: !1
    },
    alwaysShow: {
      type: Boolean,
      default: !1
    },
    // Allows to configure timeout for innerScroll to happen.
    // The new content needs to be rerender to not endlessly loop on the intersection.
    updateSleep: {
      type: Number,
      default: 15
    },
    noIntersectionRoot: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["loading-before", "loading", "mounted"],
  data() {
    return {
      lazyKeyIndex: 0,
      lazyKeyIndex2: 0,
      wait: !1,
      waitBefore: !1,
      firefox: !1,
      isLocked: void 0
    };
  },
  inject: {
    noCss: {
      default: !0,
      from: ns
    }
  },
  computed: {
    rootMargin() {
      return Array(4).fill(`${this.infiniteMargin}px`).join(" ");
    },
    options() {
      const e = {}, { rootMargin: n } = this;
      return this.noIntersectionRoot || (e.root = this.$refs["scroll-container"]), {
        ...e,
        rootMargin: n
      };
    }
  },
  mounted() {
    this.firefox = Al(), this.$emit("mounted"), this.lockHandler(this.lock);
  },
  methods: {
    stopLoading(e) {
      e ? (this.lazyKeyIndex2 += 1, this.sleep()) : (this.lazyKeyIndex += 1, this.sleep());
    },
    async sleep() {
      this.wait = !0, this.waitBefore = !0, await setTimeout(() => {
      }, this.updateSleep), this.wait = !1, this.waitBefore = !1;
    },
    lockHandler(e) {
      this.isLocked === void 0 && (this.isLocked = hl(this.$refs["scroll-container"])), this.isLocked = e;
    }
  },
  watch: {
    lock: {
      handler: function(e) {
        this.lockHandler(e);
      }
    }
  },
  components: { VuSpinner: is, VuLazy: Qn }
}, Wl = { class: "vu-scroll-container__inner" };
function ql(e, n, t, i, o, s) {
  const a = $("VuSpinner"), u = $("VuLazy");
  return l(), r("div", {
    ref: "scroll-container",
    class: k(["vu-scroll-container", [{
      "vu-scroll-container--reverse": t.reverse,
      "vu-scroll-container--horizontal": t.horizontal,
      "vu-scroll-container--always-show": t.alwaysShow,
      "vu-scroll-container--classic": !s.noCss,
      firefox: o.firefox
    }]])
  }, [
    b("div", Wl, [
      t.dataBefore && !o.waitBefore ? (l(), S(u, {
        key: `lazy-key-${o.lazyKeyIndex2}`,
        onIntersect: n[0] || (n[0] = (c) => {
          e.$emit("loading-before"), e.$emit("loading", !0);
        }),
        options: s.options,
        height: t.infiniteBeforeHeight || t.infiniteHeight,
        class: "vu-scroll__lazy vu-scroll__lazy-top"
      }, {
        default: V(() => [
          C(e.$slots, "loadingBefore", {}, () => [
            T(a, { text: t.loadingText }, null, 8, ["text"])
          ], !0)
        ]),
        _: 3
      }, 8, ["options", "height"])) : f("", !0),
      C(e.$slots, "default", {}, void 0, !0),
      (t.infinite || t.dataAfter) && !o.wait ? (l(), S(u, {
        key: `lazy-key-${o.lazyKeyIndex}`,
        onIntersect: n[1] || (n[1] = (c) => e.$emit("loading")),
        options: s.options,
        height: t.infiniteHeight,
        style: { "min-width": "30px" },
        class: "vu-scroll__lazy vu-scroll__lazy-bottom"
      }, {
        default: V(() => [
          C(e.$slots, "loading", {}, () => [
            T(a, { text: t.loadingText }, null, 8, ["text"])
          ], !0)
        ]),
        _: 3
      }, 8, ["options", "height"])) : t.showLoading ? C(e.$slots, "loading", { key: 2 }, () => [
        T(a, { text: t.loadingText }, null, 8, ["text"])
      ], !0) : f("", !0)
    ])
  ], 2);
}
const Qe = /* @__PURE__ */ F(Ul, [["render", ql], ["__scopeId", "data-v-45b29b5d"]]), Kl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qe
}, Symbol.toStringTag, { value: "Module" })), Gl = {
  name: "vu-dropdownmenu-items-scrollable",
  components: { VuIcon: ue, VuImage: it, VuScroller: Qe },
  expose: ["checkHeight"],
  emits: ["update:responsive", "update:position", "click-item", "update:selected"],
  props: {
    target: {
      type: Object,
      required: !1
    },
    items: {
      type: Array,
      required: !0,
      validator: ss
    },
    selected: {
      type: Array,
      required: !0
    },
    scrollable: {
      type: Boolean,
      default: !0,
      required: !1
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    itemHeight: {
      type: Number,
      default: 45
    },
    maxItemsBeforeScroll: {
      type: Number,
      default: Number.Infinity
    },
    mainMenu: {
      default: !1
    }
  },
  data: () => ({
    uuid: Re,
    root: !1,
    height: Number.Infinity,
    displayTop: !1
  }),
  watch: {
    items() {
      this.isScrollable && this.checkHeight();
    }
  },
  computed: {
    maxItemsHeight() {
      return this.itemHeight * this.maxItemsBeforeScroll - 1;
    },
    hasNotSubMenus() {
      var e;
      return !((e = this.items) != null && e.some(({ items: n }) => n !== void 0));
    },
    isScrollable() {
      return this.hasNotSubMenus;
    },
    upwardsShift() {
      return !this.mainMenu && this.displayTop ? {
        bottom: 0,
        top: "auto",
        position: "absolute"
      } : null;
    }
  },
  async mounted() {
    await this.$nextTick(), this.isScrollable && this.items && this.checkHeight();
  },
  methods: {
    toggleSelected(e) {
      const n = this.selected.slice(0);
      return e.selected || this.selected.includes(e) ? n.splice(this.selected.indexOf(e), 1) : n.push(e), n;
    },
    onItemClick(e) {
      e.disabled || ((e.selectable || e.selected || this.selected.includes(e)) && this.$emit("update:selected", this.toggleSelected(e)), this.$emit("click-item", e));
    },
    async checkHeight() {
      var e, n, t;
      if (this.scrollable) {
        await this.$nextTick(), this.$el;
        const { top: i } = this.$el.getBoundingClientRect(), {
          bottom: o,
          top: s
        } = (e = this.target) == null ? void 0 : e.getBoundingClientRect(), a = o ? Math.min(window.innerHeight, o) : window.innerHeight, u = i - Math.max(0, s);
        this.height = a - i, await this.$nextTick();
        const c = (t = (n = this.$refs) == null ? void 0 : n.scroller) == null ? void 0 : t.$el;
        c && c.scrollHeight > c.clientHeight && u > this.height && (this.displayTop = !0, this.height = u);
      } else
        this.height = Number.Infinity, this.displayTop = !1;
    }
  }
}, Yl = {
  class: "dropdown-menu-wrap",
  ref: "items"
}, Xl = ["onClick"], Jl = {
  key: 1,
  class: "p-[5px] w-[44px] float-left h-full"
}, Zl = { class: "item-text" }, Ql = {
  key: 0,
  class: "item-text"
};
function ea(e, n, t, i, o, s) {
  const a = $("VuIcon"), u = $("VuImage"), c = $("VuScroller");
  return l(), r("div", {
    class: "dropdown-menu dropdown-menu-root dropdown-root",
    style: G([{ zIndex: t.zIndex }, s.upwardsShift])
  }, [
    T(c, {
      style: G(
        t.scrollable && (e.height || t.maxItemsBeforeScroll !== 1 / 0) ? {
          maxHeight: `${Math.min(s.maxItemsHeight, e.height)}px`
        } : {}
      ),
      ref: "scroller"
    }, {
      default: V(() => [
        b("ul", Yl, [
          (l(!0), r(M, null, U(t.items, (d) => (l(), r(M, null, [
            !d.class || !d.class.includes("header") && !d.class.includes("divider") ? (l(), r("li", {
              key: d.text || d.label,
              class: k(["item", [{
                selectable: !d.disabled && d.selectable || d.selected || t.selected.includes(d),
                selected: d.selected || t.selected.includes(d),
                hidden: d.hidden,
                disabled: d.disabled
              }, d.class]]),
              onClick: re((h) => s.onItemClick(d), ["stop"])
            }, [
              C(e.$slots, "default", { item: d }, () => [
                d.fonticon ? (l(), S(a, {
                  key: 0,
                  icon: d.fonticon,
                  withinText: !1
                }, null, 8, ["icon"])) : d.imageSource ? (l(), r("div", Jl, [
                  T(u, {
                    src: d.imageSource,
                    aspectRatio: "1",
                    width: "34"
                  }, null, 8, ["src"])
                ])) : f("", !0),
                b("span", Zl, w(d.text || d.label), 1)
              ], !0)
            ], 10, Xl)) : (l(), r("li", {
              key: d.text || d.label || e.uuid(),
              class: k(d.class)
            }, [
              d.class !== "divider" ? (l(), r("span", Ql, w(d.text || d.label), 1)) : f("", !0)
            ], 2))
          ], 64))), 256))
        ], 512)
      ]),
      _: 3
    }, 8, ["style"])
  ], 4);
}
const cn = /* @__PURE__ */ F(Gl, [["render", ea], ["__scopeId", "data-v-96b8e226"]]), ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cn
}, Symbol.toStringTag, { value: "Module" })), na = (e) => (et("data-v-ec239a62"), e = e(), tt(), e), sa = { class: "dropdown-menu-wrap" }, ia = {
  key: 0,
  class: "item item-back"
}, oa = { class: "item-text" }, la = ["onClick"], aa = {
  key: 1,
  class: "p-[5px] w-[44px] float-left h-full"
}, ra = { class: "item-text" }, ua = ["onClick"], da = /* @__PURE__ */ na(() => /* @__PURE__ */ b("span", { class: "divider" }, null, -1)), ca = {
  key: 0,
  class: "item-text"
}, ha = x(), fa = {
  name: "vu-dropdownmenu-items",
  components: { VuIcon: ue, VuImage: it, VuDropdownmenuItemsScrollable: cn },
  emits: ["update:responsive", "update:position", "click-item", "update:selected"],
  props: {
    target: {
      type: Object,
      required: !1
    },
    items: {
      type: Array,
      required: !0,
      validator: ss
    },
    selected: {
      type: Array,
      required: !0
    },
    scrollable: {
      type: Boolean
    },
    zIndex: {
      type: Number,
      default: 1e3
    },
    responsive: {
      type: Boolean,
      default: !1
    },
    dividedResponsiveItems: {
      type: Boolean,
      default: !1
    },
    disableResponsive: {
      type: Boolean,
      default: !1
    },
    maxItemsBeforeScroll: {
      required: !0
    }
  },
  data: () => ({
    stack: [],
    left: !1,
    uuid: Re,
    root: !1,
    parent: {}
  }),
  computed: {
    classes() {
      return {
        "open-left": this.left,
        "responsive-menu": this.responsive
      };
    },
    _items() {
      return this.stack[this.stack.length - 1] || this.items;
    },
    _parent() {
      return (this.stack[this.stack.length - 2] || this.items).find((e) => JSON.stringify(e.items) === JSON.stringify(this._items));
    }
  },
  async mounted() {
    var i;
    if (this.disableResponsive)
      return;
    await this.$nextTick();
    const e = {
      root: this.target,
      threshold: 1
    }, n = ((i = this.target) == null ? void 0 : i.getBoundingClientRect()) || { right: window.right, left: 0 }, t = new IntersectionObserver(async ([o]) => {
      t.unobserve(this.$el);
      const s = o.target.getBoundingClientRect();
      n.right < s.right && !this.left ? (this.left = !0, await this.$nextTick(), t.observe(this.$el)) : n.left > s.left && this.left && (this.$emit("update:responsive", !0), this.$emit("update:position"));
    }, e);
    await this.$nextTick(), t.observe(this.$el);
  },
  methods: {
    toggleSelected(e) {
      const n = this.selected.slice(0);
      return e.selected || this.selected.includes(e) ? n.splice(this.selected.indexOf(e), 1) : n.push(e), n;
    },
    onItemClick(e) {
      e.disabled || ((e.selectable || e.selected || this.selected.includes(e)) && this.$emit("update:selected", this.toggleSelected(e)), this.$emit("click-item", e));
    },
    onNextItemClick(e) {
      this.responsive && this.stack.push(e.items);
    },
    onBackItemClick() {
      this.stack.pop();
    },
    itemHasSubmenus(e) {
      var n;
      return (n = e.items) == null ? void 0 : n.some(({ items: t }) => t !== void 0);
    }
  }
}, pa = /* @__PURE__ */ Object.assign(fa, {
  setup(e) {
    return (n, t) => (l(), r("div", {
      class: k(["dropdown-menu dropdown-menu-root dropdown-root", n.classes]),
      style: G([{ zIndex: e.zIndex }]),
      ref_key: "self",
      ref: ha
    }, [
      b("ul", sa, [
        e.responsive && n.stack.length ? (l(), r("li", ia, [
          T(ue, {
            icon: "left-open",
            class: "back-item",
            onClick: re(n.onBackItemClick, ["stop"])
          }, null, 8, ["onClick"]),
          b("span", oa, w(n._parent.text), 1)
        ])) : f("", !0),
        (l(!0), r(M, null, U(n._items, (i) => (l(), r(M, null, [
          !i.class || !i.class.includes("header") && !i.class.includes("divider") ? (l(), r("li", {
            key: i.text || i.label,
            class: k(["item", [{
              "item-submenu": i.items,
              selectable: !i.disabled && i.selectable || i.selected || e.selected.includes(i),
              selected: i.selected || e.selected.includes(i),
              hidden: i.hidden,
              disabled: i.disabled,
              "hide-responsive-divider": !e.dividedResponsiveItems
            }, i.class]]),
            onClick: re((o) => i.items && e.responsive && !e.dividedResponsiveItems ? n.onNextItemClick(i) : n.onItemClick(i), ["stop"])
          }, [
            C(n.$slots, "default", { item: i }, () => [
              i.fonticon ? (l(), S(ue, {
                key: 0,
                icon: i.fonticon,
                withinText: !1
              }, null, 8, ["icon"])) : i.imageSource ? (l(), r("div", aa, [
                T(it, {
                  src: i.imageSource,
                  aspectRatio: "1",
                  width: "34"
                }, null, 8, ["src"])
              ])) : f("", !0),
              b("span", ra, w(i.text || i.label), 1)
            ], !0),
            i.items ? (l(), r("div", {
              key: 0,
              class: "next-icon",
              onClick: re((o) => n.onNextItemClick(i), ["stop"])
            }, [
              da,
              T(ue, { icon: "right-open" })
            ], 8, ua)) : f("", !0),
            !e.responsive && i.items ? (l(), r(M, { key: 1 }, [
              e.scrollable && !n.itemHasSubmenus(i) ? (l(), S(cn, J({ key: 0 }, { maxItemsBeforeScroll: e.maxItemsBeforeScroll, scrollable: e.scrollable, selected: e.selected, target: e.target }, {
                items: i.items,
                "z-index": e.zIndex + 1,
                onClickItem: n.onItemClick,
                "onUpdate:selected": t[0] || (t[0] = (o) => n.$emit("update:selected", o)),
                "onUpdate:responsive": t[1] || (t[1] = (o) => n.$emit("update:responsive", o)),
                "onUpdate:position": t[2] || (t[2] = () => {
                  var a;
                  const { left: o, top: s } = (a = n.$refs.self) == null ? void 0 : a.getBoundingClientRect();
                  n.$emit("update:position", { x: o, y: s });
                })
              }), null, 16, ["items", "z-index", "onClickItem"])) : (l(), S(Xt, J({ key: 1 }, { maxItemsBeforeScroll: e.maxItemsBeforeScroll, scrollable: e.scrollable, selected: e.selected, target: e.target }, {
                items: i.items,
                onClickItem: n.onItemClick,
                "onUpdate:selected": t[3] || (t[3] = (o) => n.$emit("update:selected", o)),
                "onUpdate:responsive": t[4] || (t[4] = (o) => n.$emit("update:responsive", o)),
                "onUpdate:position": t[5] || (t[5] = () => {
                  var a;
                  const { left: o, top: s } = (a = n.$refs.self) == null ? void 0 : a.getBoundingClientRect();
                  n.$emit("update:position", { x: o, y: s });
                })
              }), null, 16, ["items", "onClickItem"]))
            ], 64)) : f("", !0)
          ], 10, la)) : (l(), r("li", {
            key: i.text || i.label || K(Re)(),
            class: k(i.class)
          }, [
            i.class !== "divider" ? (l(), r("span", ca, w(i.text || i.label), 1)) : f("", !0)
          ], 2))
        ], 64))), 256))
      ])
    ], 6));
  }
}), Xt = /* @__PURE__ */ F(pa, [["__scopeId", "data-v-ec239a62"]]), ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xt
}, Symbol.toStringTag, { value: "Module" })), fi = ["top", "top-right", "bottom-right", "bottom", "bottom-left", "top-left"], pi = ({ intersectionRatio: e, elementRect: n, targetRect: t }) => e < 1 && (n.top < t.top || n.bottom > t.bottom), mi = (e, n, t, i) => {
  if (i.length === 1) {
    const o = i[0];
    return o.includes("top") ? o.replace("top", "bottom") : o.replace("bottom", "top");
  } else
    i.length > 1 && i.push(...fi);
  return n;
};
function vi(e, n = !0) {
  let t = n;
  return e.forEach((i) => {
    !i.text && !i.label && (!i.class || !i.class.includes("divider")) && (t = !1), i.items && (t = vi(i.items, t));
  }), t;
}
const va = {
  components: { VuDropdownmenuItems: Xt, VuPopover: Ge },
  name: "vu-dropdownmenu",
  mixins: [xt, Yn],
  emits: ["open", "close", "click-item", "update:modelValue"],
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      required: !0,
      validator: vi
    },
    dividedResponsiveItems: {
      type: Boolean,
      default: !1
    },
    position: {
      type: String,
      required: !1,
      default: "bottom-left"
    },
    arrow: {
      type: Boolean,
      default: !1
    },
    overlay: {
      type: Boolean,
      default: !1
    },
    zIndex: {
      type: Number,
      default: () => 1e3
    },
    responsive: {
      type: Boolean,
      default: !1
    },
    shift: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    positions: {
      type: Array,
      required: !1,
      default: () => fi
    },
    getNextPosition: {
      type: Function,
      required: !1,
      default: mi
    },
    checkPosition: {
      type: Function,
      required: !1,
      default: pi
    },
    ignoreEscapeKey: {
      type: Boolean,
      default: !1
    },
    ignoreClickOutside: {
      type: Boolean,
      default: !1
    },
    contentClass: {
      type: String
    },
    scrollable: {
      type: Boolean,
      default: !1
    },
    itemHeight: {
      type: Number,
      default: 45
    },
    maxItemsBeforeScroll: {
      type: Number,
      default: Number.INFINITY
    }
  },
  data: () => ({
    innerResponsive: !1
  }),
  computed: {
    isResponsive: {
      get() {
        return this.innerResponsive || this.responsive;
      },
      set(e) {
        this.innerResponsive = e;
      }
    },
    hasNotSubMenus() {
      var e;
      return !((e = this.items) != null && e.some(({ items: n }) => n !== void 0));
    },
    isScrollable() {
      return this.hasNotSubMenus && this.scrollable;
    }
  },
  watch: {
    async items() {
      var e;
      this.innerShow && (await this.$nextTick(), this.isScrollable && ((e = this.$refs.dropdownItems) == null || e.checkHeight()), this.$refs.popover.updatePosition());
    }
  },
  methods: {
    handleClick(e) {
      e.disabled || (e.handler && e.handler(e), this.$emit("click-item", e), this.updateShow(!1));
    },
    updateShow(e) {
      e ? (this.isResponsive = !1, this.$emit("open")) : this.closeOnClick && (this.innerShow = !1, this.$emit("close"));
    }
  }
}, rt = /* @__PURE__ */ Object.assign(va, {
  setup(e) {
    const n = xe(ui, !1);
    return (t, i) => (l(), S(Ge, {
      ref: "popover",
      show: t.innerShow,
      "onUpdate:show": [
        i[3] || (i[3] = (o) => t.innerShow = o),
        t.updateShow
      ],
      shift: e.shift || e.responsive,
      type: "dropdownmenu popover",
      attach: t.target,
      side: e.position,
      overlay: e.overlay || K(n),
      animated: !1,
      "check-position": K(pi),
      "get-next-position": K(mi),
      contentClass: e.contentClass,
      "ignore-click-outside": e.ignoreClickOutside,
      arrow: !1,
      ignoreEscapeKey: e.ignoreEscapeKey
    }, {
      body: V(() => [
        e.scrollable && t.hasNotSubMenus ? (l(), S(cn, J({ key: 0 }, { scrollable: e.scrollable, maxItemsBeforeScroll: e.maxItemsBeforeScroll }, {
          target: t.target,
          mainMenu: !0,
          items: e.items,
          selected: e.value,
          onClickItem: t.handleClick,
          "onUpdate:selected": i[0] || (i[0] = (o) => t.$emit("update:modelValue", o))
        }), null, 16, ["target", "items", "selected", "onClickItem"])) : (l(), S(Xt, J({ key: 1 }, { scrollable: e.scrollable, maxItemsBeforeScroll: e.maxItemsBeforeScroll }, {
          responsive: t.isResponsive,
          "onUpdate:responsive": i[1] || (i[1] = (o) => t.isResponsive = o),
          "divided-responsive-items": e.dividedResponsiveItems,
          target: t.target,
          items: e.items,
          selected: e.value,
          onClickItem: t.handleClick,
          "onUpdate:selected": i[2] || (i[2] = (o) => t.$emit("update:modelValue", o))
        }), null, 16, ["responsive", "divided-responsive-items", "target", "items", "selected", "onClickItem"]))
      ]),
      default: V(() => [
        C(t.$slots, "default", { active: t.innerShow })
      ]),
      _: 3
    }, 8, ["show", "shift", "attach", "side", "overlay", "check-position", "get-next-position", "contentClass", "ignore-click-outside", "ignoreEscapeKey", "onUpdate:show"]));
  }
}), ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rt
}, Symbol.toStringTag, { value: "Module" })), os = {
  props: {
    active: {
      type: Boolean,
      default: () => !1
    }
  }
}, ba = {
  name: "vu-icon-btn",
  mixins: [os, $e, Tt, Ys],
  components: { VuIcon: ue },
  props: {
    icon: {
      required: !0,
      type: String
    },
    disableChevronResize: {
      default: !1,
      type: Boolean
    },
    hover: {
      default: !1,
      type: Boolean
    },
    noActive: {
      default: !1,
      type: Boolean
    },
    noHover: {
      default: !1,
      type: Boolean
    }
  }
};
function ya(e, n, t, i, o, s) {
  const a = $("VuIcon");
  return l(), r("div", {
    class: k(["vu-icon-btn", [e.color, e.size, {
      active: e.active && !t.noActive,
      "no-active": t.noActive,
      hovered: !t.noHover && t.hover,
      "no-hover": t.noHover,
      disabled: e.disabled
    }]]),
    onClickCapture: n[0] || (n[0] = (u) => {
      e.disabled && u.stopPropagation();
    })
  }, [
    T(a, {
      icon: t.icon,
      color: e.color,
      class: k({ "chevron-menu-icon": t.icon === "chevron-down" && t.disableChevronResize, disabled: e.disabled })
    }, null, 8, ["icon", "color", "class"])
  ], 34);
}
const de = /* @__PURE__ */ F(ba, [["render", ya], ["__scopeId", "data-v-c774dbe5"]]), _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de
}, Symbol.toStringTag, { value: "Module" })), wa = {
  name: "vu-tile",
  inject: ["vuCollectionActions", "vuCollectionLazyImages", "lang", "vuTileEmphasizeText", "vuDateFormatWeekday", "vuDateFormatShort"],
  emits: ["click-action"],
  props: {
    /* eslint-disable vue/require-default-prop */
    id: {
      type: String
    },
    src: String,
    type: String,
    title: String,
    text: String,
    author: String,
    date: Date,
    customMetaData: String,
    status: Array,
    active: Boolean,
    actions: Array || String,
    selected: Boolean,
    selectable: Boolean,
    thumbnail: Boolean,
    hideStatusBar: Boolean
  },
  computed: {
    classes() {
      return {
        "tile--selectable": this.selectable || this.selected,
        "tile--selected": this.selected,
        "tile--active": this.active,
        "tile--thumbnail": this.thumbnail
      };
    },
    _actions() {
      return this.actions || this.vuCollectionActions;
    },
    contentClasses() {
      const e = "tile__content";
      return this.thumbnail ? this.meta ? `${e}__title--2rows` : `${e}__title--3rows` : this.meta && this.text ? this.vuTileEmphasizeText ? [
        `${e}__title--1row`,
        `${e}__text--2rows`
      ] : [
        `${e}__title--2row`,
        `${e}__text--1row`
      ] : (this.meta ? !this.text : this.text) ? [`${e}__title--3rows`, `${e}__text--1row`] : `${e}__title--4rows`;
    },
    meta() {
      return this.customMetaData || `${this.author || ""}${this.author && this.date ? " | " : ""}${this.dateFormat}`;
    },
    dateFormatOptions() {
      const e = {
        weekday: this.vuDateFormatShort ? "short" : "long",
        month: this.vuDateFormatShort ? "short" : "long",
        day: "numeric",
        year: "numeric"
      };
      return this.vuDateFormatWeekday || delete e.weekday, e;
    },
    dateFormat() {
      return this.date ? this.date.toLocaleDateString(this.lang, this.dateFormatOptions) : "";
    }
  },
  data() {
    return {
      started: !1
    };
  },
  mounted() {
  },
  watch: {},
  methods: {},
  components: { VuImage: it, VuIcon: ue, VuIcon: ue, VuDropdownmenu: rt, VuStatusBar: Zn, VuIconBtn: de }
}, ka = { class: "tile-wrap" }, Sa = {
  key: 0,
  class: "tile__thumb"
}, Ia = {
  key: 1,
  class: "tile__image"
}, Ca = { class: "tile__title" }, Ba = { class: "inner" }, $a = {
  key: 0,
  class: "tile__meta"
}, Oa = { class: "inner" }, Ta = {
  key: 1,
  class: "tile__text"
}, xa = { class: "inner" }, Ma = {
  key: 2,
  class: "tile__action-icon"
};
function Va(e, n, t, i, o, s) {
  const a = $("VuImage"), u = $("VuIcon"), c = $("vuIconBtn"), d = $("VuDropdownmenu"), h = $("VuIconBtn"), p = $("VuStatusBar");
  return l(), r("div", {
    class: k(["vu-tile", s.classes])
  }, [
    b("div", ka, [
      t.active ? (l(), r("div", Sa)) : f("", !0),
      t.src ? (l(), r("div", Ia, [
        T(a, {
          src: t.src,
          width: "80",
          height: "60",
          contain: "",
          "aspect-ratio": "1",
          lazy: s.vuCollectionLazyImages
        }, null, 8, ["src", "lazy"]),
        t.src && (t.selectable || t.selected) ? (l(), S(u, {
          key: 0,
          icon: "check",
          class: "tile__check"
        })) : f("", !0)
      ])) : f("", !0),
      b("div", {
        class: k(["tile__content", s.contentClasses])
      }, [
        b("div", Ca, [
          t.type ? (l(), S(u, {
            key: 0,
            icon: t.type
          }, null, 8, ["icon"])) : f("", !0),
          b("span", Ba, w(t.title), 1)
        ]),
        s.meta ? (l(), r("div", $a, [
          b("span", Oa, w(s.meta), 1)
        ])) : f("", !0),
        t.text ? (l(), r("div", Ta, [
          b("span", xa, w(t.text), 1)
        ])) : f("", !0)
      ], 2),
      s._actions ? (l(), r("div", Ma, [
        s._actions.length > 1 ? (l(), S(d, {
          key: 0,
          items: s._actions,
          onClickItem: n[0] || (n[0] = (_) => e.$emit("click-action", { item: _, id: t.id }))
        }, {
          default: V((_) => [
            T(c, {
              icon: "chevron-down",
              class: k(_)
            }, null, 8, ["class"])
          ]),
          _: 1
        }, 8, ["items"])) : (l(), S(h, {
          key: 1,
          icon: s._actions[0].fonticon,
          onClick: n[1] || (n[1] = (_) => e.$emit("click-action", { item: _, id: t.id }))
        }, null, 8, ["icon"]))
      ])) : f("", !0)
    ]),
    t.hideStatusBar ? f("", !0) : (l(), S(p, {
      key: 0,
      status: t.status
    }, null, 8, ["status"]))
  ], 2);
}
const gi = /* @__PURE__ */ F(wa, [["render", Va], ["__scopeId", "data-v-f0868abb"]]), Pa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gi
}, Symbol.toStringTag, { value: "Module" })), La = {
  name: "vu-thumbnail",
  inject: ["vuCollectionLazyImages"],
  props: {
    /* eslint-disable vue/require-default-prop */
    id: {
      type: String,
      required: !0
    },
    src: String,
    type: String,
    active: Boolean,
    actions: Array,
    title: String,
    text: String,
    selected: Boolean,
    selectable: Boolean,
    author: String,
    date: Date,
    customMetaData: String,
    status: Array,
    hideStatusBar: Boolean
  },
  data: () => ({
    getListenersFromAttrs: Ze
  }),
  computed: {
    classes() {
      return {
        "thumbnail--selectable": this.selectable || this.selected,
        "thumbnail--selected": this.selected,
        "thumbnail--active": this.active
      };
    }
  },
  components: { VuImage: it, VuIcon: ue, VuTile: gi, VuStatusBar: Zn }
}, Da = {
  class: "thumbnail-wrap",
  style: { position: "relative" }
}, Aa = {
  key: 0,
  class: "thumbnail__thumb"
}, Fa = { class: "thumbnail__content" };
function za(e, n, t, i, o, s) {
  const a = $("VuImage"), u = $("VuIcon"), c = $("VuTile"), d = $("VuStatusBar");
  return l(), r("div", {
    class: k(["vu-thumbnail item", s.classes])
  }, [
    b("div", Da, [
      T(a, {
        src: t.src,
        lazy: s.vuCollectionLazyImages,
        "aspect-ratio": "200/150",
        contain: ""
      }, null, 8, ["src", "lazy"]),
      t.active ? (l(), r("div", Aa)) : f("", !0),
      t.selectable || t.selected ? (l(), S(u, {
        key: 1,
        icon: "check",
        class: "thumbnail__check"
      })) : f("", !0),
      T(c, {
        thumbnail: "",
        title: t.title,
        type: t.type,
        author: t.author,
        date: t.date,
        actions: t.actions,
        "custom-meta-data": t.customMetaData,
        "hide-status-bar": "",
        onClickAction: e.getListenersFromAttrs(e.$attrs).onClickAction
      }, null, 8, ["title", "type", "author", "date", "actions", "custom-meta-data", "onClickAction"]),
      b("div", Fa, w(t.text), 1),
      t.hideStatusBar ? f("", !0) : (l(), S(d, {
        key: 2,
        status: t.status
      }, null, 8, ["status"]))
    ])
  ], 2);
}
const Ea = /* @__PURE__ */ F(La, [["render", za], ["__scopeId", "data-v-a149de4c"]]), Na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ea
}, Symbol.toStringTag, { value: "Module" })), vt = {
  props: {
    loading: {
      type: Boolean,
      default: () => !1
    }
  }
}, Ra = {
  name: "vu-accordion",
  mixins: [vt],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    items: {
      type: Number,
      default: () => 0
    },
    open: {
      type: Boolean,
      default: () => !1
    },
    filled: {
      type: Boolean,
      default: () => !1
    },
    divided: {
      type: Boolean,
      default: () => !1
    },
    outlined: {
      type: Boolean,
      default: () => !1
    },
    separated: {
      type: Boolean,
      default: () => !1
    },
    animated: {
      type: Boolean,
      default: () => !1
    },
    exclusive: {
      type: Boolean,
      default: () => !1
    },
    keepRendered: {
      type: Boolean,
      default: () => !1
    }
  },
  emits: ["update:modelValue"],
  data: () => ({
    guid: Re
  }),
  created() {
    if (this.open && !this.exclusive) {
      let e = this.items;
      const n = [];
      for (; e; )
        n.push(e--);
      this.$emit("update:modelValue", n);
    }
  },
  computed: {
    value() {
      return this.modelValue;
    }
  },
  methods: {
    toggle(e) {
      if (this.value.includes(e)) {
        const n = this.value.slice();
        n.splice(n.indexOf(e), 1), this.$emit("update:modelValue", n);
      } else
        this.exclusive ? this.$emit("update:modelValue", [e]) : this.$emit("update:modelValue", [e].concat(this.value || []));
    }
  }
}, Ha = { class: "accordion-container" }, ja = ["onClick"], Ua = /* @__PURE__ */ b("i", { class: "caret-left" }, null, -1), Wa = {
  key: 0,
  class: "content-wrapper"
};
function qa(e, n, t, i, o, s) {
  const a = _e("mask");
  return H((l(), r("div", Ha, [
    b("div", {
      class: k(["accordion accordion-root", {
        filled: t.filled,
        "filled-separate": t.separated,
        divided: t.divided,
        styled: t.outlined,
        animated: t.animated
      }])
    }, [
      (l(!0), r(M, null, U(t.items, (u) => (l(), r("div", {
        key: `${e.guid}-accordion-${u}`,
        class: k(["accordion-item", { active: s.value.includes(u) }])
      }, [
        b("div", {
          onClick: (c) => s.toggle(u),
          class: "accordion-title"
        }, [
          Ua,
          C(e.$slots, "title-" + u)
        ], 8, ja),
        t.keepRendered || s.value.includes(u) ? H((l(), r("div", Wa, [
          b("div", {
            class: k(["content", { "accordion-animated-content": t.animated }])
          }, [
            C(e.$slots, "item-" + u)
          ], 2)
        ], 512)), [
          [Me, s.value.includes(u)]
        ]) : f("", !0)
      ], 2))), 128))
    ], 2)
  ])), [
    [a, e.loading]
  ]);
}
const Ka = /* @__PURE__ */ F(Ra, [["render", qa]]), Ga = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ka
}, Symbol.toStringTag, { value: "Module" })), ls = (e, ...n) => Object.fromEntries(
  n.filter((t) => t in e).map((t) => [t, e[t]])
), Ya = (e, ...n) => Object.fromEntries(
  n.filter(({ key: t }) => t in e).map(({ key: t, newName: i = t }) => [i, e[t]])
), Xa = (e) => (et("data-v-9c530f03"), e = e(), tt(), e), Ja = { class: "vu-alert-dialog vu-alert-dialog-root" }, Za = { class: "vu-alert-dialog-content" }, Qa = /* @__PURE__ */ Xa(() => /* @__PURE__ */ b("hr", null, null, -1)), er = [
  Qa
], tr = { class: "vu-alert-dialog-body" }, nr = ["src"], sr = {
  key: 3,
  class: "vu-alert-dialog-title"
}, ir = {
  key: 4,
  class: "vu-alert-dialog-text"
}, or = { class: "vu-alert-dialog-buttons" }, lr = {
  name: "vu-alert-dialog"
}, ar = /* @__PURE__ */ Ae({
  ...lr,
  props: {
    title: {},
    text: {},
    icon: {},
    svg: {},
    svgUrl: {},
    img: {},
    iconCircle: { type: Boolean },
    iconColor: {},
    animate: { type: Boolean },
    animationDuration: {},
    noOverlay: { type: Boolean },
    emitCancelOnClickOutside: { type: Boolean },
    emitCancelOnCloseButtonClick: { type: Boolean },
    showRiskyButton: { type: Boolean },
    showConfirmButton: { type: Boolean },
    showCloseButton: { type: Boolean },
    riskyButtonLabel: {},
    confirmButtonLabel: {},
    closeButtonLabel: {},
    _show: { type: Boolean },
    lazy: { type: Boolean },
    src: {},
    height: {},
    maxHeight: {},
    maxWidth: {},
    minHeight: {},
    minWidth: {},
    width: {},
    contain: { type: Boolean },
    aspectRatio: {}
  },
  emits: ["close", "confirm", "cancel"],
  setup(e, { emit: n }) {
    const t = e, i = n, o = Y(() => ls(t, "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "width", "contain", "aspectRatio")), s = xe(oi, "Confirm"), a = xe(li, "Close"), u = xe(ri, "Cancel"), c = xe(ai, "Proceed");
    return (d, h) => {
      const p = $("vu-icon"), _ = $("vu-btn");
      return l(), r("div", Ja, [
        T(It, { name: "fade" }, {
          default: V(() => [
            !d.noOverlay && !(d.animate && !d._show) ? (l(), r("div", {
              key: 0,
              class: "vu-overlay",
              onClick: h[0] || (h[0] = (v) => d.emitCancelOnClickOutside ? i("cancel") : i("close"))
            })) : f("", !0)
          ]),
          _: 1
        }),
        b("div", {
          class: k(["vu-alert-dialog-wrap", { "vu-alert-dialog--disposed": d.animate && !d._show }])
        }, [
          b("div", Za, [
            b("div", {
              class: "vu-alert-dialog-drag-handle",
              onClick: h[1] || (h[1] = (v) => d.emitCancelOnClickOutside ? i("cancel") : i("close"))
            }, er),
            b("div", tr, [
              C(d.$slots, "alert-content", {}, () => [
                d.img || d.src ? (l(), S(it, J({
                  key: 0,
                  class: "vu-alert-dialog-image"
                }, o.value, {
                  src: d.img || d.src
                }), null, 16, ["src"])) : d.svgUrl ? (l(), r("img", {
                  key: 1,
                  src: d.svgUrl,
                  style: { height: "120px !important" }
                }, null, 8, nr)) : d.icon || d.svg ? (l(), r("div", {
                  key: 2,
                  class: k(["vu-alert-dialog-icon-wrap", [{ "vu-alert-dialog-icon-circle": d.iconCircle }, d.iconColor ? `vu-alert-dialog-icon-${d.iconColor}` : ""]])
                }, [
                  d.svg ? (l(), S(Wt(d.svg), { key: 1 })) : (l(), S(p, {
                    key: 0,
                    icon: d.icon,
                    "within-text": !1
                  }, null, 8, ["icon"]))
                ], 2)) : f("", !0),
                d.title ? (l(), r("div", sr, w(d.title), 1)) : f("", !0),
                d.text ? (l(), r("div", ir, w(d.text), 1)) : f("", !0)
              ], !0),
              C(d.$slots, "alert-buttons", {}, () => [
                b("div", or, [
                  d.showConfirmButton ? (l(), S(_, {
                    key: 0,
                    color: "primary",
                    onClick: h[2] || (h[2] = (v) => i("confirm"))
                  }, {
                    default: V(() => [
                      X(w(d.confirmButtonLabel || K(s)), 1)
                    ]),
                    _: 1
                  })) : f("", !0),
                  d.showRiskyButton ? (l(), S(_, {
                    key: 1,
                    color: "error",
                    onClick: h[3] || (h[3] = (v) => i("confirm"))
                  }, {
                    default: V(() => [
                      X(w(d.riskyButtonLabel || K(c)), 1)
                    ]),
                    _: 1
                  })) : f("", !0),
                  d.showCloseButton ? (l(), S(_, {
                    key: 2,
                    onClick: h[4] || (h[4] = (v) => d.emitCancelOnCloseButtonClick ? i("cancel") : i("close"))
                  }, {
                    default: V(() => [
                      X(w(d.closeButtonLabel || d.showRiskyButton && K(u) || K(a)), 1)
                    ]),
                    _: 1
                  })) : f("", !0)
                ])
              ], !0)
            ])
          ])
        ], 2)
      ]);
    };
  }
}), as = /* @__PURE__ */ F(ar, [["__scopeId", "data-v-9c530f03"]]), rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: as
}, Symbol.toStringTag, { value: "Module" })), ur = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 128"
}, dr = /* @__PURE__ */ b("path", { d: "M125.26 34.87 93.13 2.74C91.42 1.03 89.15 0 86.73 0H41.28c-2.42 0-4.69 1.03-6.4 2.74L2.74 34.87C1.03 36.58 0 38.85 0 41.27v45.45c0 2.42 1.03 4.69 2.74 6.4l32.13 32.13c1.71 1.71 3.98 2.74 6.4 2.74h45.45c2.42 0 4.69-1.03 6.4-2.74l32.13-32.13c1.71-1.71 2.74-3.98 2.74-6.4V41.27c0-2.42-1.03-4.69-2.74-6.4Zm-24.3 49.37-16.72 16.72L64 80.58l-20.24 20.38-16.72-16.72L47.42 64 27.04 43.76l16.72-16.72L64 47.42l20.24-20.38 16.72 16.72L80.58 64z" }, null, -1), cr = [
  dr
];
function hr(e, n) {
  return l(), r("svg", ur, [...cr]);
}
const fr = { render: hr }, pr = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 128"
}, mr = /* @__PURE__ */ b("path", { d: "M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0m9.14 109.71H54.85V47.02h18.29zM64 36.57c-5.05 0-9.14-4.09-9.14-9.14s4.09-9.14 9.14-9.14 9.14 4.09 9.14 9.14-4.09 9.14-9.14 9.14" }, null, -1), vr = [
  mr
];
function gr(e, n) {
  return l(), r("svg", pr, [...vr]);
}
const br = { render: gr }, yr = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 128"
}, _r = /* @__PURE__ */ b("path", { d: "M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64 64-28.65 64-64S99.35 0 64 0m9.14 111.02H54.85V92.73h18.29zm13.33-43.89c-5.83 4.34-12.1 7.15-13.32 15.15H54.86c.81-11.79 6.46-17.35 11.89-21.55 5.29-4.2 9.8-7.31 9.8-14.63 0-8.27-4.31-12.15-11.49-12.15-9.76 0-13.84 8.01-13.98 17.63H31.23c.41-19.38 13.12-33.57 32.91-33.57 25.62 0 33.7 15.82 33.7 26.25 0 13.15-5.53 18.38-11.36 22.86Z" }, null, -1), wr = [
  _r
];
function kr(e, n) {
  return l(), r("svg", yr, [...wr]);
}
const Sr = { render: kr }, Ir = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 128 112.85"
}, Cr = /* @__PURE__ */ b("path", { d: "M128 105.8c0-1.18-.26-2.39-.91-3.53L70.14 3.53C68.78 1.18 66.38 0 64 0s-4.78 1.17-6.14 3.53L.91 102.27c-.66 1.14-.91 2.35-.91 3.53 0 3.69 2.93 7.05 7.05 7.05h113.89c4.12 0 7.05-3.36 7.05-7.05Zm-54.86-7.84c0 1.44-1.17 2.61-2.61 2.61H57.47c-1.44 0-2.61-1.17-2.61-2.61V84.9c0-1.44 1.17-2.61 2.61-2.61h13.06c1.44 0 2.61 1.17 2.61 2.61zm-1.3-26.12H56.17l-1.31-37.88c0-3.61 2.92-6.53 6.53-6.53h5.22c3.61 0 6.53 2.92 6.53 6.53l-1.31 37.88Z" }, null, -1), Br = [
  Cr
];
function $r(e, n) {
  return l(), r("svg", Ir, [...Br]);
}
const $s = { render: $r };
let bi = {
  show: () => new Promise((e) => e),
  hide: () => {
  },
  information: () => new Promise((e) => e),
  confirm: () => new Promise((e) => e),
  warning: () => new Promise((e) => e),
  confirmWithRisk: () => new Promise((e) => e),
  error: () => new Promise((e) => e),
  _alerts: mt([])
};
function Or(e) {
  const n = mt([]), t = Rn({
    _alerts: n,
    show(i) {
      return this.hide(), new Promise((o, s) => {
        const a = {
          id: Re(),
          component: as,
          bind: pt({
            height: 120,
            ...i,
            contain: !0,
            _show: !0
          }),
          on: {
            close: () => {
              this.hide(a), o();
            },
            confirm: () => {
              this.hide(a), o();
            },
            cancel: () => {
              this.hide(a), s();
            }
          }
        };
        this._alerts.push(mt(a));
      });
    },
    hide(i) {
      if (i) {
        const o = this._alerts.find((s) => s.id === i.id);
        if (!o)
          return;
        o.bind._show = !1, setTimeout(() => {
          const s = this._alerts.findIndex((a) => a.id === i.id);
          s > -1 && this._alerts.splice(s, 1);
        }, o.bind.animationDuration);
      } else
        this._alerts.forEach((o) => {
          o._show = !1;
        }), this._alerts.splice(0, this._alerts.length);
    },
    information(i) {
      return this.show({
        showCloseButton: !0,
        iconColor: "cyan",
        iconCircle: !0,
        icon: "info",
        svg: br,
        animate: !0,
        animationDuration: 300,
        ...i
      });
    },
    confirm(i) {
      return this.show({
        showCloseButton: !0,
        showConfirmButton: !0,
        iconColor: "cyan",
        iconCircle: !0,
        icon: "help",
        svg: Sr,
        animate: !0,
        animationDuration: 300,
        ...i,
        emitCancelOnClickOutside: !0,
        emitCancelOnCloseButtonClick: !0
      });
    },
    warning(i) {
      return this.show({
        iconColor: "orange",
        icon: "attention",
        svg: $s,
        iconCircle: !0,
        showCloseButton: !0,
        animate: !0,
        animationDuration: 300,
        ...i
      });
    },
    confirmWithRisk(i) {
      return this.show({
        iconColor: "orange",
        icon: "attention",
        svg: $s,
        iconCircle: !0,
        showRiskyButton: !0,
        showCloseButton: !0,
        animate: !0,
        animationDuration: 300,
        ...i,
        emitCancelOnClickOutside: !0,
        emitCancelOnCloseButtonClick: !0
      });
    },
    error(i) {
      return this.show({
        iconColor: "red",
        iconCircle: !0,
        icon: "error",
        svg: fr,
        showCloseButton: !0,
        animate: !0,
        animationDuration: 300,
        ...i
      });
    }
  });
  return bi = t, e.provide("vuAlertDialogAPI", t), e.config.globalProperties.$vuAlertDialog = t, t;
}
const Tr = {
  name: "vu-alert-dialog-container",
  components: {
    VuAlertDialog: as
  },
  data: () => ({
    _alerts: {
      type: Object
    }
  }),
  created() {
    this._alerts = bi._alerts;
  }
};
function xr(e, n, t, i, o, s) {
  return l(!0), r(M, null, U(e._alerts, (a) => (l(), S(Wt(a.component), J({
    key: a.id
  }, a.bind, {
    modelValue: a.value,
    "onUpdate:modelValue": (u) => a.value = u
  }, lt(a.on)), null, 16, ["modelValue", "onUpdate:modelValue"]))), 128);
}
const Mr = /* @__PURE__ */ F(Tr, [["render", xr]]), Vr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mr
}, Symbol.toStringTag, { value: "Module" })), Fe = {
  props: {
    modelValue: {
      type: [Object, String, Number, Array, Boolean, Date],
      default: () => ""
    },
    label: {
      type: String,
      default: () => ""
    },
    type: {
      type: String,
      default: () => "text"
    },
    helper: {
      type: String,
      default: () => ""
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    }
  }
}, Pr = {
  name: "vu-btn",
  mixins: [vt, os, Tt, Fe, $e],
  props: {
    large: {
      type: Boolean,
      default: () => !1
    },
    small: {
      type: Boolean,
      default: () => !1
    },
    block: {
      type: Boolean,
      default: () => !1
    },
    icon: {
      type: String,
      required: !1
    }
  },
  data: () => ({
    getListenersFromAttrs: Ze
    // tooltip: {},
  }),
  components: { VuIcon: ue },
  computed: {
    classes() {
      return [
        `btn btn-${this.color}`,
        {
          "btn-sm": this.small,
          "btn-lg": this.large,
          "btn-block": this.block,
          active: this.active
        }
      ];
    }
  }
}, Lr = ["disabled"];
function Dr(e, n, t, i, o, s) {
  const a = $("VuIcon"), u = _e("mask");
  return H((l(), r("button", J({
    type: "button",
    disabled: e.disabled
  }, lt(e.getListenersFromAttrs(e.$attrs), !0), { class: s.classes }), [
    t.icon ? (l(), S(a, {
      key: 0,
      icon: t.icon,
      color: "inherit"
    }, null, 8, ["icon"])) : f("", !0),
    C(e.$slots, "default", {}, void 0, !0)
  ], 16, Lr)), [
    [u, e.loading]
  ]);
}
const Ye = /* @__PURE__ */ F(Pr, [["render", Dr], ["__scopeId", "data-v-e776bbe0"]]), Ar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ye
}, Symbol.toStringTag, { value: "Module" })), Fr = { class: "vu-btn-dropdown flex flex-nowrap" }, zr = {
  key: 1,
  class: "caret text-grey-7"
}, Er = {
  name: "vu-btn-dropdown",
  components: { VuDropdownMenu: rt, VuBtn: Ye, VuIcon: ue, VuIconBtn: de }
}, Nr = /* @__PURE__ */ Ae({
  ...Er,
  props: {
    value: {},
    attach: {},
    position: {},
    shift: { type: Boolean },
    dividedResponsiveItems: { type: Boolean },
    color: {},
    icon: {},
    label: {},
    options: {},
    chevronDown: { type: Boolean }
  },
  emits: ["click", "click-item"],
  setup(e, { emit: n }) {
    const t = e, i = n;
    return (o, s) => (l(), r("div", Fr, [
      T(Ye, {
        icon: t.icon,
        color: t.color,
        class: "flex-basis-auto",
        style: G(t.options && "border-top-right-radius:0;border-bottom-right-radius:0"),
        onClick: s[0] || (s[0] = (a) => i("click", a))
      }, {
        default: V(() => [
          C(o.$slots, "default", {}, () => [
            X(w(o.label), 1)
          ], !0)
        ]),
        _: 3
      }, 8, ["icon", "color", "style"]),
      t.options ? (l(), S(rt, J({ key: 0 }, { ...t, items: o.options }, {
        class: "flex-basis-[38px] ml-[2px]",
        style: { display: "flex" },
        onClickItem: s[1] || (s[1] = (a) => i("click-item", a))
      }), {
        default: V(({ active: a }) => [
          T(Ye, {
            color: o.color,
            class: "dropdown_btn",
            active: a
          }, {
            default: V(() => [
              o.chevronDown ? (l(), S(ue, {
                key: 0,
                icon: "chevron-down"
              })) : (l(), r("span", zr))
            ]),
            _: 2
          }, 1032, ["color", "active"])
        ]),
        _: 1
      }, 16)) : f("", !0)
    ]));
  }
}), Rr = /* @__PURE__ */ F(Nr, [["__scopeId", "data-v-ba275fde"]]), Hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rr
}, Symbol.toStringTag, { value: "Module" })), jr = {
  name: "vu-btn-grp",
  mixins: [vt],
  props: {
    color: {
      type: String,
      default: () => "default"
    }
  }
}, Ur = { class: "btn-grp" };
function Wr(e, n, t, i, o, s) {
  const a = _e("mask");
  return H((l(), r("div", Ur, [
    C(e.$slots, "default")
  ])), [
    [a, e.loading]
  ]);
}
const qr = /* @__PURE__ */ F(jr, [["render", Wr]]), Kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qr
}, Symbol.toStringTag, { value: "Module" })), Gr = {
  name: "vu-carousel-slide",
  props: { title: { type: String, default: "" } },
  emits: ["slideclick", "slide-click"],
  data() {
    return {
      width: null,
      id: "",
      carousel: void 0,
      guid: Re
    };
  },
  created() {
    this.id = this.guid(), this.carousel = this.$parent;
  },
  mounted() {
    this.$isServer || this.$el.addEventListener("dragstart", (e) => e.preventDefault()), this.$el.addEventListener(
      this.carousel.isTouch ? "touchend" : "mouseup",
      this.onTouchEnd
    );
  },
  computed: {
    activeSlides() {
      const { currentPage: e = 0, breakpointSlidesPerPage: n, children: t } = this.carousel, i = [], o = t.filter(
        (a) => a.$el && a.$el.className.indexOf("vu-slide") >= 0
      ).map((a) => a._uid || a.id);
      let s = 0;
      for (; s < n; ) {
        const a = o[e * n + s];
        i.push(a), s++;
      }
      return i;
    },
    /**
     * `isActive` describes whether a slide is visible
     * @return {Boolean}
     */
    isActive() {
      return this.activeSlides.indexOf(this._uid) >= 0;
    },
    /**
     * `isCenter` describes whether a slide is in the center of all visible slides
     * if perPage is an even number, we quit
     * @return {Boolean}
     */
    isCenter() {
      const { breakpointSlidesPerPage: e } = this.carousel;
      return e % 2 === 0 || !this.isActive ? !1 : this.activeSlides.indexOf(this._uid) === Math.floor(e / 2);
    },
    /**
     * `isAdjustableHeight` describes if the carousel adjusts its height to the active slide(s)
     * @return {Boolean}
     */
    isAdjustableHeight() {
      const { adjustableHeight: e } = this.carousel;
      return e;
    }
  },
  methods: {
    onTouchEnd(e) {
      const n = this.carousel.isTouch && e.changedTouches && e.changedTouches.length > 0 ? e.changedTouches[0].clientX : e.clientX, t = this.carousel.dragStartX - n;
      (this.carousel.minSwipeDistance === 0 || Math.abs(t) < this.carousel.minSwipeDistance) && (this.$emit("slideclick", { ...e.currentTarget.dataset }), this.$emit("slide-click", { ...e.currentTarget.dataset }));
    }
  }
}, Yr = ["aria-hidden"];
function Xr(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["vu-slide", {
      "vu-slide-active": s.isActive,
      "vu-slide-center": s.isCenter,
      "vu-slide-adjustableHeight": s.isAdjustableHeight
    }]),
    tabindex: "-1",
    "aria-hidden": !s.isActive,
    role: "tabpanel"
  }, [
    C(e.$slots, "default")
  ], 10, Yr);
}
const Jr = /* @__PURE__ */ F(Gr, [["render", Xr]]), Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jr
}, Symbol.toStringTag, { value: "Module" })), Qr = {
  props: {
    /**
     * Flag to enable autoplay
     */
    autoplay: {
      type: Boolean,
      default: !1
    },
    /**
     * Time elapsed before advancing slide
     */
    autoplayTimeout: {
      type: Number,
      default: 3e3
    },
    /**
     * Flag to pause autoplay on hover
     */
    autoplayHoverPause: {
      type: Boolean,
      default: !0
    },
    /**
     * Autoplay direction. User can insert backward to make autoplay move from right to left
     */
    autoplayDirection: {
      type: String,
      default: "forward"
    }
  },
  data() {
    return {
      autoplayInterval: null
    };
  },
  destroyed() {
    this.$isServer || (this.$el.removeEventListener("mouseenter", this.pauseAutoplay), this.$el.removeEventListener("mouseleave", this.startAutoplay));
  },
  methods: {
    pauseAutoplay() {
      this.autoplayInterval && (this.autoplayInterval = clearInterval(this.autoplayInterval));
    },
    startAutoplay() {
      this.autoplay && (this.autoplayInterval = setInterval(
        this.autoplayAdvancePage,
        this.autoplayTimeout
      ));
    },
    restartAutoplay() {
      this.pauseAutoplay(), this.startAutoplay();
    },
    autoplayAdvancePage() {
      this.advancePage(this.autoplayDirection);
    }
  },
  mounted() {
    !this.$isServer && this.autoplayHoverPause && (this.$el.addEventListener("mouseenter", this.pauseAutoplay), this.$el.addEventListener("mouseleave", this.startAutoplay)), this.startAutoplay();
  }
}, eu = (e, n, t) => {
  let i;
  return () => {
    const s = () => {
      i = null, t || e.apply(void 0);
    }, a = t && !i;
    clearTimeout(i), i = setTimeout(s, n), a && e.apply(void 0);
  };
}, Sn = {
  onwebkittransitionend: "webkitTransitionEnd",
  onmoztransitionend: "transitionend",
  onotransitionend: "oTransitionEnd otransitionend",
  ontransitionend: "transitionend"
}, Os = () => {
  const e = Object.keys(Sn).find((n) => n in window);
  return e ? Sn[e] : Sn.ontransitionend;
}, tu = {
  name: "vu-carousel",
  emits: ["pageChange", "page-change", "update:modelValue", "navigation-click", "pagination-click", "transitionStart", "transition-start", "transitionEnd", "transition-end", "mounted"],
  beforeUpdate() {
    this.computeCarouselWidth();
  },
  data() {
    return {
      browserWidth: null,
      carouselWidth: 0,
      currentPage: 0,
      dragging: !1,
      dragMomentum: 0,
      dragOffset: 0,
      dragStartY: 0,
      dragStartX: 0,
      isTouch: typeof window < "u" && "ontouchstart" in window,
      offset: 0,
      refreshRate: 16,
      slideCount: 0,
      transitionstart: "transitionstart",
      transitionend: "transitionend",
      currentHeight: "auto"
    };
  },
  mixins: [Qr],
  // use `provide` to avoid `Slide` being nested with other components
  provide() {
    return {
      carousel: this
    };
  },
  props: {
    /**
       *  Adjust the height of the carousel for the current slide
       */
    adjustableHeight: {
      type: Boolean,
      default: !1
    },
    /**
       * Slide transition easing for adjustableHeight
       * Any valid CSS transition easing accepted
       */
    adjustableHeightEasing: {
      type: String,
      default: ""
    },
    /**
       *  Center images when the size is less than the container width
       */
    centerMode: {
      type: Boolean,
      default: !1
    },
    /**
       * Slide transition easing
       * Any valid CSS transition easing accepted
       */
    easing: {
      type: String,
      validator(e) {
        return ["ease", "linear", "ease-in", "ease-out", "ease-in-out"].indexOf(e) !== -1 || e.includes("cubic-bezier");
      },
      default: "ease"
    },
    /**
       * Flag to make the carousel loop around when it reaches the end
       */
    loop: {
      type: Boolean,
      default: !1
    },
    /**
       * Minimum distance for the swipe to trigger
       * a slide advance
       */
    minSwipeDistance: {
      type: Number,
      default: 8
    },
    /**
       * Flag to toggle mouse dragging
       */
    mouseDrag: {
      type: Boolean,
      default: !0
    },
    /**
       * Flag to toggle touch dragging
       */
    touchDrag: {
      type: Boolean,
      default: !0
    },
    /**
       * Flag to render pagination component
       */
    pagination: {
      type: Boolean,
      default: !0
    },
    /**
       * Maximum number of slides displayed on each page
       */
    perPage: {
      type: Number,
      default: 1
    },
    /**
       * Configure the number of visible slides with a particular browser width.
       * This will be an array of arrays, ex. [[320, 2], [1199, 4]]
       * Formatted as [x, y] where x=browser width, and y=number of slides displayed.
       * ex. [1199, 4] means if (window <= 1199) then show 4 slides per page
       */
    // eslint-disable-next-line vue/require-default-prop
    perPageCustom: {
      type: Array
    },
    /**
       * Resistance coefficient to dragging on the edge of the carousel
       * This dictates the effect of the pull as you move towards the boundaries
       */
    resistanceCoef: {
      type: Number,
      default: 20
    },
    /**
       * Scroll per page, not per item
       */
    scrollPerPage: {
      type: Boolean,
      default: !1
    },
    /**
       *  Space padding option adds left and right padding style (in pixels) onto vu-carousel-inner.
       */
    spacePadding: {
      type: Number,
      default: 0
    },
    /**
       *  Specify by how much should the space padding value be multiplied of, to re-arange the final slide padding.
       */
    spacePaddingMaxOffsetFactor: {
      type: Number,
      default: 0
    },
    /**
       * Slide transition speed
       * Number of milliseconds accepted
       */
    speed: {
      type: Number,
      default: 500
    },
    /**
       * Name (tag) of slide component
       * Overwrite when extending slide component
       */
    tagName: {
      type: String,
      default: "slide"
    },
    /**
       * Support for v-model functionality
       */
    modelValue: {
      type: Number,
      default: 0
    },
    /**
       * Support Max pagination dot amount
       */
    maxPaginationDotCount: {
      type: Number,
      default: -1
    }
  },
  watch: {
    value(e) {
      e !== this.currentPage && (this.goToPage(e), this.render());
    },
    currentPage(e) {
      this.$emit("pageChange", e), this.$emit("page-change", e), this.$emit("update:modelValue", e);
    },
    autoplay(e) {
      e === !1 ? this.pauseAutoplay() : this.restartAutoplay();
    }
  },
  computed: {
    children() {
      return this.$slots && this.$slots.default() && this.$slots.default().filter((e) => e.tag && e.tag.match(
        `^vue-component-\\d+-${this.tagName}$`
      ) !== null) || [];
    },
    /**
       * Given a viewport width, find the number of slides to display
       * @param  {Number} width Current viewport width in pixels
       * @return {Number} Number of slides to display
       */
    breakpointSlidesPerPage() {
      if (!this.perPageCustom)
        return this.perPage;
      const e = this.perPageCustom, n = this.browserWidth, i = e.sort(
        (s, a) => s[0] > a[0] ? -1 : 1
      ).filter((s) => n >= s[0]);
      return i[0] && i[0][1] || this.perPage;
    },
    /**
       * @return {Boolean} Can the slider move forward?
       */
    canAdvanceForward() {
      return this.loop || this.offset < this.maxOffset;
    },
    /**
       * @return {Boolean} Can the slider move backward?
       */
    canAdvanceBackward() {
      return this.loop || this.currentPage > 0;
    },
    /**
       * Number of slides to display per page in the current context.
       * This is constant unless responsive perPage option is set.
       * @return {Number} The number of slides per page to display
       */
    currentPerPage() {
      return !this.perPageCustom || this.$isServer ? this.perPage : this.breakpointSlidesPerPage;
    },
    /**
       * The horizontal distance the inner wrapper is offset while navigating.
       * @return {Number} Pixel value of offset to apply
       */
    currentOffset() {
      return this.isCenterModeEnabled ? 0 : (this.offset + this.dragOffset) * -1;
    },
    isHidden() {
      return this.carouselWidth <= 0;
    },
    /**
       * Maximum offset the carousel can slide
       * Considering the spacePadding
       * @return {Number}
       */
    maxOffset() {
      return Math.max(
        this.slideWidth * (this.slideCount - this.currentPerPage) - this.spacePadding * this.spacePaddingMaxOffsetFactor,
        0
      );
    },
    /**
       * Calculate the number of pages of slides
       * @return {Number} Number of pages
       */
    pageCount() {
      return this.scrollPerPage ? Math.ceil(this.slideCount / this.currentPerPage) : this.slideCount - this.currentPerPage + 1;
    },
    /**
       * Calculate the width of each slide
       * @return {Number} Slide width
       */
    slideWidth() {
      const e = this.carouselWidth - this.spacePadding * 2, n = this.currentPerPage;
      return e / n;
    },
    /**
       * @return {Boolean} Is navigation required?
       */
    isNavigationRequired() {
      return this.slideCount > this.currentPerPage;
    },
    /**
       * @return {Boolean} Center images when have less than min currentPerPage value
       */
    isCenterModeEnabled() {
      return this.centerMode && !this.isNavigationRequired;
    },
    transitionStyle() {
      const e = `${this.speed / 1e3}s`, n = `${e} ${this.easing} transform`;
      return this.adjustableHeight ? `${n}, height ${e} ${this.adjustableHeightEasing || this.easing}` : n;
    },
    padding() {
      const e = this.spacePadding;
      return e > 0 ? e : !1;
    }
  },
  methods: {
    /**
       * @return {Number} The index of the next page
       * */
    getNextPage() {
      return this.currentPage < this.pageCount - 1 ? this.currentPage + 1 : this.loop ? 0 : this.currentPage;
    },
    /**
       * @return {Number} The index of the previous page
       * */
    getPreviousPage() {
      return this.currentPage > 0 ? this.currentPage - 1 : this.loop ? this.pageCount - 1 : this.currentPage;
    },
    /**
       * Increase/decrease the current page value
       * @param  {String} direction (Optional) The direction to advance
       */
    advancePage(e) {
      e === "backward" && this.canAdvanceBackward ? this.goToPage(this.getPreviousPage(), "navigation") : (!e || e !== "backward") && this.canAdvanceForward && this.goToPage(this.getNextPage(), "navigation");
    },
    goToLastSlide() {
      this.dragging = !0, setTimeout(() => {
        this.dragging = !1;
      }, this.refreshRate), this.$nextTick(() => {
        this.goToPage(this.pageCount);
      });
    },
    /**
       * A mutation observer is used to detect changes to the containing node
       * in order to keep the magnet container in sync with the height its reference node.
       */
    attachMutationObserver() {
      const e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      if (e) {
        let n = {
          attributes: !0,
          data: !0
        };
        if (this.adjustableHeight && (n = {
          ...n,
          childList: !0,
          subtree: !0,
          characterData: !0
        }), this.mutationObserver = new e(() => {
          this.$nextTick(() => {
            this.computeCarouselWidth(), this.computeCarouselHeight();
          });
        }), this.$parent.$el) {
          const t = this.$el.getElementsByClassName(
            "vu-carousel-inner"
          );
          for (let i = 0; i < t.length; i++)
            this.mutationObserver.observe(t[i], n);
        }
      }
    },
    handleNavigation(e) {
      this.advancePage(e), this.pauseAutoplay(), this.$emit("navigation-click", e);
    },
    /**
       * Stop listening to mutation changes
       */
    detachMutationObserver() {
      this.mutationObserver && this.mutationObserver.disconnect();
    },
    /**
       * Get the current browser viewport width
       * @return {Number} Browser"s width in pixels
       */
    getBrowserWidth() {
      return this.browserWidth = window.innerWidth, this.browserWidth;
    },
    /**
       * Get the width of the carousel DOM element
       * @return {Number} Width of the carousel in pixels
       */
    getCarouselWidth() {
      const e = this.$el.getElementsByClassName(
        "vu-carousel-inner"
      );
      for (let n = 0; n < e.length; n++)
        e[n].clientWidth > 0 && (this.carouselWidth = e[n].clientWidth || 0);
      return this.carouselWidth;
    },
    /**
       * Get the maximum height of the carousel active slides
       * @return {String} The carousel height
       */
    getCarouselHeight() {
      if (!this.adjustableHeight)
        return "auto";
      const e = this.currentPerPage * (this.currentPage + 1) - 1, n = [...Array(this.currentPerPage)].map((t, i) => this.getSlide(e + i)).reduce(
        (t, i) => Math.max(t, i && i.$el.clientHeight || 0),
        0
      );
      return this.currentHeight = n === 0 ? "auto" : `${n}px`, this.currentHeight;
    },
    /**
       * Filter slot contents to slide instances and return length
       * @return {Number} The number of slides
       */
    getSlideCount() {
      return this.children.length;
    },
    /**
       * Gets the slide at the specified index
       * @return {Object} The slide at the specified index
       */
    getSlide(e) {
      return this.children[e];
    },
    /**
       * Set the current page to a specific value
       * This function will only apply the change if the value is within the carousel bounds
       * for carousel scrolling per page.
       * @param  {Number} page The value of the new page number
       * @param  {string|undefined} advanceType An optional value describing the type of page advance
       */
    goToPage(e, n) {
      e >= 0 && e <= this.pageCount && (this.offset = this.scrollPerPage ? Math.min(this.slideWidth * this.currentPerPage * e, this.maxOffset) : this.slideWidth * e, this.autoplay && !this.autoplayHoverPause && this.restartAutoplay(), this.currentPage = e, n === "pagination" && (this.pauseAutoplay(), this.$emit("pagination-click", e)));
    },
    /**
       * Trigger actions when mouse is pressed
       * @param  {Object} e The event object
       */
    /* istanbul ignore next */
    onStart(e) {
      e.button !== 2 && (document.addEventListener(this.isTouch ? "touchend" : "mouseup", this.onEnd, !0), document.addEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDrag, !0), this.startTime = e.timeStamp, this.dragging = !0, this.dragStartX = this.isTouch ? e.touches[0].clientX : e.clientX, this.dragStartY = this.isTouch ? e.touches[0].clientY : e.clientY);
    },
    /**
       * Trigger actions when mouse is released
       * @param  {Object} e The event object
       */
    onEnd(e) {
      this.autoplay && !this.autoplayHoverPause && this.restartAutoplay(), this.pauseAutoplay();
      const n = this.isTouch ? e.changedTouches[0].clientX : e.clientX, t = this.dragStartX - n;
      if (this.dragMomentum = t / (e.timeStamp - this.startTime), this.minSwipeDistance !== 0 && Math.abs(t) >= this.minSwipeDistance) {
        const i = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth;
        this.dragOffset += Math.sign(t) * (i / 2);
      }
      this.offset += this.dragOffset, this.dragOffset = 0, this.dragging = !1, this.render(), document.removeEventListener(this.isTouch ? "touchend" : "mouseup", this.onEnd, !0), document.removeEventListener(this.isTouch ? "touchmove" : "mousemove", this.onDrag, !0);
    },
    /**
       * Trigger actions when mouse is pressed and then moved (mouse drag)
       * @param  {Object} e The event object
       */
    onDrag(e) {
      const n = this.isTouch ? e.touches[0].clientX : e.clientX, t = this.isTouch ? e.touches[0].clientY : e.clientY, i = this.dragStartX - n, o = this.dragStartY - t;
      if (this.isTouch && Math.abs(i) < Math.abs(o))
        return;
      e.stopImmediatePropagation(), this.dragOffset = i;
      const s = this.offset + this.dragOffset;
      s < 0 ? this.dragOffset = -Math.sqrt(-this.resistanceCoef * this.dragOffset) : s > this.maxOffset && (this.dragOffset = Math.sqrt(this.resistanceCoef * this.dragOffset));
    },
    onResize() {
      this.computeCarouselWidth(), this.computeCarouselHeight(), this.dragging = !0, this.render(), setTimeout(() => {
        this.dragging = !1;
      }, this.refreshRate);
    },
    render() {
      this.offset += Math.max(-this.currentPerPage + 1, Math.min(
        Math.round(this.dragMomentum),
        this.currentPerPage - 1
      )) * this.slideWidth;
      const e = this.scrollPerPage ? this.slideWidth * this.currentPerPage : this.slideWidth, n = e * Math.floor(this.slideCount / (this.currentPerPage - 1)), t = n + this.slideWidth * (this.slideCount % this.currentPerPage);
      this.offset > (n + t) / 2 ? this.offset = t : this.offset = e * Math.round(this.offset / e), this.offset = Math.max(0, Math.min(this.offset, this.maxOffset)), this.currentPage = this.scrollPerPage ? Math.round(this.offset / this.slideWidth / this.currentPerPage) : Math.round(this.offset / this.slideWidth);
    },
    /**
       * Re-compute the width of the carousel and its slides
       */
    computeCarouselWidth() {
      this.getSlideCount(), this.getBrowserWidth(), this.getCarouselWidth(), this.setCurrentPageInBounds();
    },
    /**
       * Re-compute the height of the carousel and its slides
       */
    computeCarouselHeight() {
      this.getCarouselHeight();
    },
    /**
       * When the current page exceeds the carousel bounds, reset it to the maximum allowed
       */
    setCurrentPageInBounds() {
      if (!this.canAdvanceForward && this.scrollPerPage) {
        const e = this.pageCount - 1;
        this.currentPage = e >= 0 ? e : 0, this.offset = Math.max(0, Math.min(this.offset, this.maxOffset));
      }
    },
    handleTransitionStart() {
      this.$emit("transitionStart"), this.$emit("transition-start");
    },
    handleTransitionEnd() {
      this.$emit("transitionEnd"), this.$emit("transition-end");
    }
  },
  mounted() {
    window.addEventListener(
      "resize",
      eu(this.onResize, this.refreshRate)
    ), (this.isTouch && this.touchDrag || this.mouseDrag) && this.$refs["vu-carousel-wrapper"].addEventListener(
      this.isTouch ? "touchstart" : "mousedown",
      this.onStart
    ), this.attachMutationObserver(), this.computeCarouselWidth(), this.computeCarouselHeight(), this.transitionstart = Os(), this.$refs["vu-carousel-inner"].addEventListener(this.transitionstart, this.handleTransitionStart), this.transitionend = Os(), this.$refs["vu-carousel-inner"].addEventListener(this.transitionend, this.handleTransitionEnd), this.$emit("mounted"), this.autoplayDirection === "backward" && this.goToLastSlide();
  },
  beforeUnmount() {
    this.detachMutationObserver(), window.removeEventListener("resize", this.getBrowserWidth), this.$refs["vu-carousel-inner"].removeEventListener(
      this.transitionstart,
      this.handleTransitionStart
    ), this.$refs["vu-carousel-inner"].removeEventListener(
      this.transitionend,
      this.handleTransitionEnd
    ), this.$refs["vu-carousel-wrapper"].removeEventListener(
      this.isTouch ? "touchstart" : "mousedown",
      this.onStart
    );
  }
}, nu = { class: "vu-carousel" }, su = {
  class: "vu-carousel-wrapper",
  ref: "vu-carousel-wrapper"
}, iu = {
  key: 0,
  class: "carousel-indicators"
}, ou = ["onClick"];
function lu(e, n, t, i, o, s) {
  return l(), r("div", nu, [
    b("div", su, [
      b("div", {
        ref: "vu-carousel-inner",
        class: k([
          "vu-carousel-inner",
          { "vu-carousel-inner--center": s.isCenterModeEnabled }
        ]),
        style: G({
          transform: `translate(${s.currentOffset}px, 0)`,
          transition: o.dragging ? "none" : s.transitionStyle,
          "ms-flex-preferred-size": `${s.slideWidth}px`,
          "webkit-flex-basis": `${s.slideWidth}px`,
          "flex-basis": `${s.slideWidth}px`,
          visibility: s.slideWidth ? "visible" : "hidden",
          height: `${o.currentHeight}`,
          "padding-left": `${s.padding}px`,
          "padding-right": `${s.padding}px`
        })
      }, [
        C(e.$slots, "default")
      ], 6)
    ], 512),
    t.pagination && s.pageCount > 1 ? (l(), r("ol", iu, [
      (l(!0), r(M, null, U(s.pageCount, (a, u) => (l(), r("li", {
        key: `carousel-pagination_${u}`,
        class: k(["indicator", { active: u === o.currentPage }]),
        onClick: (c) => s.goToPage(u, "pagination")
      }, null, 10, ou))), 128))
    ])) : f("", !0)
  ]);
}
const au = /* @__PURE__ */ F(tu, [["render", lu]]), ru = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: au
}, Symbol.toStringTag, { value: "Module" })), ze = {
  exposes: ["validate"],
  props: {
    rules: {
      type: [Array],
      default: () => [() => !0]
    },
    required: {
      type: Boolean,
      default: () => !1
    },
    success: {
      type: Boolean,
      default: () => !1
    },
    lazyValidation: {
      type: Boolean,
      default: () => !1
    }
  },
  data: () => ({
    errorBucket: [],
    valid: !0,
    localRules: []
  }),
  inject: {
    vuDebug: {
      default: !1
    }
  },
  watch: {
    value(e) {
      this.lazyValidation || (this.valid = this.validate(e));
    }
  },
  computed: {
    classes() {
      return {
        "has-error": !this.valid,
        "has-success": this.success && this.valid
      };
    },
    hasError() {
      return this.errorBucket.length > 0;
    },
    hasSuccess() {
      return this.errorBucket.length === 0;
    },
    isValid() {
      if (!this.required)
        return !0;
      switch (typeof this.value) {
        case "string":
        case "array":
        case "number":
        case "date":
          return this.value.length !== 0;
        default:
          return !0;
      }
    }
  },
  methods: {
    validate(e, n) {
      const t = [];
      let i = 0;
      const o = e || this.value, s = [...this.localRules, ...this.rules];
      for (let a = 0; a < s.length; a++) {
        const u = s[a], c = typeof u == "function" ? u(o) : u;
        typeof c == "string" ? (t.push(c), i += 1) : typeof c == "boolean" && !c ? i += 1 : typeof c != "boolean" && this.vuDebug && console.error(`Rules should return a string or boolean, received '${typeof c}' instead`, this);
      }
      return n || (this.errorBucket = t), this.valid = i === 0 && this.isValid, this.valid;
    }
  }
}, uu = {
  data: () => ({
    inputs: []
  }),
  exposes: ["validate"],
  provide() {
    return {
      inputs: this.inputs
    };
  },
  methods: {
    validate(e) {
      return this.inputs.map((n) => n.validate(void 0, e)).reduce((n, t) => n && t, !0);
    }
  }
}, Ee = {
  inject: {
    inputs: {
      default: () => ""
    }
  },
  created() {
    typeof this.inputs == "object" && this.inputs.push(this);
  },
  beforeUnmount() {
    typeof this.inputs == "object" && this.inputs.splice(this.inputs.indexOf(this), 1);
  }
}, Ts = [...Array(256).keys()].map((e) => e.toString(16).padStart(2, "0")), gt = () => {
  const e = crypto.getRandomValues(new Uint8Array(16));
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, [...e.entries()].map(([n, t]) => [4, 6, 8, 10].includes(n) ? `-${Ts[t]}` : Ts[t]).join("");
}, du = {
  name: "vu-checkbox",
  mixins: [Fe, ze, Ee, $e],
  emits: ["update:modelValue"],
  inheritAttrs: !1,
  props: {
    dense: {
      type: Boolean,
      default: () => !1
    },
    switch: {
      type: Boolean,
      required: !1
    },
    type: {
      type: String,
      default: () => "checkbox"
    }
  },
  data: () => ({ uid: gt() }),
  computed: {
    internalClasses() {
      return {
        "toggle-switch": this.type === "switch",
        "toggle-primary": ["checkbox", "radio", "dense"].includes(this.type)
      };
    }
  },
  methods: {
    input(e) {
      if (this.options.length > 1 && this.type !== "radio") {
        if (e.target.checked)
          return this.$emit("update:modelValue", [e.target.value].concat(this.value));
        const n = JSON.parse(JSON.stringify(this.value));
        return n.splice(this.value.indexOf(e.target.value), 1), this.$emit("update:modelValue", n);
      }
      return this.$emit("update:modelValue", e.target.checked ? e.target.value : null);
    },
    isChecked(e) {
      return Array.isArray(this.value) ? this.value.includes(e) : this.type === "radio" ? this.value === e : !!this.value;
    }
  }
}, cu = {
  key: 0,
  class: "control-label"
}, hu = {
  key: 0,
  class: "label-field-required"
}, fu = ["type", "id", "value", "disabled", "checked"], pu = ["innerHTML", "for"], mu = {
  key: 1,
  class: "form-control-helper-text"
};
function vu(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["form-group", { dense: t.dense }])
  }, [
    e.label.length ? (l(), r("label", cu, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", hu, " *")) : f("", !0)
    ])) : f("", !0),
    (l(!0), r(M, null, U(e.options, (a, u) => (l(), r("div", {
      key: `${e.uid}-${a.value}-${u}`,
      class: k(["toggle", s.internalClasses])
    }, [
      (l(), r("input", {
        type: t.type === "radio" ? "radio" : "checkbox",
        id: `${e.uid}-${a.value}-${u}`,
        value: a.value,
        disabled: e.disabled || a.disabled,
        checked: s.isChecked(a.value),
        key: s.isChecked(a.value),
        onClick: n[0] || (n[0] = re((...c) => s.input && s.input(...c), ["prevent"]))
      }, null, 8, fu)),
      b("label", {
        class: "control-label",
        innerHTML: a.label,
        for: `${e.uid}-${a.value}-${u}`
      }, null, 8, pu),
      C(e.$slots, "prepend-icon", { item: a }, void 0, !0)
    ], 2))), 128)),
    (l(!0), r(M, null, U(e.errorBucket, (a, u) => (l(), r("span", {
      key: `${u}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(a), 1))), 128)),
    e.helper.length ? (l(), r("span", mu, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const yi = /* @__PURE__ */ F(du, [["render", vu], ["__scopeId", "data-v-d2a89048"]]), gu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yi
}, Symbol.toStringTag, { value: "Module" }));
function bu(e, n = {}) {
  const {
    onVisibleChange: t = Be,
    onShow: i = Be,
    onHide: o = Be,
    attach: s,
    target: a
  } = n, u = Y(() => ye(e)), c = Y(() => ye(s)), d = Y(() => ye(a)), h = x(!0), p = x(!1), _ = x({ x: 0, y: 0 }), v = () => setTimeout(() => p.value = !0, 10), y = () => {
    const q = !p.value;
    p.value = !1, q && o();
  }, L = ni(u, { width: 0, height: 0 }, { box: "border-box" }), B = ln(c), R = Y(() => s !== document.body), ee = fl({
    includeScrollbar: !1
  }), ce = Y(() => Math.max(B.top.value, 0)), Z = Y(() => Math.min(B.right.value, ee.width.value)), D = Y(() => {
    let [q, te, he, we] = [
      `${_.value.x}px`,
      `${_.value.y}px`,
      null,
      null
    ];
    const Se = _.value.x + L.width.value > Z.value, Ve = _.value.y + L.height.value > ee.height.value;
    if (Se && (q = `${B.right.value - (R.value ? 0 : _.value.x) - L.width.value}px`), Ve)
      if (B.height.value - _.value.y > 0) {
        const He = ee.height.value - _.value.y;
        _.value.y - ce.value < He ? [te, we] = [`${ce.value}px`, null] : [te, we] = [null, `${ee.height.value - ee.height.value}px`];
      } else
        [te, we] = [null, `${ee.height.value - _.value.y}px`];
    return {
      left: q,
      top: te,
      right: he,
      bottom: we
    };
  });
  function P() {
    var he;
    const q = [];
    let te = (he = ie(d)) == null ? void 0 : he.parentElement;
    for (; te; ) {
      const { overflow: we } = window.getComputedStyle(te), Se = we.split(" ");
      ["auto", "scroll"].some((Ve) => Se.includes(Ve)) && q.push(te), te = te.parentElement;
    }
    return q;
  }
  le(h, y), le(p, t);
  const z = [jt(
    () => {
      const q = u.value;
      if (q) {
        q.style.position = "fixed", q.style.visibility = p.value ? "visible" : "hidden";
        for (const [te, he] of Object.entries(D.value))
          q.style.setProperty(te, he);
      }
    },
    { flush: "post" }
  )], se = [], j = [], oe = () => {
    h.value = !1, Gt(() => {
      z.concat(se, j).forEach((q) => q());
    });
  }, fe = (q) => {
    i(), !(!h.value || q != null && q._prevent) && (q.preventDefault(), _.value = {
      x: q.clientX,
      y: q.clientY
    }, v(), q._prevent = !0);
  }, Ie = jt(() => {
    if (se.forEach((q) => q()), se.splice(0, se.length), p.value && (se.push(
      pe("scroll", y),
      pe("click", y),
      pe("contextmenu", y, { capture: !0 })
    ), ie(c) && se.push(pe(ie(c), "scroll", y)), ie(d))) {
      const q = P();
      se.push(...q.map((te) => pe(te, "scroll", y)));
    }
  }), E = jt(() => {
    j.forEach((q) => q()), j.splice(0, j.length), d ? j.push(pe(ie(d) || document.body, "contextmenu", fe)) : j.push(pe("contextmenu", fe));
  });
  return z.push(Ie, E), {
    visible: p,
    position: _,
    enabled: h,
    hide: y,
    show: v,
    stop: oe
  };
}
const yu = {
  name: "vu-contextual-dropdown"
}, _u = /* @__PURE__ */ Ae({
  ...yu,
  props: {
    /**
     * The area where the right-click will be listened to.
     * @default document.body
     */
    target: {
      type: Object,
      // [Boolean, String, Element],
      default: void 0
    },
    /**
     * Selected items.
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     * List of items to render.
     */
    items: {
      type: Array,
      required: !0
    },
    /**
     * In responsive-mode, separates sub-menu open icon with item text.
     * Useful when an item with a sub-menu is selectable.
     */
    dividedResponsiveItems: {
      type: Boolean,
      default: !1
    },
    /**
     * Allows to tweak z-Index value.
     */
    zIndex: {
      type: Number,
      default: () => 1e3
    },
    /**
     * Should the menu close on item click.
     */
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    /**
     * Prevents menu to position itself horizontally outside these boundaries.
     * @default document.body
     */
    attach: {
      type: [Boolean, String, Element, Object],
      default: void 0
    }
  },
  emits: ["close", "click-item"],
  setup(e, { expose: n, emit: t }) {
    const i = e, o = t, s = x(!1), a = x(), u = Y(() => ye(i.target)), c = Y(() => ye(i.attach)), d = Y(() => (c == null ? void 0 : c.value) || document.body);
    function h() {
      s.value = !1;
    }
    function p() {
      o("close", void 0);
    }
    const { position: _, visible: v, show: y, hide: L, stop: B } = bu(a, {
      attach: d,
      target: u,
      onShow: h,
      onHide: p
    });
    function R(ee) {
      ee.handler && ee.handler(ee), o("click-item", ee), i.closeOnClick && (L(), s.value = !1);
    }
    return n({
      show: y,
      hide: L,
      stop: B
    }), (ee, ce) => (l(), S(Nn, {
      to: d.value,
      disabled: !d.value
    }, [
      K(v) ? (l(), S(Xt, J({
        key: 0,
        ref_key: "menu",
        ref: a,
        responsive: s.value,
        "onUpdate:responsive": ce[0] || (ce[0] = (Z) => s.value = Z),
        position: K(_),
        "onUpdate:position": ce[1] || (ce[1] = (Z) => bo(_) ? _.value = Z : null),
        "divided-responsive-items": e.dividedResponsiveItems
      }, {
        items: e.items,
        zIndex: e.zIndex
      }, {
        target: d.value,
        selected: e.value,
        onClickItem: R
      }), null, 16, ["responsive", "position", "divided-responsive-items", "target", "selected"])) : f("", !0)
    ], 8, ["to", "disabled"]));
  }
}), wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _u
}, Symbol.toStringTag, { value: "Module" })), rs = (e) => e instanceof Date && !Number.isNaN(e.getTime()), ku = (e) => e % 4 === 0 && e % 100 !== 0 || e % 400 === 0, Su = (e, n) => [31, ku(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n], xs = (e, n) => e.getTime() === n.getTime(), Iu = (e) => {
  let n;
  if (rs(e))
    n = e;
  else if (e && typeof e == "string")
    try {
      n = new Date(Date.parse(e));
    } catch {
    }
  return n;
}, hn = {
  emits: ["update:modelValue", "boundary-change"],
  props: {
    modelValue: {
      type: [null, Date, Array],
      default: null
    },
    min: {
      type: [Number, Date],
      default: () => -22089888e5
      // 1900-01-01Z00:00:00.000Z
    },
    max: {
      type: [Number, Date],
      default: () => 4102444799999
      // 2099-12-31T23:59:59.999Z
    }
  },
  data: () => ({
    getListenersFromAttrs: Ze
  }),
  watch: {
    min: {
      handler(e) {
        this.checkBoundary(e, "min");
      },
      immediate: !0
    },
    max: {
      handler(e) {
        this.checkBoundary(e, "max");
      },
      immediate: !0
    }
  },
  methods: {
    setBoundary(e, n) {
      return [
        n === "min" ? this.value[0] < e : this.value[0] > e,
        n === "min" ? this.value[1] < e : this.value[1] > e
      ].map((i, o) => i ? e : this.value[o]);
    },
    anyOutOfRange(e, n) {
      return this.value.some((t) => n === "min" ? t < e : t > e);
    },
    checkBoundary(e, n) {
      if (!this.value)
        return;
      const t = this.getListenersFromAttrs(this.$attrs)["boundary-change"] ? "boundary-change" : "update:modelValue";
      (Array.isArray(this.value) && this.anyOutOfRange(e, n) || ["min"].includes(n) && this.value < e || ["max"].includes(n) && this.value > e) && (rs(e) ? this.$emit(t, t === "update:modelValue" ? new Date(e) : { boundary: n, value: new Date(e) }) : this.$emit(t, t === "update:modelValue" ? this.setBoundary(e, n) : { boundary: n, value: e }));
    }
  }
}, Cu = {
  name: "vu-datepicker-table-date",
  mixins: [hn],
  emits: ["select"],
  props: {
    date: {
      type: Date
    },
    year: {
      type: Number,
      required: !0
    },
    month: {
      type: Number,
      required: !0
    },
    unselectableDaysOfWeek: {
      type: Array[Number],
      default: () => []
    },
    firstDay: {
      type: Number,
      default: () => 0
    },
    showWeekNumber: {
      type: Boolean,
      required: !1
    },
    isRTL: {
      type: Boolean,
      required: !1
    },
    // i18n
    weekdaysLabels: {
      type: Array,
      required: !0
    },
    weekdaysShortLabels: {
      type: Array,
      required: !0
    }
  },
  methods: {
    renderTable(e) {
      return Ue("table", {
        class: "datepicker-table",
        attrs: { cellspacing: "0", cellpadding: "0" }
      }, [
        this.renderHead(),
        this.renderBody(e)
      ]);
    },
    renderHead() {
      const e = [];
      for (let n = 0; n < 7; n++) {
        const t = Ue("th", {
          attrs: { scope: "col", cellspacing: "0", cellpadding: "0" }
        }, [
          Ue("abbr", {
            attrs: {
              title: this.renderDayName(n)
            }
          }, this.renderDayName(n, !0))
        ]);
        e.push(t);
      }
      return Ue("thead", {}, e);
    },
    renderBody(e) {
      return Ue("tbody", {}, e);
    },
    renderWeek(e, n, t) {
      const i = new Date(t, 0, 1), o = Math.ceil(((new Date(t, n, e) - i) / 864e5 + i.getDay() + 1) / 7), s = `datepicker${this.week}`;
      return Ue("td", { class: s }, o);
    },
    renderDayName(e, n) {
      let t = e + this.firstDay;
      for (; t >= 7; )
        t -= 7;
      return n ? this.weekdaysShortLabels[t] : this.weekdaysLabels[t];
    },
    renderDay(e, n, t, i, o, s, a) {
      const u = [];
      return a ? Ue("td", { class: "is-empty" }) : (s && u.push("is-disabled"), o && u.push("is-today"), i && u.push("is-selected"), Ue("td", {
        class: u.join(" "),
        attrs: {
          "data-day": e
        }
      }, [
        Ue("button", {
          class: "datepicker-button datepicker-name",
          type: "button",
          "data-year": t,
          "data-month": n,
          "data-day": e,
          onClick: this.onSelect
        }, e)
      ]));
    },
    renderRow(e) {
      return Ue("tr", {}, e);
    },
    onSelect(e) {
      const n = e.target.getAttribute("data-year"), t = e.target.getAttribute("data-month"), i = e.target.getAttribute("data-day");
      this.$emit("select", new Date(n, t, i));
    }
  },
  render() {
    const e = /* @__PURE__ */ new Date();
    e.setHours(0, 0, 0, 0);
    const n = Su(this.year, this.month);
    let t = new Date(this.year, this.month, 1).getDay();
    const i = [];
    let o = [], s, a;
    for (this.firstDay > 0 && (t -= this.firstDay, t < 0 && (t += 7)), s = n + t, a = s; a > 7; )
      a -= 7;
    s += 7 - a;
    for (let u = 0, c = 0; u < s; u++) {
      const d = new Date(this.year, this.month, 1 + (u - t)), h = Date.parse(this.min), p = Date.parse(this.max), _ = h && d < h || p && d > p || this.unselectableDaysOfWeek && this.unselectableDaysOfWeek.indexOf(d.getDay()) > -1, v = rs(this.date) ? xs(d, this.date) : !1, y = xs(d, e), L = u < t || u >= n + t;
      o.push(this.renderDay(1 + (u - t), this.month, this.year, v, y, _, L)), ++c === 7 && (this.showWeekNumber && o.unshift(this.renderWeek(u - t, this.month, this.year)), i.push(this.renderRow(o, this.isRTL)), o = [], c = 0);
    }
    return this.renderTable(i);
  }
}, Bu = {
  name: "vu-datepicker",
  mixins: [xt, hn],
  components: {
    "vu-datepicker-table-date": Cu
  },
  props: {
    className: { type: String, default: "" },
    modelValue: {
      type: [String, Date],
      default: () => ""
    },
    unselectableDaysOfWeek: {
      type: Array[Number],
      default: () => []
    },
    yearRange: {
      type: Number,
      default: () => 10
    },
    firstDay: {
      type: Number,
      default: () => 1
    },
    // i18n
    previousMonthLabel: {
      type: String,
      default: () => "Next Month"
    },
    nextMonthLabel: {
      type: String,
      default: () => "Previous Month"
    },
    monthsLabels: {
      type: Array,
      default: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    weekdaysLabels: {
      type: Array,
      default: () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    weekdaysShortLabels: {
      type: Array,
      default: () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    },
    showWeekNumber: {
      type: Boolean,
      required: !1
    },
    isRTL: {
      type: Boolean,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  data: () => ({
    left: 0,
    top: 38,
    month: 0,
    year: 0
  }),
  computed: {
    date: {
      get() {
        return this.modelValue;
      },
      set(e) {
        return this.$emit("update:modelValue", e);
      }
    },
    isEmpty() {
      return this.value === null || this.value === "" || this.value === void 0;
    },
    currentMonth() {
      return this.monthsLabels[this.month];
    },
    minYear() {
      return new Date(this.min).getFullYear();
    },
    minMonth() {
      return new Date(this.min).getMonth();
    },
    maxYear() {
      return new Date(this.max).getFullYear();
    },
    maxMonth() {
      return new Date(this.max).getMonth();
    },
    hasPrevMonth() {
      return !(this.year === this.minYear && (this.month === 0 || this.minMonth >= this.month));
    },
    hasNextMonth() {
      return !(this.year === this.maxYear && (this.month === 11 || this.maxMonth <= this.month));
    },
    selectableMonths() {
      return this.monthsLabels.map((e, n) => {
        const t = this.year === this.minYear && n < this.minMonth || this.year === this.maxYear && n > this.maxMonth;
        return {
          value: n,
          label: e,
          disabled: t
        };
      });
    },
    selectableYears() {
      const e = Math.max(this.year - this.yearRange, this.minYear), n = Math.min(this.year + 1 + this.yearRange, this.maxYear + 1);
      return Array(n - e).fill({}).map((i, o) => ({ value: e + o }));
    }
  },
  watch: {
    innerShow(e) {
      e && this.setCurrent();
    },
    value() {
      this.innerShow && this.setCurrent();
    },
    month(e) {
      e > 11 ? (this.year++, this.month = 0) : e < 0 && (this.month = 11, this.year--);
    }
  },
  methods: {
    setCurrent() {
      const e = Iu(this.date) || /* @__PURE__ */ new Date();
      this.month = e.getMonth(), this.year = e.getFullYear();
    },
    onSelect(e) {
      this.month = e.getMonth(), this.year = e.getFullYear(), this.date = e;
    }
  }
}, $u = { class: "datepicker-calendar" }, Ou = { class: "datepicker-title" }, Tu = { class: "datepicker-label" }, xu = ["disabled", "value"], Mu = { class: "datepicker-label" }, Vu = ["disabled", "value"];
function Pu(e, n, t, i, o, s) {
  const a = $("vu-datepicker-table-date");
  return e.innerShow ? (l(), r("div", {
    key: 0,
    class: k(["datepicker datepicker-root", t.className])
  }, [
    b("div", $u, [
      b("div", Ou, [
        b("div", Tu, [
          X(w(s.currentMonth) + " ", 1),
          H(b("select", {
            class: "datepicker-select datepicker-select-month",
            "onUpdate:modelValue": n[0] || (n[0] = (u) => e.month = u)
          }, [
            (l(!0), r(M, null, U(s.selectableMonths, (u) => (l(), r("option", {
              key: u.value,
              disabled: u.disabled,
              value: u.value
            }, w(u.label), 9, xu))), 128))
          ], 512), [
            [Ss, e.month]
          ])
        ]),
        b("div", Mu, [
          X(w(e.year) + " ", 1),
          H(b("select", {
            class: "datepicker-select datepicker-select-year",
            "onUpdate:modelValue": n[1] || (n[1] = (u) => e.year = u)
          }, [
            (l(!0), r(M, null, U(s.selectableYears, (u) => (l(), r("option", {
              key: u.value,
              disabled: u.disabled,
              value: u.value
            }, w(u.value), 9, Vu))), 128))
          ], 512), [
            [Ss, e.year]
          ])
        ]),
        b("button", {
          class: k(["datepicker-prev", { "is-disabled": !s.hasPrevMonth }]),
          type: "button",
          onClick: n[2] || (n[2] = (u) => s.hasPrevMonth && e.month--)
        }, w(t.previousMonthLabel), 3),
        b("button", {
          class: k(["datepicker-next", { "is-disabled": !s.hasNextMonth }]),
          type: "button",
          onClick: n[3] || (n[3] = (u) => s.hasNextMonth && e.month++)
        }, w(t.nextMonthLabel), 3)
      ]),
      T(a, {
        date: s.date,
        year: e.year,
        month: e.month,
        min: e.min,
        max: e.max,
        "first-day": t.firstDay,
        "unselectable-days-of-week": t.unselectableDaysOfWeek,
        "months-labels": t.monthsLabels,
        "show-week-number": t.showWeekNumber,
        "is-r-t-l": t.isRTL,
        "weekdays-labels": t.weekdaysLabels,
        "weekdays-short-labels": t.weekdaysShortLabels,
        onSelect: n[4] || (n[4] = (u) => s.onSelect(u))
      }, null, 8, ["date", "year", "month", "min", "max", "first-day", "unselectable-days-of-week", "months-labels", "show-week-number", "is-r-t-l", "weekdays-labels", "weekdays-short-labels"])
    ])
  ], 2)) : f("", !0);
}
const _i = /* @__PURE__ */ F(Bu, [["render", Pu]]), Lu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _i
}, Symbol.toStringTag, { value: "Module" })), Du = { class: "vu-dropzone__span" }, Au = {
  name: "vu-dropzone"
}, Fu = /* @__PURE__ */ Ae({
  ...Au,
  props: {
    icon: { default: "drag-drop" },
    color: { default: "grey-light" },
    label: {},
    noHover: { type: Boolean },
    dashed: { type: Boolean, default: !1 },
    centered: { type: Boolean, default: !1 },
    addHoverClass: { type: Boolean, default: !0 },
    hoverClassName: {}
  },
  emits: ["drop", "dragover", "dragleave"],
  setup(e, { emit: n }) {
    const t = e, i = n, o = x(!1), s = x(), a = Y(() => {
      var c;
      return (c = s.value) != null && c.clientHeight ? s.value.clientHeight % 4 : 0;
    }), u = Y(() => Number(a == null ? void 0 : a.value) !== Number.NaN && a.value / 2 || 0);
    return le(() => t.noHover, (c) => {
      c && (o.value = !1);
    }), (c, d) => (l(), r("div", {
      ref_key: "container",
      ref: s,
      class: k(["vu-dropzone animated fade-in", [
        c.color && `vu-dropzone--${c.color}`,
        c.addHoverClass && o.value && c.hoverClassName,
        { "vu-dropzone--centered": c.centered },
        { "vu-dropzone--hover": o.value && !c.noHover },
        { "no-hover": c.noHover },
        "relative"
      ]]),
      onDragover: d[0] || (d[0] = (h) => {
        (c.addHoverClass || !c.noHover) && (o.value = !0), i("dragover", h);
      }),
      onDragleave: d[1] || (d[1] = (h) => {
        const p = h == null ? void 0 : h.relatedTarget;
        s.value !== p && !s.value.contains(p) && ((c.addHoverClass || !c.noHover) && (o.value = !1), i("dragleave", h));
      }),
      onDrop: d[2] || (d[2] = (h) => {
        i("drop", h), o.value = !1;
      })
    }, [
      C(c.$slots, "default", {}, () => [
        T(ue, {
          class: k(["vu-dropzone__icon flex-grow-0", {
            centered: c.centered
          }]),
          icon: c.icon,
          withinText: !1
        }, null, 8, ["class", "icon"]),
        b("span", Du, w(c.label), 1)
      ], !0),
      b("div", {
        class: k([
          {
            "vu-dropzone--dashed": c.dashed
          },
          "absolute top-0 bottom-0 left-0 right-0"
        ]),
        style: G(u.value && `margin-top:${u.value}px;margin-bottom:${u.value}px` || "")
      }, null, 6)
    ], 34));
  }
}), kt = /* @__PURE__ */ F(Fu, [["__scopeId", "data-v-47562872"]]), zu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kt
}, Symbol.toStringTag, { value: "Module" })), Eu = {
  name: "vu-facets-bar",
  emits: ["update:modelValue"],
  components: { VuDropdownMenu: rt, VuIconBtn: de, VuPopover: Ge, VuBtn: Ye, VuIcon: ue },
  props: {
    modelValue: {
      type: Object,
      default: () => {
      }
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    uuidv4: gt,
    throttle: Pn,
    hideLabels: !1,
    forceOverflow: !1,
    showFromIndex: 0,
    hiddenFacets: 0,
    intersectionObserver: void 0,
    iconsIntersectionObserver: void 0,
    resizeObserver: void 0,
    onResizeThrottled: null,
    paddingForLongestFacet: 0
  }),
  mounted() {
    this.intersectionObserver = new IntersectionObserver(this.onLabelIntersects, {
      root: this.$refs.container,
      threshold: 1
    }), this.labelIntersectionObserver = new IntersectionObserver(this.onPaddingIntersects, {
      root: this.$refs.container
    }), this.iconsIntersectionObserver = new IntersectionObserver(this.onIconIntersects, {
      root: this.$refs.container,
      threshold: [0, 1],
      rootMargin: "0px -32px 0px 0px"
    }), this.onResizeThrottled = Pn(this.onResize.bind(this), 200), this.resizeObserver = new ResizeObserver(this.onResizeThrottled), this.intersectionObserver.observe(this.$refs.inner), this.resizeObserver.observe(this.$refs.container);
  },
  beforeUnmount() {
    this.intersectionObserver && this.intersectionObserver.disconnect(), this.labelIntersectionObserver && this.iconsIntersectionObserver.disconnect(), this.iconsIntersectionObserver && this.iconsIntersectionObserver.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), delete this.intersectionObserver, delete this.iconsIntersectionObserver;
  },
  computed: {
    visibleItems() {
      return this.hiddenFacets ? this.items.slice(this.showFromIndex, this.showFromIndex + this.visibleFacets) : this.items;
    },
    overflowMenuItems() {
      return this.items.map((e) => ({ ...e, fonticon: e.icon, item: e, selected: this.modelValue === e }));
    },
    visibleFacets() {
      return this.items.length - this.hiddenFacets;
    }
  },
  watch: {
    modelValue(e) {
      (this.hiddenFacets || this.forceOverflow) && this.showActiveFacet(e);
    },
    items(e, n) {
      ((e == null ? void 0 : e.length) !== (n == null ? void 0 : n.length) || e.some((t, i) => t.text !== n[i].text)) && this.onResize();
    }
  },
  methods: {
    // First check if all label display is possible
    async onLabelIntersects(e) {
      var n, t;
      this.intersectionObserver.unobserve(this.$refs.inner), ((n = e == null ? void 0 : e[0]) == null ? void 0 : n.intersectionRatio) < 1 && !this.hideLabels && (this.calcPaddingForLongestFacet(), this.hideLabels = !0, await this.$nextTick(), (t = this.$refs) != null && t.labelPadding && this.labelIntersectionObserver.observe(this.$refs.labelPadding));
    },
    // Then check if the longest label will not lead to overflow
    async onPaddingIntersects(e) {
      const n = this.$refs.labelPadding;
      e != null && e[0] && !this.forceOverflow && e[0] && (this.labelIntersectionObserver.unobserve(n), e[0].intersectionRatio < 1 && (this.forceOverflow = !0, this.paddingForLongestFacet = 0, await this.$nextTick(), this.$refs.facets.map(({ $el: i }) => i).forEach((i) => this.iconsIntersectionObserver.observe(i))));
    },
    // Finally check if all icons fit
    async onIconIntersects(e) {
      if (e != null && e.length) {
        const n = this.$refs.facets.map(({ $el: i }) => i), t = e.filter(({ target: i }) => i.parentNode).filter((i) => i.intersectionRatio < 1);
        this.hiddenFacets += t.length, n.forEach((i) => {
          try {
            this.iconsIntersectionObserver.unobserve(i);
          } catch {
          }
        });
      }
    },
    onResize() {
      this.showFromIndex = 0, this.hiddenFacets = 0, this.hideLabels = !1, this.forceOverflow = !1, this.paddingForLongestFacet = 0, this.intersectionObserver.observe(this.$refs.inner);
    },
    calcPaddingForLongestFacet() {
      const e = this.$refs.facets.map(({ $el: i }) => i), n = e.reduce((i, o) => Math.max(o.clientWidth, i), 0), t = e.find((i) => i.classList.contains("facet--selected"));
      this.paddingForLongestFacet = n - t.clientWidth + 38;
    },
    showActiveFacet(e) {
      const n = this.items.indexOf(e);
      let t = n;
      n > this.visibleFacets - 1 && (t = n - this.visibleFacets + 2), this.showFromIndex = Math.min(t, this.items.length - this.visibleFacets);
    }
  }
}, Nu = {
  class: "vu-facets-bar",
  ref: "container"
}, Ru = {
  class: "facets-bar__inner",
  ref: "inner"
};
function Hu(e, n, t, i, o, s) {
  const a = $("VuIcon"), u = $("VuPopover"), c = $("VuBtn"), d = $("VuIconBtn"), h = $("VuDropdownMenu");
  return l(), r("div", Nu, [
    b("div", Ru, [
      (l(!0), r(M, null, U(s.visibleItems, (p) => (l(), S(c, {
        key: `${e.uuidv4()}`,
        ref_for: !0,
        ref: "facets",
        class: k([
          "facet",
          {
            default: p !== t.modelValue,
            "facet--selected": p === t.modelValue,
            "facet--unselected": p !== t.modelValue
          }
        ]),
        style: G(e.hiddenFacets ? "max-width: calc(100% - 38px)" : ""),
        onClick: (_) => e.$emit("update:modelValue", p)
      }, {
        default: V(() => [
          (!e.hideLabels || p === t.modelValue) && !e.forceOverflow ? (l(), r(M, { key: 0 }, [
            p.icon ? (l(), S(a, {
              key: 0,
              icon: p.icon,
              active: p === t.modelValue
            }, null, 8, ["icon", "active"])) : f("", !0),
            b("span", null, w(p.text), 1)
          ], 64)) : (l(), S(u, {
            key: 1,
            type: "tooltip",
            hover: "",
            arrow: ""
          }, {
            default: V(() => [
              p.icon ? (l(), S(a, {
                key: 0,
                icon: p.icon
              }, null, 8, ["icon"])) : f("", !0)
            ]),
            body: V(() => [
              X(w(p.text), 1)
            ]),
            _: 2
          }, 1024))
        ]),
        _: 2
      }, 1032, ["class", "style", "onClick"]))), 128)),
      e.hiddenFacets || e.forceOverflow ? (l(), S(h, {
        key: 0,
        shift: !0,
        class: "vu-facets-bar__dropdownmenu",
        items: s.overflowMenuItems,
        model: t.modelValue,
        "onUpdate:modelValue": n[0] || (n[0] = (p) => e.$emit("update:modelValue", p.item)),
        onClickItem: n[1] || (n[1] = (p) => e.$emit("update:modelValue", p.item))
      }, {
        default: V(() => [
          T(d, { icon: "menu-dot" })
        ]),
        _: 1
      }, 8, ["items", "model"])) : f("", !0),
      !e.hiddenFacets && e.hideLabels && !e.forceOverflow ? (l(), r("span", {
        key: 1,
        style: G([[{ width: `${e.paddingForLongestFacet}px` }], { display: "inline-block", height: "10px" }]),
        ref: "labelPadding"
      }, null, 4)) : f("", !0)
    ], 512)
  ], 512);
}
const ju = /* @__PURE__ */ F(Eu, [["render", Hu], ["__scopeId", "data-v-53e487be"]]), Uu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ju
}, Symbol.toStringTag, { value: "Module" })), Wu = {
  name: "vu-form",
  mixins: [uu]
};
function qu(e, n, t, i, o, s) {
  return l(), r("form", {
    novalidate: "novalidate",
    class: "form form-root",
    onSubmit: re(() => {
    }, ["prevent"])
  }, [
    C(e.$slots, "default")
  ], 32);
}
const wi = /* @__PURE__ */ F(Wu, [["render", qu]]), Ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wi
}, Symbol.toStringTag, { value: "Module" })), Gu = {
  props: {
    elevated: {
      type: Boolean,
      default: !1
    }
  }
}, ki = {
  props: {
    clearable: {
      type: Boolean,
      default: () => !1
    }
  }
}, In = {
  offline: "status-empty",
  online: "status-ok",
  busy: "status-noway",
  away: "status-clock"
}, Yu = {
  name: "vu-user-picture",
  inject: [
    "vuUserPictureSrcUrl"
  ],
  props: {
    size: {
      type: String,
      default: "medium",
      validator: (e) => ["tiny", "small", "medium", "medium-1", "big", "bigger", "large", "extra-large"].includes(e)
    },
    circle: {
      type: Boolean,
      default: !0
    },
    clickable: {
      type: Boolean,
      default: !1
    },
    gutter: {
      type: Boolean,
      default: !1
    },
    hoverable: {
      type: Boolean,
      default: !1
    },
    inheritBackground: {
      type: Boolean,
      default: !0
    },
    // eslint-disable-next-line vue/require-default-prop
    presence: {
      type: String,
      required: !1,
      validator: (e) => e ? In[e] !== void 0 : !0
    },
    src: {
      type: String,
      required: !1,
      default: void 0
    },
    id: {
      type: String,
      required: !1,
      default: void 0
    }
  },
  data: () => ({
    presenceStates: In,
    hovered: !1
  }),
  watch: {
    hoverable: {
      // eslint-disable-next-line object-shorthand, func-names
      handler: function(e) {
        !e && this.hovered && (this.hovered = !1);
      }
    }
  },
  computed: {
    fonticon() {
      return this.presence && In[this.presence];
    },
    _src() {
      return this.vuUserPictureSrcUrl && this.id && !this.src ? `${this.vuUserPictureSrcUrl}/${this.id}` : this.src;
    }
  }
}, Xu = {
  key: 0,
  class: "vu-user-picture__hover-mask"
}, Ju = {
  key: 1,
  class: "vu-presence"
};
function Zu(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["vu-user-picture", [t.size ? `vu-user-picture--${t.size}` : "", {
      "vu-user-picture--gutter": t.gutter,
      "vu-user-picture--circle": t.circle,
      "vu-user-picture--clickable": t.clickable,
      "vu-user-picture--bg-inherit": t.inheritBackground
    }]]),
    onMouseover: n[0] || (n[0] = () => {
      t.hoverable && (e.hovered = !0);
    }),
    onMouseleave: n[1] || (n[1] = () => {
      t.hoverable && (e.hovered = !1);
    })
  }, [
    b("div", {
      class: "vu-user-picture-wrap",
      style: G([t.presence ? { background: "inherit" } : ""])
    }, [
      b("div", {
        class: "vu-user-picture__image",
        style: G({ "background-image": `url(${s._src})` })
      }, null, 4),
      e.hovered ? (l(), r("div", Xu)) : f("", !0),
      t.size !== "tiny" ? (l(), r("div", Ju, [
        b("div", {
          class: k(`vu-presence__indicator vu-presence__indicator--${t.presence}`)
        }, null, 2)
      ])) : f("", !0)
    ], 4)
  ], 34);
}
const $t = /* @__PURE__ */ F(Yu, [["render", Zu], ["__scopeId", "data-v-24c158c9"]]), Qu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $t
}, Symbol.toStringTag, { value: "Module" })), ed = {
  name: "vu-select-options",
  props: {
    options: {
      type: Array,
      required: !0
    },
    multiple: {
      type: Boolean,
      required: !1
    },
    user: {
      type: Boolean,
      required: !1
    },
    selected: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    keyIndex: {
      type: Number,
      default: () => -1
    },
    forceHasIcon: {
      type: Boolean
    },
    searchField: {
      type: Boolean
    }
  },
  expose: ["focus", "liRefs"],
  emits: ["click-item", "select-keydown", "change"],
  data: () => ({
    uid: gt,
    liRefs: {}
  }),
  computed: {
    anyHasIcon() {
      return this.forceHasIcon || this.options.some((e) => e.icon || e.fonticon);
    }
  },
  methods: {
    focus() {
      var e;
      (e = this.$refs.nativeSelect) == null || e.focus();
    }
  },
  components: { VuIcon: ue, VuIconBtn: de, VuUserPicture: $t }
}, td = ["label", "selected"], nd = ["value", "selected", "disabled"], sd = { class: "option__text" }, id = ["disabled", "onMouseenter", "onMouseleave", "onClick"], od = {
  key: 0,
  class: "flex"
}, ld = { class: "option__text" }, ad = { class: "option__text" };
function rd(e, n, t, i, o, s) {
  const a = $("VuUserPicture"), u = $("VuIcon"), c = $("VuIconBtn"), d = _e("tooltip");
  return l(), r("ul", {
    class: k(["vu-select-options", { "select-options--multiple": t.multiple, "select-options--single": !t.multiple, "select-options--user": t.user, "options--has-icon": s.anyHasIcon }])
  }, [
    b("select", {
      ref: "nativeSelect",
      class: "select-hidden",
      onKeydown: n[0] || (n[0] = (h) => e.$emit("select-keydown", h)),
      onChange: n[1] || (n[1] = () => {
        const h = e.$refs.nativeSelect.value;
        h === "__placeholder__" ? e.$emit("change", void 0) : e.$emit("change", h);
      })
    }, [
      b("option", {
        value: "__placeholder__",
        label: t.placeholder,
        selected: t.selected[0] === void 0 || t.selected === ""
      }, null, 8, td),
      (l(!0), r(M, null, U(t.options, (h) => (l(), r("option", {
        key: `${e.uid}-${h.value || h.label}`,
        value: h.value || h.label,
        selected: h.selected || t.selected.includes(h),
        disabled: h.disabled
      }, w(h.label), 9, nd))), 128))
    ], 544),
    !t.multiple && t.placeholder ? (l(), r("li", {
      key: 0,
      class: k([{ "option--selected": t.selected[0].value === void 0 }, "option__placeholder"]),
      onClick: n[2] || (n[2] = (h) => e.$emit("click-item", { value: "" }))
    }, [
      b("span", sd, w(t.placeholder), 1)
    ], 2)) : f("", !0),
    (l(!0), r(M, null, U(t.options, (h, p, _) => (l(), r("li", {
      key: `${h.id || e.uid()}`,
      ref_for: !0,
      ref: (v) => {
        e.liRefs[h.value] = v;
      },
      class: k({
        "option--selected": h.selected || t.selected.includes(h),
        "option--keyboard": p === t.keyIndex,
        "option--hovered": _,
        "option--no-icon": s.anyHasIcon && !(h.icon || h.fonticon)
      }),
      disabled: h.disabled,
      onMouseenter: (v) => _ = !0,
      onMouseleave: (v) => _ = !1,
      onClick: (v) => !h.disabled && e.$emit("click-item", h)
    }, [
      t.user ? (l(), r("div", od, [
        T(a, {
          id: h.value,
          class: "pt-6px",
          size: "small",
          src: h.src
        }, null, 8, ["id", "src"]),
        b("span", ld, w(h.text || h.label), 1)
      ])) : C(e.$slots, "default", {
        key: 1,
        item: h
      }, () => [
        h.fonticon || h.icon ? (l(), S(u, {
          key: 0,
          icon: h.fonticon || h.icon,
          color: _ && "secondary" || "",
          size: "button"
        }, null, 8, ["icon", "color"])) : f("", !0),
        b("span", ad, w(h.text || h.label), 1),
        h.action ? H((l(), S(c, {
          key: 1,
          icon: h.action,
          color: _ && "secondary"
        }, null, 8, ["icon", "color"])), [
          [d, h.actionTooltip]
        ]) : f("", !0)
      ], !0)
    ], 42, id))), 128))
  ], 2);
}
const us = /* @__PURE__ */ F(ed, [["render", rd], ["__scopeId", "data-v-fdedf0d1"]]), ud = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: us
}, Symbol.toStringTag, { value: "Module" })), dd = {
  name: "vu-select",
  inheritAttrs: !1,
  mixins: [Fe, ki, $e, ze, Ee],
  props: {
    autocomplete: {
      type: Boolean,
      default: () => !1
    },
    hidePlaceholderOption: {
      type: Boolean,
      default: () => !1
    },
    grouped: {
      type: Boolean,
      default: () => !1
    },
    maxVisible: {
      type: Number,
      default: () => 5
    },
    dropdownZIndex: {
      type: Number,
      default: 1020
    },
    // detachable props
    attach: {
      default: () => !0,
      validator: Gn
    },
    contentClass: {
      type: [String, Object],
      default: ""
    },
    contentStyle: {
      type: [String, Object],
      default: () => ""
    }
    // end detachable
  },
  emits: ["update:modelValue"],
  inject: {
    isIos: {
      from: Yt
    }
  },
  data: () => ({
    open: !1,
    focused: !1,
    search: "",
    uid: gt()
  }),
  watch: {
    value() {
      this.search = this.selected.label;
    },
    open(e) {
      e && this.focus();
    }
  },
  created() {
    this.search = this.value && this.selected.label || this.value;
  },
  computed: {
    hasSomeEnabledOptions() {
      return this.enabledOptions.length > 0;
    },
    firstEnabledOption() {
      return this.enabledOptions.slice(0)[0];
    },
    lastEnabledOption() {
      return this.enabledOptions.slice(-1)[0];
    },
    enabledOptions() {
      return (this.autocomplete && this.search ? this.options : this.innerOptions).filter((n) => !n.disabled);
    },
    innerOptions() {
      return this.autocomplete ? this.options.filter((e) => e.label.toLowerCase().includes(this.search.toLowerCase()) || e.value.toLowerCase().includes(this.search.toLowerCase())) : this.options;
    },
    selected() {
      return this.options.find((e) => e.value === this.value) || {
        label: this.placeholder
      };
    },
    willDetach() {
      return this.attach === !1 || this.attach !== "" && typeof this.attach == "string";
    },
    groupedOptions() {
      return this.grouped ? this.options.reduce((e, n) => (e[n.group] || (e[n.group] = []), e[n.group].push(n), e), {}) : null;
    },
    internMaxVisible() {
      return this.maxVisible > this.options.length ? this.options.length : this.maxVisible;
    }
  },
  methods: {
    stop(e) {
      e.preventDefault(), e.stopPropagation();
    },
    innerSelectKeydown(e) {
      switch (e.code) {
        case "Space":
        case "Enter":
        case "NumpadEnter":
          this.open = !this.open, this.stop(e);
          break;
        case "Escape":
          this.open = !1, this.stop(e);
          break;
        case "ArrowUp":
          this.browse(void 0, e);
          break;
        case "ArrowDown":
          this.open ? this.browse(!0, e) : (this.open = !0, this.stop(e));
          break;
      }
    },
    focus() {
      var e, n;
      this.focused = !0, !(this.autocomplete || this.isIos) && (this.willDetach ? setTimeout(() => {
        var t, i;
        (i = (t = this.$refs) == null ? void 0 : t.selectOptions) == null || i.focus();
      }, 50) : (n = (e = this.$refs) == null ? void 0 : e.nativeSelect) == null || n.focus());
    },
    blur() {
      this.focused = !1;
    },
    async browse(e, n) {
      this.grouped || (!e && this.selected === this.firstEnabledOption ? (this.value = this.hidePlaceholderOption ? this.lastEnabledOption.value : void 0, this.stop(n), this.scrollIntoView()) : e && this.selected === this.lastEnabledOption ? (this.value = this.hidePlaceholderOption ? this.firstEnabledOption.value : void 0, this.stop(n), this.scrollIntoView()) : this.modelValue || (this.value = e ? this.firstEnabledOption.value : this.lastEnabledOption.value, this.stop(n), this.scrollIntoView()));
    },
    scrollIntoView() {
      this.$nextTick(() => {
        var t;
        const e = this.$refs && this.$refs.dropdown;
        let n;
        if (e && (n = (t = this.$refs) == null ? void 0 : t.dropdown.querySelector("ul li.result-option-selected")), n) {
          const i = n.offsetTop + n.clientHeight;
          (i > e.scrollTop + e.clientHeight || i < e.scrollTop) && this.$refs.dropdown.scrollTo({ top: n.offsetTop });
        }
      });
    }
  },
  components: { VuIconBtn: de, VuPopover: Ge, VuSelectOptions: us, VuScroller: Qe }
}, cd = {
  key: 0,
  class: "control-label"
}, hd = {
  key: 0,
  class: "label-field-required"
}, fd = ["disabled", "placeholder"], pd = {
  key: 2,
  class: "select-handle"
}, md = ["disabled"], vd = ["label"], gd = ["value", "selected", "disabled"], bd = {
  key: 4,
  class: "select-handle"
}, yd = {
  key: 5,
  class: "select-choices form-control"
}, _d = { class: "select-choice" }, wd = { class: "select-results" }, kd = ["onClick"], Sd = { class: "result-group-label" }, Id = { class: "result-group-sub" }, Cd = ["onClick"], Bd = {
  key: 1,
  class: "form-control-helper-text"
};
function $d(e, n, t, i, o, s) {
  const a = $("VuIconBtn"), u = $("VuSelectOptions"), c = $("VuScroller"), d = $("VuPopover"), h = _e("click-outside");
  return l(), r("div", {
    class: k(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", cd, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", hd, " *")) : f("", !0)
    ])) : f("", !0),
    H((l(), r("div", {
      onClick: n[10] || (n[10] = (p) => {
        e.open = !e.open && !e.disabled, e.search = e.value && s.selected.label || e.value;
      }),
      class: k([
        "vu-select",
        "select",
        {
          "select-placeholder": !t.autocomplete,
          "select-no-placeholder-option": t.hidePlaceholderOption,
          "select-not-chosen": !t.autocomplete && !e.value,
          "dropdown-visible": e.open,
          "select-disabled": e.disabled,
          "select-autocomplete": t.autocomplete,
          "select-clearable": e.clearable,
          "select-focus": e.focused && !e.disabled
        }
      ])
    }, [
      t.autocomplete ? H((l(), r("input", {
        key: 0,
        ref: "innerInput",
        disabled: e.disabled,
        placeholder: s.selected.label,
        class: "form-control",
        "onUpdate:modelValue": n[0] || (n[0] = (p) => e.search = p)
      }, null, 8, fd)), [
        [yo, e.search]
      ]) : f("", !0),
      e.value && (t.autocomplete || e.clearable) ? (l(), S(a, {
        key: 1,
        icon: "clear",
        class: k(["select__clear-icon", { "select--has-handle": t.autocomplete }]),
        onClick: n[1] || (n[1] = (p) => {
          var _, v;
          e.$emit("update:modelValue", ""), (v = (_ = e.$refs) == null ? void 0 : _.innerInput) == null || v.focus(), e.search = "";
        })
      }, null, 8, ["class"])) : f("", !0),
      t.autocomplete ? f("", !0) : (l(), r("div", pd)),
      !t.autocomplete && !s.willDetach ? (l(), r("select", {
        key: 3,
        class: "form-control select-hidden",
        disabled: e.disabled,
        ref: "nativeSelect",
        onFocus: n[2] || (n[2] = (p) => e.focused = !0),
        onBlur: n[3] || (n[3] = (p) => s.blur()),
        onChange: n[4] || (n[4] = () => {
          const p = e.$refs.nativeSelect.value;
          p === "__placeholder__" ? e.value = void 0 : e.value = p, s.scrollIntoView();
        }),
        onKeydown: n[5] || (n[5] = (p) => s.innerSelectKeydown(p))
      }, [
        b("option", {
          value: "__placeholder__",
          label: e.placeholder
        }, null, 8, vd),
        (l(!0), r(M, null, U(s.innerOptions, (p) => (l(), r("option", {
          key: `${e.uid}-${p.value || p.label}`,
          value: p.value || p.label,
          selected: p.value === e.value,
          disabled: p.disabled
        }, w(p.label), 9, gd))), 128))
      ], 40, md)) : f("", !0),
      t.autocomplete ? f("", !0) : (l(), r("div", bd)),
      t.autocomplete ? f("", !0) : (l(), r("ul", yd, [
        b("li", _d, w(s.selected.label), 1)
      ])),
      t.attach && e.open ? (l(), r("div", {
        key: 6,
        class: "select-dropdown",
        ref: "dropdown",
        style: G(`height: ${38 * (s.innerOptions.length + (!t.autocomplete && !t.hidePlaceholderOption ? 1 : 0))}px; max-height: ${38 * (s.internMaxVisible + 1)}px;`)
      }, [
        b("ul", wd, [
          !t.autocomplete && !t.hidePlaceholderOption ? (l(), r("li", {
            key: 0,
            class: k(["result-option result-option-placeholder", { "result-option-selected": !e.modelValue }]),
            onClick: n[6] || (n[6] = (p) => {
              e.$emit("update:modelValue", ""), e.search = "";
            })
          }, w(e.placeholder), 3)) : f("", !0),
          t.grouped ? (l(!0), r(M, { key: 2 }, U(s.groupedOptions, (p, _) => (l(), r("li", {
            key: `${e.uid}-${p.group}`,
            class: "result-group"
          }, [
            b("span", Sd, w(_), 1),
            b("ul", Id, [
              (l(!0), r(M, null, U(p, (v) => (l(), r("li", {
                key: `${e.uid}-${v.value}`,
                class: k([{
                  "result-option-disabled": v.disabled,
                  "result-option-selected": v.value === e.value
                }, "result-option"]),
                onClick: (y) => v.disabled ? null : e.$emit("update:modelValue", v.value)
              }, w(v.label), 11, Cd))), 128))
            ])
          ]))), 128)) : (l(!0), r(M, { key: 1 }, U(s.innerOptions, (p) => (l(), r("li", {
            key: `${e.uid}-${p.value || p.label}`,
            class: k([{
              "result-option-disabled": p.disabled,
              "result-option-selected": p.value === e.value
            }, "result-option"]),
            onClick: (_) => {
              p.disabled || e.$emit("update:modelValue", p.value), e.search = p.label;
            }
          }, w(p.label), 11, kd))), 128))
        ])
      ], 4)) : s.willDetach && e.open ? (l(), S(d, {
        key: 7,
        attach: t.attach,
        type: "vu-select-dropdown",
        show: e.open,
        positions: ["bottom-left", "top-left"],
        side: "bottom-left",
        "sync-width": !0,
        animated: !1,
        "content-class": t.contentClass,
        offsets: { "bottom-left": { y: 3 }, "top-left": { y: -43 } },
        "content-style": [{ zIndex: t.dropdownZIndex }, "position: absolute;", t.contentStyle],
        "onUpdate:show": n[9] || (n[9] = (p) => {
          e.open = p;
        })
      }, {
        body: V(() => [
          T(c, { "always-show": "" }, {
            default: V(() => [
              T(u, J({ ref: "selectOptions" }, { options: s.innerOptions, selected: [s.selected], placeholder: e.placeholder }, {
                onChange: n[7] || (n[7] = (p) => e.value = p),
                onSelectKeydown: s.innerSelectKeydown,
                onClickItem: n[8] || (n[8] = (p) => {
                  this.focus(), e.$emit("update:modelValue", p.value);
                })
              }), null, 16, ["onSelectKeydown"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["attach", "show", "content-class", "content-style"])) : f("", !0)
    ], 2)), [
      [h, {
        events: ["click", "contextmenu"],
        handler: function() {
          e.open = !1, e.search = e.value && s.selected.label || e.value;
        }
      }]
    ]),
    (l(!0), r(M, null, U(e.errorBucket, (p, _) => (l(), r("span", {
      key: `${_}-error-${p}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(p), 1))), 128)),
    e.helper.length ? (l(), r("span", Bd, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const Si = /* @__PURE__ */ F(dd, [["render", $d], ["__scopeId", "data-v-36b5e6a1"]]), Od = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Si
}, Symbol.toStringTag, { value: "Module" })), Td = {
  name: "vu-grid-view",
  mixins: [vt, Gu],
  props: {
    modelValue: {
      type: [Object, Array],
      default: () => []
    },
    items: {
      type: Array,
      required: !0
    },
    headers: {
      type: Array,
      required: !0
    },
    dense: {
      type: Boolean,
      default: !1
    },
    rich: {
      type: Boolean,
      default: !0
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    allSelectable: {
      type: Boolean,
      default: !0
    },
    serverItemsLength: {
      type: Number,
      default: 0
    },
    rowsPerPage: {
      type: Number,
      default: 5
    },
    topPagination: {
      type: Boolean,
      default: !1
    },
    hideRowsPerPageSelect: {
      type: Boolean,
      default: !1
    },
    whiteBackground: {
      type: Boolean,
      default: !1
    },
    sort: {
      type: Function,
      default(e, n) {
        return this.isAscending ? e[this.sortKey] < n[this.sortKey] ? -1 : e[this.sortKey] > n[this.sortKey] ? 1 : 0 : e[this.sortKey] > n[this.sortKey] ? -1 : e[this.sortKey] < n[this.sortKey] ? 1 : 0;
      }
    },
    itemPerPageOptions: {
      type: Array,
      default: () => [10, 20, 50]
    },
    labels: {
      type: Object,
      default: () => ({
        previousLabel: "Previous",
        nextLabel: "Next"
      })
    }
  },
  emits: ["cellClick", "update:modelValue", "update:rowsPerPage", "pageUp", "pageDown"],
  data() {
    return {
      sortKey: "",
      isAscending: void 0,
      startRow: 0,
      selectedCellItem: "",
      selectedCellProperty: "",
      size: null
    };
  },
  computed: {
    hasSelected() {
      return this.value.length > 0;
    },
    sortedItems() {
      const e = this.startRow + this.rowsPerPage;
      return this.sortKey ? [...this.items].sort(this.sort.bind(this)).slice(this.startRow, e) : this.items.slice(this.startRow, e);
    },
    itemMax() {
      const e = this.startRow + this.rowsPerPage;
      return e > this.items.length ? this.items.length : e;
    },
    containerHeight() {
      return (this.dense ? 24 : 38) + (this.dense ? 24 : 38) * (this.sortedItems.length < this.rowsPerPage ? this.sortedItems.length : this.rowsPerPage);
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    },
    isNarrow() {
      var e;
      return ((e = this.size) == null ? void 0 : e.width) < 420;
    },
    isTiny() {
      var e;
      return ((e = this.size) == null ? void 0 : e.width) < 250;
    }
  },
  mounted() {
    this.size = ni(this.$refs.container);
  },
  methods: {
    isEqual(e, n) {
      return e === n;
    },
    selectAll() {
      this.value.length === this.items.length ? this.value = [] : this.value = [...this.items];
    },
    selectItem(e) {
      const n = this.value.includes(e), t = [...this.value];
      if (n) {
        const i = t.indexOf(e);
        this.value.splice(i, 1);
      } else
        this.value.push(e);
    },
    updateRows(e) {
      this.$emit("update:rowsPerPage", e);
    },
    sortBy(e) {
      this.sortKey === e ? this.isAscending = !this.isAscending : (this.sortKey = e, this.isAscending = !0);
    },
    pageUp() {
      this.startRow += this.rowsPerPage, this.$emit("pageUp");
    },
    pageDown() {
      this.startRow -= this.rowsPerPage, this.$emit("pageDown");
    }
  },
  components: { VuCheckbox: yi, VuIconBtn: de, VuSelect: Si, VuBtn: Ye }
}, Ii = (e) => (et("data-v-c31a0621"), e = e(), tt(), e), xd = {
  key: 0,
  class: "grid-view__table__header-intersection"
}, Md = { class: "grid-view__table__body" }, Vd = ["onClick"], Pd = {
  key: 0,
  class: "grid-view__table__row__header"
}, Ld = ["onClick"], Dd = { style: { "margin-right": "5px" } }, Ad = /* @__PURE__ */ Ii(() => /* @__PURE__ */ b("span", { class: "icon-left fonticon fonticon-chevron-left" }, null, -1)), Fd = { class: "inner-text" }, zd = { class: "inner-text" }, Ed = /* @__PURE__ */ Ii(() => /* @__PURE__ */ b("span", { class: "icon-left fonticon fonticon-chevron-right" }, null, -1));
function Nd(e, n, t, i, o, s) {
  const a = $("VuCheckbox"), u = $("VuIconBtn"), c = $("VuSelect"), d = $("VuBtn"), h = _e("tooltip"), p = _e("mask");
  return H((l(), r("div", {
    ref: "container",
    class: k(["vu-grid-view", [{ elevated: e.elevated, "vu-grid-view--rich": t.rich }]])
  }, [
    b("div", {
      class: "grid-view__container",
      style: G(`height: ${s.containerHeight}px;`)
    }, [
      b("table", {
        class: k(["grid-view__table", [
          { dense: t.dense, "grid-view__table--has-selection": s.hasSelected }
        ]])
      }, [
        b("thead", null, [
          b("tr", null, [
            t.selectable ? (l(), r("th", xd, [
              t.allSelectable ? (l(), S(a, {
                key: 0,
                dense: "",
                class: "grid-view__table__checkbox",
                "model-value": s.value.length === t.items.length && t.items.length,
                options: [{}],
                "onUpdate:modelValue": s.selectAll
              }, null, 8, ["model-value", "onUpdate:modelValue"])) : f("", !0)
            ])) : f("", !0),
            (l(!0), r(M, null, U(t.headers, (_, v) => (l(), r("th", {
              key: `header_${_.property}_${v}`
            }, [
              H((l(), r("span", null, [
                X(w(_.label), 1)
              ])), [
                [
                  h,
                  _.label,
                  void 0,
                  {
                    ellipsis: !0,
                    bottom: !0
                  }
                ]
              ]),
              _.sortable !== !1 ? (l(), S(u, {
                key: 0,
                class: "icon-smaller",
                icon: _.property === o.sortKey && o.isAscending ? "expand-up" : "expand-down",
                active: _.property === o.sortKey,
                onClick: (y) => s.sortBy(_.property)
              }, null, 8, ["icon", "active", "onClick"])) : f("", !0)
            ]))), 128))
          ])
        ]),
        b("tbody", Md, [
          (l(!0), r(M, null, U(s.sortedItems, (_, v) => (l(), r("tr", {
            key: `line_${v}`,
            class: k({ dense: t.dense, selected: s.value.includes(_) }),
            onClick: (y) => s.selectItem(_)
          }, [
            t.selectable ? (l(), r("td", Pd, [
              T(a, {
                dense: "",
                class: "grid-view__table__body__checkbox",
                "model-value": s.value.includes(_),
                options: [{}],
                "onUpdate:modelValue": (y) => s.selectItem(_)
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ])) : f("", !0),
            (l(!0), r(M, null, U(t.headers, (y) => (l(), r("td", {
              key: `${y.property}_${_[y.property]}`,
              class: k([
                s.isEqual(_, o.selectedCellItem) && s.isEqual(y.property, o.selectedCellProperty) ? "selected" : ""
              ]),
              onClick: () => {
                o.selectedCellItem = _, o.selectedCellProperty = y.property, e.$emit("cellClick", { item: _, header: y, property: e.property });
              }
            }, [
              C(e.$slots, y.property, Ke(Xe(_)), () => [
                X(w(_[y.property]), 1)
              ], !0)
            ], 10, Ld))), 128))
          ], 10, Vd))), 128))
        ])
      ], 2)
    ], 4),
    b("div", {
      class: k(["grid-view__pagination", { "grid-view__pagination--top": t.topPagination, "is-narrow": s.isNarrow }])
    }, [
      C(e.$slots, "pagination", {}, () => [
        t.hideRowsPerPageSelect ? f("", !0) : H((l(), S(c, {
          key: 0,
          options: t.itemPerPageOptions.map((_) => ({ value: _, label: _ })),
          "hide-placeholder-option": !0,
          "model-value": t.rowsPerPage,
          "onUpdate:modelValue": s.updateRows
        }, null, 8, ["options", "model-value", "onUpdate:modelValue"])), [
          [Me, !s.isTiny]
        ]),
        b("div", Dd, w(o.startRow + 1) + "-" + w(s.itemMax) + " / " + w(t.serverItemsLength || t.items.length), 1),
        T(d, {
          disabled: o.startRow === 0,
          class: "pagination-previous-button",
          onClick: s.pageDown
        }, {
          default: V(() => [
            Ad,
            b("span", Fd, w(t.labels.previousLabel), 1)
          ]),
          _: 1
        }, 8, ["disabled", "onClick"]),
        T(d, {
          disabled: o.startRow + t.rowsPerPage >= (t.serverItemsLength || t.items.length),
          class: "pagination-next-button",
          onClick: s.pageUp
        }, {
          default: V(() => [
            b("span", zd, w(t.labels.nextLabel), 1),
            Ed
          ]),
          _: 1
        }, 8, ["disabled", "onClick"])
      ], !0)
    ], 2)
  ], 2)), [
    [p, e.loading]
  ]);
}
const Rd = /* @__PURE__ */ F(Td, [["render", Nd], ["__scopeId", "data-v-c31a0621"]]), Hd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rd
}, Symbol.toStringTag, { value: "Module" })), jd = {
  name: "vu-icon-link",
  components: { VuIcon: ue },
  mixins: [os],
  props: {
    label: {
      type: String,
      default: () => ""
    },
    icon: {
      type: String,
      default: () => ""
    }
  },
  data: () => ({
    pressed: !1
  })
}, Ud = { class: "icon-link__link" };
function Wd(e, n, t, i, o, s) {
  const a = $("VuIcon");
  return l(), r("a", {
    class: k(["vu-icon-link", { active: e.active }])
  }, [
    t.icon ? (l(), S(a, {
      key: 0,
      icon: t.icon,
      active: e.active
    }, null, 8, ["icon", "active"])) : (l(), r(M, { key: 1 }, [
      X(" ")
    ], 64)),
    b("span", Ud, [
      C(e.$slots, "default", {}, () => [
        X(w(t.label), 1)
      ], !0)
    ])
  ], 2);
}
const ds = /* @__PURE__ */ F(jd, [["render", Wd], ["__scopeId", "data-v-0b39185d"]]), qd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ds
}, Symbol.toStringTag, { value: "Module" })), Kd = {
  name: "vu-input-date",
  mixins: [Fe, hn, ki, ze, Ee, $e],
  emits: ["update:modelValue"],
  components: { VuDatepicker: _i },
  props: {
    modelValue: {
      type: Date,
      default: () => null
    },
    contentClass: {
      type: String,
      default: () => ""
    },
    contentStyle: {
      type: [String, Object],
      default: () => ""
    },
    unselectableDaysOfWeek: {
      type: Array[Number],
      default: () => []
    },
    yearRange: {
      type: Number,
      default: () => 10
    },
    firstDay: {
      type: Number,
      default: () => 1
    },
    // input
    placeholder: {
      type: String,
      default: () => "Select a value"
    },
    // i18n
    dateFormatLocale: {
      type: String,
      default: () => "en"
    },
    dateFormatOptions: {
      type: Object,
      default: () => ({
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit"
      })
    },
    hideOnSelect: {
      type: Boolean,
      default: () => !0
    },
    previousMonthLabel: {
      type: String,
      required: !1,
      default: void 0
    },
    nextMonthLabel: {
      type: String,
      required: !1,
      default: void 0
    },
    monthsLabels: {
      type: Array,
      required: !1,
      default: () => {
      }
    },
    weekdaysLabels: {
      type: Array,
      required: !1,
      default: () => {
      }
    },
    weekdaysShortLabels: {
      type: Array,
      required: !1,
      default: () => {
      }
    },
    showWeekNumber: {
      type: Boolean,
      required: !1
    },
    isRTL: {
      type: Boolean,
      required: !1
    }
  },
  data: () => ({
    open: !1,
    stringifedValue: ""
  }),
  computed: {
    date: {
      get() {
        return this.modelValue;
      },
      set(e) {
        this.$emit("update:modelValue", e);
      }
    },
    isEmpty() {
      return this.value === null || this.value === "" || this.value === void 0;
    }
  },
  watch: {
    modelValue: {
      immediate: !0,
      handler() {
        this.date ? this.stringifedValue = new Intl.DateTimeFormat(this.dateFormatLocale, this.dateFormatOptions).format(this.date) : this.stringifedValue = "";
      }
    }
  },
  methods: {
    click() {
      this.date = "";
    },
    handleSelect(e) {
      this.date = e, this.hideOnSelect && (this.open = !1);
    }
  }
}, Gd = {
  key: 0,
  class: "control-label"
}, Yd = {
  key: 0,
  class: "label-field-required"
}, Xd = {
  ref: "activator",
  class: "input-date"
}, Jd = ["value", "placeholder", "disabled"], Zd = {
  key: 1,
  class: "form-control-helper-text"
};
function Qd(e, n, t, i, o, s) {
  const a = $("VuDatepicker"), u = _e("click-outside");
  return l(), r("div", {
    class: k(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", Gd, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", Yd, " * ")) : f("", !0)
    ])) : f("", !0),
    H((l(), r("div", Xd, [
      b("input", {
        ref: "input",
        value: e.stringifedValue,
        placeholder: t.placeholder,
        disabled: e.disabled,
        readonly: "",
        type: "text",
        class: k(["form-control input-date", { filled: !s.isEmpty }]),
        onClick: n[0] || (n[0] = (c) => {
          e.open = !0;
        })
      }, null, 10, Jd),
      e.clearable ? (l(), r("span", {
        key: 0,
        class: "input-date-reset fonticon fonticon-clear",
        onClick: n[1] || (n[1] = (c) => s.click())
      })) : f("", !0),
      T(a, {
        style: G([{ position: "absolute", top: "38px" }, t.contentStyle]),
        class: k(t.contentClass),
        modelValue: e.value,
        "onUpdate:modelValue": [
          n[2] || (n[2] = (c) => e.value = c),
          s.handleSelect
        ],
        show: e.open,
        min: e.min,
        max: e.max,
        "unselectable-days-of-week": t.unselectableDaysOfWeek,
        "year-range": t.yearRange,
        "first-day": t.firstDay,
        "show-week-number": t.showWeekNumber,
        "is-r-t-l": t.isRTL,
        "previous-month-label": t.previousMonthLabel,
        "next-month-label": t.nextMonthLabel,
        "months-labels": t.monthsLabels,
        "weekdays-labels": t.weekdaysLabels,
        "weekdays-short-labels": t.weekdaysShortLabels,
        onBoundaryChange: n[3] || (n[3] = (c) => s.date = c.value)
      }, null, 8, ["style", "class", "modelValue", "show", "min", "max", "unselectable-days-of-week", "year-range", "first-day", "show-week-number", "is-r-t-l", "previous-month-label", "next-month-label", "months-labels", "weekdays-labels", "weekdays-short-labels", "onUpdate:modelValue"])
    ])), [
      [u, function() {
        e.open = !1;
      }]
    ]),
    (l(!0), r(M, null, U(e.errorBucket, (c, d) => (l(), r("span", {
      key: `${d}-error-${c}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(c), 1))), 128)),
    e.helper.length ? (l(), r("span", Zd, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const ec = /* @__PURE__ */ F(Kd, [["render", Qd], ["__scopeId", "data-v-dd785764"]]), tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ec
}, Symbol.toStringTag, { value: "Module" })), nc = {
  name: "vu-input-number",
  inheritAttrs: !1,
  mixins: [Fe, ze, Ee, $e],
  props: {
    step: {
      type: Number,
      default: () => 0.1
    },
    decimal: {
      type: Number,
      default: () => 2
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    showButtons: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["update:modelValue"],
  methods: {
    input(e, n) {
      if (n && e === "" && this.value !== "") {
        this.$refs.input.value = this.value;
        return;
      }
      if (e === "" && n === "-" || n === "." || n === ",")
        return;
      let t = e !== "" ? this.parseValue(this.fixed(e)) : void 0;
      this.$emit("update:modelValue", t), this.$refs.input.value = this.value;
    },
    decrement() {
      let e = parseFloat(this.value);
      e = Number.isNaN(e) ? this.max : e, this.input(e - this.step);
    },
    increment() {
      let e = parseFloat(this.value);
      e = Number.isNaN(e) ? this.min : e, this.input(e + this.step);
    },
    parseValue(e) {
      const n = parseFloat(e);
      return n > this.max ? this.max : n < this.min ? this.min : n;
    },
    fixed(e) {
      return Math.round(e * 10 ** this.decimal) / 10 ** this.decimal;
    }
  }
}, sc = {
  key: 0,
  class: "control-label"
}, ic = {
  key: 0,
  class: "label-field-required"
}, oc = { class: "input-number" }, lc = ["disabled"], ac = ["value", "placeholder", "disabled", "min", "max", "step"], rc = ["disabled"], uc = {
  key: 1,
  class: "form-control-helper-text"
};
function dc(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["vu-number form-group", { ...e.classes, "vu-number--no-buttons": !t.showButtons }])
  }, [
    e.label.length ? (l(), r("label", sc, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", ic, " *")) : f("", !0)
    ])) : f("", !0),
    b("div", oc, [
      t.showButtons ? (l(), r("button", {
        key: 0,
        type: "button",
        disabled: e.disabled,
        class: "input-number-button input-number-button-left btn btn-default",
        onClick: n[0] || (n[0] = (...a) => s.decrement && s.decrement(...a))
      }, null, 8, lc)) : f("", !0),
      b("input", J(e.$attrs, {
        ref: "input",
        value: e.value,
        placeholder: e.placeholder,
        disabled: e.disabled,
        min: t.min,
        max: t.max,
        step: t.step,
        type: "number",
        class: "form-control",
        onKeypress: [
          n[1] || (n[1] = Ct((...a) => s.increment && s.increment(...a), ["up"])),
          n[2] || (n[2] = Ct((...a) => s.decrement && s.decrement(...a), ["down"]))
        ],
        onInput: n[3] || (n[3] = (a) => s.input(a.target.value, a.data))
      }), null, 16, ac),
      t.showButtons ? (l(), r("button", {
        key: 1,
        type: "button",
        disabled: e.disabled,
        class: "input-number-button input-number-button-right btn btn-default",
        onClick: n[4] || (n[4] = (...a) => s.increment && s.increment(...a))
      }, null, 8, rc)) : f("", !0)
    ]),
    (l(!0), r(M, null, U(e.errorBucket, (a, u) => (l(), r("span", {
      key: `${u}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(a), 1))), 128)),
    e.helper.length ? (l(), r("span", uc, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const cc = /* @__PURE__ */ F(nc, [["render", dc], ["__scopeId", "data-v-0671176e"]]), hc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cc
}, Symbol.toStringTag, { value: "Module" })), fc = {
  name: "vu-input",
  inheritAttrs: !1,
  inject: {
    vuInputComposition: {
      default: !1
    }
  },
  expose: ["validate", "focus"],
  mixins: [Fe, ze, $e, Ee],
  emits: ["update:modelValue"],
  methods: {
    focus() {
      var e, n;
      (n = (e = this.$refs) == null ? void 0 : e.input) == null || n.focus();
    }
  }
}, pc = {
  key: 0,
  class: "control-label"
}, mc = {
  key: 0,
  class: "label-field-required"
}, vc = ["value", "placeholder", "disabled", "type"], gc = {
  key: 1,
  class: "form-control-helper-text"
};
function bc(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", pc, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", mc, " *")) : f("", !0)
    ])) : f("", !0),
    b("input", J(e.$attrs, {
      ref: "input",
      value: e.value,
      placeholder: e.placeholder,
      disabled: e.disabled,
      type: e.type,
      class: "form-control",
      onInput: n[0] || (n[0] = ({ target: a }) => {
        s.vuInputComposition || (a.composing = !1), e.$emit("update:modelValue", a.value);
      })
    }), null, 16, vc),
    (l(!0), r(M, null, U(e.errorBucket, (a, u) => (l(), r("span", {
      key: `${u}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(a), 1))), 128)),
    e.helper.length ? (l(), r("span", gc, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const Ci = /* @__PURE__ */ F(fc, [["render", bc], ["__scopeId", "data-v-8920c09a"]]), yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ci
}, Symbol.toStringTag, { value: "Module" })), dt = (e) => typeof e != "string" ? "" : e.charAt(0).toUpperCase() + e.slice(1), _c = {
  name: "vu-lightbox-bar",
  emits: ["close", "click-comment", "click-download", "click-information", "click-share", "media-type-drag-start", "media-type-drag", "media-type-drag-end", "click-compass"],
  props: {
    // eslint-disable-next-line vue/require-prop-types
    showCloseIcon: { default: () => !0 },
    // eslint-disable-next-line vue/require-prop-types
    showCompass: { default: () => !0 },
    label: {
      type: String,
      default: () => ""
    },
    type: {
      type: Object,
      default: () => {
      }
    },
    items: {
      type: Array,
      default: () => []
    },
    customItems: {
      type: Array,
      default: () => []
    },
    subItems: {
      type: Array,
      default: () => []
    },
    rightItems: {
      type: Array,
      default: () => []
    },
    responsive: {
      type: Boolean,
      default: () => !1
    },
    widget: {
      type: Boolean,
      default: () => !1
    },
    moreActionsLabel: {
      type: String,
      default: () => "More"
    },
    disableCompass: {
      type: Boolean,
      required: !0
    },
    closeLabel: {
      type: String,
      default: () => "Close"
    },
    dropdownOverlay: Boolean,
    /* eslint-disable vue/require-default-prop */
    onMediaTypeDragStart: Function,
    onMediaTypeDrag: Function,
    onMediaTypeDragEnd: Function
  },
  data: () => ({
    getListenersFromAttrs: Ze,
    capitalize: dt,
    uid: gt()
  }),
  computed: {
    menuIcon() {
      return this.responsive ? "menu-dot" : "chevron-down";
    },
    hasLeftToDividerContent() {
      return this.items.length > 0 && this.items.some((e) => !e.hidden) || this._dropdownMenuItems.length > 0 || this.$slots["lightbox-bar__special-actions"];
    },
    hasRightToDividerContent() {
      return this.showCloseIcon || this.rightItems && this.rightItems.length > 0 && this.rightItems.some((e) => !e.hidden);
    },
    hasDragEvent() {
      return this.onMediaTypeDragStart || this.onMediaTypeDrag || this.onMediaTypeDragEnd;
    },
    _items() {
      return this.actionsMergeSubs(this.items, this.customItems);
    },
    dropdownMenuListeners() {
      const e = this.getListenersFromAttrs(this.$attrs);
      if (e.close) {
        const n = { ...e };
        return delete n.close, n;
      }
      return e;
    },
    _dropdownMenuItems() {
      if (this.responsive) {
        const e = this._items.filter(({ nonResponsive: n, hidden: t }) => !n && !t);
        return this.subItems && this.subItems.length > 0 && e.push({
          name: "more-actions",
          label: this.moreActionsLabel,
          items: this.subItems
        }), e;
      }
      return this.subItems;
    }
  },
  methods: {
    icon(e) {
      return e.icon ? `${e.icon}` : `${e.fonticon}`;
    },
    actionClick(e, n = "primary-action") {
      e.disabled || (e.handler && e.handler(e), this.$emit(`click-${e.name.toLowerCase()}`, e, { type: n }));
    },
    actionsMergeSubs(e, n) {
      const t = n.filter(({ name: s }) => e.find(({ name: a }) => s === a)), i = n.filter(({ name: s }) => !t.find(({ name: a }) => s === a));
      e.forEach(({ name: s, items: a }) => {
        const u = t.find(({ name: c }) => c === s);
        if (u) {
          const { items: c } = u;
          c && (Array.isArray(a) || (a = []), a.push(...c));
        }
      });
      let o = [...e, ...i];
      return o = o.map((s) => {
        if (s.text === void 0) {
          const a = this.capitalize(s.name);
          s.text = a;
        }
        return s;
      }), o;
    },
    selectedItemsArray(e) {
      return this.customItems ? this.getSelectedItems(e) : [];
    },
    getSelectedItems(e) {
      let n = [];
      return Array.isArray(e) && e.forEach((t) => {
        if (t.items) {
          const i = this.getSelectedItems(t);
          n = [n, ...i];
        }
      }), n.filter((t) => t.selected);
    }
  },
  components: { VuIconBtn: de, VuDropdownMenu: rt }
}, Bi = (e) => (et("data-v-14413ab3"), e = e(), tt(), e), wc = { class: "lightbox-bar__left" }, kc = /* @__PURE__ */ Bi(() => /* @__PURE__ */ b("div", { class: "lightbox-bar__compass-active" }, null, -1)), Sc = [
  kc
], Ic = { class: "lightbox-bar-menu-item lightbox-bar-menu-item--no-cursor" }, Cc = ["draggable"], Bc = { class: "lightbox-bar__title" }, $c = { class: "lightbox-bar__right" }, Oc = { class: "lightbox-bar__menu" }, Tc = {
  key: 2,
  class: "lightbox-bar__divider"
}, xc = /* @__PURE__ */ Bi(() => /* @__PURE__ */ b("hr", { class: "divider divider--vertical" }, null, -1)), Mc = [
  xc
];
function Vc(e, n, t, i, o, s) {
  const a = $("VuIconBtn"), u = $("VuDropdownMenu"), c = _e("tooltip");
  return l(), r("div", {
    class: k(["vu-lightbox-bar", {
      "lightbox-bar--responsive": t.responsive,
      "lightbox-bar--widget-header": t.widget
    }])
  }, [
    b("div", wc, [
      t.showCompass && !t.widget ? (l(), r("div", {
        key: 0,
        class: k(["lightbox-bar__compass", { "lightbox-bar__compass--disabled": t.disableCompass }]),
        onClick: n[0] || (n[0] = (d) => e.$emit("click-compass"))
      }, Sc, 2)) : f("", !0),
      C(e.$slots, "lightbox-bar__object-type", {}, () => [
        b("div", Ic, [
          b("div", {
            class: "lightbox-bar__media-type",
            style: G({ "background-color": t.type.backgroundColor }),
            onDragstart: n[1] || (n[1] = (d) => e.$emit("media-type-drag-start", d)),
            onDrag: n[2] || (n[2] = (d) => e.$emit("media-type-drag", d)),
            onDragend: n[3] || (n[3] = (d) => e.$emit("media-type-drag-end", d)),
            draggable: s.hasDragEvent ? "true" : "false"
          }, [
            b("span", {
              class: k(`fonticon fonticon-${t.type.icon}`)
            }, null, 2)
          ], 44, Cc)
        ])
      ], !0),
      b("div", Bc, [
        C(e.$slots, "lightbox-bar__title", {}, () => [
          b("span", null, w(t.label), 1)
        ], !0)
      ])
    ]),
    b("div", $c, [
      b("div", Oc, [
        t.responsive ? f("", !0) : (l(!0), r(M, { key: 0 }, U(s._items, (d, h) => (l(), r(M, {
          key: `${e.uid}-${h}-rm`
        }, [
          d.items && !d.hidden ? (l(), S(u, J({
            "v-model": s.selectedItemsArray(s._items),
            key: `lightbox-dropdownmenu_${e.uid}-${h}`,
            items: d.items,
            shift: !0,
            disabled: d.disabled
          }, { overlay: t.dropdownOverlay }, { class: "lightbox-bar-dropdown-wrap" }, lt(s.dropdownMenuListeners)), {
            default: V(({ active: p }) => [
              H(T(a, {
                icon: s.icon(d),
                active: d.selected || p,
                disabled: d.disabled,
                color: t.widget ? "default" : "secondary",
                class: "lightbox-bar-menu-item",
                onClick: () => s.actionClick(d)
              }, null, 8, ["icon", "active", "disabled", "color", "onClick"]), [
                [
                  c,
                  `${d.label || e.capitalize(d.name)}`,
                  void 0,
                  {
                    body: !0,
                    bottom: !0
                  }
                ]
              ])
            ]),
            _: 2
          }, 1040, ["v-model", "items", "disabled"])) : d.hidden ? f("", !0) : H((l(), S(a, {
            key: 1,
            icon: s.icon(d),
            active: d.selected,
            disabled: d.disabled,
            color: t.widget ? "default" : "secondary",
            class: "lightbox-bar-menu-item",
            onClick: () => s.actionClick(d)
          }, null, 8, ["icon", "active", "disabled", "color", "onClick"])), [
            [
              c,
              `${d.label || e.capitalize(d.name)}`,
              void 0,
              {
                body: !0,
                bottom: !0
              }
            ]
          ])
        ], 64))), 128)),
        s._dropdownMenuItems.length > 0 ? (l(), S(u, J({
          key: 1,
          "v-model": s.selectedItemsArray(s._dropdownMenuItems),
          class: "lightbox-bar-dropdown-wrap",
          "prevent-dropup": !0,
          items: s._dropdownMenuItems,
          position: "bottom-left",
          shift: !0
        }, { overlay: t.dropdownOverlay }, lt(s.dropdownMenuListeners)), {
          default: V(({ active: d }) => [
            H(T(a, {
              icon: s.menuIcon,
              active: d,
              color: t.widget ? "default" : "secondary",
              class: k(["lightbox-bar-menu-item", t.responsive ? "" : "chevron-menu-icon"])
            }, null, 8, ["icon", "active", "color", "class"]), [
              [
                c,
                `${t.moreActionsLabel}`,
                void 0,
                {
                  body: !0,
                  bottom: !0
                }
              ]
            ])
          ]),
          _: 1
        }, 16, ["v-model", "items"])) : f("", !0),
        C(e.$slots, "lightbox-bar__special-actions", {}, void 0, !0),
        s.hasLeftToDividerContent && s.hasRightToDividerContent ? (l(), r("div", Tc, Mc)) : f("", !0),
        (l(!0), r(M, null, U(t.rightItems, (d, h) => (l(), r(M, null, [
          d.hidden ? f("", !0) : H((l(), S(a, {
            key: `${e.uid}-sa-${h}`,
            class: "lightbox-bar-menu-item",
            color: t.widget ? "default" : "secondary",
            icon: s.icon(d),
            active: d.selected,
            disabled: d.disabled,
            onClick: (p) => s.actionClick(d, "side-action")
          }, null, 8, ["color", "icon", "active", "disabled", "onClick"])), [
            [
              c,
              `${d.label || e.capitalize(d.name)}`,
              void 0,
              {
                body: !0,
                bottom: !0
              }
            ]
          ])
        ], 64))), 256)),
        t.showCloseIcon ? H((l(), S(a, {
          key: 3,
          class: "lightbox-bar-menu-item",
          color: t.widget ? "default" : "secondary",
          icon: "close",
          onClick: n[4] || (n[4] = (d) => e.$emit("close", !1))
        }, null, 8, ["color"])), [
          [
            c,
            t.closeLabel,
            void 0,
            {
              body: !0,
              bottom: !0
            }
          ]
        ]) : f("", !0)
      ])
    ])
  ], 2);
}
const $i = /* @__PURE__ */ F(_c, [["render", Vc], ["__scopeId", "data-v-14413ab3"]]), Pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $i
}, Symbol.toStringTag, { value: "Module" })), Lc = { class: "relative full-width h-100%" }, Dc = {
  key: 2,
  class: "panel__header"
}, Ac = { class: "panel__title__text" }, Fc = {
  name: "vu-side-panel"
}, Oi = /* @__PURE__ */ Ae({
  ...Fc,
  props: /* @__PURE__ */ Bt({
    side: { default: "left" },
    topbar: { type: Boolean },
    animated: { type: Boolean, default: !0 },
    closeIcon: { type: Boolean, default: !0 },
    closeIconClasses: {},
    closeIconTooltip: {},
    pinIcon: { type: Boolean },
    pinIconClasses: {},
    pinIconTooltip: {},
    pinOnScroll: { type: [Boolean, String] },
    pinOnClick: { type: [Boolean, String], default: !0 },
    pinOnContextmenu: { type: [Boolean, String] },
    transient: { type: [Boolean, String] },
    transientTarget: {},
    title: {},
    panelTitleClasses: {},
    smallCloseIcon: { type: Boolean },
    showEdit: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ Bt(["panel-edit"], ["update:modelValue"]),
  setup(e, { expose: n, emit: t }) {
    const i = e, o = t, s = sn(e, "modelValue"), a = x(!1), u = Y(() => ye(i.transientTarget)), c = Y(() => `slide-in-${i.side}`), d = Y(() => `slide-out-${i.side}`), h = function() {
    };
    let p = h;
    jt(() => {
      p(), i.transient ? p = pe(u.value, "mouseenter", () => a.value = !0) : p = h;
    }), le(s, (B) => {
      B && (a.value = !1);
    });
    function _() {
      a.value = !0;
    }
    function v() {
      a.value = !1;
    }
    function y() {
      s.value = !1;
    }
    function L() {
      s.value = !0;
    }
    return n({ close: y, open: L, showTransient: _, hideTransient: v }), (B, R) => {
      const ee = _e("tooltip");
      return l(), S(It, {
        appear: "",
        "enter-active-class": c.value,
        "leave-active-class": d.value
      }, {
        default: V(() => [
          H(b("aside", {
            class: k(["vu-side-panel animated bottom-0 absolute", [
              {
                "vu-side-panel--topbar": B.topbar,
                "top-0": !B.topbar
              },
              `${B.side}-0`,
              `vu-side-panel--${B.side}`
            ]]),
            onMouseleave: R[3] || (R[3] = () => {
              s.value || (a.value = !1);
            }),
            onClick: R[4] || (R[4] = () => {
              B.pinOnClick && !s.value && (s.value = !0);
            }),
            onContextmenu: R[5] || (R[5] = () => {
              B.pinOnContextmenu && !s.value && (s.value = !0);
            }),
            onScroll: R[6] || (R[6] = () => {
              B.pinOnScroll && !s.value && (s.value = !0);
            })
          }, [
            b("div", Lc, [
              B.pinIcon && !s.value && a.value ? H((l(), S(de, {
                key: 0,
                icon: "pin",
                class: k(["absolute! top-2px", [B.pinIconClasses]]),
                onClick: R[0] || (R[0] = () => {
                  s.value = !0, a.value = !1;
                })
              }, null, 8, ["class"])), [
                [
                  ee,
                  B.pinIconTooltip,
                  void 0,
                  { bottom: !0 }
                ]
              ]) : f("", !0),
              B.closeIcon && s.value ? H((l(), S(de, {
                key: 1,
                icon: "close",
                class: k(["absolute! top-2px right-0", [B.closeIconClasses, { "font-size-[13px]!": B.smallCloseIcon }]]),
                onClick: R[1] || (R[1] = () => {
                  s.value = !1, a.value = !1;
                })
              }, null, 8, ["class"])), [
                [
                  ee,
                  B.closeIconTooltip,
                  void 0,
                  { bottom: !0 }
                ]
              ]) : f("", !0),
              B.title ? (l(), r("div", Dc, [
                b("span", {
                  class: k([
                    "panel__title",
                    [{
                      "mr-38px": B.closeIcon && s.value && !B.closeIconClasses,
                      "ml-28px": B.pinIcon && a.value && !B.pinIconClasses
                    }, B.panelTitleClasses]
                  ])
                }, [
                  C(B.$slots, "title", {}, () => [
                    b("span", Ac, w(B.title), 1)
                  ]),
                  C(B.$slots, "title_icons", {}, () => [
                    B.showEdit ? (l(), S(de, {
                      key: 0,
                      class: "panel__edit__icon",
                      icon: "pencil",
                      onClick: R[2] || (R[2] = (ce) => o("panel-edit"))
                    })) : f("", !0)
                  ])
                ], 2)
              ])) : f("", !0),
              C(B.$slots, "default")
            ])
          ], 34), [
            [Me, a.value || s.value]
          ])
        ]),
        _: 3
      }, 8, ["enter-active-class", "leave-active-class"]);
    };
  }
}), zc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Oi
}, Symbol.toStringTag, { value: "Module" })), Ms = [
  {
    name: "previous",
    fonticon: "chevron-left",
    selected: !1,
    disabled: !1,
    hidden: !1
  },
  {
    name: "next",
    fonticon: "chevron-right",
    selected: !1,
    disabled: !1,
    hidden: !1
  }
], Vs = [
  {
    name: "comment",
    fonticon: "topbar-comment",
    disabled: !1,
    hidden: !1
  },
  {
    name: "share",
    fonticon: "share-alt",
    disabled: !1,
    hidden: !1
  },
  {
    name: "download",
    fonticon: "download",
    disabled: !1,
    hidden: !1
  },
  {
    name: "information",
    fonticon: "topbar-info",
    disabled: !1,
    hidden: !1
  }
], Ps = {
  picture: {
    id: 1,
    icon: "picture",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  audio: {
    id: 2,
    icon: "sound",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  video: {
    id: 3,
    icon: "video",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  "3dmodel": {
    id: 4,
    icon: "3d-object",
    backgroundColor: "#70036b"
    // $violet-dv-1
  },
  document: {
    id: 5,
    icon: "doc",
    backgroundColor: "#70036b"
    // $violet-dv-1
  }
}, Ec = {
  name: "vu-lightbox",
  components: { VuLightboxBar: $i, VuIconBtn: de, VuIconBtn: de, VuSidePanel: Oi },
  data() {
    return {
      panelStates: [],
      panelsRefs: {},
      openCompass: !1,
      compassAlreadyOpened: !1,
      compassPath: "webapps/i3DXCompassStandalone/i3DXCompassStandalone.html",
      resizeObserver: null,
      transforms: {
        responsive: !1,
        left: {},
        center: {},
        right: {}
      },
      capitalize: dt,
      customItems: [],
      getListenersFromAttrs: Ze,
      uid: crypto.randomUUID(),
      inAnimate: !1,
      outAnimate: !1,
      rightPanelResizeObserver: null
    };
  },
  emits: ["close", "click-comment", "click-information", "click-share", "click-download", "media-type-drag-start", "media-type-drag", "media-type-drag-end", "click-compass"],
  props: {
    /* eslint-disable vue/prop-name-casing, style/quote-props */
    title: {
      type: String,
      default: () => ""
    },
    animatedPanels: {
      type: Boolean,
      default: !0
    },
    userId: {
      type: String,
      required: !1
    },
    panels: {
      type: Array,
      required: !1,
      default: () => [{}]
    },
    widget: {
      type: Boolean,
      default: () => !1
    },
    objectType: {
      type: [String, Object],
      default: () => "picture",
      validator: (e) => !!Ps[e] || e && e.icon && e.backgroundColor
    },
    primaryActions: {
      type: [Array, String],
      default: () => Vs
    },
    customActions: {
      type: Boolean,
      default: () => !1
    },
    menuActions: {
      type: Array,
      required: !1,
      default: () => []
    },
    sideActions: {
      type: Array,
      default: () => Ms
    },
    customSideActions: {
      type: Boolean,
      default: () => !1
    },
    noObjectType: {
      type: Boolean,
      default: () => !1
    },
    disableCompass: {
      type: Boolean,
      default: () => !1
    },
    zIndex: {
      type: Number,
      default: () => 100
    },
    moreActionsLabel: {
      type: String,
      default: () => "More"
    },
    closeLabel: {
      type: String,
      default: () => "Close"
    },
    noAnimation: {
      type: Boolean,
      default: () => !1
    },
    fasterAnimation: {
      type: Boolean,
      default: () => !1
    },
    hideCloseIcon: {
      type: Boolean,
      default: () => !1
    },
    dropdownOverlay: Boolean,
    onClose: Function,
    "onClick-comment": Function,
    "onClick-download": Function,
    "onClick-information": Function,
    "onClose-panel-information": Function,
    "onClose-panel-comment": Function,
    "onClick-share": Function,
    "onMedia-type-drag-start": Function,
    "onMedia-type-drag": Function,
    "onMedia-type-drag-end": Function
  },
  created() {
    this.panels.find(({ show: e }) => e !== void 0) || (this.panelStates = this.panels.map((e) => ({ ...e, show: !1 })));
  },
  computed: {
    typeInfo() {
      return typeof this.objectType == "object" ? this.objectType : Ps[this.objectType];
    },
    compassIframeUrl() {
      return `${this.serviceUrl || ""}/${this.compassPath}${this.userId ? `#userId:${this.userId}` : ""}`;
    },
    listeners() {
      return Ze(this.$attrs, !0);
    },
    listenersFromProps() {
      return this.getListenersFromAttrs(this.$props, !0);
    },
    _panels() {
      return this.panelStates.length > 0 ? this.panelStates : this.panels;
    },
    shownRightPanel() {
      return this._panels.find(({ show: e }) => typeof e == "object" ? e.value === !0 : e);
    },
    noCompass() {
      return this.widget;
    },
    _primaryActions() {
      const e = this.primaryActions, n = Vs;
      if (this.widget) {
        const t = e.find(({ name: o }) => o === "information"), i = e.find(({ name: o }) => o === "comment");
        t && !t.fonticon && (n.find(({ name: o }) => o === "information").fonticon = "info"), i && !i.fonticon && (n.find(({ name: o }) => o === "comment").fonticon = "comment");
      }
      return this.actionsMerge(e, n, this.customActions);
    },
    _sideActions() {
      return this.actionsMerge(this.sideActions, Ms, this.customSideActions);
    }
  },
  mounted() {
    this.onResize();
    const e = new ResizeObserver(() => {
      (!this.animatedPanels || !this.shownRightPanel || this.transforms.responsive) && this.onResize();
    });
    e.observe(this.$refs.lightbox), this.resizeObserver = e, this.shownRightPanel && this.updateRightPanelsObservers(this.shownRightPanel);
    const n = this;
    !this.noCompass && window && window.require && window.require(["DS/UWPClientCode/Data/Utils", "DS/UWPClientCode/PublicAPI"], (t, i) => {
      this.getCompassUrl = () => {
        t.getServiceUrl({
          serviceName: "3DCompass",
          onComplete: (o) => {
            n.serviceUrl = o;
          },
          onFailure: () => {
            UWA && UWA.debug && console.error("Lightbox Compass failed to retrieve 3DCompass service url");
          },
          scope: n
        });
      }, this.userId ? this.getCompassUrl() : i.getCurrentUser().then(
        ({ login: o }) => {
          n.userId = o, this.getCompassUrl();
        },
        () => this.getCompassUrl()
      );
    });
  },
  watch: {
    openCompass() {
      this.onResize();
    },
    shownRightPanel(e) {
      this.updateRightPanelsObservers(e);
    },
    outAnimate(e) {
      e && this.onResize(), e && setTimeout(() => {
        this.outAnimate = !1;
      }, 500);
    }
  },
  methods: {
    addCustomAction(e) {
      const n = this.customItems.find(({ name: t }) => t === e.name);
      n ? this.customItems[this.customItems.indexOf(n)] = e : this.customItems.push(e);
    },
    clearCustomActions() {
      this.customItems = [];
    },
    showPanel(e, n = !0) {
      if (!this.panelStates.length)
        return;
      n && this.hideAllPanels(e, !1);
      const t = this.panelStates.find(({ name: i }) => e === i);
      this.showRightPanel || (this.inAnimate = !0), t.show = !0;
    },
    hidePanel(e) {
      if (!this.panelStates.length)
        return;
      const n = this.panelStates.find(({ name: t }) => e === t);
      n.show = !1;
    },
    hideAllPanels(e = "", n = !0) {
      this.panelStates.length && (this.panelStates.filter(({ name: t }) => t !== e).forEach((t) => {
        t.show = !1;
      }), n && (this.outAnimate = !0));
    },
    actionsMerge(e, n, t) {
      let i = e;
      return t || (i = e.slice(0, n.length).filter(({ name: o }) => n.find(({ name: s }) => o === s)), i = i.map((o) => ({
        // If component user messes up order \o/
        ...n.find(({ name: s }) => o.name === s),
        ...o
      }))), i = i.map((o) => {
        if (o.text === void 0) {
          const s = this.capitalize(o.name);
          o.text = s;
        }
        return o;
      }), i;
    },
    onResize(e) {
      const { clientWidth: n } = this.$refs.lightbox;
      let t;
      if (n > 639) {
        const i = Math.min(n * 0.125 + 240, 480);
        t = {
          responsive: !1,
          left: {
            width: `${i}px`
          },
          center: {
            "margin-left": this.openCompass ? `${i}px` : 0,
            "margin-right": this.animatedPanels && e ? `${(e == null ? void 0 : e.clientWidth) || 0}px` : this.shownRightPanel ? `${i}px` : 0
          },
          right: {
            width: `${i}px`
          }
        };
      } else
        t = { responsive: !0, center: {}, right: {} };
      this.transforms = t;
    },
    updateRightPanelsObservers(e) {
      if (this.rightPanelResizeObserver && (this.rightPanelResizeObserver.stop(), delete this.rightPanelResizeObserver), e) {
        const n = this.panelsRefs[e == null ? void 0 : e.name];
        this.rightPanelResizeObserver = Kn(n, () => {
          this.onResize(n.$el);
        });
      } else
        this.onResize();
    }
  },
  beforeUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), delete this.resizeObserver;
  }
}, Nc = (e) => (et("data-v-70d4f63e"), e = e(), tt(), e), Rc = ["data-id"], Hc = /* @__PURE__ */ Nc(() => /* @__PURE__ */ b("div", { class: "lightbox__overlay" }, null, -1)), jc = ["src"], Uc = {
  key: 0,
  class: "panel__header"
}, Wc = { class: "panel__title" }, qc = { class: "panel__title__text" };
function Kc(e, n, t, i, o, s) {
  const a = $("VuLightboxBar"), u = $("VuIconBtn");
  return l(), r("div", null, [
    C(e.$slots, "lightbox-activator", {}, void 0, !0),
    b("div", {
      ref: "lightbox",
      class: k(["vu-lightbox", {
        "lightbox--responsive": o.transforms.responsive,
        "lightbox--widget-header": t.widget,
        "vu-lightbox--appear-faster": !t.widget && !t.noAnimation && t.fasterAnimation,
        "vu-lightbox--appear-fast": !t.widget && !t.noAnimation && !t.fasterAnimation,
        "overflow-hidden": t.animatedPanels
      }]),
      style: G({
        zIndex: t.zIndex
      }),
      "data-id": o.uid
    }, [
      T(a, J({
        label: t.title,
        "show-compass": !s.noCompass,
        class: { "lightbox-bar--compass-open": o.openCompass },
        type: s.typeInfo,
        items: s._primaryActions,
        "sub-items": t.menuActions,
        "right-items": s._sideActions,
        responsive: o.transforms.responsive,
        "show-close-icon": !t.hideCloseIcon
      }, { disableCompass: t.disableCompass, customItems: o.customItems, dropdownOverlay: t.dropdownOverlay, widget: t.widget, moreActionsLabel: t.moreActionsLabel, closeLabel: t.closeLabel }, lt({ ...s.listeners, ...s.listenersFromProps }), {
        onClickCompass: n[0] || (n[0] = () => {
          t.disableCompass || (o.openCompass = !o.openCompass, o.compassAlreadyOpened = !0), e.$emit("click-compass", o.openCompass);
        })
      }), {
        "lightbox-bar__object-type": V((c) => [
          C(e.$slots, "lightbox-bar__object-type", Ke(Xe(c)), void 0, !0)
        ]),
        "lightbox-bar__title": V((c) => [
          C(e.$slots, "lightbox-bar__title", Ke(Xe(c)), void 0, !0)
        ]),
        "lightbox-bar__special-actions": V(() => [
          C(e.$slots, "lightbox-bar__special-actions", {}, void 0, !0)
        ]),
        _: 3
      }, 16, ["label", "show-compass", "class", "type", "items", "sub-items", "right-items", "responsive", "show-close-icon"]),
      Hc,
      b("div", {
        ref: "content",
        class: "lightbox__content",
        style: G(o.transforms.center || {})
      }, [
        C(e.$slots, "lightbox-content", {}, void 0, !0)
      ], 4),
      !s.noCompass && o.compassAlreadyOpened ? H((l(), S(Wt(t.animatedPanels ? "vu-side-panel" : "div"), {
        key: 0,
        modelValue: o.openCompass,
        side: e.left,
        class: k(t.animatedPanels ? "" : "column"),
        topbar: !0,
        animate: !0,
        style: G(o.transforms.left || {})
      }, {
        default: V(() => [
          b("iframe", {
            class: "compass",
            src: s.compassIframeUrl
          }, null, 8, jc),
          o.transforms.responsive ? (l(), S(u, {
            key: 0,
            icon: "close",
            style: { position: "absolute", right: "0", top: "0", zindex: "21" },
            onClick: n[1] || (n[1] = (c) => o.openCompass = !1)
          })) : f("", !0)
        ]),
        _: 1
      }, 8, ["modelValue", "side", "class", "style"])), [
        [Me, o.openCompass]
      ]) : f("", !0),
      (l(!0), r(M, null, U(s._panels, ({ name: c, show: d, showClose: h = !1, showEdit: p, classes: _ = [], title: v }, y) => H((l(), S(Wt(t.animatedPanels ? "vu-side-panel" : "div"), J({
        key: `${o.uid}-${y}`,
        modelValue: typeof d == "object" ? d.value : d,
        class: ["vu-panel", [
          ..._,
          {
            "panel--responsive": o.transforms.responsive,
            "slide-in-right": o.inAnimate,
            "slide-out-right": o.outAnimate
          },
          c,
          t.animatedPanels ? "full-height flex-col side-panel--column" : ["column", "lightbox__panel", "lightbox__panel--right"]
        ]],
        animate: !0,
        side: "right",
        ref_for: !0,
        ref: (L) => {
          c && (o.panelsRefs[c] = L);
        },
        style: [
          t.animatedPanels ? "" : o.transforms.right
        ]
      }, t.animatedPanels ? {
        smallCloseIcon: !0,
        title: v,
        showEdit: p,
        showClose: h,
        topbar: !o.transforms.responsive,
        vOnPanelEdit: () => e.$emit(`panel-edit-${c}`)
      } : {}, {
        "onUpdate:modelValue": (L) => {
          L || e.$emit(`close-panel-${c}`);
        }
      }), {
        default: V(() => [
          !t.animatedPanels && v ? (l(), r("div", Uc, [
            b("span", Wc, [
              b("span", qc, w(v), 1),
              p ? (l(), S(u, {
                key: 0,
                class: "panel__edit__icon",
                icon: "pencil",
                onClick: (L) => e.$emit(`panel-edit-${c}`)
              }, null, 8, ["onClick"])) : f("", !0)
            ]),
            h ? (l(), S(u, {
              key: 0,
              class: "panel__close_icon",
              icon: "close",
              onClick: (L) => e.$emit(`close-panel-${c}`)
            }, null, 8, ["onClick"])) : f("", !0)
          ])) : !t.animatedPanels && (o.transforms.responsive || h) ? (l(), S(u, {
            key: 1,
            class: "panel__close_icon",
            icon: "close",
            onClick: (L) => e.$emit(`close-panel-${c}`)
          }, null, 8, ["onClick"])) : f("", !0),
          b("div", {
            class: k([`vu-dynamic-panel-wrap-${c}`, "panel__content"])
          }, [
            C(e.$slots, `lightbox-panel-${c}`, {}, void 0, !0)
          ], 2)
        ]),
        _: 2
      }, 1040, ["modelValue", "class", "style", "onUpdate:modelValue"])), [
        [Me, t.animatedPanels ? !0 : typeof d == "object" ? d.value : d]
      ])), 128))
    ], 14, Rc)
  ]);
}
const Gc = /* @__PURE__ */ F(Ec, [["render", Kc], ["__scopeId", "data-v-70d4f63e"]]), Yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gc
}, Symbol.toStringTag, { value: "Module" })), Xc = {
  name: "vu-media-upload-droppable",
  props: {
    isOver: {
      type: Boolean
    },
    validDrop: {
      type: Boolean
    }
  },
  emits: ["drop"],
  inject: {
    vuMediaUploadDropText: {
      default: "Drop your files to upload"
    }
  },
  computed: {
    classes() {
      return {
        "vu-media-upload-droppable--valid": this.validDrop
      };
    }
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {},
  components: { VuIcon: ue }
}, Jc = { class: "vu-media-upload-droppable__icon" }, Zc = { class: "vu-media-upload-droppable__label" };
function Qc(e, n, t, i, o, s) {
  const a = $("VuIcon");
  return l(), r("div", {
    class: k(["vu-media-upload-droppable", s.classes]),
    onDrop: n[0] || (n[0] = re((u) => e.$emit("drop", u), ["prevent", "stop"]))
  }, [
    C(e.$slots, "drop-main", {}, () => [
      b("div", Jc, [
        T(a, {
          icon: "up",
          color: "none"
        })
      ])
    ]),
    C(e.$slots, "drop-alt", {}, () => [
      b("span", Zc, w(s.vuMediaUploadDropText), 1)
    ])
  ], 34);
}
const Ti = /* @__PURE__ */ F(Xc, [["render", Qc]]), eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ti
}, Symbol.toStringTag, { value: "Module" })), th = {
  name: "vu-media-upload-empty",
  components: { VuIcon: ue, VuBtn: Ye, VuIconLink: ds },
  props: {
    rich: {
      // default: true,
      type: Boolean
    }
  },
  emits: ["browse"],
  inject: {
    vuMediaUploadPlaceholderLong: {
      default: "Drag & Drop files here"
    },
    vuMediaUploadPlaceholder: {
      default: "Drag & Drop or"
    },
    vuMediaUploadOR: {
      default: "or"
    },
    vuMediaUploadBrowse: {
      default: "Browse Files"
    }
  }
}, nh = { class: "vu-media-upload-empty" }, sh = { class: "vu-media-upload-empty__OR" }, ih = { key: 1 };
function oh(e, n, t, i, o, s) {
  const a = $("VuIcon"), u = $("VuBtn"), c = $("VuIconLink");
  return l(), r("div", nh, [
    T(a, { icon: "drag-drop" }),
    t.rich ? (l(), r(M, { key: 0 }, [
      b("span", null, w(s.vuMediaUploadPlaceholderLong), 1),
      b("span", sh, w(s.vuMediaUploadOR), 1),
      T(u, {
        onClick: n[0] || (n[0] = (d) => e.$emit("browse")),
        color: "primary"
      }, {
        default: V(() => [
          X(w(s.vuMediaUploadBrowse), 1)
        ]),
        _: 1
      })
    ], 64)) : (l(), r("div", ih, [
      X(w(s.vuMediaUploadPlaceholder), 1),
      T(c, {
        onClick: n[1] || (n[1] = (d) => e.$emit("browse"))
      }, {
        default: V(() => [
          X(w(s.vuMediaUploadBrowse), 1)
        ]),
        _: 1
      })
    ]))
  ]);
}
const xi = /* @__PURE__ */ F(th, [["render", oh], ["__scopeId", "data-v-e72d88bf"]]), lh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xi
}, Symbol.toStringTag, { value: "Module" })), ah = {
  name: "vu-media-upload-error",
  inject: {
    vuMediaUploadRetry: {
      default: "Retry"
    }
  },
  emits: ["retry"],
  props: {
    icon: {
      type: String,
      default: "attention"
    },
    // eslint-disable-next-line vue/require-prop-types
    errorBucket: {
      default: () => []
    }
  },
  components: { VuIconBtn: de, VuBtn: Ye }
}, rh = { class: "vu-media-upload-error" };
function uh(e, n, t, i, o, s) {
  const a = $("VuIconBtn"), u = $("VuBtn");
  return l(), r("div", rh, [
    T(a, {
      icon: t.icon,
      class: "vu-media-upload-error__icon"
    }, null, 8, ["icon"]),
    (l(!0), r(M, null, U(t.errorBucket, (c, d) => (l(), r("span", {
      class: "vu-media-upload-error__error_label",
      key: d
    }, w(c), 1))), 128)),
    T(u, {
      onClick: n[0] || (n[0] = (c) => e.$emit("retry")),
      class: "vu-media-upload-error__retry",
      small: ""
    }, {
      default: V(() => [
        X(w(s.vuMediaUploadRetry), 1)
      ]),
      _: 1
    })
  ]);
}
const Mi = /* @__PURE__ */ F(ah, [["render", uh], ["__scopeId", "data-v-1ea45111"]]), dh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mi
}, Symbol.toStringTag, { value: "Module" })), ch = {
  name: "vu-progress-circular",
  mixins: [Tt],
  data() {
    return {
      progressAngle: this.value / this.total * 100 * 3.6,
      intervalId: null,
      completedView: this.value >= this.total
    };
  },
  props: {
    value: {
      default: 0,
      type: Number
    },
    total: {
      default: 100,
      type: Number
    },
    radius: {
      default: 60,
      type: Number
    },
    noHatch: {
      default: !1,
      type: Boolean
    },
    unfilledColor: {
      type: String,
      default: "#d1d4d4"
      // $grey-4
    },
    color: {
      type: String,
      default: () => "default",
      validator(e) {
        return ["default", "success", "warning", "error"].includes(e);
      }
    },
    hexColor: {
      type: String,
      required: !1,
      default: ""
    },
    speedModifier: {
      type: Number,
      default: 1
    }
  },
  watch: {
    total() {
      this.animateProgress();
    },
    value() {
      this.animateProgress();
    }
  },
  computed: {
    radiusPx() {
      return `${this.radius}px`;
    },
    formattedCompletedCount() {
      return this.value < this.total ? this.value : this.total;
    },
    progressPercentage() {
      return this.value / this.total * 100;
    },
    renderHatch() {
      return !this.noHatch && this.value < this.total;
    }
  },
  methods: {
    updateAngle(e) {
      this.completedView = !1;
      const n = Math.abs(this.progressAngle - e);
      Math.round(this.progressAngle) < Math.round(e) ? n <= this.speedModifier ? this.progressAngle = e : this.progressAngle += this.speedModifier : Math.round(this.progressAngle) > Math.round(e) ? n <= this.speedModifier ? this.progressAngle = e : this.progressAngle -= this.speedModifier : (clearInterval(this.intervalId), this.value >= this.total && (this.completedView = !0));
    },
    animateProgress() {
      this.intervalId && clearInterval(this.intervalId);
      const e = this.progressPercentage * 3.6;
      this.intervalId = setInterval(this.updateAngle.bind(this, e), 5);
    }
  },
  beforeUnmount() {
    this.intervalId && clearInterval(this.intervalId);
  }
}, hh = { class: "vu-progress-circular" }, fh = { class: "vu-progress-circular__content" };
function ph(e, n, t, i, o, s) {
  return l(), r("div", hh, [
    b("div", {
      class: k(["vu-progress-circular__circle", t.hexColor ? "" : `vu-progress-circular--${t.color}`]),
      style: G({
        background: `conic-gradient( currentcolor ${o.progressAngle}deg, ${t.unfilledColor} ${o.progressAngle}deg)`,
        width: s.radiusPx,
        height: s.radiusPx,
        color: t.hexColor !== void 0 && t.hexColor,
        "-webkit-mask": `radial-gradient(${t.radius * (2 / 5)}px, #0000 98%, #000)`
      })
    }, [
      s.renderHatch ? (l(), r("div", {
        key: 0,
        class: k(["vu-progress-circular__hatch-container", { "vu-progress-circular__hatch-clip": o.progressAngle < 180 }])
      }, [
        b("div", {
          class: "vu-progress-circular__hatch",
          style: G(`transform: rotate(${o.progressAngle}deg)`)
        }, null, 4)
      ], 2)) : f("", !0)
    ], 6),
    b("div", fh, [
      o.completedView && this.$slots.complete ? C(e.$slots, "complete", { key: 0 }, void 0, !0) : C(e.$slots, "default", { key: 1 }, () => [
        T(It, {
          name: "fade",
          mode: "out-in"
        }, {
          default: V(() => [
            b("div", {
              key: "uncomplete-view",
              style: G({ fontSize: `${t.radius / 5}px` })
            }, w(Math.round(o.progressAngle / 360 * 100)) + "% ", 5)
          ]),
          _: 1
        })
      ], !0)
    ])
  ]);
}
const Vi = /* @__PURE__ */ F(ch, [["render", ph], ["__scopeId", "data-v-2cca5b59"]]), mh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Vi
}, Symbol.toStringTag, { value: "Module" })), vh = {
  name: "vu-media-upload-loading",
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  inject: {
    vuMediaUploadAbortButton: {
      default: "Abort"
    }
  },
  emits: ["upload-abort"],
  components: { VuProgressCircular: Vi, VuBtn: Ye }
}, gh = { class: "vu-media-upload-loading" };
function bh(e, n, t, i, o, s) {
  const a = $("VuProgressCircular"), u = $("VuBtn");
  return l(), r("div", gh, [
    T(a, { value: t.progress }, null, 8, ["value"]),
    T(u, {
      color: "default",
      onClick: n[0] || (n[0] = (c) => e.$emit("upload-abort")),
      small: "",
      class: "vu-media-upload-loading__abort"
    }, {
      default: V(() => [
        X(w(s.vuMediaUploadAbortButton), 1)
      ]),
      _: 1
    })
  ]);
}
const Pi = /* @__PURE__ */ F(vh, [["render", bh], ["__scopeId", "data-v-65c4aae6"]]), yh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Pi
}, Symbol.toStringTag, { value: "Module" })), _h = {
  name: "vu-media-upload-preview",
  computed: {
    videoSizer() {
      var i;
      const [e, n] = (i = this.displayRatio) == null ? void 0 : i.replace(",", "").split("/"), t = Number(e) / Number(n);
      return t ? { paddingBottom: `${1 / t * 100}%` } : void 0;
    }
  },
  props: {
    deleteIcon: {
      type: String,
      default: () => "trash"
    },
    src: {
      type: String,
      required: !0
    },
    isVideo: {
      type: Boolean
    },
    videoControls: {
      type: Boolean,
      required: !1
    },
    displayRatio: {
      type: String,
      default: () => "16 / 9"
    }
  },
  emits: ["delete"],
  components: { VuImage: it, VuIconBtn: de }
}, wh = ["src", "controls"];
function kh(e, n, t, i, o, s) {
  const a = $("VuIconBtn"), u = $("VuImage"), c = $("vu-spinner");
  return l(), r(M, null, [
    t.isVideo ? (l(), r("div", {
      key: 0,
      class: "vu-media-upload-preview__video-container",
      style: G(s.videoSizer)
    }, [
      b("video", {
        class: "vu-media-upload-preview",
        src: t.src,
        controls: t.videoControls
      }, null, 8, wh)
    ], 4)) : t.isVideo ? e.loading ? (l(), S(c, { key: 2 })) : f("", !0) : (l(), S(u, {
      key: 1,
      class: "vu-media-upload-preview",
      "aspect-ratio": t.displayRatio,
      src: t.src,
      contain: "",
      style: { height: "100%" }
    }, {
      default: V(() => [
        b("div", {
          class: "vu-media-upload-preview__delete-icon",
          onClick: n[0] || (n[0] = (d) => e.$emit("delete"))
        }, [
          T(a, { icon: t.deleteIcon }, null, 8, ["icon"])
        ])
      ]),
      _: 1
    }, 8, ["aspect-ratio", "src"])),
    t.isVideo ? (l(), r("div", {
      key: 3,
      class: "vu-media-upload-preview__delete-icon",
      onClick: n[1] || (n[1] = (d) => e.$emit("delete"))
    }, [
      T(a, { icon: t.deleteIcon }, null, 8, ["icon"])
    ])) : f("", !0)
  ], 64);
}
const Li = /* @__PURE__ */ F(_h, [["render", kh], ["__scopeId", "data-v-d9cd5744"]]), Sh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Li
}, Symbol.toStringTag, { value: "Module" })), Ih = {
  empty: "empty",
  loading: "loading",
  error: "error",
  complete: "complete"
}, Ch = {
  name: "vu-media-upload",
  mixins: [Fe, $e, vt, ze, Ee],
  props: {
    icon: {
      type: String,
      default: () => ""
    },
    mediaUrl: {
      type: String,
      default: () => ""
    },
    video: {
      type: Boolean,
      default: !1
    },
    videoControls: {
      type: Boolean,
      default: !0
    },
    uploadProgress: {
      type: Number,
      required: !1,
      default: void 0
    },
    fileMaxSize: {
      type: Number,
      default: () => 1 / 0
    },
    displayRatio: {
      type: String,
      default: () => "16 / 9"
    },
    showLabel: {
      type: Boolean
    },
    multiple: {
      type: Boolean
    },
    allowLoadingDrop: {
      type: Boolean
    },
    allowErrorDrop: {
      type: Boolean
    },
    skipTypeCheck: {
      type: Boolean,
      required: !1
    },
    noDragNDrop: {
      type: Boolean,
      required: !1
    },
    acceptVideo: Boolean,
    acceptImage: {
      type: Boolean,
      default: !0
    },
    state: {
      type: String,
      default: ""
    }
  },
  inject: {
    vuMediaUploadSizeExcess: {
      default: "File exceeds maximum size."
    },
    vuMediaUploadShouldBeImage: {
      default: "Please select an image."
    },
    vuMediaUploadShouldBeVideo: {
      default: "Please select a video."
    }
  },
  data() {
    return {
      states: Ih,
      innerState: "empty",
      innerVideo: !1,
      allowDrop: !1,
      dragged: !1,
      error: ""
    };
  },
  created() {
    this.localRules = [this.checkVideoType, this.checkImgType, this.checkFileSize];
  },
  emits: ["update:state", "upload-abort", "select", "delete", "retry"],
  computed: {
    preview() {
      return {
        src: this.mediaUrl,
        isVideo: this.video || this.innerVideo,
        displayRatio: this.displayRatio,
        videoControls: this.videoControls
      };
    },
    hasLabel() {
      return this.showLabel && !this.multiple;
    },
    wrapStyle() {
      return {
        "aspect-ratio": this.displayRatio
      };
    },
    status: {
      get() {
        return this.state || this.innerState;
      },
      set(e) {
        this.$emit("update:state", e), this.innerState = e;
      }
    }
  },
  watch: {
    hasError(e) {
      e && (this.status = this.states.error);
    }
  },
  methods: {
    selectFiles(e) {
      this.multiple && e.length > 1 ? (this.status = this.states.loading, this.$emit("select", e)) : this.skipTypeCheck ? (this.status = this.states.loading, this.$emit("select", e)) : this.validate(e[0]) && (this.status = this.states.loading, this.$emit("select", e));
    },
    dragOver() {
      this.noDragNDrop || this.state !== this.states.complete && (this.state === this.states.loading && !this.allowLoadingDrop || this.state === this.states.error && !this.allowErrorDrop || (this.allowDrop = !0, this.dragged = !0));
    },
    dragLeave(e) {
      e.currentTarget.contains(e.relatedTarget) || (this.dragged = !1, this.allowDrop = !1);
    },
    onFileDrop(e) {
      this.dragged = !1, this.allowDrop = !1, this.status = this.states.loading, this.selectFiles(e.dataTransfer.files);
    },
    checkFileSize({ size: e }) {
      return this.fileMaxSize && e / 1024 / 1024 >= this.fileMaxSize ? this.vuMediaUploadSizeExcess : !0;
    },
    /* 3 checks disablable with skipTypeCheck */
    checkImgType({ type: e }) {
      if (this.acceptImage) {
        const n = /image\/(jpg|jpeg|png|webp)$/i.test(e);
        if (n && (this.innerVideo = !1), !this.acceptVideo)
          return n || this.vuMediaUploadShouldBeImage;
      }
      return !0;
    },
    checkVideoType({ type: e }) {
      if (this.acceptVideo) {
        const n = /video\/(mp4|avi)$/i.test(e);
        if (this.innerVideo = n, !this.acceptImage)
          return n || this.vuMediaUploadShouldBeVideo;
      }
      return !0;
    },
    checkVideoAndImgType({ type: e }) {
      return this.acceptVideo && this.acceptImage ? /video\/(mp4|avi)$/i.test(e) && /image\/(jpg|jpeg|png|webp)$/i.test(e) || this.vuMediaUploadTypeUnexpected : !0;
    },
    onRetry() {
      this.errorBucket = [], this.status = this.states.empty, this.$emit("retry", this.$refs["upload-input"].value);
    }
  },
  components: { VuIcon: ue, VuMediaUploadDroppable: Ti, VuMediaUploadLoading: Pi, VuMediaUploadError: Mi, VuMediaUploadEmpty: xi, VuMediaUploadPreview: Li }
}, Bh = {
  key: 0,
  class: "control-label"
}, $h = {
  key: 0,
  class: "label-field-required"
}, Oh = ["multiple"];
function Th(e, n, t, i, o, s) {
  const a = $("VuIcon"), u = $("VuMediaUploadDroppable"), c = $("VuMediaUploadEmpty"), d = $("VuMediaUploadLoading"), h = $("VuMediaUploadError"), p = $("vuMediaUploadPreview");
  return l(), r("div", {
    class: k(["vu-media-upload", [{ "has-error": o.error, "vu-media-upload--border": !s.hasLabel, "vu-media-upload--inner-flex": s.hasLabel }]]),
    style: G(s.hasLabel ? {} : s.wrapStyle)
  }, [
    s.hasLabel ? (l(), r("label", Bh, [
      t.icon ? (l(), S(a, {
        key: 0,
        icon: t.icon
      }, null, 8, ["icon"])) : f("", !0),
      C(e.$slots, "label", {}, () => [
        X(w(e.label), 1),
        e.required ? (l(), r("span", $h, " *")) : f("", !0)
      ], !0)
    ])) : f("", !0),
    b("input", {
      ref: "upload-input",
      type: "file",
      name: "upload",
      style: { display: "none" },
      onChange: n[0] || (n[0] = (_) => s.selectFiles(e.$refs["upload-input"].files)),
      multiple: t.multiple
    }, null, 40, Oh),
    b("div", {
      class: k(["vu-media-upload__inner", { "vu-media-upload--border": s.hasLabel, "full-height": !s.hasLabel }]),
      ref: "inner",
      style: G(s.hasLabel ? s.wrapStyle : ""),
      onDragover: n[4] || (n[4] = re((_) => s.dragOver(), ["prevent"])),
      onDragenter: n[5] || (n[5] = re((_) => s.dragOver(), ["prevent"])),
      onDragleave: n[6] || (n[6] = (..._) => s.dragLeave && s.dragLeave(..._)),
      onDragend: n[7] || (n[7] = (..._) => s.dragLeave && s.dragLeave(..._))
    }, [
      o.dragged ? (l(), S(u, {
        key: 0,
        "valid-drop": o.allowDrop,
        onDrop: s.onFileDrop
      }, {
        "drop-icon": V(() => [
          C(e.$slots, "drop-icon", {}, void 0, !0)
        ]),
        "drop-label": V(() => [
          C(e.$slots, "drop-label", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["valid-drop", "onDrop"])) : f("", !0),
      s.status === o.states.empty ? C(e.$slots, "empty", {
        key: 1,
        input: e.$refs["upload-input"]
      }, () => [
        T(c, {
          onBrowse: n[1] || (n[1] = (_) => {
            e.$refs["upload-input"].value = "", e.$refs["upload-input"].click();
          })
        })
      ], !0) : s.status === o.states.loading ? C(e.$slots, "loading", { key: 2 }, () => [
        T(d, {
          progress: t.uploadProgress,
          onUploadAbort: n[2] || (n[2] = (_) => e.$emit("upload-abort"))
        }, null, 8, ["progress"])
      ], !0) : s.status === o.states.error ? C(e.$slots, "error", { key: 3 }, () => [
        T(h, J({ onRetry: s.onRetry }, { errorBucket: e.errorBucket }), null, 16, ["onRetry"])
      ], !0) : s.status === o.states.complete ? C(e.$slots, "preview", { key: 4 }, () => [
        T(p, J(s.preview, {
          onDelete: n[3] || (n[3] = (_) => {
            e.$emit("delete"), s.status = o.states.empty;
          })
        }), null, 16)
      ], !0) : f("", !0)
    ], 38)
  ], 6);
}
const xh = /* @__PURE__ */ F(Ch, [["render", Th], ["__scopeId", "data-v-b2db812d"]]), Mh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xh
}, Symbol.toStringTag, { value: "Module" }));
var Ln = /* @__PURE__ */ ((e) => (e[e.TIMEOUT = 0] = "TIMEOUT", e[e.CLOSE = 1] = "CLOSE", e[e.PROGRAMMATICALLY = 2] = "PROGRAMMATICALLY", e))(Ln || {});
let ct = {
  create: () => {
  },
  hide: () => {
  },
  _exists: () => !1,
  _register: () => {
  },
  _installed: !1
};
Object.defineProperty(ct, "_installed", {
  value: !1,
  writable: !1
});
function Vh(e, n) {
  const t = pt([]), i = pt({}), o = e.runWithContext(() => xe("vuDebug", { default: !1 }));
  if (n && ct._installed) {
    o && console.warn("VUEKIT - Message API install was called more than once. Using namespace on message container will help.");
    return;
  }
  ct._installed && o && console.warn("VUEKIT - Message API mutliple installation might affect other default container namespaces.");
  const s = Rn({
    _messages: i,
    namespaces: t,
    _installed: !0,
    create(a, u) {
      const { target: c = "main" } = a;
      if (!this._exists(c))
        throw new Error("Target namespace is unknown");
      const d = pt({
        id: crypto.randomUUID(),
        bind: {
          target: c,
          ...a,
          disposed: !1
        },
        onDispose: u,
        dispose(h) {
          s.hide(
            d,
            h ?? 2
            /* PROGRAMMATICALLY */
          );
        }
      });
      return this._messages[c].push(d), d;
    },
    hide(a, u) {
      var h;
      if (!a)
        return;
      const { target: c = "main" } = a.bind, d = this._messages[c].findIndex((p) => p.id === a.id);
      if (d !== -1) {
        const p = this._messages[c][d];
        this._messages[c].splice(d, 1), p.bind.disposed = !0, (h = p.onDispose) == null || h.call(p, u);
      }
    },
    _exists(a) {
      return t.includes(a);
    },
    _register(a) {
      t.push(a), this._messages[a] = mt([]);
    }
  });
  ct = s, e.provide("vuMessageAPI", ct), e.config.globalProperties.$vuMessage = ct;
}
const Ph = {
  name: "vu-message",
  mixins: [xt, Tt],
  components: { VuIconLink: ds },
  props: {
    text: {
      type: String,
      default: () => ""
    },
    closable: {
      type: Boolean,
      default: () => !0
    },
    color: {
      type: String,
      default: () => "primary"
    },
    animate: {
      type: Boolean,
      default: () => !0
    },
    showProgress: {
      type: Boolean,
      default: () => !1
    },
    link: {
      type: String,
      required: !1
    },
    linkHandler: {
      type: Function,
      required: !1,
      default: () => () => {
      }
    },
    timeout: {
      type: Number,
      default: () => 0
    },
    animationDuration: {
      type: Number,
      default: 500
    },
    target: String
  },
  emits: ["update:show", "click-link"],
  data: () => ({
    DISPOSE_REASON: Ln,
    activeTimeout: 0,
    activeTimer: 0,
    in: !0,
    timerStart: 0,
    timer: 0
  }),
  inject: {
    noProgress: {
      from: ts
    }
  },
  computed: {
    colored() {
      return !!this.color;
    },
    classes() {
      return [`alert-${this.color}`, {
        "alert-closable": this.closable
      }];
    }
  },
  watch: {
    timeout() {
      this.setTimeout();
    },
    text() {
      this.setTimeout();
    },
    show(e) {
      e && this.setTimeout();
    }
  },
  beforeUnmount() {
    window.clearInterval(this.activeTimer), window.clearTimeout(this.activeTimeout);
  },
  mounted() {
    this.setTimeout();
  },
  methods: {
    dispose(e) {
      this.$emit("update:show", !1, e);
    },
    clearTimers() {
      window.clearInterval(this.activeTimer), window.clearTimeout(this.activeTimeout), this.timerStart = 0, this.timer = 0;
    },
    setTimeout() {
      this.clearTimers(), this.show && this.timeout && (this.timerStart = Date.now(), this.activeTimeout = window.setTimeout(() => {
        this.dispose(Ln.TIMEOUT);
      }, this.timeout + 100), this.showProgress && (this.activeTimer = window.setInterval(() => {
        this.timer = Date.now() - this.timerStart;
      }, 1e3 / 30)));
    }
  }
}, Lh = {
  key: 0,
  class: "icon fonticon"
}, Dh = { class: "alert-message-wrap" }, Ah = ["innerHTML"], Fh = ["max", "value"];
function zh(e, n, t, i, o, s) {
  const a = $("VuIconLink");
  return e.show ? (l(), r("div", {
    key: 0,
    class: k(["vu-message relative alert-has-icon", s.classes])
  }, [
    s.colored ? (l(), r("span", Lh)) : f("", !0),
    b("span", Dh, [
      C(e.$slots, "default", {}, () => [
        b("div", { innerHTML: t.text }, null, 8, Ah)
      ], !0)
    ]),
    t.link ? (l(), S(a, {
      key: 1,
      label: t.link,
      class: "vu-message_link",
      onClick: n[0] || (n[0] = () => {
        e.$emit("click-link", e.linkData), t.linkHandler();
      })
    }, null, 8, ["label"])) : f("", !0),
    t.closable ? (l(), r("span", {
      key: 2,
      class: "close fonticon fonticon-cancel",
      onClick: n[1] || (n[1] = (u) => s.dispose(e.DISPOSE_REASON.CLOSE))
    })) : f("", !0),
    t.showProgress && t.timeout && !s.noProgress ? (l(), r("progress", {
      key: 3,
      class: k(`progress animated bottom-0 absolute h-1! progress-${t.color}`),
      max: t.timeout,
      value: Math.min(e.timer, t.timeout)
    }, null, 10, Fh)) : f("", !0)
  ], 2)) : f("", !0);
}
const Di = /* @__PURE__ */ F(Ph, [["render", zh], ["__scopeId", "data-v-b7445009"]]), Eh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Di
}, Symbol.toStringTag, { value: "Module" })), Nh = {
  name: "vu-message-container",
  props: {
    namespace: {
      type: String,
      default: "main"
    }
  },
  created() {
    this.api = ct, this.api._exists(this.namespace) ? this.disabled = !0 : this.api._register(this.namespace);
  },
  data: () => ({
    api: {},
    disabled: !1
  }),
  components: { VuMessage: Di }
}, Rh = {
  key: 0,
  class: "alert alert-root",
  style: { visibility: "visible" }
};
function Hh(e, n, t, i, o, s) {
  const a = $("VuMessage");
  return e.disabled ? f("", !0) : (l(), r("div", Rh, [
    T(_o, { name: "fade" }, {
      default: V(() => {
        var u;
        return [
          (l(!0), r(M, null, U((u = e.api._messages) == null ? void 0 : u[t.namespace], (c) => (l(), S(a, J(c.bind, {
            show: "",
            key: `${c.id}`,
            "onUpdate:show": (d, h) => e.api.hide(c, h)
          }), null, 16, ["onUpdate:show"]))), 128))
        ];
      }),
      _: 1
    })
  ]));
}
const jh = /* @__PURE__ */ F(Nh, [["render", Hh], ["__scopeId", "data-v-ca849454"]]), Uh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jh
}, Symbol.toStringTag, { value: "Module" })), Wh = {
  name: "vu-mobile-dialog",
  emits: ["close", "confirm"],
  components: { VuScroller: Qe, VuIconBtn: de },
  props: {
    title: {
      type: String,
      default: ""
    },
    backIcon: {
      type: String,
      default: "close"
    },
    backIconTooltip: {
      type: String,
      default: "Close"
    },
    nextIcon: {
      type: String,
      default: "check"
    },
    nextIconTooltip: {
      type: String,
      default: "OK"
    },
    scrollable: {
      type: Boolean,
      default: !0
    },
    customNextIcon: {
      type: Boolean
    },
    customBackIcon: {
      type: Boolean
    },
    nextIconDisabled: {
      type: Boolean
    }
  },
  computed: {
    _backIcon() {
      return this.customBackIcon ? this.backIcon : ["chevron-left", "close"].includes(this.backIcon) ? this.backIcon : "-";
    },
    _icon() {
      return this.customNextIcon ? this.nextIcon : ["chevron-right", "send", "check"].includes(this.nextIcon) ? this.nextIcon : "-";
    },
    backClasses() {
      return [this._backIcon === "chevron-left" ? "chevron" : ""];
    },
    nextClasses() {
      return [this._icon === "chevron-right" ? "chevron" : ""];
    }
  }
}, qh = { class: "vu-mobile-dialog" }, Kh = { class: "vu-mobile-dialog__header" }, Gh = { class: "vu-mobile-dialog__header__default" }, Yh = {
  class: "vu-label-wrap",
  style: { overflow: "hidden" }
};
function Xh(e, n, t, i, o, s) {
  const a = $("VuIconBtn"), u = $("VuScroller"), c = _e("tooltip");
  return l(), r("div", qh, [
    b("div", Kh, [
      C(e.$slots, "mobile-dialog-header", {}, () => [
        b("div", Gh, [
          H(T(a, {
            icon: s._backIcon,
            class: k([s.backClasses, "vu-mobile-dialog__header_back topbar"]),
            onClick: n[0] || (n[0] = (d) => e.$emit("close"))
          }, null, 8, ["icon", "class"]), [
            [
              c,
              t.backIconTooltip,
              void 0,
              { bottom: !0 }
            ]
          ]),
          b("div", Yh, [
            H((l(), r("label", null, [
              X(w(t.title), 1)
            ])), [
              [
                c,
                t.title,
                void 0,
                { bottom: !0 }
              ]
            ])
          ]),
          H(T(a, {
            icon: s._icon,
            class: k([s.nextClasses, "vu-mobile-dialog__header_next topbar"]),
            disabled: t.nextIconDisabled,
            onClick: n[1] || (n[1] = (d) => e.$emit("confirm"))
          }, null, 8, ["icon", "class", "disabled"]), [
            [
              c,
              t.nextIconTooltip,
              void 0,
              { bottom: !0 }
            ]
          ])
        ])
      ], !0)
    ]),
    b("div", {
      class: k(["vu-mobile-dialog__content", `vu-mobile-dialog__content--${t.scrollable ? "" : "non-"}scrollable`])
    }, [
      t.scrollable ? (l(), S(u, { key: 0 }, {
        default: V(() => [
          C(e.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      })) : C(e.$slots, "default", { key: 1 }, void 0, !0)
    ], 2)
  ]);
}
const Ai = /* @__PURE__ */ F(Wh, [["render", Xh], ["__scopeId", "data-v-37f003ee"]]), Jh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ai
}, Symbol.toStringTag, { value: "Module" })), Zh = {
  name: "vu-modal",
  data: () => ({
    model: "",
    mobileWidth: !1,
    resizeObs: {},
    pick: ls,
    pickNRename: Ya
  }),
  emits: ["close", "cancel", "confirm"],
  mixins: [xt],
  props: {
    show: {
      type: Boolean,
      required: !1,
      default: () => !1
    },
    keepRendered: {
      type: Boolean,
      default: () => !1
    },
    title: {
      type: String,
      default: () => ""
    },
    message: {
      type: String,
      default: () => ""
    },
    rawContent: {
      type: String,
      default: ""
    },
    keyboard: {
      type: Boolean,
      default: () => !0
    },
    showCancelIcon: {
      type: Boolean,
      default: () => !0
    },
    showCancelButton: {
      type: Boolean,
      default: () => !1
    },
    showFooter: {
      type: Boolean,
      default: () => !0
    },
    showInput: {
      type: Boolean,
      default: () => !1
    },
    /* input props */
    label: {
      type: String,
      default: () => ""
    },
    helper: {
      type: String,
      default: () => ""
    },
    placeholder: {
      type: String,
      default: () => ""
    },
    rules: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: () => !0
    },
    success: {
      type: Boolean,
      default: () => !1
    },
    disableKeyboardConfirm: {
      type: Boolean,
      default: !1
    },
    autofocus: {
      type: Boolean,
      required: !1
    },
    autofocusRef: {
      type: Object,
      required: !1
    },
    /* input props */
    cancelLabel: {
      type: String,
      default: () => "Cancel"
    },
    okLabel: {
      type: String,
      default: () => "OK"
    },
    formRef: {
      type: Object,
      required: !1
    },
    /* mobile specific props */
    noMobile: {
      type: Boolean
    },
    mobileNextIcon: {
      type: String
    },
    mobileNextIconTooltip: {
      type: String
    },
    mobileCustomNextIcon: {
      type: Boolean
    },
    mobileNextIconDisabled: {
      type: Boolean
    },
    mobileBackIcon: {
      type: String
    },
    mobileBackIconTooltip: {
      type: String
    },
    mobileCustomBackIcon: {
      type: Boolean
    },
    mobileScrollable: {
      type: Boolean
    },
    /* cancel */
    // eslint-disable-next-line vue/prop-name-casing
    _cancel: Boolean
  },
  inject: {
    vuMobileBreakpoint: {
      default: () => "640"
    }
  },
  watch: {
    _cancel(e) {
      e && this.cancel();
    },
    show: {
      immediate: !0,
      handler(e) {
        this.innerShow = !!e;
      }
    }
  },
  beforeMount() {
    this.noMobile || (this.checkWidth(), window.addEventListener("resize", this.checkWidth));
  },
  mounted() {
    this.show && this.setFocus();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkWidth);
  },
  updated() {
    this.show && this.setFocus();
  },
  methods: {
    cancel(e = !1, n = !1) {
      this.innerShow = !1, e ? this.$emit(e ? "close" : "cancel") : this.$emit(n && this.showCancelButton ? "cancel" : "close"), this.showInput && this.clear();
    },
    confirm() {
      !this.showInput && !this.formRef ? (this.$emit("confirm", !0), this.innerShow = !1) : this.validate() && (this.$emit("confirm", this.model), this.innerShow = !1, this.clear());
    },
    validate(e) {
      var n;
      return typeof ((n = this.formRef) == null ? void 0 : n.validate) == "function" ? this.formRef.validate() : this.$refs.form.validate(e);
    },
    clear() {
      this.model = "";
    },
    checkWidth() {
      window.document.documentElement.clientWidth < this.vuMobileBreakpoint ? this.mobileWidth = !0 : this.mobileWidth = !1;
    },
    setFocus() {
      var e;
      if (this.autofocus || this.autofocusRef) {
        const n = (e = this.$refs) == null ? void 0 : e.input;
        this.autofocusRef ? this.autofocusRef.focus() : n && n.focus();
      }
    }
  },
  components: { VuMobileDialog: Ai, VuInput: Ci, VuForm: wi, VuBtn: Ye }
}, Qh = { key: 0 }, ef = ["innerHTML"], tf = { key: 1 }, nf = {
  class: "vu-modal modal modal-root",
  style: { display: "block" }
}, sf = { class: "modal-wrap" }, of = { class: "modal-header" }, lf = { class: "modal-body" }, af = ["innerHTML"], rf = { key: 1 }, uf = {
  key: 0,
  class: "modal-footer"
}, df = /* @__PURE__ */ b("div", { class: "modal-overlay in" }, null, -1);
function cf(e, n, t, i, o, s) {
  const a = $("VuInput"), u = $("VuForm"), c = $("VuMobileDialog"), d = $("VuBtn");
  return t.keepRendered || e.innerShow ? H((l(), r("div", Qh, [
    !t.noMobile && e.mobileWidth ? (l(), S(c, J({ key: 0 }, {
      ...e.pick(e.$props, "title"),
      ...e.pickNRename(
        e.$props,
        { key: "mobileBackIcon", newName: "backIcon" },
        { key: "mobileBackIconTooltip", newName: "backIconTooltip" },
        { key: "mobileCustomBackIcon", newName: "customBackIcon" },
        { key: "mobileNextIcon", newName: "nextIcon" },
        { key: "mobileNextIconTooltip", newName: "nextIconTooltip" },
        { key: "mobileNextIconDisabled", newName: "nextIconDisabled" },
        { key: "mobileCustomNextIcon", newName: "customNextIcon" },
        { key: "mobileScrollable", newName: "scrollable" }
      ),
      disabled: e.valid
    }, {
      onClose: n[1] || (n[1] = (h) => s.cancel()),
      onConfirm: n[2] || (n[2] = (h) => s.confirm())
    }), {
      "mobile-dialog-header": V(() => [
        C(e.$slots, "mobile-header")
      ]),
      default: V(() => [
        C(e.$slots, "modal-body", {}, () => [
          t.rawContent ? (l(), r("div", {
            key: 0,
            innerHTML: t.rawContent
          }, null, 8, ef)) : t.message ? (l(), r("p", tf, w(t.message), 1)) : f("", !0),
          t.showInput ? (l(), S(u, {
            key: 2,
            ref: "form"
          }, {
            default: V(() => [
              T(a, {
                modelValue: e.model,
                "onUpdate:modelValue": n[0] || (n[0] = (h) => e.model = h),
                ref: "input",
                label: t.label,
                required: t.required,
                helper: t.helper,
                success: t.success,
                placeholder: t.placeholder,
                rules: t.rules
              }, null, 8, ["modelValue", "label", "required", "helper", "success", "placeholder", "rules"])
            ]),
            _: 1
          }, 512)) : f("", !0)
        ])
      ]),
      _: 3
    }, 16)) : (l(), r(M, { key: 1 }, [
      b("div", nf, [
        b("div", sf, [
          b("div", {
            class: "modal-content",
            onKeyup: [
              n[6] || (n[6] = Ct(() => {
                t.keyboard && !t.disableKeyboardConfirm && s.confirm();
              }, ["enter"])),
              n[7] || (n[7] = Ct(() => {
                t.keyboard && s.cancel();
              }, ["escape"]))
            ]
          }, [
            b("div", of, [
              C(e.$slots, "modal-header", {}, () => [
                t.showCancelIcon ? (l(), r("span", {
                  key: 0,
                  class: "close fonticon fonticon-cancel",
                  title: "",
                  onClick: n[3] || (n[3] = (h) => s.cancel(!0))
                })) : f("", !0),
                b("h4", null, w(t.title), 1)
              ])
            ]),
            b("div", lf, [
              C(e.$slots, "modal-body", {}, () => [
                t.rawContent ? (l(), r("div", {
                  key: 0,
                  innerHTML: t.rawContent
                }, null, 8, af)) : t.message ? (l(), r("p", rf, w(t.message), 1)) : f("", !0),
                t.showInput ? (l(), S(u, {
                  key: 2,
                  ref: "form"
                }, {
                  default: V(() => [
                    T(a, {
                      modelValue: e.model,
                      "onUpdate:modelValue": n[4] || (n[4] = (h) => e.model = h),
                      ref: "input",
                      label: t.label,
                      required: t.required,
                      helper: t.helper,
                      success: t.success,
                      placeholder: t.placeholder,
                      rules: t.rules
                    }, null, 8, ["modelValue", "label", "required", "helper", "success", "placeholder", "rules"])
                  ]),
                  _: 1
                }, 512)) : f("", !0)
              ])
            ]),
            t.showFooter ? (l(), r("div", uf, [
              C(e.$slots, "modal-footer", {}, () => [
                T(d, {
                  color: "primary",
                  onClick: s.confirm
                }, {
                  default: V(() => [
                    X(w(t.okLabel), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                t.showCancelButton ? (l(), S(d, {
                  key: 0,
                  color: "default",
                  onClick: n[5] || (n[5] = (h) => s.cancel())
                }, {
                  default: V(() => [
                    X(w(t.cancelLabel), 1)
                  ]),
                  _: 1
                })) : f("", !0)
              ])
            ])) : f("", !0)
          ], 32)
        ])
      ]),
      df
    ], 64))
  ], 512)), [
    [Me, e.innerShow]
  ]) : f("", !0);
}
const cs = /* @__PURE__ */ F(Zh, [["render", cf]]), hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cs
}, Symbol.toStringTag, { value: "Module" }));
let Ht = {
  show: () => {
  },
  hide: () => {
  },
  alert: () => {
  },
  confirm: () => {
  },
  prompt: () => {
  },
  _modals: mt([])
};
function ff(e) {
  const n = mt([]);
  return Ht = Rn({
    _modals: n,
    show(i) {
      return this.hide(), new Promise((o, s) => {
        const a = {
          id: Re(),
          component: cs,
          bind: pt({ ...i, show: !0 }),
          on: {
            close: () => {
              this.hide(a), s();
            },
            confirm: (u) => {
              this.hide(a), o(u);
            },
            cancel: () => {
              this.hide(a), s();
            }
          }
        };
        this._modals.push(mt(a));
      });
    },
    hide(i) {
      if (i) {
        const o = this._modals.find((s) => s.id === i.id);
        if (!o)
          return;
        o.bind.show = !1, setTimeout(() => {
          const s = this._modals.findIndex((a) => a.id === i.id);
          s > -1 && this._modals.splice(s, 1);
        }, 1e3);
      } else
        this._modals.forEach((o) => {
          o._cancel = !0;
        }), this._modals.splice(0, this._modals.length);
    },
    alert(i) {
      return this.show(i);
    },
    confirm(i) {
      return this.show({
        showCancelIcon: !0,
        showCancelButton: !0,
        ...i
      });
    },
    prompt(i) {
      return this.show({
        showCancelIcon: !0,
        showCancelButton: !0,
        showInput: !0,
        ...i
      });
    }
  }), e.provide("vuModalAPI", Ht), e.config.globalProperties.$vuModal = Ht, Ht;
}
const pf = {
  name: "vu-modal-container",
  components: {
    VuModal: cs
  },
  data: () => ({
    // eslint-disable-next-line vue/no-reserved-keys
    _modals: {
      type: Object
    }
  }),
  created() {
    this._modals = Ht._modals;
  }
};
function mf(e, n, t, i, o, s) {
  return l(!0), r(M, null, U(e._modals, (a) => (l(), S(Wt(a.component), J({
    key: a.id
  }, a.bind, {
    modelValue: a.value,
    "onUpdate:modelValue": (u) => a.value = u
  }, lt(a.on)), null, 16, ["modelValue", "onUpdate:modelValue"]))), 128);
}
const vf = /* @__PURE__ */ F(pf, [["render", mf]]), gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vf
}, Symbol.toStringTag, { value: "Module" }));
function Ls(e, n) {
  var t;
  e.value > -1 ? e.value -= 1 : e.value = (((t = n.value) == null ? void 0 : t.length) || 0) - 1;
}
function Ds(e, n) {
  var t;
  e.value > (((t = n.value) == null ? void 0 : t.length) || 0) - 2 ? e.value = -1 : e.value += 1;
}
function en(e, n, t, i, o) {
  const { target: s = !1 } = t;
  if (s instanceof HTMLInputElement) {
    const { selectionStart: a } = s;
    return e && s.value || n && a !== 0;
  }
  return !1;
}
function As(e, n) {
  const {
    target: t,
    items: i,
    debug: o = !1,
    disabled: s = !1
  } = e || {}, {
    direction: a = "vertical",
    discardWhenValue: u = !1,
    discardWhenCaretInBetween: c = !1,
    preserveIndexOnRemoval: d = !1
  } = n || {};
  if (!t) {
    o && console.warn("VUEKIT - Warning Keyboard Navigation cannot be applied. Please use onMount hook and check target element is mounted.");
    return;
  }
  const h = a === "vertical", p = x(-1);
  le(i, (v, y) => {
    d && (v == null ? void 0 : v.length) < (y == null ? void 0 : y.length) ? p.value === y.length - 1 && (p.value = v.length - 1) : p.value = -1;
  });
  const _ = tl(p, { initialValue: -1 });
  return !h && Bs("ArrowLeft", (v) => {
    s || en(u, c, v) || Ls(p, i);
  }, { target: t, dedupe: !0 }), !h && Bs("ArrowRight", (v) => {
    if (!(s || en(u, c, v))) {
      if (c)
        if (p.value !== -1)
          v.preventDefault();
        else
          return;
      Ds(p, i);
    }
  }, { target: t, dedupe: !0 }), h && Vn("ArrowUp", (v) => {
    s || en(u, c, v) || Ls(p, i);
  }, { target: t }), h && Vn("ArrowDown", (v) => {
    s || en(u, c, v) || Ds(p, i);
  }, { target: t }), { currentIndex: p, last: _ };
}
const bf = {
  name: "vu-multiple-select",
  inject: {
    vuMultipleSelectLabels: {
      default: () => ({
        noResults: "No results."
      })
    },
    vuDebug: {
      default: !1
    },
    vuInputComposition: {
      default: !1
    }
  },
  mixins: [Fe, $e, vt, ze, Yn, Ee],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    search: {
      type: String,
      default: () => null
    },
    itemHeight: {
      type: Number,
      default: () => 38
    },
    minSearchLength: {
      type: Number,
      default: () => 0
    },
    shortPlaceholder: {
      type: String,
      required: !1,
      default: () => ""
    },
    user: {
      type: [Boolean, String],
      required: !1
    },
    searchField: {
      type: [Boolean, String],
      required: !1
    },
    searchIcon: {
      type: String,
      required: !1,
      default: () => "search"
    },
    customBadgeGroups: {
      type: [void 0, Object],
      default: () => {
      }
    },
    userBigBadges: {
      type: [Boolean, String],
      required: !1
    },
    maxVisible: {
      type: Number,
      default: () => 5
    },
    maxSelectable: {
      type: Number,
      default: () => Number.POSITIVE_INFINITY
    },
    caseSensitive: {
      type: [Boolean, String],
      default: !1
    },
    preserveSearchOnBlur: {
      type: [Boolean, String],
      default: !1
    },
    preserveSearchOnItemClick: {
      type: [Boolean, String],
      default: !1
    },
    preserveSearchOnItemKeyboard: {
      type: [Boolean, void 0],
      default: void 0
    },
    noLocalFiltering: {
      type: Boolean,
      default: !1
    },
    disableUnselectionWithinOptions: {
      type: Boolean,
      default: !1
    },
    keepFocusOnInputOnItemClick: {
      type: Boolean,
      default: !1
    },
    showClearIconWhenText: {
      type: [Boolean, String],
      default: !1
    },
    keepFocusOnInputOnItemKeyboard: {
      type: [Boolean, void 0],
      default: void 0
    },
    rounded: {
      type: [Boolean, String],
      default: !1
    },
    singleLine: {
      type: [Boolean, String],
      default: !1
    },
    minInputWidth: {
      type: [Boolean, Number],
      default: 200
    },
    roundedBadges: {
      default: !1
    },
    alternateBadges: {
      default: !1
    },
    badgesColor: {
      required: !1,
      default: () => {
      }
    },
    hideNoResults: {
      required: !1,
      type: [Boolean, String]
    },
    ignoreEscapeKey: {
      type: [Boolean, String],
      default: !1
    },
    allowKeyboardBadgesNavWhenText: {
      type: [Boolean, String],
      default: !1
    },
    openDropdownOnFocus: {
      type: [Boolean, String],
      default: !0
    }
  },
  expose: ["focus", "toggle", "close"],
  emits: ["search", "update:modelValue", "notify:already-selected", "update:search"],
  data: () => ({
    open: !1,
    pick: ls,
    inputInFocus: !1,
    positioned: !0,
    intxObs: null,
    localSearch: "",
    keyIndexItems: -1,
    lastItemChange: -1,
    keyIndexBadges: -1,
    lastBadgeChange: -1,
    bottom: 40,
    top: !1,
    resizeObs: null,
    uid: gt(),
    scrollbarVisible: !1,
    badgesRefs: {},
    inputWidth: null,
    minimizeInput: !1,
    stopInputMinWidth: () => {
    }
  }),
  created() {
    this.resizeObs = new ResizeObserver((e) => {
      this.bottom = e[0].contentRect.height + 4;
    });
  },
  mounted() {
    this.$refs.searchfield && this.resizeObs.observe(this.$refs.searchfield);
    const { width: e, left: n } = ln(this.$refs.searchbox), { left: t } = ln(this.$refs.input), i = Y(() => this.hasClearIcon);
    this.minInputWidth !== !1 && (this.stopInputMinWidth = xn([i, t], ([a]) => {
      const u = t.value - n.value;
      let c = e.value - u - ((a || this.searchField) && 38 || 0) - 1;
      c < this.minInputWidth && (c = e - 4), this.inputWidth = c, this.minimizeInput = !1;
    }, { throttle: 10 })), this.target && (this.intxObs = new IntersectionObserver(() => {
      this.intxObs.unobserve(this.$refs.dropdown);
      const a = this.target.getBoundingClientRect(), u = this.$refs.dropdown.getBoundingClientRect();
      a.bottom < u.bottom && (this.top = !0), this.positioned = !0;
    }, {
      root: this.target,
      threshold: 1
    }));
    const o = As({
      disabled: this.disabled,
      items: Y(() => this.innerOptions),
      target: this.$refs.input,
      debug: this.vuDebug
    });
    this.lastItemChange = o == null ? void 0 : o.last, this.keyIndexItems = o == null ? void 0 : o.currentIndex;
    const s = As({
      disabled: this.disabled,
      items: Y(() => {
        var a;
        return this.searchField ? ((a = this.customBadgeGroups) == null ? void 0 : a.length) && this.customBadgeGroups || this.badgeGroups : this.modelValue;
      }),
      target: this.$refs.input,
      debug: this.vuDebug
    }, {
      direction: "horizontal",
      discardWhenValue: !this.allowKeyboardBadgesNavWhenText,
      discardWhenCaretInBetween: !0,
      preserveIndexOnRemoval: !0
    });
    this.keyIndexBadges = s == null ? void 0 : s.currentIndex, this.lastBadgeChange = s == null ? void 0 : s.last;
  },
  watch: {
    getSearch(e) {
      this.executeSearch(e);
    },
    keyIndexItems(e) {
      var s, a, u, c;
      const n = ((a = (s = this.$refs) == null ? void 0 : s.selectOptions) == null ? void 0 : a.liRefs) || [], t = ((u = this.innerOptions[e]) == null ? void 0 : u.value) || -1, i = n[t], o = (c = this.$refs.scroller) == null ? void 0 : c.$el;
      if (o)
        if (i) {
          const d = i.offsetTop + i.clientHeight;
          (d > o.scrollTop + o.clientHeight || d < o.scrollTop) && (o == null || o.scrollTo({ top: i.offsetTop }));
        } else
          t === -1 && o.scrollTo({ top: 0 });
    },
    open: {
      handler(e) {
        var n;
        e && !this.ignoreEscapeKey ? this.keyboardListener = pe((n = this.$refs) == null ? void 0 : n.input, "keyup", (t) => {
          t.code === "Escape" && (this.close(), t.preventDefault(), t.stopPropagation(), this.keyIndexItems = -1);
        }) : this.keyboardListener();
      }
    },
    isActive(e) {
      !e && this.singleLine && this.scrollbarVisible && this.$refs && this.$refs.searchfield && this.$refs.autocomplete.scrollTo({ left: 0, behavior: "instant" });
    },
    keyIndexBadges(e) {
      var n;
      if (this.singleLine && this.scrollbarVisible && e >= -1)
        if (e === -1) {
          const { offsetLeft: t } = (n = this.$refs) == null ? void 0 : n.input;
          this.$refs.autocomplete.scrollTo({ left: t, behavior: "instant" });
        } else {
          const t = this.keyboardNavigationItems[e], i = this.badgesRefs[typeof t == "string" ? t : t.value], { scrollLeft: o } = i;
          this.$refs.autocomplete.scrollTo({ left: o, behavior: "smooth" });
        }
    },
    modelLength: {
      // eslint-disable-next-line object-shorthand
      handler: function() {
        this.minInputWidth !== !1 && (this.minimizeInput = !0, this.inputWidth = !1);
      },
      immediate: !0
    },
    minInputWidth(e) {
      e === !1 && (this.stopInputMinWidth(), this.minimizeInput = !1, this.inputWidth = !1);
    }
  },
  computed: {
    hasClearIcon() {
      var e;
      return this.maxSelectable === 1 && !this.user && ((e = this.value) == null ? void 0 : e.length) || this.showClearIconWhenText && this.search !== "";
    },
    getSearch() {
      return this.search !== null ? this.search : this.localSearch;
    },
    searchLengthMet() {
      return this.getSearch.length >= this.minSearchLength;
    },
    innerOptions() {
      return this.searchLengthMet ? this.noLocalFiltering ? this.options : this.caseSensitive ? this.options.filter((e) => e.label.includes(this.getSearch) || e.value.includes(this.getSearch)) : this.options.filter((e) => e.label.toLowerCase().includes(this.getSearch.toLowerCase()) || e.value.toLowerCase().includes(this.getSearch.toLowerCase())) : [];
    },
    keyboardNavigationItems() {
      var e;
      return this.searchField ? ((e = this.customBadgeGroups) == null ? void 0 : e.length) && this.customBadgeGroups || this.badgeGroups : this.modelValue;
    },
    innerOptionsLength() {
      return this.innerOptions.length;
    },
    noResults() {
      return this.options && this.innerOptions.length === 0 && this.searchLengthMet && !this.$slots.optionsHeader;
    },
    values() {
      return (this.value || []).map((e) => e.value);
    },
    dropdownHeight() {
      return this.$slots.optionsHeader ? "auto" : this.noResults ? this.$slots.noResults || this.hideNoResults ? "auto" : this.itemHeight : this.innerOptionsLength > this.maxVisible ? this.itemHeight * ((this.innerOptionsLength === this.maxVisible ? 0 : 0.5) + this.maxVisible) : this.itemHeight * this.innerOptionsLength;
    },
    hideOverflow() {
      return this.itemHeight * this.innerOptionsLength === this.dropdownHeight;
    },
    isActive() {
      return this.inputInFocus || this.open;
    },
    keepFocusKeyboard() {
      return this.keepFocusOnInputOnItemKeyboard !== void 0 ? this.keepFocusOnInputOnItemKeyboard : this.keepFocusOnInputOnItemClick;
    },
    preserveSearchKeyboard() {
      return this.preserveSearchOnItemKeyboard !== void 0 ? this.preserveSearchOnItemKeyboard : this.preserveSearchOnItemClick;
    },
    badgeGroups() {
    },
    modelLength() {
      var e;
      return (e = this.modelValue) == null ? void 0 : e.length;
    }
  },
  methods: {
    checkScrollbar() {
      var t;
      const { scrollHeight: e = 0, clientHeight: n = 0 } = (t = this.$refs) == null ? void 0 : t.searchfield;
      this.scrollbarVisible = e > n;
    },
    executeSearch(e) {
      this.$emit("search", e), e && !this.open && this.openAndIntersect();
    },
    toggle(e, { fromOptionsClick: n = !1, fromOptionsKeyboard: t = !1 } = { fromOptionsClick: !1, fromOptionsKeyboard: !1 }) {
      if (this.disabled || e.disabled)
        return;
      const i = this.value || [];
      let o = i.findIndex((s) => s.value === e.value);
      if (this.values.includes(e.value))
        if (this.maxSelectable === 1)
          this.$emit("update:modelValue", []);
        else if ((n || t) && this.disableUnselectionWithinOptions)
          this.$emit("notify:already-selected", e);
        else {
          const s = i.slice();
          if (this.badgeGroups) {
            const { valueValue: a } = e;
            s.splice(i.findIndex(({ value: u }) => u === a), 1), o = i.findIndex((u) => u.value === e.value);
          }
          s.splice(o, 1), this.$emit("update:modelValue", s);
        }
      else
        this.maxSelectable === 1 ? (this.$emit("update:modelValue", [e]), this.$emit("update:search", ""), this.localSearch = "", this.close()) : this.$emit("update:modelValue", i.concat([e]));
      (n || t) && ((n && this.keepFocusOnInputOnItemClick || t && this.keepFocusKeyboard) && this.$refs.input.focus(), (n && !this.preserveSearchOnItemClick || t && !this.preserveSearchKeyboard) && (this.$emit("update:search", ""), this.localSearch = ""));
    },
    getOption(e) {
      return this.options.find((n) => n.value === e) || {};
    },
    close() {
      this.open = !1, this.top = !1, this.positioned = !0, this.inputInFocus = !1, this.preserveSearchOnBlur || this.$emit("update:search", "");
    },
    async openAndIntersect() {
      if (this.searchLengthMet && !this.open && !this.disabled)
        if (this.target && ["scroll", "auto", "visible"].includes(window.getComputedStyle(this.target).overflowY)) {
          const e = this.target.getBoundingClientRect(), n = this.$refs.searchfield.getBoundingClientRect();
          !this.top && (this.maxVisible + 0.5) * this.itemHeight > e.bottom - n.bottom && (this.top = !0), this.open = !0;
        } else
          this.open = !0, this.positioned = !1, await new Promise((e) => setTimeout(e, 10)), await this.$nextTick(), this.intxObs.observe(this.$refs.dropdown);
    },
    beforeUnmount() {
      this.intxObs.disconnect(), delete this.intxObs;
    },
    onDelete(e) {
      var n;
      if (this.open && this.lastItemChange > this.lastBadgeChange) {
        if (this.keyIndexItems > -1) {
          const t = this.innerOptions[this.keyIndexItems];
          !(t != null && t.disabled) && this.values.includes(t.value) && (this.toggle(t, { fromOptionsKeyboard: !0 }), e.preventDefault());
        }
      } else
        this.keyIndexBadges > -1 && !((n = this.value[this.keyIndexBadges]) != null && n.disabled) && this.toggle(this.keyboardNavigationItems[this.keyIndexBadges]);
    },
    onEnter() {
      var e;
      this.open && this.lastItemChange > this.lastBadgeChange && this.keyIndexItems > -1 ? !((e = this.value[this.keyIndexBadges]) != null && e.disabled) && this.toggle(this.innerOptions[this.keyIndexItems], { fromOptionsKeyboard: !0 }) : this.open || (this.open = !0);
    },
    onInput(e) {
      const { target: n } = e;
      this.keyIndexBadges > -1 && (this.keyIndexBadges = -1), this.vuInputComposition || (n.composing = !1), this.$emit("update:search", n.value), this.localSearch = n.value;
    },
    focus() {
      var e, n;
      (n = (e = this.$refs) == null ? void 0 : e.input) == null || n.focus(), this.openDropdownOnFocus && this.openAndIntersect();
    }
  },
  components: { VuUserPicture: $t, VuBadge: jn, VuIconBtn: de, VuScroller: Qe, VuSelectOptions: us }
}, yf = {
  key: 0,
  class: "control-label"
}, _f = {
  key: 0,
  class: "label-field-required"
}, wf = {
  key: 1,
  style: { "line-height": "30px" }
}, kf = ["value", "disabled", "placeholder"], Sf = { style: { "padding-top": "15px" } }, If = { class: "message" }, Cf = {
  key: 0,
  class: "multiple-select__no-results"
}, Bf = {
  key: 1,
  class: "form-control-helper-text"
};
function $f(e, n, t, i, o, s) {
  const a = $("VuUserPicture"), u = $("VuIconBtn"), c = $("VuBadge"), d = $("VuSelectOptions"), h = $("vu-spinner"), p = $("VuScroller"), _ = _e("click-outside");
  return l(), r("div", {
    class: k(["vu-multiple-select form-group", [
      e.classes,
      {
        "vu-multiple-select--rounded": t.rounded,
        "vu-multiple-select--single-line": t.singleLine,
        "vu-multiple-select--searchIcon": t.searchField
      }
    ]])
  }, [
    e.label.length ? (l(), r("label", yf, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", _f, " *")) : f("", !0)
    ])) : f("", !0),
    H((l(), r("div", {
      ref: "searchfield",
      class: k(["select select-autocomplete", [{
        "dropdown-visible": e.open,
        "select-disabled": e.disabled,
        "single-select": t.maxSelectable === 1,
        "has-clear-icon": s.hasClearIcon,
        "has-search-icon": !s.hasClearIcon && t.searchField,
        "select--single-line": t.singleLine && s.isActive
      }]])
    }, [
      b("div", {
        ref: "searchbox",
        class: k(["autocomplete-searchbox", {
          "autocomplete-searchbox-active": s.isActive,
          disabled: e.disabled,
          "autocomplete-searchbox--user": t.user,
          "autocomplete-searchbox--user-big-badges": t.user && t.userBigBadges
        }]),
        onClick: n[9] || (n[9] = (v) => {
          t.maxSelectable === 1 && s.values.length || e.$refs.input.focus(), s.openAndIntersect(), s.checkScrollbar();
        })
      }, [
        t.user ? (l(!0), r(M, { key: 0 }, U(e.value, (v, y) => (l(), r("div", {
          key: `${e.uid}-tag-${v}`,
          class: k(["vu-user-badge", {
            "vu-user-badge--hovered": y === e.keyIndexBadges
          }])
        }, [
          T(a, {
            id: v.value,
            src: v.src,
            size: "tiny"
          }, null, 8, ["id", "src"]),
          b("span", null, w(v.label), 1),
          T(u, {
            class: "vu-user-badge__close",
            icon: "close",
            size: "icon-smaller",
            onClick: (L) => s.toggle(v)
          }, null, 8, ["onClick"])
        ], 2))), 128)) : (l(!0), r(M, { key: 1 }, U(s.badgeGroups || t.customBadgeGroups || e.value, (v, y) => (l(), r("span", {
          key: `${e.uid}-tag-${typeof v == "string" ? v : v.value}`,
          ref_for: !0,
          ref: (L) => e.badgesRefs[typeof v == "string" ? v : v.value] = L,
          onClick: n[1] || (n[1] = (...L) => s.toggle && s.toggle(...L))
        }, [
          C(e.$slots, "badge", { value: v }, () => [
            t.maxSelectable !== 1 ? (l(), S(c, J({ key: 0 }, e.pick(v, ["disabled", "icon", "selectable", "selected", "togglable"]), {
              badge2: v.valueLabel,
              value: y === e.keyIndexBadges,
              closable: "",
              icon: v.icon,
              rounded: v.rounded || t.roundedBadges,
              alternate: v.alternate || t.alternateBadges,
              color: v.badgeClass || t.badgesColor,
              text: t.searchField ? "" : v.label || v.text,
              onClick: n[0] || (n[0] = re(() => {
              }, ["stop"])),
              onClose: (L) => s.toggle(v)
            }), null, 16, ["badge2", "value", "icon", "rounded", "alternate", "color", "text", "onClose"])) : (l(), r("span", wf, w(v.label), 1))
          ], !0)
        ]))), 128)),
        s.values.length < t.maxSelectable ? (l(), r("input", {
          key: 2,
          value: s.getSearch,
          ref: "input",
          type: "text",
          class: k(["autocomplete-input", [e.minimizeInput && "minimized", t.minInputWidth === !1 && "var"]]),
          disabled: e.disabled,
          style: G([e.inputWidth && { width: `${e.inputWidth}px` }]),
          placeholder: s.values.length && t.shortPlaceholder ? t.shortPlaceholder : e.placeholder,
          onInput: n[2] || (n[2] = (...v) => s.onInput && s.onInput(...v)),
          onBlur: n[3] || (n[3] = () => {
            t.searchField || e.open || (e.inputInFocus = !1);
          }),
          onFocus: n[4] || (n[4] = (v) => e.inputInFocus = !0),
          onKeydown: n[5] || (n[5] = Ct((...v) => s.onDelete && s.onDelete(...v), ["delete", "backspace"])),
          onKeyup: n[6] || (n[6] = Ct(re((...v) => s.onEnter && s.onEnter(...v), ["stop"]), ["enter"])),
          onClick: n[7] || (n[7] = (v) => {
            s.openAndIntersect();
          })
        }, null, 46, kf)) : f("", !0),
        !s.hasClearIcon && t.searchField ? (l(), S(u, {
          key: 3,
          icon: t.searchIcon,
          class: "absolute! top-0 right-0 multiple-select__search-icon",
          onClick: n[8] || (n[8] = re((v) => s.executeSearch(), ["stop"]))
        }, null, 8, ["icon"])) : f("", !0)
      ], 2),
      s.hasClearIcon ? (l(), S(u, {
        key: 0,
        icon: "clear",
        class: "select__clear-icon",
        onClick: n[10] || (n[10] = re((v) => {
          t.searchField ? e.$emit("update:modelValue", []) : s.toggle(e.value[0]), e.$emit("update:search", "");
        }, ["stop"]))
      })) : f("", !0),
      e.open && s.searchLengthMet ? (l(), r("div", {
        key: 1,
        ref: "dropdown",
        class: k(["select-dropdown", [{ "select-dropdown--no-results": !t.hideNoResults && s.noResults, "select-dropdown--dropup": e.top, "rounded-lg": t.rounded }, e.contentClass]]),
        style: G([
          `height: ${s.dropdownHeight}${s.dropdownHeight !== "auto" ? "px" : ""}`,
          e.top ? `bottom: ${e.bottom}px` : "",
          e.positioned ? "" : "opacity: 0",
          e.contentStyle
        ])
      }, [
        T(p, {
          ref: "scroller",
          class: k({ "hide-scroller": s.hideOverflow }),
          "always-show": ""
        }, {
          default: V(() => {
            var v;
            return [
              C(e.$slots, "optionsHeader", {}, void 0, !0),
              H(T(d, {
                ref: "selectOptions",
                multiple: "",
                user: t.user || t.searchField && ((v = s.innerOptions) == null ? void 0 : v.some(({ login: y, userImgUrl: L }) => y || L)),
                selected: e.value,
                options: s.innerOptions,
                "key-index": e.keyIndexItems,
                onClickItem: n[11] || (n[11] = (y) => s.toggle(y, { fromOptionsClick: !0 }))
              }, {
                default: V(({ item: y }) => [
                  C(e.$slots, "default", { item: y }, void 0, !0)
                ]),
                _: 3
              }, 8, ["user", "selected", "options", "key-index"]), [
                [Me, s.searchLengthMet && !e.loading]
              ]),
              e.loading ? C(e.$slots, "loading", { key: 0 }, () => [
                b("ul", Sf, [
                  b("li", If, [
                    T(h, { show: "" })
                  ])
                ])
              ], !0) : f("", !0),
              !e.loading && s.noResults ? C(e.$slots, "noResults", { key: 1 }, () => [
                t.hideNoResults ? f("", !0) : (l(), r("ul", Cf, [
                  b("li", null, w(s.vuMultipleSelectLabels.noResults), 1)
                ]))
              ], !0) : f("", !0)
            ];
          }),
          _: 3
        }, 8, ["class"])
      ], 6)) : f("", !0)
    ], 2)), [
      [_, function() {
        s.close();
      }]
    ]),
    (l(!0), r(M, null, U(e.errorBucket, (v, y) => (l(), r("span", {
      key: `${y}-error-${v}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(v), 1))), 128)),
    e.helper.length ? (l(), r("span", Bf, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const Of = /* @__PURE__ */ F(bf, [["render", $f], ["__scopeId", "data-v-46c2ad90"]]), Tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Of
}, Symbol.toStringTag, { value: "Module" })), xf = {
  name: "vu-range",
  mixins: [Fe, hn, $e, ze, Ee],
  props: {
    step: {
      type: Number,
      default: 1
    },
    showLabels: {
      type: Boolean,
      default: !0
    },
    customLabels: {
      type: Array,
      required: !1,
      default: void 0
    }
  },
  emits: ["update:modelValue", "mouseup"],
  data() {
    return {
      lowervalue: 0,
      uppervalue: 1
    };
  },
  watch: {
    value: {
      immediate: !0,
      handler() {
        this.lowervalue = Math.min(...this.value), this.uppervalue = Math.max(...this.value);
      }
    }
  },
  computed: {
    value() {
      return this.modelValue || [];
    },
    minLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[0] : this.min;
    },
    maxLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[(this.max + this.max % this.step) / this.step - this.min] : this.max;
    },
    lowerLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[(this.lowervalue - this.min) / this.step] : this.lowervalue;
    },
    upperLabel() {
      return this.customLabels && this.customLabels.length ? this.customLabels[(this.uppervalue - this.min) / this.step] : this.uppervalue;
    },
    computedStyles() {
      const e = (this.lowervalue - this.min) / (this.max - this.min) * 100;
      return {
        width: `${(this.uppervalue - this.min - (this.lowervalue - this.min)) / (this.max - this.min || 1) * 100}%`,
        left: `${e}%`
      };
    }
  },
  methods: {
    commit() {
      this.disabled || this.$emit("mouseup", [this.lowervalue, this.uppervalue]);
    },
    update(e, n) {
      if (this.disabled)
        return;
      let t, i;
      e === "lower" ? (i = Math.min(n, this.uppervalue), t = Math.max(n, this.uppervalue), i > t && (t = Math.min(t + this.step, this.max))) : (i = Math.min(n, this.lowervalue), t = Math.max(n, this.lowervalue), i > t && (i = Math.max(i - this.step, this.min))), this.lowervalue = i, this.uppervalue = t, this.$emit("update:modelValue", [this.lowervalue, this.uppervalue]);
    }
  }
}, Mf = {
  key: 0,
  class: "control-label"
}, Vf = {
  key: 0,
  class: "label-field-required"
}, Pf = ["disabled", "value", "min", "max", "step"], Lf = ["disabled", "value", "min", "max", "step"], Df = { class: "vu-range__grey-bar" }, Af = {
  key: 0,
  class: "vu-range__labels-container"
}, Ff = { class: "vu-range__left vu-range__left-label" }, zf = { class: "vu-range__right vu-range__right-label" }, Ef = {
  key: 1,
  class: "form-control-helper-text"
};
function Nf(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", Mf, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", Vf, " *")) : f("", !0)
    ])) : f("", !0),
    b("div", {
      class: k(["vu-range", { disabled: e.disabled }])
    }, [
      b("div", {
        onMouseup: n[2] || (n[2] = (...a) => s.commit && s.commit(...a)),
        class: "vu-range__inputs-container"
      }, [
        b("input", {
          disabled: e.disabled,
          onInput: n[0] || (n[0] = (a) => s.update("lower", parseFloat(a.target.value))),
          value: o.lowervalue,
          min: e.min,
          max: e.max,
          step: t.step,
          class: "slider vu-range__left",
          type: "range"
        }, null, 40, Pf),
        b("input", {
          disabled: e.disabled,
          onInput: n[1] || (n[1] = (a) => s.update("upper", parseFloat(a.target.value))),
          value: o.uppervalue,
          min: e.min,
          max: e.max,
          step: t.step,
          class: "slider vu-range__right",
          type: "range"
        }, null, 40, Lf),
        b("div", Df, [
          b("div", {
            class: "vu-range__blue-bar",
            style: G(s.computedStyles)
          }, null, 4)
        ])
      ], 32),
      t.showLabels ? (l(), r("div", Af, [
        b("div", Ff, w(s.minLabel), 1),
        b("div", zf, w(s.maxLabel), 1),
        o.lowervalue !== e.min && o.uppervalue !== o.lowervalue ? (l(), r("div", {
          key: 0,
          class: "vu-range__lower-label",
          style: G("left: " + (o.lowervalue - e.min) / (e.max - e.min) * 100 + "%")
        }, w(s.lowerLabel), 5)) : f("", !0),
        o.uppervalue !== e.max ? (l(), r("div", {
          key: 1,
          class: "vu-range__upper-label",
          style: G("left: " + (o.uppervalue - e.min) / (e.max - e.min) * 100 + "%")
        }, w(s.upperLabel), 5)) : f("", !0)
      ])) : f("", !0)
    ], 2),
    (l(!0), r(M, null, U(e.errorBucket, (a, u) => (l(), r("span", {
      key: `${u}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(a), 1))), 128)),
    e.helper.length ? (l(), r("span", Ef, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const Rf = /* @__PURE__ */ F(xf, [["render", Nf], ["__scopeId", "data-v-b2d8ce26"]]), Hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rf
}, Symbol.toStringTag, { value: "Module" }));
function Fi() {
  return window ? !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) : !1;
}
const jf = ["draggable"], Uf = {
  key: 0,
  class: "section-header_indicator"
}, Wf = {
  name: "vu-section-header"
}, qf = /* @__PURE__ */ Ae({
  ...Wf,
  props: /* @__PURE__ */ Bt({
    name: {},
    title: {},
    actions: {},
    dragged: { type: Boolean },
    dashed: { type: Boolean },
    draggable: { type: Boolean },
    sticked: { type: Boolean },
    disabled: { type: Boolean },
    noMargin: { type: Boolean },
    tabbed: { type: Boolean },
    selected: { type: Boolean },
    expandable: { type: Boolean },
    expanded: { type: Boolean },
    focused: { type: Boolean },
    reorderable: { type: Boolean },
    indicator: {}
  }, {
    expanded: { type: Boolean, default: !0 },
    expandedModifiers: {}
  }),
  emits: /* @__PURE__ */ Bt(["click", "click-title", "click-expander", "click-action", "dragstart", "dragleave", "dragover", "dragend"], ["update:expanded"]),
  setup(e, { emit: n }) {
    const t = e, i = n, o = sn(e, "expanded"), s = x(!1), a = x(!1), u = x(!1), c = Fi(), d = xe(Yt, c), h = Y(() => t.expanded !== void 0 ? t.expanded : o.value);
    function p() {
      o.value = !o.value;
    }
    function _(v, y = !1) {
      const { target: L = {}, relatedTarget: B = {} } = v, { previousSibling: R, nextSibling: ee } = L;
      y && B === R || B === ee || (a.value = !1);
    }
    return (v, y) => {
      const L = _e("tooltip");
      return l(), r("div", {
        class: k(["section-header", {
          "section-header--expandable": t.expandable,
          "section-header--active": t.selected,
          "section-header--focused": t.focused,
          "section-header--hover": s.value || a.value || u.value,
          "section-header--sticky": t.sticked,
          "section-header--reorder": t.reorderable,
          "section-header--disabled": t.disabled,
          "section-header--dashed": t.dashed,
          "is-target": t.noMargin,
          "section-header--dragged": t.dragged
        }]),
        draggable: t.draggable,
        onDragstart: y[8] || (y[8] = (B) => i("dragstart", B)),
        onDragleave: y[9] || (y[9] = (B) => i("dragleave", B)),
        onDragover: y[10] || (y[10] = (B) => i("dragover", B)),
        onDragend: y[11] || (y[11] = (B) => i("dragend", B)),
        onMouseenter: y[12] || (y[12] = (B) => s.value = !0),
        onMouseleave: y[13] || (y[13] = (B) => s.value = !1)
      }, [
        t.tabbed ? (l(), r("div", {
          key: 0,
          class: "section-header_tab",
          onMouseenter: y[0] || (y[0] = (B) => a.value = !0),
          onMouseleave: _
        }, null, 32)) : f("", !0),
        t.expandable ? (l(), r("div", {
          key: 1,
          class: k(["section-header_expander justify-center h-full", {
            "section-header_expander--open": h.value,
            "section-header_expander--hover": a.value
          }]),
          onClick: y[1] || (y[1] = (B) => {
            t.expandable && p(), i("click", B), i("click-expander", B);
          }),
          onMouseenter: y[2] || (y[2] = (B) => a.value = !0),
          onMouseleave: _
        }, [
          T(ue, {
            icon: "expand-right",
            class: "block vertical-middle h-full cursor-pointer",
            style: { "line-height": "38px", "font-size": "8px" },
            "within-text": !1
          })
        ], 34)) : f("", !0),
        H((l(), r("h5", {
          class: "section-header_title flex flex-grow",
          onClick: y[3] || (y[3] = (B) => {
            t.expandable && p(), i("click", B), i("click-title", B);
          }),
          onMouseenter: y[4] || (y[4] = (B) => a.value = !0),
          onMouseleave: y[5] || (y[5] = (B) => _(B, !0))
        }, [
          X(w(t.title), 1)
        ], 32)), [
          [
            L,
            t.title,
            void 0,
            { ellipsis: !0 }
          ]
        ]),
        t.reorderable ? f("", !0) : (l(), r(M, { key: 2 }, [
          t.actions ? (l(!0), r(M, { key: 0 }, U(t.actions, ({ icon: B, type: R, contentClass: ee, position: ce, items: Z, tooltip: D }, P) => (l(), r(M, { key: P }, [
            R !== "dropdownmenu" ? H((l(), S(de, {
              key: 0,
              class: "flex-grow-0 flex-basis-[38px]",
              icon: B,
              color: "default-lean",
              onClick: (Q) => {
                var z;
                return i("click-action", (z = t.actions) == null ? void 0 : z[P]);
              }
            }, null, 8, ["icon", "onClick"])), [
              [Me, !t.reorderable && K(d)],
              [L, D]
            ]) : (l(), S(rt, {
              key: 1,
              items: Z,
              "content-class": ee,
              position: ce,
              class: "flex-grow-0 flex-basis-38px",
              onOpen: y[6] || (y[6] = (Q) => u.value = !0),
              onClose: y[7] || (y[7] = (Q) => u.value = !1),
              onClickItem: (Q) => {
                i(
                  "click-action",
                  // @ts-expect-error props. required
                  t.actions[P],
                  Q
                );
              }
            }, {
              default: V(({ active: Q }) => [
                H(T(de, J(
                  { icon: "chevron-down" },
                  t.selected && !t.expanded ? {
                    noActive: !0,
                    noHover: !0,
                    color: "secondary"
                  } : {
                    color: "default-lean"
                  },
                  { active: Q }
                ), null, 16, ["active"]), [
                  [Me, !t.reorderable && (s.value || K(d)) || Q]
                ])
              ]),
              _: 2
            }, 1032, ["items", "content-class", "position", "onClickItem"]))
          ], 64))), 128)) : f("", !0)
        ], 64)),
        t.indicator ? C(v.$slots, "indicator", { key: 3 }, () => [
          t.indicator && !K(d) && !t.reorderable ? (l(), r("div", Uf, [
            b("span", null, w(t.indicator), 1)
          ])) : f("", !0)
        ], !0) : f("", !0),
        t.reorderable ? C(v.$slots, "default", { key: 4 }, () => [
          t.reorderable ? (l(), S(de, {
            key: 0,
            class: "flex section-header_reorder-handle",
            icon: "drag-grip",
            color: "default-lean",
            hover: s.value || a.value,
            noHover: t.focused
          }, null, 8, ["hover", "noHover"])) : f("", !0)
        ], !0) : f("", !0)
      ], 42, jf);
    };
  }
}), zi = /* @__PURE__ */ F(qf, [["__scopeId", "data-v-3ff28859"]]), Kf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zi
}, Symbol.toStringTag, { value: "Module" })), Gf = {
  name: "vu-single-checkbox",
  mixins: [ze, Ee, $e],
  inheritAttrs: !1,
  props: {
    // String for Radio, Boolean for Switch/Default
    modelValue: {
      type: [String, Boolean],
      default: () => ""
    },
    label: {
      type: String,
      default: ""
    },
    // Removes slot and label
    standalone: {
      type: Boolean,
      default: !1
    },
    // Optional
    // eslint-disable-next-line vue/require-default-prop
    icon: {
      type: String,
      required: !1
    },
    // Exclusive with Switch
    radio: {
      type: Boolean,
      required: !1
    },
    // Required by radio.
    // eslint-disable-next-line vue/require-default-prop
    group: {
      type: String,
      required: !1
    },
    // Required by radio
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: String,
      required: !1
    },
    // Excludes radio
    switch: {
      type: Boolean,
      required: !1
    },
    // eslint-disable-next-line vue/require-default-prop
    id: {
      type: [String, Number],
      required: !1
    }
  },
  emits: ["update:modelValue"],
  data: () => ({ uid: gt() }),
  computed: {
    topClasses() {
      return {
        "vu-single-checkbox--switch": this.switch,
        "vu-single-checkbox--standalone": this.standalone,
        "vu-single-checkbox--checkbox": !this.switch && !this.radio,
        "vu-single-checkbox--radio": this.radio,
        "vu-single-checkbox--extra-content": this.hasExtraContent
      };
    },
    internalClasses() {
      return {
        "toggle-icon": this.icon,
        "toggle-switch": this.switch,
        "toggle-primary": !this.switch
      };
    },
    hasExtraContent() {
      return this.$slots.default && !this.standalone;
    }
  },
  methods: {
    input(e) {
      return this.radio ? this.$emit("update:modelValue", e.target.value) : this.$emit("update:modelValue", e.target.checked);
    }
  },
  components: { VuIcon: ue }
}, Yf = ["type", "checked", "name", "value", "id", "disabled"], Xf = ["for"], Jf = { class: "vu-single-checkbox__inner-span" }, Zf = {
  key: 0,
  class: "vu-single-checkbox__extra-content"
};
function Qf(e, n, t, i, o, s) {
  const a = $("VuIcon");
  return l(), r("div", {
    class: k(["vu-single-checkbox", s.topClasses])
  }, [
    b("div", {
      class: k(["toggle", s.internalClasses])
    }, [
      b("input", J({
        class: "vu-single-checkbox__input",
        type: t.radio ? "radio" : "checkbox",
        checked: t.radio ? t.group === t.modelValue : t.modelValue
      }, e.$attrs, {
        name: t.radio ? t.group : void 0,
        value: t.radio ? t.value : void 0,
        id: e.$attrs[t.id] || `${e.uid}`,
        disabled: e.disabled,
        onClick: n[0] || (n[0] = (...u) => s.input && s.input(...u))
      }), null, 16, Yf),
      t.standalone ? f("", !0) : (l(), r(M, { key: 0 }, [
        b("label", {
          class: "control-label vu-single-checkbox__label",
          for: e.$attrs[t.id] || `${e.uid}`
        }, [
          t.icon ? (l(), S(a, {
            key: 0,
            icon: t.icon
          }, null, 8, ["icon"])) : f("", !0),
          b("span", Jf, w(t.label), 1)
        ], 8, Xf),
        C(e.$slots, "label-prepend", {}, void 0, !0)
      ], 64))
    ], 2),
    s.hasExtraContent ? (l(), r("div", Zf, [
      C(e.$slots, "default", {}, void 0, !0)
    ])) : f("", !0)
  ], 2);
}
const ep = /* @__PURE__ */ F(Gf, [["render", Qf], ["__scopeId", "data-v-dd48d93f"]]), tp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ep
}, Symbol.toStringTag, { value: "Module" })), np = {
  name: "vu-slider",
  mixins: [Fe, $e, ze, Ee],
  props: {
    labels: {
      required: !1,
      type: Object,
      default: () => ({
        min: "Min",
        max: "Max"
      })
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    step: {
      type: Number,
      default: 1
    },
    stepped: {
      type: Boolean,
      default: !1
    },
    showLabels: {
      type: Boolean,
      default: !1
    },
    labelsBeneath: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["mouseUp", "input"],
  data: () => ({
    labelsWidth: 0,
    innerValue: 0
  }),
  created() {
    this.innerValue = this.value;
  },
  mounted() {
    const { leftLabel: { offsetWidth: e = 0 } = {}, rightLabel: { offsetWidth: n = 0 } = {} } = this.$refs;
    this.labelsWidth = Math.max(e, n);
  },
  computed: {
    steps() {
      return [];
    },
    labelsMargin() {
      return this.labelsBeneath ? "" : `${this.labelsWidth}px`;
    },
    computedStyle() {
      return {
        left: this.labelsMargin,
        right: this.labelsMargin,
        width: `calc(100% - ${2 * this.labelsWidth}px + 14px)`
      };
    },
    innerBlueBarStyle() {
      return {
        // right: `calc(${percent}%${ left ? (` + ${ left }`) : ''})`,
        width: `${(this.innerValue - this.min) / (this.max - this.min) * 100}%`
      };
    }
  },
  methods: {
    commit() {
      this.disabled || this.$emit("mouseUp", this.value);
    },
    update(e) {
      this.disabled || (this.innerValue = e, this.$emit("input", this.innerValue));
    }
  }
}, sp = {
  key: 0,
  class: "control-label"
}, ip = {
  key: 0,
  class: "label-field-required"
}, op = ["disabled", "value", "min", "max", "step"], lp = {
  key: 0,
  class: "vu-slider__steps"
}, ap = {
  key: 1,
  class: "form-control-helper-text"
};
function rp(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["form-group", e.classes])
  }, [
    e.label.length ? (l(), r("label", sp, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", ip, " *")) : f("", !0)
    ])) : f("", !0),
    b("div", {
      class: k(["vu-slider", { disabled: e.disabled }])
    }, [
      b("div", {
        onMouseup: n[1] || (n[1] = (...a) => s.commit && s.commit(...a)),
        class: "vu-slider__container"
      }, [
        b("div", {
          ref: "leftLabel",
          class: "vu-slider__left vu-slider__label"
        }, w(t.showLabels ? t.labels.min : t.min), 513),
        b("div", {
          ref: "rightLabel",
          class: "vu-slider__right vu-slider__label"
        }, w(t.showLabels ? t.labels.max : t.max), 513),
        b("input", {
          class: "slider vu-slider__left",
          type: "range",
          disabled: e.disabled,
          value: e.innerValue,
          min: t.min,
          max: t.max,
          step: t.step,
          style: G(t.labelsBeneath ? {} : s.computedStyle),
          onInput: n[0] || (n[0] = (a) => s.update(parseFloat(a.target.value)))
        }, null, 44, op),
        b("div", {
          class: "vu-slider__grey-bar",
          style: G({ left: s.labelsMargin, right: s.labelsMargin })
        }, [
          b("div", {
            class: "vu-slider__blue-bar vu-slider__blue-bar--left",
            style: G(s.innerBlueBarStyle)
          }, null, 4)
        ], 4)
      ], 32),
      t.stepped ? (l(), r("div", lp, [
        (l(!0), r(M, null, U(s.steps, (a, u) => (l(), r("div", {
          key: u,
          class: "vu-slider__step",
          style: G(a.style)
        }, null, 4))), 128))
      ])) : f("", !0)
    ], 2),
    (l(!0), r(M, null, U(e.errorBucket, (a, u) => (l(), r("span", {
      key: `${u}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(a), 1))), 128)),
    e.helper.length ? (l(), r("span", ap, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const up = /* @__PURE__ */ F(np, [["render", rp], ["__scopeId", "data-v-c2dadf12"]]), dp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: up
}, Symbol.toStringTag, { value: "Module" })), cp = {
  name: "vu-textarea",
  mixins: [Fe, $e, ze, Ee],
  expose: "focus",
  props: {
    rows: {
      type: [Number, String],
      default: () => 2
    },
    name: {
      type: [String],
      required: !1
    },
    minlength: {
      type: Number,
      required: !1
    },
    maxlength: {
      type: Number,
      required: !1
    },
    readonly: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    spellcheck: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    wrap: {
      type: String,
      required: !1
    },
    autocomplete: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    autocorrect: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    },
    autofocus: {
      type: [Boolean, String, void 0],
      required: !1,
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  inject: {
    isIos: {
      from: es
    }
  },
  methods: {
    focus() {
      var e, n;
      (n = (e = this.$refs) == null ? void 0 : e.textarea) == null || n.focus();
    }
  }
}, hp = {
  key: 0,
  class: "control-label"
}, fp = {
  key: 0,
  class: "label-field-required"
}, pp = ["value", "placeholder", "disabled", "name", "minlength", "maxlength", "readonly", "spellcheck", "rows", "wrap", "autocomplete", "autocorrect", "autofocus", "required"], mp = {
  key: 1,
  class: "form-control-helper-text"
};
function vp(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["form-group", [e.classes, { ios: s.isIos }]])
  }, [
    e.label.length ? (l(), r("label", hp, [
      X(w(e.label), 1),
      e.required ? (l(), r("span", fp, " *")) : f("", !0)
    ])) : f("", !0),
    b("textarea", {
      ref: "textarea",
      value: e.value,
      placeholder: e.placeholder,
      disabled: e.disabled,
      name: t.name,
      minlength: t.minlength,
      maxlength: t.maxlength,
      readonly: t.readonly,
      spellcheck: t.spellcheck,
      rows: t.rows,
      wrap: t.wrap,
      autocomplete: t.autocomplete,
      autocorrect: t.autocorrect,
      autofocus: t.autofocus,
      required: e.required,
      class: "form-control",
      onInput: n[0] || (n[0] = (a) => e.$emit("update:modelValue", a.target.value))
    }, null, 40, pp),
    (l(!0), r(M, null, U(e.errorBucket, (a, u) => (l(), r("p", {
      key: `${u}-error-${a}`,
      style: { display: "block" },
      class: "form-control-error-text"
    }, w(a), 1))), 128)),
    e.helper.length ? (l(), r("span", mp, w(e.helper), 1)) : f("", !0)
  ], 2);
}
const gp = /* @__PURE__ */ F(cp, [["render", vp], ["__scopeId", "data-v-f44c94fb"]]), bp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gp
}, Symbol.toStringTag, { value: "Module" })), yp = { class: "list-item__thumbnail relative" }, _p = {
  key: 0,
  class: "absolute w-full h-full top-0"
}, wp = { class: "list-item__body" }, kp = { key: 0 }, Sp = ["innerHTML"], Ip = {
  key: 0,
  class: "body__description"
}, Cp = {
  key: 0,
  class: "list-item__additional_element"
}, Bp = {
  key: 1,
  class: "list-item__action-menu"
}, $p = {
  name: "vu-thumbnail-list-item"
}, Op = /* @__PURE__ */ Ae({
  ...$p,
  props: {
    icon: { default: "" },
    iconColor: { default: "default" },
    iconSelectedColor: { default: "secondary" },
    scrollIntoView: { type: Boolean, default: !0 },
    scrollableMenu: { type: Boolean },
    attachMenu: { type: [String, Boolean] },
    forceScrollIntoView: { type: Boolean },
    title: { default: "" },
    rawTitle: {},
    imgUrl: {},
    unread: { type: Boolean, default: !1 },
    selected: { type: Boolean, default: !1 },
    description: {},
    actions: { default: () => [] },
    iconFill: { type: Boolean, default: !1 },
    value: { default: void 0 },
    lazyImage: { type: Boolean, default: !0 },
    actionsContentClass: {}
  },
  emits: ["click", "click-action", "actions-close", "actions-open"],
  setup(e, { expose: n, emit: t }) {
    const i = e, o = t;
    n({
      openMenu: _
    });
    const s = xe(hi, "active"), a = x(null), u = x(null), c = x(null), d = x(!1);
    function h() {
      var v;
      a.value && ((v = a.value) != null && v.scrollIntoViewIfNeeded ? a.value.scrollIntoViewIfNeeded({ behavior: "smooth" }) : a.value.scrollIntoView({ block: "nearest" }));
    }
    Mn(() => i.selected, () => {
      i.scrollIntoView && h();
    }), Mn(() => i.forceScrollIntoView, h);
    function p({ target: v }) {
      var y, L, B, R;
      !((L = (y = u.value) == null ? void 0 : y.$el) != null && L.contains(v)) && !((R = (B = c.value) == null ? void 0 : B.$el) != null && R.contains(v)) && o("click", i.value);
    }
    function _() {
      if (!u.value)
        throw Error("Item has no menu");
      d.value = !0;
    }
    return Ot(() => {
      (i.selected && i.scrollIntoView || i.forceScrollIntoView) && h();
    }), (v, y) => {
      var B;
      const L = _e("tooltip");
      return l(), r("div", {
        ref_key: "container",
        ref: a,
        class: k(["vu-thumbnail-list-item", [{
          "menu-is-open": d.value,
          selected: v.selected,
          "with-unread-content": v.unread
        }]]),
        onClick: p
      }, [
        b("div", yp, [
          C(v.$slots, "thumbnail", {}, () => [
            v.icon ? (l(), r("div", {
              key: 0,
              class: k(["thumbnail__container", [{ "bg-grey-0": v.iconFill }]])
            }, [
              T(ue, {
                class: "thumbnail__icon",
                color: v.selected ? i.iconSelectedColor : i.iconColor,
                icon: v.icon
              }, null, 8, ["color", "icon"])
            ], 2)) : v.imgUrl ? (l(), S(it, {
              key: 1,
              src: v.imgUrl || "",
              lazy: v.lazyImage
            }, null, 8, ["src", "lazy"])) : f("", !0)
          ], !0),
          v.$slots.thumbnail__extra ? (l(), r("div", _p, [
            C(v.$slots, "thumbnail__extra", {}, void 0, !0)
          ])) : f("", !0)
        ]),
        b("div", wp, [
          C(v.$slots, "title", {
            isMenuOpen: d.value,
            listItemRef: a.value
          }, () => [
            v.title ? (l(), r("div", {
              key: 0,
              class: k(["body__title", [{
                "font-bold": v.unread,
                "show-1-line": !!v.$slots.description || v.description
              }]])
            }, [
              v.rawTitle ? (l(), r("span", {
                key: 1,
                innerHTML: v.rawTitle
              }, null, 8, Sp)) : (l(), r("span", kp, w(v.title), 1))
            ], 2)) : f("", !0)
          ], !0),
          C(v.$slots, "description", {}, () => [
            v.description ? (l(), r("div", Ip, w(v.description), 1)) : f("", !0)
          ], !0)
        ]),
        (B = v.$slots) != null && B.additional__element ? (l(), r("div", Cp, [
          C(v.$slots, "additional__element", {}, void 0, !0)
        ])) : f("", !0),
        v.unread || v.actions.length ? (l(), r("div", Bp, [
          v.unread ? (l(), S(de, {
            key: 0,
            class: "action-menu__unread-icon",
            "no-active": !0,
            "no-hover": "",
            icon: "record"
          })) : f("", !0),
          v.actions.length > 1 ? (l(), S(rt, {
            key: 1,
            ref_key: "actionMenu",
            ref: u,
            show: d.value,
            "onUpdate:show": y[0] || (y[0] = (R) => d.value = R),
            items: v.actions,
            side: "bottom-right",
            scrollable: v.scrollableMenu,
            maxItemsBeforeScroll: Number.POSITIVE_INFINITY,
            attach: v.attachMenu,
            contentClass: v.actionsContentClass,
            onClickItem: y[1] || (y[1] = (R) => o("click-action", R)),
            onClose: y[2] || (y[2] = (R) => o("actions-close")),
            onOpen: y[3] || (y[3] = (R) => o("actions-open"))
          }, {
            default: V(() => [
              T(de, {
                clickable: "",
                ref_key: "actionMenuActivator",
                ref: c,
                color: v.selected && "white" || "default-lean",
                class: k(["action-menu__action", d.value && K(s)]),
                icon: "chevron-down",
                active: d.value,
                "within-text": !1
              }, null, 8, ["color", "class", "active"])
            ]),
            _: 1
          }, 8, ["show", "items", "scrollable", "maxItemsBeforeScroll", "attach", "contentClass"])) : v.actions.length === 1 ? H((l(), S(de, {
            key: 2,
            ref_key: "actionMenu",
            ref: u,
            clickable: "",
            color: v.selected && "white" || void 0,
            class: "action-menu__action",
            icon: v.actions[0].fonticon,
            active: d.value,
            "within-text": !1,
            onClick: y[4] || (y[4] = (R) => o("click-action", v.actions[0]))
          }, null, 8, ["color", "icon", "active"])), [
            [L, v.actions[0].text || v.actions[0].label]
          ]) : f("", !0)
        ])) : f("", !0),
        C(v.$slots, "hidden-content", {}, void 0, !0)
      ], 2);
    };
  }
}), hs = /* @__PURE__ */ F(Op, [["__scopeId", "data-v-52334abf"]]), Tp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hs
}, Symbol.toStringTag, { value: "Module" })), xp = ["name"], Mp = { class: "section-header_title flex" }, Vp = ["onClick"], Pp = ["data-key"], Lp = ["data-key"], Dp = ["data-key"], Ap = {
  key: 0,
  class: "h-2px mt-2px border-drag-dash-5 border-blue-3 full-width"
}, Fp = ["data-key"], zp = { key: 0 }, Ep = ["name"], Np = { class: "section-header_title flex" }, Rp = ["onClick"], Hp = {
  name: "vu-thumbnail-grid"
}, jp = /* @__PURE__ */ Ae({
  ...Hp,
  props: {
    items: {},
    sections: {},
    pinSection: {},
    pinHeaders: { default: !0 },
    draggable: { default: !0 },
    labels: { default: () => ({
      dragHereToReorder: "Drag here to reorder"
    }) },
    dragBrowserShadow: {},
    dragShadowZIndex: { default: 1100 }
  },
  emits: ["click-header-action"],
  setup(e, { expose: n, emit: t }) {
    const i = e, o = t, s = x(null), a = (j) => {
      if (console.log(j), j === void 0)
        debugger;
      if (j === window)
        debugger;
    }, u = x(), c = x(), d = x(), h = x(), p = x(), _ = x({ x: 0, y: 0 }), v = x(), { x: y, y: L } = si(), B = Y(() => i.sections.map(({ name: j }) => i.items.filter(({ sectionId: oe }) => oe === j).length).reduce((j, oe) => oe > j ? oe : j)), R = Y(() => i.sections.filter(({ name: j }) => i.pinSection === j).pop()), ee = Y(() => R.value ? i.sections.filter((j) => j !== R.value) : i.sections);
    async function ce(j, oe, fe) {
      var we, Se;
      await Gt(), d.value = !0, h.value = { id: fe.id };
      const { top: Ie, bottom: E, left: q, width: te, height: he } = (we = j == null ? void 0 : j.target) == null ? void 0 : we.getBoundingClientRect();
      _.value.x = -(y.value - q), _.value.y = 2, v.value = te, (Se = i.dragBrowserShadow) != null && Se.value || j.dataTransfer.setDragImage(new Image(), 0, 0);
    }
    const Z = Y(() => {
      var fe, Ie, E, q, te;
      if (!d.value && ((fe = p.value) == null ? void 0 : fe.length) === 0)
        return;
      const j = L.value + ((E = (Ie = u.value) == null ? void 0 : Ie.$el) == null ? void 0 : E.scrollTop), oe = (q = p.value) == null ? void 0 : q.map(({ offsetTop: he }) => he).reduce((he, we) => Math.abs(we - j) < Math.abs(he - j) ? we : he, 0);
      return (te = p.value) == null ? void 0 : te.filter((he) => he.offsetTop === oe)[0];
    });
    function D(j) {
      d.value = !1, h.value = void 0, _.value = { x: 0, y: 0 }, v.value = 0;
    }
    n(
      { log: a }
    );
    const [P, Q] = on(), [z, se] = on();
    return Ot(() => {
      c.value = !0;
    }), (j, oe) => {
      const fe = $("vu-icon-btn"), Ie = _e("tooltip");
      return l(), r(M, null, [
        T(K(z), null, {
          default: V(({ item: E }) => [
            C(j.$slots, "section-header", { item: E }, () => [
              b("div", {
                class: "section-header",
                name: E.name
              }, [
                b("h5", Mp, w(E.title), 1),
                b("a", {
                  class: "section-header_link flex cursor-pointer",
                  onClick: (q) => j.emits("click-header-link", q, E, E.linkTarget)
                }, w(E.link), 9, Vp),
                E.actions ? (l(!0), r(M, { key: 0 }, U(E.actions, ({ icon: q, tooltip: te }) => H((l(), S(fe, {
                  key: K(Re)(),
                  icon: q,
                  onClick: (he) => o("click-header-action", he, E, q)
                }, null, 8, ["icon", "onClick"])), [
                  [Ie, te]
                ])), 128)) : f("", !0)
              ], 8, xp)
            ], !0)
          ]),
          _: 3
        }),
        T(K(P), null, {
          default: V(({ item: E, index: q, items: te }) => {
            var he, we, Se, Ve, He, bt;
            return [
              b("div", {
                style: G({ "grid-column": q + 1, "grid-row": 1 })
              }, [
                j.pinHeaders ? f("", !0) : (l(), S(K(se), {
                  key: 0,
                  section: E
                }, null, 8, ["section"]))
              ], 4),
              d.value ? (l(), r("div", {
                key: 0,
                ref_key: "dragTargets",
                ref: p,
                "data-key": `__drag-header-${E.name}`,
                style: G({ "grid-column": q, "grid-row": 1 })
              }, null, 12, Pp)) : f("", !0),
              C(j.$slots, `section-drag-header-${E.name}`, Ke(Xe({ section: E })), void 0, !0),
              E.reorderable && d.value ? (l(), r("div", {
                key: 1,
                ref_key: "dragTargets",
                ref: p,
                "data-key": `__first-${E.name}`
              }, null, 8, Lp)) : f("", !0),
              d.value ? C(j.$slots, "item-drop-placeholder", J({
                key: 2,
                dragData: h.value,
                show: ((Se = (we = (he = Z.value) == null ? void 0 : he.attributes) == null ? void 0 : we["data-key"]) == null ? void 0 : Se.value) === `__first-${E.name}`
              }, { section: E }), () => {
                var Ce, me, Te;
                return [
                  ((Te = (me = (Ce = Z.value) == null ? void 0 : Ce.attributes) == null ? void 0 : me["data-key"]) == null ? void 0 : Te.value) === `__first-${E.name}` ? (l(), r("div", {
                    key: 0,
                    class: "h-2px mt-2px border-drag-dash-5 border-blue-3 full-width",
                    style: G({ "grid-column": q, "grid-row": 1 })
                  }, null, 4)) : f("", !0)
                ];
              }, !0) : f("", !0),
              (l(!0), r(M, null, U(te.filter((Ce) => Ce.sectionId === E.name), (Ce, me) => {
                var Te, yt, Mt, Jt;
                return l(), r(M, {
                  key: Ce.id
                }, [
                  T(hs, J({ ...Ce }, {
                    draggable: i.draggable,
                    onDragstart: (Pe) => ce(Pe, E, Ce),
                    onDragend: oe[0] || (oe[0] = (Pe) => D()),
                    style: [{ "grid-column": q, "grid-row": me + 2 }, Ce.id === ((Te = h.value) == null ? void 0 : Te.id) && "opacity: 0.6"]
                  }), null, 16, ["draggable", "onDragstart", "style"]),
                  E.reorderable && d.value && Ce.id !== h.value.id ? (l(), r("div", {
                    key: 0,
                    ref_for: !0,
                    ref_key: "dragTargets",
                    ref: p,
                    "data-key": Ce.id
                  }, null, 8, Dp)) : f("", !0),
                  d.value ? C(j.$slots, "item-drop-placeholder", {
                    key: 1,
                    dragData: h.value,
                    show: ((Jt = (Mt = (yt = Z.value) == null ? void 0 : yt.attributes) == null ? void 0 : Mt["data-key"]) == null ? void 0 : Jt.value) === Ce.id
                  }, () => {
                    var Pe, ut, Vt;
                    return [
                      ((Vt = (ut = (Pe = Z.value) == null ? void 0 : Pe.attributes) == null ? void 0 : ut["data-key"]) == null ? void 0 : Vt.value) === Ce.id ? (l(), r("div", Ap)) : f("", !0)
                    ];
                  }, !0) : f("", !0)
                ], 64);
              }), 128)),
              d.value ? (l(), r("div", {
                key: 3,
                ref_key: "dragTargets",
                ref: p,
                "data-key": `__drag-footer-${E.name}`
              }, null, 8, Fp)) : f("", !0),
              C(j.$slots, `section-drag-footer-${E.name}`, Ke(Xe({
                show: ((bt = (He = (Ve = Z.value) == null ? void 0 : Ve.attributes) == null ? void 0 : He["data-key"]) == null ? void 0 : bt.value) === `drag-footer-${E.name}`,
                section: E,
                dragging: d.value,
                dragData: h.value
              })), void 0, !0),
              C(j.$slots, `section-footer-${E.name}`, {}, void 0, !0)
            ];
          }),
          _: 3
        }),
        b("div", {
          ref_key: "container",
          ref: s,
          class: "vu-thumbnail-list flex items-stretch full-width h-full flex-nowrap'"
        }, [
          j.pinSection ? (l(), r("div", zp, [
            T(Qe, null, {
              default: V(() => [
                T(K(se), { item: R.value }, null, 8, ["item"]),
                T(K(Q), {
                  item: R.value,
                  index: 1,
                  items: j.items
                }, null, 8, ["item", "items"])
              ]),
              _: 1
            })
          ])) : f("", !0),
          b("div", null, [
            j.pinHeaders ? (l(), r("div", {
              key: 0,
              class: "grid",
              style: G({ "grid-template-columns": `repeat(${ee.value.length}, minmax(0, 1fr))` })
            }, [
              (l(!0), r(M, null, U(ee.value, (E, q) => C(j.$slots, "section-header", {
                key: E.name,
                section: E
              }, () => [
                b("div", {
                  class: "section-header",
                  name: E.name
                }, [
                  b("h5", Np, w(E.title), 1),
                  b("a", {
                    class: "section-header_link flex cursor-pointer",
                    onClick: (te) => j.emits("click-header-link", te, E, E.linkTarget)
                  }, w(E.link), 9, Rp),
                  E.actions ? (l(!0), r(M, { key: 0 }, U(E.actions, ({ icon: te, tooltip: he }) => H((l(), S(fe, {
                    key: K(Re)(),
                    icon: te,
                    onClick: (we) => o("click-header-action", we, E, te)
                  }, null, 8, ["icon", "onClick"])), [
                    [Ie, he]
                  ])), 128)) : f("", !0)
                ], 8, Ep)
              ], !0)), 128))
            ], 4)) : f("", !0),
            T(Qe, {
              ref_key: "scroller",
              ref: u,
              class: k(["flex-grow", j.pinSection && "flex"])
            }, {
              default: V(() => [
                b("div", {
                  class: "vu=thumbnail-list__inner grid grid-gap-col-2",
                  style: G({
                    "grid-template-columns": `repeat(${ee.value.length}minmax(0, 1fr))`,
                    "grid-template-rows": `repeat(${B.value.value + 1}, minmax(0, 1fr))`
                  })
                }, [
                  (l(!0), r(M, null, U(ee.value, (E, q) => (l(), S(K(Q), {
                    key: E.name,
                    item: E,
                    index: q,
                    items: j.items
                  }, null, 8, ["item", "index", "items"]))), 128))
                ], 4)
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 512)
      ], 64);
    };
  }
}), Up = /* @__PURE__ */ F(jp, [["__scopeId", "data-v-bf34cd6c"]]), Wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Up
}, Symbol.toStringTag, { value: "Module" }));
function qp(e) {
  var n;
  const t = ie(e);
  return (n = t == null ? void 0 : t.$el) != null ? n : t;
}
const Ei = un ? window : void 0;
function Dn(...e) {
  let n, t, i, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([t, i, o] = e, n = Ei) : [n, t, i, o] = e, !n)
    return Be;
  Array.isArray(t) || (t = [t]), Array.isArray(i) || (i = [i]);
  const s = [], a = () => {
    s.forEach((h) => h()), s.length = 0;
  }, u = (h, p, _, v) => (h.addEventListener(p, _, v), () => h.removeEventListener(p, _, v)), c = le(
    () => [qp(n), ie(o)],
    ([h, p]) => {
      if (a(), !h)
        return;
      const _ = ei(p) ? { ...p } : p;
      s.push(
        ...t.flatMap((v) => i.map((y) => u(h, v, y, _)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    c(), a();
  };
  return at(d), d;
}
const Fs = 1;
function zs(e, n = {}) {
  const {
    throttle: t = 0,
    idle: i = 200,
    onStop: o = Be,
    onScroll: s = Be,
    offset: a = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions: u = {
      capture: !1,
      passive: !0
    },
    behavior: c = "auto",
    window: d = Ei
  } = n, h = x(0), p = x(0), _ = Y({
    get() {
      return h.value;
    },
    set(P) {
      y(P, void 0);
    }
  }), v = Y({
    get() {
      return p.value;
    },
    set(P) {
      y(void 0, P);
    }
  });
  function y(P, Q) {
    var z, se, j;
    if (!d)
      return;
    const oe = ie(e);
    oe && ((j = oe instanceof Document ? d.document.body : oe) == null || j.scrollTo({
      top: (z = ie(Q)) != null ? z : v.value,
      left: (se = ie(P)) != null ? se : _.value,
      behavior: ie(c)
    }));
  }
  const L = x(!1), B = pt({
    left: !0,
    right: !1,
    top: !0,
    bottom: !1
  }), R = pt({
    left: !1,
    right: !1,
    top: !1,
    bottom: !1
  }), ee = (P) => {
    L.value && (L.value = !1, R.left = !1, R.right = !1, R.top = !1, R.bottom = !1, o(P));
  }, ce = Tn(ee, t + i), Z = (P) => {
    var Q;
    if (!d)
      return;
    const z = P.document ? P.document.documentElement : (Q = P.documentElement) != null ? Q : P, { display: se, flexDirection: j } = getComputedStyle(z), oe = z.scrollLeft;
    R.left = oe < h.value, R.right = oe > h.value;
    const fe = Math.abs(oe) <= 0 + (a.left || 0), Ie = Math.abs(oe) + z.clientWidth >= z.scrollWidth - (a.right || 0) - Fs;
    se === "flex" && j === "row-reverse" ? (B.left = Ie, B.right = fe) : (B.left = fe, B.right = Ie), h.value = oe;
    let E = z.scrollTop;
    P === d.document && !E && (E = d.document.body.scrollTop), R.top = E < p.value, R.bottom = E > p.value;
    const q = Math.abs(E) <= 0 + (a.top || 0), te = Math.abs(E) + z.clientHeight >= z.scrollHeight - (a.bottom || 0) - Fs;
    se === "flex" && j === "column-reverse" ? (B.top = te, B.bottom = q) : (B.top = q, B.bottom = te), p.value = E;
  }, D = (P) => {
    var Q;
    if (!d)
      return;
    const z = (Q = P.target.documentElement) != null ? Q : P.target;
    Z(z), L.value = !0, ce(P), s(P);
  };
  return Dn(
    e,
    "scroll",
    t ? Qo(D, t, !0, !1) : D,
    u
  ), dn(() => {
    const P = ie(e);
    P && Z(P);
  }), Dn(
    e,
    "scrollend",
    ee,
    u
  ), {
    x: _,
    y: v,
    isScrolling: L,
    arrivedState: B,
    directions: R,
    measure() {
      const P = ie(e);
      d && P && Z(P);
    }
  };
}
function Cn(e) {
  return typeof Window < "u" && e instanceof Window ? e.document.documentElement : typeof Document < "u" && e instanceof Document ? e.documentElement : e;
}
const Kp = {
  [Go.mounted](e, n) {
    if (typeof n.value == "function") {
      const t = n.value, i = zs(e, {
        onScroll() {
          t(i);
        },
        onStop() {
          t(i);
        }
      });
    } else {
      const [t, i] = n.value, o = zs(e, {
        ...i,
        onScroll(s) {
          var a;
          (a = i.onScroll) == null || a.call(i, s), t(o);
        },
        onStop(s) {
          var a;
          (a = i.onStop) == null || a.call(i, s), t(o);
        }
      });
    }
  }
};
function Ni(e) {
  const n = window.getComputedStyle(e);
  if (n.overflowX === "scroll" || n.overflowY === "scroll" || n.overflowX === "auto" && e.clientWidth < e.scrollWidth || n.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const t = e.parentNode;
    return !t || t.tagName === "BODY" ? !1 : Ni(t);
  }
}
function Gp(e) {
  const n = e || window.event, t = n.target;
  return Ni(t) ? !1 : n.touches.length > 1 ? !0 : (n.preventDefault && n.preventDefault(), !1);
}
const tn = /* @__PURE__ */ new WeakMap();
function Yp(e, n = !1) {
  const t = x(n);
  let i = null, o;
  le(Wn(e), (u) => {
    const c = Cn(ie(u));
    if (c) {
      const d = c;
      tn.get(d) || tn.set(d, o), t.value && (d.style.overflow = "hidden");
    }
  }, {
    immediate: !0
  });
  const s = () => {
    const u = Cn(ie(e));
    !u || t.value || (qt && (i = Dn(
      u,
      "touchmove",
      (c) => {
        Gp(c);
      },
      { passive: !1 }
    )), u.style.overflow = "hidden", t.value = !0);
  }, a = () => {
    var u;
    const c = Cn(ie(e));
    !c || !t.value || (qt && (i == null || i()), c.style.overflow = (u = tn.get(c)) != null ? u : "", tn.delete(c), t.value = !1);
  };
  return at(a), Y({
    get() {
      return t.value;
    },
    set(u) {
      u ? s() : a();
    }
  });
}
function Xp() {
  let e = !1;
  const n = x(!1);
  return (t, i) => {
    if (n.value = i.value, e)
      return;
    e = !0;
    const o = Yp(t, i.value);
    le(n, (s) => o.value = s);
  };
}
Xp();
function Jp(e, n) {
  const t = e.findIndex((i) => !n(i));
  return t >= 0 ? e.slice(0, t) : e;
}
function Zp(e, n) {
  const t = e.toReversed(), i = t.findIndex((o) => !n(o));
  return i >= 0 ? t.slice(0, i).reverse() : e;
}
const Qp = ["data-number", "data-id"], em = {
  key: 1,
  class: "v-spacer"
}, tm = {
  key: 0,
  class: "h-drag-dash-2 blue-2 flex flex-grow w-full"
}, nm = ["data-key"], sm = {
  key: 0,
  class: "h-drag-dash-2 blue-2 flex flex-grow w-full"
}, im = ["data-id"], om = ["data-id"], lm = {
  key: 1,
  class: "h-drag-dash-2 item-drop blue-2 flex flex-grow w-full"
}, am = ["data-id"], rm = ["data-id"], um = {
  name: "vu-thumbnail-list"
}, dm = /* @__PURE__ */ Ae({
  ...um,
  props: /* @__PURE__ */ Bt({
    items: {},
    sections: {},
    selectedSections: {},
    labels: {},
    draggable: { type: Boolean, default: !0 },
    reorderableSections: { type: Boolean, default: !1 },
    stickyHeaders: { type: Boolean },
    expandableHeaders: { type: Boolean, default: !0 },
    itemHeight: { default: 44 },
    headerItemHeight: { default: 44 },
    dropZoneHeight: { default: 60 },
    dropZoneMargin: { default: 10 },
    dragOffset: { type: [Function, Boolean], default: !0 },
    restoreCollapsedOnReorderExit: { type: Boolean, default: !0 },
    options: { default: () => ({
      thumbnailDropMinDistance: 80,
      thumbnailFullscreenDropMinDistance: 220,
      sectionDropMinDistance: 80
    }) },
    showDelete: { default: [] },
    showDeleteOnAll: { type: Boolean, default: !1 },
    fullscreen: { type: Boolean, default: !1 },
    showEmptySectionDrop: { type: Boolean },
    showEmptySectionDropExcept: { default: [] },
    showItemDropzone: { type: Boolean },
    scrollToFirst: { type: Boolean }
  }, {
    modelValue: {
      default: []
    },
    modelModifiers: {},
    dragData: {
      default: {}
    },
    dragDataModifiers: {}
  }),
  emits: /* @__PURE__ */ Bt(["click-header-action", "drag-start-item", "drag-start", "drag-cancel", "drop-section", "drop-item", "drop-item-remove", "section-actions-menu-open", "section-actions-menu-close", "section-collapse", "section-expand", "item-click", "item-click-action", "item-actions-menu-open", "item-actions-menu-close", "item-mouseenter", "item-mouseleave", "item-contextmenu", "item-thumbnail-doubleclick"], ["update:modelValue", "update:dragData"]),
  setup(e, { expose: n, emit: t }) {
    let i;
    ((m) => {
      m[m.USER = 0] = "USER", m[m.PROGRAMMATICALLY = 1] = "PROGRAMMATICALLY";
    })(i || (i = {}));
    const o = e, s = t, a = "ANY", u = x({
      moveHere: "Move here",
      moveSectionHere: "Move here",
      removeFrom: "Remove"
    }), c = wo(), d = sn(e, "modelValue"), h = sn(e, "dragData"), p = x(null), _ = x({}), v = x({}), y = x([]), L = x([]), B = x(), { top: R, left: ee } = ln(B), ce = x(!1);
    function Z(m) {
      const { isScrolling: I } = m;
      ce.value = I.value;
    }
    const D = Y(() => {
      var m;
      return ((m = o.sections) == null ? void 0 : m.map(({ name: I }) => I)) || {};
    }), P = x(!1), Q = x(!1), z = x({}), se = x(), { x: j, y: oe } = si({ scroll: !1 }), fe = x(), Ie = x();
    function E(m) {
      var W, ne, A;
      const I = m.target.cloneNode(!0);
      I.classList += " dragged", I.classList.remove("selected"), (W = I.classList) != null && W.contains("section-header") && I.classList.remove(".section-header--dragged");
      const { width: g, left: O } = m.target.getBoundingClientRect();
      I.style.width = `${g}px`, I.style.opacity = "0.6", I.style.position = "absolute", I.style.left = "-5000px", I.style.top = "-1000px", I.style.zIndex = "10000", gs.value = I, document.body.appendChild(I);
      let N = 0;
      typeof o.dragOffset == "function" ? N = o.dragOffset(m) : o.dragOffset === !0 && (N = (m == null ? void 0 : m.clientX) - O, (ne = m.dataTransfer) == null || ne.setDragImage(I, N, 0)), (A = m.dataTransfer) == null || A.setData("text/plain", " ");
    }
    function q(m) {
      m != null && m.dataTransfer && (m.dataTransfer.dropEffect = "none"), m.preventDefault(), m.stopPropagation();
    }
    function te(m) {
      m != null && m.dataTransfer && (m.dataTransfer.dropEffect = "move"), m.preventDefault();
    }
    function he(m, I, g) {
      o.draggable && (P.value = !0, z.value = { id: I.id, section: g, thumbnail: I }, m.dataTransfer.effectAllowed = "move", m.dataTransfer.dropEffect = "move", E(m), s("drag-start"), s("drag-start-item", z.value));
    }
    function we(m, I) {
      Q.value = !0, z.value = { section: I, thumbnail: void 0 }, m.dataTransfer.effectAllowed = "move", m.dataTransfer.dropEffect = "move", E(m), s("drag-start");
    }
    const Se = x(!1);
    function Ve(m, I) {
      var g, O, N, W;
      if (P.value) {
        if (I && !(!I.accept || ((g = I == null ? void 0 : I.accept) == null ? void 0 : g.includes(a)) || ((N = (O = z.value) == null ? void 0 : O.thumbnail) == null ? void 0 : N.type) && ((W = I.accept) == null ? void 0 : W.includes(z.value.thumbnail.type)))) {
          m != null && m.dataTransfer && (m.dataTransfer.dropEffect = "none");
          return;
        }
        Se.value = !0, m != null && m.dataTransfer && (m.dataTransfer.dropEffect = "move");
      }
    }
    function He(m) {
      Se.value = !1, fe.value && (m != null && m.dataTransfer) && (m.dataTransfer.dropEffect = "move");
    }
    function bt({ x: m, y: I }, g, O = Number.POSITIVE_INFINITY, N = "y") {
      const { key: W, id: ne } = (g == null ? void 0 : g.map((A) => {
        var Ft, ke, Oe, Ne;
        A = (A == null ? void 0 : A.$el) || A;
        const { offsetLeft: ae, offsetHeight: ve, offsetTop: be, attributes: { "data-id": Le, "data-key": ot, clientWidth: yn } = {} } = A;
        let Lt = be, Dt = ae;
        (ke = (Ft = A == null ? void 0 : A.parentElement) == null ? void 0 : Ft.classList) != null && ke.contains("vu-thumbnail-list-item") && (Dt += A.parentElement.offsetLeft, Lt += A.parentElement.offsetTop);
        let wt;
        const Zt = (Ne = (Oe = B.value) == null ? void 0 : Oe.$el) == null ? void 0 : Ne.scrollTop, At = Lt - Zt;
        switch (N) {
          case "y":
            wt = Math.abs(At - I);
            break;
          case "both":
            wt = Math.sqrt((At - I) ** 2 + (Dt - m) ** 2);
        }
        return {
          distance: wt,
          key: ot == null ? void 0 : ot.value,
          id: Le == null ? void 0 : Le.value
        };
      }).filter(({ distance: A }) => A < O).reduce((A, ae) => ae.distance < A.distance ? ae : A, { distance: Number.POSITIVE_INFINITY, key: void 0, id: void 0 })) || {};
      return W || ne ? g == null ? void 0 : g.find((A) => {
        A = (A == null ? void 0 : A.$el) || A;
        const { attributes: ae } = A, { "data-key": ve = { value: "_noValue" }, "data-id": be = { value: "_noId" } } = ae;
        return W === (ve == null ? void 0 : ve.value) || ne === (be == null ? void 0 : be.value);
      }) : void 0;
    }
    xn([P, se, oe, j, Se], () => {
      if (!P.value) {
        fe.value = void 0;
        return;
      }
      if (ce.value)
        return;
      if (Se.value) {
        fe.value = void 0;
        return;
      }
      const m = oe.value - R.value, I = j.value - ee.value;
      fe.value = bt({ y: m, x: I }, se.value, Ce.value, o.fullscreen ? "both" : "y");
    }, { throttle: 120 }), xn([Q, se, oe], () => {
      if (!Q.value) {
        Ie.value = void 0;
        return;
      }
      if (ce.value)
        return;
      const m = oe.value - R.value;
      Ie.value = bt({ x: 0, y: m }, se.value, o.options.sectionDropMinDistance);
    }, { throttle: 120 });
    const Ce = Y(() => o.fullscreen ? o.options.thumbnailFullscreenDropMinDistance : o.options.thumbnailDropMinDistance), me = Y(() => {
      var g, O, N, W, ne, A;
      const m = (N = (O = (g = fe.value) == null ? void 0 : g.attributes) == null ? void 0 : O["data-id"]) == null ? void 0 : N.value, I = (A = (ne = (W = fe.value) == null ? void 0 : W.attributes) == null ? void 0 : ne["data-number"]) == null ? void 0 : A.value;
      return m && (I ? Number(m) : m) || void 0;
    }), Te = Y(() => {
      var m, I, g;
      return (g = (I = (m = Ie.value) == null ? void 0 : m.attributes) == null ? void 0 : I["data-key"]) == null ? void 0 : g.value;
    }), yt = Y(() => {
      var m;
      return (m = o.sections) == null ? void 0 : m.filter(({ reorderable: I }) => I === !1);
    }), Mt = Y(() => Jp(o.sections, ({ reorderable: m }) => m === !1)), Jt = Y(() => Zp(o.sections, ({ reorderable: m }) => m === !1)), Pe = x();
    le(me, (m, I) => {
      var O;
      if (I === m)
        return;
      const g = (O = m == null ? void 0 : m.toString().match(/(__collapsed-)(\w+)/)) == null ? void 0 : O[2];
      if (g) {
        const N = o.sections.find(({ name: W }) => W === g);
        y.value.includes(N) && (Pe.value = N, co());
      } else
        Pe.value = void 0, ho();
    });
    const ut = Y(() => {
      var m;
      if (P.value)
        return (m = o.items) == null ? void 0 : m.filter((I) => I.sectionId === z.value.thumbnail.sectionId);
    }), Vt = Y(() => {
      var m, I;
      return ((I = ut == null ? void 0 : ut.value) == null ? void 0 : I.indexOf((m = z.value) == null ? void 0 : m.thumbnail)) - 1 || 0;
    });
    function Pt(m) {
      var I;
      if (Vt.value !== -1)
        return ((I = ut.value) == null ? void 0 : I.indexOf(m)) === Vt.value;
    }
    function Qi(m) {
      return o.items.findLast((g) => m.sectionId === g.sectionId) === m;
    }
    function ps(m) {
      var I;
      if (Mt.value.includes(m) && ((I = Mt.value.slice(-1)) == null ? void 0 : I[0]) !== m)
        return !1;
      if (!Jt.value.includes(m))
        return !0;
    }
    function eo(m) {
      const I = Te.value;
      if (!I)
        return;
      const g = [...o.sections], O = g.findIndex(({ name: W }) => W === I);
      return g.findIndex(({ name: W }) => W === m) === O + 1;
    }
    function ms(m) {
      var N, W, ne, A, ae, ve, be, Le;
      P.value = !1;
      const I = ((ne = (W = (N = m == null ? void 0 : m.target) == null ? void 0 : N.attributes) == null ? void 0 : W["data-id"]) == null ? void 0 : ne.value) || ((be = (ve = (ae = (A = m == null ? void 0 : m.target) == null ? void 0 : A.parentElement) == null ? void 0 : ae.attributes) == null ? void 0 : ve["data-id"]) == null ? void 0 : be.value);
      if (!I) {
        z.value = void 0;
        return;
      }
      const g = I.split("__remove-from-").pop(), O = o.items.find(({ sectionId: ot }) => ot === name);
      s("drop-item-remove", m, {
        item: (Le = z.value) == null ? void 0 : Le.thumbnail,
        section: O,
        sectionId: g
      }), z.value = void 0;
    }
    function to() {
      io.value = void 0, vs.value = void 0, P.value = !1, Q.value = !1, z.value = void 0, gs.value = void 0, Se.value = !1, s("drag-cancel");
    }
    function fn(m) {
      var N, W, ne;
      let I = me.value;
      if (!P.value)
        return;
      if (((N = z.value) == null ? void 0 : N.id) === I || !I) {
        to();
        return;
      }
      I.toString().startsWith("__collapsed-") && (I = I.replace("__collapsed-", "__first-"));
      const g = o.items.find(({ id: A }) => A === I);
      P.value = !1, Se.value = !1;
      let O;
      if (g)
        O = {
          item: g,
          index: ((W = o.items) == null ? void 0 : W.indexOf(g)) + 1
        };
      else {
        const A = I.split("__first-")[1];
        O = {
          index: o.items.findIndex(({ sectionId: ve }) => ve === name) + 1 || 0,
          name: A
        };
      }
      s("drop-item", m, {
        // The item after which the element must be placed.
        // If empty, will be first element of section
        from: (ne = z.value) == null ? void 0 : ne.thumbnail,
        to: O
      }), z.value = void 0;
    }
    function no(m) {
      var O, N, W, ne, A, ae, ve, be;
      P.value = !1, Se.value = !1;
      const I = ((W = (N = (O = m == null ? void 0 : m.target) == null ? void 0 : O.attributes) == null ? void 0 : N["data-id"]) == null ? void 0 : W.value) || ((ve = (ae = (A = (ne = m == null ? void 0 : m.target) == null ? void 0 : ne.parentElement) == null ? void 0 : A.attributes) == null ? void 0 : ae["data-id"]) == null ? void 0 : ve.value);
      if (!I) {
        z.value = void 0;
        return;
      }
      const g = I.split("__empty-section-").pop();
      s(
        "drop-item",
        m,
        {
          from: (be = z.value) == null ? void 0 : be.thumbnail,
          to: {
            index: 0,
            name: g
          }
        }
      ), z.value = void 0;
    }
    function so(m) {
      var g, O;
      const I = Te.value;
      if (Q.value = !1, I) {
        const N = (g = o.sections) == null ? void 0 : g.findIndex(({ name: ne }) => ne === I), W = N !== -1 ? o.sections[N] : void 0;
        s("drop-section", m, {
          from: (O = z.value) == null ? void 0 : O.section,
          // The item after which the element must be placed.
          // If empty, will be first element.
          to: {
            section: W,
            index: N
          }
        });
      }
      z.value = void 0;
    }
    const io = x(), vs = x(), gs = x();
    ko(() => {
      h.value = {
        dragData: z,
        dropThumbnailElement: fe,
        dropSectionElement: Ie,
        dropThumbnailId: me,
        dropSectionId: Te
      };
    });
    const pn = x();
    x(), n({
      expandHeader: vn,
      expand: gn,
      collapse: _s
    });
    const [oo, bs] = on(), [lo, ao] = on();
    Ot(() => {
      mn.value = !0, o.sections.map((m) => ps(m));
    });
    const je = Y(() => ({
      ...u.value,
      ...o.labels
    })), mn = x(!1);
    le(mn, () => {
      setTimeout(() => {
        mn.value = !1;
      }, 1);
    });
    function vn(m, { smooth: I = !0 } = {}) {
      const O = _.value[m].offsetTop;
      let N;
      I && (N = { behavior: "smooth" }), B.value.$el.scrollTo({ top: O, ...N });
    }
    function ys(m) {
      o.reorderableSections || (y.value.includes(m) ? y.value.includes(m) && (gn(m.name, !0), o.stickyHeaders && vn(m.name)) : _s(m.name, !0));
    }
    function gn(m, I = !1) {
      if (o.reorderableSections)
        return;
      const g = o.sections.find(({ name: W }) => W === m);
      if (!g)
        return;
      const N = Object.entries(y.value).findIndex(([W, ne]) => ne.name === g.name);
      if (N !== -1) {
        y.value.splice(N, 1);
        const { name: W } = g;
        s(
          "section-expand",
          g,
          W,
          I ? 0 : 1
          /* PROGRAMMATICALLY */
        );
      }
    }
    function _s(m, I = !1) {
      const g = o.sections.find(({ name: ne }) => ne === m);
      if (!g || Object.entries(y.value).findIndex(([ne, A]) => A.name === g.name) !== -1)
        return;
      o.stickyHeaders && (v.value[m] = !1), y.value.push(g);
      const { name: W } = g;
      s(
        "section-collapse",
        g,
        W,
        I ? 0 : 1
        /* PROGRAMMATICALLY */
      );
    }
    le(() => o.reorderableSections, (m) => {
      o.restoreCollapsedOnReorderExit && (m ? L.value = [...y.value] : y.value = L.value), m && y.value.splice(0, (y == null ? void 0 : y.value.length) || 0, ...o.sections);
    }, { immediate: !0 });
    const _t = dl(D);
    function ws(m) {
      const I = m.map((O) => o.sections.find(({ name: N }) => N === O)), g = I.filter(({ collapsed: O }) => O === !0);
      o.reorderableSections ? (o.restoreCollapsedOnReorderExit && g.length && L.value.push(...g), y.value.push(...I)) : y.value.push(...g);
    }
    le(() => o.sections, () => {
      var I;
      const m = (I = o.sections) == null ? void 0 : I.map(({ name: g }) => g);
      ws(m);
    }, { immediate: !0, once: !0 }), le([() => o.sections.length], () => {
      const m = o.sections, I = (m == null ? void 0 : m.map(({ name: W }) => W)) || [], g = _t != null && _t.value ? Array.from(_t == null ? void 0 : _t.value) : [], O = g == null ? void 0 : g.filter((W) => !(I != null && I.includes(W))), N = I == null ? void 0 : I.filter((W) => !(g != null && g.includes(W)));
      O.map((W) => {
        o.restoreCollapsedOnReorderExit && delete L.value[W];
      }), N != null && N.length && ws(N);
    }, { deep: !0 });
    const bn = Y(() => {
      var m;
      return !o.selectedSections || ((m = o.selectedSections) == null ? void 0 : m.length) === 0;
    }), ro = Y(() => {
      var m, I;
      if (o.scrollToFirst)
        return (I = (m = o == null ? void 0 : o.sections) == null ? void 0 : m.map(({ name: g }) => {
          var N;
          const O = (N = o == null ? void 0 : o.items) == null ? void 0 : N.findIndex(({ sectionId: W }) => W === g);
          return [g, O > -1 ? O : void 0];
        }).find(([, g]) => g > -1)) == null ? void 0 : I.map((g) => o.items[g]).pop();
    });
    Mn(() => o.selectedSections, () => {
      var m;
      if (!bn.value && ((m = o.selectedSections) != null && m[0])) {
        const I = () => {
          var O, N;
          let g = (N = (O = _ == null ? void 0 : _.value) == null ? void 0 : O[o.selectedSections[0].name]) == null ? void 0 : N.$el;
          return g = (g == null ? void 0 : g.nextElementSibling) || g, g ? (g != null && g.scrollIntoViewIfNeeded ? g.scrollIntoViewIfNeeded() : g.scrollIntoView({
            block: "nearest"
          }), !0) : !1;
        };
        I() || Gt(I);
      }
    }, { immediate: !0 });
    function uo(m) {
      return o.items.find(({ sectionId: I }) => I === m);
    }
    const { start: co, stop: ho, isPending: ks } = nl(() => {
      var m;
      (m = Pe.value) != null && m.name && (gn(Pe.value.name), Pe.value = void 0);
    }, 1e3);
    return (m, I) => (l(), r(M, null, [
      T(K(oo), null, {
        default: V(({ item: g }) => [
          (l(!0), r(M, null, U(m.items.filter((O) => O.sectionId === g.name), (O) => {
            var N, W, ne;
            return l(), r(M, {
              key: O.id
            }, [
              H(T(hs, J({ class: "relative" }, {
                ...O,
                selected: d.value.includes(O),
                scrollIntoView: bn.value,
                forceScrollIntoView: m.scrollToFirst && O === ro.value || O.forceScrollIntoView && !bn.value
              }, {
                draggable: o.draggable,
                class: {
                  "max-w-[280px]": m.fullscreen,
                  "m-t-[2px]": m.fullscreen,
                  dragging: P.value
                },
                style: [
                  O.id === ((N = z.value) == null ? void 0 : N.id) && "opacity: 0.6",
                  !m.fullscreen && Qi(O) && "margin-bottom: 2px",
                  !m.fullscreen && me.value === O.id && "margin-bottom: 0"
                ],
                onClick: (A) => s("item-click", A, O),
                onClickAction: (A) => s("item-click-action", A, O.value),
                onDragstart: (A) => he(A, O, g),
                onDragover: (A) => {
                  var ae;
                  P.value && me.value === O.id && O.id === ((ae = z.value) == null ? void 0 : ae.id) || !g.reorderableItems ? q(A) : P.value && !pn.value && me.value && te(A);
                },
                onActionsOpen: (A) => s("item-actions-menu-open", O),
                onActionsClose: (A) => s("item-actions-menu-close", O),
                onMouseenter: (A) => s("item-mouseenter", A, O),
                onMouseleave: (A) => s("item-mouseleave", A, O),
                onContextmenu: (A) => s("item-contextmenu", A, O)
              }), Ks({
                "hidden-content": V(() => {
                  var A, ae, ve, be;
                  return [
                    g.reorderableItems && P.value && !Pt(O) && !y.value.includes(g) && (!g.accept || (A = g == null ? void 0 : g.accept) != null && A.includes(a) || (ve = (ae = z.value) == null ? void 0 : ae.thumbnail) != null && ve.type && ((be = g.accept) != null && be.includes(z.value.thumbnail.type))) ? (l(), r("div", {
                      key: 0,
                      ref_for: !0,
                      ref_key: "dragTargets",
                      ref: se,
                      class: "drag-target absolute w-[1px] h-[1px] top-[50%] left-[50%]",
                      style: G(o.fullscreen && "left:100%; right:0;"),
                      "data-number": typeof O.id == "number" || "",
                      "data-id": O.id
                    }, null, 12, Qp)) : f("", !0)
                  ];
                }),
                _: 2
              }, [
                O.extraThumbnailIcon ? {
                  name: "thumbnail__extra",
                  fn: V(() => [
                    T(K(ao), Ke(Xe({ extraIcon: O.extraThumbnailIcon, thumbnail: O, section: g })), null, 16)
                  ]),
                  key: "0"
                } : void 0
              ]), 1040, ["draggable", "class", "style", "onClick", "onClickAction", "onDragstart", "onDragover", "onActionsOpen", "onActionsClose", "onMouseenter", "onMouseleave", "onContextmenu"]), [
                [Me, !((W = y.value) != null && W.includes(g))]
              ]),
              C(m.$slots, "item-drop-zone", J({
                dragData: z.value,
                show: me.value && me.value === O.id && me.value !== ((ne = z.value) == null ? void 0 : ne.id)
              }, { section: g, thumbnail: O, fullscreen: m.fullscreen }), () => {
                var A, ae, ve, be, Le;
                return [
                  m.fullscreen && !y.value.includes(g) ? (l(), r(M, { key: 0 }, [
                    g.reorderableItems && P.value && !Pt(O) && O.id !== ((A = z.value) == null ? void 0 : A.id) ? (l(), r("div", {
                      key: 0,
                      class: k(["v-drag-dash-2 blue-2 flex-basis-[2px] flex-grow-0 flex-shrink-0 h-[50px] self-stretch", {
                        invisible: me.value !== O.id,
                        "mt-[2px]": m.fullscreen
                      }])
                    }, null, 2)) : g.reorderableItems && P.value && (!Pt(O) || O.id !== ((ae = z.value) == null ? void 0 : ae.id)) ? (l(), r("div", em)) : f("", !0)
                  ], 64)) : !m.fullscreen && m.showItemDropzone && me.value === O.id && !Pt(O) ? (l(), S(kt, {
                    key: 1,
                    icon: "drag-drop",
                    dashed: "",
                    centered: "",
                    color: "blue",
                    "no-hover": "",
                    label: ((ve = je.value) == null ? void 0 : ve[`moveTo${K(dt)(g.name)}`]) || ((be = je.value) == null ? void 0 : be.moveHere),
                    onDrop: fn,
                    onDragover: Ve,
                    onDragleave: He
                  }, null, 8, ["label"])) : !m.fullscreen && !m.showItemDropzone && me.value === O.id && !Pt(O) && !K(ks) ? (l(), r("div", {
                    key: 2,
                    class: k(["h-drag-dash-2 blue-2 flex flex-grow w-full", { invisible: O.id === ((Le = z.value) == null ? void 0 : Le.id) }])
                  }, null, 2)) : f("", !0)
                ];
              }, !0)
            ], 64);
          }), 128))
        ]),
        _: 3
      }),
      T(K(lo), null, {
        default: V(({ extraIcon: g, thumbnail: O, section: N }) => [
          T(ue, {
            icon: g,
            onClick: I[0] || (I[0] = re(() => {
            }, ["stop"])),
            onDblclick: (W) => s("item-thumbnail-doubleclick", g, O, N),
            style: { "z-index": "20", "font-size": "130%", "line-height": "40px", "vertical-align": "middle", height: "100%", width: "100%", margin: "0" }
          }, null, 8, ["icon", "onDblclick"])
        ]),
        _: 1
      }),
      b("div", J({
        ref_key: "container",
        ref: p,
        class: ["vu-thumbnail-list", { fullscreen: m.fullscreen }],
        onDragend: I[2] || (I[2] = (g) => {
          P.value ? fn(g) : Q.value && so(g);
        })
      }, m.$attrs), [
        H((l(), S(Qe, {
          ref_key: "scroller",
          ref: B
        }, {
          default: V(() => [
            (l(!0), r(M, null, U(m.sections, (g, O) => {
              var N, W, ne, A, ae, ve, be, Le, ot, yn, Lt, Dt, wt, Zt, At, Ft;
              return l(), r(M, {
                key: g.name
              }, [
                C(m.$slots, "section-header", { section: g }, () => {
                  var ke, Oe, Ne, zt, Et, Nt, Rt;
                  return [
                    Q.value && O === 0 && g.reorderable !== !1 ? (l(), r("div", {
                      key: 0,
                      ref_for: !0,
                      ref_key: "dragTargets",
                      ref: se,
                      class: "drag-section",
                      "data-key": "__first"
                    }, null, 512)) : f("", !0),
                    O === 0 ? C(m.$slots, "section-drop-placeholder", {
                      key: 1,
                      dragData: z.value,
                      show: Te.value === "__first",
                      vBind: { section: g }
                    }, () => [
                      Te.value === "__first" ? (l(), r("div", tm)) : f("", !0)
                    ], !0) : f("", !0),
                    T(zi, J({
                      ref_for: !0,
                      ref: (De) => _.value[g.name] = De,
                      name: g.name,
                      class: "section-header"
                    }, {
                      expandable: m.expandableHeaders,
                      expanded: !((ke = y.value) != null && ke.includes(g)),
                      tabbed: !m.reorderableSections && ((Oe = y.value) == null ? void 0 : Oe.includes(g)) && d.value.some(({ sectionId: De }) => De === g.name),
                      title: g.title,
                      actions: g.actions,
                      indicator: g.indicator,
                      sticked: m.stickyHeaders,
                      reorderable: m.reorderableSections && !yt.value.includes(g),
                      disabled: m.reorderableSections && (((Ne = yt.value) == null ? void 0 : Ne.includes(g)) || Q.value && g.name === ((Et = (zt = z.value) == null ? void 0 : zt.section) == null ? void 0 : Et.name)),
                      dragged: Q.value && g.name === ((Rt = (Nt = z.value) == null ? void 0 : Nt.section) == null ? void 0 : Rt.name),
                      draggable: m.reorderableSections && !yt.value.includes(g),
                      dashed: Pe.value === g,
                      focused: vs.value === g
                    }, {
                      onDragover: re(() => {
                      }, ["prevent"]),
                      class: {
                        reorderable: m.reorderableSections,
                        "lesser-margin": Q.value && eo(g.name)
                      },
                      onClickExpander: (De) => ys(g),
                      onClickTitle: (De) => m.expandableHeaders ? ys(g) : m.stickyHeaders && vn(g.name),
                      onDragstart: (De) => we(De, g),
                      onMouseenter: (De) => pn.value = g,
                      onMouseleave: I[1] || (I[1] = (De) => pn.value = void 0)
                    }), null, 16, ["name", "class", "onClickExpander", "onClickTitle", "onDragstart", "onMouseenter"]),
                    Q.value && ps(g) ? (l(), r("div", {
                      key: 2,
                      ref_for: !0,
                      ref_key: "dragTargets",
                      ref: se,
                      class: "drag-section",
                      "data-key": g.name
                    }, null, 8, nm)) : f("", !0),
                    C(m.$slots, "section-drop-placeholder", {
                      dragData: z.value,
                      show: Q.value && Te.value === g.name,
                      vBind: { section: g }
                    }, () => [
                      Te.value === g.name ? (l(), r("div", sm)) : f("", !0)
                    ], !0)
                  ];
                }, !0),
                P.value && y.value.includes(g) && !m.reorderableSections ? (l(), r("div", {
                  key: 0,
                  ref_for: !0,
                  ref_key: "dragTargets",
                  ref: se,
                  "data-id": `__collapsed-${g.name}`
                }, null, 8, im)) : f("", !0),
                C(m.$slots, `item-drop-zone-empty-section-${g.name}`, Ke(Xe({ section: g })), () => {
                  var ke, Oe, Ne, zt, Et, Nt, Rt, De;
                  return [
                    !o.reorderableSections && o.showEmptySectionDrop && !((ke = m.showEmptySectionDropExcept) != null && ke.includes(g.name)) && !((Oe = y.value) != null && Oe.includes(g)) && !m.items.filter(({ sectionId: _n }) => _n === g.name).length ? (l(), S(kt, {
                      key: 0,
                      class: k([{ "w-[280px]": m.fullscreen }, "empty-dropzone"]),
                      ref_for: !0,
                      ref_key: "dragTargets",
                      ref: se,
                      icon: "drag-drop",
                      dashed: "",
                      centered: "",
                      color: "grey-light",
                      hoverClassName: "vu-dropzone--blue",
                      "no-hover": "",
                      "add-hover-class": !g.accept || ((Ne = g == null ? void 0 : g.accept) == null ? void 0 : Ne[0]) === a || P.value && ((Nt = g.accept) == null ? void 0 : Nt.includes((Et = (zt = z.value) == null ? void 0 : zt.thumbnail) == null ? void 0 : Et.type)),
                      "data-id": `__empty-section-${g.name}`,
                      label: ((Rt = je.value) == null ? void 0 : Rt[`moveToEmpty${K(dt)(g.name)}`]) || ((De = je.value) == null ? void 0 : De.moveHere),
                      onDrop: no,
                      onDragover: re((_n) => Ve(_n, g), ["prevent", "stop"]),
                      onDragleave: re(He, ["prevent", "stop"])
                    }, null, 8, ["class", "add-hover-class", "data-id", "label", "onDragover"])) : f("", !0)
                  ];
                }, !0),
                (!o.showEmptySectionDrop || o.showEmptySectionDrop && !((N = m.showEmptySectionDropExcept) != null && N.includes(g.name)) && m.items.filter(({ sectionId: ke }) => ke === g.name).length) && (!g.accept || ((W = g == null ? void 0 : g.accept) == null ? void 0 : W[0]) === a || (A = (ne = z.value) == null ? void 0 : ne.thumbnail) != null && A.type && ((ae = g.accept) != null && ae.includes(z.value.thumbnail.type))) && (g.reorderableItems || g.droppable) && P.value && z.value.thumbnail !== uo(g.name) && !y.value.includes(g) ? (l(), r(M, { key: 1 }, [
                  o.fullscreen ? f("", !0) : (l(), r("div", {
                    key: 0,
                    ref_for: !0,
                    ref_key: "dragTargets",
                    ref: se,
                    class: "drag-target",
                    "data-id": `__first-${g.name}`
                  }, null, 8, om))
                ], 64)) : f("", !0),
                C(m.$slots, "item-drop-zone", J({ dragData: z.value }, { section: g }, {
                  show: P.value && me.value === `__first-${g.name}`,
                  vBind: { section: g }
                }), () => {
                  var ke, Oe;
                  return [
                    !o.fullscreen && m.showItemDropzone && P.value && me.value === `__first-${g.name}` && !y.value.includes(g) ? (l(), S(kt, {
                      key: 0,
                      icon: "drag-drop",
                      dashed: "",
                      centered: "",
                      "no-hover": "",
                      color: "blue",
                      label: ((ke = je.value) == null ? void 0 : ke[`moveTo${K(dt)(g.name)}`]) || ((Oe = je.value) == null ? void 0 : Oe.moveHere),
                      onDragover: re(Ve, ["prevent"]),
                      onDragleave: re(He, ["prevent"]),
                      onDrop: fn
                    }, null, 8, ["label"])) : !o.fullscreen && !m.showItemDropzone && P.value && me.value === `__first-${g.name}` && !y.value.includes(g) && !K(ks) ? (l(), r("div", lm)) : f("", !0)
                  ];
                }, !0),
                m.fullscreen ? (l(), r("div", {
                  key: 2,
                  class: k(["flex flex-row flex-wrap gap-y-[6px] gap-x-[10px] m-l-[12px]", { "gap-x-[4px]": P.value && g.reorderableItems }])
                }, [
                  P.value && (g.reorderableItems || g.droppable) && (!g.accept || ((ve = g == null ? void 0 : g.accept) == null ? void 0 : ve[0]) === a || P.value && ((ot = g.accept) != null && ot.includes((Le = (be = z.value) == null ? void 0 : be.thumbnail) == null ? void 0 : Le.type))) && !y.value.includes(g) && (!o.showEmptySectionDrop || o.showEmptySectionDrop && !((yn = m.showEmptySectionDropExcept) != null && yn.includes(g.name)) && m.items.filter(({ sectionId: ke }) => ke === g.name).length) ? (l(), r("div", {
                    key: 0,
                    class: k(["mx-[1px] m-t-[2px] v-drag-dash-2 blue-2 flex-basis-[2px] flex-grow-0 flex-shrink-0 h-[50px] absolute left-[4px] self-stretch", {
                      invisible: !P.value || me.value !== `__first-${g.name}`
                    }]),
                    ref_for: !0,
                    ref_key: "dragTargets",
                    ref: se,
                    "data-id": `__first-${g.name}`
                  }, null, 10, am)) : f("", !0),
                  T(K(bs), Ke(Xe({ item: g })), null, 16),
                  P.value && g.reorderableItems && z.value.section === g && (m.showDeleteOnAll || (Lt = m.showDelete) != null && Lt.includes(g.name)) ? (l(), S(kt, {
                    key: 1,
                    class: k(m.fullscreen && "m-y-0 w-[280px]"),
                    color: "red",
                    icon: "trash",
                    dashed: "",
                    centered: "",
                    noHover: !P.value,
                    "data-id": `__remove-from-${g.name}`,
                    label: ((Dt = je.value) == null ? void 0 : Dt[`removeFrom${K(dt)(g.name)}`]) || ((wt = je.value) == null ? void 0 : wt.removeFrom),
                    onDrop: ms,
                    onDragover: re(Ve, ["prevent", "stop"]),
                    onDragleave: re(He, ["prevent", "stop"])
                  }, null, 8, ["class", "noHover", "data-id", "label"])) : f("", !0)
                ], 2)) : (l(), S(K(bs), Ke(J({ key: 3 }, { item: g })), null, 16)),
                K(c)[`item-drop-zone-section-footer-${g.name}`] && P.value ? (l(), r("div", {
                  key: 4,
                  ref_for: !0,
                  ref_key: "dragTargets",
                  ref: se,
                  "data-id": `__item-section-footer-${g.name}`
                }, null, 8, rm)) : f("", !0),
                C(m.$slots, `item-drop-zone-section-footer-${g.name}`, Ke(Xe({
                  show: ((Ft = (At = (Zt = fe.value) == null ? void 0 : Zt.attributes) == null ? void 0 : At["data-id"]) == null ? void 0 : Ft.value) === `drag-footer-${g.name}`,
                  section: g,
                  dragging: P.value,
                  dragData: z.value
                })), () => {
                  var ke, Oe, Ne;
                  return [
                    P.value && !m.fullscreen && z.value.section === g && (m.showDeleteOnAll || (ke = m.showDelete) != null && ke.includes(g.name)) ? (l(), S(kt, {
                      key: 0,
                      color: "red",
                      icon: "trash",
                      dashed: "",
                      centered: "",
                      noHover: !P.value,
                      "data-id": `__remove-from-${g.name}`,
                      label: ((Oe = je.value) == null ? void 0 : Oe[`removeFrom${K(dt)(g.name)}`]) || ((Ne = je.value) == null ? void 0 : Ne.removeFrom),
                      onDrop: ms,
                      onDragover: re(Ve, ["prevent", "stop"]),
                      onDragleave: re(He, ["prevent", "stop"])
                    }, null, 8, ["noHover", "data-id", "label"])) : f("", !0)
                  ];
                }, !0),
                C(m.$slots, `section-footer-${g.name}`, {}, void 0, !0)
              ], 64);
            }), 128))
          ]),
          _: 3
        })), [
          [K(Kp), [Z, { throttle: 50 }]]
        ])
      ], 16)
    ], 64));
  }
}), cm = /* @__PURE__ */ F(dm, [["__scopeId", "data-v-a1bc2e49"]]), hm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cm
}, Symbol.toStringTag, { value: "Module" })), fm = {
  key: 0,
  class: "control-label"
}, pm = {
  key: 0,
  class: "label-field-required"
}, mm = { key: 1 }, vm = ["value", "placeholder", "disabled"], gm = { class: "vu-time-picker__display form-control" }, bm = { class: "vu-time-picker__body" }, ym = { class: "vu-time-picker__hours" }, _m = ["value"], wm = { class: "vu-time-picker__minutes" }, km = ["value"], Sm = {
  key: 3,
  class: "form-control vu-time-picker__display",
  disabled: ""
}, Im = {
  key: 4,
  class: "form-control-helper-text"
}, Cm = {
  name: "vu-time-picker",
  inheritAttrs: !1,
  mixins: [Fe, ze, $e, Ee],
  props: {
    useNativeInput: {
      type: Boolean,
      required: !1,
      default: !1
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      minutes: "00",
      hours: "00",
      isPopoverOpen: !1
    };
  },
  watch: {
    modelValue(e) {
      const [n, t] = this.splitTime(e);
      this.hours = n, this.minutes = t;
    },
    minutes(e) {
      this.$emit("update:modelValue", `${this.hours}:${e}`);
    },
    hours(e) {
      this.$emit("update:modelValue", `${e}:${this.minutes}`);
    }
  },
  beforeMount() {
    const [e, n] = this.splitTime(this.modelValue);
    this.hours = e, this.minutes = n;
  },
  methods: {
    splitTime(e) {
      return e.split(":");
    },
    formatNumberForTime(e) {
      return e < 10 ? `0${e}` : `${e}`;
    }
  },
  components: { VuPopover: Ge, VuPopover: Ge }
}, Bm = /* @__PURE__ */ Object.assign(Cm, {
  setup(e) {
    const n = xe("vuInputComposition", !1), t = xe(Yt, !1);
    return (i, o) => (l(), r("div", {
      class: k(["vu-time-picker form-group", i.classes])
    }, [
      i.label.length ? (l(), r("label", fm, [
        X(w(i.label) + " ", 1),
        i.required ? (l(), r("span", pm, " *")) : f("", !0)
      ])) : f("", !0),
      e.useNativeInput || K(t) ? (l(), r("div", mm, [
        b("input", J(i.$attrs, {
          value: i.value,
          placeholder: i.placeholder,
          disabled: i.disabled,
          type: "time",
          class: "vu-time-picker__display-native form-control",
          style: { width: "fit-content" },
          onInput: o[0] || (o[0] = ({ target: s }) => {
            K(n) || (s.composing = !1), i.$emit("update:modelValue", s.value);
          })
        }), null, 16, vm)
      ])) : i.disabled ? (l(), r("div", Sm, [
        b("span", null, w(i.hours), 1),
        X(":"),
        b("span", null, w(i.minutes), 1)
      ])) : (l(), S(Ge, {
        key: 2,
        class: "vu-time-picker__popover",
        style: { width: "fit-content" },
        show: i.isPopoverOpen
      }, {
        body: V(() => [
          b("div", bm, [
            b("div", ym, [
              (l(!0), r(M, null, U([...Array(24).keys()], (s) => (l(), r("label", {
                key: s,
                class: k({ "vu-time-picker__hours--selected": i.hours === i.formatNumberForTime(s) })
              }, [
                b("span", null, w(i.formatNumberForTime(s)), 1),
                H(b("input", {
                  "onUpdate:modelValue": o[1] || (o[1] = (a) => i.hours = a),
                  type: "radio",
                  name: "hours",
                  value: i.formatNumberForTime(s)
                }, null, 8, _m), [
                  [Is, i.hours]
                ])
              ], 2))), 128))
            ]),
            b("div", wm, [
              (l(!0), r(M, null, U([...Array(60).keys()], (s) => (l(), r("label", {
                key: s,
                class: k({ "vu-time-picker__minutes--selected": i.minutes === i.formatNumberForTime(s) })
              }, [
                b("span", null, w(i.formatNumberForTime(s)), 1),
                H(b("input", {
                  "onUpdate:modelValue": o[2] || (o[2] = (a) => i.minutes = a),
                  type: "radio",
                  name: "minutes",
                  value: i.formatNumberForTime(s)
                }, null, 8, km), [
                  [Is, i.minutes]
                ])
              ], 2))), 128))
            ])
          ])
        ]),
        default: V(() => [
          b("div", gm, [
            b("span", null, w(i.hours), 1),
            X(":"),
            b("span", null, w(i.minutes), 1)
          ])
        ]),
        _: 1
      }, 8, ["show"])),
      (l(!0), r(M, null, U(i.errorBucket, (s, a) => (l(), r("span", {
        key: `${a}-error-${s}`,
        style: { display: "block" },
        class: "form-control-error-text"
      }, w(s), 1))), 128)),
      i.helper.length ? (l(), r("span", Im, w(i.helper), 1)) : f("", !0)
    ], 2));
  }
}), $m = /* @__PURE__ */ F(Bm, [["__scopeId", "data-v-cf359eaf"]]), Om = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $m
}, Symbol.toStringTag, { value: "Module" }));
function Tm(e, n) {
  let t;
  for (let i = 0; i < n; i++)
    t = (e == null ? void 0 : e.parentElement) || t;
  return t ?? document.documentElement;
}
function xm(e) {
  const {
    enabled: n = !0,
    el: t,
    placeholder: i,
    class: o = "",
    ancestor: s = 0
  } = e || {}, a = x(!1), u = x(), c = x();
  let d = x([]), h = x(/* @__PURE__ */ new WeakMap());
  const p = x(0), _ = Y(() => d.value.map((D) => h.value.get(D)).reduce((D, P) => D || P, !1)), v = Y(
    () => a.value === !1 && _.value
  );
  le(v, (Z, D) => {
    s && y();
  }, { flush: "sync" }), le(v, (Z, D) => {
    L(!!s);
  }, { flush: "post" });
  const y = () => {
    if (u.value) {
      const Z = wn(i);
      Z && u.value.unobserve(Z);
    }
  }, L = async (Z) => {
    if (u.value) {
      Z && await Gt();
      const D = wn(i);
      D && u.value.observe(D);
    }
  }, B = (Z) => {
    let D = Z[0].intersectionRatio;
    s ? v.value ? (a.value = D > p.value, p.value = D) : a.value = D === 1 : a.value = v.value ? D > 0 : D === 1;
  }, R = () => {
    if (n) {
      const Z = wn(t);
      if (d.value = [], !Z)
        return;
      c.value = new IntersectionObserver(
        (P) => {
          P.forEach(({ intersectionRatio: Q, target: z }) => {
            h.value.set(z, Q > 0);
          });
        }
      );
      let { nextElementSibling: D } = s ? Tm(Z, s) : Z;
      if (s === 0)
        for (; D && (D == null ? void 0 : D.className.indexOf(o)) === -1; )
          d.value.push(D), c.value.observe(D), D = D == null ? void 0 : D.nextElementSibling;
      else if (D)
        for (; D && D.querySelectorAll(`.${o}`).length === 0; )
          d.value.push(D), c.value.observe(D), D = D == null ? void 0 : D.nextElementSibling;
      u.value = new IntersectionObserver(
        B,
        {
          threshold: 1
        }
      ), L(v.value);
    }
  }, ee = async () => {
    ce(), R();
  }, ce = () => {
    c.value && c.value.disconnect(), u.value && u.value.disconnect(), delete c.value, delete u.value;
  };
  return Ot(() => {
    R();
  }), So(() => {
    ce();
  }), { stick: v, refresh: ee };
}
const Ri = (e) => (et("data-v-885f595d"), e = e(), tt(), e), Mm = /* @__PURE__ */ Ri(() => /* @__PURE__ */ b("hr", null, null, -1)), Vm = { class: "vu-timeline-divider-date__date" }, Pm = /* @__PURE__ */ Ri(() => /* @__PURE__ */ b("hr", null, null, -1)), Lm = {
  name: "vu-timeline-divider"
}, Dm = /* @__PURE__ */ Ae({
  ...Lm,
  props: {
    date: {},
    label: {},
    sticky: { type: Boolean },
    forceStick: { type: Boolean }
  },
  setup(e) {
    const n = xe("lang"), t = xe(di, 0), i = xe(ci, void 0), o = x(null), s = x(null), a = e, { stick: u, refresh: c } = xm({ enabled: a.sticky, el: o, placeholder: s, class: "vu-timeline-divider-date", ancestor: t }), d = (h) => {
      const p = new Date(h), _ = p.getFullYear(), v = (/* @__PURE__ */ new Date()).getFullYear(), y = _ === v ? { weekday: "long", month: "long", day: "numeric" } : {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      };
      return p.toLocaleDateString(n, y);
    };
    return (h, p) => (l(), r(M, null, [
      b("div", {
        class: k(["vu-timeline-divider__placeholder", { "vu-timeline-divider__detached": K(u) && K(t), "vu-timeline-divider--hidden": K(u) && K(t) }]),
        ref_key: "placeholder",
        ref: s
      }, null, 2),
      (l(), S(Nn, {
        to: K(i),
        disabled: !K(i) || !K(u)
      }, [
        b("div", {
          class: k(["vu-timeline-divider-date", [
            { "vu-timeline-divider-date--top": K(u) || a.forceStick },
            K(t) && (K(u) || a.forceStick) && K(i) && "absolute" || (K(u) || a.forceStick) && "sticky"
          ]]),
          ref_key: "el",
          ref: o
        }, [
          Mm,
          b("div", Vm, w(h.label || d(h.date)), 1),
          Pm
        ], 2)
      ], 8, ["to", "disabled"]))
    ], 64));
  }
}), Am = /* @__PURE__ */ F(Dm, [["__scopeId", "data-v-885f595d"]]), Fm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Am
}, Symbol.toStringTag, { value: "Module" })), zm = (e) => {
  try {
    const { label: n, id: t } = e;
    if (n && t)
      return !0;
  } catch {
  }
  return !1;
}, Em = {
  name: "vu-tree-view-item",
  mixins: [vt],
  emits: ["load-complete", "click", "expand", "select"],
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    expanded: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Array,
      default: () => []
    },
    depth: {
      type: Number,
      default: () => 0
    },
    hover: {
      type: Boolean,
      default: !1
    },
    siblingsHaveNoType: {
      type: Boolean,
      default: !1
    },
    item: {
      type: Object,
      validator: zm,
      required: !0
    },
    main: {
      type: Boolean,
      default: !1
    },
    leftPadding: {
      type: Number,
      default: 0
    }
  },
  inject: {
    vuTreeViewLazy: {
      default: !1
    },
    vuTreeViewLeftPadBase: {
      default: 38
    },
    vuTreeViewLeftPadFunc: {
      type: Function,
      default: void 0
    },
    vuTreeViewLeftPadReduce: {
      type: Boolean,
      default: !1
    },
    vuTreeIcon: {
      type: String,
      default: "expand"
    }
  },
  data: () => ({
    guid: Re
  }),
  watch: {
    item: {
      deep: !0,
      handler(e) {
        this.isLoading && this.$emit("load-complete", e);
      }
    }
  },
  created() {
    this.item.expanded && !this.isExpanded && this.$emit("expand", this.item), this.item.selected && !this.isSelected && this.$emit("select", this.item);
  },
  computed: {
    otherSlots() {
      return Object.fromEntries(this.$slots.filter((e) => e.startsWith("item-")));
    },
    showTreeIcon() {
      return (
        // eslint-disable-next-line operator-linebreak
        this.hasItems || this.vuTreeViewLazy && !this.item.leaf && this.item.items === void 0 && !this.isLoading
      );
    },
    hasItems() {
      return this.item.items && this.item.items.length > 0;
    },
    isSelected() {
      return this.selected.includes(this.item);
    },
    isExpanded() {
      return this.expanded.includes(this.item);
    },
    isLoading() {
      return this.vuTreeViewLazy && this.loading.includes(this.item);
    },
    anyChildrenHasIcon() {
      return this.hasItems && this.item.items.some((e) => e.icon !== void 0);
    },
    getTreeIconClass() {
      return this.isExpanded ? `${this.vuTreeIcon}-down` : `${this.vuTreeIcon}-right`;
    },
    calcLeftPadding() {
      return this.vuTreeViewLeftPadFunc ? this.vuTreeViewLeftPadFunc(this.depth, this.leftPadding) : this.depth ? this.vuTreeViewLeftPadReduce ? Math.max(this.leftPadding + this.vuTreeViewLeftPadBase - 6 * this.depth, this.leftPadding + 6) : this.leftPadding + this.vuTreeViewLeftPadBase : 0;
    }
  },
  methods: {
    onClick(e) {
      var t, i;
      [(t = this.$refs.loadingSpinner) == null ? void 0 : t.$el, (i = this.$refs.treeIcon) == null ? void 0 : i.$el].filter((o) => o).every((o) => !o.contains(e.target)) && this.$emit("select", this.item);
    }
  },
  components: { VuIconBtn: de }
}, Nm = (e) => (et("data-v-a2b9f9ba"), e = e(), tt(), e), Rm = {
  key: 1,
  class: "vu-tree-view-item__tree-icon-loading",
  ref: "loadingSpinner"
}, Hm = /* @__PURE__ */ Nm(() => /* @__PURE__ */ b("svg", {
  class: "vu-spin",
  viewBox: "25 25 50 50"
}, [
  /* @__PURE__ */ b("circle", {
    class: "path",
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "5",
    "stroke-miterlimit": "10"
  })
], -1)), jm = {
  key: 2,
  class: "vu-tree-view-item__tree-icon-placeholder"
}, Um = {
  key: 4,
  class: "vu-tree-view-item__type-icon-placeholder"
}, Wm = { class: "vu-tree-view-item__label" };
function qm(e, n, t, i, o, s) {
  const a = $("VuIconBtn"), u = $("VuTreeViewItem", !0), c = _e("tooltip");
  return l(), r(M, null, [
    b("div", {
      class: k(["vu-tree-view-item", {
        "vu-tree-view-item--selected": s.isSelected,
        "vu-tree-view-item--unselected": !s.isSelected,
        "vu-tree-view-item--main": t.main,
        "vu-tree-view-item--child": !t.main,
        "vu-tree-view-item--chevron-icon": s.vuTreeIcon === "chevron"
      }]),
      style: G({
        "padding-left": `${s.calcLeftPadding}px`
      }),
      onClick: n[1] || (n[1] = (...d) => s.onClick && s.onClick(...d))
    }, [
      s.showTreeIcon ? (l(), S(a, {
        key: 0,
        icon: s.getTreeIconClass,
        class: "vu-tree-view-item__tree-icon",
        onClick: n[0] || (n[0] = (d) => e.$emit("expand", t.item)),
        ref: "treeIcon"
      }, null, 8, ["icon"])) : s.isLoading ? (l(), r("div", Rm, [
        C(e.$slots, "itemLoading", {}, () => [
          Hm
        ], !0)
      ], 512)) : (l(), r("div", jm)),
      t.item.icon ? (l(), S(a, {
        key: 3,
        class: "vu-tree-view-item__type-icon",
        color: "default-inactive",
        icon: t.item.icon
      }, null, 8, ["icon"])) : t.siblingsHaveNoType ? (l(), r("div", Um)) : f("", !0),
      C(e.$slots, "item-" + t.item.type || "default", {}, () => [
        H((l(), r("div", Wm, [
          X(w(t.item.label), 1)
        ])), [
          [
            c,
            t.item.label,
            void 0,
            { ellipsis: !0 }
          ]
        ])
      ], !0)
    ], 6),
    s.hasItems && s.isExpanded ? (l(!0), r(M, { key: 0 }, U(t.item.items, (d) => (l(), S(u, {
      key: `${d.id}`,
      item: d,
      depth: t.depth + 1,
      "left-padding": s.calcLeftPadding,
      selected: t.selected,
      loading: t.loading,
      expanded: t.expanded,
      "siblings-have-no-type": s.anyChildrenHasIcon,
      onLoadComplete: n[2] || (n[2] = (h) => e.$emit("load-complete", h)),
      onExpand: n[3] || (n[3] = (h) => e.$emit("expand", h)),
      onSelect: n[4] || (n[4] = (h) => e.$emit("select", h))
    }, null, 8, ["item", "depth", "left-padding", "selected", "loading", "expanded", "siblings-have-no-type"]))), 128)) : f("", !0)
  ], 64);
}
const An = /* @__PURE__ */ F(Em, [["render", qm], ["__scopeId", "data-v-a2b9f9ba"]]), Km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: An
}, Symbol.toStringTag, { value: "Module" })), Gm = {
  name: "vu-tree-view",
  emits: ["update:selected", "update:expanded", "fetch", "item-click", "update:loading"],
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    expanded: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Array,
      required: !1,
      default: void 0
    },
    items: {
      type: Array,
      required: !0
    },
    exclusive: {
      type: Boolean,
      default: !0
    },
    firstLevelBigger: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    innerLoading: []
  }),
  methods: {
    toggleSelect(e) {
      if (this.selected.includes(e)) {
        const n = this.expanded.slice();
        n.splice(n.indexOf(e), 1), this.$emit("update:selected", n);
      } else
        this.exclusive ? this.$emit("update:selected", [e]) : this.$emit("update:selected", [e].concat(this.expanded || []));
    },
    toggleExpand(e) {
      const n = this.expanded.slice();
      this.expanded.includes(e) ? (n.splice(n.indexOf(e), 1), this.$emit("update:expanded", n)) : e.items === void 0 ? (this.$emit("fetch", e), this.loading === void 0 ? this.innerLoading.push(e) : this.$emit("update:loading", [e].concat(this.loading || []))) : (n.push(e), this.$emit("update:expanded", n));
    },
    onLoad(e) {
      this.loading === void 0 && this.innerLoading.splice(this.innerLoading.indexOf(e)), e.items && e.items.length > 0 && !e.leaf && this.$emit("update:expanded", [e].concat(this.expanded || []));
    }
  },
  components: { VuTreeViewItem: An, VuScroller: Qe, VuTreeViewItem: An }
}, Ym = { class: "vu-tree-view" };
function Xm(e, n, t, i, o, s) {
  const a = $("VuTreeViewItem"), u = $("VuScroller");
  return l(), r("div", Ym, [
    T(u, null, {
      default: V(() => [
        (l(!0), r(M, null, U(t.items, (c) => (l(), S(a, {
          key: `${c.id}`,
          item: c,
          loading: t.loading || e.innerLoading,
          expanded: t.expanded,
          selected: t.selected,
          main: t.firstLevelBigger,
          onExpand: s.toggleExpand,
          onSelect: s.toggleSelect,
          onLoadComplete: s.onLoad
        }, null, 8, ["item", "loading", "expanded", "selected", "main", "onExpand", "onSelect", "onLoadComplete"]))), 128))
      ]),
      _: 1
    })
  ]);
}
const Jm = /* @__PURE__ */ F(Gm, [["render", Xm]]), Zm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jm
}, Symbol.toStringTag, { value: "Module" })), Ut = "__v-click-outside", Hi = typeof window < "u", Qm = typeof navigator < "u", ev = Hi && ("ontouchstart" in window || Qm && navigator.msMaxTouchPoints > 0), tv = ev ? ["touchstart"] : ["click", "contextmenu"];
function nv(e) {
  const n = typeof e == "function";
  if (!n && typeof e != "object")
    throw new Error("v-click-outside: Binding value must be a function or an object");
  return {
    handler: n ? e : e.handler,
    middleware: e.middleware || ((t) => t),
    events: e.events || tv,
    innerShow: e.innerShow !== !1
  };
}
function sv({
  el: e,
  event: n,
  handler: t,
  middleware: i
}) {
  const o = n.path || n.composedPath && n.composedPath(), s = o ? !o.includes(e) : !e.contains(n.target);
  n.target !== e && s && i(n) && t(n);
}
function ji(e, { value: n }) {
  const {
    events: t,
    handler: i,
    middleware: o,
    innerShow: s
  } = nv(n);
  s && (e[Ut] = t.map((a) => ({
    event: a,
    handler: (u) => sv({
      event: u,
      el: e,
      handler: i,
      middleware: o
    })
  })), e[Ut].forEach(({ event: a, handler: u }) => setTimeout(() => {
    e[Ut] && document.documentElement.addEventListener(a, u, !1);
  }, 0)));
}
function Ui(e) {
  (e[Ut] || []).forEach(({ event: t, handler: i }) => document.documentElement.removeEventListener(t, i, !1)), delete e[Ut];
}
function iv(e, { value: n, oldValue: t }) {
  JSON.stringify(n) !== JSON.stringify(t) && (Ui(e), ji(e, { value: n }));
}
const ov = {
  beforeMount: ji,
  updated: iv,
  beforeUnmount: Ui
}, Fn = Hi ? ov : {}, lv = {
  viewAll: "View all",
  contactsInCommon: "### contact$(s) in common",
  profile: "See full profile",
  message: "Start conversation",
  network: "Add user to my network",
  audio: "Add audio",
  conferencing: "Add video",
  screenshare: "Share screen",
  FR: "France",
  BR: "Brazil",
  CN: "China",
  DE: "Germany",
  ES: "Spain",
  GB: "United-Kingdom",
  HU: "Hungary",
  IT: "Italy",
  JP: "Japan",
  PL: "Poland",
  PT: "Portugal",
  RU: "Russia",
  SE: "Sweden",
  TR: "Turkey"
}, av = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#73AF00;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<path style="fill:#FFE15A;" d="M251.41,135.209L65.354,248.46c-5.651,3.439-5.651,11.641,0,15.081L251.41,376.793  c2.819,1.716,6.36,1.716,9.18,0l186.057-113.251c5.651-3.439,5.651-11.641,0-15.081L260.59,135.209  C257.771,133.493,254.229,133.493,251.41,135.209z"/>
<circle style="fill:#41479B;" cx="256" cy="256.001" r="70.62"/>
<g>
	<path style="fill:#F5F5F5;" d="M195.401,219.874c-3.332,5.578-5.905,11.64-7.605,18.077c39.149-2.946,97.062,8.006,133.922,43.773   c2.406-6.141,3.994-12.683,4.59-19.522C288.247,230.169,235.628,218.778,195.401,219.874z"/>
	<path style="fill:#F5F5F5;" d="M258.925,280.1l1.88,5.638l5.943,0.046c0.769,0.006,1.088,0.988,0.47,1.445l-4.781,3.531   l1.793,5.666c0.232,0.734-0.604,1.341-1.229,0.893l-4.835-3.456l-4.835,3.456c-0.626,0.448-1.461-0.159-1.229-0.893l1.793-5.666   l-4.781-3.531c-0.619-0.457-0.3-1.439,0.469-1.445l5.943-0.046l1.88-5.638C257.649,279.37,258.681,279.37,258.925,280.1z"/>
	<path style="fill:#F5F5F5;" d="M282.024,294.685l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C281.474,294.37,281.919,294.37,282.024,294.685z"/>
	<path style="fill:#F5F5F5;" d="M248.938,269.39l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C248.388,269.076,248.833,269.076,248.938,269.39z"/>
	<path style="fill:#F5F5F5;" d="M204.13,266.448l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C203.581,266.134,204.025,266.134,204.13,266.448z"/>
	<path style="fill:#F5F5F5;" d="M241.614,293.847l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C241.065,293.534,241.51,293.534,241.614,293.847z"/>
	<path style="fill:#F5F5F5;" d="M220.99,264.755l0.662,1.984l2.092,0.017c0.27,0.002,0.383,0.348,0.166,0.509l-1.683,1.242   l0.631,1.994c0.082,0.258-0.212,0.472-0.433,0.314l-1.702-1.216l-1.702,1.216c-0.221,0.158-0.514-0.056-0.433-0.314l0.631-1.994   l-1.683-1.242c-0.217-0.161-0.106-0.507,0.166-0.509l2.092-0.017l0.662-1.984C220.541,264.498,220.904,264.498,220.99,264.755z"/>
	<path style="fill:#F5F5F5;" d="M283.819,223.794l0.828,2.482l2.616,0.02c0.339,0.002,0.479,0.435,0.206,0.636l-2.104,1.554   l0.789,2.495c0.103,0.323-0.266,0.59-0.541,0.393l-2.129-1.522l-2.129,1.522c-0.276,0.198-0.643-0.071-0.541-0.393l0.789-2.495   l-2.104-1.554c-0.273-0.201-0.132-0.633,0.206-0.636l2.616-0.02l0.828-2.482C283.257,223.472,283.712,223.472,283.819,223.794z"/>
	<path style="fill:#F5F5F5;" d="M207.012,252.617l0.662,1.984l2.092,0.017c0.27,0.002,0.383,0.348,0.166,0.509l-1.683,1.242   l0.631,1.994c0.082,0.258-0.212,0.472-0.433,0.314l-1.702-1.216l-1.702,1.216c-0.221,0.158-0.514-0.056-0.433-0.314l0.631-1.994   l-1.683-1.242c-0.217-0.161-0.106-0.506,0.166-0.509l2.092-0.017l0.662-1.984C206.563,252.36,206.926,252.36,207.012,252.617z"/>
	<path style="fill:#F5F5F5;" d="M217.112,280.581l1.002,3.006l3.168,0.024c0.41,0.003,0.58,0.526,0.25,0.77l-2.549,1.882l0.956,3.02   c0.124,0.391-0.321,0.715-0.655,0.476l-2.578-1.842l-2.578,1.842c-0.333,0.238-0.779-0.085-0.655-0.476l0.956-3.02l-2.549-1.882   c-0.33-0.244-0.16-0.767,0.25-0.77l3.168-0.024l1.002-3.006C216.433,280.193,216.983,280.193,217.112,280.581z"/>
	<path style="fill:#F5F5F5;" d="M294.903,295.315l0.63,1.891l1.993,0.015c0.258,0.002,0.365,0.331,0.158,0.484l-1.603,1.184   l0.601,1.9c0.078,0.246-0.202,0.449-0.413,0.299l-1.621-1.159l-1.622,1.159c-0.21,0.15-0.49-0.053-0.413-0.299l0.601-1.9   l-1.603-1.184c-0.207-0.153-0.1-0.482,0.158-0.484l1.993-0.015l0.63-1.891C294.475,295.07,294.822,295.07,294.903,295.315z"/>
	<path style="fill:#F5F5F5;" d="M301.877,280.885l0.809,2.426l2.558,0.02c0.331,0.002,0.469,0.425,0.202,0.622l-2.058,1.519   l0.771,2.439c0.1,0.316-0.259,0.577-0.529,0.384l-2.081-1.487l-2.081,1.487c-0.269,0.193-0.629-0.068-0.529-0.384l0.771-2.439   l-2.058-1.519c-0.266-0.196-0.129-0.619,0.202-0.622l2.558-0.02l0.809-2.426C301.327,280.57,301.772,280.57,301.877,280.885z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, rv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<g>
	<path style="fill:#FFE15A;" d="M85.007,140.733l8.416,25.234l26.6,0.206c3.444,0.026,4.872,4.422,2.101,6.467l-21.398,15.801   l8.023,25.362c1.038,3.284-2.7,5.999-5.502,3.997l-21.64-15.469l-21.64,15.468c-2.802,2.003-6.54-0.714-5.502-3.997l8.023-25.362   l-21.398-15.8c-2.771-2.046-1.343-6.441,2.101-6.467l26.6-0.206l8.416-25.234C79.297,137.465,83.918,137.465,85.007,140.733z"/>
	<path style="fill:#FFE15A;" d="M181.599,146.951l6.035,8.23l9.739-3.046c1.261-0.394,2.298,1.044,1.526,2.115l-5.962,8.281   l5.906,8.321c0.765,1.077-0.282,2.508-1.54,2.105l-9.719-3.111l-6.089,8.189c-0.788,1.06-2.473,0.506-2.478-0.814l-0.045-10.205   l-9.67-3.261c-1.251-0.423-1.246-2.195,0.009-2.609l9.69-3.196l0.114-10.204C179.129,146.427,180.818,145.886,181.599,146.951z"/>
	<path style="fill:#FFE15A;" d="M144.857,122.421l10.145,1.102l4.328-9.241c0.561-1.196,2.321-0.991,2.591,0.302l2.086,9.988   l10.126,1.26c1.311,0.163,1.66,1.901,0.513,2.558l-8.855,5.07l1.931,10.02c0.25,1.298-1.295,2.166-2.274,1.279l-7.559-6.855   l-8.932,4.932c-1.156,0.639-2.461-0.563-1.919-1.768l4.183-9.308l-7.452-6.972C142.805,123.89,143.544,122.279,144.857,122.421z"/>
	<path style="fill:#FFE15A;" d="M160.895,221.314l-6.035,8.23l-9.739-3.046c-1.261-0.394-2.298,1.044-1.526,2.115l5.962,8.281   l-5.906,8.321c-0.765,1.077,0.282,2.508,1.54,2.105l9.719-3.111l6.089,8.189c0.788,1.06,2.473,0.506,2.478-0.814l0.045-10.205   l9.67-3.261c1.252-0.423,1.246-2.195-0.009-2.609l-9.69-3.196l-0.114-10.204C163.363,220.791,161.676,220.248,160.895,221.314z"/>
	<path style="fill:#FFE15A;" d="M197.635,198.263l-10.145,1.102l-4.328-9.241c-0.561-1.196-2.321-0.991-2.591,0.302l-2.087,9.988   l-10.126,1.26c-1.311,0.163-1.66,1.901-0.513,2.558l8.855,5.07l-1.931,10.02c-0.25,1.298,1.295,2.166,2.274,1.279l7.559-6.855   l8.932,4.932c1.156,0.639,2.461-0.563,1.919-1.768l-4.183-9.308l7.452-6.972C199.689,199.732,198.95,198.121,197.635,198.263z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, uv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#464655;" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828  L512,200.093L512,200.093z"/>
<path style="fill:#FFE15A;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988  C512,419.773,508.047,423.725,503.172,423.725z"/>
<rect y="200.091" style="fill:#FF4B55;" width="512" height="111.81"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, dv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#C8414B;" d="M8.828,423.725h494.345c4.875,0,8.828-3.953,8.828-8.828V97.104c0-4.875-3.953-8.828-8.828-8.828  H8.828C3.953,88.277,0,92.229,0,97.104v317.793C0,419.773,3.953,423.725,8.828,423.725z"/>
<rect y="158.901" style="fill:#FFD250;" width="512" height="194.21"/>
<path style="fill:#C8414B;" d="M216.276,256.001l7.485-33.681c0.69-3.102-1.671-6.044-4.849-6.044h-5.272  c-3.177,0-5.537,2.942-4.849,6.044L216.276,256.001z"/>
<rect x="207.45" y="238.341" style="fill:#F5F5F5;" width="17.655" height="75.03"/>
<rect x="203.03" y="229.521" style="fill:#FAB446;" width="26.483" height="8.828"/>
<g>
	<rect x="185.38" y="256.001" style="fill:#C8414B;" width="44.14" height="8.828"/>
	<polygon style="fill:#C8414B;" points="229.517,291.311 203.034,282.484 203.034,273.656 229.517,282.484  "/>
	<path style="fill:#C8414B;" d="M83.862,256.001l7.485-33.681c0.69-3.102-1.671-6.044-4.849-6.044h-5.272   c-3.177,0-5.537,2.942-4.849,6.044L83.862,256.001z"/>
</g>
<path style="fill:#F5F5F5;" d="M114.759,229.518c-4.875,0-8.828,3.953-8.828,8.828v57.379c0,10.725,10.01,30.897,44.138,30.897  s44.138-20.171,44.138-30.897v-57.379c0-4.875-3.953-8.828-8.828-8.828H114.759z"/>
<g>
	<path style="fill:#C8414B;" d="M150.069,273.656h-44.138v-35.31c0-4.875,3.953-8.828,8.828-8.828h35.31V273.656z"/>
	<path style="fill:#C8414B;" d="M150.069,273.656h44.138v22.069c0,12.189-9.88,22.069-22.069,22.069l0,0   c-12.189,0-22.069-9.88-22.069-22.069V273.656z"/>
</g>
<path style="fill:#FAB446;" d="M105.931,273.656h44.138v22.069c0,12.189-9.88,22.069-22.069,22.069l0,0  c-12.189,0-22.069-9.88-22.069-22.069V273.656z"/>
<g>
	<path style="fill:#C8414B;" d="M141.241,313.281v-39.625h-8.828v43.693C135.697,316.683,138.664,315.229,141.241,313.281z"/>
	<path style="fill:#C8414B;" d="M123.586,317.349v-43.693h-8.828v39.625C117.336,315.229,120.303,316.683,123.586,317.349z"/>
</g>
<rect x="114.76" y="256.001" style="fill:#FFB441;" width="26.483" height="8.828"/>
<g>
	<rect x="114.76" y="238.341" style="fill:#FAB446;" width="26.483" height="8.828"/>
	<rect x="119.17" y="243.591" style="fill:#FAB446;" width="17.655" height="15.992"/>
</g>
<rect x="75.03" y="238.341" style="fill:#F5F5F5;" width="17.655" height="75.03"/>
<g>
	<rect x="70.62" y="308.971" style="fill:#FAB446;" width="26.483" height="8.828"/>
	<rect x="70.62" y="229.521" style="fill:#FAB446;" width="26.483" height="8.828"/>
</g>
<rect x="66.21" y="317.791" style="fill:#5064AA;" width="35.31" height="8.828"/>
<rect x="207.45" y="308.971" style="fill:#FAB446;" width="26.483" height="8.828"/>
<rect x="198.62" y="317.791" style="fill:#5064AA;" width="35.31" height="8.828"/>
<rect x="123.59" y="220.691" style="fill:#FAB446;" width="52.966" height="8.828"/>
<rect x="145.66" y="194.211" style="fill:#FFB441;" width="8.828" height="26.483"/>
<g>
	<path style="fill:#F5F5F5;" d="M141.241,207.449c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241C154.483,201.509,148.543,207.449,141.241,207.449z M141.241,189.794   c-2.435,0-4.414,1.978-4.414,4.414c0,2.435,1.978,4.414,4.414,4.414s4.414-1.978,4.414-4.414   C145.655,191.773,143.677,189.794,141.241,189.794z"/>
	<path style="fill:#F5F5F5;" d="M158.897,207.449c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241S166.198,207.449,158.897,207.449z M158.897,189.794c-2.435,0-4.414,1.978-4.414,4.414   c0,2.435,1.978,4.414,4.414,4.414c2.435,0,4.414-1.978,4.414-4.414C163.31,191.773,161.332,189.794,158.897,189.794z"/>
	<path style="fill:#F5F5F5;" d="M176.552,216.277c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241S183.853,216.277,176.552,216.277z M176.552,198.622c-2.435,0-4.414,1.978-4.414,4.414   c0,2.435,1.978,4.414,4.414,4.414c2.435,0,4.414-1.978,4.414-4.414S178.987,198.622,176.552,198.622z"/>
	<path style="fill:#F5F5F5;" d="M123.586,216.277c-7.302,0-13.241-5.94-13.241-13.241c0-7.302,5.94-13.241,13.241-13.241   c7.302,0,13.241,5.94,13.241,13.241C136.828,210.337,130.888,216.277,123.586,216.277z M123.586,198.622   c-2.435,0-4.414,1.978-4.414,4.414c0,2.435,1.978,4.414,4.414,4.414s4.414-1.979,4.414-4.415   C128,200.6,126.022,198.622,123.586,198.622z"/>
</g>
<path style="fill:#FAB446;" d="M176.552,291.311v4.414c0,2.434-1.98,4.414-4.414,4.414s-4.414-1.98-4.414-4.414v-4.414H176.552   M185.379,282.484h-26.483v13.241c0,7.302,5.94,13.241,13.241,13.241c7.302,0,13.241-5.94,13.241-13.241v-13.241H185.379z"/>
<path style="fill:#FFA0D2;" d="M172.138,264.829L172.138,264.829c-4.875,0-8.828-3.953-8.828-8.828v-8.828  c0-4.875,3.953-8.828,8.828-8.828l0,0c4.875,0,8.828,3.953,8.828,8.828v8.828C180.966,260.876,177.013,264.829,172.138,264.829z"/>
<circle style="fill:#5064AA;" cx="150.07" cy="273.651" r="13.241"/>
<rect x="145.66" y="176.551" style="fill:#FAB446;" width="8.828" height="26.483"/>
<path style="fill:#C8414B;" d="M123.586,220.691l-8.828-8.828l5.171-5.171c7.993-7.993,18.835-12.484,30.14-12.484l0,0  c11.305,0,22.146,4.491,30.14,12.484l5.171,5.171l-8.828,8.828H123.586z"/>
<g>
	<circle style="fill:#FFD250;" cx="150.07" cy="211.861" r="4.414"/>
	<circle style="fill:#FFD250;" cx="132.41" cy="211.861" r="4.414"/>
	<circle style="fill:#FFD250;" cx="167.72" cy="211.861" r="4.414"/>
</g>
<g>
	<rect x="70.62" y="256.001" style="fill:#C8414B;" width="44.14" height="8.828"/>
	<polygon style="fill:#C8414B;" points="70.621,291.311 97.103,282.484 97.103,273.656 70.621,282.484  "/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, cv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#41479B;" d="M170.667,423.721H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.1c0-4.875,3.953-8.828,8.828-8.828  h161.839V423.721z"/>
<rect x="170.67" y="88.277" style="fill:#F5F5F5;" width="170.67" height="335.45"/>
<path style="fill:#FF4B55;" d="M503.172,423.721H341.333V88.273h161.839c4.875,0,8.828,3.953,8.828,8.828v317.793  C512,419.77,508.047,423.721,503.172,423.721z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, hv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002;" xml:space="preserve">
<path style="fill:#41479B;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.772,508.047,423.725,503.172,423.725z"/>
<path style="fill:#F5F5F5;" d="M512,97.104c0-4.875-3.953-8.828-8.828-8.828h-39.495l-163.54,107.147V88.276h-88.276v107.147  L48.322,88.276H8.828C3.953,88.276,0,92.229,0,97.104v22.831l140.309,91.927H0v88.276h140.309L0,392.066v22.831  c0,4.875,3.953,8.828,8.828,8.828h39.495l163.54-107.147v107.147h88.276V316.578l163.54,107.147h39.495  c4.875,0,8.828-3.953,8.828-8.828v-22.831l-140.309-91.927H512v-88.276H371.691L512,119.935V97.104z"/>
<g>
	<polygon style="fill:#FF4B55;" points="512,229.518 282.483,229.518 282.483,88.276 229.517,88.276 229.517,229.518 0,229.518    0,282.483 229.517,282.483 229.517,423.725 282.483,423.725 282.483,282.483 512,282.483  "/>
	<path style="fill:#FF4B55;" d="M178.948,300.138L0.25,416.135c0.625,4.263,4.14,7.59,8.577,7.59h12.159l190.39-123.586h-32.428   V300.138z"/>
	<path style="fill:#FF4B55;" d="M346.388,300.138H313.96l190.113,123.404c4.431-0.472,7.928-4.09,7.928-8.646v-7.258   L346.388,300.138z"/>
	<path style="fill:#FF4B55;" d="M0,106.849l161.779,105.014h32.428L5.143,89.137C2.123,90.54,0,93.555,0,97.104V106.849z"/>
	<path style="fill:#FF4B55;" d="M332.566,211.863L511.693,95.586c-0.744-4.122-4.184-7.309-8.521-7.309h-12.647L300.138,211.863   H332.566z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, fv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828  L512,200.093L512,200.093z"/>
<path style="fill:#73AF00;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988  C512,419.773,508.047,423.725,503.172,423.725z"/>
<rect y="200.091" style="fill:#F5F5F5;" width="512" height="111.81"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, pv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#73AF00;" d="M170.667,423.721H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.1c0-4.875,3.953-8.828,8.828-8.828  h161.839V423.721z"/>
<rect x="170.67" y="88.277" style="fill:#F5F5F5;" width="170.67" height="335.45"/>
<path style="fill:#FF4B55;" d="M503.172,423.721H341.333V88.273h161.839c4.875,0,8.828,3.953,8.828,8.828v317.793  C512,419.77,508.047,423.721,503.172,423.721z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, mv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#F5F5F5;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<circle style="fill:#FF4B55;" cx="256" cy="256.001" r="97.1"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, vv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M0,256h512v158.897c0,4.875-3.953,8.828-8.828,8.828H8.828c-4.875,0-8.828-3.953-8.828-8.828V256z"/>
<path style="fill:#F5F5F5;" d="M512,256H0V97.103c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828L512,256  L512,256z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, gv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<path style="fill:#73AF00;" d="M185.379,88.277H8.828C3.953,88.277,0,92.229,0,97.104v317.793c0,4.875,3.953,8.828,8.828,8.828  H185.38V88.277H185.379z"/>
<circle style="fill:#FFE15A;" cx="185.45" cy="256.001" r="79.38"/>
<path style="fill:#FF4B55;" d="M211.932,229.518v35.31c0,14.603-11.88,26.483-26.483,26.483s-26.483-11.88-26.483-26.483v-35.31  H211.932 M220.759,211.863h-70.621c-4.875,0-8.828,3.953-8.828,8.828v44.138c0,24.376,19.762,44.138,44.138,44.138  s44.138-19.762,44.138-44.138v-44.138C229.587,215.816,225.634,211.863,220.759,211.863L220.759,211.863z"/>
<path style="fill:#F5F5F5;" d="M211.932,229.518v35.31c0,14.603-11.88,26.483-26.483,26.483s-26.483-11.88-26.483-26.483v-35.31  H211.932"/>
<g>
	<circle style="fill:#FFE15A;" cx="150.07" cy="220.691" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="220.69" cy="220.691" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="150.07" cy="256.001" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="220.69" cy="256.001" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="185.38" cy="220.691" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="211.88" cy="288.551" r="4.414"/>
	<circle style="fill:#FFE15A;" cx="159.4" cy="288.551" r="4.414"/>
</g>
<g>
	<path style="fill:#41479B;" d="M191.149,253.763v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602   L191.149,253.763"/>
	<path style="fill:#41479B;" d="M191.149,235.741v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602H191.149"/>
	<path style="fill:#41479B;" d="M191.149,271.97v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602H191.149"/>
	<path style="fill:#41479B;" d="M206.506,253.763v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602   L206.506,253.763"/>
	<path style="fill:#41479B;" d="M175.794,253.763v7.602c0,3.144-2.558,5.702-5.702,5.702s-5.702-2.558-5.702-5.702v-7.602   L175.794,253.763"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, bv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#F5F5F5;" d="M512,200.093H0V97.104c0-4.875,3.953-8.828,8.828-8.828h494.345c4.875,0,8.828,3.953,8.828,8.828  L512,200.093L512,200.093z"/>
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V311.909h512v102.988  C512,419.773,508.047,423.725,503.172,423.725z"/>
<rect y="200.091" style="fill:#41479B;" width="512" height="111.81"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, yv = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#4173CD;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<polygon style="fill:#FFE15A;" points="512,229.518 211.862,229.518 211.862,88.277 158.897,88.277 158.897,229.518 0,229.518   0,282.484 158.897,282.484 158.897,423.725 211.862,423.725 211.862,282.484 512,282.484 "/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, _v = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001" style="enable-background:new 0 0 512.001 512.001;" xml:space="preserve">
<path style="fill:#FF4B55;" d="M503.172,423.725H8.828c-4.875,0-8.828-3.953-8.828-8.828V97.104c0-4.875,3.953-8.828,8.828-8.828  h494.345c4.875,0,8.828,3.953,8.828,8.828v317.793C512,419.773,508.047,423.725,503.172,423.725z"/>
<g>
	<path style="fill:#F5F5F5;" d="M253.474,225.753l13.837,18.101l21.606-7.232c1.208-0.404,2.236,0.962,1.512,2.01l-12.939,18.753   l13.555,18.314c0.758,1.024-0.224,2.423-1.444,2.059l-21.834-6.511l-13.228,18.55c-0.739,1.037-2.375,0.536-2.406-0.737   l-0.555-22.777l-21.73-6.849c-1.215-0.383-1.244-2.092-0.042-2.515l21.491-7.566l-0.202-22.783   C251.083,225.296,252.701,224.741,253.474,225.753z"/>
	<path style="fill:#F5F5F5;" d="M176.956,326.662c-38.995,0-70.627-31.633-70.627-70.663c0-38.958,31.633-70.662,70.627-70.662   c14.508,0,27.887,4.462,39.037,12.014c1.707,1.156,3.656-1.087,2.227-2.573c-16.664-17.325-40.248-27.894-66.398-27.001   c-44.926,1.533-82.118,37.553-84.989,82.413c-3.287,51.383,37.399,94.086,88.055,94.086c24.953,0,47.379-10.432,63.393-27.112   c1.415-1.473-0.538-3.683-2.229-2.537C204.89,322.196,191.489,326.662,176.956,326.662z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`, Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BR: av,
  CN: rv,
  DE: uv,
  ES: dv,
  FR: cv,
  GB: hv,
  HU: fv,
  IT: pv,
  JP: mv,
  PL: vv,
  PT: gv,
  RU: bv,
  SE: yv,
  TR: _v
}, Symbol.toStringTag, { value: "Module" })), Wi = (e) => {
  if (e && e.id)
    return !0;
}, wv = (e) => {
  try {
    const { firstName: n } = e;
    if (n)
      return !0;
  } catch {
  }
  return !1;
}, kv = (e) => `${e.firstName}${e.lastName ? ` ${e.lastName}` : ""}`, ft = {
  message: {
    name: "message",
    icon: "chat-alt"
  },
  network: {
    name: "network",
    icon: "user-add",
    left: !0
  },
  audio: {
    name: "audio",
    icon: "phone"
  },
  conferencing: {
    name: "conferencing",
    icon: "videocamera"
  },
  screenshare: {
    name: "screenshare",
    icon: "monitor"
  }
};
ft.network;
const Sv = [ft.message, ft.audio, ft.conferencing, ft.screenshare], an = (e) => {
  const n = Object.keys(ft);
  return !(e.length > 0 && e.filter((t) => n.indexOf(t)) === -1);
}, Iv = {
  name: "vu-rich-user-tooltip",
  emits: ["network", "message", "audio", "conferencing", "screenshare", "see-profile"],
  directives: {
    "click-outside": Fn
  },
  inject: {
    vuUserLabels: {
      default: () => lv
    },
    vuDebug: {
      default: !1
    }
  },
  props: {
    show: {
      type: Boolean,
      required: !1
    },
    user: {
      type: Object,
      validator: Wi,
      required: !0
    },
    disabledActions: {
      type: Array,
      validator: an,
      required: !1,
      default: () => []
    },
    hiddenActions: {
      type: Array,
      validator: an,
      required: !1,
      default: () => []
    },
    side: {
      type: String,
      default: "bottom"
    },
    // eslint-disable-next-line vue/require-prop-types
    attach: {
      default: !1
    },
    activator: {
      type: Object,
      default: void 0
    }
  },
  watch: {
    show(e) {
      this.innerShow = e;
    },
    contacts: {
      immediate: !0,
      handler() {
        this.parseContactsInCommonLabel();
      }
    }
  },
  /* eslint-disable no-unused-vars */
  data: () => ({
    overflowHover: !1,
    actions: ft,
    RHSactions: Sv,
    uuid: Re,
    getFullname: kv,
    validateName: wv,
    contactsLabelPart2: "",
    contactsLabelPart1: "",
    visibleAmount: 7
  }),
  /* eslint-enable no-unused-vars */
  computed: {
    hasInfo() {
      return this.user.company || this.user.country;
    },
    hasContacts() {
      return Array.isArray(this.user.contacts) && this.user.contacts.length > 0;
    },
    contacts() {
      return this.hasContacts ? this.user.contacts : [];
    },
    countryImg() {
      return !this.user.countryCode || !Es[this.user.countryCode.toUpperCase()] ? !1 : Es[this.user.countryCode.toUpperCase()];
    },
    countryLabel() {
      return this.user.countryCode && this.vuUserLabels[this.user.countryCode];
    },
    overflows() {
      return this.user.contacts && this.user.contacts.length > 7;
    },
    visibleContacts() {
      return this.hasContacts && this.overflows ? this.contacts.slice(0, this.visibleAmount) : this.contacts;
    },
    overflowContact() {
      return this.hasContacts && this.overflows ? this.contacts[this.visibleAmount] : null;
    },
    numberOfOverflowingContactsCssVariable() {
      return `"${this.contacts.length - this.visibleAmount}"`;
    }
  },
  methods: {
    parseContactsInCommonLabel() {
      if (!this.vuUserLabels.contactsInCommon && this.vuDebug) {
        console.warn("contactsInCommon nls is missing");
        return;
      }
      let { contactsInCommon: e } = this.vuUserLabels;
      const n = e.match(/\$\(.*\)/).length > 0;
      this.contacts.length > 1 && n ? e = e.replace("$(", "").replace(")", "") : e = e.replace(/\$\(.*\)/, ""), e = e.split("###"), this.contactsLabelPart1 = e[0], this.contactsLabelPart2 = e[1];
    },
    isDisabled(e) {
      return this.disabledActions.length > 0 && this.disabledActions.includes(e);
    }
  },
  components: { VuPopover: Ge, VuUserPicture: $t, VuIconBtn: de }
}, Cv = (e) => (et("data-v-8d121700"), e = e(), tt(), e), Bv = { class: "rich-user-tooltip__header__wrap-name" }, $v = /* @__PURE__ */ Cv(() => /* @__PURE__ */ b("div", { class: "rich-user-tooltip__header__topbar" }, null, -1)), Ov = { class: "rich-user-tooltip__avatar-wrap" }, Tv = {
  key: 0,
  class: "rich-user-tooltip__info"
}, xv = {
  key: 0,
  class: "rich-user-tooltip__info__company"
}, Mv = {
  key: 1,
  class: "rich-user-tooltip__info__locale"
}, Vv = ["src"], Pv = {
  key: 1,
  class: "rich-user-tooltip__info__country"
}, Lv = { class: "rich-user-tooltip__contacts__label" }, Dv = { class: "rich-user-tooltip__contacts__list" }, Av = { class: "rich-user-tooltip__footer" }, Fv = { class: "rich-user-tooltip__footer__left" };
function zv(e, n, t, i, o, s) {
  const a = $("VuUserPicture"), u = $("VuIconBtn"), c = $("VuPopover"), d = _e("tooltip");
  return l(), S(c, {
    side: t.side,
    show: t.show,
    arrow: "",
    shift: "",
    positions: ["bottom", "top"],
    attach: "body",
    "content-class": "vu-rich-user-tooltip",
    activator: t.activator
  }, Ks({
    default: V(() => [
      C(e.$slots, "default", {}, () => [
        H(T(a, {
          id: t.user.id,
          clickable: "",
          src: t.user.imgSrc,
          presence: t.user.presence,
          class: "rich-user-tooltip__default-content"
        }, null, 8, ["id", "src", "presence"]), [
          [
            d,
            e.getFullname(t.user),
            void 0,
            { top: !0 }
          ]
        ])
      ], !0)
    ]),
    arrow: V(({ side: h, shift: p }) => [
      H(b("div", {
        class: k(["rich-user-tooltip__arrow popover-arrow", `rich-user-tooltip__arrow--${h}`])
      }, null, 2), [
        [Me, !p]
      ])
    ]),
    title: V(({ side: h }) => [
      b("div", {
        class: k(["rich-user-tooltip__header", `rich-user-tooltip__header--${h}`])
      }, [
        b("div", Bv, [
          H((l(), r("label", {
            class: "rich-user-tooltip__header__name",
            onClick: n[0] || (n[0] = (p) => e.$emit("see-profile", t.user.id))
          }, [
            X(w(e.getFullname(t.user)), 1)
          ])), [
            [d, e.getFullname(t.user)]
          ])
        ]),
        $v,
        H((l(), r("div", Ov, [
          T(a, {
            class: "rich-user-tooltip__header__avatar",
            size: "big",
            clickable: !0,
            id: t.user && t.user.id,
            gutter: !0,
            presence: t.user.presence,
            onClick: n[1] || (n[1] = (p) => e.$emit("see-profile", t.user.id))
          }, null, 8, ["id", "presence"])
        ])), [
          [
            d,
            e.getFullname(t.user),
            void 0,
            { bottom: !0 }
          ]
        ])
      ], 2)
    ]),
    _: 2
  }, [
    (s.hasInfo || s.hasContacts, {
      name: "body",
      fn: V(() => [
        s.hasInfo ? (l(), r("div", Tv, [
          t.user.company ? (l(), r("label", xv, w(t.user.company), 1)) : f("", !0),
          s.countryImg || s.countryLabel ? (l(), r("label", Mv, [
            s.countryImg ? (l(), r("img", {
              key: 0,
              class: "rich-user-tooltip__info__flag",
              src: s.countryImg
            }, null, 8, Vv)) : f("", !0),
            s.countryLabel ? (l(), r("span", Pv, w(s.countryLabel), 1)) : f("", !0)
          ])) : f("", !0)
        ])) : f("", !0),
        C(e.$slots, "content", {}, void 0, !0),
        s.hasContacts ? (l(), r(M, { key: 1 }, [
          b("label", Lv, [
            X(w(e.contactsLabelPart1), 1),
            H((l(), r("span", {
              class: "rich-user-tooltip__contacts__amount",
              onClick: n[2] || (n[2] = (h) => e.$emit("see-profile", t.user.id))
            }, [
              X(w(s.contacts.length), 1)
            ])), [
              [
                d,
                s.vuUserLabels.profile,
                void 0,
                { bottom: !0 }
              ]
            ]),
            e.contactsLabelPart2 ? (l(), r(M, { key: 0 }, [
              X(w(e.contactsLabelPart2), 1)
            ], 64)) : f("", !0)
          ]),
          b("div", Dv, [
            (l(!0), r(M, null, U(s.visibleContacts, (h) => H((l(), S(a, {
              key: h.id || e.uuid(),
              id: h.id || e.uuid(),
              clickable: !0,
              onClick: (p) => e.$emit("see-profile", h.id)
            }, null, 8, ["id", "onClick"])), [
              [
                d,
                e.getFullname(h),
                void 0,
                { bottom: !0 }
              ]
            ])), 128)),
            s.overflowContact ? H((l(), S(a, {
              key: 0,
              class: "rich-user-tooltip__overflow_contact",
              style: G({
                "--numberOfOverflowingContacts": s.numberOfOverflowingContactsCssVariable
              }),
              clickable: !0,
              hoverable: "",
              id: s.overflowContact.id || e.uuid(),
              onClick: n[3] || (n[3] = (h) => e.$emit("see-profile", s.overflowContact.id))
            }, null, 8, ["style", "id"])), [
              [
                d,
                s.vuUserLabels.profile,
                void 0,
                { bottom: !0 }
              ]
            ]) : f("", !0)
          ])
        ], 64)) : f("", !0),
        b("div", Av, [
          b("div", Fv, [
            C(e.$slots, "footer-left", {}, () => [
              t.hiddenActions.length && t.hiddenActions.includes("network") ? f("", !0) : H((l(), S(a, {
                key: 0,
                icon: e.actions.network.icon,
                class: "add-network",
                disabled: t.disabledActions.length > 0 && t.disabledActions.includes("network"),
                onClick: n[4] || (n[4] = (h) => {
                  s.isDisabled("network") || e.$emit("network", t.user.id);
                })
              }, null, 8, ["icon", "disabled"])), [
                [
                  d,
                  s.vuUserLabels.network,
                  void 0,
                  { bottom: !0 }
                ]
              ])
            ], !0)
          ]),
          C(e.$slots, "footer-right", {}, () => [
            (l(!0), r(M, null, U(e.RHSactions, (h) => (l(), r(M, {
              key: h.name
            }, [
              t.hiddenActions.length && t.hiddenActions.includes(h.name) ? f("", !0) : H((l(), S(u, {
                key: 0,
                class: "right-btn",
                icon: h.icon,
                disabled: s.isDisabled(h.name),
                onClick: (p) => {
                  s.isDisabled(h.name) || e.$emit(h.name, t.user.id);
                }
              }, null, 8, ["icon", "disabled", "onClick"])), [
                [
                  d,
                  s.vuUserLabels[h.name],
                  void 0,
                  { bottom: !0 }
                ]
              ])
            ], 64))), 128))
          ], !0)
        ])
      ]),
      key: "0"
    })
  ]), 1032, ["side", "show", "activator"]);
}
const qi = /* @__PURE__ */ F(Iv, [["render", zv], ["__scopeId", "data-v-8d121700"]]), Ev = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qi
}, Symbol.toStringTag, { value: "Module" })), Nv = {
  name: "vu-user-name",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    firstName: String,
    // eslint-disable-next-line vue/require-default-prop
    lastName: String,
    toUpper: {
      type: Boolean,
      required: !1,
      default: !0
    },
    shift: Boolean,
    clickable: Boolean
  },
  emits: ["click"],
  computed: {
    _lastName() {
      return this.toUpper ? this.lastName.toUpperCase() : this.lastName;
    }
  }
};
function Rv(e, n, t, i, o, s) {
  return l(), r("div", {
    class: k(["vu-user-name", [
      "vu-user-name--default-color",
      "vu-user-name--default-size",
      { "vu-user-name--with-avatar": t.shift },
      { "vu-user-name--clickable": t.clickable }
    ]])
  }, [
    C(e.$slots, "default", {}, () => [
      b("span", {
        class: "content",
        onClick: n[0] || (n[0] = (a) => e.$emit("click"))
      }, w(t.firstName + " " + s._lastName), 1)
    ], !0)
  ], 2);
}
const Ki = /* @__PURE__ */ F(Nv, [["render", Rv], ["__scopeId", "data-v-7c3b1fc7"]]), Hv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ki
}, Symbol.toStringTag, { value: "Module" })), jv = {
  name: "vu-user",
  emits: ["click-other-user", "click-user"],
  props: {
    user: {
      type: Object,
      required: !0,
      validator: Wi
    },
    disabledActions: {
      type: Array,
      required: !1,
      default: () => [],
      validator: an
    },
    hiddenActions: {
      type: Array,
      required: !1,
      default: () => [],
      validator: an
    },
    showPicture: {
      type: Boolean,
      required: !1,
      default: !0
    },
    showName: {
      type: Boolean,
      required: !1,
      default: !1
    },
    showUserTooltip: {
      type: Boolean,
      required: !1,
      default: !0
    },
    clickable: {
      type: Boolean,
      required: !1,
      default: !0
    },
    pictureBackground: {
      type: String,
      required: !1,
      default: "#fff"
    },
    attach: {
      default: () => !1,
      validator: Gn
    }
  },
  computed: {
    listeners() {
      return Ze(this.$attrs, !0);
    }
  },
  data: () => ({
    getListenersFromAttrs: Ze
  }),
  components: { VuRichUserTooltip: qi, VuUserPicture: $t, VuUserName: Ki, VuUserPicture: $t }
}, Uv = { class: "vu-user" };
function Wv(e, n, t, i, o, s) {
  const a = $("VuUserPicture"), u = $("VuUserName"), c = $("VuRichUserTooltip");
  return l(), r("div", Uv, [
    t.showUserTooltip ? (l(), S(c, J({
      key: 0,
      user: t.user,
      "disabled-actions": t.disabledActions,
      "hidden-actions": t.hiddenActions,
      attach: t.attach
    }, lt(s.listeners.vOn || {})), {
      default: V(() => [
        t.showPicture ? (l(), S(a, {
          key: 0,
          id: t.user.id,
          src: t.user.imgSrc,
          presence: t.user.presence,
          clickable: t.clickable,
          style: G({ background: t.pictureBackground }),
          onClick: n[0] || (n[0] = (d) => e.$emit("click-user", e.value))
        }, null, 8, ["id", "src", "presence", "clickable", "style"])) : f("", !0),
        t.showName ? (l(), S(u, {
          key: 1,
          "first-name": t.user.firstName,
          "last-name": t.user.lastName,
          clickable: t.clickable,
          shift: t.showPicture,
          onClick: n[1] || (n[1] = (d) => e.$emit("click-user", d))
        }, {
          default: V(() => [
            C(e.$slots, "userName", {}, void 0, !0)
          ]),
          _: 3
        }, 8, ["first-name", "last-name", "clickable", "shift"])) : f("", !0)
      ]),
      _: 3
    }, 16, ["user", "disabled-actions", "hidden-actions", "attach"])) : (l(), r(M, { key: 1 }, [
      t.showPicture ? (l(), S(a, {
        key: 0,
        id: t.user.id,
        src: t.user.imgSrc,
        presence: t.user.presence,
        clickable: t.clickable,
        style: G({ background: t.pictureBackground }),
        onClick: n[2] || (n[2] = (d) => e.$emit("click-user", d))
      }, null, 8, ["id", "src", "presence", "clickable", "style"])) : f("", !0),
      t.showName ? (l(), S(u, {
        key: 1,
        "first-name": t.user.firstName,
        "last-name": t.user.lastName,
        clickable: t.clickable,
        shift: t.showPicture,
        onClick: n[3] || (n[3] = (d) => e.$emit("click-user", d))
      }, {
        default: V(() => [
          C(e.$slots, "userName", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["first-name", "last-name", "clickable", "shift"])) : f("", !0)
    ], 64))
  ]);
}
const qv = /* @__PURE__ */ F(jv, [["render", Wv], ["__scopeId", "data-v-4a92d15b"]]), Kv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qv
}, Symbol.toStringTag, { value: "Module" }));
function Kt() {
  if (!window)
    return !1;
  const e = navigator.userAgent.toLowerCase();
  return !!(/iPhone|iPad/i.test(e) || /safari/.test(e) && !/chrome/.test(e) && ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
const rn = ({ userAgent: e }) => e.match(/android/i);
let Gi = null, fs = null;
function Gv({ disableTooltipsOnDevices: e, deferTooltips: n }) {
  Gi = e, fs = n;
}
function Yi(e, n, t, i) {
  const o = n.getBoundingClientRect(), {
    left: s,
    top: a,
    shiftX: u
  } = Xn(e, o, t.getBoundingClientRect(), i.getBoundingClientRect(), {}, !0);
  t.style.top = `${a}px`, t.style.left = `${s}px`;
  const c = t.querySelector(".tooltip-arrow") || { style: {} };
  return u > 0 ? (c.style.right = `${u - 5}px`, c.style.left = "initial") : u < 0 && (c.style.left = `${o.left - s + n.clientWidth / 2}px`, c.style.right = "initial"), !0;
}
function Xi(e) {
  switch (!0) {
    case e.left:
      return "left";
    case e.right:
      return "right";
    case e.bottom:
      return "bottom";
    default:
      return "top";
  }
}
function Ji(e, n, t) {
  const { text: i = "" } = t || {}, o = T({ ...Jn }, {
    type: n ? "popover" : "tooltip",
    text: typeof t == "string" ? t : i
  });
  e.tooltip = o, fs && (e.deferedTooltip = !0);
}
async function Ns(e, n = {}) {
  const { value: t, modifiers: i } = n;
  if (i.ellipsis && e.offsetWidth >= e.scrollWidth)
    return;
  const { attach: o = document.body } = t, s = Xi(i), { tooltip: { component: a = !1 } = {} } = e;
  a || Ji(e, i.popover, t), Hn(e.tooltip, o), e.tooltip.component.props.show = !0, e.tooltip.component.props.side = s, await new Promise((u) => setTimeout(u, 1)), Yi(s, e, e.tooltip.el, o), (rn(navigator) || Kt()) && (e.stopClickOutside = il(e, () => zn(e), { detectIframe: !0 }));
}
function zn(e) {
  const { tooltip: n } = e, { component: t } = n || {};
  !n || !t || (t.props.show = !1, (rn(navigator) || Kt()) && e.stopClickOutside && (e.stopClickOutside(), delete e.stopClickOutside), Zi(e));
}
async function Yv(e, n, t) {
  var u;
  const { tooltip: i } = e, { modifiers: o, value: s = {} } = n, { text: a } = s;
  if (i) {
    const { component: c } = i, d = typeof s == "string" ? s : a;
    if (i.props.text = d, c && (c.props.text = d), (u = c == null ? void 0 : c.props) != null && u.show) {
      const h = Xi(o);
      await new Promise((p) => setTimeout(p, 1)), Yi(h, t.el, i.el, document.body);
    }
  }
}
function Zi(e) {
  var n, t, i, o, s;
  if (e.tooltip) {
    const { tooltip: a } = e;
    a && ((t = (n = a == null ? void 0 : a.component) == null ? void 0 : n.el) == null || t.remove(), (s = (o = (i = a == null ? void 0 : a.component) == null ? void 0 : i.vnode) == null ? void 0 : o.el) == null || s.remove()), delete e.tooltip;
  }
}
function Rs(e, n, t) {
  n.modifiers.click || t ? (e.clickListener = () => {
    var i, o, s;
    (s = (o = (i = e == null ? void 0 : e.tooltip) == null ? void 0 : i.component) == null ? void 0 : o.props) != null && s.show ? zn(e) : Ns(e, n);
  }, e.addEventListener("click", e.clickListener)) : (e.showListener = Ns.bind(null, e, n), e.addEventListener("mouseenter", e.showListener), e.hideListener = zn.bind(null, e), e.addEventListener("mouseleave", e.hideListener));
}
function Xv(e) {
  e.clickListener && e.removeEventListener("click", e.clickListener), e.showListener && e.removeEventListener("mouseenter", e.showListener), e.hideListener && e.removeEventListener("mouseleave", e.hideListener);
}
const Bn = {
  setConfig: Gv,
  mounted(e, n) {
    const { modifiers: t, value: i } = n, { forceOnDevices: o = !1, popover: s = !1 } = t, a = rn(navigator) || Kt();
    Gi && !o && a || n.disabled || (!fs && i ? Ji(e, s, i) : e.deferedTooltip = !0, i && Rs(e, n, a));
  },
  updated(e, n, t) {
    const i = typeof n.value == "function", o = typeof n.oldValue == "function", s = i ? n.value() : n.value, a = o ? n.oldValue() : n.oldValue;
    if (s !== a && (Yv(e, n, t), Xv(e), s)) {
      const u = rn(navigator) || Kt();
      Rs(e, n, u);
    }
  },
  beforeUnmount: Zi
}, Hs = (e, n, t) => {
  const i = T(is, { mask: !0 });
  if (Hn(i, t.el), e.spinner = i, i && typeof n.value == "string") {
    const { component: o } = i;
    i.props.text = n.value, o && (o.props.text = n.value);
  }
  e.classList.add("masked");
}, js = (e, n, t) => {
  e.spinner && (Hn(null, t.el), e.spinner = null, e.classList.remove("masked"));
}, Us = {
  mounted(e, n, t) {
    n.value && Hs(e, n, t);
  },
  updated(e, n, t) {
    n.value !== n.oldValue && (n.value ? Hs : js)(e, n, t);
  },
  unmounted(e, n, t) {
    js(e, n, t);
  }
}, Jv = {
  install(e, n = { disableTooltipsOnDevices: !0 }) {
    e.directive("click-outside", Fn), e.directive("mask", Us), Bn.setConfig(n), e.directive("tooltip", Bn);
  },
  clickOutside: Fn,
  tooltip: Bn,
  mask: Us
};
function Zv(e, n = {}) {
  const {
    lang: t = "en",
    country: i = "US",
    isMobile: o,
    isIOS: s,
    globalRegister: a = !0,
    disableVuMessageProgressBar: u,
    sharedMessageContainer: c = !0
  } = n;
  if (ff(e), Vh(e, c), Or(e), a) {
    const d = /* @__PURE__ */ Object.assign({ "./components/layouts/vu-status-bar.vue": $l, "./components/layouts/vu-thumbnail.vue": Na, "./components/layouts/vu-tile.vue": Pa, "./components/vu-accordion.vue": Ga, "./components/vu-alert-dialog/vu-alert-dialog-container.vue": Vr, "./components/vu-alert-dialog/vu-alert-dialog.vue": rr, "./components/vu-badge.vue": Mo, "./components/vu-btn-dropdown.vue": Hr, "./components/vu-btn-group.vue": Kr, "./components/vu-btn.vue": Ar, "./components/vu-carousel-slide.vue": Zr, "./components/vu-carousel.vue": ru, "./components/vu-checkbox.vue": gu, "./components/vu-contextual-dropdown.vue": wu, "./components/vu-datepicker.vue": Lu, "./components/vu-divider.vue": Bo, "./components/vu-dropdown/vu-dropdownmenu-items-scrollable.vue": ta, "./components/vu-dropdownmenu-items.vue": ma, "./components/vu-dropdownmenu.vue": ga, "./components/vu-dropzone.vue": zu, "./components/vu-facets-bar.vue": Uu, "./components/vu-form.vue": Ku, "./components/vu-grid-view.vue": Hd, "./components/vu-icon-btn.vue": _a, "./components/vu-icon-link.vue": qd, "./components/vu-icon.vue": Ao, "./components/vu-image.vue": Dl, "./components/vu-input-date.vue": tc, "./components/vu-input-number.vue": hc, "./components/vu-input.vue": yc, "./components/vu-lazy.vue": xl, "./components/vu-lightbox/vu-lightbox-bar.vue": Pc, "./components/vu-lightbox/vu-lightbox.vue": Yc, "./components/vu-media-upload-droppable.vue": eh, "./components/vu-media-upload-empty.vue": lh, "./components/vu-media-upload-error.vue": dh, "./components/vu-media-upload-loading.vue": yh, "./components/vu-media-upload-preview.vue": Sh, "./components/vu-media-upload.vue": Mh, "./components/vu-message/vu-message-container.vue": Uh, "./components/vu-message/vu-message.vue": Eh, "./components/vu-modal/vu-mobile-dialog.vue": Jh, "./components/vu-modal/vu-modal-container.vue": gf, "./components/vu-modal/vu-modal.vue": hf, "./components/vu-multiple-select.vue": Tf, "./components/vu-popover.vue": Sl, "./components/vu-progress-circular.vue": mh, "./components/vu-range.vue": Hf, "./components/vu-scroller.vue": Kl, "./components/vu-section-header.vue": Kf, "./components/vu-select-options.vue": ud, "./components/vu-select.vue": Od, "./components/vu-side-panel.vue": zc, "./components/vu-single-checkbox.vue": tp, "./components/vu-slider.vue": dp, "./components/vu-spinner.vue": jl, "./components/vu-textarea.vue": bp, "./components/vu-thumbnail-grid.vue": Wp, "./components/vu-thumbnail-list-item.vue": Tp, "./components/vu-thumbnail-list.vue": hm, "./components/vu-time-picker.vue": Om, "./components/vu-timeline-divider.vue": Fm, "./components/vu-tooltip.vue": gl, "./components/vu-tree-view-item.vue": Km, "./components/vu-tree-view.vue": Zm, "./components/vu-user/vu-rich-user-tooltip.vue": Ev, "./components/vu-user/vu-user-name.vue": Hv, "./components/vu-user/vu-user-picture.vue": Qu, "./components/vu-user/vu-user.vue": Kv });
    for (const h in d) {
      const p = d[h];
      e.component(p.default.name, p.default);
    }
  }
  t && i ? e.provide("lang", `${t}-${i}`) : e.provide("lang", "en-US"), e.provide(Yt, o !== void 0 ? o : Fi()), e.provide(es, s !== void 0 ? s : Kt()), e.provide("vuCollectionActions", null), e.provide("vuCollectionLazyImages", !0), e.provide("vuTileEmphasizeText", !1), e.provide("vuDateFormatWeekday", !0), e.provide("vuDateFormatShort", !1), e.provide("vuTreeViewLazy", !0), e.provide("vuTreeViewIcon", "chevron"), e.provide(ns, !0), e.provide(ts, u), Jv.install(e, n);
}
const tg = { install: Zv };
export {
  bi as alertDialog,
  Zv as default,
  Zv as install,
  ct as message,
  Ht as modal,
  tg as plugin,
  eg as provideKeys
};
