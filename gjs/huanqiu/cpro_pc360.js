
declare(function () {
    /**
    娓叉煋寮曟搸
    @class DataEngine
    @namespace $baseName.UI.Template
    */
    return {
        name: 'AlignEngine',
        namespace: 'Cpro.Template',
        paint: function (option) {
            var slotData = option.slotData;
            var layoutObj = option.layoutObj;
            var layoutIndex = layoutObj.layoutIndex;
            var data = option.data;
            var dataTypeMapping = {
                image: "image",
                res: "image",
                curl: "link"
            }
            var idPrefix = slotData.idPrefix || "";


            if (option.containerVerticalAlign === "center") {
                var containerDom = document.getElementById(idPrefix + "container");
                if (containerDom) {
                    var containerOldWidth = containerDom.offsetWidth;
                    var containerOldHeight = containerDom.offsetHeight;

                    for (var i = 0, count = data.length; i < count; i++) {
                        var itemDom = document.getElementById(idPrefix + "item" + i);
                        if (itemDom) {
                            itemDom.style.height = "";
                        }
                    }
                }
            }


            for (var i = 0, count = data.length; i < count; i++) {
                var itemDom = document.getElementById(idPrefix + "item" + i);
                if (itemDom) {
                    var itemOldWidth = itemDom.offsetWidth;
                    var itemOldHeight = itemDom.offsetHeight;

                    if (option.itemTextAlign === "center") {}

                    if (option.itemVerticalAlign === "middle") {
                        itemDom.style.height = "";
                        itemNewHeight = itemDom.offsetHeight;
                        var itemHeightDiff = itemOldHeight - itemNewHeight;
                        if (itemHeightDiff > 0) {
                            itemDom.style.paddingTop = itemHeightDiff / 2;
                        }
                        layoutObj["item"]
                    }
                }
            }
        }
    }
});

declare(function () {
    return {
        name: 'AntiCheat',
        namespace: 'Cpro.Template',
        antiCheatArray: [],
        mouseInClientX: -1,
        mouseInClientY: -1,
        mouseInTime: -1,
        mouseInTimeSpan: -1,
        mousePressTime: -1,
        mouseClickClientX: -1,
        mouseClickClientY: -1,
        mouseClickCheckNum: -1,
        mouseOverTimes: -1,
        bind: function (element, eventType, handler) {
            if (window.addEventListener) {
                element.addEventListener(eventType, handler, false)
            }
            else {
                element.attachEvent("on" + eventType, handler)
            }
        },
        
        formatEventObj: function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            return e;
        },
        
        mouseInHandler: function (e) {
            if (this.mouseInClientX === -1) {
                this.mouseInClientX = e.clientX;
            }
            if (this.mouseInClientY === -1) {
                this.mouseInClientY = e.clientY;
            }
        },
        
        mouseInTimeHandler: function (e) {
            if (this.mouseInTime === -1) {
                this.mouseInTime = (new Date()).getTime();
            }
            this.mouseInTimeSpan = (new Date()).getTime() - this.mouseInTime;
        },

        mousePressTimeHandler: function (e) {
            if (e.type === "mousedown") {
                this.mousePressTime = (new Date()).getTime();
            }
            else {
                this.mousePressTime = (new Date()).getTime() - this.mousePressTime;
            }
        },

        mouseClickHandler: function (e) {
            e = this.formatEventObj(e);
            var sourceElement = e.target;
            if (sourceElement.tagName.toLowerCase() !== "a") {
                sourceElement = sourceElement.parentNode;
            }
            this.mouseClickClientX = e.clientX;
            this.mouseClickClientY = e.clientY;

            this.mouseInTimeHandler();

            //make the mouseClickCheckNum
            this.mouseClickCheckNum = 0;
            var urlParamMatch = /\.php\?(url=)?([0-9a-zA-Z_-]*)\./.exec(sourceElement.href);
            var urlParam = urlParamMatch[2];
            var domIdMatch = /.*(\d+)/.exec(sourceElement.id);
            var domNum = domIdMatch[1];
            var midNum = this.antiCheatArray[domNum];
            for (var i = 0; i < (((this.mouseOverTimes * midNum) % 99) + 9); i++) {
                var idx = (this.mousePressTime * i) % urlParam.length;
                this.mouseClickCheckNum += urlParam.charCodeAt(idx);
            }

            //make click url
            var elementHtml = sourceElement.innerHTML;
            if (sourceElement.href.indexOf("&ck") == -1) {
                sourceElement.href += "&ck=" + this.mouseClickCheckNum + "." + this.mouseOverTimes + "." + this.mousePressTime + "." + this.mouseClickClientX + "." + this.mouseClickClientY + "." + this.mouseInClientX + "." + this.mouseInClientY + "." + this.mouseInTimeSpan;
            }
            if ((elementHtml.match(/(www\.)|(.*@.*)/i) != null) && document.all) {
                elementHtml.match(/\<.*\>/i) == null ? sourceElement.innerHTML = elementHtml : sourceElement.innerTEXT = elementHtml;
            }
        },

        mouseOverHandler: function (e) {
            if (this.mouseOverTimes === -1) {
                this.mouseOverTimes = 0;
            }
            this.mouseOverTimes++;
        },

        check: function (containerId, antiCheatArray) {
            this.antiCheatArray = antiCheatArray||window.antiCheatArray;
            var container = document.getElementById(containerId);
            var linkArray = container.getElementsByTagName("a");
            this.bind(container, "mouseover", this.mouseInHandler.proxy(this));
            this.bind(container, "mouseover", this.mouseInTimeHandler.proxy(this));
            for (var i = 0; i < linkArray.length; i++) {
                if (linkArray[i].className && (linkArray[i].className.toLowerCase() === "gylogo" || linkArray[i].className.toLowerCase() === "bdlogo")) {
                    continue;
                }
                this.bind(linkArray[i], "mousedown", this.mousePressTimeHandler.proxy(this));
                this.bind(linkArray[i], "mouseup", this.mousePressTimeHandler.proxy(this));
                this.bind(linkArray[i], "click", this.mouseClickHandler.proxy(this));
                this.bind(linkArray[i], "mouseover", this.mouseOverHandler.proxy(this));
            }
        }
    }
});

declare(function () {
    /**
    甯冨眬寮曟搸鍩虹绫�
    @class BaseLayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name: 'BaseLayoutEngine',
        namespace: 'Cpro.Template',
        /**
        鑾峰彇CssName, 鍏佽娣诲姞鍓嶇紑
        @method GetCssName
        @return {String} CssName瀛楃涓�
        */
        GetCssName: function (name, option) {
            var result = name;
            if (option.idPrefix) {
                result = option.idPrefix + result;
            }
            return result;
        },

        /**
        container鐨勫竷灞€鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutContainer: function (width, height, option) {
            var container = {
                style: {},
                content: [],
                dataType: "layout",
                domName: "div",
                cssName: this.GetCssName("container", option)
            };
            var style = container.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.containerPaddingLeft);
            style["padding-right"] = parseInt(option.containerPaddingRight);
            style["padding-top"] = parseInt(option.containerPaddingTop);
            style["padding-bottom"] = parseInt(option.containerPaddingBottom);
            if (option.containerBorderWidth) {
                option.containerBorderTop = option.containerBorderWidth;
                option.containerBorderRight = option.containerBorderWidth;
                option.containerBorderBottom = option.containerBorderWidth;
                option.containerBorderLeft = option.containerBorderWidth;
            }
            style["border-width"] = option.containerBorderWidth;
            style["border-style"] = option.containerBorderStyle;
            style["border-top-width"] = option.containerBorderTop;
            style["border-right-width"] = option.containerBorderRight;
            style["border-bottom-width"] = option.containerBorderBottom;
            style["border-left-width"] = option.containerBorderLeft;
            style["border-color"] = "#" + option.containerBorderColor.replace("#", "");
            style["width"] = width - style["padding-left"] - style["padding-right"] - 2 * style["border-width"];
            style["height"] = height - style["padding-top"] - style["padding-bottom"] - 2 * style["border-width"];
            style["background-color"] = "#" + option.containerBackgroundColor.replace("#", "");
            if (parseInt(option.containerOpacity) == 1) {
                style["background-color"] = "transparent";
            }
            style["position"] = "relative";
            style["overflow"] = "hidden";
            container.props = {
                id: option.idPrefix ? (option.idPrefix + "container") : "container"
            };
            return container;
        },


        /**
        item瀹瑰櫒甯冨眬鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutItem: function (width, height, option) {
            var item = {
                style: {},
                content: [],
                dataType: "layout",
                domName: "div",
                cssName: this.GetCssName("item", option)
            };
            var style = item.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.itemPaddingLeft);
            style["padding-right"] = parseInt(option.itemPaddingRight);
            style["padding-top"] = parseInt(option.itemPaddingTop);
            style["padding-bottom"] = parseInt(option.itemPaddingBottom);
            style["width"] = Math.floor(style["outer-width"] - style["padding-left"] - style["padding-right"]);
            style["height"] = Math.floor(style["outer-height"] - style["padding-top"] - style["padding-bottom"]);
            style["float"] = "left";
            style["overflow"] = "hidden";
            style["text-align"] = option.itemTextAlign || "left";
            //=========鍏泭骞垮憡鐨勭壒娈婂鐞�==========
            if (typeof isGongyi !== "undefined" && isGongyi && (option.stuffType === "text" || option.stuffType === "tuwen")) {
                //瀵筰tem鍋氱壒娈婂鐞�, 闄愬埗鏈€澶ч珮搴﹀拰瀹藉害 
                style["width"] = style["width"] > 250 ? 250 : style["width"];
                style["height"] = style["height"] > 90 ? 90 : style["height"];
                style["padding-left"] = style["padding-left"] + ((width - style["width"]) / 2);
                style["padding-top"] = style["padding-top"] + ((height - style["height"]) / 2);
            }
            return item;
        },


        /**
        title瀹瑰櫒甯冨眬鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutTitle: function (width, height, option, floatDirection) {
            var title = {
                style: {},
                content: [],
                dataType: "text",
                domName: "div",
                cssName: this.GetCssName("title", option),
                dataKey: "title"
            };
            var style = title.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.titlePaddingLeft);
            style["padding-right"] = parseInt(option.titlePaddingRight);
            style["padding-top"] = parseInt(option.titlePaddingTop);
            style["padding-bottom"] = parseInt(option.titlePaddingBottom);
            style["line-height"] = this.calculateTitleLineHeight(option);
            style["width"] = style["outer-width"] - style["padding-left"] - style["padding-right"];
            style["height"] = style["outer-height"] - style["padding-top"] - style["padding-bottom"];
            style["overflow"] = "hidden";
            style["font-size"] = option.titleFontSize;
            style["font-family"] = option.titleFontFamily;
            style["text-align"] = option.titleTextAlign;
            style["color"] = "#" + option.titleFontColor.replace("#", "");
            style["text-decoration"] = option.titleShowUnderline ? "underline" : "none";
            style["font-weight"] = option.titleFontWeight;
            title.rowCount = option.titleRowCount > 0 ? option.titleRowCount : this.calculateTitleRowCount(height, option);
            title.showEllipsis = option.titleIsShowEllipsis;
            if (floatDirection) {
                style["float"] = floatDirection;
            }

            if (option.titleHoverFontColor.toString() !== "-1" || option.titleHoverShowUnderline.toString() !== "-1" || option.titleHoverBackgroundColor.toString() !== "-1") {
                var styleHover = title.styleHover = {};
                if (option.titleHoverFontColor.toString() !== "-1") {
                    styleHover["color"] = "#" + option.titleHoverFontColor.toString().replace("#", "");
                }
                if (option.titleHoverShowUnderline.toString() !== "-1") {
                    styleHover["text-decoration"] = option.titleHoverShowUnderline ? "underline" : "none";
                }
                if (option.titleHoverBackgroundColor.toString() !== "-1") {
                    styleHover["background-color"] = "#" + option.titleHoverBackgroundColor.toString().replace("#", "");
                }
            }

            return title;
        },


        /**
        url瀹瑰櫒甯冨眬鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutUrl: function (width, height, option, floatDirection) {
            var url = {
                style: {},
                content: [],
                dataType: "text",
                domName: "div",
                cssName: this.GetCssName("url", option),
                dataKey: "surl"
            };
            var style = url.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.urlPaddingLeft);
            style["padding-right"] = parseInt(option.urlPaddingRight);
            style["padding-top"] = parseInt(option.urlPaddingTop);
            style["padding-bottom"] = parseInt(option.urlPaddingBottom);
            style["line-height"] = this.calculateUrlLineHeight(option);
            style["width"] = style["outer-width"] - style["padding-left"] - style["padding-right"];
            style["height"] = style["outer-height"] - style["padding-top"] - style["padding-bottom"];
            style["overflow"] = "hidden";
            style["font-size"] = option.urlFontSize;
            style["font-family"] = option.urlFontFamily;
            style["color"] = "#" + option.urlFontColor.replace("#", "");
            style["float"] = "left";
            style["text-decoration"] = option.urlShowUnderline ? "underline" : "none";
            style["font-weight"] = option.urlFontWeight;
            url.rowCount = option.urlRowCount > 0 ? option.urlRowCount : 1;
            url.showEllipsis = option.urlIsShowEllipsis;
            if (floatDirection) {
                style["float"] = floatDirection;
            }
            return url;
        },


        /**
        desc瀹瑰櫒甯冨眬鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutDesc: function (width, height, option, floatDirection) {
            var desc = {
                style: {},
                content: [],
                dataType: "text",
                domName: "div",
                cssName: this.GetCssName("desc", option),
                dataKey: "desc"
            };
            var style = desc.style;
            //style["word-wrap"] = "break-word";
            //style["word-break"] = "break-all";
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.descPaddingLeft);
            style["padding-right"] = parseInt(option.descPaddingRight);
            style["padding-top"] = parseInt(option.descPaddingTop);
            style["padding-bottom"] = parseInt(option.descPaddingBottom);
            style["line-height"] = this.calculateDescLineHeight(option);
            style["width"] = style["outer-width"] - style["padding-left"] - style["padding-right"];
            style["height"] = style["outer-height"] - style["padding-top"] - style["padding-bottom"];
            style["overflow"] = "hidden";
            style["font-size"] = option.descFontSize;
            style["font-family"] = option.descFontFamily;
            style["color"] = "#" + option.descFontColor.replace("#", "");
            style["float"] = "left";
            style["text-decoration"] = option.descShowUnderline ? "underline" : "none";
            style["font-weight"] = option.descFontWeight;
            //鏄剧ず鍑犺, 濡傛灉鍊间负-1琛ㄧず鑷姩璁＄畻, 鍚﹀垯浠ョ敤鎴疯缃殑涓哄噯.
            desc.rowCount = option.descRowCount > 0 ? option.descRowCount : this.calculateDescRowCount(height, option);
            desc.showEllipsis = option.descIsShowEllipsis;
            if (floatDirection) {
                style["float"] = floatDirection;
            }
            return desc;
        },

        /**
        logo瀹瑰櫒甯冨眬鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutLogo: function (width, height, option) {
            var logo = {
                style: {},
                content: [],
                dataType: "image",
                domName: "div",
                cssName: this.GetCssName("logo", option),
                dataKey: "res"
            };
            var style = logo.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.logoPaddingLeft);
            style["padding-right"] = parseInt(option.logoPaddingRight);
            style["padding-top"] = parseInt(option.logoPaddingTop);
            style["padding-bottom"] = parseInt(option.logoPaddingBottom);
            style["width"] = style["outer-width"] - style["padding-left"] - style["padding-right"];
            style["height"] = style["outer-height"] - style["padding-top"] - style["padding-bottom"];
            style["float"] = "left";
            style["overflow"] = "hidden";
            return logo;
        },

        /**
        container鐨勫竷灞€鍑芥暟 
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutImage: function (width, height, option) {
            var image = {
                style: {},
                content: [],
                dataType: "image",
                domName: "div",
                cssName: this.GetCssName("image", option),
                dataKey: "res"
            };
            var style = image.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.imagePaddingLeft) || 0;
            style["padding-right"] = parseInt(option.imagePaddingRight) || 0;
            style["padding-top"] = parseInt(option.imagePaddingTop) || 0;
            style["padding-bottom"] = parseInt(option.imagePaddingBottom) || 0;
            style["width"] = style["outer-width"] - style["padding-left"] - style["padding-right"];
            style["height"] = style["outer-height"] - style["padding-top"] - style["padding-bottom"];
            style["float"] = "left";
            style["overflow"] = "hidden";
            return image;
        },

        /**
        flash鍏冪礌鐨勫竷灞€鍑芥暟 
        @method layoutFlash
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutFlash: function (width, height, option) {
            var flash = {
                style: {},
                content: [],
                dataType: "flash",
                domName: "div",
                cssName: this.GetCssName("flash", option),
                dataKey: "res"
            };
            var style = flash.style;
            style["outer-width"] = width;
            style["outer-height"] = height;
            style["padding-left"] = parseInt(option.flashPaddingLeft) || 0;
            style["padding-right"] = parseInt(option.flashPaddingRight) || 0;
            style["padding-top"] = parseInt(option.flashPaddingTop) || 0;
            style["padding-bottom"] = parseInt(option.flashPaddingBottom) || 0;
            style["width"] = style["outer-width"] - style["padding-left"] - style["padding-right"];
            style["height"] = style["outer-height"] - style["padding-top"] - style["padding-bottom"];
            style["float"] = "left";
            style["overflow"] = "hidden";
            return flash;
        },

        /**
        鍒楅棿璺濆厓绱  
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutColumnSpace: function (width, height, option) {
            var columnSpace = {
                style: {},
                content: [],
                dataType: "layout",
                domName: "div",
                cssName: this.GetCssName("itemColumnSpace", option)
            };
            var style = columnSpace.style;
            style["width"] = width;
            style["height"] = height;
            style["float"] = "left";
            style["overflow"] = "hidden";

            if (option.itemColumnBorderStyle) {
                //闂磋窛鍏冪礌闇€瑕佹坊鍔犳í绾� option.itemRowBorderWidth
                var line = {
                    style: {},
                    content: [],
                    dataType: "layout",
                    domName: "div",
                    cssName: this.GetCssName("itemColumnSpaceLine", option)
                };

                line.style["width"] = 1;
                line.style["height"] = height;
                line.style["border-style"] = option.itemColumnBorderStyle;
                line.style["border-color"] = "#" + option.containerBorderColor;
                line.style["border-width"] = 0;
                line.style["border-left-width"] = option.itemColumnBorderWidth;
                line.style["margin-left"] = Math.floor(width / 2) - 1;
                line.style["overflow"] = "hidden";
                columnSpace.content.push(line);
            }

            return columnSpace;
        },

        /**
        琛岄棿璺濆厓绱  
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutRowSpace: function (width, height, option) {
            var rowSpace = {
                style: {},
                content: [],
                dataType: "layout",
                domName: "div",
                cssName: this.GetCssName("itemRowSpace", option)
            };

            var style = rowSpace.style;
            style["width"] = width;
            style["height"] = height;
            style["clear"] = "both";
            style["overflow"] = "hidden";

            if (option.itemRowBorderStyle) {
                //闂磋窛鍏冪礌闇€瑕佹坊鍔犳í绾� option.itemRowBorderWidth
                var line = {
                    style: {},
                    content: [],
                    dataType: "layout",
                    domName: "div",
                    cssName: this.GetCssName("itemRowSpaceLine", option)
                };

                line.style["width"] = width;
                line.style["height"] = 1;
                line.style["border-style"] = option.itemRowBorderStyle;
                line.style["border-color"] = "#" + option.containerBorderColor;
                line.style["border-width"] = 0;
                line.style["border-top-width"] = option.itemRowBorderWidth;
                line.style["margin-top"] = Math.floor(height / 2) - 1;
                line.style["overflow"] = "hidden";
                rowSpace.content.push(line);
            }

            return rowSpace;
        },

        /**
        涓篶ontainer娣诲姞item, 浠ュ強琛岃窛鍜屽垪璺濆厓绱  
        @method layoutContainer
        @return {Object} 甯冨眬瀵硅薄
        */
        layoutSpace: function (container, item, option) {
            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱  
            var columnSpace = this.layoutColumnSpace(option.itemColumnSpace, item.style["height"], option);
            var rowSpace = this.layoutRowSpace(container.style["width"], option.itemRowSpace, option);
            //缁勭粐container 
            var rowIndex, columnIndex;
            for (rowIndex = 0;
            rowIndex < option.adRowCount;
            rowIndex++) {
                for (columnIndex = 0;
                columnIndex < option.adColumnCount;
                columnIndex++) {
                    container.content.push(item);
                    //闈炴渶鍚庝竴鍒�, 娣诲姞鍒楅棿璺濆厓绱  
                    if (columnIndex != option.adColumnCount - 1) {
                        container.content.push(columnSpace);
                    }
                }
                //闈炴渶鍚庝竴琛�, 娣诲姞琛岄棿璺濆厓绱  
                if (rowIndex != option.adRowCount - 1) {
                    container.content.push(rowSpace);
                }
            }
            return container;
        },

        calculateLogo: function (parentWidth, parentHeight, option) {
            var result = {
                height: 0,
                width: 0
            };
            result.height = parentHeight > 64 ? 64 : parentHeight;
            result.width = result.height + option.logoPaddingLeft + option.logoPaddingRight;
            return result;
        },
        calculateImage: function (parentWidth, parentHeight, option) {
            var result = {
                height: 0,
                width: 0
            };
            result.height = parentHeight;
            result.width = parentWidth;
            return result;
        },
        calculateFlash: function (parentWidth, parentHeight, option) {
            var result = {
                height: 0,
                width: 0
            };
            result.height = parentHeight;
            result.width = parentWidth;
            return result;
        },
        calculateTitle: function (parentWidth, parentHeight, option) {
            var result = {
                height: 0,
                width: 0
            };
            result.width = option.titleWidth !== -1 ? option.titleWidth : parentWidth;
            var titleLineHeight = this.calculateTitleLineHeight(option);
            var defaultTitleRowCount = 1;
            if ((parentHeight > 60 && parentWidth <= 120) || (parentHeight > 110 && parentWidth <= 180)) {
                defaultTitleRowCount = 2;
            }
            var titleRowCount = option.titleRowCount > 0 ? option.titleRowCount : defaultTitleRowCount;
            result.height = titleLineHeight * titleRowCount + option.titlePaddingTop + option.titlePaddingBottom;
            return result;
        },
        calculateUrl: function (parentWidth, parentHeight, option) {
            var result = {
                height: 0,
                width: 0
            };
            result.width = parentWidth;
            var urlLineHeight = this.calculateUrlLineHeight(option);
            var urlRowCount = option.urlRowCount > 0 ? option.urlRowCount : 1;
            result.height = urlLineHeight * urlRowCount + option.urlPaddingTop + option.urlPaddingBottom;
            return result;
        },
        calculateTitleRowCount: function (outerHeight, option) {
            var result;
            var titleLineHeight = this.calculateTitleLineHeight(option);
            //棰勭暀鐨勯珮搴﹁冻澶熸椂, 鏈€澶氭樉绀轰袱琛宼itle
            result = Math.floor((outerHeight - option.titlePaddingTop - option.titlePaddingBottom) / titleLineHeight);
            result = result >= 2 ? 2 : result;
            return result;
        },
        calculateDescRowCount: function (outerHeight, option) {
            var result;
            var descLineHeight = this.calculateDescLineHeight(option);
            result = Math.floor((outerHeight - option.descPaddingTop - option.descPaddingBottom) / descLineHeight);
            //鏈€澶ц鏁颁负4
            result = result > 4 ? 4 : result;
            return result;
        },
        calculateTitleLineHeight: function (option) {
            var result = option.titleLineHeight > 0 ? option.titleLineHeight : option.titleFontSize + 2;
            return result;
        },
        calculateDescLineHeight: function (option) {
            var result = option.descLineHeight > 0 ? option.descLineHeight : option.descFontSize + 2;
            return result;
        },
        calculateUrlLineHeight: function (option) {
            var result = option.urlLineHeight > 0 ? option.urlLineHeight : option.urlFontSize + 2;
            return result;
        }
    }
});

