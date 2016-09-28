$(document).ready(function () {
    var $window = $(window),
        $container = $('#products-wishlist').find('.cs-products'),
        $productsWrapper = $container.find('.products-block'),
        $loading = $container.find('.loading'),
	    $dialogBox = $('#dialog-box'),
	    $btnConfirm = $dialogBox.find('.btn-confirm'),
	    $btnCancel = $dialogBox.find('.btn-cancel'),
	    $overlay = $('.modal-overlay');


    var obj = {
        PageIndex: 1
    }
    var pageIndex = 1;
    var iLoading = false;

    init();

    function init() {
        // processData(obj, url);
        bindEvents();
    }

    function bindEvents() {
        var timer = null;
        $window.scroll(function () {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(function () {
                var windowHeight = $window.height();
                var scrollTop = $window.scrollTop();
                var scrollHeight = $(document).height();

                if (scrollTop + windowHeight + 500 >= scrollHeight && scrollTop > 0 && iLoading) {
                    obj.PageIndex = pageIndex;
                    processData(obj, url);
                }
            }, 400);
        })

        $btnCancel.on('click', function () {
            if ($dialogBox.is(':visible')) {
                $dialogBox.hide();
                $overlay.hide();
            } else {
                $dialogBox.show();
                $overlay.show();
            }
        })
    }

    // function reLoad() {
    //     pageIndex = 1;
    //     iLoading = false;
    //     delete obj.PageIndex;
    //     $productsWrapper.empty();
    //     processData(obj, url);
    // }

    // 处理商品数据
    function processData(obj, url) {
        // $.ajax({
        //     url: url,
        //     type: "GET",
        //     data: obj,
        //     cache: true,
        //     beforeSend: function () {
        //         $loading.html('<i class="icon-loading"><img src="/Content/images/loading.gif" alt="加载中" /></i>加载中...');
        //     },
        //     success: function (data) {
        //         var pgSrc = data.PageSource;
        //         var pageCount = data.totalPageCount;

        //         // 判断商品数量
        //         if (pageCount <= 0) {
        //             $('.main-wrapper').empty().html('<div class="panel"><div class="panel-body"><div class="thumbnail"><img src="../Content/images/favorites_empty.png" alt="收藏夹为空"></div><div class="caption">收藏夹还是空空的~<br />快把喜欢的东西放进来吧！</div><div class="buttons"><a class="btn-primary" href="/">返回首页</a></div></div></div>');
        //             iLoading = false;
        //         } else {
        //             $loading.html('');

        //             $.each(data.ProductList, function (products, item) {
        //                 var $item = createProduct(item, pgSrc);
        //                 $productsWrapper.append($item);
        //                 var unitWeight = item.Weightable ? item.UnitWeight : 1;

        //                 $item.alink();

        //                 // 加入购物车
        //                 $item.find('.btn-add-to-cart').on('click', function () {
        //                     addToCart(item.ProductId, unitWeight, item.price, pgSrc);
        //                     return false;
        //                 })

        //                 $item.find('.btn-delete').on('click', function () {
        //                     if ($dialogBox.is(':hidden')) {
        //                         $dialogBox.show();
        //                         $overlay.show();
        //                     } else {
        //                         $dialogBox.hide();
        //                         $overlay.hide();
        //                     }

        //                     $btnConfirm.data('deleteid', item.ProductId);
        //                     return false;
        //                 })
        //             })

        //             if (data.CurrentPageIndex == pageCount) {
        //                 $loading.html('— 没有更多商品 —');
        //                 pageIndex = data.CurrentPageIndex;
        //                 iLoading = false;
        //             } else {
        //                 $loading.html('<a href="javascript:void(0);" class="btn-loading">加载更多 >></a>');
        //                 pageIndex++;
        //                 iLoading = true;
        //             }
        //         }
        //     },
        //     complete: function(){
        //         $btnConfirm.on('click', function () {
        //             var id = $(this).data('deleteid');
        //             deleteWishlistProducts(id, $('#product_'+id));
        //             $dialogBox.hide();
        //             $overlay.hide();
        //             return false;
        //         })
        //     }
        // })
    }

    // 构造商品结构
    function createProduct(item, pgSrc) {
        var p_id = item.ProductId,
            p_name = item.ProductNameText,
            p_image = item.LargeImagePath,
            p_price_now = ((item.Weightable) ? (item.RealPrice * item.UnitWeight) : item.RealPrice).toFixed(2),
            p_price_original = ((item.Weightable) ? (item.UnitPrice * item.UnitWeight) : item.UnitPrice).toFixed(2),
            p_spec = item.Specific;

        var $item = $('<div class="product-block" id="product_'+ p_id +'"></div>');

        var iconHTML = "";
        if (item.HaveNewArrivalRule) {
            iconHTML += '<span class="icon-new"><i>新品</i></span>';
        }
        if (item.HaveRecommendRule) {
            iconHTML += '<span class="icon-hot"><i>热销</i></span>';
        }
        if (item.HaveSpecialPriceRule) {
            iconHTML += '<span class="icon-sale"><i>特惠</i></span>';
        }
        if (item.HaveGiftRule) {
            iconHTML += '<span class="icon-sale"><i>' + item.GiftRuleDisc.split('，')[0] + '</i></span>';
        }
        if (item.HasPromotion) {
            iconHTML += '<span class="icon-sale"><i>' + item.GiftRuleDisc + '</i></span>';
        }

        if (p_image != null && p_image.indexOf("cityshop") >= 0) {
            $item.append('<div class="image"><img src="' + p_image + '" alt="' + p_name + '" /></div>');
        } else {
            $item.append('<div class="image"><img src="http://www.cityshop.com.cn' + p_image + '" alt="' + p_name + '" /></div>');
        }

        if (iconHTML.length > 0) {
            $item.append('<div class="icon-promo">' + iconHTML + '</div>');
        }

        $item.append('<div class="meta"><p class="name"><a href="/store/productdetails/all/zh-cn/' + p_id + '?pgSrc=' + pgSrc + '">' + p_name + '</a></p><p class="spec">规格：' + p_spec + '</p><p class="price">&yen; ' + p_price_now + '</p></div>');
        $item.append('<div class="action"><a class="btn-add-to-cart" href="javascript:void(0);">加入购物车</a><a class="btn-delete" href="javascript:void(0);">删除</a></div>');

        return $item;
    }

    //删除收藏商品
    // function deleteWishlistProducts(id, $item) {
    //     $.ajax({
    //         type: 'POST',
    //         url: cityshopBaseUrl + '/Profile/DeleteProductsFromWishlist/',
    //         dataType: 'json',
    //         data: {
    //             id: id
    //         },
    //         cache: false,
    //         success: function (data) {
    //             if (data.result) {
    //                 $item.remove();
    //             } else {
    //                 $('#message-box').html('删除失败').fadeIn().delay(1000).fadeOut(300);
    //             }
    //         },
    //         complete: function () {
    //             var $productsItem = $productsWrapper.find('.product-block');
    //             if ($productsItem.length <= 0) {
    //                 $('.main-wrapper').empty().html('<div class="panel"><div class="panel-body"><div class="thumbnail"><img src="/Content/images/favorites_empty.png" alt="收藏夹为空"></div><div class="caption">收藏夹还是空空的~<br />快把喜欢的东西放进来吧！</div><div class="buttons"><a class="btn-primary" href="/">返回首页</a></div></div></div>')
    //             }
    //         }
    //     })
    // }

})