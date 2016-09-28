function GetProvinceRecursive(provinceId, cityId, districtId, callback) {
    $(".province-select").empty(); //清空省份SELECT控件
    $("<option></option>")
        .val("")
        .text("---")
        .appendTo($(".province-select"));

    $.ajax({
        url: cityshopBaseUrl + "/Profile/GetProvinceList",
        dataType: 'json',
        type: 'GET',
        async: false,

        success: function(data) {
            $.each(data, function(i, item) {
                $("<option></option>")
                    .val(item["ProvinceId"])
                    .text(item["ProvinceNameText"])
                    .appendTo($(".province-select"));

                if(provinceId == item["ProvinceId"]) {
                    $(".province-select").val(provinceId);
                    $(".province-select").prev('.selectValue').html(item["ProvinceNameText"]);
                }
            })          
        }
    });

    $.ajax({
        url: cityshopBaseUrl + "/Profile/GetCityList/" + $(".province-select").val(),
        dataType: 'json',
        type: 'GET',
        async: false,

        success: function(data) {
            $.each(data, function(i, item) {
                $("<option></option>")
                    .val(item["CityId"])
                    .text(item["CityNameText"])
                    .appendTo($(".city-select"));

                if(cityId == item["CityId"]) {
                    $(".city-select").val(cityId);
                    $(".city-select").prev('.selectValue').html(item["CityNameText"]);
                }
            })
        }
    });

    var city = $(".city-select").val() ? $(".city-select").val() : 1;
    $.ajax({
        url: cityshopBaseUrl + "/Profile/GetDistrictList/" + city,
        dataType: 'json',
        type: 'GET',
        async: false,

        success: function(data) {
            $.each(data, function(i, item) {
                $("<option></option>")
                    .val(item["DistrictId"])
                    .text(item["DistrictNameText"])
                    .appendTo($(".district-select"));

                if(districtId == item["DistrictId"]) {
                    $(".district-select").val(districtId);
                    $(".district-select").prev('.selectValue').html(item["DistrictNameText"]);
                }
            });
        }
    });

    callback();
}

function GetProvince() {
    $(".province-select").empty(); //清空省份SELECT控件
    $(".province-select").prev('.selectValue').html('---');
    $("<option></option>")
        .val("")
        .text("---")
        .appendTo($(".province-select"));

    $.getJSON(cityshopBaseUrl + "/Profile/GetProvinceList", function(data) {
        $.each(data, function(i, item) {
            $("<option></option>")
                .val(item["ProvinceId"])
                .text(item["ProvinceNameText"])
                .appendTo($(".province-select"));
        });
    });
}

function GetCity() {
    $(".city-select").empty(); //清空城市SELECT控件
    $(".city-select").prev('.selectValue').html('---');
    $("<option></option>")
        .val("")
        .text("---")
        .appendTo($(".city-select"));

    $(".district-select").empty(); 
    $(".district-select").prev('.selectValue').html('---');
    $("<option></option>")
        .val("")
        .text("---")
        .appendTo($(".district-select"));

    if($(".province-select").val() == "") {
        return false;
    }

    var url = cityshopBaseUrl + "/Profile/GetCityList/" + $(".province-select").val();
    $.getJSON(url, function(data) {
        $.each(data, function(i, item) {
            $("<option></option>")
                .val(item["CityId"])
                .text(item["CityNameText"])
                .appendTo($(".city-select"));
        });
    });

    //判断当前选择的是不是直辖市，如果是的话，还需要load 区的数据
    // var url = cityshopBaseUrl + "/Profile/IsProvinceDirectCity/" + $(".province-select").val();
    // $.getJSON(url, function(data) {
    //     if (Number(data) == 1) {
    //         GetDistrict();
    //     }
    // });
}

function GetDistrict() {
    $(".district-select").empty();
    $(".district-select").prev('.selectValue').html('---');
    $("<option></option>")
        .val("")
        .text("---")
        .appendTo($(".district-select"));

    if($(".city-select").val() == "") {
        return false;
    }

    var city = $(".city-select").val() ? $(".city-select").val() : 1;
    var url = cityshopBaseUrl + "/Profile/GetDistrictList/" + city;

    $.getJSON(url, function(data) {
        $.each(data, function(i, item) {
            $("<option></option>")
                .val(item["DistrictId"])
                .text(item["DistrictNameText"])
                .appendTo($(".district-select"));
        });
    });
}

