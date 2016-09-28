$(document).ready(function () {
    var storage = window.localStorage;
    var clickEvent = (('ontouchend' in window)) ? 'touchend' : 'click';

    $('.form-group').each(function () {
        var $this = $(this),
            $required = $this.find('.required'),
            $btnSubmit = $this.find('.btn-submit'),
            $btnGetCaptcha = $this.find('.btn-getCaptcha');

        init();

        // 初始化
        function init() {
            enableSubmit();
            bindEvents();
        }

        // 事件绑定
        function bindEvents() {
            $required.on('input', enableSubmit);
            $this.find('.valiCode').on(clickEvent, function () {
                $(this).attr("src", "../Home/GetValidateCode?time=" + (new Date()).getTime());
            })
        }

        // 必填选项是否填写
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
    })

    // 注册
    $('#register-form').each(function () {
        var $this = $(this),
            $btnSubmit = $this.find('.btn-submit'),
            $errorMsg = $this.find('.error-message'),
            $btnGetCaptcha = $this.find('.btn-getCaptcha'),
            $userDisplayName = $this.find('#UserDisplayName'),
            $telephone = $this.find('#MobilePhone'),
            $password = $this.find('#Password'),
            $confirmPassword = $this.find('#ConfirmPassword'),
            $validateCode = $this.find('#ValidateCode'),
            $imgValidateCode = $this.find('#ImgValidateCode');

        $btnGetCaptcha.on(clickEvent, function () {
            $errorMsg.html('').css('visibility', 'hidden');

            if ($telephone.val().length <= 0) {
                $errorMsg.html('请输入手机号码').css('visibility', 'visible');
                $telephone.focus();
                return false;
            }

            if (!IsMobile($telephone.val())) {
                $errorMsg.html('请输入有效的手机号码').css('visibility', 'visible');
                $telephone.focus();
                return false;
            }

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/GetMobileValidateCode',
                data: { mobile: $telephone.val(), lang: "zh-cn", ImgValidateCode: $imgValidateCode.val() },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        countDown(120, $btnGetCaptcha);
                    } else {
                        $errorMsg.html(data.ErrorMsg).css('visibility', 'visible');
                        if (data.ErrorCode) {
                            $imgValidateCode.focus();

                            if (data.ErrorCode == 1 || data.ErrorCode == 3) {
                                $this.find('.valiCode').attr("src", "../Home/GetValidateCode?time=" + (new Date()).getTime());
                                $imgValidateCode.val('');
                            }
                        }
                    }
                }
            })
        })

        $password.blur(function () {
            if ($password.val().length < 6) {
                $errorMsg.empty().html('请至少输入6位新密码').css('visibility', 'visible');
                return false;
            }
        })

        $confirmPassword.blur(function () {
            iSamePassword();
        })

        $btnSubmit.on(clickEvent, function () {

            var data = {
                UserDisplayName: $userDisplayName.val(),
                MobilePhone: $telephone.val(),
                ValidateCode: $validateCode.val(),
                Password: $password.val(),
                ConfirmPassword: $confirmPassword.val(),
                Name: '-',
                BirthDate: '1970/01/01',
                Gende: '1',
                CertType: '1',
                MemberCertNum: '-',
                Address: '-',
                ZipCode: '-',
                ImgValidateCode: $imgValidateCode.val()
            };

            $password.blur(function () {
                if ($password.val().length < 6) {
                    $errorMsg.empty().html('请至少输入6位新密码').css('visibility', 'visible');
                    return false;
                }
            })

            if (!iSamePassword()) {
                return false;
            }

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/RegisterMemberService',
                data: data,
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.result) {
                        $('#message-box').html('注册成功！').fadeIn().delay(1000).fadeOut(300, function () {
                            window.location.href = document.location.origin + "/Account/LogOn";
                        })

                    } else {
                        $errorMsg.html(data.msg).css('visibility', 'visible');
                        if (data.ErrorCode) {
                            $imgValidateCode.focus();

                            if (data.ErrorCode == 1 || data.ErrorCode == 3) {
                                $this.find('.valiCode').attr("src", "../Home/GetValidateCode?time=" + (new Date()).getTime());
                                $imgValidateCode.val('');
                            }
                        }
                    }
                }
            })

            return false;
        })

        function iSamePassword() {
            var password = $password.val();
            var repassword = $confirmPassword.val();

            if (password != repassword) {
                $errorMsg.html('两次输入的密码不一致，请重新输入').css('visibility', 'visible');
                $confirmPassword.val('').focus();
                return false;
            }

            $errorMsg.html('').css('visibility', 'hidden');
            return true;
        }
    })

    // 找回密码
    $('#retrievePwd-Step1').each(function () {
        var $this = $(this);
        var $btnSubmit = $this.find('.btn-submit');
        var $errorMsg = $this.find('.error-message');
        var $imgValidateCode = $this.find('#ImgValidateCode');

        $btnSubmit.on(clickEvent, function () {
            var account = $('#account').val();

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/GetRetriveValidateCode',
                data: { mobile: account, ImgValidateCode: $imgValidateCode.val() },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        storage.setItem('ImgValidateCode', $imgValidateCode.val());
                        storage.setItem('account', account);
                        window.location.href = document.location.origin + '/Account/RetrivePasswordStepTwo';
                    } else {
                        $errorMsg.empty().html(data.ErrorMsg).css('visibility', 'visible');
                        if (data.ErrorCode) {
                            $imgValidateCode.focus();

                            if (data.ErrorCode == 1) {
                                $this.find('.valiCode').attr("src", "../Home/GetValidateCode?time=" + (new Date()).getTime());
                                $imgValidateCode.val('');
                            }
                        }
                    }
                }
            })
        })
    })

    $('#retrievePwd-Step2').each(function () {
        var $this = $(this);
        var $btnSubmit = $this.find('.btn-submit');
        var $errorMsg = $this.find('.error-message');
        var $btnGetCaptcha = $this.find('.btn-getCaptcha');

        $('#showAccount').html(storage.getItem('account'));
        countDown(120, $btnGetCaptcha);

        $btnGetCaptcha.on(clickEvent, function () {
            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/GetRetriveValidateCode',
                data: { mobile: storage.getItem('account'), ImgValidateCode: storage.getItem('ImgValidateCode') },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        countDown(120, $btnGetCaptcha);
                    } else {
                        $errorMsg.empty().html(data.ErrorMsg).css('visibility', 'visible');
                    }
                }
            })
        })

        $btnSubmit.on(clickEvent, function () {
            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/AjaxCheckValidateCode',
                data: { ValidateCode: $('#captcha').val() },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        storage.setItem('captcha', $('#captcha').val());
                        window.location.href = document.location.origin + '/Account/RetrivePasswordStepThree';
                    } else {
                        $errorMsg.empty().html(data.ErrorMsg).css('visibility', 'visible');
                    }
                }
            })
        })
    })

    $('#retrievePwd-Step3').each(function () {
        var $this = $(this);
        var $btnSubmit = $this.find('.btn-submit');
        var $errorMsg = $this.find('.error-message');
        var $password = $this.find('#password');
        var $repassword = $this.find('#rePassword');

        $password.blur(function () {
            if ($password.val().length < 6) {
                $errorMsg.empty().html('请至少输入6位新密码').css('visibility', 'visible');
                return false;
            }
        })

        $repassword.blur(function () {
            iSamePassword();
        })

        $('#retrievePwd-form').submit(function () {
            $password.blur(function () {
                if ($password.val().length < 6) {
                    $errorMsg.empty().html('请至少输入6位新密码').css('visibility', 'visible');
                    return false;
                }
            })

            if (!iSamePassword()) {
                return false;
            }

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/AjaxRetrivePasswordByMobileorEmail',
                data: { mobileoremail: storage.getItem('account'), password: $password.val(), ValidateCode: storage.getItem('captcha') },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        $('#message-box').html('修改成功').fadeIn().delay(1000).fadeOut(300, function () {
                            storage.removeItem('account');
                            storage.removeItem('captcha');
                            storage.removeItem('ImgValidateCode');
                            window.location.href = document.location.origin + "/Account/LogOn";
                        })
                    } else {
                        $errorMsg.empty().html(data.ErrorMsg).css('visibility', 'visible');
                    }
                }
            })

            return false;
        })

        function iSamePassword() {
            var password = $password.val();
            var repassword = $repassword.val();

            if (password != repassword) {
                $errorMsg.html('两次输入的密码不一致，请重新输入').css('visibility', 'visible');
                $repassword.val('').focus();
                return false;
            }

            $errorMsg.html('').css('visibility', 'hidden');
            return true;
        }
    })

    // 手机绑定
    $('#mobileBinding-form').each(function () {
        var $this = $(this),
            $btnSubmit = $this.find('.btn-submit'),
            $errorMsg = $this.find('.error-message'),
            $btnGetCaptcha = $this.find('.btn-getCaptcha'),
            $telephone = $this.find('#MobilePhone'),
            $validateCode = $this.find('#ValidateCode'),
            $imgValidateCode = $this.find('#ImgValidateCode');

        $btnGetCaptcha.on(clickEvent, function () {
            $errorMsg.html('').css('visibility', 'hidden');

            if ($telephone.val().length <= 0) {
                $errorMsg.html('请输入手机号码').css('visibility', 'visible');
                $telephone.focus();
                return false;
            }

            if (!IsMobile($telephone.val())) {
                $errorMsg.html('请输入有效的手机号码').css('visibility', 'visible');
                $telephone.focus();
                return false;
            }

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/GetMobileValidateCode',
                data: { mobile: $telephone.val(), lang: "zh-cn", ImgValidateCode: $imgValidateCode.val() },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        countDown(120, $btnGetCaptcha);
                    } else {
                        $errorMsg.html(data.ErrorMsg).css('visibility', 'visible');
                        if (data.ErrorCode) {
                            $imgValidateCode.focus();

                            if (data.ErrorCode == 1 || data.ErrorCode == 3) {
                                $this.find('.valiCode').attr("src", "../Home/GetValidateCode?time=" + (new Date()).getTime());
                                $imgValidateCode.val('');
                            }
                        }
                    }
                }
            })
        })

        $btnSubmit.on(clickEvent, function () {
            if ($telephone.val().length <= 0) {
                $errorMsg.html('请输入手机号码').css('visibility', 'visible');
                $telephone.focus();
                return false;
            }

            if (!IsMobile($telephone.val())) {
                $errorMsg.html('请输入有效的手机号码').css('visibility', 'visible');
                $telephone.focus();
                return false;
            }

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/MobileBindingToMember',
                data: {
                    mobile: $telephone.val(),
                    ValidateCode: $validateCode.val(),
                    ImgValidateCode: $imgValidateCode.val()
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.result) {
                        $('#message-box').html('绑定成功').fadeIn().delay(1000).fadeOut(300, function () {
                            window.location.href = document.location.origin + "/Profile/profile";
                        })

                    } else {
                        $errorMsg.empty().html(data.ErrorMsg).css('visibility', 'visible');
                    }
                }
            })

            return false;
        })
    })

    // 编辑会员信息
    $('#memberInfo-form').each(function () {
        var $this = $(this),
            $select = $this.find('select'),
            $selectValue = $this.find('.selectValue'),
            $birthDate = $this.find('#BirthDate'),
            $btnChange = $this.find('.btn-change'),
            $btnSubmit = $this.find('.btn-submit'),
            $errorMsg = $this.find('.error-message');

        var $dialogBox = $('#dialog-box'),
            $btnConfirm = $dialogBox.find('.btn-confirm'),
            $overlay = $('.modal-overlay');

        var disableScroll = function () {
            $(document).on('mousewheel', preventDefault);
            $(document).on('touchmove', preventDefault);
        };

        var enableScroll = function () {
            $(document).off('mousewheel', preventDefault);
            $(document).off('touchmove', preventDefault);
        };

        $birthDate.datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "1950:+10",
            dateFormat: "yy/mm/dd"
        });

        $selectValue.each(function () {
            var value = $(this).next('select').find('option:selected').text();
            $(this).html(value);
        })

        $select.on('change', function () {
            $(this).prev('.selectValue').html($(this).find('option:selected').text());
        })

        $btnChange.on(clickEvent, function () {
            if ($dialogBox.is(':hidden')) {
                $dialogBox.show();
                $overlay.show();
                disableScroll();
            } else {
                $dialogBox.hide();
                $overlay.hide();
                enableScroll();
            }
            return false;
        })

        //取消对话框
        $btnConfirm.on(clickEvent, function () {
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
    })

    //修改密码
    $('#changePassword-form').each(function () {
        var $this = $(this),
            $oldPassword = $this.find('#OldPassword'),
            $password = $this.find('#NewPassword'),
            $confirmPassword = $this.find('#ConfirmPassword'),
            $imgValidateCode = $this.find('#ImgValidateCode'),
            $btnSubmit = $this.find('.btn-submit'),
            $errorMsg = $this.find('.error-message');

        $password.blur(function () {
            if ($password.val().length < 6) {
                $errorMsg.empty().html('请至少输入6位新密码').css('visibility', 'visible');
                return false;
            }
        })

        $confirmPassword.blur(function () {
            iSamePassword();
        })

        $btnSubmit.on(clickEvent, function () {
            if ($password.val().length < 6) {
                $errorMsg.empty().html('请至少输入6位新密码').css('visibility', 'visible');
                return false;
            }

            if (!iSamePassword()) {
                return false;
            }

            $.ajax({
                type: 'POST',
                url: cityshopBaseUrl + '/Account/ChangePassword',
                data: {
                    OldPassword: $oldPassword.val(),
                    NewPassword: $password.val(),
                    ImgValidateCode: $imgValidateCode.val()
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    if (data.Result) {
                        $('#message-box').html('修改成功').fadeIn().delay(1000).fadeOut(300, function () {
                            window.location.href = document.location.origin + "/Profile/profile";
                        })

                    } else {
                        $errorMsg.empty().html(data.ErrorMsg).css('visibility', 'visible');
                        $this.find('.valiCode').attr("src", "../Home/GetValidateCode?time=" + (new Date()).getTime());
                        $imgValidateCode.val('');
                    }
                },
                error: function () {
                    alert('ok');
                }
            });

            return false;
        })

        function iSamePassword() {
            var password = $password.val();
            var repassword = $confirmPassword.val();

            if (repassword.length > 0 && password != repassword) {
                $errorMsg.html('两次输入的密码不一致，请重新输入').css('visibility', 'visible');
                return false;
            }

            $errorMsg.html('').css('visibility', 'hidden');
            return true;
        }
    })
})

// 验证码倒计时
function countDown(time, $btnGetCaptcha) {
    var value = time;
    if (time == 0) {
        $btnGetCaptcha.val('发送验证码').removeClass('disabled').removeAttr('disabled');
        time = value;
        return false;
    } else {
        $btnGetCaptcha.val('重新发送(' + time + '秒)').addClass('disabled').attr('disabled', 'disabled');
        time--;
    }

    setTimeout(function () {
        countDown(time, $btnGetCaptcha)
    }, 1000)
}

// 验证手机号码
function IsMobile(value) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
}

// 验证邮箱
function IsEmail(value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
}