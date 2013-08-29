/*
http://www.veryhuo.com
date: 2010-4-28 16:06
plugins name: rady.ui.slide
version v5.0
*/
if(typeof rady === 'undefined')
    var rady = window.rady = {};
if(typeof rady.ui === 'undefined')
    rady.ui = {};
(function($) {
    rady.ui.slide = function(options) {
        this.opts = $.extend({}, rady.ui.slide.defaults, options);
        this._container = this.opts.itemContain;
        this._showContain = this.opts.showContain;
        this._containsize = this.opts.containSize;
        this._left = this.opts.leftMove;
        this._right = this.opts.rightMove;
        this._auto = this.opts.auto;
        this._step = this.opts.step;
        this._timer = null;

        this._itemCount = 0;
        this._index = 0;
        this.__play = null;
        this._init();
    };

    rady.ui.slide.prototype = {
        _init: function() {
            var $this = this;
            $this._itemCount = $($this._container).length;
            $this._showContain = $($this.opts.showContain);
            $this._bindEvent();
            $this._showItems();
            $this._startAuto();
        },
        _startAuto: function(s) {
            if (s != undefined)
                this.opts.auto = s;

            if (this.opts.auto == 0)
                return this._stopAuto();

            if (this._timer != null)
                return;

            var $this = this;
            this._timer = setInterval(function() { $this._moveRight(); }, this._auto * 1000);
        },
        _stopAuto: function() {
            if (this._timer == null)
                return;
            clearTimeout(this._timer);
            this._timer = null;
        },
        _bindEvent: function() {
            var $this = this;
            $($this._left).bind("click", function() {
                $this._stopAuto();
                $this._moveLeft();
            }).mouseout(function() {
                $this._startAuto();
            });
            $($this._right).bind("click", function() {
                $this._stopAuto();
                $this._moveRight();
            }).mouseout(function() {
                $this._startAuto();
            });

            $this._showContain.hover(function() {
                $this._stopAuto();
            },
            function() {
                $this._startAuto();
            }
            )
        },
        _moveLeft: function() {
            var $this = this;
            if ($this._index >= 0)
            { $this._index -= $this._step; }
            else
            { $this._index = 0; }
            $this._showItems();
        },
        _moveRight: function() {
            var $this = this;
            if ($this._index <= $this._itemCount)
            { $this._index += $this._step; }
            else
            { $this._index = 0; }
            $this._showItems();
        },
        _showItems: function() {
            var $this = this;
            $this._showContain.empty();
            for (i = $this._index; i < $this._index + $this._containsize; i++) {
                $this._showContain.append($($this._container).eq(i >= $this._itemCount ? i % $this._itemCount : i).clone());
            }
        }
    };

    //设计选项默认值
    rady.ui.slide.defaults = {
        showContain: "#thumblist",
        itemContain: ".thumblist a",
        containSize: 4, //盒子大小
        leftMove: "#leftarrow",
        rightMove: "#rightarrow",
        step:1
    };
})(jQuery)