declare(function () {
    /**
    娓叉煋寮曟搸
    @class DataEngine
    @namespace $baseName.UI.Template
    */
    return {
        name:'DataEngine',
        namespace: 'Cpro.Template',
        flashTemplate: '<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="{flashid}" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="{width}" height="{height}"><param name="movie" value="{url}"><param name="quality" value="high"><param name="wmode" value="transparent"><param name="menu" value="false"><embed src="{url}" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="{flashid}" width="{width}" height="{height}" quality="High" wmode="transparent"></embed></object>',
        /**
		@param {Object} 	option 					鍒涘缓flash鐨勯€夐」鍙傛暟
		@param {string} 	option.url 				flash鏂囦欢鐨剈rl
		@param {string} 	option.width 			flash鐨勫搴�
		@param {string} 	option.height 			flash鐨勯珮搴�
		*/
        createFlashHtml: function (option) {
            option.id = option.id ? option.id : "";
            var result = this.flashTemplate.replace(/\{url\}/gi, option.url).replace(/\{width\}/gi, option.width).replace(/\{height\}/gi, option.height).replace(/\{flashid\}/gi, option.id);
            return result;
        },

        /**
        鎸夌収瀛楄妭鎴彇瀛楃涓�
        @method subStringByBytes        
        */
        subStringByBytes: function (source, length, isFloor) {
            if (!source) {
                return "";
            }
            source = String(source);
            if (length < 0 || source.replace(/[^\x00-\xff]/g, "ci").length <= length) {
                return source;
            }
            source = source.substr(0, length).replace(/([^\x00-\xff])/g, "\x241 ").substr(0, length); //鍙屽瓧鑺傚瓧绗︽浛鎹㈡垚涓や釜, 骞舵埅鍙栭暱搴�
            source = source.replace(/[^\x00-\xff]$/, ""); //鍘绘帀涓寸晫鍙屽瓧鑺傚瓧绗�
            source = source.replace(/([^\x00-\xff]) /g, "\x241"); //杩樺師
            return source;
        },

        /**
        鑾峰彇瀛楃涓茬殑瀛楄妭闀垮害
        @method getByteLength        
        */
        getByteLength: function (source) {
            if (!source) {
                return "";
            }
            source = String(source);
            source = source.replace(/([^\x00-\xff])/g, "\x241 ");
            return source.length;
        },

        /**
        鍔ㄦ€佹杩涙枃瀛楀瓧鑺傛帰娴嬫硶
        @method truncateEngine
         */
        truncateEngine: function (o) {
            var dom = o.dom; //寰呮帰娴嬬殑Dom鍏冪礌
            var showRowCount = o.showRowCount; //鎯宠鏄剧ず鐨勮鏁�
            var showLineHeight = o.showLineHeight; //鏄剧ず鍐呭鐨勮楂�
            var showWidth = o.showWidth; //鎯宠鏄剧ず鐨勫搴�
            var showFontSize = o.showFontSize; //鏄剧ず鐨勫瓧浣撳ぇ灏�
            var showContent = o.showContent; //寰呮樉绀虹殑鍐呭
            var showEllipsis = false; //鏄惁鏄剧ず鐪佺暐鍙�"..."
            if (o.showEllipsis) {
                showEllipsis = true;
            }

            dom.style.whiteSpace = "nowrap"; //鎶婂厓绱犲唴瀹瑰彉鎴愪竴琛�
            var domWidth = dom.offsetWidth; //褰撳墠鍏冪礌鐨勫搴�(涓€琛�)
            var domWidthArray = []; //淇濆瓨鍏冪礌瀹藉害鍙樺寲鐨勬暟缁�
            var domByteLengthArray = []; //淇濆瓨鍏冪礌瀛楄妭闀垮害鐘舵€佺殑鏁扮粍
            var domDetectByteLengthArray = []; //淇濆瓨姣忔鎺㈡祴鐨勫瓧鑺傛暟鏁扮粍
            var domTargetWidth = showRowCount * showWidth; //鐩爣瀹藉害(涓€琛�)
            var totalDetectTimes = 0; //鎬诲叡鎺㈡祴鐨勬鏁�
            
            //========== 鍗曡鍏冪礌, 浣跨敤text-overflow鎴柇
            /*
            if(showRowCount===1){
                dom.innerHTML = showContent;
                dom.className += " textOverflow ";
                if(showEllipsis){
                    dom.className += " textOverflowEllipsis ";
                }
                else{
                    dom.className += " textOverflowClip ";
                }
                return 0;
            }
            */

            //==========鐩戞祴鏄惁鏈夐珮搴� ==========
            if (showLineHeight <= 0 || showRowCount <= 0) {
                return 0;
            }

            //========== 鍔ㄦ€佹杩涙帰娴� ==========
            var widthDiff,
            byteWidth,
            detectDirection;
            for (var i = 0; i < 3; i++, totalDetectTimes++) {
                domWidth = dom.offsetWidth;
                domWidthArray[i] = domWidth;
                domByteLengthArray[i] = this.getByteLength(dom.innerText || dom.textContent);
                widthDiff = domTargetWidth - domWidth; //鐩爣瀹藉害涓庡厓绱犻珮搴︾殑宸€�
                //濡傛灉宸茬粡鍏ㄩ儴鏄剧ず浜嗘枃瀛�, 鍒欎笉杩涜鎺㈡祴
                if (widthDiff > 0 && showContent.length == dom.innerHTML.length) {
                    break;
                }
                byteWidth; //姣忎釜瀛楄妭鐨勫搴�
                detectDirection; //濉厖鏂瑰悜 , 0鏍囪瘑姝ｅ悜鎺㈡祴, 1鏍囪瘑璐熷悜鎺㈡祴

                //濡傛灉鐩稿樊璺濈�灏忎簬5鍍忕礌, 鍒欑洿鎺ヨ繘鍏ュ井璋冮樁娈�
                if (Math.abs(widthDiff) < 5) {
                    break;
                }

                //===== 闇€瑕佺‘瀹氭瘡涓瓧鑺傚崰鐢ㄧ殑瀹藉害	=====
                if (i === 0) { //绗竴娆＄殑姝ヨ繘, 榛樿瀛楄妭瀹藉害涓篺ont-size鐨勪竴鍗�
                    byteWidth = Math.ceil(showFontSize / 2);
                }
                else { //浠ュ悗鐨勫瓧浣撳搴�, 鐢变笂涓€娆＄殑瀹藉害纭畾
                    byteWidth = Math.abs(domWidthArray[i] - domWidthArray[i - 1]) / domDetectByteLengthArray[i - 1];
                    if (byteWidth === 0) { //褰撳唴瀹瑰凡缁忓畬鍏ㄦ樉绀烘椂, 璁＄畻鍑烘潵鐨刡yteWidth涓�0
                        break;
                    }
                }
                domDetectByteLengthArray[i] = Math.ceil(Math.abs(widthDiff) / byteWidth); //鐢辨瘡瀛楄妭瀹藉害纭畾鎺㈡祴闀垮害

                //===== 寮€濮嬫帰娴� =====
                detectDirection = widthDiff > 0 ? 0 : 1;
                if (!detectDirection) { //姝ｅ悜濉厖
                    dom.innerHTML = this.subStringByBytes(showContent, domByteLengthArray[i] + domDetectByteLengthArray[i]);
                }
                else { //璐熷悜濉厖
                    dom.innerHTML = this.subStringByBytes(showContent, domByteLengthArray[i] - domDetectByteLengthArray[i]);
                }
            }

            // ========== 寰皟琛ヤ綑鎺㈡祴	==========
            domWidth = dom.offsetWidth;
            var microDetectDirection; //寰皟鎺㈡祴鏂瑰悜
            var maxDetectTimes = 10; //鏈€澶氭帰娴�10娆�
            var currentDetectTimes = 0;
            while (currentDetectTimes < maxDetectTimes && domWidth > domTargetWidth) {
                domWidth = dom.offsetWidth;
                var domContent = dom.innerText || dom.textContent;
                widthDiff = domTargetWidth - domWidth; //铏氭嫙瀹藉害涓嶥om鍏冪礌瀹藉害鐨勫樊鍊�
                microDetectDirection = widthDiff > 0 ? 0 : 1;
                if (!microDetectDirection) { //姝ｅ悜濉厖
                    dom.innerHTML = showContent.substr(0, domContent.length + 1);
                }
                else { //璐熷悜濉厖
                    dom.innerHTML = showContent.substr(0, domContent.length - 1);
                }
                totalDetectTimes++;
                currentDetectTimes++;

                //check
                domWidth = dom.offsetWidth;
                var domContent = dom.innerText || dom.textContent;
                widthDiff = domTargetWidth - domWidth; //铏氭嫙瀹藉害涓嶥om鍏冪礌瀹藉害鐨勫樊鍊�
                if (!microDetectDirection) { //姝ｅ悜鎺㈡祴
                    if (widthDiff <= 0) {
                        dom.innerHTML = showContent.substr(0, domContent.length - 1);
                        totalDetectTimes++
                        break;
                    }
                }
                else { //璐熷悜鎺㈡祴
                    if (widthDiff >= 0) {
                        break;
                    }
                }
            }
            currentDetectTimes = 0;

            //========== 鎭㈠鏂囧瓧鐨勫琛屾樉绀� ==========
            dom.style.whiteSpace = "normal";
            dom.style.wordBreak = "break-all";
            dom.style.wordWrap = "break-word";

            //========== 澶氳鏄剧ず鍚�, 鐢变簬鎶樿浼氬鑷村鏄剧ず涓€浜涙枃瀛�, 杩涜浜屾寰皟 ==========
            var domHeight = dom.offsetHeight;
            var domTargetHeight = showRowCount * showLineHeight;
            var domContent = dom.innerText || dom.textContent;
            //鏈€澶氳瘯鎺�10娆�
            var maxDetectTimes = 10;
            var currentDetectTimes = 0;
            while (currentDetectTimes < maxDetectTimes && domHeight > domTargetHeight + 4) {
                dom.innerHTML = showContent.substr(0, domContent.length - 1);
                domHeight = dom.offsetHeight;
                domContent = dom.innerText || dom.textContent;
                totalDetectTimes++;
                currentDetectTimes++;
            }
            currentDetectTimes = 0;

            //========== 濡傛灉鍐呭娌℃湁瀹屽叏鏄剧ず, 娣诲姞"..."鍚庣紑 ==========
            if (showEllipsis) {
                if (domContent.length < showContent.length) {
                    var domContent = dom.innerText || dom.textContent;
                    var domCurrentByteLength = this.getByteLength(domContent);
                    dom.innerHTML = this.subStringByBytes(showContent, domCurrentByteLength - 2) + '<span style="font-family:arial;">...</span>';
                }
            }

            //========== 閫傚簲楂樺害 ==========
            var parentTargetHeight = showLineHeight;
            var domOffetHeight = dom.offsetHeight;
            while (parentTargetHeight + 4 < domOffetHeight) {
                parentTargetHeight += showLineHeight;
            }
            dom.parentNode.style.height = parentTargetHeight + "px";

            //========== 杩斿洖鎺㈡祴鐨勬鏁� ==========
            return totalDetectTimes;
        },

        /**
        杩涜鏁版嵁娓叉煋
        @method paint
        @param {Object} option 鍙傛暟瀵硅薄
        @param {Object} [option.dom] 寰呮帰娴嬬殑Dom鍏冪礌
        @param {Number} [option.showRowCount] 鎯宠鏄剧ず鐨勮鏁�
        @param {Number} [option.showLineHeight] 鏄剧ず鍐呭鐨勮楂�
        @param {Number} [option.showWidth] 鎯宠鏄剧ず鐨勫搴�
        @param {Number} [option.showFontSize] 寰呮帰娴嬬殑Dom鍏冪礌
        @param {String} [option.showContent] 寰呮樉绀虹殑鍐呭
        @param {Boolean} [option.showEllipsis] 鏄惁鏄剧ず鐪佺暐鍙�
        */
        paint: function (option) {
            var slotData = option.slotData;
            var layoutObj = option.layoutObj;
            var layoutIndex = layoutObj.layoutIndex;
            var data = option.data;
            var isTruncate = (typeof option.isTruncate!=="undefined") ? option.isTruncate : true;
            var dataTypeMapping = {
                image: "image",
                res: "image",
                curl: "link"
            }
            var idPrefix = slotData.idPrefix || "";

            //LU骞垮憡鏇挎崲url鐨勫鐞�
            if (slotData.displayType === "inlay" && slotData.stuffType === "linkunit" && slotData.urlReplace && slotData.urlReplace !== "default") {
                for (var i = 0, count = data.length; i < count; i++) {
                    data[i].curl = data[i].curl.replace("http://cpro.baidu.com/cpro/ui/uijs.php?", decodeURIComponent(slotData.urlReplace));
                }
            }

            for (var i = 0, count = data.length; i < count; i++) {
                var item = data[i];
                var index = i;
                var stuffType = item["type"];
                for (var key in item) {
                    var href = item["curl"];
                    var dom = document.getElementById(idPrefix + key + index);
                    if (!dom) continue;
                    dom.href = href;
                    var dataType = dataTypeMapping[key] || "text";
                    if (stuffType && stuffType === "flash" && key === "res") {
                        dataType = "flash";
                    }

                    //澶勭悊鍥剧墖
                    if (dataType === "image") {
                        dom.childNodes[0].src = item[key];
                        continue;
                    }
                    else if (dataType === "link") {
                        continue;
                    }
                    else if (dataType === "flash") {
                        var flashContainer = document.getElementById(dom.id + "Flash");
                        flashContainer.innerHTML = this.createFlashHtml({
                            url: item[key],
                            width: flashContainer.style.width,
                            height: flashContainer.style.height
                            /*
                            width: item["width"],
                            height: item["height"]
                            */
                        });
                        continue;
                    }

                    //澶勭悊鏂囧瓧
                    var rowCount = layoutIndex[key] && layoutIndex[key].rowCount || 1;
                    var lineHeight = layoutIndex[key].style["line-height"];
                    var width = layoutIndex[key].style["width"];
                    var fontSize = layoutIndex[key].style["font-size"];
                    var content = (item[key] || "").replace(/\s+/g, " ");
                    var showEllipsis = layoutIndex[key].showEllipsis;
                    //榛樿濉厖鍊�
                    dom.title=content;          
                    if(isTruncate){
                        dom.innerHTML = this.subStringByBytes(content, rowCount * width * 2 / fontSize, true);
                    }
                    else{
                        dom.innerHTML= content;
                    }

                    if (stuffType === "text" || stuffType === "tuwen") {
                        if(isTruncate){
                            var o = {
                                dom: dom,
                                showRowCount: rowCount,
                                showLineHeight: lineHeight,
                                showWidth: width,
                                showFontSize: fontSize,
                                showContent: content,
                                showEllipsis: showEllipsis,
                                key: key
                            };
                            var totalDetectTimes = this.truncateEngine(o);
                        }
                        
                        if(slotData.keywordIsFlush && slotData.keywordIsFlush!==4){
                            var needFlush = false;
                            if( slotData.keywordIsFlush===1 ){
                                needFlush=true;
                            }
                            else if( slotData.keywordIsFlush===2 && key==="title"){
                                needFlush=true;
                            }
                            else if( slotData.keywordIsFlush===3 && key==="desc"){
                                needFlush=true;
                            }
                            if(needFlush){
                                var keywordPainter = using("Cpro.Template.KeywordPainter");
                                keywordPainter.flush( dom,  item["bid"], slotData.keywordFlushColor);
                            }
                        }                        
                    }
                    
                    if (o && o.key === "surl") {
                        o.dom.parentNode.style.display = "block";
                    }
                }
            }
        }
    }
});

