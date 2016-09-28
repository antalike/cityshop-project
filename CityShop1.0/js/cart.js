var $productsWrapper = $('#cart .order-products');
var $checkboxAll = $('#checkAll');
var $dialogBox = $('#dialog-box'),
    $btnCheckout = $('#cart .btn-checkout'),
    $btnConfirm = $dialogBox.find('.btn-confirm'),
    $btnCancel = $dialogBox.find('.btn-cancel'),
    $overlay = $('.modal-overlay');

var deleteObj = {};

var disableScroll = function () {
    $(document).on('mousewheel', preventDefault);
    $(document).on('touchmove', preventDefault);
};

var enableScroll = function () {
    $(document).off('mousewheel', preventDefault);
    $(document).off('touchmove', preventDefault);
};

$checkboxAll.on('change', function() {
    var $checkbox = $productsWrapper.find('.input-checkbox');
    var ids = "";

    if ($checkboxAll.is(':checked')) {
        for (var i = 0; i < $checkbox.length; i++) {
            $checkbox.eq(i)[0].checked = true;
        }
    } else {
        for (var i = 0; i < $checkbox.length; i++) {
            $checkbox.eq(i)[0].checked = false;
        }
    }

    for (var i = 0; i < $checkbox.length; i++) {
        ids += $checkbox.eq(i).attr("id").replace("checkbox_", "");
        ids += "|";
    }
})

$btnCheckout.on('click', function() {
    var $checkbox = $productsWrapper.find('.input-checkbox');
    var $checkedItems = $checkbox.filter(':checked');

    if ($checkedItems.length <= 0) {
        $('#message-box').html('您还没有选择商品哦~').fadeIn().delay(2000).fadeOut(300);
        return false;
    }
})

//取消对话框
$btnCancel.on('click', function() {
    if ($dialogBox.is(':visible')) {
        $dialogBox.hide();
        $overlay.hide();
        enableScroll();
    } else {
        $dialogBox.show();
        $overlay.show();
        disableScroll();
    }
})

//确认删除
$btnConfirm.on('click', function() {
    $dialogBox.hide();
    $overlay.hide();
    enableScroll();
    return false;
})

//删除购物车商品
$productsWrapper.find('.btn-delete').on('click', function() {

    if ($dialogBox.is(':hidden')) {
        $dialogBox.show();
        $overlay.show();
        disableScroll();
    } else {
        $dialogBox.hide();
        $overlay.hide();
        enableScroll();
    }

    deleteObj.id = $(this).attr('itemid');
    deleteObj.isGift = $(this).attr('isgift');
    deleteObj.isProm = $(this).attr('isprom');
    return false;
})

//更新购物车页
function refreshCart(ids) {
    var ids = ids || "";

    if (ids == "") {
        var $checkedItems = $productsWrapper.find('.input-checkbox').filter(':checked');
        for (var i = 0; i < $checkedItems.length; i++) {
            ids += $checkedItems.eq(i).attr("id").replace("checkbox_", "");
            ids += "|";
        }
    }

    if (ids == "") {
        $("#TotalPrice").html("&yen; 0.00");
        $("#TotalReturnCash").html("&yen; 0.00");
        $(".bundle-products .price-subtotal").find('.value').html("&yen; 0.00");
        $(".bundle-products .bundlegiftcount").html("0");
    } else {
        var idList = ids.split("|");

        //使已选择的商品:checked
        for (var i = 0; i < idList.length; i++) {
            if(idList[i].length > 0 && $("#checkbox_" + idList[i]).length > 0) {
                $("#checkbox_" + idList[i])[0].checked = true;
            }
        }
    }

    setCheckoutNum();
    iCheckAll();
}

//判断是否全选或全不选
function iCheckAll() {
    var $checkbox = $productsWrapper.find('.input-checkbox');

    if ($checkbox.filter(':checked').length == $checkbox.length && $checkbox.length > 0) {
        $checkboxAll[0].checked = true;
    } else {
        $checkboxAll[0].checked = false;
    }
}

//更新结算商品数量
function setCheckoutNum() {
    var $checkbox = $productsWrapper.find('.input-checkbox');
    var count = $checkbox.filter(':checked').length;
    $('#checkout-item-num').html((count == 0) ? 0 : count);
}

//数量加减方法
function updateItemCountSingle(id, increment, isGift, isProm, weightable, unitWeight, e, bundleId) {
    e = window.event || e;
    var srcElement = e.srcElement || e.target;

    var item_id = "cart_item_" + id + isGift + isProm;
    var subOriTotalId = "subOriTotal_" + id + isGift + isProm;
    var subTotalId = "subTotal_" + id + isGift + isProm;
    var giftCountId = "giftcount_" + id + isGift + isProm;
    var subfavorableId = "subfavorable_" + id + isGift + isProm;

    var count = Number(document.getElementById(item_id).value);
    var stop = true;
    var status = $('#' + item_id).attr("stock");
    var alarmLmt = $('#' + item_id).attr("alarmbar");
    var normalLmt = $('#' + item_id).attr("normalbar");

    if (!$('#checkbox_' + id).is(':checked')) {
        $("#checkbox_" + id)[0].checked = true;
    }

    if (increment < 0 && count <= unitWeight) {
        return false;
    }

    if (increment > 0 && count >= normalLmt) {
        return false;
    }

    if (status == 2 && alarmLmt <= count && increment >= 0) {
        //        $(srcElement).parent().find(".item-alarm").show();
        if (increment == 0) {
            count = alarmLmt;
        }
    } else if (status == 1 && normalLmt <= count) {
        //        $(srcElement).parent().find(".item-alarm").hide();
        count = normalLmt;
    } else {
        //        $(srcElement).parent().find(".item-alarm").hide();
        stop = false;
    }

    var real_count = 0;
    if (!stop || increment < 0) {
        if (weightable) {
            real_count = accAdd(count, accMul(Number(increment), unitWeight))
        } else {
            real_count = accAdd(count, Number(increment));
        }
    } else {
        real_count = count;
    }

    if (srcElement.id.indexOf("cart_item") != -1) {
        real_count = count;
    }

    if (weightable) {
        if (real_count <= 0) {
            real_count = unitWeight;
            document.getElementById(item_id).value = real_count;
        }
    } else {
        if (!parseInt(real_count) || real_count < 1) {
            real_count = 1;
            document.getElementById(item_id).value = real_count;
        }
    }

    var ids = "";
    var $checkbox = $productsWrapper.find('.input-checkbox').filter(':checked');

    for (var i = 0; i < $checkbox.length; i++) {
        ids += $checkbox.eq(i).attr("id").replace("checkbox_", "");
        ids += "|";
    }
}