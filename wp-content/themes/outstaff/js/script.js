var tabletVer = false,
	mobileVer = false,
	loadFinish = false,
	sectionType_1_AnimDelay = 1250,
	googleMapInitGlobalFunction,
	onYouTubeIframeAPIReady,
	youTubeIframeAPIReady = false;

var outstuff = {
	init: function(){
		self = this;
		
		$(document).ready(function(){
			self.common();
			self.youtubeAPI();
			self.mobileVerCheck();
			self.tabletVerCheck();

			self.loader();
			// $('.loader').hide();
			// loadFinish = true

			self.menuSwitch();
			self.sectionType_1();
			self.sectionType_2();
			self.sectionType_5();
			self.sectionType_8();
			self.sectionType_10();
			self.sectionType_11();
			self.sectionType_13();
			self.sectionType_14();
			self.sectionType_19();
			self.sectionType_22();
			self.sectionType_23();
			self.sectionType_24();
			self.sectionType_25();
			self.sectionType_27();
			self.sectionType_28();
			self.popUp();

			self.googleMap();
		});
	},
	common: function(){
		setTimeout(function(){
			AOS.init({
				offset: 100,
				duration: 600,
				easing: 'ease-in-out'
			});
		}, 300);

		// secondary header
		if ($('.secondary-header')[0]) {
			$('body').addClass('has-secondary-header');
		}
		// secondary header end

		// custom checkbox
		$('.checkbox-outer').each(function(){
			$(this).find('.wpcf7-list-item').append('<div class="custom-checkbox"></div>');
		});
		// custom checkbox end
	},
	youtubeAPI: function() {
		var tag = document.createElement('script');

      	tag.src = "https://www.youtube.com/iframe_api";
      	var firstScriptTag = document.getElementsByTagName('script')[0];
      	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      	onYouTubeIframeAPIReady = function() {
      		youTubeIframeAPIReady = true;
      	};
	},
	mobileVerCheck: function(){
		var windowWidth = $(window).width();

		mobileVer = windowWidth < 768 ? true : false;

		$(window).resize(function(){
			mobileVer = windowWidth < 768 ? true : false;
		});
	},
	tabletVerCheck: function(){
		var windowWidth = $(window).width();

		tabletVer = windowWidth < 1260 ? true : false;

		$(window).resize(function(){
			tabletVer = windowWidth < 1260 ? true : false;
		});
	},
	loader: function(){
		if ($('.loader.loader-home-page')[0]) {
			if (!$('section.type-1')[0]) {
				$('.loader').fadeOut(600); loadFinish = true;
			} else {
				if (Cookies.get('loadFinish') != 'true') {
					$('.loader .loader-background').css('backgroundColor', '#ffffff');
					$('.loader .loader-inner').css('display', 'flex');
				} else {
					$('.loader').delay(200).fadeOut(600); loadFinish = true; sectionType_1_AnimDelay = 0;
				}
			}

			var loaderLogoTL = new TimelineLite(),
				$loaderLines = $('.loader .lines'),
				$loaderLogo = $('.loader .logo-outer svg');

			loaderLogoTL
				.staggerFrom($loaderLogo.find('path'), 0.6, {x:15, opacity:0, ease:Power3.easeOut}, 0.1, 'one')
			loaderLogoTL.timeScale(1.15);
			loaderLogoTL.pause();

			setTimeout(function(){
				loaderLogoTL.play();
			}, 500);

			$('.loader .logo-outer').show();
			$loaderLines.show();

			TweenLite.to($loaderLines.find('div').eq(0), 4, {delay:0.25, width:'100%', ease:Power1.linear});

			var peloaderTimer = setTimeout(function(){
				onLoadFinish();
			}, 4000);

			$(window).on('load', function(){
				// onLoadFinish();
			});

			function onLoadFinish() {
				clearTimeout(peloaderTimer);

				TweenLite.to($loaderLines.find('div').eq(1), 0.6, {width:'100%', ease:Power1.linear});
				TweenLite.to($loaderLines, 0.8, {delay:0.3, opacity:0, y:15, ease:Power3.easeOut});
				TweenLite.to($loaderLogo, 0.8, {delay:0.6, opacity:0, scale:0.9, ase:Power3.easeInOut});
				TweenLite.to('.loader-background', 1.2, {delay:1.44, opacity:0, scale:1.2, ease:Power3.easeInOut});
				TweenLite.to('.loader', 0.6, {delay:1.9, display:'none', ease:Power3.easeOut});

				loaderLogoTL.play();

				loadFinish = true;

				Cookies.set('loadFinish', 'true', {expires: 1});
			}
		} else {
			$('.loader > *').hide();
			$('.loader').fadeOut(500);
		}
	},
	menuSwitch: function(){
		var menuTl = new TimelineMax(),
		    menuToggle = false;
		    $menu = $('.mobile-menu');

		var menuButtonTl = new TimelineLite(),
		    $menuButton = $('.burger');

		menuTl
			.from($menu, 0.01, {display:'none'}, 'one')
			.fromTo($('header .mobile-el-phone-outer'), 0.6, {opacity:1}, {opacity:0, pointerEvents:'none', ease:Power3.easeOut}, 'one')
			.fromTo($menu.find('.background'), 0.6, {width:'0%'}, {width:'100%', ease:Power3.easeOut}, 'one')
			.fromTo($('header .mobile-background'), 0.6, {width:'0%'}, {width:'100%', ease:Power3.easeOut}, 'one')
			.staggerFromTo($menu.find('.items ul li'), 0.6, {opacity:0, x:15}, {delay:0.1, opacity:1, x:0, ease:Power3.easeOut}, 0.1, 'one');
		menuTl.pause();

		menuButtonTl
		    .to($menuButton.find('> *:nth-child(1)'), 0.6, {y:5, ease:Power3.easeOut},'together')
		    .to($menuButton.find('> *:nth-child(3)'), 0.6, {y:-5, ease:Power3.easeOut},'together')
		    .to($menuButton.find('> *:nth-child(2)'), 0.6, {opacity:0, ease:Power3.easeOut},'together')
		    .to($menuButton.find('> *:nth-child(1)'), 0.6, {delay:0.5, rotationZ:45, ease:Power3.easeOut},'together')
		    .to($menuButton.find('> *:nth-child(3)'), 0.6, {delay:0.5, rotationZ:-45, ease:Power3.easeOut},'together');
		menuButtonTl.pause();
		menuButtonTl.timeScale(1.3);

		$menuButton.click(function(){
		    if(menuToggle == false) {
		        menuToggle = true;
		        menuButtonTl.play();
		        menuTl.play();

		        $('header').addClass('menu-opened');
		    } else {
		        menuToggle = false;
		        menuButtonTl.reverse();
		        menuTl.reverse();

		        $('header').removeClass('menu-opened');
		    }
		});
	},
	sectionType_1: function(){
		if ($('section.type-1')[0]) {
			function executeTypeText() {
				var $typedText = $('#typed_text'),
				    strings = $typedText.attr("data-typed-strings") ? $typedText.attr("data-typed-strings").split(",") : [];

			    var typed = new Typed('#typed_text', {
			    	strings: strings,
			    	typeSpeed: 70, //70
			    	backSpeed: 25,
			    	loop: true,
			    	showCursor: true
			    });
			}

		    var TL = new TimelineLite();

		    TL
		    	.staggerFrom($('section.type-1 .el-text-1, section.type-1 .el-text-2, section.type-1 .el-text-3, section.type-1 .el-text-4, section.type-1 .el-button'), 0.75, {delay:0.1, x:-50, opacity:0, ease:Power1.easeInOut}, 0.1, 'first')

		    	.from($('section.type-1 .section-bg-el-1'), 3.5, {delay:0, x:-100, opacity:0, ease:Power3.easeOut}, 'first')
		    	.from($('section.type-1 .section-bg-el-2'), 3, {delay:0.1, x:150, opacity:0.9, ease:Power3.easeOut}, 'first')
		    	.from($('section.type-1 .section-bg-el-3'), 4, {delay:0.2, x:100, opacity:0.9, ease:Power3.easeOut}, 'first')
		    TL.pause();

		    var preLoaderInterval = setInterval(function(){
		    	if (loadFinish == true) {
		    		setTimeout(function(){
		    			TL.play();

		    			executeTypeText();
		    		}, sectionType_1_AnimDelay);
		    
		    		clearInterval(preLoaderInterval);
		    	}
		    }, 100);
		}
	},
	sectionType_2: function(){
		if ($('section.type-2')[0]) {
			if ($('section.type-2.var-a')[0]) {
				(function() {
					var $slider = $('section.type-2.var-a .slider'),
						$control = $('section.type-2.var-a .content .slider .controls .control'),
						totalSlides = $slider.find('ul li').length;

					$slider.find('ul').slick({
						dots: false,
						focusOnSelect: true,
						swipeToSlide: true,
						slidesToShow: 3,
						arrows: false,
						touchThreshold: 15,
						cssEase: 'cubic-bezier(0.660, 0.315, 0.145, 1)',
						speed: 900,
						autoplay: true,
						autoplaySpeed: 10000,
						responsive: [
						    {
						    	breakpoint: 768,
						    	settings: {
						    		centerMode: true,
						        	slidesToShow: 1,
						        	centerPadding: '24%'
						    	}
							}
						]
					});

					$slider.find('ul').on('beforeChange', function(event, slick, currentSlide, nextSlide){
						$slider.find('ul').css('pointer-events', 'none');
					});

					$slider.find('ul').on('afterChange', function(event, slick, currentSlide, nextSlide){
						$slider.find('ul').css('pointer-events', 'all');

						changeSliderTicker();
					});

					$control.on('click', function(){
						if ($(this).index() == 0) {
							$slider.find('ul').slick('slickPrev');
						} else {
							$slider.find('ul').slick('slickNext');
						}
					});

					// slider ticker
					var $slide = $('section.type-2.var-a .slick-slide'),
						$sliderTickerBG_1 = $('section.type-2.var-a .slider-ticker-bg-1'),
						$sliderTickerBG_2 = $('section.type-2.var-a .slider-ticker-bg-2'),
						$sliderTickerBG_3 = $('section.type-2.var-a .slider-ticker-bg-3'),
						$sliderTickerText = $('section.type-2.var-a .slider-ticker-text');

					$sliderTickerText.hide();
					$sliderTickerText.eq(0).show();

					var thisSlideOffsetLeft = $('section.type-2.var-a .slick-current').offset().left,
						sectionWidth = $('section.type-2.var-a').width(),
						slideWidth = $('section.type-2.var-a .slick-current').width();

					$slide.hover(function(){
						var thisSlideOffsetLeft = $(this).offset().left,
							sectionWidth = $('section.type-2.var-a').width(),
							slideWidth = $(this).width(),
							currentSlideIndex = $(this).data('slick-index');

						$slide.removeClass('hovered');
						$(this).addClass('hovered');

						$sliderTickerBG_1.width(thisSlideOffsetLeft);
						$sliderTickerBG_3.width(sectionWidth - thisSlideOffsetLeft - slideWidth);

						$sliderTickerText.stop().fadeOut(300);
						$sliderTickerText.eq(currentSlideIndex).stop().fadeIn(300);
					}, function(){

					});

					$('section.type-2.var-a .slider-ticker-text').each(function(){
						var sliderTickerText = new TimelineMax({repeat: -1});

						sliderTickerText.fromTo($(this), 10, {x:'100%'}, {x:-$(window).width() - $(this).width(), ease:Power0.easeNone});
					});

					setTimeout(function(){
						resizeSliderTickers();
					}, 100);

					$(window).resize(function(){
						setTimeout(function(){
							resizeSliderTickers();
						}, 500);
					});

					function resizeSliderTickers() {
						var thisSlideOffsetLeft = $('section.type-2.var-a .hovered')[0] ? $('section.type-2.var-a .hovered').offset().left : $('section.type-2.var-a .slick-current').offset().left,
							sectionWidth = $('section.type-2.var-a').width(),
							slideWidth = $('section.type-2.var-a .slick-current').width();

						$sliderTickerBG_1.width(thisSlideOffsetLeft);
						$sliderTickerBG_2.width($slide.width());
						$sliderTickerBG_3.width(sectionWidth - thisSlideOffsetLeft - slideWidth);
					}

					function changeSliderTicker() {
						setTimeout(function(){
							var thisSlideOffsetLeft = $('section.type-2.var-a .slick-current').offset().left,
								sectionWidth = $('section.type-2.var-a').width(),
								slideWidth = $('section.type-2.var-a .slick-current').width(),
								currentSlideIndex = $('section.type-2.var-a .slick-current').data('slick-index');

							$slide.removeClass('hovered');
							$('section.type-2.var-a .slick-current').addClass('hovered');

							$sliderTickerBG_1.width(thisSlideOffsetLeft);
							$sliderTickerBG_3.width(sectionWidth - thisSlideOffsetLeft - slideWidth);

							$sliderTickerText.stop().fadeOut(300);
							$sliderTickerText.eq(currentSlideIndex).stop().fadeIn(300);
						}, 100);
					}
					// slider ticker end
				})();
			}

			if ($('section.type-2.var-b')[0]) {
				(function() {
					var $slider = $('section.type-2.var-b .slider'),
						$control = $('section.type-2.var-b .content .slider .controls .control'),
						totalSlides = $slider.find('ul li').length;

					$slider.find('ul').slick({
						dots: false,
						focusOnSelect: true,
						swipeToSlide: true,
						slidesToShow: 4,
						arrows: false,
						loop: false,
						touchThreshold: 15,
						cssEase: 'cubic-bezier(0.660, 0.315, 0.145, 1)',
						speed: 900,
						responsive: [
						    {
						    	breakpoint: 111,
						    	settings: {
						        	slidesToShow: 1
						    	}
							}
						]
					});

					$control.on('click', function(){
						if ($(this).index() == 0) {
							$slider.find('ul').slick('slickPrev');
						} else {
							$slider.find('ul').slick('slickNext');
						}
					});

					// slider ticker
					var $slide = $('section.type-2.var-b .slick-slide'),
						$sliderTickerBG_1 = $('section.type-2.var-b .slider-ticker-bg-1'),
						$sliderTickerBG_2 = $('section.type-2.var-b .slider-ticker-bg-2'),
						$sliderTickerBG_3 = $('section.type-2.var-b .slider-ticker-bg-3'),
						$sliderTickerText = $('section.type-2.var-b .slider-ticker-text');

					$sliderTickerText.hide();
					$sliderTickerText.eq(0).show();

					$sliderTickerBG_2.width($slide.width());

					$('section.type-2.var-b .slick-slide').eq(0).addClass('hovered');

					var thisSlideOffsetLeft = $('section.type-2.var-b .slick-current').offset().left,
						sectionWidth = $('section.type-2.var-b').width(),
						slideWidth = $('section.type-2.var-b .slick-current').width();

					$sliderTickerBG_1.width(thisSlideOffsetLeft);
					$sliderTickerBG_3.width(sectionWidth - thisSlideOffsetLeft - slideWidth);

					$slide.hover(function(){
						var thisSlideOffsetLeft = $(this).offset().left,
							sectionWidth = $('section.type-2.var-b').width(),
							slideWidth = $(this).width(),
							currentSlideIndex = $(this).data('slick-index');

						$sliderTickerBG_1.width(thisSlideOffsetLeft);
						$sliderTickerBG_3.width(sectionWidth - thisSlideOffsetLeft - slideWidth);

						$sliderTickerText.stop().fadeOut(300);
						$sliderTickerText.eq(currentSlideIndex).stop().fadeIn(300);

						$slide.removeClass('hovered');
						$(this).addClass('hovered');
					}, function(){

					});

					$slider.hover(function(){

					}, function(){

					});

					$('section.type-2.var-b .slider-ticker-text').each(function(){
						var sliderTickerText = new TimelineMax({repeat: -1});

						sliderTickerText.fromTo($(this), 10, {x:'100%'}, {x:-$(window).width() - $(this).width(), ease:Power0.easeNone});
					});

					function nextSliderTicker() {
						if ($('section.type-2.var-b .slick-slide.hovered').next()[0]) {
							$('section.type-2.var-b .slick-slide.hovered').next().addClass('new-hovered');
							$slide.removeClass('hovered');
							$('section.type-2.var-b .slick-slide.new-hovered').addClass('hovered');
							$slide.removeClass('new-hovered');
						} else {
							$('section.type-2.var-b .slick-slide').eq(0).addClass('new-hovered');
							$slide.removeClass('hovered');
							$('section.type-2.var-b .slick-slide.new-hovered').addClass('hovered');
							$slide.removeClass('new-hovered');
						}

						var thisSlideOffsetLeft = $('section.type-2.var-b .slick-slide.hovered').offset().left,
							sectionWidth = $('section.type-2.var-b').width(),
							slideWidth = $('section.type-2.var-b .slick-slide.hovered').width(),
							currentSlideIndex = $('section.type-2.var-b .slick-slide.hovered').data('slick-index');

						$sliderTickerBG_1.width(thisSlideOffsetLeft);
						$sliderTickerBG_3.width(sectionWidth - thisSlideOffsetLeft - slideWidth);

						$sliderTickerText.stop().fadeOut(300);
						$sliderTickerText.eq(currentSlideIndex).stop().fadeIn(300);
					}

					setInterval(function(){
						nextSliderTicker();
					}, 10000);
					// slider ticker end
				})();
			}
		}
	},
	sectionType_5: function(){
		if ($('section.type-5')[0]) {
			var $slider = $('section.type-5 .blocks'),
				$control = $('section.type-5 .content .controls .control');
				totalSlides = $('section.type-5 .blocks .block').length,
				slickDefined = false;

			if ($(window).width() < 768) {
				makeSlider();
			}

			$(window).resize(function(){
				if ($(window).width() < 768) {
					if (slickDefined == true) {
						$slider.slick('slickUnfilter');
						$slider.slick('unslick');
					}

					makeSlider();
				} else {
					if (slickDefined == true) {
						$slider.slick('slickUnfilter');
						$slider.slick('unslick');
					}
				}
			});

			function makeSlider() {
				$slider.slick({
					dots: false,
					focusOnSelect: true,
					swipeToSlide: true,
					centerMode: true,
					centerPadding: '10%',
					slidesToShow: 1,
					arrows: false,
					touchThreshold: 15,
					cssEase: 'cubic-bezier(0.660, 0.315, 0.145, 1)',
					speed: 900
				});

				$slider.slick('slickFilter', $(':not(.special-block)'));

				$control.on('click', function(){
					if ($(this).index() == 0) {
						$slider.slick('slickPrev');
					} else {
						$slider.slick('slickNext');
					}
				});

				slickDefined = true;
			}
		}
	},
	sectionType_8: function(){
		if ($('section.type-8')[0]) {
			var $slider = $('section.type-8 .slider'),
				$control = $('section.type-8 .content .slider .controls .control'),
				totalSlides = $slider.find('ul li').length;

			$slider.find('ul').slick({
				centerMode: true,
				slidesToShow: 3,
				centerPadding: 0,
				dots: true,
				focusOnSelect: true,
				swipeToSlide: true,
				arrows: false,
				touchThreshold: 15,
				cssEase: 'cubic-bezier(0.660, 0.315, 0.145, 1)',
				speed: 900,
				autoplay: true,
				autoplaySpeed: 5000,
				responsive: [
				    {
				    	breakpoint: 1260,
				    	settings: {
				        	slidesToShow: 1,
				        	centerPadding: '18%'
				    	}
					},
				    {
				    	breakpoint: 768,
				    	settings: {
				        	slidesToShow: 1,
				        	centerPadding: '0%'
				    	}
					}
				]
			});

			$control.on('click', function(){
		    	if ($(this).index() == 0) {
		    		$slider.find('ul').slick('slickPrev');
		    	} else {
		    		$slider.find('ul').slick('slickNext');
		    	}
		    });
		}
	},
	sectionType_10: function(){
		if ($('section.type-10')[0]) {
			$('section.type-10 .block-2-inner').stick_in_parent({offset_top:$('header').height() + 30});
		}
	},
	sectionType_11: function(){
		if ($('section.type-11')[0]) {
			$('section.type-11 .socials-outer .social-item').on('click', function(){
				if ($(this).index() == 0) {
					$('.ssba_facebook_share').click();

					if (!$('.ssba_facebook_share').hasClass('yv-shared')) {
						updateBlogPostShareCounter();
					}

					$('.ssba_facebook_share').addClass('yv-shared');
				}

				if ($(this).index() == 1) {
					$('.ssba_twitter_share').click();

					if (!$('.ssba_twitter_share').hasClass('yv-shared')) {
						updateBlogPostShareCounter();
					}

					$('.ssba_twitter_share').addClass('yv-shared');
				}
			});

			function updateBlogPostShareCounter() {
				var data = {
					'action': 'updateBlogPostShareCounter',
					'currentBlogPostID': currentBlogPostID
				};

				jQuery.ajax({
					url: ajaxUrl,
					data: data,
					type: 'POST',
					success: function(data){
						if (data) {
							
						}
					}
				});
			}

			$('section.type-11 .block-2-inner').stick_in_parent({offset_top:$('header').height() + 30});
		}
	},
	sectionType_13: function(){
		if ($('section.type-13')[0]) {
			var telephoneNumberInput = document.querySelector("#telephone_number_for_logic");
			
			var iti = intlTelInput(telephoneNumberInput, {
				separateDialCode: true,
				utilsScript: templateUrl + "/js/utils.js"
			});

			document.addEventListener('wpcf7submit', function(event){
			    if ('1937' == event.detail.contactFormId) {
			        $('#telephone_number_for_email').val(iti.getNumber());
			    }
			}, false);
		}
	},
	sectionType_14: function(){
		if ($('section.type-14')[0]) {
			var TL_1 = new TimelineLite();

			TL_1
		    	.from($('section.type-14'), 1, {opacity:0, ease:Power3.easeOut}, 'first');
		    TL_1.pause();

			var WP_1 = new Waypoint({
		    	element: $('section.type-14'),
		    	handler: function(direction) {
		    		googleMapInitGlobalFunction();

		    		TL_1.play();

		    		WP_1.destroy();
		    	},
		    	offset: '100%'
		    });
		}
	},
	sectionType_19: function(){
		if ($('section.type-19')[0]) {
			if ($('section.type-19.var-a')[0]) {
				$('section.type-19.var-a .item').each(function(i){
					if (i > 6) {
						$(this).addClass('show-more-item');
					}
				});

				var TL = new TimelineLite();

				TL
					.staggerFrom($('section.type-19.var-a .show-more-item'), 0.6, {opacity:0, display:'none', x:15, ease:Power3.easeOut}, 0.1);
				TL.pause();

				$('section.type-19.var-a .show-more-button-outer').on('click', function(){
					TL.play();

					$(this).hide();
				});
			}

			if ($('section.type-19.var-b')[0]) {
				$('section.type-19.var-b .item').each(function(i){
					if (i > 3) {
						$(this).addClass('show-more-item');
					}
				});

				var TL = new TimelineLite();

				TL
					.staggerFrom($('section.type-19.var-b .show-more-item'), 0.6, {opacity:0, display:'none', x:15, ease:Power3.easeOut}, 0.1);
				TL.pause();

				$('section.type-19.var-b .show-more-button-outer').on('click', function(){
					TL.play();

					$(this).hide();
				});
			}
		}
	},
	sectionType_22: function(){
		if ($('section.type-22')[0]) {
			var youTubeIframeAPIReadyInterval;

			youTubeIframeAPIReadyInterval = setInterval(function(){
			    if (youTubeIframeAPIReady == true) {

			    	var $videoButton = $('section.type-22 .video-play-button-outer'),
			    		$videoOuter = $('section.type-22 .youtube-video-outer'),
			    		popUpPlayer;

			    	$videoButton.on('click', function(){
			    		$videoButton.fadeOut(300);

			    		popUpPlayer = undefined;
			    		$videoOuter.html('<div id="section_type_22_video" class="youtube-video" data-video-src="M7lc1UVf-VE"></div>');

			    		var	videoSrc = $(this).data('video-src');

			    		var videoSrcArray = videoSrc.split(' ');

			    		videoSrc = videoSrcArray[videoSrcArray.length - 1];

		    			popUpPlayer = new YT.Player('section_type_22_video', {
		    		    	videoId: videoSrc,
		    		    	events: {
		    		      		onReady: function(event){
		    		      			event.target.playVideo();
		    		      		}
		    		    	}
		    		  	});
	    			});

			    	clearInterval(youTubeIframeAPIReadyInterval);
			    }
			}, 500);
		}
	},
	sectionType_23: function(){
		if ($('section.type-23')[0]) {
			// slider ticker
			var $slide = $('section.type-23 .item'),
				$sliderTickerText = $('section.type-23 .slider-ticker-text');

			$sliderTickerText.hide();

			$slide.hover(function(){
				var currentSlideIndex = $(this).index();

				$sliderTickerText.stop().fadeOut(300);
				$sliderTickerText.eq(currentSlideIndex).stop().fadeIn(300);
			}, function(){
				$sliderTickerText.fadeOut(300);
			});

			$('section.type-23 .slider-ticker-text').each(function(){
				var sliderTickerText = new TimelineMax({repeat: -1});

				sliderTickerText.fromTo($(this), 10, {x:'100%'}, {x:-$(window).width() - $(this).width(), ease:Power0.easeNone});
			});
			// slider ticker end

			var $slider = $('section.type-23 .items'),
				slickDefined = false;

			if ($(window).width() < 768) {
				makeSlider();
			}

			$(window).resize(function(){
				if ($(window).width() < 768) {
					if (slickDefined == true) {
						$slider.slick('unslick');
					}

					makeSlider();
				} else {
					if (slickDefined == true) {
						$slider.slick('unslick');
					}
				}
			});

			function makeSlider() {
				$slider.slick({
					dots: false,
					focusOnSelect: true,
					swipeToSlide: true,
					centerMode: true,
					centerPadding: '26%',
					slidesToShow: 1,
					arrows: false,
					touchThreshold: 15,
					cssEase: 'cubic-bezier(0.660, 0.315, 0.145, 1)',
					speed: 900
				});

				slickDefined = true;
			}
		}
	},
	sectionType_24: function(){
		if ($('section.type-24')[0]) {
			if ($('.odometer')[0]) {
				var el = document.querySelector('.odometer'),
					number = parseInt($('.odometer').data('number'));

				od = new Odometer({
					el: el,
					format: '(,ddd)'
				});

				setTimeout(function(){
					number++;

					od.update(number++);
				}, 100);

				setInterval(function(){
					od.update(number++);
				}, 2500);
			}
		}
	},
	sectionType_25: function(){
		if ($('section.type-25')[0]) {
			//generate
			// var $content = $('section.type-25 .item'),
			// 	contentHTML = '';

			// for (var i = 0; i < 56; i++) {
			// 	contentHTML += $content[0].outerHTML;
			// }

			// $('section.type-25 .items-2').html();
			// $('section.type-25 .items-2').append(contentHTML);

			// $('section.type-25 .items-2 .item').each(function(index){
			// 	$(this).find('.item-text .text').text('Colton Dawns ' + index);
			// 	$(this).attr('data-name', 'Colton Dawns ' + index);

			// 	$('.team-search-select').append('<option value="' + 'Colton Dawns ' + index + '">' + 'Colton Dawns ' + index + '</option>'); 
			// });
			//items generate end

			$('section.type-25 .team-search-select').selectize({
			    sortField: 'text'
			});

			var itemFound = false;

			$('section.type-25 .team-search-select').on('change', function(){
				var selectValue = $(this).val();

				$('section.type-25 .items-2 .item').removeClass('active');

				if (selectValue != '') {
					$('section.type-25 .items-2 .item').each(function(index){
						if ($(this).data('name') == selectValue) {
							$(this).addClass('active');
						}
					});
				} else {
					$('section.type-25 .items-2 .item').removeClass('active');
				}
			});
		}
	},
	sectionType_27: function(){
		if ($('section.type-27')[0]) {
			var $slider = $('section.type-27 .items'),
				$control = $('section.type-27 .controls .control'),
				slickDefined = false;

			if ($(window).width() < 768) {
				makeSlider();
			}

			$(window).resize(function(){
				if ($(window).width() < 768) {
					if (slickDefined == true) {
						$slider.slick('unslick');
					}

					makeSlider();
				} else {
					if (slickDefined == true) {
						$slider.slick('unslick');
					}
				}
			});

			function makeSlider() {
				$slider.slick({
					dots: false,
					focusOnSelect: true,
					swipeToSlide: true,
					slidesToShow: 1,
					arrows: false,
					touchThreshold: 15,
					cssEase: 'cubic-bezier(0.660, 0.315, 0.145, 1)',
					speed: 900
				});

				$control.on('click', function(){
					if ($(this).index() == 0) {
						$slider.slick('slickPrev');
					} else {
						$slider.slick('slickNext');
					}
				});

				slickDefined = true;
			}
		}
	},
	sectionType_28: function(){
		if ($('section.type-28')[0]) {
			var $mapPin = $('section.type-28 .map-pin'),
				$item = $('section.type-28 .item');

			$item.find('.item-bottom-part').hide();
			$item.eq(0).find('.item-bottom-part').show();

			$mapPin.eq(0).addClass('active');

			$mapPin.on('click', function(){
				$item.find('.item-bottom-part').stop().slideUp(333);
				$item.eq($(this).index()).find('.item-bottom-part').stop().slideDown(333);

				$item.removeClass('active');
				$item.eq($(this).index()).addClass('active');

				$mapPin.removeClass('active');
				$(this).addClass('active');
			});

			$item.on('click', function(){
				$item.find('.item-bottom-part').stop().slideUp(333);
				$(this).find('.item-bottom-part').stop().slideDown(333);

				$item.removeClass('active');
				$(this).addClass('active');

				$mapPin.removeClass('active');
				$mapPin.eq($(this).index()).addClass('active');
			});
		}
	},
	popUp: function(){
		if ($('.pop-up')[0]) {
			// common
			var $commonPopUp = $('.common-pop-up'),
				$commonPopUpInner = $commonPopUp.find('.pop-up-inner'),
				$commonPopUpButton = $('.common-pop-up-button, .common-pop-up .button.close'),
				commonPopUpTL = new TimelineLite();

			commonPopUpTL.pause();
			commonPopUpTL
				.set($('html, body'), {overflow:'hidden'})
				.from($commonPopUp, 0.01, {visibility:'hidden', pointerEvents:'none'}, 'one')
				.fromTo($commonPopUp.find('.background'), 0.75, {opacity:0, scale:0.9}, {opacity:1, scale:1, ease:Power1.easeInOut}, 'one')
				.from($commonPopUp.find('.content'), 0.75, {delay:0.25, opacity:0, scale:0.9, ease:Power1.easeInOut}, 'one');

			$commonPopUpButton.on('click', function(){
				var animationProgress = commonPopUpTL.progress();

				if (animationProgress != 1) {
					commonPopUpTL.play();
				} else {
					commonPopUpTL.reverse();
				}
			});

			if ($('#popup_telephone_number_for_logic')[0]) {
				var telephoneNumberInput = document.querySelector("#popup_telephone_number_for_logic");
				
				var iti = window.intlTelInput(telephoneNumberInput, {
					separateDialCode: true
				});

				document.addEventListener('wpcf7submit', function(event){
				    if ('1938' == event.detail.contactFormId) {
				        $('#popup_telephone_number_for_email').val(iti.getNumber());
				    }
				}, false);
			}

			if ($('.pop-up.common-pop-up .popup-skill-select')[0]) {
				$('.pop-up.common-pop-up .popup-skill-select').selectize({
				    sortField: 'text'
				});
			}

			// overflow auto fix
			fixPopUpOverflowAuto();

			$(window).resize(function(){
				fixPopUpOverflowAuto();
			});

			function fixPopUpOverflowAuto() {
				var commonPopUpHeight = $commonPopUp.find('.content').outerHeight(true);

				if (commonPopUpHeight >= $(window).height()) {
					$commonPopUpInner.removeClass('middle');
					$commonPopUpInner.addClass('align-items-flex-start');
				} else {
					$commonPopUpInner.removeClass('align-items-flex-start');
					$commonPopUpInner.addClass('middle');
				}
			}
			// overflow auto fix end
			// common end

			// youtube
			var $videoPopUp = $('.video-pop-up'),
				$videoPopUpInner = $videoPopUp.find('.pop-up-inner'),
				$videoPopUpButton = $('.video-pop-up-button, .video-pop-up .button.close'),
				videoPopUpTL = new TimelineLite(),
				popUpPlayer;

			videoPopUpTL
				.from($videoPopUp, 0.01, {visibility:'hidden', pointerEvents:'none'}, 'one')
				.fromTo($videoPopUp.find('.background'),  0.75, {opacity:0, scale:0.9}, {opacity:1, scale:1, ease:Power1.easeInOut}, 'one')
				.from($videoPopUp.find('.content'), 0.75, {delay:0.25, opacity:0, scale:0.9, ease:Power1.easeInOut}, 'one');
			videoPopUpTL.pause();

			$videoPopUpButton.on('click', function(){
				var animationProgress = videoPopUpTL.progress();

				if (animationProgress != 1) {
					videoPopUpTL.play();
				} else {
					videoPopUpTL.reverse();

					$('body').find('#pop_up_video').remove();
				}
			});

			var youTubeIframeAPIReadyInterval;

			youTubeIframeAPIReadyInterval = setInterval(function(){
			    if (youTubeIframeAPIReady == true) {

			    	var $videoButton = $('.video-pop-up-button'),
			    		$videoOuter = $('.pop-up.video-pop-up .content .content-inner .video-outer'),
			    		popUpPlayer;

			    	$videoButton.on('click', function(){
			    		popUpPlayer = undefined;
			    		$videoOuter.html('<div id="pop_up_video" class="youtube-video" data-video-src="M7lc1UVf-VE"></div>');

			    		var	videoSrc = $(this).data('video-src');

			    		var videoSrcArray = videoSrc.split(' ');

			    		videoSrc = videoSrcArray[videoSrcArray.length - 1];

		    			popUpPlayer = new YT.Player('pop_up_video', {
		    		    	videoId: videoSrc,
		    		    	events: {
		    		      		onReady: function(event){
		    		      			event.target.playVideo();
		    		      		}
		    		    	}
		    		  	});
	    			});

			    	clearInterval(youTubeIframeAPIReadyInterval);
			    }
			}, 500);
			// youtube end
		}
	},
	googleMap: function(){
		if ($('.google-map')[0]) {
			googleMapInitGlobalFunction = function googleMapInit() {
				var $maps = $('.google-map');

				$maps.each(function(){
				    var map,
			        	googleMapInited = true;

			        var $map = $(this),
			            $markers = $map.find('.marker');

			        var args = {
			            zoom: 10,
			            center: new google.maps.LatLng(0, 0),
			            mapTypeId: google.maps.MapTypeId.ROADMAP,
			            scrollwheel: false,
			            styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
			        }

			        map = new google.maps.Map($map[0], args);

			        map.markers = [];

			        $markers.each(function(){
			            if ($(this).data('lat') != '' || $(this).data('lng') != '') {
			                add_marker($(this), map);
			            }
			        });

			        center_map(map, $markers);
				});

		        function add_marker($marker, map) {
		            var latlng = new google.maps.LatLng($marker.data('lat'), $marker.data('lng')),
		            	mapMarkerUrl = googleMapPin;

		            var image = {
		            	url: mapMarkerUrl
		            };

		            var marker = new google.maps.Marker({
		                position: latlng,
		                map: map,
		                icon: image
		            });

		            map.markers.push(marker);
		        }

		        function center_map(map, markers) {
		            var bounds = new google.maps.LatLngBounds();
		            var $CoorA = [];

		            markers.each(function () {
		                $CoorA.push($(this));
		            });

		            $.each(map.markers, function (i, marker) {
		                var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

		                $CoorA[i].data('lat', marker.position.lat());
		                $CoorA[i].data('lng', marker.position.lng());

		                bounds.extend(latlng);
		            });

		            if (map.markers.length == 1) {
		                map.setCenter(bounds.getCenter());
		                map.setZoom(16);
		            } else {
		                map.fitBounds(bounds);
		            }
		        }

		        function center_map_by_marker(map, obj) {
		            var bounds = new google.maps.LatLngBounds();

		            $.each(map.markers, function (i, marker) {
		                marker.setIcon(mapMarkerUrl);
		            });

		            $.each(map.markers, function (i, marker) {
		                if (parseFloat(marker.position.lat().toFixed(7)) == parseFloat(obj.attr('data-lat')).toFixed(7) && parseFloat(marker.position.lng().toFixed(7)) == parseFloat(obj.attr('data-lng')).toFixed(7)) {
		                    var latlng = new google.maps.LatLng(parseFloat(marker.position.lat().toFixed(7)), parseFloat(marker.position.lng().toFixed(7)));

		                    bounds.extend(latlng);
		                    map.setCenter(bounds.getCenter());
		                    marker.setIcon(mapMarkerActiveUrl);

		                    infowindow.close();
		                    infowindow.setContent(infoWindowTextArray[i]);
		                    infowindow.open(map,marker);

		                    return;
		                }
		            });
		        }
			}
		}
	}
}

outstuff.init();