declare(function () {
    /**
    妯℃澘鍙傛暟榛樿鍊肩殑绠＄悊绫�.
    @class DefaultValueManager
    @namespace UI.Template
    */
    return {
        name: 'DefaultValueManager',
        namespace: "Cpro.Template",
        /**    
        @param {Object} option 鏈璇锋眰鐨勫弬鏁�
        @param {Number} [option.width]  骞垮憡瀹藉害
        @param {Number} [option.height]  骞垮憡楂樺害
        @param {String} [option.displayType]  骞垮憡灞曠幇绫诲瀷
        @param {String} [option.stuffType]  骞垮憡鐗╂枡绫诲瀷
        @return {Object} 妯℃澘鏍峰紡鍙橀噺鐨勯粯璁ゅ€煎璞�, key鏄痜ullName.
        */
        getDefaultValue: function (option) {
            var result = this.fastClone(this.globalDefaultValue);
            var keyArray = [];
            keyArray.push(option.stuffType);
            keyArray.push(option.displayType);
            keyArray.push(option.displayType + "_" + option.stuffType);
            keyArray.push(option.displayType + "_" + option.stuffType + "_" + option.adRowCount + "_" + option.adColumnCount);
            keyArray.push(option.displayType + "_" + option.stuffType + "_" + option.templateWidth + "_" + option.templateHeight);
            keyArray.push(option.displayType + "_" + option.stuffType + "_" + option.templateWidth + "_" + option.templateHeight + "_" + option.adRowCount + "_" + option.adColumnCount);
            var tempKey = null;
            var tempObj = null;
            var ttkey = null;
            for (var i = 0, count = keyArray.length;
            i < count;
            i++) {
                tempKey = keyArray[i];
                tempObj = this[tempKey];
                if (tempKey && tempObj) {
                    for (ttkey in tempObj) {
                        if (ttkey && (tempObj[ttkey] !== null) && (typeof tempObj[ttkey] !== "undefined")) {
                            result[ttkey] = tempObj[ttkey];
                        }
                    }
                }
            }
            return result;
        },
        /**    
        @param {Object} option 闇€瑕佸厠闅嗙殑瀵硅薄
        @return {Object} 鍏嬮殕鍚庣殑瀵硅薄
        */
        fastClone: function (source) {
            var temp = function () {};
            temp.prototype = source;
            return new temp();
        },
        /**
        Flash鐗╂枡鏍峰紡鍙橀噺榛樿鍊�
        @property {Object} 
        */
        flash: {
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            adRowCount: 1,
            adColumnCount: 1
        },
        /**
        鍥剧墖鐗╂枡鏍峰紡鍙橀噺榛樿鍊�
        @param {Object} imageInlayDefaultValue 
        */
        image: {
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            adRowCount: 1,
            adColumnCount: 1
        },
        /**
        宓屽叆寮�-鏂囧瓧鐗╂枡鏍峰紡鍙橀噺榛樿鍊�
        */
        inlay_text: {
            containerPaddingRight: 8,
            containerBorderWidth: 1,
            containerBorderColor: "ffffff",
            titlePaddingBottom: 4,
            urlPaddingTop: 2
        },
        /**
        宓屽叆寮�-鏂囧瓧鐗╂枡鏍峰紡鍙橀噺榛樿鍊�
        */
        inlay_text_1_1: {
            titleFontSize: 20,
            descFontSize: 14,
            titleTextAlign: "center",
            urlIsShow: 1
        },
        /**
        宓屽叆寮�-鍥炬枃鐗╂枡鏍峰紡鍙橀噺榛樿鍊�
        */
        inlay_tuwen: {
            containerPaddingRight: 8
        },
        /**
        宓屽叆寮�-LinkUnit1 鏍峰紡鍙橀噺榛樿鍊�
        */
        inlay_linkunit1: {
            titleFontSize: 12,
            titleLineHeight: 15,
            containerPaddingLeft: 0,
            containerPaddingRight: 0,
            containerPaddingTop: 0,
            containerPaddingBottom: 0,
            itemColumnSpace: 6,
            itemRowSpace: 4
        },
        inlay_linkunit1_120_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_160_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_180_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_200_90: {
            containerPaddingLeft: 2,
            containerPaddingRight: 2,
            containerPaddingTop: 1,
            containerPaddingBottom: 1,
            adRowCount: 5,
            adColumnCount: 1
        },
        inlay_linkunit1_468_15: {
            containerPaddingRight: 15,
            adRowCount: 1,
            adColumnCount: 5
        },
        inlay_linkunit1_728_15: {
            containerPaddingRight: 15,
            adRowCount: 1,
            adColumnCount: 6
        },
        /**
        宓屽叆寮�-鏂囧瓧-瀹藉害960-楂樺害90-妯悜骞垮憡鏁�1-绾靛悜骞垮憡鏁�4 鏍峰紡鍙橀噺榛樿鍊�
        @param {Object} inlay_text_960_90_1_4 
        */
        inlay_text_960_90_1_4: {
            descFontSize: 14,
            descLineHeight: 16,
            titlePaddingBottom: 3,
            urlPaddingTop: 2
        },
        /**
        宓屽叆寮�-鏂囧瓧-瀹藉害468-楂樺害60 鏍峰紡鍙橀噺榛樿鍊�
        @param {Object} inlay_text_468_60 
        */
        inlay_text_468_60: {
            descFontSize: 12,
            descLineHeight: 14,
            titlePaddingBottom: 3,
            urlPaddingTop: 2,
            containerPaddingRight: 8,
            adRowCount: 1,
            adColumnCount: 2
        },
        /**
        宓屽叆寮�-鍥炬枃-瀹藉害468-楂樺害60 鏍峰紡鍙橀噺榛樿鍊�
        */
        inlay_tuwen_468_60: {
            descFontSize: 12,
            descLineHeight: 14,
            titlePaddingBottom: 3,
            urlPaddingTop: 2,
            adRowCount: 1,
            adColumnCount: 2
        },

        "float": {
            adRowCount: 1,
            adColumnCount: 1
        },


        float_linkunit1_120_270: {
            idPrefix: "lu_",
            containerShowLogo: 0,
            titleTextAlign: "left",
            titleFontColor: "666666",
            titleFontSize: 12,
            titleLineHeight: 14,
            titleShowUnderline: 0,
            containerPaddingLeft: 8,
            containerPaddingRight: 8,
            containerPaddingTop: 4,
            containerPaddingBottom: 4,
            containerBorderWidth: 1,
            containerBorderColor: "cccccc",
            itemColumnSpace: 6,
            itemRowSpace: 4,
            adRowCount: 2,
            adColumnCount: 1
        },


        /**
        鍏ㄥ眬鏍峰紡鍙橀噺榛樿鍊�
        @param {Object} imageInlayDefaultValue 
        */
        globalDefaultValue: {
            "userChargingId": "",
            "templateWidth": 728,
            "templateHeight": 90,
            "adDataType": "text_tuwen",
            "adRowCount": 1,
            "adColumnCount": 4,
            "KeywordIsFlush": 4,
            "KeywordFlushColor": "e10900",
            "isShowUnrelated": 1,
            "isShowPublicAd": 1,
            "backupColor": "ffffff",
            "backupUrl": "",
            "containerBorderColor": "ffffff",
            "containerBorderWidth": 0,
            "containerBorderTop": 0,
            "containerBorderRight": 0,
            "containerBorderBottom": 0,
            "containerBorderLeft": 0,
            "containerBorderStyle": "solid",
            "containerBackgroundColor": "ffffff",
            "containerPaddingLeft": 4,
            "containerPaddingRight": 4,
            "containerPaddingTop": 4,
            "containerPaddingBottom": 4,
            "containerOpacity": 0,
            "containerShowLogo": 1,
            "containerWidth": 0,
            "containerHeight": 0,
            "containerHideHeaderFooter": 0,
            "itemPaddingLeft": 0,
            "itemPaddingRight": 0,
            "itemPaddingTop": 0,
            "itemPaddingBottom": 0,
            "itemColumnSpace": 20,
            "itemColumnBorderWidth": 0,
            "itemColumnBorderStyle": "solid",
            "itemColumnPaddingTop": 0,
            "itemColumnPaddingLeft": 0,
            "itemColumnPaddingRight": 0,
            "itemColumnPaddingBottom": 0,
            "itemRowSpace": 10,
            "itemRowBorderWidth": 0,
            "itemRowBorderStyle": "solid",
            "itemRowPaddingTop": 0,
            "itemRowPaddingLeft": 0,
            "itemRowPaddingRight": 0,
            "itemRowPaddingBottom": 0,
            "logoIsShow": 1,
            "logoPaddingLeft": 0,
            "logoPaddingRight": 4,
            "logoPaddingTop": 0,
            "logoPaddingBottom": 0,
            "logoStyle": "-1",
            "titleFontColor": "0F0CBF",
            "titleFontFamily": "arial,sans-serif",
            "titleFontSize": 14,
            "titleLength": -1,
            "titleIsShowEllipsis": 0,
            "titleIsShow": 1,
            "titleRowCount": 1,
            "titlePaddingLeft": 0,
            "titlePaddingRight": 0,
            "titlePaddingTop": 0,
            "titlePaddingBottom": 5,
            "titleShowUnderline": 1,
            "titleLineHeight": -1,
            "titleTextAlign": "left",
            "titleWidth": -1,
            "titleFontWeight": "normal",
            "titleBackgroundColor": "-1",
            "titleHoverFontColor": "-1",
            "titleHoverShowUnderline": -1,
            "titleHoverBackgroundColor": "-1",
            "titleVisitedFontColor": "-1",
            "titleVisitedShowUnderline": -1,
            "titleVisitedBackgroundColor": "-1",
            "titleActiveFontColor": "-1",
            "titleActiveShowUnderline": -1,
            "titleActiveBackgroundColor": "-1",
            "descFontColor": "444444",
            "descFontFamily": "arial,sans-serif",
            "descFontSize": 12,
            "descLength": -1,
            "descIsShowEllipsis": 1,
            "descIsShow": 1,
            "descRowCount": -1,
            "descPaddingLeft": 0,
            "descPaddingRight": 0,
            "descPaddingTop": 0,
            "descPaddingBottom": 0,
            "descShowUnderline": 0,
            "descLineHeight": -1,
            "descWidth": -1,
            "descFontWeight": "normal",
            "descBackgroundColor": "-1",
            "descHoverFontColor": "-1",
            "descHoverShowUnderline": -1,
            "descHoverBackgroundColor": "-1",
            "descVisitedFontColor": "-1",
            "descVisitedShowUnderline": -1,
            "descVisitedBackgroundColor": "-1",
            "descActiveFontColor": "-1",
            "descActiveShowUnderline": -1,
            "descActiveBackgroundColor": "-1",
            "urlFontColor": "008000",
            "urlFontFamily": "arial,sans-serif",
            "urlFontSize": 11,
            "urlLength": -1,
            "urlIsShowEllipsis": 0,
            "urlIsShow": -1,
            "urlPaddingLeft": 0,
            "urlPaddingRight": 0,
            "urlPaddingTop": 3,
            "urlPaddingBottom": 0,
            "urlShowUnderline": 0,
            "urlRowCount": 0,
            "urlLineHeight": -1,
            "urlWidth": -1,
            "urlFontWeight": "normal",
            "urlBackgroundColor": "-1",
            "urlReplace": " ",
            "urlHoverFontColor": "-1",
            "urlHoverShowUnderline": -1,
            "urlHoverBackgroundColor": "-1",
            "urlVisitedFontColor": "-1",
            "urlVisitedShowUnderline": -1,
            "urlVisitedBackgroundColor": "-1",
            "urlActiveFontColor": "-1",
            "urlActiveShowUnderline": -1,
            "urlActiveBackgroundColor": "-1"
        }
    }
});

