$(function() {

	var $window = $(window),
		$element = $('#slides'),
		$sidebar = $('#pavilion-sidebar'),
		$slidesContainer = $element.find('.slides-container'),
		$slidesControl = $slidesContainer.find('.slides-control'),
		$slides = $slidesControl.children('.section'),
		$subSlides = $element.find('.sub-section'),
		$directionNav = $element.find('.slides-direction');

	init();

	function init() {

		var _this = this;
		this.data = $.data(this);
		$.data(this, 'current', 0);
		$.data(this, 'animating', false); // 监测是否运动
		$.data(this, "vendorPrefix", getVendorPrefix()); // 浏览器前缀

		update();

		$slides.not(':first').css('visibility', 'hidden');
		$subSlides.wrapAll('<div class="category-slides-control">').parent().css({
			position: 'relative',
			height: '660px'
		});

		$directionNav.on('click', function() {

			var dir = $(this).data('dir');

			$.data(_this, 'direction', dir);

			slide();

			return false;

		});

		$('.pavilion-nav li').on('click', function() {

			var index = $(this).index() + 1;

			if (_this.data.current === 0) {

				slide(index);

			} else {

				slideCategory(index);

			}

			return false;

		});

		$window.bind('resize', function() {

			update();

		});

	}

	function slide(number) {

		this.data = $.data(this);

		var _this = this,
			speed = 300,
			sideWidth = $sidebar.width(),
			translation, left, right, value, next, active, currentSlide;

		if (!this.data.animating) {

			$.data(this, "animating", true);
			currentSlide = this.data.current;

			translation = this.data.width - sideWidth;

			if (this.data.direction === 'next' || number > 0) {

				value = 1;
				active = 1;
				left = 0;
				right = '';
				currentSlide = (this.data.direction === 'next') ? 1 : number;

				$subSlides.eq(currentSlide - 1).css({
					display: 'block',
				}).siblings('.sub-section').css({
					display: 'none',
				})

			} else {

				value = -1;
				active = 0;
				left = '';
				right = 0;
				currentSlide = 0;

			}

			$slides.eq(active).css({
				visibility: '',
				display: 'block',
				left: value * translation
			});

			if (this.data.vendorPrefix) {

				$slidesControl.css({
					'transform': 'translateX(' + (-(translation * value)) + 'px)',
					'transitionDuration': speed + 'ms'
				});

				$sidebar.css({
					'transform': 'translateX(' + (-(translation * value)) + 'px)',
					'transitionDuration': speed + 'ms'
				});

				return $slidesControl.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {

					$slidesControl.css({
						'transform': '',
						'transitionDuration': '0s'
					});

					$slides.eq(active).css('left', 0).siblings().hide();

					$sidebar.css({
						'transform': '',
						'transitionDuration': '0s',
						'left': left,
						'right': right
					});

					$.data(_this, "animating", false);
					$.data(_this, "current", currentSlide);
					$slidesControl.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");

				})

			} else {

				$slidesControl.stop().animate({
					'left': -(translation * value) + 'px'
				}, speed, function() {
					$slidesControl.css('left', 0);
					$slides.eq(active).css('left', 0).siblings().hide();
					$.data(_this, "animating", false);
					$.data(_this, "current", currentSlide);
				});

				if (this.data.direction === 'next' || number > 0) {

					$sidebar.stop().animate({
						right: translation + 'px'
					}, speed, setPosition);

				} else {

					$sidebar.stop().animate({
						left: translation + 'px'
					}, speed, setPosition);

				}

				function setPosition() {

					$sidebar.css({
						'left': left,
						'right': right
					})

				}

			}

		}

	}

	function slideCategory(number) {

		this.data = $.data(this);
		var $subSlidesControl = $('.category-slides-control');

		var _this = this,
			speed = 300,
			translation = 0,
			currentSlide;

		if (!this.data.animating & number !== this.data.current) {

			$.data(this, 'animating', true);
			currentSlide = number;
			translation = this.data.width - $sidebar.width() - 40;

			$subSlides.eq(currentSlide - 1).css({
				left: translation,
				display: 'block',
			})

			if (this.data.vendorPrefix) {

				$subSlidesControl.css({
					'transform': 'translateX(' + (-translation) + 'px)',
					'transitionDuration': speed + 'ms'
				});

				return $subSlidesControl.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {

					$subSlidesControl.css({
						'transform': '',
						'transitionDuration': '0s'
					});

					$subSlides.eq(currentSlide - 1).css('left', 0).siblings().css({
						display: 'none',
					});

					$.data(_this, "animating", false);
					$.data(_this, "current", currentSlide);
					$subSlidesControl.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");

				})

			} else {

				$subSlidesControl.stop().animate({
					left: -translation + 'px'
				}, speed, function() {

					$subSlidesControl.css('left', 0);
					$subSlides.eq(currentSlide - 1).css('left', 0).siblings().css({
						display: 'none'
					});

					$.data(_this, "animating", false);
					$.data(_this, "current", currentSlide);
				})

			}

		}

	}

	function update() {

		this.data = $.data(this);

		var width, height, winWidth;
		winWidth = $window.width();

		if (winWidth < 1280) {
			width = 1280;
		} else if (winWidth > 1537) {
			width = 1537;
		} else {
			width = winWidth;
		}

		$.data(this, "width", width);
		$('#main').css('width', width);
		$slidesContainer.css('width', width)
		$slides.css({
			width: width - 260
		});
		$subSlides.css({
			width: width - 260
		});

	}

	function getVendorPrefix() {

		var body, i, style, transition, vendor;

		body = document.body || document.documentElement;
		style = body.style;
		transition = "transition";
		vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
		transition = transition.charAt(0).toUpperCase() + transition.substr(1);
		i = 0;

		while (i < vendor.length) {

			if (typeof style[vendor[i] + transition] === "string") {
				return vendor[i];
			}

			i++;
		}

		return false;

	}

})