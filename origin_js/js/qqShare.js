(function() {
    var a = function() {
        var a = {},
        p = [],
        b = {},
        g = {},
        n = {},
        k = {},
        q = "js/",
        r = "",
        u = function(a, b) {
            var c, g = (a || []).length;
            for (c = 0; c < g; c++) b(a[c], c)
        },
        m = function(f) {
            var b = [];
            u(f,
            function(f) {
                b.push(a[f])
            });
            return b
        },
        c = function(f) {
            var b = !0;
            u(f,
            function(f) { ! a[f] && (b = !1)
            });
            return b
        },
        t = function(f) {
            var t;
            c(f.req) ? (a[f.name] = f.fn.apply(null, m(f.req)) || {},
            a[f.name].__name__ = f.name, g[f.name] = !1, (t = b[f.name]) && (delete b[f.name], t(a[f.name])), B()) : (p.push(f), g[f.name] = !0, setTimeout(function() {
                u(f.req, v)
            },
            0))
        },
        B = function() {
            for (var a, b = 0,
            c = p.length,
            b = 0; b < c; b++)(a = p.shift()) && t(a)
        },
        v = function(f, c) {
            g[f] || (a[f] ? "function" == typeof c && c && c(a[f]) : (g[f] = !0, "function" == typeof c && (b[f] = c), y(n[f]) ? console.log(f + ": " + n[f] + " exists!!!!") : (k[n[f]] = 1, E(n[f] || q + f + ".js"))))
        },
        y = function(a) {
            var b = document.getElementsByTagName("script"),
            c = !1;
            k[a] ? c = !0 : u(b,
            function(b) {
                a == b.src && (c = !0)
            });
            return c
        },
        E = function(a, b) {
            var c;
            c = document.createElement("script");
            c.async = !0;
            c.onload = b;
            c.src = a;
            document.head.appendChild(c)
        };
        return {
            define: function(f, b, c) {
                b = {
                    name: f,
                    req: b,
                    fn: c
                };
                if (a[f]) throw "module " + f + " exists!";
                t(b)
            },
            undefine: function(b, c) {
                delete a[b]
            },
            setPath: function(a) {
                q = a
            },
            setMap: function(a) {
                n = a
            },
            require: v,
            init: function(a) {
                a.loadScript && (E = a.loadScript); (r = a.coreJsUrl) && (k[r] = 1)
            }
        }
    } ();
    window.core = a;
    asyncCall.call("coreok")
})();
if (!window.jq || "function" !== typeof jq) {
    var jq = function(a) {
        function d(a, h, e) {
            var b = x.createDocumentFragment();
            if (e) {
                for (e = a.length - 1; 0 <= e; e--) b.insertBefore(a[e], b.firstChild);
                h.insertBefore(b, h.firstChild)
            } else {
                for (e = 0; e < a.length; e++) b.appendChild(a[e]);
                h.appendChild(b)
            }
        }
        function p(a) {
            return a in A ? A[a] : A[a] = RegExp("(^|\\s)" + a + "(\\s|$)")
        }
        function b(a) {
            for (var h = 0; h < a.length; h++) a.indexOf(a[h]) != h && (a.splice(h, 1), h--);
            return a
        }
        function g(a, h) {
            var e = [];
            if (a == f) return e;
            for (; a; a = a.nextSibling) 1 == a.nodeType && a !== h && e.push(a);
            return e
        }
        function n(a, h) {
            try {
                return h.querySelectorAll(a)
            } catch(e) {
                return []
            }
        }
        function k() {}
        function q(w, h) {
            w.os = {};
            w.os.webkit = h.match(/WebKit\/([\d.]+)/) ? !0 : !1;
            w.os.android = h.match(/(Android)\s+([\d.]+)/) || h.match(/Silk-Accelerated/) ? !0 : !1;
            w.os.androidICS = w.os.android && h.match(/(Android)\s4/) ? !0 : !1;
            w.os.ipad = h.match(/(iPad).*OS\s([\d_]+)/) ? !0 : !1;
            w.os.iphone = !w.os.ipad && h.match(/(iPhone\sOS)\s([\d_]+)/) ? !0 : !1;
            w.os.webos = h.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? !0 : !1;
            w.os.touchpad = w.os.webos && h.match(/TouchPad/) ? !0 : !1;
            w.os.ios = w.os.ipad || w.os.iphone;
            w.os.ios6 = w.os.ios && h.match(/(OS)\s([6])/) ? !0 : !1;
            w.os.playbook = h.match(/PlayBook/) ? !0 : !1;
            w.os.blackberry = w.os.playbook || h.match(/BlackBerry/) ? !0 : !1;
            w.os.blackberry10 = w.os.blackberry && h.match(/Safari\/536/) ? !0 : !1;
            w.os.chrome = h.match(/Chrome/) ? !0 : !1;
            w.os.opera = h.match(/Opera Mobi/) ? !0 : !1;
            w.os.fennec = h.match(/fennec/i) ? !0 : !1;
            w.os.supportsTouch = a.DocumentTouch && x instanceof a.DocumentTouch || "ontouchstart" in a;
            w.os.desktop = !(w.os.ios || w.os.android || w.os.blackberry || w.os.opera || w.os.fennec || w.os.supportsTouch);
            w.feat = {};
            w.feat.nativeTouchScroll = "undefined" !== typeof x.documentElement.getElementsByTagName("head")[0].style["-webkit-overflow-scrolling"] && w.os.ios
        }
        function r(a) {
            return a._jqmid || (a._jqmid = J++)
        }
        function u(a, h, e, b) {
            h = m(h);
            if (h.ns) var c = RegExp("(?:^| )" + h.ns.replace(" ", " .* ?") + "(?: |$)");
            return (z[r(a)] || []).filter(function(a) {
                return a && (!h.e || a.e == h.e) && (!h.ns || c.test(a.ns)) && (!e || a.fn == e || "function" === typeof a.fn && "function" === typeof e && "" + a.fn === "" + e) && (!b || a.sel == b)
            })
        }
        function m(a) {
            a = ("" + a).split(".");
            return {
                e: a[0],
                ns: a.slice(1).sort().join(" ")
            }
        }
        function c(a, h, e) {
            l.isObject(a) ? l.each(a, e) : a.split(/\s/).forEach(function(a) {
                e(a, h)
            })
        }
        function t(a, h, e, b, f) {
            var g = r(a),
            t = z[g] || (z[g] = []);
            c(h, e,
            function(e, h) {
                var c = f && f(h, e),
                g = c || h,
                u = function(e) {
                    var h = g.apply(a, [e].concat(e.data)); ! 1 === h && e.preventDefault();
                    return h
                },
                c = l.extend(m(e), {
                    fn: h,
                    proxy: u,
                    sel: b,
                    del: c,
                    i: t.length
                });
                t.push(c);
                a.addEventListener(c.e, u, !1)
            })
        }
        function B(a, h, e, b) {
            var f = r(a);
            c(h || "", e,
            function(e, h) {
                u(a, e, h, b).forEach(function(e) {
                    delete z[f][e.i];
                    a.removeEventListener(e.e, e.proxy, !1)
                })
            })
        }
        function v(a) {
            var h = l.extend({
                originalEvent: a
            },
            a);
            l.each(R,
            function(e, b) {
                h[e] = function() {
                    this[b] = D;
                    return a[e].apply(a, arguments)
                };
                h[b] = S
            });
            return h
        }
        function y(a, h) {
            if (h && a.dispatchEvent) {
                var e = l.Event("destroy", {
                    bubbles: !1
                });
                a.dispatchEvent(e)
            }
            if ((e = r(a)) && z[e]) {
                for (var b in z[e]) a.removeEventListener(z[e][b].e, z[e][b].proxy, !1);
                delete z[e]
            }
        }
        function E(a, h) {
            if (a) {
                var e = a.childNodes;
                if (e && 0 < e.length) for (var b in e) E(e[b], h);
                y(a, h)
            }
        }
        var f, x = a.document,
        C = [],
        K = C.slice,
        A = [],
        F = 1,
        P = /^\s*<(\w+)[^>]*>/,
        H = {},
        L = {},
        G = function(a, h) {
            this.length = 0;
            if (a) {
                if (a instanceof G && h == f) return a;
                if (l.isFunction(a)) return l(x).ready(a);
                if (l.isArray(a) && a.length != f) {
                    for (var e = 0; e < a.length; e++) this[this.length++] = a[e];
                    return this
                }
                if (l.isObject(a) && l.isObject(h)) {
                    if (a.length == f) a.parentNode == h && (this[this.length++] = a);
                    else for (e = 0; e < a.length; e++) a[e].parentNode == h && (this[this.length++] = a[e]);
                    return this
                }
                if (l.isObject(a) && h == f) return this[this.length++] = a,
                this;
                if (h !== f) {
                    if (h instanceof G) return h.find(a)
                } else h = x
            } else return this;
            if (e = this.selector(a, h)) if (l.isArray(e)) for (var b = 0; b < e.length; b++) this[this.length++] = e[b];
            else this[this.length++] = e;
            return this
        },
        l = function(a, h) {
            return new G(a, h)
        };
        l.is$ = function(a) {
            return a instanceof G
        };
        l.map = function(a, h) {
            var e, b = [],
            c;
            if (l.isArray(a)) for (c = 0; c < a.length; c++) e = h(a[c], c),
            e !== f && b.push(e);
            else if (l.isObject(a)) for (c in a) a.hasOwnProperty(c) && (e = h(a[c], c), e !== f && b.push(e));
            return l([b])
        };
        l.each = function(a, h) {
            var e;
            if (l.isArray(a)) for (e = 0; e < a.length && !1 !== h(e, a[e]); e++);
            else if (l.isObject(a)) for (e in a) if (a.hasOwnProperty(e) && !1 === h(e, a[e])) break;
            return a
        };
        l.extend = function(a) {
            a == f && (a = this);
            if (1 === arguments.length) {
                for (var h in a) this[h] = a[h];
                return this
            }
            K.call(arguments, 1).forEach(function(e) {
                for (var h in e) a[h] = e[h]
            });
            return a
        };
        l.isArray = function(a) {
            return a instanceof Array && a.push != f
        };
        l.isFunction = function(a) {
            return "function" === typeof a
        };
        l.isObject = function(a) {
            return "object" === typeof a
        };
        l.fn = G.prototype = {
            constructor: G,
            forEach: C.forEach,
            reduce: C.reduce,
            push: C.push,
            indexOf: C.indexOf,
            concat: C.concat,
            selector: function(a, h) {
                var e;
                a = a.trim();
                "#" === a[0] && -1 === a.indexOf(" ") && -1 === a.indexOf(">") ? e = h == x ? h.getElementById(a.replace("#", "")) : [].slice.call(n(a, h)) : "<" === a[0] && ">" === a[a.length - 1] ? (e = x.createElement("div"), e.innerHTML = a.trim(), e = [].slice.call(e.childNodes)) : e = [].slice.call(n(a, h));
                return e
            },
            oldElement: f,
            slice: C.slice,
            setupOld: function(a) {
                if (a == f) return l();
                a.oldElement = this;
                return a
            },
            map: function(a) {
                return l.map(this,
                function(h, e) {
                    return a.call(h, e, h)
                })
            },
            each: function(a) {
                this.forEach(function(h, e) {
                    a.call(h, e, h)
                });
                return this
            },
            ready: function(a) { ("complete" === x.readyState || "loaded" === x.readyState) && a();
                x.addEventListener("DOMContentLoaded", a, !1);
                return this
            },
            find: function(a) {
                if (0 === this.length) return f;
                for (var h = [], e, c = 0; c < this.length; c++) {
                    e = l(a, this[c]);
                    for (var g = 0; g < e.length; g++) h.push(e[g])
                }
                return l(b(h))
            },
            html: function(a, h) {
                if (0 === this.length) return f;
                if (a === f) return this[0].innerHTML;
                for (var e = 0; e < this.length; e++) ! 1 !== h && l.cleanUpContent(this[e], !1, !0),
                this[e].innerHTML = a;
                return this
            },
            text: function(a) {
                if (0 === this.length) return f;
                if (a === f) return this[0].textContent;
                for (var h = 0; h < this.length; h++) this[h].textContent = a;
                return this
            },
            css: function(b, h, e) {
                e = e != f ? e: this[0];
                if (0 === this.length) return f;
                if (h == f && "string" === typeof b) return a.getComputedStyle(e),
                e.style[b] ? e.style[b] : a.getComputedStyle(e)[b];
                for (e = 0; e < this.length; e++) if (l.isObject(b)) for (var c in b) this[e].style[c] = b[c];
                else this[e].style[b] = h;
                return this
            },
            empty: function() {
                for (var a = 0; a < this.length; a++) l.cleanUpContent(this[a], !1, !0),
                this[a].innerHTML = "";
                return this
            },
            hide: function() {
                if (0 === this.length) return this;
                for (var a = 0; a < this.length; a++)"none" != this.css("display", null, this[a]) && (this[a].setAttribute("jqmOldStyle", this.css("display", null, this[a])), this[a].style.display = "none");
                return this
            },
            show: function() {
                if (0 === this.length) return this;
                for (var a = 0; a < this.length; a++)"none" == this.css("display", null, this[a]) && (this[a].style.display = this[a].getAttribute("jqmOldStyle") ? this[a].getAttribute("jqmOldStyle") : "block", this[a].removeAttribute("jqmOldStyle"));
                return this
            },
            toggle: function(b) {
                for (var h = !0 === b ? !0 : !1, e = 0; e < this.length; e++)"none" !== a.getComputedStyle(this[e]).display || b !== f && !1 === h ? (this[e].setAttribute("jqmOldStyle", this[e].style.display), this[e].style.display = "none") : (this[e].style.display = this[e].getAttribute("jqmOldStyle") != f ? this[e].getAttribute("jqmOldStyle") : "block", this[e].removeAttribute("jqmOldStyle"));
                return this
            },
            val: function(a) {
                if (0 === this.length) return f;
                if (a == f) return this[0].value;
                for (var h = 0; h < this.length; h++) this[h].value = a;
                return this
            },
            attr: function(a, h) {
                if (0 === this.length) return f;
                if (h === f && !l.isObject(a)) return this[0].jqmCacheId && H[this[0].jqmCacheId][a] ? this[0].jqmCacheId && H[this[0].jqmCacheId][a] : this[0].getAttribute(a);
                for (var e = 0; e < this.length; e++) if (l.isObject(a)) for (var b in a) l(this[e]).attr(b, a[b]);
                else l.isArray(h) || l.isObject(h) || l.isFunction(h) ? (this[e].jqmCacheId || (this[e].jqmCacheId = l.uuid()), H[this[e].jqmCacheId] || (H[this[e].jqmCacheId] = {}), H[this[e].jqmCacheId][a] = h) : null == h && h !== f ? (this[e].removeAttribute(a), this[e].jqmCacheId && H[this[e].jqmCacheId][a] && delete H[this[e].jqmCacheId][a]) : this[e].setAttribute(a, h);
                return this
            },
            removeAttr: function(a) {
                for (var h = this,
                e = 0; e < this.length; e++) a.split(/\s+/g).forEach(function(b) {
                    h[e].removeAttribute(b);
                    h[e].jqmCacheId && H[h[e].jqmCacheId][a] && delete H[h[e].jqmCacheId][a]
                });
                return this
            },
            prop: function(a, h) {
                if (0 === this.length) return f;
                if (h === f && !l.isObject(a)) {
                    var e;
                    return this[0].jqmCacheId && L[this[0].jqmCacheId][a] ? this[0].jqmCacheId && L[this[0].jqmCacheId][a] : !(e = this[0][a]) && a in this[0] ? this[0][a] : e
                }
                for (e = 0; e < this.length; e++) if (l.isObject(a)) for (var b in a) l(this[e]).prop(b, a[b]);
                else l.isArray(h) || l.isObject(h) || l.isFunction(h) ? (this[e].jqmCacheId || (this[e].jqmCacheId = l.uuid()), L[this[e].jqmCacheId] || (L[this[e].jqmCacheId] = {}), L[this[e].jqmCacheId][a] = h) : null == h && h !== f ? l(this[e]).removeProp(a) : this[e][a] = h;
                return this
            },
            removeProp: function(a) {
                for (var h = this,
                e = 0; e < this.length; e++) a.split(/\s+/g).forEach(function(b) {
                    h[e][b] && delete h[e][b];
                    h[e].jqmCacheId && L[h[e].jqmCacheId][a] && delete L[h[e].jqmCacheId][a]
                });
                return this
            },
            remove: function(a) {
                a = l(this).filter(a);
                if (a == f) return this;
                for (var h = 0; h < a.length; h++) l.cleanUpContent(a[h], !0, !0),
                a[h].parentNode.removeChild(a[h]);
                return this
            },
            addClass: function(a) {
                for (var h = 0; h < this.length; h++) {
                    var e = this[h].className,
                    b = [],
                    c = this;
                    a.split(/\s+/g).forEach(function(a) {
                        c.hasClass(a, c[h]) || b.push(a)
                    });
                    this[h].className += (e ? " ": "") + b.join(" ");
                    this[h].className = this[h].className.trim()
                }
                return this
            },
            removeClass: function(a) {
                for (var h = 0; h < this.length; h++) {
                    if (a == f) {
                        this[h].className = "";
                        break
                    }
                    var e = this[h].className;
                    a.split(/\s+/g).forEach(function(a) {
                        e = e.replace(p(a), " ")
                    });
                    this[h].className = 0 < e.length ? e.trim() : ""
                }
                return this
            },
            replaceClass: function(a, h) {
                for (var e = 0; e < this.length; e++) if (a == f) this[e].className = h;
                else {
                    var b = this[e].className;
                    a.split(/\s+/g).concat(h.split(/\s+/g)).forEach(function(a) {
                        b = b.replace(p(a), " ")
                    });
                    b = b.trim();
                    this[e].className = 0 < b.length ? (b + " " + h).trim() : h
                }
                return this
            },
            hasClass: function(a, b) {
                if (0 === this.length) return ! 1;
                b || (b = this[0]);
                return p(a).test(b.className)
            },
            append: function(b, h) {
                if (b && b.length != f && 0 === b.length) return this;
                if (l.isArray(b) || l.isObject(b)) b = l(b);
                var e;
                for (e = 0; e < this.length; e++) if (b.length && "string" != typeof b) b = l(b),
                d(b, this[e], h);
                else {
                    var c = P.test(b) ? l(b) : f;
                    if (c == f || 0 == c.length) c = x.createTextNode(b);
                    c.nodeName != f && "script" == c.nodeName.toLowerCase() && (!c.type || "text/javascript" === c.type.toLowerCase()) ? a.eval(c.innerHTML) : c instanceof G ? d(c, this[e], h) : h != f ? this[e].insertBefore(c, this[e].firstChild) : this[e].appendChild(c)
                }
                return this
            },
            prepend: function(a) {
                return this.append(a, 1)
            },
            insertBefore: function(a, b) {
                if (0 == this.length) return this;
                a = l(a).get(0);
                if (!a || 0 == a.length) return this;
                for (var e = 0; e < this.length; e++) b ? a.parentNode.insertBefore(this[e], a.nextSibling) : a.parentNode.insertBefore(this[e], a);
                return this
            },
            insertAfter: function(a) {
                this.insertBefore(a, !0)
            },
            get: function(a) {
                a = a == f ? 0 : a;
                0 > a && (a += this.length);
                return this[a] ? this[a] : f
            },
            offset: function() {
                if (0 === this.length) return f;
                if (this[0] == a) return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: a.innerWidth,
                    height: a.innerHeight
                };
                var b = this[0].getBoundingClientRect();
                return {
                    left: b.left + a.pageXOffset,
                    top: b.top + a.pageYOffset,
                    right: b.right + a.pageXOffset,
                    bottom: b.bottom + a.pageYOffset,
                    width: b.right - b.left,
                    height: b.bottom - b.top
                }
            },
            height: function() {
                return this.offset().height
            },
            width: function() {
                return this.offset().width
            },
            parent: function(a) {
                if (0 == this.length) return f;
                for (var h = [], e = 0; e < this.length; e++) this[e].parentNode && h.push(this[e].parentNode);
                return this.setupOld(l(b(h)).filter(a))
            },
            children: function(a) {
                if (0 == this.length) return f;
                for (var b = [], e = 0; e < this.length; e++) b = b.concat(g(this[e].firstChild));
                return this.setupOld(l(b).filter(a))
            },
            siblings: function(a) {
                if (0 == this.length) return f;
                for (var b = [], e = 0; e < this.length; e++) this[e].parentNode && (b = b.concat(g(this[e].parentNode.firstChild, this[e])));
                return this.setupOld(l(b).filter(a))
            },
            closest: function(a, b) {
                if (0 == this.length) return f;
                var e = this[0],
                c = l(a, b);
                if (0 == c.length) return l();
                for (; e && -1 == c.indexOf(e);) e = e !== b && e !== x && e.parentNode;
                return l(e)
            },
            filter: function(a) {
                if (0 == this.length) return f;
                if (a == f) return this;
                for (var h = [], e = 0; e < this.length; e++) {
                    var c = this[e];
                    c.parentNode && 0 <= l(a, c.parentNode).indexOf(c) && h.push(c)
                }
                return this.setupOld(l(b(h)))
            },
            not: function(a) {
                if (0 == this.length) return f;
                for (var h = [], e = 0; e < this.length; e++) {
                    var c = this[e];
                    c.parentNode && -1 == l(a, c.parentNode).indexOf(c) && h.push(c)
                }
                return this.setupOld(l(b(h)))
            },
            data: function(a, b) {
                return this.attr("data-" + a, b)
            },
            end: function() {
                return this.oldElement != f ? this.oldElement: l()
            },
            clone: function(a) {
                a = !1 === a ? !1 : !0;
                if (0 == this.length) return f;
                for (var b = [], e = 0; e < this.length; e++) b.push(this[e].cloneNode(a));
                return l(b)
            },
            size: function() {
                return this.length
            },
            serialize: function(a) {
                if (0 == this.length) return "";
                for (var b = {},
                e = 0; e < this.length; e++) this.slice.call(this[e].elements).forEach(function(a) {
                    var e = a.getAttribute("type");
                    if ("fieldset" != a.nodeName.toLowerCase() && !a.disabled && "submit" != e && "reset" != e && "button" != e && ("radio" != e && "checkbox" != e || a.checked)) b[a.getAttribute("name")] = a.value
                });
                return l.param(b, a)
            }
        };
        var M = {
            type: "GET",
            beforeSend: k,
            success: k,
            error: k,
            complete: k,
            context: f,
            timeout: 0,
            crossDomain: !1
        };
        l.jsonP = function(b) {
            var c = "jsonp_callback" + ++F,
            e = "",
            f = x.createElement("script");
            a[c] = function(g) {
                clearTimeout(e);
                l(f).remove();
                delete a[c];
                b.success.call(void 0, g)
            };
            f.src = b.url.replace(/=\?/, "=" + c);
            b.error && (f.onerror = function() {
                clearTimeout(e);
                b.error.call(void 0, "", "error")
            });
            l("head").append(f);
            0 < b.timeout && (e = setTimeout(function() {
                b.error.call(void 0, "", "timeout")
            },
            b.timeout));
            return {}
        };
        l.ajax = function(b) {
            var c;
            try {
                var e = b || {},
                f;
                for (f in M) e[f] || (e[f] = M[f]);
                e.url || (e.url = a.location);
                e.contentType || (e.contentType = "application/x-www-form-urlencoded");
                e.headers || (e.headers = {});
                if (! ("async" in e) || !1 !== e.async) e.async = !0;
                if (e.dataType) switch (e.dataType) {
                case "script":
                    e.dataType = "text/javascript, application/javascript";
                    break;
                case "json":
                    e.dataType = "application/json";
                    break;
                case "xml":
                    e.dataType = "application/xml, text/xml";
                    break;
                case "html":
                    e.dataType = "text/html";
                    break;
                case "text":
                    e.dataType = "text/plain";
                    break;
                default:
                    e.dataType = "text/html";
                    break;
                case "jsonp":
                    return l.jsonP(b)
                } else e.dataType = "text/html";
                l.isObject(e.data) && (e.data = l.param(e.data));
                "get" === e.type.toLowerCase() && e.data && ( - 1 === e.url.indexOf("?") ? e.url += "?" + e.data: e.url += "&" + e.data);
                if (/=\?/.test(e.url)) return l.jsonP(e);
                e.crossDomain || (e.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(e.url) && RegExp.$2 != a.location.host);
                e.crossDomain || (e.headers = l.extend({
                    "X-Requested-With": "XMLHttpRequest"
                },
                e.headers));
                var g, t = e.context,
                u = /^([\w-]+:)\/\//.test(e.url) ? RegExp.$1: a.location.protocol;
                c = new a.XMLHttpRequest;
                c.onreadystatechange = function() {
                    var a = e.dataType;
                    if (4 === c.readyState) {
                        clearTimeout(g);
                        var b, f = !1;
                        if (200 <= c.status && 300 > c.status || 0 === c.status && "file:" == u) {
                            if ("application/json" === a && !/^\s*$/.test(c.responseText)) try {
                                b = JSON.parse(c.responseText)
                            } catch(m) {
                                f = m
                            } else b = c.responseText;
                            0 === c.status && 0 === b.length && (f = !0);
                            f ? e.error.call(t, c, "parsererror", f) : e.success.call(t, b, "success", c)
                        } else f = !0,
                        e.error.call(t, c, "error");
                        e.complete.call(t, c, f ? "error": "success")
                    }
                };
                c.open(e.type, e.url, e.async);
                e.withCredentials && (c.withCredentials = !0);
                e.contentType && (e.headers["Content-Type"] = e.contentType);
                for (var m in e.headers) c.setRequestHeader(m, e.headers[m]);
                if (!1 === e.beforeSend.call(t, c, e)) return c.abort(),
                !1;
                0 < e.timeout && (g = setTimeout(function() {
                    c.onreadystatechange = k;
                    c.abort();
                    e.error.call(t, c, "timeout")
                },
                e.timeout));
                c.send(e.data)
            } catch(p) {
                console.log(p)
            }
            return c
        };
        l.get = function(a, b) {
            return this.ajax({
                url: a,
                success: b
            })
        };
        l.post = function(a, b, e, c) {
            "function" === typeof b && (e = b, b = {});
            c === f && (c = "html");
            return this.ajax({
                url: a,
                type: "POST",
                data: b,
                dataType: c,
                success: e
            })
        };
        l.getJSON = function(a, b, e) {
            "function" === typeof b && (e = b, b = {});
            return this.ajax({
                url: a,
                data: b,
                success: e,
                dataType: "json"
            })
        };
        l.param = function(a, b) {
            var e = [];
            if (a instanceof G) a.each(function() {
                e.push((b ? b + "[]": this.id) + "=" + encodeURIComponent(this.value))
            });
            else for (var c in a) {
                var f = b ? b + "[" + c + "]": c,
                g = a[c];
                e.push(l.isObject(g) ? l.param(g, f) : f + "=" + encodeURIComponent(g))
            }
            return e.join("&")
        };
        l.parseJSON = function(a) {
            return JSON.parse(a)
        };
        l.parseXML = function(a) {
            return (new DOMParser).parseFromString(a, "text/xml")
        };
        q(l, navigator.userAgent);
        l.__detectUA = q;
        "function" !== typeof String.prototype.trim && (String.prototype.trim = function() {
            this.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/, "");
            return this
        });
        l.uuid = function() {
            var a = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
        };
        var z = {},
        J = 1,
        N = {};
        l.event = {
            add: t,
            remove: B
        };
        l.fn.bind = function(a, b) {
            for (var e = 0; e < this.length; e++) t(this[e], a, b);
            return this
        };
        l.fn.unbind = function(a, b) {
            for (var e = 0; e < this.length; e++) B(this[e], a, b);
            return this
        };
        l.fn.one = function(a, b) {
            return this.each(function(e, c) {
                t(this, a, b, null,
                function(a, b) {
                    return function() {
                        var e = a.apply(c, arguments);
                        B(c, b, a);
                        return e
                    }
                })
            })
        };
        var D = function() {
            return ! 0
        },
        S = function() {
            return ! 1
        },
        R = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        l.fn.delegate = function(a, b, e) {
            for (var c = 0; c < this.length; c++) {
                var f = this[c];
                t(f, b, e, a,
                function(b) {
                    return function(e) {
                        var c, h = l(e.target).closest(a, f).get(0);
                        if (h) return c = l.extend(v(e), {
                            currentTarget: h,
                            liveFired: f
                        }),
                        b.apply(h, [c].concat([].slice.call(arguments, 1)))
                    }
                })
            }
            return this
        };
        l.fn.undelegate = function(a, b, e) {
            for (var c = 0; c < this.length; c++) B(this[c], b, e, a);
            return this
        };
        l.fn.on = function(a, b, e) {
            return b === f || l.isFunction(b) ? this.bind(a, b) : this.delegate(b, a, e)
        };
        l.fn.off = function(a, b, e) {
            return b === f || l.isFunction(b) ? this.unbind(a, b) : this.undelegate(b, a, e)
        };
        l.fn.trigger = function(a, b, e) {
            "string" == typeof a && (a = l.Event(a, e));
            a.data = b;
            for (b = 0; b < this.length; b++) this[b].dispatchEvent(a);
            return this
        };
        l.Event = function(a, b) {
            var e = x.createEvent(N[a] || "Events"),
            c = !0;
            if (b) for (var f in b)"bubbles" == f ? c = !!b[f] : e[f] = b[f];
            e.initEvent(a, c, !0, null, null, null, null, null, null, null, null, null, null, null, null);
            return e
        };
        l.bind = function(a, b, e) {
            a.__events || (a.__events = {});
            l.isArray(b) || (b = [b]);
            for (var c = 0; c < b.length; c++) a.__events[b[c]] || (a.__events[b[c]] = []),
            a.__events[b[c]].push(e)
        };
        l.trigger = function(a, b, e) {
            var c = !0;
            if (!a.__events) return c;
            l.isArray(b) || (b = [b]);
            l.isArray(e) || (e = []);
            for (var f = 0; f < b.length; f++) if (a.__events[b[f]]) for (var g = a.__events[b[f]], t = 0; t < g.length; t++) l.isFunction(g[t]) && !1 === g[t].apply(a, e) && (c = !1);
            return c
        };
        l.unbind = function(a, b, e) {
            if (!a.__events) return ret;
            l.isArray(b) || (b = [b]);
            for (var c = 0; c < b.length; c++) if (a.__events[b[c]]) for (var g = a.__events[b[c]], t = 0; t < g.length; t++) if (e == f && delete g[t], g[t] == e) {
                g.splice(t, 1);
                break
            }
        };
        l.proxy = function(a, b, e) {
            return function() {
                return e ? a.apply(b, e) : a.apply(b, arguments)
            }
        };
        var T = function(a, b) {
            for (var e = 0; e < a.length; e++) E(a[e], b)
        };
        l.cleanUpContent = function(a, b, e) {
            if (a) {
                var c = a.childNodes;
                c && 0 < c.length && l.asap(T, {},
                [K.apply(c, [0]), e]);
                b && y(a, e)
            }
        };
        var Q = [],
        I = [],
        O = [];
        l.asap = function(b, c, e) {
            if (!l.isFunction(b)) throw "$.asap - argument is not a valid function";
            Q.push(b);
            I.push(c ? c: {});
            O.push(e ? e: []);
            a.postMessage("jqm-asap", "*")
        };
        a.addEventListener("message",
        function(b) {
            b.source == a && "jqm-asap" == b.data && (b.stopPropagation(), 0 < Q.length && Q.shift().apply(I.shift(), O.shift()))
        },
        !0);
        return l
    } (window);
    window.$ = jq;
    window.numOnly || (window.numOnly = function(a) {
        if (void 0 === a || "" === a) return 0;
        if (isNaN(parseFloat(a))) if (a.replace) a = a.replace(/[^0-9.-]/, "");
        else return 0;
        return parseFloat(a)
    })
}
core.define("$", [],
function() {
    return $
});
core.define("util", ["$"],
function(a) {
    var d = {};
    d.url = function() {
        var a = function(a) {
            var g = [],
            p = {},
            d,
            q = decodeURIComponent,
            g = a.split("&");
            for (a = g.length; a--;) d = g[a],
            d = d.split("="),
            p[q(d[0])] = q(d[1]);
            return p
        };
        return {
            obj2Str: function(a, g) {
                var p = "",
                d, q;
                for (d in a)"undefined" !== typeof a[d] && (q = g ? encodeURIComponent(a[d]) : a[d], p += d + "=" + q + "&");
                return p.slice(0, p.length - 1)
            },
            url2obj: a,
            getUrlParam: function() {
                return a(location.search.slice(1))
            },
            getHashParams: function(a) {
                a = a ? a: decodeURIComponent(location.hash);
                var g = [],
                p = {};
                a.replace(/[\.\?\/'"><:;,\[\]\{\}]/ig, "");
                g = a.split("/");
                0 < g.length && (p.__vpageid = g[0].substring(1), p.urlParams = 1 < g.length ? this.url2obj(g[1], !0) : {});
                return p
            },
            getHash: function() {
                return location.hash || "#"
            }
        }
    } ();
    d.load = function() {
        return {
            loadScript: function(p, b) {
                try {
                    p = p instanceof Array ? p: [p];
                    b = b instanceof Array ? b: [b];
                    var g = document.getElementsByTagName("head")[0],
                    d = document.createDocumentFragment(),
                    k = [];
                    a.each(p,
                    function(a, b) {
                        k[a] = document.createElement("script");
                        k[a].src = b;
                        k[a].type = "text/javascript";
                        d.appendChild(k[a])
                    });
                    g.appendChild(d);
                    a.each(b,
                    function(a, b) {
                        "function" == typeof b && (k[a].onreadystatechange = function() { ("complete" == k[a].readyState || "loaded" == k[a].readyState) && b()
                        },
                        k[a].onload = function() {
                            b()
                        },
                        k[a].onerror = function() {
                            this.onload = this.onerror = null;
                            this.parentNode.removeChild(this)
                        })
                    })
                } catch(q) {
                    console.error("Warning:There is error on load javascript file!")
                }
            },
            loadCss: function(a) {
                if (a) {
                    var b = document.createDocumentFragment(),
                    g = document.createElement("link");
                    g.async = !0;
                    g.rel = "stylesheet";
                    g.href = a;
                    g.type = "text/css";
                    b.appendChild(g);
                    document.getElementsByTagName("head")[0].appendChild(b)
                }
            },
            loadStaticStyle: function(a) {
                var b = document.createElement("style");
                b.innerHTML = a;
                document.getElementsByTagName("head")[0].appendChild(b)
            },
            loadImg: function(d) {
                a.each(d,
                function(a, g) {
                    var d = g.getAttribute("orgsrc");
                    d && nextFrame(function() {
                        g.src = d;
                        g.removeAttribute("orgsrc")
                    })
                })
            }
        }
    } ();
    d.cookie = function() {
        return {
            getCookie: function(a) {
                a += "=";
                for (var b = document.cookie.split(" "), g = 0; g < b.length; g++) {
                    var d = b[g].split(";")[0];
                    if (0 == d.indexOf(a)) return decodeURIComponent(d.substring(a.length, d.length))
                }
                return ""
            },
            setCookie: function(a, b, g, d, k) {
                var q = new Date;
                null != g && q.setTime(q.getTime() + 864E5 * g);
                document.cookie = a + "=" + escape(b) + (null == g ? "": "; expires=" + q.toGMTString()) + (null == d ? "": "; domain=" + d) + (null == k ? ";path=/": "; path=" + k)
            },
            delCookie: function(a, b, g) {
                if ("undefined" == typeof b || null == b) b = "qq.com";
                var d = new Date;
                d.setTime(d.getTime() - 1);
                var k = this.getCookie(a);
                "" != k && (document.cookie = a + "=" + k + (null != g ? ";path=" + g: "/") + (b ? ";domain=" + b: "") + ";expires=" + d.toGMTString())
            }
        }
    } ();
    d.req = function(d) {
        a.ajax(a.extend({
            url: "/g/s"
        },
        d))
    };
    d.tpl = function b(a, d) {
        var k = b._cache || (b._cache = {}),
        q = k[a];
        if (q) return q(d || {});
        var q = b._regarg || (b.regarg = /\$([A-z_][^$]*\b)/g),
        r = b._cachereg || (b._cachereg = /<%=(.*?)%>|(<%)|(%>)/g),
        u = b._cachefn || (b._cachefn = function(a, b, g, d) {
            return (b ? "'+(" + b + ")+'": "") + (g ? "';": "") + (d ? "p+='": "")
        }),
        q = k[a] = new Function("a$", "var p=''; p+='" + a.replace(r, u).replace(q, "a$.$1") + "'; return p;");
        console.log(q);
        return q(d || {})
    };
    d.array = function() {
        return {
            shuffle: function(a) {
                a = a.slice(0);
                var g = a.length - 1,
                d, k;
                for (g; 0 <= g; g--) d = Math.floor(Math.random() * g),
                k = a[d],
                a[d] = a[g],
                a[g] = k;
                return a
            }
        }
    } ();
    d.string = function() {
        return {
            trim: function(a) {
                return a.replace(/(^\s*)|(\s*$)/g, "").replace(/(^　*)|(　*$)/g, "")
            }
        }
    } ();
    d.img = function() {
        return {
            resizeImage: function(a, g, d) {
                var k = new Image;
                k.src = a.attr("src");
                var q = "",
                r = "";
                k.onload = function() {
                    0 < k.width && 0 < k.height && (g / k.width >= d / k.height ? 1 > d / k.height || 1 < g / k.width ? (a.attr("width", g), q = parseInt(k.height * g / k.width), a.attr("height", q)) : (a.attr("height", d), r = parseInt(k.width * d / k.height), a.attr("width", r)) : 1 > g / k.width || 1 < d / k.height ? (a.attr("height", d), r = parseInt(k.width * d / k.height), a.attr("width", r)) : (a.attr("width", g), q = parseInt(k.height * g / k.width), a.attr("height", q)))
                }
            }
        }
    } ();
    d.storage = function() {
        return {
            isSupportLocalStorage: function() {
                try {
                    return "localStorage" in window && window.localStorage
                } catch(a) {
                    return ! 1
                }
            }
        }
    } ();
    d.encrypt = function() {
        var a = d.cookie.getCookie("skey") || "",
        g = d.cookie.getCookie("p_skey") || "",
        n = d.cookie.getCookie("p_lskey") || "",
        a = a || g || n,
        g = 70215614;
        if (a) {
            for (var n = 0,
            k = a.length; n < k; n++) g += (g << 5) + a.charAt(n).charCodeAt();
            return g & 2147483647
        }
        return ""
    };
    return d
});
core.define("msgMod", ["$"],
function(a) {
    var d = {
        _events: {},
        _isFunction: function(a) {
            return "[object Function]" == Object.prototype.toString.call(a)
        },
        notify: function(d, b, g) {
            var n, k = this._events;
            1 == arguments.length && (b = d, d = null);
            2 == arguments.length && (g = b, b = d, d = null);
            if (d)(n = k[d]) && a.trigger(n, b, g);
            else for (n in k) k.hasOwnProperty(n) && a.trigger(k[n], b, g)
        },
        listen: function(d, b, g) {
            var n;
            n = this._events;
            2 == arguments.length && (g = b, b = d, d = "__global__");
            n = n[d] = n[d] || {};
            if (!this._isFunction(g)) throw "VANGOGH.msg.listen : cb is not a function!";
            a.bind(n, b, g)
        }
    };
    return window._msg = d
});
core.define("loginMod", ["$", "msgMod", "util"],
function(a, d, p) {
    document.domain = "qq.com";
    console.log("login init");
    if ("undefined" != typeof isSwitchNewLogin && isSwitchNewLogin) {
        var b = "00",
        g = {},
        n = !1,
        k = "",
        q = "",
        r = "",
        u = function() {
            var a = "",
            b = null,
            d = null,
            g = {
                login: {
                    arrKeys: [],
                    queue: {}
                },
                logout: {
                    arrKeys: [],
                    queue: {}
                }
            },
            m = !1,
            p = {
                login: {},
                logout: -1
            },
            f,
            k = !1,
            n = {
                getTopHeight: function() {
                    return document.body.scrollTop + (270 < window.innerHeight ? (window.innerHeight - 270) / 2 : 0)
                },
                showLoginBox: function() {
                    d.style.cssText += "display:block;width:100%;height:100%;";
                    b.style.cssText += "transition: 0;";
                    b.style.cssText += "top:" + n.getTopHeight() + "px;";
                    b.style.cssText += "display:block; visibility:hidden;opacity: 0;transition: opacity 200ms;";
                    setTimeout(function() {
                        b.style.cssText += "opacity:1;visibility:visible;"
                    },
                    200)
                },
                closeLoginBox: function() {
                    d.style.display = "none";
                    b.style.display = "none"
                },
                addQueueFunc: function(a, b) {
                    var c, f, d = b.toString();
                    if ("login" == a || "logout" == a) if (c = g[a].queue, f = g[a].arrKeys, !c[d] || -1 == this.getIndexInArray(d, f)) f.push(d),
                    c[d] = b
                },
                removeQueueFunc: function(a, b) {
                    var c, f, d = b.toString();
                    if ("login" == a || "logout" == a) c = g[a].queue,
                    f = g[a].arrKeys,
                    f.splice(this.getIndexInArray(d, f), 1),
                    delete c[d]
                },
                doQueueFunc: function(a, b) {
                    var c, f;
                    if ("login" == a || "logout" == a) {
                        k = "login" == a ? !0 : !1;
                        p[a] = b;
                        c = g[a].queue;
                        f = g[a].arrKeys;
                        for (var d = 0,
                        t = f.length; d < t; d++) c[f[d]](b)
                    }
                },
                getAjaxData: function(a) {
                    return ! ("login" == a || "logout" == a) ? "": p[a]
                },
                getIndexInArray: function(a, b) {
                    if (b.indexOf) return b.indexOf(a);
                    for (var c = 0,
                    f = b.length; c < f; c++) if (b[c] === a) return c;
                    return - 1
                },
                objToStr: function(a, b) {
                    var c = "",
                    f, d;
                    for (f in a)"undefined" !== typeof a[f] && (d = b ? encodeURIComponent(a[f]) : a[f], c += f + "=" + d + "&");
                    return c.slice(0, c.length - 1)
                },
                getScript: function(a, b, c) {
                    var f = document.createElement("script");
                    f.language = "javascript";
                    f.type = "text/javascript";
                    c && (f.charset = c);
                    f.onload = f.onreadystatechange = function() {
                        if (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState) b && b(),
                        f.onload = f.onreadystatechange = null,
                        f.parentNode.removeChild(f)
                    };
                    f.src = a;
                    document.getElementsByTagName("head")[0].appendChild(f)
                },
                randomString: function(a) {
                    var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
                    a || (a = Math.floor(Math.random() * b.length));
                    for (var c = "",
                    f = 0; f < a; f++) c += b[Math.floor(Math.random() * b.length)];
                    return c
                },
                set_iframe_src: function(f) {
                    var d = "";
                    if ( - 1 != (navigator.userAgent || "").indexOf("MQQBrowserLightApp")) d = "&pt_no_onekey=1";
                    f = "http://ui.ptlogin2.qq.com/cgi-bin/login?style=38&appid=728041403&s_url=" + encodeURIComponent(f) + "&target=self&low_login=1&low_login_hour=4321&daid=" + ( - 1 < location.host.indexOf("3g.qq.com") ? 261 : 287) + a + d;
                    b.setAttribute("src", f)
                }
            };
            document.body.appendChild(function(a) {
                a = document.createDocumentFragment();
                var c = document.createElement("iframe");
                c.id = "ptlogin_iframe";
                c.setAttribute("frameborder", "0");
                c.setAttribute("scrolling", "no");
                c.style.cssText = "display:none;z-index:9999;position:absolute;left:50%;top:50%;margin:0px 0 0 -140px;height:270px;width:280px;background:transparent;";
                var g = document.createElement("div");
                g.id = "ptlogin_shadow";
                g.style.cssText += "display:none;z-index:9998;position:fixed;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.7;";
                a.appendChild(c);
                a.appendChild(g);
                b = c;
                d = g;
                window.addEventListener("message",
                function(a) {
                    if (a && "jqm-asap" != a.data) {
                        if ( - 1 < a.origin.indexOf("3g.qq.com")) try {
                            var b = eval("(" + a.data + ")"),
                            c = b.JSP || {};
                            "login" == b.action && (n.closeLoginBox(), f && f(c), u.doQueueFunc("login", c))
                        } catch(d) {}
                        if ( - 1 < a.origin.indexOf("ui.ptlogin2.qq.com")) try {
                            b = eval("(" + a.data + ")"),
                            "close" == b.action && n.closeLoginBox()
                        } catch(g) {}
                    }
                },
                !0);
                window.addEventListener("orientationchange",
                function() {
                    "none" != b.style.display && (b.style.cssText += "top:" + n.getTopHeight() + "px;", setTimeout(function() {
                        b.style.cssText += "top:" + n.getTopHeight() + "px;"
                    },
                    500))
                },
                !1);
                return a
            } ());
            return {
                init: function(b) {
                    var f = n.objToStr(b);
                    a = !f ? "": "&" + f;
                    b && b.isLogin && (k = !0)
                },
                doQueueFunc: function(a, b, c) {
                    n.doQueueFunc(a, b, c)
                },
                getData: function(a) {
                    return n.getAjaxData(a)
                },
                isLogin: function() {
                    return k
                },
                bind: function(a, b) {
                    n.addQueueFunc(a, b)
                },
                login: function(a) {
                    f = "function" == typeof a ? a: function() {};
                    n.set_iframe_src("http://infoapp.3g.qq.com/g/login/proxy.jsp?sourceUrl=" + encodeURIComponent(encodeURIComponent(location.href)));
                    n.showLoginBox()
                },
                logout: function(a) {
                    var b = function() {
                        pt_logout.logout(function(b) {
                            n.doQueueFunc("logout", b);
                            a && a(b)
                        })
                    };
                    m ? b() : n.getScript("http://imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js",
                    function() {
                        m = !0;
                        b()
                    },
                    "utf-8")
                }
            }
        } ();
        a.extend(g, {
            init: function(a) {
                b = a.sid;
                n = a.islogin;
                k = a.uid || "";
                q = a.nickname || "";
                u.init(a)
            },
            getSid: function() {
                return b
            },
            getUid: function() {
                return k
            },
            getNickName: function() {
                return q
            },
            getHead: function(a) {
                return r
            },
            loginOut: function(c) {
                u.logout(function(g) {
                    if (2 == g) if (d && d.notify("loginout", []), b = "", n = !1, q = k = "", a.isFunction(c) && c(), a.isFunction(history.replaceState)) {
                        g = location.protocol + "//" + location.host + location.pathname;
                        var m = "",
                        m = location.search,
                        m = /[?&]sid=[^&#]*/g.test(m) ? m.replace(/([?&])sid=[^&#]*/g, "$1sid=") : m,
                        m = g + m + location.hash;
                        window.history.replaceState(null, document.title, m);
                        location.reload()
                    } else g = window.location.href.replace(/([&\?])sid=[^&#]*/g, "$1sid="),
                    location.href = g;
                    else console.log("status=" + g)
                })
            },
            isLogin: function() {
                return n
            },
            login: function(a) {
                n ? a && a() : u.login(function(g) {
                    k = g.uin;
                    q = g.nick;
                    n = g.isLogin;
                    r = g.head;
                    d && d.notify("loginok", [{
                        uin: k,
                        nick: q,
                        sid: b
                    }]);
                    a && a()
                })
            },
            qqBrowserPushMsg: function(a, b, d, g) {
                try {
                    window.isFromQQBrower && ("undefined" != typeof x5 && "undefined" != typeof x5.app) && ("function" !== typeof d && (d = function(a) {
                        try {
                            localStorage.setItem("qbtokenFeature", "1")
                        } catch(b) {}
                        console.log("success ! doTokenFeature callback:\n=====>rCode:" + a.rCode)
                    }), "" == a ? tokenFeature("", "", d) : tokenFeature(a, g + "_" + a, d))
                } catch(m) {
                    alert(m)
                }
            }
        });
        return g
    }
    var m = function(a, b, d) {
        document.cookie = a + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (d ? d: "/") + "; " + (b ? "domain=" + b + ";": "")
    };
    return function() {
        function b() {
            pt.init({
                auto: !1,
                ui: !0,
                bid: "info",
                acctHolder: "请输入QQ号",
                pwdHolder: "请输入QQ密码",
                mainTitle: "腾讯统一登录",
                onSuccess: function(b) {
                    k = b.sid;
                    r = b.uin;
                    f = b.nick;
                    n = !0;
                    d && d.notify("loginok", [b]);
                    K(b);
                    if (a.isFunction(history.replaceState)) {
                        b = location.protocol + "//" + location.host + location.pathname;
                        var c = "",
                        c = location.search,
                        c = "" == c ? c + "?sid=" + k: /[?&]sid=[^&#]*/g.test(c) ? c.replace(/([?&])sid=[^&#]*/g, "$1sid=" + k) : c + "&sid=" + k,
                        c = b + c + location.hash;
                        window.history.replaceState(null, document.title, c)
                    }
                },
                onFailure: function() {},
                onCancel: function() {}
            });
            b = function() {}
        }
        function g() {
            b();
            pt.fire({
                ui: !0
            })
        }
        function u(a) {
            C || (C = !0, p.load.loadScript("http://3gimg.qq.com/ptlogin/touch/js/ptlogin.js",
            function() {
                C = !1;
                q = !0;
                a && a()
            }))
        }
        var k = "00",
        n = !1,
        r = "",
        f = "",
        q = !1,
        C = !1,
        K = function() {};
        return {
            init: function(a) {
                k = a.sid;
                n = a.islogin;
                r = a.uid || "";
                f = a.nickname || "";
                p.load.loadCss("http://3glogo.gtimg.com/wap30/info/info5/css/ptlogin_info.css")
            },
            login: function(a) {
                K = a ||
                function() {};
                n ? K.call(null) : q ? g() : u(g)
            },
            ptLoad: function(a) {
                pt.load(a)
            },
            qqBrowserPushMsg: function(a, b, c, f) {
                try {
                    window.isFromQQBrower && ("undefined" != typeof x5 && "undefined" != typeof x5.app) && ("function" !== typeof c && (c = function(a) {
                        try {
                            localStorage.setItem("qbtokenFeature", "1")
                        } catch(b) {}
                        console.log("success ! doTokenFeature callback:\n=====>rCode:" + a.rCode)
                    }), "" == a ? tokenFeature("", "", c) : tokenFeature(a, f + "_" + a, c))
                } catch(d) {
                    alert(d)
                }
            },
            isLogin: function() {
                return n
            },
            setStatus: function(a) {
                n = !!a
            },
            getSid: function() {
                return k
            },
            getNickName: function() {
                return f
            },
            getUid: function() {
                return r
            },
            reLogin: function(a) {
                n = !1;
                this.login(a)
            },
            loginOut: function(a) {
                d.notify("loginout", []);
                m("p_uin", "3g.qq.com");
                m("p_skey", "3g.qq.com");
                m("p_luin", "3g.qq.com");
                m("p_lskey", "3g.qq.com");
                m("pt4_token", "3g.qq.com");
                m("pt_mbkey", "3g.qq.com");
                m("uin_m", "3g.qq.com");
                m("skey_m", "3g.qq.com");
                m("skey", "qq.com");
                var b = document.createElement("IFRAME"),
                c = window.location.href.replace(/([&\?])sid=[^&#]*/g, "$1sid=");
                a = a || c;
                b.id = "ifr01";
                b.name = "ifr01";
                b.style.position = "absolute";
                b.style.top = "-9999px";
                b.style.left = "-9999px";
                b.style.display = "none";
                b.src = "http://pt.3g.qq.com/s?aid=nLogout&sid=" + k + "&redir_url=" + a;
                document.body.appendChild(b);
                setTimeout(function() {
                    window.location.href = a
                },
                1E3)
            }
        }
    } ()
});
core.define("pm", ["$", "util"],
function(a, d) {
    var p = {};
    return p = function() {
        function b(b) {
            b = b ? b: decodeURIComponent(location.hash);
            var c = [],
            d = {};
            b.replace(/[\.\?'"><:;,\[\]\{\}]/ig, "");
            c = b.split("/");
            0 < c.length && (d.__vpageid = c.splice(0, 1)[0].substring(1), d.urlParams = 0 < c.length ? a.param(c.join("/"), !0) : {});
            return d
        }
        function g(b) {
            b && b.preventDefault();
            console.log("loadpage");
            m && (a.trigger(m, "vpageLeave", [{
                prevPage: u,
                curPage: r
            }]), a.trigger(window, "vpageLeave", [{
                prevPage: u,
                curPage: r
            }]), m = null);
            b = d.url.getHashParams();
            u = r;
            r = b.__vpageid || c;
            g_m_jsMap["page." + r] || (r = c);
            k = q;
            v = q = location.hash;
            B.push(k + "--\x3e" + q);
            p()
        }
        function p() {
            console.log("pageEnter");
            var c = b();
            m = t[r];
            a.trigger(window, "beforeVpageLoad", [{
                curPage: r,
                prevPage: u
            }]); ! m || !m.__inited ? (a.trigger(window, "beforeVpageInit", [{
                curPage: r,
                prevPage: u
            }]), core.require("page." + r,
            function() {
                a.trigger(window, "afterVpageInit", [{
                    curPage: r,
                    prevPage: u
                }]);
                var c = r;
                console.log(c + " module init event");
                m = t[c];
                if (!m || !m.__inited) b(),
                a.trigger(m, "vpageAdd", [{
                    pageId: c
                }]),
                m.vpageId = c,
                a.trigger(window, "vpageInit"),
                a.trigger(m, "vpageInit"),
                m.__inited = !0;
                p()
            })) : window.setTimeout(function() {
                a.trigger(window, "vpageEnter", [{
                    curPage: r,
                    prevPage: u
                }]);
                void 0 != m.prevParas && a.param(c.urlParams) == m.prevParas ? a.trigger(m, "vpageBack") : a.trigger(m, "vpageEnter");
                a.extend(m, {
                    prevParas: a.param(c.urlParams)
                })
            },
            "200")
        }
        var k = "",
        q = "",
        r = "",
        u = "",
        m = null,
        c = "",
        t = {},
        B = [],
        v = "",
        y = function() {
            v != location.hash && "" != location.hash && (v = location.hash, g());
            setTimeout(y, 500)
        };
        return {
            init: function(a) {
                c = a.home;
                "onhashchange" in window ? window.addEventListener("hashchange", g, !1) : (setTimeout(function() {
                    y()
                },
                500), alert("not support onpopstate"));
                b();
                g()
            },
            go: function(a) {
                window.location.hash = a
            },
            register: function(a, b) {
                console.log("pm register:" + b);
                t[b] = a
            },
            getCurHash: function() {
                return q
            },
            getTrace: function() {
                return B
            },
            getPrevHash: function() {
                return k
            },
            notify: function(b, c) {
                m && a.trigger(m, b, c)
            }
        }
    } ()
});
core.define("loadMod", ["$"],
function(a) {
    return {
        isShowing: !1,
        timer: null,
        loadDiv: null,
        createDiv: function() {
            var d;
            d = '<div id="div_waiting" class="hide" style="position:absolute;"><span class="loading"><em class="loading-em"></em></span><span class="loading-color">读取中</span></div>';
            a("body").append(d)
        },
        getLoadDiv: function() {
            this.loadDiv || (0 == a("#div_waiting").length && this.createDiv(), this.loadDiv = a("#div_waiting"));
            return this.loadDiv
        },
        show: function() {
            var a = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            clearTimeout(this.timer);
            this.isShowing || (this.isShowing = !0, this.getLoadDiv().css("top", a + window.innerHeight / 2 + "px").css("left", window.innerWidth / 2 + "px"), this.getLoadDiv().get(0).className = "show")
        },
        hide: function(a) {
            var p = this;
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                p.isShowing = !1;
                p.getLoadDiv().get(0).className = "hide"
            },
            a || 500)
        }
    }
});
core.define("gotop", ["$"],
function(a) {
    var d = a("#jumphelper"),
    p = !0,
    b = 0,
    g = 0,
    n,
    k,
    q = function() {
        clearTimeout(n);
        clearTimeout(k);
        var a = document.body.scrollTop;
        a != b ? (b = a, n = setTimeout(q, 500)) : k = setTimeout(function() {
            r()
        },
        800)
    },
    r = function(a) {
        p && u()
    },
    u = function() {
        d.css({
            display: "block"
        });
        r.show = 2
    },
    m = function() {
        d.css({
            display: "none"
        });
        r.show = 1
    };
    return {
        init: function() {
            a(document.body).append('<div id="jumphelper" style="display: none;"><a onclick="javascript:void 0;" id="gotop">∧</a><a onclick="javascript:void 0;" id="gobot">∨</a></div>');
            d = a("#jumphelper");
            a("#gotop").bind("click",
            function() {
                window.scrollTo(0, 1)
            });
            a("#gobot").bind("click",
            function() {
                window.scrollTo(0, 99999)
            });
            a("#gotop").bind("touchstart",
            function(a) {
                a.stopPropagation()
            });
            a("#gobot").bind("touchstart",
            function(a) {
                a.stopPropagation()
            });
            a(document.body).bind("touchstart",
            function() {
                g = 0
            });
            a(document.body).bind("touchmove",
            function() {
                0 == g && (2 == r.show && m(), g = 1)
            },
            !1);
            a(window).bind("scroll", q);
            r()
        },
        show: u,
        hide: m,
        disable: function() {
            p = !1;
            m()
        },
        enable: function() {
            p = !0;
            r()
        }
    }
});
core.define("searchbar", ["$", "util"],
function(a, d) {
    var p = [],
    b = function() {
        var b, d = a("#search-hidden-params"),
        k = a("#search-word"),
        q = a("#search-form");
        a("#search-reset");
        var r = function(a) {
            a = b.param;
            var m = "",
            c;
            q.attr("action", b.url);
            d.html("");
            for (c in a) m += '<input type="hidden" name="' + c + '" value="' + ("{key}" == a[c] ? k.val() : a[c]) + '" />';
            d.html(m)
        };
        q.bind("submit", r);
        k.bind("focus",
        function(a) {
            this.value = ""
        });
        p.length && (a.each(p,
        function(a, d) {
            d.isDefault && (b = d)
        }), /OS 4/i.test(navigator.userAgent) && (k.attr("readonly", ""), k.bind("click",
        function(a) {
            a.preventDefault();
            r();
            q[0].submit()
        })))
    };
    return {
        init: function(a) {
            p = a.searchConf;
            console.log(p);
            b()
        }
    }
});
core.define("info_comment_lite", ["$", "loginMod", "loadMod", "tips", "util"],
function(a, d, p, b, g) {
    function n(a) {
        return String(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function k(a) {
        if ("[object Number]" !== Object.prototype.toString.call(a)) return a;
        var b = new Date,
        c = new Date(parseInt(a));
        a = b.getTime() - a;
        return 5184E5 < a ? c.getFullYear() !== b.getFullYear() ? c.getFullYear() + "年" + (c.getMonth() + 1) + "月" + c.getDate() + "日": c.getMonth() + 1 + "月" + c.getDate() + "日": 864E5 > a ? 6E4 > a ? Math.floor(a / 1E3) + "秒前": 36E5 > a ? Math.floor(a / 6E4) + "分钟前": Math.floor(a / 36E5) + "小时前": 1728E5 > a ? (b = 36E5 * b.getHours() + 864E5, a < b ? "昨天": "前天") : Math.ceil(a / 864E5) + "天前"
    }
    navigator.userAgent.indexOf("MQQBrowser");
    var q = !1,
    r = function(a) {
        this._init(a)
    };
    r.prototype = {
        _init: function(a) {
            this.API = a.api;
            this.obj = a.obj || null;
            this.callbacks = a.callbacks || {};
            this.showCatMore = a.showCatMore;
            this.fetching = !1;
            this.isOpen = a.isOpen || !1;
            this.pn = {
                hot: 1,
                latest: 1
            };
            this.loadedNums = 0;
            this.ajaxType = "top";
            var b = this.isOpen ? "": " hide";
            this.boardId = a.boardId || "99998";
            this.pkuName = a.pkuName || "infonews";
            this.title = a.title || "";
            this.aid = "news_js";
            a.isGray && (this.aid = "cmt_touch_api");
            this.mapInfo = {
                cityname: "",
                poiname: "",
                latlng: {
                    lat: "",
                    lng: ""
                },
                poiaddress: ""
            };
            this.obj.html('<div class="info-comment2">   <div class="info-comment-reply info-comment-reply-v1">       <textarea class="info-reply-area cmt_text" placeholder="说说你的看法..." id="cmt_textarea"></textarea>       <div class="info-reply-bar info-bar ' + b + '">           <button class="info-btn info-btn-submit t_send">发表</button>       </div>   </div><div class="main-comment hot-comment">   <ul class="main-comment-list t_top_cmt_dl" style="display: none">   </ul></div></div>');
            this._bindClick();
            this.callbacks.init && this.callbacks.init()
        },
        setCount: function(b, d) {
            a(".t_latest_more_words").text("更多评论" + (d - this.loadedNums) + "条");
            a(".t_latest_end_words").text("共" + d + "条评论");
            a(".t_join_count").html(parseInt(b) ? b + "人参与评论": "暂无评论")
        },
        jsonp: function(b, d, c, g) {
            a.ajax({
                url: b + "?callback=?&" + a.param(d),
                cache: !1,
                type: "GET",
                dataType: "jsonp",
                data: null,
                success: c,
                error: g
            })
        },
        req: function(b, m, c) {
            this.jsonp(this.API, a.extend(b, {
                id: g.url.getUrlParam().id,
                sid: d.getSid(),
                aid: "news_js"
            }), m, c)
        },
        post: function(b, m, c) {
            a.ajax({
                url: this.API,
                data: a.extend(b, {
                    id: g.url.getUrlParam().id,
                    sid: d.getSid(),
                    aid: this.aid,
                    "3g_token": g.encrypt(),
                    cityname: this.mapInfo.cityname,
                    iopname: this.mapInfo.poiname,
                    lat: this.mapInfo.latlng.lat || "",
                    lng: this.mapInfo.latlng.lng || "",
                    poiaddress: this.mapInfo.poiaddress,
                    pkuName: this.pkuName,
                    boardId: this.boardId,
                    entityId: g.url.getUrlParam().id,
                    title: encodeURIComponent(this.title),
                    url: location.href,
                    dt: "cmtOp"
                }),
                type: "POST",
                withCredentials: !0,
                crossDomain: !0,
                dataType: "json",
                success: m
            })
        },
        fetch: function() {
            this._fetchSuccess((g_data.show.data.extra || {}).cmt || [])
        },
        _fetchSuccess: function(b) {
            var d = b.parentcmts;
            if (b.top) {
                var c = b.top.record;
                0 < c.length && (a(this.obj).find(".t_top_cmt_dl").html(this._rendercmtLst(c, d)).show(), a("#more-comment").find("a").html("全部评论(" + b.allcount + "人参与)"), a("#more-comment").show());
                this.setCount(b.allcount || 0, b.cmtcount || 0);
                this.callbacks.update && this.callbacks.update(b.cmtcount || 0);
                p.hide()
            }
        },
        refresh: function() {
            this.fetch();
            this.callbacks.refresh && this.callbacks.refresh()
        },
        _rendercmtLst: function(a, b) {
            if (a) for (var c = "",
            d, g = 0; g < a.length; g++) d = a[g],
            c += '<li>   <a class="comment-list-title2">       <strong class="comment-user-name">           <span class="t_ucc_link" uid="' + d.userid + '">' + d.usernick + '</span>       </strong>       <time class="' + (1 == d.hot ? "ihot2": "") + '">' + k(d.timestamp) + "</time>   </a>",
            c += '   <div class="comment-content2">' + d.shortcontent + "</div></li>";
            return c
        },
        _doCmt: function() {
            var g = this,
            m = decodeURIComponent(this.obj.find(".cmt_text").val()),
            c = q ? "yes": "no";
            m ? (p.show(), this.post({
                mst: 3,
                ac: 12,
                comment: n(m),
                sharemb: c
            },
            function(c) {
                "-10" == c.result ? (d.setStatus(!1), d.login(function() {
                    g._doCmt()
                })) : 0 == c.result ? (c = '<li>   <a class="comment-list-title2">       <strong class="comment-user-name">           <span class="t_ucc_link" uid="">我</span>       </strong>       <time>刚刚</time>   </a>   <div class="comment-content2">' + n(m) + "</div></li>", b.showTip("操作成功", !1, !0), a("#cmt_textarea").css("height", "54px"), a(".info-bar").hide(), g.isOpen = !1, a(g.obj).find(".t_top_cmt_dl").prepend(c).show(), g.obj.find(".cmt_text").val(""), c = parseInt(g.obj.find(".comment-count").text() || "0") + 1, g.callbacks.post && g.callbacks.post(c)) : b.showTip("系统繁忙，请重试!", !0, !0);
                p.hide()
            })) : b.showTip("请输入评论内容!", !0, !0)
        },
        _doDigi: function(a) {
            var d = a.data("value"),
            c = a.find(".t_digi").attr("v");
            if ("digied" == c) return ! 1;
            this.req({
                mst: 3,
                ac: 13,
                voteCount: c,
                cid: d
            },
            function(d) {
                var g = a.find(".t_digi"),
                m = parseInt(c) + 1;
                0 == d.result ? (b.showTip("操作成功", !1, !0), 1E4 > m && g.text(m), g.addClass("igray"), g.attr("v", "digied")) : -1 == d.result || 1 == d.result ? b.showTip(d.msg, !0, !0) : b.showTip("系统繁忙，请重试!", !0, !0)
            })
        },
        _doReply: function(g) {
            var m = this,
            c = a(g).siblings(".comment-bar").data("value"),
            t = g.find("textarea").val();
            t ? (p.show(), this.req({
                mst: 5,
                ac: 6,
                comment: t,
                cid: c
            },
            function(c) {
                0 == c.result ? (b.showTip("回复成功!", !1, !0), a(g).find("textarea").val(""), c = '<div class="my-new-comment">   <a class="comment-list-title2">       <strong class="comment-user-name">           <span class="t_ucc_link" uid="">我</span>       </strong>       <time>刚刚</time>   </a>   <div class="comment-content2">' + t + "</div></div>", a(g).append(c), m.callbacks.reply && m.callbacks.reply()) : "-10" == c.result ? (d.setStatus(!1), d.login(function() {
                    m._doReply(g)
                })) : b.showTip("系统繁忙，请重试!", !0, !0);
                p.hide()
            })) : b.showTip("请输入回复内容!", !0, !0)
        },
        _toggleReplyDialog: function(b, d) {
            var c = a(b).children(".t_reply_con");
            0 == c.length ? (a(b).append(this._getReplyDialog()), c.data("isopen", "true"), d.text("取消")) : "false" == c.data("isopen") ? (c.show().data("isopen", "true"), d.text("取消")) : (c.hide().data("isopen", "false"), d.text("回复"))
        },
        _getReplyDialog: function() {
            return '<div class="info-comment-reply mini t_reply_con">   <textarea class="info-reply-area" placeholder="快来吐槽一下"></textarea>   <div class="info-reply-bar">       <button class="info-btn info-btn-submit t_reply_sub">发表</button>   </div></div>'
        },
        _bindClick: function() {
            var b = this;
            a(b.obj).delegate(".t_send", "click",
            function() {
                d.login(function() {
                    b._doCmt()
                })
            });
            a(b.obj).delegate(".t_ucc_link", "click",
            function() {
                var b = d.getSid();
                encodeURIComponent(a(this).attr("uname"));
                var c = d.getUid(),
                g = a(this).attr("uid") || c;
                location.href = "http://infoapp.3g.qq.com/g/usercenter/touch/?sid=" + b + "&uin=" + g + "#" + (c == g ? "home": "hishome")
            });
            a(b.obj).delegate(".cmt_text", "click",
            function() {
                this.isOpen || (a(".info-bar").css("display", " -webkit-box").removeClass("hide"), a(this).css("height", "78px"))
            });
            a(b.obj).delegate(".tx-wb", "click",
            function() {
                q ? (a(this).removeClass("active"), q = !1) : (a(this).addClass("active"), q = !0)
            })
        },
        clear: function() {
            this.pn = {
                hot: 1,
                latest: 1
            };
            this.fetching = !1;
            this.loadedNums = 0;
            a(this.obj).find(".t_top_cmt_dl,.t_hot_cmt_dl,.t_latest_cmt_dl").html("");
            a(this.obj).find(".t_latest_more,.t_latest_more_end").hide()
        }
    };
    return {
        create: function(a) {
            return new r(a)
        }
    }
});
core.define("tips", ["$"],
function(a) {
    var d = null;
    return {
        inited: !1,
        init: function() {
            if (!this.inited) {
                var p;
                p = '<div  class="txt-tips" id="infoTip" style="z-index:10001"></div>';
                0 == a("#infoTip").length && a("body").append(p);
                d = a("#infoTip");
                this.inited = !0
            }
        },
        showTip: function(d, b, g, n, k) {
            var q = this,
            r;
            this.init();
            var u = a("#infoTip");
            b ? u.html('<div class="error-tips"><span>' + d + "</span></div>") : u.html('<div class="seccess-tips"><span>' + d + "</span></div>");
            d = document.body.scrollTop + document.documentElement.scrollTop;
            a("#infoTip").css("top", d + "px");
            g && (r = setTimeout(function() {
                q.hiddenTip()
            },
            n || 2500));
            if (k) a(document.body).one("touchmove",
            function() {
                clearTimeout(r);
                setTimeout(function() {
                    q.hiddenTip()
                },
                100)
            })
        },
        setPosition: function(p, b, g) {
            var n, k = this;
            d.css("top", document.body.scrollTop + document.documentElement.scrollTop + "px");
            p && (n = setTimeout(function() {
                k.hiddenTip()
            },
            g || 2500));
            if (b) a(document.body).one("touchmove",
            function() {
                clearTimeout(n);
                setTimeout(function() {
                    k.hiddenTip()
                },
                100)
            })
        },
        showTipByHtml: function(a, b, g, n) {
            this.init();
            d.html(a);
            this.setPosition(b, n, g)
        },
        hiddenTip: function() {
            this.init();
            a("#infoTip").css("top", "-36px")
        }
    }
});
core.define("shareMod", ["$", "util", "popDialog", "tips", "loginMod"],
function(a, d, p, b, g) {
    function n() {
        var g = d.cookie.getCookie("info_share_sina_token");
        a.ajax({
            url: t + "/g/s?callback=?&reason=" + v.getValue() + "&url=" + encodeURIComponent(u) + "&picurl=" + encodeURIComponent(c) + "&token=" + g,
            dataType: "jsonp",
            success: function(a) {
                null == a.error_code ? (b.showTip("分享成功", !1, !0), v.hide(), y.sinaSuccessCb && y.sinaSuccessCb()) : "20019" == a.error_code ? (b.showTip("请不要提交相同内容", !0, !0), y.sinaErrorCb && y.sinaErrorCb("请不要提交相同内容")) : (b.showTip("分享失败", !0, !0), y.sinaErrorCb && y.sinaErrorCb("分享失败"))
            },
            error: function() {
                b.showTip("分享失败", !0, !0)
            }
        })
    }
    function k() {
        a.ajax({
            url: B + "?callback=?&reason=" + v.getValue() + "&url=" + encodeURIComponent(u) + "&picUrl=" + encodeURIComponent(c) + "&sid=" + g.getSid(),
            dataType: "jsonp",
            success: function(a) {
                0 == a.code ? (b.showTip("分享成功", !1, !0), v.hide()) : "-101" == a.code ? tips.showTip("您还没有登录", !0, !0) : "-107" == a.code ? b.showTip("您还没有开通腾讯微博", !0, !0) : (b.showTip("分享失败", !0, !0), v.hide())
            },
            error: function() {
                b.showTip("分享失败", !0, !0)
            }
        })
    }
    function q() {
        try {
            d.cookie.getCookie("leave_info_state");
            if (d.url.getUrlParam().oauth_state && d.url.getUrlParam().state) {
                var a = d.url.getUrlParam().access_token;
                if (0 == d.url.getUrlParam().oauth_state && state == d.url.getUrlParam().state && a) {
                    d.cookie.setCookie("info_share_sina_token", a, 1, ".3g.qq.com");
                    d.cookie.delCookie("infosharewbcbparams_" + state, ".3g.qq.com");
                    v.show({
                        btntxt: "发表",
                        html: '<h3 class="share-tit for-sina">新浪微博</h3>',
                        postFunc: function() {
                            n()
                        },
                        content: r
                    });
                    return
                }
                0 != d.url.getUrlParam().oauth_state && b.showTip("新浪微博授权失败", !0, !0)
            }
            q = function() {}
        } catch(c) {
            console.error(c.message)
        }
    }
    var r, u, m, c, t = "http://infoapp.3g.qq.com/g/app_include/share/ShareSinaAction.jsp",
    B = "http://infoapp.3g.qq.com/g/app_include/share/ShareTencentAction.jsp",
    v = new p,
    y = {};
    return {
        shareSina: function(a) {
            "" != d.cookie.getCookie("info_share_sina_token") ? (window.scrollTo(0, 1), v.show({
                btntxt: "发表",
                html: '<h3 class="share-tit for-sina">新浪微博</h3>',
                postFunc: function() {
                    n()
                },
                content: r
            })) : (d.cookie.setCookie("infosharewbcbparams_" + state, location.href, 1, ".3g.qq.com"), window.location.href = a)
        },
        init: function(a) {
            r = a.title || "";
            u = a.shareUrl || "";
            m = a.contents || "";
            state = a.state || "info_1";
            backUrl = a.backUrl || u;
            c = a.imgUrl || "";
            y.sinaSuccessCb = a.sinaSuccessCb;
            y.sinaErrorCb = a.sinaErrorCb;
            q()
        },
        shareQQ: function(a) {
            "" != a && /(iphone|ipad|ipod)/i.test(navigator.userAgent.toLowerCase()) && (window.location.href = a, setTimeout(function() {},
            1E3))
        },
        shareQzone: function() {
            d.url.getUrlParam();
            var a = "";
            0 < m.length && (a = m.replace(/<a .*?>.*?<\/a>/g, "").substring(0, 200));
            var b = u,
            a = "http://openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone&url=" + encodeURIComponent(b) + "&summary=" + encodeURIComponent(a) + "&desc=" + encodeURIComponent(r) + "&title=" + encodeURIComponent(r) + "&imageUrl=" + encodeURIComponent(c) + "&successUrl=" + encodeURIComponent(b + "&sid=" + g.getSid()) + "&failUrl=" + encodeURIComponent(b) + "&callbackUrl=" + encodeURIComponent(b) + "&sid=" + g.getSid();
            window.location.href = a
        },
        shareTxMb: function() {
            g.login(function() {
                window.scrollTo(0, 1);
                v.show({
                    btntxt: "发表",
                    html: '<h3 class="share-tit for-mb">腾讯微博</h3>',
                    postFunc: function() {
                        k()
                    },
                    content: r
                })
            })
        }
    }
});
core.define("favorMod", ["$", "tips", "loginMod", "msgMod", "util"],
function(a, d, p, b, g) {
    return function() {
        function b(m) {
            a.jsonP({
                url: r + "?action=favourite_op&op=add&id=" + q + "&sid=" + p.getSid() + "&callback=?",
                success: function(a) {
                    var b = "";
                    a.favourite_op ? 1 == a.favourite_op.status ? (b = g.tpl(u, {
                        tipmsg: "收藏成功",
                        isSucc: !0
                    }), d.showTipByHtml(b, !0), m && m()) : -96 == a.favourite_op.status ? (b = g.tpl(u, {
                        tipmsg: "已收藏",
                        isSucc: !0
                    }), d.showTipByHtml(b, !0), m && m()) : (b = g.tpl(u, {
                        tipmsg: "收藏失败，请重新收藏",
                        isSucc: !1
                    }), d.showTipByHtml(b, !0)) : (b = g.tpl(u, {
                        tipmsg: "发生错误",
                        isSucc: !1
                    }), d.showTipByHtml(b, !0))
                },
                error: function() {
                    var a = "",
                    a = g.tpl(u, {
                        tipmsg: "未知错误",
                        isSucc: !1
                    });
                    d.showTipByHtml(a, !0)
                }
            })
        }
        function k(b) {
            a.jsonP({
                url: r + "?action=favourite_op&op=del&id=" + q + "&sid=" + p.getSid() + "&callback=?",
                success: function(a) {
                    a.favourite_op && 1 == a.favourite_op.status ? (d.showTip("取消收藏成功", !1, !0), b && b()) : d.showTip("取消收藏失败", !0, !0)
                },
                error: function() {
                    d.showTip("未知错误", !0, !0)
                }
            })
        }
        var q = "",
        r = "",
        u = '<div class="fav-tips"><span><%=$tipmsg%><%if($isSucc){%>，到<a href="http://infoapp.3g.qq.com/g/usercenter/touch/?sid=' + p.getSid() + '#favorite" class="tips-link">个人中心</a>查看<%}%></span></div>';
        return {
            doFavor: function(d, c, g) {
                var r = a(d);
                q = r.data("id");
                var v = r.hasClass("add");
                p.login(function() {
                    v ? b(function() {
                        c && c();
                        r.removeClass("add")
                    }) : k(function() {
                        g && g()
                    })
                })
            },
            init: function(a) {
                r = a.api
            }
        }
    } ()
});
core.define("adMod", ["$", "util"],
function(a, d) {
    var p = function(a) {
        this._init(a);
        this.conf(a)
    };
    p.prototype = {
        _init: function(b) {
            this.events = {};
            this.node = a(b.html || "");
            this.ADKEY = "tip";
            this.CNTKEY = "tip_c";
            this.UPDATEKEY = "tip_u";
            this.openType = b.types || "each";
            this.recordOn = b.recordOn || "close";
            this.maxCount = b.maxCount || 0;
            this.currentUpdateCount = b.updateCount || 0;
            b.name && (this.ADKEY = b.name + this.ADKEY, this.CNTKEY = b.name + this.CNTKEY, this.UPDATEKEY = b.name + this.UPDATEKEY);
            b.prepend ? a(document.body).prepend(this.node) : a(document.body).append(this.node)
        },
        conf: function(a) {
            a = d.cookie;
            var g = parseFloat(a.getCookie(this.UPDATEKEY) || 0);
            if ((this.currentUpdateCount || 0) > g) a.delCookie(this.ADKEY, ".3g.qq.com", "/"),
            a.delCookie(this.CNTKEY, ".3g.qq.com", "/"),
            a.setCookie(this.UPDATEKEY, this.currentUpdateCount || 0, 365, ".3g.qq.com", "/")
        },
        needOpen: function() {
            var a = function() {};
            a.prototype = {
                each: function(a) {
                    a = d.cookie.getCookie(a.ADKEY);
                    var b;
                    b = new Date;
                    date = (new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime();
                    return (parseFloat(a) || date - 1) < date
                },
                once: function(a) {
                    return ! d.cookie.getCookie(a.ADKEY)
                },
                counter: function(a) {
                    return ! a.maxCount ? !0 : (parseInt(d.cookie.getCookie(a.CNTKEY)) || 0) < a.maxCount
                },
                check: function(a, b) {
                    var d = a.split(","),
                    p,
                    r,
                    u = !0,
                    m;
                    p = 0;
                    for (r = d.length; p < r; p++) if (m = this[d[p]], !m(b)) {
                        u = !1;
                        break
                    }
                    return u
                }
            };
            return new a
        } (),
        record: function() {
            var a = d.cookie,
            g = parseInt(a.getCookie(this.CNTKEY)) || 0;
            a.setCookie(this.ADKEY, (new Date).getTime(), 365, ".3g.qq.com", "/");
            a.setCookie(this.CNTKEY, g + 1, 365, ".3g.qq.com", "/")
        },
        open: function() {
            this.node.css({
                display: "block"
            });
            "open" == this.recordOn && this.record();
            this.trigger("open", [])
        },
        show: function() {
            this.ishide = !1;
            this.node.css({
                visibility: "visible"
            })
        },
        hide: function() {
            this.ishide || (this.ishide = !0, this.node.css({
                visibility: "hidden"
            }))
        },
        close: function() {
            console.log(this.recordOn);
            this.node.css({
                display: "none"
            });
            "close" == this.recordOn && this.record();
            this.trigger("close", [])
        },
        trigger: function(b, d) {
            a.trigger(this.events, b, d)
        },
        bind: function(b, d) {
            a.bind(this.events, b, d)
        }
    };
    return {
        create: function(a) {
            return new p(a)
        }
    }
});
core.define("popDialog", ["$"],
function(a) {
    var d = function(a) {
        this.defualtText = "请在此输入您的观点...";
        this.option = {
            btntxt: "分享",
            html: null,
            content: "请在此输入您的观点...",
            postFunc: null,
            maxTextNum: 100,
            top: 0,
            left: "50%"
        };
        this._init()
    };
    d.prototype = {
        _init: function() {
            var d = this;
            d._setId();
            var b = '<div id="div_xll_pop_layer' + this.id + '" class="pop-layer" style="display:none;"></div>';
            a("body").append(b);
            b = '<div class="pop-window" id="pop-window' + this.id + '" style="display:none;"><div class="pop-title"><a href="javascript:void(0);" class="btn close-btn" style="z-index:1;">关闭</a><span class="title"><%=html%></span><a href="javascript:void(0);" class="btn send-btn"><%=btntxt%></a></div><div class="pop-cont">   <div class="textarea">       <textarea>' + this.defualtText + '</textarea>   </div>   <div class="wb-dialog-bar">       <div class="wb-dialog-num">还剩<strong class="lastnum"><%=lastNum%></strong>字</div>   </div></div>';
            a("body").append(b);
            a("#pop-window" + d.id).delegate(".close-btn", "click",
            function() {
                d.hide()
            }).delegate(".send-btn", "click",
            function() {
                "" == d._trim(d.getValue()) ? alert("请输入内容") : d.option.postFunc()
            }).delegate("textarea", "click",
            function() {
                d._trim(d.getValue()) == d.defualtText && a(this).val("")
            }).delegate("textarea", "keyup",
            function() {
                d._showLast()
            })
        },
        _trim: function(a) {
            return (a || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")
        },
        _setId: function() {
            this.id = a(".pop-window").length
        },
        _showLast: function() {
            a("#pop-window" + this.id + " .lastnum").text(this.option.maxTextNum - this._tStrLength(this.getValue()))
        },
        show: function(d) {
            a.extend(this.option, d);
            this._setPosition();
            a("#pop-window" + this.id + " .send-btn").text(this.option.btntxt);
            a("#pop-window" + this.id + " .title").html(this.option.html);
            a("#pop-window" + this.id + " textarea").text(this.option.content);
            this._showLast();
            a("#pop-window" + this.id).show();
            a("#div_xll_pop_layer" + this.id).show();
            a("#div_xll_pop_layer" + this.id).css({
                outline: "1px solid rgba(0, 0, 0, 0)"
            })
        },
        _tStrLength: function(a) {
            var b = 0,
            d;
            for (d = a.length; d--; 0) b = 128 < a.charCodeAt(d) ? b + 1 : b + 0.5;
            return Math.ceil(b)
        },
        hide: function() {
            a("#div_xll_pop_layer" + this.id).hide();
            a("#pop-window" + this.id).hide();
            /ucbrowser/i.test(navigator.userAgent) && a("#video-control").css("visibility", "visible");
            / uc /i.test(navigator.userAgent) && a("#video-control").show()
        },
        _emptyText: function() {
            a("#pop-window" + this.id).find("textarea").val("")
        },
        destroy: function() {
            a("#pop-window" + this.id).undelegate(".close-btn", "click").undelegate(".send-btn", "click").undelegate("textarea", "click")
        },
        getValue: function() {
            return a("#pop-window" + this.id).find("textarea").val()
        },
        _setPosition: function() {
            a("#pop-window" + this.id).css("top", this.option.top).css("left", this.option.left)
        }
    };
    return d
});
function Swipe(a, d) {
    function p() {
        t = c.children;
        y = t.length;
        E = 4 < y;
        2 > t.length && (d.continuous = !1);
        m.transitions && (d.continuous && 3 > t.length) && (c.appendChild(t[0].cloneNode(!0)), c.appendChild(c.children[1].cloneNode(!0)), t = c.children);
        B = Array(t.length);
        v = a.getBoundingClientRect().width || a.offsetWidth;
        c.style.width = Math.min(y, 3) * v + "px";
        for (var g = t.length; g--;) {
            var l = t[g];
            l.style.width = v + "px";
            l.setAttribute("data-index", g);
            m.transitions && n(g, f > g ? -v: f < g ? v: 0, 0, !0)
        }
        d.continuous && m.transitions && (n(b(f - 1), -v, 0, !0), n(b(f + 1), v, 0, !0));
        m.transitions || (c.style.left = f * -v + "px");
        a.style.visibility = "visible";
        var k = f;
        setTimeout(function() {
            t[b(k + 1)].style.visibility = "visible";
            0 < k && (t[b(k - 1)].style.visibility = "visible")
        },
        520);
        u(d.setupCallback && d.setupCallback(f))
    }
    function b(a) {
        return (t.length + a % t.length) % t.length
    }
    function g(a, c) {
        if (f != a) {
            if (m.transitions) {
                var g = Math.abs(f - a) / (f - a);
                if (d.continuous) {
                    var l = g,
                    g = -B[b(a)] / v;
                    g !== l && (a = -g * t.length + a)
                }
                for (l = Math.abs(f - a) - 1; l--;) n(b((a > f ? a: f) - l - 1), v * g, 0, !0);
                a = b(a);
                n(f, v * g, isFinite(c) ? c || 0 : x);
                n(a, 0, isFinite(c) ? c || 0 : x);
                d.continuous && n(b(a - g), -(v * g), 0)
            } else a = b(a),
            q(f * -v, a * -v, c || x);
            f = a;
            u(d.callback && d.callback(f));
            u(function() {
                t[b(f + 1)].style.visibility = "visible";
                t[b(f)].style.visibility = "visible";
                t[b(f - 1)].style.visibility = "visible"
            })
        }
    }
    function n(a, b, c, d) {
        k(a, b, c, d);
        B[a] = b
    }
    function k(a, b, c, d) {
        var f = (a = t[a]) && a.style;
        f && P(function() {
            f.webkitTransitionDuration = f.transitionDuration = c + "ms";
            /OS 7/.test(navigator.userAgent) ? f.webkitTransform = "translate(" + b + "px,0) scale(1.0000001)": f.webkitTransform = "translate(" + b + "px,0)"
        })
    }
    function q(a, b, g) {
        if (g) var m = +new Date,
        l = setInterval(function() {
            var k = +new Date - m;
            k > g ? (c.style.left = b + "px", d.transitionEnd && d.transitionEnd.call(event, f, t[f]), clearInterval(l)) : c.style.left = (b - a) * (Math.floor(100 * (k / g)) / 100) + a + "px"
        },
        4);
        else c.style.left = b + "px"
    }
    var r = function() {},
    u = function(a) {
        setTimeout(a || r, 0)
    },
    m = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function(a) {
            var b = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"],
            c;
            for (c in b) if (void 0 !== a.style[b[c]]) return ! 0;
            return ! 1
        } (document.createElement("swipe"))
    };
    if (a) {
        var c = a.children[0],
        t,
        B,
        v,
        y,
        E = !0;
        d = d || {};
        var f = parseInt(d.startSlide, 10) || 0,
        x = d.speed || 300,
        C = !1,
        K = !0,
        A = !1,
        F = !1,
        P = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(a, b) {
                return setTimeout(a, b || 1)
            }
        } ();
        d.continuous = void 0 !== d.continuous ? d.continuous: !0;
        var H, L, G, l, M, z, J = 0,
        N = 0,
        D = {
            handleEvent: function(a) {
                switch (a.type) {
                case "touchstart":
                    this.start(a);
                    break;
                case "touchmove":
                    this.move(a);
                    break;
                case "touchend":
                    u(this.end(a));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    u(this.transitionEnd(a))
                }
                d.stopPropagation && a.stopPropagation()
            },
            start: function(a) {
                a = a.touches[0];
                H = a.pageX;
                L = a.pageY;
                G = +new Date;
                M = l = z = void 0;
                c.addEventListener("touchmove", this, !1);
                c.addEventListener("touchend", this, !1)
            },
            move: function(a) {
                if (! (1 < a.touches.length || a.scale && 1 !== a.scale)) {
                    d.disableScroll && a.preventDefault();
                    var c = a.touches[0];
                    l = c.pageX - H;
                    M = c.pageY - L;
                    C && 0 > l != K ? a.preventDefault() : ("undefined" == typeof z && (z = !!(z || Math.abs(l) < Math.abs(M))), z || (a.preventDefault(), d.continuous ? (k(b(f - 1), l + B[b(f - 1)], 0), k(f, l + B[f], 0), k(b(f + 1), l + B[b(f + 1)], 0), d.movecallback && d.movecallback(f, l)) : (l /= !f && 0 < l || f == y - 1 && 0 > l ? Math.abs(l) / v + 1 : 1, k(f - 1, l + B[f - 1], 0), k(f, l + B[f], 0), k(f + 1, l + B[f + 1], 0), (0 == f || f == y - 1) && d.movecallback && d.movecallback(f, l))))
                }
            },
            end: function(a) {
                if (C && 0 > l != K) a.preventDefault();
                else {
                    a = 300 > Number( + new Date - G) && 10 < Math.abs(l) || Math.abs(l) > v / 3;
                    var g = !f && 0 < l || f == y - 1 && 0 > l;
                    d.continuous && (g = !1);
                    var m = 0 > l,
                    k = b(m ? f - 2 : f + 2),
                    p = b(m ? f + 2 : f - 2);
                    z || (a && !g ? (m ? (d.continuous ? (n(b(f - 1), -v, 0), n(b(f + 2), v, 0)) : n(f - 1, -v, 0), n(f, B[f] - v + -1 * N, x), n(b(f + 1), parseFloat((B[b(f + 1)] - v + -1 * N).toFixed(1)), x), N = 0, f = b(f + 1)) : (d.continuous ? (n(b(f + 1), v, 0), n(b(f - 2), -v, 0)) : n(f + 1, v, 0), n(f, B[f] + v + -1 * J, x), n(b(f - 1), parseFloat((B[b(f - 1)] + v + -1 * J).toFixed(1)), x), J = 0, f = b(f - 1)), setTimeout(function() {
                        d.callback && d.callback(f, m)
                    },
                    10), P(function() {
                        t[p].style.visibility = "visible";
                        E && (t[k].style.visibility = "hidden")
                    })) : d.continuous ? (n(b(f - 1), -v, x), n(f, 0, x), n(b(f + 1), v, x)) : m ? (f == y - 1 ? F && 0 == J && Math.abs(l) > d.limitDist && (J = -1 * d.chockDist) : J = 0, n(f - 1, -v + J, x), n(f, J, x, 0), n(f + 1, v, x)) : (0 == f ? A && 0 == N && Math.abs(l) > d.limitDist && (N = d.chockDist) : N = 0, n(f - 1, -v, x), n(f, N, x, 0), n(f + 1, v + N, x)));
                    c.removeEventListener("touchmove", D, !1);
                    c.removeEventListener("touchend", D, !1)
                }
            },
            transitionEnd: function(a) {
                parseInt(a.target.getAttribute("data-index"), 10) == f && d.transitionEnd && d.transitionEnd.call(a, f, t[f])
            }
        };
        p();
        m.addEventListener ? (m.touch && c.addEventListener("touchstart", D, !1), m.transitions && (c.addEventListener("webkitTransitionEnd", D, !1), c.addEventListener("msTransitionEnd", D, !1), c.addEventListener("oTransitionEnd", D, !1), c.addEventListener("otransitionend", D, !1), c.addEventListener("transitionend", D, !1)), window.addEventListener("resize", D, !1)) : window.onresize = function() {};
        return {
            setup: function() {
                p()
            },
            slide: function(a, b) {
                g(a, b)
            },
            prev: function() {
                d.continuous ? g(f - 1) : f && g(f - 1)
            },
            next: function() {
                d.continuous ? g(f + 1) : f < t.length - 1 && g(f + 1)
            },
            getPos: function() {
                return f
            },
            getNumSlides: function() {
                return y
            },
            lockdir: function(a) {
                C = !0;
                K = !!{
                    left: !1,
                    right: !0
                } [a]
            },
            enableDist: function(a) {
                "left" == a && (A = !0);
                "right" == a && (F = !0)
            },
            disableDis: function(a) {
                "left" == a && (A = !1);
                "right" == a && (F = !1)
            },
            unlockDir: function() {
                C = !1
            },
            kill: function() {
                for (var a = t.length; a--;);
                m.addEventListener ? (c.removeEventListener("touchstart", D, !1), c.removeEventListener("webkitTransitionEnd", D, !1), c.removeEventListener("msTransitionEnd", D, !1), c.removeEventListener("oTransitionEnd", D, !1), c.removeEventListener("otransitionend", D, !1), c.removeEventListener("transitionend", D, !1), window.removeEventListener("resize", D, !1)) : window.onresize = null
            }
        }
    }
}
if (window.jQuery || window.Zepto)(function(a) {
    a.fn.Swipe = function(d) {
        return this.each(function() {
            a(this).data("Swipe", new Swipe(a(this)[0], d))
        })
    }
})(window.jQuery || window.Zepto);
core.define("swipe", [],
function() {
    return Swipe
});
core.define("imgque", [],
function() {
    var a = function() {
        var a = [],
        p = !1,
        b,
        g,
        n = function(a, b, d) {
            var m = new Image;
            g = m;
            d = d || 0;
            1 < d || (m.onload = function() {
                b && b(a);
                m = m.onload = m.onerror = null;
                p = !1;
                k()
            },
            m.onerror = function() {
                n(a, b, d + 1);
                m = m.onload = m.onerror = null;
                k()
            },
            p = !0, m.src = a)
        },
        k = function(g) {
            var r;
            if (g || !p) if (r = a.splice(0, 1)[0]) clearTimeout(b),
            b = setTimeout(function() {
                k(!0)
            },
            2E3),
            n(r.src,
            function(a) {
                r.callback(a)
            })
        };
        return {
            clear: function() {
                a = [];
                g && (g = g.onload = g.onerror = null);
                p = !1
            },
            push: function(b, g) {
                a.push({
                    src: b,
                    callback: g
                });
                k()
            }
        }
    } ();
    a.loadImg = function(d, p) {
        var b = [],
        g,
        n;
        $(d).each(function(a, d) {
            var g = d.getBoundingClientRect();
            b.push({
                pos: g,
                img: d
            })
        }); ! 0 !== p && a.clear();
        $.each(b,
        function(b, d) { - 200 > d.pos.bottom || d.pos.top > window.innerHeight + 400 || (n = $(d.img), g = n.attr("orgsrc"), a.push(g,
            function(a) {
                return function(b) { / android 4.0;. * applewebkit\ / 534\.30 / i.test(navigator.userAgent) && "A" == a.parent()[0].tagName && (a.parent()[0].style.display = "-webkit-box");
                    a.removeAttr("orgsrc");
                    a.attr("src", b)
                }
            } (n)))
        })
    };
    return a
});
asyncCall.reg("coreok",
function() {
    core.init({
        loadScript: function(a, d) {
            var p = a.match(/^([\s\S]*?)(-min-(\d*)\.js|\.js)/i);
            loadMrg.load({
                id: p[1] + ".js",
                url: a,
                cb: d,
                version: p[3] || "",
                iscache: article_page.isCached
            })
        },
        coreJsUrl: window.g_core_url
    });
    core.setMap(g_m_jsMap);
    core.define("wxshare_set", ["$"],
    function(a) {
        function d() {
            WeixinJSBridge.on("menu:share:appmessage",
            function() {
                n()
            });
            WeixinJSBridge.on("menu:share:timeline",
            function() {
                k()
            });
            WeixinJSBridge.on("menu:share:weibo",
            function() {
                q()
            })
        }
        function p(a) {
            n = function() {
                WeixinJSBridge.invoke("sendAppMessage", {
                    appid: a.appid,
                    img_url: a.img_url,
                    img_width: a.img_width,
                    img_height: a.img_height,
                    link: a.link,
                    desc: a.desc,
                    title: a.title
                },
                function(a) {})
            };
            k = function() {
                WeixinJSBridge.invoke("shareTimeline", {
                    img_url: a.img_url,
                    img_width: a.img_width,
                    img_height: a.img_height,
                    link: a.link,
                    desc: a.desc,
                    title: a.desc
                },
                function(a) {})
            };
            q = function() {
                WeixinJSBridge.invoke("shareWeibo", {
                    content: a.desc,
                    url: a.link
                },
                function(a) {})
            }
        }
        var b = {},
        g = !1,
        n, k, q;
        b.set = function(b) {
            g || (window.WeixinJSBridge ? d() : document.addEventListener("WeixinJSBridgeReady", d, !1), g = !0);
            b = a.extend({
                appid: "",
                img_url: "http://3gimg.qq.com/wap30/img/touch/icon.png",
                img_width: "180",
                img_height: "180",
                link: location.href.replace(/([?&])sid=[^&#]*/g, "$1ctlastwithsid=1"),
                desc: document.title,
                title: document.title
            },
            b);
            p(b)
        };
        return b
    });
    asyncCall.reg("pageinit",
    function() {
        core.define("init", "$ msgMod loginMod pm loadMod gotop searchbar util wxshare_set".split(" "),
        function(a, d, p, b, g, n, k, q, r) {
            a.fn.eq = a.fn.eq ||
            function(b) {
                var d = this,
                g = function() {
                    return a([].slice.apply(d, arguments))
                };
                return - 1 === b ? g(b) : g(b, +b + 1)
            };
            var u = function() {
                var b = a("#pop-nav"),
                d = a("#nav-pop");
                a("#nav-pop-pnl");
                a("#nav-pop-mask");
                var g = !1,
                m, k, p, f = function(a) {
                    a.preventDefault()
                },
                n = /android/i.test(navigator.userAgent),
                q = /uc/i.test(navigator.userAgent),
                f = function(a) {
                    a.preventDefault()
                };
                k = function() {
                    d.hide();
                    a(window).unbind("touchmove", k)
                };
                p = function() {
                    d.hide();
                    a(window).unbind("scroll", p)
                };
                b.bind("touchend",
                function(g) {
                    g.preventDefault();
                    d.unbind("webkitTransitionEnd");
                    try {
                        g.stopImmediatePropagation()
                    } catch(r) {}
                    g.stopPropagation();
                    d.hasClass("open") ? (d.removeClass("open"), d.addClass("close1"), b.removeClass("active"), m = function() {
                        d.hide()
                    },
                    d.bind("webkitTransitionEnd", m)) : setTimeout(function() {
                        var b = a("#header-adtip"),
                        c = 0;
                        b.length && (c = b.height());
                        c && (g.preventDefault(), g.stopPropagation());
                        setTimeout(function() {
                            window.scrollTo(0, c)
                        },
                        50);
                        d.css("opacity", "0");
                        d.show();
                        d.removeClass("close1");
                        d.addClass("active");
                        setTimeout(function() {
                            d.addClass("open");
                            0 < a("#video-control").length && (/ucbrowser/i.test(navigator.userAgent) && a("#video-control").css("visibility", "hidden"), / uc /i.test(navigator.userAgent) && a("#video-control").hide())
                        },
                        50);
                        n && (q ? setTimeout(function() {
                            a(window).bind("scroll", p)
                        },
                        150) : a(window).bind("touchmove", k));
                        n && q && a(window).bind("touchmove", f)
                    },
                    50)
                });
                document.addEventListener("touchstart",
                function() {
                    g = !1
                });
                document.addEventListener("touchmove",
                function() {
                    g = !0
                });
                document.addEventListener("touchend",
                function(k) {
                    d.hasClass("open");
                    d.hasClass("open") && (d.removeClass("open"), d.addClass("close1"), b.removeClass("active"), m = function() {
                        d.hide();
                        0 < a("#video-control").length && (/ucbrowser/i.test(navigator.userAgent) && a("#video-control").css("visibility", "visible"), / uc /i.test(navigator.userAgent) && a("#video-control").show())
                    },
                    d.bind("webkitTransitionEnd", m), g && d.hide(), n && q && a(window).unbind("touchmove", f))
                },
                !1);
                a("#nav-pop-pnl").bind("touchend",
                function(a) {
                    g || "A" == a.target.tagName && a.stopPropagation()
                })
            }; (function() {
                window.nextFrame = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                    function(a, b) {
                        return setTimeout(a, b || 1)
                    }
                } ()
            })();
            try {
                p.init(window.sid, window.islogin),
                u()
            } catch(m) {
                window.last_err = m.message
            } (function() { (function() {
                    var b = function(b) {
                        a("#page-wrapper").css("display", "block");
                        var c = b.curPage,
                        d = b.prevPage;
                        d != c && (a("#page-" + d).hide(), a("#page-" + d).removeClass("active"), a("#page-" + c).show(), a("#page-" + c).addClass("active"));
                        "bigpic" != b.curPage && a("footer").show();
                        "mapinfo" == c || "comment" == c ? n.disable() : "news" == c && n.enable()
                    };
                    a.bind(window, "vpageEnter", b);
                    a.bind(window, "vpageback", b)
                })()
            })(); (function() {
                setTimeout(function() {
                    a(document.body);
                    setTimeout(function() {
                        var b = window.innerHeight;
                        a("#page-image").css("height", b + "px")
                    },
                    350)
                },
                150);
                "onorientationchange" in window ? a(window).bind("orientationchange",
                function() {
                    d.notify("orientationchange")
                }) : a(window).bind("resize",
                function() {
                    d.notify("orientationchange")
                });
                d.listen("orientationchange",
                function() {
                    var b = window.innerHeight;
                    a("#gotop").css("bottom", b / 2 - 18 + "px");
                    a("#gobot").css("bottom", b / 2 - 18 + "px");
                    90 == Math.abs(window.orientation) ? a("#page-wrapper").addClass("landscape") : a("#page-wrapper").removeClass("landscape")
                })
            })(); (function() {
                d.listen("loginok",
                function() {
                    a.trigger(window, "loginok");
                    a("#footer-login").text("退出")
                });
                window.onscroll = function() {
                    d.notify("pageScroll")
                };
                a(document).delegate("a", "click",
                function() {
                    this.href && ("#" != this.href && "javascript:void 0" != this.href && "javascript:void(0)" != this.href) && (this.href = this.href.replace(/([?&])sid=[^&#]*/g, "$1sid=" + p.getSid()))
                })
            })(); (function() {
                d.listen("logout",
                function() {
                    p.loginOut(location.href.replace(/#.*$/, "").replace(/sid=[^&]*/g, "sid="))
                });
                a("#art-back").bind("click",
                function() {
                    history.back()
                }); (function() {
                    a("#footer-login").bind("click",
                    function() {
                        p.isLogin() ? d.notify("logout") : p.login()
                    })
                })();
                b.init.call(b, {
                    home: "news",
                    jsPath: staticPath + "/js/page/",
                    jsMap: {}
                });
                p.init({
                    sid: window.sid,
                    islogin: window.islogin
                })
            })(); (function() {
                a.bind(window, "beforeVpageInit",
                function(a) {
                    g.show()
                });
                a.bind(window, "afterVpageInit",
                function(a) {
                    g.hide(0)
                })
            })();
            n.init();
            setTimeout(function() {
                a("#page-bigpic").css({
                    height: window.innerHeight + "px"
                })
            },
            200);
            u = g_data.show.data.sogou_prefix || "";
            q = q.url.url2obj(u.substr(u.indexOf("?") + 1));
            k.init({
                searchConf: [{
                    name: "sogou",
                    logo: "sogou",
                    text: "",
                    isDefault: !0,
                    url: g_data.show.data.sogou_prefix || "http://m.sogou.com",
                    home_url: g_data.show.data.sogou_home || "http://m.sogou.com",
                    param: a.extend({},
                    q, {
                        keyword: "{key}"
                    })
                },
                {
                    name: "baidu",
                    logo: "baidu",
                    text: "",
                    url: g_data.show.data.sogou_prefix,
                    param: a.extend({},
                    q, {
                        word: "{key}"
                    })
                }]
            }); (function() {
                var b = 0;
                a(window).bind("orientationchange",
                function() { (new Date).getTime() < b ? b = (new Date).getTime() + 40 : (b = (new Date).getTime() + 40, d.notify("orientationchange"))
                });
                a(window).bind("resize",
                function() {
                    console.log("window resize...."); (new Date).getTime() < b ? b = (new Date).getTime() + 40 : (b = (new Date).getTime() + 40, d.notify("orientationchange"))
                })
            })();
            d.listen("enterPageBigPic",
            function() {
                n.disable();
                a("#header-adtip").css({
                    height: "0px",
                    overflow: "hidden"
                });
                document.body.style.backgroundColor = "#1A1A1A"
            });
            d.listen("leavePageBigPic",
            function() {
                a("#header-adtip").css({
                    height: "auto",
                    overflow: "hidden"
                });
                n.enable();
                document.body.style.backgroundColor = ""
            });
            k = a("#news-article .art-pic img");
            q = "http://3gimg.qq.com/wap30/img/touch/icon.png";
            k && 0 < k.length && (q = k[0].src);
            r.set({
                desc: document.title,
                title: document.title,
                img_url: q,
                img_width: "360",
                img_height: "250"
            })
        })
    })
});
core.define("page.news", "$ pm util loadMod loginMod info_comment_lite tips shareMod favorMod adMod msgtip notifyMod wxShare".split(" "),
function(a, d, p, b, g, n, k, q, r, u, m, c, t) {
    function B() {
        if (g_data) {
            asyncCall.reg("layoutok",
            function(b) {
                b.bind("nextpage",
                function() {
                    a.get("/g/s?aid=news_js&sid=" + g.getSid() + "&mst=9&pos=" + article_page.pos + "&icfa=" + article_page.icfa + "&naid=" + article_page.ch + "_ss&id=" + E + "&clicktype=1&newstype=" + f.atype + "&contentype=1",
                    function(a) {})
                })
            });
            O.build();
            "23825" != p.cookie.getCookie("g_f") && "22608" != p.cookie.getCookie("g_f") && O.buildHotWords();
            R.build();
            O.buildGameDownloadMod();
            O.buildStapkDownloadMod();
            O.buildRelated();
            "23825" == p.cookie.getCookie("g_f") && O.buildBaiduDownload();
            "23825" == p.cookie.getCookie("g_f") && w.build();
            h.build();
            e.render();
            U.build();
            X.build();
            Y.build();
            Q.enter();
            V.enter();
            article_page.isOpenNotify && c.fire();
            var b = f.tips || [];
            0 < b.length && m.show(b[0]);
            g_m_jsMap["plugin." + A.data_channel] && core.require("plugin." + A.data_channel);
            Z({
                bid: "infoNews",
                cb: function() {
                    a("#header-adtip a").data("href", "http://info.3g.qq.com/g/s?aid=rd&url=ndpyyJ-_Cgme4UlhPZoITbeWFQH68AEzQORy3pW4vz_m94Da2vnKdH8uTHkJXiC9rALeVTJrvU4&i_f=422")
                }
            })
        }
    }
    function v() {
        setTimeout(function() {
            1 < P && window.scrollTo(0, Math.max(1, P))
        },
        0);
        var c = x();
        if (c.id != E) {
            E = c.id;
            if (0 == g_data.show.code) {
                f = g_data.show.data;
                L = (f || {}).hotword_prefix || "http://info.3g.qq.com/g/s?aid=sogou&i_f=142&ut=1&pid=sogou-wsse-bdd8817990ef209f-001&e=1408";
                A = f.basic || {};
                F = f.extra || {};
                try {
                    if (B(), c.fromsharefriend && 1 == c.fromsharefriend && isFromQQBrower) {
                        a.isFunction(history.replaceState) && window.history.replaceState(null, document.title, window.location.href.replace(/fromsharefriend=1/g, ""));
                        var e = Q.getParam();
                        t.sharefriend(e)
                    } else c.fromsharetimeline && (1 == c.fromsharetimeline && isFromQQBrower) && (a.isFunction(history.replaceState) && window.history.replaceState(null, document.title, window.location.href.replace(/fromsharetimeline=1/g, "")), e = Q.getParam(), t.shareTimeLine(e))
                } catch(d) {
                    I.errLog("rendererror")
                }
            } else a("#news-error").show(),
            I.errLog("newserror");
            b.hide()
        }
    }
    var y = {},
    E = "",
    f = {},
    x = p.url.getUrlParam,
    C = a("#content_main"),
    K = p.req,
    A = {},
    F = {},
    P = 1,
    H = !0,
    L = "",
    G = null,
    l = null,
    M = [],
    z = '<div class="mod-main"><div class="channel-mod" id="channelAds"></div><div id="imovieAds"></div>\t<div class="ad-txt2" style="display:none" id="adsmodule1"></div>\t\x3c!--猜你想看--\x3e\t<div class="module" id="guessdmodule">\t\t<h3 class="title">大家爱看<a class="refresh-link" id="refresh-link" href="javascript:void(0);">换一换</a></h3>\t</div>\t\x3c!--更多精彩--\x3e\t<div class="module" id="recommedmodule">\t\t<h3 class="title">时间阅读</h3>\t</div>\t<div class="module media-mod" id="readmodule">\t</div>\t<div class="module" id="rankmodule">\t\t<h3 class="title">推荐排行<span class="sub-tit"></span></h3>\t</div>\t<div class="module" id="picbottommodule"  style="overflow:hidden;">\t</div></div>',
    J = function(a) {
        this.panel = a
    };
    J.prototype.check = function() {
        if (this.panel) {
            var a = this.panel.data("sendlog"),
            b = this.panel.data("havedata");
            if (!a && b) {
                var a = this.panel.get(0).getBoundingClientRect().bottom,
                b = window.innerHeight,
                c = this.panel.get(0).getBoundingClientRect().top;
                this.panel.get(0);
                if (0 < a && c <= b) {
                    var e = !1;
                    0 < c && a <= b && (e = !0);
                    this.panel.data("sendlog", !0);
                    I.sendExpLog({
                        title: this.panel.data("title"),
                        expType: this.panel.data("exptype"),
                        exp_news_ids: this.panel.data("ids"),
                        iarea: this.panel.data("iarea"),
                        url: this.panel.data("url"),
                        show_all: e
                    })
                }
            }
        }
    };
    var N = function() {
        return {
            init: function() {
                var b = g_data.show.data.ad_on_top || {},
                c = /(UCBrowser|UCWEB)\/\d/.test(navigator.userAgent),
                e = u.create({
                    name: "news_banner",
                    html: '<div id="header-adtip" style="position:relative;width:100%;background:#fff;display:none;font-size:0"><div style="position:relative;font-size:0;text-align:center"><a style="display:block;position:relative;" href="javascript:void(0);" data-href="' + b.url + '"><img src="' + (b.img || "") + '" alt="" width="100%" /><span class="close" style="position:absolute; padding:9px;width:22px;height:22px;right:0px;top:50%;margin-top:-20px;background-position:center center; background-repeat:no-repeat;background-image:url(http://3glogo.gtimg.com/wap30/info/info/img/browsers_ad_close_gray.png);background-size:25px 25px;"></span></a></div></div>',
                    type: "each",
                    maxCount: 0,
                    recordOn: "close",
                    prepend: !0
                }),
                d = function(a) {
                    a = RegExp("g_f=" + a);
                    a.ignoreCase = !0;
                    return a.test(location.href)
                };
                a("#header-adtip .close")[0].addEventListener("click",
                function(a) {
                    a.preventDefault();
                    a.stopPropagation();
                    e.close(); (new Image).src = "/g/s?aid=debug_tempt_log&bid=info&col1=closeQQAd&col2=news"
                },
                !1);
                a("#header-adtip")[0].addEventListener("click",
                function(b) {
                    b.preventDefault();
                    e.close();
                    window.location.href = a(this).find("a").data("href")
                },
                !1);
                e.bind("close",
                function() {
                    p.cookie.setCookie("v5_footer_close_time", (new Date).getTime())
                });
                if (b && b.img && !d(23462) && !d(23658) && !d(22580) && !("23825" == p.cookie.getCookie("g_f") || d(23794) || d(22152) || isFromQQBrower || isFromMqq || c))(s = p.cookie.getCookie("v5_footer_close_time")) ? (timediff = (new Date).getTime() - (new Date(parseFloat(s))).getTime(), 864E4 >= timediff ? needOpen = !1 : e.open()) : e.open()
            }
        }
    } (),
    D = function() {
        var b = function(a) {
            a = RegExp("g_f=" + a);
            a.ignoreCase = !0;
            return a.test(location.href)
        };
        return {
            init: function() {
                var c, e, d = g_data.show.data.ad_bottom_float,
                f = !isFromQQBrower;
                c = /\sQQ\/\d/.test(navigator.userAgent);
                var g = u.create({
                    name: "footer",
                    html: '<div class="lvAdBar lvBar2" style="bottom: 0px;display:none"><a href="' + d.url + '" class="lvAdBar-tips" style="font-size: 14px;display:block;color:#fff">' + d.title + '</a><div class="lvAdBar-close2" style="position:absolute;top:0px;right:18px"></div>',
                    type: "each",
                    maxCount: 0,
                    recordOn: "open",
                    updateCount: window.g_footertip_count,
                    prepend: !1
                });
                g.node.find(".lvAdBar-close2").bind("click",
                function(a) {
                    a.preventDefault(); (new Image).src = "/g/s?aid=debug_tempt_log&bid=info&col1=closeQQAd&col2=news";
                    g.close()
                });
                g.node.find(".lvAdBar-tips").bind("click",
                function(a) {
                    a.preventDefault();
                    g.close();
                    window.location.href = d.url
                });
                g.bind("close",
                function() {
                    p.cookie.setCookie("v5_footer_close_time", (new Date).getTime())
                });
                if (b(23462) || isFromQQBrower || b(23658) || c || "23849" == p.cookie.getCookie("g_f")) f = !1;
                if (f && (c = p.cookie.getCookie("v5_footer_close_time"))) e = (new Date).getTime() - (new Date(parseFloat(c))).getTime(),
                console.log((new Date).getTime(), (new Date(parseFloat(c))).getTime(), e);
                if (g_footertip && f && d.title) {
                    f = '<a href="' + d.url + '" target="_blank">' + d.title + "</a>";
                    a("#adsmodule1").html(f);
                    a("#adsmodule1").show();
                    try {
                        var h = a(a("#adsmodule1")[0].nextElementSibling);
                        a(h.find(".title")[0]).css("border-top", "0px")
                    } catch(m) {}
                }
            }
        }
    } (),
    S = function() {
        var b = null,
        c = ["15", "17", "20"],
        e = 1,
        d = function() {
            var b = parseInt(p.cookie.getCookie("info_ip_fontSize1"));
            if (isNaN(b) || !b || -1 == c.indexOf(b + "")) b = 17;
            a.each(c,
            function(a, c) {
                b == c && (e = a)
            });
            return b
        };
        return {
            init: function() {
                b = a("#font-setting");
                b.delegate("a.b-fz", "click",
                function(d) {
                    e++;
                    e == c.length && (e = 0);
                    d.preventDefault();
                    d = c[e];
                    p.cookie.setCookie("info_ip_fontSize1", d, 365, ".3g.qq.com");
                    a("#news-article").css("fontSize", d + "px");
                    20 == d ? b.find("a.b-fz").html("T大") : 17 == d ? b.find("a.b-fz").html("T中") : b.find("a.b-fz").html("T小")
                });
                d()
            }
        }
    } (),
    R = function() {
        function b(c, e) {
            var d = e.num,
            f = '<div class="survey" data-count ="' + d + '" voteid="' + e.id + '" hasVoted="0" isOnce="' + (e.multiple ? "0": "1") + '" data-index="' + c + '">',
            f = f + ('<h3 class="survey-tit">' + e.question + "</h3>"),
            f = f + '<ul class="survey-list">';
            a.each(e.list,
            function(a, b) {
                f += '<li><div class="survey-check-btn"><p><strong>' + String.fromCharCode(65 + a) + "</strong> " + b.option + '<span class="count"></span></p><a href="javascript:void(0);" index="' + (a + 1) + '" class="survey-link">投票</a></div><div class="survey-bar-wrapper" style="display:none;"></div></li>'
            });
            f += "</ul>";
            f += "</div>";
            a("#sub-tit").html(d + "人参与");
            a("#news-vote").append(f)
        }
        function c(b) {
            b.preventDefault();
            b = a(this);
            var e = b.attr("index"),
            f = b.closest(".survey"),
            g = f.attr("voteid"),
            h = "1" == f.attr("hasVoted"),
            m = "1" == f.attr("isOnce");
            parseFloat(b.text());
            if (!m || !h) b.addClass("active"),
            f.attr("hasVoted", "1"),
            d(g, parseInt(e), f)
        }
        var e = [],
        d = function(b, c, d) {
            var f = g.getSid();
            K({
                type: "GET",
                data: {
                    aid: "news_js",
                    sid: f,
                    mst: 27,
                    voteId: b,
                    vote: c
                },
                dataType: "json",
                success: function(b) {
                    if (0 == b.result) {
                        k.showTip("投票成功", !1, !0);
                        b = d.data("index");
                        var f = e[b].list,
                        g = d.data("count"),
                        h = 0;
                        a.each(f,
                        function(a, b) {
                            b.num > f[h].num && (h = a);
                            var e = b.num;
                            a == c - 1 && e++;
                            d.find(".survey-bar-wrapper")[a].innerHTML = '<span index="' + a + '" class="survey-bar" style="width:' + (100 * e / g).toFixed(0) + '%"></span><span>' + (100 * e / g).toFixed(0) + "%</span>";
                            d.find(".count")[a].innerHTML = "(" + e + "票)"
                        });
                        d.find(".survey-bar").get(h).className = "survey-bar red";
                        d.find(".survey-link").hide();
                        d.find(".survey-bar-wrapper").css("display", "-webkit-box");
                        setTimeout(function() {
                            d.find(".survey-bar-wrapper").eq(c - 1).find("span").eq(1).append('<em class="up"></em>')
                        },
                        500)
                    } else k.showTip("发生错误 投票失败", !0, !0)
                },
                error: function() {
                    k.showTip("您已经投过票了", !0, !0)
                }
            })
        };
        return {
            build: function() {
                e = F.investigation || [];
                var c = a("#news-vote");
                e.length ? (a.each(e, b), c.show()) : c.hide()
            },
            init: function() {
                a("#news-vote").delegate(".survey-link", "click", c)
            }
        }
    } (),
    T = function() {
        function b() {
            var d = a(c).parent(),
            f = a(c),
            h = parseFloat(f.text());
            isNaN(h) && (h = 0);
            f.html(h + 1);
            K({
                url: "http://infoapp.3g.qq.com/g/app_include/common_vote/common_vote.jsp?callback=?&app=infoNewsVote&key=" + x().id + "&id=1&sid=" + g.getSid(),
                dataType: "jsonp",
                success: function(a) {
                    0 == a.code ? (d.addClass("active"), e = !0, k.showTip("感谢您的支持", !1, !0)) : k.showTip("操作失败", !0, !0);
                    I.sendWriteLog(6)
                },
                error: function() {
                    k.showTip("操作失败", !0, !0)
                }
            })
        }
        var c = null,
        e = !1;
        return {
            init: function() {
                C.delegate(".share-total2", "click",
                function(d) {
                    e || (d.preventDefault(), c = a("#news-support-count"), b())
                })
            }
        }
    } (),
    Q = function() {
        function b() {
            var a = F.img.slice(0),
            c = "http://3gimg.qq.com/html5app/205/7c6/785/8fa/c64/34d/cb7/14d/27a/abc/d20/56/180_180.png";
            0 < a.length && (c = a[0].url);
            return d = {
                url: (window.location.href + "&g_f=23839").replace(/([&\?])sid=[^&#]*/g, "$1sid=").replace(/fromsharetimeline=1/g, "").replace(/fromsharefriend=1/g, ""),
                title: A.title,
                description: A.title,
                img_url: c,
                to_app: 1
            }
        }
        var c = null,
        e = {},
        d = {},
        f = function(a) {
            var b = document.createElement("div"),
            c = "";
            b.innerHTML = a;
            return c = b.innerText || a
        };
        return {
            init: function() {
                c = a("#share-cont1");
                a("#share-link").bind("click",
                function() {
                    "1" == a(this).attr("isopen") ? (a(this).removeClass("active"), c.hide(), a(this).attr("isopen", "0")) : (I.sendTempLog("share"), a(this).addClass("active"), c.show(), a(this).attr("isopen", "1"))
                });
                c.delegate("a", "click",
                function(a) {
                    a.preventDefault();
                    a = a.srcElement.id;
                    if ("share-t-wb" == a) I.sendTempLog("share_tqq"),
                    setTimeout(function() {
                        q.shareTxMb()
                    },
                    300);
                    else if ("share-qzone" == a) I.sendTempLog("share_qzone"),
                    setTimeout(function() {
                        q.shareQzone()
                    },
                    300);
                    else if ("share-sina" == a) I.sendTempLog("share_weibo"),
                    setTimeout(function() {
                        q.shareSina(e.sina_authorize)
                    },
                    300);
                    else if ("share-qq" == a) {
                        I.sendTempLog("share_qq");
                        var b = e.qq || "";
                        "" != b && setTimeout(function() {
                            q.shareQQ(b)
                        },
                        300)
                    } else "share-t-wxhy" == a ? (I.sendTempLog("share_wx_friend"), t.sharefriend(d)) : "share-t-wxpyq" == a && (I.sendTempLog("share_wx_timeline"), t.shareTimeLine(d))
                });
                /(iphone|ipad|ipod)/i.test(navigator.userAgent.toLowerCase()) && a("#share-qq").show()
            },
            enter: function() {
                e = F.share;
                q.init({
                    title: f(A.title),
                    contents: f(A.title),
                    shareUrl: location.href + "&g_f=23841",
                    state: "index5_show"
                });
                d = b()
            },
            getParam: b
        }
    } (),
    I = function() {
        return {
            sendLog: function() {},
            sendWriteLog: function(b) {
                b = {
                    type: "POST",
                    url: "/g/index5/api/api.jsp",
                    data: {
                        sid: g.getSid(),
                        action: "writeLog",
                        wt: b,
                        wl_type: parseInt(A.type),
                        id: E,
                        pos: article_page.pos,
                        aid: article_page.ch + "_ss"
                    }
                };
                a.ajax(b)
            },
            sendExpLog: function(b) {
                b = {
                    type: "GET",
                    url: "/g/index5/api/api.jsp",
                    data: a.extend({
                        action: "exp",
                        expType: "",
                        url: "http://info.3g.qq.com/g/s?aid=dajiaaikan&i_f=451",
                        title: "",
                        c_news_id: E,
                        channel: A.logic_channel || "news",
                        exp_news_ids: ""
                    },
                    b)
                };
                a.ajax(b)
            },
            errLog: function(b) {
                var c = "" != document.referrer ? document.referrer: "-";
                a.get("/g/s?aid=debug_tempt_log&bid=info&col1=" + b + "&col2=" + encodeURIComponent(window.location.href) + "&col3=" + c + "-------" + navigator.userAgent,
                function() {})
            },
            sendTempLog: function(a) { (new Image).src = "/g/s?aid=debug_tempt_log&bid=info&col1=newsClick&col2=" + a
            }
        }
    } (),
    O = function() {
        var b = function(b) {
            var c = a("#video-area"); (b || {}).src && c.find("video").attr("src", b.src);
            c.find("#video-time").html(b.time);
            c.find(".v-size").html(b.size);
            b.title && c.append('<p class="art-video-des">' + b.title + "</p>");
            c.find(".v-play-error>a").attr("href", b.src);
            setTimeout(function() {
                c.show();
                a("#video-area").offset().width = "296px";
                C.css("outline", "0")
            },
            100)
        },
        c = function() {
            var c = !1,
            e = a("#video-area"),
            d = F.video,
            f = d.img,
            h = new Image;
            e.find("video").attr("poster", staticPath + "/img/vodeo_default.png");
            if (null == f || "" == f) f = staticPath + "/img/vodeo_default.png";
            h.src = f;
            h.onload = function() {
                e.find("video").attr("poster", f);
                if (isFromiPhone) {
                    var a = 296 * this.height / this.width;
                    e.find("video").css("height", a + "px")
                }
            };
            h.onerror = function() {
                f = staticPath + "/img/vodeo_default.png";
                e.find("video").attr("poster", f)
            };
            e.show(); - 1 != d.id.indexOf("3g_") ? (b({
                src: d.url,
                time: d.time,
                size: d.size,
                title: d.title
            }), a("#video-control").bind("play",
            function() {
                if (!c) {
                    var b = {
                        type: "POST",
                        url: "/g/s?aid=news_js",
                        data: {
                            sid: g.getSid(),
                            mst: "9",
                            ac: "0",
                            logType: "2",
                            vid: d.videoId,
                            articleId: E
                        }
                    };
                    a.ajax(b);
                    c = !0
                }
            })) : p.load.loadScript("http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2.js",
            function() {
                var e = new tvp.VideoInfo;
                e.setVid(d.id);
                var h = new tvp.Player;
                b({
                    time: d.time,
                    size: d.size,
                    title: d.title
                });
                h.create({
                    height: 197,
                    video: e,
                    modId: "video-div",
                    autoplay: !1,
                    isHtml5UseUI: !1,
                    isHtml5UseAirPlay: !0,
                    pic: f,
                    plugins: {
                        AppBanner: {
                            text: "看更多相关新闻，打开腾讯视频",
                            promotionId: 163,
                            downloadUrl: "http://mcgi.v.qq.com/commdatav2?cmd=4&confid=163&platform=aphone"
                        }
                    },
                    onplaying: function() {
                        if (!c) {
                            var b = {
                                type: "POST",
                                url: "/g/s?aid=news_js",
                                data: {
                                    sid: g.getSid(),
                                    mst: "9",
                                    ac: "0",
                                    logType: "2",
                                    vid: d.id,
                                    articleId: E
                                }
                            };
                            a.ajax(b);
                            c = !0
                        }
                    }
                })
            })
        };
        return {
            init: function() {
                var b = a("#news-related-news"),
                c = new J(b);
                a.bind(y, "scrollend",
                function() {
                    c.check()
                });
                W.init(b)
            },
            build: function() {
                "undefined" != typeof F.video.id && c()
            },
            buildRelated: function() {
                try {
                    var b = (f || {}).relative || {};
                    G = a("#news-related-news");
                    "undefined" != typeof F.video.id && W.build(F.video.id, G);
                    if (0 == b.news.length && 0 == b.topic.length) G.hide(),
                    H = !1;
                    else {
                        var c = '<ul class="cont-list cont-list-v1">',
                        e = [];
                        a.each(b.topic,
                        function(a, b) {
                            c += '<li><a href="' + b.url + '&iarea=102" class="zt-link">' + b.title + "</a></li>"
                        });
                        a.each(b.news,
                        function(a, b) {
                            M.push(b.url);
                            var d = b.url.split("?"),
                            d = p.url.url2obj(d[1]);
                            e.push(d.id);
                            c += '<li><a href="' + b.url + '&iarea=102">' + b.title + "</a></li>"
                        });
                        c += "</ul>";
                        G.append(c).show().data("havedata", !0).data("ids", e.join(",")).data("title", "正文页相关新闻").data("expType", "3").data("iarea", "102").data("url", "http://info.3g.qq.com/g/s?aid=relanews&i_f=284")
                    }
                } catch(d) {}
            },
            buildHotWords: function() {
                var b = (f || {}).hotword_list || [],
                c = "",
                e = function(b) {
                    var c = "";
                    if (b && 0 < b.length) {
                        var e = [];
                        a.each(b,
                        function(a, b) {
                            e.push(b);
                            c += "<a href='" + L + encodeURIComponent(b) + "'>" + b + "</a>"
                        })
                    }
                    return c
                };
                0 < b.length && (c += e(b), a("<div class='search-hot'><h3>搜狗搜索</h3><p>" + c + "</p></div>").insertBefore(a("#news-related-news")));
                a(".search-hot p a").each(function(b, c) {
                    a(this).get(0)
                })
            },
            buildBaiduDownload: function() {
                var b = "javascript:;";
                window.isFromiPhone ? b = "http://info.3g.qq.com/g/s?aid=rd&url=ZGWSMnQPsu_Zhs7dhuRYNrxjbA7snK4LBSeaUv-glauzf9jY9tDeY6Wd1ABaQjQ_yCvvbDDqBA3Ke70Xk0i1xp2IHbh39vH--UgJsGlr0TKm5GCWWixcTA": window.isFromAndroid && (b = "http://info.3g.qq.com/g/s?aid=rd&url=9cw514Lamexo7egiIvaD4bgFJEw9EfkU605wRCLkovg0LzcXDqsV5ikEVPri3s6zTFPGDp_fyG6dHYHp7f2G7ql35tMlidaF");
                a('<a href="' + b + '" class="ad-lk"><img src="http://3gimg.qq.com/wap30/info/info5/img/img_ad.png" alt=""></a>').insertBefore(a("#recommedmodule"))
            },
            buildGameDownloadMod: function() {
                if ("gamezone" === A.data_channel && window.isFromAndroid) {
                    var b = /ch=([\d]{6})/,
                    c = function(a) {
                        return window.isFromQQBrower ? a: a.replace(b, "ch=999042")
                    };
                    a.ajax({
                        type: "GET",
                        url: "/g/s?aid=action_api&module=appgame&action=getArticleAppGameList&articleId=" + E,
                        dataType: "json",
                        success: function(b) {
                            try {
                                var e = b.getArticleAppGameList.data;
                                if (e) {
                                    var d = e["match-game"],
                                    f = d && d.gameName && e["relation-games"] && 3 < e["relation-games"].length ? e["relation-games"] : e["hot-games"];
                                    b = "";
                                    d && d.gameName ? (b += '<h3 class="title">相关游戏</h3>', b += '<div class="lincoapp-list-down">    <ul>        <li style="position: relative;">        <a href="' + c(d.detailsUrl) + '">            <div class="u-img"><img alt="" src="' + d.iconUrl + '"></div>            <div class="u-info">                <div class="u-box">                    <div class="u-item">                        <h3 class="u-name">' + d.gameName + '</h3>                        <div class="u-description"><span>' + d.categoryName + "</span><span>" + (d.fileSize / 1024 / 1024).toFixed(2) + 'MB</span></div>                    </div>                </div>                <div class="u-text">' + d.description + '</div>            </div>        </a>        <a href="' + c(d.downloadUrl) + '" class="u-btn">下载</a>        </li>    </ul></div>') : b += '<h3 class="title">热门游戏</h3>';
                                    if (3 < f.length) {
                                        b += '<div class="lincoapp-list-flex">    <ul>';
                                        for (d = 0; 4 > d; d++) b += '        <li>            <a href="' + c(f[d].detailsUrl) + '">                <img alt="" class="u-img" src="' + f[d].iconUrl + '">                <div class="u-title">' + f[d].gameName + '</div>            </a>            <a class="u-btn" href="' + c(f[d].downloadUrl) + '">下载</a>        </li>';
                                        b += "    </ul></div>"
                                    }
                                    a('<div class="module" style="display: block;">' + b + "</div>").insertAfter(a("#news-vote"))
                                }
                            } catch(g) {}
                        }
                    })
                }
            },
            buildStapkDownloadMod: function() {
                if (window.isFromAndroid && "23849" != p.cookie.getCookie("g_f") && -1 === navigator.userAgent.indexOf("MQQBrowserLightApp")) {
                    var b = (f || {}).down_uphot || [];
                    b[0] && (b[0].img && b[0].title && b[0].desc) && (b = b[0], a('<div class="module" style="display: block;">' + ('<div class="ad-txt4">    <a href="' + g_sctDlUrl + '&i_f=538" class="lk">        <span class="u-img"><img src="' + b.img + '" alt=""></span>        <div class="detail">            <h3>' + b.title + "</h3>            <p>" + b.desc + '</p>        </div>        <span class="btn-dwld">下载</span>    </a></div>') + "</div>").insertAfter(a("#news-vote")))
                }
            },
            renderAds: function() {
                var b = (f || {}).ad_above_guess || [],
                c = "",
                e = !1;
                if (0 < b.length && (a.each(b,
                function(a, b) {
                    b.title && (c += '<a href="' + b.url + '">' + b.title + "</a>", e = !0)
                }), e)) {
                    a("#adsmodule").html(c);
                    a("#adsmodule").show();
                    try {
                        var d = a(a("#adsmodule")[0].nextElementSibling);
                        a(d.find(".title")[0]).css("border-top", "0px")
                    } catch(g) {}
                }
            },
            renderPicAds: function() {
                var b = (f || {}).ad_pic || {},
                c = "";
                b.img && ("" != b.img && b.url && "" != b.url) && (c += "<div class='channel-mod'><a href='" + b.url + "'><img src='" + b.img + "' width='100%'/></div>");
                a(c).insertBefore(a("#adsabove-relative"))
            },
            renderAdsAbove_relative: function() {
                var b = (f || {}).ad_above_relative || [],
                c = "";
                0 < b.length && (a.each(b,
                function(a, b) {
                    c += '<a href="' + b.url + '">' + b.title + "</a>"
                }), a("#adsabove-relative").html(c).show())
            }
        }
    } (); (function() {
        function b(c) {
            a.ajax({
                type: "GET",
                url: "http://tag.html5.qq.com/api/gettags?url=" + E,
                dataType: "json",
                success: function(b) {
                    try {
                        a.isObject(b) && c && c(b)
                    } catch(e) {}
                }
            })
        }
        function c(b) {
            var e = "",
            d = "";
            a.each(b,
            function(a, b) {
                3 > a && (e += "<a href='" + b.sUrl + "'>" + b.tagName + "</a>")
            });
            H && (d = "decoration-tags2-v1");
            a("<div class='module decoration-tags2 " + d + "'>" + e + "</div>").insertBefore(a("#cmtdiv")).show()
        }
        function e(b) {
            var c = "";
            a.each(b,
            function(a, b) {
                if (2 > a) {
                    var e = "";
                    "1" == b.iType ? 0 != b.fScore && (e = "评分:" + b.fScore) : "2" == b.iType && (e = "更新至" + b.sSetNum + "集");
                    c += "<li data-href='" + b.sUrl + "'><a href='javascript:void(0);' class='gk-link2'>《" + b.sName + "》<em class='txt'>" + e + "</em></a><p class='igray2'>" + b.sActor.replace(/\|/g, "、") + "</p></li>"
                }
            });
            a("<div class='module' id='relative_vd'><h3 class='title'>相关影视</h3><ul class='cont-list2'>" + c + "</div>").insertBefore(a("#news-related-news")).show();
            a("#relative_vd").delegate("li", "click",
            function(b) {
                window.location.href = a(this).data("href")
            })
        }
        var d = ["tech", "ent"];
        return {
            build: function() { - 1 != d.indexOf(A.data_channel) && b(function(a) {
                    a && a.success && (a = a.records || [], 0 < a.length && ("tech" == A.data_channel ? c.call(void 0, a) : "ent" == A.data_channel && e.call(void 0, a)))
                })
            }
        }
    })();
    var w = function() {
        window.baidu = {};
        window.baidu.hot = function(b) {
            try {
                if (a.isObject(b) && b.hot) {
                    var c = "",
                    e = a.map(b.hot || {},
                    function(a, b) {
                        return a
                    }),
                    d = p.array.shuffle(e[0]);
                    a.each(d,
                    function(b, e) {
                        if (6 > b && e && a.isObject(e)) {
                            var d = "http://info.3g.qq.com/g/s?aid=jump&url=" + encodeURIComponent(e.url) + "&3g_token=",
                            f = parseInt(uid);
                            0 < f || (f = Math.abs(f).toString(), f = parseInt(f.substring(0, Math.min(8, f.length))));
                            c += "<a href='" + (d + ((f ^ 58978544) & 524287)) + "'>" + e.word + "</a> "
                        }
                    });
                    a("<div class='search-hot2'><h3>百度24小时热词</h3><p>" + c + "</p></div>").insertBefore(a("#news-related-news"))
                }
            } catch(f) {}
        };
        return {
            build: function() {
                a.ajax({
                    type: "GET",
                    url: "http://api.m.baidu.com/?type=hot&c=shishi&from=1011904v&dt=jsonp",
                    dataType: "jsonp",
                    success: function(a) {}
                })
            }
        }
    } (); (function() {
        function b(c, e) {
            a.ajax({
                type: "GET",
                url: "http://tag.html5.qq.com/api/getarticlelist?appId=" + c + "&limit=10&itemCount=0",
                dataType: "json",
                success: function(b) {
                    try {
                        a.isObject(b) && e && e(b)
                    } catch(c) {}
                }
            })
        }
        function c(b) {
            var d = "";
            b.success && (b = p.array.shuffle(b.records), a.each(b,
            function(a, b) {
                if (2 > a) {
                    var c = (b.images || [])[0] || "";
                    d += '<li data-href="' + b.url + '" data-docId="' + b.docId + '"><a href="javascript:void(0);">';
                    "" != c && (d += '<span class="u-img" style=" background-image: url(' + c + '); background-size: cover;"></span>');
                    d += '<div class="detail">                                <h4 class="tit">' + b.title + '</h4>                                <p class="p-txt">                                    <span class="resource">' + b.from + '</span>                                    <span class="time">' + b.elapseTime + "</span>                                </p>                            </div>";
                    d += "</a></li>"
                }
            }), a("<div class='wx-choice' id='wx_commend'><h3 class='title'>微信精选</h3><ul class='list'>" + d + "</div>").insertBefore(a("#news-related-news")).show(), a("#wx_commend").delegate("li", "click",
            function(b) {
                window.location.href = "http://wx.html5.qq.com/loadpage?categoryId=100&appId=" + e[A.data_channel] + "&docId=" + a(this).data("docid") + "&businessId=1&url=" + encodeURIComponent(a(this).data("href")) + "&tabid=" + A.data_channel + "&ch=050400"
            }))
        }
        var e = {
            tech: "9199488",
            finance: "9199483",
            ent: "9199486"
        };
        return {
            build: function() {
                if (isFromQQBrower) {
                    var d = e[A.data_channel];
                    d && b(d,
                    function(b) {
                        0 == a("#wx_commend").length && c(b)
                    })
                }
            }
        }
    })(); (function() {
        function b(a) {
            var c = '<li>\t\t\t\t<a href="' + p + encodeURIComponent(a.newsTitle) + '">' + a.newsTitle + "</a>";
            0 == a.icon && (c += '<i class="inews"></i>');
            return c + "</li>"
        }
        function c() {
            h.css("webkitTransform", "translate3d(0," + -(40 * e) + "px,0)");
            h.css("webkitTransitionDuration", l);
            k = g;
            0 == l && (k = 0);
            e < d ? (e++, l = m) : l = e = 0;
            setTimeout(c, k)
        }
        var e = 0,
        d = 0,
        g = 3E3,
        h = null,
        m = "400ms",
        l, k, p = ((f || {}).realtime_topic || {}).url_prefix || "http://info.3g.qq.com/g/s?aid=sogou&ut=1&i_f=145&rfrom=3gqq_logout_transit&pid=sogou-wsse-bdd8817990ef209f-0101&e=1408&uin=-800490150&keyword=",
        n = "";
        return {
            build: function() {
                var e = ((f || {}).realtime_topic || {}).hot_words || [];
                d = e.length;
                0 < d && (n += '<div class="real-time-news" id="real_time_module">\t\t\t\t<strong class="u-title">实时热点</strong>\t\t\t\t<ul>', a.each(e,
                function(a, c) {
                    n += b(c)
                }), n += b(e[0]), n += "</ul></div>", a(n).insertBefore("#news-related-news"), a("#real_time_module").delegate(".u-title", "click",
                function(a) {
                    location.href = p + encodeURIComponent("实时热点")
                }), h = a("#real_time_module ul"), c())
            }
        }
    })();
    var h = function() {
        return {
            build: function() {
                if ((article_page || {}).isOpenCmt && "" != A.title) {
                    a("#t_news_comment").addClass("page-comment-main2");
                    var b = A.cmt,
                    c = F.cmt.cmt_id,
                    e = F.cmt.isGray;
                    0 == c ? a("#comments-num").hide() : a("#news-comment-count").html(99999 < b ? "99999+": b);
                    b = "http://comment.3g.qq.com/g/s?";
                    e && (b = "http://infoapp.3g.qq.com/g/s?");
                    n.create({
                        api: b,
                        obj: a("#t_news_comment"),
                        id: c,
                        boardId: F.cmt.boardId,
                        title: g_data.show.data.basic.title || "",
                        isGray: e
                    }).fetch();
                    0 != c && a("#cmtdiv").show()
                }
            }
        }
    } (),
    e = function() {
        function b() {
            var f = d.text || [];
            if (0 < f.length) {
                var g = '<ul class="cont-list">';
                a.each(f,
                function(a, b) { - 1 == M.indexOf(b.url) && (g += '<li><a href="' + b.url + '&iarea=103"><time class="n-time">' + b.date.replace(e, "刚刚") + "</time>" + b.title + "</a></li>", M.push(b.url))
                });
                g += "</ul>";
                c.append(g).show()
            }
        }
        var c = null,
        e = /^[0-2]分钟前/g,
        d = {};
        return {
            render: function() {
                c = a("#recommedmodule");
                console.log(c.length);
                d = f.time_read || {};
                b()
            },
            getPic: function() {
                d = f.time_read || {};
                var b = "";
                if (d.img) {
                    var c = (d.img || []).slice(0, 2) || [];
                    null != c && 0 < c.length && (b += '<ul class="cont-lists">', a.each(c,
                    function(a, c) {
                        b += '<li><a href="' + c.url + '&iarea=104" class="imgitem"><img src="' + c.img + '" alt="' + c.title + '"></a><a><span class="img-tit">' + c.title + "</span></a></li>"
                    }), b += "</ul>")
                }
                return b
            }
        }
    } (),
    U = function() {
        function b() {
            var c = [],
            c = Math.max(0, g - 1) * d,
            c = e.slice(c, c + d),
            f = "";
            a.each(c,
            function(a, b) {
                var c = b.url.split("?"),
                c = p.url.url2obj(c[1]);
                l || h.push(c.id);
                if ( - 1 == M.indexOf(b.url) || b.ischecked) l || (M.push(b.url), b.ischecked = !0),
                f += '<li><a href="' + b.url + '&iarea=105">' + b.title + "</a></li>"
            });
            return f
        }
        var c = 0,
        e = [],
        d = 6,
        g = 1,
        c = 0,
        h = [],
        m = null,
        l = !1;
        return {
            init: function() {
                m = a("#guessdmodule");
                a("#refresh-link").bind("click",
                function() {
                    g < c ? g++:(g = 1, l = !0);
                    m.find("ul").html(b())
                });
                var e = new J(m);
                a.bind(y, "scrollend",
                function() {
                    e.check()
                })
            },
            build: function() {
                e = f.guess || [];
                c = Math.ceil(e.length / d);
                1 < c && a("#refresh-link").show();
                g = Math.min(c, g);
                if (0 < e.length) {
                    var l;
                    l = '<ul class="cont-list txt-list">' + b();
                    m.append(l + "</ul>").show().data("havedata", !0).data("ids", h.join(",")).data("type", 3).data("title", "正文页大家爱看").data("expType", "5").data("iarea", "105").data("url", "http://info.3g.qq.com/g/s?aid=dajiaaikan&i_f=451")
                }
            }
        }
    } (); (function() {
        return {
            build: function() {
                var b = f.medialib;
                if (0 < b.length) {
                    var c = "";
                    a.each(b,
                    function(a, b) {
                        c += '<a href="' + b.link + '"><img src="' + b.icon + '" width="45" height="45" alt="媒体"></a><a href="' + b.url + '&iarea=107" class="media-news-link">' + b.title + "</a>"
                    });
                    a("#readmodule").css("display", "-webkit-box").html(c)
                }
            }
        }
    })();
    var X = function() {
        return {
            build: function() {
                var b = f.recom_rank;
                if (0 < b.length) {
                    var c = '<ul class="cont-list">';
                    a.each(b,
                    function(a, b) {
                        if ( - 1 == M.indexOf(b.url)) {
                            var e = "";
                            1 == b.flag && (e = "up");
                            c += '<li><a href="' + b.url + '&iarea=106">' + b.title + '<span class="num ' + e + '">' + b.num + "</span></a></li>"
                        }
                    });
                    c += "</ul>";
                    a("#rankmodule").find(".sub-tit").html(f.recom_rank_title);
                    a("#rankmodule").append(c).show()
                }
            }
        }
    } (),
    Y = function() {
        return {
            build: function() {
                a("#picbottommodule").html(e.getPic()).show()
            }
        }
    } (),
    V = function() {
        var b = null;
        return {
            init: function() {
                b = a("#favor-center");
                window.g_favor_center && (b.bind("click",
                function(c) {
                    b.hasClass("add") && (a(this).data("id", E), r.doFavor(this,
                    function() {
                        b.html("已收藏").addClass("active");
                        I.sendWriteLog(7)
                    }))
                }), r.init({
                    api: "http://infoapp.3g.qq.com/g/usercenter/touch/api/api.jsp"
                }))
            },
            enter: function() {
                A.favour && (b.html("已收藏").addClass("active"), b.removeClass("add"))
            }
        }
    } (),
    W = function() {
        var b = (article_page.whiteRelateVideoCh || "").split(","),
        c = {},
        e;
        for (e in b) {
            var d = b[e].split(":") || [];
            if (d[0]) {
                var f = {};
                f.i_f = d[1];
                c[d[0]] = f
            }
        }
        var g = null;
        return {
            build: function(b) {
                c[A.data_channel] && 0 == a("#rel_video").length && a.ajax({
                    url: "http://info.3g.qq.com/g/s?aid=action_api&module=video_app&action=getRelative",
                    data: {
                        id: b
                    },
                    dataType: "json",
                    success: function(a) {
                        var b = 0,
                        e = c[A.data_channel].i_f;
                        if (a.getRelative && 0 == a.getRelative.code && (z = "", a = (((a.getRelative.data || {}).tablist || [])[0] || {}).media_info || [], b = a.length, 2 <= b)) {
                            b = 2;
                            z += '<div class="cont-lists-video2" id="rel_video">';
                            for (var d = 0; d < b; d += 2) {
                                z += '<ul class="list">';
                                for (var f = d; f < d + 2; f++) {
                                    var h = a[f];
                                    z += '<li data-vid="' + h.id + '" data-i_f="' + e + '" data-isCid="' + h.iscid + '">                                                <a href="javascript:;" class="lk">                                                <span class="v-img" style="background-image:url(' + h.pic3url + ')">                                    </span>                                    <p class="tit">' + h.title + "</p></a>                            </li>"
                                }
                                z += "</ul>"
                            }
                            z += "</div>";
                            g.append(z).show()
                        }
                    }
                })
            },
            init: function(b) {
                g = b;
                g.delegate("li", "click",
                function(b) {
                    1 == a(this).data("isCid") ? location.href = "http://infoapp.3g.qq.com/g/s?aid=video#album/cid=" + a(this).data("vid") + "&i_f=" + a(this).data("i_f") : location.href = "http://infoapp.3g.qq.com/g/s?aid=video#play/id=" + a(this).data("vid") + "&i_f=" + a(this).data("i_f")
                })
            }
        }
    } (),
    Z = function(b) {
        function c(a) {
            a = a.match(/.*\:\/\/([^\/]*).*/);
            "undefined" != typeof a && null != a && (host = a[1]);
            return host
        }
        var e = b.bid || "info";
        b = b.cb ||
        function() {};
        var d = ["mobads.baidu.com", "cpro.baidustatic.com", "m.adpro.cn"],
        f = d.slice(1, 3);
        try {
            if (self.frameElement && "iframe" == self.frameElement.tagName.toLowerCase()) {
                var g = top.window;
                isReport = !1;
                if (g) {
                    var h = g.document.body.getElementsByTagName("script"),
                    m = [],
                    l = "";
                    a.each(h,
                    function(a, b) {
                        b.src ? (m.push(b.src), -1 != f.indexOf(c(b.src)) && (isReport = !0)) : isReport && (l += b.innerHTML)
                    });
                    a.ajax({
                        url: "/g/s",
                        type: "POST",
                        data: {
                            aid: "debug_tempt_log",
                            bid: e,
                            col1: "iframepage",
                            col2: navigator.userAgent,
                            col3: m.slice(0, 5).join("|"),
                            col4: encodeURIComponent(l)
                        },
                        success: function() {}
                    });
                    b && b();
                    var k = g.document.body.innerHTML;
                    a.each(d,
                    function(b, c) {
                        if ( - 1 != k.indexOf(c)) {
                            var e = [].slice.call(top.window.document.body.children, 0);
                            a.each(e,
                            function(a, b) {
                                b && ("iframe" != b.tagName.toLowerCase() ? b.style.display = "none": -1 == b.src.indexOf(".3g.qq.com") && (b.style.display = "none"))
                            })
                        }
                    })
                }
            }
        } catch(p) {
            console.log(p)
        }
    };
    a.bind(y, "vpageInit",
    function() {
        C.append(z);
        a("#newtip a").bind("click",
        function(a) {
            a.preventDefault();
            d.go("news")
        });
        a("#comment-count").bind("click",
        function() {
            parseInt(a("#news-comment-count").text()) ? d.go("comment") : a("#news_cmt_txt").get(0).focus()
        });
        a("#more-comment").bind("click",
        function(a) {
            a.preventDefault();
            d.go("comment")
        });
        C.delegate("#audio", "click",
        function() {
            var b = new SpeechSynthesisUtterance;
            if (a(this).attr("flag"))"start" == a(this).attr("flag") ? (speechSynthesis.pause(), a(this).attr("flag", "pause").removeClass("play").addClass("pause")) : "pause" == a(this).attr("flag") && (speechSynthesis.resume(), a(this).attr("flag", "start").removeClass("pause").addClass("play"));
            else {
                a(this).attr("flag", "start");
                var c = "";
                a("#news-article p").each(function() {
                    a(this).hasClass("w-pic-des") || (c += a(this).text() + "  ")
                });
                b.text = c;
                b.volume = 1;
                b.rate = 0.5;
                b.pitch = 1;
                b.lang = "zh-CN";
                speechSynthesis.speak(b)
            }
        });
        O.init();
        S.init();
        R.init();
        U.init();
        T.init();
        Q.init();
        V.init();
        D.init();
        N.init();
        m.init();
        c.init({
            cb: function() {
                a("#user-center").addClass("footer-tips").attr("href", "http://infoapp.3g.qq.com/g/s?aid=user_subshow&plg_auth=1&sid=" + g.getSid() + "#news")
            }
        });
        window.onscroll = function() {
            clearTimeout(l);
            l = setTimeout(b, 150)
        };
        var b = function() {
            a.trigger(y, "scrollend")
        };
        a("body").append('<div id="div_waiting" class="hide" style="position:absolute;"><span class="loading"><em class="loading-em"></em></span><span class="loading-color">读取中</span></div>');
        var e = article_page.sctImgUrl ? article_page.sctImgUrl + "&i_f=415": "http://info.3g.qq.com/g/s?aid=rd&url=FfPQunvMlGZPyDSgJAd-jw7lNhWjKo46NsyHnKZOOxqMdHDvm788rZzbK6scujN8qc3y3S-fosofSgyFqHKWEEFk4Jhrgr2CZbFUSGKCtZYMnkhtTyDaKMC2oU6urPd0gurMCUdEz4bZ1Ph83AoUTzWfTXd3xk8CnRy3n6sH8VDFCKxfoP9KT6AGhSdAeqNp&i_f=415";
        a("#news-save-to-desktop").attr("href", e)
    });
    a.bind(y, "vpageEnter", v);
    a.bind(y, "vpageBack", v);
    a.bind(y, "vpageLeave",
    function() {
        P = window.pageYOffset || document.body.scrollTop + document.documentElement.scrollTop;
        a("footer").hide()
    });
    d.register(y, "news")
});
core.define("msgtip", ["$", "loginMod", "util"],
function(a, d, p) {
    function b() {
        g.addClass("bounceOutRight");
        k = !0
    }
    var g = null,
    n = !1,
    k = !1,
    q = null,
    r, u = "";
    return {
        init: function() {
            a("body").append('<div id="msgtip" class="news-tips"><a id="msgcontent"></a><a id="tipclose" class="news-tips-close">关闭</a></div>');
            g = a("#msgtip");
            a("#msgtip").delegate(".news-tips-close", "click",
            function() {
                p.cookie.setCookie("medal_lastmodify_time", r, 100, ".3g.qq.com");
                window.clearTimeout(q);
                b()
            }).delegate("#msgcontent", "click",
            function() {
                p.cookie.setCookie("medal_lastmodify_time", r, 100, ".3g.qq.com");
                var b = a(this).data("href");
                window.location.href = b
            });
            g.bind("webkitAnimationEnd",
            function() {
                n ? k && (a(this).removeClass("bounceOutRight").css("webkitTransform", "translate3d(0,0,0)").hide(), n = !1) : (a(this).removeClass("bounceInRight").css("webkitTransform", "translate3d(-317px,0,0)"), q = setTimeout(function() {
                    b()
                },
                u), n = !0)
            })
        },
        show: function(b) {
            function c() {
                var b = k.title;
                u = k.duration || 5E3;
                a("#msgcontent").data("href", k.url);
                var c = '<img src="' + k.image + '" width="28" alt="' + k.title + '"><strong>' + k.title + "<em>" + k.desc + "</em></strong>";
                a("#msgcontent").html(c);
                g.addClass("bounceInRight");
                c = k.url;
                b = {
                    type: "GET",
                    url: "/g/index5/api/api.jsp",
                    data: {
                        sid: d.getSid(),
                        action: "exp",
                        expType: 1,
                        url: encodeURIComponent(c),
                        title: encodeURIComponent(b)
                    }
                };
                a.ajax(b)
            }
            var k = b;
            try {
                if (a("#msgcontent").html(""), b.is_show) {
                    g.show();
                    r = b.modify_time;
                    var n = p.cookie.getCookie("medal_lastmodify_time");
                    null != n && r != n ? c(b) : null == n && c(b)
                }
            } catch(q) {}
        },
        hide: b
    }
});
core.define("notifyMod", ["$", "util", "loginMod"],
function(a, d, p) {
    var b, g, n, k = "",
    q = d.storage.isSupportLocalStorage,
    r = function() {
        n.removeClass("news-center-tips-show").addClass("news-center-tips-hide").removeAttr("show")
    },
    u = function(b) {
        if (b = b.msg) {
            k = b.msgId;
            var c;
            if (c = k) {
                c = k;
                var d;
                d = q() ? localStorage.getItem("news_center_msgId") : void 0;
                c = c != d
            }
            c && (a(n).html("<a href='" + b.targetUrl + "'>" + b.title + "</div>"), setTimeout(function() {
                n.addClass("news-center-tips-show").attr("show", 1)
            },
            1E3))
        }
    };
    return {
        fire: function() {
            p.isLogin() && a.ajax({
                url: "http://infoapp.3g.qq.com/g/usercenter/touch/api/api.jsp?action=msg_badge&sid=" + p.getSid() + "&callback=?",
                dataType: "jsonp",
                success: function(a) {
                    if ((a = a.msg_badge) && 0 == a.code && 0 < (a.data.count || 0)) u(a.data),
                    b && b()
                }
            })
        },
        init: function(d) {
            b = d.cb ||
            function() {};
            a("body").append("<div class='news-center-tips' id='center-tips'></div>");
            n = a("#center-tips");
            n.bind("webkitTransitionEnd",
            function() {
                g && clearTimeout(g);
                null != a(this).attr("show") ? g = setTimeout(r, 3E3) : q() && "" != k && localStorage.setItem("news_center_msgId", k)
            })
        }
    }
});
core.define("wxShare", [],
function() {
    function a(a, b, d) {
        b = function() {};
        d = function() {};
        var g = a || {};
        g.url = a.shareUrl || a.url || "";
        g.description = a.contents || a.description || "";
        g.img_url = a.imgUrl || a.img_url || "http://3gimg.qq.com/html5app/205/7c6/785/8fa/c64/34d/cb7/14d/27a/abc/d20/56/180_180.png";
        browser && (browser.app && browser.app.share) && browser.app.share(g,
        function(a) {
            1 == a.code ? b && b() : d && d()
        })
    }
    var d = !1,
    p = window.navigator.userAgent,
    b = /android/ig.test(p),
    g = /iphone|ipod|ios/ig.test(p),
    n = /MicroMessenger/gi.test(p),
    k = /mobile.*qq/gi.test(p),
    q = /ucbrowser/gi.test(p),
    r = /mqqbrowser/i.test(p),
    u = function() {},
    m = {
        init: function(b) {
            d ? a(b) : u = a
        }
    };
    /mqq/i.test(navigator.userAgent) &&
    function(a, b, d) {
        var g = document.createElement("script");
        g.language = "javascript";
        g.type = "text/javascript";
        d && (g.charset = d);
        g.onload = g.onreadystatechange = function() {
            if (!this.readyState || "loaded" == this.readyState || "complete" == this.readyState) b && b(),
            g.onload = g.onreadystatechange = null,
            g.parentNode.removeChild(g)
        };
        g.src = a;
        document.getElementsByTagName("head")[0].appendChild(g)
    } ("http://jsapi.qq.com/get?api=app.share",
    function() {
        d = !0;
        u && u()
    },
    "utf-8");
    m.isFromWx = function() {
        return /MicroMessenger/gi.test(window.navigator.userAgent) ? !0 : !1
    };
    m.isFromQQ = function() {
        return /mobile.*qq/gi.test(window.navigator.userAgent) ? !0 : !1
    };
    m.isFromUC = function() {
        return /ucbrowser/gi.test(window.navigator.userAgent) ? !0 : !1
    };
    m.sharefriendFromUC = function(a) {
        g ? ucbrowser && ucbrowser.web_share(a.title, a.description, a.url, "kWeixin", "", "@手机腾讯网", "") : b && ucweb && ucweb.startRequest("shell.page_share", [a.title, a.description, a.url, "WechatFriends", "", "", ""])
    };
    m.shareTimelineFromUC = function(a) {
        g ? ucbrowser && ucbrowser.web_share(a.title, a.description, a.url, "kWeixinFriend", "", "@手机腾讯网", "") : b && ucweb && ucweb.startRequest("shell.page_share", [a.title, a.description, a.url, "WechatTimeline", "", "", ""])
    };
    m.isQbInstalled = function(a) {
        a = a || {};
        var b = a.testUrl || "",
        d = a.onSucc,
        g = a.onFail,
        b = "mttbrowser://url=" + (b || location.href).replace(/http:\/\//ig, ""),
        k = Date.now(),
        m = 0,
        f = function() {
            k += 1E3;
            m += 1;
            3 > m ? setTimeout(f, 1E3) : 1E3 < Math.abs(k - Date.now()) ? d && d() : g && g()
        },
        n = document.createElement("iframe");
        n.src = b;
        n.id = "qbInstallValidator_" + Date.now();
        n.style.display = "none";
        document.body.appendChild(n);
        setTimeout(f, 1E3);
        setTimeout(function() {
            n && n.parentNode && n.parentNode.removeChild(n)
        },
        5E3);
        return ! 1
    };
    m.toggleShareTip = function(a) {
        "qqwebview" == a ? (m.$weixinMask || (m.$weixinMask = $('<div style="display:none;position: fixed;top: 0;left: 0;z-index: 10000;width: 100%;height: 100%;background: rgba(0,0,0,0.7);"><img src="http://3gimg.qq.com/wap30/infoapp/touch/todaynews/images/weixin_share_mask_bg.png" alt="微信分享" style="position: absolute;right: 0;top: 0;width: 200px;"></div>'), $("body").append(m.$weixinMask)), m.$weixinMask.one("click",
        function() {
            m.$weixinMask.hide()
        }).show()) : (m.$weixinMask || (m.$weixinMask = $('<div style="position: fixed; top: 0; right: 0; z-index: 10000; display: none;"><img src="http://3gimg.qq.com/wap30/infoapp/touch/wx_choice/images/weixin_share_layer_bg.png" alt="" style="width: 2.49rem;"></div>'), $("body").append(m.$weixinMask)), m.$weixinMask.show(), setTimeout(function() {
            m.$weixinMask.hide()
        },
        3E3))
    };
    m.$weixinMask = null;
    m.sharefriend = function(a) {
        n ? this.toggleShareTip() : k ? this.toggleShareTip("qqwebview") : q ? this.sharefriendFromUC(a) : r ? (a.to_app = 1, this.init(a)) : this.isQbInstalled({
            testUrl: location.href + "&fromsharefriend=1",
            onSucc: function() {},
            onFail: function() {
                location.href = "http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349"
            }
        })
    };
    m.shareTimeLine = function(a) {
        n ? this.toggleShareTip() : k ? this.toggleShareTip("qqwebview") : q ? this.shareTimelineFromUC(a) : r ? (a.to_app = 8, this.init(a)) : this.isQbInstalled({
            testUrl: location.href + "&fromsharetimeline=1",
            onSucc: function() {},
            onFail: function() {
                location.href = "http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349"
            }
        })
    };
    m.actSafariShare = function(a) {
        for (var b = location.search.slice(1), d = [], g = {},
        k, n = decodeURIComponent, d = b.split("&"), b = d.length; b--;) k = d[b],
        k = k.split("="),
        g[n(k[0])] = n(k[1]);
        g.fromsharefriend && 1 == g.fromsharefriend && r ? ($.isFunction(history.replaceState) && window.history.replaceState(null, document.title, window.location.href.replace(/fromsharefriend=1/g, "")), m.sharefriend(a)) : g.fromsharetimeline && (1 == g.fromsharetimeline && r) && ($.isFunction(history.replaceState) && window.history.replaceState(null, document.title, window.location.href.replace(/fromsharetimeline=1/g, "")), m.shareTimeLine(a))
    };
    return m
});

/*FEND*/
