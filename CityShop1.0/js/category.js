var globalData =
{
    _stationid: '',

    init: function (StationId) {
        globalData._stationid = StationId;
    }
}

$(document).ready(function () {
    $('.category-viewport').each(function () {
        var $this = $(this),
			$sidebar = $this.find('.category-sidebar'),
			$content = $this.find('.category-content'),
			$navScroll = $sidebar.find('.items'),
			$navItem = $sidebar.find('.item');

        var currentCateId = (getUrlParam("parentCateId") !== null) ? getUrlParam("parentCateId") : $navItem.eq(0).data('categoryid');

        var current = 0,
			scrollOverIndex = 0, //超出可视范围的item个数
			scrollRootHeight = 0, //超出可视范围的高度
			itemCount = $navItem.length,
			itemHeight = $navItem.outerHeight(true);

        var rootTouchObj = {
            startY: 0, //开始时的y
            scrollY: 0 //y轴滚动的距离
        };

        init();

        function init() {
            var a = $(window).height(),
				b = $('#header').outerHeight(true),
                d = $('#nav-h').outerHeight(true);

            var c = a - b - d; //c为sidebar和content的高度
            var d = itemHeight * itemCount;
            var y = 0; //移动的距离

            for (var i = 0; i < $navItem.length; i++) {
                if ($navItem.eq(i).data('categoryid') == currentCateId) {
                    current = i;
                }
            }

            if (c < d) {
                scrollRootHeight = d - c;
                scrollOverIndex = parseInt(Math.ceil(scrollRootHeight / itemHeight), 10);
            }

            if (current <= scrollOverIndex - 1) {
                y = current * itemHeight * -1;
            } else {
                y = scrollRootHeight * -1;
            }

            $navItem.eq(current).addClass('current');
            $sidebar.css('height', c);
            $content.css('height', c);
            $navScroll.css({
                transform: "translateY(" + y + "px)",
                "-webkit-transform": "translateY(" + y + "px)"
            });

            $(window).resize(function () {
                a = $(window).height(),
				b = $('#header').outerHeight(true),
				d = $('#nav-h').outerHeight(true);

                c = a - b - d; //sidebar和content的高度

                $sidebar.css('height', c);
                $content.css('height', c);
            });

            var fnHashTrigger = function (target) {
                var parentCateId = getUrlParam("parentCateId");
                var eleTarget = target || null;

                if (parentCateId == null) {
                    if (eleTarget == $navItem.get(0)) {
                        history.replaceState(null, document.title, location.href.split('?')[0] + '?parentCateId=' + eleTarget.data('categoryid'));
                        fnHashTrigger(eleTarget);
                    }
                } else {
                    $navItem.each(function () {
                        if (eleTarget == null & $(this).data('categoryid') == parentCateId) {
                            eleTarget = $(this);
                        }
                    })

                    if (!eleTarget) {

                    } else {
                        $(eleTarget).trigger('click');
                    }
                }
            }

            if (history.pushState) {
                $(window).on('popstate', function () {
                    fnHashTrigger();
                })
            }

            bindEvents();
        }

        function bindEvents() {
            $navScroll.on('click', 'li', function (event) {
                current = $(this).index();
                currentCateId = $(this).data('categoryid');

                $navItem.eq(current).addClass('current').siblings().removeClass('current');
                scrollTo(current);
                $content.scrollTop(0);
            })

            touchBind();
        }

        function scrollTo(index) {
            var y = 0; //移动的距离

            if (index <= scrollOverIndex - 1) {
                y = index * itemHeight * -1;
            } else {
                y = scrollRootHeight * -1;
            }

            var e = {
                transform: "translateY(" + y + "px)",
                "-webkit-transform": "translateY(" + y + "px)",
                transition: "0.2s ease 0s",
                "-webkit-transition": "0.2s ease 0s"
            };

            $navScroll.css(e);

            setTimeout(function () {
                var g = {
                    transform: "translateY(" + y + "px)",
                    "-webkit-transform": "translateY(" + y + "px)",
                    "-webkit-transition": "",
                    transition: ""
                };
                $navScroll.css(g);
            }, 200)
        }

        function touchBind() {
            $navScroll.on('touchstart', function (e) {
                var coords = pointer(e);
                rootTouchObj.startY = coords.y; //触控点的y坐标
                rootTouchObj.scrollY = 0;
            })

            $navScroll.on('touchmove', function (e) {
                e.preventDefault();

                var coords = pointer(e);
                var y0 = coords.y; //触控点的y坐标
                var y1 = y0 - rootTouchObj.startY; //触控点与上一次所在位置的距离差 
                var y2 = getY($navScroll); //获取wrapper现在的translateY值
                var y3 = 0;

                y3 = y1 + y2;

                if (scrollRootHeight == 0) {
                    return false;
                }

                if (y3 >= 100) {
                    y3 = 100
                } else if (y3 < (scrollRootHeight * -1 - 100)) {
                    y3 = scrollRootHeight * -1 - 100
                }

                $navScroll.css({
                    transform: "translateY(" + y3 + "px)",
                    "-webkit-transform": "translateY(" + y3 + "px)"
                });

                rootTouchObj.scrollY = y0 - rootTouchObj.startY;
                rootTouchObj.startY = y0;
            })

            $navScroll.on('touchend', function () {
                touchScroll(rootTouchObj.scrollY, $navScroll, scrollRootHeight);
            })
        }

        function touchScroll(k, d, m, g) {
            var c = this;
            var e = Math.abs(k);
            var h = 0;
            var f = 200;
            var l = d;
            var j = 0;
            if (e >= 40) {
                h = 15
            } else {
                if (e < 40 && e >= 25) {
                    h = 10
                } else {
                    if (e < 25 && e >= 10) {
                        h = 5
                    } else {
                        h = 0
                    }
                }
            }

            if (h > 0) {
                if (k < 0) {
                    h = h * -1
                }
                setTimeout(function () {
                    touchScrollRun(h, d, 0, m)
                }, 2)
            } else {
                var i = 0;
                i = getY(d);
                goToEnd(i, d, m)
            }
        }

        function touchScrollRun(h, k, g, e) {
            var i = this;
            var j = g + 1;

            if (g < 50) {
                var d = 0;
                d = getY(k) + h;
                k.css("transform", "translateY(" + d + "px)");
                k.css("-webkit-transform", "translateY(" + d + "px)");
                if (d <= (e * -1 - 30) || d >= 30) {
                    goToEnd(d, k, e)
                } else {
                    setTimeout(function () {
                        touchScrollRun(h, k, j, e)
                    }, 2)
                }
            } else {
                goToEnd(d, k, e)
            }
        }

        function goToEnd(c, h, e) {
            var g = this;
            var f = null;
            var d = null;
            if (e > 0) {
                if (c < (e * -1)) {
                    f = {
                        transform: "translateY(" + (e * -1) + "px)",
                        "-webkit-transform": "translateY(" + (e * -1) + "px)",
                        "-webkit-transition": "0.2s ease 0s",
                        transition: "0.2s ease 0s"
                    };
                    d = {
                        transform: "translateY(" + (e * -1) + "px)",
                        "-webkit-transform": "translateY(" + (e * -1) + "px)",
                        "-webkit-transition": "",
                        transition: ""
                    }
                } else {
                    if (c > 0) {
                        f = {
                            transform: "translateY(0px)",
                            "-webkit-transform": "translateY(0px)",
                            "-webkit-transition": "0.2s ease 0s",
                            transition: "0.2s ease 0s"
                        };
                        d = {
                            transform: "translateY(0px)",
                            "-webkit-transform": "translateY(0px)",
                            "-webkit-transition": "",
                            transition: ""
                        }
                    }
                }
            }

            if (c != 0) {
                if (f && d) {
                    h.css(f);
                    setTimeout(function () {
                        h.css(d)
                    }, 200);
                    return true
                }
            } else {
                h.css({
                    transform: "translateY(0px)"
                });
                h.css({
                    "-webkit-transform": "translateY(0px)"
                });
                return false
            }
        }

        function getY(el) {
            // c是translateY的值
            var c = el.css("transform");
            if (!c) {
                c = el.css("-webkit-transform")
            }

            if (c == "none") {
                c = 0
            } else {
                c = c.split('(')[1].split(')')[0].split(',')[5];
                c = parseInt(c, 10)
            }
            if (!c) {
                c = 0
            }
            return c
        }

        function pointer(event) {
            var result = { x: null, y: null };

            event = event.originalEvent || event || window.event;

            event = event.touches && event.touches.length ?
				event.touches[0] : event.changedTouches && event.changedTouches.length ?
					event.changedTouches[0] : event;

            if (event.pageX) {
                result.x = event.pageX;
                result.y = event.pageY;
            } else {
                result.x = event.clientX;
                result.y = event.clientY;
            }

            return result;
        }
    })
})