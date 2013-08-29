/* SVN.committedRevision=681601 */
(function(a5, af) {
    function aI() {
        if (!C.isReady) {
            try {
                ai.documentElement.doScroll("left")
            } catch (c) {
                setTimeout(aI, 1);
                return
            }
            C.ready()
        }
    }

    function g(s, c) {
        c.src ? C.ajax({
            url: c.src,
            async: false,
            dataType: "script"
        }) : C.globalEval(c.text || c.textContent || c.innerHTML || "");
        c.parentNode && c.parentNode.removeChild(c)
    }

    function bh(A, K, c, s, F, w) {
        var G = A.length;
        if (typeof K === "object") {
            for (var J in K) {
                bh(A, J, K[J], s, F, c)
            }
            return A
        }
        if (c !== af) {
            s = !w && s && C.isFunction(c);
            for (J = 0; J < G; J++) {
                F(A[J], K, s ? c.call(A[J], J, F(A[J], K)) : c, w)
            }
            return A
        }
        return G ? F(A[0], K) : af
    }

    function aC() {
        return (new Date).getTime()
    }

    function bg() {
        return false
    }

    function be() {
        return true
    }

    function x(w, s, c) {
        c[0].type = w;
        return C.event.handle.apply(s, c)
    }

    function B(L) {
        var J, F = [],
            s = [],
            w = arguments,
            c, A, K, O, P, G;
        A = C.data(this, "events");
        if (!(L.liveFired === this || !A || !A.live || L.button && L.type === "click")) {
            L.liveFired = this;
            var N = A.live.slice(0);
            for (O = 0; O < N.length; O++) {
                A = N[O];
                A.origType.replace(U, "") === L.type ? s.push(A.selector) : N.splice(O--, 1)
            }
            c = C(L.target).closest(s, L.currentTarget);
            P = 0;
            for (G = c.length; P < G; P++) {
                for (O = 0; O < N.length; O++) {
                    A = N[O];
                    if (c[P].selector === A.selector) {
                        K = c[P].elem;
                        s = null;
                        if (A.preType === "mouseenter" || A.preType === "mouseleave") {
                            s = C(L.relatedTarget).closest(A.selector)[0]
                        }
                        if (!s || s !== K) {
                            F.push({
                                elem: K,
                                handleObj: A
                            })
                        }
                    }
                }
            }
            P = 0;
            for (G = F.length; P < G; P++) {
                c = F[P];
                L.currentTarget = c.elem;
                L.data = c.handleObj.data;
                L.handleObj = c.handleObj;
                if (c.handleObj.origHandler.apply(c.elem, w) === false) {
                    J = false;
                    break
                }
            }
            return J
        }
    }

    function aN(s, c) {
        return "live." + (s && s !== "*" ? s + "." : "") + c.replace(/\./g, "`").replace(/ /g, "&")
    }

    function a1(c) {
        return !c || !c.parentNode || c.parentNode.nodeType === 11
    }

    function aS(w, s) {
        var c = 0;
        s.each(function() {
            if (this.nodeName === (w[c] && w[c].nodeName)) {
                var A = C.data(w[c++]),
                    F = C.data(this, A);
                if (A = A && A.events) {
                    delete F.handle;
                    F.events = {};
                    for (var G in A) {
                        for (var J in A[G]) {
                            C.event.add(this, G, A[G][J], A[G][J].data)
                        }
                    }
                }
            }
        })
    }

    function a7(A, c, F) {
        var G, s, w;
        c = c && c[0] ? c[0].ownerDocument || c[0] : ai;
        if (A.length === 1 && typeof A[0] === "string" && A[0].length < 512 && c === ai && !k.test(A[0]) && (C.support.checkClone || !bc.test(A[0]))) {
            s = true;
            if (w = C.fragments[A[0]]) {
                if (w !== 1) {
                    G = w
                }
            }
        }
        if (!G) {
            G = c.createDocumentFragment();
            C.clean(A, c, G, F)
        }
        if (s) {
            C.fragments[A[0]] = w ? G : 1
        }
        return {
            fragment: G,
            cacheable: s
        }
    }

    function ax(w, s) {
        var c = {};
        C.each(d.concat.apply([], d.slice(0, s)), function() {
            c[this] = w
        });
        return c
    }

    function M(c) {
        return "scrollTo" in c && c.document ? c : c.nodeType === 9 ? c.defaultView || c.parentWindow : false
    }
    var C = function(s, c) {
        return new C.fn.init(s, c)
    }, l = a5.jQuery,
        f = a5.$,
        ai = a5.document,
        aE, aq = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
        ah = /^.[^:#\[\.,]*$/,
        bf = /\S/,
        S = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
        m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        j = navigator.userAgent,
        ay = false,
        e = [],
        av, a = Object.prototype.toString,
        ak = Object.prototype.hasOwnProperty,
        H = Array.prototype.push,
        b = Array.prototype.slice,
        ap = Array.prototype.indexOf;
    C.fn = C.prototype = {
        init: function(s, c) {
            var A, w;
            if (!s) {
                return this
            }
            if (s.nodeType) {
                this.context = this[0] = s;
                this.length = 1;
                return this
            }
            if (s === "body" && !c) {
                this.context = ai;
                this[0] = ai.body;
                this.selector = "body";
                this.length = 1;
                return this
            }
            if (typeof s === "string") {
                if ((A = aq.exec(s)) && (A[1] || !c)) {
                    if (A[1]) {
                        w = c ? c.ownerDocument || c : ai;
                        if (s = m.exec(s)) {
                            if (C.isPlainObject(c)) {
                                s = [ai.createElement(s[1])];
                                C.fn.attr.call(s, c, true)
                            } else {
                                s = [w.createElement(s[1])]
                            }
                        } else {
                            s = a7([A[1]], [w]);
                            s = (s.cacheable ? s.fragment.cloneNode(true) : s.fragment).childNodes
                        }
                        return C.merge(this, s)
                    } else {
                        if (c = ai.getElementById(A[2])) {
                            if (c.id !== A[2]) {
                                return aE.find(s)
                            }
                            this.length = 1;
                            this[0] = c
                        }
                        this.context = ai;
                        this.selector = s;
                        return this
                    }
                } else {
                    if (!c && /^\w+$/.test(s)) {
                        this.selector = s;
                        this.context = ai;
                        s = ai.getElementsByTagName(s);
                        return C.merge(this, s)
                    } else {
                        return !c || c.jquery ? (c || aE).find(s) : C(c).find(s)
                    }
                }
            } else {
                if (C.isFunction(s)) {
                    return aE.ready(s)
                }
            } if (s.selector !== af) {
                this.selector = s.selector;
                this.context = s.context
            }
            return C.makeArray(s, this)
        },
        selector: "",
        jquery: "1.4.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return b.call(this, 0)
        },
        get: function(c) {
            return c == null ? this.toArray() : c < 0 ? this.slice(c)[0] : this[c]
        },
        pushStack: function(s, c, A) {
            var w = C();
            C.isArray(s) ? H.apply(w, s) : C.merge(w, s);
            w.prevObject = this;
            w.context = this.context;
            if (c === "find") {
                w.selector = this.selector + (this.selector ? " " : "") + A
            } else {
                if (c) {
                    w.selector = this.selector + "." + c + "(" + A + ")"
                }
            }
            return w
        },
        each: function(s, c) {
            return C.each(this, s, c)
        },
        ready: function(c) {
            C.bindReady();
            if (C.isReady) {
                c.call(ai, C)
            } else {
                e && e.push(c)
            }
            return this
        },
        eq: function(c) {
            return c === -1 ? this.slice(c) : this.slice(c, +c + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(b.apply(this, arguments), "slice", b.call(arguments).join(","))
        },
        map: function(c) {
            return this.pushStack(C.map(this, function(s, w) {
                return c.call(s, w, s)
            }))
        },
        end: function() {
            return this.prevObject || C(null)
        },
        push: H,
        sort: [].sort,
        splice: [].splice
    };
    C.fn.init.prototype = C.fn;
    C.extend = C.fn.extend = function() {
        var A = arguments[0] || {}, K = 1,
            c = arguments.length,
            s = false,
            F, w, G, J;
        if (typeof A === "boolean") {
            s = A;
            A = arguments[1] || {};
            K = 2
        }
        if (typeof A !== "object" && !C.isFunction(A)) {
            A = {}
        }
        if (c === K) {
            A = this;
            --K
        }
        for (; K < c; K++) {
            if ((F = arguments[K]) != null) {
                for (w in F) {
                    G = A[w];
                    J = F[w];
                    if (A !== J) {
                        if (s && J && (C.isPlainObject(J) || C.isArray(J))) {
                            G = G && (C.isPlainObject(G) || C.isArray(G)) ? G : C.isArray(J) ? [] : {};
                            A[w] = C.extend(s, G, J)
                        } else {
                            if (J !== af) {
                                A[w] = J
                            }
                        }
                    }
                }
            }
        }
        return A
    };
    C.extend({
        noConflict: function(c) {
            a5.$ = f;
            if (c) {
                a5.jQuery = l
            }
            return C
        },
        isReady: false,
        ready: function() {
            if (!C.isReady) {
                if (!ai.body) {
                    return setTimeout(C.ready, 13)
                }
                C.isReady = true;
                if (e) {
                    for (var s, c = 0; s = e[c++];) {
                        s.call(ai, C)
                    }
                    e = null
                }
                C.fn.triggerHandler && C(ai).triggerHandler("ready")
            }
        },
        bindReady: function() {
            if (!ay) {
                ay = true;
                if (ai.readyState === "complete") {
                    return C.ready()
                }
                if (ai.addEventListener) {
                    ai.addEventListener("DOMContentLoaded", av, false);
                    a5.addEventListener("load", C.ready, false)
                } else {
                    if (ai.attachEvent) {
                        ai.attachEvent("onreadystatechange", av);
                        a5.attachEvent("onload", C.ready);
                        var s = false;
                        try {
                            s = a5.frameElement == null
                        } catch (c) {}
                        ai.documentElement.doScroll && s && aI()
                    }
                }
            }
        },
        isFunction: function(c) {
            return a.call(c) === "[object Function]"
        },
        isArray: function(c) {
            return a.call(c) === "[object Array]"
        },
        isPlainObject: function(s) {
            if (!s || a.call(s) !== "[object Object]" || s.nodeType || s.setInterval) {
                return false
            }
            if (s.constructor && !ak.call(s, "constructor") && !ak.call(s.constructor.prototype, "isPrototypeOf")) {
                return false
            }
            var c;
            for (c in s) {}
            return c === af || ak.call(s, c)
        },
        isEmptyObject: function(s) {
            for (var c in s) {
                return false
            }
            return true
        },
        error: function(c) {
            throw c
        },
        parseJSON: function(c) {
            if (typeof c !== "string" || !c) {
                return null
            }
            c = C.trim(c);
            if (/^[\],:{}\s]*$/.test(c.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                return a5.JSON && a5.JSON.parse ? a5.JSON.parse(c) : (new Function("return " + c))()
            } else {
                C.error("Invalid JSON: " + c)
            }
        },
        noop: function() {},
        globalEval: function(w) {
            if (w && bf.test(w)) {
                var s = ai.getElementsByTagName("head")[0] || ai.documentElement,
                    c = ai.createElement("script");
                c.type = "text/javascript";
                if (C.support.scriptEval) {
                    c.appendChild(ai.createTextNode(w))
                } else {
                    c.text = w
                }
                s.insertBefore(c, s.firstChild);
                s.removeChild(c)
            }
        },
        nodeName: function(s, c) {
            return s.nodeName && s.nodeName.toUpperCase() === c.toUpperCase()
        },
        each: function(A, c, J) {
            var s, F = 0,
                w = A.length,
                G = w === af || C.isFunction(A);
            if (J) {
                if (G) {
                    for (s in A) {
                        if (c.apply(A[s], J) === false) {
                            break
                        }
                    }
                } else {
                    for (; F < w;) {
                        if (c.apply(A[F++], J) === false) {
                            break
                        }
                    }
                }
            } else {
                if (G) {
                    for (s in A) {
                        if (c.call(A[s], s, A[s]) === false) {
                            break
                        }
                    }
                } else {
                    for (J = A[0]; F < w && c.call(J, F, J) !== false; J = A[++F]) {}
                }
            }
            return A
        },
        trim: function(c) {
            return (c || "").replace(S, "")
        },
        makeArray: function(s, c) {
            c = c || [];
            if (s != null) {
                s.length == null || typeof s === "string" || C.isFunction(s) || typeof s !== "function" && s.setInterval ? H.call(c, s) : C.merge(c, s)
            }
            return c
        },
        inArray: function(s, c) {
            if (c.indexOf) {
                return c.indexOf(s)
            }
            for (var A = 0, w = c.length; A < w; A++) {
                if (c[A] === s) {
                    return A
                }
            }
            return -1
        },
        merge: function(A, c) {
            var s = A.length,
                w = 0;
            if (typeof c.length === "number") {
                for (var F = c.length; w < F; w++) {
                    A[s++] = c[w]
                }
            } else {
                for (; c[w] !== af;) {
                    A[s++] = c[w++]
                }
            }
            A.length = s;
            return A
        },
        grep: function(A, c, F) {
            for (var G = [], s = 0, w = A.length; s < w; s++) {
                !F !== !c(A[s], s) && G.push(A[s])
            }
            return G
        },
        map: function(A, c, J) {
            for (var s = [], F, w = 0, G = A.length; w < G; w++) {
                F = c(A[w], w, J);
                if (F != null) {
                    s[s.length] = F
                }
            }
            return s.concat.apply([], s)
        },
        guid: 1,
        proxy: function(w, s, c) {
            if (arguments.length === 2) {
                if (typeof s === "string") {
                    c = w;
                    w = c[s];
                    s = af
                } else {
                    if (s && !C.isFunction(s)) {
                        c = s;
                        s = af
                    }
                }
            }
            if (!s && w) {
                s = function() {
                    return w.apply(c || this, arguments)
                }
            }
            if (w) {
                s.guid = w.guid = w.guid || s.guid || C.guid++
            }
            return s
        },
        uaMatch: function(c) {
            c = c.toLowerCase();
            c = /(webkit)[ \/]([\w.]+)/.exec(c) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || !/compatible/.test(c) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(c) || [];
            return {
                browser: c[1] || "",
                version: c[2] || "0"
            }
        },
        browser: {}
    });
    j = C.uaMatch(j);
    if (j.browser) {
        C.browser[j.browser] = true;
        C.browser.version = j.version
    }
    if (C.browser.webkit) {
        C.browser.safari = true
    }
    if (ap) {
        C.inArray = function(s, c) {
            return ap.call(c, s)
        }
    }
    aE = C(ai);
    if (ai.addEventListener) {
        av = function() {
            ai.removeEventListener("DOMContentLoaded", av, false);
            C.ready()
        }
    } else {
        if (ai.attachEvent) {
            av = function() {
                if (ai.readyState === "complete") {
                    ai.detachEvent("onreadystatechange", av);
                    C.ready()
                }
            }
        }
    }(function() {
        C.support = {};
        var F = ai.documentElement,
            w = ai.createElement("script"),
            s = ai.createElement("div"),
            c = "script" + aC();
        s.style.display = "none";
        s.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var A = s.getElementsByTagName("*"),
            L = s.getElementsByTagName("a")[0];
        if (!(!A || !A.length || !L)) {
            C.support = {
                leadingWhitespace: s.firstChild.nodeType === 3,
                tbody: !s.getElementsByTagName("tbody").length,
                htmlSerialize: !! s.getElementsByTagName("link").length,
                style: /red/.test(L.getAttribute("style")),
                hrefNormalized: L.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(L.style.opacity),
                cssFloat: !! L.style.cssFloat,
                checkOn: s.getElementsByTagName("input")[0].value === "on",
                optSelected: ai.createElement("select").appendChild(ai.createElement("option")).selected,
                parentNode: s.removeChild(s.appendChild(ai.createElement("div"))).parentNode === null,
                deleteExpando: true,
                checkClone: false,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null
            };
            w.type = "text/javascript";
            try {
                w.appendChild(ai.createTextNode("window." + c + "=1;"))
            } catch (J) {}
            F.insertBefore(w, F.firstChild);
            if (a5[c]) {
                C.support.scriptEval = true;
                delete a5[c]
            }
            try {
                delete w.test
            } catch (G) {
                C.support.deleteExpando = false
            }
            F.removeChild(w);
            if (s.attachEvent && s.fireEvent) {
                s.attachEvent("onclick", function K() {
                    C.support.noCloneEvent = false;
                    s.detachEvent("onclick", K)
                });
                s.cloneNode(true).fireEvent("onclick")
            }
            s = ai.createElement("div");
            s.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            F = ai.createDocumentFragment();
            F.appendChild(s.firstChild);
            C.support.checkClone = F.cloneNode(true).cloneNode(true).lastChild.checked;
            C(function() {
                var N = ai.createElement("div");
                N.style.width = N.style.paddingLeft = "1px";
                ai.body.appendChild(N);
                C.boxModel = C.support.boxModel = N.offsetWidth === 2;
                ai.body.removeChild(N).style.display = "none"
            });
            F = function(N) {
                var P = ai.createElement("div");
                N = "on" + N;
                var O = N in P;
                if (!O) {
                    P.setAttribute(N, "return;");
                    O = typeof P[N] === "function"
                }
                return O
            };
            C.support.submitBubbles = F("submit");
            C.support.changeBubbles = F("change");
            F = w = s = A = L = null
        }
    })();
    C.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var aG = "jQuery" + aC(),
        h = 0,
        ag = {};
    C.extend({
        cache: {},
        expando: aG,
        noData: {
            embed: true,
            object: true,
            applet: true
        },
        data: function(A, c, s) {
            if (!(A.nodeName && C.noData[A.nodeName.toLowerCase()])) {
                A = A == a5 ? ag : A;
                var w = A[aG],
                    F = C.cache;
                if (!w && typeof c === "string" && s === af) {
                    return null
                }
                w || (w = ++h);
                if (typeof c === "object") {
                    A[aG] = w;
                    F[w] = C.extend(true, {}, c)
                } else {
                    if (!F[w]) {
                        A[aG] = w;
                        F[w] = {}
                    }
                }
                A = F[w];
                if (s !== af) {
                    A[c] = s
                }
                return typeof c === "string" ? A[c] : A
            }
        },
        removeData: function(A, c) {
            if (!(A.nodeName && C.noData[A.nodeName.toLowerCase()])) {
                A = A == a5 ? ag : A;
                var s = A[aG],
                    w = C.cache,
                    F = w[s];
                if (c) {
                    if (F) {
                        delete F[c];
                        C.isEmptyObject(F) && C.removeData(A)
                    }
                } else {
                    if (C.support.deleteExpando) {
                        delete A[C.expando]
                    } else {
                        A.removeAttribute && A.removeAttribute(C.expando)
                    }
                    delete w[s]
                }
            }
        }
    });
    C.fn.extend({
        data: function(s, c) {
            if (typeof s === "undefined" && this.length) {
                return C.data(this[0])
            } else {
                if (typeof s === "object") {
                    return this.each(function() {
                        C.data(this, s)
                    })
                }
            }
            var A = s.split(".");
            A[1] = A[1] ? "." + A[1] : "";
            if (c === af) {
                var w = this.triggerHandler("getData" + A[1] + "!", [A[0]]);
                if (w === af && this.length) {
                    w = C.data(this[0], s)
                }
                return w === af && A[1] ? this.data(A[0]) : w
            } else {
                return this.trigger("setData" + A[1] + "!", [A[0], c]).each(function() {
                    C.data(this, s, c)
                })
            }
        },
        removeData: function(c) {
            return this.each(function() {
                C.removeData(this, c)
            })
        }
    });
    C.extend({
        queue: function(s, c, A) {
            if (s) {
                c = (c || "fx") + "queue";
                var w = C.data(s, c);
                if (!A) {
                    return w || []
                }
                if (!w || C.isArray(A)) {
                    w = C.data(s, c, C.makeArray(A))
                } else {
                    w.push(A)
                }
                return w
            }
        },
        dequeue: function(s, c) {
            c = c || "fx";
            var A = C.queue(s, c),
                w = A.shift();
            if (w === "inprogress") {
                w = A.shift()
            }
            if (w) {
                c === "fx" && A.unshift("inprogress");
                w.call(s, function() {
                    C.dequeue(s, c)
                })
            }
        }
    });
    C.fn.extend({
        queue: function(s, c) {
            if (typeof s !== "string") {
                c = s;
                s = "fx"
            }
            if (c === af) {
                return C.queue(this[0], s)
            }
            return this.each(function() {
                var w = C.queue(this, s, c);
                s === "fx" && w[0] !== "inprogress" && C.dequeue(this, s)
            })
        },
        dequeue: function(c) {
            return this.each(function() {
                C.dequeue(this, c)
            })
        },
        delay: function(s, c) {
            s = C.fx ? C.fx.speeds[s] || s : s;
            c = c || "fx";
            return this.queue(c, function() {
                var w = this;
                setTimeout(function() {
                    C.dequeue(w, c)
                }, s)
            })
        },
        clearQueue: function(c) {
            return this.queue(c || "fx", [])
        }
    });
    var aL = /[\n\t]/g,
        aO = /\s+/,
        ar = /\r/g,
        aZ = /href|src|style/,
        aj = /(button|input)/i,
        i = /(button|input|object|select|textarea)/i,
        aK = /^(a|area)$/i,
        aw = /radio|checkbox/;
    C.fn.extend({
        attr: function(s, c) {
            return bh(this, s, c, true, C.attr)
        },
        removeAttr: function(c) {
            return this.each(function() {
                C.attr(this, c, "");
                this.nodeType === 1 && this.removeAttribute(c)
            })
        },
        addClass: function(F) {
            if (C.isFunction(F)) {
                return this.each(function(O) {
                    var N = C(this);
                    N.addClass(F.call(this, O, N.attr("class")))
                })
            }
            if (F && typeof F === "string") {
                for (var w = (F || "").split(aO), s = 0, c = this.length; s < c; s++) {
                    var A = this[s];
                    if (A.nodeType === 1) {
                        if (A.className) {
                            for (var L = " " + A.className + " ", J = A.className, G = 0, K = w.length; G < K; G++) {
                                if (L.indexOf(" " + w[G] + " ") < 0) {
                                    J += " " + w[G]
                                }
                            }
                            A.className = C.trim(J)
                        } else {
                            A.className = F
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(A) {
            if (C.isFunction(A)) {
                return this.each(function(L) {
                    var N = C(this);
                    N.removeClass(A.call(this, L, N.attr("class")))
                })
            }
            if (A && typeof A === "string" || A === af) {
                for (var K = (A || "").split(aO), c = 0, s = this.length; c < s; c++) {
                    var F = this[c];
                    if (F.nodeType === 1 && F.className) {
                        if (A) {
                            for (var w = (" " + F.className + " ").replace(aL, " "), G = 0, J = K.length; G < J; G++) {
                                w = w.replace(" " + K[G] + " ", " ")
                            }
                            F.className = C.trim(w)
                        } else {
                            F.className = ""
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(s, c) {
            var A = typeof s,
                w = typeof c === "boolean";
            if (C.isFunction(s)) {
                return this.each(function(G) {
                    var F = C(this);
                    F.toggleClass(s.call(this, G, F.attr("class"), c), c)
                })
            }
            return this.each(function() {
                if (A === "string") {
                    for (var K, G = 0, J = C(this), L = c, F = s.split(aO); K = F[G++];) {
                        L = w ? L : !J.hasClass(K);
                        J[L ? "addClass" : "removeClass"](K)
                    }
                } else {
                    if (A === "undefined" || A === "boolean") {
                        this.className && C.data(this, "__className__", this.className);
                        this.className = this.className || s === false ? "" : C.data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(w) {
            w = " " + w + " ";
            for (var s = 0, c = this.length; s < c; s++) {
                if ((" " + this[s].className + " ").replace(aL, " ").indexOf(w) > -1) {
                    return true
                }
            }
            return false
        },
        val: function(A) {
            if (A === af) {
                var K = this[0];
                if (K) {
                    if (C.nodeName(K, "option")) {
                        return (K.attributes.value || {}).specified ? K.value : K.text
                    }
                    if (C.nodeName(K, "select")) {
                        var c = K.selectedIndex,
                            s = [],
                            F = K.options;
                        K = K.type === "select-one";
                        if (c < 0) {
                            return null
                        }
                        var w = K ? c : 0;
                        for (c = K ? c + 1 : F.length; w < c; w++) {
                            var G = F[w];
                            if (G.selected) {
                                A = C(G).val();
                                if (K) {
                                    return A
                                }
                                s.push(A)
                            }
                        }
                        return s
                    }
                    if (aw.test(K.type) && !C.support.checkOn) {
                        return K.getAttribute("value") === null ? "on" : K.value
                    }
                    return (K.value || "").replace(ar, "")
                }
                return af
            }
            var J = C.isFunction(A);
            return this.each(function(O) {
                var N = C(this),
                    L = A;
                if (this.nodeType === 1) {
                    if (J) {
                        L = A.call(this, O, N.val())
                    }
                    if (typeof L === "number") {
                        L += ""
                    }
                    if (C.isArray(L) && aw.test(this.type)) {
                        this.checked = C.inArray(N.val(), L) >= 0
                    } else {
                        if (C.nodeName(this, "select")) {
                            var P = C.makeArray(L);
                            C("option", this).each(function() {
                                this.selected = C.inArray(C(this).val(), P) >= 0
                            });
                            if (!P.length) {
                                this.selectedIndex = -1
                            }
                        } else {
                            this.value = L
                        }
                    }
                }
            })
        }
    });
    C.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(A, c, F, G) {
            if (!A || A.nodeType === 3 || A.nodeType === 8) {
                return af
            }
            if (G && c in C.attrFn) {
                return C(A)[c](F)
            }
            G = A.nodeType !== 1 || !C.isXMLDoc(A);
            var s = F !== af;
            c = G && C.props[c] || c;
            if (A.nodeType === 1) {
                var w = aZ.test(c);
                if (c in A && G && !w) {
                    if (s) {
                        c === "type" && aj.test(A.nodeName) && A.parentNode && C.error("type property can't be changed");
                        A[c] = F
                    }
                    if (C.nodeName(A, "form") && A.getAttributeNode(c)) {
                        return A.getAttributeNode(c).nodeValue
                    }
                    if (c === "tabIndex") {
                        return (c = A.getAttributeNode("tabIndex")) && c.specified ? c.value : i.test(A.nodeName) || aK.test(A.nodeName) && A.href ? 0 : af
                    }
                    return A[c]
                }
                if (!C.support.style && G && c === "style") {
                    if (s) {
                        A.style.cssText = "" + F
                    }
                    return A.style.cssText
                }
                s && A.setAttribute(c, "" + F);
                A = !C.support.hrefNormalized && G && w ? A.getAttribute(c, 2) : A.getAttribute(c);
                return A === null ? af : A
            }
            return C.style(A, c, F)
        }
    });
    var U = /\.(.*)$/,
        n = function(c) {
            return c.replace(/[^\w\s\.\|`]/g, function(s) {
                return "\\" + s
            })
        };
    C.event = {
        add: function(N, L, F, s) {
            if (!(N.nodeType === 3 || N.nodeType === 8)) {
                if (N.setInterval && N !== a5 && !N.frameElement) {
                    N = a5
                }
                var w, c;
                if (F.handler) {
                    w = F;
                    F = w.handler
                }
                if (!F.guid) {
                    F.guid = C.guid++
                }
                if (c = C.data(N)) {
                    var A = c.events = c.events || {}, J = c.handle;
                    if (!J) {
                        c.handle = J = function() {
                            return typeof C !== "undefined" && !C.event.triggered ? C.event.handle.apply(J.elem, arguments) : af
                        }
                    }
                    J.elem = N;
                    L = L.split(" ");
                    for (var P, Q = 0, G; P = L[Q++];) {
                        c = w ? C.extend({}, w) : {
                            handler: F,
                            data: s
                        };
                        if (P.indexOf(".") > -1) {
                            G = P.split(".");
                            P = G.shift();
                            c.namespace = G.slice(0).sort().join(".")
                        } else {
                            G = [];
                            c.namespace = ""
                        }
                        c.type = P;
                        c.guid = F.guid;
                        var O = A[P],
                            K = C.event.special[P] || {};
                        if (!O) {
                            O = A[P] = [];
                            if (!K.setup || K.setup.call(N, s, G, J) === false) {
                                if (N.addEventListener) {
                                    N.addEventListener(P, J, false)
                                } else {
                                    N.attachEvent && N.attachEvent("on" + P, J)
                                }
                            }
                        }
                        if (K.add) {
                            K.add.call(N, c);
                            if (!c.handler.guid) {
                                c.handler.guid = F.guid
                            }
                        }
                        O.push(c);
                        C.event.global[P] = true
                    }
                    N = null
                }
            }
        },
        global: {},
        remove: function(P, O, L, F) {
            if (!(P.nodeType === 3 || P.nodeType === 8)) {
                var J, s = 0,
                    w, R, A, c, G, Q, N = C.data(P),
                    K = N && N.events;
                if (N && K) {
                    if (O && O.type) {
                        L = O.handler;
                        O = O.type
                    }
                    if (!O || typeof O === "string" && O.charAt(0) === ".") {
                        O = O || "";
                        for (J in K) {
                            C.event.remove(P, J + O)
                        }
                    } else {
                        for (O = O.split(" "); J = O[s++];) {
                            c = J;
                            w = J.indexOf(".") < 0;
                            R = [];
                            if (!w) {
                                R = J.split(".");
                                J = R.shift();
                                A = new RegExp("(^|\\.)" + C.map(R.slice(0).sort(), n).join("\\.(?:.*\\.)?") + "(\\.|$)")
                            }
                            if (G = K[J]) {
                                if (L) {
                                    c = C.event.special[J] || {};
                                    for (T = F || 0; T < G.length; T++) {
                                        Q = G[T];
                                        if (L.guid === Q.guid) {
                                            if (w || A.test(Q.namespace)) {
                                                F == null && G.splice(T--, 1);
                                                c.remove && c.remove.call(P, Q)
                                            }
                                            if (F != null) {
                                                break
                                            }
                                        }
                                    }
                                    if (G.length === 0 || F != null && G.length === 1) {
                                        if (!c.teardown || c.teardown.call(P, R) === false) {
                                            aD(P, J, N.handle)
                                        }
                                        delete K[J]
                                    }
                                } else {
                                    for (var T = 0; T < G.length; T++) {
                                        Q = G[T];
                                        if (w || A.test(Q.namespace)) {
                                            C.event.remove(P, c, Q.handler, T);
                                            G.splice(T--, 1)
                                        }
                                    }
                                }
                            }
                        }
                        if (C.isEmptyObject(K)) {
                            if (O = N.handle) {
                                O.elem = null
                            }
                            delete N.events;
                            delete N.handle;
                            C.isEmptyObject(N) && C.removeData(P)
                        }
                    }
                }
            }
        },
        trigger: function(J, F, w, A) {
            var s = J.type || J;
            if (!A) {
                J = typeof J === "object" ? J[aG] ? J : C.extend(C.Event(s), J) : C.Event(s);
                if (s.indexOf("!") >= 0) {
                    J.type = s = s.slice(0, -1);
                    J.exclusive = true
                }
                if (!w) {
                    J.stopPropagation();
                    C.event.global[s] && C.each(C.cache, function() {
                        this.events && this.events[s] && C.event.trigger(J, F, this.handle.elem)
                    })
                }
                if (!w || w.nodeType === 3 || w.nodeType === 8) {
                    return af
                }
                J.result = af;
                J.target = w;
                F = C.makeArray(F);
                F.unshift(J)
            }
            J.currentTarget = w;
            (A = C.data(w, "handle")) && A.apply(w, F);
            A = w.parentNode || w.ownerDocument;
            try {
                if (!(w && w.nodeName && C.noData[w.nodeName.toLowerCase()])) {
                    if (w["on" + s] && w["on" + s].apply(w, F) === false) {
                        J.result = false
                    }
                }
            } catch (L) {}
            if (!J.isPropagationStopped() && A) {
                C.event.trigger(J, F, A, true)
            } else {
                if (!J.isDefaultPrevented()) {
                    A = J.target;
                    var c, G = C.nodeName(A, "a") && s === "click",
                        N = C.event.special[s] || {};
                    if ((!N._default || N._default.call(w, J) === false) && !G && !(A && A.nodeName && C.noData[A.nodeName.toLowerCase()])) {
                        try {
                            if (A[s]) {
                                if (c = A["on" + s]) {
                                    A["on" + s] = null
                                }
                                C.event.triggered = true;
                                A[s]()
                            }
                        } catch (K) {}
                        if (c) {
                            A["on" + s] = c
                        }
                        C.event.triggered = false
                    }
                }
            }
        },
        handle: function(A) {
            var c, J, s, F;
            A = arguments[0] = C.event.fix(A || a5.event);
            A.currentTarget = this;
            c = A.type.indexOf(".") < 0 && !A.exclusive;
            if (!c) {
                J = A.type.split(".");
                A.type = J.shift();
                s = new RegExp("(^|\\.)" + J.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
            }
            F = C.data(this, "events");
            J = F[A.type];
            if (F && J) {
                J = J.slice(0);
                F = 0;
                for (var w = J.length; F < w; F++) {
                    var G = J[F];
                    if (c || s.test(G.namespace)) {
                        A.handler = G.handler;
                        A.data = G.data;
                        A.handleObj = G;
                        G = G.handler.apply(this, arguments);
                        if (G !== af) {
                            A.result = G;
                            if (G === false) {
                                A.preventDefault();
                                A.stopPropagation()
                            }
                        }
                        if (A.isImmediatePropagationStopped()) {
                            break
                        }
                    }
                }
            }
            return A.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(s) {
            if (s[aG]) {
                return s
            }
            var c = s;
            s = C.Event(c);
            for (var A = this.props.length, w; A;) {
                w = this.props[--A];
                s[w] = c[w]
            }
            if (!s.target) {
                s.target = s.srcElement || ai
            }
            if (s.target.nodeType === 3) {
                s.target = s.target.parentNode
            }
            if (!s.relatedTarget && s.fromElement) {
                s.relatedTarget = s.fromElement === s.target ? s.toElement : s.fromElement
            }
            if (s.pageX == null && s.clientX != null) {
                c = ai.documentElement;
                A = ai.body;
                s.pageX = s.clientX + (c && c.scrollLeft || A && A.scrollLeft || 0) - (c && c.clientLeft || A && A.clientLeft || 0);
                s.pageY = s.clientY + (c && c.scrollTop || A && A.scrollTop || 0) - (c && c.clientTop || A && A.clientTop || 0)
            }
            if (!s.which && (s.charCode || s.charCode === 0 ? s.charCode : s.keyCode)) {
                s.which = s.charCode || s.keyCode
            }
            if (!s.metaKey && s.ctrlKey) {
                s.metaKey = s.ctrlKey
            }
            if (!s.which && s.button !== af) {
                s.which = s.button & 1 ? 1 : s.button & 2 ? 3 : s.button & 4 ? 2 : 0
            }
            return s
        },
        guid: 100000000,
        proxy: C.proxy,
        special: {
            ready: {
                setup: C.bindReady,
                teardown: C.noop
            },
            live: {
                add: function(c) {
                    C.event.add(this, c.origType, C.extend({}, c, {
                        handler: B
                    }))
                },
                remove: function(w) {
                    var s = true,
                        c = w.origType.replace(U, "");
                    C.each(C.data(this, "events").live || [], function() {
                        if (c === this.origType.replace(U, "")) {
                            return s = false
                        }
                    });
                    s && C.event.remove(this, w.origType, B)
                }
            },
            beforeunload: {
                setup: function(w, s, c) {
                    if (this.setInterval) {
                        this.onbeforeunload = c
                    }
                    return false
                },
                teardown: function(s, c) {
                    if (this.onbeforeunload === c) {
                        this.onbeforeunload = null
                    }
                }
            }
        }
    };
    var aD = ai.removeEventListener ? function(w, s, c) {
            w.removeEventListener(s, c, false)
        } : function(w, s, c) {
            w.detachEvent("on" + s, c)
        };
    C.Event = function(c) {
        if (!this.preventDefault) {
            return new C.Event(c)
        }
        if (c && c.type) {
            this.originalEvent = c;
            this.type = c.type
        } else {
            this.type = c
        }
        this.timeStamp = aC();
        this[aG] = true
    };
    C.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = be;
            var c = this.originalEvent;
            if (c) {
                c.preventDefault && c.preventDefault();
                c.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = be;
            var c = this.originalEvent;
            if (c) {
                c.stopPropagation && c.stopPropagation();
                c.cancelBubble = true
            }
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = be;
            this.stopPropagation()
        },
        isDefaultPrevented: bg,
        isPropagationStopped: bg,
        isImmediatePropagationStopped: bg
    };
    var y = function(w) {
        var s = w.relatedTarget;
        try {
            for (; s && s !== this;) {
                s = s.parentNode
            }
            if (s !== this) {
                w.type = w.data;
                C.event.handle.apply(this, arguments)
            }
        } catch (c) {}
    }, D = function(c) {
            c.type = c.data;
            C.event.handle.apply(this, arguments)
        };
    C.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(s, c) {
        C.event.special[s] = {
            setup: function(w) {
                C.event.add(this, c, w && w.selector ? D : y, s)
            },
            teardown: function(w) {
                C.event.remove(this, c, w && w.selector ? D : y)
            }
        }
    });
    if (!C.support.submitBubbles) {
        C.event.special.submit = {
            setup: function() {
                if (this.nodeName.toLowerCase() !== "form") {
                    C.event.add(this, "click.specialSubmit", function(w) {
                        var s = w.target,
                            c = s.type;
                        if ((c === "submit" || c === "image") && C(s).closest("form").length) {
                            return x("submit", this, arguments)
                        }
                    });
                    C.event.add(this, "keypress.specialSubmit", function(w) {
                        var s = w.target,
                            c = s.type;
                        if ((c === "text" || c === "password") && C(s).closest("form").length && w.keyCode === 13) {
                            return x("submit", this, arguments)
                        }
                    })
                } else {
                    return false
                }
            },
            teardown: function() {
                C.event.remove(this, ".specialSubmit")
            }
        }
    }
    if (!C.support.changeBubbles) {
        var o = /textarea|input|select/i,
            aU, aX = function(w) {
                var s = w.type,
                    c = w.value;
                if (s === "radio" || s === "checkbox") {
                    c = w.checked
                } else {
                    if (s === "select-multiple") {
                        c = w.selectedIndex > -1 ? C.map(w.options, function(A) {
                            return A.selected
                        }).join("-") : ""
                    } else {
                        if (w.nodeName.toLowerCase() === "select") {
                            c = w.selectedIndex
                        }
                    }
                }
                return c
            }, aJ = function(A, c) {
                var s = A.target,
                    w, F;
                if (!(!o.test(s.nodeName) || s.readOnly)) {
                    w = C.data(s, "_change_data");
                    F = aX(s);
                    if (A.type !== "focusout" || s.type !== "radio") {
                        C.data(s, "_change_data", F)
                    }
                    if (!(w === af || F === w)) {
                        if (w != null || F) {
                            A.type = "change";
                            return C.event.trigger(A, c, s)
                        }
                    }
                }
            };
        C.event.special.change = {
            filters: {
                focusout: aJ,
                click: function(w) {
                    var s = w.target,
                        c = s.type;
                    if (c === "radio" || c === "checkbox" || s.nodeName.toLowerCase() === "select") {
                        return aJ.call(this, w)
                    }
                },
                keydown: function(w) {
                    var s = w.target,
                        c = s.type;
                    if (w.keyCode === 13 && s.nodeName.toLowerCase() !== "textarea" || w.keyCode === 32 && (c === "checkbox" || c === "radio") || c === "select-multiple") {
                        return aJ.call(this, w)
                    }
                },
                beforeactivate: function(c) {
                    c = c.target;
                    C.data(c, "_change_data", aX(c))
                }
            },
            setup: function() {
                if (this.type === "file") {
                    return false
                }
                for (var c in aU) {
                    C.event.add(this, c + ".specialChange", aU[c])
                }
                return o.test(this.nodeName)
            },
            teardown: function() {
                C.event.remove(this, ".specialChange");
                return o.test(this.nodeName)
            }
        };
        aU = C.event.special.change.filters
    }
    ai.addEventListener && C.each({
        focus: "focusin",
        blur: "focusout"
    }, function(w, s) {
        function c(A) {
            A = C.event.fix(A);
            A.type = s;
            return C.event.handle.call(this, A)
        }
        C.event.special[s] = {
            setup: function() {
                this.addEventListener(w, c, true)
            },
            teardown: function() {
                this.removeEventListener(w, c, true)
            }
        }
    });
    C.each(["bind", "one"], function(s, c) {
        C.fn[c] = function(A, G, K) {
            if (typeof A === "object") {
                for (var F in A) {
                    this[c](F, G, A[F], K)
                }
                return this
            }
            if (C.isFunction(G)) {
                K = G;
                G = af
            }
            var J = c === "one" ? C.proxy(K, function(L) {
                C(this).unbind(L, J);
                return K.apply(this, arguments)
            }) : K;
            if (A === "unload" && c !== "one") {
                this.one(A, G, K)
            } else {
                F = 0;
                for (var w = this.length; F < w; F++) {
                    C.event.add(this[F], A, J, G)
                }
            }
            return this
        }
    });
    C.fn.extend({
        unbind: function(s, c) {
            if (typeof s === "object" && !s.preventDefault) {
                for (var A in s) {
                    this.unbind(A, s[A])
                }
            } else {
                A = 0;
                for (var w = this.length; A < w; A++) {
                    C.event.remove(this[A], s, c)
                }
            }
            return this
        },
        delegate: function(s, c, A, w) {
            return this.live(c, A, w, s)
        },
        undelegate: function(w, s, c) {
            return arguments.length === 0 ? this.unbind("live") : this.die(s, null, c, w)
        },
        trigger: function(s, c) {
            return this.each(function() {
                C.event.trigger(s, c, this)
            })
        },
        triggerHandler: function(s, c) {
            if (this[0]) {
                s = C.Event(s);
                s.preventDefault();
                s.stopPropagation();
                C.event.trigger(s, c, this[0]);
                return s.result
            }
        },
        toggle: function(w) {
            for (var s = arguments, c = 1; c < s.length;) {
                C.proxy(w, s[c++])
            }
            return this.click(C.proxy(w, function(A) {
                var F = (C.data(this, "lastToggle" + w.guid) || 0) % c;
                C.data(this, "lastToggle" + w.guid, F + 1);
                A.preventDefault();
                return s[F].apply(this, arguments) || false
            }))
        },
        hover: function(s, c) {
            return this.mouseenter(s).mouseleave(c || s)
        }
    });
    var aQ = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    C.each(["live", "die"], function(s, c) {
        C.fn[c] = function(L, J, K, A) {
            var G, O = 0,
                P, F, w = A || this.selector,
                N = A ? this : C(this.context);
            if (C.isFunction(J)) {
                K = J;
                J = af
            }
            for (L = (L || "").split(" ");
                (G = L[O++]) != null;) {
                A = U.exec(G);
                P = "";
                if (A) {
                    P = A[0];
                    G = G.replace(U, "")
                }
                if (G === "hover") {
                    L.push("mouseenter" + P, "mouseleave" + P)
                } else {
                    F = G;
                    if (G === "focus" || G === "blur") {
                        L.push(aQ[G] + P);
                        G += P
                    } else {
                        G = (aQ[G] || G) + P
                    }
                    c === "live" ? N.each(function() {
                        C.event.add(this, aN(G, w), {
                            data: J,
                            selector: w,
                            handler: K,
                            origType: G,
                            origHandler: K,
                            preType: F
                        })
                    }) : N.unbind(aN(G, w), K)
                }
            }
            return this
        }
    });
    C.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(s, c) {
        C.fn[c] = function(w) {
            return w ? this.bind(c, w) : this.trigger(c)
        };
        if (C.attrFn) {
            C.attrFn[c] = true
        }
    });
    a5.attachEvent && !a5.addEventListener && a5.attachEvent("onunload", function() {
        for (var s in C.cache) {
            if (C.cache[s].handle) {
                try {
                    C.event.remove(C.cache[s].handle.elem)
                } catch (c) {}
            }
        }
    });
    (function() {
        function W(Y) {
            for (var ab = "", Z, aa = 0; Y[aa]; aa++) {
                Z = Y[aa];
                if (Z.nodeType === 3 || Z.nodeType === 4) {
                    ab += Z.nodeValue
                } else {
                    if (Z.nodeType !== 8) {
                        ab += W(Z.childNodes)
                    }
                }
            }
            return ab
        }

        function V(bl, bb, ba, ab, Z, aa) {
            Z = 0;
            for (var bn = ab.length; Z < bn; Z++) {
                var Y = ab[Z];
                if (Y) {
                    Y = Y[bl];
                    for (var bm = false; Y;) {
                        if (Y.sizcache === ba) {
                            bm = ab[Y.sizset];
                            break
                        }
                        if (Y.nodeType === 1 && !aa) {
                            Y.sizcache = ba;
                            Y.sizset = Z
                        }
                        if (Y.nodeName.toLowerCase() === bb) {
                            bm = Y;
                            break
                        }
                        Y = Y[bl]
                    }
                    ab[Z] = bm
                }
            }
        }

        function T(bl, bb, ba, ab, Z, aa) {
            Z = 0;
            for (var bn = ab.length; Z < bn; Z++) {
                var Y = ab[Z];
                if (Y) {
                    Y = Y[bl];
                    for (var bm = false; Y;) {
                        if (Y.sizcache === ba) {
                            bm = ab[Y.sizset];
                            break
                        }
                        if (Y.nodeType === 1) {
                            if (!aa) {
                                Y.sizcache = ba;
                                Y.sizset = Z
                            }
                            if (typeof bb !== "string") {
                                if (Y === bb) {
                                    bm = true;
                                    break
                                }
                            } else {
                                if (N.filter(bb, [Y]).length > 0) {
                                    bm = Y;
                                    break
                                }
                            }
                        }
                        Y = Y[bl]
                    }
                    ab[Z] = bm
                }
            }
        }
        var Q = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            R = 0,
            O = Object.prototype.toString,
            P = false,
            K = true;
        [0, 0].sort(function() {
                K = false;
                return 0
            });
        var N = function(bn, aa, bq, ba) {
            bq = bq || [];
            var Z = aa = aa || ai;
            if (aa.nodeType !== 1 && aa.nodeType !== 9) {
                return []
            }
            if (!bn || typeof bn !== "string") {
                return bq
            }
            for (var ab = [], bs, bm, bl, bo, bp = true, br = G(aa), bb = bn;
                (Q.exec(""), bs = Q.exec(bb)) !== null;) {
                bb = bs[3];
                ab.push(bs[1]);
                if (bs[2]) {
                    bo = bs[3];
                    break
                }
            }
            if (ab.length > 1 && A.exec(bn)) {
                if (ab.length === 2 && L.relative[ab[0]]) {
                    bm = X(ab[0] + ab[1], aa)
                } else {
                    for (bm = L.relative[ab[0]] ? [aa] : N(ab.shift(), aa); ab.length;) {
                        bn = ab.shift();
                        if (L.relative[bn]) {
                            bn += ab.shift()
                        }
                        bm = X(bn, bm)
                    }
                }
            } else {
                if (!ba && ab.length > 1 && aa.nodeType === 9 && !br && L.match.ID.test(ab[0]) && !L.match.ID.test(ab[ab.length - 1])) {
                    bs = N.find(ab.shift(), aa, br);
                    aa = bs.expr ? N.filter(bs.expr, bs.set)[0] : bs.set[0]
                }
                if (aa) {
                    bs = ba ? {
                        expr: ab.pop(),
                        set: c(ba)
                    } : N.find(ab.pop(), ab.length === 1 && (ab[0] === "~" || ab[0] === "+") && aa.parentNode ? aa.parentNode : aa, br);
                    bm = bs.expr ? N.filter(bs.expr, bs.set) : bs.set;
                    if (ab.length > 0) {
                        bl = c(bm)
                    } else {
                        bp = false
                    }
                    for (; ab.length;) {
                        var Y = ab.pop();
                        bs = Y;
                        if (L.relative[Y]) {
                            bs = ab.pop()
                        } else {
                            Y = ""
                        } if (bs == null) {
                            bs = aa
                        }
                        L.relative[Y](bl, bs, br)
                    }
                } else {
                    bl = []
                }
            }
            bl || (bl = bm);
            bl || N.error(Y || bn);
            if (O.call(bl) === "[object Array]") {
                if (bp) {
                    if (aa && aa.nodeType === 1) {
                        for (bn = 0; bl[bn] != null; bn++) {
                            if (bl[bn] && (bl[bn] === true || bl[bn].nodeType === 1 && w(aa, bl[bn]))) {
                                bq.push(bm[bn])
                            }
                        }
                    } else {
                        for (bn = 0; bl[bn] != null; bn++) {
                            bl[bn] && bl[bn].nodeType === 1 && bq.push(bm[bn])
                        }
                    }
                } else {
                    bq.push.apply(bq, bl)
                }
            } else {
                c(bl, bq)
            } if (bo) {
                N(bo, Z, bq, ba);
                N.uniqueSort(bq)
            }
            return bq
        };
        N.uniqueSort = function(Z) {
            if (J) {
                P = K;
                Z.sort(J);
                if (P) {
                    for (var Y = 1; Y < Z.length; Y++) {
                        Z[Y] === Z[Y - 1] && Z.splice(Y--, 1)
                    }
                }
            }
            return Z
        };
        N.matches = function(Z, Y) {
            return N(Z, null, null, Y)
        };
        N.find = function(bl, bb, ba) {
            var ab, Z;
            if (!bl) {
                return []
            }
            for (var aa = 0, bn = L.order.length; aa < bn; aa++) {
                var Y = L.order[aa];
                if (Z = L.leftMatch[Y].exec(bl)) {
                    var bm = Z[1];
                    Z.splice(1, 1);
                    if (bm.substr(bm.length - 1) !== "\\") {
                        Z[1] = (Z[1] || "").replace(/\\/g, "");
                        ab = L.find[Y](Z, bb, ba);
                        if (ab != null) {
                            bl = bl.replace(L.match[Y], "");
                            break
                        }
                    }
                }
            }
            ab || (ab = bb.getElementsByTagName("*"));
            return {
                set: ab,
                expr: bl
            }
        };
        N.filter = function(bq, bn, bo, ba) {
            for (var Z = bq, bs = [], bu = bn, bm, bb, aa = bn && bn[0] && G(bn[0]); bq && bn.length;) {
                for (var bp in L.filter) {
                    if ((bm = L.leftMatch[bp].exec(bq)) != null && bm[2]) {
                        var bl = L.filter[bp],
                            bt, Y;
                        Y = bm[1];
                        bb = false;
                        bm.splice(1, 1);
                        if (Y.substr(Y.length - 1) !== "\\") {
                            if (bu === bs) {
                                bs = []
                            }
                            if (L.preFilter[bp]) {
                                if (bm = L.preFilter[bp](bm, bu, bo, bs, ba, aa)) {
                                    if (bm === true) {
                                        continue
                                    }
                                } else {
                                    bb = bt = true
                                }
                            }
                            if (bm) {
                                for (var br = 0;
                                    (Y = bu[br]) != null; br++) {
                                    if (Y) {
                                        bt = bl(Y, bm, br, bu);
                                        var ab = ba ^ !! bt;
                                        if (bo && bt != null) {
                                            if (ab) {
                                                bb = true
                                            } else {
                                                bu[br] = false
                                            }
                                        } else {
                                            if (ab) {
                                                bs.push(Y);
                                                bb = true
                                            }
                                        }
                                    }
                                }
                            }
                            if (bt !== af) {
                                bo || (bu = bs);
                                bq = bq.replace(L.match[bp], "");
                                if (!bb) {
                                    return []
                                }
                                break
                            }
                        }
                    }
                }
                if (bq === Z) {
                    if (bb == null) {
                        N.error(bq)
                    } else {
                        break
                    }
                }
                Z = bq
            }
            return bu
        };
        N.error = function(Y) {
            throw "Syntax error, unrecognized expression: " + Y
        };
        var L = N.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(Y) {
                    return Y.getAttribute("href")
                }
            },
            relative: {
                "+": function(Y, ab) {
                    var Z = typeof ab === "string",
                        aa = Z && !/\W/.test(ab);
                    Z = Z && !aa;
                    if (aa) {
                        ab = ab.toLowerCase()
                    }
                    aa = 0;
                    for (var bb = Y.length, ba; aa < bb; aa++) {
                        if (ba = Y[aa]) {
                            for (;
                                (ba = ba.previousSibling) && ba.nodeType !== 1;) {}
                            Y[aa] = Z || ba && ba.nodeName.toLowerCase() === ab ? ba || false : ba === ab
                        }
                    }
                    Z && N.filter(ab, Y, true)
                },
                ">": function(Y, ab) {
                    var Z = typeof ab === "string";
                    if (Z && !/\W/.test(ab)) {
                        ab = ab.toLowerCase();
                        for (var aa = 0, bb = Y.length; aa < bb; aa++) {
                            var ba = Y[aa];
                            if (ba) {
                                Z = ba.parentNode;
                                Y[aa] = Z.nodeName.toLowerCase() === ab ? Z : false
                            }
                        }
                    } else {
                        aa = 0;
                        for (bb = Y.length; aa < bb; aa++) {
                            if (ba = Y[aa]) {
                                Y[aa] = Z ? ba.parentNode : ba.parentNode === ab
                            }
                        }
                        Z && N.filter(ab, Y, true)
                    }
                },
                "": function(Y, ab, Z) {
                    var aa = R++,
                        bb = T;
                    if (typeof ab === "string" && !/\W/.test(ab)) {
                        var ba = ab = ab.toLowerCase();
                        bb = V
                    }
                    bb("parentNode", ab, aa, Y, ba, Z)
                },
                "~": function(Y, ab, Z) {
                    var aa = R++,
                        bb = T;
                    if (typeof ab === "string" && !/\W/.test(ab)) {
                        var ba = ab = ab.toLowerCase();
                        bb = V
                    }
                    bb("previousSibling", ab, aa, Y, ba, Z)
                }
            },
            find: {
                ID: function(Z, aa, Y) {
                    if (typeof aa.getElementById !== "undefined" && !Y) {
                        return (Z = aa.getElementById(Z[1])) ? [Z] : []
                    }
                },
                NAME: function(Y, ba) {
                    if (typeof ba.getElementsByName !== "undefined") {
                        var Z = [];
                        ba = ba.getElementsByName(Y[1]);
                        for (var ab = 0, aa = ba.length; ab < aa; ab++) {
                            ba[ab].getAttribute("name") === Y[1] && Z.push(ba[ab])
                        }
                        return Z.length === 0 ? null : Z
                    }
                },
                TAG: function(Z, Y) {
                    return Y.getElementsByTagName(Z[1])
                }
            },
            preFilter: {
                CLASS: function(ba, Y, ab, aa, bl, bb) {
                    ba = " " + ba[1].replace(/\\/g, "") + " ";
                    if (bb) {
                        return ba
                    }
                    bb = 0;
                    for (var Z;
                        (Z = Y[bb]) != null; bb++) {
                        if (Z) {
                            if (bl ^ (Z.className && (" " + Z.className + " ").replace(/[\t\n]/g, " ").indexOf(ba) >= 0)) {
                                ab || aa.push(Z)
                            } else {
                                if (ab) {
                                    Y[bb] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function(Y) {
                    return Y[1].replace(/\\/g, "")
                },
                TAG: function(Y) {
                    return Y[1].toLowerCase()
                },
                CHILD: function(Z) {
                    if (Z[1] === "nth") {
                        var Y = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(Z[2] === "even" && "2n" || Z[2] === "odd" && "2n+1" || !/\D/.test(Z[2]) && "0n+" + Z[2] || Z[2]);
                        Z[2] = Y[1] + (Y[2] || 1) - 0;
                        Z[3] = Y[3] - 0
                    }
                    Z[0] = R++;
                    return Z
                },
                ATTR: function(Y, ab, Z, aa, bb, ba) {
                    ab = Y[1].replace(/\\/g, "");
                    if (!ba && L.attrMap[ab]) {
                        Y[1] = L.attrMap[ab]
                    }
                    if (Y[2] === "~=") {
                        Y[4] = " " + Y[4] + " "
                    }
                    return Y
                },
                PSEUDO: function(Y, ba, Z, ab, aa) {
                    if (Y[1] === "not") {
                        if ((Q.exec(Y[3]) || "").length > 1 || /^\w/.test(Y[3])) {
                            Y[3] = N(Y[3], null, null, ba)
                        } else {
                            Y = N.filter(Y[3], ba, Z, true ^ aa);
                            Z || ab.push.apply(ab, Y);
                            return false
                        }
                    } else {
                        if (L.match.POS.test(Y[0]) || L.match.CHILD.test(Y[0])) {
                            return true
                        }
                    }
                    return Y
                },
                POS: function(Y) {
                    Y.unshift(true);
                    return Y
                }
            },
            filters: {
                enabled: function(Y) {
                    return Y.disabled === false && Y.type !== "hidden"
                },
                disabled: function(Y) {
                    return Y.disabled === true
                },
                checked: function(Y) {
                    return Y.checked === true
                },
                selected: function(Y) {
                    return Y.selected === true
                },
                parent: function(Y) {
                    return !!Y.firstChild
                },
                empty: function(Y) {
                    return !Y.firstChild
                },
                has: function(Z, aa, Y) {
                    return !!N(Y[3], Z).length
                },
                header: function(Y) {
                    return /h\d/i.test(Y.nodeName)
                },
                text: function(Y) {
                    return "text" === Y.type
                },
                radio: function(Y) {
                    return "radio" === Y.type
                },
                checkbox: function(Y) {
                    return "checkbox" === Y.type
                },
                file: function(Y) {
                    return "file" === Y.type
                },
                password: function(Y) {
                    return "password" === Y.type
                },
                submit: function(Y) {
                    return "submit" === Y.type
                },
                image: function(Y) {
                    return "image" === Y.type
                },
                reset: function(Y) {
                    return "reset" === Y.type
                },
                button: function(Y) {
                    return "button" === Y.type || Y.nodeName.toLowerCase() === "button"
                },
                input: function(Y) {
                    return /input|select|textarea|button/i.test(Y.nodeName)
                }
            },
            setFilters: {
                first: function(Z, Y) {
                    return Y === 0
                },
                last: function(Y, ab, Z, aa) {
                    return ab === aa.length - 1
                },
                even: function(Z, Y) {
                    return Y % 2 === 0
                },
                odd: function(Z, Y) {
                    return Y % 2 === 1
                },
                lt: function(Z, aa, Y) {
                    return aa < Y[3] - 0
                },
                gt: function(Z, aa, Y) {
                    return aa > Y[3] - 0
                },
                nth: function(Z, aa, Y) {
                    return Y[3] - 0 === aa
                },
                eq: function(Z, aa, Y) {
                    return Y[3] - 0 === aa
                }
            },
            filter: {
                PSEUDO: function(Y, ab, Z, aa) {
                    var bb = ab[1],
                        ba = L.filters[bb];
                    if (ba) {
                        return ba(Y, Z, ab, aa)
                    } else {
                        if (bb === "contains") {
                            return (Y.textContent || Y.innerText || W([Y]) || "").indexOf(ab[3]) >= 0
                        } else {
                            if (bb === "not") {
                                ab = ab[3];
                                Z = 0;
                                for (aa = ab.length; Z < aa; Z++) {
                                    if (ab[Z] === Y) {
                                        return false
                                    }
                                }
                                return true
                            } else {
                                N.error("Syntax error, unrecognized expression: " + bb)
                            }
                        }
                    }
                },
                CHILD: function(ba, Y) {
                    var ab = Y[1],
                        aa = ba;
                    switch (ab) {
                        case "only":
                        case "first":
                            for (; aa = aa.previousSibling;) {
                                if (aa.nodeType === 1) {
                                    return false
                                }
                            }
                            if (ab === "first") {
                                return true
                            }
                            aa = ba;
                        case "last":
                            for (; aa = aa.nextSibling;) {
                                if (aa.nodeType === 1) {
                                    return false
                                }
                            }
                            return true;
                        case "nth":
                            ab = Y[2];
                            var bl = Y[3];
                            if (ab === 1 && bl === 0) {
                                return true
                            }
                            Y = Y[0];
                            var bb = ba.parentNode;
                            if (bb && (bb.sizcache !== Y || !ba.nodeIndex)) {
                                var Z = 0;
                                for (aa = bb.firstChild; aa; aa = aa.nextSibling) {
                                    if (aa.nodeType === 1) {
                                        aa.nodeIndex = ++Z
                                    }
                                }
                                bb.sizcache = Y
                            }
                            ba = ba.nodeIndex - bl;
                            return ab === 0 ? ba === 0 : ba % ab === 0 && ba / ab >= 0
                    }
                },
                ID: function(Z, Y) {
                    return Z.nodeType === 1 && Z.getAttribute("id") === Y
                },
                TAG: function(Z, Y) {
                    return Y === "*" && Z.nodeType === 1 || Z.nodeName.toLowerCase() === Y
                },
                CLASS: function(Z, Y) {
                    return (" " + (Z.className || Z.getAttribute("class")) + " ").indexOf(Y) > -1
                },
                ATTR: function(Y, ab) {
                    var Z = ab[1];
                    Y = L.attrHandle[Z] ? L.attrHandle[Z](Y) : Y[Z] != null ? Y[Z] : Y.getAttribute(Z);
                    Z = Y + "";
                    var aa = ab[2];
                    ab = ab[4];
                    return Y == null ? aa === "!=" : aa === "=" ? Z === ab : aa === "*=" ? Z.indexOf(ab) >= 0 : aa === "~=" ? (" " + Z + " ").indexOf(ab) >= 0 : !ab ? Z && Y !== false : aa === "!=" ? Z !== ab : aa === "^=" ? Z.indexOf(ab) === 0 : aa === "$=" ? Z.substr(Z.length - ab.length) === ab : aa === "|=" ? Z === ab || Z.substr(0, ab.length + 1) === ab + "-" : false
                },
                POS: function(Y, ba, Z, ab) {
                    var aa = L.setFilters[ba[2]];
                    if (aa) {
                        return aa(Y, Z, ba, ab)
                    }
                }
            }
        }, A = L.match.POS;
        for (var F in L.match) {
            L.match[F] = new RegExp(L.match[F].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            L.leftMatch[F] = new RegExp(/(^(?:.|\r|\n)*?)/.source + L.match[F].source.replace(/\\(\d+)/g, function(Z, Y) {
                return "\\" + (Y - 0 + 1)
            }))
        }
        var c = function(Z, Y) {
            Z = Array.prototype.slice.call(Z, 0);
            if (Y) {
                Y.push.apply(Y, Z);
                return Y
            }
            return Z
        };
        try {
            Array.prototype.slice.call(ai.documentElement.childNodes, 0)
        } catch (s) {
            c = function(Y, ab) {
                ab = ab || [];
                if (O.call(Y) === "[object Array]") {
                    Array.prototype.push.apply(ab, Y)
                } else {
                    if (typeof Y.length === "number") {
                        for (var Z = 0, aa = Y.length; Z < aa; Z++) {
                            ab.push(Y[Z])
                        }
                    } else {
                        for (Z = 0; Y[Z]; Z++) {
                            ab.push(Y[Z])
                        }
                    }
                }
                return ab
            }
        }
        var J;
        if (ai.documentElement.compareDocumentPosition) {
            J = function(Z, Y) {
                if (!Z.compareDocumentPosition || !Y.compareDocumentPosition) {
                    if (Z == Y) {
                        P = true
                    }
                    return Z.compareDocumentPosition ? -1 : 1
                }
                Z = Z.compareDocumentPosition(Y) & 4 ? -1 : Z === Y ? 0 : 1;
                if (Z === 0) {
                    P = true
                }
                return Z
            }
        } else {
            if ("sourceIndex" in ai.documentElement) {
                J = function(Z, Y) {
                    if (!Z.sourceIndex || !Y.sourceIndex) {
                        if (Z == Y) {
                            P = true
                        }
                        return Z.sourceIndex ? -1 : 1
                    }
                    Z = Z.sourceIndex - Y.sourceIndex;
                    if (Z === 0) {
                        P = true
                    }
                    return Z
                }
            } else {
                if (ai.createRange) {
                    J = function(Y, ab) {
                        if (!Y.ownerDocument || !ab.ownerDocument) {
                            if (Y == ab) {
                                P = true
                            }
                            return Y.ownerDocument ? -1 : 1
                        }
                        var Z = Y.ownerDocument.createRange(),
                            aa = ab.ownerDocument.createRange();
                        Z.setStart(Y, 0);
                        Z.setEnd(Y, 0);
                        aa.setStart(ab, 0);
                        aa.setEnd(ab, 0);
                        Y = Z.compareBoundaryPoints(Range.START_TO_END, aa);
                        if (Y === 0) {
                            P = true
                        }
                        return Y
                    }
                }
            }
        }(function() {
            var Z = ai.createElement("div"),
                aa = "script" + (new Date).getTime();
            Z.innerHTML = "<a name='" + aa + "'/>";
            var Y = ai.documentElement;
            Y.insertBefore(Z, Y.firstChild);
            if (ai.getElementById(aa)) {
                L.find.ID = function(ab, bb, ba) {
                    if (typeof bb.getElementById !== "undefined" && !ba) {
                        return (bb = bb.getElementById(ab[1])) ? bb.id === ab[1] || typeof bb.getAttributeNode !== "undefined" && bb.getAttributeNode("id").nodeValue === ab[1] ? [bb] : af : []
                    }
                };
                L.filter.ID = function(ab, bb) {
                    var ba = typeof ab.getAttributeNode !== "undefined" && ab.getAttributeNode("id");
                    return ab.nodeType === 1 && ba && ba.nodeValue === bb
                }
            }
            Y.removeChild(Z);
            Y = Z = null
        })();
        (function() {
            var Y = ai.createElement("div");
            Y.appendChild(ai.createComment(""));
            if (Y.getElementsByTagName("*").length > 0) {
                L.find.TAG = function(ab, aa) {
                    aa = aa.getElementsByTagName(ab[1]);
                    if (ab[1] === "*") {
                        ab = [];
                        for (var Z = 0; aa[Z]; Z++) {
                            aa[Z].nodeType === 1 && ab.push(aa[Z])
                        }
                        aa = ab
                    }
                    return aa
                }
            }
            Y.innerHTML = "<a href='#'></a>";
            if (Y.firstChild && typeof Y.firstChild.getAttribute !== "undefined" && Y.firstChild.getAttribute("href") !== "#") {
                L.attrHandle.href = function(Z) {
                    return Z.getAttribute("href", 2)
                }
            }
            Y = null
        })();
        ai.querySelectorAll && function() {
            var Z = N,
                aa = ai.createElement("div");
            aa.innerHTML = "<p class='TEST'></p>";
            if (!(aa.querySelectorAll && aa.querySelectorAll(".TEST").length === 0)) {
                N = function(bm, bl, ab, bb) {
                    bl = bl || ai;
                    if (!bb && bl.nodeType === 9 && !G(bl)) {
                        try {
                            return c(bl.querySelectorAll(bm), ab)
                        } catch (ba) {}
                    }
                    return Z(bm, bl, ab, bb)
                };
                for (var Y in Z) {
                    N[Y] = Z[Y]
                }
                aa = null
            }
        }();
        (function() {
            var Y = ai.createElement("div");
            Y.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!Y.getElementsByClassName || Y.getElementsByClassName("e").length === 0)) {
                Y.lastChild.className = "e";
                if (Y.getElementsByClassName("e").length !== 1) {
                    L.order.splice(1, 0, "CLASS");
                    L.find.CLASS = function(ab, aa, Z) {
                        if (typeof aa.getElementsByClassName !== "undefined" && !Z) {
                            return aa.getElementsByClassName(ab[1])
                        }
                    };
                    Y = null
                }
            }
        })();
        var w = ai.compareDocumentPosition ? function(Z, Y) {
                return !!(Z.compareDocumentPosition(Y) & 16)
            } : function(Z, Y) {
                return Z !== Y && (Z.contains ? Z.contains(Y) : true)
            }, G = function(Y) {
                return (Y = (Y ? Y.ownerDocument || Y : 0).documentElement) ? Y.nodeName !== "HTML" : false
            }, X = function(Y, ab) {
                var Z = [],
                    aa = "",
                    bb;
                for (ab = ab.nodeType ? [ab] : ab; bb = L.match.PSEUDO.exec(Y);) {
                    aa += bb[0];
                    Y = Y.replace(L.match.PSEUDO, "")
                }
                Y = L.relative[Y] ? Y + "*" : Y;
                bb = 0;
                for (var ba = ab.length; bb < ba; bb++) {
                    N(Y, ab[bb], Z)
                }
                return N.filter(aa, Z)
            };
        C.find = N;
        C.expr = N.selectors;
        C.expr[":"] = C.expr.filters;
        C.unique = N.uniqueSort;
        C.text = W;
        C.isXMLDoc = G;
        C.contains = w
    })();
    var aT = /Until$/,
        at = /^(?:parents|prevUntil|prevAll)/,
        al = /,/;
    b = Array.prototype.slice;
    var aY = function(s, c, A) {
        if (C.isFunction(c)) {
            return C.grep(s, function(G, F) {
                return !!c.call(G, F, G) === A
            })
        } else {
            if (c.nodeType) {
                return C.grep(s, function(F) {
                    return F === c === A
                })
            } else {
                if (typeof c === "string") {
                    var w = C.grep(s, function(F) {
                        return F.nodeType === 1
                    });
                    if (ah.test(c)) {
                        return C.filter(c, w, !A)
                    } else {
                        c = C.filter(c, w)
                    }
                }
            }
        }
        return C.grep(s, function(F) {
            return C.inArray(F, c) >= 0 === A
        })
    };
    C.fn.extend({
        find: function(A) {
            for (var c = this.pushStack("", "find", A), J = 0, s = 0, F = this.length; s < F; s++) {
                J = c.length;
                C.find(A, this[s], c);
                if (s > 0) {
                    for (var w = J; w < c.length; w++) {
                        for (var G = 0; G < J; G++) {
                            if (c[G] === c[w]) {
                                c.splice(w--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return c
        },
        has: function(s) {
            var c = C(s);
            return this.filter(function() {
                for (var A = 0, w = c.length; A < w; A++) {
                    if (C.contains(this, c[A])) {
                        return true
                    }
                }
            })
        },
        not: function(c) {
            return this.pushStack(aY(this, c, false), "not", c)
        },
        filter: function(c) {
            return this.pushStack(aY(this, c, true), "filter", c)
        },
        is: function(c) {
            return !!c && C.filter(c, this).length > 0
        },
        closest: function(F, w) {
            if (C.isArray(F)) {
                var s = [],
                    c = this[0],
                    A, L = {}, J;
                if (c && F.length) {
                    A = 0;
                    for (var G = F.length; A < G; A++) {
                        J = F[A];
                        L[J] || (L[J] = C.expr.match.POS.test(J) ? C(J, w || this.context) : J)
                    }
                    for (; c && c.ownerDocument && c !== w;) {
                        for (J in L) {
                            A = L[J];
                            if (A.jquery ? A.index(c) > -1 : C(c).is(A)) {
                                s.push({
                                    selector: J,
                                    elem: c
                                });
                                delete L[J]
                            }
                        }
                        c = c.parentNode
                    }
                }
                return s
            }
            var K = C.expr.match.POS.test(F) ? C(F, w || this.context) : null;
            return this.map(function(O, N) {
                for (; N && N.ownerDocument && N !== w;) {
                    if (K ? K.index(N) > -1 : C(N).is(F)) {
                        return N
                    }
                    N = N.parentNode
                }
                return null
            })
        },
        index: function(c) {
            if (!c || typeof c === "string") {
                return C.inArray(this[0], c ? C(c) : this.parent().children())
            }
            return C.inArray(c.jquery ? c[0] : c, this)
        },
        add: function(s, c) {
            s = typeof s === "string" ? C(s, c || this.context) : C.makeArray(s);
            c = C.merge(this.get(), s);
            return this.pushStack(a1(s[0]) || a1(c[0]) ? c : C.unique(c))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });
    C.each({
        parent: function(c) {
            return (c = c.parentNode) && c.nodeType !== 11 ? c : null
        },
        parents: function(c) {
            return C.dir(c, "parentNode")
        },
        parentsUntil: function(w, s, c) {
            return C.dir(w, "parentNode", c)
        },
        next: function(c) {
            return C.nth(c, 2, "nextSibling")
        },
        prev: function(c) {
            return C.nth(c, 2, "previousSibling")
        },
        nextAll: function(c) {
            return C.dir(c, "nextSibling")
        },
        prevAll: function(c) {
            return C.dir(c, "previousSibling")
        },
        nextUntil: function(w, s, c) {
            return C.dir(w, "nextSibling", c)
        },
        prevUntil: function(w, s, c) {
            return C.dir(w, "previousSibling", c)
        },
        siblings: function(c) {
            return C.sibling(c.parentNode.firstChild, c)
        },
        children: function(c) {
            return C.sibling(c.firstChild)
        },
        contents: function(c) {
            return C.nodeName(c, "iframe") ? c.contentDocument || c.contentWindow.document : C.makeArray(c.childNodes)
        }
    }, function(s, c) {
        C.fn[s] = function(A, F) {
            var w = C.map(this, c, A);
            aT.test(s) || (F = A);
            if (F && typeof F === "string") {
                w = C.filter(F, w)
            }
            w = this.length > 1 ? C.unique(w) : w;
            if ((this.length > 1 || al.test(F)) && at.test(s)) {
                w = w.reverse()
            }
            return this.pushStack(w, s, b.call(arguments).join(","))
        }
    });
    C.extend({
        filter: function(w, s, c) {
            if (c) {
                w = ":not(" + w + ")"
            }
            return C.find.matches(w, s)
        },
        dir: function(s, c, A) {
            var w = [];
            for (s = s[c]; s && s.nodeType !== 9 && (A === af || s.nodeType !== 1 || !C(s).is(A));) {
                s.nodeType === 1 && w.push(s);
                s = s[c]
            }
            return w
        },
        nth: function(s, c, A) {
            c = c || 1;
            for (var w = 0; s; s = s[A]) {
                if (s.nodeType === 1 && ++w === c) {
                    break
                }
            }
            return s
        },
        sibling: function(w, s) {
            for (var c = []; w; w = w.nextSibling) {
                w.nodeType === 1 && w !== s && c.push(w)
            }
            return c
        }
    });
    var E = / jQuery\d+="(?:\d+|null)"/g,
        bj = /^\s+/,
        bk = /(<([\w:]+)[^>]*?)\/>/g,
        az = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
        a3 = /<([\w:]+)/,
        t = /<tbody/i,
        r = /<|&#?\w+;/,
        k = /<script|<object|<embed|<option|<style/i,
        bc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        a8 = function(w, s, c) {
            return az.test(c) ? w : s + "></" + c + ">"
        }, q = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    q.optgroup = q.option;
    q.tbody = q.tfoot = q.colgroup = q.caption = q.thead;
    q.th = q.td;
    if (!C.support.htmlSerialize) {
        q._default = [1, "div<div>", "</div>"]
    }
    C.fn.extend({
        text: function(c) {
            if (C.isFunction(c)) {
                return this.each(function(s) {
                    var w = C(this);
                    w.text(c.call(this, s, w.text()))
                })
            }
            if (typeof c !== "object" && c !== af) {
                return this.empty().append((this[0] && this[0].ownerDocument || ai).createTextNode(c))
            }
            return C.text(this)
        },
        wrapAll: function(s) {
            if (C.isFunction(s)) {
                return this.each(function(w) {
                    C(this).wrapAll(s.call(this, w))
                })
            }
            if (this[0]) {
                var c = C(s, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && c.insertBefore(this[0]);
                c.map(function() {
                    for (var w = this; w.firstChild && w.firstChild.nodeType === 1;) {
                        w = w.firstChild
                    }
                    return w
                }).append(this)
            }
            return this
        },
        wrapInner: function(c) {
            if (C.isFunction(c)) {
                return this.each(function(s) {
                    C(this).wrapInner(c.call(this, s))
                })
            }
            return this.each(function() {
                var s = C(this),
                    w = s.contents();
                w.length ? w.wrapAll(c) : s.append(c)
            })
        },
        wrap: function(c) {
            return this.each(function() {
                C(this).wrapAll(c)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                C.nodeName(this, "body") || C(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(c) {
                this.nodeType === 1 && this.appendChild(c)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(c) {
                this.nodeType === 1 && this.insertBefore(c, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(s) {
                    this.parentNode.insertBefore(s, this)
                })
            } else {
                if (arguments.length) {
                    var c = C(arguments[0]);
                    c.push.apply(c, this.toArray());
                    return this.pushStack(c, "before", arguments)
                }
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(s) {
                    this.parentNode.insertBefore(s, this.nextSibling)
                })
            } else {
                if (arguments.length) {
                    var c = this.pushStack(this, "after", arguments);
                    c.push.apply(c, C(arguments[0]).toArray());
                    return c
                }
            }
        },
        remove: function(s, c) {
            for (var A = 0, w;
                (w = this[A]) != null; A++) {
                if (!s || C.filter(s, [w]).length) {
                    if (!c && w.nodeType === 1) {
                        C.cleanData(w.getElementsByTagName("*"));
                        C.cleanData([w])
                    }
                    w.parentNode && w.parentNode.removeChild(w)
                }
            }
            return this
        },
        empty: function() {
            for (var s = 0, c;
                (c = this[s]) != null; s++) {
                for (c.nodeType === 1 && C.cleanData(c.getElementsByTagName("*")); c.firstChild;) {
                    c.removeChild(c.firstChild)
                }
            }
            return this
        },
        clone: function(s) {
            var c = this.map(function() {
                if (!C.support.noCloneEvent && !C.isXMLDoc(this)) {
                    var A = this.outerHTML,
                        w = this.ownerDocument;
                    if (!A) {
                        A = w.createElement("div");
                        A.appendChild(this.cloneNode(true));
                        A = A.innerHTML
                    }
                    return C.clean([A.replace(E, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(bj, "")], w)[0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (s === true) {
                aS(this, c);
                aS(this.find("*"), c.find("*"))
            }
            return c
        },
        html: function(s) {
            if (s === af) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(E, "") : null
            } else {
                if (typeof s === "string" && !k.test(s) && (C.support.leadingWhitespace || !bj.test(s)) && !q[(a3.exec(s) || ["", ""])[1].toLowerCase()]) {
                    s = s.replace(bk, a8);
                    try {
                        for (var c = 0, A = this.length; c < A; c++) {
                            if (this[c].nodeType === 1) {
                                C.cleanData(this[c].getElementsByTagName("*"));
                                this[c].innerHTML = s
                            }
                        }
                    } catch (w) {
                        this.empty().append(s)
                    }
                } else {
                    C.isFunction(s) ? this.each(function(J) {
                        var F = C(this),
                            G = F.html();
                        F.empty().append(function() {
                            return s.call(this, J, G)
                        })
                    }) : this.empty().append(s)
                }
            }
            return this
        },
        replaceWith: function(c) {
            if (this[0] && this[0].parentNode) {
                if (C.isFunction(c)) {
                    return this.each(function(A) {
                        var w = C(this),
                            s = w.html();
                        w.replaceWith(c.call(this, A, s))
                    })
                }
                if (typeof c !== "string") {
                    c = C(c).detach()
                }
                return this.each(function() {
                    var s = this.nextSibling,
                        w = this.parentNode;
                    C(this).remove();
                    s ? C(s).before(c) : C(w).append(c)
                })
            } else {
                return this.pushStack(C(C.isFunction(c) ? c() : c), "replaceWith", c)
            }
        },
        detach: function(c) {
            return this.remove(c, true)
        },
        domManip: function(L, J, F) {
            function s(P) {
                return C.nodeName(P, "table") ? P.getElementsByTagName("tbody")[0] || P.appendChild(P.ownerDocument.createElement("tbody")) : P
            }
            var w, c, A = L[0],
                K = [],
                N;
            if (!C.support.checkClone && arguments.length === 3 && typeof A === "string" && bc.test(A)) {
                return this.each(function() {
                    C(this).domManip(L, J, F, true)
                })
            }
            if (C.isFunction(A)) {
                return this.each(function(P) {
                    var Q = C(this);
                    L[0] = A.call(this, P, J ? Q.html() : af);
                    Q.domManip(L, J, F)
                })
            }
            if (this[0]) {
                w = A && A.parentNode;
                w = C.support.parentNode && w && w.nodeType === 11 && w.childNodes.length === this.length ? {
                    fragment: w
                } : a7(L, this, K);
                N = w.fragment;
                if (c = N.childNodes.length === 1 ? (N = N.firstChild) : N.firstChild) {
                    J = J && C.nodeName(c, "tr");
                    for (var O = 0, G = this.length; O < G; O++) {
                        F.call(J ? s(this[O], c) : this[O], O > 0 || w.cacheable || this.length > 1 ? N.cloneNode(true) : N)
                    }
                }
                K.length && C.each(K, g)
            }
            return this
        }
    });
    C.fragments = {};
    C.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(s, c) {
        C.fn[s] = function(w) {
            var G = [];
            w = C(w);
            var J = this.length === 1 && this[0].parentNode;
            if (J && J.nodeType === 11 && J.childNodes.length === 1 && w.length === 1) {
                w[c](this[0]);
                return this
            } else {
                J = 0;
                for (var A = w.length; J < A; J++) {
                    var F = (J > 0 ? this.clone(true) : this).get();
                    C.fn[c].apply(C(w[J]), F);
                    G = G.concat(F)
                }
                return this.pushStack(G, s, w.selector)
            }
        }
    });
    C.extend({
        clean: function(L, J, F, s) {
            J = J || ai;
            if (typeof J.createElement === "undefined") {
                J = J.ownerDocument || J[0] && J[0].ownerDocument || ai
            }
            for (var w = [], c = 0, A;
                (A = L[c]) != null; c++) {
                if (typeof A === "number") {
                    A += ""
                }
                if (A) {
                    if (typeof A === "string" && !r.test(A)) {
                        A = J.createTextNode(A)
                    } else {
                        if (typeof A === "string") {
                            A = A.replace(bk, a8);
                            var K = (a3.exec(A) || ["", ""])[1].toLowerCase(),
                                N = q[K] || q._default,
                                O = N[0],
                                G = J.createElement("div");
                            for (G.innerHTML = N[1] + A + N[2]; O--;) {
                                G = G.lastChild
                            }
                            if (!C.support.tbody) {
                                O = t.test(A);
                                K = K === "table" && !O ? G.firstChild && G.firstChild.childNodes : N[1] === "<table>" && !O ? G.childNodes : [];
                                for (N = K.length - 1; N >= 0; --N) {
                                    C.nodeName(K[N], "tbody") && !K[N].childNodes.length && K[N].parentNode.removeChild(K[N])
                                }
                            }!C.support.leadingWhitespace && bj.test(A) && G.insertBefore(J.createTextNode(bj.exec(A)[0]), G.firstChild);
                            A = G.childNodes
                        }
                    } if (A.nodeType) {
                        w.push(A)
                    } else {
                        w = C.merge(w, A)
                    }
                }
            }
            if (F) {
                for (c = 0; w[c]; c++) {
                    if (s && C.nodeName(w[c], "script") && (!w[c].type || w[c].type.toLowerCase() === "text/javascript")) {
                        s.push(w[c].parentNode ? w[c].parentNode.removeChild(w[c]) : w[c])
                    } else {
                        w[c].nodeType === 1 && w.splice.apply(w, [c + 1, 0].concat(C.makeArray(w[c].getElementsByTagName("script"))));
                        F.appendChild(w[c])
                    }
                }
            }
            return w
        },
        cleanData: function(F) {
            for (var w, s, c = C.cache, A = C.event.special, L = C.support.deleteExpando, J = 0, G;
                (G = F[J]) != null; J++) {
                if (s = G[C.expando]) {
                    w = c[s];
                    if (w.events) {
                        for (var K in w.events) {
                            A[K] ? C.event.remove(G, K) : aD(G, K, w.handle)
                        }
                    }
                    if (L) {
                        delete G[C.expando]
                    } else {
                        G.removeAttribute && G.removeAttribute(C.expando)
                    }
                    delete c[s]
                }
            }
        }
    });
    var aV = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        an = /alpha\([^)]*\)/,
        ad = /opacity=([^)]*)/,
        aA = /float/i,
        v = /-([a-z])/ig,
        aM = /([A-Z])/g,
        p = /^-?\d+(?:px)?$/i,
        aH = /^-?\d/,
        z = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, aB = ["Left", "Right"],
        a0 = ["Top", "Bottom"],
        aR = ai.defaultView && ai.defaultView.getComputedStyle,
        bd = C.support.cssFloat ? "cssFloat" : "styleFloat",
        u = function(s, c) {
            return c.toUpperCase()
        };
    C.fn.css = function(s, c) {
        return bh(this, s, c, true, function(A, F, w) {
            if (w === af) {
                return C.curCSS(A, F)
            }
            if (typeof w === "number" && !aV.test(F)) {
                w += "px"
            }
            C.style(A, F, w)
        })
    };
    C.extend({
        style: function(A, c, s) {
            if (!A || A.nodeType === 3 || A.nodeType === 8) {
                return af
            }
            if ((c === "width" || c === "height") && parseFloat(s) < 0) {
                s = af
            }
            var w = A.style || A,
                F = s !== af;
            if (!C.support.opacity && c === "opacity") {
                if (F) {
                    w.zoom = 1;
                    c = parseInt(s, 10) + "" === "NaN" ? "" : "alpha(opacity=" + s * 100 + ")";
                    A = w.filter || C.curCSS(A, "filter") || "";
                    w.filter = an.test(A) ? A.replace(an, c) : c
                }
                return w.filter && w.filter.indexOf("opacity=") >= 0 ? parseFloat(ad.exec(w.filter)[1]) / 100 + "" : ""
            }
            if (aA.test(c)) {
                c = bd
            }
            c = c.replace(v, u);
            if (F) {
                w[c] = s
            }
            return w[c]
        },
        css: function(A, c, J, s) {
            if (c === "width" || c === "height") {
                var F, w = c === "width" ? aB : a0;

                function G() {
                    F = c === "width" ? A.offsetWidth : A.offsetHeight;
                    s !== "border" && C.each(w, function() {
                        s || (F -= parseFloat(C.curCSS(A, "padding" + this, true)) || 0);
                        if (s === "margin") {
                            F += parseFloat(C.curCSS(A, "margin" + this, true)) || 0
                        } else {
                            F -= parseFloat(C.curCSS(A, "border" + this + "Width", true)) || 0
                        }
                    })
                }
                A.offsetWidth !== 0 ? G() : C.swap(A, z, G);
                return Math.max(0, Math.round(F))
            }
            return C.curCSS(A, c, J)
        },
        curCSS: function(A, c, F) {
            var G, s = A.style;
            if (!C.support.opacity && c === "opacity" && A.currentStyle) {
                G = ad.test(A.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
                return G === "" ? "1" : G
            }
            if (aA.test(c)) {
                c = bd
            }
            if (!F && s && s[c]) {
                G = s[c]
            } else {
                if (aR) {
                    if (aA.test(c)) {
                        c = "float"
                    }
                    c = c.replace(aM, "-$1").toLowerCase();
                    s = A.ownerDocument.defaultView;
                    if (!s) {
                        return null
                    }
                    if (A = s.getComputedStyle(A, null)) {
                        G = A.getPropertyValue(c)
                    }
                    if (c === "opacity" && G === "") {
                        G = "1"
                    }
                } else {
                    if (A.currentStyle) {
                        F = c.replace(v, u);
                        G = A.currentStyle[c] || A.currentStyle[F];
                        if (!p.test(G) && aH.test(G)) {
                            c = s.left;
                            var w = A.runtimeStyle.left;
                            A.runtimeStyle.left = A.currentStyle.left;
                            s.left = F === "fontSize" ? "1em" : G || 0;
                            G = s.pixelLeft + "px";
                            s.left = c;
                            A.runtimeStyle.left = w
                        }
                    }
                }
            }
            return G
        },
        swap: function(A, c, s) {
            var w = {};
            for (var F in c) {
                w[F] = A.style[F];
                A.style[F] = c[F]
            }
            s.call(A);
            for (F in c) {
                A.style[F] = w[F]
            }
        }
    });
    if (C.expr && C.expr.filters) {
        C.expr.filters.hidden = function(s) {
            var c = s.offsetWidth,
                A = s.offsetHeight,
                w = s.nodeName.toLowerCase() === "tr";
            return c === 0 && A === 0 && !w ? true : c > 0 && A > 0 && !w ? false : C.curCSS(s, "display") === "none"
        };
        C.expr.filters.visible = function(c) {
            return !C.expr.filters.hidden(c)
        }
    }
    var a4 = aC(),
        a2 = /<script(.|\s)*?\/script>/gi,
        a9 = /select|textarea/i,
        ac = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
        au = /=\?(&|$)/,
        aW = /\?/,
        a6 = /(\?|&)_=.*?(&|$)/,
        I = /^(\w+:)?\/\/([^\/?#]+)/,
        ao = /%20/g,
        ae = C.fn.load;
    C.fn.extend({
        load: function(A, c, F) {
            if (typeof A !== "string") {
                return ae.call(this, A)
            } else {
                if (!this.length) {
                    return this
                }
            }
            var G = A.indexOf(" ");
            if (G >= 0) {
                var s = A.slice(G, A.length);
                A = A.slice(0, G)
            }
            G = "GET";
            if (c) {
                if (C.isFunction(c)) {
                    F = c;
                    c = null
                } else {
                    if (typeof c === "object") {
                        c = C.param(c, C.ajaxSettings.traditional);
                        G = "POST"
                    }
                }
            }
            var w = this;
            C.ajax({
                url: A,
                type: G,
                dataType: "html",
                data: c,
                complete: function(J, K) {
                    if (K === "success" || K === "notmodified") {
                        w.html(s ? C("<div />").append(J.responseText.replace(a2, "")).find(s) : J.responseText)
                    }
                    F && w.each(F, [J.responseText, K, J])
                }
            });
            return this
        },
        serialize: function() {
            return C.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? C.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || a9.test(this.nodeName) || ac.test(this.type))
            }).map(function(s, c) {
                s = C(this).val();
                return s == null ? null : C.isArray(s) ? C.map(s, function(w) {
                    return {
                        name: c.name,
                        value: w
                    }
                }) : {
                    name: c.name,
                    value: s
                }
            }).get()
        }
    });
    C.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(s, c) {
        C.fn[c] = function(w) {
            return this.bind(c, w)
        }
    });
    C.extend({
        get: function(s, c, A, w) {
            if (C.isFunction(c)) {
                w = w || A;
                A = c;
                c = null
            }
            return C.ajax({
                type: "GET",
                url: s,
                data: c,
                success: A,
                dataType: w
            })
        },
        getScript: function(s, c) {
            return C.get(s, null, c, "script")
        },
        getJSON: function(w, s, c) {
            return C.get(w, s, c, "json")
        },
        post: function(s, c, A, w) {
            if (C.isFunction(c)) {
                w = w || A;
                A = c;
                c = {}
            }
            return C.ajax({
                type: "POST",
                url: s,
                data: c,
                success: A,
                dataType: w
            })
        },
        ajaxSetup: function(c) {
            C.extend(C.ajaxSettings, c)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: a5.XMLHttpRequest && (a5.location.protocol !== "file:" || !a5.ActiveXObject) ? function() {
                return new a5.XMLHttpRequest
            } : function() {
                try {
                    return new a5.ActiveXObject("Microsoft.XMLHTTP")
                } catch (c) {}
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function(w) {
            function s() {
                ab.success && ab.success.call(V, P, X, G);
                ab.global && aa("ajaxSuccess", [G, ab])
            }

            function c() {
                ab.complete && ab.complete.call(V, G, X);
                ab.global && aa("ajaxComplete", [G, ab]);
                ab.global && !--C.active && C.event.trigger("ajaxStop")
            }

            function aa(ba, bb) {
                (ab.context ? C(ab.context) : C.event).trigger(ba, bb)
            }
            var ab = C.extend(true, {}, C.ajaxSettings, w),
                W, X, P, V = w && w.context || ab,
                Q = ab.type.toUpperCase();
            if (ab.data && ab.processData && typeof ab.data !== "string") {
                ab.data = C.param(ab.data, ab.traditional)
            }
            if (ab.dataType === "jsonp") {
                if (Q === "GET") {
                    au.test(ab.url) || (ab.url += (aW.test(ab.url) ? "&" : "?") + (ab.jsonp || "callback") + "=?")
                } else {
                    if (!ab.data || !au.test(ab.data)) {
                        ab.data = (ab.data ? ab.data + "&" : "") + (ab.jsonp || "callback") + "=?"
                    }
                }
                ab.dataType = "json"
            }
            if (ab.dataType === "json" && (ab.data && au.test(ab.data) || au.test(ab.url))) {
                W = ab.jsonpCallback || "jsonp" + a4++;
                if (ab.data) {
                    ab.data = (ab.data + "").replace(au, "=" + W + "$1")
                }
                ab.url = ab.url.replace(au, "=" + W + "$1");
                ab.dataType = "script";
                a5[W] = a5[W] || function(ba) {
                    P = ba;
                    s();
                    c();
                    a5[W] = af;
                    try {
                        delete a5[W]
                    } catch (bb) {}
                    K && K.removeChild(J)
                }
            }
            if (ab.dataType === "script" && ab.cache === null) {
                ab.cache = false
            }
            if (ab.cache === false && Q === "GET") {
                var L = aC(),
                    N = ab.url.replace(a6, "$1_=" + L + "$2");
                ab.url = N + (N === ab.url ? (aW.test(ab.url) ? "&" : "?") + "_=" + L : "")
            }
            if (ab.data && Q === "GET") {
                ab.url += (aW.test(ab.url) ? "&" : "?") + ab.data
            }
            ab.global && !C.active++ && C.event.trigger("ajaxStart");
            L = (L = I.exec(ab.url)) && (L[1] && L[1] !== location.protocol || L[2] !== location.host);
            if (ab.dataType === "script" && Q === "GET" && L) {
                var K = ai.getElementsByTagName("head")[0] || ai.documentElement,
                    J = ai.createElement("script");
                J.src = ab.url;
                if (ab.scriptCharset) {
                    J.charset = ab.scriptCharset
                }
                if (!W) {
                    var O = false;
                    J.onload = J.onreadystatechange = function() {
                        if (!O && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            O = true;
                            s();
                            c();
                            J.onload = J.onreadystatechange = null;
                            K && J.parentNode && K.removeChild(J)
                        }
                    }
                }
                K.insertBefore(J, K.firstChild);
                return af
            }
            var A = false,
                G = ab.xhr();
            if (G) {
                ab.username ? G.open(Q, ab.url, ab.async, ab.username, ab.password) : G.open(Q, ab.url, ab.async);
                try {
                    if (ab.data || w && w.contentType) {
                        G.setRequestHeader("Content-Type", ab.contentType)
                    }
                    if (ab.ifModified) {
                        C.lastModified[ab.url] && G.setRequestHeader("If-Modified-Since", C.lastModified[ab.url]);
                        C.etag[ab.url] && G.setRequestHeader("If-None-Match", C.etag[ab.url])
                    }
                    L || G.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    G.setRequestHeader("Accept", ab.dataType && ab.accepts[ab.dataType] ? ab.accepts[ab.dataType] + ", */*" : ab.accepts._default)
                } catch (F) {}
                if (ab.beforeSend && ab.beforeSend.call(V, G, ab) === false) {
                    ab.global && !--C.active && C.event.trigger("ajaxStop");
                    G.abort();
                    return false
                }
                ab.global && aa("ajaxSend", [G, ab]);
                var Z = G.onreadystatechange = function(bb) {
                    if (!G || G.readyState === 0 || bb === "abort") {
                        A || c();
                        A = true;
                        if (G) {
                            G.onreadystatechange = C.noop
                        }
                    } else {
                        if (!A && G && (G.readyState === 4 || bb === "timeout")) {
                            A = true;
                            G.onreadystatechange = C.noop;
                            X = bb === "timeout" ? "timeout" : !C.httpSuccess(G) ? "error" : ab.ifModified && C.httpNotModified(G, ab.url) ? "notmodified" : "success";
                            var ba;
                            if (X === "success") {
                                try {
                                    P = C.httpData(G, ab.dataType, ab)
                                } catch (bl) {
                                    X = "parsererror";
                                    ba = bl
                                }
                            }
                            if (X === "success" || X === "notmodified") {
                                W || s()
                            } else {
                                C.handleError(ab, G, X, ba)
                            }
                            c();
                            bb === "timeout" && G.abort();
                            if (ab.async) {
                                G = null
                            }
                        }
                    }
                };
                try {
                    var Y = G.abort;
                    G.abort = function() {
                        G && Y.call(G);
                        Z("abort")
                    }
                } catch (T) {}
                ab.async && ab.timeout > 0 && setTimeout(function() {
                    G && !A && Z("timeout")
                }, ab.timeout);
                try {
                    G.send(Q === "POST" || Q === "PUT" || Q === "DELETE" ? ab.data : null)
                } catch (R) {
                    C.handleError(ab, G, null, R);
                    c()
                }
                ab.async || Z();
                return G
            }
        },
        handleError: function(s, c, A, w) {
            if (s.error) {
                s.error.call(s.context || s, c, A, w)
            }
            if (s.global) {
                (s.context ? C(s.context) : C.event).trigger("ajaxError", [c, s, w])
            }
        },
        active: 0,
        httpSuccess: function(s) {
            try {
                return !s.status && location.protocol === "file:" || s.status >= 200 && s.status < 300 || s.status === 304 || s.status === 1223 || s.status === 0
            } catch (c) {}
            return false
        },
        httpNotModified: function(s, c) {
            var A = s.getResponseHeader("Last-Modified"),
                w = s.getResponseHeader("Etag");
            if (A) {
                C.lastModified[c] = A
            }
            if (w) {
                C.etag[c] = w
            }
            return s.status === 304 || s.status === 0
        },
        httpData: function(A, c, s) {
            var w = A.getResponseHeader("content-type") || "",
                F = c === "xml" || !c && w.indexOf("xml") >= 0;
            A = F ? A.responseXML : A.responseText;
            F && A.documentElement.nodeName === "parsererror" && C.error("parsererror");
            if (s && s.dataFilter) {
                A = s.dataFilter(A, c)
            }
            if (typeof A === "string") {
                if (c === "json" || !c && w.indexOf("json") >= 0) {
                    A = C.parseJSON(A)
                } else {
                    if (c === "script" || !c && w.indexOf("javascript") >= 0) {
                        C.globalEval(A)
                    }
                }
            }
            return A
        },
        param: function(A, c) {
            function F(J, K) {
                if (C.isArray(K)) {
                    C.each(K, function(L, N) {
                        c || /\[\]$/.test(J) ? G(J, N) : F(J + "[" + (typeof N === "object" || C.isArray(N) ? L : "") + "]", N)
                    })
                } else {
                    !c && K != null && typeof K === "object" ? C.each(K, function(L, N) {
                        F(J + "[" + L + "]", N)
                    }) : G(J, K)
                }
            }

            function G(J, K) {
                K = C.isFunction(K) ? K() : K;
                s[s.length] = encodeURIComponent(J) + "=" + encodeURIComponent(K)
            }
            var s = [];
            if (c === af) {
                c = C.ajaxSettings.traditional
            }
            if (C.isArray(A) || A.jquery) {
                C.each(A, function() {
                    G(this.name, this.value)
                })
            } else {
                for (var w in A) {
                    F(w, A[w])
                }
            }
            return s.join("&").replace(ao, "+")
        }
    });
    var aP = {}, aF = /toggle|show|hide/,
        am = /^([+-]=)?([\d+-.]+)(.*)$/,
        bi, d = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    C.fn.extend({
        show: function(A, c) {
            if (A || A === 0) {
                return this.animate(ax("show", 3), A, c)
            } else {
                A = 0;
                for (c = this.length; A < c; A++) {
                    var s = C.data(this[A], "olddisplay");
                    this[A].style.display = s || "";
                    if (C.css(this[A], "display") === "none") {
                        s = this[A].nodeName;
                        var w;
                        if (aP[s]) {
                            w = aP[s]
                        } else {
                            var F = C("<" + s + " />").appendTo("body");
                            w = F.css("display");
                            if (w === "none") {
                                w = "block"
                            }
                            F.remove();
                            aP[s] = w
                        }
                        C.data(this[A], "olddisplay", w)
                    }
                }
                A = 0;
                for (c = this.length; A < c; A++) {
                    this[A].style.display = C.data(this[A], "olddisplay") || ""
                }
                return this
            }
        },
        hide: function(w, s) {
            if (w || w === 0) {
                return this.animate(ax("hide", 3), w, s)
            } else {
                w = 0;
                for (s = this.length; w < s; w++) {
                    var c = C.data(this[w], "olddisplay");
                    !c && c !== "none" && C.data(this[w], "olddisplay", C.css(this[w], "display"))
                }
                w = 0;
                for (s = this.length; w < s; w++) {
                    this[w].style.display = "none"
                }
                return this
            }
        },
        _toggle: C.fn.toggle,
        toggle: function(w, s) {
            var c = typeof w === "boolean";
            if (C.isFunction(w) && C.isFunction(s)) {
                this._toggle.apply(this, arguments)
            } else {
                w == null || c ? this.each(function() {
                    var A = c ? w : C(this).is(":hidden");
                    C(this)[A ? "show" : "hide"]()
                }) : this.animate(ax("toggle", 3), w, s)
            }
            return this
        },
        fadeTo: function(w, s, c) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: s
            }, w, c)
        },
        animate: function(A, c, s, w) {
            var F = C.speed(c, s, w);
            if (C.isEmptyObject(A)) {
                return this.each(F.complete)
            }
            return this[F.queue === false ? "each" : "queue"](function() {
                var L = C.extend({}, F),
                    N, G = this.nodeType === 1 && C(this).is(":hidden"),
                    K = this;
                for (N in A) {
                    var J = N.replace(v, u);
                    if (N !== J) {
                        A[J] = A[N];
                        delete A[N];
                        N = J
                    }
                    if (A[N] === "hide" && G || A[N] === "show" && !G) {
                        return L.complete.call(this)
                    }
                    if ((N === "height" || N === "width") && this.style) {
                        L.display = C.css(this, "display");
                        L.overflow = this.style.overflow
                    }
                    if (C.isArray(A[N])) {
                        (L.specialEasing = L.specialEasing || {})[N] = A[N][1];
                        A[N] = A[N][0]
                    }
                }
                if (L.overflow != null) {
                    this.style.overflow = "hidden"
                }
                L.curAnim = C.extend({}, A);
                C.each(A, function(V, T) {
                    var Q = new C.fx(K, L, V);
                    if (aF.test(T)) {
                        Q[T === "toggle" ? G ? "show" : "hide" : T](A)
                    } else {
                        var P = am.exec(T),
                            R = Q.cur(true) || 0;
                        if (P) {
                            T = parseFloat(P[2]);
                            var O = P[3] || "px";
                            if (O !== "px") {
                                K.style[V] = (T || 1) + O;
                                R = (T || 1) / Q.cur(true) * R;
                                K.style[V] = R + O
                            }
                            if (P[1]) {
                                T = (P[1] === "-=" ? -1 : 1) * T + R
                            }
                            Q.custom(R, T, O)
                        } else {
                            Q.custom(R, T, "")
                        }
                    }
                });
                return true
            })
        },
        stop: function(w, s) {
            var c = C.timers;
            w && this.queue([]);
            this.each(function() {
                for (var A = c.length - 1; A >= 0; A--) {
                    if (c[A].elem === this) {
                        s && c[A](true);
                        c.splice(A, 1)
                    }
                }
            });
            s || this.dequeue();
            return this
        }
    });
    C.each({
        slideDown: ax("show", 1),
        slideUp: ax("hide", 1),
        slideToggle: ax("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(s, c) {
        C.fn[s] = function(A, w) {
            return this.animate(c, A, w)
        }
    });
    C.extend({
        speed: function(s, c, A) {
            var w = s && typeof s === "object" ? s : {
                complete: A || !A && c || C.isFunction(s) && s,
                duration: s,
                easing: A && c || c && !C.isFunction(c) && c
            };
            w.duration = C.fx.off ? 0 : typeof w.duration === "number" ? w.duration : C.fx.speeds[w.duration] || C.fx.speeds._default;
            w.old = w.complete;
            w.complete = function() {
                w.queue !== false && C(this).dequeue();
                C.isFunction(w.old) && w.old.call(this)
            };
            return w
        },
        easing: {
            linear: function(s, c, A, w) {
                return A + w * s
            },
            swing: function(s, c, A, w) {
                return (-Math.cos(s * Math.PI) / 2 + 0.5) * w + A
            }
        },
        timers: [],
        fx: function(w, s, c) {
            this.options = s;
            this.elem = w;
            this.prop = c;
            if (!s.orig) {
                s.orig = {}
            }
        }
    });
    C.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (C.fx.step[this.prop] || C.fx.step._default)(this);
            if ((this.prop === "height" || this.prop === "width") && this.elem.style) {
                this.elem.style.display = "block"
            }
        },
        cur: function(c) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            return (c = parseFloat(C.css(this.elem, this.prop, c))) && c > -10000 ? c : parseFloat(C.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(A, c, s) {
            function w(G) {
                return F.step(G)
            }
            this.startTime = aC();
            this.start = A;
            this.end = c;
            this.unit = s || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var F = this;
            w.elem = this.elem;
            if (w() && C.timers.push(w) && !bi) {
                bi = setInterval(C.fx.tick, 13)
            }
        },
        show: function() {
            this.options.orig[this.prop] = C.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            C(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = C.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(A) {
            var c = aC(),
                s = true;
            if (A || c >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var w in this.options.curAnim) {
                    if (this.options.curAnim[w] !== true) {
                        s = false
                    }
                }
                if (s) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        A = C.data(this.elem, "olddisplay");
                        this.elem.style.display = A ? A : this.options.display;
                        if (C.css(this.elem, "display") === "none") {
                            this.elem.style.display = "block"
                        }
                    }
                    this.options.hide && C(this.elem).hide();
                    if (this.options.hide || this.options.show) {
                        for (var F in this.options.curAnim) {
                            C.style(this.elem, F, this.options.orig[F])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                F = c - this.startTime;
                this.state = F / this.options.duration;
                A = this.options.easing || (C.easing.swing ? "swing" : "linear");
                this.pos = C.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || A](this.state, F, 0, 1, this.options.duration);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update()
            }
            return true
        }
    };
    C.extend(C.fx, {
        tick: function() {
            for (var s = C.timers, c = 0; c < s.length; c++) {
                s[c]() || s.splice(c--, 1)
            }
            s.length || C.fx.stop()
        },
        stop: function() {
            clearInterval(bi);
            bi = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(c) {
                C.style(c.elem, "opacity", c.now)
            },
            _default: function(c) {
                if (c.elem.style && c.elem.style[c.prop] != null) {
                    c.elem.style[c.prop] = (c.prop === "width" || c.prop === "height" ? Math.max(0, c.now) : c.now) + c.unit
                } else {
                    c.elem[c.prop] = c.now
                }
            }
        }
    });
    if (C.expr && C.expr.filters) {
        C.expr.filters.animated = function(c) {
            return C.grep(C.timers, function(s) {
                return c === s.elem
            }).length
        }
    }
    C.fn.offset = "getBoundingClientRect" in ai.documentElement ? function(s) {
        var c = this[0];
        if (s) {
            return this.each(function(F) {
                C.offset.setOffset(this, s, F)
            })
        }
        if (!c || !c.ownerDocument) {
            return null
        }
        if (c === c.ownerDocument.body) {
            return C.offset.bodyOffset(c)
        }
        var A = c.getBoundingClientRect(),
            w = c.ownerDocument;
        c = w.body;
        w = w.documentElement;
        return {
            top: A.top + (self.pageYOffset || C.support.boxModel && w.scrollTop || c.scrollTop) - (w.clientTop || c.clientTop || 0),
            left: A.left + (self.pageXOffset || C.support.boxModel && w.scrollLeft || c.scrollLeft) - (w.clientLeft || c.clientLeft || 0)
        }
    } : function(J) {
        var F = this[0];
        if (J) {
            return this.each(function(O) {
                C.offset.setOffset(this, J, O)
            })
        }
        if (!F || !F.ownerDocument) {
            return null
        }
        if (F === F.ownerDocument.body) {
            return C.offset.bodyOffset(F)
        }
        C.offset.initialize();
        var w = F.offsetParent,
            A = F,
            s = F.ownerDocument,
            L, c = s.documentElement,
            G = s.body;
        A = (s = s.defaultView) ? s.getComputedStyle(F, null) : F.currentStyle;
        for (var N = F.offsetTop, K = F.offsetLeft;
            (F = F.parentNode) && F !== G && F !== c;) {
            if (C.offset.supportsFixedPosition && A.position === "fixed") {
                break
            }
            L = s ? s.getComputedStyle(F, null) : F.currentStyle;
            N -= F.scrollTop;
            K -= F.scrollLeft;
            if (F === w) {
                N += F.offsetTop;
                K += F.offsetLeft;
                if (C.offset.doesNotAddBorder && !(C.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(F.nodeName))) {
                    N += parseFloat(L.borderTopWidth) || 0;
                    K += parseFloat(L.borderLeftWidth) || 0
                }
                A = w;
                w = F.offsetParent
            }
            if (C.offset.subtractsBorderForOverflowNotVisible && L.overflow !== "visible") {
                N += parseFloat(L.borderTopWidth) || 0;
                K += parseFloat(L.borderLeftWidth) || 0
            }
            A = L
        }
        if (A.position === "relative" || A.position === "static") {
            N += G.offsetTop;
            K += G.offsetLeft
        }
        if (C.offset.supportsFixedPosition && A.position === "fixed") {
            N += Math.max(c.scrollTop, G.scrollTop);
            K += Math.max(c.scrollLeft, G.scrollLeft)
        }
        return {
            top: N,
            left: K
        }
    };
    C.offset = {
        initialize: function() {
            var A = ai.body,
                c = ai.createElement("div"),
                F, G, s, w = parseFloat(C.curCSS(A, "marginTop", true)) || 0;
            C.extend(c.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            c.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            A.insertBefore(c, A.firstChild);
            F = c.firstChild;
            G = F.firstChild;
            s = F.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = G.offsetTop !== 5;
            this.doesAddBorderForTableAndCells = s.offsetTop === 5;
            G.style.position = "fixed";
            G.style.top = "20px";
            this.supportsFixedPosition = G.offsetTop === 20 || G.offsetTop === 15;
            G.style.position = G.style.top = "";
            F.style.overflow = "hidden";
            F.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = G.offsetTop === -5;
            this.doesNotIncludeMarginInBodyOffset = A.offsetTop !== w;
            A.removeChild(c);
            C.offset.initialize = C.noop
        },
        bodyOffset: function(w) {
            var s = w.offsetTop,
                c = w.offsetLeft;
            C.offset.initialize();
            if (C.offset.doesNotIncludeMarginInBodyOffset) {
                s += parseFloat(C.curCSS(w, "marginTop", true)) || 0;
                c += parseFloat(C.curCSS(w, "marginLeft", true)) || 0
            }
            return {
                top: s,
                left: c
            }
        },
        setOffset: function(A, c, J) {
            if (/static/.test(C.curCSS(A, "position"))) {
                A.style.position = "relative"
            }
            var s = C(A),
                F = s.offset(),
                w = parseInt(C.curCSS(A, "top", true), 10) || 0,
                G = parseInt(C.curCSS(A, "left", true), 10) || 0;
            if (C.isFunction(c)) {
                c = c.call(A, J, F)
            }
            J = {
                top: c.top - F.top + w,
                left: c.left - F.left + G
            };
            "using" in c ? c.using.call(A, J) : s.css(J)
        }
    };
    C.fn.extend({
        position: function() {
            if (!this[0]) {
                return null
            }
            var s = this[0],
                c = this.offsetParent(),
                A = this.offset(),
                w = /^body|html$/i.test(c[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : c.offset();
            A.top -= parseFloat(C.curCSS(s, "marginTop", true)) || 0;
            A.left -= parseFloat(C.curCSS(s, "marginLeft", true)) || 0;
            w.top += parseFloat(C.curCSS(c[0], "borderTopWidth", true)) || 0;
            w.left += parseFloat(C.curCSS(c[0], "borderLeftWidth", true)) || 0;
            return {
                top: A.top - w.top,
                left: A.left - w.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var c = this.offsetParent || ai.body; c && !/^body|html$/i.test(c.nodeName) && C.css(c, "position") === "static";) {
                    c = c.offsetParent
                }
                return c
            })
        }
    });
    C.each(["Left", "Top"], function(w, s) {
        var c = "scroll" + s;
        C.fn[c] = function(G) {
            var A = this[0],
                F;
            if (!A) {
                return null
            }
            if (G !== af) {
                return this.each(function() {
                    if (F = M(this)) {
                        F.scrollTo(!w ? G : C(F).scrollLeft(), w ? G : C(F).scrollTop())
                    } else {
                        this[c] = G
                    }
                })
            } else {
                return (F = M(A)) ? "pageXOffset" in F ? F[w ? "pageYOffset" : "pageXOffset"] : C.support.boxModel && F.document.documentElement[c] || F.document.body[c] : A[c]
            }
        }
    });
    C.each(["Height", "Width"], function(w, s) {
        var c = s.toLowerCase();
        C.fn["inner" + s] = function() {
            return this[0] ? C.css(this[0], c, false, "padding") : null
        };
        C.fn["outer" + s] = function(A) {
            return this[0] ? C.css(this[0], c, false, A ? "margin" : "border") : null
        };
        C.fn[c] = function(A) {
            var F = this[0];
            if (!F) {
                return A == null ? null : this
            }
            if (C.isFunction(A)) {
                return this.each(function(G) {
                    var J = C(this);
                    J[c](A.call(this, G, J[c]()))
                })
            }
            return "scrollTo" in F && F.document ? F.document.compatMode === "CSS1Compat" && F.document.documentElement["client" + s] || F.document.body["client" + s] : F.nodeType === 9 ? Math.max(F.documentElement["client" + s], F.body["scroll" + s], F.documentElement["scroll" + s], F.body["offset" + s], F.documentElement["offset" + s]) : A === af ? C.css(F, c) : this.css(c, typeof A === "string" ? A : A + "px")
        }
    });
    a5.jQuery = a5.$ = C
})(window);
jQuery.cookie = function(b, j, m) {
    if (typeof j != "undefined") {
        m = m || {};
        if (j === null) {
            j = "";
            m.expires = -1
        }
        var e = "";
        if (m.expires && (typeof m.expires == "number" || m.expires.toUTCString)) {
            var f;
            if (typeof m.expires == "number") {
                f = new Date();
                f.setTime(f.getTime() + (m.expires * 24 * 60 * 60 * 1000))
            } else {
                f = m.expires
            }
            e = "; expires=" + f.toUTCString()
        }
        var l = m.path ? "; path=" + (m.path) : "";
        var g = m.domain ? "; domain=" + (m.domain) : "";
        var a = m.secure ? "; secure" : "";
        document.cookie = [b, "=", encodeURIComponent(j), e, l, g, a].join("")
    } else {
        var d = null;
        if (document.cookie && document.cookie != "") {
            var k = document.cookie.split(";");
            for (var h = 0; h < k.length; h++) {
                var c = jQuery.trim(k[h]);
                if (c.substring(0, b.length + 1) == (b + "=")) {
                    d = decodeURIComponent(c.substring(b.length + 1));
                    break
                }
            }
        }
        return d
    }
};
(function(f) {
    f.tools = f.tools || {
        version: "v1.2.5"
    }, f.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: null,
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };

    function j(d, c) {
        var b = parseInt(d.css(c), 10);
        if (b) {
            return b
        }
        var a = d[0].currentStyle;
        return a && a.width && parseInt(a.width, 10)
    }

    function i(a, c) {
        var b = f(c);
        return b.length < 2 ? b : a.parent().find(c)
    }
    var h;

    function g(p, e) {
        var d = this,
            c = p.add(d),
            b = p.children(),
            a = 0,
            v = e.vertical;
        h || (h = d), b.length > 1 && (b = f(e.items, p)), f.extend(d, {
            getConf: function() {
                return e
            },
            getIndex: function() {
                return a
            },
            getSize: function() {
                return d.getItems().size()
            },
            getNaviButtons: function() {
                return s.add(r)
            },
            getRoot: function() {
                return p
            },
            getItemWrap: function() {
                return b
            },
            getItems: function() {
                return b.children(e.item).not("." + e.clonedClass)
            },
            move: function(l, k) {
                return d.seekTo(a + l, k)
            },
            next: function(k) {
                return d.move(1, k)
            },
            prev: function(k) {
                return d.move(-1, k)
            },
            begin: function(k) {
                return d.seekTo(0, k)
            },
            end: function(k) {
                return d.seekTo(d.getSize() - 1, k)
            },
            focus: function() {
                h = d;
                return d
            },
            addItem: function(k) {
                k = f(k), e.circular ? (b.children("." + e.clonedClass + ":last").before(k), b.children("." + e.clonedClass + ":first").replaceWith(k.clone().addClass(e.clonedClass))) : b.append(k), c.trigger("onAddItem", [k]);
                return d
            },
            seekTo: function(w, m, k) {
                w.jquery || (w *= 1);
                if (e.circular && w === 0 && a == -1 && m !== 0) {
                    return d
                }
                if (!e.circular && w < 0 || w > d.getSize() || w < -1) {
                    return d
                }
                var n = w;
                w.jquery ? w = d.getItems().index(w) : n = d.getItems().eq(w);
                var l = f.Event("onBeforeSeek");
                if (!k) {
                    c.trigger(l, [w, m]);
                    if (l.isDefaultPrevented() || !n.length) {
                        return d
                    }
                }
                var o = v ? {
                    top: -n.position().top
                } : {
                    left: -n.position().left
                };
                a = w, h = d, m === undefined && (m = e.speed), b.animate(o, m, e.easing, k || function() {
                    c.trigger("onSeek", [w])
                });
                return d
            }
        }), f.each(["onBeforeSeek", "onSeek", "onAddItem"], function(k, l) {
            f.isFunction(e[l]) && f(d).bind(l, e[l]), d[l] = function(m) {
                m && f(d).bind(l, m);
                return d
            }
        });
        if (e.circular) {
            var u = d.getItems().slice(-1).clone().prependTo(b),
                t = d.getItems().eq(1).clone().appendTo(b);
            u.add(t).addClass(e.clonedClass), d.onBeforeSeek(function(l, k, m) {
                if (!l.isDefaultPrevented()) {
                    if (k == -1) {
                        d.seekTo(u, m, function() {
                            d.end(0)
                        });
                        return l.preventDefault()
                    }
                    k == d.getSize() && d.seekTo(t, m, function() {
                        d.begin(0)
                    })
                }
            }), d.seekTo(0, 0, function() {})
        }
        var s = i(p, e.prev).click(function() {
            d.prev()
        }),
            r = i(p, e.next).click(function() {
                d.next()
            });
        !e.circular && d.getSize() > 1 && (d.onBeforeSeek(function(l, k) {
            setTimeout(function() {
                l.isDefaultPrevented() || (s.toggleClass(e.disabledClass, k <= 0), r.toggleClass(e.disabledClass, k >= d.getSize() - 1))
            }, 1)
        }), e.initialIndex || s.addClass(e.disabledClass)), e.mousewheel && f.fn.mousewheel && p.mousewheel(function(l, k) {
            if (e.mousewheel) {
                d.move(k < 0 ? 1 : -1, e.wheelSpeed || 50);
                return !1
            }
        });
        if (e.touch) {
            var q = {};
            b[0].ontouchstart = function(l) {
                var k = l.touches[0];
                q.x = k.clientX, q.y = k.clientY
            }, b[0].ontouchmove = function(m) {
                if (m.touches.length == 1 && !b.is(":animated")) {
                    var l = m.touches[0],
                        k = q.x - l.clientX,
                        n = q.y - l.clientY;
                    d[v && n > 0 || !v && k > 0 ? "next" : "prev"](), m.preventDefault()
                }
            }
        }
        e.keyboard && f(document).bind("keydown.scrollable", function(k) {
            if (e.keyboard && !k.altKey && !k.ctrlKey && !f(k.target).is(":input")) {
                if (e.keyboard != "static" && h != d) {
                    return
                }
                var l = k.keyCode;
                if (v && (l == 38 || l == 40)) {
                    d.move(l == 38 ? -1 : 1);
                    return k.preventDefault()
                }
                if (!v && (l == 37 || l == 39)) {
                    d.move(l == 37 ? -1 : 1);
                    return k.preventDefault()
                }
            }
        }), e.initialIndex && d.seekTo(e.initialIndex, 0, function() {})
    }
    f.fn.scrollable = function(b) {
        var a = this.data("scrollable");
        if (a) {
            return a
        }
        b = f.extend({}, f.tools.scrollable.conf, b), this.each(function() {
            a = new g(f(this), b), f(this).data("scrollable", a)
        });
        return b.api ? a : this
    }
})(jQuery);
(function(d) {
    var c = d.tools.scrollable;
    c.autoscroll = {
        conf: {
            autoplay: !0,
            interval: 3000,
            autopause: !0
        }
    }, d.fn.autoscroll = function(b) {
        typeof b == "number" && (b = {
            interval: b
        });
        var a = d.extend({}, c.autoscroll.conf, b),
            f;
        this.each(function() {
            var e = d(this).data("scrollable");
            e && (f = e);
            var h, g = !0;
            e.play = function() {
                h || (g = !1, h = setInterval(function() {
                    e.next()
                }, a.interval))
            }, e.pause = function() {
                h = clearInterval(h)
            }, e.stop = function() {
                e.pause(), g = !0
            }, a.autopause && e.getRoot().add(e.getNaviButtons()).hover(e.pause, e.play), a.autoplay && e.play()
        });
        return a.api ? f : this
    }
})(jQuery);
(function(f) {
    var e = f.tools.scrollable;
    e.navigator = {
        conf: {
            navi: ".navi",
            naviItem: null,
            activeClass: "active",
            indexed: !1,
            idPrefix: null,
            history: !1
        }
    };

    function d(a, c) {
        var b = f(c);
        return b.length < 2 ? b : a.parent().find(c)
    }
    f.fn.navigator = function(b) {
        typeof b == "string" && (b = {
            navi: b
        }), b = f.extend({}, e.navigator.conf, b);
        var a;
        this.each(function() {
            var p = f(this).data("scrollable"),
                o = b.navi.jquery ? b.navi : d(p.getRoot(), b.navi),
                n = p.getNaviButtons(),
                c = b.activeClass,
                u = b.history && f.fn.history;
            p && (a = p), p.getNaviButtons = function() {
                return n.add(o)
            };

            function t(g, i, h) {
                p.seekTo(i);
                if (u) {
                    location.hash && (location.hash = g.attr("href").replace("#", ""))
                } else {
                    return h.preventDefault()
                }
            }

            function s() {
                return o.find(b.naviItem || "> *")
            }

            function r(g) {
                var h = f("<" + (b.naviItem || "a") + "/>").click(function(i) {
                    t(f(this), g, i)
                }).attr("href", "#" + g);
                g === 0 && h.addClass(c), b.indexed && h.text(g + 1), b.idPrefix && h.attr("id", b.idPrefix + g);
                return h.appendTo(o)
            }
            s().length ? s().each(function(g) {
                f(this).click(function(h) {
                    t(f(this), g, h)
                })
            }) : f.each(p.getItems(), function(g) {
                r(g)
            }), p.onBeforeSeek(function(h, g) {
                setTimeout(function() {
                    if (!h.isDefaultPrevented()) {
                        var i = s().eq(g);
                        !h.isDefaultPrevented() && i.length && s().removeClass(c).eq(g).addClass(c)
                    }
                }, 1)
            });

            function q(h, g) {
                var i = s().eq(g.replace("#", ""));
                i.length || (i = s().filter("[href=" + g + "]")), i.click()
            }
            p.onAddItem(function(g, h) {
                h = r(p.getItems().index(h)), u && h.history(q)
            }), u && s().history(q)
        });
        return b.api ? a : this
    }
})(jQuery);
var YHDOBJECT = {};
YHDOBJECT.Map = function() {
    var a = 0;
    this.entry = {};
    this.put = function(b, c) {
        if (!this.containsKey(b)) {
            a++
        }
        this.entry[b] = c
    };
    this.get = function(b) {
        if (this.containsKey(b)) {
            return this.entry[b]
        } else {
            return null
        }
    };
    this.remove = function(b) {
        if (delete this.entry[b]) {
            a--
        }
    };
    this.containsKey = function(b) {
        return (b in this.entry)
    };
    this.containsValue = function(b) {
        for (var c in this.entry) {
            if (this.entry[c] == b) {
                return true
            }
        }
        return false
    };
    this.values = function() {
        var b = [];
        for (var c in this.entry) {
            b.push(this.entry[c])
        }
        return b
    };
    this.keys = function() {
        var b = new Array(a);
        for (var c in this.entry) {
            b.push(c)
        }
        return b
    };
    this.size = function() {
        return a
    };
    this.clear = function() {
        this.entry = {};
        this.size = 0
    }
};
YHDOBJECT.globalVariable = function() {
    try {
        var b = jQuery("#comParamId").data("globalComParam");
        if (b) {
            return b
        }
        jQuery("#comParamId").data("globalComParam", jQuery.parseJSON(jQuery("#comParamId").attr("data-param")));
        return jQuery("#comParamId").data("globalComParam")
    } catch (a) {
        if (window.console && console.log) {
            console.log(a)
        }
        return {}
    }
};
(function() {
    jQuery.cookie("test_cookie", "1");
    if (jQuery.cookie("test_cookie")) {
        var a = new Date();
        a.setTime(a.getTime() - 10000);
        document.cookie = "test_cookie=;path=;domain=;expires=" + a.toGMTString()
    } else {
        alert("由于您使用的浏览器设置问题可能导致网页运行不正常。请修改浏览器cookie的限制或尝试其他浏览器。")
    }
})();
var YHDGLOBAL = YHDGLOBAL || {};
YHDGLOBAL.getCookie = function(e, b) {
    if (typeof oppositeDomain == "undefined") {
        return
    }
    var c = {};
    if (typeof e == "string") {
        e = [e]
    }
    if (typeof currSiteType != "undefined" && currSiteType != 1) {
        var a = oppositeDomain;
        if ("https" == document.location.protocol) {
            a = a.replace("http", "https")
        }
        var d = a + "/yhd-common/assign-login-api.do?";
        jQuery(e).each(function() {
            d += "cookieNames=" + this + "&"
        });
        d += "&timestamp=" + new Date() + "&callback=?";
        jQuery.getJSON(d, function(f) {
            if (f.ERROR) {
                return
            }
            jQuery(f.info).each(function() {
                c[this.name] = decodeURIComponent(this.value)
            });
            if (typeof b == "function") {
                b.apply(c)
            }
        })
    } else {
        jQuery(e).each(function() {
            c[this] = jQuery.cookie(this)
        });
        if (typeof b == "function") {
            b.apply(c)
        }
    }
};
YHDGLOBAL.sysCookie = function(a, b) {};
(function(d) {
    d.fn.jqm = function(f) {
        var e = {
            overlay: 50,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: o,
            ajaxP: o,
            ajaxText: "",
            target: o,
            modal: o,
            toTop: o,
            onShow: o,
            onHide: o,
            onLoad: o
        };
        return this.each(function() {
            if (this._jqm) {
                return n[this._jqm].c = d.extend({}, n[this._jqm].c, f)
            }
            p++;
            this._jqm = p;
            n[p] = {
                c: d.extend(e, d.jqm.params, f),
                a: o,
                w: d(this).addClass("jqmID" + p),
                s: p
            };
            if (e.trigger) {
                d(this).jqmAddTrigger(e.trigger)
            }
        })
    };
    d.fn.jqmAddClose = function(e) {
        return l(this, e, "jqmHide")
    };
    d.fn.jqmAddTrigger = function(e) {
        return l(this, e, "jqmShow")
    };
    d.fn.jqmShow = function(e) {
        return this.each(function() {
            e = e || window.event;
            d.jqm.open(this._jqm, e)
        })
    };
    d.fn.jqmHide = function(e) {
        return this.each(function() {
            e = e || window.event;
            d.jqm.close(this._jqm, e)
        })
    };
    d.jqm = {
        hash: {},
        open: function(i, f) {
            var e = n[i],
                m = e.c,
                v = "." + m.closeClass,
                q = (parseInt(e.w.css("z-index"))),
                q = (q > 0) ? q : 3000,
                u = d("<div></div>").css({
                    height: "100%",
                    width: "100%",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    "z-index": q - 1,
                    opacity: m.overlay / 100
                });
            if (e.a) {
                return o
            }
            e.t = f;
            e.a = true;
            e.w.css("z-index", q);
            if (m.modal) {
                if (!a[0]) {
                    k("bind")
                }
                a.push(i)
            } else {
                if (m.overlay > 0) {
                    e.w.jqmAddClose(u)
                } else {
                    u = o
                }
            }
            e.o = (u) ? u.addClass(m.overlayClass).prependTo("body") : o;
            if (c) {
                d("html,body").css({
                    height: "100%",
                    width: "100%"
                });
                if (u) {
                    u = u.css({
                        position: "absolute"
                    })[0];
                    for (var r in {
                        Top: 1,
                        Left: 1
                    }) {
                        u.style.setExpression(r.toLowerCase(), "(_=(document.documentElement.scroll" + r + " || document.body.scroll" + r + "))+'px'")
                    }
                }
            }
            if (m.ajax) {
                var t = m.target || e.w,
                    s = m.ajax,
                    t = (typeof t == "string") ? d(t, e.w) : d(t),
                    s = (s.substr(0, 1) == "@") ? d(f).attr(s.substring(1)) : s;
                t.html(m.ajaxText).load(s, m.ajaxP, function() {
                    if (m.onLoad) {
                        m.onLoad.call(this, e)
                    }
                    if (v) {
                        e.w.jqmAddClose(d(v, e.w))
                    }
                    j(e)
                })
            } else {
                if (v) {
                    e.w.jqmAddClose(d(v, e.w))
                }
            } if (m.toTop && e.o) {
                e.w.before('<span id="jqmP' + e.w[0]._jqm + '"></span>').insertAfter(e.o)
            }(m.onShow) ? m.onShow(e) : e.w.show();
            j(e);
            return o
        },
        close: function(f) {
            var e = n[f];
            if (!e.a) {
                return o
            }
            e.a = o;
            if (a[0]) {
                a.pop();
                if (!a[0]) {
                    k("unbind")
                }
            }
            if (e.c.toTop && e.o) {
                d("#jqmP" + e.w[0]._jqm).after(e.w).remove()
            }
            if (e.c.onHide) {
                e.c.onHide(e)
            } else {
                e.w.hide();
                if (e.o) {
                    e.o.remove()
                }
            }
            return o
        },
        params: {}
    };
    var p = 0,
        n = d.jqm.hash,
        a = [],
        c = d.browser.msie && (d.browser.version == "6.0"),
        o = false,
        g = d('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
            opacity: 0
        }),
        j = function(e) {
            if (c) {
                if (e.o) {
                    e.o.html('<p style="width:100%;height:100%"/>').prepend(g)
                } else {
                    if (!d("iframe.jqm", e.w)[0]) {
                        e.w.prepend(g)
                    }
                }
            }
            h(e)
        }, h = function(f) {
            try {
                d(":input:visible", f.w)[0].focus()
            } catch (e) {}
        }, k = function(e) {
            d()[e]("keypress", b)[e]("keydown", b)[e]("mousedown", b)
        }, b = function(e) {
            var f = n[a[a.length - 1]],
                i = (!d(e.target).parents(".jqmID" + f.s)[0]);
            if (i) {
                h(f)
            }
            return !i
        }, l = function(f, i, e) {
            return f.each(function() {
                var m = this._jqm;
                d(i).each(function() {
                    if (!this[e]) {
                        this[e] = [];
                        d(this).click(function() {
                            for (var q in {
                                jqmShow: 1,
                                jqmHide: 1
                            }) {
                                for (var r in this[q]) {
                                    if (n[this[q][r]]) {
                                        n[this[q][r]].w[q](this)
                                    }
                                }
                            }
                            return o
                        })
                    }
                    this[e].push(m)
                })
            })
        }
})(jQuery);
jQuery(document).ready(function() {
    if (isIndex == null || isIndex != 1) {
        jQuery("#yhd_pop_win").bgiframe()
    }
});
var YHD = {
    init: function() {
        if (jQuery("#yhd_pop_win").size() > 0) {
            jQuery("#yhd_pop_win").jqm({
                overlay: 50,
                overlayClass: "jqmOverlay",
                closeClass: "jqmClose",
                trigger: ".jqModal",
                ajax: false,
                ajaxP: false,
                ajaxText: "",
                target: false,
                modal: false,
                toTop: false,
                onShow: false,
                onHide: false,
                onLoad: false
            })
        }
    },
    initPosition: function(d, g, e, f, c) {
        var a = (g == null ? d.width() : g);
        var i = (e == null ? d.height() : e);
        jQuery(d).width(a).height(i);
        if (f && c) {
            jQuery(d).css({
                top: f,
                left: c
            })
        } else {
            if (f != null) {
                jQuery(d).css({
                    top: f
                })
            } else {
                if (c != null) {
                    jQuery(d).css({
                        left: c
                    })
                } else {
                    var b = (jQuery(window).width() - d.width()) / 2 + jQuery(window).scrollLeft() + "px";
                    var j = (jQuery(window).height() - d.height()) / 2 + jQuery(window).scrollTop() + "px";
                    jQuery(d).css("left", b).css("top", j)
                }
            }
        } if (g != null && e != null) {
            jQuery(d).jqm({
                onHide: function(h) {
                    h.w.width(0).height(0).hide();
                    if (h.o) {
                        h.o.remove()
                    }
                }
            })
        }
    },
    popwin: function(c, d, e, a, g, f) {
        YHD.init();
        var b = jQuery("#yhd_pop_win");
        if (c != null) {
            jQuery(b).html(c)
        }
        YHD.initPosition(b, d, e, a, g);
        jQuery(b).jqm({
            overlay: 10,
            overlayClass: "pop_win_bg",
            modal: true,
            toTop: true
        }).jqmShow().jqmAddClose(".popwinClose");
        jQuery(".pop_win_bg").bgiframe()
    },
    popwinId: function(a, g, c, d, f, e) {
        var b = jQuery("#" + a);
        YHD.initPosition(b, c, d, f, e);
        b.css("height", "auto");
        b.css("z-index", "1000");
        b.show();
        if (!g) {
            g = "popwinClose"
        }
        jQuery("." + g, b).bind("click", function() {
            b.hide()
        })
    },
    popTitleWin: function(f, a, g, b, e, d, c) {
        var i = '<H3 class="pop_win_title" >' + f + '<img src="' + imagePath + '/icon_close.jpg" class="popwinClose"/></H3>';
        i += '<div class="pop_win_content" class="content">' + a + "</div>";
        i += '<div style="clear:both"></div>';
        YHD.popwin(i, g, b, e, d, c)
    },
    alert: function(b, a, c, e, f) {
        var d = '<div class="aptab" style="left: 0px; top: 0px;"><div class="aptab_header"><ul><li class="fl pl10">温馨提示</li><li class="popwinClose fr btn_close mr10"><img src="' + imagePath + '/popwin/icon_close.jpg"></li><li class="popwinClose fr mr5 color_white"><a href="###">关闭</a></li></ul> <div class="clear"></div></div>';
        d += '<div class="aptab_center" align="center"><p class="pt10">' + b + "</p>";
        d += '<p class="pt5"><input name="submit" class="pop_win_button popwinClose" id="pop_win_ok_btn" type="button"   value="确 定" /></p>';
        d += "</div>";
        d += '<div class="aptab_footer"><img src="' + imagePath + '/popwin/aptab_footer.jpg"></div></div>';
        if (c == null) {
            c = 300
        }
        YHD.popwin(d, c, e, null, null, f);
        if (a) {
            jQuery("#pop_win_ok_btn").click(function() {
                a()
            })
        }
    },
    alertPrescriotion: function(k, b, f, d, g) {
        var a = "";
        if (k == null) {
            a = ""
        } else {
            if (k == 14) {
                a = "本品为处方药，为了用药安全，已经将您的个人信息进行登记，谢谢配合！如需用药指导帮助请联系在线客服！"
            } else {
                if (k == 16 || k == 17 || k == 18) {
                    a = "本品为处方药，不能网络订购；如需购买，请到药店凭处方购买或咨询客服!"
                } else {
                    a = "本品为处方药,请在提交订单前上传处方,如需用药师指导帮助,请联系在线客服！"
                }
            }
        }
        var j = "确定";
        if (k != null && (k == 16 || k == 17 || k == 18)) {
            j = "关闭"
        }
        var e = '<input name="submit" class="pop_win_button popwinClose fl" id="pop_win_ok_btn" type="button"   value="' + j + '" />';
        var c = '<a href="http://vipwebchat.tq.cn/sendmain.jsp?admiuin=8987730&uin=8987730&tag=call&ltype=1&rand=15214019897292372&iscallback=0&agentid=0&comtimes=48&preuin=8987730&buttonsflag=1010011111111&is_appraise=1&color=6&style=1&isSendPreWords=1&welcome_msg=%C4%FA%BA%C3%A3%A1%CE%D2%CA%C7%C6%BD%B0%B2%D2%A9%CD%F8%B5%C4%D6%B4%D0%D0%D2%A9%CA%A6%A3%AC%C7%EB%CE%CA%C4%FA%D0%E8%D2%AA%CA%B2%C3%B4%B0%EF%D6%FA%A3%BF&tq_right_infocard_url=' + imagePath + "/images/yaowang/v2/tq01.jpg&cp_title=%BB%B6%D3%AD%CA%B9%D3%C3%C6%BD%B0%B2%D2%A9%CD%F8%D4%DA%CF%DF%BD%D3%B4%FD%CF%B5%CD%B3&page=" + imagePath + "/&localurl=" + imagePath + "/channel/15694&spage=" + imagePath + '/&nocache=0.6430502517039929" class="pop_win_button fl" style="display:block;">咨询</a>';
        var i = '<div class="aptab" style="left: 0px; top: 0px;"><div class="aptab_header"><ul><li class="fl pl10">温馨提示</li><li class="popwinClose fr btn_close mr10"><img src="' + imagePath + '/popwin/icon_close.jpg"></li><li class="popwinClose fr mr5 color_white"><a href="###">关闭</a></li></ul> <div class="clear"></div></div>';
        i += '<div class="aptab_center" align="center"><p class="pt10">' + a + "</p>";
        i += '<div class="pt5" style="width:160px;">';
        if (k != null && (k == 16 || k == 17 || k == 18)) {
            i += c;
            i += e
        } else {
            i += e;
            i += c
        }
        i += '<div class="clear"></div></div>';
        i += '<p class="pt10 mb10" style="color:#b00000;font-weight:bold;">免费客服热线:400-007-0958</p></div>';
        i += '<div class="aptab_footer"><img src="' + imagePath + '/popwin/aptab_footer.jpg"></div></div>';
        if (f == null) {
            f = 300
        }
        YHD.popwin(i, f, d, null, null, g);
        if (b) {
            if (k != null && k != 16 && k != 17 && k != 18) {
                jQuery("#pop_win_ok_btn").click(function() {
                    b()
                })
            }
        }
    },
    alertForLottery: function(b, a, c, e, f) {
        var d = '<div class="popbox"><div><h2><a href="#" class="popwinClose">关闭</a>温馨提示</h2><dl class="noaward">';
        d += "<dt>" + b + "</dt>";
        d += '</dl><p><button class="btn_go"  id="pop_win_ok_btn">确定</button></p></div></div>';
        if (c == null) {
            c = 300
        }
        YHD.popwin(d, c, e, null, null, f);
        if (a) {
            jQuery("#pop_win_ok_btn").click(function() {
                a()
            })
        }
    },
    confirm: function(a, d, c, b, f, g) {
        var e = '<div class="aptab" style="left: 0px; top: 0px;"><div class="aptab_header"><ul><li class="fl pl10">温馨提示</li><li class="popwinClose fr btn_close mr10"><img src="' + imagePath + '/popwin/icon_close.jpg"></li><li class="popwinClose fr mr5 color_white"><a href="###">关闭</a></li></ul> <div class="clear"></div></div>';
        e += '<div class="aptab_center" align="center"><p class="pt10">' + a + "</p>";
        e += '<div align="center"><input name="submit" class="pop_win_button popwinClose" id="pop_win_ok_btn" type="button"   value="确 定" /><input name="submit"   class="pop_win_button popwinClose" type="button" id="pop_win_cancel_btn" value="返回购物车" /></div>';
        e += "</div>";
        e += '<div class="aptab_footer"><img src="' + imagePath + '/popwin/aptab_footer.jpg"></div></div>';
        if (b == null) {
            b = 300
        }
        YHD.popwin(e, b, f, null, null, g);
        if (d) {
            jQuery("#pop_win_ok_btn").click(function() {
                d()
            })
        }
        if (c) {
            jQuery("#pop_win_cancel_btn").click(function() {
                c()
            })
        }
    },
    confirmToLottery: function(a, d, c, b, f, g) {
        var e = "" + a + "";
        if (b == null) {
            b = 300
        }
        YHD.popwin(e, b, f, null, null, g);
        if (d) {
            jQuery("#pop_win_ok_btn").click(function() {
                d()
            })
        }
        if (c) {
            jQuery("#pop_win_cancel_btn").click(function() {
                c()
            })
        }
    },
    processBar: function(a, b) {
        if (a) {
            YHD.popwin('<img src="' + imagePath + '/loading.gif" />', null, null, null, null, b)
        } else {
            jQuery("#yhd_pop_win").jqmHide()
        }
    },
    ajax: function(e, d, a, f) {
        var b = jQuery("#yhd_pop_win");
        b.jqm({
            ajax: e,
            ajaxP: d,
            ajaxText: '<img src="' + imagePath + '/loading.gif" />',
            onLoad: a,
            modal: true,
            toTop: true,
            closeClass: "popwinClose"
        }).jqmShow();
        var g = (jQuery(window).width() - b.width()) / 2 + jQuery(window).scrollLeft() + "px";
        var c = (jQuery(window).height() - b.height()) / 2 + jQuery(window).scrollTop() + "px";
        jQuery(b).css("left", g).css("top", c)
    },
    ajaxPointAlert: function(e, d, a, f) {
        var b = jQuery("#yhd_pop_win");
        b.jqm({
            ajax: e,
            ajaxP: d,
            ajaxText: '<img src="' + imagePath + '/loading.gif" />',
            onLoad: a,
            modal: true,
            toTop: true,
            closeClass: "popwinClose"
        }).jqmShow();
        var g = "436.5px";
        var c = (jQuery(window).height() - b.height()) / 2 + jQuery(window).scrollTop() + "px";
        jQuery(b).css("left", g).css("top", c)
    },
    pageX: function(a) {
        a = a || window.event;
        return a.pageX || a.clientX + document.body.scrollLeft
    },
    pageY: function(a) {
        a = a || window.event;
        return a.pageY || a.clientY + document.body.scrollTop
    }
};
Array.prototype.toTRACKERJSONString = function() {
    var a = "[";
    for (var b = 0; b < this.length; b++) {
        if (this[b] instanceof Parameter) {
            if (this[b].value instanceof Array) {
                a += "{" + this[b].key + "=" + this[b].value.toTRACKERJSONString() + "},"
            } else {
                a += this[b].toJSONString() + ","
            }
        }
    }
    if (a.indexOf(",") > 0) {
        a = a.substring(0, a.length - 1)
    }
    return a + "]"
};
var trackerUrl = "";

function Parameter(a, b) {
    this.key = a;
    if (this.key == "internalKeyword") {
        this.value = encodeURI(b)
    } else {
        this.value = b
    }
    this.toJSONString = function() {
        return "{" + this.key + "=" + this.value + "}"
    }
}
var linkPosition = "";
var buttonPosition = "";

function TrackerContainer(a) {
    this.url = a;
    this.parameterArray = new Array();
    this.stockArray = new Array();
    this.commonAttached = new Array();
    this.addParameter = function(b) {
        this.parameterArray.push(b)
    };
    this.addStock = function(c, b) {
        this.stockArray.push(new Parameter(c, b))
    };
    this.addCommonAttached = function(b, c) {
        this.commonAttached.push(new Parameter(b, c))
    };
    this.buildAttached = function() {
        if (this.stockArray.length > 0) {
            this.commonAttached.push(new Parameter("1", this.stockArray))
        }
        if (this.commonAttached.length > 0) {
            this.addParameter(new Parameter("attachedInfo", this.commonAttached.toTRACKERJSONString("attachedInfo")))
        }
    };
    this.toUrl = function() {
        this.buildAttached();
        for (var c = 0; c < this.parameterArray.length; c++) {
            var b = this.parameterArray[c].key;
            var d = this.parameterArray[c].value;
            this.url += "&" + b + "=" + d
        }
        trackerUrl = this.url;
        return this.url
    }
}
var trackerUrl = ("https:" == document.location.protocol ? "https://" : "http://") + URLPrefix.tracker + "/tracker/info.do?1=1";
var trackerContainer = new TrackerContainer(trackerUrl);
var ieVersion = navigator.userAgent || "";
var platform = navigator.platform || "";
trackerContainer.addParameter(new Parameter("ieVersion", ieVersion));
trackerContainer.addParameter(new Parameter("platform", platform));
var page_refer = document.referrer ? document.referrer : "";
var page_location = window.location.href;

function addTrackPositionToCookie(b, a) {
    document.cookie = "linkPosition=" + encodeURIComponent(a) + ";path=/;domain=." + no3wUrl + ";"
}

function getCookie(c) {
    var e = document.cookie;
    var a = e.split("; ");
    for (var d = 0; d < a.length; d++) {
        var b = a[d].split("=");
        if (b[0] == c) {
            return b[1]
        }
    }
    return null
}
var e1 = new RegExp("exfield1=[^;]*;*", "i");
var e2 = new RegExp("exfield2=[^;]*;*", "i");
var e3 = new RegExp("exfield3=[^;]*;*", "i");
var e4 = new RegExp("exfield4=[^;]*;*", "i");
var e5 = new RegExp("exfield5=[^;]*;*", "i");

function recordTrackInfoWithType(h, c, a, g) {
    var m = ("https:" == document.location.protocol ? "https://" : "http://") + URLPrefix.tracker + "/related/info.do?1=1";
    var d = {};
    if (h && c) {
        d.infoType = h;
        d.relatedInfo = encodeURIComponent(c) || "";
        d.attachedInfo = encodeURIComponent(a) || "";
        if (document) {
            d.url = document.URL || "";
            d.infoPreviousUrl = document.referrer || ""
        }
        d.ieVersion = ieVersion;
        d.platform = platform;
        if (g) {
            var b = e1.exec(g);
            if (b) {
                d.exField1 = b[0].replace(/exfield1=/i, "").replace(";", "")
            }
            var n = e2.exec(g);
            if (n) {
                d.exField2 = n[0].replace(/exfield2=/i, "").replace(";", "")
            }
            var l = e3.exec(g);
            if (l) {
                d.exField3 = l[0].replace(/exfield3=/i, "").replace(";", "")
            }
            var k = e4.exec(g);
            if (k) {
                d.exField4 = k[0].replace(/exfield4=/i, "").replace(";", "")
            }
            var j = e5.exec(g);
            if (j) {
                d.exField5 = j[0].replace(/exfield5=/i, "").replace(";", "")
            }
        }
        for (var f in d) {
            m += "&" + f + "=" + encodeURIComponent(d[f])
        }
        var e = new Image(1, 1);
        e.src = m
    }
}

function gotracker(a, b, e) {
    var c = trackerUrl;
    var d = new RegExp("&linkPosition=\\w*", "g");
    c = c.replace(d, "");
    var d = new RegExp("&buttonPosition=\\w*", "g");
    c = c.replace(d, "");
    var d = new RegExp("&productId=\\w*", "g");
    c = c.replace(d, "");
    if (b != null) {
        c = c + "&buttonPosition=" + b
    }
    if (e != null) {
        c = c + "&productId=" + e
    }
    jQuery.ajax({
        async: true,
        url: c,
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback"
    })
}

function bindLinkClickTracker(c, b) {
    var a = jQuery("#" + c + " a");
    a.click(function() {
        var d = jQuery(this).text();
        d = b + "_" + encodeURIComponent(jQuery.trim(d));
        addTrackPositionToCookie("1", d)
    })
}

function callLoadCookie() {
    var a = "";
    if (page_location.indexOf("yihaodian.com") != -1 && page_refer.indexOf("1mall.com") != -1) {
        a = URLPrefix.mall
    } else {
        if (page_location.indexOf("1mall.com") != -1 && page_refer.indexOf("yihaodian.com") != -1) {
            a = URLPrefix.central
        }
    } if (a != "") {
        if ("https:" == document.location.protocol) {
            a = a.replace("http", "https")
        }
        jQuery.getJSON(a + "/yhd-common/assign-login-api.do?cookieNames=unionKey&cookieNames=adgroupKeywordID&cookieNames=unionType&cookieNames=uid&cookieNames=websiteid&callback=?", function(b) {
            if (!b.ERROR) {
                jQuery(b.info).each(function() {
                    if (this.value != "") {
                        var c = new Date();
                        c.setTime(c.getTime() + (1 * 24 * 3600000));
                        jQuery.cookie(this.name, this.value, {
                            domain: no3wUrl,
                            path: "/",
                            expires: c
                        })
                    }
                })
            }
        })
    }
}

function callLoadlinkCookie() {
    var a = "";
    if (page_location.indexOf("yihaodian.com") != -1) {
        a = URLPrefix.mall
    } else {
        if (page_location.indexOf("1mall.com") != -1) {
            a = URLPrefix.central
        }
    } if (a != "") {
        if ("https:" == document.location.protocol) {
            a = a.replace("http", "https")
        }
        var b = a + "/yhd-common/assign-login-api.do?cookieNames=linkPosition&callback=?";
        jQuery.ajax({
            async: true,
            url: b,
            timeout: 1000,
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function(c) {
                if (!c.ERROR) {
                    jQuery(c.info).each(function() {
                        if (this.value != "") {
                            var d = "";
                            trackerContainer.addParameter(new Parameter(this.name, this.value));
                            d = "cookieDatas=" + this.name + ",," + this.value + ",,0";
                            callAddCookieApi(a, d)
                        }
                    })
                }
            },
            complete: function() {
                initHijack()
            },
            statusCode: {
                404: function() {
                    initHijack()
                }
            }
        })
    } else {
        initHijack()
    }
}

function callAddCookieApi(a, b) {
    jQuery.ajax({
        async: true,
        url: a + "/yhd-common/cookie-set-api.do?" + b + "&callback=?",
        timeout: 1000,
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(c) {}
    })
}
callLoadCookie();

function initLeftMenu(h) {
    if (!jQuery("#allCategoryHeader").size()) {
        return
    }
    var g = jQuery("#allSortOuterbox");
    var j = jQuery("#allCategoryHeader");
    var l = j.find(".stitle");
    k(h || false);
    i();

    function i() {
        var e = "",
            p = 200,
            f = p - 20,
            a;
        var q = {};
        l.hover(function() {
            if (q) {
                clearTimeout(q)
            }
            var t = this,
                m = $(t),
                o = m.find("sotr_item");
            if (o.hasClass("hover")) {
                return
            }
            l.find(".sotr_item").removeClass("hover");
            m.find(".sotr_item").addClass("hover");
            var n = currDomain + "/header/globalYaowangLeftMenu.do";
            r(m, n, "categoryid", l.index(t))
        }, function() {
            clearTimeout(a);
            q = setTimeout(function() {
                l.find(".category").hide();
                l.find(".sotr_item").removeClass("hover")
            }, 200)
        });

        function c(m) {
            if (a) {
                clearTimeout(a)
            }
            a = setTimeout(function() {
                d(m)
            }, p);
            e = new Date().getTime()
        }

        function d(m) {
            if ((new Date().getTime() - e) >= f) {
                b(m);
                e = new Date().getTime()
            }
        }

        function b(w) {
            w = $(w);
            l.find(".sotr_item").removeClass("hover");
            l.find(".category").hide();
            var n = $(window).scrollTop();
            var v = j.offset().top;
            var m = n + $(window).height() - v,
                o = w.position().top,
                x = m - o;
            if (o > 0) {
                w.find(".category").css("margin-top", "-" + (o + 1) + "px")
            }
            w.find(".category").show();
            w.find(".sotr_item").addClass("hover")
        }

        function r(o, D, n, m) {
            var z = o;
            var C = z.data("data-flag");
            if (C == 1) {
                c(o);
                return
            }
            var B = z.find(".category");
            var A = n || "categoryid";
            n = z.attr(A);
            callbackName = "GLOBALLEFTMENU_" + n;
            var y = typeof(merchant) != "undefined" ? merchant : 1;
            D = D + "?categoryId=" + n + "&merchant=" + y + "&index=" + m + "&callback=" + callbackName;
            z.data("data-flag", 1);
            window[callbackName] = function(s) {
                B.html(s.value);
                o.find("a[tk]").click(function() {
                    var t = $(this),
                        u = t.attr("tk");
                    if (u) {
                        addTrackPositionToCookie("1", u)
                    }
                });
                if (o.find(".sotr_item").hasClass("hover")) {
                    c(o)
                }
            };
            jQuery.getScript(D)
        }
    }

    function k(a) {
        if (!a) {
            g.hover(function() {
                j.show();
                g.addClass("hover")
            }, function() {
                jQuery("#allSortOuterbox li.cur").removeClass("cur").children(".show_sort").hide();
                jQuery(this).children("#allCategoryHeader").hide();
                jQuery(this).removeClass("hover")
            })
        }
    }
}
jQuery(document).ready(function() {
    if (isIndex != 1) {
        initLeftMenu(false)
    }
});
var YHDPROVINCE = {};
YHDPROVINCE.getCurentDomain = function() {
    return typeof currSiteType != "undefined" && currSiteType == 1 ? URLPrefix.central : URLPrefix.mall
};
YHDPROVINCE.getOppositeDomain = function() {
    return typeof currSiteType != "undefined" && currSiteType == 1 ? URLPrefix.mall : URLPrefix.central
};
YHDPROVINCE.proviceObj = {
    p_1: "上海",
    p_2: "北京",
    p_3: "天津",
    p_4: "河北",
    p_5: "江苏",
    p_6: "浙江",
    p_7: "重庆",
    p_8: "内蒙古",
    p_9: "辽宁",
    p_10: "吉林",
    p_11: "黑龙江",
    p_12: "四川",
    p_13: "安徽",
    p_14: "福建",
    p_15: "江西",
    p_16: "山东",
    p_17: "河南",
    p_18: "湖北",
    p_19: "湖南",
    p_20: "广东",
    p_21: "广西",
    p_22: "海南",
    p_23: "贵州",
    p_24: "云南",
    p_25: "西藏",
    p_26: "陕西",
    p_27: "甘肃",
    p_28: "青海",
    p_29: "新疆",
    p_30: "宁夏",
    p_32: "山西"
};
YHDPROVINCE.swithAddressCity = function(d, a) {
    if (typeof siteFlag != "undefined" && siteFlag == 1) {
        var c = jQuery.cookie("provinceId");
        var b = {};
        b.callback = a;
        b.isSetAddress = 0;
        jQuery.cookie("provinceId", d, {
            domain: no3wUrl,
            path: "/",
            expires: 800
        });
        if (typeof currSiteType != "undefined" && currSiteType != 1) {
            jQuery.ajax({
                url: oppositeDomain + "/header/addressChange.do?provinceId=" + d + "&timestamp=" + new Date() + "&callback=?",
                dataType: "jsonp",
                complete: function() {
                    provinceSwitchProvince(d, c, b)
                }
            })
        } else {
            provinceSwitchProvince(d, c, b)
        }
    }
};

function setAddressCity(e, a) {
    var g = jQuery.cookie("provinceId");
    var c = {};
    if (a) {
        c.targetUrl = a
    }
    jQuery.cookie("provinceId", e, {
        domain: no3wUrl,
        path: "/",
        expires: 800
    });
    var d;
    if (typeof siteFlag != "undefined" && siteFlag == 1) {
        var b = YHDPROVINCE.getOppositeDomain();
        var f = false;
        jQuery.ajax({
            url: b + "/header/addressChange.do?provinceId=" + e + "&timestamp=" + new Date() + "&callback=?",
            dataType: "jsonp",
            complete: function() {
                f = true;
                provinceSwitchProvince(e, g, c)
            }
        });
        if (d) {
            clearTimeout(d)
        }
        d = setTimeout(function() {
            if (!f) {
                provinceSwitchProvince(e, g)
            }
        }, 300)
    } else {
        provinceSwitchProvince(e, g, c)
    }
}

function provinceSwitchProvince(a, b, c) {
    moveCartItem(a, b, c)
}

function setAddressCityback(c) {
    var d = null;
    if (c && c.targetUrl) {
        d = c.targetUrl;
        window.location.href = d;
        return
    }
    if (currSiteId == 2) {
        addTrackPositionToCookie("1", "YW_Province")
    }
    var b = window.location.href;
    if (b.indexOf("merchantID=") != -1) {
        b = b.substring(0, b.indexOf("merchantID=") - 1);
        window.location.href = b;
        return
    }
    if (b.indexOf("merchant=") != -1) {
        b = b.substring(0, b.indexOf("merchant=") - 1);
        window.location.href = b;
        return
    }
    if (b.indexOf("/tuangou/") != -1) {
        if (b.indexOf("/tuangou/myGroupon.do") != -1) {
            window.location.href = b
        }
        return
    }
    if (b.indexOf("openProvincePage=") != -1) {
        b = b.substring(0, b.indexOf("openProvincePage=") - 1);
        window.location.href = b;
        return
    }
    if (b.indexOf("/cart/cart.do?action=view") != -1) {
        window.location.href = "/cart/cart.do?action=view";
        return
    }
    var p = /^\S*product\/\d+_?\d+/;
    if (b.match(p)) {
        if (b.indexOf("_") != -1) {
            b = b.substring(0, b.indexOf("_"))
        } else {
            if (b.indexOf("#") != -1) {
                var t = b.indexOf("#");
                b = b.substring(0, t)
            }
        }
        window.location.href = b;
        return
    }
    var r = /^(http:\/\/){0,1}([^\/]+\/)[0-9]+\/([^\/]*)$/;
    if (b.match(r)) {
        b = b.replace(r, "$1$2$3");
        window.location.href = b;
        return
    }
    var n = /^(http:\/\/){0,1}([^\/]+\/)([^\/]*)$/;
    if (b.match(n)) {
        window.location.href = b;
        return
    }
    var j = /^(http:\/\/){0,1}[^\/]+\/channel\/[0-9]+_[0-9]+\/$/;
    if (b.match(j)) {
        b = b.substring(0, b.lastIndexOf("_"));
        window.location.href = b;
        return
    }
    var a = /^(http:\/\/){0,1}[^\/]+\/cms\/view.do\?topicId=[0-9]+&merchant=[0-9]+$/;
    if (b.match(a)) {
        b = b.substring(0, b.lastIndexOf("&merchant"));
        window.location.href = b;
        return
    }
    var i = /^(http:\/\/){0,1}shop.yihaodian.com\/[^\/^_^\.]+\/[0-9]+\/{0,1}(\?[^\/]+)*$/;
    if (b.match(i)) {
        window.location.href = b;
        return
    }
    var g = /^(http:\/\/){0,1}www.yihaodian.com\/brand\/[0-9]+\/{0,1}(\?[^\/]+)*$/;
    if (b.match(g)) {
        window.location.href = b;
        return
    }
    var h = /^(http:\/\/){0,1}[^\/]+\/try\/[0-9]+\/{0,1}(\?[^\/]+)*$/;
    if (b.match(h)) {
        if (b.lastIndexOf("/") == b.length - 1) {
            b = b.substring(0, b.lastIndexOf("/"))
        }
        b = b.substring(0, b.lastIndexOf("/"));
        window.location.href = b;
        return
    }
    var k = /^(http:\/\/){0,1}[^\/]+\/try\/[0-9]+_[0-9]+\/{0,1}(\?[^\/]+)*$/;
    if (b.match(k)) {
        b = b.substring(0, b.lastIndexOf("_")) + "_0/";
        window.location.href = b;
        return
    }
    var e = /^(http:\/\/){0,1}www.yihaodian.com\/S-theme\/[0-9]+\/{0,1}(\?[^\/]+)*$/;
    if (b.match(e)) {
        window.location.href = b;
        return
    }
    var o = /^(http:\/\/){0,1}www.yihaodian.com\/ctg\/s2\/c([0-9]*)-([^?^\/]*)\/([0-9]*)\/$/;
    if (b.match(o)) {
        if (b.lastIndexOf("/") == b.length - 1) {
            b = b.substring(0, b.lastIndexOf("/"))
        }
        b = b.substring(0, b.lastIndexOf("/") + 1);
        window.location.href = b;
        return
    }
    var s = /^(http:\/\/){0,1}search.yihaodian.com\/s2\/c([0-9]*)-([^?^\/]*)\/k([^?^\/]*)\/([0-9]*)\/$/;
    if (b.match(s)) {
        if (b.lastIndexOf("/") == b.length - 1) {
            b = b.substring(0, b.lastIndexOf("/"))
        }
        b = b.substring(0, b.lastIndexOf("/") + 1);
        window.location.href = b;
        return
    }
    var q = /^(http:\/\/){0,1}channel\.[^\/]+\/[^\/^_^\.]+(\/[^\/^\.]+){0,1}\/[0-9]+\/{0,1}(\?[^\/]+){0,1}(#[^\/]+)*$/;
    if (b.match(q)) {
        if (b.indexOf("#") != -1) {
            b = b.substring(0, b.indexOf("#"))
        }
        if (b.indexOf("?") != -1) {
            var m = b.substring(b.indexOf("?"));
            var f = b.substring(0, b.indexOf("?"));
            if (b.lastIndexOf("/") == b.length - 1) {
                f = f.substring(0, f.lastIndexOf("/"));
                m = "/" + m
            }
            f = f.substring(0, f.lastIndexOf("/"));
            b = f + m
        } else {
            if (b.lastIndexOf("/") == b.length - 1) {
                b = b.substring(0, b.lastIndexOf("/"))
            }
            b = b.substring(0, b.lastIndexOf("/"))
        }
        window.location.href = b;
        return
    }
    if (b.indexOf("confirmOrder") != -1 && b.indexOf("saveOrder") != -1) {
        window.location.href = YHDPROVINCE.getCurentDomain();
        return
    }
    var l = URLPrefix.search + "/s/";
    if (b.substr(0, l.length) == l) {
        var p = /-p\d{0,3}/;
        if (b.match(p)) {
            b = b.replace(p, "-p1");
            window.location.href = b;
            return
        }
    }
    window.location.reload()
}

function moveCartItem(f, c, b) {
    var e = 1;
    var a = {};
    var d = {};
    var h = [];
    if (typeof b != "undefined" && b) {
        if (typeof b.isSetAddress != "undefined" && b.isSetAddress) {
            if (b.isSetAddress == 0) {
                e = b.isSetAddress
            }
        }
        if (typeof b.callback != "undefined" && b.callback) {
            a = b.callback;
            if (typeof a.func != "undefined" && a.func) {
                d = a.func
            }
            if (typeof a.args != "undefined" && a.func) {
                h = a.args
            }
        }
    }
    jQuery.getJSON(oppositeDomain + "/cart/globalMoveCartItem.do?provinceId=" + f + ((c) ? "&oldProvinceId=" + c : "") + "&timestamp=" + new Date().getTime() + "&callback=?", function(i) {});
    var g = YHDPROVINCE.getCurentDomain();
    jQuery.getJSON(g + "/cart/globalMoveCartItem.do?provinceId=" + f + ((c) ? "&oldProvinceId=" + c : "") + "&timestamp=" + new Date().getTime() + "&callback=?", function(i) {
        if (typeof e != "undefined" && e != 0) {
            setAddressCityback(b)
        }
        if (typeof d != "undefined" && typeof d == "function") {
            d.apply(this, h)
        }
    })
}

function initProvince() {
    var b = jQuery.cookie("provinceId");
    if (b && b > 0) {
        jQuery("#currProvince").text(YHDPROVINCE.proviceObj["p_" + b]).show();
        var a = jQuery("#weibo");
        if (b == 2) {
            a.attr("href", "http://weibo.com/yihaodianbeijing")
        } else {
            if (b == 20) {
                a.attr("href", "http://weibo.com/yihaodianguangzhou")
            } else {
                a.attr("href", "http://weibo.com/yihaodian")
            }
        }
    } else {
        if (jQuery("#p_1")[0]) {
            showProvinces()
        } else {
            showProvincesV2()
        }
    }
}

function closeProvinces(a) {
    if (a <= 0) {
        a = 1
    }
    var b = jQuery("#currProvince").text();
    if (b == "") {
        setAddressCity(a)
    } else {
        jQuery("#allProvinces").hide()
    }
}

function showProvinces() {
    var a = YHDPROVINCE.getCurentDomain();
    var b = a + "/header/selectProvincebox.do?timestamp=" + new Date().getTime() + "&callback=?";
    jQuery.getJSON(b, function(d) {
        if (!d.ERROR && d.value) {
            jQuery("#provinceboxDiv").html(d.value);
            jQuery("#allProvinces").jqm({
                overlay: 50,
                closeClass: "jqmClose",
                trigger: ".jqModal",
                overlayClass: "pop_win_bg",
                modal: true,
                toTop: true
            }).jqmShow().jqmAddClose(".popwinClose")
        }
        jQuery.getJSON(a + "/header/cartIsEmpty.do?callback=?", function(e) {
            if ("no" == e.value) {
                jQuery("#provincesPoptips").show()
            } else {
                jQuery("#provincesPoptips").hide()
            }
        });
        if (jQuery("#allProvinces")) {
            var c = jQuery("#allProvinces").find("#currentProvinceName");
            if (c) {
                YHDPROVINCE.getProvinceName(c.attr("proviceId"))
            }
        }
    })
}
YHDPROVINCE.checkProviceIsYhd = function() {
    if ((typeof currSiteId != "undefined" && currSiteId == 1) && (typeof currSiteType != "undefined" && currSiteType == 1)) {
        return true
    } else {
        return false
    }
};

function showProvincesV2() {
    if (YHDPROVINCE.checkProviceIsYhd()) {
        if (jQuery.cookie("provinceId")) {
            YHDPROVINCE.headerSelectProvince();
            return
        }
    }
    var a = YHDPROVINCE.getCurentDomain();
    var b = a + "/header/selectProvinceboxV2.do?timestamp=" + new Date().getTime() + "&callback=?";
    jQuery.getJSON(b, function(c) {
        if (!c.ERROR) {
            YHDPROVINCE.processProvince(c)
        }
    })
}
YHDPROVINCE.processProvince = function(b) {
    if (YHDPROVINCE.checkProviceIsYhd()) {
        if (!jQuery.cookie("provinceId")) {
            YHDPROVINCE.chooseProvincePop(b)
        }
    } else {
        jQuery("#provinceboxDiv").html(YHDPROVINCE.ywOryhmProvinceInfo(b));
        jQuery("#allProvinces").jqm({
            overlay: 50,
            closeClass: "jqmClose",
            trigger: ".jqModal",
            overlayClass: "pop_win_bg",
            modal: true,
            toTop: true
        }).jqmShow().jqmAddClose(".popwinClose");
        jQuery.getJSON(currDomain + "/header/cartIsEmpty.do?callback=?", function(c) {
            if ("no" == c.value) {
                jQuery("#provincesPoptips").show()
            } else {
                jQuery("#provincesPoptips").hide()
            }
        });
        if (jQuery("#allProvinces")) {
            var a = jQuery("#allProvinces").find("#currentProvinceName");
            if (a) {
                YHDPROVINCE.getProvinceName(a.attr("proviceId"))
            }
        }
    }
};
YHDPROVINCE.getProvinceName = function(a) {
    jQuery("#currentProvinceName").html("<strong>" + jQuery("#p_" + a).text() + "站</strong> >>")
};
YHDPROVINCE.ywOryhmProvinceInfo = function(a) {
    var c = function() {
        var d = [];
        d.push("华东地区");
        d.push("华北东北");
        d.push("华南西南");
        d.push("华中西北");
        for (var f = 0; f < 4; f++) {
            var e = {};
            e.name = d[f];
            switch (f) {
                case 0:
                    e.value = [YHDPROVINCE.proviceObj.p_1, YHDPROVINCE.proviceObj.p_5, YHDPROVINCE.proviceObj.p_6, YHDPROVINCE.proviceObj.p_13, YHDPROVINCE.proviceObj.p_16];
                    e.index = ["1", "5", "6", "13", "16"];
                    break;
                case 1:
                    e.value = [YHDPROVINCE.proviceObj.p_2, YHDPROVINCE.proviceObj.p_3, YHDPROVINCE.proviceObj.p_4, YHDPROVINCE.proviceObj.p_32, YHDPROVINCE.proviceObj.p_8, YHDPROVINCE.proviceObj.p_9, YHDPROVINCE.proviceObj.p_10, YHDPROVINCE.proviceObj.p_11];
                    e.index = ["2", "3", "4", "32", "8", "9", "10", "11"];
                    break;
                case 2:
                    e.value = [YHDPROVINCE.proviceObj.p_20, YHDPROVINCE.proviceObj.p_21, YHDPROVINCE.proviceObj.p_22, YHDPROVINCE.proviceObj.p_14, YHDPROVINCE.proviceObj.p_12, YHDPROVINCE.proviceObj.p_7, YHDPROVINCE.proviceObj.p_23, YHDPROVINCE.proviceObj.p_24, YHDPROVINCE.proviceObj.p_25];
                    e.index = ["20", "21", "22", "14", "12", "7", "23", "24", "25"];
                    break;
                case 3:
                    e.value = [YHDPROVINCE.proviceObj.p_18, YHDPROVINCE.proviceObj.p_19, YHDPROVINCE.proviceObj.p_17, YHDPROVINCE.proviceObj.p_15, YHDPROVINCE.proviceObj.p_26, YHDPROVINCE.proviceObj.p_27, YHDPROVINCE.proviceObj.p_28, YHDPROVINCE.proviceObj.p_30, YHDPROVINCE.proviceObj.p_29];
                    e.index = ["18", "19", "17", "15", "26", "27", "28", "30", "29"];
                    break
            }
            YHDPROVINCE.provinceMap.put(f, e)
        }
    };
    var b = function(f) {
        var n = f.ipProvinceId != "undefined" ? f.ipProvinceId : "1";
        var l = f.ip ? f.ip : "";
        var k = f.ipProvinceIdStr ? f.ipProvinceIdStr : "";
        var h = f.provinceId;
        YHDPROVINCE.provinceMap = new YHDOBJECT.Map();
        c();
        var d = [];
        d.push('<div class="ap_area" id="allProvinces" style="display:none">');
        d.push('<div class="a_title"><a href="###" onclick="javascript:closeProvinces(' + n + ');return false;" class="fr popwinClose" >关闭</a>请选择您的收货省份</div>');
        for (var g = 0; g < 4; g++) {
            if (g == 0) {
                d.push('<dl class="first">')
            } else {
                d.push("<dl>")
            }
            var m = YHDPROVINCE.provinceMap.get(g);
            d.push("<dt>" + m.name + "</dt>");
            d.push("<dd>");
            for (var e = 0; e < m.value.length; e++) {
                d.push('<a id="p_' + m.index[e] + '" href="javascript:setAddressCity(' + m.index[e] + ')"' + (h == m.index[e] ? ' class="selected"' : "") + " >" + m.value[e] + "</a>")
            }
            d.push("</dd>");
            d.push("</dl>")
        }
        d.push('<p  id="provincesPoptips" class="poptips" style="display:none">因各省份所售商品不同，如果您切换省份，部分商品可能会从购物车中移除</p>');
        d.push(' <p class="ip_tips">');
        if (n != 0) {
            d.push('<span class="fr">请进入<a href="javascript:setAddressCity(' + n + ')  id="currentProvinceName" proviceId=' + n + "></a></span>")
        }
        if (l) {
            d.push("您的IP地址是： " + l + "  " + k ? k : "")
        }
        d.push("</p>");
        d.push("</div>");
        return d.join("")
    };
    return b(a)
};
YHDPROVINCE.yhdCommonProvinceInfo = function(b, a) {
    a.push('<li>A<a id="p_13" href="javascript:void(0);">安徽</a></li>');
    a.push('<li>B<a id="p_2" href="javascript:void(0);">北京</a></li>');
    a.push('<li>C<a id="p_7" href="javascript:void(0);">重庆</a></li>');
    a.push('<li>G<a id="p_20" href="javascript:void(0);">广东</a><a id="p_21" href="javascript:void(0);">广西</a><a id="p_23" href="javascript:void(0);">贵州</a><a id="p_27" href="javascript:void(0);">甘肃</a></li>');
    a.push('<li>F<a id="p_14" href="javascript:void(0);">福建</a></li>');
    a.push('<li>H<a id="p_4" href="javascript:void(0);">河北</a><a id="p_11" href="javascript:void(0);">黑龙江</a><a id="p_22" href="javascript:void(0);">海南</a><a id="p_18" href="javascript:void(0);">湖北</a><a id="p_19" href="javascript:void(0);">湖南</a><a id="p_17" href="javascript:void(0);">河南</a></li>');
    a.push('<li>J<a id="p_5" href="javascript:void(0);">江苏</a><a id="p_10" href="javascript:void(0);">吉林</a><a id="p_15" href="javascript:void(0);">江西</a></li>');
    a.push('<li>L<a id="p_9" href="javascript:void(0);">辽宁</a></li>');
    a.push('<li>N<a id="p_8" href="javascript:void(0);">内蒙古</a><a id="p_30" href="javascript:void(0);">宁夏</a></li>');
    a.push('<li>Q<a id="p_28" href="javascript:void(0);">青海</a></li>');
    a.push('<li>S<a id="p_1" href="javascript:void(0);">上海</a><a id="p_16" href="javascript:void(0);">山东</a><a id="p_32" href="javascript:void(0);">山西</a><a id="p_12" href="javascript:void(0);">四川</a><a id="p_26"  href="javascript:void(0);">陕西</a></li>');
    a.push('<li>T<a id="p_3" href="javascript:void(0);">天津</a></li>');
    a.push('<li>X<a id="p_25" href="javascript:void(0);">西藏</a><a id="p_29" href="javascript:void(0);">新疆</a></li>');
    a.push('<li>Y<a id="p_24" href="javascript:void(0);">云南</a></li>');
    a.push('<li>Z<a id="p_6" href="javascript:void(0);">浙江</a></li>')
};
YHDPROVINCE.headerSelectProvince = function() {
    var a = $("#headerAllProvince"),
        c = $("#currProvince");
    if ($.trim(a.html()).length == 0) {
        YHDPROVINCE.yhdExistsProvinceInfo(a)
    }
    a.toggle();
    c.toggleClass("fold");
    $("#headerAllPvcClose").click(function() {
        b()
    });
    a.find("a").click(function() {
        b();
        c.text($(this).text());
        var d = $(this).attr("id").split("_")[1];
        setAddressCity(d);
        return false
    });

    function b() {
        c.removeClass("fold");
        a.hide()
    }
};
YHDPROVINCE.yhdExistsProvinceInfo = function(b) {
    var a = [];
    a.push('<li><h4><i id="headerAllPvcClose"></i>请根据您的收货地址选择</h4></li>');
    YHDPROVINCE.yhdCommonProvinceInfo(null, a);
    b.html(a.join(""))
};
YHDPROVINCE.yhdExistProvinceHoverEvent = function() {
    if (jQuery("#headerSelectProvince")[0] && currSiteId == 1) {
        var a;
        jQuery("#headerSelectProvince").hover(function() {
            a = setTimeout(function() {
                showProvincesV2();
                jQuery("#currProvince").addClass("hd_fold")
            }, 200)
        }, function() {
            if (a) {
                clearTimeout(a)
            }
            var c = jQuery("#headerAllProvince"),
                b = jQuery("#currProvince");
            b.removeClass("fold");
            b.removeClass("hd_fold");
            c.hide()
        })
    }
};
YHDPROVINCE.yhdNoExistsProvinceInfo = function(b) {
    var a = [];
    a.push('<div class="province_box" id="provinceBox">');
    a.push('<div class="province_title">');
    a.push("<h4>欢迎来到1号店</h4>");
    a.push("<p>目前我们提供31个地区的配送服务,请根据您的收货地址选择站点。</p>");
    a.push("</div>");
    a.push('<div class="province_select">');
    a.push('<div class="province_input">');
    a.push('<div class="province_input_con">');
    a.push('<span id="selectProvince" class="notsure">请选择</span>');
    a.push('<ul id="allProvinceSelect" class="provinceList">');
    YHDPROVINCE.yhdCommonProvinceInfo(b, a);
    a.push("</ul>");
    a.push("送货至");
    a.push("</div>");
    a.push("您的商品将会：");
    a.push("</div>");
    a.push('<p><button id="startShopping" class="disabled">开始购物<span></span></button></p>');
    a.push("</div>");
    a.push("</div>");
    yhdLib.popwin({
        fix: false,
        popcontentstr: a.join("")
    })
};
YHDPROVINCE.chooseProvincePop = function(j) {
    YHDPROVINCE.yhdNoExistsProvinceInfo(j);
    var e = j.ipProvinceId != "undefined" && j.ipProvinceId ? j.ipProvinceId : "1";
    var a = j.ipProvinceIdStr != "undefined" ? j.ipProvinceIdStr : "上海";
    var d = -1;
    var f = false,
        b = $("#provinceboxDiv"),
        i = $("#selectProvince"),
        c = $("#allProvinceSelect"),
        g = $("#startShopping");

    function h(l, k) {
        d = l;
        i.removeClass("notsure fold").html(k);
        $("#currProvince").html(k).show();
        c.hide();
        g.removeClass("disabled")
    }
    if (e && a) {
        f = true;
        h(e, a)
    }
    if (!f) {
        i.addClass("notsure");
        g.addClass("disabled")
    }
    i.click(function() {
        var k = $(this);
        if (!k.hasClass("fold")) {
            k.addClass("notsure fold");
            c.show();
            return false
        }
    });
    c.click(function() {
        return false
    });
    c.find("a").click(function() {
        f = true;
        h($(this).attr("id").split("_")[1], $(this).text())
    });
    $("#provinceBox").click(function() {
        if (i.hasClass("fold")) {
            c.hide();
            i.removeClass("fold");
            if (f) {
                i.removeClass("notsure")
            }
        }
    });
    g.click(function() {
        if ($(this).hasClass("disabled")) {
            return
        }
        b.hide();
        if (d != -1) {
            setAddressCity(d)
        }
    })
};
jQuery(document).ready(function() {
    if (isIndex != 1) {
        initProvince()
    }
    YHDPROVINCE.yhdExistProvinceHoverEvent()
});
var loli = {
    _loli: loli
};
(function(c) {
    var d = window.loli || (window.loli = {});
    d.delay = function(t, b, n, r, a) {
        var p = "";
        var s = a || 200;
        var q = s - 50;
        var m;
        c(t)[b](function() {
            var e = c(this);
            var f = true;
            if (n) {
                var f = n.call(e)
            }
            if (!(f == false)) {
                m = setTimeout(function() {
                    o.call(e)
                }, s);
                p = new Date().getTime()
            }
        });

        function o() {
            if ((new Date().getTime() - p) >= q) {
                if (r) {
                    r.call(this)
                }
                p = new Date().getTime()
            }
        }
    }
})(jQuery);

function addTrackerToEvent(d, f) {
    var e = "tk";
    if (f) {
        e = f
    }
    if (d instanceof jQuery) {
        d.find("a[" + e + "]").click(function() {
            var a = $(this),
                b = a.attr(e);
            if (b) {
                addTrackPositionToCookie("1", b)
            }
        })
    } else {
        $(d + " a[" + e + "]").each(function(b) {
            var a = this;
            $(a).click(function() {
                addTrackPositionToCookie("1", $(a).attr(e))
            })
        })
    }
};
(function(c) {
    var d = function(a) {
        var g = a,
            b = URLPrefix.busystock ? URLPrefix.busystock : "http://busystock.i.yihaodian.com",
            h = "/busystock/restful/truestock";
        _setting = {
            attr: "productid",
            busystock_url: b + h,
            busystockAttr: "productIds",
            lazyLoadDelay: 500,
            priceCounter: 30,
            load: true,
            maxNum: 200,
            oneOffLoad: false,
            indexLoad: false,
            scrollLoad: true,
            hfix: 100,
            callbackHtml: null
        };
        c.extend(_setting, g);
        this.param = _setting
    };
    d.prototype = {
        constructor: d,
        isBusy: false,
        doc: document,
        priceArray: [],
        lazyPrice: function(k, l) {
            var a = this,
                o = a.param;
            if (l) {
                a.param = c.extend(o, l)
            }
            var b = k,
                m = o.attr,
                n = o.busystock_url,
                p = o.maxNum;
            if (b instanceof c) {
                a.priceArray = k.find("[" + m + "]").get()
            } else {
                if (c.isArray(b)) {
                    a.priceArray = b
                } else {
                    a.priceArray = c(k).find("[" + m + "]").get()
                }
            } if (o.oneOffLoad) {
                a._flushPrice(a.priceArray, m, n, o.busystockAttr, p);
                return k
            }
            if (o.indexLoad) {
                a._lazyPrice(a.imgArray, o)
            }
            if (o.scrollLoad) {
                a._iniLazy(function() {
                    if (a.priceArray.length == 0) {
                        return k
                    }
                    a._lazyPrice(a.priceArray, o)
                })
            }
            if (o.load) {
                a._loadPrice()
            }
            return k
        },
        _loadPrice: function() {
            var a = this,
                n = a.param,
                b = n.attr,
                p = n.busystock_url,
                k = n.busystockAttr,
                o = n.maxNum,
                l = n.lazyLoadDelay,
                m = n.priceCounter;
            (function(h, i, f, j, e, s, t) {
                var g = setInterval(function() {
                    if (h.isBusy) {
                        return false
                    }
                    var r = h.priceArray;
                    var q = r.length;
                    if (q > t) {
                        h._priceLoad(r, i, f, j, 0, t, e)
                    } else {
                        if (q > 0) {
                            h._priceLoad(r, i, f, j, 0, q, e)
                        } else {
                            clearInterval(g)
                        }
                    }
                }, s)
            })(a, b, p, k, o, l, m)
        },
        _lazyPrice: function(o, q) {
            var p = q.attr,
                b = o.length,
                s = q.busystock_url,
                t = q.busystockAttr,
                r = q.maxNum,
                n = this,
                m = 0;
            n.isBusy = true;
            var a = n._pageTop() + q.hfix;
            n._priceLoad(o, p, s, t, m, b, r, a);
            n.isBusy = false
        },
        _priceLoad: function(x, u, A, B, v, a, z, b) {
            var i = this,
                t = x.length;
            if (t == 0) {
                return
            }
            var r = new Array();
            if (b) {
                for (var y = v; y < a; y++) {
                    var w = c(x[y]);
                    if (w.offset().top < b) {
                        r.push(w);
                        delete x[y]
                    }
                }
            } else {
                for (var y = v; y < a; y++) {
                    var w = c(x[y]);
                    r.push(w);
                    delete x[y]
                }
            }
            i._flushPrice(r, u, A, B, z);
            var s = new Array();
            for (var y = 0; y < x.length; y++) {
                if (x[y] != null) {
                    s.push(x[y])
                }
            }
            i.priceArray = s
        },
        _iniLazy: function(b) {
            var a = this;
            window.scrollTo(0, 0);
            c(window).bind("scroll", function() {
                if (!a.isBusy) {
                    b()
                } else {}
            })
        },
        _pageTop: function() {
            var a = this,
                b = a.doc,
                f = b.documentElement;
            return f.clientHeight + Math.max(f.scrollTop, b.body.scrollTop)
        },
        _flushPrice: function(L, E, K, j, z) {
            var C = this,
                b = C.param,
                B = b.callbackHtml;
            if (L && L.length > 0) {
                var F = L.length,
                    e = 0,
                    a, G = 1;
                if (F < z) {
                    a = F
                } else {
                    G = (F - 1) / z + 1
                }
                var H = jQuery.cookie("provinceId");
                if (!H) {
                    return
                }
                var J = "?mcsite=" + currBsSiteId + "&provinceId=" + H;
                var I = {};
                for (var A = 0; A < G; A++) {
                    if (A > 0) {
                        e = z * A;
                        a = e + z;
                        if (a > F) {
                            a = F
                        }
                    }
                    I = {};
                    for (var y = e; y < a; y++) {
                        var D = jQuery(L[y]);
                        J += "&" + j + "=" + D.attr(E);
                        if (!I[D.attr(E)]) {
                            I[D.attr(E)] = []
                        }
                        I[D.attr(E)].push(D)
                    }
                    try {
                        jQuery.getJSON(K + J + "&callback=?", function(f) {
                            jQuery.each(f, function(k, h) {
                                var g = I[h.productId];
                                if (g) {
                                    jQuery.each(g, function(l, m) {
                                        if (B) {
                                            jQuery(m).html(B(h)).removeAttr(E)
                                        } else {
                                            if (currSiteId == 2) {
                                                jQuery(m).text("¥" + h.productPrice).removeAttr(E)
                                            } else {
                                                if (g) {
                                                    var n = "<strong>¥" + h.productPrice + "</strong>";
                                                    if (h.curPriceType && h.curPriceType == 2 && h.yhdPrice) {
                                                        n += "<del>¥" + h.yhdPrice + "</del>"
                                                    }
                                                    jQuery(m).html(n).removeAttr(E)
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        })
                    } catch (i) {}
                }
            }
        }
    };
    c.fn.extend({
        lazyPrice: function(a) {
            var b = new d();
            return b.lazyPrice(this, a)
        }
    })
})(jQuery);
(function(c) {
    var b = function(f) {
        var e = f,
            d = {
                lazyImg: {
                    ltime: "2000",
                    lnum: "5",
                    load: true,
                    indexLoad: false,
                    scrollLoad: true,
                    attr: "original",
                    wideAttr: null,
                    hfix: 100
                }
            };
        c.extend(d, e);
        this.param = d
    };
    b.prototype = {
        constructor: b,
        isBusy: false,
        doc: document,
        imgArray: [],
        wideAttr: null,
        lazyImg: function(d, h) {
            var i = this,
                e = i.param.lazyImg,
                g, f = d;
            if (h) {
                i.param.lazyImg = c.extend(e, h)
            }
            if (f instanceof c) {
                g = f
            } else {
                if (c.isArray(f)) {
                    f = c(f.join(","))
                } else {
                    f = c(f) || c("body")
                }
            } if (e.wideAttr) {
                wideAttr = e.wideAttr;
                i.imgArray = f.find("img[" + e.attr + "],img[" + wideAttr + "]")
            } else {
                i.imgArray = f.find("img[" + e.attr + "]")
            } if (e.indexLoad) {
                i._lazyImg(i.imgArray, e)
            }
            if (e.scrollLoad) {
                i._iniLazy(function() {
                    if (i.imgArray.length == 0) {
                        return g
                    }
                    i._lazyImg(i.imgArray, e)
                })
            }
            if (e.load) {
                i._loadImg(f)
            }
            return d
        },
        _loadImg: function(f) {
            var i = this,
                d = i.param.lazyImg,
                h = d.attr,
                g = d.ltime,
                e = d.lnum;
            (function(o, l, n, m, k) {
                var j = setInterval(function() {
                    if (o.isBusy) {
                        return false
                    }
                    var q = o.imgArray;
                    var p = q.length;
                    if (p > k) {
                        o._imgLoad(q, 0, k, n)
                    } else {
                        if (p > 0) {
                            o._imgLoad(q, 0, p, n)
                        } else {
                            clearInterval(j)
                        }
                    }
                }, m)
            })(i, f, h, g, e)
        },
        _lazyImg: function(k, e) {
            var i = e.attr,
                h = k.length,
                j = this,
                f = 0,
                g = 1;
            j.isBusy = true;
            var d = j._pageTop();
            j._imgLoad(j.imgArray, f, h, i, d, e.hfix);
            j.isBusy = false
        },
        _imgLoad: function(h, k, o, f, n, d) {
            var m = this;
            if (n) {
                for (var g = k; g < o; g++) {
                    var j = c(h[g]);
                    var e = jQuery(window).height() + d;
                    if (j.offset().top < (n + d) && (n - j.offset().top) < e) {
                        m._renderImg(j, f);
                        delete h[g]
                    }
                }
            } else {
                for (var g = k; g < o; g++) {
                    var j = c(h[g]);
                    m._renderImg(j, f);
                    delete h[g]
                }
            }
            var l = new Array();
            for (var g = 0; g < h.length; g++) {
                if (h[g] != null) {
                    l.push(h[g])
                }
            }
            m.imgArray = l
        },
        _renderImg: function(e, d) {
            var f = e;
            if (typeof wideAttr != "undefined" && wideAttr != null && f.attr(wideAttr)) {
                f.attr("src", f.attr(wideAttr));
                f.removeAttr(d)
            } else {
                f.attr("src", f.attr(d));
                f.removeAttr(d)
            }
        },
        _iniLazy: function(d) {
            var e = this;
            loli.delay(window, "scroll", function() {
                if (!e.isBusy) {
                    e.isBusy = true;
                    return true
                } else {
                    return false
                }
            }, function() {
                d()
            }, 50)
        },
        _pageTop: function() {
            var f = this,
                e = f.doc,
                d = e.documentElement;
            return d.clientHeight + Math.max(d.scrollTop, e.body.scrollTop)
        }
    };
    var a = new b();
    c.fn.extend({
        lazyImg: function(e) {
            var d = new b();
            return d.lazyImg(this, e)
        }
    })
})(jQuery);
(function(c) {
    var d = function(f) {
        var a = f,
            b = {
                activeLoadTime: 2000,
                load: true,
                activeLoadNum: 1,
                hfix: 100,
                callback: null,
                attr: "lazyLoad_textarea",
                flushPrice: true,
                flushPriceAttr: "productid",
                indexLoad: false,
                scrollLoad: true
            };
        c.extend(b, a);
        this.param = b
    };
    d.prototype = {
        constructor: d,
        doc: document,
        areaArray: [],
        lazyDom: function(i, j) {
            var b = this,
                a = b.param,
                h = i;
            if (j) {
                b.param = c.extend(a, j)
            }
            b.areaArray = b._getJqueryDomArray(h, a);
            if (a.indexLoad) {
                b._domScrollLoad(b.areaArray, a)
            }
            if (a.scrollLoad) {
                b._loadScrollDom(function() {
                    if (b.areaArray.length == 0) {
                        return
                    }
                    b._domScrollLoad(b.areaArray, a)
                })
            }
            if (a.load) {
                b._loadActiveDom(b.areaArray, a)
            }
        },
        _loadActiveDom: function(k, m) {
            var j = this,
                b = m,
                n = b.activeLoadTime,
                a = k;
            var l = setInterval(function() {
                var e = a.length;
                if (e == 0) {
                    clearInterval(l);
                    return
                }
                j._domActiveLoad(a, b)
            }, n)
        },
        _loadScrollDom: function(a) {
            loli.scroll(function() {
                a()
            }, 50)
        },
        _domScrollLoad: function(m, a) {
            var i = this,
                a = i.param,
                b = [];
            for (var n = 0, k = m.length; n < k; n++) {
                var l = i._getJqueryDom(m[n]);
                if (i.isInCurrScreen(l)) {
                    i._rendDom(l, a)
                } else {
                    b.push(l)
                }
            }
            i.areaArray = b
        },
        _domActiveLoad: function(l, b) {
            var o = this,
                m = b,
                i = l,
                n = i.length,
                p = Math.min(m.activeLoadNum, n);
            for (var a = 0; a < p; a++) {
                o._rendDom(o._getJqueryDom(i.shift()), m)
            }
        },
        _rendDom: function(a, q) {
            var l = a,
                o = q,
                p = o.attr,
                m = l.attr(p),
                b = c("#" + m),
                n = o.flushPrice,
                r = o.flushPriceAttr;
            l.html(b.val());
            l.removeAttr(p);
            if (n) {
                l.lazyPrice({
                    attr: r,
                    oneOffLoad: true
                })
            }
            if (o.callback) {
                o.callback.call(l)
            }
        },
        isInCurrScreen: function(o) {
            var m = this,
                l = o,
                r = m.doc,
                b = r.documentElement,
                n = m.param,
                q = n.hfix,
                p = Math.max(b.scrollTop, r.body.scrollTop),
                a = b.clientHeight + p;
            if (l) {
                return (l.offset().top < a + q) && (l.offset().top > p - q)
            }
            return false
        },
        _getJqueryDomArray: function(a, b) {
            var h = [],
                g = b.attr;
            if (a instanceof c) {
                h = a.find("[" + g + "]").get()
            } else {
                if (c.isArray(a)) {
                    h = a;
                    return h
                } else {
                    a = c(a);
                    h = a.find("[" + g + "]").get()
                }
            } if (h.length == 0) {
                if (a.attr(g)) {
                    h.push(a)
                }
            }
            return h
        },
        _getJqueryDom: function(a) {
            if (!a) {
                return a
            }
            if (a instanceof c) {
                return a
            }
            return c(a)
        }
    };
    c.fn.extend({
        lazyDom: function(a) {
            var b = new d();
            return b.lazyDom(this, a)
        }
    })
})(jQuery);
var YHDMINICART = YHDMINICART || {};

function addToCart(h, i, m, k, l, n) {
    var j = {};
    j.amount = k;
    j.isFloat = l;
    j.linkPosition = n;
    j.merchantId = m;
    addToCartNew(h, i, j)
}

function addToCartNew(j, k, l) {
    var m = l.amount;
    var o = l.isFloat;
    var i = l.linkPosition;
    var p = l.merchantId;
    var n = currDomain + "/cart/phone/isContractProduct.do?productId=" + k + "&merchantId=" + p + "&callback=?";
    jQuery.getJSON(n, function(b) {
        if (b.ERROR) {} else {
            if (b) {
                var a = parseInt(b.code);
                if (a == 1) {
                    addIphone4ToCart(j, k, p, m, o)
                } else {
                    if (jQuery("#validateProductId").length > 0) {
                        jQuery("#validateProductId").attr("value", k)
                    }
                    if (jQuery.cookie("prompt_flag") == null && jQuery("#buyPromptDiv").length > 0) {
                        YHD.popwinId("buyPromptDiv", "popwinClose");
                        jQuery("#validate").bind("click", function() {
                            doAddToCart(j, k, p, m, o, i)
                        })
                    } else {
                        doAddToCart(j, k, p, m, o, i)
                    }
                }
            }
        }
    })
}

function addIphone4ToCart(f, g, j, h, i) {
    if (jQuery("#validateProductId").length > 0) {
        jQuery("#validateProductId").attr("value", g)
    }
    if (jQuery.cookie("prompt_flag") == null && jQuery("#buyPromptDiv").length > 0) {
        YHD.popwinId("buyPromptDiv");
        jQuery("#validate").bind("click", function() {
            doAddIphone4ToCart(f, g, j, h)
        })
    } else {
        doAddIphone4ToCart(f, g, j, h)
    }
}

function doAddIphone4ToCart(f, g, e, h) {
    window.location.href = URLPrefix.productDetailHost + "/product/" + g + "_" + e
}

function doAddToCart(i, j, m, k, l, h) {
    if (isPrescriotionForCheckAddToCart(j)) {
        var n = parseInt(jQuery("#buyButton_" + j).attr("specialType"));
        YHD.alertPrescriotion(n, function() {
            processDoAddToCart(i, j, m, k, l, h)
        })
    } else {
        processDoAddToCart(i, j, m, k, l, h)
    }
}

function isPrescriotionForCheckAddToCart(f) {
    var d = false;
    if (jQuery("#buyButton_" + f).size() > 0) {
        var e = jQuery("#buyButton_" + f).attr("specialType");
        if (e != null && (parseInt(e) >= 14 && parseInt(e) <= 18)) {
            d = true
        }
    }
    return d
}

function processDoAddToCart(k, s, n, r, t, q) {
    var o = encodeURIComponent(document.referrer);
    var p = q ? q : "";
    if (t) {
        var l = currDomain + "/cart/addGlobalProduct2.do?productID=" + s + "&merchantId=" + n + "&productNum=" + r + "&pageRef=" + o + "&linkPosition=" + p + "&callback=?";
        jQuery.getJSON(l, function(a) {
            if (a.ERROR) {} else {
                floatCartByScrollBar(a)
            }
        })
    } else {
        var m = document.createElement("div");
        m.style.position = "absolute";
        m.id = "newDiv";
        document.body.appendChild(m);
        jQuery("#newDiv").html("<p align='center'><img src=" + imagePath + "/loading.gif /></p>");
        var l = currDomain + "/cart/addGlobalProduct2.do?productID=" + s + "&merchantId=" + n + "&productNum=" + r + "&pageRef=" + o + "&linkPosition=" + p + "&callback=?";
        jQuery.getJSON(l, function(a) {
            if (a.ERROR) {} else {
                if (a.code && a.code != "undefined" && a.code != "") {
                    if (a.code.indexOf("buyEGiftCard.do") > -1) {
                        window.location.href = currDomain + a.code
                    }
                }
                afterAddToCart(a)
            }
        }, k)
    }
}
var floatCartShowTime = 0;

function floatCartByScrollBar(j) {
    if (j.code && j.code != "undefined" && j.code != "") {
        if (j.code.indexOf("buyEGiftCard.do") > -1) {
            window.location.href = currDomain + j.code
        }
    }
    if (j.value.indexOf("addProductFailed") > -1) {
        var p = jQuery(window).width() / 2 + jQuery(window).scrollLeft() + "px";
        var l = jQuery(window).height() / 2 + jQuery(window).scrollTop() + "px";
        YHD.popwin(j.value, jQuery("#yhd_pop_win").width(), jQuery("#yhd_pop_win").height(), l, p)
    } else {
        var i = function() {
            if (floatCartShowTime) {
                clearTimeout(floatCartShowTime);
                floatCartShowTime = 0
            }
        };
        i();
        jQuery("#showMiniCart").show();
        floatCartShowTime = setTimeout(function() {
            jQuery("#showMiniCart").hide(1000);
            i()
        }, 2000);
        jQuery("#showMiniCart").mouseenter(i);
        reloadMiniCart(sliderMiniCart);
        var k = jQuery("#scrollCart");
        var m = jQuery("#headerNav").offset().top;
        var n = jQuery(window).scrollTop();
        if (k.length > 0 && n > m) {
            var o = function() {
                if (jQuery(window).scrollTop() <= m) {
                    jQuery(k).css({
                        position: "relative",
                        left: "auto",
                        right: "auto",
                        top: "auto"
                    })
                } else {
                    if (jQuery.browser.msie && jQuery.browser.version == "6.0") {
                        var a = jQuery(window).scrollTop() + 10;
                        jQuery(k).css("position", "absolute").css("right", 0).css("top", a)
                    } else {
                        jQuery(k).css({
                            right: 0,
                            top: "10px",
                            position: "fixed"
                        })
                    }
                }
            };
            o();
            jQuery(window).unbind("scroll", o);
            jQuery(window).bind("scroll", o)
        }
    }
}

function afterAddToCart(b) {
    jQuery("#newDiv").html(b.value);
    YHD.popwinId("newDiv", "popwinClose");
    if (jQuery("#addProductResult", b.w).size() > 0) {
        if ("success" == jQuery("#addProductResult", b.w).val()) {
            reloadMiniCart()
        }
    }
}

function buildCartNumber() {
    var b = getCartProductNum();
    jQuery("#in_cart_num").html(b)
}

function getCartProductNum() {
    var c = jQuery.cookie("cart_cookie_uuid");
    var d = 0;
    if (c) {
        d = parseInt(jQuery.cookie("cart_num")) > 999 ? "999+" : parseInt(jQuery.cookie("cart_num"))
    }
    return d ? d : 0
}

function loadMiniCart() {
    if (!jQuery("#in_cart_num").data("isLoaded")) {
        jQuery("#in_cart_num").data("isLoaded", true);
        reloadMiniCart(sliderMiniCart)
    } else {
        sliderMiniCart()
    }
}

function sliderMiniCart() {}

function reloadMiniCart(e) {
    var f = this;
    var d = currDomain + "/cart/ajaxGetGlobalMiniCartInfo.do?callback=?";
    jQuery.getJSON(d, function(a) {
        if (a && a.message == "success") {
            jQuery("#showMiniCart").css("height", "auto");
            afterLoadMiniCart(a.data);
            if (e && (typeof e == "function")) {
                e.apply(f, [a.data])
            }
        } else {
            afterLoadMiniCart()
        }
    })
}

function yhdSiteLoadMiniCart(u) {
    var r = jQuery("#showMiniCart");
    var v = "";
    var q;
    if (u && u.totalNum && u.items) {
        var o = parseInt(u.totalNeedPoint);
        var t = parseInt(u.totalNeedZhongxinPoint);
        var l = parseFloat(u.totalNeedMoney);
        var n = parseFloat(u.totalAmount) + l;
        n = n.toFixed(2);
        var v = '<div class="list_detail"><ul>';
        var s = u.currProvinceId;
        jQuery(u.items).each(function(g) {
            var b = this;
            var e = parseInt(b.itemType);
            var D = parseInt(b.warningType);
            var B = parseInt(b.pointBuyType);
            var C = b.hasPromoteLimitAttachedKey;
            var k = parseInt(b.promotionContentType);
            var j = b.promotionLevelId;
            var A = false;
            if (e == 0 && (k == 3 || k == 9 || k == 10)) {
                A = true
            }
            if (D > 0) {
                v += '<li id="mini_cart_li_' + g + '" class="miniSoldout">'
            } else {
                v += '<li id="mini_cart_li_' + g + '">'
            }
            var f = "YW_TOP_minicart";
            if (A) {
                var c = currDomain + "/promotion/detail.do?promotionId=" + b.promotionId + "&promotionLevelId=" + j + "&merchantId=" + b.merchantId;
                v += '<a traget="_blank" class="pro_img" href="' + c + '" onclick="addTrackPositionToCookie(\'' + 1 + "','" + f + '\');"><img alt="' + b.cnName + '" src="' + URLPrefix.statics + '/global/images/promotion_mix.jpg"></a>';
                v += '<a traget="_blank" class="pro_name"  href="' + c + '" onclick="addTrackPositionToCookie(\'' + 1 + "','" + f + "');\">" + b.cnName + "</a>"
            } else {
                v += '<a traget="_blank" class="pro_img" href="' + URLPrefix.productDetailHost + "/item/" + b.pmInfoId + "_" + s + '" onclick="addTrackPositionToCookie(\'' + 1 + "','" + f + '\');"><img alt="' + b.cnName + '" src="' + b.picture4040URL + '"></a>';
                v += '<a traget="_blank" class="pro_name"  href="' + URLPrefix.productDetailHost + "/item/" + b.pmInfoId + "_" + s + '" onclick="addTrackPositionToCookie(\'' + 1 + "','" + f + "');\">" + b.cnName + "</a>"
            } if (D <= 0) {
                v += '<span class="pro_price">';
                var i = parseInt(b.num);
                var a = b.totalPrice;
                a = a.toFixed(2);
                if (A) {
                    v += "&yen;" + b.totalPrice
                } else {
                    if (B && B > 0) {
                        var h = parseFloat(b.needPoint);
                        h = h.toFixed(0);
                        if (B == 1) {
                            v += h + '积分<p class="cart_gray">(' + chineseUrl + ")</p>"
                        } else {
                            if (B == 2) {
                                var d = b.needMoney;
                                v += "(" + h + "积分)<p>&yen;" + d + "</p>"
                            } else {
                                if (B == 3) {
                                    v += h + '积分<p class="cart_gray">(中信)</p>'
                                } else {
                                    if (B == 4) {
                                        v += '0<p class="cart_gray">(积分抽奖)</p>'
                                    } else {
                                        v += "&yen;" + a
                                    }
                                }
                            }
                        }
                    } else {
                        if (b.activityId != null && b.activityId != "0") {
                            v += "&yen;" + b.totalPrice
                        } else {
                            if (e == 3 && b.needPoint && b.needPoint > 0) {
                                var h = parseFloat(b.needPoint);
                                var d = b.totalPrice;
                                v += "(" + h + "积分)<p>&yen;" + d + "</p>"
                            } else {
                                v += "&yen;" + a
                            }
                        }
                    }
                }
            } else {
                v += "<span>已售完"
            }
            v += "</span>";
            v += '<div class="num_box">';
            if (D <= 0) {
                v += yhdMiniCart.loadModifyNumInfo(b)
            }
            if (!A) {
                if (B != 4 && (b.activityId == null || b.activityId == "0" || b.activityId == "-55")) {
                    if (D > 0) {
                        v += '<a href="javascript:void(0);" onclick="ajaxDeleteMiniCartItem(\'' + g + "','deleteWaringItem','" + b.productId + "','" + b.merchantId + "','" + b.promotionId + "','" + b.num + "');"
                    } else {
                        if (C && B == 0) {
                            v += '<a href="javascript:void(0);" onclick="ajaxDeleteMiniCartItem(\'' + g + "','deletePromote','" + b.productId + "','" + b.merchantId + "','" + b.promotionId + "','" + b.num + "');"
                        } else {
                            if (e == 3) {
                                v += '<a href="javascript:void(0);" onclick="ajaxDeleteMiniCartItem(\'' + g + "','deleteLandingpage','" + b.productId + "','" + b.merchantId + "','" + b.promotionId + "','" + b.num + "');"
                            } else {
                                v += '<a href="javascript:void(0);" onclick="ajaxDeleteMiniCartItem(\'' + g + "','deleteItem','" + b.productId + "','" + b.merchantId + "','" + b.promotionId + "','" + b.num + "');"
                            }
                        }
                    }
                    v += "return false;gotracker('2','YHD_TOP_delShop_" + g + "','" + b.productId + "')\">删除</a>"
                }
            }
            v += "</div>";
            v += "</li>"
        });
        v += "</ul>";
        var m = "合计";
        v += '<div class="checkout_box">';
        v += '<p><span class="fl">共<strong>' + u.totalNum + "</strong>件商品</span>" + m + "：<strong>&yen;" + n + "</strong></p>";
        v += '<a href="' + currDomain + '/cart/cart.do?action=view" class="checkout_btn">去结算</a>';
        v += "</div></div>";
        jQuery("#in_cart_num").text(parseInt(u.totalNum) > 999 ? "999+" : u.totalNum)
    } else {
        v = '<div class="minicart_empty">';
        jQuery("#in_cart_num").text("0");
        v += "您的购物车里还没有" + chineseUrl + "的商品，欢迎选购！";
        v += "</div></div>"
    }
    p(r, v);

    function p(a, b) {
        a.html(b);
        yhdMiniCart.bindMiniCartEvent();
        a.data("inani", false);
        if (typeof q != "undefined" && q) {
            clearTimeout(q)
        }
    }
}

function afterLoadMiniCart(b) {
    yhdSiteLoadMiniCart(b)
}

function ajaxDeleteMiniCartItem(l, j, k, p, o, m) {
    var n = currDomain;
    n = n + "/cart/ajax.do?action=delete&callback=?";
    var i;
    if (j == "deleteWaringItem") {
        i = {
            deleteWarningQueue: k,
            rd: Math.random()
        }
    } else {
        if (j == "deletePromote") {
            i = {
                deleteOverPromotionQueue: k,
                rd: Math.random()
            }
        } else {
            if (j == "deleteLandingpage") {
                i = {
                    deleteGiftQueue: "landingpage_" + o + "_0_" + p + "_" + k + "_" + m,
                    rd: Math.random()
                }
            } else {
                i = {
                    deleteQueue: k,
                    rd: Math.random()
                }
            }
        }
    }
    jQuery.getJSON(n, i, function(a) {
        reloadMiniCart()
    })
}
var yhdMiniCart = yhdMiniCart || {};
yhdMiniCart.Map = function() {
    var b = 0;
    this.entry = {};
    this.put = function(a, d) {
        if (!this.containsKey(a)) {
            b++
        }
        this.entry[a] = d
    };
    this.get = function(a) {
        if (this.containsKey(a)) {
            return this.entry[a]
        } else {
            return null
        }
    };
    this.remove = function(a) {
        if (delete this.entry[a]) {
            b--
        }
    };
    this.containsKey = function(a) {
        return (a in this.entry)
    };
    this.containsValue = function(a) {
        for (var d in this.entry) {
            if (this.entry[d] == a) {
                return true
            }
        }
        return false
    };
    this.values = function() {
        var a = [];
        for (var d in this.entry) {
            a.push(this.entry[d])
        }
        return a
    };
    this.keys = function() {
        var a = new Array(b);
        for (var d in this.entry) {
            a.push(d)
        }
        return a
    };
    this.size = function() {
        return b
    };
    this.clear = function() {
        this.entry = {};
        this.size = 0
    }
};
yhdMiniCart.urlMap = new yhdMiniCart.Map();
yhdMiniCart.ajaxQueue = new Array();
yhdMiniCart.loadModifyNumInfo = function(x) {
    var w = parseInt(x.landingNumLimit);
    var y = parseInt(x.currentStockNum);
    var s = parseInt(x.userLimitNum);
    var o = parseInt(x.totalLimitNum);
    var v = parseInt(x.promoteType);
    var B = parseInt(x.shoppingCountNum);
    var A = parseInt(x.promotionId);
    var r = 0;
    var p = parseInt(x.itemType);
    var t = parseInt(x.pointBuyType);
    if (p == 3) {
        r = 2
    } else {
        if (x.hasPromoteLimitAttachedKey) {
            r = 1
        } else {
            r = 0
        }
    }
    var u = y + "_" + s + "_" + o + "_" + B + "_" + w + "_" + v;
    var z = x.productId + "_" + x.merchantId + "_" + r + "_" + A;
    var q = "";
    if (t > 0 || (p == 4 || p == 0) || (p == 3 && w == 1)) {
        q += '<b class="minusDisable"></b>';
        q += '<input type="text"  oriNum=' + x.num + ' class="minicart_num"  value=' + x.num + ' disabled="disabled" class="disable" />';
        q += '<b class="plusDisable"></b>'
    } else {
        if (x.num == 1) {
            q += '<b class="minusDisable"></b>'
        } else {
            q += '<b class="minus" ></b>'
        }
        q += '<input type="text"  oriNum=' + x.num + ' class="minicart_num" limitNum=' + u + "  value=" + x.num + " paramValue= " + z + " />";
        q += '<b class="plus" ></b>'
    }
    return q
};
yhdMiniCart.clickPlusCalSubTotal = function() {
    loli.delay(".plus", "click", function() {
        var b = this.siblings("input");
        return yhdMiniCart.ajaxNum(b, "increment")
    }, function() {
        yhdMiniCart.ajaxPost()
    }, 1000)
};
yhdMiniCart.clickMinusCalSubTotal = function() {
    loli.delay(".minus", "click", function() {
        var c = this.siblings("input");
        if (parseInt(c.val()) == 1) {
            var d = "输入的数量有误,应为[1-999]";
            yhdMiniCart.showWarningMsg(c, d);
            return false
        }
        return yhdMiniCart.ajaxNum(c, "decrement")
    }, function() {
        yhdMiniCart.ajaxPost()
    }, 1000)
};
yhdMiniCart.handCalSubTotal = function() {
    loli.delay("#showMiniCart ul li div input[type=text]", "keyup", function() {}, function() {
        yhdMiniCart.ajaxNum(this);
        yhdMiniCart.ajaxPost()
    }, 2000)
};
yhdMiniCart.ajaxNum = function(j, i) {
    if (i == "increment") {
        j.val(parseInt(j.val()) + 1)
    } else {
        if (i == "decrement") {
            j.val(parseInt(j.val()) - 1)
        }
    }
    var h = /^[1-9]\d{0,2}$/g;
    if (!j.val().match(h)) {
        var k = "输入的数量有误,应为[1-999]";
        yhdMiniCart.showWarningMsg(j, k);
        j.val(j.attr("oriNum"));
        return false
    }
    if (parseInt(j.val()) == parseInt(j.attr("oriNum"))) {
        return
    }
    var l = j.attr("paramValue");
    var n = l.split("_");
    var m = n[2];
    if (m == 2) {
        return yhdMiniCart.calLandingTotal(j)
    } else {
        return yhdMiniCart.calSubTotal(j)
    }
};
yhdMiniCart.ajaxPost = function() {
    yhdMiniCart.ajaxQueue = yhdMiniCart.urlMap.values();
    yhdMiniCart.urlMap.clear();
    yhdMiniCart.sendAjaxReq(yhdMiniCart.ajaxQueue)
};
yhdMiniCart.sendAjaxReq = function(g) {
    if (g.length == 0) {
        reloadMiniCart(sliderMiniCart);
        return
    }
    var f = g.shift();
    var e = f.url;
    var h = f.obj;
    jQuery.getJSON(e + "&callback=?", function(a) {
        if (a.code == 200) {
            yhdMiniCart.sendAjaxReq(g)
        } else {
            if (a.code == 401) {
                yhdPublicLogin.showLoginDiv(null, false);
                return false
            } else {
                yhdMiniCart.showWarningMsg(h, a.message);
                yhdMiniCart.sendAjaxReq(g)
            }
        }
    })
};
yhdMiniCart.calSubTotal = function(t) {
    var q = t.val();
    var v = /^[1-9]\d{0,2}$/g;
    if (!q.match(v)) {
        var x = "输入的数量有误,应为[1-999]";
        yhdMiniCart.showWarningMsg(t, x);
        t.val(t.attr("oriNum"));
        return false
    }
    if (parseInt(q) > 1) {
        yhdMiniCart.setMinusOperate(t, true)
    } else {
        if (parseInt(q) == 1) {
            yhdMiniCart.setMinusOperate(t, false)
        }
    }
    var y = t.attr("paramValue");
    var w = y.split("_");
    var s = parseInt(isNaN(w[0]) ? 0 : w[0]);
    var B = parseInt(isNaN(w[1]) ? 0 : w[1]);
    var r = parseInt(isNaN(w[2]) ? 0 : w[2]);
    var A = parseInt(isNaN(w[3]) ? 0 : w[3]);
    if (!yhdMiniCart.checkOverLimit(t)) {
        q = parseInt(t.val());
        yhdMiniCart.showMinusTips(t, q, r, s, B, A);
        var u = yhdMiniCart.calItemNum(s, B, r, q, A);
        u = u > 999 ? 999 : u;
        var z = currDomain + "/cart/ajaxEditNum.do?productId=" + s + "&num=" + u + "&merchantId=" + B;
        var p = s + "_" + B;
        var o = {};
        o.url = z;
        o.obj = t;
        yhdMiniCart.urlMap.put(p, o);
        return true
    }
    return false
};
yhdMiniCart.calLandingTotal = function(o) {
    var m = o.val();
    var p = /^[1-9]\d{0,2}$/g;
    if (!m.match(p)) {
        var s = "输入的数量有误,应为[1-999]";
        yhdMiniCart.showWarningMsg(o, s);
        o.val(o.attr("oriNum"));
        return false
    }
    if (parseInt(m) > 1) {
        yhdMiniCart.setMinusOperate(o, true)
    } else {
        if (parseInt(m) == 1) {
            yhdMiniCart.setMinusOperate(o, false)
        }
    }
    var t = o.attr("paramValue");
    var q = t.split("_");
    var n = q[0];
    var v = q[1];
    var u = q[3];
    if (!yhdMiniCart.checkOverLimit(o)) {
        m = o.val();
        var r = currDomain + "/cart/ajaxEditLandingPageNum.do?productId=" + n + "&num=" + m + "&merchantId=" + v + "&promotionId=" + u;
        var x = n + "_" + v;
        var w = {};
        w.url = r;
        w.obj = o;
        yhdMiniCart.urlMap.put(x, w)
    }
};
yhdMiniCart.checkOverLimit = function(C) {
    var z = parseInt(isNaN(C.val()) ? 0 : C.val());
    var D = C.attr("oriNum");
    var t = C.attr("paramValue");
    var r = t.split("_");
    var A = r[2];
    var G = C.attr("limitNum");
    var F = G.split("_");
    var v = parseInt(F[0]);
    var E = parseInt(F[1]);
    var x = parseInt(F[2]);
    var w = parseInt(F[3]);
    var y = parseInt(F[4]);
    var u = parseInt(F[5]);
    var H = "";
    var B = z;
    var s = false;
    switch (parseInt(A)) {
        case 0:
            if (v > 0) {
                if (z > v) {
                    H = "该商品库存有限，您最多只能购买" + v + "件";
                    B = v;
                    s = B == D
                } else {
                    if (w > 1 && z < w) {
                        H = "该商品[" + w + "件起购]";
                        B = w;
                        s = B == D
                    } else {
                        if (z > E && E > 0) {
                            H = "该商品[每人限购" + E + "件],超过则以" + chineseUrl + "价购买"
                        } else {
                            if (x > 0 && z > x && u == 5) {
                                H = "该商品[限购" + x + "件]";
                                B = x;
                                s = B == D
                            } else {
                                if (x > 0 && z > x) {
                                    H = "该商品[限购" + x + "件],超过则以" + chineseUrl + "价购买"
                                } else {
                                    H = ""
                                }
                            }
                        }
                    }
                }
            } else {
                B = 0;
                H = "该商品已下架或无库存"
            }
            break;
        case 1:
            if (v > 0) {
                if (z > v) {
                    H = "该商品库存有限，您最多只能购买" + v + "件";
                    B = v;
                    s = B == D
                }
            } else {
                B = 0;
                H = "该商品已下架或无库存"
            }
            break;
        case 2:
            if (y > 0 && z > y) {
                H = "该商品为特价商品，您最多只能购买" + y + "件";
                B = y;
                s = B == D
            } else {
                if (w > 1 && z < w) {
                    H = "该商品[" + w + "件起购]";
                    B = w;
                    s = B == D
                }
            }
            break
    }
    if (H && H.length > 0 && B > 0) {
        C.val(B);
        yhdMiniCart.showWarningMsg(C, H)
    }
    return s
};
yhdMiniCart.showMinusTips = function(n, x, v, m, u, t) {
    if (v != 0) {
        return
    }
    var o = parseInt(n.attr("oriNum"));
    var w = jQuery("input[paramValue='" + m + "_" + u + "_" + (v == 0 ? 1 : 0) + "_" + t + "']");
    if (x < o && w.size() > 0) {
        var r = n.attr("limitNum");
        var q = r.split("_");
        var p = parseInt(q[1]);
        var s = "该商品【" + (o == p ? "每人" : "") + "限购" + o + "件】，优先减去" + chineseUrl + "价商品";
        yhdMiniCart.showWarningMsg(n, s)
    }
};
yhdMiniCart.calItemNum = function(h, m, i, j, k) {
    var l = parseInt(j);
    var n = jQuery("input[paramValue='" + h + "_" + m + "_" + (i == 0 ? 1 : 0) + "_" + k + "']");
    if (n.size() > 0) {
        l += parseInt(n.val())
    }
    return l
};
yhdMiniCart.showWarningMsg = function(g, h) {
    var e = g.offset().top;
    var f = '<span class="tips_arrow1">&#9670;</span>';
    f += '<span class="tips_arrow1 tips_arrow2">&#9670;</span>';
    f += "<p>" + h + "</p>";
    jQuery(".ap_shopping_warning").html(f);
    jQuery(".ap_shopping_warning").css("top", e - $("#miniCart").offset().top - $(".ap_shopping_warning").outerHeight() - 4).fadeIn(500);
    clearTimeout();
    setTimeout(function() {
        jQuery(".ap_shopping_warning").fadeOut(500)
    }, 2000)
};
yhdMiniCart.bindMiniCartEvent = function() {
    yhdMiniCart.handCalSubTotal();
    yhdMiniCart.clickPlusCalSubTotal();
    yhdMiniCart.clickMinusCalSubTotal()
};
yhdMiniCart.setMinusOperate = function(d, c) {
    if (c) {
        d.siblings("b:eq(1)").removeClass("minusDisable");
        d.siblings("b:eq(1)").addClass("minus")
    } else {
        if (!c) {
            d.siblings("b:eq(1)").removeClass("minus");
            d.siblings("b:eq(1)").addClass("minusDisable")
        }
    }
};
var miniCart = function() {
    $("#miniCart").hover(function() {
        $(this).find("#showMiniCart").show()
    }, function() {
        $(this).find("#showMiniCart").hide()
    })
};

function initAllMiniCart() {
    ymInitMiniCart()
}

function ymInitMiniCart() {
    buildCartNumber();
    miniCart();
    if (!jQuery("#miniCart").size()) {
        return
    }
    jQuery("#miniCart").data("inani", false).mouseover(function(b) {
        if (jQuery(this).data("inani")) {
            return
        }
        jQuery(this).data("inani", true);
        loadMiniCart()
    })
}
jQuery(document).ready(function() {
    if (isIndex != 1) {
        initAllMiniCart()
    }
});
var suggestLength = 0;
var curSuggestIndex = -1;

function findNames(l, i, j, n) {
    var o = "0";
    if (jQuery("#leaf").size() > 0) {
        o = jQuery("#leaf").val()
    }
    var p = "";
    if (i) {
        p = i.keyCode;
        if (p == "116" || p == "17") {
            return
        }
    }
    var k = jQuery.trim(jQuery(l).val());
    if ((k != j || k == "") && p != "38" && p != "40") {
        if (k == "请输入关键词") {
            k = ""
        }
        var m = URLPrefix.search + "/get_new_keywords.do?keyword=" + encodeURIComponent(encodeURIComponent(k)) + "&leaf=" + o + "&flag=v1&callback=?";
        jQuery.getJSON(m, function(c) {
            if (c.ERROR) {} else {
                var a = false;
                var b = jQuery("#searchSuggest").html(c.value);
                if (k.replace(/\s+/g, "") == "" && c.value.length > 0) {
                    jQuery("#searchSuggest").addClass("hd_search_history")
                } else {
                    if (k != "" && c.value.length > 0) {
                        jQuery("#searchSuggest").removeClass("hd_search_history")
                    }
                }
                b.find("a").each(function() {
                    var d = jQuery(this).find("span").html();
                    if (d) {
                        jQuery(this).html(d);
                        jQuery(this).addClass(a ? "odd" : "even");
                        a = !a
                    }
                });
                if (k.replace(/\s+/g, "") == "" && c.value.length > 0) {
                    curSuggestIndex = -1;
                    jQuery("#searchSuggest").show();
                    searchListHover("#searchSuggest")
                } else {
                    loadComplete_findNames()
                }
            }
        })
    }
}

function _goSearch(e, q) {
    var p = jQuery(e);
    var v = q || window.event;
    var u = p.attr("original");
    if (v) {
        var b = document.createElement("input").webkitSpeech === undefined;
        if (!b) {
            var o = v.pageX;
            var a = p.outerWidth();
            var r = p.offset().left;
            var s = r + a - 25;
            var t = r + a;
            if (o >= s && o <= t) {
                return
            }
        }
    }
    if (p && p.size() > 0) {
        findNames(p.get(0), v, u, 1)
    }
}

function goSearch(b) {
    _goSearch("#keyword", b)
}

function findNamesByDiv(o, p, q, n, k) {
    var m = "0";
    if (jQuery("#leaf").size() > 0) {
        m = jQuery("#leaf").val()
    }
    var j = "";
    if (q) {
        j = q.keyCode
    }
    var l = jQuery.trim(jQuery(p).val());
    if ((l != n || l == "") && j != "38" && j != "40") {
        if (l == "请输入关键词") {
            l = ""
        }
        var r = URLPrefix.search + "/get_new_keywords.do?keyword=" + encodeURIComponent(encodeURIComponent(l)) + "&leaf=" + m + "&flag=v1&callback=?";
        jQuery.getJSON(r, function(b) {
            if (b.ERROR) {} else {
                var a = false;
                var c = jQuery(o).html(b.value);
                if (l.replace(/\s+/g, "") == "" && b.value.length > 0) {
                    jQuery(o).addClass("hd_search_history")
                } else {
                    if (l != "" && b.value.length > 0) {
                        jQuery(o).removeClass("hd_search_history")
                    }
                }
                c.find("a").each(function() {
                    var d = jQuery(this).find("span").html();
                    if (d) {
                        jQuery(this).html(d);
                        jQuery(this).addClass(a ? "odd" : "even");
                        a = !a
                    }
                });
                if (l.replace(/\s+/g, "") == "" && b.value.length > 0) {
                    curSuggestIndex = -1;
                    jQuery(o).show();
                    searchListHover(o)
                } else {
                    loadComplete_findNames(o)
                }
            }
        })
    }
}

function _goSearchByDiv(v, u, x) {
    var t = jQuery(v);
    var y = jQuery(u);
    var q = x || window.event;
    var e = t.attr("original");
    if (q) {
        var s = document.createElement("input").webkitSpeech === undefined;
        if (!s) {
            var w = q.pageX;
            var r = t.outerWidth();
            var z = t.offset().left;
            var a = z + r - 25;
            var b = z + r;
            if (w >= a && w <= b) {
                return
            }
        }
    }
    if (t && t.size() > 0) {
        findNamesByDiv(u, t.get(0), q, e, 1)
    }
}

function goSearchByDiv(b) {
    _goSearchByDiv("#fix_keyword", "#fix_searchSuggest", b)
}

function loadComplete_findNames(b) {
    if (!b) {
        b = "#searchSuggest"
    }
    suggestLength = jQuery(b + " li").length;
    curSuggestIndex = -1;
    if (suggestLength <= 1) {
        jQuery(b).hide()
    } else {
        jQuery(b).show();
        searchListHover(b)
    }
}

function searchListHover(c) {
    var d = $(c + " ul li");
    $("a[id=s_cart_btn]").hide();
    d.mouseenter(function() {
        var a = d.index(this);
        if ($(this).hasClass("haslist")) {
            $(this).addClass("select_haslist").siblings().removeClass("select_haslist select")
        } else {
            $(this).addClass("select").siblings().removeClass("select_haslist select")
        }
        curSuggestIndex = a
    });
    d.mouseleave(function() {
        $(this).removeClass("select select_haslist")
    });
    $("#choose_list dd").live("mouseover", function() {
        $(this).find("#s_cart_btn").show();
        return false
    });
    $("#choose_list dd").live("mouseout", function() {
        $(this).find("#s_cart_btn").hide();
        return false
    })
}

function searchRecommend(b) {
    if (b != null && b != "") {
        window.location = b
    }
}

function searchMe(z, p, q) {
    var x = null;
    var s = document.getElementById("recommendId");
    if (s) {
        x = s.value
    }
    var o = null;
    var v = document.getElementById("recommendName");
    if (v) {
        o = v.value
    }
    var t = jQuery("#keyword");
    if (!z) {
        z = t.val()
    } else {
        if (z instanceof jQuery) {
            t = z;
            z = t.val()
        }
    } if (z != null && jQuery.trim(z) != "") {
        var r = t.attr("original");
        if (r != null && r != "" && r != "请输入关键词") {
            if (r == z) {
                var u = t.attr("url");
                if (u != null && u != "") {
                    window.location = u;
                    return
                }
            }
        }
    } else {
        if ((isIndex == 1 && (typeof(indexFlag) != "undefined" && typeof(indexFlag) == "number" && indexFlag == 1))) {
            var w = t.parent("div").find("label")[0];
            if (w && (jQuery(w).css("display") == "block" || jQuery(w).css("display") == "inline")) {
                var u = t.attr("url");
                if (u != null && u != "") {
                    window.location = u;
                    return
                }
            }
        }
    } if (z != null && jQuery.trim(z) != "" && jQuery.trim(z) != "请输入关键词") {
        addKeywordHistory(z)
    } else {
        searchFocus(t.selector);
        hotKeywords_onDocumentReady(t.selector);
        var w = jQuery("#keyword").parent("div").find("label");
        if (w[0]) {
            indexReadAdv_hotKeywords_onDocumentReady()
        }
        return
    }
    z = z.replace(/\//gi, " ");
    var y = "0";
    if (jQuery("#leaf").size() > 0) {
        y = jQuery("#leaf").val()
    }
    var n = jQuery.cookie("provinceId");
    if (p != null && p != "0") {
        window.location = URLPrefix.search_keyword + "/s2/c" + p + "-" + q + "/k" + encodeURIComponent(encodeURIComponent(z)) + "/" + n + "/"
    } else {
        if (x != null && x != "") {
            window.location = URLPrefix.search_keyword + "/s2/c" + x + "-" + o + "/k" + encodeURIComponent(encodeURIComponent(z)) + "/" + n + "/"
        } else {
            window.location = URLPrefix.search_keyword + "/s2/c" + y + "-0/k" + encodeURIComponent(encodeURIComponent(z)) + "/" + n + "/"
        }
    }
}

function searchMeForBrand() {
    var d = jQuery("#keyword");
    var c = jQuery.trim(d.val());
    if (c == "" || c == "商品、品牌") {
        return
    }
    searchMe()
}

function cutString(d, c) {
    if (d == null || d.length <= c) {
        return d
    }
    return d.substring(0, c)
}

function addKeywordHistory(b) {
    if (typeof(b) == "undefined") {
        return
    }
    b = jQuery.trim(b);
    b = b.replace(/[,]/g, " ");
    b = b.replace(/[，]/g, " ")
}

function roll(k, t, l) {
    k = k || window.event;
    var n = k.keyCode;
    if (!t) {
        t = "#searchSuggest"
    }
    if (!l) {
        l = "#keyword"
    }
    suggestLength = jQuery(t + " li").length;
    var r = "";
    var s = "";
    if (jQuery(t + " ul li").size() > 0) {
        if (n == "38") {
            if (curSuggestIndex <= 0) {
                curSuggestIndex = suggestLength - 1
            } else {
                curSuggestIndex = curSuggestIndex - 1
            }
        } else {
            if (n == "40") {
                if (curSuggestIndex >= (suggestLength - 1)) {
                    curSuggestIndex = 0
                } else {
                    curSuggestIndex = curSuggestIndex + 1
                }
            }
        } if (n == "38" || n == "40") {
            var q = jQuery(t + " ul li");
            if ($(q).hasClass("haslist")) {
                $(q).addClass("select_haslist").siblings().removeClass("select_haslist select")
            } else {
                $(q).addClass("select").siblings().removeClass("select_haslist select")
            }
            var o = jQuery(t + "  ul li a[roll=true]").eq(curSuggestIndex).text();
            if (jQuery(t + " ul li").eq(curSuggestIndex).attr("id") != null && jQuery(t + " ul li").eq(curSuggestIndex).attr("id") != "") {
                var m = jQuery(t + "  ul li a").eq(0).text();
                jQuery(l).val(m);
                if (jQuery(t + " ul li ").eq(curSuggestIndex).attr("id") == "recom1") {
                    r = document.getElementById("recom1Id").value;
                    s = document.getElementById("recom1Name").value
                }
                if (jQuery(t + " ul li").eq(curSuggestIndex).attr("id") == "recom2") {
                    r = document.getElementById("recom2Id").value;
                    s = document.getElementById("recom2Name").value
                }
            } else {
                var p = jQuery("#keyword").parent("div").find("label");
                if (p[0]) {
                    p.hide()
                }
                jQuery(l).val(o)
            } if (document.getElementById("recommendId")) {
                document.getElementById("recommendId").value = r
            }
            if (document.getElementById("recommendName")) {
                document.getElementById("recommendName").value = s
            }
            $(".search_tips_result_new > ul > li").eq(curSuggestIndex).trigger("mouseover");
            $(".search_tips_result > ul > li").eq(curSuggestIndex).trigger("mouseover")
        }
    }
    if (n == "13") {
        if (r != "") {
            searchMe(jQuery(l).val(), r, s)
        } else {
            searchMe(jQuery(l).val(), "0", "0")
        }
    }
}

function selectSearchCategory(c, d) {
    jQuery("#searchCategory").html(d);
    jQuery("#leaf").val("0_" + c)
}

function emptySearchBar(j) {
    if (!j) {
        j = "#keyword"
    }
    var i = jQuery(j);
    var h = i.parent("div").find("label");
    var g = i.attr("original");
    var f = i.val();
    if (i.val() != "" && h.size() > 0) {
        h.hide();
        i.trigger("click");
        return
    }
    if (f.indexOf(g) == 0) {
        i.val(f.substring(g.length));
        i.css("color", "#333333")
    }
    if (i.val() != "") {
        i.trigger("click")
    }
}

function hotKeywords_onDocumentReady(dom) {
    var keywordDom = jQuery("#keyword");
    if (dom) {
        keywordDom = jQuery(dom)
    }
    if (hotwordReadAdv != "undefined" && (hotwordReadAdv == "true" || hotwordReadAdv == true)) {
        readAdv_hotKeywords_onDocumentReady(dom)
    } else {
        var divHotkeywordsList = jQuery("#hotKeywordsList")[0];
        if (!divHotkeywordsList) {
            return
        }
        var hotkeywordsList = jQuery(divHotkeywordsList).attr("data-grid");
        eval("var hots = " + hotkeywordsList);
        var hour = new Date().getHours();
        var def = new Array();
        if (hots[hour].length > 0) {
            def.push(hots[hour][0])
        }
        def.push(hots[24][0]);
        if (def.length > 0) {
            var keywords = def[0];
            var oldKeywords = keywordDom.val();
            if (oldKeywords == "" || oldKeywords == "请输入关键词") {
                keywordDom.attr("value", keywords);
                keywordDom.data("default", keywords)
            }
            if (oldKeywords == keywords || oldKeywords == "" || oldKeywords == "请输入关键词") {
                keywordDom.css("color", "#999999");
                keywordDom.bind("focus", function() {
                    if (this.value == keywords) {
                        this.value = "";
                        this.style.color = "#333333"
                    }
                }).bind("blur", function() {
                    if (this.value == "") {
                        this.value = keywords;
                        this.style.color = "#999999"
                    }
                })
            }
        }
        var curr = new Array();
        for (var i = 1; i < hots[hour].length; i++) {
            curr.push(hots[hour][i])
        }
        for (var t = 0; t < 100; t++) {
            var i = Math.floor(Math.random() * hots[24].length);
            var word = hots[24][i];
            var contains = false;
            for (var j = 0; j < curr.length; j++) {
                if (word == curr[j]) {
                    contains = true;
                    break
                }
            }
            if (!contains && word != keywords) {
                curr.push(word)
            }
        }
        if (curr.length > 0) {
            var buf = "";
            for (var i = 0; i < curr.length; i++) {
                var show = "";
                if (curr[i] && curr[i] != "undefined") {
                    show = curr[i]
                }
                buf = buf + "<a href='" + URLPrefix.search_keyword + "/s2/c0-0/k" + encodeURIComponent(show) + "/" + jQuery.cookie("provinceId") + "/' title='搜索:" + show + "'>" + show + "</a>"
            }
            jQuery("#hotKeywordsShow").append(buf);
            bindLinkClickTracker("hotKeywordsShow", "HotKeyword")
        }
    }
}

function readAdv_hotKeywords_onDocumentReady(e) {
    var g = jQuery("#keyword");
    if (e) {
        g = jQuery(e)
    }
    if (!g[0]) {
        return
    }
    var h = g.attr("original");
    if (h == null || h == "") {
        h = "请输入关键词"
    }
    var f = g.val();
    if (f == h || f == "" || f == "请输入关键词") {
        g.css("color", "#999999");
        g.bind("focus", function() {
            if (this.value == h) {
                this.value = "";
                this.style.color = "#333333"
            }
        }).bind("blur", function() {
            if (this.value == "") {
                this.value = h;
                this.style.color = "#999999"
            }
        })
    }
}

function indexReadAdv_hotKeywords_onDocumentReady() {
    var f = jQuery("#keyword").attr("original");
    if (f == null || f == "") {
        f = "请输入关键词"
    }
    var e = jQuery("#keyword").val();
    var d = jQuery("#keyword").parent("div").find("label");
    if (!d[0]) {
        return
    }
    if (e == f || jQuery.trim(e) == "") {
        d.css({
            display: "block"
        });
        jQuery("#keyword").css("color", "#333333")
    }
    jQuery("#keyword").bind("focus", function() {
        d.css({
            color: "#CCCCCC"
        });
        if (this.value == f) {
            this.style.color = "#CCCCCC"
        } else {
            this.style.color = "#333333"
        }
    }).bind("blur", function() {
        if (jQuery.trim(this.value) == "" || this.value == f || this.value == "请输入关键词") {
            d.css({
                color: "#666666",
                display: "block"
            });
            jQuery("#keyword").val("")
        }
    }).bind("keydown", function() {
        if (jQuery.trim(this.value) == "" || this.value == f) {
            d.hide()
        }
    })
}

function searchFocus(e) {
    var f = $("#keyword");
    if (e) {
        f = $(e)
    }
    if ((isIndex == 1 && (typeof(indexFlag) != "undefined" && typeof(indexFlag) == "number" && indexFlag == 1))) {
        return
    }
    var d = f.val();
    if (d == null || jQuery.trim(d) == "") {
        f.val("请输入关键词");
        d = "请输入关键词"
    }
    if (d == "请输入关键词") {
        f.css("color", "#999999")
    }
    f.focus(function() {
        if ($(this).val() == "请输入关键词") {
            $(this).val("").css("color", "#333")
        }
    }).blur(function() {
        if (!$(this).val().replace(/\s/gi, "")) {}
    })
}

function searchKeywords_onDocumentReady(r) {
    var l = jQuery("#keyword");
    if (r) {
        l = jQuery(r)
    }
    if (!l[0]) {
        return
    }
    if ((isIndex == 1 && (typeof(indexFlag) != "undefined" && typeof(indexFlag) == "number" && indexFlag == 1)) || (typeof(isMallIndex) != "undefined" && isMallIndex == 1) || (typeof(_globalIsUseAdHotWords) != "undefined" && _globalIsUseAdHotWords == false)) {
        if ((typeof(isMallIndex) != "undefined" && isMallIndex == 1) || (typeof(_globalIsUseAdHotWords) != "undefined" && _globalIsUseAdHotWords == false)) {
            readAdv_hotKeywords_onDocumentReady(r)
        } else {
            indexReadAdv_hotKeywords_onDocumentReady()
        }
        getHotkeywordHtml();
        return
    }
    if (isIndex != 1 || jQuery.trim(l.attr("url")) != "") {
        readAdv_hotKeywords_onDocumentReady(r)
    }
    var q = 1;
    var t = 1;
    if (typeof(currSiteId) != "undefined" && currSiteId == 2) {
        q = 2
    } else {
        if (typeof(currSiteType) != "undefined" && currSiteType == 2) {
            t = 2
        }
    }
    var p = l.val();
    var e = URLPrefix.search_keyword + "/recommend/headHotKeywordRecommend.do?threshold=10&mcSiteId=" + q + "&siteType=" + t;
    if (typeof(p) != "undefined" && jQuery.trim(p) != "") {
        e += "&keyword=" + encodeURIComponent(encodeURIComponent(p))
    }
    var s = jQuery("#curCategoryIdToGlobal").val();
    if (typeof(s) != "undefined") {
        e += "&categoryId=" + s
    }
    var n = false;
    var m = jQuery("#hotKeywordsShow").data("data-isLoaded");
    if (m == "1") {
        return
    }
    jQuery("#hotKeywordsShow").data("data-isLoaded", "1");
    try {
        jQuery.ajax({
            url: e,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "keywordRecommendCallback",
            timeout: 3000,
            success: function(h) {
                if (n) {
                    return
                }
                if (h == null || h.headhotkeywords == null || h.headhotkeywords.length < 1) {
                    jQuery("#hotKeywordsShow > a").remove();
                    getHotkeywordHtml()
                } else {
                    var f = h.headhotkeywords;
                    var g = [];
                    for (var b = 0; b < f.length; b++) {
                        var c = f[b];
                        var d = URLPrefix.search_keyword + "/s2/c0-0/k" + encodeURIComponent(c) + "/" + jQuery.cookie("provinceId") + "/";
                        c = '<a title="' + c + '" target="_blank" href="' + d + '" onclick="javascript:addTrackPositionToCookie(' + currSiteType + ",'shkw_" + encodeURIComponent(c) + "');\" >" + c + "</a>";
                        g.push(c)
                    }
                    var a = g.join(" ");
                    jQuery("#hotKeywordsShow > a").remove();
                    jQuery("#hotKeywordsShow").append(a);
                    jQuery("#hotKeywordsShow").data("data-searchKeyLoaded", "1");
                    n = true
                }
            },
            error: function() {
                jQuery("#hotKeywordsShow > a").remove();
                getHotkeywordHtml();
                n = true
            }
        })
    } catch (o) {
        jQuery("#hotKeywordsShow > a").remove();
        getHotkeywordHtml();
        n = true
    }
    setTimeout(function() {
        if (!n) {
            jQuery("#hotKeywordsShow").data("data-isLoadFinish", "true");
            jQuery("#hotKeywordsShow > a").remove();
            getHotkeywordHtml()
        }
    }, 3000)
}

function getHotkeywordHtml() {
    var hotkeywordsArray = [];
    var hotkeywordsList = jQuery("#hotKeywordsShow").attr("data-grid");
    if (!hotkeywordsList) {
        return
    }
    hotkeywordsList = eval(hotkeywordsList);
    if (!jQuery.isArray(hotkeywordsList)) {
        return
    }
    if (hotkeywordsList.length < 1) {
        return
    }
    for (var i = 0; i < hotkeywordsList.length; i++) {
        var hotkeyword = hotkeywordsList[i];
        var text = "";
        if (hotkeyword == null || hotkeyword.text == null || jQuery.trim(hotkeyword.text) == "") {
            continue
        } else {
            text = hotkeyword.text
        }
        var classStyle = "";
        if (hotkeyword.style && hotkeyword.style == 5) {
            classStyle = 'class="hot_link_red"'
        }
        hotkeyword = '<a title="' + text + '" ' + classStyle + ' target="_blank" href="' + hotkeyword.linkUrl + "\" onclick=\"javascript:addTrackPositionToCookie('1','" + hotkeyword.perTracker + "');\">" + text.substring(0, 10) + "</a>";
        hotkeywordsArray.push(hotkeyword)
    }
    jQuery("#hotKeywordsShow").append(hotkeywordsArray.join(" "))
}

function clearRecord(j) {
    if (!j) {
        j = "#searchSuggest .hd_clear_history_record"
    }
    var h = URLPrefix.sitedomain;
    if (siteFlag == 1 && currSiteType == 2 && typeof(URLPrefix.sitedomainmall) != "undefined") {
        h = URLPrefix.sitedomainmall
    }
    var f = {
        path: "/",
        domain: h,
        expireDays: -1
    };
    if (siteFlag == 1 && currSiteType == 2) {
        jQuery.cookie("search_keyword_history_mall", "", f)
    } else {
        jQuery.cookie("search_keyword_history", "", f)
    }
    var g = $(j);
    g.hide();
    g.prev("ul").hide();
    g.next(".hd_cleared_searches").show();
    var i = setTimeout(function() {
        g.next(".hd_cleared_searches").slideUp()
    }, 2000)
}
$(document).bind("click", function(c) {
    var d = c.target;
    if (d.className == "hd_clear_history_record" || d.className == "keywordInput" || d.className == "fl") {
        return
    }
    $("#searchSuggest").hide();
    $("#fix_searchSuggest").hide()
});
jQuery(document).ready(function() {
    if (isIndex != 1) {
        if (jQuery("#hotKeywordsShow")[0] && jQuery("#hotKeywordsShow").attr("data-flag") == 1) {
            searchKeywords_onDocumentReady();
            if (typeof isFixTopNav != "undefined" && isFixTopNav == true && currSiteType == 1) {
                readAdv_hotKeywords_onDocumentReady("#fix_keyword")
            }
        } else {
            if (typeof isFixTopNav != "undefined" && isFixTopNav == true && currSiteType == 1) {
                readAdv_hotKeywords_onDocumentReady("#fix_keyword")
            }
            hotKeywords_onDocumentReady()
        }
    }
    if (isIndex == 1 && jQuery.trim(jQuery("#fix_keyword").attr("url")) != "") {
        if (typeof isFixTopNav != "undefined" && isFixTopNav == true && currSiteType == 1) {
            readAdv_hotKeywords_onDocumentReady("#fix_keyword")
        }
    }
    searchFocus();
    if (typeof isFixTopNav != "undefined" && isFixTopNav == true) {
        searchFocus("#fix_keyword")
    }
});
(function(a) {
    a.fn.bgIframe = a.fn.bgiframe = function(c) {
        if (a.browser.msie && parseInt(a.browser.version) <= 6) {
            c = a.extend({
                top: "auto",
                left: "auto",
                width: "auto",
                height: "auto",
                opacity: true,
                src: "javascript:false;"
            }, c || {});
            var d = function(e) {
                return e && e.constructor == Number ? e + "px" : e
            }, b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + c.src + '"style="display:block;position:absolute;z-index:-1;' + (c.opacity !== false ? "filter:Alpha(Opacity='0');" : "") + "top:" + (c.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')" : d(c.top)) + ";left:" + (c.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')" : d(c.left)) + ";width:" + (c.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')" : d(c.width)) + ";height:" + (c.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')" : d(c.height)) + ';"/>';
            return this.each(function() {
                if (a("> iframe.bgiframe", this).length == 0) {
                    this.insertBefore(document.createElement(b), this.firstChild)
                }
            })
        }
        return this
    };
    if (!a.browser.version) {
        a.browser.version = navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]
    }
})(jQuery);
var Class = {
    create: function() {
        return function() {
            this.initialize.apply(this, arguments)
        }
    }
};
var Extend = function(b, a) {
    for (var c in a) {
        b[c] = a[c]
    }
};

function stopDefault(a) {
    if (a && a.preventDefault) {
        a.preventDefault()
    } else {
        window.event.returnValue = false
    }
    return false
}
var Stars = Class.create();
Stars.prototype = {
    initialize: function(j, e) {
        this.SetOptions(e);
        var m = 999;
        var g = (document.all) ? true : false;
        var o = document.getElementById(j).getElementsByTagName("a");
        var a = document.getElementById(this.options.Input) || document.getElementById(j + "-input");
        var l = document.getElementById(this.options.Tips) || document.getElementById(j + "-tips");
        var f = " " + this.options.nowClass;
        var d = this.options.tipsTxt;
        var k = o.length;
        for (h = 0; h < k; h++) {
            o[h].value = h;
            o[h].onclick = function(c) {
                stopDefault(c);
                this.className = this.className + f;
                m = this.value;
                a.value = this.getAttribute("star:value");
                l.innerHTML = d[this.value]
            };
            o[h].onmouseover = function() {
                if (m < 999) {
                    var c = RegExp(f, "g");
                    o[m].className = o[m].className.replace(c, "")
                }
            };
            o[h].onmouseout = function() {
                if (m < 999) {
                    o[m].className = o[m].className + f
                }
            }
        }
        if (g) {
            var b = document.getElementById(j).getElementsByTagName("li");
            for (var h = 0, k = b.length; h < k; h++) {
                var n = b[h];
                if (n) {
                    n.className = n.getElementsByTagName("a")[0].className
                }
            }
        }
    },
    SetOptions: function(a) {
        this.options = {
            Input: "",
            Tips: "",
            nowClass: "current-rating",
            tipsTxt: ["1分-很不满意", "2分-不满意", "3分-一般", "4分-满意", "5分-非常满意"]
        };
        Extend(this.options, a || {})
    }
};

function setHomepage() {
    if (document.all) {
        document.body.style.behavior = "url(#default#homepage)";
        document.body.setHomePage(httpUrl)
    } else {
        if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
                } catch (c) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
                }
            }
            var d = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            d.setCharPref("browser.startup.homepage", httpUrl)
        }
    }
}

function globalLogoff() {}

function bookmark() {
    if (document.all) {
        window.external.AddFavorite(httpUrl, favorite)
    } else {
        try {
            window.sidebar.addPanel(favorite, httpUrl, "")
        } catch (b) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}
var myCartTopHeaderTimer;

function clearMyCartTopHeaderTimer() {
    if (myCartTopHeaderTimer != null) {
        clearTimeout(myCartTopHeaderTimer)
    }
}

function buildMyYihaodian() {
    jQuery("#myYihaodian").mouseover(function(b) {
        clearMyCartTopHeaderTimer();
        jQuery("#myYihaodianFloatDiv").show();
        b.stopPropagation()
    });
    jQuery("#myYihaodianFloatDiv").mouseout(function(b) {
        clearMyCartTopHeaderTimer();
        myCartTopHeaderTimer = setTimeout(function() {
            jQuery("#myYihaodianFloatDiv").hide()
        }, 1000);
        b.stopPropagation()
    }).mouseover(function(b) {
        clearMyCartTopHeaderTimer();
        b.stopPropagation()
    });
    jQuery("body").click(function(b) {
        clearMyCartTopHeaderTimer();
        jQuery("#myYihaodianFloatDiv").hide();
        b.stopPropagation()
    })
}
var hasPingAnCookie = 0;

function writeHeaderContent() {
    var n = jQuery.cookie("ucocode");
    if (n && n == "pingan") {
        hasPingAnCookie = 1
    }
    if (typeof currSiteId != "undefined" && currSiteId == 2) {
        if (jQuery("#global_top_bar")[0] && headerType == "simple") {
            loli.globalCheckLogin(globalInitYhdLoginInfo);
            return
        }
    }
    var i = jQuery.cookie("ut");
    var m = jQuery.cookie("uname");
    var j = 0;
    if (i) {
        j = 1
    }
    if (j == 1) {
        if (document.domain.indexOf("111.com", 0) != -1) {
            if (m) {
                m = decodeURIComponent(m);
                if (m == null) {
                    m = ""
                }
                jQuery("#user_name").text(m + "，欢迎您！")
            }
        }
        jQuery("#login").hide();
        jQuery("#logout").show()
    }
    var o = "";
    var l = jQuery.cookie("ucocode");
    var k = jQuery.cookie("externaluserlevel");
    if ((l && l == "pingan")) {
        hasPingAnCookie = 1;
        o = "尊敬的万里通会员";
        jQuery(".provincebox").addClass("provincebox2")
    } else {
        if (l && l == "tencent") {
            if (k && k > 0) {
                o = "尊敬的QQ会员"
            } else {
                if (k && k == 0) {
                    o = "尊敬的QQ用户"
                }
            }
        } else {
            if (l && l == "kaixin001" && jQuery("#KX_JS_URL").size() > 0) {
                if (jQuery("#kx001_btn_login").parent().size() > 0) {
                    jQuery("#logout").hide();
                    jQuery("#kx001_btn_login").parent().show()
                }
                var p = jQuery("#KX_JS_URL").val();
                jQuery.getScript(p, function() {
                    if (jQuery("#kx001_btn_login").size() > 0 && jQuery("#kx001_btn_login").html() == "") {
                        try {
                            KX001.init("974091834200c72a39a7bb394900fb0c", "/pages/kaixin/kx001_receiver.html")
                        } catch (a) {}
                    }
                })
            }
        }
    } if (o && o != "") {
        if (m == null) {
            m = ""
        }
        if (j == 1) {
            jQuery("#user_name").text(o + m + "，欢迎您！")
        }
    }
}

function cutUsername(b) {
    return b
}

function bothSiteLogoutJsonp() {
    var f = false;
    var g = false;
    var h = (typeof currSiteType != "undefined" && currSiteType == 1) ? URLPrefix.passport : URLPrefix.passportmall;
    var e = (typeof currSiteType != "undefined" && currSiteType == 1) ? URLPrefix.passportmall : URLPrefix.passport;
    jQuery.getJSON(h + "/passport/logoutJsonp.do?timestamp=" + new Date() + "&callback=?", function(a) {
        if (a && a.code == "0") {
            f = true
        }
        jQuery.getJSON(e + "/passport/logoutJsonp.do?timestamp=" + new Date() + "&callback=?", function(b) {
            if (b && b.code == "0") {
                g = true
            }
            window.location.href = currDomain
        })
    });
    if (myCartTopHeaderTimer) {
        clearMyCartTopHeaderTimer()
    }
    myCartTopHeaderTimer = setTimeout(function() {
        if (!(f && g)) {
            window.location.href = currDomain
        }
    }, 3000)
}

function pingan_quit() {
    var b = new Date((new Date()).getTime()).toGMTString();
    document.cookie = "ut=;expires=" + b + ";domain=." + no3wUrl + ";path=/";
    document.cookie = "ucocode=;expires=" + b + ";domain=." + no3wUrl + ";path=/";
    document.cookie = "cocode=;expires=" + b + ";domain=." + no3wUrl + ";path=/";
    location.href = "https://www.wanlitong.com/eloyalty_chs/start.swe?SWENeedContext=false&SWECmd=Logoff&SWEC=2&SWEBID=-1&SWETS="
}

function kx001_onlogout() {
    window.location.href = httpUrl + "/passport/logoff.do"
}

function hightLightMenu(h, e) {
    var g = jQuery(h);
    var f = location.href;
    g.each(function(i) {
        if (i == 0) {
            return true
        }
        var a = jQuery(this).find("a");
        var b = a.attr("href");
        var c = a.attr("hl");
        var d = false;
        d = (f.indexOf(b) > -1);
        if (!d) {
            if (c) {
                d = (f.indexOf(c) > -1)
            }
        }
        if (!d) {
            d = (f.indexOf("point2channel.do") > -1) && (b.indexOf("/point2/pointIndex.do") > -1)
        }
        if (d) {
            if (i) {
                if (currSiteId == 2) {
                    g.eq(0).addClass("removehome");
                    a.addClass("select")
                } else {
                    if (currSiteType == 1) {
                        if (c != null && c.length > 0) {
                            g.eq(0).removeClass("cur");
                            a.parent().addClass("cur")
                        }
                    }
                }
            }
            return false
        }
    })
}

function initHeader() {
    jQuery(".top_bar_link > ul > li").hover(function() {
        jQuery(this).children("ul").show().end();
        jQuery(this).find(".qixia").addClass("qixia_hover")
    }, function() {
        jQuery(this).children("ul").hide().end();
        jQuery(this).find(".qixia").removeClass("qixia_hover")
    });
    try {
        writeHeaderContent()
    } catch (b) {}
    hightLightMenu("#global_menu li", null);
    if (typeof currSiteId != "undefined" && currSiteId == 2) {
        jQuery("#global_top_bar_loginLink").bind("click", function() {
            addTrackPositionToCookie("1", "YW_TOP_login")
        })
    }
}

function lazyLoadBottomBrandsData() {
    var b = function() {
        var d = jQuery("#bottomBrand");
        if (!d.size()) {
            return
        }
        var a = document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (d.offset().top > a + 100 || d.data("loaded")) {
            return
        } else {
            d.data("loaded", true)
        }
        d.html("<p align='center'><img src='" + imagePath + "/loade.gif'/>请您稍等,数据正在加载...</p>");
        jQuery.getJSON(URLPrefix.central + "/bottomBrand/ajaxGetBottomBrandsData.do?callback=?", function(c) {
            d.html("");
            if (c.value) {
                var g = jQuery(c.value).find("ul");
                var h = "";
                g.each(function() {
                    h += jQuery(this).html()
                });
                d.html(h)
            }
            jQuery(window).unbind("scroll", b)
        })
    };
    jQuery(window).bind("scroll", b);
    b()
}

function lazyLoadBottomPromPic() {
    if (typeof currSiteType != "undefined" && typeof currSiteId != "undefined" && currSiteId == 1) {
        if (currSiteType == 2) {
            var b = jQuery("#bottom_prom");
            if (!b.size()) {
                return
            }
            jQuery("#bottom_prom").lazyImg({
                wideAttr: isWidescreen ? "wi" : "si",
                load: false
            })
        }
    }
}

function headNavFixed() {
    if (typeof currSiteType != "undefined" && typeof currSiteId != "undefined" && currSiteId == 1) {
        if (currSiteType == 1) {
            function d() {
                var a = 142;
                $(window).scroll(function() {
                    var b = $(this).scrollTop();
                    if (b > a) {
                        $(".headerNav").addClass("nav_fixed")
                    } else {
                        $(".headerNav").removeClass("nav_fixed")
                    }
                });
                if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                    var a = 142;
                    $(window).scroll(function() {
                        var b = $(this).scrollTop();
                        if (b > a) {
                            $(".headerNav").addClass("fixed_ie6");
                            var f = $(".headerNav_ifm").length;
                            if (f == 0) {
                                $("<iframe class=headerNav_ifm></iframe>").insertBefore(".headerNav .wrap")
                            }
                            $(".headerNav").css("top", b)
                        } else {
                            $(".headerNav").removeClass("fixed_ie6");
                            $(".headerNav_ifm").remove();
                            $(".headerNav").css("top", "0px")
                        }
                    })
                }
            }
            d()
        } else {
            function c() {
                var b = $("#headerNav"),
                    a = b.offset().top;
                if ($.browser.msie && $.browser.version == 6) {
                    loli.delay(window, "scroll", null, function() {
                        var g = $(window).scrollTop(),
                            h = $("#headerNavEm");
                        if (g > a) {
                            h.show();
                            b.addClass("navFloat");
                            b.css("top", g)
                        } else {
                            h.hide();
                            b.removeClass("navFloat")
                        }
                    }, 500)
                } else {
                    $(window).scroll(function() {
                        if ($(window).scrollTop() > a) {
                            b.addClass("navFloat")
                        } else {
                            b.removeClass("navFloat")
                        }
                    })
                }
            }
            c()
        }
    }
}

function globalInitYhdLoginInfo(m) {
    if (m && m.result && m.userName) {
        var l = m.result;
        var n = m.userName;
        var h = jQuery("#global_login");
        var i = jQuery("#global_unlogin");
        var j = jQuery("#logout");
        if (l == "1") {
            h.show();
            j.show();
            i.hide();
            var k = jQuery.cookie("uname");
            if (k && jQuery.trim(k) != "") {
                jQuery("#user_name").text(k)
            } else {
                jQuery("#user_name").text(n)
            }
        }
    }
}
jQuery(document).ready(function() {
    if (isIndex != 1) {
        initHeader()
    }
    lazyLoadBottomBrandsData();
    lazyLoadBottomPromPic();
    if (typeof isFixTopNav != "undefined" && isFixTopNav == true) {
        headNavFixed()
    }
    jQuery("#global_top_bar_myyw").mousemove(function() {
        $(this).find(".menu_bd").show()
    });
    jQuery("#global_top_bar_myyw").mouseleave(function() {
        $(this).find(".menu_bd").hide()
    });
    jQuery("#footer_lazyload").lazyDom({
        indexLoad: true,
        load: false,
        flushPrice: false
    })
});

function newTopslider(d) {
    var e = jQuery(d);
    if (e.length < 1) {
        return
    }
    var f = null;
    var c = jQuery("#site_header");
    var j = c.css("padding-top");
    if (j && j.indexOf("px") >= 0) {
        j = j.replace("px", "")
    }
    if (c.attr("data-hfix")) {
        f = c.attr("data-hfix")
    }
    var g = e.find(".index_topbanner_fold");
    var h = e.find(".big_topbanner");
    var a = jQuery("#smallTopBanner");
    g.toggle(function() {
        $(this).removeClass("index_topbanner_unfold");
        $(this).html("展开<s></s>");
        h.slideUp();
        a.slideDown();
        if (f) {
            c.animate({
                "padding-top": j + "px"
            })
        }
    }, function() {
        $(this).addClass("index_topbanner_unfold");
        $(this).html("收起<s></s>");
        h.slideDown();
        a.slideUp();
        if (f) {
            c.animate({
                "padding-top": (j - f) + "px"
            })
        }
    });
    var i = h.find("img");
    i.attr("src", i.attr(isWidescreen ? "wideimg" : "shortimg")).removeAttr("wideimg").removeAttr("shortimg");
    i.eq(0).load(function() {
        if (f) {
            c.animate({
                "padding-top": (j - f) + "px"
            })
        }
        e.slideDown();
        lamuSlidUpAuto(g)
    });
    var b = a.find("img");
    b.each(function(k, l) {
        jQuery(l).attr("src", jQuery(l).attr(isWidescreen ? "wideimg" : "shortimg")).removeAttr("wideimg").removeAttr("shortimg")
    })
}

function lamuSlidUpAuto(b) {
    var a = function() {
        b.trigger("click")
    };
    var c = setTimeout(a, 5000);
    b.click(function() {
        clearInterval(c)
    })
};
jQuery(document).ready(function() {
    if (jQuery.cookie("ut")) {
        var o = 0;
        var n = URLPrefix.my + "/top/myorder/ajaxInitShowMyOrderPageTotalData.do?timestame=" + new Date() + "&callback=?";
        jQuery.getJSON(n, function(a) {
            if (!(a && a.resultCode) || a.resultCode == 0) {
                jQuery("#idxOdrTipConId").removeClass("idxOdrTipCon").hide();
                return false
            } else {
                q(a)
            }
        });

        function q(c) {
            o = c.awaitCommentNum;
            var b = c.orderNum;
            var a = c.payReceiveNum;
            if (a + o > 0) {
                jQuery("#idxOdrTipConId").removeClass("idxOdrTipCon").hide();
                jQuery("#menu_myOrder_link").hover(function() {
                    if (new Date().getTime() - jQuery("#menu_myOrder_link").data("reqedtime") <= 1 * 60 * 1000) {
                        return
                    }
                    if (jQuery("#menu_myOrder_link").data("inreq")) {
                        return
                    }
                    jQuery("#menu_myOrder_link").data("inreq", true);
                    jQuery(".loading").show().siblings().hide();
                    jQuery(".tabCon:gt(0)").children().not(".loading").hide();
                    jQuery("#idxOdrTipConId").removeClass("idxOdrTipCon").hide();
                    jQuery.getJSON(URLPrefix.my + "/top/myorder/ajaxShowMyOrderPageTagData.do?timestamp=" + new Date() + "&callback=?", function(d) {
                        if (d.ERROR) {
                            jQuery("#menu_myOrder_link").data("inreq", false);
                            jQuery("#menu_myOrder_link").data("reqedtime", new Date().getTime());
                            return
                        }
                        jQuery("#menu_myOrder_link").data("inreq", false);
                        jQuery("#menu_myOrder_link").data("reqedtime", new Date().getTime());
                        jQuery("#idxOdrTipConId").html(d.value);
                        jQuery("#idxOdrTipConId").addClass("idxOdrTipCon").show();
                        jQuery("#idxOdrTipConId ul li:eq(2)").attr("id", "waitCommentId_" + o);
                        r();
                        p();
                        jQuery(".loading").hide().siblings().show()
                    })
                });
                jQuery("a[tk]").click(function() {
                    var d = $(this),
                        e = d.attr("tk");
                    if (e) {
                        addTrackPositionToCookie("1", e)
                    }
                })
            }
        }

        function l() {
            var a;
            jQuery("#menu_myOrder").hover(function() {
                if (a) {
                    clearTimeout(a)
                }
                jQuery("#menu_myOrder_link").addClass("menu_myOrder_hover");
                jQuery("#idxOdrTipConId").addClass("idxOdrTipCon").show()
            }, function() {
                a = setTimeout(function() {
                    jQuery("#menu_myOrder_link").removeClass("menu_myOrder_hover");
                    jQuery("#idxOdrTipConId").removeClass("idxOdrTipCon").hide()
                }, 200)
            })
        }

        function j(a) {
            jQuery(a).addClass("cur").siblings().removeClass("cur");
            var b = jQuery(a).index();
            jQuery(".tabCon").eq(b).show().siblings(".tabCon").hide()
        }

        function p() {
            var b = jQuery("#idxOdrTipConId ul li:eq(0)").attr("id");
            var a = jQuery("#idxOdrTipConId ul li:eq(1)").attr("id");
            var d = jQuery("#idxOdrTipConId ul li:eq(2)").attr("id");
            var c = jQuery("#idxOdrTipConId ul li:eq(0)");
            if (b && b.split("_")[1] > 0) {
                k(c)
            } else {
                if (a && a.split("_")[1] > 0) {
                    c = jQuery("#idxOdrTipConId ul li:eq(1)");
                    k(c)
                } else {
                    if (d && d.split("_")[1] > 0) {
                        c = jQuery("#idxOdrTipConId ul li:eq(2)");
                        k(c)
                    } else {
                        jQuery("#menu_myOrder_link").removeClass("myOdrHover");
                        jQuery("#idxOdrTipConId").removeClass("idxOdrTipCon").hide();
                        return false
                    }
                }
            }
        }

        function k(a) {
            j(a);
            l();
            m()
        }

        function m() {
            jQuery(".idxOdrTipCon ul li").hover(function() {
                jQuery(this).addClass("cur").siblings().removeClass("cur");
                var a = jQuery(".idxOdrTipCon ul li").index(jQuery(".cur"));
                jQuery(".tabCon").eq(a).show().siblings(".tabCon").hide()
            })
        }

        function r() {
            if (o == 0) {
                jQuery("#idxOdrTipConId ul li:eq(2)").html("待评论(" + 0 + ")");
                jQuery("#pageTagUnCommentPId").html("您没有等待评论的订单")
            } else {
                jQuery("#idxOdrTipConId ul li:eq(2)").html("待评论(" + o + ")");
                jQuery("#pageTagUnCommentId").html(o)
            }
        }
    }
});
if (currSiteId != 1) {
    initLeftMenu(true)
}
runfunctions([], [initHeader, initProvince, initAllMiniCart, searchKeywords_onDocumentReady], this);

function runfunctions(d, c, e) {
    if (!(c && c.length)) {
        return
    }
    e = e || window;
    var b = c.shift();
    var a = d.shift() || [];
    for (;; b = c.pop(), a = d.pop()) {
        if (typeof b == "function") {
            setTimeout(function() {
                try {
                    b.apply(e, a)
                } catch (f) {}
                runfunctions(d, c, e)
            }, 100);
            return false
        }
    }
};
(function(b) {
    var a = window.loli || (window.loli = {});
    a.scroll = function(g, e) {
        var h = "";
        var d = e || 200;
        var c = d - 20;
        b(window).scroll(function() {
            setTimeout(function() {
                f()
            }, d);
            h = new Date().getTime()
        });

        function f() {
            if ((new Date().getTime() - h) >= c) {
                g();
                h = new Date().getTime()
            }
        }
    }
})(jQuery);
(function(c) {
    var d = function(a) {
        var g = a,
            b = URLPrefix.busystock ? URLPrefix.busystock : "http://busystock.i.yihaodian.com",
            h = "/busystock/restful/truestock";
        _setting = {
            attr: "productid",
            busystock_url: b + h,
            busystockAttr: "productIds",
            lazyLoadDelay: 500,
            priceCounter: 30,
            load: true,
            maxNum: 200,
            oneOffLoad: false,
            indexLoad: false,
            scrollLoad: true,
            hfix: 100,
            callbackHtml: null
        };
        c.extend(_setting, g);
        this.param = _setting
    };
    d.prototype = {
        constructor: d,
        isBusy: false,
        doc: document,
        priceArray: [],
        lazyPrice: function(k, l) {
            var a = this,
                o = a.param;
            if (l) {
                a.param = c.extend(o, l)
            }
            var b = k,
                m = o.attr,
                n = o.busystock_url,
                p = o.maxNum;
            if (b instanceof c) {
                a.priceArray = k.find("[" + m + "]").get()
            } else {
                if (c.isArray(b)) {
                    a.priceArray = b
                } else {
                    a.priceArray = c(k).find("[" + m + "]").get()
                }
            } if (o.oneOffLoad) {
                a._flushPrice(a.priceArray, m, n, o.busystockAttr, p);
                return k
            }
            if (o.indexLoad) {
                a._lazyPrice(a.imgArray, o)
            }
            if (o.scrollLoad) {
                a._iniLazy(function() {
                    if (a.priceArray.length == 0) {
                        return k
                    }
                    a._lazyPrice(a.priceArray, o)
                })
            }
            if (o.load) {
                a._loadPrice()
            }
            return k
        },
        _loadPrice: function() {
            var a = this,
                n = a.param,
                b = n.attr,
                p = n.busystock_url,
                k = n.busystockAttr,
                o = n.maxNum,
                l = n.lazyLoadDelay,
                m = n.priceCounter;
            (function(h, i, f, j, e, s, t) {
                var g = setInterval(function() {
                    if (h.isBusy) {
                        return false
                    }
                    var r = h.priceArray;
                    var q = r.length;
                    if (q > t) {
                        h._priceLoad(r, i, f, j, 0, t, e)
                    } else {
                        if (q > 0) {
                            h._priceLoad(r, i, f, j, 0, q, e)
                        } else {
                            clearInterval(g)
                        }
                    }
                }, s)
            })(a, b, p, k, o, l, m)
        },
        _lazyPrice: function(o, q) {
            var p = q.attr,
                b = o.length,
                s = q.busystock_url,
                t = q.busystockAttr,
                r = q.maxNum,
                n = this,
                m = 0;
            n.isBusy = true;
            var a = n._pageTop() + q.hfix;
            n._priceLoad(o, p, s, t, m, b, r, a);
            n.isBusy = false
        },
        _priceLoad: function(x, u, A, B, v, a, z, b) {
            var i = this,
                t = x.length;
            if (t == 0) {
                return
            }
            var r = new Array();
            if (b) {
                for (var y = v; y < a; y++) {
                    var w = c(x[y]);
                    if (w.offset().top < b) {
                        r.push(w);
                        delete x[y]
                    }
                }
            } else {
                for (var y = v; y < a; y++) {
                    var w = c(x[y]);
                    r.push(w);
                    delete x[y]
                }
            }
            i._flushPrice(r, u, A, B, z);
            var s = new Array();
            for (var y = 0; y < x.length; y++) {
                if (x[y] != null) {
                    s.push(x[y])
                }
            }
            i.priceArray = s
        },
        _iniLazy: function(b) {
            var a = this;
            window.scrollTo(0, 0);
            c(window).bind("scroll", function() {
                if (!a.isBusy) {
                    b()
                } else {}
            })
        },
        _pageTop: function() {
            var a = this,
                b = a.doc,
                f = b.documentElement;
            return f.clientHeight + Math.max(f.scrollTop, b.body.scrollTop)
        },
        _flushPrice: function(L, E, K, j, z) {
            var C = this,
                b = C.param,
                B = b.callbackHtml;
            if (L && L.length > 0) {
                var F = L.length,
                    e = 0,
                    a, G = 1;
                if (F < z) {
                    a = F
                } else {
                    G = (F - 1) / z + 1
                }
                var H = jQuery.cookie("provinceId");
                if (!H) {
                    return
                }
                var J = "?mcsite=" + currBsSiteId + "&provinceId=" + H;
                var I = {};
                for (var A = 0; A < G; A++) {
                    if (A > 0) {
                        e = z * A;
                        a = e + z;
                        if (a > F) {
                            a = F
                        }
                    }
                    I = {};
                    for (var y = e; y < a; y++) {
                        var D = jQuery(L[y]);
                        J += "&" + j + "=" + D.attr(E);
                        if (!I[D.attr(E)]) {
                            I[D.attr(E)] = []
                        }
                        I[D.attr(E)].push(D)
                    }
                    try {
                        jQuery.getJSON(K + J + "&callback=?", function(f) {
                            jQuery.each(f, function(k, h) {
                                var g = I[h.productId];
                                if (g) {
                                    jQuery.each(g, function(l, m) {
                                        if (B) {
                                            jQuery(m).html(B(h)).removeAttr(E)
                                        } else {
                                            if (currSiteId == 2) {
                                                jQuery(m).text("¥" + h.productPrice).removeAttr(E)
                                            } else {
                                                if (g) {
                                                    var n = "<strong>¥" + h.productPrice + "</strong>";
                                                    if (h.curPriceType && h.curPriceType == 2 && h.yhdPrice) {
                                                        n += "<del>¥" + h.yhdPrice + "</del>"
                                                    }
                                                    jQuery(m).html(n).removeAttr(E)
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        })
                    } catch (i) {}
                }
            }
        }
    };
    c.fn.extend({
        lazyPrice: function(a) {
            var b = new d();
            return b.lazyPrice(this, a)
        }
    })
})(jQuery);
(function(c) {
    var d = function(f) {
        var a = f,
            b = {
                activeLoadTime: 2000,
                load: true,
                activeLoadNum: 1,
                hfix: 100,
                callback: null,
                attr: "lazyLoad_textarea",
                flushPrice: true,
                flushPriceAttr: "productid",
                indexLoad: false,
                scrollLoad: true
            };
        c.extend(b, a);
        this.param = b
    };
    d.prototype = {
        constructor: d,
        doc: document,
        areaArray: [],
        lazyDom: function(i, j) {
            var b = this,
                a = b.param,
                h = i;
            if (j) {
                b.param = c.extend(a, j)
            }
            b.areaArray = b._getJqueryDomArray(h, a);
            if (a.indexLoad) {
                b._domScrollLoad(b.areaArray, a)
            }
            if (a.scrollLoad) {
                b._loadScrollDom(function() {
                    if (b.areaArray.length == 0) {
                        return
                    }
                    b._domScrollLoad(b.areaArray, a)
                })
            }
            if (a.load) {
                b._loadActiveDom(b.areaArray, a)
            }
        },
        _loadActiveDom: function(k, m) {
            var j = this,
                b = m,
                n = b.activeLoadTime,
                a = k;
            var l = setInterval(function() {
                var e = a.length;
                if (e == 0) {
                    clearInterval(l);
                    return
                }
                j._domActiveLoad(a, b)
            }, n)
        },
        _loadScrollDom: function(a) {
            loli.scroll(function() {
                a()
            }, 50)
        },
        _domScrollLoad: function(m, a) {
            var i = this,
                a = i.param,
                b = [];
            for (var n = 0, k = m.length; n < k; n++) {
                var l = i._getJqueryDom(m[n]);
                if (i.isInCurrScreen(l)) {
                    i._rendDom(l, a)
                } else {
                    b.push(l)
                }
            }
            i.areaArray = b
        },
        _domActiveLoad: function(l, b) {
            var o = this,
                m = b,
                i = l,
                n = i.length,
                p = Math.min(m.activeLoadNum, n);
            for (var a = 0; a < p; a++) {
                o._rendDom(o._getJqueryDom(i.shift()), m)
            }
        },
        _rendDom: function(a, q) {
            var l = a,
                o = q,
                p = o.attr,
                m = l.attr(p),
                b = c("#" + m),
                n = o.flushPrice,
                r = o.flushPriceAttr;
            l.html(b.val());
            l.removeAttr(p);
            if (n) {
                l.lazyPrice({
                    attr: r,
                    oneOffLoad: true
                })
            }
            if (o.callback) {
                o.callback.call(l)
            }
        },
        isInCurrScreen: function(o) {
            var m = this,
                l = o,
                r = m.doc,
                b = r.documentElement,
                n = m.param,
                q = n.hfix,
                p = Math.max(b.scrollTop, r.body.scrollTop),
                a = b.clientHeight + p;
            if (l) {
                return (l.offset().top < a + q) && (l.offset().top > p - q)
            }
            return false
        },
        _getJqueryDomArray: function(a, b) {
            var h = [],
                g = b.attr;
            if (a instanceof c) {
                h = a.find("[" + g + "]").get()
            } else {
                if (c.isArray(a)) {
                    h = a;
                    return h
                } else {
                    a = c(a);
                    h = a.find("[" + g + "]").get()
                }
            } if (h.length == 0) {
                if (a.attr(g)) {
                    h.push(a)
                }
            }
            return h
        },
        _getJqueryDom: function(a) {
            if (!a) {
                return a
            }
            if (a instanceof c) {
                return a
            }
            return c(a)
        }
    };
    c.fn.extend({
        lazyDom: function(a) {
            var b = new d();
            return b.lazyDom(this, a)
        }
    })
})(jQuery);

function getQueryStringRegExp(d) {
    var c = new RegExp("(^|\\?|&)" + d + "=([^&]*)(\\s|&|$)", "i");
    if (c.test(location.href)) {
        return unescape(RegExp.$2.replace(/\+/g, " "))
    }
    return ""
}
var ref = getQueryStringRegExp("tracker_u");
var uid = getQueryStringRegExp("uid");
var websiteid = getQueryStringRegExp("website_id");
var utype = getQueryStringRegExp("tracker_type");
var adgroupKeywordID = getQueryStringRegExp("adgroupKeywordID");
var expire_time = new Date((new Date()).getTime() + 30 * 24 * 3600000).toGMTString();
var expire_time2 = new Date((new Date()).getTime() + 30 * 24 * 3600000).toGMTString();
var expire_time3 = new Date((new Date()).getTime()).toGMTString();
var expire_time_wangmeng = new Date((new Date()).getTime() + 1 * 24 * 3600000).toGMTString();
if (ref) {
    if (ref != "") {
        document.cookie = "unionKey=" + ref + ";expires=" + expire_time_wangmeng + ";domain=." + no3wUrl + ";path=/"
    }
}
if (adgroupKeywordID) {
    if (adgroupKeywordID != "") {
        document.cookie = "adgroupKeywordID=" + adgroupKeywordID + ";expires=" + expire_time_wangmeng + ";domain=." + no3wUrl + ";path=/"
    }
}
if (utype) {
    if (utype != "") {
        document.cookie = "unionType=" + utype + ";expires=" + expire_time2 + ";domain=." + no3wUrl + ";path=/"
    }
}
if (uid) {
    document.cookie = "uid=" + uid + ";expires=" + expire_time + ";domain=." + no3wUrl + ";path=/"
}
if (websiteid) {
    document.cookie = "websiteid=" + websiteid + ";expires=" + expire_time + ";domain=." + no3wUrl + ";path=/"
};
var refer = document.referrer ? document.referrer : "";
if (refer != "") {
    refer = encodeURIComponent(refer)
}
var pars = document.location.search;
var input = new Object();
if (pars && pars.indexOf("?") == 0 && pars.length > 1) {
    pars = pars.substr(1);
    var list = pars.split("&");
    for (var n = 0; n < list.length; n++) {
        var item = list[n].split("=");
        if (item.length == 2) {
            input[item[0]] = item[1]
        }
    }
}
var tracker_u = input.tracker_u ? input.tracker_u : "";
var tracker_type = input.tracker_type ? input.tracker_type : "";
var tracker_pid = input.tracker_pid ? input.tracker_pid : "";
var tracker_src = input.tracker_src ? input.tracker_src : "";
var adgroupKeywordID = input.adgroupKeywordID ? input.adgroupKeywordID : "";
if (refer != "" && "" == tracker_u) {
    tracker_type = "0"
}
if (jQuery.cookie("unionKey")) {
    trackerContainer.addParameter(new Parameter("tracker_u", jQuery.cookie("unionKey")))
}
trackerContainer.addParameter(new Parameter("tracker_src", tracker_src));
var info_refer = document.referrer ? document.referrer : "";
if (info_refer != "") {
    info_refer = encodeURIComponent(info_refer)
}
trackerContainer.addParameter(new Parameter("infoPreviousUrl", info_refer));
trackerContainer.addParameter(new Parameter("infoTrackerSrc", tracker_src));
if (jQuery.cookie("yihaodian_uid")) {
    trackerContainer.addParameter(new Parameter("endUserId", jQuery.cookie("yihaodian_uid")))
}
if (jQuery.cookie("adgroupKeywordID")) {
    trackerContainer.addParameter(new Parameter("adgroupKeywordID", jQuery.cookie("adgroupKeywordID")))
}
if (jQuery.cookie("abtest")) {
    trackerContainer.addParameter(new Parameter("extField6", jQuery.cookie("abtest")))
}
if (jQuery.cookie("extField7")) {
    trackerContainer.addParameter(new Parameter("extField7", jQuery.cookie("extField7")))
}
if (jQuery.cookie("extField8")) {
    trackerContainer.addParameter(new Parameter("extField8", jQuery.cookie("extField8")))
}
if (jQuery.cookie("extField9")) {
    trackerContainer.addParameter(new Parameter("extField9", jQuery.cookie("extField9")))
}
if (jQuery.cookie("extField10")) {
    trackerContainer.addParameter(new Parameter("extField10", jQuery.cookie("extField10")))
}
var sendTrackerCookie = "";
if (jQuery.cookie("msessionid")) {
    sendTrackerCookie = "msessionid:" + jQuery.cookie("msessionid")
}
if (jQuery.cookie("uname")) {
    sendTrackerCookie += ",uname:" + jQuery.cookie("uname")
}
if (jQuery.cookie("unionKey")) {
    sendTrackerCookie += ",unionKey:" + jQuery.cookie("unionKey")
}
if (jQuery.cookie("unionType")) {
    sendTrackerCookie += ",unionType:" + jQuery.cookie("unionType")
}
if (jQuery.cookie("tracker")) {
    sendTrackerCookie += ",tracker:" + jQuery.cookie("tracker")
}
if (jQuery.cookie("LTINFO")) {
    sendTrackerCookie += ",LTINFO:" + jQuery.cookie("LTINFO")
}
trackerContainer.addParameter(new Parameter("cookie", sendTrackerCookie));
if (getQueryStringRegExp("fee") != null) {
    trackerContainer.addParameter(new Parameter("fee", getQueryStringRegExp("fee")))
}
trackerContainer.addParameter(new Parameter("provinceId", jQuery.cookie("provinceId")));
trackerContainer.addParameter(new Parameter("cityId", jQuery.cookie("cityId")));
var tracker_params = new Array();

function clearTrackPositionToCookie(d, f) {
    var e = new Date();
    e.setTime(e.getTime() - 10000);
    document.cookie = d + "=" + f + ";path=/;domain=." + no3wUrl + ";expires=" + e.toGMTString()
}

function initHijack() {
    jQuery.ajax({
        async: false,
        url: trackerContainer.toUrl(),
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback"
    })
}
jQuery(document).ready(function() {
    if (getCookie("linkPosition")) {
        linkPosition = getCookie("linkPosition");
        trackerContainer.addParameter(new Parameter("linkPosition", linkPosition));
        clearTrackPositionToCookie("linkPosition", linkPosition);
        initHijack()
    } else {
        if (!getCookie("linkPosition")) {
            callLoadlinkCookie()
        } else {
            initHijack()
        }
    }
});

function callTracker(b) {
    trackerContainer.addParameter(new Parameter("provinceId", b));
    trackerContainer.addParameter(new Parameter("cityId", jQuery.cookie("cityId")));
    jQuery.ajax({
        async: true,
        url: trackerContainer.toUrl(),
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsoncallback"
    })
};

function addTrackerToEvent(d, f) {
    var e = "tk";
    if (f) {
        e = f
    }
    if (d instanceof jQuery) {
        d.find("a[" + e + "]").click(function() {
            var a = $(this),
                b = a.attr(e);
            if (b) {
                addTrackPositionToCookie("1", b)
            }
        })
    } else {
        $(d + " a[" + e + "]").each(function(b) {
            var a = this;
            $(a).click(function() {
                addTrackPositionToCookie("1", $(a).attr(e))
            })
        })
    }
};
var yhdHead = yhdHead || {};
yhdHead.topMenuImgLazyLoad = function() {
    jQuery("#wideScreenTabShowID li img").each(function() {
        jQuery(this).attr("src", function() {
            return jQuery(this).attr("original")
        }).removeAttr("original")
    });
    jQuery("#allCategoryHeader ul li h3 img").each(function() {
        jQuery(this).attr("src", function() {
            return jQuery(this).attr("original")
        }).removeAttr("original")
    })
};
yhdHead.newTopTabShow = function(b, a) {
    if (b > a) {
        jQuery("#wideScreenTabShowID li").each(function(c) {
            if (c == a - 1) {
                jQuery(this).addClass("kf")
            }
            if (c > a - 1) {
                jQuery(this).remove()
            }
        })
    }
};
yhdHead.oldTopTabShow = function(b, a) {
    if (b > a) {
        jQuery("#global_menu span").each(function(c) {
            if (c > a - 1) {
                jQuery(this).remove()
            }
        })
    }
};
yhdHead.dealWideNarrowScreen = function() {
    var c = screen.width >= 1280;
    if (currSiteId == 1) {
        var b = jQuery("#wideScreenTabShowID li").length;
        var a = jQuery("#global_menu span").length;
        if (!c) {
            yhdHead.newTopTabShow(b, 10);
            yhdHead.oldTopTabShow(a, 7)
        } else {
            if (isIndex) {
                if (isIndex == 1) {
                    yhdHead.newTopTabShow(b, 10)
                } else {
                    yhdHead.newTopTabShow(b, 10)
                }
            } else {
                yhdHead.newTopTabShow(b, 10)
            }
            yhdHead.oldTopTabShow(a, 7)
        }
    } else {
        var b = jQuery("#wideScreenTabShowID li").length;
        var a = jQuery("#global_menu span").length;
        if (!c) {
            yhdHead.newTopTabShow(b, 8);
            yhdHead.oldTopTabShow(a, 6)
        } else {
            if (isIndex) {
                if (isIndex == 1) {
                    yhdHead.newTopTabShow(b, 9)
                } else {
                    yhdHead.newTopTabShow(b, 8)
                }
            } else {
                yhdHead.newTopTabShow(b, 8)
            }
            yhdHead.oldTopTabShow(a, 6)
        }
    }
};
yhdHead.topMenuTrackInit = function() {
    jQuery("#wideScreenTabShowID li a[tk]").click(function() {
        var b = $(this),
            a = b.attr("tk");
        if (a) {
            addTrackPositionToCookie("1", a)
        }
    });
    jQuery("#global_menu span a[tk]").click(function() {
        var b = $(this),
            a = b.attr("tk");
        if (a) {
            addTrackPositionToCookie("1", a)
        }
    })
};
jQuery(function() {
    yhdHead.topMenuImgLazyLoad();
    yhdHead.topMenuTrackInit()
});
jQuery(function() {
    var a = location.search;
    if (a.indexOf("isAdvStatistics=1") > -1 && a.indexOf("advParams=") > -1) {
        $.getScript("http://adbackend.yihaodian.com/js/adv/advertising.js", function() {
            var c = document.createElement("link");
            c.type = "text/css";
            c.rel = "stylesheet";
            c.href = "http://adbackend.yihaodian.com/css/adv/tk.css";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(c, b)
        })
    }
});
$(document).ready(function() {
    if (currSiteId && currSiteId == 1) {
        jQuery("#targetMedical").attr("href", "###").removeAttr("target").bind("click", medical_click);
        jQuery("#targetYw").attr("href", "###").removeAttr("target").bind("click", yw_click);
        if (jQuery("#wideScreenTabShowID a[href='http://www.111.com.cn']").size()) {
            jQuery("#wideScreenTabShowID a[href='http://www.111.com.cn']").attr("href", "###").removeAttr("target").bind("click", yw_click)
        } else {
            jQuery("#wideScreenTabShowID a[href='http://www.111.com.cn/']").attr("href", "###").removeAttr("target").bind("click", yw_click)
        } if (jQuery("#wideScreenTabShowID a[href='http://www.yiwang.cn']").size()) {
            jQuery("#wideScreenTabShowID a[href='http://www.yiwang.cn']").attr("href", "###").removeAttr("target").bind("click", medical_click)
        } else {
            jQuery("#wideScreenTabShowID a[href='http://www.yiwang.cn/']").attr("href", "###").removeAttr("target").bind("click", medical_click)
        }
    }
    if (currSiteId && currSiteId == 2) {
        jQuery("#revertYhd").bind("click", yhd_click);
        if (jQuery("#global_menu a[href='http://www.yihaodian.com/']").size()) {
            jQuery("#global_menu a[href='http://www.yihaodian.com/']").attr("href", "###").removeAttr("target").bind("click", yhd_click)
        } else {
            jQuery("#global_menu a[href='http://www.yihaodian.com']").attr("href", "###").removeAttr("target").bind("click", yhd_click)
        }
    }
});

function checkLogin_for_auth() {
    if (getCookie_for_auth("ut") == "") {
        return false
    } else {
        return true
    }
}

function getCookie_for_auth(c) {
    var d = document.cookie.split(";");
    for (var b = 0; b < d.length; b++) {
        var a = d[b].split("=");
        if (a[0].replace(/(^\s*)|(\s*$)/g, "") == c) {
            return a[1]
        }
    }
    return ""
}

function medical_click() {
    var d = "target_site=2";
    var a = "https://passport.yihaodian.com/auth/redirect.do?" + d + "&callback=?";
    var c = "http://www.yiwang.cn/";
    if (!checkLogin_for_auth()) {
        window.location.href = c;
        return false
    }
    try {
        jQuery.getJSON(a, function(e) {
            if (e) {
                if (e.is_yhd_login == 0) {}
                if (e.is_yhd_login == 1) {
                    c = e.target_url
                }
                window.location.href = c
            }
        })
    } catch (b) {
        window.location.href = c
    }
}

function yw_click() {
    var d = "target_site=1";
    var a = "https://passport.yihaodian.com/auth/redirect.do?" + d + "&callback=?";
    var c = "http://www.111.com.cn/";
    if (!checkLogin_for_auth()) {
        window.location.href = c;
        return false
    }
    try {
        jQuery.getJSON(a, function(e) {
            if (e) {
                if (e.is_yhd_login == 0) {}
                if (e.is_yhd_login == 1) {
                    c = e.target_url
                }
                window.location.href = c
            }
        })
    } catch (b) {
        window.location.href = c
    }
}

function yhd_click() {
    var c = "https://passport.111.com.cn/auth/revertToYhd.do?callback=?";
    var b = "http://www.yihaodian.com";
    if (!checkLogin_for_auth()) {
        window.location.href = b;
        return false
    }
    try {
        jQuery.getJSON(c, function(d) {
            if (d) {
                b = d.target_url;
                window.location.href = b
            }
        })
    } catch (a) {
        window.location.href = b
    }
};
var returnUrl = document.location.href;
var yhdPublicLogin = yhdPublicLogin || {};
var URLPrefix_passport = URLPrefix.passport;
yhdPublicLogin.checkLogin = function() {
    if (yhdPublicLogin.getCookie("ut")) {
        return true
    } else {
        return false
    }
};
yhdPublicLogin.getCookie = function(h) {
    var g = document.cookie.split(";");
    for (var e = 0; e < g.length; e++) {
        var f = g[e].split("=");
        if (f[0].replace(/(^\s*)|(\s*$)/g, "") == h) {
            return f[1]
        }
    }
    return ""
};
yhdPublicLogin.loadCssAndJs = function(f, h) {
    var g = "";
    var e = 0;
    if (typeof currVersionNum != "undefined") {
        e = currVersionNum
    }
    if (h == "js") {
        g = document.createElement("script");
        g.setAttribute("type", "text/javascript");
        g.setAttribute("charset", "UTF-8");
        g.setAttribute("src", f + "?" + e)
    } else {
        if (h == "css") {
            g = document.createElement("link");
            g.setAttribute("rel", "stylesheet");
            g.setAttribute("type", "text/css");
            g.setAttribute("href", f + "?" + e)
        }
    } if (typeof g != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(g)
    }
};
yhdPublicLogin.showLoginDiv = function(q, o, m) {
    if (o && yhdPublicLogin.checkLogin()) {
        return
    }
    if (q) {
        var p = "";
        if (q.toLowerCase().indexOf("http") < 0) {
            var k = window.location.protocol;
            var j = window.location.host;
            var l = k + "//" + j;
            p = l
        }
        var r = p + q;
        returnUrl = r
    }
    try {
        passportLoginFrame(URLPrefix_passport, null, function(b) {
            try {
                if (returnUrl) {
                    window.location.href = returnUrl
                } else {
                    window.location.reload(true)
                }
            } catch (a) {}
        }, m)
    } catch (n) {}
};
yhdPublicLogin.showLoginDivNone = function(i, h, k, l, j) {
    if (h && yhdPublicLogin.checkLogin()) {
        return
    }
    try {
        passportLoginFrame(i, k, l, j)
    } catch (e) {}
};
yhdPublicLogin.showTopLoginInfo = function() {
    try {
        writeHeaderContent()
    } catch (b) {}
};
jQuery(document).ready(function() {
    var b = "";
    if (URLPrefix && URLPrefix.statics) {
        b = URLPrefix.statics
    } else {
        if (currSiteId && currSiteId == 2) {
            b = "http://image.111.com.cn/statics"
        } else {
            if (currSiteType == 2) {
                b = "ttp://image.51ap.cn/statics"
            } else {
                b = "http://image.yihaodianimg.com/statics"
            }
        }
    }
    yhdPublicLogin.loadCssAndJs(b + "/global/css/global_yhdLib.css", "css");
    yhdPublicLogin.loadCssAndJs(b + "/global/js/global_yhdLib.js", "js");
    if (currSiteType == 2) {
        URLPrefix_passport = URLPrefix.passportmall
    }
    yhdPublicLogin.loadCssAndJs(URLPrefix_passport + "/front-passport/passport/js/login_frame_client.js", "js")
});
var shoplist_has_load = false;
jQuery(document).ready(function() {
    $(".searchForm .shopping_list_btn").hover(function() {
        if (shoplist_has_load == false) {
            if (isIndex == 1 && typeof(indexFlag) == "number" && indexFlag == 1) {
                jQuery("#div_shoppingList").lazyDom({
                    load: false,
                    flushPrice: false,
                    indexLoad: true,
                    scrollLoad: false
                })
            }
            shopList_loadCssAdnJs(URLPrefix.statics + "/global/js/header/shopList.js", "js");
            shopList_loadCssAdnJs(URLPrefix.statics + "/global/css/global_shopList.css", "css");
            shoplist_has_load = true
        }
    })
});

function shopList_loadCssAdnJs(c, a) {
    var b = "";
    c = c + "?" + currVersionNum;
    if (a == "js") {
        b = document.createElement("script");
        b.setAttribute("type", "text/javascript");
        b.setAttribute("src", c)
    } else {
        if (a == "css") {
            b = document.createElement("link");
            b.setAttribute("rel", "stylesheet");
            b.setAttribute("type", "text/css");
            b.setAttribute("href", c)
        }
    } if (typeof b != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(b)
    }
};
(function(b) {
    var a = new function() {
            var m = 0;
            this.init = function() {
                j();
                var o = b("#tsSlideList").find("img").size();
                if (isWidescreen) {
                    i(790, o)
                } else {
                    i(570, o)
                }
                d();
                n();
                c();
                e();
                l("#topbanner");
                g("#topCurtain")
            };
            this.lazyInit = function(o) {
                h(o);
                jQuery("#needLazyLoad").lazyImg({
                    wideAttr: isWidescreen ? "data-wi" : "data-si",
                    scrollLoad: true
                })
            };

            function k(o) {
                var q;
                if (o instanceof b) {
                    q = o
                } else {
                    q = b(o)
                }
                var p = q.attr("data-tkReal");
                if (p && p.length > 0 && p != "y") {
                    gotracker("1", p);
                    q.attr("data-tkReal", "y")
                }
            }

            function e() {
                b("#yaoIndex").delegate("a[tk]", "click", function() {
                    var p = b(this),
                        o = p.attr("tk");
                    if (o) {
                        addTrackPositionToCookie("1", o);
                        p.removeAttr("tk")
                    }
                })
            }

            function j() {
                setTimeout(q, 500);
                var p = "http://www.yihaodian.com/time/dynamictime";
                jQuery.getScript(p, function() {
                    q()
                });

                function q() {
                    if (m == 1) {
                        return
                    }
                    m = 1;
                    var x;
                    if (typeof(nowTime) == "undefined" || nowTime == undefined) {
                        var w = new Date();
                        x = new Array(w.getFullYear(), w.getMonth() + 1, w.getDate(), w.getHours(), w.getMinutes(), w.getSeconds())
                    } else {
                        x = nowTime.split("-")
                    }
                    var z = new Date(x[0], x[1] - 1, x[2], x[3], x[4], x[5]);
                    var t = z.getTime();
                    var v = b("#curGrouponendTime").val();
                    if (v && v != "0") {
                        var s = v.split("-");
                        if (s.length == 6) {
                            var u = new Date(s[0], s[1] - 1, s[2], s[3], s[4], s[5]);
                            var r = u.getTime();
                            b("#curGrouponRemainTime").val((r - t))
                        }
                    }
                    var y = b("#curGrouponRemainTime").val();
                    if (y) {
                        o(y)
                    }
                }

                function o(s) {
                    if (s && s >= 0) {
                        var u = s / 1000;
                        var v = Math.floor(u % 60);
                        var x = Math.floor((u / 60) % 60);
                        var r = Math.floor((u / 3600) % 24);
                        var t = Math.floor((u / 3600) / 24);
                        if (x >= 0 && x <= 9) {
                            x = "0" + x
                        }
                        if (v >= 0 && v <= 9) {
                            v = "0" + v
                        }
                        r = t * 24 + r;
                        var w = "剩余" + r + "小时" + x + "分" + v + "秒";
                        b("#grouponRemainTimeShow").html(w);
                        setTimeout(function() {
                            o(s - 1000)
                        }, 1000)
                    }
                }
            }

            function i(p, w) {
                var z = w || 5,
                    y = 1,
                    s, x = b("#content_tsSlide"),
                    q = x.find(".tsSlideList"),
                    A = q.find("li"),
                    u = p * z,
                    v = x.find(".tsSlideSwitch li"),
                    t = false;
                k(A.eq(0));
                x.hover(function() {
                    clearInterval(s)
                }, function() {
                    s = setInterval(function() {
                        if (y == z) {
                            y = 1;
                            o()
                        } else {
                            r();
                            y++
                        }
                        v.removeClass("cur");
                        v.eq(y - 1).addClass("cur");
                        k(A.eq(y - 1))
                    }, 5000);
                    k(A.eq(0))
                }).trigger("mouseleave");

                function o() {
                    A.eq(0).addClass("cur").css("left", u);
                    q.animate({
                        left: -u
                    }, 500, function() {
                        A.eq(0).removeClass("cur").css("left", 0);
                        q.css("left", 0)
                    })
                }

                function r() {
                    var B = -p * y;
                    q.animate({
                        left: B + "px"
                    }, 500)
                }
                loli.delay(v, "mouseover", null, function() {
                    var C = b(this).index(),
                        B = -p * C;
                    if (C !== b(".tsSlideSwitch .cur").index()) {
                        y = C + 1;
                        v.removeClass("cur");
                        b(this).addClass("cur");
                        q.stop().animate({
                            left: B
                        }, 500);
                        k(A.eq(C))
                    }
                }, 200)
            }

            function h(o) {
                b(o).find(".floor .con_middle").each(function() {
                    b(this).find(".product_list").eq(0).show()
                });
                loli.delay(".floor .con_title li", "mouseover", null, function() {
                    var p = b(this);
                    p.siblings().find("a").removeClass("on");
                    p.find("a").addClass("on");
                    p.parent().siblings(".product_list").hide().eq(p.index()).show()
                }, 200)
            }

            function d() {
                b(".con_middle").each(function() {
                    b(this).find(".product_list").eq(0).show()
                });
                loli.delay(".con_title li", "mouseover", null, function() {
                    var o = b(this);
                    o.siblings().find("a").removeClass("on");
                    o.find("a").addClass("on");
                    o.parent().siblings(".product_list").hide().eq(o.index()).show();
                    k(o.find("a"))
                }, 200)
            }

            function n() {
                b(".news_list:first").show();
                b(".news_title li").mouseenter(function() {
                    var o = b(this);
                    o.siblings().find("a").removeClass("on");
                    o.find("a").addClass("on");
                    o.parent().siblings(".news_list").hide().eq(o.index()).show();
                    k(o.find("a"))
                })
            }

            function c() {
                b("#needLazyLoad").delegate(".top5box li", "mouseover", function() {
                    if (b(this).hasClass("hover")) {
                        return
                    }
                    b(this).addClass("hover").siblings("li").removeClass("hover")
                })
            }

            function f() {
                var o = b("#scrollTop");
                loli.delay(window, "scroll", null, function() {
                    if (b(window).scrollTop() > 230) {
                        if (b.browser.msie == 1 && b.browser.version == 6) {
                            o.css("top", b(window).scrollTop() + 500)
                        }
                        o.show()
                    } else {
                        o.hide()
                    }
                }, 500);
                b("#go-top").click(function() {
                    b(window).scrollTop(0)
                })
            }

            function l(o, p) {
                var q = function(s, t) {
                    var r = jQuery(s);
                    if (!r.size()) {
                        return
                    }
                    var v = r.width();
                    var u = r.offset().left;
                    jQuery(s).children("." + t.closeCss).toggle(function() {
                        var w = jQuery(this);
                        r.removeClass("wrap").animate({
                            left: (u + v - t.closewidth) + "px",
                            width: t.closewidth + "px",
                            marginBottom: "-" + r.height() + "px"
                        }, 400, function() {
                            w.addClass(t.openCss).removeClass(t.closeCss)
                        })
                    }, function() {
                        jQuery(this).addClass(t.closeCss).removeClass(t.openCss);
                        r.animate({
                            left: "0px",
                            marginBottom: "0",
                            width: v
                        }, 400, function() {
                            jQuery(this).addClass("wrap")
                        })
                    })
                };
                q.config = {
                    closewidth: 60,
                    closeCss: "closebanner",
                    openCss: "openbanner"
                };
                q(o, q.config || p)
            }

            function g(o, p) {
                var q = function(r, s) {
                    if (!jQuery(r).size()) {
                        return
                    }
                    this.container = jQuery(r);
                    this.bindClose(this.container.children(".index_topbanner_close"));
                    this.show(0)
                };
                q.config = {
                    cookiename: "TOPSLIDER_SHOWED",
                    closeCss: ".index_topbanner_close"
                };
                q.prototype.bindClose = function(r) {
                    var s = this;
                    this.container.hover(function() {
                        r.show(240)
                    }, function() {
                        r.hide(240)
                    });
                    r.click(function() {
                        s.container.slideUp()
                    })
                };
                q.prototype.show = function(r) {
                    this.container.children("a:lt(" + r + ")").remove();
                    var t = this.container.find("a>img");
                    this.container.children("a:gt(" + r + ")").find("img").hide();
                    var s = this;
                    t.eq(0).load(function() {
                        s.slide()
                    });
                    t.each(function() {
                        jQuery(this).attr("src", jQuery(this).attr(isWidescreen ? "wideimg" : "shortimg")).removeAttr("wideimg").removeAttr("shortimg")
                    })
                };
                q.prototype.slide = function() {
                    var r = this.container.find("a>img");
                    if (r.size() > 1) {
                        this.container.slideDown();
                        setTimeout(function() {
                            r.eq(0).slideUp();
                            r.eq(1).slideDown()
                        }, 3000)
                    } else {
                        this.container.show()
                    }
                };
                return new q(o, p || q.config)
            }
        };
    jQuery(document).ready(function() {
        a.init();
        jQuery("#yaoIndex").lazyImg({
            wideAttr: isWidescreen ? "data-wi" : "data-si"
        });
        jQuery("#yaoIndex").lazyPrice();
        jQuery("#needLazyLoad").lazyDom({
            callback: function() {
                var c = this;
                a.lazyInit(c)
            }
        })
    })
})(jQuery);
