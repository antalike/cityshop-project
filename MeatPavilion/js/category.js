$(function() {

	$('.filter-list').each(function() {
		var $this = $(this),
			$overlay = $('.overlay');

		var $popup = $this.closest('.scrollable').find('.popup-wrapper');

		$this.find('li').on('click', function() {

			$popup.show();
			$overlay.show();
				$popup.find('.recipe-tab-nav li').on('click', function() {
					var index = $(this).index();
					$popup.find('.recipe-tab-content > div').css('visibility', '');
					$(this).addClass('highlight').siblings().removeClass('highlight');
					$popup.find('.recipe-tab-content > div').eq(index).show().siblings().hide();
				})

				$('.recipe-tab-scroll').jScrollPane({
					showArrows: false
				});

			return false;

		});

		$popup.find('.close').on('click', function() {

			$popup.hide();
			$overlay.hide();
			return false;

		});
	});


	$('.sub-section').each(function() {
		var $this = $(this),
			$tabNav = $this.find('.category-nav > li'),
			$title = $this.find('.category-title > img'),
			$tabContent = $this.find('.category-tab'),
			src = $title.attr('src');

		$tabNav.on('click', function() {

			var index = $(this).index();

			src = src.substring(0, src.indexOf('.') - 1) + (index + 1) + '.png';

			$title.attr('src', src);
			$(this).addClass('highlight').siblings().removeClass('highlight');
			$tabContent.eq(index).show().siblings().hide();
			return false;
		})
	});


	$('.clearField').clearField();

	$("#main_box .select_box span").hover(function() {
		$(this).parent().find("ul.son_ul").css("visibility", "visible");
		$(this).parent().find("ul.son_ul").slideDown("fast");
		$(this).parent().find("li").hover(function() {
			$(this).addClass("hover")
		}, function() {
			$(this).removeClass("hover")
		});
		$(this).parent().hover(function() {}, function() {
			var ie6 = !-[1, ] && !window.XMLHttpRequest;
			if (!ie6) {
				$(this).parent().find("ul.son_ul").slideUp("fast")
			}
			$(this).parent().find("ul.son_ul").css("visibility", "hidden")
		})
	}, function() {});

	$("#main_box ul.son_ul li").click(function() {
		$(this).parents("li").find("span").html($(this).html());
		var ie6 = !-[1, ] && !window.XMLHttpRequest;
		if (!ie6) {
			$(this).parents("li").find("ul").slideUp()
		}
		$(this).parents("li").find("ul").css("visibility", "hidden");
		$("#searchCategory").val($(this).attr("index"))
	});

	$('#pavilion_main_box .select_box span').hover(function(){
		$(this).siblings('.son_ul').fadeIn('fast');
		$(this).parent().hover(function() {}, function() {
			$(this).children('.son_ul').fadeOut('fast');
		});
	})

	$('#pavilion_main_box .son_ul li').on('click', function() {
		$(this).parents("li").find("span").html($(this).html());
		$(this).parents('.son_ul').hide();
		$("#searcMeatCategory").val($(this).attr("index"));
	})

})