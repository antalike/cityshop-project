$(function() {

	$('.scrollable').each(function() {

		var $element = $(this),
			$prev, $next,
			$list = $element.find('.filter-list ul'),
			active = 0,
			animating = false,
			translation = 0;

		init();

		function init() {

			var $mainFilter = $element.find('.filter-main'),
				$subFilter = $element.find('.filter-sub');
			var $scrollContainer = $element.children('.scroll-section').wrapAll('<div class="scroll-container">').parent().css({
				position: 'relative',
				overflow: 'hidden',
				height: 540
			});
			var $directionNav = $('<div class="scroll-direction-nav"><a href="#" class="scroll-prev" data-dir="prev">prev</a><a href="#" class="scroll-next" data-dir="next">next</a></div>').appendTo($element);
			$prev = $directionNav.find('.scroll-prev'),
			$next = $directionNav.find('.scroll-next');
			toggleControl('prev', false);
			toggleControl('next', false);

			$scrollContainer.children().eq(1).css({
				position: 'absolute',
				top: '100%',
				marginTop: -$mainFilter.height()
			});

			$list.css({
				position: 'relative',
				top: 0
			}).parent().css({
				position: 'relative'
			});

			$mainFilter.children('a').on('click', function() {
				if (active === 0) {
					scrollToTop(1);
				}

				$(this).addClass('currentSelect').siblings().removeClass('currentSelect');
				refreshList();

				return false;
			});

			$subFilter.children('a').on( 'click', function() {

				$( this ).addClass( 'currentSelect' ).siblings().removeClass( 'currentSelect' );
				refreshList();

				return false;

			});

			$directionNav.find('a').on('click', function() {

				var dir = $(this).data('dir');

				scroll(dir);

				return false;

			})

		}

		function scroll(dir) {

			if (animating) {

				return false;

			}

			animating = true;

			var itemSpace = $list.children('li').outerHeight( true ),
				visibleSpace = $list.parent().height(),
				totalSpace = $list.height(),
				fitCount = Math.floor(visibleSpace / itemSpace),
				amount = fitCount * itemSpace;

			if (dir === 'prev' & $list[0].offsetTop === 0) {
				scrollToTop(0);
			} else {

				if (amount < 0) {
					return false;
				}

				if (dir === 'prev' & Math.abs(translation) - amount < 0) {

					amount = Math.abs(translation);
					toggleControl('next', true);

				} else if (dir === 'next' & totalSpace - (Math.abs(translation) + amount) < visibleSpace) {

					amount = totalSpace - (Math.abs(translation) + visibleSpace);
					toggleControl('next', false);

				} else {

					var ftv = dir === 'next' ? Math.abs(translation) + Math.abs(amount) : Math.abs(translation) - Math.abs(amount);

					if (ftv > 0) {
						toggleControl('prev', true)
					}
					ftv < totalSpace - visibleSpace ? toggleControl('next', true) : toggleControl('next', false);
				}

				tvalue = (dir === 'next') ? translation - amount : translation + amount;

				$list.stop().animate({
					'top': tvalue + 'px'
				}, 300, function() {
					animating = false;
				});

				translation = tvalue;

			}

		}

		function scrollToTop(number) {

			var $scrolls = $element.find('.scroll-section');
			var marginTop1, marginTop2, top;

			if (number === 1) {
				marginTop1 = -$scrolls.eq(0).height();
				marginTop2 = 0;
				top = '7%';
				active = 1;
				toggleControl('prev', true);
			} else if (number === 0) {
				marginTop1 = 0;
				marginTop2 = -$element.find('.filter-main').height();
				top = '100%';
				active = 0;
				toggleControl('prev', false);
				toggleControl('next', false);
			}

			$scrolls.eq(0).animate({
				marginTop: marginTop1
			}, 300).siblings().animate({
				top: top,
				marginTop: marginTop2
			}, 300, function() {
				animating = false;
			});

		}

		function toggleControl(dir, display) {

			if (display) {
				(dir === 'next') ? $next.css('visibility', 'visible') : $prev.css('visibility', 'visible');
			} else {
				(dir === 'next') ? $next.css('visibility', 'hidden') : $prev.css('visibility', 'hidden');
			}

		}

		function refreshList() {

			var totalSpace, visibleSpace;
			totalSpace = $list.height();
			visibleSpace = $list.parent().height();

			$list.css('top', 0);
			translation = 0;

			if (totalSpace > visibleSpace) {
				toggleControl('next', true);
			}

		}
	});
	
})