declare(function () {
    /**
    宓屽叆寮�-Flash 甯冨眬寮曟搸
    @class TextLayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name:'FlashLayoutEngine',
        namespace: 'Cpro.Template',

        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = true; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");

            //container
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);
            if (option.adRowCount == 1 && option.adColumnCount == 1) {
                container.style["text-align"] = "center";
            }

            //item
            var itemWidth = Math.floor((container.style["width"] - option.itemColumnSpace * (option.adColumnCount - 1)) / option.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - option.itemRowSpace * (option.adRowCount - 1)) / option.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, option);

            //flash
            var flashLayout = engine.calculateFlash(item.style["width"], item.style["height"], option);
            var flashWidth = flashLayout.width;
            var flashHeight = flashLayout.height;
            var flash = engine.layoutFlash(flashWidth, flashHeight, option);
            layoutIndex[flash.dataKey] = flash;


            //缁勮item
            item.content.push(flash);


            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱 
            var columnSpace = engine.layoutColumnSpace(option.itemColumnSpace, itemHeight, option);
            var rowSpace = engine.layoutRowSpace(itemWidth, option.itemRowSpace, option);

            //缁勮container, 娣诲姞闂磋窛鍏冪礌
            container = engine.layoutSpace(container, item, option);

            container.layoutIndex = layoutIndex;
            return container;
        }
    };
});

declare(function () {
    /**
    娓叉煋寮曟搸
    @class DataEngine
    @namespace $baseName.UI.Template
    */
    return {
        name:'FloatDataEngine',
        namespace: 'Cpro.Template',
        /**
        杩涜鏁版嵁娓叉煋
        @method paint
        @param {Object} option 鍙傛暟瀵硅薄
        @param {Object} [option.dom] 寰呮帰娴嬬殑Dom鍏冪礌
        @param {Number} [option.showRowCount] 鎯宠鏄剧ず鐨勮鏁�
        @param {Number} [option.showLineHeight] 鏄剧ず鍐呭鐨勮楂�
        @param {Number} [option.showWidth] 鎯宠鏄剧ず鐨勫搴�
        @param {Number} [option.showFontSize] 寰呮帰娴嬬殑Dom鍏冪礌
        @param {String} [option.showContent] 寰呮樉绀虹殑鍐呭
        @param {Boolean} [option.showEllipsis] 鏄惁鏄剧ず鐪佺暐鍙�
        */
        paint: function (option) {
            var slotData = option.slotData;
            var layoutObj = option.layoutObj;
            var layoutIndex = layoutObj.layoutIndex;
            var data = option.data;
            var isTruncate = (typeof option.isTruncate!=="undefined") ? option.isTruncate : true;
            var dataTypeMapping = {
                image: "image",
                res: "image",
                curl: "link"
            }
            var dataEngine = using("Cpro.Template.DataEngine");
            
            
            
            var idPrefix = slotData.idPrefix || "";

            //LU骞垮憡鏇挎崲url鐨勫鐞�
            if (slotData.displayType === "inlay" && slotData.stuffType === "linkunit" && slotData.urlReplace && slotData.urlReplace !== "default") {
                for (var i = 0, count = data.length; i < count; i++) {
                    data[i].curl = data[i].curl.replace("http://cpro.baidu.com/cpro/ui/uijs.php?", decodeURIComponent(slotData.urlReplace));
                }
            }

            for (var i = 0, count = data.length; i < count; i++) {
                var item = data[i];
                var index = i;
                var stuffType = item["type"];
                for (var key in item) {
                    var href = item["curl"];
                    var dom = document.getElementById(idPrefix + key + index);
                    if (!dom) continue;
                    dom.href = href;
                    var dataType = dataTypeMapping[key] || "text";
                    if (stuffType && stuffType === "flash" && key === "res") {
                        dataType = "flash";
                    }

                    //澶勭悊鍥剧墖
                    if (dataType === "image") {
                        dom.childNodes[0].src = item[key];
                        continue;
                    }
                    else if (dataType === "link") {
                        continue;
                    }
                    else if (dataType === "flash") {
                        var flashContainer = document.getElementById(dom.id + "Flash");
                        flashContainer.innerHTML = this.createFlashHtml({
                            url: item[key],
                            width: flashContainer.style.width,
                            height: flashContainer.style.height
                            /*
                            width: item["width"],
                            height: item["height"]
                            */
                        });
                        continue;
                    }

                    //澶勭悊鏂囧瓧
                    var rowCount = layoutIndex[key] && layoutIndex[key].rowCount || 1;
                    var lineHeight = layoutIndex[key].style["line-height"];
                    var width = layoutIndex[key].style["width"];
                    var fontSize = layoutIndex[key].style["font-size"];
                    var content = (item[key] || "").replace(/\s+/g, " ");
                    var showEllipsis = layoutIndex[key].showEllipsis;
                    //榛樿濉厖鍊�
                    dom.title=content;                    
                    dom.innerHTML = this.subStringByBytes(content, rowCount * width * 2 / fontSize, true);

                    if (stuffType === "text" || stuffType === "tuwen") {
                        if(isTruncate){
                            var o = {
                                dom: dom,
                                showRowCount: rowCount,
                                showLineHeight: lineHeight,
                                showWidth: width,
                                showFontSize: fontSize,
                                showContent: content,
                                showEllipsis: showEllipsis,
                                key: key
                            };
                            var totalDetectTimes = this.truncateEngine(o);
                        }
                    }
                    
                    if (o && o.key === "surl") {
                        o.dom.parentNode.style.display = "block";
                    }
                }
            }
        }
    }
});

declare(function () {
    /**
    宓屽叆寮�-鍥剧墖 甯冨眬寮曟搸
    @class TextLayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name: 'ImageLayoutEngine',
        namespace: 'Cpro.Template',
        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = true; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");

            //container
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);
            if (option.adRowCount == 1 && option.adColumnCount == 1) {
                container.style["text-align"] = "center";
            }

            //item
            var itemWidth = Math.floor((container.style["width"] - option.itemColumnSpace * (option.adColumnCount - 1)) / option.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - option.itemRowSpace * (option.adRowCount - 1)) / option.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, option);

            //image
            var imageLayout = engine.calculateImage(item.style["width"], item.style["height"], option);
            var imageHeight = imageLayout.height;
            var imageWidth = imageLayout.width;
            var image = engine.layoutImage(imageWidth, imageHeight, option);
            layoutIndex[image.dataKey] = image;


            //缁勮item
            item.content.push(image);


            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱 
            var columnSpace = engine.layoutColumnSpace(option.itemColumnSpace, itemHeight, option);
            var rowSpace = engine.layoutRowSpace(itemWidth, option.itemRowSpace, option);

            //缁勮container, 娣诲姞闂磋窛鍏冪礌
            container = engine.layoutSpace(container, item, option);
            container.layoutIndex = layoutIndex;
            return container;
        }
    };
});

declare(function () {

    /**

    鍏抽敭璇嶇潃鑹插櫒

    @class KeywordPainter

    @namespace Cpro.Template

    */

    return {

        name:'KeywordPainter',

        namespace: 'Cpro.Template',

        flush:function(dom, keywordArray, keywordFlushColor){

            if(!keywordArray){

                return;

            }

            if( typeof keywordArray === "string" ){

                keywordArray = keywordArray.split(" ");

            }

            if(keywordArray.length<=0){

                return;

            }

        

            keywordFlushColor = keywordFlushColor.replace("#","")

            for(var i=0, count=keywordArray.length; i<count; i++){

                var content = dom.innerHTML;

                var keyWord = keywordArray[i];

                var regExp = new RegExp(keyWord,"gi");

                dom.innerHTML =  content.replace(regExp, function(word){

                    return '<span style="color:' + '#' + keywordFlushColor +'">'+word+'</span>';

                });

            }

        }

    };

});

declare(function () {
    /**
    甯冨眬寮曟搸宸ュ巶绫�
    @class LayoutEngineManager
    @namespace $baseName.UI.Template
    @static
    */
    return {
        name: 'LayoutEngineManager',
        namespace: 'Cpro.Template',
        /**
        鑾峰彇甯冨眬寮曟搸瀵硅薄
        @method getLayoutEngine        
        @param {Object} option 鏈璇锋眰鐨勫弬鏁�        
        @param {String} [option.displayType]  骞垮憡灞曠幇绫诲瀷
        @param {String} [option.stuffType]  骞垮憡鐗╂枡绫诲瀷
        @param {Number} [option.width]  骞垮憡瀹藉害
        @param {Number} [option.height]  骞垮憡楂樺害
        @return {Object} 妯℃澘鏍峰紡鍙橀噺鐨勯粯璁ゅ€煎璞�, key鏄痜ullName.
        */
        getLayoutEngine: function (option) {
            var result;
            this.Template = using("Cpro.Template");
            
            //鍑芥暟閲嶈浇. 濡傛灉浼犻€掔殑鏄瓧绗︿覆, 鍒欐爣璇嗚幏鍙栨寚瀹氬悕瀛楃殑甯冨眬寮曟搸
            if( typeof option ==="string" ){
                return this.Template[option];
            }
            
            //鏍规嵁鐗╂枡绫诲瀷, 閫夋嫨妯℃澘寮曟搸
            switch (option.stuffType.toLowerCase()) {
            case "text":
                result = this.Template.TextLayoutEngine;
                break;
            case "image":
                result = this.Template.ImageLayoutEngine;
                break;
            case "tuwen":
                result = this.Template.TuwenLayoutEngine;
                break;
            case "flash":
                result = this.Template.FlashLayoutEngine;
                break;
            case "linkunit1":
                result = this.Template.LinkUnit1LayoutEngine;
                break;
            case "linkunit":
                result = this.Template.LinkUnitLayoutEngine;
                break;
            default:
                result = this.Template.TextLayoutEngine;
                break;
            }
            return result;
        }
    };
});

