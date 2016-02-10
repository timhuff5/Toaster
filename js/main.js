var DTCC = DTCC || {};

$(function() {




  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // global inicialization functions
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  DTCC.global = {

    init: function() {
      DTCC.global.deviceSize();
      DTCC.global.layout();
      DTCC.global.animsition();
    },

    // device identification function
    deviceSize: function(){
			var jRes = jRespond([
				{
					label: 'smallest',
					enter: 0,
					exit: 479
				},{
					label: 'handheld',
					enter: 480,
					exit: 767
				},{
					label: 'tablet',
					enter: 768,
					exit: 991
				},{
					label: 'laptop',
					enter: 992,
					exit: 1199
				},{
					label: 'desktop',
					enter: 1200,
					exit: 10000
				}
			]);
			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() { $body.addClass('device-lg'); },
					exit: function() { $body.removeClass('device-lg'); }
				},{
					breakpoint: 'laptop',
					enter: function() { $body.addClass('device-md'); },
					exit: function() { $body.removeClass('device-md'); }
				},{
					breakpoint: 'tablet',
					enter: function() { $body.addClass('device-sm'); },
					exit: function() { $body.removeClass('device-sm'); }
				},{
					breakpoint: 'handheld',
					enter: function() { $body.addClass('device-xs'); },
					exit: function() { $body.removeClass('device-xs'); }
				},{
					breakpoint: 'smallest',
					enter: function() { $body.addClass('device-xxs'); },
					exit: function() { $body.removeClass('device-xxs'); }
				}
			]);
		},

    layout: function() {
      var defaultHeaderScheme = 'scheme-default',
          defaultNavbarScheme = 'scheme-default',
          defaultBrandingScheme = 'scheme-default',
          defaultColorScheme = 'default-scheme-color',
          defaultHeaderPosition = 'header-fixed',
          defaultNavbarPosition = 'aside-fixed',
          defaultRightbarVisibility = 'rightbar-hidden',
          defaultAppClasses = 'scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden';

      $body.addClass(defaultAppClasses);
      $header.addClass(defaultHeaderScheme);
      $branding.addClass(defaultBrandingScheme);
      $sidebar.addClass(defaultNavbarScheme).addClass(defaultNavbarPosition);

      $headerSchemeEl.on('click', function($event) {
        var scheme = $(this).data('scheme');

        $body.removeClass(defaultHeaderScheme).addClass(scheme);
        $header.removeClass(defaultHeaderScheme).addClass(scheme);
        defaultHeaderScheme = scheme;
        $event.stopPropagation();
      });

      $brandingSchemeEl.on('click', function($event) {
        var scheme = $(this).data('scheme');

        $branding.removeClass(defaultBrandingScheme).addClass(scheme);
        defaultBrandingScheme = scheme;
        $event.stopPropagation();
      });

      $sidebarSchemeEl.on('click', function($event) {
        var scheme = $(this).data('scheme');

        $body.removeClass(defaultNavbarScheme).addClass(scheme);
        $sidebar.removeClass(defaultNavbarScheme).addClass(scheme);
        defaultNavbarScheme = scheme;
        $event.stopPropagation();
      });

      $colorSchemeEl.on('click', function($event) {
        var scheme = $(this).data('scheme');

        $body.removeClass(defaultColorScheme).addClass(scheme);
        defaultColorScheme = scheme;
        $event.stopPropagation();
      });

      $fixedHeaderEl.change(function() {
        if ($body.hasClass('header-fixed')) {
          $body.removeClass('header-fixed').addClass('header-static');
        } else {
          $body.removeClass('header-static').addClass('header-fixed');
        }
      });
      $fixedHeaderEl.parent().on('click', function($event) {
        $event.stopPropagation();
      });

      $fixedAsideEl.change(function() {
        if ($body.hasClass('aside-fixed')) {
          $body.removeClass('aside-fixed').addClass('aside-static');
          $sidebar.removeClass('aside-fixed').addClass('aside-static');
        } else {
          $body.removeClass('aside-static').addClass('aside-fixed');
          $sidebar.removeClass('aside-static').addClass('aside-fixed');
        }
      });
      $fixedAsideEl.parent().on('click', function($event) {
        $event.stopPropagation();
      });

      $toggleRightbarEl.on('click', function() {
        if ($body.hasClass('rightbar-hidden')) {
          $body.removeClass('rightbar-hidden').addClass('rightbar-show');
        } else {
          $body.removeClass('rightbar-show').addClass('rightbar-hidden');
        }
      });

      if ($app.hasClass('boxed-layout')){
        $app.parent().addClass('boxed-layout');
      }

      if ($app.hasClass('sidebar-offcanvas')){
        $app.parent().addClass('sidebar-offcanvas');
      }

      if ($app.hasClass('hz-menu')){
        $app.parent().addClass('hz-menu');
      }

      if ($app.hasClass('rtl')){
        $app.parent().addClass('rtl');
      }

    },

    // initialize animsition
    animsition: function() {
      $wrap.animsition({
        inClass               :   'fade-in',
        outClass              :   'fade-out',
        inDuration            :    1500,
        outDuration           :    800,
        linkElement           :   '.animsition-link',
        // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
        loading               :    true,
        loadingParentElement  :   'body', //animsition wrapper element
        loadingClass          :   'animsition-loading',
        unSupportCss          : [ 'animation-duration',
          '-webkit-animation-duration',
          '-o-animation-duration'
        ],
        //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

        overlay               :   false,
        overlayClass          :   'animsition-overlay-slide',
        overlayParentElement  :   'body'
      });
    }

  };






  //!!!!!!!!!!!!!!!!!!!!!!!!!
  // header section functions
  //!!!!!!!!!!!!!!!!!!!!!!!!!

  DTCC.header = {

    init: function() {

    }


  };



  //!!!!!!!!!!!!!!!!!!!!!!!!!
  // navbar section functions
  //!!!!!!!!!!!!!!!!!!!!!!!!!

  DTCC.navbar = {

    init: function() {
      DTCC.navbar.menu();
      DTCC.navbar.ripple();
      DTCC.navbar.removeRipple();
      DTCC.navbar.collapse();
      DTCC.navbar.offcanvas();
    },

    menu: function(){
      if( $dropdowns.length > 0 ) {

        $dropdowns.addClass('dropdown');

        var $submenus = $dropdowns.find('ul >.dropdown');
        $submenus.addClass('submenu');

        $a.append('<i class="fa fa-plus"></i>');

        $a.on('click', function(event) {
          if ($app.hasClass('sidebar-sm') || $app.hasClass('sidebar-xs') || $app.hasClass('hz-menu')) {
            return false;
          }

          var $this = $(this),
              $parent = $this.parent('li'),
              $openSubmenu = $('.submenu.open');

          if (!$parent.hasClass('submenu')) {
            $dropdowns.not($parent).removeClass('open').find('ul').slideUp();
          }

          $openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
          $parent.toggleClass('open').find('>ul').stop().slideToggle();
          event.preventDefault();
        });

        $dropdowns.on('mouseenter', function() {
          $sidebar.addClass('dropdown-open');
          $controls.addClass('dropdown-open');
        });

        $dropdowns.on('mouseleave', function() {
          $sidebar.removeClass('dropdown-open');
          $controls.removeClass('dropdown-open');
        });

        $notDropdownsLinks.on('click', function() {
          $dropdowns.removeClass('open').find('ul').slideUp();
        });

        var $activeDropdown = $('.dropdown>ul>.active').parent();

        $activeDropdown.css('display', 'block');
      }
    },

    ripple: function() {
      var parent, ink, d, x, y;

      $navigation.find('>li>a').click(function(e){
        parent = $(this).parent();

        if(parent.find('.ink').length === 0) {
          parent.prepend('<span class="ink"></span>');
        }

        ink = parent.find('.ink');
        //incase of quick double clicks stop the previous animation
        ink.removeClass('animate');

        //set size of .ink
        if(!ink.height() && !ink.width())
        {
          //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
          d = Math.max(parent.outerWidth(), parent.outerHeight());
          ink.css({height: d, width: d});
        }

        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - parent.offset().left - ink.width()/2;
        y = e.pageY - parent.offset().top - ink.height()/2;

        //set the position and add class .animate
        ink.css({top: y+'px', left: x+'px'}).addClass('animate');

        setTimeout(function(){
          $('.ink').remove();
        }, 600);
      });
    },

    removeRipple: function(){
      $sidebar.find('.ink').remove();
    },

    collapse: function(){
      $collapseSidebarEl.on('click', function(e) {
        if ($app.hasClass('sidebar-sm')) {
          $app.removeClass('sidebar-sm').addClass('sidebar-xs');
        }
        else if ($app.hasClass('sidebar-xs')) {
          $app.removeClass('sidebar-xs');
        }
        else {
          $app.addClass('sidebar-sm');
        }

        $app.removeClass('sidebar-sm-forced sidebar-xs-forced');
        $app.parent().removeClass('sidebar-sm sidebar-xs');
        DTCC.navbar.removeRipple;
        $window.trigger('resize');
        e.preventDefault();
      });
    },

    offcanvas: function() {
      $offcanvasToggleEl.on('click', function(e) {
        if ($app.hasClass('offcanvas-opened')) {
          $app.removeClass('offcanvas-opened');
        } else {
          $app.addClass('offcanvas-opened');
        }
        e.preventDefault();
      });
    }


  };
  

  //!!!!!!!!!!!!!!!!
  // tiles functions
  //!!!!!!!!!!!!!!!!

  DTCC.tiles = {

    init: function() {
      DTCC.tiles.toggle();
      DTCC.tiles.refresh();
      DTCC.tiles.fullscreen();
      DTCC.tiles.close();
    },

    toggle: function() {
      $tileToggleEl.on('click', function(){
        var element = $(this);
        var tile = element.parents('.tile');

        tile.toggleClass('collapsed');
        tile.children().not('.tile-header').slideToggle(150);
      });
    },

    refresh: function() {
      $tileRefreshEl.on('click', function(){
        var element = $(this);
        var tile = element.parents('.tile');
        var dropdown = element.parents('.dropdown');

        tile.addClass('refreshing');
        dropdown.trigger('click');

        var t = setTimeout( function(){
          tile.removeClass('refreshing');
        }, 3000 );
      });
    },

    fullscreen: function() {
      $tileFullscreenEl.on('click', function(){
        var element = $(this);
        var tile = element.parents('.tile');
        var dropdown = element.parents('.dropdown');

        screenfull.toggle(tile[0]);
        dropdown.trigger('click');
      });

      if ($tileFullscreenEl.length > 0) {
        $(document).on(screenfull.raw.fullscreenchange, function () {
          var element = $(screenfull.element);
          if (screenfull.isFullscreen) {
            element.addClass('isInFullScreen');
          } else {
            $('.tile.isInFullScreen').removeClass('isInFullScreen');
          }
        });
      }
    },

    close: function() {
      $tileCloseEl.on('click', function(){
        var element = $(this);
        var tile = element.parents('.tile');

        tile.addClass('closed').fadeOut();
      });
    }

  };



  //!!!!!!!!!!!!!!!!
  // extra functions
  //!!!!!!!!!!!!!!!!

  DTCC.extra = {

    init: function() {
      DTCC.extra.slimScroll();
      DTCC.extra.chosen();
      DTCC.extra.toggleClass();
      DTCC.extra.touchspin();
      DTCC.extra.animateProgress();
      DTCC.extra.popover();
      DTCC.extra.tooltip();
    },


    //initialize slimscroll on elements
    slimScroll: function(){

      if( $slimScrollEl.length > 0 ){
        $slimScrollEl.each(function() {
          var element = $(this);

          element.slimScroll({height: '100%'});
        });
      }

    },

    chosen: function() {
      if ($chosenEl.length > 0) {
        $chosenEl.each(function() {
          var element = $(this);
          element.on('chosen:ready', function(e, chosen) {
            var width = element.css("width");
            element.next().find('.chosen-choices').addClass('form-control');
            element.next().css("width", width);
            element.next().find('.search-field input').css("width", "125px");
          }).chosen();
        });
      }
    },

    toggleClass: function() {
      $toggleClassEl.on('click', function(){
        var element = $(this),
            className = element.data('toggle'),
            type = element.data('type');

        if (type === 'radio') {
          element.parent().find('.'+className).removeClass(className);
        }

        if (element.hasClass(className)) {
          element.removeClass(className);
        } else {
          element.addClass(className);
        }
      });
    },

    touchspin: function() {
      if ($touchspinEl.length > 0) {
        $touchspinEl.each(function() {
          var element = $(this);
          element.TouchSpin();
        });
      }
    },

    animateProgress: function() {
      if ($animateProgressEl.length > 0) {
        $animateProgressEl.each(function() {
          var element = $(this);
          var progress =  element.data('percentage');

          element.css('width', progress);
        });
      }
    },

    popover: function() {
      $popoverEl = $('[data-toggle="popover"]');
      if ($popoverEl.length > 0) {
        $popoverEl.each(function() {
          var element = $(this);

          element.popover();
        });
      }
    },

    tooltip: function() {
      $tooltipEl = $('[data-toggle="tooltip"]');
      if ($tooltipEl.length > 0) {
        $tooltipEl.each(function() {
          var element = $(this);

          element.tooltip();
        });
      }
    },

   };




  //!!!!!!!!!!!!!!!!!!!!
  // check mobile device
  //!!!!!!!!!!!!!!!!!!!!

  DTCC.isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (DTCC.isMobile.Android() || DTCC.isMobile.BlackBerry() || DTCC.isMobile.iOS() || DTCC.isMobile.Opera() || DTCC.isMobile.Windows());
    }
  };



  //!!!!!!!!!!!!!!!!!!!!!!!!!
  // initialize after resize
  //!!!!!!!!!!!!!!!!!!!!!!!!!

  DTCC.documentOnResize = {

		init: function(){

      var t = setTimeout( function(){

        DTCC.documentOnReady.setSidebar();
        DTCC.navbar.removeRipple();

			}, 500 );

		}

	};






  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // initialize when document ready
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  DTCC.documentOnReady = {

		init: function(){
      DTCC.global.init();
	  DTCC.header.init();
      DTCC.navbar.init();
      DTCC.documentOnReady.windowscroll();
      DTCC.tiles.init();
      DTCC.extra.init();
      DTCC.documentOnReady.setSidebar();
		},

    // run on window scrolling

    windowscroll: function(){

			$window.on( 'scroll', function(){


			});
		},


	};



  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // initialize when document load
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	DTCC.documentOnLoad = {

		init: function(){

		}

	};



  //!!!!!!!!!!!!!!!!!!!!!!!!!
  // global variables
  //!!!!!!!!!!!!!!!!!!!!!!!!!

  var $window = $(window),
      $body = $('body'),
      $header = $('#header'),
      $branding = $('#header .branding'),
      $sidebar = $('#sidebar'),
      $controls = $('#controls'),
      $app = $('.appWrapper'),
      $navigation = $('#navigation'),
      $sparklineEl = $('.sparklineChart'),
      $slimScrollEl = $('.slim-scroll'),
      $collapseSidebarEl = $('.collapse-sidebar'),
      $wrap = $('#wrap'),
      $offcanvasToggleEl = $('.offcanvas-toggle'),

      //navigation elements
      $dropdowns = $navigation.find('ul').parent('li'),
      $a = $dropdowns.children('a'),
      $notDropdowns = $navigation.children('li').not($dropdowns),
      $notDropdownsLinks = $notDropdowns.children('a'),
      // end of navuigation elements

      $headerSchemeEl = $('.color-schemes .header-scheme'),
      $brandingSchemeEl = $('.color-schemes .branding-scheme'),
      $sidebarSchemeEl = $('.color-schemes .sidebar-scheme'),
      $colorSchemeEl = $('.color-schemes .color-scheme'),
      $fixedHeaderEl = $('#fixed-header'),
      $fixedAsideEl = $('#fixed-aside'),
      $toggleRightbarEl = $('.toggle-right-sidebar'),
      $pickDateEl = $('.pickDate'),

      $tileEl = $('.tile'),
      $tileToggleEl = $('.tile .tile-toggle'),
      $tileRefreshEl = $('.tile .tile-refresh'),
      $tileFullscreenEl = $('.tile .tile-fullscreen'),
      $tileCloseEl = $('.tile .tile-close'),

      $easypiechartEl = $('.easypiechart'),
      $chosenEl = $('.chosen-select'),
      $toggleClassEl = $('.toggle-class'),
      $colorPickerEl = $('.colorpicker'),
      $touchspinEl = $('.touchspin'),
      $datepickerEl = $('.datepicker'),
      $animateProgressEl = $('.animate-progress-bar'),
      $counterEl = $('.counter'),
      $splashEl = $('.splash');


  //!!!!!!!!!!!!!
  // initializing
  //!!!!!!!!!!!!!
  $(document).ready( DTCC.documentOnReady.init );
  $window.load( DTCC.documentOnLoad.init );
  $window.on( 'resize', DTCC.documentOnResize.init );

});
