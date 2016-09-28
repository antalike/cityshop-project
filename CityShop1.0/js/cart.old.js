$(document).ready(function () {

    $('input').iCheck();

    //点击checkbox
    var $checkAll = $('#checkAll'),
        $btnCheckout = $('.btn-checkout'),
        $checkboxes = $('.products-cart .input-checkbox'),
        $messageBox = $('#message-box');

    //1. 如果没有选中商品，弹出提示框
    $btnCheckout.on('click', function () {
        var $checkboxes = $('.products-cart .input-checkbox');
        var $checkedItems = $checkboxes.filter(':checked');

        if ($checkedItems.length <= 0) {
            $messageBox.html('您还没有选择商品哦').fadeIn().delay(1000).fadeOut(300);
            return false;
        }
    })

    $checkboxes.on('ifChanged', function (event) {
        setSelected($(this).attr("id").replace("checkbox_", ""), $(this).prop("checked"));

        if ($checkboxes.filter(':checked').length == $checkboxes.length) {
            $checkAll.prop('checked', 'checked');
        } else {
            $checkAll.removeProp('checked');
        }
        $checkAll.iCheck('update');
    });

    //全选+全不选
    $checkAll.on('ifChecked ifUnchecked', function (event) {
        var $checkboxes = $('.products-cart').find('.input-checkbox');
        var ids = "";

        if (event.type == 'ifChecked') {
            $checkboxes.iCheck('check');
        } else {
            $checkboxes.iCheck('uncheck');
        }

        for (var i = 0; i < $checkboxes.length; i++) {
            ids += $checkboxes.eq(i).attr("id").replace("checkbox_", "");
            ids += "|";
        }

        setSelected(ids, $checkAll.prop("checked"));

    });

    var $dialogBox = $('#dialog-box'),
		$btnConfirm = $dialogBox.find('.btn-confirm'),
		$btnCancel = $dialogBox.find('.btn-cancel');

    $('.products-cart').find('.btn-delete').on('click', function () {
        var $this = $(this);

        if ($dialogBox.is(':hidden')) {
            $dialogBox.show();
        }

        $btnConfirm.on("click", {
            id: $this.attr("itemid"),
            isGift: $this.attr("isgift"),
            isProm: $this.attr("isprom"),
            productItem: $this.parents('.product-block')
        }, ajaxCartDelete);

        return false;
    });

    $btnCancel.on('click', function () {
        if ($dialogBox.is(':visible')) $dialogBox.hide();
    });



    //删除购物车商品
    function ajaxCartDelete(event) {

        var $productItem = event.data.productItem;
        $.ajax(
            {
                type: 'POST',
                url: cityshopBaseUrl + '/Cart/AjaxDelete',
                dataType: 'json',
                data: { id: event.data.id, isGift: event.data.isGift },
                cache: false,
                success: function (data) {
                    var totalPrice = data.OrderTotalPrice.toFixed(2),
                        totalReturnPrice = data.TotalReturnCash.toFixed(2);

                    //判断购物车商品数量
                    //如果数量为0，显示购物车为空页面
                    $.ajax(
                    {
                        type: 'GET',
                        url: cityshopBaseUrl + '/Cart/PopupCartDigest',
                        dataType: 'json',
                        cache: false,
                        success: function (data) {
                            var count = data.count;
                            $("#site-head-login-cart-indicator").html(count);
                            if (count == 0) {
                                $('#settlement-step1').html('<div class="panel"><div class="thumbnail"><img src="/Content/images/icon-cart-large.png" alt="" /></div><div class="caption">您的购物车内还没有任何商品<br />快去挑几件喜欢的商品吧~</div><div class="buttons"><a href="/" class="button">随便逛逛</a></div></div>');
                            } else {
                                $("#TotalPrice").html('&yen; ' + totalPrice);
                                $("#TotalReturnCash").html('&yen; ' + totalReturnPrice);
                                $productItem.remove();
                                iCheckAll();
                            }
                        }
                    });

                    $dialogBox.hide();

                }
            });
    }
    //END


    //后台执行选中操作
    function setSelected(ids, checked) {
        $.ajax({
            type: "POST",
            url: cityshopBaseUrl + "/Cart/SetSelected",
            dataType: "JSON",
            data: { ids: ids, selected: checked },
            cache: false,
            success: function (data) {
                if (data.result) {
                    refreshCart();
                } else {
                    console.log(data.errorMsg);
                }
            }
        });
    }
    //END

    

    
})

function ResolveUrl(url) {
    if (!url) {
        return "";
    }
    if (url.indexOf("~/") == 0) {
        url = "http://www.myfoodstore.com.cn/" + url.substring(2);
    }
    return url;
}

