$(document).ready(function(){
	$('.input-radio').button({
		icons: {
			primary: "ui-icon-radio"
		  }
	});

	$('.input-checkbox').button({
		icons: {
			primary: "ui-icon-checkbox"
		  }
	});

	$('#birthday').datepicker({
		changeMonth: true,
		changeYear: true,
		yearRange: "1920:c+10",
		dateFormat: "yy-mm-dd"
	});

	signUp();
})

function signUp() {
	var $form = $('#signup-form'),
		$submit = $form.find('input[type=submit]'),
		$required = $form.find('.required'),
		$region = $form.find('.region'),
		$telephone = $form.find('#telephone'),
		$captcha = $form.find('#captcha'),
		$btn_getCaptcha = $form.find(".btn-get-captcha");

	var len_telephone = $telephone.val().length,
		len_captcha = $captcha.val().length,
		flag_captcha = true,
		firstFocus = 0;


	bindEvents();

	function bindEvents() {
		enable_getCaptcha();

		len_telephone = $telephone.on('input', function() {
			len_telephone = this.value.length;
			enable_getCaptcha();
		}).val().length;

		$required.on('input', function() {
			var $this = $(this);

			if($this.val().length <= 0) {
				$this.parent().find('.error-message').html('提示：' + $this.data('message'));
			} else if($this.val().length > 0 && $this.attr('name') == 'telephone' && !validate_telphone($telephone.val())) {
				$this.parent().find('.error-message').html('提示：手机号码格式不正确');
			} else {
				$this.parent().find('.error-message').html('');
			}
		})

		$region.on('change', function() {
			for(var i=0; i<$region.length; i++) {
				var $this = $region.eq(i);
				if($this.val() == 0) {
					$this.parent().find('.error-message').html('提示：' + $this.data('message'));
					break;
				} else {
					$this.parent().find('.error-message').html('');
				}
			}
		})

		$form.find('#birthday').on('change', function(){
			var $this = $(this);
			if($this.val().length > 0) {
				$this.parent().find('.error-message').html('');
			}
		})

		// 表单提交
		$submit.on('click', function() {
			validate_form();

			if(enable_submit()) {
				$('#message-box').fadeIn().delay(2000).fadeOut();
			}

			return false;
		})

		// 获取验证码
		$btn_getCaptcha.on('click', function(){
			countDown(60);
			return false
		})
	}

	// 表单验证
	function validate_form() {

		for(var i=0; i<$required.length; i++) {
			var $this = $required.eq(i);
			if($this.val().length <= 0) {
				firstFocus  = i;
				break;
			}
		}

		for(var i=0; i<$required.length; i++) {
			var $this = $required.eq(i);
			if($this.val().length <= 0) {
				$this.parent().find('.error-message').html('提示：' + $this.data('message'));
			}
		}

		for(var i=0; i<$region.length; i++) {
			var $this = $region.eq(i);
			if($this.val() == 0) {
				$this.parent().find('.error-message').html('提示：' + $this.data('message'));
			}
		}

		if($telephone.val().length > 0 && !validate_telphone($telephone.val())) {
			$this.parent().find('.error-message').html('提示：手机号码格式不正确');
		}

		$required.eq(firstFocus).focus();
	}

	// 是否允许提交表单
	function enable_submit(){
		var _required = false,
			_region = false,
			_iAgree = false,
			_enable_submit = false;

		for(var i=0; i<$required.length; i++) {
			var $this = $required.eq(i);
			if($this.val().length <= 0) {
				_required = false;
				break;
			} else {
				_required = true
			}
		}

		for(var i=0; i<$region.length; i++) {
			var $this = $region.eq(i);
			if($this.val() == 0) {
				_region = false;
				break;
			} else {
				_region = true
			}
		}

		_iAgree = ($('#iAgree').is(':checked')) ?true : false;

		if( _required && _region && _iAgree ) {
			_enable_submit = true
		}

		return _enable_submit;
	}

	// 是否允许获取验证阿明
	function enable_getCaptcha() {
		if ( len_telephone && validate_telphone($telephone.val()) && flag_captcha ) {
			$btn_getCaptcha.removeAttr('disabled').removeClass('btn-disabled');
		} else {
			$btn_getCaptcha.attr('disabled', 'disabled').addClass('btn-disabled');
		}
	}

	// 验证手机号码
	function validate_telphone(value) {
		return /^(13|15|18|14|17)[0-9]{9}$/.test(value)
	}

	// 获取验证码倒计时
	function countDown(time){
		var value = time;
		if(time == 0) {
			$btn_getCaptcha.removeAttr('disabled').removeClass('btn-disabled');
			$btn_getCaptcha.html('获取');
			time = value;
			flag_captcha = true;
			enable_getCaptcha();
			return false
		} else {
			$btn_getCaptcha.attr('disabled', 'disabled').addClass('btn-disabled');
			$btn_getCaptcha.html('重新获取('+ time +')');
			time--;
			flag_captcha = false;
		}

		setTimeout(function() { 
			countDown(time) 
		},1000)
	}
}

