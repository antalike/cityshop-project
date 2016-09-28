function accAdd(num1, num2) {
    var r1, r2, m;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return Math.round(num1 * m + num2 * m) / m;
}

function accSub(num1, num2) {
    var r1, r2, m;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return (Math.round(num1 * m - num2 * m) / m);
}

function accDiv(num1, num2) {
    var t1, t2, r1, r2;
    try {
        t1 = num1.toString().split('.')[1].length;
    } catch (e) {
        t1 = 0;
    }
    try {
        t2 = num2.toString().split(".")[1].length;
    } catch (e) {
        t2 = 0;
    }
    r1 = Number(num1.toString().replace(".", ""));
    r2 = Number(num2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

function accMul(num1, num2) {
    var m = 0,
        s1 = num1.toString(),
        s2 = num2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {};
    try {
        m += s2.split(".")[1].length
    } catch (e) {};
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}



$(document).ready(function () {
    var $window = $(window);

//     //更新购物车中商品数量
//     if ($('#cart-num').length > 0) {
//         updateCartCount();
//     }

    $window.scroll(function () {
        if ($window.scrollTop() >= $window.height()*2) {
            $("#toTop").show()
        } else {
            $("#toTop").hide()
        }
    })

    $("#toTop").on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 400);
    });

    //头部菜单
    var $navTarget = $('#nav-v'),
        $navTrigger = $('.trigger-nav');

    if ($navTarget.length > 0) {
        $navTrigger.on('click', function () {
            if ($navTarget.is(':hidden')) {
                $navTarget.show();
            } else {
                $navTarget.hide();
            }
        })

        $navTarget.on('click', function () {
            if ($navTarget.is(':hidden')) {
                $navTarget.show();
            } else {
                $navTarget.hide();
            }
        })
    }

//     /*Customized panel*/
//     var pageTypeId = $("#pageTypeId").val();
//     var objectId = $("#objectId").val();
//     var languageCode = $("#languageCode").val() ? $("#languageCode").val() : "";
//     $.ajax({
//         type: 'GET',
//         url: cityshopBaseUrl + '/Store/GetCustomizedPanel?pageTypeId=' + pageTypeId + "&languageCode=" + languageCode + "&objectId=" + objectId,
//         dataType: 'json',
//         cache: false,
//         success: function (data) {
//             if (data != null && data.panel != null) {
//                 $.each(data.panel, function (i, item) {
//                     var targetControl = $("#" + item.id);
//                     if (targetControl) {
//                         targetControl.html(item.cnt);
//                     }
//                 });
//             }
//         }
//     });

//     $('#search-form').submit(function () {
//         var keywords = $('#keywords').val();
//         if (keywords.length <= 0) {
//             $('#message-box').html('请输入关键字').fadeIn().delay(1000).fadeOut(300);
//             $('#keywords').focus();
//             return false;
//         } else {
//             window.location.href = document.location.origin + '/Store/Search?Keywords=' + keywords;
//         }
//         return false;
//     })

});

var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

// document.cookie="isWeixinBrowser=" + browser.versions.weixin;

// //更新购物车中商品数量值
// function updateCartCount() {
//     $.ajax({
//         type: 'GET',
//         url: cityshopBaseUrl + '/Cart/PopupCartDigest',
//         dataType: 'json',
//         cache: false,
//         success: function(data) {
//             $('#cart-num').html(data.showCount);
//         }
//     });
// }

// // 加入购物车
// function addToCart(id, count) {
//     $.ajax({
//         type: 'POST',
//         url: cityshopBaseUrl + '/AjaxMethod/AddToCart',
//         dataType: 'json',
//         data: {
//             id: id,
//             count: count
//         },
//         cache: false,
//         success: function(data) {
//             if (data.result.IsSuccess) {
//                 $('#message-box').html('加入购物车成功').fadeIn().delay(1000).fadeOut(300);
//                 updateCartCount();
//             } else {
//                 $('#message-box').html(data.result.ErrorData.ErrorMessage).fadeIn().delay(2000).fadeOut(300);
//             }
//         }
//     })
// }

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// //获取Cookie值
// function getCookie(c_name) {
//     if (document.cookie.length > 0) {
//         c_start = document.cookie.indexOf(c_name + "=")
//         if (c_start != -1) {
//             c_start = c_start + c_name.length + 1
//             c_end = document.cookie.indexOf(";", c_start)
//             if (c_end == -1) c_end = document.cookie.length
//             return unescape(document.cookie.substring(c_start, c_end))
//         }
//     }
//     return ""
// }

// function getRequest() {
//     var url = window.location.search; //获取url中"?"符后的字串   
//     var theRequest = new Object();
//     if (url.indexOf("?") != -1) {
//         var str = url.substr(1);
//         strs = str.split("&");
//         for (var i = 0; i < strs.length; i++) {
//             theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
//         }
//     }
//     return theRequest;
// }

function preventDefault(e) {
    e = e || window.event;
    e.preventDefault && e.preventDefault();
    e.returnValue = false;
}

function stopPropagation(e) {
    e = e || window.event;
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = false;
}