//数量加减方法
function updateItemCountSingle(id, increment, isGift, isProm, weightable, unitWeight, e) {
    e = window.event || e;
    var srcElement = e.srcElement || e.target;

    var item_id = "cart_item_" + id + isGift + isProm;
    var subOriTotalId = "subOriTotal_" + id + isGift + isProm;
    var subTotalId = "subTotal_" + id + isGift + isProm;
    var giftCountId = "giftcount_" + id + isGift + isProm;
    var subfavorableId = "subfavorable_" + id + isGift + isProm;
    
    var count = Number(document.getElementById(item_id).value);
//    var display = "none";

    if (increment < 0 && count <= unitWeight) { return false; }

    var stop = true;
    var status = $(item_id).attr("stock");
    var alarmLmt = $(item_id).attr("alarmbar");
    var normalLmt = $(item_id).attr("normalbar");

    $("#checkbox_" + id).prop('checked', 'checked');

    if (increment > 0 && count >= normalLmt) { return false; }

    if (status == 2 && alarmLmt <= count && increment >= 0) {
//        $(srcElement).parent().find(".item-alarm").show();
        if (increment == 0) {
            count = alarmLmt;
        }
    }
    else if (status == 1 && normalLmt <= count) {
//        $(srcElement).parent().find(".item-alarm").hide();
        count = normalLmt;
    }
    else {
//        $(srcElement).parent().find(".item-alarm").hide();
        stop = false;
    }

    var real_count = 0;
    if (!stop || increment < 0) {
        if (weightable) {
            real_count = accAdd(count, accMul(Number(increment), unitWeight))
        }
        else {
            real_count = accAdd(count, Number(increment));
        }
    }
    else {
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
    }
    else {
        if (!parseInt(real_count) || real_count < 1) {
            real_count = 1;
            document.getElementById(item_id).value = real_count;
        }
    }

    var ids = "";
    $checkboxes = $('.products-cart .input-checkbox').filter(':checked');
    $checkboxes.iCheck("update");
    for (var i = 0; i < $checkboxes.length; i++) {
        ids += $checkboxes.eq(i).attr("id").replace("checkbox_", "");
        ids += "|";
    }

    var url = cityshopBaseUrl + "/Cart/AjaxUpdateItemAmount";
    $.ajax(
        {
            type: 'GET',
            url: url,
            dataType: 'JSON',
            data: { "id": id, "amount": real_count, "isGift": Boolean(isGift), "itemIds": ids },
            cache: false,
            success: function (data) {
                if (data != null && data.result) {
                    $("#TotalPrice").html("&yen; " + data.OrderTotalPrice.toFixed(2));
                    $("#TotalReturnCash").html("&yen; " + data.TotalReturnCash.toFixed(2));
                    $("#" + item_id).val(data.Item.Weightable ? data.Item.ProductCount.toFixed(2) : data.Item.ProductCount);
                    $("#" + subTotalId).html("&yen; " + (data.Item.ProductCount * data.Item.RealPrice).toFixed(2));
                    if (data.Item.RealPrice != data.Item.UnitPrice) {
                        $("#" + subOriTotalId).html("&yen; " + (data.Item.ProductCount * data.Item.UnitPrice).toFixed(2));
                    }
                    $("#" + giftCountId).text(data.Item.ReturnProductAmount);
                    $("#" + subfavorableId).html("- &yen; " + data.Item.ReturnCash.toFixed(2));
                    iCheckAll();
                } else {
                    alert(data.message);
                }
            }
        }
    );


    }

    //更新购物车页
    function refreshCart(ids) {
        var ids = ids || "";

        if (ids == "") {
            var $checkedItems = $('.products-cart .input-checkbox').filter(':checked');
            for (var i = 0; i < $checkedItems.length; i++) {
                ids += $checkedItems.eq(i).attr("id").replace("checkbox_", "");
                ids += "|";
            }
        }

        if (ids == "") {
            $("#TotalPrice").html("&yen; 0.00");
            $("#TotalReturnCash").html("&yen; 0.00");
        } else {
            var idList = ids.split("|");

            //使已选择的商品:checked
            for (var i = 0; i < idList.length; i++) {
                $("#checkbox_" + idList[i]).prop("checked", "checked");
            }
            $('.products-cart .input-checkbox').iCheck('update');

            //显示结算数量和价格
            $.ajax({
                type: "POST",
                url: cityshopBaseUrl + "/Cart/GetCartSelected",
                dataType: "json",
                data: { "ItemIds": ids },
                cache: false,
                success: function (data) {
                    $("#current-cart-num").html(data.count);
                    if (data.result) {
                        $("#TotalPrice").html("&yen; " + data.OrderTotalPrice.toFixed(2));
                        $("#TotalReturnCash").html("&yen; " + data.TotalReturnCash.toFixed(2));
                    }
                }
            });
        }
        iCheckAll();
    }
    //END


    //是否全选/全不选
    function iCheckAll() {
        var $checkAll = $('#checkAll'),
            $checkboxes = $('.products-cart .input-checkbox'),
            $checkedItems = $checkboxes.filter(':checked');

        $("#current-cart-num").html($checkedItems.length);

        if ($checkedItems.length == $checkboxes.length) {
            $checkAll.prop('checked', 'checked');
        } else {
            $checkAll.removeProp('checked');
        }
        $checkAll.iCheck('update');
    }
    //END