declare(function () {
    /**
    宓屽叆寮�-鏂囧瓧 甯冨眬寮曟搸
    @class LinkUnit1LayoutEngine
    @namespace $baseName.UI.Template
    */
    return LinkUnit1LayoutEngine = {
        name:'LinkUnit1LayoutEngine',
        namespace: 'Cpro.Template',
        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = true; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");
            //container
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);
            if (option.adRowCount == 1 && option.adColumnCount == 1) {
                container.style["text-align"] = "center";
            }

            //item
            var itemWidth = Math.floor((container.style["width"] - option.itemColumnSpace * (option.adColumnCount - 1)) / option.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - option.itemRowSpace * (option.adRowCount - 1)) / option.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, option);

            //title
            var titleLayout = engine.calculateTitle(item.style["width"], item.style["height"], option);
            var titleWidth = titleLayout.width;
            var titleHeight = titleLayout.height;
            var title = engine.layoutTitle(titleWidth, titleHeight, option);
            layoutIndex[title.dataKey] = title;


            //缁勮item
            item.content.push(title);

            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱 
            var columnSpace = engine.layoutColumnSpace(option.itemColumnSpace, itemHeight, option);
            var rowSpace = engine.layoutRowSpace(itemWidth, option.itemRowSpace, option);

            //缁勮container, 娣诲姞闂磋窛鍏冪礌
            container = engine.layoutSpace(container, item, option);
            container.layoutIndex = layoutIndex;
            return container;
        }
    };
});

declare(function() {
    /**
    宓屽叆寮�-鏂囧瓧 璋冩暣甯冨眬寮曟搸,鍦ㄦ暟鎹紩鎿庤繍琛屼箣鍚庯紝鍐嶈繘琛屽竷灞€鐨勭浜屾璋冩暣
    @class LinkUnitAdjustLayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name: "LinkUnitAdjustLayoutEngine",
        namespace: "Cpro.Template",
        hasClass: function(element, className) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                return element.className.match(reg);
        },
        layout: function(option) {
            var slotData = option.slotData;
            var layoutObj = option.layoutObj;
            var data = option.data;
            //鑾峰彇骞垮憡瀹瑰櫒
            var containerId = layoutObj.props.id?layoutObj.props.id: "container";
            var container = document.getElementById(containerId);
            var idPrefix = slotData.idPrefix || "";
            //鑾峰彇鏁版嵁寮曟搸
            var DataEngine = using("Cpro.Template.DataEngine");
            var itmeSumWidth = 0; //鎵€鏈夊箍鍛妕itle鐨勫搴︿箣鍜�
            var columnIndex = 1; //淇濆瓨褰撳墠鍏冪礌鎵€鍦ㄥ垪鐨勫簭鍙�
            var rowIndex = 1; //淇濆瓨褰撳墠鍏冪礌鎵€鍦ㄨ鐨勫簭鍙�
            var grandFatherArray = [];//淇濆瓨褰撳墠鍏冪礌锛屼篃灏辨槸title鐨勭鐖跺厓绱爄tem鐨勬暟缁�
            //閲嶇疆 itemColumnSpace 鍜� itemRowSpace鍊硷紝鐢ㄦ埛濡備綍鑷畾涔夛紵绗竴鐗堥粯璁ゅ€间负2
            var containerChildArray = container.childNodes; 
            slotData.itemColumnSpace = 2;
            slotData.itemRowSpace = 2;             
            for(var i=0,l=containerChildArray.length; i<l; i++){
                if(this.hasClass(containerChildArray[i],"itemColumnSpace")){
                    containerChildArray[i].style.width = slotData.itemColumnSpace+"px";
                }
                if(this.hasClass(containerChildArray[i],"itemRowSpace")){
                    containerChildArray[i].style.height = slotData.itemRowSpace+"px";
                }
            }
            for (var i = 0,count = data.length; i < count; i++) {  
                var item = data[i]; 
                var index = i;   
                var dom = null;                
                dom = document.getElementById(idPrefix + layoutObj.content[0].content[0].dataKey + index);    
                if (!dom) continue;    
                //濡傛灉骞垮憡鍧楀彧鏈変竴琛岋紝鍒欓渶瑕佸姞鍜屾瘡涓猼itle鐨刼ffsetWidth锛岀劧鍚庡皢鍓╀綑瀹藉害骞冲潎鍒嗛厤缁欐瘡涓猧tem鐨刾adding锛屼娇寰梚tem鐩存帴鐨勯棿璺濅竴鑷�
                if(slotData.adRowCount == 1){
                    //鍥犱负textOverflow涓湁width:100%,瀵艰嚧offsetWidth涓嶅噯纭�
                    dom.className = dom.className.replace("textOverflow","");
                    var titleoffsetWidth = dom.offsetWidth;
                    //缁檛itle,item閲嶇疆瀹藉害
                    dom.style.width = dom.parentNode.style.width = dom.parentNode.parentNode.style.width= titleoffsetWidth + "px";
                    itmeSumWidth = itmeSumWidth+titleoffsetWidth;//璁板綍鎵€鏈塼itle鍏冪礌闇€瑕佺殑楂樺
                     //閲嶆柊缁檛itle鍏冪礌娣诲姞class "offsetWidth" 
                    dom.className = dom.className + " textOverflow";
                    grandFatherArray.push(dom.parentNode.parentNode);//璁板綍姣忚鐨刬tem鍏冪礌锛屼竴琛岄亶鍘嗙粨鏉熷悗锛岄渶瑕佽皟鏁磒adding
                
                    //濡傛灉閬嶅巻缁撴潫锛岃皟鏁存瘡涓猧tem鐨刾adding
                    if(columnIndex == slotData.adColumnCount){
                        var remainderWidth = slotData.templateWidth - slotData.containerPaddingRight - slotData.containerPaddingLeft - itmeSumWidth - (slotData.adColumnCount - 1) * slotData.itemColumnSpace;
                        //鐢变簬IE6涓嶈瘑鍒皬鏁帮紝鏁呴渶瑕佸彇鏁达紝鐒跺悗閽堝鏈€鍚庝竴涓猟om鍋氱壒娈婂鐞�
                        paddingWidth = Math.floor(remainderWidth/(slotData.adColumnCount*2));
                        for(var k=0;k<grandFatherArray.length;k++){ 
                            grandFatherArray[k].style.paddingLeft = paddingWidth + "px";
                            grandFatherArray[k].style.paddingRight = paddingWidth + "px";   
                        }
                        //閽堝鏈€鍚庝竴鍒楃殑dom鍋氱壒娈婂鐞�
                        grandFatherArray[columnIndex-1].style.paddingRight = remainderWidth - paddingWidth*(columnIndex*2-1)+"px"
                    }

                }
                columnIndex++; //淇濆瓨褰撳墠鍏冪礌鎵€鍦ㄥ垪鐨勫簭鍙�,鐢ㄦ潵鍒ゆ柇涓€琛屾槸鍚︾粨鏉�
               
                //璋冩暣item锛宼itle鐨刪eight锛宭ineheight
                var domHeight = Math.floor((slotData.templateHeight - slotData.containerPaddingTop - slotData.containerPaddingBottom - (slotData.adRowCount-1)*slotData.itemRowSpace)/slotData.adRowCount) - slotData.itemPaddingTop - slotData.itemPaddingBottom;
                dom.style.height =dom.parentNode.style.height = dom.parentNode.parentNode.style.height = dom.style.lineHeight = dom.parentNode.style.lineHeight = dom.parentNode.parentNode.style.lineHeight = domHeight+"px";
                dom.style.textAlign = dom.parentNode.style.textAlign = dom.parentNode.style.textAlign = dom.parentNode.parentNode.style.textAlign = "center";
               //閽堝鏈€鍚庝竴琛岀殑dom鍋氱壒娈婂鐞�
                if(rowIndex == slotData.adRowCount){
                    dom.style.height = dom.parentNode.style.height = dom.parentNode.parentNode.style.height = dom.style.lineHeight = dom.parentNode.style.lineHeight = dom.parentNode.parentNode.style.lineHeight = slotData.templateHeight - slotData.containerPaddingTop - slotData.containerPaddingBottom - (slotData.adRowCount-1)*(slotData.itemRowSpace + domHeight + slotData.itemPaddingTop + slotData.itemPaddingBottom) + "px"
                }                
            
            }
            
        }
     
    }
});

declare(function () {
    /**
    宓屽叆寮�-鏂囧瓧 甯冨眬寮曟搸
    @class LinkUnit1LayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name:'LinkUnitLayoutEngine',
        namespace: 'Cpro.Template',
        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = false; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");

            // container
            option.containerPaddingLeft = 0;
            option.containerPaddingRight = 0;
            option.containerPaddingTop = 0;
            option.containerPaddingBottom = 0;
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);
            if (option.adRowCount == 1) {
                container.style["text-align"] = "center";
            }

            //item
            option.itemPaddingLeft = 6;
            option.itemPaddingRight = 6;
            option.itemPaddingTop = 1;
            option.itemPaddingBottom = 1;
            var itemWidth = 7 * option.titleFontSize + option.itemPaddingLeft + option.itemPaddingRight;
            var itemHeight = option.titleFontSize + 4 + option.itemPaddingTop + option.itemPaddingBottom;
            var item = engine.layoutItem(itemWidth, itemHeight, option);


            //title
            option.titlePaddingLeft = 0;
            option.titlePaddingRight = 0;
            option.titlePaddingTop = 0;
            option.titlePaddingBottom = 0;
            var titleWidth = 7 * option.titleFontSize;
            var titleHeight = option.titleFontSize + 4;
            option.titleLineHeight = option.titleFontSize + 4;
            option.titleFontFamily = decodeURIComponent(option.titleFontFamily); //瑙ｇ爜姹夊瓧
            if (option.titleFontFamily !== decodeURIComponent("%E5%AE%8B%E4%BD%93")) { //澧炲姞榛樿瀛椾綋
                option.titleFontFamily += "," + decodeURIComponent("%E5%AE%8B%E4%BD%93");
            }
            if (option.adRowCount == 1) {
                option.titleTextAlign = "center";
            }
            var title = engine.layoutTitle(titleWidth, titleHeight, option);
            layoutIndex[title.dataKey] = title;


            //缁勮item
            item.content.push(title);


            //娣诲姞闂磋窛鍏冪礌
            if (option.adColumnCount > 1) {
                option.itemColumnSpace = Math.floor(
                (option.templateWidth - 2 * option.containerBorderWidth - itemWidth * option.adColumnCount) / (option.adColumnCount - 1));
            }
            else {
                option.itemColumnSpace = option.templateWidth - 2 * option.containerBorderWidth - itemWidth * option.adColumnCount;
            }

            if (option.adRowCount > 1) {
                option.itemRowSpace = Math.floor(
                (option.templateHeight - 2 * option.containerBorderWidth - itemHeight * option.adRowCount) / (option.adRowCount - 1));
            }
            else {
                option.itemRowSpace = option.templateHeight - 2 * option.containerBorderWidth - itemHeight * option.adRowCount;
            }

            container = engine.layoutSpace(container, item, option);


            container.layoutIndex = layoutIndex;
            return container;
        }
    };
});

declare(function () {
    return {
        name: 'TemplateEngine',
        namespace: 'Cpro.Template',
        init : function(){
            
        },
        paint: function (obj) {
            
            var ads = obj.ads;
            var userConfig = obj.userConfig;
            var templatConfig = obj.templateConfig;
            var displayType = obj.displayType;
        
            var mainConfig = Base.fastClone(config);
            var mainFullNameConfig = this.Template.TemplateVariableManager.getVariables(this.mainConfig);

            currentLayoutEngine = this.Template.LayoutEngineManager.getLayoutEngine(this.mainFullNameConfig);
            this.MediaLayoutObj = currentLayoutEngine.layout(this.mainFullNameConfig);
            this.Template.PaintEngine.paint({
                layoutObj: this.MediaLayoutObj,
                userFullNameConfig: this.mainFullNameConfig
            });

            if (ads[0] && ads[0].type && ads[0].type === "image") {
                run(this.ShowContentLoaded.proxy(this), "image");
            }
            else {
                this.ShowContentLoaded();
            }

            this.Template.DataEngine.paint({
                layoutObj: this.MediaLayoutObj,
                data: ads,
                slotData: this.mainFullNameConfig
            });

            //Anticheat
            if (!window.isGongyi) {
                var AntiCheat = using("Cpro.Template.AntiCheat");
                AntiCheat.check("container");
            }
        }
    }
})

declare(function () {
    /**
    娓叉煋寮曟搸
    @class PaintEngine
    @namespace $baseName.UI.Template
    */
    return {
        name:'PaintEngine',
        namespace: 'Cpro.Template',
        idPrefix:"",
        /**
        闇€瑕佹坊鍔爌x鍗曚綅鐨勬牱寮忓睘鎬�
        @property pxStyle
        @type Object
        */
        pxStyle: {
            width: 1,
            height: 1,
            "line-height": 1,
            "padding-left": 1,
            "padding-right": 1,
            "padding-top": 1,
            "padding-bottom": 1,
            "border-width": 1,
            "font-size": 1,
            "margin-left": 1,
            "margin-right": 1,
            "margin-top": 1,
            "margin-bottom": 1,
            "border-left-width": 1,
            "border-right-width": 1,
            "border-top-width": 1,
            "border-bottom-width": 1
        },

        /**
        layoutObj涓摢浜涘睘鎬ф槸涓嶉渶瑕乸aint鐨�.
        @property excludeStyle
        @type Object
        */
        excludeStyle: {
            "outer-height": 1,
            "outer-width": 1
        },

        /**
        鑷姩鐢熸垚鐨刟鍏冪礌, 浼氱户鎵垮摢浜涘睘鎬�
        @property linkStyle
        @type Object
        */
        linkStyle: {
            "font-size": 1,
            "height": 1,
            "line-height": 1,
            "text-decoration": 1,
            "text-align": 1,
            "font-family": 1,
            "color": 1,
            "word-wrap": 1,
            "word-break" : 1,
            "text-overflow" : 1
        },

        /**
        鐢熸垚鏍峰紡鏃剁殑鍏ㄥ眬鏁扮粍瀵硅薄
        @property globalGetStyleObj
        @type Object
        */
        globalGetStyleObj: {},

        /**
        鍏ㄥ眬鐨勬牱寮忓瓧绗︿覆cssString
        @property cssString
        @type {String}
        */
        cssString: "",

        /**
        鍏ㄥ眬ID璁板綍鍣�
        @property idRecorder
        @type {Object}
        */
        idRecorder: {},

        /**
        鑾峰彇layoutObj鐨勬牱寮�
        @method getStyle 
        */
        getStyle: function (cssClassName, o) {
            var result = "";
            if (this.globalGetStyleObj[cssClassName]) {
                return "";
            }
            else {
                this.globalGetStyleObj[cssClassName] = 1;
            }
            var style = o.style;
            if (style) {
                for (var key in style) {
                    if (this.excludeStyle[key]) {
                        continue;
                    }
                    result += key + ":" + style[key] + (this.pxStyle[key] ? "px;" : ";");
                }
            }
            result = "." + cssClassName + " {" + result + "} \n";
            return result;
        },

        /**
        鑾峰彇layoutObj瀵瑰簲鐨刟鍏冪礌鐨勬牱寮�
        @method getLinkStyle 
        */
        getLinkStyle: function (cssClassName, o) {
            var result = "";
            if (this.globalGetStyleObj[cssClassName]) {
                return "";
            }
            else {
                this.globalGetStyleObj[cssClassName] = 1;
            }
            var style = o.style;
            if (style) {
                for (var key in style) {
                    if (this.excludeStyle[key] || !this.linkStyle[key]) {
                        continue;
                    }
                    result += key + ":" + style[key] + (this.pxStyle[key] ? "px;" : ";");
                }
            }
            

            if (o.dataType === "flash") {
                result += "display:block; position:absolute; top:0px; left:0px; z-index:9; cursor:hand; opacity:0; filter:alpha(opacity=0); background-color:#FFFFFF; width:" + style["width"] + "px;";
            }

            result = "." + cssClassName + " {" + result + "} \n";
            
            if(o.styleHover){
                var tempOption = {};
                tempOption.style = o.styleHover;
                result += this.getLinkStyle(cssClassName+":hover", tempOption);
            }
            
            return result;
        },

        /**
        娣诲姞鏍峰紡瀛楃涓�
        @method addCssByStyle 
        */
        addCssByStyle: function (cssString) {
            var doc = document;
            var style = doc.createElement("style");
            style.setAttribute("type", "text/css");

            if (style.styleSheet) { // IE
                style.styleSheet.cssText = cssString;
            }
            else { // w3c
                var cssText = doc.createTextNode(cssString);
                style.appendChild(cssText);
            }

            var heads = doc.getElementsByTagName("head");
            if (heads.length) heads[0].appendChild(style);
            else doc.documentElement.appendChild(style);
        },


        /**
        鏍规嵁layoutObj, 缁樺埗dom鍏冪礌
        @method drawDom 
        @return {Object} 
        */
        drawDom: function (layoutObj) {
            var cssName = layoutObj.cssName || layoutObj.dataKey;
            this.cssString += this.getStyle(cssName, layoutObj);
            var dom = document.createElement(layoutObj.domName);
            dom.className = cssName;
            for (var key in layoutObj.props) {
                dom[key] = layoutObj.props[key];
            }
            if (layoutObj.dataType != "layout") {
                this.idRecorder[layoutObj.dataKey+this.idPrefix] = this.idRecorder[layoutObj.dataKey+this.idPrefix] || 0
                var domId = this.idPrefix + layoutObj.dataKey + this.idRecorder[layoutObj.dataKey+this.idPrefix];
                var domLink = document.createElement("a");
                domLink.id = domId;
                domLink.target = "_blank";
                var cssNameLink = cssName + " a";
                this.cssString += this.getLinkStyle(cssNameLink, layoutObj);
                this.idRecorder[layoutObj.dataKey+this.idPrefix]++;

                switch (layoutObj.dataType) {
                case "text":
                    break;
                case "image":
                    var domLinkImg = document.createElement("img");
                    domLinkImg.style.width = (layoutObj.style["width"]) + "px";
                    domLinkImg.style.height = (layoutObj.style["height"]) + "px";
                    domLink.style.display = "block";
                    domLink.appendChild(domLinkImg);
                    break;
                case "flash":
                    var flashDiv = document.createElement("div");
                    flashDiv.style.width = (layoutObj.style["width"]) + "px";
                    flashDiv.style.height = (layoutObj.style["height"]) + "px";
                    flashDiv.id = domId + "Flash";
                    dom.appendChild(flashDiv);
                    break;
                default:
                    break;
                }

                dom.appendChild(domLink);
            }

            if (layoutObj.content && layoutObj.content.length) {
                for (var i = 0, count = layoutObj.content.length; i < count; i++) {
                    for (var j = 0, ccount = layoutObj.content[i].count || 1; j < ccount; j++) {
                        dom.appendChild(this.drawDom(layoutObj.content[i]));
                    }
                }
            }
            return dom;
        },
        
        /**
        缁樺埗logo
        @param {Object} option 鍙傛暟瀵硅薄闆嗗悎
        @param {Object} [option.layoutObj] 甯冨眬瀵硅薄
        */
        drawLogo: function(option){       
            option = option || {};
            var logoId = option.logoId || "logo";
            var logoDom = document.getElementById(logoId);
            if(!logoDom){
                logoDom = document.createElement("a");
            }            
  
            var isGongyi = false;
            if(typeof option.isGongyi === "undefined" && typeof window.isGongyi !== "undefined"){
                isGongyi = window.isGongyi;
            }
            else{
                isGongyi = option.isGongyi? true : false;
            }
            logoDom.innerHTML = "&nbsp;";
            logoDom.className=option.className||"bd-logo";
            logoDom.target="_blank";
            if(isGongyi){
                logoDom.href="http://gongyi.baidu.com/";
                logoDom.title="\u767e\u5ea6\u516c\u76ca";                
            }
            else{
                logoDom.href="http://wangmeng.baidu.com/";
                logoDom.title="\u767e\u5ea6\u7f51\u76df\u63a8\u5e7f";
            }
            
            var tempFunc = function () {
                logoDom.style.zoom = '1';
            };
            setTimeout(tempFunc, 100);
            return logoDom;
        },


        /**
        鏍规嵁浼犲叆鐨刲ayoutObject, 娓叉煋椤甸潰
        @method paint
        @param {Object} option 鍙傛暟瀵硅薄闆嗗悎
        @param {Object} [option.layoutObj] 甯冨眬瀵硅薄
        */
        paint: function (option) {
            var result = [];
            var layoutObj = option.layoutObj;
            var userFullNameConfig = option.userFullNameConfig;
            var styleCssString = option.styleCssString || "";
            this.idPrefix=userFullNameConfig.idPrefix || "";

            result = this.drawDom(layoutObj);
            this.cssString += styleCssString;
            this.addCssByStyle(this.cssString);

            if (window.ad) {
                window.ad.parentNode.removeChild(window.ad);
                window.ad = null;
            }

            window.loader = document.getElementById(this.idPrefix+"loader");
            window.ad = result;
            window.loader.parentNode.insertBefore(result, window.loader);

            //<<a id="logo" class="logo" title="鎺ㄥ箍鐢ㄦ埛锛歸ww.tczlq.com" href="http://wangmeng.baidu.com/" target="_blank">&nbsp;</a>
            //娣诲姞鎺ㄥ箍logo
            if (userFullNameConfig.containerShowLogo) {
                var logoOption = {};
                if(userFullNameConfig.stuffType==="linkunit" || userFullNameConfig.stuffType==="linkunit1"){
                    logoOption.className="bd-logo2";
                }
                if( userFullNameConfig.logoStyle && userFullNameConfig.logoStyle.toString() !== "-1"){
                    logoOption.className = userFullNameConfig.logoStyle;
                }
                result.appendChild(this.drawLogo(logoOption));
            }
            window.loader = window.ad = result = null;

        }

    }
});