$(document).ready(function () {
    var $form = $('#addressEdit-form'),
        $dialogBox = $('#dialog-box'),
        $btnConfirm = $dialogBox.find('.btn-confirm'),
        $btnCancel = $dialogBox.find('.btn-cancel'),
        $overlay = $('.modal-overlay');

    var iCheckStep = Boolean(getUrlParam("checkstep"));

    $btnCancel.on('click', function () {
        if ($dialogBox.is(':visible')) {
            $dialogBox.hide();
            $overlay.hide();
        } else {
            $dialogBox.show();
            $overlay.show();
        }
    })

    $btnConfirm.on('click', function () {
        var id = $(this).data('deladdressid');
        // $.ajax({
        //     type: 'POST',
        //     dataType: 'json',
        //     url: cityshopBaseUrl + '/Profile/RemoveAddress',
        //     data: {
        //         id: id
        //     },
        //     cache: false,
        //     success: function (data) {
        //         $dialogBox.hide();
        //         $overlay.hide();

        //         if (data.result) {
        //             $('#addressid_' + id).remove();

        //         } else {
        //             $('#message-box').html('删除失败').fadeIn().delay(1000).fadeOut(300);
        //         }
        //     },
        //     complete: function () {
        //         if ($('.address-block').length <= 0) {
        //             $.removeCookie('selectedAddressid', { path: '/' });
        //             $('.main-wrapper').empty().html('<div class="panel"><div class="panel-body"><div class="thumbnail"><img src="../Content/images/address_empty.png" alt=""></div><div class="caption">还没有收货地址哦~<br />快来加一个吧！</div><div class="buttons"><a class="btn-primary" href="/profile/ajaxcreateaddress">新增收货地址</a></div></div></div>');
        //         }
        //     }
        // })
    })

    $('.address-block').each(function () {
        var $this = $(this);
        var storage = window.localStorage;

        var addressId = $this.attr('id').replace('addressid_', '');

        if (iCheckStep == true) {
            if (addressId == storage.getItem("selectedAddressId")) {
                $this.addClass('selected');
            }

            $this.on('click', function () {
                if (!$this.hasClass('selected')) {
                    storage.removeItem('receiveDate');
                    storage.removeItem('receiveTime');
                    storage.removeItem('receiveTimeText');
                }
                $.cookie("selectedAddressid", addressId, { path: '/' });
                window.location.href = document.location.origin + '/Cart/Checkout?id=' + addressId;
            })
        }

        $this.find('.label-radio').on('click', function () {
            // $.ajax({
            //     type: 'POST',
            //     dataType: 'json',
            //     url: cityshopBaseUrl + '/Profile/AjaxSetDefaultAddress',
            //     data: {
            //         id: addressId
            //     },
            //     cache: false,
            //     success: function (data) {
            //         if (data.result) {
            //             $('#message-box').html('设置成功').fadeIn().delay(1000).fadeOut(300);
            //             $('.label-radio').removeClass('checked').html('设为默认');
            //             $this.find('.label-radio').addClass('checked').html('默认地址');
            //         } else {
            //             $('#message-box').html('设置失败').fadeIn().delay(1000).fadeOut(300);
            //         }
            //     }
            // })
        })

        $this.find('.btn-delete').on('click', function () {
            if ($dialogBox.is(':hidden')) {
                $dialogBox.show();
                $overlay.show();
            } else {
                $dialogBox.hide();
                $overlay.hide();
            }

            $btnConfirm.data('deladdressid', addressId);
        })
    })

    $('#addressEdit-form').each(function () {
        var $form = $(this),
            $required = $form.find('.required'),
            $btnSubmit = $form.find('.btn-submit'),
            $select = $form.find('select'),
            $selectValue = $form.find('.selectValue'),
            $phone = $form.find('#phone'),
            $errorMsg = $('.error-message');

        init();

        function init() {
            enableSubmit();
            bindEvents();

            $selectValue.each(function(){
                var value = $(this).next('select').find('option:selected').text();
                $(this).html(value);
            })
        }

        function bindEvents() {
            $required.on('input', enableSubmit);

            $form.submit(function () {
                if (!IsMobile($phone.val())) {
                    $errorMsg.empty().html('*请输入有效的手机号码').css('visibility', 'visible');
                    $phone.focus();
                    return false;
                }

                // $.ajax({
                //     type: 'POST',
                //     url: cityshopBaseUrl + '/Profile/AjaxSaveAddress',
                //     dataType: 'json',
                //     data: {
                //         RecipientName: $form.find('#name').val(),
                //         CellPhone: $form.find('#phone').val(),
                //         ProvinceId: $form.find('#Address_ProvinceId').val(),
                //         CityId: $form.find('#Address_CityId').val(),
                //         DistrictId: $form.find('#Address_DistrictId').val(),
                //         DeliverAddressKey: $form.find('#hfAddrKey').val(),
                //         DetailAddress: $form.find('#addr').val(),
                //         IsDefault: $form.find('#iDefault').is(':checked')
                //     },
                //     cache: false,
                //     success: function (data) {
                //         if (data.result) {
                //             $('#message-box').html('保存成功').fadeIn().delay(1000).fadeOut(300, function(){
                //                 window.location.href = document.location.origin + "/profile/addresslist?checkstep=" + iCheckStep;
                //             })
                //         } else {
                //             $('#message-box').html('保存失败').fadeIn().delay(1000).fadeOut(300);
                //         }
                //     }
                // })

                return false;
            })

            $select.on('change', function(){
                $(this).prev('.selectValue').html($(this).find('option:selected').text());
                enableSubmit();
            })
        }

        function enableSubmit() {
            var enable = true;

            for (var i = 0; i < $required.length; i++) {
                if ($required.eq(i).val().length <= 0) {
                    enable = false;
                    break;
                }

                enable = true;
            }

            if (enable) {
                $btnSubmit.removeAttr('disabled').removeClass('btn-disabled');
            } else {
                $btnSubmit.attr('disabled', 'disabled').addClass('btn-disabled');
            }
        }

        // 验证手机号码
        function IsMobile(value) {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value)
        }
    })
})