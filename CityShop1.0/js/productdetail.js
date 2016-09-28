var globalData = {
    _countbar: '',
    init: function (countbar) {
        globalData._countbar = countbar;
    }
}

$(document).ready(function () {
    var productId = $('#id').val(); //货号
    var itemType = $('#itemType').val();

    $('.product-view .images').owlCarousel({
        items: 1,
        nav: false
    })

    //收藏功能
    $('.product-view .btn-collect').on('click', function () {
        var $this = $(this);
        var url = cityshopBaseUrl + '/Profile/AddToWishlist/';
        var productInfo = {
            id: productId,
            type: itemType
        };
        $.post(url, productInfo, function (data) {
            if (data.result) {
                if (data.opr == "del") {
                    $this.removeClass("collected").html("加入收藏夹");
                    $('#message-box').html('取消收藏').fadeIn().delay(1000).fadeOut(300);
                }
                else {
                    $this.addClass("collected").html("已收藏");
                    $('#message-box').html('收藏成功').fadeIn().delay(1000).fadeOut(300);
                }
            }
            else {
                $('#message-box').html(data.msg).fadeIn().delay(1000).fadeOut(300);
            }
        });
        return false;
    })

    //数量加减
    $(".product-view .quantity > a").click(function () {
        var isWeightable = $("#hfWeightable").val() == 1 ? true : false;
        var classname = $(this).attr("class");
        var unitweight = $("#unitWeight").val() / 1.00;
        var currentWeight = $("#weightableQty").val() / 1.00;

        var countBar = parseInt(globalData._countbar);

        if (classname == "btn-plus") {
            if (currentWeight == countBar && countBar > 0) {
                return false;
            }
            if (isWeightable) {
                $("#weightableQty").val(accAdd(currentWeight, unitweight).toFixed(2));
            }
            else {
                $("#weightableQty").val(accAdd(currentWeight, unitweight).toFixed(0));
            }
        }
        else {
            if (currentWeight == unitweight) {
                return false;
            }
            if (isWeightable) {
                $("#weightableQty").val(accSub(currentWeight, unitweight).toFixed(2));
            }
            else {
                $("#weightableQty").val(accSub(currentWeight, unitweight).toFixed(0));
            }
        }
        $("#estimateprice").html(accMul($("#weightableQty").val(), $("#hfPrice").val()).toFixed(2));
    });

    //加入购物车
    $(".product-view .btn-add-to-cart").click(function () {

        if ($(this).hasClass('btn-disabled')) {
            return false;
        }

        $.ajax(
        {
            type: 'POST',
            url: cityshopBaseUrl + '/Cart/Add/',
            dataType: 'json',
            data: {
                id: $('#id').val(),
                count: $('#weightableQty').val(),
                price: $("#hfPrice").val(),
                pgSrc: $("#pgSrc").val(),
                regionId: -1

            },
            cache: false,
            success: function (data) {
                if (data.result) {
                    $('#message-box').html('添加购物车成功').fadeIn().delay(1000).fadeOut(300);
                    updateCartCount();
                }
                else {
                    $('#message-box').html('添加购物车失败').fadeIn().delay(1000).fadeOut(300);
                }
            }
        });
    });
});

function afterClickBuy() {
    var r = /^\+?[1-9][0-9]*$/;
    var count = document.getElementById("weightableQty").value;
    if (!r.test(count)) {
        document.getElementById("weightableQty").value = 1;
    }
    var countBar = parseInt(globalData._countbar);
    if (count >= countBar && countBar > 0) {
        document.getElementById("weightableQty").value = countBar;
    }
}
function getrecommendProduct(el) {
    var id = el.find("#recommendid").val();
    var count = el.find("#recommendunitWeight").val();
    var price = el.find("#recommendhfPrice").val();
    var pgSrc = el.find("#recommendpgSrc").val();
    return { id: id, count: count, price: price, pgSrc: pgSrc, regionId: -1 };
}