declare(function () {
    /**
    宓屽叆寮�-鏂囧瓧 鍗曡甯冨眬寮曟搸
    @class SingleLineLayoutEngine
    @namespace $baseName.UI.Template
    */
    return SingleLineLayoutEngine = {
        name:'SingleLineLayoutEngine',
        namespace:'Cpro.Template',
        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = true; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");
            
            //container
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);          

            //item
            var itemWidth = Math.floor((container.style["width"] - option.itemColumnSpace * (option.adColumnCount - 1)) / option.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - option.itemRowSpace * (option.adRowCount - 1)) / option.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, option);

            //title
            if( option.titleWidth &&  option.titleWidth!==-1){
                option.titleWidth = option.titleWidth;
            }
            else{
                //娌℃湁浼犻€抰itleWidth, 鑷姩璁＄畻
                if( !option.urlIsShow && !option.descIsShow ){
                    //url鍜宒esc閮戒笉鏄剧ず, title鍗犳弧item瀹藉害
                    option.titleWidth = item.style["width"];
                }
                else{
                    //url鎴栬€卍esc鏄剧ず, 鍒檛itle榛樿涓轰簲鍒嗕箣浜宨tem瀹藉害
                    var defaultTitleWidth = parseInt(2*item.style["width"]/5);
                    defaultTitleWidth = defaultTitleWidth>300?300:defaultTitleWidth;                
                    option.titleWidth = defaultTitleWidth;    
                }

            }
            var titleLayout = engine.calculateTitle(item.style["width"], item.style["height"], option);
            var titleWidth = titleLayout.width;
            var titleHeight = item.style["height"];
            var title = engine.layoutTitle(titleWidth, titleHeight, option);
            title.domName = "span";
            title.style["display"]="inline-block";
            title.style["text-overflow"] = option.titleIsShowEllipsis ? "ellipsis" : "clip";
            title.style["white-space"] = "nowrap";
            title.style["line-height"] = title.style["height"];
            layoutIndex[title.dataKey] = title;

            //url
            var urlWidth = 0;
            var urlHeight = titleHeight;
            if(option.urlIsShow){
                if( option.urlWidth &&  option.urlWidth!==-1){
                    urlWidth = option.urlWidth;
                }
                else{
                    //娌℃湁浼犻€抲rlWidth, 鑷姩璁＄畻
                    var defaultUrlWidth = parseInt(1*item.style["width"]/5);
                    defaultUrlWidth = defaultUrlWidth<100?100:defaultUrlWidth;
                    urlWidth = defaultUrlWidth;
                }

                var url = engine.layoutUrl(urlWidth, urlHeight, option);
                url.domName = "span";
                url.style["display"]="inline-block";
                url.style["text-overflow"] = option.urlIsShowEllipsis ? "ellipsis" : "clip";
                url.style["white-space"] = "nowrap";
                url.style["float"]="none";
                url.style["line-height"]=url.style["height"];
                layoutIndex[url.dataKey] = url;
            }
            
            //desc
            var descWidth = titleWidth; 
            var descHeight = titleHeight;
            if( option.descWidth && option.descWidth !== -1){
                descWidth = option.descWidth;
            }
            else{
                //娌℃湁浼犻€抎escWidth, 鑷姩璁＄畻
                var defaultDescWidth = itemWidth -  titleWidth - urlWidth;
                defaultDescWidth = defaultDescWidth<0?0:defaultDescWidth;
                descWidth = defaultDescWidth;
            }
            var desc = engine.layoutDesc(descWidth, descHeight, option);
            desc.domName = "span";
            desc.style["display"]="inline-block";
            desc.style["text-overflow"] = option.descIsShowEllipsis ? "ellipsis" : "clip";
            desc.style["white-space"] = "nowrap";
            desc.style["float"]="none";
            desc.style["line-height"]=desc.style["height"];
            layoutIndex[desc.dataKey] = desc;

            //缁勮item
            if (option.titleIsShow) {
                item.content.push(title);
            }
            if (option.descIsShow) {
                item.content.push(desc);
            }
            if (option.urlIsShow > 0 || (option.urlIsShow === -1 && isShowUrl)) {
                item.content.push(url);
            }

            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱 
            var columnSpace = engine.layoutColumnSpace(option.itemColumnSpace, itemHeight, option);
            var rowSpace = engine.layoutRowSpace(itemWidth, option.itemRowSpace, option);

            //缁勮container, 娣诲姞闂磋窛鍏冪礌
            container = engine.layoutSpace(container, item, option);
            container.layoutIndex = layoutIndex; 
            
            return container;
        }
    };
});

