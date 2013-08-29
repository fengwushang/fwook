/* SVN.committedRevision=699418 */
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
(function() {
    if ($.fn.bgiframe) {
        return false
    }
    var b = "";
    if (URLPrefix && URLPrefix.statics) {
        b = URLPrefix.statics
    } else {
        if (currSiteId && currSiteId == 2) {
            b = "http://image.111.com.cn/statics"
        } else {
            b = "http://image.yihaodianimg.com/statics"
        }
    }
    var a = document.createElement("script");
    a.setAttribute("type", "text/javascript");
    a.setAttribute("src", b + "/global/js/libs/jquery/jquery.bgiframe.js?" + currVersionNum);
    document.getElementsByTagName("head")[0].appendChild(a)
})();
jQuery.yhdtool = yhdLib = {
    popwin: function(param) {
        var arg = param,
            tcBox = ".popGeneral",
            sFun = arg.fun ? arg.fun : [],
            cTxt = arg.popcontentstr ? arg.popcontentstr : "",
            popEvent = arg.popevent ? arg.popevent : "click",
            autoClose = arg.autoclosetime;
        var fixed = typeof(arg.fix) == "undefined" || arg.fix ? true : false;
        if (arg.clickid) {
            $(arg.clickid).bind(popEvent, function() {
                if ($(".popGeneral").length == 0) {
                    popMask()
                }
            })
        } else {
            if ($(".popGeneral").length == 0) {
                popMask()
            }
        }

        function popMask() {
            var dwidth = "100%",
                dheight = $(document).height();
            if ($.browser.msie && $.browser.version == 6) {
                $("select:visible", ".delivery").each(function(i) {
                    $(this).addClass("selectSjl").hide()
                })
            }
            var popBOX = !fixed ? '<div class="popGeneral" style="position:absolute;" ' : '<div class="popGeneral" ';
            if (arg.poptitle) {
                popBOX += '><div class="top_tcgeneral"><h4>' + arg.poptitle + '</h4><span class="close_tcg">关闭</span></div></div>'
            } else {
                popBOX += "></div>"
            } if (arg.mask || arg.mask == null) {
                $('<div class="mask_tcdiv"></div>').appendTo($("body")).css({
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 100001,
                    width: dwidth + "",
                    height: dheight + "px",
                    background: "#000",
                    opacity: 0.4
                })
            }
            $(popBOX).appendTo($("body"));
            $(".mask_tcdiv").bgiframe();
            loli.scroll(function() {
                $(".mask_tcdiv").height($(document).height())
            });
            if (arg.popwidth) {
                $(".popGeneral").width(arg.popwidth)
            }
            if (arg.popheight) {
                $(".popGeneral").height(arg.popheight)
            }
            var apTxt = cTxt ? $(cTxt) : $(arg.popcontent).clone();
            apTxt.appendTo($(tcBox)).show();
            popPosition();
            for (var funI = sFun.length - 1; funI >= 0; funI--) {
                eval(sFun[funI] + "()")
            }
            return false
        }

        function popPosition() {
            var popwinTop = 0;
            $(window).resize(function() {
                var width = $(tcBox).width(),
                    height = $(tcBox).height() / 2,
                    windWidth = $(window).width(),
                    pLeft = (windWidth - width) / 2;
                $(tcBox).css({
                    left: pLeft,
                    top: "50%",
                    bottom: "auto",
                    marginTop: "-" + height + "px"
                });
                popwinTop = $(window).height() / 2 - height
            }).trigger("resize");
            if ($.browser.msie && $.browser.version == 6 && fixed) {
                $(window).scroll(function() {
                    $(tcBox).css({
                        top: popwinTop + $(window).scrollTop() + "px",
                        marginTop: 0
                    })
                }).trigger("scroll")
            }
            $(".close_tcg").click(function() {
                closeTc()
            });
            if (autoClose) {
                setTimeout(function() {
                    closeTc()
                }, autoClose)
            }
            if (arg.outareaclose) {
                $(".mask_tcdiv").click(function() {
                    closeTc()
                })
            }
            $(window).keydown(function(event) {
                if (event.keyCode == 27) {
                    closeTc()
                }
            });
            return false
        }

        function closeTc() {
            $(".popGeneral").remove();
            $(".mask_tcdiv").remove();
            if ($.browser.msie && $.browser.version == 6) {
                $("select.selectSjl").each(function() {
                    $(this).removeClass("selectSjl").show()
                })
            }
        }
        return false
    },
    popclose: function() {
        if ($.browser.msie && $.browser.version == 6) {
            $("select.selectSjl").each(function() {
                $(this).removeClass("selectSjl").show()
            })
        }
        $(".popGeneral,.mask_tcdiv").remove()
    },
    popwinreload: function() {
        if ($("body > .popGeneral").length) {
            $(window).trigger("resize")
        }
    },
    ratebox: function(rateboxArgus) {
        var rateArg = rateboxArgus,
            rateObj = document.getElementById(rateArg.id),
            rateDg = rateArg.ratedegree;
        if (rateArg.autorate) {
            var rtim = rateArg.ratetime ? rateArg.ratetime : 15,
                step = rateArg.step ? rateArg.step : 20;
            if (rateDg >= 0) {
                setInterval(function() {
                    rate(rateObj, (rateDg += step) >= 360 ? rateDg = 0 : rateDg);
                    return false
                }, rtim)
            } else {
                if (rateDg < 0) {
                    setInterval(function() {
                        rate(rateObj, (rateDg -= step) <= 0 ? rateDg = 360 : rateDg);
                        return false
                    }, rtim)
                }
            }
        } else {
            rate(rateObj, rateDg)
        }

        function rate(obj, degree) {
            var ST = obj.style;
            if (document.all) {
                var deg = degree * Math.PI / 180,
                    M11 = Math.cos(deg),
                    M12 = -Math.sin(deg),
                    M21 = Math.sin(deg),
                    M22 = Math.cos(deg);
                obj.fw = obj.fw || obj.offsetWidth / 2;
                obj.fh = obj.fh || obj.offsetHeight / 2;
                var adr = (90 - degree % 90) * Math.PI / 180,
                    adp = Math.sin(adr) + Math.cos(adr);
                with(ST) {
                    filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + M11 + ",M12=" + M12 + ",M21=" + M21 + ",M22=" + M22 + ",SizingMethod='auto expand');";
                    top = obj.fh * (1 - adp) + "px";
                    left = obj.fw * (1 - adp) + "px"
                }
            } else {
                var rotate = "rotate(" + degree + "deg)";
                with(ST) {
                    MozTransform = rotate;
                    WebkitTransform = rotate;
                    OTransform = rotate;
                    Transform = rotate
                }
            }
            return false
        }
        return false
    }
};
