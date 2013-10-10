// Qualaroo for runnable.com
// (C) 2013 Qualaroo. All rights reserved.
// qualaroo.com

//$ site: 37522, generated: 2013-10-09 23:25:13 UTC
//$ type: base, rev. 39bc9957 (deploy)

if (typeof _kiq == 'undefined') {
  var _kiq = [];
}
if (typeof KI == 'undefined' && (function(a, d) {
  if (typeof KI_NOCHECK != 'undefined')
    return 1;
  if (a.match(/(MSIE [7,8,9,10])|(Firefox\/([3-9]|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25))|(Opera\/[9])|Safari|Chrome/i)) {
    if (a.match(/ipad/i))
      return 1;
    if (a.match(/msie/i) && d.compatMode == 'BackCompat')
      return 0;
    if (a.match(/(phone|mobile)/i))
      return 0;
    return 1;
  }
})(navigator.userAgent, document) == 1) {
  var $KI = {
    version: 3,
    s3: "s3.amazonaws.com",
    bucket: 'ki.js',
    preflight: $KI || {},
    guid: function() {
      function s() {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
      }
      return (s() + s() + "-" + s() + "-" + s() + "-" + s() + "-" + s() + s() + s())
    },
    css: function(css) {
      var c = css.replace(/images\//gi, (($KI.preflight.images) ? $KI.preflight.images : "//" + [$KI.s3, $KI.bucket, "images", $KI.version].join("/") + "/"));
      var t = new $KI.$("style", null, {
        type: "text/css"
      });
      if (t.styleSheet) {
        t.styleSheet.cssText = c
      } else {
        t.appendChild(document.createTextNode(c))
      }
      document.body.appendChild(t);
      return t
    },
    ready: function(func, bind) {
      var ran = false;

      function proxy() {
        if (ran) {
          return false
        }
        ran = true;
        func.apply(bind)
      }

      function check() {
        var r = document.readyState;
        if (r == "complete" || r == "loaded" || r == "interactive") {
          proxy();
          return true
        }
        return false
      }
      if (!check()) {
        if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", proxy, true);
          document.addEventListener("readystatechange", check, true);
          window.addEventListener("load", proxy, true)
        } else {
          if (document.attachEvent) {
            document.attachEvent("onreadystatechange", check);
            window.attachEvent("onload", proxy)
          }
        }
      }
    },
    bind: function(func, bind) {
      function proxy() {
        return func.apply(bind, arguments)
      }
      return proxy
    },
    iee: {},
    attach: function(element, type, func, bind) {
      if (bind) {
        func = $KI.bind(func, bind)
      }
      if (element.addEventListener) {
        element.addEventListener(type, func, false)
      } else {
        if (!element.id) {
          element.id = "event_" + new Date().getTime()
        }
        $KI.iee[element.id + type] = function(e) {
          if (!e.target && e.srcElement) {
            e.target = e.srcElement
          }
          if (!e.preventDefault) {
            e.preventDefault = function() {
              e.returnValue = false
            }
          }
          func(e)
        };
        element.attachEvent("on" + type, $KI.iee[element.id + type])
      }
    },
    detach: function(element, type, func) {
      if (element.removeEventListener) {
        element.removeEventListener(type, func, false)
      } else {
        element.detachEvent("on" + type, $KI.iee[element.id + type])
      }
    },
    scrolled: function() {
      var d = document,
        b = d.body,
        e = d.documentElement,
        p = Math.floor(Math.floor((e.scrollTop + b.scrollTop) / (e.scrollHeight - e.clientHeight) * 100));
      return p
    },
    type: function(item, is) {
      try {
        var type = typeof item;
        if (type === "object" && item instanceof Array) {
          type = "array"
        }
        if (type === "object" && item === null) {
          type = "null"
        }
        if (is) {
          if (type.toString() === is) {
            return true
          }
          return false
        }
        return type
      } catch (e) {
        return false
      }
    },
    size: function(o) {
      var s = 0;
      for (k in o) {
        if (o.hasOwnProperty(k)) {
          s++
        }
      }
      return s
    },
    getById: function(o, id) {
      for (var i = 0; i < o.length; i++) {
        var f = o[i];
        if (f && f.id == id) {
          return f
        }
      }
      return null
    },
    merge: function(a, b) {
      if (!a) {
        a = {}
      }
      for (var i in b) {
        if (!b.hasOwnProperty(i)) {
          continue
        }
        try {
          if ($KI.type(b[i], "object")) {
            a[i] = $KI.merge(a[i], b[i])
          } else {
            a[i] = b[i]
          }
        } catch (e) {
          a[i] = b[i]
        }
      }
      return a
    },
    clone: function(o) {
      var c = {};
      for (var i in o) {
        c[i] = o[i]
      }
      return c
    },
    contains: function(haystack, needle) {
      for (key in haystack) {
        if (haystack[key] == needle) {
          return true
        }
      }
      return false
    },
    select: function(object, selector) {
      var split = selector.split("/");
      for (var i = 0; i < split.length; i++) {
        if (!object[split[i]]) {
          return
        }
        object = object[split[i]]
      }
      return object
    },
    toInt: function(n) {
      return parseInt(n, 10)
    },
    query: function(o, p) {
      if ($KI.type(o, "object")) {
        var s = [];
        for (var i in o) {
          if (!o[i]) {
            continue
          }
          switch ($KI.type(o[i])) {
            case "string":
            case "number":
            case "boolean":
              s.push(((p) ? p + "[" + i + "]" : i) + "=" + $KI.url.encode(o[i]));
              break;
            case "object":
              s.push($KI.query(o[i], i));
              break
          }
        }
      }
      if (s && s.length) {
        return s.join("&")
      } else {
        return ""
      }
    },
    serialize: function(form, questions) {
      var data = [];
      for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (!element.name || !element.value) {
          continue
        }
        switch (element.type) {
          case "checkbox":
          case "radio":
            if (element.checked && this.q_match(questions, element.name)) {
              data.push(element.name + "=" + $KI.url.encode(element.value))
            }
            break;
          default:
            if (element.value && this.q_match(questions, element.name)) {
              data.push(element.name + "=" + $KI.url.encode(element.value))
            }
            break
        }
      }
      return data.join("&")
    },
    q_match: function(qids, str) {
      if (typeof qids == "undefined" || qids == null || qids.length == 0) {
        return true
      }
      for (var i = 0; i < qids.length; i++) {
        if (str.indexOf("[" + qids[i] + "]") > -1) {
          return true
        }
      }
      return false
    },
    ymd: function(date) {
      var s = date.split("-");
      return $KI.mktime(0, 0, 0, s[1], s[2], s[0])
    },
    mktime: function() {
      var d = new Date(),
        r = arguments,
        i = 0,
        e = ["Hours", "Minutes", "Seconds", "Month", "Date", "FullYear"];
      for (i = 0; i < e.length; i++) {
        if (typeof r[i] === "undefined") {
          r[i] = d["get" + e[i]]();
          r[i] += (i === 3)
        } else {
          r[i] = parseInt(r[i], 10);
          if (isNaN(r[i])) {
            return false
          }
        }
      }
      r[5] += (r[5] >= 0 ? (r[5] <= 69 ? 2000 : (r[5] <= 100 ? 1900 : 0)) : 0);
      d.setFullYear(r[5], r[3] - 1, r[4]);
      d.setHours(r[0], r[1], r[2]);
      return (d.getTime() / 1000 >> 0) - (d.getTime() < 0)
    },
    timezone: function() {
      var n = new Date();
      var ja1 = new Date(n.getFullYear(), 0, 1, 0, 0, 0, 0);
      var ju1 = new Date(n.getFullYear(), 6, 1, 0, 0, 0, 0);
      var t = ja1.toGMTString();
      var ja2 = new Date(t.substring(0, t.lastIndexOf(" ") - 1));
      t = ju1.toGMTString();
      var ju2 = new Date(t.substring(0, t.lastIndexOf(" ") - 1));
      var std_o = (ja1 - ja2) / (1000 * 60 * 60);
      var d_o = (ju1 - ju2) / (1000 * 60 * 60);
      var d = 0;
      if (std_o != d_o) {
        d = 1;
        var h = std_o - d_o;
        if (h >= 0) {
          std_o = d_o
        }
      }
      return [std_o, d]
    },
    hex: function(str) {
      var _ = [];
      for (var i = 0; i < 48; i++) {
        _.push(0)
      }
      _.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15);
      for (var i = 0; i < 153; i++) {
        _.push(0)
      }
      var len = str.length,
        rv = "",
        i = 0,
        c1, c2;
      while (len > 1) {
        h1 = str.charAt(i++);
        c1 = h1.charCodeAt(0);
        h2 = str.charAt(i++);
        c2 = h2.charCodeAt(0);
        rv += String.fromCharCode((_[c1] << 4) + _[c2]);
        len -= 2
      }
      return rv
    },
    sha1: function(msg) {
      function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4
      }

      function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;
        for (i = 0; i <= 6; i += 2) {
          vh = (val >>> (i * 4 + 4)) & 15;
          vl = (val >>> (i * 4)) & 15;
          str += vh.toString(16) + vl.toString(16)
        }
        return str
      }

      function cvt_hex(val) {
        var str = "";
        var i;
        var v;
        for (i = 7; i >= 0; i--) {
          v = (val >>> (i * 4)) & 15;
          str += v.toString(16)
        }
        return str
      }

      function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c)
          } else {
            if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128)
            } else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128)
            }
          }
        }
        return utftext
      }
      var blockstart;
      var i, j;
      var W = new Array(80);
      var H0 = 1732584193;
      var H1 = 4023233417;
      var H2 = 2562383102;
      var H3 = 271733878;
      var H4 = 3285377520;
      var A, B, C, D, E;
      var temp;
      msg = Utf8Encode(msg);
      var msg_len = msg.length;
      var word_array = new Array();
      for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j)
      }
      switch (msg_len % 4) {
        case 0:
          i = 2147483648;
          break;
        case 1:
          i = msg.charCodeAt(msg_len - 1) << 24 | 8388608;
          break;
        case 2:
          i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 32768;
          break;
        case 3:
          i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 128;
          break
      }
      word_array.push(i);
      while ((word_array.length % 16) != 14) {
        word_array.push(0)
      }
      word_array.push(msg_len >>> 29);
      word_array.push((msg_len << 3) & 4294967295);
      for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) {
          W[i] = word_array[blockstart + i]
        }
        for (i = 16; i <= 79; i++) {
          W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
        }
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
          temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 1518500249) & 4294967295;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp
        }
        for (i = 20; i <= 39; i++) {
          temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 1859775393) & 4294967295;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp
        }
        for (i = 40; i <= 59; i++) {
          temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 2400959708) & 4294967295;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp
        }
        for (i = 60; i <= 79; i++) {
          temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 3395469782) & 4294967295;
          E = D;
          D = C;
          C = rotate_left(B, 30);
          B = A;
          A = temp
        }
        H0 = (H0 + A) & 4294967295;
        H1 = (H1 + B) & 4294967295;
        H2 = (H2 + C) & 4294967295;
        H3 = (H3 + D) & 4294967295;
        H4 = (H4 + E) & 4294967295
      }
      var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
      return temp.toLowerCase()
    },
    shuffle: function(o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
      return o
    }
  };
  $KI.string = {
    match: function(str1, str2) {
      if (str1.indexOf("*") == -1) {
        return (str1 == str2)
      }
      if (str1 == str2) {
        return true
      }
      if (str1.length == 0) {
        return false
      }
      var startsWithWildcard = str1.substr(0, 1) == "*",
        endsWithWildcard = str1.substr(str1.length - 1, 1) == "*",
        parts = str1.split("*");
      for (var i = 0; i < parts.length; i++) {
        if (parts[i]) {
          var index = (startsWithWildcard || i > 0) ? str2.lastIndexOf(parts[i]) : str2.indexOf(parts[i]);
          if (index != -1) {
            if (i == 0 && !startsWithWildcard) {
              if (index != 0) {
                return false
              }
            }
            str2 = str2.substring(index + parts[i].length)
          } else {
            return false
          }
        }
      }
      if (endsWithWildcard) {
        return true
      } else {
        return str2 ? false : true
      }
    }
  };
  $KI.url = {
    query_parts: function(query) {
      if (!query) {
        return {}
      }
      if (query.indexOf("?") == 0) {
        query = query.substr(1)
      }
      var pairs = query.split("&");
      var results = {};
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        results[$KI.url.decode(pair[0])] = $KI.url.decode(pair[1])
      }
      return results
    },
    encode: function(string) {
      if (!string) {
        return null
      }
      return encodeURIComponent(string)
    },
    decode: function(value) {
      var u = {
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "*": "%2A",
        "~": "%7E",
        "!": "%21",
        "%20": "+"
      };
      if (value) {
        for (var e in u) {
          if (typeof(u[e]) == "string") {
            value = value.split(u[e]).join(e)
          }
        }
        value = decodeURIComponent(value)
      }
      return value
    }
  };
  $KI.bundle = function(name, methods) {
    this[name] = function() {
      var self = $KI.merge({
        init: function() {
          return this
        },
        option: function(o) {
          return $KI.select(this.options, o)
        },
        setOptions: function(o) {
          this.options = $KI.merge(self.options, o)
        }
      }, methods);
      var p;
      if (p = $KI.preflight[name]) {
        self = $KI.merge(self, p)
      }
      return self.init(arguments)
    }
  };
  $KI.is_bundle = function(b) {
    if ($KI.type($KI[b], "function")) {
      return true
    }
    return false
  };
  $KI.fx = function(g) {
    if (g.nodeType && g.nodeType == 1) {
      var h = g
    } else {
      if (String(g).match(/^#(\w+)/i)) {
        var h = document.getElementById(RegExp.$1 + "");
        if (!h) {
          return null
        }
      } else {
        return null
      }
    } if (typeof(h._fx) != "undefined" && h._fx) {
      h._fx._addSet();
      return h
    }
    h.fxVersion = 0.1;
    h._fx = {};
    h._fx.sets = [];
    h._fx._currSet = 0;
    if (typeof(h._fxTerminated) != "undefined") {
      try {
        delete h._fxTerminated
      } catch (err) {
        h._fxTerminated = null
      }
    }
    var k = {
      "left|top|right|bottom|width|height|margin|padding|spacing|backgroundx|backgroundy": "px",
      font: "pt",
      opacity: ""
    };
    var l = !! navigator.userAgent.match(/MSIE/ig);
    var m = {
      delay: 100,
      step: 5,
      unit: ""
    };
    var n = {
      opacity: function(a, b) {
        a = parseInt(a);
        if (isNaN(a)) {
          if (l) {
            var c = (new RegExp("alpha\s*\(opacity\s*=\s*(\d+)\)")).exec(h.style.filter + "");
            if (c) {
              return parseInt(c[1])
            } else {
              return 1
            }
          } else {
            return Math.round((h.style.opacity ? parseFloat(h.style.opacity) : 1) * 100)
          }
        } else {
          a = Math.min(100, Math.max(0, a));
          if (l) {
            h.style.zoom = 1;
            h.style.filter = "alpha(opacity=" + a + ");"
          } else {
            h.style.opacity = a / 100
          }
        }
      },
      backgroundx: function(a, b) {
        a = parseInt(a);
        var x = 0,
          y = 0;
        var c = (new RegExp("^(-?\d+)[^\d\-]+(-?\d+)")).exec(h.style.backgroundPosition + "");
        if (c) {
          x = parseInt(c[1]);
          y = parseInt(c[2])
        }
        if (isNaN(a)) {
          return x
        } else {
          h.style.backgroundPosition = a + b + " " + y + b
        }
      },
      backgroundy: function(a, b) {
        a = parseInt(a);
        var x = 0,
          y = 0;
        var c = (new RegExp("^(-?\d+)[^\d\-]+(-?\d+)")).exec(h.style.backgroundPosition + "");
        if (c) {
          x = parseInt(c[1]);
          y = parseInt(c[2])
        }
        if (isNaN(a)) {
          return y
        } else {
          h.style.backgroundPosition = x + b + " " + a + b
        }
      }
    };
    var o = {
      width: function() {
        return parseInt(h.offsetWidth)
      },
      height: function() {
        return parseInt(h.offsetHeight)
      },
      left: function() {
        var a = 0;
        for (var b = h; b; b = b.offsetParent) {
          a += parseInt(b.offsetLeft)
        }
        return a
      },
      top: function() {
        var a = 0;
        for (var b = h; b; b = b.offsetParent) {
          a += parseInt(b.offsetTop)
        }
        return a
      }
    };
    h.fxAddSet = function() {
      this._fx._addSet();
      return this
    };
    h.fxHold = function(a, b) {
      if (h._fx.sets[this._fx._currSet]._isrunning) {
        return this
      }
      var b = parseInt(b);
      this._fx.sets[isNaN(b) ? this._fx._currSet : b]._holdTime = a;
      return this
    };
    h.fxAdd = function(c) {
      var d = this._fx._currSet;
      if (this._fx.sets[d]._isrunning) {
        return this
      }
      for (var p in m) {
        if (!c[p]) {
          c[p] = m[p]
        }
      }
      if (!c.unit) {
        for (var e in k) {
          if ((new RegExp(e, "i").test(c.type))) {
            c.unit = k[e];
            break
          }
        }
      }
      c.onstart = (c.onstart && c.onstart.call) ? c.onstart : function() {};
      c.onfinish = (c.onfinish && c.onfinish.call) ? c.onfinish : function() {};
      if (!this._fx[c.type]) {
        if (n[c.type]) {
          this._fx[c.type] = n[c.type]
        } else {
          var f = this;
          this._fx[c.type] = function(a, b) {
            if (typeof(a) == "undefined") {
              return parseInt(f.style[c.type])
            } else {
              f.style[c.type] = parseInt(a) + b
            }
          }
        }
      }
      if (isNaN(c.from)) {
        if (isNaN(this._fx[c.type]())) {
          if (o[c.type]) {
            c.from = o[c.type]()
          } else {
            c.from = 0
          }
        } else {
          c.from = this._fx[c.type]()
        }
      }
      c._initial = c.from;
      this._fx[c.type](c.from, c.unit);
      this._fx.sets[d]._queue.push(c);
      return this
    };
    h.fxRun = function(a, b, c) {
      var d = h._fx._currSet;
      if (this._fx.sets[d]._isrunning) {
        return this
      }
      setTimeout(function() {
        if (h._fx.sets[d]._isrunning) {
          return h
        }
        h._fx.sets[d]._isrunning = true;
        if (h._fx.sets[d]._effectsDone > 0) {
          return h
        }
        h._fx.sets[d]._onfinal = (a && a.call) ? a : function() {};
        h._fx.sets[d]._onloop = (c && c.call) ? c : function() {};
        if (!isNaN(b)) {
          h._fx.sets[d]._loops = b
        }
        for (var i = 0; i < h._fx.sets[d]._queue.length; i++) {
          h._fx.sets[d]._queue[i].onstart.call(h);
          h._fx._process(d, i)
        }
      }, h._fx.sets[d]._holdTime);
      return this
    };
    h.fxPause = function(a, b) {
      this._fx.sets[!isNaN(b) ? b : this._fx._currSet]._paused = a;
      return this
    };
    h.fxStop = function(a) {
      this._fx.sets[!isNaN(a) ? a : this._fx._currSet]._stoped = true;
      return this
    };
    h.fxReset = function() {
      for (var i = 0; i < this._fx.sets.length; i++) {
        for (var j = 0; j < this._fx.sets[i]._queue.length; j++) {
          var a = this._fx.sets[i]._queue[j];
          if (isNaN(a._initial)) {
            this._fx[a.type]("", "")
          } else {
            this._fx[a.type](a._initial, a.unit)
          }
        }
      }
      var b = ["_fx", "fxHold", "fxAdd", "fxAddSet", "fxRun", "fxPause", "fxStop", "fxReset"];
      for (var i = 0; i < b.length; i++) {
        try {
          delete this[b[i]]
        } catch (err) {
          this[b[i]] = null
        }
      }
      this._fxTerminated = true
    };
    h._fx._addSet = function() {
      var a = this.sets.length;
      this._currSet = a;
      this.sets[a] = {};
      this.sets[a]._loops = 1;
      this.sets[a]._stoped = false;
      this.sets[a]._queue = [];
      this.sets[a]._effectsDone = 0;
      this.sets[a]._loopsDone = 0;
      this.sets[a]._holdTime = 0;
      this.sets[a]._paused = false;
      this.sets[a]._isrunning = false;
      this.sets[a]._onfinal = function() {};
      return this
    };
    h._fx._process = function(a, b) {
      if (!this.sets[a] || this.sets[a]._stoped || h._fxTerminated) {
        return
      }
      var c = this.sets[a]._queue[b];
      var d = this[c.type]();
      if ((c.step > 0 && d + c.step <= c.to) || (c.step < 0 && d + c.step >= c.to)) {
        if (!this.sets[a]._paused) {
          this[c.type](d + c.step, c.unit)
        }
        var e = this;
        setTimeout(function() {
          if (e._process) {
            e._process(a, b)
          }
        }, c.delay)
      } else {
        this[c.type](c.to, c.unit);
        this.sets[a]._effectsDone++;
        c.onfinish.call(h);
        if (this.sets[a]._queue.length == this.sets[a]._effectsDone) {
          this.sets[a]._effectsDone = 0;
          this.sets[a]._loopsDone++;
          this.sets[a]._onloop.call(h, this.sets[a]._loopsDone);
          if (this.sets[a]._loopsDone < this.sets[a]._loops || this.sets[a]._loops == -1) {
            for (var i = 0; i < this.sets[a]._queue.length; i++) {
              this[c.type](c.from, this.sets[a]._queue[i].unit);
              this.sets[a]._queue[i].onstart.call(h, this.sets[a]._loopsDone);
              this._process(a, i)
            }
          } else {
            this.sets[a]._onfinal.call(h)
          }
        }
      }
    };
    h._fx._addSet();
    return h
  };
  $KI.bundle("Metrics", {
    ga: false,
    km: false,
    seg: false,
    ga_prefix: null,
    init: function() {
      return this
    },
    record: function(event, props) {
      if (this.seg) {
        this.record_segmentio(event, props)
      } else {
        if (this.km) {
          if (typeof window._kmq === "object") {
            window._kmq.push(["record", event, $KI.merge($KI.clone(props), {
              "Survey source": "Qualaroo"
            })])
          }
        }
        if (this.ga) {
          this.record_ga(event, props)
        }
      }
    },
    record_ga: function(event, props) {
      if (typeof window._gaq === "object") {
        var trck_n = "_trackEvent";
        if (this.ga_prefix != null) {
          trck_n = this.ga_prefix + "._trackEvent"
        }
        sname = props["Nudge Name"];
        switch (event) {
          case "Answered nudge":
            for (var key in props) {
              if ("Nudge Name" != key && "Time to answer" != key && "Survey source" != key) {
                _gaq.push([trck_n, "Qualaroo - " + sname, key, props[key]])
              }
            }
            break;
          case "Clicked CTA":
            _gaq.push([trck_n, "Qualaroo - " + sname, event, props.CTA]);
            break;
          default:
            _gaq.push([trck_n, "Qualaroo", event, sname, 1, true])
        }
      }
    },
    record_segmentio: function(event, props) {
      if (typeof window.analytics === "object") {
        sname = props["Nudge Name"];
        switch (event) {
          case "Answered nudge":
            for (var key in props) {
              if ("Nudge Name" != key && "Time to answer" != key && "Survey source" != key) {
                analytics.track(key, {
                  category: "Qualaroo - " + sname,
                  label: props[key]
                })
              }
            }
            break;
          case "Clicked CTA":
            _gaq.push(["_trackEvent", "Qualaroo - " + sname, event, props.CTA]);
            analytics.track(event, {
              category: "Qualaroo - " + sname,
              label: props.CTA
            });
            break;
          default:
            analytics.track(event, {
              category: "Qualaroo",
              label: sname,
              noninteraction: true
            })
        }
      }
    }
  });
  $KI.bundle("Event", {
    bind: null,
    handlers: {},
    init: function() {
      return this
    },
    add: function(name, callback, bind) {
      if (!this.handlers[name]) {
        this.handlers[name] = []
      }
      this.handlers[name].push($KI.bind(callback, bind))
    },
    fire: function(name, data) {
      var h = this.handlers[name];
      if (h) {
        for (var i = 0; i < h.length; i++) {
          var retval = h[i](data);
          if (typeof retval != "undefined") {
            if ((typeof(retval.is_valid) != "undefined") && (false == retval.is_valid)) {
              return retval
            }
          }
        }
      }
    }
  });
  $KI.bundle("Cookie", {
    options: {
      prefix: "ki_",
      expire: 1826,
      is_session: false
    },
    init: function(args) {
      this.name = this.option("prefix") + args[0];
      this.def_value = args[1];
      this.get();
      if (!this.value && this.def_value) {
        this.set(this.def_value)
      }
      return this
    },
    get: function() {
      return this.value = this._get(this.name)
    },
    set: function(value) {
      return this.value = this._set(this.name, value, this.option("expire"))
    },
    destroy: function() {
      this._unset(this.name)
    },
    _get: function(k) {
      var c = "" + document.cookie,
        ind = c.indexOf(k);
      if (ind == -1 || k == "") {
        return ""
      }
      var ind1 = c.indexOf(";", ind);
      if (ind1 == -1) {
        ind1 = c.length
      }
      return unescape(c.substring(ind + k.length + 1, ind1))
    },
    _set: function(k, v, days) {
      var exp = "";
      if (this.options.is_session) {} else {
        var expires = new Date();
        expires.setDate(expires.getDate() + days);
        exp = expires.toGMTString()
      }
      cookieval = k + "=" + escape(v) + "; " + ((exp) ? ("expires=" + exp + "; ") : "") + "path=/";
      if (typeof KI_COOKIE_DOMAIN != "undefined") {
        cookieval += "; domain=" + KI_COOKIE_DOMAIN
      }
      document.cookie = cookieval;
      return v
    },
    _unset: function(k) {
      this._set(k, null, -200)
    }
  });
  $KI.bundle("Request", {
    options: {
      api: 'app.qualaroo.com',
      bucket: 'r.kissinsights.com'
    },
    init: function(args) {
      this.type = args[0];
      this.path = args[1];
      switch (this.type) {
        case "api":
          this.url = ((KI.location.ssl() ? "https" : "http")) + "://" + this.option("api") + this.path;
          break;
        case "bucket":
          this.url = "//s3.amazonaws.com/" + this.option("bucket") + this.path;
          break
      }
      return this
    },
    make: function() {
      this.script = new $KI.$("script", null, {
        type: "text/javascript",
        src: this.url + this.slug()
      });
      document.body.appendChild(this.script)
    },
    slug: function() {
      return ((this.path.indexOf("?") != -1) ? "&" : "?") + "_" + new Date().getTime()
    }
  });
  $KI.$ = function() {
    var self = {
      init: function(args) {
        this.type = args[0];
        this.id = args[1];
        this.attributes = args[2];
        if (this.type.toString().indexOf("<") != -1) {
          this.element = this._create(this.type)
        } else {
          this.element = document.createElement(this.type)
        }
        this.bind();
        if (this.id) {
          this.element.id = this.id
        }
        if ($KI.type(this.attributes, "object")) {
          this.set(this.attributes)
        }
        return this.element
      },
      bind: function() {
        for (var func in this) {
          if (!this.hasOwnProperty(func)) {
            continue
          }
          if ($KI.type(this[func], "function") && func != "init" && func.charAt(0) != "_") {
            this.element[func] = this[func]
          }
        }
      },
      set: function(property, value) {
        if (typeof property == "object") {
          for (var p in property) {
            if (!property.hasOwnProperty(p)) {
              continue
            }
            self.element[p] = self._unescape_html(property[p])
          }
        } else {
          self.element[property] = self._unescape_html(value)
        }
        return self.element
      },
      get: function(property) {
        return self.element[property]
      },
      parent: function(level) {
        var e = self.element.parentNode;
        if (typeof level == "number" && level > 1) {
          for (var i = 1; i < level; i++) {
            e = e.parentNode
          }
        }
        return e
      },
      seek: function(i) {
        return self.element.childNodes[i]
      },
      first: function() {
        var e = self.element;
        if (e.hasChildNodes()) {
          return e.childNodes[0]
        }
        return e
      },
      last: function() {
        var e = self.element;
        if (e.hasChildNodes()) {
          return e.childNodes[e.childNodes.length - 1]
        }
        return e
      },
      empty: function() {
        var e = self.element;
        if (e.hasChildNodes()) {
          while (e.childNodes.length >= 1) {
            e.removeChild(e.firstChild)
          }
        }
        return e
      },
      eachChild: function(callback, bind) {
        var e = self.element,
          callback = $KI.bind(callback, bind);
        if (e.hasChildNodes()) {
          for (var i = 0; i < e.childNodes.length; i++) {
            callback(e.childNodes[i])
          }
        }
        return e
      },
      replace: function(a) {
        self.element.parentNode.replaceChild(a, self.element);
        return self.element
      },
      attach: function(type, func, bind) {
        $KI.attach(self.element, type, $KI.bind(func, bind));
        return self.element
      },
      html: function(string) {
        self.element.innerHTML = string;
        return self.element
      },
      appendText: function(string) {
        self.element.adopt(document.createTextNode(self._unescape_html(string)));
        return self.element
      },
      hide: function() {
        self.element.style.display = "none";
        return self.element
      },
      is_hidden: function() {
        if (self.element.style.display == "none") {
          return true
        }
        return false
      },
      show: function() {
        self.element.style.display = "block";
        return self.element
      },
      cloak: function() {
        self.element.style.visibility = "hidden";
        return self.element
      },
      uncloak: function() {
        self.element.style.visibility = "";
        return self.element
      },
      addClass: function(name) {
        if (self.element.hasClass(name)) {
          return
        }
        self.element.className += name + " ";
        return self.element
      },
      hasClass: function(name) {
        if (self.element.className.indexOf(name) != -1) {
          return true
        }
      },
      removeClass: function(name) {
        self.element.className = self.element.className.replace(new RegExp(name, "g"), "");
        return self.element
      },
      getWidth: function() {
        return self.element.clientWidth
      },
      getHeight: function() {
        return self.element.clientHeight
      },
      position: function() {
        var cl = ct = 0,
          e = self.element;
        if (e.offsetParent) {
          do {
            cl += e.offsetLeft;
            ct += e.offsetTop
          } while (e = e.offsetParent);
          return [cl, ct]
        }
      },
      addStyle: function(key, value) {
        if (typeof key == "object") {
          for (var k in key) {
            if (!key.hasOwnProperty(k)) {
              continue
            }
            self.element.style[k] = key[k]
          }
        } else {
          self.element.style[key] = value
        }
        return self.element
      },
      getSavedStyle: function(property) {
        if (self.saved_styles[property]) {
          return self.saved_styles[property]
        }
      },
      adopt: function(obj) {
        switch ($KI.type(obj)) {
          case "string":
            self.element.appendChild(new $KI.$(obj, arguments[1], arguments[2]));
            break;
          case "array":
            for (var i in obj) {
              if (!obj.hasOwnProperty(i) || !obj[i]) {
                continue
              }
              self.element.appendChild(obj[i])
            }
            break;
          case "object":
            self.element.appendChild(obj);
            break
        }
        return self.element
      },
      prepend: function(obj) {
        self.element.insertBefore(obj, self.element.firstChild);
        return self.element
      },
      remove: function() {
        if (self.element.parentNode) {
          self.element.parentNode.removeChild(self.element)
        }
      },
      _create: function(html) {
        var d = document.createElement("div");
        d.innerHTML = html;
        return d.firstChild
      },
      _unescape_html: function(string) {
        if (string) {
          var temp = document.createElement("div");
          temp.innerHTML = string;
          var result = temp.childNodes[0].nodeValue;
          temp.removeChild(temp.firstChild);
          return result
        }
      }
    };
    return self.init(arguments)
  };
  $KI.bundle("Location", {
    options: {
      engines: {
        google: [/^https?:\/\/(www\.)?google\./i, /q=([^&]+)/i],
        yahoo: [/^https?:\/\/(www\.)?search\.yahoo\./i, /p=([^&]+)/i],
        bing: [/^https?:\/\/(www\.)?bing\./i, /q=([^&]+)/i],
        ask: [/^https?:\/\/(www\.)?ask\./i, /q=([^&]+)/i]
      }
    },
    init: function() {
      this.location = this.parse((("location" in this) ? this.location : $KI.clone(document.location)));
      this.referrer = new $KI.Cookie("r", this.check_referrer(document.referrer));
      return this
    },
    check_referrer: function(r) {
      var rh = r.toString().match(/\/\/(.*)\//);
      if (rh && rh[1].indexOf(this.location.host) == -1) {
        return r
      }
      return null
    },
    parse: function(loc) {
      for (var i in loc) {
        loc[i] = loc[i].toString().toLowerCase()
      }
      loc.host = loc.host.replace("www.", "");
      loc.clean = loc.protocol + "//" + loc.host;
      if (loc.pathname.charAt(loc.pathname.length - 1) == "/" && loc.pathname.length != 1) {
        loc.pathname = loc.pathname.substring(0, loc.pathname.length - 1)
      }
      loc.clean += loc.pathname;
      loc.query = $KI.url.query_parts(loc.search);
      loc.host_path = loc.clean.substring(loc.protocol.length + 2);
      return loc
    },
    ssl: function() {
      if (this.location.protocol.match(/https/)) {
        return true
      }
      return false
    },
    get: function(s) {
      return $KI.select(this.location, s)
    },
    has_query: function(s) {
      return (s in this.location.query)
    },
    query: function(s) {
      return this.location.query[s]
    },
    matches: function(match) {
      if (match.match(/^\/.+\/$/)) {
        match = match.slice(1, -1);
        match = $KI.url.decode(match).replace(/\s+/g, "+");
        return this.regex_match(match, true)
      } else {
        match = $KI.url.decode(match)
      } if (match.match(/\.\*/)) {
        return this.regex_match(match, false)
      } else {
        return this.match(match)
      }
    },
    match: function(match) {
      if (match.charAt(0) == "/") {
        var ignore_host = true,
          url = this.location.pathname
      } else {
        var ignore_host = false,
          url = this.location.host_path
      } if (this.location.search) {
        url += this.location.search
      }
      var url1 = this._sanitize(match, ignore_host),
        url2 = this._sanitize(url, ignore_host);
      if (url1 == url2) {
        return true
      }
      var url1parts = url1.split("?"),
        url2parts = url2.split("?");
      if (!$KI.string.match(this._remove_index(url1parts[0]), this._remove_index(url2parts[0]))) {
        return false
      }
      var params1 = $KI.url.query_parts(url1parts[1]),
        params2 = $KI.url.query_parts(url2parts[1]),
        value;
      for (var k in params1) {
        value = params1[k];
        if ($KI.type(value, "string")) {
          if (value == "*") {
            if (!params2[k]) {
              return false
            }
          } else {
            if (params2[k] != value) {
              return false
            }
          }
        }
      }
      return true
    },
    regex_match: function(match, pure_regexp) {
      var match = match.toString().toLowerCase();
      if (pure_regexp) {
        var against = this.location.href
      } else {
        if (match.charAt(0) == "/") {
          var against = this.location.pathname
        } else {
          var against = this.location.host_path
        }
      } if (pure_regexp) {
        if (new RegExp(match).test(against)) {
          return true
        } else {
          return false
        }
      }
      match = match.replace("/.*", "(/.*)?");
      if (new RegExp("^" + match + "$").test(against)) {
        return true
      }
      return false
    },
    search_terms: function() {
      var referrer = $KI.url.decode(this.referrer.get()),
        engines = this.option("engines");
      if (!referrer) {
        return null
      }
      if ($KI.type(engines, "object")) {
        for (var i in engines) {
          if (!engines.hasOwnProperty(i)) {
            continue
          }
          if (new RegExp(engines[i][0]).test(referrer)) {
            var m = referrer.match(engines[i][1]);
            if (m && m[1]) {
              return {
                engine: i,
                terms: $KI.url.decode(m[1]).replace(/['"]/g, "").replace(/[\s,\.]+/g, " ").replace(/\p{P}+/, "").toLowerCase()
              }
            } else {
              return {
                engine: i,
                terms: null
              }
            }
          }
        }
      }
      return null
    },
    _sanitize: function(url, strip_host) {
      var url = url.toLowerCase().replace(/^https?/i, "").replace(/^:\/\//i, "").replace(/^www./i, "");
      if (strip_host) {
        if (url.match(/\//)) {
          url = url.replace(/^.*?\//, "/")
        } else {
          url = ""
        } if (url.indexOf("/") != 0) {
          url = "/" + url
        }
      }
      return url.replace(/\#.*/, "")
    },
    _remove_index: function(path) {
      return path
    }
  });
  $KI.bundle("Visitor", {
    timer_i: 0,
    events: {},
    identity_name: null,
    init: function() {
      this.start_timer();
      this.uid_c = new $KI.Cookie("u", $KI.guid());
      this.sid = $KI.guid();
      this.views_c = new $KI.Cookie("t");
      this.update_views();
      this.timezone = $KI.timezone();
      this.language = navigator.language;
      this.history = window.history;
      return this
    },
    start_timer: function() {
      this.timer = setInterval($KI.bind(function() {
        this.timer_i++
      }, this), 1000)
    },
    stop_timer: function() {
      clearInterval(this.timer);
      return this.timer_i
    },
    uid: function() {
      return this.uid_c.get()
    },
    sessid: function() {
      return this.sid
    },
    identity: function(name) {
      if (name) {
        return this.identity_name = name
      } else {
        return this.identity_name
      }
    },
    views: function(k) {
      var m = {
        first: 0,
        last: 1,
        current: 2,
        unique: 3,
        all: 4
      }, c = this.views_c.get().split(";");
      return c[m[k]]
    },
    update_views: function() {
      var c = this.views_c.get().split(";"),
        n = new Date().getTime(),
        m = 12,
        f = [];
      if (c.length !== 5) {
        f.push(n, n, n, 1, 1)
      } else {
        if (c[1] > n) {
          f.push(c[0], n, n, c[3], c[4])
        } else {
          f = c;
          if (((n - c[1]) / 1000) / 3600 >= m) {
            f[1] = n;
            f[3]++
          }
          f[2] = n;
          f[4]++
        }
      }
      for (var i = 0; i < f.length; i++) {
        f[i] = $KI.toInt(f[i])
      }
      this.views_c.set(f.join(";"));
      return f
    },
    to_query: function() {
      var h = {
        u: this.sessid(),
        au: this.uid(),
        i: this.identity(),
        t: this.stop_timer(),
        tz: this.timezone.join(","),
        l: this.language,
        h: this.history.length
      };
      return $KI.query(h)
    }
  });
  $KI.bundle("Survey", {
    current: {
      node_type: null,
      node: null
    },
    options: {
      default_thanks_msg: "Thank you! Your response has been sent.",
      thanks: {
        message: "__DEFAULT__",
        close: [30 * 1000, 60 * 1000]
      },
      selection_submits: true
    },
    init: function(args) {
      var o = args[0];
      this.id = o.id;
      this.setOptions(o.options);
      this.status_c = new $KI.Cookie("s");
      this.locale = KI.locale.use(this.option("language"));
      this.view_type = o.view_type || "default";
      this.name = o.name || null;
      this.requires = o.requires;
      this.questions = [];
      if ((typeof(o.questions) != "undefined") && o.questions != null) {
        for (var i = 0; i < o.questions.length; i++) {
          var q = new $KI.Question(o.questions[i], i, this);
          this.questions[i] = q
        }
      }
      this.question_screens = o.question_screens;
      this.message_screens = o.message_screens;
      this.actions = o.actions;
      this.start = o.start || null;
      if ((typeof(this.start) == "undefined") || this.start == null) {
        this.start = {
          node_type: "question",
          id: this.questions[0].id
        }
      }
      this.update_cookie();
      if (this.options.fullpage) {
        this.options.abrupt = true
      }
      return this
    },
    getQuestionAndAnswer: function(qid, aid) {
      var q = $KI.getById(this.questions, qid);
      if (q && q.answers) {
        var a = $KI.getById(q.answers, aid);
        if (a) {
          return [q, a]
        }
      }
      return null
    },
    init_view: function(view) {
      if ($KI.is_bundle("Survey_" + view)) {
        this.view = new $KI["Survey_" + view](this)
      }
    },
    update_cookie: function() {
      var s = this.status_c.get();
      if (s.indexOf("{") != -1) {
        this.status_c.set(this._encode(eval("(" + s + ")")))
      }
    },
    __: function(key, value) {
      var map = {
        views: 0,
        completed: 1,
        minimized: 3,
        participant: 4
      };
      var current = this._decode(this.status_c.get());
      if (!current[this.id]) {
        current[this.id] = [0, 0, 0, 0, 2]
      }
      if ($KI.type(value) != "undefined") {
        if (value === "++") {
          current[this.id][map[key]]++
        } else {
          current[this.id][map[key]] = value
        }
        this.status_c.set(this._encode(current))
      } else {
        return $KI.toInt(current[this.id][map[key]])
      }
    },
    setRequires: function(r) {
      this.requires = $KI.merge(this.requires, r)
    },
    require: function(req) {
      return $KI.select(this.requires || {}, req)
    },
    ping: function() {
      var v = KI.visitor,
        l = KI.location,
        r = new $KI.Request("bucket", "/c.js?" + [$KI.query({
          id: this.id,
          cid: KI.customer.id,
          ref: l.referrer.get(),
          p: l.get("href")
        }), v.to_query()].join("&")).make()
    },
    can_show: function() {
      var identity = KI.visitor.identity();
      if (KI.location.has_query("preview")) {
        return true
      }
      var ua = this.require("ua");
      if (ua && (new RegExp(ua, "i").test(navigator.userAgent))) {
        return false
      }
      if (this.__("completed") && this.option("persistent") != true) {
        return false
      }
      var completed = this.require("completed");
      if (completed) {
        if (id = KI.get_by_id("surveys", completed)) {
          var check = new $KI.Survey(id);
          if (!check.__("completed")) {
            return false
          }
        } else {
          return false
        }
      }
      if (this.option("one_shot") && this.__("views") >= 1) {
        return false
      }
      if (this.option("tab_closes") && this.__("minimized")) {
        return false
      }
      var signed_in = this.require("signed_in");
      if (signed_in && (("true" === signed_in) && (null === identity)) || (("false" === signed_in) && (!(null === identity)))) {
        return false
      }
      if (this.require("all_views") && this.require("all_views") > KI.visitor.views("all")) {
        return false
      }
      if (this.require("views") && (this.require("views") > KI.visitor.views("unique"))) {
        return false
      }
      if (this.require("survey_views") && (this.require("survey_views") > this.__("views"))) {
        return false
      }
      var specify_ids = this.require("specify_ids");
      if (specify_ids) {
        var policy = specify_ids.policy;
        var list = specify_ids.list;
        if ($KI.type(list, "object")) {
          if (!identity) {
            return false
          }
          if (("whitelist" == policy) && (!list[$KI.sha1(identity)])) {
            return false
          }
          if (("blacklist" == policy) && list[$KI.sha1(identity)]) {
            return false
          }
        }
      }
      var now = $KI.mktime();
      var start = this.require("start");
      if (start && start.length == 10 && $KI.ymd(start) > now) {
        return false
      }
      var end = this.require("end");
      if (end && end.length == 10 && $KI.ymd(end) < now) {
        return false
      }
      if (this.require("direct") && KI.location.referrer.get()) {
        return false
      }
      var search = this.require("search");
      if (search) {
        var searched_for = KI.location.search_terms();
        if (!searched_for) {
          return false
        }
        if (search.terms && !new RegExp("(" + search.terms.split(" ").join("|") + ")", "ig").test(searched_for.terms)) {
          return false
        }
        if (search.no_search_terms && searched_for.terms) {
          return false
        }
        if (search.engine && search.engine != "any" && search.engine != searched_for.engine) {
          return false
        }
      }
      var participant = this.__("participant");
      if (isNaN(participant) || (2 == participant)) {
        var sample_percent_visitors = this.require("percent_visitors");
        sample_percent_visitors = parseFloat(sample_percent_visitors);
        if (sample_percent_visitors && !isNaN(sample_percent_visitors) && (sample_percent_visitors >= 0) && (sample_percent_visitors <= 100)) {
          var percentage_shown = 100 * Math.random();
          if (percentage_shown > sample_percent_visitors) {
            this.__("participant", 0);
            return (false)
          } else {
            this.__("participant", 1)
          }
        }
      } else {
        if (0 == participant) {
          return (false)
        } else {
          if (1 != participant) {
            throw new Error("Illegal ki_s cookie value")
          }
        }
      } if (($KI.select(this, "requires/custom") != undefined) && ($KI.size(this.requires.custom) > 0)) {
        for (var property in this.requires.custom) {
          var qtp_value = this.requires.custom[property];
          var actual_value = KI.props[property] + "";
          if (!(actual_value == qtp_value)) {
            return false
          }
        }
      }
      if (($KI.select(this, "requires/optimizely") != undefined) && ($KI.size(this.requires.optimizely) > 0)) {
        var experiment_id = this.requires.optimizely.experiment_id;
        var variation_index = -1;
        if (typeof(optimizely) != "undefined" && optimizely.variationMap.hasOwnProperty(experiment_id)) {
          variation_index = optimizely.variationMap[experiment_id]
        } else {
          console.log("Optimizely returns false");
          return false
        } if (variation_index > -1) {
          var cur_variation_name = optimizely.data.variations[optimizely.data.experiments[experiment_id].variation_ids[variation_index]].name;
          if (!$KI.contains(this.requires.optimizely.variation_names, cur_variation_name)) {
            return false
          }
        }
      }
      var event = this.require("event");
      if (event && !this.__("minimized")) {
        this.event_block = true;
        switch (event) {
          case "scroll":
            this.func = $KI.bind(function(e) {
              var p = $KI.scrolled();
              if (p > 50) {
                $KI.detach(document.body, "mousewheel", this.func);
                $KI.detach(document.body, "DOMMouseScroll", this.func);
                this.event_block = false;
                this.show();
                this.func = null
              }
            }, this);
            $KI.attach(document.body, "mousewheel", this.func);
            $KI.attach(document.body, "DOMMouseScroll", this.func);
            break;
          case "movetoclose":
            this.func = $KI.bind(function(e) {
              if (e.pageY < 10 || e.clientY < 10) {
                $KI.detach(document, "mousemove", this.func);
                this.event_block = false;
                this.show()
              }
            }, this);
            $KI.attach(document, "mousemove", this.func);
            break
        }
      }
      return true
    },
    show: function() {
      if (!this.event_block) {
        this.init_view(this.view_type);
        if (this.view) {
          last_stop = this.show_node(this.start);
          this.__("views", "++");
          this.ping();
          KI.metrics.record("Saw nudge", {
            "Nudge Name": this.name
          });
          this.view.show();
          KI.event.fire("show")
        }
      }
    },
    submit: function(e) {
      if (e) {
        e.preventDefault()
      }
      if (this.option("prevent_send")) {
        return false
      }
      var cbArg = this.get_callback_arg(this.current);
      var cbResponse = KI.event.fire("submit", {
        current_fields: cbArg
      });
      if (typeof cbResponse != "undefined") {
        if ((typeof(cbResponse.is_valid) != "undefined") && (false == cbResponse.is_valid)) {
          var message = "Please check your input!";
          if ((typeof(cbResponse.error_message) != "undefined") && (null != cbResponse.error_message)) {
            message = cbResponse.error_message
          }
          alert(message);
          return
        }
      }
      var last_stop = false;
      var next_node_conf = {
        node_type: "thanks",
        id: null
      };
      var qids = null;
      switch (this.current.node_type) {
        case "question":
          var q = new $KI.Question(this.current.node, 0, this);
          var validity = q.validate_response(this.view.form);
          if (validity.valid == false) {
            this.view.show_error(validity.msg);
            return
          }
          qids = [q.id];
          next_node_conf = q.get_next_conf(this.view.form);
          var serialized = $KI.serialize(this.view.form, qids);
          this.send_response(serialized);
          break;
        case "question_screen":
          for (var j = 0; j < this.current.node.questions.length; j++) {
            var q = this.find_question(this.current.node.questions[j]);
            var validity = q.validate_response(this.view.form);
            if (validity.valid == false) {
              this.view.show_error(validity.msg);
              return
            }
          }
          qids = this.current.node.questions;
          if (this.current.node.next) {
            next_node_conf = this.current.node.next
          }
          var serialized = $KI.serialize(this.view.form, qids);
          this.send_response(serialized);
          break;
        case "action":
          if (this.current.node.next) {
            next_node_conf = this.current.node.next
          }
          break
      }
      last_stop = this.show_node(next_node_conf);
      try {
        this.track(cbArg)
      } catch (e) {}
      this.__("completed", 1)
    },
    show_node: function(node_conf) {
      var node = {
        node_type: null,
        node: null
      };
      var is_last_stop = false;
      if (node_conf) {
        node.node_type = node_conf.node_type;
        switch (node_conf.node_type) {
          case "thanks":
          case "message_screen":
            if (null == node_conf.id) {
              node.node = this.options.thanks;
              is_last_stop = true
            } else {
              node.node = this.find_thankyou(node_conf.id)
            }
            node.node = $KI.merge(this.options.thanks, node.node);
            break;
          case "question_screen":
            node.node = this.find_question_screen(node_conf.id);
            break;
          case "question":
            node.node = this.find_question(node_conf.id);
            break;
          case "action":
            node.node = this.find_action(node_conf.id);
            break
        }
      }
      if (null == node.node) {
        node.node_type = "thanks";
        node.node = this.options.thanks;
        is_last_stop = true
      }
      this.current = node;
      switch (node.node_type) {
        case "thanks":
        case "message_screen":
          if ("redirect" == node.node.type) {
            KI.event.add("responseSent", $KI.bind(function() {
              window.location = node.node.redirect.url
            }, this.view))
          } else {
            this.view.show_thanks(node.node)
          }
          break;
        case "question_screen":
          this.view.show_question_screen(node.node);
          break;
        case "question":
          this.view.show_question(node.node);
          break;
        case "action":
          this.perform_action(node.node);
          break
      }
      return is_last_stop
    },
    get_callback_arg: function(current_node) {
      var callback_arg = [];
      switch (current_node.node_type) {
        case "question":
          var q = new $KI.Question(current_node.node, 0, this);
          arg = {
            question: q.title,
            answer: q.read_answer(this.view.form)
          };
          if ((typeof(q.canonical_name) != "undefined") && (q.canonical_name != null)) {
            arg.canonical_name = q.canonical_name
          }
          callback_arg.push(arg);
          break;
        case "question_screen":
          var question_screen = current_node.node;
          for (var j = 0; j < question_screen.questions.length; j++) {
            var q = this.find_question(question_screen.questions[j]);
            arg = {
              question: q.title,
              answer: q.read_answer(this.view.form)
            };
            if ((typeof(q.canonical_name) != "undefined") && (q.canonical_name != null)) {
              arg.canonical_name = q.canonical_name
            }
            callback_arg.push(arg)
          }
          break
      }
      return callback_arg
    },
    get_all_values: function() {
      var ret = [];
      for (var j = 0; j < this.questions.length; j++) {
        var q = this.questions[j];
        arg = {
          question: q.title,
          answer: q.read_answer(this.view.form)
        };
        if ((typeof(q.canonical_name) != "undefined") && (q.canonical_name != null)) {
          arg.canonical_name = q.canonical_name
        }
        ret.push(arg)
      }
      return ret
    },
    find_question: function(id) {
      for (var j = 0; j < this.questions.length; j++) {
        if (this.questions[j].id == id) {
          return this.questions[j]
        }
      }
      return null
    },
    find_thankyou: function(id) {
      var thanks_screens = this.message_screens;
      if (thanks_screens) {
        for (var j = 0; j < thanks_screens.length; j++) {
          if (thanks_screens[j].id == id) {
            return thanks_screens[j]
          }
        }
      }
      return null
    },
    find_question_screen: function(id) {
      var question_screens = this.question_screens;
      if (question_screens) {
        for (var j = 0; j < question_screens.length; j++) {
          if (question_screens[j].id == id) {
            return question_screens[j]
          }
        }
      }
      return null
    },
    find_action: function(id) {
      for (var j = 0; j < this.actions.length; j++) {
        if (this.actions[j].id == id) {
          return this.actions[j]
        }
      }
      return null
    },
    send_response: function(serialized) {
      var v = KI.visitor,
        l = KI.location,
        f = serialized,
        r = new $KI.Request("bucket", "/r.js?" + [$KI.query({
          id: this.id,
          ref: l.referrer.get(),
          p: l.get("href"),
          rp: KI.props
        }), v.to_query(), f].join("&")).make()
    },
    cta_clicked: function(message_screen) {
      var url = decodeURIComponent(message_screen.cta.url);
      var cta_label = message_screen.cta.text + "->" + url;
      KI.metrics.record("Clicked CTA", {
        "Nudge Name": this.name,
        CTA: cta_label
      });
      this.ping_on_thank_you_cta_clicked(message_screen);
      setTimeout(function() {
        message_screen.cta.new_window ? window.open(url, "_blank") : window.location = url
      }, 300)
    },
    ping_on_thank_you_cta_clicked: function(cta) {
      var v = KI.visitor,
        l = KI.location,
        r = new $KI.Request("bucket", "/a.js?" + [$KI.query({
          id: this.id,
          ctaid: (typeof cta != "undefined" && cta.id) ? cta.id : 0,
          ref: l.referrer.get(),
          p: l.get("pathname"),
          rp: KI.props
        }), v.to_query()].join("&")).make()
    },
    call_nudge_action_server: function(action) {
      var qas = this.get_all_values();
      var qa_ser = {};
      for (var i = 0; i < qas.length; i++) {
        var qa = qas[i];
        if (qa.canonical_name && qa.answer.value) {
          qa_ser[$KI.url.encode(qa.canonical_name)] = qa.answer.value
        }
      }
      var v = KI.visitor,
        l = KI.location,
        r = new $KI.Request("api", "/nudge_actions/perform?" + [$KI.query({
          id: this.id,
          aid: (typeof action != "undefined" && action.id) ? action.id : 0,
          ref: l.referrer.get(),
          p: l.get("pathname"),
          rp: KI.props
        }), v.to_query(), $KI.query(qa_ser)].join("&")).make()
    },
    perform_action: function(action) {
      if (this.option("preview_mode") == true) {
        this.preview_action(action);
        return
      }
      switch (action.action_type) {
        case "olark":
          this.view.close();
          show_olark = true;
          olark("api.box.show");
          olark("api.box.expand");
          olark("api.chat.sendNotificationToOperator", {
            body: "Olark action has been invoked on nudge " + this.name
          });
          this.ping_on_thank_you_cta_clicked(action);
        case "zopim":
          this.view.close();
          if ((!(("undefined" === typeof $zopim) || (undefined === $zopim))) && $zopim) {
            $zopim.livechat.bubble.setTitle("Questions?");
            $zopim.livechat.bubble.setText("Click here to chat with us!");
            $zopim.livechat.window.show()
          }
          this.ping_on_thank_you_cta_clicked(action);
        case "snapengage":
          this.view.close();
          if ((!(("undefined" === typeof SnapABug) || (undefined === SnapABug))) && SnapABug) {
            SnapABug.openProactiveChat(true, true, "Hello, can I help you with our setup process?")
          }
          this.ping_on_thank_you_cta_clicked(action);
        case "livechat":
          this.view.close();
          if ((!(("undefined" === typeof LC_API) || (undefined === LC_API))) && LC_API) {
            LC_API.open_chat_window()
          }
          this.ping_on_thank_you_cta_clicked(action);
          break;
        case "redirect":
          this.view.close();
          setTimeout(function() {
            action.redirect.new_window ? window.open(decodeURIComponent(action.redirect.url), "_blank") : window.location = decodeURIComponent(action.redirect.url)
          }, 400);
          this.ping_on_thank_you_cta_clicked(action);
          break;
        default:
          this.call_nudge_action_server(action)
      }
      this.submit()
    },
    preview_action: function(action) {
      var a_p_msg = "ACTION " + action.action_type + " invoked";
      switch (action.action_type) {
        case "olark":
          a_p_msg = "ACTION: Olark chat would start now";
          break;
        case "redirect":
          a_p_msg = "ACTION: User would be redirected to " + decodeURIComponent(action.redirect.url);
          break;
        default:
      }
      var preview_notice = {
        type: "message",
        id: -1,
        message: a_p_msg,
        show_checkmark: false
      };
      this.view.show_thanks(preview_notice);
      if (action.next) {
        setTimeout($KI.bind(this.submit, this), 3000)
      } else {
        setTimeout($KI.bind(this.view.close, this.view), 3000)
      }
    },
    track: function(data) {
      var props = {
        "Nudge Name": this.name
      };
      for (var i = 0; i < data.length; i++) {
        var elt = data[i];
        var k = elt.question;
        if (typeof elt.canonical_name != "undefined") {
          k = elt.canonical_name
        }
        if (elt.answer instanceof Array) {
          var v = "";
          for (var j = 0; j < elt.answer.length; j++) {
            var vi = elt.answer[j].value;
            if (typeof elt.answer[j].canonical_name != "undefined") {
              vi = elt.answer[j].canonical_name
            }
            v += vi;
            if (j != elt.answer.length - 1) {
              v += ", "
            }
          }
          if (k && v) {
            props[k] = v
          }
        } else {
          var v = elt.answer.value;
          if (typeof elt.answer.canonical_name != "undefined") {
            v = elt.answer.canonical_name
          }
          if (k && v) {
            props[k] = v
          }
        }
      }
      KI.metrics.record("Answered nudge", props)
    },
    powered_link: function() {
      return "https://app.qualaroo.com/r/p" + this._utm() + "&r=" + this.id
    },
    _decode: function(string) {
      var obj = {}, split = string.split(";");
      for (var i = 0; i < split.length; i++) {
        var o = split[i].split(":");
        if (o[0] && o[1]) {
          obj[o[0]] = o[1].split(".")
        }
      }
      return obj
    },
    _encode: function(object) {
      var string = [];
      for (var i in object) {
        if (object.hasOwnProperty(i)) {
          string.push(i + ":" + object[i].join("."))
        }
      }
      return string.join(";")
    },
    _utm: function() {
      return "?" + $KI.query({
        utm_source: "suview",
        utm_medium: ((this.option("light") == true) ? "light" : "dark"),
        utm_campaign: document.location.hostname.toString().replace("www.", ""),
        utm_content: this.__("views")
      })
    }
  });
  $KI.bundle("Survey_default", {
    main: null,
    questions: [],
    event_block: false,
    submit_on_select: true,
    bottom_offset: 0,
    submit_button: null,
    init: function(args) {
      this.main = args[0];
      this.css();
      this.scaffolding();
      this.cache_sizes();
      this.detect_toolbars();
      this.submit_on_select = this.submit_on_select && this.main.option("selection_submits");
      KI.event.add("selection", this.selection_callback, this);
      if (this.main.__("minimized")) {
        this.minimize(true)
      }
      return this
    },
    css: function() {
      this.cssRef = $KI.css((function(_) {
        return "html div#ki_container,html div#ki_container *{background:none;border:0;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;float:none;font:normal 100%/normal helvetica,arial,sans-serif;-webkit-font-smoothing:antialiased;height:auto;letter-spacing:normal;margin:0;outline:none;position:static;padding:0;text-decoration:none;text-indent:0;text-shadow:none;text-transform:none;width:auto;visibility:visible;overflow:visible}html div#ki_container{background:none;border:0;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;bottom:-99999px;height:auto;margin:0;padding:0;position:fixed;right:30px;width:287px;z-index:99999}html div#ki_container.ki_fullpage{position:static;width:auto}html div#ki_container.ki_left{left:30px}html div#ki_container.ki_center{left:auto;right:auto;left:50%;margin-left:-143px}#ki_container #ki_tab{display:block;height:23px;position:absolute;top:-23px;right:0;z-index:900;text-decoration:none;text-align:center;color:" + _('text', '#ebebeb') + ";font-size:19px;font-weight:bold;background:" + _('background', '#272829') + ";border:solid 2px " + _('border', 'rgba(255,255,255,0.2)') + ";border-bottom:none;-webkit-box-shadow:" + _('tab_shadow', '0px -2px 2px rgba(0,0,0,0.20)') + ";-moz-box-shadow:" + _('tab_shadow', '0px -2px 2px rgba(0,0,0,0.20)') + ";box-shadow:" + _('tab_shadow', '0px -2px 2px rgba(0,0,0,0.20)') + ";-webkit-border-top-left-radius:6px;-webkit-border-top-right-radius:6px;-moz-border-radius-topleft:6px;-moz-border-radius-topright:6px;border-top-left-radius:6px;border-top-right-radius:6px}#ki_container #ki_tab #ki_tab_t{width:28px;display:block;float:left}#ki_container.ki_minimized #ki_tab.ki_has_min_cta{height:30px;overflow:visible;top:-30px}#ki_container #ki_tab #ki_tab_text{display:none;float:left;padding:8px 0 0 10px;color:" + _('text', '#fff') + ";font-size:11px;font-weight:bold}#ki_container.ki_minimized #ki_tab #ki_tab_text{display:block}#ki_container #ki_main{overflow:hidden;padding:4px 0;-webkit-box-sizing:content-box;background:" + _('background', '#272829') + ";border:solid 2px " + _('border', 'rgba(255,255,255,0.2)') + ";border-bottom:none;-webkit-box-shadow:" + _('shadow', '0px 0 2px rgba(0,0,0,0.29)') + ";-moz-box-shadow:" + _('shadow', '0px 0 2px rgba(0,0,0,0.29)') + ";box-shadow:" + _('shadow', '0px 0 2px rgba(0,0,0,0.29)') + ";-webkit-border-top-left-radius:10px;-moz-border-radius-topleft:10px;border-top-left-radius:10px}#ki_container.ki_fullpage #ki_main{width:auto;padding-top:10px;padding-bottom:10px;border:none;right:0;-webkit-border-top-left-radius:0;-moz-border-radius-topleft:0;border-top-left-radius:0;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}html div#ki_cover_container{margin-top:4px;margin-bottom:2px;width:283px;height:40px;text-align:center;overflow:hidden}html div#ki_container hr{border-collapse:collapse;border-top:1px solid " + _('hr_top', '#1c1e1e') + ";border-bottom:1px solid " + _('hr_bottom', '#454647') + ";display:block;margin:13px 0 12px}html div#ki_container.ki_fullpage hr{width:auto}html div#ki_container hr.ki_silent{display:none}html div#ki_questions.ki_buttonless{padding-bottom:10px}html div#ki_container h1.ki_h1{color:" + _('text', '#fff') + ";display:block;font:" + _('headings_face', 'bold 12px/17px helvetica,arial,sans-serif') + ";padding:8px 15px 5px;text-align:center;text-transform:none;white-space:normal}html div#ki_container.ki_ltr h1.ki_h1{text-align:left}#ki_container .ki_description{color:" + _('text', '#fff') + ";display:block;font:" + _('description_face', 'bold 12px/17px helvetica,arial,sans-serif') + ";text-align:center;text-transform:none;white-space:normal;margin:0 15px 15px 15px}#ki_container.ki_rtl .ki_description{text-align:right}#ki_container .ki_description.ki_before{margin-bottom:0}#ki_container .ki_description a{color:#ebebeb;text-decoration:underline}#ki_container ul.ki_answers{display:block;list-style:none;margin-bottom:2px;overflow:hidden;padding:0 15px}#ki_container ul.ki_answers li{display:block;list-style:none;margin:0}#ki_container.ki_float ul.ki_answers li{float:left;margin-right:10px}#ki_container li.ki_answer_li label{background:" + _('answer_bkg', '#323334') + ";border-radius:26px;-webkit-border-radius:26px;-moz-border-radius:26px;color:" + _('answer_text', '#ebebeb') + ";display:block;font:" + _('answers_face', 'normal 11px/15px helvetica,arial,sans-serif') + ";margin-bottom:4px;padding:10px 10px 10px 28px;position:relative;text-align:left;text-transform:none;cursor:pointer}#ki_container li.ki_answer_li label:hover{background:" + _('answer_bkg_hover', '#393a3c') + "}#ki_container.ki_rtl li.ki_answer_li label{text-align:right;padding-right:28px;padding-left:10px}#ki_container li.ki_answer_li input.ki_radio,#ki_container li.ki_answer_li input.ki_checkbox{background:none;border:0;left:7px;margin:0 0 0 2px;padding:0;position:absolute;top:11px;min-width:0;min-height:0}#ki_container li.ki_answer_li input.ki_radio{-webkit-appearance:radio}#ki_container li.ki_answer_li input.ki_checkbox{-webkit-appearance:checkbox}#ki_container.ki_rtl li.ki_answer_li input.ki_radio,#ki_container.ki_rtl li.ki_answer_li input.ki_checkbox{left:auto;right:7px;margin-right:2px;margin-left:0}#ki_container.ie7 li.ki_answer_li input.ki_radio,#ki_container.ie7 li.ki_answer_li input.ki_checkbox{left:5px;top:8px}#ki_container.ki_rtl.ie7 li.ki_answer_li input.ki_radio,#ki_container.ki_rtl.ie7 li.ki_answer_li input.ki_checkbox{left:auto;right:5px}#ki_container input.ki_explain_small,#ki_container input.ki_explain_small:focus{background:" + _('input_bkg', '#fff') + ";border:2px solid " + _('hr_top', '#2c2d30') + ";border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;color:#333;font-size:12px;margin:4px 10px 4px 0;padding:5px;width:185px}#ki_container.ki_rtl input.ki_explain_small,#ki_container.ki_rtl input.ki_explain_small:focus{margin-left:34px;text-align:right}html div#ki_container textarea,html div#ki_container textarea:focus{background:" + _('input_bkg', '#fff') + ";border:2px solid " + _('hr_top', '#18191b') + ";border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;color:#333;font:normal 12px/16px helvetica,arial,sans-serif;height:35px;min-height:35px;margin:0 15px;overflow:auto;padding:5px;resize:vertical;width:239px;min-width:239px}html div#ki_container.ki_rtl textarea,html div#ki_container.ki_rtl textarea:focus{text-align:right}#ki_container textarea.ki_explain_large,#ki_container textarea.ki_explain_large:focus{border-color:" + _('hr_top', '#18191b') + ";margin:4px 10px 4px 0;width:185px;min-width:185px}html div#ki_container .ki_text_single input{background:" + _('input_bkg', '#fff') + ";border:2px solid " + _('hr_top', '#18191b') + ";border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;color:#333;font:normal 12px/16px helvetica,arial,sans-serif;margin:0 15px;padding:5px;width:239px}html div#ki_container.ki_fullpage .ki_text_single input{width:80%}html #ki_container ul.ki_nps{height:42px;margin-left:16px}html #ki_container ul.ki_nps li{float:left;position:relative;list-style:none;width:20px;margin-right:3px}html #ki_container ul.ki_nps li a,html #ki_container ul.ki_nps li a:hover{display:block;padding-top:3px;background:" + _('answer_bkg', '#323334') + ";border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;cursor:pointer;color:" + _('answer_text', '#ebebeb') + ";font-size:11px;height:19px;line-height:17px;text-align:center;text-decoration:none;width:20px}html #ki_container ul.ki_nps li a:hover,html #ki_container ul.ki_nps li.active a{background:" + _('nps_bkg_hover', '#000') + "}html #ki_container ul.ki_nps li span.ki_not_likely,html #ki_container ul.ki_nps li span.ki_most_likely{position:absolute;margin-top:5px;width:120px;font-size:10px;color:" + _('text', '#ebebeb') + ";text-align:left}html #ki_container ul.ki_nps li span.ki_most_likely{right:0;text-align:right}#ki_container .ki_datepicker{border:0 solid #18191b;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0;color:#333;font:normal 12px/16px helvetica,arial,sans-serif;margin:0 15px;padding:5px;width:239px}#ki_container .ki_datepicker select{background:#fff;margin:0 2px}#ki_container #ki_buttons{height:34px;position:relative}#ki_container .ki_button,#ki_container .ki_button:hover{background:" + _('button_bkg', '#919191') + ";border-top:1px solid " + _('button_top', '#a9a9a9') + ";border-bottom:1px solid " + _('button_bottom', '#737373') + ";border-radius:26px;-webkit-border-radius:26px;-moz-border-radius:26px;color:" + _('button', '#fff') + ";display:inline-block;font:bold 11px/normal helvetica,arial,sans-serif;padding:6px 26px 6px 12px;position:absolute;right:15px;top:0;text-decoration:none;text-transform:uppercase}#ki_container .ki_button:hover{background:" + _('button_bkg_hover', '#888') + "}#ki_container .ki_button .ki_circle{background:" + _('button', '#fff') + ";border-radius:26px;-webkit-border-radius:26px;-moz-border-radius:26px;display:block;height:12px;margin-top:-7px;position:absolute;right:8px;top:50%;width:12px}#ki_container .ki_button .ki_arrow{position:absolute;width:0;height:0;border-top:3px solid transparent;border-bottom:3px solid transparent;border-left:3px solid " + _('button_bkg', '#919191') + ";top:3px;left:5px}#ki_container .ki_powered_by,#ki_container .ki_powered_by:hover{color:" + _('text', '#ebebeb') + ";margin-left:25px;font:normal 10px/13px helvetica,arial,sans-serif;height:13px;left:-10px;position:absolute;text-decoration:none;top:6px;padding-left:21px}#ki_main #ki_q_logo_svg{position:absolute;top:-1px;left:0;width:15px;fill:" + _('text', '#ebebeb') + "}#ki_main #ki_q_logo_svg_back{fill:" + _('background', '#272829') + "}#ki_container #ki_thanks h1.ki_h1{text-align:center}#ki_container .ki_thanks_only{padding-bottom:12px}#ki_container #ki_thanks h1{padding-bottom:0}#ki_container #ki_check{margin:8px auto 5px auto;height:54px;width:54px;-moz-border-radius:27px;-webkit-border-radius:27px;border-radius:50px;background:" + _('check_bkg', '#68a844') + ";border-top:1px solid " + _('check_top', '#264614') + ";border-bottom:1px solid " + _('check_bottom', '#7ba961') + ";background-position:50% 50%;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAZCAYAAAC/zUevAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjgzMDg3REZBQjVFMTFFMkIyRjhDMkMzNzExMzJBODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjgzMDg3RTBBQjVFMTFFMkIyRjhDMkMzNzExMzJBODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCODMwODdEREFCNUUxMUUyQjJGOEMyQzM3MTEzMkE4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCODMwODdERUFCNUUxMUUyQjJGOEMyQzM3MTEzMkE4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvkmF24AAADnSURBVHjaxNfREcIgDABQ6wQdoSM4EiPYCRyBETKCbuAIOoob0HAWRYQ2AQK5yw/0cu8oDXQwxhwaxgVzwpwxX59Ri2iUYL7xwBzdXA/AH6QX4AcyCO8JwFQ7z9yOnQE2nj1egR8gtSdYAAkEG5BCnDFPrQAxhF9ItQCEiFghJQ3wEVuFlCTAITShiJICOMSVWMyH6FoAhxjXHk4JXXMFwj3BgVQFhF9HLQhwe0w4UAqBnE4bG8yFQG67T01wIVBy5mxNUiFFAMopugcpBlCPcgu5J3pGlSsA5445rfm+kvn/DYWxCDAAme0urtbF1ZsAAAAASUVORK5CYII=)}#ki_container #ki_call,#ki_container .ki_section{margin:0 15px;text-align:center}#ki_container #ki_call h1,#ki_container .ki_section h1{padding-bottom:11px}#ki_container .ki_section p{text-align:center}#ki_container .ki_cta,#ki_container .ki_twtr_button,#ki_container .ki_cta:hover,#ki_container .ki_twtr_button:hover{background-color:" + _('button_bkg', '#919191') + ";border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;color:" + _('button', '#fff') + ";margin:0 0 12px 0;padding:5px 28px 5px 7px;position:relative;right:auto;top:auto}#ki_container .ki_cta:hover{background-color:" + _('button_bkg_hover', '#919191') + "}#ki_container #ki_fb_container{background:" + _('answer_bkg', '#414243') + ";border-radius:10px;-webkit-border-radius:10px;-moz-border-radius:10px;height:60px;margin:13px 0;padding:10px}html div#ki_container #ki_thanks_message{color:" + _('text', '#fff') + ";display:block;font:" + _('headings_face', 'bold 12px/17px helvetica,arial,sans-serif') + ";padding:8px 15px 0;text-align:center;text-transform:none;white-space:normal}html div#ki_container #ki_thanks_message p{margin-bottom:5px}#ki_thanks_message em,#ki_thanks_message i{font-style:italic!important}#ki_thanks_message strong,#ki_thanks_message b{font-weight:bold!important}";
      })($KI.bind(this.cssv, this)))
    },
    cssv: function(key, def) {
      if (this.main) {
        var set = this.main.option("cssv/" + key);
        if (set) {
          return set
        } else {
          return def
        }
      } else {
        return def
      }
    },
    reloadCSS: function(cssv) {
      if (cssv) {
        this.main.options.cssv = cssv
      }
      if (this.cssRef) {
        this.cssRef.remove();
        this.css()
      }
    },
    scaffolding: function() {
      this.container = new $KI.$("div", "ki_container");
      if (this.main.option("fullpage")) {
        this.container.addClass("ki_fullpage")
      }
      if (this.main.option("float_answers")) {
        this.container.addClass("ki_float")
      }
      if (this.main.option("light") == true) {
        this.container.addClass("ki_light")
      }
      if (this.main.locale.rtl) {
        this.container.addClass("ki_rtl")
      } else {
        this.restoreSilentHrs()
      } if (anchor = this.main.option("anchor")) {
        this.container.addClass("ki_" + anchor)
      }
      var matchie;
      if (matchie = navigator.userAgent.match(/MSIE ([0-9])/i)) {
        this.container.addClass("ie" + matchie[1])
      }
      this.tab = new $KI.$("a", "ki_tab", {
        href: "#"
      }).attach("click", this.toggle, this);
      var min_cta = this.main.option("min_cta");
      if (min_cta) {
        this.tab.addClass("ki_has_min_cta");
        this.tab.adopt(new $KI.$("span", "ki_tab_text").appendText(min_cta))
      }
      this.tab.adopt(this.tab_t = new $KI.$("span", "ki_tab_t").appendText("-"));
      this.main_div = new $KI.$("div", "ki_main");
      this.form = new $KI.$("form", "ki_form", {
        action: "#",
        method: "post"
      }).attach("submit", this.main.submit, this.main);
      var logo = this.main.option("logo");
      if (logo && logo.match(/\/\//)) {
        this.showingCoverLogo = true;
        this.main_div.adopt(new $KI.$("div", "ki_cover_container").adopt(new $KI.$("img", null, {
          src: logo
        })))
      }
      var questions = this.main.option("shuffle") ? $KI.shuffle(this.main.questions) : this.main.questions;
      this.questions_container = new $KI.$("div", "ki_questions");
      for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        var q_elt = q.render();
        q_elt.hide();
        this.questions_container.adopt(q_elt)
      }
      this.buttonsContainer = new $KI.$("div", "ki_buttons");
      var logo = this.main.option("logo");
      if ((KI.customer.show_powered || logo == "qualaroo") && !this.showingCoverLogo) {
        this.showingLogo = true;
        this.buttonsContainer.adopt(new $KI.$("a", null, {
          href: this.main.powered_link(),
          target: "_blank"
        }).addClass("ki_powered_by").html('<svg id="ki_q_logo_svg" width="15px" height="15px" viewBox="0 0 21 12" version="1.1" xmlns="http://www.w3.org/2000/svg"><path id="ki_q_logo_svg_back" fill="#ffffff" d=" M 0.00 0.00 L 21.00 0.00 L 21.00 12.00 L 15.68 12.00 C 15.69 11.41 15.69 10.23 15.70 9.64 C 15.10 9.42 13.91 8.97 13.31 8.74 C 12.95 6.35 11.42 4.49 8.89 4.39 C 11.12 6.97 11.41 11.34 15.65 11.60 C 15.55 11.70 15.35 11.90 15.25 12.00 L 0.00 12.00 L 0.00 0.00 Z" /><path fill="#fffff" d=" M 4.00 4.01 C 7.15 4.61 8.80 0.73 11.90 1.00 C 13.71 1.37 15.17 2.67 16.89 3.33 C 16.76 2.67 16.49 1.37 16.36 0.72 C 18.30 1.22 19.61 2.84 20.18 4.70 C 18.53 5.19 16.87 5.67 15.21 6.15 C 15.46 6.87 15.96 8.31 16.21 9.03 C 13.64 8.38 13.13 4.64 16.32 4.61 C 14.24 3.74 11.78 1.31 9.62 3.32 C 7.31 6.08 1.23 6.74 0.77 2.15 C 1.82 2.79 2.62 4.13 4.00 4.01 Z" /><path fill="#fffff" d=" M 8.89 4.39 C 11.42 4.49 12.95 6.35 13.31 8.74 C 13.91 8.97 15.10 9.42 15.70 9.64 C 15.69 10.23 15.69 11.41 15.68 12.00 L 15.25 12.00 C 15.35 11.90 15.55 11.70 15.65 11.60 C 11.41 11.34 11.12 6.97 8.89 4.39 Z" /></svg> Powered by Qualaroo [?]'))
      }
      this.submit_button = new $KI.$("a", "ki_submit_button", {
        href: "#"
      }).addClass("ki_button").attach("click", this.main.submit, this.main).appendText(this.main.locale.__("send", "Send")).adopt(new $KI.$("span").addClass("ki_circle").adopt(new $KI.$("span").addClass("ki_arrow")));
      this.buttonsContainer.prepend(this.submit_button);
      this.updateButtonsDisplay();
      this.thanks = new $KI.$("div", "ki_thanks");
      this.form.adopt(this.questions_container);
      if (this.buttonsContainer) {
        this.form.adopt([this.hrBeforeButtons = new $KI.$("hr"), this.buttonsContainer])
      }
      if (typeof(this.ki_tab_cta_link) != "undefined") {
        tab_content = [this.ki_tab_cta_link, this.plus_min]
      } else {
        tab_content = [this.plus_min]
      } if (!this.main.option("fullpage")) {
        var ki_tab = new $KI.$("div", "ki_tab").adopt(tab_content);
        if (typeof(this.ki_tab_cta_link) != "undefined") {
          ki_tab.addClass("w_cta")
        }
      }
      this.container.adopt([(!this.main.option("fullpage")) ? this.tab : null, this.main_div.adopt([this.form, this.thanks.hide()])]);
      var a = this.main.option("append_to");
      if (a) {
        document.getElementById(a).appendChild(this.container)
      } else {
        document.body.appendChild(this.container)
      }
    },
    updateButtonsDisplay: function() {
      if (this.submit_button.style.display == "none" && !this.showingLogo) {
        this.buttonsContainer.hide();
        if (this.hrBeforeButtons) {
          this.hrBeforeButtons.hide()
        }
      } else {
        this.buttonsContainer.show();
        if (this.hrBeforeButtons) {
          this.hrBeforeButtons.show()
        }
      }
      this.cache_sizes()
    },
    restoreSilentHrs: function() {
      if (this.main.locale.rtl) {
        return false
      }
      this.container.removeClass("ki_ltr");
      if (this.main.option("silent_hrs") || this.main.option("float_answers")) {
        this.container.addClass("ki_ltr")
      }
    },
    cache_sizes: function() {
      this.container.height = this.container.getHeight();
      this.main_div.height = this.main_div.getHeight()
    },
    render_thanks: function(render_thanks) {
      this.restoreSilentHrs();
      if (render_thanks == null) {
        render_thanks = {}
      }
      var option = render_thanks.message;
      if (option !== "__DEFAULT__") {
        var message = option
      } else {
        var message = this.main.locale.__("thanks", this.main.option("default_thanks_msg"))
      } if ((typeof(render_thanks.show_checkmark) == "undefined") || (render_thanks.show_checkmark == true)) {
        this.thanks.adopt([new $KI.$("div", "ki_check")])
      }
      this.thanks.adopt([new $KI.$("div", "ki_thanks_message").html(message)]);
      if (render_thanks.cta) {
        this.long_close = true;
        var cta_link_a = null;
        cta_link_a = new $KI.$("a", null, {
          href: "#"
        }).addClass("ki_button ki_cta");
        cta_link_a.attach("click", function(e) {
          e.preventDefault();
          this.main.cta_clicked(render_thanks)
        }, this);
        this.thanks.adopt([new $KI.$("hr"), new $KI.$("div").addClass("ki_section").adopt(new $KI.$("p").adopt(cta_link_a.appendText(render_thanks.cta.text).adopt(new $KI.$("span").addClass("ki_circle").adopt(new $KI.$("span").addClass("ki_arrow")))))])
      }
      if (render_thanks.twitter) {
        this.long_close = true;
        if ("follow" == render_thanks.twitter.type) {
          this.thanks.adopt([new $KI.$("hr"), new $KI.$("div").addClass("ki_section").adopt(new $KI.$("p").adopt(new $KI.$("a", null, {
            href: "http://twitter.com/" + render_thanks.twitter.handle,
            target: "_new"
          }).addClass("ki_cta ki_button").adopt(new $KI.$("span").addClass("ki_circle").adopt(new $KI.$("span").addClass("ki_arrow"))).appendText(this.main.locale.__("twitter", "Follow") + " @" + render_thanks.twitter.handle)))])
        }
      }
      if (render_thanks.facebook) {
        this.long_close = true;
        var u = ((render_thanks.facebook.type == "auto") ? KI.location.get("clean") : render_thanks.facebook.url);
        this.fb_like = new $KI.$("iframe", "ki_fb_frame", {
          src: "http://www.facebook.com/plugins/like.php?href=" + u + "&layout=standard&show_faces=false&width=250&action=like&colorscheme=" + (this.main.option("fb_colorscheme") || "dark"),
          scrolling: "no",
          allowTransparency: true,
          frameBorder: "0"
        }).addStyle({
          width: "233px",
          height: "60px",
          border: "none"
        }).hide().attach("load", function(e) {
          e.target.show();
          e.target.parent().addClass("loaded")
        });
        this.thanks.adopt([new $KI.$("hr"), new $KI.$("div").addClass("ki_section").adopt(new $KI.$("h1").addClass("ki_h1 sIFR-ignore").appendText(this.main.locale.__("facebook", "Support us on Facebook!"))).adopt(new $KI.$("div", "ki_fb_container").adopt(this.fb_like))])
      }
      if (!this.long_close) {
        this.thanks.addClass("ki_thanks_only")
      }
      this.updateButtonsDisplay()
    },
    show: function() {
      var b = 0,
        bo = this.main.option("bottom");
      if ($KI.type(bo, "number")) {
        b = bo
      }
      this.container.addStyle("bottom", b)
    },
    show_thanks: function(thanks_conf) {
      this.render_thanks(thanks_conf);
      this.restoreSilentHrs();
      if (this.main.option("abrupt") || true) {
        this.form.hide();
        this.thanks.addStyle({
          position: "relative",
          visibility: "visible",
          display: "block"
        })
      } else {}
      KI.event.fire("updated_view");
      if (!this.main.option("disable_autoclose")) {
        var close = thanks_conf.close;
        if (close) {
          setTimeout($KI.bind(this.close, this), ((this.long_close) ? close[1] : close[0]))
        }
      }
    },
    show_question_screen: function(question_screen) {
      setTimeout($KI.bind(function() {
        this.container.addClass("ki_ltr");
        for (var j = 0; j < this.main.questions.length; j++) {
          this.main.questions[j].container.hide()
        }
        for (var j = 0; j < question_screen.questions.length; j++) {
          var q = this.main.find_question(question_screen.questions[j]);
          q.container.show()
        }
        this.submit_button.show();
        this.updateButtonsDisplay();
        KI.event.fire("updated_view")
      }, this), 1)
    },
    show_question: function(question) {
      setTimeout($KI.bind(function() {
        this.restoreSilentHrs();
        for (var j = 0; j < this.main.questions.length; j++) {
          if (question.id == this.main.questions[j].id) {
            this.main.questions[j].container.show()
          } else {
            this.main.questions[j].container.hide()
          }
        }
        if ((question.supports_submit_on_select()) && this.submit_on_select == true) {
          this.submit_button.hide()
        } else {
          this.submit_button.show()
        }
        this.updateButtonsDisplay();
        KI.event.fire("updated_view")
      }, this), 1)
    },
    show_error: function(msg) {
      alert(msg)
    },
    close: function() {
      this.container.remove();
      KI.event.fire("close");
      KI.metrics.record("Closed nudge", {
        "Nudge Name": this.main.name
      })
    },
    detect_toolbars: function() {
      var o = 0;
      try {
        if (wibiyaToolbar) {
          o = 25
        }
      } catch (e) {}
      if (o > 0) {
        this.main.options.bottom = o
      }
    },
    toggle: function(e) {
      e.preventDefault();
      if (this.main.option("prevent_collapse")) {
        return false
      }
      if (this.main.option("tab_closes")) {
        this.main.__("minimized", 1);
        this.close();
        return
      }
      if (this.main.__("minimized")) {
        this.maximize()
      } else {
        this.minimize()
      }
    },
    minimize: function(abrupt) {
      this.tab_t.empty().appendText("+");
      this.container.addClass("ki_minimized");
      this.main.__("minimized", 1);
      if (this.main.option("min_cta")) {
        this.main_div.hide()
      } else {
        this.main_div.addStyle("height", 0)
      }
      KI.metrics.record("Minimized nudge", {
        "Nudge Name": this.main.name
      })
    },
    maximize: function(abrupt) {
      this.tab_t.empty().appendText("-");
      this.container.removeClass("ki_minimized");
      this.main.__("minimized", 0);
      this.questions_container.uncloak();
      if (this.main.option("min_cta")) {
        this.main_div.show()
      }
      this.main_div.addStyle("height", "auto");
      KI.metrics.record("Maximized nudge", {
        "Nudge Name": this.main.name
      })
    },
    selection_callback: function() {
      if (true == this.submit_on_select) {
        if ("question" == this.main.current.node_type) {
          if (this.main.current.node.supports_submit_on_select()) {
            this.main.submit()
          }
        }
      }
    }
  });
  $KI.bundle("Question", {
    container: null,
    explains: {},
    init: function(args) {
      var o = args[0];
      this.index = args[1];
      this.id = o.id;
      this.type = o.type;
      this.title = o.title;
      this.answers = o.answers;
      this.data = o;
      this.next = o.next;
      this.canonical_name = o.canonical_name;
      this.required = false || o.required;
      this.survey = args[2];
      return this
    },
    render: function() {
      var title = this.title;
      if (this.required) {
        title += "*"
      }
      this.container = new $KI.$("div", "ki_question_" + this.id).addClass("ki_question").adopt(new $KI.$("h1").appendText(title).addClass("ki_h1 sIFR-ignore"));
      if (this.data.description) {
        var d = new $KI.$("p").addClass("ki_description");
        d.innerHTML = this.data.description;
        if (this.data.description_placement == "before") {
          d.addClass("ki_before");
          this.container.prepend(new $KI.$("hr"));
          this.container.prepend(d)
        } else {
          this.container.adopt(d)
        }
      }
      if (this.index == 0) {
        this.container.addClass("ki_top")
      }
      switch (this.type.toLowerCase()) {
        case "radio":
        case "checkbox":
          var answers_element = new $KI.$("ul", "ki_question_" + this.id + "_answers").addClass("ki_answers");
          if (this.survey) {
            var randomize = this.survey.option("randomize")
          }
          if ($KI.type(this.answers, "array")) {
            if (randomize && (true == randomize)) {
              this.answers = $KI.shuffle(this.answers)
            }
            for (var i = 0; i < this.answers.length; i++) {
              answers_element.adopt(this.render_answer(this.answers[i], i))
            }
          }
          this.container.adopt(answers_element);
          break;
        case "text":
          this.freeform = true;
          var answer = new $KI.$("div", "ki_question_" + this.id + "_answer").addClass("ki_text").adopt(new $KI.$("textarea", null, {
            name: "r[" + this.id + "][text]"
          }));
          this.container.adopt(answer);
          break;
        case "text-single":
        case "email":
        case "phone":
          this.freeform = true;
          var answer = new $KI.$("div", "ki_question_" + this.id + "_answer").addClass("ki_text_single").adopt(new $KI.$("input", null, {
            type: "text",
            name: "r[" + this.id + "][text]"
          }));
          this.container.adopt(answer);
          break;
        case "nps":
          var nps = new $KI.NPS(this.id, this.answers);
          this.container.adopt(nps.render());
          break;
        case "date":
          var datepicker = new $KI.Datepicker(this.id);
          this.container.adopt(datepicker.render());
          break
      }
      return this.container
    },
    render_answer: function(answer, index) {
      var li = new $KI.$("li", "ki_answer_" + answer.id).addClass("ki_answer_li");
      if (index % 2) {
        li.addClass("ki_h")
      }
      var label = new $KI.$("label");
      var input = new $KI.$('<input type="' + this.type + '" name="r[' + this.id + '][]" value="' + answer.id + '" class="ki_' + this.type + '" />').attach("click", function(e) {
        this.toggle_explains(e);
        KI.event.fire("selection")
      }, this);
      li.adopt(label.adopt(input).appendText(" " + answer.title));
      if (this.type == "checkbox") {
        this.freeform = true
      }
      if (answer.show_explain) {
        var e = answer.show_explain;
        this.explains[answer.id] = new $KI.$(((e == "small") ? "input" : "textarea"), null, {
          name: "re[" + this.id + "][" + answer.id + "]"
        }).addClass("ki_explain_" + e).hide();
        label.adopt(this.explains[answer.id])
      }
      return li
    },
    toggle_explains: function(e) {
      var answer_id = e.target.parent(2).id.replace("ki_answer_", "");
      var checked = e.target.parent().getElementsByTagName("input")[0].checked;
      if (this.explains[answer_id]) {
        this.explains[answer_id].show().focus()
      }
      for (var id in this.explains) {
        if (answer_id != id && this.explains[id] && this.explains[id].parentNode && this.explains[id].parent().getElementsByTagName("input")[0].checked != true) {
          this.explains[id].hide()
        } else {
          if (answer_id == id && checked == false) {
            this.explains[id].hide()
          }
        }
      }
      KI.event.fire("updated_view");
      if (this.survey && this.survey.view) {
        this.survey.view.cache_sizes()
      }
    },
    chosen_answer_id: function(form) {
      switch (this.type.toLowerCase()) {
        case "radio":
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.checked && (element.name == "r[" + this.id + "][]")) {
              return element.value
            }
          }
          break;
        case "nps":
          return form.elements[0].value;
          break
      }
    },
    read_answer: function(form) {
      switch (this.type.toLowerCase()) {
        case "radio":
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.checked && (element.name == "r[" + this.id + "][]")) {
              for (var j = 0; j < this.answers.length; j++) {
                var answer = this.answers[j];
                if (answer.id == element.value) {
                  ret = {
                    value: answer.title
                  };
                  if ((typeof(answer.canonical_name) != "undefined") && (answer.canonical_name != null)) {
                    ret.canonical_name = answer.canonical_name
                  }
                  return ret
                }
              }
            }
          }
          break;
        case "checkbox":
          var checked_answer_ids = [];
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.checked && (element.name == "r[" + this.id + "][]")) {
              checked_answer_ids.push(element.value)
            }
          }
          var checked_answers = [];
          for (var i = 0; i < this.answers.length; i++) {
            var answer = this.answers[i];
            if ($KI.contains(checked_answer_ids, answer.id)) {
              var aa = {
                value: answer.title
              };
              if ((typeof(answer.canonical_name) != "undefined") && (answer.canonical_name != null)) {
                aa.canonical_name = answer.canonical_name
              }
              checked_answers.push(aa)
            }
          }
          return checked_answers;
          break;
        case "nps":
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.name == "r[" + this.id + "][]") {
              for (var j = 0; j < this.answers.length; j++) {
                var answer = this.answers[j];
                if (answer.id == element.value) {
                  ret = {
                    value: answer.title
                  };
                  if ((typeof(answer.canonical_name) != "undefined") && (answer.canonical_name != null)) {
                    ret.canonical_name = answer.canonical_name
                  }
                  return ret
                }
              }
            }
          }
          break;
        case "text":
        case "text-single":
        case "date":
        case "email":
        case "phone":
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.name == "r[" + this.id + "][text]") {
              return {
                value: element.value
              }
            }
          }
          break
      }
    },
    validate_response: function(form) {
      var ret = {
        valid: true
      };
      if ("radio" == this.type.toLowerCase() || "checkbox" == this.type.toLowerCase()) {
        if (this.required) {
          ret = {
            valid: false,
            msg: "Please answer " + this.title
          };
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.checked && (element.name == "r[" + this.id + "][]")) {
              for (var j = 0; j < this.answers.length; j++) {
                var answer = this.answers[j];
                if (answer.id == element.value) {
                  ret = {
                    valid: true
                  };
                  return ret
                }
              }
            }
          }
        }
      } else {
        if ("nps" == this.type.toLowerCase()) {} else {
          var v = null;
          for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            if (element.name == "r[" + this.id + "][text]") {
              v = element.value
            }
          }
          if (this.required) {
            if (v == null || v == "") {
              ret.valid = false;
              ret.msg = "Please answer " + this.title;
              return ret
            }
          }
          switch (this.type.toLowerCase()) {
            case "text":
            case "text-single":
            case "date":
              break;
            case "email":
              if (v != null && v.length > 0) {
                if (v.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) == null) {
                  ret.valid = false;
                  ret.msg = "Please enter a valid email address";
                  return ret
                }
              }
              break;
            case "phone":
              break
          }
        }
      }
      return ret
    },
    get_next_conf: function(form) {
      switch (this.type.toLowerCase()) {
        case "radio":
        case "nps":
          var chosen_answer_id = this.chosen_answer_id(form);
          for (var i = 0; i < this.answers.length; i++) {
            var answer = this.answers[i];
            if (chosen_answer_id == answer.id) {
              if (answer.next) {
                return answer.next
              }
            }
          }
          if (this.next) {
            return this.next
          }
          break;
        case "checkbox":
        case "text":
        case "text-single":
        case "email":
        case "phone":
        case "date":
          if (this.next) {
            return this.next
          }
          break
      }
      return null
    },
    supports_submit_on_select: function() {
      var ret = false;
      switch (this.type.toLowerCase()) {
        case "radio":
        case "nps":
          ret = !($KI.size(this.explains) > 0);
          break
      }
      return ret
    }
  });
  $KI.bundle("NPS", {
    init: function(args) {
      this.id = args[0];
      this.answers = {};
      this.choices = [];
      this.answers = this.map_answers(args[1]);
      this.container = new $KI.$("ul", "ki_nps_" + this.id).addClass("ki_nps");
      this.value_house = new $KI.$("input", null, {
        type: "hidden",
        name: "r[" + this.id + "][]"
      });
      return this
    },
    map_answers: function(a) {
      var map = {};
      if ($KI.type(a, "array")) {
        for (var i = 0; i < a.length; i++) {
          var b = a[i];
          map[b.title] = b.id
        }
      }
      return map
    },
    value: function(set) {
      if (set || set === null) {
        this.value_house.value = set
      } else {
        return this.value_house.value
      }
    },
    reset: function() {
      for (i = 0; i < this.choices.length; i++) {
        this.choices[i].removeClass("active")
      }
    },
    render: function() {
      for (i = 0; i <= 10; i++) {
        var li = new $KI.$("li").addClass("nps_" + i);
        li.set("answer_id", this.answers[i]);
        li.adopt(new $KI.$("a", null, {
          href: "#"
        }).appendText(i + "").attach("click", function(e) {
          e.preventDefault();
          var parent = e.target.parent();
          if (parent.hasClass("active")) {
            parent.removeClass("active");
            this.value(null)
          } else {
            var id = parseInt(parent.get("answer_id"));
            this.reset();
            parent.addClass("active");
            this.value(id)
          }
          KI.event.fire("selection")
        }, this));
        var not_likely_label = KI.survey.options.not_likely || KI.survey.locale.__("not_likely", "Not likely");
        var likely_label = KI.survey.options.likely || KI.survey.locale.__("likely", "Most Likely");
        if (i == 0) {
          li.adopt(new $KI.$("span").addClass("ki_not_likely").appendText(not_likely_label))
        }
        if (i == 10) {
          li.adopt(new $KI.$("span").addClass("ki_most_likely").appendText(likely_label))
        }
        this.choices.push(li)
      }
      return [this.value_house, this.container.adopt(this.choices)]
    }
  });
  $KI.bundle("Datepicker", {
    init: function(args) {
      this.id = args[0];
      this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.from_year = 2010;
      this.to_year = 2020;
      this.container = new $KI.$("div", "ki_dp_" + this.id).addClass("ki_datepicker");
      this.value_house = new $KI.$("input", null, {
        type: "hidden",
        name: "r[" + this.id + "][text]"
      });
      return this
    },
    value: function() {
      return this.value_house.value
    },
    construct_value: function() {
      if ((-1 == document.getElementById("ki_dp_m_" + this.id).value) || (-1 == document.getElementById("ki_dp_d_" + this.id).value) || (-1 == document.getElementById("ki_dp_y_" + this.id).value)) {
        this.value_house.value = ""
      } else {
        this.value_house.value = document.getElementById("ki_dp_m_" + this.id).value + "/" + document.getElementById("ki_dp_d_" + this.id).value + "/" + document.getElementById("ki_dp_y_" + this.id).value
      }
    },
    render: function() {
      var m = new $KI.$("select", "ki_dp_m_" + this.id).addClass("datepicker_m");
      m.adopt(new $KI.$("option", null, {
        value: "-1"
      }).appendText("Month"));
      for (i = 0; i < this.months.length; i++) {
        var v = (i + 1).toString();
        if (i < 9) {
          v = "0" + v
        }
        m.adopt(new $KI.$("option", null, {
          value: v
        }).appendText(this.months[i]))
      }
      m.attach("change", function(e) {
        e.preventDefault();
        this.construct_value()
      }, this);
      var d = new $KI.$("select", "ki_dp_d_" + this.id).addClass("datepicker_d");
      d.adopt(new $KI.$("option", null, {
        value: "-1"
      }).appendText("Day"));
      for (i = 1; i <= 31; i++) {
        var v = i.toString();
        if (i < 10) {
          v = "0" + v
        }
        d.adopt(new $KI.$("option", null, {
          value: v
        }).appendText(v))
      }
      d.attach("change", function(e) {
        e.preventDefault();
        this.construct_value()
      }, this);
      var y = new $KI.$("select", "ki_dp_y_" + this.id).addClass("datepicker_y");
      y.adopt(new $KI.$("option", null, {
        value: "-1"
      }).appendText("Year"));
      for (i = this.from_year; i <= this.to_year; i++) {
        y.adopt(new $KI.$("option", null, {
          value: i.toString()
        }).appendText(i.toString()))
      }
      y.attach("change", function(e) {
        e.preventDefault();
        this.construct_value()
      }, this);
      return [this.value_house, this.container.adopt([m, d, y])]
    }
  });
  $KI.bundle("Base", {
    customer: {},
    queue: {
      surveys: {
        ids: [],
        list: []
      },
      overlays: {
        ids: [],
        list: []
      }
    },
    survey: null,
    overlay: null,
    props: {},
    caps: null,
    min_scr_wdth: null,
    runtimeOptions: {},
    init: function(args) {
      this.event = new $KI.Event();
      this.location = new $KI.Location();
      this.visitor = new $KI.Visitor();
      this.locale = new $KI.Locale();
      this.metrics = new $KI.Metrics();
      this.set_customer(args[0], args[1]);
      if (this.caps) {
        this.d_frq_counter = new $KI.FrequencyCounter({
          name: "d",
          num_buckets: 24,
          num_min_in_bucket: 60
        });
        this.w_frq_counter = new $KI.FrequencyCounter({
          name: "w",
          num_buckets: 7,
          num_min_in_bucket: 1440
        });
        this.event.add("show", this.d_frq_counter.record, this.d_frq_counter);
        this.event.add("show", this.w_frq_counter.record, this.w_frq_counter);
        this.session_c = new $KI.Cookie("sess");
        this.session_c.options.is_session = true;
        this.event.add("show", this.record_view_in_session, this)
      }
      return this
    },
    set_customer: function(hash, site_id) {
      if (site_id) {
        this.site_id = site_id
      }
      if (hash) {
        try {
          var c = eval("[" + $KI.hex(hash) + "]")
        } catch (e) {}
        if ($KI.type(c, "array")) {
          this.customer = {
            id: c[0],
            v: $KI.sha1([hash, c[0], this.site_id].join("")),
            referral: c[1],
            premium: c[2] || 0,
            signup: c[3] || 0,
            edge: c[4] || 0,
            show_powered: c[5] || 0
          }
        }
      }
    },
    add: function(type, match, data) {
      if (arguments.length == 2) {
        return this.add("survey", type, match)
      }
      var t = type + "s";
      this.queue[t].ids[data.id] = this.queue[t].list.length;
      this.queue[t].list.push($KI.merge({
        match: match
      }, data))
    },
    run: function() {
      if (!this.under_caps()) {
        return
      }
      if (!this.acceptable_screen_width()) {
        return
      }
      if (this.customer.signup && !this.skip_signup) {
        this.signup = new $KI.Signup(this);
        this.signup.verify_and_show(function() {
          this.skip_signup = true;
          this.run()
        }, this);
        return
      }
      if (!this.ran) {
        this.mine();
        this.ran = true
      }
    },
    mine: function(type) {
      if (!type) {
        this.mine("surveys");
        this.mine("overlays");
        return
      }
      var list = this.queue[type].list;
      for (var i in list) {
        if (!list.hasOwnProperty(i)) {
          continue
        }
        var item = list[i];
        if (item.match == false || this.location.matches(item.match)) {
          switch (type) {
            case "surveys":
              if (this.show_survey(item)) {
                break
              }
              break;
            case "overlays":
              this.overlay = new $KI.Overlay(item);
              break
          }
        }
      }
    },
    under_caps: function() {
      if (this.caps) {
        var s_cap = this.caps.session;
        if (s_cap > 0) {
          var s_count = $KI.toInt(this.session_c.get());
          if (!isNaN(s_count) && s_count >= s_cap) {
            return false
          }
        }
        var d_cap = this.caps.day;
        if (d_cap > 0) {
          if (this.d_frq_counter.count() >= d_cap) {
            return false
          }
        }
        var w_cap = this.caps.week;
        if (w_cap > 0) {
          if (this.w_frq_counter.count() >= w_cap) {
            return false
          }
        }
      }
      return true
    },
    acceptable_screen_width: function() {
      if (this.min_scr_wdth) {
        if (this.min_scr_wdth > screen.width) {
          return false
        }
      }
      return true
    },
    record_view_in_session: function() {
      var str = this.session_c.get();
      var count = $KI.toInt(str);
      if (isNaN(count)) {
        count = 0
      }
      count++;
      this.session_c.set(count)
    },
    show_survey: function(object, ignore_rules) {
      if (this.survey) {
        return
      }
      this.survey = new $KI.Survey(object);
      if (this.survey.can_show() || ignore_rules == true) {
        this.survey.setOptions(this.runtimeOptions);
        var d = this.survey.require("duration");
        setTimeout($KI.bind(this.survey.show, this.survey), ((d) ? d * 1000 : 300));
        return true
      } else {
        this.survey = null;
        return false
      }
    },
    get_by_id: function(type, id) {
      return this.queue[type].list[this.queue[type].ids[id]]
    },
    show_by_id: function(type, id, ignore_rules) {
      var t = type + "s",
        s = this.get_by_id(t, id);
      if (s) {
        switch (t) {
          case "surveys":
            this.show_survey(s, ignore_rules);
            break
        }
      }
    },
    hide_survey: function() {
      if (this.survey && this.survey.view) {
        this.survey.view.close();
        this.survey = null
      }
    },
    API: {
      options: function(o) {
        this.runtimeOptions = o
      },
      disableAuto: function() {
        this.ran = true
      },
      identify: function(name) {
        this.visitor.identity(name)
      },
      identity: function(name) {
        this.visitor.identity(name)
      },
      showSurvey: function(id, ignore_rules) {
        this.hide_survey();
        this.show_by_id("survey", id, ignore_rules)
      },
      hideSurvey: function() {
        this.hide_survey()
      },
      minimizeSurvey: function() {
        if (this.survey && this.survey.view && this.survey.view.minimize) {
          this.survey.view.minimize()
        }
      },
      maximizeSurvey: function() {
        if (this.survey && this.survey.view && this.survey.view.maximize) {
          this.survey.view.maximize()
        }
      },
      addSurvey: function(match, data) {
        this.add("survey", match, data)
      },
      eventHandler: function(name, callback) {
        this.event.add(name, callback, this)
      },
      set: function(p) {
        this.props = $KI.merge(this.props, p);
        if (this.survey == null) {
          this.ran = false
        }
        this.run()
      }
    }
  });
  $KI.bundle("Locale_item", {
    init: function(args) {
      this.dict = args[0] || {};
      this.rtl = args[1] || false;
      return this
    },
    __: function(select, the_default) {
      var s = $KI.select(this.dict, select);
      if (s) {
        return s
      } else {
        return the_default
      }
    }
  });
  $KI.bundle("Locale", {
    langs: {},
    init: function() {
      return this
    },
    add: function(l, dict, rtl) {
      this.langs[l] = new $KI.Locale_item(dict, rtl)
    },
    use: function(l) {
      return this.langs[l] || new $KI.Locale_item()
    }
  });
  $KI.Queue = function(q) {
    if (q && q.length) {
      for (var i = 0; i < q.length; i++) {
        this.push(q[i])
      }
    }
  };
  $KI.Queue.prototype.push = function(o) {
    if ($KI.type(o, "array") && o.length) {
      var f = o.splice(0, 1);
      if (KI.API[f]) {
        KI.API[f].apply(KI, o)
      }
    } else {
      if ($KI.type(o, "function")) {
        o()
      }
    }
  };
  $KI.bundle("FrequencyCounter", {
    init: function(args) {
      var o = args[0];
      this.name = o.name;
      this.num_buckets = o.num_buckets;
      this.num_min_in_bucket = o.num_min_in_bucket;
      this.c = new $KI.Cookie("frq_" + this.name);
      return this
    },
    record: function() {
      var updated_at = new Date();
      var new_obj = {
        updated_at: updated_at.getTime(),
        buckets: new Array(this.num_buckets)
      };
      for (var j = 0; j < new_obj.buckets.length; j++) {
        new_obj.buckets[j] = 0
      }
      var obj = this._read();
      if (obj) {
        var cur_bucket_idx = this._current_bucket_idx(obj);
        if (cur_bucket_idx < this.num_buckets) {
          for (var i = cur_bucket_idx; i < new_obj.buckets.length; i++) {
            new_obj.buckets[i] = obj.buckets[i]
          }
        }
      }
      new_obj.buckets[0] += 1;
      this._write(new_obj)
    },
    count: function() {
      var res = 0;
      var obj = this._read();
      if (obj) {
        var cur_bucket_idx = this._current_bucket_idx(obj);
        if (cur_bucket_idx < this.num_buckets) {
          for (var i = cur_bucket_idx; i < obj.buckets.length; i++) {
            res += obj.buckets[i]
          }
        }
      }
      return res
    },
    _current_bucket_idx: function(obj) {
      var diff_buckets = null;
      if (obj) {
        var cur_time = new Date();
        var diff_min = $KI.toInt((cur_time.getTime() - obj.updated_at) / 60000);
        diff_buckets = Math.floor(diff_min / this.num_min_in_bucket)
      }
      return diff_buckets
    },
    _read: function() {
      var s = this.c.get();
      var obj = this._decode(s);
      return obj
    },
    _write: function(obj) {
      this.c.set(this._encode(obj))
    },
    _encode: function(object) {
      var str = [];
      str[0] = object.updated_at;
      str[1] = object.buckets.join(".");
      return str.join(";")
    },
    _decode: function(string) {
      var obj = {};
      if (string) {
        var split = string.split(";");
        if (split.length == 2) {
          var updated_at = $KI.toInt(split[0]);
          if (updated_at) {
            obj.updated_at = updated_at
          }
          var buckets = split[1].split(".");
          if (buckets.length == this.num_buckets) {
            var buckets_valid = true;
            for (var i = 0; i < buckets.length; i++) {
              buckets[i] = $KI.toInt(buckets[i]);
              if (isNaN(buckets[i])) {
                buckets_valid = false
              }
            }
            if (buckets_valid) {
              obj.buckets = buckets
            }
          }
        }
      }
      if (obj.updated_at && obj.buckets) {
        return obj
      } else {
        return null
      }
    }
  });



  var KI = new $KI.Base('34363139382c276e756c6c272c312c302c302c31', 37522);

  KI.add('/UZJ24Io3XEw2AABU/.*', {
    "id": 105087,
    "name": "jQuery Form Validation - Useful - V2",
    "view_type": "default",
    "requires": {
      "signed_in": "dontcare",
      "duration": 60
    },
    "options": {
      "type": "nudge",
      "selection_submits": true,
      "anchor": "right",
      "cssv": {
        "__theme": "dark"
      }
    },
    "questions": [{
      "id": 138964,
      "type": "radio",
      "title": "Did you find what you were looking for?",
      "description": "",
      "description_placement": "before",
      "answers": [{
        "id": 381618,
        "title": "Yes",
        "next": {
          "id": 138965,
          "node_type": "question"
        }
      }, {
        "id": 381619,
        "title": "No",
        "next": {
          "id": 138968,
          "node_type": "question"
        }
      }],
      "disable_random": null
    }, {
      "id": 138965,
      "type": "radio",
      "title": "How easy was it to use Runnable.com?",
      "description": "",
      "description_placement": "before",
      "answers": [{
        "id": 381620,
        "title": "Very easy",
        "next": {
          "id": 138966,
          "node_type": "question"
        }
      }, {
        "id": 381621,
        "title": "I was confused at first, but ok after",
        "next": {
          "id": 138967,
          "node_type": "question"
        }
      }, {
        "id": 381622,
        "title": "Not that easy",
        "next": {
          "id": 138966,
          "node_type": "question"
        }
      }, {
        "id": 381623,
        "title": "It didn't seem to work",
        "next": {
          "id": 138966,
          "node_type": "question"
        }
      }],
      "disable_random": null
    }, {
      "id": 138966,
      "type": "text",
      "title": "How would you improve Runnable.com?",
      "description": "",
      "description_placement": "before",
      "answers": [],
      "next": {
        "id": 18642,
        "node_type": "message_screen"
      },
      "disable_random": null
    }, {
      "id": 138967,
      "type": "text",
      "title": "What were you initially confused about? Maybe we can improve this.",
      "description": "",
      "description_placement": "before",
      "answers": [],
      "next": {
        "id": 18642,
        "node_type": "message_screen"
      },
      "disable_random": null
    }, {
      "id": 138968,
      "type": "text-single",
      "title": "What was it you were looking for?",
      "description": "",
      "description_placement": "before",
      "answers": [],
      "next": {
        "id": 138965,
        "node_type": "question"
      },
      "disable_random": null
    }],
    "start": {
      "node_type": "question",
      "id": 138964
    },
    "message_screens": [{
      "show_checkmark": true,
      "message": "<p>Thank you!</p>",
      "type": "message",
      "id": 18642
    }],
    "actions": []
  });

  KI.add('/UZKDAYo3XEw2AACX/.*', {
    "id": 104364,
    "name": "jQuery Upload - Useful - V2",
    "view_type": "default",
    "requires": {
      "signed_in": "dontcare",
      "duration": 60
    },
    "options": {
      "type": "nudge",
      "selection_submits": true,
      "anchor": "right",
      "cssv": {
        "__theme": "dark"
      }
    },
    "questions": [{
      "id": 136713,
      "type": "radio",
      "title": "Did you find what you were looking for?",
      "description": "",
      "description_placement": "before",
      "answers": [{
        "id": 374259,
        "title": "Yes",
        "next": {
          "id": 136714,
          "node_type": "question"
        }
      }, {
        "id": 374260,
        "title": "No",
        "next": {
          "id": 136717,
          "node_type": "question"
        }
      }],
      "disable_random": null
    }, {
      "id": 136714,
      "type": "radio",
      "title": "How easy was it to use Runnable.com?",
      "description": "",
      "description_placement": "before",
      "answers": [{
        "id": 374261,
        "title": "Very easy",
        "next": {
          "id": 136715,
          "node_type": "question"
        }
      }, {
        "id": 374262,
        "title": "I was confused at first, but ok after",
        "next": {
          "id": 136716,
          "node_type": "question"
        }
      }, {
        "id": 374263,
        "title": "Not that easy",
        "next": {
          "id": 136715,
          "node_type": "question"
        }
      }, {
        "id": 374264,
        "title": "It didn't seem to work",
        "next": {
          "id": 136715,
          "node_type": "question"
        }
      }],
      "disable_random": null
    }, {
      "id": 136715,
      "type": "text",
      "title": "How would you improve Runnable.com?",
      "description": "",
      "description_placement": "before",
      "answers": [],
      "next": {
        "id": 17467,
        "node_type": "message_screen"
      },
      "disable_random": null
    }, {
      "id": 136716,
      "type": "text",
      "title": "What were you initially confused about? Maybe we can improve this.",
      "description": "",
      "description_placement": "before",
      "answers": [],
      "next": {
        "id": 17467,
        "node_type": "message_screen"
      },
      "disable_random": null
    }, {
      "id": 136717,
      "type": "text-single",
      "title": "What was it you were looking for?",
      "description": "",
      "description_placement": "before",
      "answers": [],
      "next": {
        "id": 136714,
        "node_type": "question"
      },
      "disable_random": null
    }],
    "start": {
      "node_type": "question",
      "id": 136713
    },
    "message_screens": [{
      "show_checkmark": true,
      "message": "<p>Thank you!</p>",
      "type": "message",
      "id": 17467
    }],
    "actions": []
  });

  _kiq = new $KI.Queue(_kiq);
  $KI.ready(KI.run, KI);
  $KI.attach(window, 'hashchange', function() {
    KI.run()
  });

}