declare(function () {

    /**

    鏍峰紡妯℃澘寮曟搸.鍩轰簬BaiduTemplate寮€鍙�.鏀寔CSS鍜孒TML閮ㄥ垎鐨勬ā鏉挎覆鏌�

    @class StyleTemplate

    @namespace Cpro.Template

    */

    return {

        name:'StyleTemplate',

        namespace: 'Cpro.Template',

        cache: {},

        LEFT_DELIMITER: '<%',

        RIGHT_DELIMITER: '%>',

        

        /**

         * CSS妯℃澘鍑芥暟 

         * @param {string} templateContainerId 妯℃澘瀹瑰櫒id. 

         * @param {Object} data 妯℃澘鏁版嵁. 

         * @return {undefined} 

         */

        templateCss:function(templateContainerId, data){

            var CssBuilder = using('Cpro.Utility.CssBuilder');

            var templateString = this.template(templateContainerId, data);

            CssBuilder.addCss(templateString);

        },

        

        /**

         * Html妯℃澘鍑芥暟 

         * @param {string} templateContainerId 妯℃澘瀹瑰櫒id. 

         * @param {Object} data 妯℃澘鏁版嵁. 

         * @return {undefined} 

         */

        templateHtml:function(templateContainerId, data){

            var CssBuilder = using('Cpro.Utility.CssBuilder');

            var templateString = this.template(templateContainerId, data);

            var templateContainer = document.getElementById(templateContainerId);

            var tempDiv = document.createElement("div");

            tempDiv.innerHTML = templateString;

            var tempNodes = [];

            for(var i=0, count=tempDiv.childNodes.length; i<count; i++){

                if(tempDiv.childNodes[i] && tempDiv.childNodes[i].nodeType === 1){

                    tempNodes.push(tempDiv.childNodes[i]); 

                }

            }

            

            for(var i=0, count=tempNodes.length; i<count; i++){

               templateContainer.parentNode.insertBefore(tempNodes[i], templateContainer); 

            }    

        },

        

        

        /**

         * 鍩虹妯℃澘鍑芥暟, 鐢ㄤ簬鍒嗘瀽瀛楃涓�, 瑙ｆ瀽璇硶閮ㄥ垎. 

         * @param {string} cssString 瑕佸姞鍏ュ埌椤甸潰涓婄殑css鍐呭. 

         * @return {boolean}

         */

        template: function (str, data) {



            //妫€鏌ユ槸鍚︽湁璇d鐨勫厓绱犲瓨鍦�紝濡傛灉鏈夊厓绱犲垯鑾峰彇鍏冪礌鐨刬nnerHTML/value锛屽惁鍒欒涓哄瓧绗︿覆涓烘ā鏉�

            var compiledFn;

            //鍒ゆ柇濡傛灉娌℃湁document锛屽垯涓洪潪娴忚鍣ㄧ幆澧�

            if (!window.document) {

                compiledFn = this.compile(str);

            };



            //HTML5瑙勫畾ID鍙互鐢变换浣曚笉鍖呭惈绌烘牸瀛楃鐨勫瓧绗︿覆缁勬垚

            var element = document.getElementById(str);

            if (element) {



                //鍙栧埌瀵瑰簲id鐨刣om锛岀紦瀛樺叾缂栬瘧鍚庣殑HTML妯℃澘鍑芥暟

                if (this.cache[str]) {

                    compiledFn = this.cache[str];

                };



                //textarea鎴杋nput鍒欏彇value锛屽叾瀹冩儏鍐靛彇innerHTML

                var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;

                compiledFn = this.compile(html);



            }

            else {

                //鏄ā鏉垮瓧绗︿覆锛屽垯鐢熸垚涓€涓嚱鏁�

                //濡傛灉鐩存帴浼犲叆瀛楃涓蹭綔涓烘ā鏉匡紝鍒欏彲鑳藉彉鍖栬繃澶氾紝鍥犳涓嶈€冭檻缂撳瓨

                compiledFn = this.compile(str);

            };





            //鏈夋暟鎹垯杩斿洖HTML瀛楃涓诧紝娌℃湁鏁版嵁鍒欒繑鍥炲嚱鏁� 鏀寔data={}鐨勬儏鍐�

            var result = this.isObject(data) ? compiledFn(data) : compiledFn;

            compiledFn = null;

            return result;

        },



        /**

         * 灏嗗瓧绗︿覆鎷兼帴鐢熸垚鍑芥暟锛屽嵆缂栬瘧杩囩▼(compile) 

         * @param {string} source 寰呮嫾鎺ョ殑瀛楃涓�

         * @return {Function} 瀛楃涓叉嫾鎺ュ嚱鏁� 

         */

        compile: function (source) {

            var funBody = "var _template_fun_array=[];\nvar fn=(function(data){\nvar _template_varName='';\nfor(name in data){\n_template_varName+=('var '+name+'=data[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('" + this.analysisStr(source) + "');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";

            return new Function("_template_object", funBody);

        },



        /**

         * 鍒ゆ柇鏄惁鏄疧bject绫诲瀷

         * @param {string} source 瑕佸姞鍏ュ埌椤甸潰涓婄殑css鍐呭. 

         * @return {boolean}

         */

        isObject: function (source) {

            return 'function' === typeof source || !! (source && 'object' === typeof source);

        },



        /**

         * 瑙ｆ瀽妯℃澘瀛楃涓�

         * @param {string} source 寰呰В鏋愮殑妯℃澘瀛楃涓�

         * @return {string} 

         */

        analysisStr: function (source) {

            var Encoder = using('Cpro.Utility.Encoder');



            //鍙栧緱鍒嗛殧绗�

            var left = this.LEFT_DELIMITER;

            var right = this.RIGHT_DELIMITER;



            //瀵瑰垎闅旂杩涜杞箟锛屾敮鎸佹鍒欎腑鐨勫厓瀛楃锛屽彲浠ユ槸HTML娉ㄩ噴 <!  !>

            left = Encoder.encodeReg(left);

            right = Encoder.encodeReg(right);



            source = String(source);

            //鍘绘帀鍒嗛殧绗︿腑js娉ㄩ噴

            source = source.replace(new RegExp("(" + left + "[^" + right + "]*)//.*\n", "g"), "$1");



            //鍘绘帀娉ㄩ噴鍐呭  <%* 杩欓噷鍙互浠绘剰鐨勬敞閲� *%>

            //榛樿鏀寔HTML娉ㄩ噴锛屽皢HTML娉ㄩ噴鍖归厤鎺夌殑鍘熷洜鏄敤鎴锋湁鍙兘鐢� <! !>鏉ュ仛鍒嗗壊绗�

            source = source.replace(new RegExp("<!--.*?-->", "g"), "");

            source = source.replace(new RegExp(left + "\\*.*?\\*" + right, "g"), "");



            //鎶婃墍鏈夋崲琛屽幓鎺�  \r鍥炶溅绗� \t鍒惰〃绗� \n鎹㈣绗�

            source = source.replace(new RegExp("[\\r\\t\\n]", "g"), "");



            //鐢ㄦ潵澶勭悊闈炲垎闅旂鍐呴儴鐨勫唴瀹逛腑鍚湁 鏂滄潬 \ 鍗曞紩鍙� 鈥� 锛屽鐞嗗姙娉曚负HTML杞箟

            source = source.replace(new RegExp(left + "(?:(?!" + right + ")[\\s\\S])*" + right + "|((?:(?!" + left + ")[\\s\\S])+)", "g"), function (item, $1) {

                var source = '';

                if ($1) {



                    //灏� 鏂滄潬 鍗曞紩 HTML杞箟

                    source = $1.replace(/\\/g, "&#92;").replace(/'/g, '&#39;');

                    while (/<[^<]*?&#39;[^<]*?>/g.test(source)) {



                        //灏嗘爣绛惧唴鐨勫崟寮曞彿杞箟涓篭r  缁撳悎鏈€鍚庝竴姝ワ紝鏇挎崲涓篭'

                        source = source.replace(/(<[^<]*?)&#39;([^<]*?>)/g, '$1\r$2')

                    };

                }

                else {

                    source = item;

                }

                return source;

            });



            //瀹氫箟鍙橀噺锛屽鏋滄病鏈夊垎鍙凤紝闇€瑕佸閿�  <%var val='test'%>

            source = source.replace(new RegExp("(" + left + "[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?" + right, "g"), "$1;" + right);



            //瀵瑰彉閲忓悗闈㈢殑鍒嗗彿鍋氬閿�(鍖呮嫭杞箟妯″紡 濡�<%:h=value%>)  <%=value;%> 鎺掗櫎鎺夊嚱鏁扮殑鎯呭喌 <%fun1();%> 鎺掗櫎瀹氫箟鍙橀噺鎯呭喌  <%var val='test';%>   

            source = source.replace(new RegExp("(" + left + ":?[hvu]?[\\s]*?=[\\s]*?[^;|" + right + "]*?);[\\s]*?" + right, "g"), "$1" + right)



            //鎸夌収 <% 鍒嗗壊涓轰竴涓釜鏁扮粍锛屽啀鐢� \t 鍜屽湪涓€璧凤紝鐩稿綋浜庡皢 <% 鏇挎崲涓� \t

            //灏嗘ā鏉挎寜鐓�<%鍒嗕负涓€娈典竴娈电殑锛屽啀鍦ㄦ瘡娈电殑缁撳熬鍔犲叆 \t,鍗崇敤 \t 灏嗘瘡涓ā鏉跨墖娈靛墠闈㈠垎闅斿紑   

            source = source.split(left).join("\t");





            //鏀寔鐢ㄦ埛閰嶇疆榛樿鏄惁鑷姩杞箟

            if (this.ESCAPE) {

                //鎵惧埌 \t=浠绘剰涓€涓瓧绗�%> 鏇挎崲涓� 鈥橈紝浠绘剰瀛楃,'

                //鍗虫浛鎹㈢畝鍗曞彉閲�  \t=data%> 鏇挎崲涓� ',data,'

                //榛樿HTML杞箟  涔熸敮鎸丠TML杞箟鍐欐硶<%:h=value%>  

                source = source.replace(new RegExp("\\t=(.*?)" + right, "g"), "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");

            }

            else {

                //榛樿涓嶈浆涔塇TML杞箟

                source = source.replace(new RegExp("\\t=(.*?)" + right, "g"), "',typeof($1) === 'undefined'?'':$1,'");

            };



            //鏀寔HTML杞箟鍐欐硶<%:h=value%> 

            source = source.replace(new RegExp("\\t:h=(.*?)" + right, "g"), "',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");



            //鏀寔涓嶈浆涔夊啓娉� <%:=value%>鍜�<%-value%>

            source = source.replace(new RegExp("\\t(?::=|-)(.*?)" + right, "g"), "',typeof($1)==='undefined'?'':$1,'");



            //鏀寔url杞箟 <%:u=value%>

            source = source.replace(new RegExp("\\t:u=(.*?)" + right, "g"), "',typeof($1)==='undefined'?'':encodeURIComponent($1),'");



            //鏀寔UI 鍙橀噺浣跨敤鍦℉TML椤甸潰鏍囩onclick绛変簨浠跺嚱鏁板弬鏁颁腑  <%:v=value%>

            source = source.replace(new RegExp("\\t:v=(.*?)" + right, "g"), "',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'");



            //灏嗗瓧绗︿覆鎸夌収 \t 鍒嗘垚涓烘暟缁勶紝鍦ㄧ敤'); 灏嗗叾鍚堝苟锛屽嵆鏇挎崲鎺夌粨灏剧殑 \t 涓� ');

            //鍦╥f锛宖or绛夎鍙ュ墠闈㈠姞涓� '); 锛屽舰鎴� ');if  ');for  鐨勫舰寮�

            source = source.split("\t").join("');");



            //灏� %> 鏇挎崲涓篲template_fun_array.push('

            //鍗冲幓鎺夌粨灏剧锛岀敓鎴愬嚱鏁颁腑鐨刾ush鏂规硶

            //濡傦細if(list.length=5){%><h2>',list[4],'</h2>');}

            //浼氳�鏇挎崲涓� if(list.length=5){_template_fun_array.push('<h2>',list[4],'</h2>');}

            source = source.split(right).join("_template_fun_array.push('");



            //*灏� "\r" 鏇挎崲涓� "\"

            source = source.split("\r").join("\\'");



            return source;



        }

    };

});

declare(function () {
    /**
    妯℃澘鍙傛暟绠＄悊绫�
    @class TemplateVariableManager
    @namespace UI.Template
    */
    return {
        name: 'TemplateVariableManager',
        namespace: 'Cpro.Template',
        /**
        鑾峰彇鍙傛暟鐨勫叏鍚�
        @method getFullName
        */
        getFullName: function (shortName) {
            return this.nameMapping[shortName];
        },
        /**
        鑾峰彇鎵€鏈夊弬鏁板垪琛�
        @method getFullName
        @static
        */
        getVariables: function (userConfig) {
            var userFullNameConfig = {};
            var defaultValueManager = using("Cpro.Template.DefaultValueManager");
            var key;
            var paramFullName;
            //灏唖hortName杞崲鎴恌ullName 
            for (key in userConfig) {
                paramFullName = this.getFullName(key.toLowerCase());
                if (paramFullName) {
                    userFullNameConfig[paramFullName] = userConfig[key];
                }
            }
            key = null;

            //鍐欏叆灞曠幇绫诲瀷鍜岀墿鏂欑被鍨�
            userFullNameConfig.displayType = userConfig.displayType;
            userFullNameConfig.stuffType = userConfig.stuffType;

            //浠巇efaultValueManager绫讳腑, 鏍规嵁褰撳墠鐢ㄦ埛鐨勮姹傞厤缃�, 鑾峰彇鏈璇锋眰鐨勯粯璁ゅ€�. 
            var defaultValue = defaultValueManager.getDefaultValue(userFullNameConfig);

            //浣跨敤鐢ㄦ埛璁剧疆鐨勫€兼浛鎹㈤粯璁ゅ€� 
            for (key in userFullNameConfig) {
                if (key && (typeof userFullNameConfig[key] !== "undefined")) {
                    if (typeof userFullNameConfig[key] === "string") {
                        userFullNameConfig[key] = decodeURIComponent(userFullNameConfig[key]).replace("#", "");
                    }
                    defaultValue[key] = userFullNameConfig[key];
                }
            }

            //瀵逛簬column鍜宺ow鍙傛暟鐨勭壒娈婂鐞�
            if (userConfig.column) {
                defaultValue.adColumnCount = parseInt(userConfig.column);
            }
            if (userConfig.row) {
                defaultValue.adRowCount = parseInt(userConfig.row);
            }

            return defaultValue;
        },
        /**
        淇濆瓨鍙傛暟"缂╁啓"->"鍏ㄥ悕"鐨勬槧灏勫叧绯�
        @property nameMapping
        @type Obejct    
         */
        nameMapping: {
            "n": "userChargingId",
            "rsi0": "templateWidth",
            "rsi1": "templateHeight",
            "at": "adDataType",
            "wn": "adRowCount",
            "hn": "adColumnCount",
            "rsi5": "KeywordIsFlush",
            "rss6": "KeywordFlushColor",
            "rad": "isShowUnrelated",
            "cad": "isShowPublicAd",
            "rss7": "backupColor",
            "aurl": "backupUrl",
            "rss0": "containerBorderColor",
            "conbw": "containerBorderWidth",
            "conbt": "containerBorderTop",
            "conbr": "containerBorderRight",
            "conbb": "containerBorderBottom",
            "conbl": "containerBorderLeft",
            "conbs": "containerBorderStyle",
            "rss1": "containerBackgroundColor",
            "conpl": "containerPaddingLeft",
            "conpr": "containerPaddingRight",
            "conpt": "containerPaddingTop",
            "conpb": "containerPaddingBottom",
            "conop": "containerOpacity",
            "consl": "containerShowLogo",
            "conw": "containerWidth",
            "conh": "containerHeight",
            "conhhf": "containerHideHeaderFooter",
            "itepl": "itemPaddingLeft",
            "itepr": "itemPaddingRight",
            "itept": "itemPaddingTop",
            "itepb": "itemPaddingBottom",
            "itecs": "itemColumnSpace",
            "itecbw": "itemColumnBorderWidth",
            "itecbs": "itemColumnBorderStyle",
            "itecpt": "itemColumnPaddingTop",
            "itecpl": "itemColumnPaddingLeft",
            "itecpr": "itemColumnPaddingRight",
            "itecpb": "itemColumnPaddingBottom",
            "iters": "itemRowSpace",
            "iterbw": "itemRowBorderWidth",
            "iterbs": "itemRowBorderStyle",
            "iterpt": "itemRowPaddingTop",
            "iterpl": "itemRowPaddingLeft",
            "iterpr": "itemRowPaddingRight",
            "iterpb": "itemRowPaddingBottom",
            "logis": "logoIsShow",
            "logpl": "logoPaddingLeft",
            "logpr": "logoPaddingRight",
            "logpt": "logoPaddingTop",
            "logpb": "logoPaddingBottom",
            "logs": "logoStyle",
            "rss2": "titleFontColor",
            "titff": "titleFontFamily",
            "titfs": "titleFontSize",
            "titl": "titleLength",
            "titse": "titleIsShowEllipsis",
            "titis": "titleIsShow",
            "titrc": "titleRowCount",
            "titpl": "titlePaddingLeft",
            "titpr": "titlePaddingRight",
            "titpt": "titlePaddingTop",
            "titpb": "titlePaddingBottom",
            "titsu": "titleShowUnderline",
            "titlh": "titleLineHeight",
            "titta": "titleTextAlign",
            "titw": "titleWidth",
            "titfw": "titleFontWeight",
            "titbc": "titleBackgroundColor",
            "tithfc": "titleHoverFontColor",
            "tithsu": "titleHoverShowUnderline",
            "tithbc": "titleHoverBackgroundColor",
            "titvfc": "titleVisitedFontColor",
            "titvsu": "titleVisitedShowUnderline",
            "titvbc": "titleVisitedBackgroundColor",
            "titafc": "titleActiveFontColor",
            "titasu": "titleActiveShowUnderline",
            "titabc": "titleActiveBackgroundColor",
            "rss3": "descFontColor",
            "desff": "descFontFamily",
            "desfs": "descFontSize",
            "desl": "descLength",
            "desse": "descIsShowEllipsis",
            "desis": "descIsShow",
            "desrc": "descRowCount",
            "despl": "descPaddingLeft",
            "despr": "descPaddingRight",
            "despt": "descPaddingTop",
            "despb": "descPaddingBottom",
            "dessu": "descShowUnderline",
            "deslh": "descLineHeight",
            "desw": "descWidth",
            "desfw": "descFontWeight",
            "desbc": "descBackgroundColor",
            "deshfc": "descHoverFontColor",
            "deshsu": "descHoverShowUnderline",
            "deshbc": "descHoverBackgroundColor",
            "desvfc": "descVisitedFontColor",
            "desvsu": "descVisitedShowUnderline",
            "desvbc": "descVisitedBackgroundColor",
            "desafc": "descActiveFontColor",
            "desasu": "descActiveShowUnderline",
            "desabc": "descActiveBackgroundColor",
            "rss4": "urlFontColor",
            "urlff": "urlFontFamily",
            "urlfs": "urlFontSize",
            "urll": "urlLength",
            "urlse": "urlIsShowEllipsis",
            "urlis": "urlIsShow",
            "urlpl": "urlPaddingLeft",
            "urlpr": "urlPaddingRight",
            "urlpt": "urlPaddingTop",
            "urlpb": "urlPaddingBottom",
            "urlsu": "urlShowUnderline",
            "urlrc": "urlRowCount",
            "urllh": "urlLineHeight",
            "urlw": "urlWidth",
            "urlfw": "urlFontWeight",
            "urlbc": "urlBackgroundColor",
            "urlre": "urlReplace",
            "urlhfc": "urlHoverFontColor",
            "urlhsu": "urlHoverShowUnderline",
            "urlhbc": "urlHoverBackgroundColor",
            "urlvfc": "urlVisitedFontColor",
            "urlvsu": "urlVisitedShowUnderline",
            "urlvbc": "urlVisitedBackgroundColor",
            "urlafc": "urlActiveFontColor",
            "urlasu": "urlActiveShowUnderline",
            "urlabc": "urlActiveBackgroundColor"
        }
    };
});

declare(function () {
    /**
    宓屽叆寮�-鏂囧瓧 甯冨眬寮曟搸
    @class TextLayoutEngine
    @namespace $baseName.UI.Template
    */
    return TextLayoutEngine = {
        name:'TextLayoutEngine',
        namespace:'Cpro.Template',
        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = true; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");
            //container
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);          

            //item
            var itemWidth = Math.floor((container.style["width"] - option.itemColumnSpace * (option.adColumnCount - 1)) / option.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - option.itemRowSpace * (option.adRowCount - 1)) / option.adRowCount);
            var item = engine.layoutItem(itemWidth, itemHeight, option);

            //title
            var titleLayout = engine.calculateTitle(item.style["width"], item.style["height"], option);
            var titleWidth = titleLayout.width;
            var titleHeight = titleLayout.height;
            var title = engine.layoutTitle(titleWidth, titleHeight, option);
            layoutIndex[title.dataKey] = title;

            //url
            var urlLayout = engine.calculateUrl(item.style["width"], item.style["height"], option);
            var urlWidth = urlLayout.width
            var urlHeight = urlLayout.height;
            var url = engine.layoutUrl(urlWidth, urlHeight, option);
            layoutIndex[url.dataKey] = url;

            //desc
            var descWidth = item.style["width"];
            var descHeight = item.style["height"] - titleHeight - urlHeight;
            if (option.urlIsShow === 0 || option.urlIsShow === -1 && engine.calculateDescRowCount(descHeight, option) < 2) { //濡傛灉鐢ㄦ埛鎸囧畾涓嶆樉绀簎rl, 鎴栬€呯敤鎴锋病鏈夋寚瀹氫絾鏄墿涓嬬殑绌洪棿涓嶅鏄剧ず涓や釜desc, 鍒欎笉鏄剧ずurl
                isShowUrl = false;
                descHeight = item.style["height"] - titleHeight;
            }
            var desc = engine.layoutDesc(descWidth, descHeight, option);
            layoutIndex[desc.dataKey] = desc;

            //缁勮item
            if (option.titleIsShow) {
                item.content.push(title);
            }
            if (option.descIsShow) {
                item.content.push(desc);
            }
            if (option.urlIsShow > 0 || (option.urlIsShow === -1 && isShowUrl)) {
                item.content.push(url);
            }

            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱 
            var columnSpace = engine.layoutColumnSpace(option.itemColumnSpace, itemHeight, option);
            var rowSpace = engine.layoutRowSpace(itemWidth, option.itemRowSpace, option);

            //缁勮container, 娣诲姞闂磋窛鍏冪礌
            container = engine.layoutSpace(container, item, option);
            container.layoutIndex = layoutIndex;
            
            //鍗曟潯骞垮憡鐨勭壒娈婂鐞�
            if (option.adRowCount == 1 && option.adColumnCount == 1) {
                //姘村钩灞呬腑
                container.style["text-align"] = "center";
                item.style["text-align"] = "center";
                title.style["text-align"] = "center";
                
                //鍨傜洿灞呬腑
                var innerHeight = titleHeight + urlHeight + desc.style["line-height"] * desc.rowCount + option.descPaddingTop + option.descPaddingBottom;                
                item.style["padding-top"]  = item.style["padding-bottom"] = parseInt((containerHeight - innerHeight)/2);

            }
            
            return container;
        }
    };
});