$.fn.scrollUnique = function() {
    return $(this).each(function() {

        if (browser.versions.mobile) {
            var startX, startY;

            $(this).on('touchstart', function(event) {
                startX = event.originalEvent.changedTouches[0].pageX;
                startY = event.originalEvent.changedTouches[0].pageY;
            })

            $(this).on('touchmove', function(event) {
                event.stopPropagation();

                var deltaX = event.originalEvent.changedTouches[0].pageX - startX;
                var deltaY = event.originalEvent.changedTouches[0].pageY - startY;

                var scrollTop = this.scrollTop,
                    scrollHeight = this.scrollHeight,
                    height = this.clientHeight;

                if (Math.abs(deltaY) < Math.abs(deltaX)) {
                    event.preventDefault();
                    return false;
                }

                if (height + scrollTop >= scrollHeight) {
                    if (deltaY < 0) {
                        event.preventDefault();
                        return false;
                    }
                }

                if (scrollTop === 0) {
                    if (deltaY > 0) {
                        event.preventDefault();
                        return false;
                    }
                }
            })
        } else {
            var eventType = 'mousewheel';
            if (document.mozHidden !== undefined) {
                eventType = 'DOMMouseScroll';
            }

            $(this).on(eventType, function(event) {
                event.stopPropagation();

                var scrollTop = this.scrollTop,
                    scrollHeight = this.scrollHeight,
                    height = this.clientHeight;

                var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);

                if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                    // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位

                    this.scrollTop = delta > 0 ? 0 : scrollHeight;
                    // 向上滚 || 向下滚

                    event.preventDefault();
                }
            })
        }
    })
}

// ; // aLink(): 使整个区域都能点击
// (function($) {
//     $.fn.alink = function(options) {
//         var opts = $.extend({}, $.fn.alink.defaults, options);
//         return this.each(function() {
//             var $this = $(this).addClass(opts.linkClass);
//             $this.on('click', function() {
//                 if (opts.preventDefault == true) {
//                     $('a:first', this).triggerHandler('clcik');
//                 } else {
//                     var url = $this.find('a')[0].href;
//                     window.location.href = url;
//                     // window.open(url);
//                     return false;
//                 }
//             }).hover(function() {
//                 $this.addClass(opts.linkHoverClass);
//             }, function() {
//                 $this.removeClass(opts.linkHoverClass);
//             })
//         })
//     }
//     $.fn.alink.defaults = {
//         preventDefault: false,
//         linkClass: 'biglink',
//         linkHoverClass: 'biglink-hover'
//     }
// })(jQuery);

// function alink() {
//     var opts = {
//         preventDefault: false,
//         linkClass: 'biglink',
//         linkHoverClass: 'biglink-hover'
//     };

//     var $this = $(this).addClass(opts.linkClass);
//         if (opts.preventDefault == true) {
//             $('a:first', this).triggerHandler('clcik');
//         } else {
//             var url = $this.find('a')[0].href;
//             window.location.href = url;
//             // window.open(url);
//             return false;
//         }
//     $this.hover(function () {
//         $this.addClass(opts.linkHoverClass);
//     }, function () {
//         $this.removeClass(opts.linkHoverClass);
//     })
// }

// $(document).ready(function () {
//     $('#homepage .cs-products').each(function () {
//         var $window = $(window),
//             $this = $(this),
//             $toolbar = $this.find('.products-toolbar'),
//             $toolbarItem = $toolbar.find('.item'),
//             $productsGrid = $this.find('.products-grid'),
//             $productsWrapper = $this.find('.products-block'),
//             $loading = $this.find('.loading');

//         var obj = {
//             IsRecommend: true,
//             IsNewArrival: false,
//             HasPromotion: false
//         };
//         var url = cityshopBaseUrl + '/AjaxMethod/GetIsNewArrivalProductList';
//         var pageIndex = 1;
//         var enableLoad = false;
//         var iLoading = false;
//         var currentAjax = null;
//         var firstLoad = true;

//         init();

//         function init() {
//             // $toolbarItem.first().addClass('current');
//             // if(!iLoading) {
//             //     processData(obj, url);
//             // }
//             bindEvents();
//         }

//         function bindEvents() {
            
//             $window.scroll(function () {
//                 var windowHeight = $window.height(),
//                     headerHeight = $('#header').height(),
//                     toolbarTop = $toolbar.offset().top;

//                 var timer = null;

//                 if($window.scrollTop() > (toolbarTop - windowHeight - 500) && firstLoad) {
//                     $toolbarItem.first().addClass('current');
//                     if(!iLoading) {
//                         processData(obj, url);
//                         firstLoad = false;
//                     }
//                 }

//                 if (timer) {
//                     clearTimeout(timer)
//                 }
//                 timer = setTimeout(function () {
//                     var scrollTop = $window.scrollTop();
//                     var scrollHeight = $(document).height();

//                     if (scrollTop + windowHeight + 500 >= scrollHeight && scrollTop > 0 && enableLoad && !iLoading) {
//                         obj.PageIndex = pageIndex;
//                         processData(obj, url);
//                     }
//                 }, 400);
//             })

//             $toolbarItem.on('click', function () {
//                 var tag = $(this).data('tag');

