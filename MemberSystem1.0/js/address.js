$(document).ready(function(){
	var $dialog = $('#dialog-box'),
		$btnCancel = $dialog.find('.btn-cancel'),
		$btnConfirm = $dialog.find('.btn-confirm');

	$('.address-block .btn-delete').on('click', function(){
		$dialog.show();
		return false;
	})

	$btnCancel.on('click', function(){
		$dialog.hide();
		return false;
	})

	// 点击“确认”事件
	$btnConfirm.on('click', function(){

		return false;

	})

	// 选择地址
	if($('.input-radio').length > 0) {
		$('.input-radio').button({
			icons: {
				primary: "ui-icon-radio2"
			  }
		});

		$('.address-block').on('click', function(){
			window.location.href = 'checkout.html';
		})
	}
})