declare(function () {
    /**
    鍥炬枃鐗╂枡甯冨眬寮曟搸
    @class TuwenLayoutEngine
    @namespace $baseName.UI.Template
    */
    return {
        name: 'TuwenLayoutEngine',
        namespace: 'Cpro.Template',
        /**
        甯冨眬, 鐢熸垚甯冨眬瀵硅薄
        @method layout
        @return {Object} layoutObject甯冨眬瀵硅薄
        */
        layout: function (option) {

            /* 鍏ㄥ眬鎺у埗鍖哄煙 */
            var isShowUrl = true; //鏄惁鏄剧ずurl, 濡傛灉desc鐨勫唴瀹规樉绀哄皬浜庝袱琛�, 鍒欎笉鏄剧ずurl
            var layoutIndex = {}; //绱㈠紩鍣�
            var engine = using("Cpro.Template.BaseLayoutEngine");

            //container
            var containerWidth = option.templateWidth;
            var containerHeight = option.templateHeight;
            var container = engine.layoutContainer(containerWidth, containerHeight, option);

            //item
            var itemWidth = Math.floor((container.style["width"] - option.itemColumnSpace * (option.adColumnCount - 1)) / option.adColumnCount);
            var itemHeight = Math.floor((container.style["height"] - option.itemRowSpace * (option.adRowCount - 1)) / option.adRowCount);
           
            //鍗曟潯骞垮憡鐨勭壒娈婂鐞�
            if (option.adRowCount == 1 && option.adColumnCount == 1) {
                 //鍗曚釜骞垮憡鍧楁渶澶у搴︿负600
                itemWidth = itemWidth > 500 ? 500 : itemWidth;
            }
            var item = engine.layoutItem(itemWidth, itemHeight, option);
            
            
            //========= 涓夌甯冨眬  ==========
            if (item.style["height"] <= 60 ) { //甯冨眬1: 鍥剧墖鐙珛涓€鍒�, title+desc涓€鍒�, 涓嶆樉绀簎rl
                //鍥剧墖, 鐙珛涓€鍒�		
                var logoLayout = engine.calculateLogo(item.style["width"], item.style["height"], option);
                var logoHeight = logoLayout.height;
                var logoWidth = logoLayout.width;
                var logo = engine.layoutLogo(logoWidth, logoHeight, option);
                layoutIndex[logo.dataKey] = logo;

                //title
                var titleLayout = engine.calculateTitle(item.style["width"] - logoWidth, item.style["height"], option);
                var titleWidth = titleLayout.width;
                var titleHeight = titleLayout.height;
                var title = engine.layoutTitle(titleWidth, titleHeight, option, "left");
                layoutIndex[title.dataKey] = title;

                //desc
                var descWidth = titleWidth;
                var descHeight = item.style["height"] - titleHeight;
                var desc = engine.layoutDesc(descWidth, descHeight, option, "left");
                layoutIndex[desc.dataKey] = desc;

                //缁勮item
                item.content.push(logo);
                item.content.push(title);
                item.content.push(desc);
                item.style["inner-height"]=logoHeight;
                layoutIndex["item"] = item;
            }
            else { //甯冨眬2, 3: title鐙珛涓€琛�

                //title
                var titleLayout = engine.calculateTitle(item.style["width"], item.style["height"], option);
                var titleWidth = titleLayout.width;
                var titleHeight = titleLayout.height;
                var title = engine.layoutTitle(titleWidth, titleHeight, option);
                layoutIndex[title.dataKey] = title;

                var leftHeight = item.style["height"] - title.style["outer-height"]; //闄ゅ幓title鍚庡墿涓嬬殑楂樺害.  鏍规嵁杩欎釜楂樺害纭畾url鏄惁鐙珛鏄剧ず涓€琛�

                var urlLayout = engine.calculateUrl(item.style["width"], item.style["height"], option);
                var urlWidth = urlLayout.width;
                var urlHeight = urlLayout.height;

                if (leftHeight - urlHeight >= 64) { //甯冨眬2: title鐙珛涓€琛�, logo鐙珛涓€鍒�, desc鐙珛涓€鍒�, url鐙珛涓€琛�
                    //url
                    var url = engine.layoutUrl(urlWidth, urlHeight, option);
                    layoutIndex[url.dataKey] = url;

                    //logo
                    var logoLayout = engine.calculateLogo(item.style["width"], item.style["height"] - titleHeight - urlHeight, option);
                    var logoHeight = logoLayout.height;
                    var logoWidth = logoLayout.width;
                    var logo = engine.layoutLogo(logoWidth, logoHeight, option);
                    layoutIndex[logo.dataKey] = logo;

                    //desc
                    var descWidth = item.style["width"] - logoWidth;
                    var descHeight = logoHeight;
                    var desc = engine.layoutDesc(descWidth, descHeight, option, "left");
                    layoutIndex[desc.dataKey] = desc;
                    
                    item.style["inner-height"]=titleHeight+logoHeight+urlHeight;
                    layoutIndex["item"] = item;
                }
                else { //甯冨眬3: title鐙珛涓€琛�, logo鐙珛涓€鍒�, desc鍜寀rl涓€鍒�.

                    var logoLayout = engine.calculateLogo(item.style["width"], item.style["height"] - titleHeight, option);
                    var logoHeight = logoLayout.height;
                    var logoWidth = logoLayout.width;
                    var logo = engine.layoutLogo(logoWidth, logoHeight, option);
                    layoutIndex[logo.dataKey] = logo;

                    //url	
                    var urlLayout = engine.calculateUrl(item.style["width"] - logoWidth, item.style["height"], option);
                    var urlWidth = urlLayout.width
                    var urlHeight = urlLayout.height;
                    var url = engine.layoutUrl(urlWidth, urlHeight, option, "left");
                    layoutIndex[url.dataKey] = url;

                    //desc
                    var descWidth = item.style["width"] - logoWidth;
                    var descHeight = logoHeight - urlHeight;
                    isShowUrl = true; //榛樿鏄剧ずurl
                    if (engine.calculateDescRowCount(descHeight, option) < 2) { //涓嶅鏄剧ず涓よ, 鍒欎笉鏄剧ずurl
                        descHeight = logoHeight;
                        isShowUrl = false;
                    }
                    var desc = engine.layoutDesc(descWidth, descHeight, option, "left");
                    layoutIndex[desc.dataKey] = desc;
                    
                    item.style["inner-height"]=titleHeight+logoHeight;
                    layoutIndex["item"] = item;
                }

                item.content.push(title);
                item.content.push(logo);
                item.content.push(desc); 
                if (isShowUrl) item.content.push(url);
            }

            //琛岄棿璺濆厓绱犲拰鍒楅棿璺濆厓绱 
            var columnSpace = engine.layoutColumnSpace(option.itemColumnSpace, itemHeight, option);
            var rowSpace = engine.layoutRowSpace(itemWidth, option.itemRowSpace, option);

            //缁勮container, 娣诲姞闂磋窛鍏冪礌
            container = engine.layoutSpace(container, item, option);
            container.layoutIndex = layoutIndex;
            
            //鍗曟潯骞垮憡鐨勭壒娈婂鐞�
            if (option.adRowCount == 1 && option.adColumnCount == 1) {
                //姘村钩灞呬腑
                item.style["margin-left"] = parseInt((containerWidth-itemWidth)/2);
            }
            
            //鍨傜洿灞呬腑澶勭悊. 鏍规嵁item鐨勫唴瀹归珮搴﹀拰item鍗犱綅楂樺害鍙樊, 鑷姩鍒ゆ柇鏄惁闇€瑕佸瀭鐩村眳涓�
            if( !option.itemVerticalAlign || option.itemVerticalAlign===-1){
                var itemBlankHeight = item.style["outer-height"] - item.style["inner-height"];
                if( itemBlankHeight > 50 ){
                    item.style["height"]=item.style["inner-height"];
                    item.style["padding-top"]= item.style["padding-bottom"] = parseInt( itemBlankHeight/2 );
                }
            }
            
            return container;
        }
    };
});

declare(function () {
    return {
        name:'CssBuilder',
        namespace: 'Cpro.Utility',
        /**
         * 鏍规嵁浼犲叆鐨凜SS瀛楃涓�, 鍦ㄩ〉闈�笂鍔ㄦ€佹坊鍔燙SS鐨剆tyle鍏冪礌. 
         * @method addCssByStyle 
         * @param {string} cssString 瑕佸姞鍏ュ埌椤甸潰涓婄殑css鍐呭. 
         * @return {boolean}
         */
        addCss: function (cssString) {
            var doc = document;
            var style = doc.createElement("style");
            style.setAttribute("type", "text/css");

            if (style.styleSheet) { // IE
                style.styleSheet.cssText = cssString;
            }
            else { // w3c
                var cssText = doc.createTextNode(cssString);
                style.appendChild(cssText);
            }

            var heads = doc.getElementsByTagName("head");
            if (heads.length) heads[0].appendChild(style);
            else doc.documentElement.appendChild(style);
        }
    }
});

declare(function () {
    return {
        name:'Encoder',
        namespace: 'Cpro.Utility',
        /**
         * HTML杞箟
         * @param {string} source 寰呭鐞嗙殑瀛楃涓� 
         * @return {string} 澶勭悊鍚庣殑瀛楃涓�
         */
        encodeHTML: function (source) {
            return String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\/g, '&#92;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        },

        /**
         * 杞箟褰卞搷姝ｅ垯鐨勫瓧绗�
         * @param {string} source 寰呭鐞嗙殑瀛楃涓� 
         * @return {string} 澶勭悊鍚庣殑瀛楃涓�
         */
        encodeReg: function (source) {
            return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
        },

        /**
         * 杞箟UI UI鍙橀噺浣跨敤鍦℉TML椤甸潰鏍囩onclick绛変簨浠跺嚱鏁板弬鏁颁腑
         * @param {string} source 寰呭鐞嗙殑瀛楃涓� 
         * @return {string} 澶勭悊鍚庣殑瀛楃涓�
         */
        encodeEventHTML: function (source) {
            return String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\\\\/g, '\\').replace(/\\\//g, '\/').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
        }
    };
});
