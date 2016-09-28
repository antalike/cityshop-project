$(document).ready(function () {
    var $window = $(window),
        $container = $('#products-list').find('.cs-products'),
        $toolbar = $container.find('.products-toolbar'),
        $btnFilter = $toolbar.find('.btn-filter'),
        $btnOrder = $toolbar.find('.btn-order'),
        $productsWrapper = $container.find('.products-block'),
        $loading = $container.find('.loading');

    var windowHeight = $window.height(),
        headerHeight = $('#header').height(),
        toolbarTop = $toolbar.offset().top;

    // 筛选部分
    $('#filter-shift').each(function () {
        var $window = $(window),
            $target = $('#filter-shift'),
            $trigger = $('.trigger-filter'),
            $header = $target.find('header');
            $scroll = $target.find('.scroll-wrapper'),
            $btnClose = $target.find('.btn-close'),
            $btnConfirm = $target.find('.btn-confirm'),
            $overlay = $('.modal-overlay');

        var window_width = $window.width();
        var target_width = window_width * .85;
        var translateX = window_width * .15;

        $window.resize(function(){
            window_width = $window.width();
            target_width = window_width * .85;
            translateX = window_width * .15;

            var initValue = $target.hasClass('open') ? translateX : window_width;
            $target.css({
                "width": target_width,
                "-webkit-transform": "translatex(" + initValue + "px)",
                "-moz-transform": "translatex(" + initValue + "px)",
                "-ms-transform": "translatex(" + initValue + "px)",
                "-o-transform": "translatex(" + initValue + "px)",
                "transform": "translatex(" + initValue + "px)"
            });

            $header.css({
                "-ms-transform": "translatex(" + window_width + "px)"
            });

            $scroll.css({
                overflow: 'scroll',
                height: $(window).height() - $header.outerHeight(true)
            })

            $header.css('width', target_width);
        })

        var disableScroll = function () {
            $(document).on('mousewheel', preventDefault);
            $(document).on('touchmove', preventDefault);
        };

        var enableScroll = function () {
            $(document).off('mousewheel', preventDefault);
            $(document).off('touchmove', preventDefault);
        };

        $target.css({
            "width": target_width,
            "-webkit-transform": "translatex(" + window_width + "px)",
            "-moz-transform": "translatex(" + window_width + "px)",
            "-ms-transform": "translatex(" + window_width + "px)",
            "-o-transform": "translatex(" + window_width + "px)",
            "transform": "translatex(" + window_width + "px)"
        });
        $header.css({
            "-ms-transform": "translatex(" + window_width + "px)"
        });

        $scroll.css({
            overflow: 'scroll',
            height: $(window).height() - $target.find('header').outerHeight(true)
        })

        $header.css('width', target_width);

        $trigger.on('click', function () {
            $scroll.scrollUnique();
            $overlay.fadeIn();
            disableScroll();
            $target.addClass('open');

            var e = {
                "-webkit-transform": "translatex(" + translateX + "px)",
                "-moz-transform": "translatex(" + translateX + "px)",
                "-ms-transform": "translatex(" + translateX + "px)",
                "-o-transform": "translatex(" + translateX + "px)",
                "transform": "translatex(" + translateX + "px)",
                "-webkit-transition": "0.2s ease 0s",
                "-moz-transition": "0.2s ease 0s",
                "-ms-transition": "0.2s ease 0s",
                "-o-transition": "0.2s ease 0s",
                "transition": "0.2s ease 0s"
            }

            $target.css(e);
            $header.css({
                "-ms-transform": "translatex(" + translateX + "px)",
                "-ms-transition": "0.2s ease 0s"
            });
            setTimeout(function () {
                var g = {
                    "-webkit-transform": "translatex(" + translateX + "px)",
                    "-moz-transform": "translatex(" + translateX + "px)",
                    "-ms-transform": "translatex(" + translateX + "px)",
                    "-o-transform": "translatex(" + translateX + "px)",
                    "transform": "translatex(" + translateX + "px)",
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-ms-transition": "",
                    "-o-transition": "",
                    "transition": ""
                };
                $target.css(g);
                $header.css({
                    "-ms-transform": "translatex(" + translateX + "px)",
                    "-ms-transition": "",
                });
            }, 200)
        })

        $btnClose.on('click', function () {
            $overlay.fadeOut();
            enableScroll();
            $target.removeClass('open');

            var e = {
                "-webkit-transform": "translatex(" + window_width + "px)",
                "-moz-transform": "translatex(" + window_width + "px)",
                "-ms-transform": "translatex(" + window_width + "px)",
                "-o-transform": "translatex(" + window_width + "px)",
                "transform": "translatex(" + window_width + "px)",
                "-webkit-transition": "0.2s ease 0s",
                "-moz-transition": "0.2s ease 0s",
                "-ms-transition": "0.2s ease 0s",
                "-o-transition": "0.2s ease 0s",
                "transition": "0.2s ease 0s"
            }

            $target.css(e);
            $header.css({
               "-ms-transform": "translatex(" + window_width + "px)",
               "-ms-transition": "0.2s ease 0s",
            });
            setTimeout(function () {
                var g = {
                    "-webkit-transform": "translatex(" + window_width + "px)",
                    "-moz-transform": "translatex(" + window_width + "px)",
                    "-ms-transform": "translatex(" + window_width + "px)",
                    "-o-transform": "translatex(" + window_width + "px)",
                    "transform": "translatex(" + window_width + "px)",
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-ms-transition": "",
                    "-o-transition": "",
                    "transition": ""
                };
                $target.css(g);
                $header.css({
                   "-ms-transform": "translatex(" + window_width + "px)",
                   "-ms-transition": "",
                });
            }, 200)
        })

        $btnConfirm.on('click', function () {
            $overlay.fadeOut();
            enableScroll();
            $target.removeClass('open');

            var e = {
                "-webkit-transform": "translatex(" + window_width + "px)",
                "-moz-transform": "translatex(" + window_width + "px)",
                "-ms-transform": "translatex(" + window_width + "px)",
                "-o-transform": "translatex(" + window_width + "px)",
                "transform": "translatex(" + window_width + "px)",
                "-webkit-transition": "0.2s ease 0s",
                "-moz-transition": "0.2s ease 0s",
                "-ms-transition": "0.2s ease 0s",
                "-o-transition": "0.2s ease 0s",
                "transition": "0.2s ease 0s"
            }

            $target.css(e);
            $header.css({
               "-ms-transform": "translatex(" + window_width + "px)",
               "-ms-transition": "0.2s ease 0s",
            });
            setTimeout(function () {
                var g = {
                    "-webkit-transform": "translateX(" + window_width + "px)",
                    "-moz-transform": "translateX(" + window_width + "px)",
                    "-ms-transform": "translateX(" + window_width + "px)",
                    "-o-transform": "translateX(" + window_width + "px)",
                    "transform": "translateX(" + window_width + "px)",
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-ms-transition": "",
                    "-o-transition": "",
                    "transition": ""
                };
                $target.css(g);
                $header.css({
                   "-ms-transform": "translateX(" + window_width + "px)",
                   "-ms-transition": "",
                });
            }, 200)
        })

        //价格区间 
        $('#filter-form').find('.input-price').blur(function () {
            var value = $(this).val();
            if (value.length <= 0) {
                $(this).val('');
            } else {
                $(this).val(parseFloat(value).toFixed(2));
            }
        })
    })

})