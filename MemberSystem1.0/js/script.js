$(document).ready(function() {
	mPhoneBinding();
})

function mPhoneBinding() {
	var $mPhoneForm = $('#m-phone-form'),
		$submit = $mPhoneForm.find('input[type=submit]'),
		$telephone = $mPhoneForm.find('#telephone'),
		$captcha = $mPhoneForm.find('#captcha'),
		$btn_getCaptcha = $mPhoneForm.find(".btn-get-captcha");

	var len_telephone = $telephone.val().length,
		len_captcha = $captcha.val().length,
		flag = true;

	enable_binding();
	enable_getCaptcha($telephone.val(), flag);
	bindEvents();

	function bindEvents() {

		len_telephone = $telephone.on('input', function() {
			len_telephone = this.value.length;
			enable_getCaptcha(this.value, flag);
			enable_binding();
		}).val().length;

		len_captcha = $captcha.on('input', function() {
			len_captcha = this.value.length;
			enable_binding();
		}).val().length;

		// 表单提交
		$submit.on('click', function() {
			$('#message-box').fadeIn().delay(2000).fadeOut(function(){
				window.location.href = 'profile.html'
			});
			return false;
		})

		// 获取验证码
		$btn_getCaptcha.on('click', function(){
			countDown(5);
			return false
		})
	}

	//判断是否允许提交表单
	function enable_binding() {
		if (len_telephone && len_captcha) {
			$submit.removeAttr('disabled').removeClass('btn-disabled')
		} else {
			$submit.attr('disabled', 'disabled').addClass('btn-disabled')
		}
	}

	// 判断是否允许获取验证码
	function enable_getCaptcha(value, flag) {
		if (len_telephone && validate_telphone(value) && flag) {
			$btn_getCaptcha.removeAttr('disabled').removeClass('btn-disabled');
			console.log('1')
		} else {
			$btn_getCaptcha.attr('disabled', 'disabled').addClass('btn-disabled');
			console.log('2')
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
			flag = true;
			enable_getCaptcha($telephone.val(), flag);
			return false
		} else {
			$btn_getCaptcha.attr('disabled', 'disabled').addClass('btn-disabled');
			$btn_getCaptcha.html('重新获取('+ time +')');
			time--;
			flag = false;
		}

		setTimeout(function() { 
			countDown(time) 
		},1000)
	}

}