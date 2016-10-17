(function ($) {
    $.extend($.browser, {
        client: function () {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                bodyWidth: document.body.clientWidth,
                bodyHeight: document.body.clientHeight
            };
        },
        scroll: function () {
            return {
                width: document.documentElement.scrollWidth,
                height: document.documentElement.scrollHeight,
                bodyWidth: document.body.scrollWidth,
                bodyHeight: document.body.scrollHeight,
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop + document.body.scrollTop
            };
        },
        screen: function () {
            return {
                width: window.screen.width,
                height: window.screen.height
            };
        },
        isIE6: $.browser.msie && $.browser.version == 6,
        isMinW: function (val) {
            return Math.min($.browser.client().bodyWidth, $.browser.client().width) <= val;
        },
        isMinH: function (val) {
            return $.browser.client().height <= val;
        }
    })
})(jQuery);
(function ($) {
    $.widthForIE6 = function (option) {
        var s = $.extend({
            max: null,
            min: null,
            padding: 0
        }, option || {});
        var init = function () {
            var w = $(document.body);
            if ($.browser.client().width >= s.max + s.padding) {
                w.width(s.max + "px");
            } else if ($.browser.client().width <= s.min + s.padding) {
                w.width(s.min + "px");
            } else {
                w.width("auto");
            }
        };
        init();
        $(window).resize(init);
    }
})(jQuery);
(function ($) {
    $.fn.hoverForIE6 = function (option) {
        var s = $.extend({
            current: "hover",
            delay: 10
        }, option || {});
        $.each(this, function () {
            var timer1 = null,
                timer2 = null,
                flag = false;
            $(this).bind("mouseover", function () {
                if (flag) {
                    clearTimeout(timer2);
                } else {
                    var _this = $(this);
                    timer1 = setTimeout(function () {
                        _this.addClass(s.current);
                        flag = true;
                    }, s.delay);
                }
            }).bind("mouseout", function () {
                if (flag) {
                    var _this = $(this);
                    timer2 = setTimeout(function () {
                        _this.removeClass(s.current);
                        flag = false;
                    }, s.delay);
                } else {
                    clearTimeout(timer1);
                }
            })
        })
    }
})(jQuery);
