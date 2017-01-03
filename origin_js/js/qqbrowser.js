function Swipe(t, e) {
    "use strict";
    function n() {
        m = w.children,
        b = m.length,
        y = b > 4,
        m.length < 2 && (e.continuous = !1),
        f.transitions && e.continuous && m.length < 3 && (w.appendChild(m[0].cloneNode(!0)), w.appendChild(w.children[1].cloneNode(!0)), m = w.children),
        g = new Array(m.length),
        v = t.getBoundingClientRect().width || t.offsetWidth,
        w.style.width = Math.min(b, 3) * v + "px";
        for (var n = m.length; n--;) {
            var i = m[n];
            i.style.width = v + "px",
            i.setAttribute("data-index", n),
            f.transitions && s(n, _ > n ? -v: n > _ ? v: 0, 0, !0)
        }
        e.continuous && f.transitions && (s(r(_ - 1), -v, 0, !0), s(r(_ + 1), v, 0, !0)),
        f.transitions || (w.style.left = _ * -v + "px"),
        t.style.visibility = "visible";
        var o = _;
        setTimeout(function() {
            m[r(o + 1)].style.visibility = "visible",
            o > 0 && (m[r(o - 1)].style.visibility = "visible")
        },
        520),
        p(e.setupCallback && e.setupCallback(_))
    }
    function i() {
        e.continuous ? a(_ - 1) : _ && a(_ - 1)
    }
    function o() {
        e.continuous ? a(_ + 1) : _ < m.length - 1 && a(_ + 1)
    }
    function r(t) {
        return (m.length + t % m.length) % m.length
    }
    function a(t, n) {
        if (_ != t) {
            if (f.transitions) {
                var i = Math.abs(_ - t) / (_ - t);
                if (e.continuous) {
                    var o = i;
                    i = -g[r(t)] / v,
                    i !== o && (t = -i * m.length + t)
                }
                for (var a = Math.abs(_ - t) - 1; a--;) s(r((t > _ ? t: _) - a - 1), v * i, 0, !0);
                t = r(t),
                s(_, v * i, isFinite(n) ? n || 0 : x),
                s(t, 0, isFinite(n) ? n || 0 : x),
                e.continuous && s(r(t - i), -(v * i), 0)
            } else t = r(t),
            l(_ * -v, t * -v, n || x);
            _ = t,
            p(e.callback && e.callback(_)),
            p(function() {
                m[r(_ + 1)].style.visibility = "visible",
                m[r(_)].style.visibility = "visible",
                m[r(_ - 1)].style.visibility = "visible"
            })
        }
    }
    function s(t, e, n, i) {
        c(t, e, n, i),
        g[t] = e
    }
    function c(t, e, n) {
        var i = m[t],
        o = i && i.style;
        o && q(function() {
            o.webkitTransitionDuration = o.transitionDuration = n + "ms",
            o.webkitTransform = /OS 7/.test(navigator.userAgent) ? "translate(" + e + "px,0) scale(1.0000001)": "translate(" + e + "px,0)"
        })
    }
    function l(t, n, i) {
        if (!i) return void(w.style.left = n + "px");
        var o = +new Date,
        r = setInterval(function() {
            var a = +new Date - o;
            return a > i ? (w.style.left = n + "px", E && d(), e.transitionEnd && e.transitionEnd.call(event, _, m[_]), void clearInterval(r)) : void(w.style.left = (n - t) * (Math.floor(a / i * 100) / 100) + t + "px")
        },
        4)
    }
    function d() {}
    function u() {
        E = 0
    }
    var h = function() {},
    p = function(t) {
        setTimeout(t || h, 0)
    },
    f = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function(t) {
            var e = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var n in e) if (void 0 !== t.style[e[n]]) return ! 0;
            return ! 1
        } (document.createElement("swipe"))
    };
    if (t) {
        var m, g, v, b, w = t.children[0],
        y = !0;
        e = e || {};
        var _ = parseInt(e.startSlide, 10) || 0,
        x = e.speed || 300,
        T = !1,
        k = !0,
        j = !1,
        C = !1,
        q = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(t, e) {
                return setTimeout(t, e || 1)
            }
        } ();
        e.continuous = void 0 !== e.continuous ? e.continuous: !0;
        var I, E = e.auto || 0,
        S = {},
        L = {},
        P = 0,
        A = 0,
        D = {
            handleEvent: function(t) {
                switch (t.type) {
                case "touchstart":
                    this.start(t);
                    break;
                case "touchmove":
                    this.move(t);
                    break;
                case "touchend":
                    p(this.end(t));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    p(this.transitionEnd(t));
                    break;
                case "resize":
                }
                e.stopPropagation && t.stopPropagation()
            },
            start: function(t) {
                var e = t.touches[0];
                S = {
                    x: e.pageX,
                    y: e.pageY,
                    time: +new Date
                },
                I = void 0,
                L = {},
                w.addEventListener("touchmove", this, !1),
                w.addEventListener("touchend", this, !1)
            },
            move: function(t) {
                if (! (t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                    e.disableScroll && t.preventDefault();
                    var n = t.touches[0];
                    if (L = {
                        x: n.pageX - S.x,
                        y: n.pageY - S.y
                    },
                    T && L.x < 0 != k) return void t.preventDefault();
                    "undefined" == typeof I && (I = !!(I || Math.abs(L.x) < Math.abs(L.y))),
                    I || (t.preventDefault(), u(), e.continuous ? (c(r(_ - 1), L.x + g[r(_ - 1)], 0), c(_, L.x + g[_], 0), c(r(_ + 1), L.x + g[r(_ + 1)], 0), e.movecallback && e.movecallback(_, L.x)) : (L.x = L.x / (!_ && L.x > 0 || _ == b - 1 && L.x < 0 ? Math.abs(L.x) / v + 1 : 1), c(_ - 1, L.x + g[_ - 1], 0), c(_, L.x + g[_], 0), c(_ + 1, L.x + g[_ + 1], 0), (0 == _ || _ == b - 1) && e.movecallback && e.movecallback(_, L.x)))
                }
            },
            end: function(t) {
                if (T && L.x < 0 != k) return void t.preventDefault();
                var n = +new Date - S.time,
                i = Number(n) < 300 && Math.abs(L.x) > 10 || Math.abs(L.x) > v / 3,
                o = !_ && L.x > 0 || _ == b - 1 && L.x < 0;
                e.continuous && (o = !1);
                var a = L.x < 0,
                c = r(a ? _ - 2 : _ + 2),
                l = r(a ? _ + 2 : _ - 2);
                I || (i && !o ? (a ? (e.continuous ? (s(r(_ - 1), -v, 0), s(r(_ + 2), v, 0)) : s(_ - 1, -v, 0), s(_, g[_] - v + -1 * A, x), s(r(_ + 1), parseFloat((g[r(_ + 1)] - v + -1 * A).toFixed(1)), x), A = 0, _ = r(_ + 1)) : (e.continuous ? (s(r(_ + 1), v, 0), s(r(_ - 2), -v, 0)) : s(_ + 1, v, 0), s(_, g[_] + v + -1 * P, x), s(r(_ - 1), parseFloat((g[r(_ - 1)] + v + -1 * P).toFixed(1)), x), P = 0, _ = r(_ - 1)), setTimeout(function() {
                    e.callback && e.callback(_, a)
                },
                10), q(function() {
                    m[l].style.visibility = "visible",
                    y && (m[c].style.visibility = "hidden")
                })) : e.continuous ? (s(r(_ - 1), -v, x), s(_, 0, x), s(r(_ + 1), v, x)) : a ? (_ == b - 1 ? C && 0 == P && Math.abs(L.x) > e.limitDist && (P = -1 * e.chockDist) : P = 0, s(_ - 1, -v + P, x), s(_, P, x, 0), s(_ + 1, v, x)) : (0 == _ ? j && 0 == A && Math.abs(L.x) > e.limitDist && (A = e.chockDist) : A = 0, s(_ - 1, -v, x), s(_, A, x, 0), s(_ + 1, v + A, x))),
                w.removeEventListener("touchmove", D, !1),
                w.removeEventListener("touchend", D, !1)
            },
            transitionEnd: function(t) {
                parseInt(t.target.getAttribute("data-index"), 10) == _ && (E && d(), e.transitionEnd && e.transitionEnd.call(t, _, m[_]))
            }
        };
        return n(),
        E && d(),
        f.addEventListener ? (f.touch && w.addEventListener("touchstart", D, !1), f.transitions && (w.addEventListener("webkitTransitionEnd", D, !1), w.addEventListener("msTransitionEnd", D, !1), w.addEventListener("oTransitionEnd", D, !1), w.addEventListener("otransitionend", D, !1), w.addEventListener("transitionend", D, !1)), window.addEventListener("resize", D, !1)) : window.onresize = function() {},
        {
            setup: function() {
                n()
            },
            slide: function(t, e) {
                u(),
                a(t, e)
            },
            prev: function() {
                u(),
                i()
            },
            next: function() {
                u(),
                o()
            },
            getPos: function() {
                return _
            },
            getNumSlides: function() {
                return b
            },
            lockdir: function(t) {
                var e = {
                    left: !1,
                    right: !0
                };
                T = !0,
                k = !!e[t]
            },
            enableDist: function(t) {
                "left" == t && (j = !0),
                "right" == t && (C = !0)
            },
            disableDis: function(t) {
                "left" == t && (j = !1),
                "right" == t && (C = !1)
            },
            unlockDir: function() {
                T = !1
            },
            kill: function() {
                u();
                for (var t = m.length; t--;) {
                    {
                        m[t]
                    }
                    f.transitions
                }
                f.addEventListener ? (w.removeEventListener("touchstart", D, !1), w.removeEventListener("webkitTransitionEnd", D, !1), w.removeEventListener("msTransitionEnd", D, !1), w.removeEventListener("oTransitionEnd", D, !1), w.removeEventListener("otransitionend", D, !1), w.removeEventListener("transitionend", D, !1), window.removeEventListener("resize", D, !1)) : window.onresize = null
            }
        }
    }
}
if (!window.jq || "function" != typeof jq) {
    var jq = function(t) {
        function e(t, e, n) {
            var i = y.createDocumentFragment();
            if (n) {
                for (var o = t.length - 1; o >= 0; o--) i.insertBefore(t[o], i.firstChild);
                e.insertBefore(i, e.firstChild)
            } else {
                for (var o = 0; o < t.length; o++) i.appendChild(t[o]);
                e.appendChild(i)
            }
            i = null
        }
        function n(t) {
            return t in T ? T[t] : T[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }
        function i(t) {
            for (var e = 0; e < t.length; e++) t.indexOf(t[e]) != e && (t.splice(e, 1), e--);
            return t
        }
        function o(t, e) {
            var n = [];
            if (t == w) return n;
            for (; t; t = t.nextSibling) 1 == t.nodeType && t !== e && n.push(t);
            return n
        }
        function r(t, e) {
            try {
                return e.querySelectorAll(t)
            } catch(n) {
                return []
            }
        }
        function a(t, e) {
            var n;
            if (t = t.trim(), "#" === t[0] && -1 === t.indexOf(" ") && -1 === t.indexOf(">")) n = e == y ? e.getElementById(t.replace("#", "")) : [].slice.call(r(t, e));
            else if ("<" === t[0] && ">" === t[t.length - 1]) {
                var i = y.createElement("div");
                i.innerHTML = t.trim(),
                n = [].slice.call(i.childNodes)
            } else n = [].slice.call(r(t, e));
            return n
        }
        function s() {}
        function c(e, n) {
            e.os = {},
            e.os.webkit = n.match(/WebKit\/([\d.]+)/) ? !0 : !1,
            e.os.android = n.match(/(Android)\s+([\d.]+)/) || n.match(/Silk-Accelerated/) ? !0 : !1,
            e.os.androidICS = e.os.android && n.match(/(Android)\s4/) ? !0 : !1,
            e.os.ipad = n.match(/(iPad).*OS\s([\d_]+)/) ? !0 : !1,
            e.os.iphone = !e.os.ipad && n.match(/(iPhone\sOS)\s([\d_]+)/) ? !0 : !1,
            e.os.webos = n.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? !0 : !1,
            e.os.touchpad = e.os.webos && n.match(/TouchPad/) ? !0 : !1,
            e.os.ios = e.os.ipad || e.os.iphone,
            e.os.ios6 = e.os.ios && n.match(/(OS)\s([6])/) ? !0 : !1,
            e.os.playbook = n.match(/PlayBook/) ? !0 : !1,
            e.os.blackberry = e.os.playbook || n.match(/BlackBerry/) ? !0 : !1,
            e.os.blackberry10 = e.os.blackberry && n.match(/Safari\/536/) ? !0 : !1,
            e.os.chrome = n.match(/Chrome/) ? !0 : !1,
            e.os.opera = n.match(/Opera Mobi/) ? !0 : !1,
            e.os.fennec = n.match(/fennec/i) ? !0 : !1,
            e.os.supportsTouch = t.DocumentTouch && y instanceof t.DocumentTouch || "ontouchstart" in t,
            e.os.desktop = !(e.os.ios || e.os.android || e.os.blackberry || e.os.opera || e.os.fennec || e.os.supportsTouch),
            e.feat = {},
            e.feat.nativeTouchScroll = "undefined" != typeof y.documentElement.getElementsByTagName("head")[0].style["-webkit-overflow-scrolling"] && e.os.ios
        }
        function l(t) {
            return t._jqmid || (t._jqmid = P++)
        }
        function d(t, e, n, i) {
            if (e = u(e), e.ns) var o = h(e.ns);
            return (L[l(t)] || []).filter(function(t) {
                return ! (!t || e.e && t.e != e.e || e.ns && !o.test(t.ns) || n && t.fn != n && ("function" != typeof t.fn || "function" != typeof n || "" + t.fn != "" + n) || i && t.sel != i)
            })
        }
        function u(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function h(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }
        function p(t, e, n) {
            E.isObject(t) ? E.each(t, n) : t.split(/\s/).forEach(function(t) {
                n(t, e)
            })
        }
        function f(t, e, n, i, o) {
            var r = l(t),
            a = L[r] || (L[r] = []);
            p(e, n,
            function(e, n) {
                var r = o && o(n, e),
                s = r || n,
                c = function(e) {
                    var n = s.apply(t, [e].concat(e.data));
                    return n === !1 && e.preventDefault(),
                    n
                },
                l = E.extend(u(e), {
                    fn: n,
                    proxy: c,
                    sel: i,
                    del: r,
                    i: a.length
                });
                a.push(l),
                t.addEventListener(l.e, c, !1)
            })
        }
        function m(t, e, n, i) {
            var o = l(t);
            p(e || "", n,
            function(e, n) {
                d(t, e, n, i).forEach(function(e) {
                    delete L[o][e.i],
                    t.removeEventListener(e.e, e.proxy, !1)
                })
            })
        }
        function g(t) {
            var e = E.extend({
                originalEvent: t
            },
            t);
            return E.each(M,
            function(n, i) {
                e[n] = function() {
                    return this[i] = D,
                    t[n].apply(t, arguments)
                },
                e[i] = O
            }),
            e
        }
        function v(t, e) {
            if (e && t.dispatchEvent) {
                var n = E.Event("destroy", {
                    bubbles: !1
                });
                t.dispatchEvent(n)
            }
            var i = l(t);
            if (i && L[i]) {
                for (var o in L[i]) t.removeEventListener(L[i][o].e, L[i][o].proxy, !1);
                delete L[i]
            }
        }
        function b(t, e) {
            if (t) {
                var n = t.childNodes;
                if (n && n.length > 0) for (var i in n) b(n[i], e);
                v(t, e)
            }
        }
        var w, y = t.document,
        _ = [],
        x = _.slice,
        T = [],
        k = 1,
        j = /^\s*<(\w+)[^>]*>/,
        C = {},
        q = {},
        I = function(t, e) {
            if (this.length = 0, !t) return this;
            if (t instanceof I && e == w) return t;
            if (E.isFunction(t)) return E(y).ready(t);
            if (E.isArray(t) && t.length != w) {
                for (var n = 0; n < t.length; n++) this[this.length++] = t[n];
                return this
            }
            if (E.isObject(t) && E.isObject(e)) {
                if (t.length == w) t.parentNode == e && (this[this.length++] = t);
                else for (var n = 0; n < t.length; n++) t[n].parentNode == e && (this[this.length++] = t[n]);
                return this
            }
            if (E.isObject(t) && e == w) return this[this.length++] = t,
            this;
            if (e !== w) {
                if (e instanceof I) return e.find(t)
            } else e = y;
            var i = this.selector(t, e);
            if (!i) return this;
            if (!E.isArray(i)) return this[this.length++] = i,
            this;
            for (var o = 0; o < i.length; o++) this[this.length++] = i[o];
            return this
        },
        E = function(t, e) {
            return new I(t, e)
        };
        E.is$ = function(t) {
            return t instanceof I
        },
        E.map = function(t, e) {
            var n, i, o, r = [];
            if (E.isArray(t)) for (i = 0; i < t.length; i++) n = e(t[i], i),
            n !== w && r.push(n);
            else if (E.isObject(t)) for (o in t) t.hasOwnProperty(o) && (n = e(t[o], o), n !== w && r.push(n));
            return E([r])
        },
        E.each = function(t, e) {
            var n, i;
            if (E.isArray(t)) {
                for (n = 0; n < t.length; n++) if (e(n, t[n]) === !1) return t
            } else if (E.isObject(t)) for (i in t) if (t.hasOwnProperty(i) && e(i, t[i]) === !1) return t;
            return t
        },
        E.extend = function(t) {
            if (t == w && (t = this), 1 === arguments.length) {
                for (var e in t) this[e] = t[e];
                return this
            }
            return x.call(arguments, 1).forEach(function(e) {
                for (var n in e) t[n] = e[n]
            }),
            t
        },
        E.isArray = function(t) {
            return t instanceof Array && t.push != w
        },
        E.isFunction = function(t) {
            return "function" == typeof t
        },
        E.isObject = function(t) {
            return "object" == typeof t
        },
        E.fn = I.prototype = {
            constructor: I,
            forEach: _.forEach,
            reduce: _.reduce,
            push: _.push,
            indexOf: _.indexOf,
            concat: _.concat,
            selector: a,
            oldElement: w,
            slice: _.slice,
            setupOld: function(t) {
                return t == w ? E() : (t.oldElement = this, t)
            },
            map: function(t) {
                return E.map(this,
                function(e, n) {
                    return t.call(e, n, e)
                })
            },
            each: function(t) {
                return this.forEach(function(e, n) {
                    t.call(e, n, e)
                }),
                this
            },
            ready: function(t) {
                return "complete" === y.readyState || "loaded" === y.readyState || "interactive" === y.readyState ? t() : y.addEventListener("DOMContentLoaded", t, !1),
                this
            },
            find: function(t) {
                if (0 === this.length) return w;
                for (var e, n = [], o = 0; o < this.length; o++) {
                    e = E(t, this[o]);
                    for (var r = 0; r < e.length; r++) n.push(e[r])
                }
                return E(i(n))
            },
            html: function(t, e) {
                if (0 === this.length) return w;
                if (t === w) return this[0].innerHTML;
                for (var n = 0; n < this.length; n++) e !== !1 && E.cleanUpContent(this[n], !1, !0),
                this[n].innerHTML = t;
                return this
            },
            text: function(t) {
                if (0 === this.length) return w;
                if (t === w) return this[0].textContent;
                for (var e = 0; e < this.length; e++) this[e].textContent = t;
                return this
            },
            css: function(e, n, i) {
                var o = i != w ? i: this[0];
                if (0 === this.length) return w;
                if (n == w && "string" == typeof e) {
                    {
                        t.getComputedStyle(o)
                    }
                    return o.style[e] ? o.style[e] : t.getComputedStyle(o)[e]
                }
                for (var r = 0; r < this.length; r++) if (E.isObject(e)) for (var a in e) this[r].style[a] = e[a];
                else this[r].style[e] = n;
                return this
            },
            empty: function() {
                for (var t = 0; t < this.length; t++) E.cleanUpContent(this[t], !1, !0),
                this[t].innerHTML = "";
                return this
            },
            hide: function() {
                if (0 === this.length) return this;
                for (var t = 0; t < this.length; t++)"none" != this.css("display", null, this[t]) && (this[t].setAttribute("jqmOldStyle", this.css("display", null, this[t])), this[t].style.display = "none");
                return this
            },
            show: function() {
                if (0 === this.length) return this;
                for (var t = 0; t < this.length; t++)"none" == this.css("display", null, this[t]) && (this[t].style.display = this[t].getAttribute("jqmOldStyle") ? this[t].getAttribute("jqmOldStyle") : "block", this[t].removeAttribute("jqmOldStyle"));
                return this
            },
            toggle: function(e) {
                for (var n = e === !0 ? !0 : !1, i = 0; i < this.length; i++)"none" !== t.getComputedStyle(this[i]).display || e !== w && n === !1 ? (this[i].setAttribute("jqmOldStyle", this[i].style.display), this[i].style.display = "none") : (this[i].style.display = this[i].getAttribute("jqmOldStyle") != w ? this[i].getAttribute("jqmOldStyle") : "block", this[i].removeAttribute("jqmOldStyle"));
                return this
            },
            val: function(t) {
                if (0 === this.length) return w;
                if (t == w) return this[0].value;
                for (var e = 0; e < this.length; e++) this[e].value = t;
                return this
            },
            attr: function(t, e) {
                if (0 === this.length) return w;
                if (e === w && !E.isObject(t)) {
                    var n = this[0].jqmCacheId && C[this[0].jqmCacheId][t] ? this[0].jqmCacheId && C[this[0].jqmCacheId][t] : this[0].getAttribute(t);
                    return n
                }
                for (var i = 0; i < this.length; i++) if (E.isObject(t)) for (var o in t) E(this[i]).attr(o, t[o]);
                else E.isArray(e) || E.isObject(e) || E.isFunction(e) ? (this[i].jqmCacheId || (this[i].jqmCacheId = E.uuid()), C[this[i].jqmCacheId] || (C[this[i].jqmCacheId] = {}), C[this[i].jqmCacheId][t] = e) : null == e && e !== w ? (this[i].removeAttribute(t), this[i].jqmCacheId && C[this[i].jqmCacheId][t] && delete C[this[i].jqmCacheId][t]) : this[i].setAttribute(t, e);
                return this
            },
            removeAttr: function(t) {
                for (var e = this,
                n = 0; n < this.length; n++) t.split(/\s+/g).forEach(function(i) {
                    e[n].removeAttribute(i),
                    e[n].jqmCacheId && C[e[n].jqmCacheId][t] && delete C[e[n].jqmCacheId][t]
                });
                return this
            },
            prop: function(t, e) {
                if (0 === this.length) return w;
                if (e === w && !E.isObject(t)) {
                    var n, i = this[0].jqmCacheId && q[this[0].jqmCacheId][t] ? this[0].jqmCacheId && q[this[0].jqmCacheId][t] : !(n = this[0][t]) && t in this[0] ? this[0][t] : n;
                    return i
                }
                for (var o = 0; o < this.length; o++) if (E.isObject(t)) for (var r in t) E(this[o]).prop(r, t[r]);
                else E.isArray(e) || E.isObject(e) || E.isFunction(e) ? (this[o].jqmCacheId || (this[o].jqmCacheId = E.uuid()), q[this[o].jqmCacheId] || (q[this[o].jqmCacheId] = {}), q[this[o].jqmCacheId][t] = e) : null == e && e !== w ? E(this[o]).removeProp(t) : this[o][t] = e;
                return this
            },
            removeProp: function(t) {
                for (var e = this,
                n = 0; n < this.length; n++) t.split(/\s+/g).forEach(function(i) {
                    e[n][i] && delete e[n][i],
                    e[n].jqmCacheId && q[e[n].jqmCacheId][t] && delete q[e[n].jqmCacheId][t]
                });
                return this
            },
            remove: function(t) {
                var e = E(this).filter(t);
                if (e == w) return this;
                for (var n = 0; n < e.length; n++) E.cleanUpContent(e[n], !0, !0),
                e[n].parentNode.removeChild(e[n]);
                return this
            },
            addClass: function(t) {
                for (var e = 0; e < this.length; e++) {
                    var n = this[e].className,
                    i = [],
                    o = this;
                    t.split(/\s+/g).forEach(function(t) {
                        o.hasClass(t, o[e]) || i.push(t)
                    }),
                    this[e].className += (n ? " ": "") + i.join(" "),
                    this[e].className = this[e].className.trim()
                }
                return this
            },
            removeClass: function(t) {
                for (var e = 0; e < this.length; e++) {
                    if (t == w) return this[e].className = "",
                    this;
                    var i = this[e].className;
                    t.split(/\s+/g).forEach(function(t) {
                        i = i.replace(n(t), " ")
                    }),
                    this[e].className = i.length > 0 ? i.trim() : ""
                }
                return this
            },
            replaceClass: function(t, e) {
                for (var i = 0; i < this.length; i++) if (t != w) {
                    var o = this[i].className;
                    t.split(/\s+/g).concat(e.split(/\s+/g)).forEach(function(t) {
                        o = o.replace(n(t), " ")
                    }),
                    o = o.trim(),
                    this[i].className = o.length > 0 ? (o + " " + e).trim() : e
                } else this[i].className = e;
                return this
            },
            hasClass: function(t, e) {
                return 0 === this.length ? !1 : (e || (e = this[0]), n(t).test(e.className))
            },
            append: function(n, i) {
                if (n && n.length != w && 0 === n.length) return this; (E.isArray(n) || E.isObject(n)) && (n = E(n));
                var o;
                for (o = 0; o < this.length; o++) if (n.length && "string" != typeof n) n = E(n),
                e(n, this[o], i);
                else {
                    var r = j.test(n) ? E(n) : w; (r == w || 0 == r.length) && (r = y.createTextNode(n)),
                    r.nodeName == w || "script" != r.nodeName.toLowerCase() || r.type && "text/javascript" !== r.type.toLowerCase() ? r instanceof I ? e(r, this[o], i) : i != w ? this[o].insertBefore(r, this[o].firstChild) : this[o].appendChild(r) : t.eval(r.innerHTML)
                }
                return this
            },
            prepend: function(t) {
                return this.append(t, 1)
            },
            insertBefore: function(t, e) {
                if (0 == this.length) return this;
                if (t = E(t).get(0), !t || 0 == t.length) return this;
                for (var n = 0; n < this.length; n++) e ? t.parentNode.insertBefore(this[n], t.nextSibling) : t.parentNode.insertBefore(this[n], t);
                return this
            },
            insertAfter: function(t) {
                this.insertBefore(t, !0)
            },
            get: function(t) {
                return t = t == w ? 0 : t,
                0 > t && (t += this.length),
                this[t] ? this[t] : w
            },
            offset: function() {
                if (0 === this.length) return w;
                if (this[0] == t) return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: t.innerWidth,
                    height: t.innerHeight
                };
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + t.pageXOffset,
                    top: e.top + t.pageYOffset,
                    right: e.right + t.pageXOffset,
                    bottom: e.bottom + t.pageYOffset,
                    width: e.right - e.left,
                    height: e.bottom - e.top
                }
            },
            height: function() {
                return this.offset().height
            },
            width: function() {
                return this.offset().width
            },
            parent: function(t) {
                if (0 == this.length) return w;
                for (var e = [], n = 0; n < this.length; n++) this[n].parentNode && e.push(this[n].parentNode);
                return this.setupOld(E(i(e)).filter(t))
            },
            children: function(t) {
                if (0 == this.length) return w;
                for (var e = [], n = 0; n < this.length; n++) e = e.concat(o(this[n].firstChild));
                return this.setupOld(E(e).filter(t))
            },
            siblings: function(t) {
                if (0 == this.length) return w;
                for (var e = [], n = 0; n < this.length; n++) this[n].parentNode && (e = e.concat(o(this[n].parentNode.firstChild, this[n])));
                return this.setupOld(E(e).filter(t))
            },
            closest: function(t, e) {
                if (0 == this.length) return w;
                var n = this[0],
                i = E(t, e);
                if (0 == i.length) return E();
                for (; n && -1 == i.indexOf(n);) n = n !== e && n !== y && n.parentNode;
                return E(n)
            },
            filter: function(t) {
                if (0 == this.length) return w;
                if (t == w) return this;
                for (var e = [], n = 0; n < this.length; n++) {
                    var o = this[n];
                    o.parentNode && E(t, o.parentNode).indexOf(o) >= 0 && e.push(o)
                }
                return this.setupOld(E(i(e)))
            },
            not: function(t) {
                if (0 == this.length) return w;
                for (var e = [], n = 0; n < this.length; n++) {
                    var o = this[n];
                    o.parentNode && -1 == E(t, o.parentNode).indexOf(o) && e.push(o)
                }
                return this.setupOld(E(i(e)))
            },
            data: function(t, e) {
                return this.attr("data-" + t, e)
            },
            end: function() {
                return this.oldElement != w ? this.oldElement: E()
            },
            clone: function(t) {
                if (t = t === !1 ? !1 : !0, 0 == this.length) return w;
                for (var e = [], n = 0; n < this.length; n++) e.push(this[n].cloneNode(t));
                return E(e)
            },
            size: function() {
                return this.length
            },
            serialize: function(t) {
                if (0 == this.length) return "";
                for (var e = {},
                n = 0; n < this.length; n++) this.slice.call(this[n].elements).forEach(function(t) {
                    var n = t.getAttribute("type");
                    "fieldset" != t.nodeName.toLowerCase() && !t.disabled && "submit" != n && "reset" != n && "button" != n && ("radio" != n && "checkbox" != n || t.checked) && (e[t.getAttribute("name")] = t.value)
                });
                return E.param(e, t)
            }
        };
        var S = {
            type: "GET",
            beforeSend: s,
            success: s,
            error: s,
            complete: s,
            context: w,
            timeout: 0,
            crossDomain: !1
        };
        E.jsonP = function(e) {
            var n, i = "jsonp_callback" + ++k,
            o = "",
            r = y.createElement("script");
            return t[i] = function(a) {
                clearTimeout(o),
                E(r).remove(),
                delete t[i],
                e.success.call(n, a)
            },
            r.src = e.url.replace(/=\?/, "=" + i),
            e.error && (r.onerror = function() {
                clearTimeout(o),
                e.error.call(n, "", "error")
            }),
            E("head").append(r),
            e.timeout > 0 && (o = setTimeout(function() {
                e.error.call(n, "", "timeout")
            },
            e.timeout)),
            {}
        },
        E.ajax = function(e) {
            var n;
            try {
                var i = e || {};
                for (var o in S) i[o] || (i[o] = S[o]);
                if (i.url || (i.url = t.location), i.contentType || (i.contentType = "application/x-www-form-urlencoded"), i.headers || (i.headers = {}), "async" in i && i.async === !1 || (i.async = !0), i.dataType) switch (i.dataType) {
                case "script":
                    i.dataType = "text/javascript, application/javascript";
                    break;
                case "json":
                    i.dataType = "application/json";
                    break;
                case "xml":
                    i.dataType = "application/xml, text/xml";
                    break;
                case "html":
                    i.dataType = "text/html";
                    break;
                case "text":
                    i.dataType = "text/plain";
                    break;
                default:
                    i.dataType = "text/html";
                    break;
                case "jsonp":
                    return E.jsonP(e)
                } else i.dataType = "text/html";
                if (!E.isObject(i.data) || t.FormData && i.data instanceof FormData || (i.data = E.param(i.data)), "get" === i.type.toLowerCase() && i.data && (i.url += -1 === i.url.indexOf("?") ? "?" + i.data: "&" + i.data), /=\?/.test(i.url)) return E.jsonP(i);
                i.crossDomain || (i.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(i.url) && RegExp.$2 != t.location.host),
                i.crossDomain || (i.headers = E.extend({
                    "X-Requested-With": "XMLHttpRequest"
                },
                i.headers));
                var r, a = i.context,
                c = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1: t.location.protocol;
                n = new t.XMLHttpRequest,
                n.onreadystatechange = function() {
                    var t = i.dataType;
                    if (4 === n.readyState) {
                        clearTimeout(r);
                        var e, o = !1;
                        if (n.status >= 200 && n.status < 300 || 0 === n.status && "file:" == c) {
                            if ("application/json" !== t || /^\s*$/.test(n.responseText)) e = n.responseText;
                            else try {
                                e = JSON.parse(n.responseText)
                            } catch(s) {
                                o = s
                            }
                            0 === n.status && 0 === e.length && (o = !0),
                            o ? i.error.call(a, n, "parsererror", o) : i.success.call(a, e, "success", n)
                        } else o = !0,
                        i.error.call(a, n, "error");
                        i.complete.call(a, n, o ? "error": "success")
                    }
                },
                n.open(i.type, i.url, i.async),
                i.withCredentials && (n.withCredentials = !0),
                !i.contentType || t.FormData && i.data instanceof FormData || (i.headers["Content-Type"] = i.contentType);
                for (var l in i.headers) n.setRequestHeader(l, i.headers[l]);
                if (i.beforeSend.call(a, n, i) === !1) return n.abort(),
                !1;
                i.timeout > 0 && (r = setTimeout(function() {
                    n.onreadystatechange = s,
                    n.abort(),
                    i.error.call(a, n, "timeout"),
                    i.complete.call(a, n, "error")
                },
                i.timeout)),
                n.send(i.data)
            } catch(d) {
                console.log(d)
            }
            return n
        },
        E.get = function(t, e) {
            return this.ajax({
                url: t,
                success: e
            })
        },
        E.post = function(t, e, n, i) {
            return "function" == typeof e && (n = e, e = {}),
            i === w && (i = "html"),
            this.ajax({
                url: t,
                type: "POST",
                data: e,
                dataType: i,
                success: n
            })
        },
        E.getJSON = function(t, e, n) {
            return "function" == typeof e && (n = e, e = {}),
            this.ajax({
                url: t,
                data: e,
                success: n,
                dataType: "json"
            })
        },
        E.param = function(t, e) {
            var n = [];
            if (t instanceof I) t.each(function() {
                var t = e ? e + "[]": this.id,
                i = this.value;
                n.push(t + "=" + encodeURIComponent(i))
            });
            else for (var i in t) {
                var o = e ? e + "[" + i + "]": i,
                r = t[i];
                n.push(E.isObject(r) ? E.param(r, o) : o + "=" + encodeURIComponent(r))
            }
            return n.join("&")
        },
        E.parseJSON = function(t) {
            return JSON.parse(t)
        },
        E.parseXML = function(t) {
            return (new DOMParser).parseFromString(t, "text/xml")
        },
        c(E, navigator.userAgent),
        E.__detectUA = c,
        "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
            return this.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/, ""),
            this
        }),
        E.uuid = function() {
            var t = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        };
        var L = (E.qsa, {}),
        P = 1,
        A = {};
        E.event = {
            add: f,
            remove: m
        },
        E.fn.bind = function(t, e) {
            for (var n = 0; n < this.length; n++) f(this[n], t, e);
            return this
        },
        E.fn.unbind = function(t, e) {
            for (var n = 0; n < this.length; n++) m(this[n], t, e);
            return this
        },
        E.fn.one = function(t, e) {
            return this.each(function(n, i) {
                f(this, t, e, null,
                function(t, e) {
                    return function() {
                        var n = t.apply(i, arguments);
                        return m(i, e, t),
                        n
                    }
                })
            })
        };
        var D = function() {
            return ! 0
        },
        O = function() {
            return ! 1
        },
        M = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        E.fn.delegate = function(t, e, n) {
            for (var i = 0; i < this.length; i++) {
                var o = this[i];
                f(o, e, n, t,
                function(e) {
                    return function(n) {
                        var i, r = E(n.target).closest(t, o).get(0);
                        return r ? (i = E.extend(g(n), {
                            currentTarget: r,
                            liveFired: o
                        }), e.apply(r, [i].concat([].slice.call(arguments, 1)))) : void 0
                    }
                })
            }
            return this
        },
        E.fn.undelegate = function(t, e, n) {
            for (var i = 0; i < this.length; i++) m(this[i], e, n, t);
            return this
        },
        E.fn.on = function(t, e, n) {
            return e === w || E.isFunction(e) ? this.bind(t, e) : this.delegate(e, t, n)
        },
        E.fn.off = function(t, e, n) {
            return e === w || E.isFunction(e) ? this.unbind(t, e) : this.undelegate(e, t, n)
        },
        E.fn.trigger = function(t, e, n) {
            "string" == typeof t && (t = E.Event(t, n)),
            t.data = e;
            for (var i = 0; i < this.length; i++) this[i].dispatchEvent(t);
            return this
        },
        E.Event = function(t, e) {
            var n = y.createEvent(A[t] || "Events"),
            i = !0;
            if (e) for (var o in e)"bubbles" == o ? i = !!e[o] : n[o] = e[o];
            return n.initEvent(t, i, !0, null, null, null, null, null, null, null, null, null, null, null, null),
            n
        },
        E.bind = function(t, e, n) {
            t.__events || (t.__events = {}),
            E.isArray(e) || (e = [e]);
            for (var i = 0; i < e.length; i++) t.__events[e[i]] || (t.__events[e[i]] = []),
            t.__events[e[i]].push(n)
        },
        E.trigger = function(t, e, n) {
            var i = !0;
            if (!t.__events) return i;
            E.isArray(e) || (e = [e]),
            E.isArray(n) || (n = []);
            for (var o = 0; o < e.length; o++) if (t.__events[e[o]]) for (var r = t.__events[e[o]], a = 0; a < r.length; a++) E.isFunction(r[a]) && r[a].apply(t, n) === !1 && (i = !1);
            return i
        },
        E.unbind = function(t, e, n) {
            if (!t.__events) return ret;
            E.isArray(e) || (e = [e]);
            for (var i = 0; i < e.length; i++) if (t.__events[e[i]]) for (var o = t.__events[e[i]], r = 0; r < o.length; r++) if (n == w && delete o[r], o[r] == n) {
                o.splice(r, 1);
                break
            }
        },
        E.proxy = function(t, e, n) {
            return function() {
                return n ? t.apply(e, n) : t.apply(e, arguments)
            }
        };
        var N = function(t, e) {
            for (var n = 0; n < t.length; n++) b(t[n], e)
        };
        E.cleanUpContent = function(t, e, n) {
            if (t) {
                var i = t.childNodes;
                i && i.length > 0 && E.asap(N, {},
                [x.apply(i, [0]), n]),
                e && v(t, n)
            }
        };
        var F = [],
        U = [],
        R = [];
        return E.asap = function(e, n, i) {
            if (!E.isFunction(e)) throw "$.asap - argument is not a valid function";
            F.push(e),
            U.push(n ? n: {}),
            R.push(i ? i: []),
            t.postMessage("jqm-asap", "*")
        },
        t.addEventListener("message",
        function(e) {
            e.source == t && "jqm-asap" == e.data && (e.stopPropagation(), F.length > 0 && F.shift().apply(U.shift(), R.shift()))
        },
        !0),
        E
    } (window);
    "$" in window || (window.$ = jq),
    window.numOnly || (window.numOnly = function(t) {
        if (void 0 === t || "" === t) return 0;
        if (isNaN(parseFloat(t))) {
            if (!t.replace) return 0;
            t = t.replace(/[^0-9.-]/, "")
        }
        return parseFloat(t)
    })
}
define && define("jqmobi", [],
function() {
    return console.log("jqmobi"),
    $
}),
define("slide", [],
function() {
    var t = "ontouchstart" in window,
    e = t ? "touchstart": "mousedown",
    n = t ? "touchmove": "mousemove",
    i = t ? "touchend": "mouseup",
    o = t ? "touchcancel": "mouseup";
    return bannerScroll = function(t) {
        var e = this;
        for (var n in t) e[n] = t[n]
    },
    bannerScroll.prototype = {
        handleEvent: function(r) {
            var a = this;
            switch (r.type) {
            case e:
                if (!t && 0 !== r.button) return;
                a.__start(r);
                break;
            case n:
                a.__move(r);
                break;
            case i:
            case o:
                a.__end(r)
            }
        },
        VALID_DISTANCE: 50,
        DEFAULT_DURATION: 400,
        DIRECTION_CLICK: "click",
        DIRECTION_LEFT: "left",
        DIRECTION_RIGHT: "right",
        __validation: !0,
        __startPoint: null,
        __startTransformPoint: null,
        __currentIndex: null,
        __banner: null,
        __sliding: !1,
        __bind: function(t, e, n) {
            var i = this,
            o = e || document;
            o.addEventListener(t, i, !!n)
        },
        __unbind: function(t, e, n) {
            var i = this,
            o = e || document;
            o.removeEventListener(t, i, !!n)
        },
        __start: function(e) {
            var r = this;
            r.__startPointTime = (new Date).getTime(),
            r.__startPoint = {
                x: t ? e.touches[0].pageX: event.pageX,
                y: t ? e.touches[0].pageY: event.pageY
            },
            r.__startTransformPoint = r.__getTransformPosition(),
            r.__bind(n, r.banner),
            r.__bind(i, r.banner),
            r.__bind(o, r.banner)
        },
        __move: function(e) {
            var n = this,
            i = {
                x: t ? e.touches[0].pageX: event.pageX,
                y: t ? e.touches[0].pageY: event.pageY
            };
            n.__sliding = n.__isSlide(i, n.__startPoint),
            n.__sliding && (n.__setTransformPosition(n.banner, {
                x: i.x - n.__startPoint.x + n.__startTransformPoint.x,
                y: 0,
                z: 0
            },
            0), e.preventDefault())
        },
        __end: function(e) {
            var r = this,
            a = (new Date).getTime(),
            s = {
                x: t ? e.changedTouches[0].pageX: event.pageX,
                y: t ? e.changedTouches[0].pageY: event.pageY
            },
            c = r.__startPoint.x - s.x,
            l = r.__getDirection(r.__startPoint.x - s.x);
            r.__timeDistance = a - r.__startPointTime,
            r.isPaging && Math.abs(c) <= r.VALID_DISTANCE && l != r.DIRECTION_CLICK ? r.__setTransformPosition(r.banner, r.__startTransformPoint, r.DEFAULT_DURATION) : l == r.DIRECTION_CLICK ? r.onClick && r.onClick.call(this, e) : l == r.DIRECTION_LEFT ? r.next() : l == r.DIRECTION_RIGHT && r.previous(),
            r.__startPoint = null,
            r.__startTransformPoint = null,
            r.__unbind(n, r.banner),
            r.__unbind(i, r.banner),
            r.__unbind(o, r.banner),
            r.__sliding = !1
        },
        __isSlide: function(t, e) {
            return Math.abs(e.x - t.x) > Math.abs(e.y - t.y) ? !0 : !1
        },
        __getDirection: function(t) {
            var e = this;
            return 0 == t || t > 0 && 5 > t ? e.DIRECTION_CLICK: t > 0 ? e.DIRECTION_LEFT: 0 > t ? e.DIRECTION_RIGHT: void 0
        },
        __getTransformPosition: function() {
            var t = this,
            e = t.banner.style.webkitTransform;
            return e = e.replace("translate3d(", ""),
            e = e.substr(0, e.indexOf(")")),
            e = e.split(","),
            {
                x: e[0] ? parseInt(e[0]) : 0,
                y: e[1] ? parseInt(e[1]) : 0,
                z: e[2] ? parseInt(e[2]) : 0
            }
        },
        __setTransformPosition: function(t, e, n) {
            t && (t.style.webkitTransform = "translate3d(" + e.x + "px, " + e.y + "px, " + e.z + "px)", t.style.webkitTransitionDuration = n + "ms")
        },
        unit: 320,
        initPosition: {
            x: 0,
            y: 0,
            z: 0
        },
        number: 0,
        width: 0,
        isPaging: !0,
        banner: null,
        onClick: null,
        onPrevious: null,
        onNext: null,
        onLoad: null,
        getCurrentIndex: function() {
            var t = this;
            return t.__currentIndex
        },
        go: function(t) {
            var e = this,
            n = e.DEFAULT_DURATION;
            t < e.number ? e.__currentIndex = t: 0 > t && (t = 0);
            var i = e.unit * t * -1;
            e.__setTransformPosition(e.banner, {
                x: i,
                y: 0,
                z: 0
            },
            n),
            e.onSlide && e.onSlide.call(this, e.__currentIndex)
        },
        next: function() {
            var t, e, n = this,
            i = n.__getTransformPosition(),
            o = n.DEFAULT_DURATION;
            n.isPaging ? (e = (n.number - 1) * n.unit * -1, t = i.x <= e ? e: i.x % n.unit != 0 ? Math.floor(i.x / n.unit) * n.unit: i.x - n.unit, n.__currentIndex = Math.abs(t / n.unit)) : (e = -1 * n.width, t = i.x <= e ? e: i.x, t = n.__timeDistance <= 300 ? t - 200 : t, t = e >= t ? e: t),
            n.__setTransformPosition(n.banner, {
                x: t,
                y: 0,
                z: 0
            },
            o),
            n.onSlide && n.onSlide.call(this, n.__currentIndex),
            n.onNext && n.onNext.call(this, n.__currentIndex)
        },
        previous: function() {
            var t = this,
            e = t.__getTransformPosition(),
            n = 0,
            i = t.DEFAULT_DURATION;
            t.isPaging ? (x = e.x >= n ? n: e.x % t.unit != 0 ? Math.ceil(e.x / t.unit) * t.unit: e.x + t.unit, t.__currentIndex = Math.abs(x / t.unit)) : (x = e.x >= n ? n: e.x, x = t.__timeDistance <= 300 ? x + 200 : x, x = x >= n ? n: x),
            t.__setTransformPosition(t.banner, {
                x: x,
                y: 0,
                z: 0
            },
            i),
            t.onSlide && t.onSlide.call(this, t.__currentIndex),
            t.onPrevious && t.onPrevious.call(this, t.__currentIndex)
        },
        startup: function() {
            var t = this;
            return t.__setTransformPosition(t.banner, t.initPosition, t.DEFAULT_DURATION),
            t.__bind(e, t.banner),
            t.onLoad && t.onLoad.call(this),
            t
        },
        destroy: function() {
            var t = this;
            t.__startPoint = {
                x: null,
                y: null
            },
            t.__unbind(e, t.banner),
            t.__unbind(n, t.banner),
            t.__unbind(i, t.banner),
            t.__unbind(o, t.banner),
            t.banner = null,
            t.onClick = null,
            t.onPrevious = null,
            t.onNext = null,
            t.onSlide = null
        }
    },
    bannerScroll
}),
define("videoMod", ["jqmobi", "loginMod"],
function(t, e) {
    function n(t) {
        this.isplay = t.isplay || !0,
        this.index = 0,
        this.obj = t.obj,
        this.data = t.data,
        this.videoClientAdUrl = t.videoClientAdUrl || "",
        this.isShowAds = t.isShowAds || !1,
        this.cb = t.cb,
        this.isStatic = !1,
        this.init()
    } {
        var i = navigator.userAgent,
        o = i.match(/Windows NT/) ? !0 : !1;
        i.match(/MQQBrowser/) ? !0 : !1
    }
    if (o) var r = "500px";
    else {
        var r = window.innerWidth - 24 + "px";
        window.innerWidth > window.innerHeight && (r = window.innerWidth - 90 + "px")
    }
    t.os.ios ? !0 : !1;
    return n.prototype = {
        init: function() {
            this.player = new tvp.Player,
            this.videoObj = new tvp.VideoInfo,
            this.createdPlayer = !1,
            this.isAutoPlay = !1
        },
        setAutoPlay: function(t) {
            this.isAutoPlay = t
        },
        listPlay: function(t) {
            this.isAutoPlay = t.isAutoPlay || !1,
            this.setPlayList(t.list),
            this.index = t.index || 0;
            var e = this.playList[this.index];
            this.fetch(e.vid)
        },
        siglePlay: function(t) {
            this.setPlayList([]),
            this.isAutoPlay = t.isAutoPlay || !1,
            this.index = 0,
            this.fetch(t.vid)
        },
        fetch: function(n) {
            this.isStatic = !1,
            this.vid = n;
            var i = this.isAutoPlay;
            "undefined" != typeof n ? this.vid = n: this.playList.length > 0 && (this.vid = this.playList[0].vid);
            var o = this;
            o.videoObj.setVid(o.vid),
            o.videoObj.setTagStart(0),
            o.createdPlayer = !0,
            o.player.create({
                width: r,
                height: 160,
                video: o.videoObj,
                modId: o.obj,
                autoplay: !1,
                pic: o.data.img,
                onerror: function() {},
                onchange: function() {},
                oninited: function() {},
                onchange: function() {
                    o.player.pause()
                },
                onallended: function() {},
                onplaying: function() {
                    var n = {
                        type: "POST",
                        url: "/g/s?aid=news_js",
                        data: {
                            sid: e.getSid(),
                            mst: "9",
                            ac: "0",
                            i_f: 360,
                            logType: "2",
                            vid: o.vid,
                            articleId: article_page.nid
                        }
                    };
                    t.ajax(n)
                },
                isHtml5UseUI: !1,
                isHtml5UseAirPlay: !0
            }),
            o.player.setCurVideo(o.videoObj),
            o.player.addParam("pic", o.data.img),
            o.player.addParam("autoplay", i),
            o.player.write(o.obj),
            i && o.player && o.player.play(o.videoObj),
            o._renderHandle(o.data)
        },
        _renderHandle: function(t) {
            t.img,
            t.videoType
        },
        log: function() {},
        setPlayList: function(t) {
            this.playList = t
        },
        setVid: function(t) {
            this.vid = t
        },
        getVid: function() {
            return this.vid
        },
        setCid: function(t) {
            this.cid = t
        },
        reset: function() {},
        pause: function() {
            this.player.pause()
        },
        play: function() {
            this.player && this.player.play()
        }
    },
    window.addEventListener("resize",
    function() {
        o || (window.innerWidth > window.innerHeight ? t("video").css("width", window.innerWidth - 90 + "px") : t("video").css("width", window.innerWidth - 26 + "px"))
    }),
    {
        creat: function(t) {
            return new n(t)
        }
    }
}),
define("msgMod", ["jqmobi"],
function(t) {
    var e = {
        _events: {},
        _isFunction: function(t) {
            return "[object Function]" == Object.prototype.toString.call(t)
        },
        notify: function(e, n, i) {
            var o, r, a = this._events;
            if (1 == arguments.length && (n = e, e = null), 2 == arguments.length && (i = n, n = e, e = null), e) r = a[e],
            r && t.trigger(r, n, i);
            else for (o in a) a.hasOwnProperty(o) && t.trigger(a[o], n, i)
        },
        listen: function(e, n, i) {
            var o, r = this._events;
            if (2 == arguments.length && (i = n, n = e, e = "__global__"), o = r[e] = r[e] || {},
            !this._isFunction(i)) throw "msg.listen : cb is not a function!";
            t.bind(o, n, i)
        }
    };
    return e
}),
define("tipsModule", ["jqmobi"],
function(t) {
    var e = {
        create: function() {
            var e = '<div class="txt-tips" id="commentTip" style="-webkit-transition: top 0.2s linear; transition: top 0.2s linear;-webkit-transform: translateZ(0); /* top: -36px; */">';
            return e += '<div id="div_commenttype" class="seccess-tips">',
            e += '<span id="sp_commentmsg">设置成功</span>',
            e += "</div></div>",
            0 == t("#commentTip").length && t("body").append(e),
            t("#commentTip")
        },
        getTip: function() {
            return this.tipNode || (this.tipNode = this.create()),
            this.tipNode
        },
        showTip: function(e, n, i, o, r) {
            var a, s = this,
            c = this.getTip();
            c.html("error" == i ? '<div class="error-tips"><span>' + e + "</span></div>": '<div class="seccess-tips"><span>' + e + "</span></div>");
            var l = document.body.scrollTop + document.documentElement.scrollTop;
            t("#commentTip").show().css("top", l + "px"),
            n && (a = setTimeout(function() {
                s.hiddenTip()
            },
            o || 2500)),
            this._moveHide(r)
        },
        hiddenTip: function() {
            this.getTip().css("top", "-36px").hide()
        },
        _moveHide: function(e) {
            var n = this;
            e && t(document.body).one("touchmove",
            function() {
                clearTimeout(timer),
                setTimeout(function() {
                    n.hiddenTip()
                },
                100)
            })
        },
        setPosition: function(t, e, n) {
            var i, o = this,
            r = document.body.scrollTop + document.documentElement.scrollTop,
            a = this.getTip();
            a.css("top", r + "px"),
            t && (i = setTimeout(function() {
                o.hiddenTip()
            },
            n || 2500)),
            this._moveHide(e)
        },
        showTipByHtml: function(t, e, n, i) {
            var o = this.getTip();
            o.html(t),
            this.setPosition(e, i, n)
        }
    };
    return e
}),
define("loadUtil", [],
function() {
    var t = {};
    return t.load = function() {
        return {
            loadScript: function(t, e) {
                try {
                    t = t instanceof Array ? t: [t],
                    e = e instanceof Array ? e: [e];
                    var n = document.getElementsByTagName("head")[0],
                    i = document.createDocumentFragment(),
                    o = [],
                    r = function(t, e) {
                        o[t] = document.createElement("script"),
                        o[t].src = e,
                        o[t].type = "text/javascript",
                        i.appendChild(o[t])
                    };
                    $.each(t, r),
                    n.appendChild(i);
                    var a = function(t, e) {
                        "function" == typeof e && (o[t].onreadystatechange = function() { ("complete" == o[t].readyState || "loaded" == o[t].readyState) && e()
                        },
                        o[t].onload = function() {
                            e()
                        },
                        o[t].onerror = function() {
                            this.onload = this.onerror = null,
                            this.parentNode.removeChild(this)
                        })
                    };
                    $.each(e, a)
                } catch(s) {
                    console.error("Warning:There is error on load javascript file!")
                }
            },
            loadCss: function(t) {
                if (t) {
                    var e = document.createDocumentFragment(),
                    n = document.createElement("link");
                    n.async = !0,
                    n.rel = "stylesheet",
                    n.href = t,
                    n.type = "text/css",
                    e.appendChild(n),
                    document.getElementsByTagName("head")[0].appendChild(e)
                }
            }
        }
    } (),
    t
}),
define("loginMod", ["jqmobi", "msgMod", "loadUtil"],
function($, msg, loadUtil) {
    if (document.domain = "qq.com", console.log("login init"), "undefined" != typeof isSwitchNewLogin && isSwitchNewLogin) {
        var _sid = "00",
        loginObj = {},
        _islogin = !1,
        _uid = "",
        _nickname = "",
        _head = "",
        ptLogin = function() {
            var ifram_src_param = "",
            ptlogin_iframe = null,
            ptlogin_shadow = null,
            queueObj = {
                login: {
                    arrKeys: [],
                    queue: {}
                },
                logout: {
                    arrKeys: [],
                    queue: {}
                }
            },
            callbackObj = {},
            isLoadedLogoutJs = !1,
            ajaxDataMsg = {
                login: {},
                logout: -1
            },
            loginCb,
            isLogin = !1,
            T = {
                getTopHeight: function() {
                    return document.body.scrollTop + (window.innerHeight > 270 ? (window.innerHeight - 270) / 2 : 0)
                },
                showLoginBox: function() {
                    ptlogin_shadow.style.cssText += "display:block;width:100%;height:100%;",
                    ptlogin_iframe.style.cssText += "transition: 0;",
                    ptlogin_iframe.style.cssText += "top:" + T.getTopHeight() + "px;",
                    ptlogin_iframe.style.cssText += "display:block; visibility:hidden;opacity: 0;transition: opacity 200ms;",
                    setTimeout(function() {
                        ptlogin_iframe.style.cssText += "opacity:1;visibility:visible;"
                    },
                    200)
                },
                closeLoginBox: function() {
                    ptlogin_shadow.style.display = "none",
                    ptlogin_iframe.style.display = "none"
                },
                addQueueFunc: function(t, e) {
                    var n, i, o = e.toString(); ("login" == t || "logout" == t) && (n = queueObj[t].queue, i = queueObj[t].arrKeys, n[o] && -1 != this.getIndexInArray(o, i) || (i.push(o), n[o] = e))
                },
                removeQueueFunc: function(t, e) {
                    var n, i, o = e.toString(); ("login" == t || "logout" == t) && (n = queueObj[t].queue, i = queueObj[t].arrKeys, i.splice(this.getIndexInArray(o, i), 1), delete n[o])
                },
                doQueueFunc: function(t, e) {
                    var n, i;
                    if ("login" == t || "logout" == t) {
                        isLogin = "login" == t ? !0 : !1,
                        ajaxDataMsg[t] = e,
                        n = queueObj[t].queue,
                        i = queueObj[t].arrKeys;
                        for (var o = 0,
                        r = i.length; r > o; o++) n[i[o]](e)
                    }
                },
                getAjaxData: function(t) {
                    return "login" != t && "logout" != t ? "": ajaxDataMsg[t]
                },
                getIndexInArray: function(t, e) {
                    if (e.indexOf) return e.indexOf(t);
                    for (var n = 0,
                    i = e.length; i > n; n++) if (e[n] === t) return n;
                    return - 1
                },
                objToStr: function(t, e) {
                    var n, i, o = "";
                    for (n in t)"undefined" != typeof t[n] && (i = e ? encodeURIComponent(t[n]) : t[n], o += n + "=" + i + "&");
                    return o.slice(0, o.length - 1)
                },
                getScript: function(t, e, n) {
                    var i = document.createElement("script");
                    i.language = "javascript",
                    i.type = "text/javascript",
                    n && (i.charset = n),
                    i.onload = i.onreadystatechange = function() {
                        this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (e && e(), i.onload = i.onreadystatechange = null, i.parentNode.removeChild(i))
                    },
                    i.src = t,
                    document.getElementsByTagName("head")[0].appendChild(i)
                },
                randomString: function(t) {
                    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
                    t || (t = Math.floor(Math.random() * e.length));
                    for (var n = "",
                    i = 0; t > i; i++) n += e[Math.floor(Math.random() * e.length)];
                    return n
                },
                set_iframe_src: function(t) {
                    var e = navigator.userAgent || "",
                    n = ""; - 1 != e.indexOf("MQQBrowserLightApp") && (n = "&pt_no_onekey=1");
                    var i = encodeURIComponent(t),
                    o = "http://ui.ptlogin2.qq.com",
                    r = o + "/cgi-bin/login?style=38&appid=728041403&s_url=" + i + "&target=self&low_login=1&low_login_hour=4321&daid=" + (location.host.indexOf("3g.qq.com") > -1 ? 261 : 287) + ifram_src_param + n;
                    ptlogin_iframe.setAttribute("src", r)
                }
            };
            return document.body.appendChild(function(proxy_url) {
                var fragment = document.createDocumentFragment(),
                hidden_iframe = document.createElement("iframe");
                hidden_iframe.id = "ptlogin_iframe",
                hidden_iframe.setAttribute("frameborder", "0"),
                hidden_iframe.setAttribute("scrolling", "no"),
                hidden_iframe.style.cssText = "display:none;z-index:9999;position:absolute;left:50%;top:50%;margin:0px 0 0 -140px;height:270px;width:280px;background:transparent;";
                var shadow_div = document.createElement("div");
                return shadow_div.id = "ptlogin_shadow",
                shadow_div.style.cssText += "display:none;z-index:9998;position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.7;",
                fragment.appendChild(hidden_iframe),
                fragment.appendChild(shadow_div),
                ptlogin_iframe = hidden_iframe,
                ptlogin_shadow = shadow_div,
                window.addEventListener("message",
                function(event) {
                    if (event && "jqm-asap" != event.data) {
                        if (event.origin.indexOf("3g.qq.com") > -1) try {
                            var data = eval("(" + event.data + ")"),
                            args = data.JSP || {},
                            callback = data.callback || "";
                            "login" == data.action && (T.closeLoginBox(), loginCb && loginCb(args), ptLogin.doQueueFunc("login", args))
                        } catch(e) {}
                        if (event.origin.indexOf("ui.ptlogin2.qq.com") > -1) try {
                            var data = eval("(" + event.data + ")");
                            "close" == data.action ? (T.closeLoginBox(), msg && msg.notify("logincacel", [])) : "resize" == data.action
                        } catch(e) {}
                    }
                },
                !0),
                window.addEventListener("orientationchange",
                function() {
                    "none" != ptlogin_iframe.style.display && (ptlogin_iframe.style.cssText += "top:" + T.getTopHeight() + "px;", setTimeout(function() {
                        ptlogin_iframe.style.cssText += "top:" + T.getTopHeight() + "px;"
                    },
                    500))
                },
                !1),
                fragment
            } ()),
            {
                init: function(t) {
                    var e = T.objToStr(t);
                    ifram_src_param = e ? "&" + e: "",
                    t && t.isLogin && (isLogin = !0)
                },
                doQueueFunc: function(t, e, n) {
                    T.doQueueFunc(t, e, n)
                },
                getData: function(t) {
                    return T.getAjaxData(t)
                },
                isLogin: function() {
                    return isLogin
                },
                bind: function(t, e) {
                    T.addQueueFunc(t, e)
                },
                login: function(t) {
                    var t = "function" == typeof t ? t: function() {};
                    loginCb = t,
                    T.set_iframe_src("http://infoapp.3g.qq.com/g/login/proxy.jsp?sourceUrl=" + encodeURIComponent(encodeURIComponent(location.href))),
                    T.showLoginBox()
                },
                logout: function(t) {
                    var e = function() {
                        pt_logout.logout(function(e) {
                            T.doQueueFunc("logout", e),
                            t && t(e)
                        })
                    };
                    isLoadedLogoutJs ? e() : T.getScript("http://imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js",
                    function() {
                        isLoadedLogoutJs = !0,
                        e()
                    },
                    "utf-8")
                }
            }
        } ();
        return $.extend(loginObj, {
            init: function(t) {
                _sid = t.sid,
                _islogin = t.islogin,
                _uid = t.uid || "",
                _nickname = t.nickname || "",
                ptLogin.init(t)
            },
            getSid: function() {
                return _sid
            },
            getUid: function() {
                return _uid
            },
            getNickName: function() {
                return _nickname
            },
            getHead: function() {
                return _head
            },
            loginOut: function(t) {
                ptLogin.logout(function(e) {
                    if (2 == e) if (msg && msg.notify("loginout", []), _sid = "", _islogin = !1, _uid = "", _nickname = "", $.isFunction(t) && t(), $.isFunction(history.replaceState)) {
                        var n = location.protocol + "//" + location.host + location.pathname,
                        i = "",
                        o = location.search,
                        r = /[?&]sid=[^&#]*/g;
                        i = r.test(o) ? o.replace(/([?&])sid=[^&#]*/g, "$1sid=") : o,
                        i = n + i + location.hash,
                        window.history.replaceState(null, document.title, i),
                        location.reload()
                    } else {
                        var a = window.location.href.replace(/([&\?])sid=[^&#]*/g, "$1sid=");
                        location.href = a
                    } else console.log("status=" + e)
                })
            },
            isLogin: function() {
                return _islogin
            },
            login: function(t) {
                return _islogin ? void(t && t()) : void ptLogin.login(function(e) {
                    _uid = e.uin,
                    _nickname = e.nick,
                    _islogin = e.isLogin,
                    _head = e.head,
                    msg && msg.notify("loginok", [{
                        uin: _uid,
                        nick: _nickname,
                        sid: _sid
                    }]),
                    t && t()
                })
            },
            qqBrowserPushMsg: function(t, e, n, i) {
                try {
                    if (window.isFromQQBrower && "undefined" != typeof x5 && "undefined" != typeof x5.app) {
                        if ("function" != typeof n) var n = function(t) {
                            try {
                                localStorage.setItem("qbtokenFeature", "1")
                            } catch(e) {}
                            console.log("success ! doTokenFeature callback:\n=====>rCode:" + t.rCode)
                        };
                        "" == t ? tokenFeature("", "", n) : tokenFeature(t, i + "_" + t, n)
                    }
                } catch(o) {
                    alert(o)
                }
            },
            reLogin: function(t) {
                ptLogin.login(function() {
                    t && t()
                })
            }
        }),
        loginObj
    }
    var delCookie = function(t, e, n) {
        document.cookie = t + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (n ? n: "/") + "; " + (e ? "domain=" + e + ";": "")
    },
    loginMod = function() {
        function t() {
            pt.init({
                auto: !1,
                ui: !0,
                bid: "info",
                acctHolder: "请输入QQ号",
                pwdHolder: "请输入QQ密码",
                mainTitle: "腾讯统一登录",
                onSuccess: function(t) {
                    f(t)
                },
                onFailure: function() {},
                onCancel: function() {}
            }),
            t = function() {}
        }
        function e(t) {
            s = t.sid,
            c = t.islogin,
            l = t.uid || "",
            d = t.nickname || "",
            loadUtil.load.loadCss("http://3glogo.gtimg.com/wap30/info/info5/css/ptlogin_info.css")
        }
        function n(t) {
            pt.load(t)
        }
        function i(t, e, n, i) {
            try {
                if (window.isFromQQBrower && "undefined" != typeof x5 && "undefined" != typeof x5.app) {
                    if ("function" != typeof n) var n = function(t) {
                        try {
                            localStorage.setItem("qbtokenFeature", "1")
                        } catch(e) {}
                        console.log("success ! doTokenFeature callback:\n=====>rCode:" + t.rCode)
                    };
                    "" == t ? tokenFeature("", "", n) : tokenFeature(t, i + "_" + t, n)
                }
            } catch(o) {
                alert(o)
            }
        }
        function o() {
            t(),
            pt.fire({
                ui: !0
            })
        }
        function r(t) {
            h || (h = !0, loadUtil.load.loadScript("http://3gimg.qq.com/ptlogin/touch/js/ptlogin.js",
            function() {
                h = !1,
                u = !0,
                t && t()
            }))
        }
        function a(t) {
            p = t ||
            function() {},
            c ? p.call(null) : u ? o() : r(o)
        }
        var s = "00",
        c = !1,
        l = "",
        d = "",
        u = !1,
        h = !1,
        p = function() {},
        f = function(t) {
            if (s = t.sid, l = t.uin, d = t.nick, c = !0, msg && msg.notify("loginok", [t]), p(t), $.isFunction(history.replaceState)) {
                var e = location.protocol + "//" + location.host + location.pathname,
                n = "",
                i = location.search;
                if ("" == i) n = i + "?sid=" + s;
                else {
                    var o = /[?&]sid=[^&#]*/g;
                    n = o.test(i) ? i.replace(/([?&])sid=[^&#]*/g, "$1sid=" + s) : i + "&sid=" + s
                }
                n = e + n + location.hash,
                window.history.replaceState(null, document.title, n)
            }
        };
        return {
            init: e,
            login: a,
            ptLoad: n,
            qqBrowserPushMsg: i,
            isLogin: function() {
                return c
            },
            setStatus: function(t) {
                c = !!t
            },
            getSid: function() {
                return s
            },
            getNickName: function() {
                return d
            },
            getUid: function() {
                return l
            },
            reLogin: function(t) {
                c = !1,
                this.login(t)
            },
            loginOut: function(t) {
                msg.notify("loginout", []),
                delCookie("p_uin", "3g.qq.com"),
                delCookie("p_skey", "3g.qq.com"),
                delCookie("p_luin", "3g.qq.com"),
                delCookie("p_lskey", "3g.qq.com"),
                delCookie("pt4_token", "3g.qq.com"),
                delCookie("pt_mbkey", "3g.qq.com"),
                delCookie("uin_m", "3g.qq.com"),
                delCookie("skey_m", "3g.qq.com"),
                delCookie("skey", "qq.com");
                var e = document.createElement("IFRAME"),
                n = window.location.href.replace(/([&\?])sid=[^&#]*/g, "$1sid="),
                t = t || n;
                e.id = "ifr01",
                e.name = "ifr01",
                e.style.position = "absolute",
                e.style.top = "-9999px",
                e.style.left = "-9999px",
                e.style.display = "none",
                e.src = "http://pt.3g.qq.com/s?aid=nLogout&sid=" + s + "&redir_url=" + t,
                document.body.appendChild(e),
                setTimeout(function() {
                    window.location.href = t
                },
                1e3)
            }
        }
    } ();
    return loginMod
}),
define("popDialog", ["jqmobi"],
function(t) {
    var e = '.pop-layer{position:absolute;width:100%;height:100%;background-color:black;opacity:.5;top:0;left:0;z-index:999;}.pop-layer{display:none;position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0.4);top:45px;left:0;z-index:98;}.pop-window{font-family: "\\5FAE\\8F6F\\96C5\\9ED1","微软雅黑",helvetica,arial;background-color:white;border:1px solid white;-webkit-border-radius:5px;position:absolute;top:20%;left:50%;margin-left:-45%;min-width:288px;width:90%;z-index:1000;}.pop-window a{text-decoration: none;}.pop-window .pop-title{background-color:#eaeaea;-webkit-background-clip:content-box;border-bottom:1px solid #d1d1d1;-webkit-box-shadow:0 1px 2px #d1d1d1;height:42px;line-height:42px;padding:1px;position:relative;text-align:center;}.pop-window .pop-title h3{margin:0;color:#888;font-size:14px;position:relative;}.pop-window .share-tit::before{content:"";display:inline-block;height:20px;width:20px;vertical-align:-4px;}.pop-window .for-mb::before{background-position:-186px -140px;}.pop-window .for-sina::before{background-position:-239px -140px;margin-right:4px;}.pop-window .for-qz::before{background-position:-213px -140px;}.pop-window .for-qq::before{background-position:-270px -140px;}.pop-window .pop-title .btn{position:absolute;top:8px;}.pop-window .btn{background:-webkit-gradient(linear,left top,left bottom,from(#95acc5),to(#7992af));border:1px solid #7992af;-webkit-border-radius:2px;color:white;display:inline-block;height:26px;line-height:26px;padding:0 10px;-webkit-box-shadow:0 1px 0 white;font-size:14px;}.pop-window .pop-title .close-btn{left:8px;}.pop-window .pop-title .send-btn{background:#4083ce;border-color:#2f74c1;right:8px;}.pop-window .pop-cont .textarea{padding:8px;background:0;border:0 none;-webkit-border-radius:0;}.pop-window .pop-cont .textarea textarea{-webkit-appearance:caret;border:0 none;color:#010000;font-size:14px;padding:0;width:100%;height:124px;}.pop-window .wb-dialog-bar{border-top:1px solid #eee;color:#888;padding:12px 8px;position:relative;overflow:hidden;}.pop-window .wb-dialog-num{text-align:right;font-size:14px;}.pop-window .wb-dialog-num strong{color:black;margin:0 3px;}',
    n = !1,
    i = function(t) {
        this.defualtText = "请在此输入您的观点...",
        this.option = {
            btntxt: "分享",
            html: null,
            cssText: t ? t.cssText: e,
            content: "请在此输入您的观点...",
            postFunc: null,
            maxTextNum: 100,
            top: 0,
            left: "50%"
        }
    };
    return i.prototype = {
        _init: function() {
            n = !0;
            var e = this;
            e._setId();
            var i = "<style>" + this.option.cssText + '</style><div id="div_xll_pop_layer' + this.id + '" class="pop-layer" style="display:none;"></div>';
            t("body").append(i);
            var o = '<div class="pop-window" id="pop-window' + this.id + '" style="display:none;"><div class="pop-title"><a href="javascript:void(0);" class="btn close-btn" style="z-index:1;">关闭</a><span class="title"><%=html%></span><a href="javascript:void(0);" class="btn send-btn"><%=btntxt%></a></div><div class="pop-cont">   <div class="textarea">       <textarea>' + this.defualtText + '</textarea>   </div>   <div class="wb-dialog-bar">       <div class="wb-dialog-num">还剩<strong class="lastnum"><%=lastNum%></strong>字</div>   </div></div>';
            t("body").append(o),
            t("#pop-window" + e.id).delegate(".close-btn", "click",
            function() {
                e.hide()
            }).delegate(".send-btn", "click",
            function() {
                return "" == e._trim(e.getValue()) ? void alert("请输入内容") : void e.option.postFunc()
            }).delegate("textarea", "click",
            function() {
                e._trim(e.getValue()) == e.defualtText && t(this).val("")
            }).delegate("textarea", "keyup",
            function() {
                e._showLast()
            })
        },
        _trim: function(t) {
            var e = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
            return (t || "").replace(e, "")
        },
        _setId: function() {
            this.id = t(".pop-window").length
        },
        _showLast: function() {
            t("#pop-window" + this.id + " .lastnum").text(this.option.maxTextNum - this._tStrLength(this.getValue()))
        },
        show: function(e) { ! n && this._init(),
            t.extend(this.option, e),
            this._setPosition(),
            t("#pop-window" + this.id + " .send-btn").text(this.option.btntxt),
            t("#pop-window" + this.id + " .title").html(this.option.html),
            t("#pop-window" + this.id + " textarea").text(this.option.content),
            this._showLast(),
            t("#pop-window" + this.id).show(),
            t("#div_xll_pop_layer" + this.id).show(),
            t("#div_xll_pop_layer" + this.id).css({
                outline: "1px solid rgba(0, 0, 0, 0)"
            })
        },
        _tStrLength: function(t) {
            var e, n = 0;
            for (e = t.length; e--; 0) n += t.charCodeAt(e) > 128 ? 1 : .5;
            return Math.ceil(n)
        },
        hide: function() { ! n && this._init(),
            t("#div_xll_pop_layer" + this.id).hide(),
            t("#pop-window" + this.id).hide(),
            /ucbrowser/i.test(navigator.userAgent) && t("#video-control").css("visibility", "visible"),
            / uc /i.test(navigator.userAgent) && t("#video-control").show()
        },
        _emptyText: function() {
            t("#pop-window" + this.id).find("textarea").val("")
        },
        destroy: function() { ! n && this._init(),
            t("#pop-window" + this.id).undelegate(".close-btn", "click").undelegate(".send-btn", "click").undelegate("textarea", "click")
        },
        getValue: function() {
            return ! n && this._init(),
            t("#pop-window" + this.id).find("textarea").val()
        },
        _setPosition: function() {
            t("#pop-window" + this.id).css("top", this.option.top).css("left", this.option.left)
        }
    },
    window.is_output_mod_log && console.log("popDialog of module is loaded."),
    i
}),
define("wxShare", [],
function() {
    function getUrlParam() {
        var t, e, n, i = location.search.slice(1),
        o = [],
        r = {},
        a = decodeURIComponent;
        for (o = i.split("&"), t = o.length; t--;) e = o[t],
        n = e.split("="),
        r[a(n[0])] = a(n[1]);
        return r
    }
    function _share() {
        function getMttSystem(t) {
            var e = /android/gi.test(t) && /mqq/gi.test(t),
            n = /iphone|ipod|ios/gi.test(t) && /mqq/gi.test(t);
            return e ? 1 : n ? 2 : e || n ? void 0 : 0
        }
        function getVision(ua) {
            var mttSystem = getMttSystem(ua);
            if ("undefined" != typeof mtt && (mttSystem = 1), 1 == mttSystem) {
                var info = getBrowserParam();
                if (info) {
                    info = eval("(" + info + ")");
                    var qua = info.qua + "";
                    if (qua = qua.match(/([0-9\.]+)/gi, ""), qua && qua.length > 0) return qua[0]
                }
            }
            try {
                var reg = /MQQBrowser\/(\d{2})/,
                regRemoveDot = /\./g;
                ua = ua.replace(regRemoveDot, "");
                var res = reg.exec(ua);
                return res && res.length > 1 ? res[1] : void 0
            } catch(e) {
                return void 0
            }
        }
        function getBrowserParam() {
            var t = "";
            if ("undefined" == typeof mtt) return "";
            try {
                return mtt.getBrowserParam && (t = mtt.getBrowserParam() + ""),
                t
            } catch(e) {
                return ""
            }
        }
        function androidShareNew(t, e, n) {
            try {
                var i = window.mttQB.share(t);
                i >= 0 ? e && e() : n && n()
            } catch(o) {
                n && n()
            }
        }
        function androidShareOld(t, e, n) {
            if ("undefined" != typeof x5mtt) try {
                var i = window.x5mtt.share(JSON.stringify(t));
                i >= 0 ? e && e() : n && n()
            } catch(o) {
                n && n()
            } else n && n()
        }
        var nativeObj = {
            ua: navigator.userAgent
        };
        return nativeObj.init = function(t, e, n) {
            var e = function() {},
            n = function() {};
            x5.app.share = function(t, e, n) {
                if ("function" != typeof e) return void alert("x5.app.share Error: succCallback is not a function");
                var n = e;
                return "function" != typeof n ? void alert("x5.app.share Error: errCallback is not a function") : void x5.exec(e, n, "app", "share", [t])
            };
            var i = t || {};
            i.url = t.shareUrl || t.url || "",
            i.description = t.contents || t.description || "",
            i.img_url = t.imgUrl || t.img_url || "http://3gimg.qq.com/html5app/205/7c6/785/8fa/c64/34d/cb7/14d/27a/abc/d20/56/180_180.png";
            var o = navigator.userAgent,
            r = getVision(o),
            a = getMttSystem(o);
            0 == a ? n && n() : 1 == a ? r >= 50 ? androidShareNew(i, e, n) : androidShareOld(i, e, n) : x5.app.share(i, e, n)
        },
        nativeObj.init
    }
    var isLoaded = !1,
    ua = window.navigator.userAgent,
    isAndroid = /android/gi.test(ua),
    isIos = /iphone|ipod|ios/gi.test(ua),
    isFromWx = /MicroMessenger/gi.test(ua),
    isFromQQ = /mobile.*qq/gi.test(ua),
    isFromUC = /ucbrowser/gi.test(ua),
    isFromQQBrower = /mqqbrowser/i.test(ua),
    cb = function() {},
    obj = {
        init: function(t) {
            var e = _share();
            isLoaded ? e(t) : cb = e
        }
    };
    if (/mqq/i.test(navigator.userAgent)) if ("undefined" == typeof x5) {
        var getScript = function(t, e, n) {
            var i = document.createElement("script");
            i.language = "javascript",
            i.type = "text/javascript",
            n && (i.charset = n),
            i.onload = i.onreadystatechange = function() {
                this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (e && e(), i.onload = i.onreadystatechange = null, i.parentNode.removeChild(i))
            },
            i.src = t,
            document.getElementsByTagName("head")[0].appendChild(i)
        };
        getScript("http://3gimg.qq.com/OPT/mtt_push_v04.js",
        function() {
            isLoaded = !0,
            cb && cb()
        },
        "utf-8")
    } else isLoaded = !0;
    return obj.isFromWx = function() {
        return /MicroMessenger/gi.test(window.navigator.userAgent) ? !0 : !1
    },
    obj.isFromQQ = function() {
        return /mobile.*qq/gi.test(window.navigator.userAgent) ? !0 : !1
    },
    obj.isFromUC = function() {
        return /ucbrowser/gi.test(window.navigator.userAgent) ? !0 : !1
    },
    obj.sharefriendFromUC = function(t) {
        isIos ? ucbrowser && ucbrowser.web_share(t.title, t.description, t.url, "kWeixin", "", "@手机腾讯网", "") : isAndroid && ucweb && ucweb.startRequest("shell.page_share", [t.title, t.description, t.url, "WechatFriends", "", "", ""])
    },
    obj.shareTimelineFromUC = function(t) {
        isIos ? ucbrowser && ucbrowser.web_share(t.title, t.description, t.url, "kWeixinFriend", "", "@手机腾讯网", "") : isAndroid && ucweb && ucweb.startRequest("shell.page_share", [t.title, t.description, t.url, "WechatTimeline", "", "", ""])
    },
    obj.isQbInstalled = function(t) {
        t = t || {};
        var e = t.testUrl || "",
        n = t.onSucc,
        i = t.onFail;
        e = "mttbrowser://url=" + (e || location.href).replace(/http:\/\//gi, "");
        var o = Date.now(),
        r = 0,
        a = function() {
            o += 1e3,
            r += 1,
            3 > r ? setTimeout(a, 1e3) : Math.abs(o - Date.now()) > 1e3 ? n && n() : i && i()
        },
        s = document.createElement("iframe");
        return s.src = e,
        s.id = "qbInstallValidator_" + Date.now(),
        s.style.display = "none",
        document.body.appendChild(s),
        setTimeout(a, 1e3),
        setTimeout(function() {
            s && s.parentNode && s.parentNode.removeChild(s)
        },
        5e3),
        !1
    },
    obj.toggleShareTip = function(t) {
        "qqwebview" == t ? (obj.$weixinMask || (obj.$weixinMask = $('<div style="display:none;position: fixed;top: 0;left: 0;z-index: 10000;width: 100%;height: 100%;background: rgba(0,0,0,0.7);"><img src="http://3gimg.qq.com/wap30/infoapp/touch/todaynews/images/weixin_share_mask_bg.png" alt="微信分享" style="position: absolute;right: 0;top: 0;width: 200px;"></div>'), $("body").append(obj.$weixinMask)), obj.$weixinMask.one("click",
        function() {
            obj.$weixinMask.hide()
        }).show()) : (obj.$weixinMask || (obj.$weixinMask = $('<div style="position: fixed; top: 0; right: 0; z-index: 10000; display: none;"><img src="http://3gimg.qq.com/wap30/infoapp/touch/wx_choice/images/weixin_share_layer_bg.png" alt="" style="width: 2.49rem;"></div>'), $("body").append(obj.$weixinMask)), obj.$weixinMask.show(), setTimeout(function() {
            obj.$weixinMask.hide()
        },
        3e3))
    },
    obj.$weixinMask = null,
    obj.sharefriend = function(t) {
        return isFromWx || isFromQQ ? void this.toggleShareTip() : isFromQQ ? void this.toggleShareTip("qqwebview") : isFromUC ? void this.sharefriendFromUC(t) : isFromQQBrower ? (t.to_app = 1, void this.init(t)) : void this.isQbInstalled({
            testUrl: location.href + "&fromsharefriend=1",
            onSucc: function() {},
            onFail: function() {
                location.href = "http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349"
            }
        })
    },
    obj.shareTimeLine = function(t) {
        return isFromWx ? void this.toggleShareTip() : isFromQQ ? void this.toggleShareTip("qqwebview") : isFromUC ? void this.shareTimelineFromUC(t) : isFromQQBrower ? (t.to_app = 8, void this.init(t)) : void this.isQbInstalled({
            testUrl: location.href + "&fromsharetimeline=1",
            onSucc: function() {},
            onFail: function() {
                location.href = "http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349"
            }
        })
    },
    obj.actSafariShare = function(t) {
        var e = getUrlParam();
        e.fromsharefriend && 1 == e.fromsharefriend && isFromQQBrower ? ($.isFunction(history.replaceState) && window.history.replaceState(null, document.title, window.location.href.replace(/fromsharefriend=1/g, "")), obj.sharefriend(t)) : e.fromsharetimeline && 1 == e.fromsharetimeline && isFromQQBrower && ($.isFunction(history.replaceState) && window.history.replaceState(null, document.title, window.location.href.replace(/fromsharetimeline=1/g, "")), obj.shareTimeLine(t))
    },
    obj
}),
define("shareMod", ["jqmobi", "util", "popDialog", "tipsModule", "loginMod"],
function(t, e, n, i, o) {
    function r() {
        var n = e.cookie.getCookie("info_share_sina_token");
        t.ajax({
            url: g + "/g/s?callback=?&reason=" + b.getValue() + "&url=" + encodeURIComponent(p) + "&picurl=" + encodeURIComponent(m) + "&token=" + n,
            dataType: "jsonp",
            success: function(t) {
                null == t.error_code ? (i.showTip("分享成功", !0), b.hide(), w.sinaSuccessCb && w.sinaSuccessCb()) : "20019" == t.error_code ? (i.showTip("请不要提交相同内容", !0), w.sinaErrorCb && w.sinaErrorCb("请不要提交相同内容")) : (i.showTip("分享失败", !0, "error"), w.sinaErrorCb && w.sinaErrorCb("分享失败"))
            },
            error: function() {
                i.showTip("分享失败", !0, "error")
            }
        })
    }
    function a() {
        t.ajax({
            url: v + "?callback=?&reason=" + b.getValue() + "&url=" + encodeURIComponent(p) + "&picUrl=" + encodeURIComponent(m) + "&sid=" + o.getSid(),
            dataType: "jsonp",
            success: function(t) {
                0 == t.code ? (i.showTip("分享成功", !0, !0), b.hide()) : "-101" == t.code ? tips.showTip("您还没有登录", !0, "error") : "-107" == t.code ? i.showTip("您还没有开通腾讯微博", !0, "error") : (i.showTip("分享失败", !0, "error"), b.hide())
            },
            error: function() {
                i.showTip("分享失败", !0, "error")
            }
        })
    }
    function s() {
        o.login(function() {
            window.scrollTo(0, 1),
            b.show({
                btntxt: "发表",
                html: '<h3 class="share-tit for-mb">腾讯微博</h3>',
                postFunc: function() {
                    a()
                },
                content: h
            })
        })
    }
    function c(t) {
        if ("" != t) {
            var e = t,
            n = +new Date;
            /(iphone|ipad|ipod)/i.test(navigator.userAgent.toLowerCase()) && (window.location.href = e, setTimeout(function() { + new Date - n < 2e3
            },
            1e3))
        }
    }
    function l(t) {
        var n = (e.url.getUrlParam(), "");
        f.length > 0 && (n = f.replace(/<a .*?>.*?<\/a>/g, "").substring(0, 200));
        var i = p,
        r = "http://openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone",
        a = t || i,
        s = r + "&url=" + encodeURIComponent(i) + "&summary=" + encodeURIComponent(n) + "&desc=" + encodeURIComponent(h) + "&title=" + encodeURIComponent(h) + "&imageUrl=" + encodeURIComponent(m) + "&successUrl=" + encodeURIComponent(i) + "&failUrl=" + encodeURIComponent(i) + "&callbackUrl=" + encodeURIComponent(a) + "&sid=" + o.getSid();
        window.location.href = s
    }
    function d(t) {
        var n = e.cookie.getCookie("info_share_sina_token");
        "" != n ? (window.scrollTo(0, 1), b.show({
            btntxt: "发表",
            html: '<h3 class="share-tit for-sina">新浪微博</h3>',
            postFunc: function() {
                r()
            },
            content: h
        })) : (e.cookie.setCookie("infosharewbcbparams_" + state, location.href, 1, ".3g.qq.com"), window.location.href = t)
    }
    function u() {
        try {
            {
                e.cookie.getCookie("leave_info_state")
            }
            if (location.hash.length > 0) var t = e.url.getHashParams().urlParams;
            else var t = e.url.getUrlParam();
            if (t.oauth_state && t.state) {
                var n = t.access_token;
                if (0 == t.oauth_state && state == t.state && n) return e.cookie.setCookie("info_share_sina_token", n, 1, ".3g.qq.com"),
                e.cookie.delCookie("infosharewbcbparams_" + state, ".3g.qq.com"),
                void b.show({
                    btntxt: "发表",
                    html: '<h3 class="share-tit for-sina">新浪微博</h3>',
                    postFunc: function() {
                        r()
                    },
                    content: h
                });
                0 != t.oauth_state && i.showTip("新浪微博授权失败", !0, !0)
            }
        } catch(o) {
            console.error(o.message)
        }
    }
    var h, p, f, m, g = "http://infoapp.3g.qq.com/g/app_include/share/ShareSinaAction.jsp",
    v = "http://infoapp.3g.qq.com/g/app_include/share/ShareTencentAction.jsp",
    b = new n,
    w = {};
    return {
        shareSina: d,
        init: function(t) {
            h = t.title || "",
            p = t.shareUrl || "",
            f = t.contents || "",
            state = t.state || "info_1",
            m = t.imgUrl || "",
            w.sinaSuccessCb = t.sinaSuccessCb,
            w.sinaErrorCb = t.sinaErrorCb,
            u()
        },
        shareQQ: c,
        shareQzone: l,
        shareTxMb: s
    }
}),
define("util", ["jqmobi"],
function(t) {
    var e = {};
    return e.url = function() {
        var t = function(t) {
            var e, n, i, o = [],
            r = {},
            a = decodeURIComponent;
            for (o = t.split("&"), e = o.length; e--;) n = o[e],
            i = n.split("="),
            r[a(i[0])] = a(i[1]);
            return r
        },
        e = function() {
            return t(location.search.slice(1))
        },
        n = function(e) {
            var n = e ? e: decodeURIComponent(location.hash),
            i = [],
            o = {};
            return n.replace(/[\.\?\/'"><:;,\[\]\{\}]/gi, ""),
            i = n.split("/"),
            i.length > 0 && (o.__vpageid = i[0].substring(1), o.urlParams = i.length > 1 ? t(i[1], !0) : {}),
            o
        };
        return {
            obj2Str: function(t, e) {
                var n, i, o = "";
                for (n in t)"undefined" != typeof t[n] && (i = e ? encodeURIComponent(t[n]) : t[n], o += n + "=" + i + "&");
                return o.slice(0, o.length - 1)
            },
            url2obj: t,
            getUrlParam: e,
            getHashParams: n,
            getHash: function() {
                var t = location.hash || "#";
                return t
            }
        }
    } (),
    e.load = function() {
        return {
            loadScript: function(e, n) {
                try {
                    e = e instanceof Array ? e: [e],
                    n = n instanceof Array ? n: [n];
                    var i = document.getElementsByTagName("head")[0],
                    o = document.createDocumentFragment(),
                    r = [],
                    a = function(t, e) {
                        r[t] = document.createElement("script"),
                        r[t].src = e,
                        r[t].type = "text/javascript",
                        o.appendChild(r[t])
                    };
                    t.each(e, a),
                    i.appendChild(o);
                    var s = function(t, e) {
                        "function" == typeof e && (r[t].onreadystatechange = function() { ("complete" == r[t].readyState || "loaded" == r[t].readyState) && e()
                        },
                        r[t].onload = function() {
                            e()
                        },
                        r[t].onerror = function() {
                            this.onload = this.onerror = null,
                            this.parentNode.removeChild(this)
                        })
                    };
                    t.each(n, s)
                } catch(c) {
                    console.error("Warning:There is error on load javascript file!")
                }
            },
            loadCss: function(t) {
                if (t) {
                    var e = document.createDocumentFragment(),
                    n = document.createElement("link");
                    n.async = !0,
                    n.rel = "stylesheet",
                    n.href = t,
                    n.type = "text/css",
                    e.appendChild(n),
                    document.getElementsByTagName("head")[0].appendChild(e)
                }
            },
            loadStaticStyle: function(t) {
                var e = document.createElement("style");
                e.innerHTML = t,
                document.getElementsByTagName("head")[0].appendChild(e)
            },
            loadImg: function(e) {
                t.each(e,
                function(t, e) {
                    var n = e.getAttribute("orgsrc");
                    n && nextFrame(function() {
                        e.src = n,
                        e.removeAttribute("orgsrc")
                    })
                })
            }
        }
    } (),
    e.cookie = function() {
        return {
            getCookie: function(t) {
                for (var e = t + "=",
                n = document.cookie.split(" "), i = 0; i < n.length; i++) {
                    var o = n[i].split(";")[0];
                    if (0 == o.indexOf(e)) {
                        var r = e.length,
                        a = o.length;
                        return decodeURIComponent(o.substring(r, a))
                    }
                }
                return ""
            },
            setCookie: function(t, e, n, i, o) {
                var r = new Date;
                null != n && r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3),
                document.cookie = t + "=" + escape(e) + (null == n ? "": "; expires=" + r.toGMTString()) + (null == i ? "": "; domain=" + i) + (null == o ? ";path=/": "; path=" + o)
            },
            delCookie: function(t, e, n) { ("undefined" == typeof e || null == e) && (e = "qq.com");
                var i = new Date;
                i.setTime(i.getTime() - 1);
                var o = this.getCookie(t);
                "" != o && (document.cookie = t + "=" + o + (null != n ? ";path=" + n: "/") + (e ? ";domain=" + e: "") + ";expires=" + i.toGMTString())
            }
        }
    } (),
    e.req = function(e) {
        t.ajax(t.extend({
            url: "/g/s"
        },
        e))
    },
    e.tpl = function n(t, e) {
        var i = n._cache || (n._cache = {}),
        o = i[t];
        if (o) return o(e || {});
        var r = n._regarg || (n.regarg = /\$([A-z_][^$]*\b)/g),
        a = n._cachereg || (n._cachereg = /<%=(.*?)%>|(<%)|(%>)/g),
        s = n._cachefn || (n._cachefn = function(t, e, n, i) {
            return (e ? "'+(" + e + ")+'": "") + (n ? "';": "") + (i ? "p+='": "")
        });
        return o = i[t] = new Function("a$", "var p=''; p+='" + t.replace(a, s).replace(r, "a$.$1") + "'; return p;"),
        console.log(o),
        o(e || {})
    },
    e.array = function() {
        return {
            shuffle: function(t) {
                var e, n, i = t.slice(0),
                o = i.length - 1;
                for (o; o >= 0; o--) e = Math.floor(Math.random() * o),
                n = i[e],
                i[e] = i[o],
                i[o] = n;
                return i
            }
        }
    } (),
    e.string = function() {
        return {
            trim: function(t) {
                var e = t.replace(/(^\s*)|(\s*$)/g, "");
                return e.replace(/(^　*)|(　*$)/g, "")
            }
        }
    } (),
    e.img = function() {
        return {
            resizeImage: function(t, e, n) {
                var i = new Image;
                i.src = t.attr("src");
                var o = "",
                r = "";
                i.onload = function() {
                    i.width > 0 && i.height > 0 && (e / i.width >= n / i.height ? n / i.height < 1 || e / i.width > 1 ? (t.attr("width", e), o = parseInt(i.height * e / i.width), t.attr("height", o)) : (t.attr("height", n), r = parseInt(i.width * n / i.height), t.attr("width", r)) : e / i.width < 1 || n / i.height > 1 ? (t.attr("height", n), r = parseInt(i.width * n / i.height), t.attr("width", r)) : (t.attr("width", e), o = parseInt(i.height * e / i.width), t.attr("height", o)))
                }
            }
        }
    } (),
    e.storage = function() {
        return {
            isSupportLocalStorage: function() {
                try {
                    var t = "localStorage" in window && window.localStorage;
                    return t
                } catch(e) {
                    return ! 1
                }
            }
        }
    } (),
    e.encrypt = function() {
        var t = e.cookie.getCookie("skey") || "",
        n = e.cookie.getCookie("p_skey") || "",
        i = e.cookie.getCookie("p_lskey") || "",
        o = t || n || i,
        r = 70215614;
        if (o) {
            for (var a = 0,
            s = o.length; s > a; a++) r += (r << 5) + o.charAt(a).charCodeAt();
            return 2147483647 & r
        }
        return ""
    },
    e
}),
define("basepage", ["jqmobi", "pm", "loginMod", "tipsModule"],
function(t, e, n, i) {
    function o(t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
        n = window.location.search.substr(1).match(e);
        return n ? decodeURIComponent(n[2]) : null
    }
    var r, a = function() {
        this.page = {},
        this.jdom = null,
        this.renderComplete = !1,
        this.startStayTime = null,
        this.startRenderTime = null,
        this.initialize.apply(this, arguments),
        this.bind_PM_Events(),
        e.register(this)
    };
    return t.extend(a.prototype, {
        initialize: function() {},
        init: function() {
            this.page.wrapper = t('.virtualPage[page="' + this.page.name + '"]'),
            this.inThisPage = !1,
            this.bindMethod()
        },
        pageAdd: function() {
            var e = this.page;
            0 === t(".virtualPage[page=" + e.name + "]").length && t("#wrapper").append(e.html),
            this.jdom = t(".virtualPage[page=" + e.name + "]"),
            t(".virtualPage[page=" + e.name + "]").css("height", "100%")
        },
        enter: function() {},
        leave: function() {},
        back: function() {},
        renderHtml: function() {},
        bindMethod: function() {},
        bind_PM_Events: function() {
            var e = this;
            t.bind(this, "vpageLeave",
            function(t) {
                e.inThisPage = !1,
                e.renderComplete = !1,
                e.sendStatistic("stayTime", new Date - e.startStayTime),
                e.leave(t)
            }),
            t.bind(this, "vpageEnter",
            function(t) {
                e.inThisPage = !0,
                e.startStayTime = new Date,
                e.startRenderTime = new Date,
                e.sendStatistic("pv", 1),
                e.enter(t)
            }),
            t.bind(this, "vpageBack",
            function(t) {
                e.inThisPage = !0,
                e.startStayTime = new Date,
                e.sendStatistic("pv", 1),
                e.back(t)
            }),
            t.bind(this, "vpageInit", this.init),
            t.bind(this, "vpageAdd", this.pageAdd)
        },
        request: function(t) {
            var e = this,
            n = function() {},
            a = t.url + JSON.stringify(t.params),
            s = t.success ? t.success: n,
            c = t.error ? t.error: n,
            l = [];
            t.params.dt && (l = t.params.dt.split(","));
            var d = t.canUseCache && r,
            u = t.params.log && "0" == t.params.log; ! window.needGFIFStat || window.doneGFIFStat || u || (t.params.i_f = o("i_f") || "", t.params.g_f = o("g_f") || "", window.doneGFIFStat = !0),
            t.type = t.type || "GET",
            t.dataType = t.dataType || "json";
            var h = function(t) {
                for (var n = 0,
                o = l.length; o > n; n++) {
                    var r = t[l[n]];
                    if (r && r.result && r.result < 0) {
                        r.msg && i.showTip(r.msg, !0);
                        break
                    }
                }
                t.code < 0 && console.log("tipsModule show"),
                s.call(e, t),
                e.renderComplete || (e.renderComplete = !0, e.sendStatistic("renderTime", new Date - e.startRenderTime))
            };
            t.success = function(t) {
                h.call(e, t),
                d && r.save({
                    key: a,
                    date: (new Date).getTime(),
                    v: t
                })
            },
            t.error = function() {
                d ? r.get(a,
                function(t) {
                    t ? (console.log("ajax-local", a, t), h.call(e, t.v)) : (i.showTip("网络异常，请刷新重试", !0, "error"), c.apply(e, arguments))
                }) : (i.showTip("网络异常，请刷新重试", !0, "error"), c.apply(e, arguments))
            },
            this._ajax(t)
        },
        _ajax: function(e) {
            e.url && -1 === e.url.indexOf("undefined") && t.ajax({
                dataType: e.dataType,
                type: e.type,
                url: e.url,
                data: e.params,
                beforeSend: function() {
                    t.trigger(window, "ajaxBeforeSend")
                },
                success: e.success,
                error: e.error,
                timeout: 6e3,
                complete: function() {
                    t.trigger(window, "ajaxComplete")
                }
            })
        },
        sendStatistic: function() {}
    }),
    a.extend = function(e, n) {
        var i, o = a,
        r = function() {};
        return i = e && e.hasOwnProperty("constructor") ? e.constructor: function() {
            o.apply(this, arguments)
        },
        t.extend(i, o),
        r.prototype = o.prototype,
        i.prototype = new r,
        e && t.extend(i.prototype, e),
        n && t.extend(i, n),
        i.prototype.constructor = i,
        i.__super__ = o.prototype,
        i
    },
    a
}),
define("info_comment", ["jqmobi", "loginMod", "loadMod", "tips", "util"],
function(t, e, n, i, o) {
    function r(t) {
        return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function a(t) {
        if (!c(t)) return t;
        var e = 864e5,
        n = new Date,
        i = new Date(parseInt(t)),
        o = n.getTime() - t;
        if (o > 6 * e) return i.getFullYear() !== n.getFullYear() ? i.getFullYear() + "年" + (i.getMonth() + 1) + "月" + i.getDate() + "日": i.getMonth() + 1 + "月" + i.getDate() + "日";
        if (e > o) return 6e4 > o ? Math.floor(o / 1e3) + "秒前": 36e5 > o ? Math.floor(o / 6e4) + "分钟前": Math.floor(o / 36e5) + "小时前";
        if (2 * e > o) {
            var r = 36e5 * n.getHours() + e;
            return r > o ? "昨天": "前天"
        }
        return Math.ceil(o / e) + "天前"
    }
    function s(t) {
        return t = parseInt(t),
        t > 1e4 && (t = (t / 1e4).toFixed(1) + "万", t = t.replace(".0", "")),
        t
    }
    function c(t) {
        return "[object Number]" === Object.prototype.toString.call(t)
    }
    var l = e,
    d = n,
    u = (window.info_news_comment_mqqlink, -1 !== navigator.userAgent.indexOf("MQQBrowser"), !1),
    h = "点击获取地理位置",
    p = function(t) {
        this._init(t)
    };
    return p.prototype = {
        _init: function(e) {
            this.API = e.api,
            this.obj = e.obj || null,
            this.callbacks = e.callbacks || {},
            this.showCatMore = e.showCatMore,
            this.inArticle = !!e.inArticle,
            this.fetching = !1,
            this.isOpen = e.isOpen || !1,
            this.isGray = e.isGray,
            this.aid = "news_js",
            this.boardId = e.boardId,
            this.pkuName = e.pkuName || "infonews",
            this.isGray && (this.aid = "cmt_touch_api"),
            this.pn = {
                hot: 1,
                latest: 1
            },
            this.defaultAvatar = "",
            this.title = e.title,
            this.loadedNums = 0,
            this.initFrame = !1,
            this.ajaxType = this.inArticle ? "top": "hot,latest",
            this.mapInfo = {
                cityname: "",
                poiname: "",
                latlng: {
                    lat: "",
                    lng: ""
                },
                poiaddress: ""
            },
            t(".cmt-total").html("评论<em>0</em>"); {
                var n;
                this.isOpen ? "": " hide"
            }
            n = this.inArticle ? '<div class="main-comment hot-comment">   <ul class="main-comment-list t_top_cmt_dl" style="display: none">   </ul></div>': '<div class="main-comment3 hot-comment t_hot_cmt_con" style="display: none">   <div class="main-comment-title">最热评论</div>   <ul class="main-comment-list t_hot_cmt_dl">   </ul></div><div class="main-comment3 new-comment t_latest_cmt_con" style="display: none">   <div class="main-comment-title">最新评论</div>   <ul class="main-comment-list t_latest_cmt_dl">   </ul>   <a class="comment-link-more t_latest_more cmt-more" href="javascript:;" style="display: none"><em class="t_latest_more_words"></em></a>   <div class="comment-link-more disable t_latest_more_end cmt-more" style="display: none"><em class="t_latest_end_words"></em></div></div>';
            var i = '<div class="info-comment3">   <div class="info-comment-reply3">       <div class="info-reply-box">       <span class="u-img host_u_img" style="display:none;">           <img src="' + this.defaultAvatar + '" class="img">         </span>       <div class="info-reply-area">           <textarea class="info-reply-area cmt-text cmt_text" placeholder="说说你的看法"></textarea>           <div class="info-reply-bar">';
            this.isGray && (i += '               <span class="cmt-location active" id="cmt_location">' + h + '</span> <span class="btn-del" style="display:none;"><span></span></span>'),
            i += '              <button class="cmt-btn info-btn info-btn-submit t_send">发表</button>            </div>                         </div>       </div>   </div>' + n + "</div>",
            this.obj.html(i),
            this._bindClick(),
            this.callbacks.init && this.callbacks.init(),
            this.token = o.encrypt();
            var r = this;
            t.bind(window, "loginok",
            function() {
                r._refreshHead(l.getHead())
            })
        },
        setCount: function(e, n) {
            t(".t_latest_more_words").text("更多评论(" + (n - this.loadedNums) + "条)"),
            t(".t_latest_end_words").text("共" + n + "条评论"),
            t(".t_join_count").html(parseInt(e) ? e + "人参与评论": "暂无评论"),
            t(".cmt-total em").text(n)
        },
        jsonp: function(e, n, i, o) {
            t.ajax({
                url: e + "?callback=?&" + t.param(n),
                cache: !1,
                type: "GET",
                dataType: "jsonp",
                data: null,
                success: i,
                error: o
            })
        },
        req: function(n, i, r) {
            this.jsonp(this.API, t.extend(n, {
                id: o.url.getUrlParam().id,
                sid: e.getSid(),
                aid: this.aid,
                pkuName: this.pkuName,
                boardId: this.boardId
            }), i, r)
        },
        post: function(n, i) {
            t.ajax({
                url: this.API,
                data: t.extend(n, {
                    id: o.url.getUrlParam().id,
                    sid: e.getSid(),
                    aid: this.aid,
                    cityname: this.mapInfo.cityname,
                    iopname: this.mapInfo.poiname,
                    lat: this.mapInfo.latlng.lat || "",
                    lng: this.mapInfo.latlng.lng || "",
                    poiaddress: this.mapInfo.poiaddress,
                    pkuName: this.pkuName,
                    boardId: this.boardId,
                    entityId: o.url.getUrlParam().id,
                    title: encodeURIComponent(this.title),
                    url: encodeURIComponent(location.href)
                }),
                type: "POST",
                withCredentials: !0,
                crossDomain: !0,
                dataType: "json",
                success: i
            })
        },
        fetch: function() {
            var e = this;
            this.inArticle ? this._fetchSuccess((g_data.show.data.extra || {}).cmt || []) : (d.show(), this.req({
                dt: "cmtLst",
                mst: 9,
                types: this.ajaxType,
                pn: 1,
                ps: 10
            },
            function(n) {
                0 == n.result && (!e.mapInfo.cityname && n.address && "unkown" != n.address && (e.mapInfo.cityname = n.address, e._showLocationDel(), t("#cmt_location").html(e.mapInfo.cityname)), e._refreshHead(n.avatar), e._fetchSuccess(n.cmtLst))
            }))
        },
        _showLocationDel: function() {},
        _getAvatarHTML: function(t, e) {
            var n = "";
            if (e) {
                var i = t || "";
                n += '   <span class="u-img"  uid="' + i + '">        <img src="' + e + '" class="img">    </span> '
            }
            return n
        },
        _fetchSuccess: function(e) {
            var n = e,
            i = n.parentcmts,
            o = this;
            if (o.inArticle) {
                var r = n.top.record;
                r.length > 0 && (t(o.obj).find(".t_top_cmt_dl").html(o._rendercmtLst(r, i)).show(), t("#more-comment").find("a").html("全部评论" + n.allcount + "条"), t("#more-comment").show())
            } else {
                var a = n.hot.record;
                a = a.slice(0, 3),
                a.length > 0 && (t(o.obj).find(".t_hot_cmt_dl").html(o._rendercmtLst(a, i)), t(o.obj).find(".t_hot_cmt_con").show());
                var s = n.latest,
                c = s.record;
                s.record.length > 0 && (t(o.obj).find(".t_latest_cmt_dl").html(o._rendercmtLst(c, i)), t(o.obj).find(".t_latest_cmt_con").show(), o.loadedNums += s.record.length),
                s.pn < s.pc ? (o.pn.latest = s.pn + 1, t(o.obj).find(".t_latest_more").show()) : t(o.obj).find(".t_latest_more").hide()
            }
            o.setCount(n.allcount || 0, n.cmtcount || 0),
            o.callbacks.update && o.callbacks.update(n.cmtcount || 0),
            d.hide()
        },
        refresh: function() {
            this.fetch(),
            this.callbacks.refresh && this.callbacks.refresh()
        },
        catMore: function() {
            var e = this,
            n = "latest";
            this.fetching = !0,
            d.show(),
            this.req({
                dt: "cmtLst",
                mst: 9,
                types: n,
                pn: e.pn[n],
                ps: 10
            },
            function(i) {
                var o = i.cmtLst,
                r = o.parentcmts,
                a = o[n];
                a.pn >= a.pc && t(e.obj).find(".t_latest_more").hide(),
                t(e.obj).find(".t_latest_cmt_dl").append(e._rendercmtLst(a.record, r)),
                e.pn[n] = a.pn + 1,
                e.loadedNums += a.record.length,
                e.setCount(o.allcount || 0, o.cmtcount || 0),
                e.fetching = !1,
                d.hide(),
                e.callbacks.catmore && e.callbacks.catmore()
            },
            function() {
                e.fetching = !1,
                d.hide()
            })
        },
        _rendercmtLst: function(t, e) {
            var n = t;
            if (n) for (var i, o, r, c = "",
            l = 0; l < n.length; l++) {
                if (i = n[l], o = i.pcmtsnserl || [], r = void 0 != i.browserUrl ? '<span class="cmt-from">来自<a class="link-qqbroswer" target="_blank" href="' + i.browserUrl + '">' + i.browserName + "</a></span>": "", c += "<li>" + this._getAvatarHTML(i.userid, i.avatar) + '   <div class="detail"> ' + this.getCmtTitle({
                    p: i.usernick,
                    time: a(i.timestamp),
                    browserJson: i,
                    cityname: i.cityName
                }), o.length > 0) {
                    c += '<ul class="main-comment-list small">';
                    for (var d, u, h, p = 0,
                    f = 0; f < o.length; f++) d = e[o[f]],
                    d && (p++, u = 0 === f || 1 === f || f === o.length - 1, h = void 0 != d.browserUrl ? '<div class="comment-from">来自<a class="link-qqbroswer" target="_blank" href="' + d.browserUrl + '">' + d.browserName + "</a></div>": "", c += "<li" + (u ? "": ' style="display: none"') + '>   <div class="cmt-title">       <a class="cmt-name" uid="' + d.userid + '">' + d.usernick + "       </a>       <time>" + a(d.timestamp) + "</time>", d.cityName && "" != d.cityName && (c += '                   <span class="location">' + d.cityName + "</span> "), c += '<span class="grade">' + p + '</span>   </div>   <div class="cmt-content">' + d.shortcontent + "</div></li>", 1 === f && o.length > 3 && (c += '<li class="show-more t_openfloor">展开隐藏评论</li>'));
                    c += "</ul>"
                }
                c += '<div class="cmt-content">' + i.shortcontent + '</div> <div class="cmt-bar" data-value="' + i.cmtsn + '"> <em class="cmt-btn2 btn-ilike t_digi" v="' + i.digi + '" >' + s(i.digi) + '</em> <em class="cmt-btn2 btn-reply t_reply">回复</em> </div>   </div></li>'
            }
            return c
        },
        getlocationHTML: function(t) {
            return t ? '<span class="location">' + t + "</span>": ""
        },
        getCmtTitle: function(e) {
            var n = {
                p: "",
                time: "",
                browserJson: {},
                cityname: ""
            };
            t.extend(n, e);
            var i = void 0 != n.browserJson.browserUrl ? '<span class="cmt-from">来自<a class="link-qqbroswer" target="_blank" href="' + n.browserJson.browserUrl + '">' + n.browserJson.browserName + "</a></span>": "";
            return ' <div class="cmt-title">     <a class="cmt-name">' + n.p + ' </a>    <time class="time">' + n.time + "</time> " + this.getlocationHTML(n.cityname) + i + "    </span> </div> "
        },
        getCmtItemHTML: function(t, e, n, i) {
            return insertHTML = "<li>" + this._getAvatarHTML("", this.avatar) + '<div class="detail">' + this.getCmtTitle({
                p: "我",
                time: "刚刚",
                browserJson: broJson,
                cityname: this.mapInfo.cityname
            }) + '   <ul class="main-comment-list small">       <li>           <div class="cmt-title">               <a class="cmt-name">' + n + '</a>               <span class="grade">1</span>           </div>           <div class="cmt-content"> ' + r(t) + '          </div>       </li>    </ul>   <div class="cmt-content">' + r(i) + '   </div>    <div class="cmt-bar" data-value="' + e + '">        <em class="cmt-btn2 btn-ilike t_digi" v="0" >0</em>        <em class="cmt-btn2 btn-reply t_reply">回复</em>    </div></div></li>'
        },
        _doCmt: function() {
            var e = this,
            n = decodeURIComponent(this.obj.find(".cmt_text").val()),
            a = u ? "yes": "no";
            return n ? (d.show(), void this.post({
                mst: 3,
                ac: 12,
                comment: r(n),
                sharemb: a,
                "3g_token": o.encrypt(),
                entityId: o.url.getUrlParam().id,
                title: this.title,
                url: location.href,
                dt: "cmtOp"
            },
            function(o) {
                if ("-10" == o.result) l.setStatus(!1),
                l.login(function() {
                    e._doCmt()
                });
                else if (0 == o.result) {
                    var a, s;
                    a = "<li>" + e._getAvatarHTML("", e.avatar) + '<div class="detail"> ' + e.getCmtTitle({
                        p: "我",
                        time: "刚刚",
                        browserJson: broJson,
                        cityname: e.mapInfo.cityname
                    }) + '<div class="cmt-content">' + r(n) + '</div> <div class="cmt-bar" data-value="' + o.info.value.cid + '"> <em class="cmt-btn2 btn-ilike t_digi" v="0" >0</em> <em class="cmt-btn2 btn-reply t_reply">回复</em> </div>   </div></li>',
                    i.showTip("操作成功", !1, !0),
                    t("#cmt_textarea").css("height", "54px"),
                    t(".info-bar").hide(),
                    e.isOpen = !1,
                    s = t(e.obj).find(e.inArticle ? ".t_top_cmt_dl": ".t_latest_cmt_dl"),
                    s.prepend(a).show(),
                    t(e.obj).find(".t_latest_cmt_con").show(),
                    e.obj.find(".cmt_text").val("");
                    var c = parseInt(e.obj.find(".comment-count").text() || "0") + 1;
                    e.callbacks.post && e.callbacks.post(c)
                } else i.showTip("系统繁忙，请重试!", !0, !0);
                d.hide()
            })) : void i.showTip("请输入评论内容!", !0, !0)
        },
        _doDigi: function(t) {
            var e = t.data("value"),
            n = t.find(".t_digi").attr("v");
            return "digied" == n ? !1 : void this.req({
                mst: 3,
                ac: 13,
                voteCount: n,
                cid: e,
                dt: "cmtOp",
                op: "digi",
                cmtsn: e
            },
            function(e) {
                var o = t.find(".t_digi"),
                r = parseInt(n) + 1;
                0 == e.result ? (i.showTip("操作成功", !1, !0), 1e4 > r && o.text(r), o.addClass("active"), o.attr("v", "digied")) : -1 == e.result || 1 == e.result ? i.showTip(e.msg, !0, !0) : i.showTip("系统繁忙，请重试!", !0, !0)
            })
        },
        _doReply: function(e) {
            var n = this,
            r = t(e).siblings(".cmt-bar").data("value"),
            a = e.find("textarea").val();
            return a ? (d.show(), void this.post({
                mst: 5,
                ac: 6,
                comment: a,
                cid: r,
                "3g_token": o.encrypt(),
                dt: "cmtOp",
                pcmtsn: r
            },
            function(o) {
                if (0 == o.result) {
                    i.showTip("回复成功!", !1, !0),
                    t(e).find("textarea").val("");
                    var s = n.getCmtItemHTML(t(e).siblings(".cmt-content").text(), r, t(e).siblings(".cmt-title").find(".cmt-name").text(), a);
                    t(n.obj).find(".t_latest_cmt_dl").prepend(s),
                    n.closeReplyDialog(e),
                    n.callbacks.reply && n.callbacks.reply()
                } else "-10" == o.result ? (l.setStatus(!1), l.login(function() {
                    n._doReply(e)
                })) : i.showTip("系统繁忙，请重试!", !0, !0);
                d.hide()
            })) : void i.showTip("请输入回复内容!", !0, !0)
        },
        _toggleReplyDialog: function(e, n) {
            var i = this,
            o = t(e).children(".t_reply_con");
            if (0 == o.length) {
                var r = t(e).find(".cmt-title .cmt-name").text();
                t(e).append(i._getReplyDialog(r)),
                o.data("isopen", "true"),
                n.text("取消")
            } else "false" == o.data("isopen") ? (o.show().data("isopen", "true"), n.text("取消")) : (o.hide().data("isopen", "false"), n.text("回复"))
        },
        closeReplyDialog: function(t) {
            t.hide().data("isopen", "false"),
            t.siblings(".cmt-bar").find(".btn-reply").text("回复")
        },
        _getReplyDialog: function(t) {
            var e = this.mapInfo.cityname ? this.mapInfo.cityname: h,
            n = '<div class="info-reply-area small t_reply_con">   <textarea class="cmt-text" placeholder="回复' + r(t) + '："></textarea>   <div class="info-reply-bar">';
            return this.isGray && (n += '       <span class="cmt-location active">' + e + "</span>"),
            n += '       <button class="cmt-btn t_reply_sub">发表</button>   </div></div>'
        },
        _refreshHead: function(t) {
            t && (this.avatar = t || this.defaultAvatar, this.obj.find(".host_u_img img").attr("src", this.avatar), this.obj.find(".host_u_img").show())
        },
        _bindClick: function() {
            var e = this;
            t(e.obj).delegate(".t_openfloor", "click",
            function() {
                t(this).siblings().show(),
                t(this).remove()
            }),
            t(e.obj).delegate(".cmt-location", "click",
            function() {
                location.href = "#mapinfo"
            }),
            t(e.obj).delegate(".t_digi", "click",
            function() {
                e._doDigi(t(this).parent())
            }),
            t(e.obj).delegate(".t_latest_more", "click",
            function() {
                e.fetching || e.catMore()
            }),
            t(e.obj).delegate(".t_send", "click",
            function() {
                l.login(function() {
                    e._refreshHead(l.getHead()),
                    e._doCmt()
                })
            }),
            t(e.obj).delegate(".t_reply", "click",
            function() {
                e._toggleReplyDialog(t(this).parent().parent(), t(this))
            }),
            t(e.obj).delegate(".t_reply_sub", "click",
            function() {
                var n = t(this).parent().parent();
                l.login(function() {
                    e._refreshHead(l.getHead()),
                    e._doReply(n)
                })
            }),
            t(e.obj).delegate(".t_ucc_link", "click",
            function() {
                var e = l.getSid(),
                n = (encodeURIComponent(t(this).attr("uname")), l.getUid()),
                i = t(this).attr("uid") || n,
                o = n == i ? "home": "hishome",
                r = "http://infoapp.3g.qq.com";
                location.href = r + "/g/usercenter/touch/?sid=" + e + "&uin=" + i + "#" + o
            }),
            t(e.obj).delegate(".cmt_text", "click",
            function() {
                this.isOpen || (t(".info-bar").css("display", " -webkit-box"), t(this).css("height", "78px"))
            }),
            t(e.obj).delegate(".cmt-text", "input propertychange",
            function() {
                var e = t(this).siblings(".info-reply-bar").find(".t_reply_sub");
                "" != t(this).val() ? e.addClass("active") : e.removeClass("active")
            }),
            t(e.obj).delegate(".tx-wb", "click",
            function() {
                u ? (t(this).removeClass("active"), u = !1) : (t(this).addClass("active"), u = !0)
            }),
            t(e.obj).delegate(".mapinfo", "click",
            function() {
                location.hash = "#mapinfo"
            }).delegate(".btn-del", "click",
            function() {
                e.mapInfo.cityname = "",
                t("#cmt_location").html(h),
                t(this).hide()
            }),
            t.bind(window, "selectPOI",
            function(n) {
                console.log(n),
                t.extend(e.mapInfo, n),
                e.mapInfo.cityname = n.cityname || n.poiname,
                t(".cmt-location").html(e.mapInfo.cityname),
                e._showLocationDel()
            }),
            t.bind(e, "writeCmt",
            function() {
                t(e.obj).find(".cmt_text").get(0).focus()
            }),
            this.obj.find(".cmt_text").bind("input propertychange",
            function() {
                var n = t(e.obj).find(".t_send");
                return function() {
                    "" != t(this).val() ? n.addClass("active") : n.removeClass("active")
                }
            } ())
        },
        clear: function() {
            this.pn = {
                hot: 1,
                latest: 1
            },
            this.fetching = !1,
            this.loadedNums = 0,
            t(this.obj).find(".t_top_cmt_dl,.t_hot_cmt_dl,.t_latest_cmt_dl").html(""),
            t(this.obj).find(".t_latest_more,.t_latest_more_end").hide()
        }
    },
    {
        create: function(t) {
            return new p(t)
        }
    }
}),
define("loadMod", ["jqmobi"],
function(t) {
    var e = {
        isShowing: !1,
        timer: null,
        loadDiv: null,
        createDiv: function() {
            var e = '<div id="div_waiting" class="hide" style="position:absolute;">';
            e += '<span class="loading"><em class="loading-em"></em></span><span class="loading-color">读取中</span>',
            e += "</div>",
            t("body").append(e)
        },
        getLoadDiv: function() {
            return this.loadDiv || (0 == t("#div_waiting").length && this.createDiv(), this.loadDiv = t("#div_waiting")),
            this.loadDiv
        },
        show: function() {
            var t = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            clearTimeout(this.timer),
            this.isShowing || (this.isShowing = !0, this.getLoadDiv().css("top", t + window.innerHeight / 2 + "px").css("left", window.innerWidth / 2 + "px"), this.getLoadDiv().get(0).className = "show")
        },
        hide: function(t) {
            var e = this;
            clearTimeout(this.timer),
            this.timer = setTimeout(function() {
                e.isShowing = !1,
                e.getLoadDiv().get(0).className = "hide"
            },
            t || 500)
        }
    };
    return e
}),
define("gotop", ["jqmobi"],
function(t) {
    var e, n, i = t("#jumphelper"),
    o = !0,
    r = 0,
    a = 0,
    s = function() {
        l()
    },
    c = function() {
        clearTimeout(e),
        clearTimeout(n);
        var t = document.body.scrollTop;
        t != r ? (r = t, e = setTimeout(c, 500)) : n = setTimeout(function() {
            s()
        },
        800)
    },
    l = function() {
        o && d()
    },
    d = function() {
        i.css({
            display: "block"
        }),
        l.show = 2
    },
    u = function() {
        i.css({
            display: "none"
        }),
        l.show = 1
    },
    h = function() {
        t(document.body).append('<div id="jumphelper" style="display: none;"><a onclick="javascript:void 0;" id="gotop">∧</a><a onclick="javascript:void 0;" id="gobot">∨</a></div>'),
        i = t("#jumphelper"),
        t("#gotop").bind("click",
        function() {
            window.scrollTo(0, 1)
        }),
        t("#gobot").bind("click",
        function() {
            window.scrollTo(0, 99999)
        }),
        t("#gotop").bind("touchstart",
        function(t) {
            t.stopPropagation()
        }),
        t("#gobot").bind("touchstart",
        function(t) {
            t.stopPropagation()
        }),
        t(document.body).bind("touchstart",
        function() {
            a = 0
        }),
        t(document.body).bind("touchmove",
        function() {
            0 == a && (2 == l.show && u(), a = 1)
        },
        !1),
        t(window).bind("scroll", c),
        l()
    };
    return {
        init: h,
        show: d,
        hide: u,
        disable: function() {
            o = !1,
            u()
        },
        enable: function() {
            o = !0,
            l()
        }
    }
}),
define("tips", ["jqmobi"],
function(t) {
    var e = null,
    n = {
        inited: !1,
        init: function() {
            if (!this.inited) {
                var n = '<div  class="txt-tips" id="infoTip" style="z-index:10001">';
                n += "</div>",
                0 == t("#infoTip").length && t("body").append(n),
                e = t("#infoTip"),
                this.inited = !0
            }
        },
        showTip: function(e, n, i, o, r) {
            var a, s = this;
            this.init();
            var c = t("#infoTip");
            c.html(n ? '<div class="error-tips"><span>' + e + "</span></div>": '<div class="seccess-tips"><span>' + e + "</span></div>");
            var l = document.body.scrollTop + document.documentElement.scrollTop;
            t("#infoTip").css("top", l + "px"),
            i && (a = setTimeout(function() {
                s.hiddenTip()
            },
            o || 2500)),
            r && t(document.body).one("touchmove",
            function() {
                clearTimeout(a),
                setTimeout(function() {
                    s.hiddenTip()
                },
                100)
            })
        },
        setPosition: function(n, i, o) {
            var r, a = this,
            s = document.body.scrollTop + document.documentElement.scrollTop;
            e.css("top", s + "px"),
            n && (r = setTimeout(function() {
                a.hiddenTip()
            },
            o || 2500)),
            i && t(document.body).one("touchmove",
            function() {
                clearTimeout(r),
                setTimeout(function() {
                    a.hiddenTip()
                },
                100)
            })
        },
        showTipByHtml: function(t, n, i, o) {
            this.init(),
            e.html(t),
            this.setPosition(n, o, i)
        },
        hiddenTip: function() {
            this.init(),
            t("#infoTip").css("top", "-36px")
        }
    };
    return n
}),
define("pm", ["jqmobi"],
function(t) {
    console.log("pm init ");
    var e = t.extend,
    n = {
        version: "1.0",
        name: "pagemanager"
    },
    i = function() {
        function n(t) {
            x = t.home,
            "onhashchange" in window ? window.addEventListener("hashchange", s, !1) : console.log("not support onhashchange"),
            "onpopstate" in window ? window.addEventListener("popstate", c, !1) : console.log("not support onpopstate"),
            l()
        }
        function i(t) {
            window.location.hash = t
        }
        function o(t, e) {
            var n, i, o, r = [],
            a = {};
            for (r = t.split("&"), o = r.length, n = 0; o > n; n++) r[n].indexOf("=") < 0 ? a[r[n]] = void 0 : (i = r[n].split("="), a[i[0]] = e ? decodeURIComponent(i[1]) : i[1]);
            return a
        }
        function r(t) {
            var e = t ? t: decodeURIComponent(location.hash),
            n = [],
            i = {};
            return e.replace(/[\.\?'"><:;,\[\]\{\}]/gi, ""),
            n = e.split("/"),
            n.length > 0 && (i.__vpageid = n.splice(0, 1)[0].substring(1), i.urlParams = n.length > 0 ? o(n.join("/"), !0) : {}),
            i.__vpageid || (i.__vpageid = "news"),
            i
        }
        function a() {
            var t = r();
            y = w,
            w = t.__vpageid || x,
            console.log("set " + v + " to " + b),
            v = b,
            b = location.hash
        }
        function s() {
            b != location.hash && l()
        }
        function c() {
            b != location.hash && l()
        }
        function l() {
            f(),
            a(),
            console.log(v + "-->" + b),
            k.push(v + "-->" + b),
            h()
        }
        function d() {
            return k
        }
        function u(e) {
            console.log(e + " is first load"),
            _ = T[e];
            r();
            t.trigger(_, "vpageAdd", [{
                pageId: e
            }]),
            t(".virtualPage").removeAttr("selected"),
            t(".virtualPage[page=" + w + "]").attr("selected", "true"),
            _.vpageId = e,
            t.trigger(window, "vpageInit"),
            t.trigger(_, "vpageInit")
        }
        function h() {
            var n = r();
            _ = T[w],
            _ ? (t(".virtualPage").removeAttr("selected"), t(".virtualPage[page=" + w + "]").attr("selected", "true"), void 0 != _.prevParas && t.param(n.urlParams) == _.prevParas ? t.trigger(_, "vpageBack", [{
                curPage: w,
                prevPage: y
            }]) : t.trigger(_, "vpageEnter", [{
                curPage: w,
                prevPage: y
            }]), e(_, {
                prevParas: t.param(n.urlParams)
            }), t.trigger(window, "vpageEnter", [{
                curPage: w,
                prevPage: y
            }])) : require(w,
            function() {
                u(w),
                h()
            })
        }
        function p(t) {
            T[w] = t
        }
        function f() {
            return _ ? ("news" == _.vpageId && (window.scrollTop1 = document.body.scrollTop), _.pos = {
                x: 0,
                y: document.body.scrollTop
            },
            t.trigger(window, "vpageLeave", [{
                prevPage: y,
                currentPage: w
            }]), t.trigger(_, "vpageLeave", [{
                prevPage: y,
                currentPage: w
            }]), void(_ = null)) : void(window.scrollTop1 = document.body.scrollTop)
        }
        function m() {
            return b
        }
        function g() {
            return v
        }
        var v = "",
        b = "",
        w = "",
        y = "",
        _ = null,
        x = "",
        T = {},
        k = [];
        return {
            init: n,
            go: i,
            register: p,
            getCurHash: m,
            getTrace: d,
            getPrevHash: g,
            notify: function(e, n) {
                _ && t.trigger(_, e, n)
            },
            listen: function(e, n) {
                _ && t.bind(_, e, n)
            }
        }
    };
    return e(n, i()),
    n
}),
define("imgque", [],
function() {
    var t = function() {
        var t, e, n = [],
        i = !1,
        o = function(t, n, a) {
            var s = new Image;
            e = s,
            a = a || 0,
            a > 1 || (s.onload = function() {
                n && n(t),
                s = s.onload = s.onerror = null,
                i = !1,
                r()
            },
            s.onerror = function() {
                o(t, n, a + 1),
                s = s.onload = s.onerror = null,
                r()
            },
            i = !0, s.src = t)
        },
        r = function(e) {
            var a; (e || !i) && (a = n.splice(0, 1)[0], a && (clearTimeout(t), t = setTimeout(function() {
                r(!0)
            },
            2e3), o(a.src,
            function(t) {
                a.callback(t)
            })))
        },
        a = function(t, e) {
            n.push({
                src: t,
                callback: e
            }),
            r()
        };
        return {
            clear: function() {
                n = [],
                e && (e = e.onload = e.onerror = null),
                i = !1
            },
            push: a
        }
    } (),
    e = function(e, n) {
        var i, o, r = (document.body.scrollTop, window.innerHeight, []);
        $(e).each(function(t, e) {
            var n = e.getBoundingClientRect();
            r.push({
                pos: n,
                img: e
            })
        }),
        n !== !0 && t.clear(),
        $.each(r,
        function(e, n) {
            n.pos.bottom < -200 || n.pos.top > window.innerHeight + 400 || (o = $(n.img), i = o.attr("orgsrc"), t.push(i,
            function(t) {
                return function(e) { / android 4.0;. * applewebkit\ / 534\.30 / i.test(navigator.userAgent) && "A" == t.parent()[0].tagName && (t.parent()[0].style.display = "-webkit-box"),
                    t.removeAttr("orgsrc"),
                    t.attr("src", e)
                }
            } (o)))
        })
    };
    return t.loadImg = e,
    t
}),
(window.jQuery || window.Zepto) && !
function(t) {
    t.fn.Swipe = function(e) {
        return this.each(function() {
            t(this).data("Swipe", new Swipe(t(this)[0], e))
        })
    }
} (window.jQuery || window.Zepto),
define("swipe", [],
function() {
    return Swipe
}),
define("swipe1", [],
function() {
    function t(t, e) {
        "use strict";
        function n() {
            m = w.children,
            b = m.length,
            m.length < 2 && (e.continuous = !1),
            g = new Array(m.length),
            v = t.getBoundingClientRect().width || t.offsetWidth,
            w.style.width = m.length * v + "px";
            for (var n = m.length; n--;) {
                var i = m[n];
                i.style.width = v + "px",
                i.setAttribute("data-index", n),
                f.transitions && (i.style.left = n * -v + "px", s(n, y > n ? -v: n > y ? v: 0, 0))
            }
            e.continuous && f.transitions && (s(r(y - 1), -v, 0), s(r(y + 1), v, 0)),
            f.transitions || (w.style.left = y * -v + "px"),
            t.style.visibility = "visible"
        }
        function i() {
            e.continuous ? a(y - 1) : y && a(y - 1)
        }
        function o() {
            e.continuous ? a(y + 1) : y < m.length - 1 && a(y + 1)
        }
        function r(t) {
            return (m.length + t % m.length) % m.length
        }
        function a(t, n) {
            if (y != t) {
                if (f.transitions) {
                    var i = Math.abs(y - t) / (y - t);
                    if (e.continuous) {
                        var o = i;
                        i = -g[r(t)] / v,
                        i !== o && (t = -i * m.length + t)
                    }
                    for (var a = Math.abs(y - t) - 1; a--;) s(r((t > y ? t: y) - a - 1), v * i, 0);
                    t = r(t),
                    s(y, v * i, n || _),
                    s(t, 0, n || _),
                    e.continuous && s(r(t - i), -(v * i), 0)
                } else t = r(t),
                l(y * -v, t * -v, n || _);
                y = t,
                p(e.callback && e.callback(y, m[y]))
            }
        }
        function s(t, e, n) {
            c(t, e, n),
            g[t] = e
        }
        function c(t, e, n) {
            var i = m[t],
            o = i && i.style;
            o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = n + "ms", o.webkitTransform = "translate(" + e + "px,0)translateZ(0)", o.msTransform = o.MozTransform = o.OTransform = "translateX(" + e + "px)")
        }
        function l(t, n, i) {
            if (!i) return void(w.style.left = n + "px");
            var o = +new Date,
            r = setInterval(function() {
                var a = +new Date - o;
                return a > i ? (w.style.left = n + "px", k && d(), e.transitionEnd && e.transitionEnd.call(event, y, m[y]), void clearInterval(r)) : void(w.style.left = (n - t) * (Math.floor(a / i * 100) / 100) + t + "px")
            },
            4)
        }
        function d() {
            x = setTimeout(o, k)
        }
        function u(t) {
            t || (k = 0),
            clearTimeout(x)
        }
        var h = function() {},
        p = function(t) {
            setTimeout(t || h, 0)
        },
        f = {
            addEventListener: !!window.addEventListener,
            touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
            transitions: function(t) {
                var e = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
                for (var n in e) if (void 0 !== t.style[e[n]]) return ! 0;
                return ! 1
            } (document.createElement("swipe"))
        };
        if (t) {
            var m, g, v, b, w = t.children[0];
            e = e || {};
            var y = parseInt(e.startSlide, 10) || 0,
            _ = e.speed || 300;
            e.continuous = void 0 !== e.continuous ? e.continuous: !0;
            var x, T, k = e.auto || 0,
            j = {},
            C = {},
            q = {
                handleEvent: function(t) {
                    switch (t.type) {
                    case "touchstart":
                        this.start(t);
                        break;
                    case "touchmove":
                        this.move(t);
                        break;
                    case "touchend":
                        p(this.end(t));
                        break;
                    case "webkitTransitionEnd":
                    case "msTransitionEnd":
                    case "oTransitionEnd":
                    case "otransitionend":
                    case "transitionend":
                        p(this.transitionEnd(t));
                        break;
                    case "resize":
                        p(n)
                    }
                    e.stopPropagation && t.stopPropagation()
                },
                start: function(t) {
                    var e = t.touches[0];
                    j = {
                        x: e.pageX,
                        y: e.pageY,
                        time: +new Date
                    },
                    T = void 0,
                    C = {},
                    w.addEventListener("touchmove", this, !1),
                    w.addEventListener("touchend", this, !1)
                },
                move: function(t) {
                    if (! (t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                        e.disableScroll && t.preventDefault();
                        var n = t.touches[0];
                        C = {
                            x: n.pageX - j.x,
                            y: n.pageY - j.y
                        },
                        "undefined" == typeof T && (T = !!(T || Math.abs(C.x) < Math.abs(C.y))),
                        T || (t.preventDefault(), u(!0), e.continuous ? (c(r(y - 1), C.x + g[r(y - 1)], 0), c(y, C.x + g[y], 0), c(r(y + 1), C.x + g[r(y + 1)], 0)) : (C.x = C.x / (!y && C.x > 0 || y == m.length - 1 && C.x < 0 ? Math.abs(C.x) / v + 1 : 1), c(y - 1, C.x + g[y - 1], 0), c(y, C.x + g[y], 0), c(y + 1, C.x + g[y + 1], 0)))
                    }
                },
                end: function() {
                    var t = +new Date - j.time,
                    n = Number(t) < 250 && Math.abs(C.x) > 20 || Math.abs(C.x) > v / 2,
                    i = !y && C.x > 0 || y == m.length - 1 && C.x < 0;
                    e.continuous && (i = !1);
                    var o = C.x < 0;
                    T || (n && !i ? (o ? (e.continuous ? (s(r(y - 1), -v, 0), s(r(y + 2), v, 0)) : s(y - 1, -v, 0), s(y, g[y] - v, _), s(r(y + 1), g[r(y + 1)] - v, _), y = r(y + 1)) : (e.continuous ? (s(r(y + 1), v, 0), s(r(y - 2), -v, 0)) : s(y + 1, v, 0), s(y, g[y] + v, _), s(r(y - 1), g[r(y - 1)] + v, _), y = r(y - 1)), e.callback && e.callback(y, m[y])) : e.continuous ? (s(r(y - 1), -v, _), s(y, 0, _), s(r(y + 1), v, _)) : (s(y - 1, -v, _), s(y, 0, _), s(y + 1, v, _))),
                    w.removeEventListener("touchmove", q, !1),
                    w.removeEventListener("touchend", q, !1)
                },
                transitionEnd: function(t) {
                    parseInt(t.target.getAttribute("data-index"), 10) == y && (k && d(), e.transitionEnd && e.transitionEnd.call(t, y, m[y]))
                }
            };
            return n(),
            k && d(),
            f.addEventListener ? (f.touch && w.addEventListener("touchstart", q, !1), f.transitions && (w.addEventListener("webkitTransitionEnd", q, !1), w.addEventListener("msTransitionEnd", q, !1), w.addEventListener("oTransitionEnd", q, !1), w.addEventListener("otransitionend", q, !1), w.addEventListener("transitionend", q, !1)), window.addEventListener("resize", q, !1)) : window.onresize = function() {
                n()
            },
            {
                setup: function() {
                    n()
                },
                slide: function(t, e) {
                    u(),
                    a(t, e)
                },
                prev: function() {
                    u(),
                    i()
                },
                next: function() {
                    u(),
                    o()
                },
                stop: function() {
                    u()
                },
                getPos: function() {
                    return y
                },
                getNumSlides: function() {
                    return b
                },
                kill: function() {
                    u(),
                    w.style.width = "",
                    w.style.left = "";
                    for (var t = m.length; t--;) {
                        var e = m[t];
                        e.style.width = "",
                        e.style.left = "",
                        f.transitions && c(t, 0, 0)
                    }
                    f.addEventListener ? (w.removeEventListener("touchstart", q, !1), w.removeEventListener("webkitTransitionEnd", q, !1), w.removeEventListener("msTransitionEnd", q, !1), w.removeEventListener("oTransitionEnd", q, !1), w.removeEventListener("otransitionend", q, !1), w.removeEventListener("transitionend", q, !1), window.removeEventListener("resize", q, !1)) : window.onresize = null
                }
            }
        }
    }
    return t
}),
function() {
    function t(t, i, o, r, a) {
        var s, c = i,
        l = [],
        a = void 0 != a ? a: !0;
        if (a && n[t]) {
            for (var d = 0,
            u = n[t].propList, h = u.length; h > d; d++) l.push(c[u[d]]);
            s = n[t].parsefn
        } else {
            var p = o,
            f = r,
            m = [],
            g = function(t) {
                p || (p = "<%", f = "%>");
                var e = document.getElementById(t),
                n = e ? e.innerHTML: t;
                return n.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").split(p).join("	").replace(/'/g, "\r").replace(new RegExp("	=(.*?)" + f, "g"), "';\n s+=$1;\n s+='").split("	").join("';\n").split(f).join("\n s+='").split("\r").join("\\'")
            } (t);
            for (var v in c) m.push(v),
            l.push(c[v]);
            s = new Function(m, "var s='';\n s+='" + g + "';\n return s"),
            a && (n[t] = {
                parsefn: s,
                propList: m
            })
        }
        try {
            return s.apply(e, l)
        } catch(b) {
            var w = "txTpl" + Date.now(),
            y = "var " + w + "=" + s.toString(),
            _ = document.getElementsByTagName("head")[0],
            x = document.createElement("script");
            if (ua = navigator.userAgent.toLowerCase(), ua.indexOf("gecko") > -1 && -1 == ua.indexOf("khtml")) return void e.eval.call(e, y);
            x.innerHTML = y,
            _.appendChild(x),
            _.removeChild(x),
            e[w].apply(e, l)
        }
    }
    var e = window,
    n = {};
    "undefined" != typeof exports ? exports.txTpl = t: e.txTpl = t
} (),
define && define("txTpl", [],
function() {
    return console.log("txTpl"),
    txTpl
}),
define("searchbar", ["jqmobi", "util"],
function(t) {
    var e = [],
    n = function() {
        var n, i = t("#search-hidden-params"),
        o = t("#search-word"),
        r = t("#search-form"),
        a = (t("#search-reset"),
        function() {
            var t, e = n.param,
            a = "";
            r.attr("action", n.url),
            i.html("");
            for (t in e) a += '<input type="hidden" name="' + t + '" value="' + ("{key}" == e[t] ? o.val() : e[t]) + '" />';
            i.html(a)
        });
        r.bind("submit", a),
        o.bind("focus",
        function() {
            this.value = ""
        }),
        e.length && (t.each(e,
        function(t, e) {
            e.isDefault && (n = e)
        }), /OS 4/i.test(navigator.userAgent) && (o.attr("readonly", ""), o.bind("click",
        function(t) {
            t.preventDefault(),
            a(),
            r[0].submit()
        })))
    },
    i = function(t) {
        e = t.searchConf,
        n()
    };
    return {
        init: i
    }
});