//                 if($(this).hasClass('current')) {
//                     return false;
//                 }

//                 if (tag == 'IsRecommend') {
//                     obj.IsRecommend = true;
//                     obj.IsNewArrival = false;
//                     obj.HasPromotion = false;
//                 } else if (tag == 'IsNewArrival') {
//                     obj.IsRecommend = false;
//                     obj.IsNewArrival = true;
//                     obj.HasPromotion = false;
//                 } else if (tag == 'HasPromotion') {
//                     obj.IsRecommend = false;
//                     obj.IsNewArrival = false;
//                     obj.HasPromotion = true;
//                 }

//                 $(this).addClass('current').siblings().removeClass('current');

//                 if(iLoading) {
//                     currentAjax.abort();
//                 }
//                 reLoad();
//             })
//         }

//         function reLoad() {
//             pageIndex = 1;
//             enableLoad = false;
//             delete obj.PageIndex;
//             $productsWrapper.empty();
//             processData(obj, url);
//         }

//         // 处理商品数据
//         function processData(obj, url) {
//             currentAjax = $.ajax({
//                 url: url,
//                 type: "GET",
//                 data: obj,
//                 cache: true,
//                 beforeSend: function () {
//                     iLoading = true;
//                     $loading.html('<i class="icon-loading"><img src="/Content/images/loading.gif" alt="加载中" /></i>加载中...');
//                 },
//                 success: function (data) {
//                     var pgSrc = data.PageSource;
//                     var pageCount = data.totalPageCount;
//                     iLoading = false;

//                     // 判断商品数量
//                     if (pageCount <= 0) {
//                         $loading.html('— 没有相关商品 —');
//                         enableLoad = false;
//                     } else {
//                         $loading.html('');

//                         $.each(data.ProductList, function (products, item) {
//                             var $item = createProduct(item);
//                             $productsWrapper.append($item);
//                             var unitWeight = item.Weightable ? item.UnitWeight : 1;

//                             // 加入购物车
//                             $item.find('.btn-add-to-cart').on('click', function () {
//                                 addToCart(item.ProductId, unitWeight, item.price, pgSrc);
//                                 return false;
//                             })

//                             $item.alink();
//                         })

//                         if (data.CurrentPageIndex >= pageCount) {
//                             $loading.html('— 没有更多商品 —');
//                             pageIndex = data.CurrentPageIndex;
//                             enableLoad = false;
//                         } else {
//                             $loading.html('<a href="javascript:void(0);" class="btn-loading">上拉加载更多 >></a>');
//                             pageIndex++;
//                             enableLoad = true;
//                         }
//                     }
//                 },
//                 complete: function(){
//                     $productsGrid.css('min-height', $productsWrapper.outerHeight(true));
//                 }
//             })
//         }
//     })
// })

// // 构造商品结构
// function createProduct(item) {
//     var $item = $('<div class="product-block"></div>');
//     var p_id = item.ProductId,
//             p_name = item.ProductNameText,
//             p_image = item.LargeImagePath,
//             p_unitWeight = item.Weightable ? item.UnitWeight : 1;
//             p_price_now = ((item.Weightable) ? (item.RealPrice * item.UnitWeight) : item.RealPrice).toFixed(2),
//             p_price_original = ((item.Weightable) ? (item.UnitPrice * item.UnitWeight) : item.UnitPrice).toFixed(2),
//             p_spec = item.Specific;
//     var iconHTML = "";
//     if (item.HaveNewArrivalRule) {
//         iconHTML += '<span class="icon-new"><i>新品</i></span>';
//     }
//     if (item.HaveRecommendRule) {
//         iconHTML += '<span class="icon-hot"><i>热销</i></span>';
//     }
//     if (item.HaveSpecialPriceRule) {
//         iconHTML += '<span class="icon-sale"><i>特惠</i></span>';
//     }
//     if (item.HaveGiftRule) {
//         iconHTML += '<span class="icon-sale"><i>' + item.GiftRuleDisc.split('，')[0] + '</i></span>';
//     }
//     if (item.HasPromotion) {
//         iconHTML += '<span class="icon-sale"><i>' + item.GiftRuleDisc + '</i></span>';
//     }

//     if (p_image != null && p_image.indexOf("cityshop") >= 0) {
//         $item.append('<div class="image"><img src="' + p_image + '" alt="' + p_name + '" /></div>');
//     } else {
//         $item.append('<div class="image"><img src="http://www.cityshop.com.cn' + p_image + '" alt="' + p_name + '" /></div>');
//     }

//     if (iconHTML.length > 0) {
//         $item.append('<div class="icon-promo">' + iconHTML + '</div>');
//     }

//     $item.append('<div class="name"><a href="/store/productdetails/all/zh-cn/' + p_id + '">' + p_name + '</a></div><div class="meta"><span class="price">&yen; ' + p_price_now + '</span><span class="spec">' + p_spec + '</span></div>');
//     $item.append('<div class="action"><a class="btn-add-to-cart" href="javascript:void(0);" data-productid="' + p_id + '" data-unitweight="' + p_unitWeight + '">加入购物车</a></div>');

//     return $item;
// }
