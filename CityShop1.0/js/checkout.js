
var globalData =
{
    _UrlOrderSubmit: '',

    init: function (UrlAddressEditor, UrlOrderSubmit) {
        globalData._UrlOrderSubmit = UrlOrderSubmit;
    }
}

$(document).ready(function () {
    var storage = window.localStorage;
    var CodTypeId = parseInt(storage.getItem('CodTypeId'));
    var InvoiceTypeId = parseInt(storage.getItem('InvoiceTypeId'));
    var InvoiceHeader = storage.getItem('InvoiceHeader');
    var InvoiceHeaderId = parseInt(storage.getItem('InvoiceHeaderId'));
    var InvoiceContentType = parseInt(storage.getItem('InvoiceContentType'));
    var ReceiveTime = parseInt(storage.getItem('ReceiveTime'));

    var $dialogBox = $('#dialog-box'),
        $btnCancel = $dialogBox.find('.btn-cancel'),
        $overlay = $('.modal-overlay');

    var disableScroll = function () {
        $(document).on('mousewheel', preventDefault);
        $(document).on('touchmove', preventDefault);
    };

    var enableScroll = function () {
        $(document).off('mousewheel', preventDefault);
        $(document).off('touchmove', preventDefault);
    };

    var $iNeedInvoice = $('input[name="iNeedInvoice"]');

    if($iNeedInvoice.filter(':checked').val() == 3){
        $('.control-invoice').hide();
        $('#InvoiceTypeList').val('3');
    } else {
        $('.control-invoice').show();
        if(isNaN(InvoiceTypeId)){
            $('#InvoiceTypeList').val('1');
        } else {
            $('#InvoiceTypeList').val(InvoiceTypeId);
        }
    }

    $iNeedInvoice.on('change', function(){
        if($iNeedInvoice.filter(':checked').val() == 3){
            $('.control-invoice').hide();
            $('#InvoiceTypeList').val('3');
        } else {
            $('.control-invoice').show();
            if(isNaN(InvoiceTypeId)){
                $('#InvoiceTypeList').val('1');
            } else {
                $('#InvoiceTypeList').val(InvoiceTypeId);
            }
        }
    })

    $('.trigger-freightNote').on('click', function(){
        if ($dialogBox.is(':hidden')) {
            $dialogBox.show();
            $overlay.show();
            disableScroll();
        } else {
            $dialogBox.hide();
            $overlay.hide();
            enableScroll();
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

    $dialogBox.on('click', function() {
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

    $dialogBox.find('.dialog-body').on('click', function(event){
        event.stopPropagation();
    })

    storage.setItem('selectedAddressId', $('#addressKey').val());
    storage.setItem('OnlinePayType', $('#OnlinePayType').val());

    if (storage.getItem('PayTypeList') != null) {
        for (var i = 0; i < $('input[name="PayTypeList"]').length; i++) {
            if ($('input[name="PayTypeList"]').eq(i).val() == storage.getItem('PayTypeList')) {
                $('input[name="PayTypeList"]').eq(i).attr('checked', true);
                break;
            }
        }
    }

    $('input[name="PayTypeList"]').on('change', function () {
        storage.setItem('PayTypeList', $(this).val());
        if ($(this).val() == 1) {
            $('#OnlinePayType').val($(this).data('onlinepaytype'));
            storage.setItem('OnlinePayType', $(this).data('onlinepaytype'));
        }
    })

    $('#btnOrderSubmit').on('click', function () {
        if ($("#addressKey").val() == 0) {
            $('#message-box').html('请设置收货信息').fadeIn().delay(1000).fadeOut(300);
            return false;
        }
        $('#order-submit-form').submit();
        storage.clear();
        $.cookie("receiveDate", null);
        $.cookie("receiveTime", null);
    })

    if (!isNaN(CodTypeId)) {
        $('#CodType').val(CodTypeId);
    }

    if (InvoiceTypeId == 1) {

        $('#InvoiceType').html('普通发票');
        $('#InvoiceTypeList').val('1');
        $('#InvoiceHeader').val(InvoiceHeader);
        $('#InvoiceContentType').val(InvoiceContentType);

        switch (InvoiceHeaderId) {
            case 1:
                $('#InvoiceHeaderTxt').html('个人，');
                break;
            case 2:
                $('#InvoiceHeaderTxt').html('公司，');
                break;
            default:
                $('#InvoiceHeaderTxt').html('个人，');
        }

        switch (InvoiceContentType) {
            case 1:
                $('#InvoiceContentTxt').html('食品');
                break;
            case 2:
                $('#InvoiceContentTxt').html('日用品');
                break;
            case 3:
                $('#InvoiceContentTxt').html('办公用品');
                break;
            default:
                $('#InvoiceContentTxt').html('食品');
        }

    } else if (InvoiceTypeId == 2) {
        $('#InvoiceType').html('增值税发票');
        $('#InvoiceHeaderTxt').html('');
        $('#InvoiceTypeList').val('2');
        $('#InvoiceContentType').val(storage.getItem('InvoiceContentType'));
        $('#CompanyName').val(storage.getItem('CompanyName'));
        $('#TaxPayerId').val(storage.getItem('TaxPayerId'));
        $('#CompanyAddress').val(storage.getItem('CompanyAddress'));
        $('#CompanyPhone').val(storage.getItem('CompanyPhone'));
        $('#BankName').val(storage.getItem('BankName'));
        $('#InvoicePostAddress').val(storage.getItem('InvoicePostAddress'));

        switch (InvoiceContentType) {
            case 1:
                $('#InvoiceContentTxt').html('食品');
                break;
            case 2:
                $('#InvoiceContentTxt').html('日用品');
                break;
            case 3:
                $('#InvoiceContentTxt').html('办公用品');
                break;
            default:
                $('#InvoiceContentTxt').html('食品');
        }
    }

    switch (CodTypeId) {
        case 1:
            $('#CodTypeText').html('现金');
            break;
        case 2:
            $('#CodTypeText').html('银行卡');
            break;
        case 3:
            $('#CodTypeText').html('城市超市礼品卡');
            break;
        case 4:
            $('#CodTypeText').html('会员卡');
            break;
        default:
            $('#CodTypeText').html('现金');
    }
});