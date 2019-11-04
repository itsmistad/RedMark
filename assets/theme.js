$(document).ready(function() {
  $('.slick-prev-btn').click(function() {
    $(this).siblings('.slick-slider__carousel').slick('slickPrev');
    $(this).blur();
  });
  $('.slick-next-btn').click(function() {
    $(this).siblings('.slick-slider__carousel').slick('slickNext');
    $(this).blur();
  });
});
$(document).ready(function(){
  $('.single-item').slick({
    dots: true,
   
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1
  });
	$('.multiple-items').slick({
   
    infinite: true,
   
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1
  });
  $('.one-time').slick({
    dots: false,
  
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    touchMove: false,
    slidesToScroll: 1
  });
  $('.uneven').slick({
    dots: true,
   
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4
  });
if ( $(window).width() <= 767) { 
  $('.responsive').slick({
    dots: false,
    infinite: true,
   
    speed: 300,
    slidesToShow:1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
   
} 
else {
   $('.responsive').slick({
    dots: false,
    infinite: true,
    speed: 300,
   
    slidesToShow:4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  });   
  
   } 
 
  $('.autoplay').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  });
});



window.theme = window.theme || {};

/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

window.slate = window.slate || {};

/**
 * iFrames
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace iframes
 */

slate.rte = {
  wrapTable: function() {
    $('.rte table').wrap('<div class="rte__table-wrapper"></div>');
  },

  iframeReset: function() {
    var $iframeVideo = $('.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"]');
    var $iframeReset = $iframeVideo.add('.rte iframe#admin_bar_iframe');

    $iframeVideo.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="video-wrapper"></div>');
    });

    $iframeReset.each(function() {
      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};

window.slate = window.slate || {};

/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element.first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element.first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).off('focusin');

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function() {

  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback
   */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  /**
   * +++ Useful
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * +++ Useful
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size == null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match != null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function() {
  var moneyFormat = '$'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {
  

  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = _.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');

          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = _.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },

    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;

      
      Currency.convertAll(shopCurrency, jQuery('[name=currencies]').val());
      jQuery('.selected-currency').text(Currency.currentCurrency);  
      
      
      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();


/* ================ GLOBAL ================ */
/*============================================================================
  Drawer modules
==============================================================================*/
theme.Drawers = (function() {
  function Drawer(id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-' + position,
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + position
    };

    this.nodes = {
      $parent: $('html').add('body'),
      $page: $('#PageContainer')
    };

    this.config = $.extend(defaults, options);
    this.position = position;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  }

  Drawer.prototype.init = function() {
    $(this.config.open).on('click', $.proxy(this.open, this));
    this.$drawer.on('click', this.config.close, $.proxy(this.close, this));
  };

  Drawer.prototype.open = function(evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to nodes.$page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }


    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.$drawer.prepareTransition();

    this.nodes.$parent.addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
    this.drawerIsOpen = true;

    // Set focus on drawer
    slate.a11y.trapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    // Run function when draw opens if set
    if (this.config.onDrawerOpen && typeof this.config.onDrawerOpen === 'function') {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    this.bindEvents();

    return this;
  };

  Drawer.prototype.close = function() {
    if (!this.drawerIsOpen) { // don't close a closed drawer
      return;
    }

    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.$drawer.prepareTransition();

    this.nodes.$parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);

    this.drawerIsOpen = false;

    // Remove focus on drawer
    slate.a11y.removeTrapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    this.unbindEvents();
  };

  Drawer.prototype.bindEvents = function() {
    this.nodes.$parent.on('keyup.drawer', $.proxy(function(evt) {
      // close on 'esc' keypress
      if (evt.keyCode === 27) {
        this.close();
        return false;
      } else {
        return true;
      }
    }, this));

    // Lock scrolling on mobile
    this.nodes.$page.on('touchmove.drawer', function() {
      return false;
    });

    this.nodes.$page.on('click.drawer', $.proxy(function() {
      this.close();
      return false;
    }, this));
  };

  Drawer.prototype.unbindEvents = function() {
    this.nodes.$page.off('.drawer');
    this.nodes.$parent.off('.drawer');
  };

  return Drawer;
})();


/* ================ MODULES ================ */
window.theme = window.theme || {};

theme.Header = (function() {
  var selectors = {
    body: 'body',
    navigation: '#site-header__desktop-nav',
    siteNavHasDropdown: '.desktop-nav--has-dropdown',
    siteNavChildLinks: '.desktop-nav__child-link',
    siteNavActiveDropdown: '.desktop-nav--active',
    siteNavLinkMain: '.desktop-nav__link',
    siteNavChildLink: '.desktop-nav__link--last'
  };

  var config = {
    activeClass: 'desktop-nav--active',
    childLinkClass: 'desktop-nav__child-link'
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$parents.on('click.siteNav', function(evt) {
      var $el = $(this);

      if (!$el.hasClass(config.activeClass)) {
        // force stop the click from happening
        evt.preventDefault();
        evt.stopImmediatePropagation();
      }

      showDropdown($el);
    });

    // check when we're leaving a dropdown and close the active dropdown
    $(selectors.siteNavChildLink).on('focusout.siteNav', function() {
      setTimeout(function() {
        if ($(document.activeElement).hasClass(config.childLinkClass) || !cache.$activeDropdown.length) {
          return;
        }

        hideDropdown(cache.$activeDropdown);
      });
    });

    // close dropdowns when on top level nav
    cache.$topLevel.on('focus.siteNav', function() {
      if (cache.$activeDropdown.length) {
        hideDropdown(cache.$activeDropdown);
      }
    });

    cache.$subMenuLinks.on('click.siteNav', function(evt) {
      // Prevent click on body from firing instead of link
      evt.stopImmediatePropagation();
    });
  }

  function cacheSelectors() {
    cache = {
      $nav: $(selectors.navigation),
      $topLevel: $(selectors.siteNavLinkMain),
      $parents: $(selectors.navigation).find(selectors.siteNavHasDropdown),
      $subMenuLinks: $(selectors.siteNavChildLinks),
      $activeDropdown: $(selectors.siteNavActiveDropdown)
    };
  }

  function showDropdown($el) {
    $el.addClass(config.activeClass);

    // close open dropdowns
    if (cache.$activeDropdown.length) {
      hideDropdown(cache.$activeDropdown);
    }

    cache.$activeDropdown = $el;

    // set expanded on open dropdown
    $el.find(selectors.siteNavLinkMain).attr('aria-expanded', 'true');

    setTimeout(function() {
      $(window).on('keyup.siteNav', function(evt) {
        if (evt.keyCode === 27) {
          hideDropdown($el);
        }
      });

      $(selectors.body).on('click.siteNav', function() {
        hideDropdown($el);
      });
    }, 250);
  }

  function hideDropdown($el) {
    // remove aria on open dropdown
    $el.find(selectors.siteNavLinkMain).attr('aria-expanded', 'false');
    $el.removeClass(config.activeClass);

    // reset active dropdown
    cache.$activeDropdown = $(selectors.siteNavActiveDropdown);

    $(selectors.body).off('click.siteNav');
    $(window).off('keyup.siteNav');
  }

  function unload() {
    $(window).off('.siteNav');
    cache.$parents.off('.siteNav');
    cache.$subMenuLinks.off('.siteNav');
    cache.$topLevel.off('.siteNav');
    $(selectors.siteNavChildLink).off('.siteNav');
    $(selectors.body).off('.siteNav');
  }

  return {
    init: init,
    unload: unload
  };
})();

window.theme = window.theme || {};


window.theme = window.theme || {};

theme.Search = (function() {
  var selectors = {
    search: '.search',
    searchSubmit: '.search__submit',
    searchInput: '.search__input',

    siteHeader: '.site-header__main-container',
    siteHeaderSearchToggle: '.site-header__search-toggle',
    siteHeaderSearch: '.site-header__search',

    searchDrawer: '.search-bar',
    searchDrawerInput: '.search-bar__input',

    searchHeader: '.search-header',
    searchHeaderInput: '.search-header__input',
    searchHeaderSubmit: '.search-header__submit',
  };

  var classes = {
    focus: 'search--focus',
  };

  function init() {
    if (!$(selectors.siteHeader).length) {
      return;
    }

    initDrawer();
    searchSubmit();

    $(selectors.searchHeaderInput).add(selectors.searchHeaderSubmit).on('focus blur', function() {
      $(selectors.searchHeader).toggleClass(classes.focus);
    });

    $(selectors.siteHeaderSearchToggle).on('click', function() {
      var searchHeight = $(selectors.siteHeader).outerHeight();
      var searchOffset = $(selectors.siteHeader).offset().top - searchHeight;

      $(selectors.searchDrawer).css({
        height: searchHeight + 'px',
        top: searchOffset + 'px'
      });
    });
  }

  function initDrawer() {
    // Add required classes to HTML
    $('#PageContainer').addClass('drawer-page-content');
    $('.js-drawer-open-top').attr('aria-controls', 'SearchDrawer').attr('aria-expanded', 'false');

    theme.SearchDrawer = new theme.Drawers('SearchDrawer', 'top', {
      onDrawerOpen: searchDrawerFocus
    });
  }

  function searchDrawerFocus() {
    searchFocus($(selectors.searchDrawerInput));
  }

  function searchFocus($el) {
    $el.focus();
    // set selection range hack for iOS
    $el[0].setSelectionRange(0, $el[0].value.length);
  }

  function searchSubmit() {
    $(selectors.searchSubmit).on('click', function(evt) {
      var $el = $(evt.target);
      var $input = $el.parents(selectors.search).find(selectors.searchInput);
      if ($input.val().trim().length === 0) {
        evt.preventDefault();
        searchFocus($input);
      }
    });
  }

  return {
    init: init
  };
})();

(function() {
  var selectors = {
    backButton: '.return-link'
  };

  var $backButton = $(selectors.backButton);

  if (!document.referrer || !$backButton.length || !window.history.length) {
    return;
  }

  $backButton.one('click', function(evt) {
    evt.preventDefault();

    var referrerDomain = urlDomain(document.referrer);
    var shopDomain = urlDomain(window.location.href);

    if (shopDomain === referrerDomain) {
      history.back();
    }

    return false;
  });

  function urlDomain(url) {
    var anchor = document.createElement('a');
    anchor.ref = url;

    return anchor.hostname;
  }
})();


/* ================ TEMPLATES ================ */
window.theme = theme || {};

theme.customerTemplates = (function() {

  function initEventListeners() {
    // Show reset password form
    $('#RecoverPassword').on('click', function(evt) {
      evt.preventDefault();
      toggleRecoverPasswordForm();
    });

    // Hide reset password form
    $('#HideRecoverPasswordLink').on('click', function(evt) {
      evt.preventDefault();
      toggleRecoverPasswordForm();
    });
  }

  /**
   *
   *  Show/Hide recover password form
   *
   */
  function toggleRecoverPasswordForm() {
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *
   *  Show reset password success message
   *
   */
  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }

  /**
   *
   *  Show/hide customer address forms
   *
   */
  function customerAddressForm() {
    var $newAddressForm = $('#AddressNewForm');

    if (!$newAddressForm.length) {
      return;
    }

    // Initialize observers on address selectors, defined in shopify_common.js
    if (Shopify) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
        hideElement: 'AddressProvinceContainerNew'
      });
    }

    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function() {
      var formId = $(this).data('form-id');
      var countrySelector = 'AddressCountry_' + formId;
      var provinceSelector = 'AddressProvince_' + formId;
      var containerSelector = 'AddressProvinceContainer_' + formId;

      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });

    // Toggle new/edit address forms
    $('.address-new-toggle').on('click', function() {
      $newAddressForm.toggleClass('hide');
    });

    $('.address-edit-toggle').on('click', function() {
      var formId = $(this).data('form-id');
      $('#EditAddress_' + formId).toggleClass('hide');
    });

    $('.address-delete').on('click', function() {
      var $el = $(this);
      var formId = $el.data('form-id');
      var confirmMessage = $el.data('confirm-message');

      // eslint-disable-next-line no-alert
      if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
        Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
      }
    });
  }

  /**
   *
   *  Check URL for reset password hash
   *
   */
  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }
  }

  return {
    init: function() {
      checkUrlHash();
      initEventListeners();
      resetPasswordSuccess();
      customerAddressForm();
    }
  };
})();




/*================ SECTIONS ================*/
window.theme = window.theme || {};

theme.Filters = (function() {
  var constants = {
    SORT_BY: 'sort_by',
    DEFAULT_SORT: 'title-ascending'
  };
  var selectors = {
    filterSelection: '.filters-toolbar__input--filter',
    sortSelection: '.filters-toolbar__input--sort',
    defaultSort: '.filters-toolbar__default-sort'
  };

  function Filters(container) {
    var $container = this.$container = $(container);

    this.$filterSelect = $(selectors.filterSelection, $container);
    this.$sortSelect = $(selectors.sortSelection, $container);
    this.$selects = $(selectors.filterSelection, $container).add($(selectors.sortSelection, $container));

    this.defaultSort = this._getDefaultSortValue();
    this._resizeSelect(this.$selects);
    this.$selects.removeClass('hidden');

    this.$filterSelect.on('change', this._onFilterChange.bind(this));
    this.$sortSelect.on('change', this._onSortChange.bind(this));
  }

  Filters.prototype = _.assignIn({}, Filters.prototype, {
    _onSortChange: function(evt) {
      var query = '';

      this.sort = this._getSortValue();

    if (this.sort !== this.defaultSort) {
  query = ['?'+ constants.SORT_BY + '=' + this.sort];
  window.location.search = query;
} else {
        window.location.href = window.location.href.replace(window.location.search, '');
}
      this._resizeSelect($(evt.target));
    },

    _onFilterChange: function(evt) {
      document.location.href = this.$filterSelect.val();
      this._resizeSelect($(evt.target));
    },

    _getSortValue: function() {
      return this.$sortSelect.val() || this.defaultSort;
    },

    _getDefaultSortValue: function() {
      return $(selectors.defaultSort, this.$container).val() || constants.DEFAULT_SORT;
    },

    _resizeSelect: function($selection) {
      $selection.each(function() {
        var $this = $(this);
        var arrowWidth = 10;
        // create test element
        var text = $this.find('option:selected').text();
        var $test = $('<span>').html(text);

        // add to body, get width, and get out
        $test.appendTo('body');
        var width = $test.width();
        $test.remove();

        // set select width
        $this.width(width + arrowWidth);
      });
    },

    onUnload: function() {
      this.$filterSelect.off('change', this._onFilterChange);
      this.$sortSelect.off('change', this._onSortChange);
    }
  });

  return Filters;
})();

window.theme = window.theme || {};

theme.HeaderSection = (function() {

  function Header() {
    theme.Header.init();
    theme.Search.init();
  }

  Header.prototype = _.assignIn({}, Header.prototype, {
    onUnload: function() {
      theme.Header.unload();
    }
  });

  return Header;
})();

theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];
  var key = theme.mapKey ? theme.mapKey : '';

  function Map(container) {
    this.$container = $(container);

    if (apiStatus === 'loaded') {
      this.createMap();
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript('https://maps.googleapis.com/maps/api/js?key=' + key)
            .then(function() {
              apiStatus = 'loaded';
              initAllMaps();
            });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({address: address}, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$container.find('.map-section__container');

      return geolocate($map)
        .then(function(results) {
          var mapOptions = {
            zoom: config.zoom,
            center: results[0].geometry.location,
            disableDefaultUI: true
          };

          var map = this.map = new google.maps.Map($map[0], mapOptions);
          var center = this.center = map.getCenter();

          //eslint-disable-next-line no-unused-vars
          var marker = new google.maps.Marker({
            map: map,
            position: map.getCenter()
          });

          google.maps.event.addDomListener(window, 'resize', $.debounce(250, function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
          }));
        }.bind(this))
        .fail(function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = theme.strings.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = theme.strings.addressQueryLimit;
              break;
            default:
              errorMessage = theme.strings.addressError;
              break;
          }

          $map
            .parent()
            .addClass('page-width map-section--load-error')
            .html('<div class="errors text-center">' + errorMessage + '</div>');
        });
    },

    onUnload: function() {
      google.maps.event.clearListeners(this.map, 'resize');
    }
  });

  return Map;
})();

// Global function called by Google on auth errors.
// Show an auto error message on all map instances.
// eslint-disable-next-line camelcase, no-unused-vars
function gm_authFailure() {
  $('.map-section').addClass('map-section--load-error');
  $('.map-section__container').remove();
  $('.map-section__link').remove();
  $('.map-section__overlay').after('<div class="errors text-center">' + theme.strings.authError + '</div>');
}

/* eslint-disable no-new */
theme.Product = (function() {
  function Product(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');

    this.settings = {
      // Breakpoints from src/stylesheets/global/variables.scss.liquid
      mediaQueryMediumUp: 'screen and (min-width: 10760px)',
      mediaQuerySmall: 'screen and (max-width: 10759px)',
      bpSmall: false,
      enableHistoryState: $container.data('enable-history-state') || false,
      imageSize: null,
      imageZoomSize: null,
      namespace: '',
      sectionId: sectionId,
      sliderActive: false,
      zoomEnabled: false
    };

    this.selectors = {
      addToCart: '#AddToCart-' + sectionId,
      addToCartText: '#AddToCartText-' + sectionId,
      comparePrice: '#ComparePrice-' + sectionId,
      originalPrice: '#ProductPrice-' + sectionId,
      originalPriceWrapper: '.product-price__price-' + sectionId,
      originalSelectorId: '#ProductSelect-' + sectionId,
      productFeaturedImage: '#FeaturedImage-' + sectionId,
      productImageWrap: '#FeaturedImageZoom-' + sectionId,
      productPrices: '.product-section__price-' + sectionId,
      productThumbImages: '.product-section__thumbnail--' + sectionId,
      saleClasses: 'product-price__sale product-price__sale--single',
      saleLabel: '.product-price__sale-label-' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId
    }

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$('#ProductJson-' + sectionId).html()) {
      return;
    }

    this.productSingleObject = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);

    this.settings.zoomEnabled = $(this.selectors.productFeaturedImage).hasClass('js-zoom-enabled');
    this.settings.imageSize = theme.Images.imageSize($(this.selectors.productFeaturedImage).attr('src'));

    if (this.settings.zoomEnabled) {
      this.settings.imageZoomSize = theme.Images.imageSize($(this.selectors.productImageWrap).data('zoom'));
    }

    this._initBreakpoints();
    this._stringOverrides();
    this._initVariants();
    this._initImageSwitch();
    this._setActiveThumbnail();

    // Pre-loading product images to avoid a lag when a thumbnail is clicked, or
    // when a variant is selected that has a variant image
    theme.Images.preload(this.productSingleObject.images, this.settings.imageSize);
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    _stringOverrides: function() {
      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },

    _initBreakpoints: function() {
      var self = this;

      enquire.register(this.settings.mediaQuerySmall, {
        match: function() {
          // destroy image zooming if enabled
          if (self.settings.zoomEnabled) {
            _destroyZoom($(self.selectors.productImageWrap));
          }

          self.settings.bpSmall = true;
        },
        unmatch: function() {
          self.settings.bpSmall = false;
        }
      });

      enquire.register(this.settings.mediaQueryMediumUp, {
        match: function() {
          if (self.settings.zoomEnabled) {
            _enableZoom($(self.selectors.productImageWrap));
          }
        }
      });
    },

    _initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState: this.$container.data('enable-history-state') || false,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);

      this.$container.on('variantChange' + this.settings.namespace, this._updateAddToCart.bind(this));
      this.$container.on('variantImageChange' + this.settings.namespace, this._updateImages.bind(this));
      this.$container.on('variantPriceChange' + this.settings.namespace, this._updatePrice.bind(this));
    },

    _initImageSwitch: function() {
      if (!$(this.selectors.productThumbImages).length) {
        return;
      }

      var self = this;

      $(this.selectors.productThumbImages).on('click', function(evt) {
        evt.preventDefault();
        var $el = $(this);
        var imageSrc = $el.attr('href');
        var zoomSrc = $el.data('zoom');

        self._switchImage(imageSrc, zoomSrc);
        self._setActiveThumbnail(imageSrc);
      });
    },

    _setActiveThumbnail: function(src) {
      var activeClass = 'active-thumb';

      // If there is no element passed, find it by the current product image
      if (typeof src === 'undefined') {
        src = $(this.selectors.productFeaturedImage).attr('src');
      }

      // Set active thumbnails (incl. slick cloned thumbs) with matching 'href'
      var $thumbnail = $(this.selectors.productThumbImages + '[href="' + src + '"]');
      $(this.selectors.productThumbImages).removeClass(activeClass);
      $thumbnail.addClass(activeClass);
    },

    _switchImage: function(image, zoomImage) {
      $(this.selectors.productFeaturedImage).attr('src', image);

      // destroy image zooming if enabled
      if (this.settings.zoomEnabled) {
        _destroyZoom($(this.selectors.productImageWrap));
      }

      if (!this.settings.bpSmall && this.settings.zoomEnabled && zoomImage) {
        $(this.selectors.productImageWrap).data('zoom', zoomImage);
        _enableZoom($(this.selectors.productImageWrap));
      }
    },

    _updateAddToCart: function(evt) {
      var variant = evt.variant;

      if (variant) {
        $(this.selectors.productPrices)
          .removeClass('visibility-hidden')
          .attr('aria-hidden', 'true');

        if (variant.available) {
          $(this.selectors.addToCart).prop('disabled', false);
          $(this.selectors.addToCartText).text(theme.strings.addToCart);
        } else {
          // The variant doesn't exist, disable submit button and change the text.
          // This may be an error or notice that a specific variant is not available.
          $(this.selectors.addToCart).prop('disabled', true);
          $(this.selectors.addToCartText).text(theme.strings.soldOut);
        }
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCartText).text(theme.strings.unavailable);
        $(this.selectors.productPrices)
          .addClass('visibility-hidden')
          .attr('aria-hidden', 'false');
      }
    },

    _updateImages: function(evt) {
      var variant = evt.variant;
      var sizedImgUrl = theme.Images.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);
      var zoomSizedImgUrl;

      if (this.settings.zoomEnabled) {
        zoomSizedImgUrl = theme.Images.getSizedImageUrl(variant.featured_image.src, this.settings.imageZoomSize);
      }

      this._switchImage(sizedImgUrl, zoomSizedImgUrl);
      this._setActiveThumbnail(sizedImgUrl);
    },

    _updatePrice: function(evt) {
      var variant = evt.variant;

      // Update the product price
      $(this.selectors.originalPrice).html(theme.Currency.formatMoney(variant.price, theme.moneyFormat));

      // Update and show the product's compare price if necessary
      if (variant.compare_at_price > variant.price) {
        $(this.selectors.comparePrice)
          .html(theme.Currency.formatMoney(variant.compare_at_price, theme.moneyFormat))
          .removeClass('hide');

        $(this.selectors.originalPriceWrapper).addClass(this.selectors.saleClasses);

        $(this.selectors.saleLabel).removeClass('hide');
      } else {
        $(this.selectors.comparePrice).addClass('hide');
        $(this.selectors.saleLabel).addClass('hide');
        $(this.selectors.originalPriceWrapper).removeClass(this.selectors.saleClasses);
      }
    },

    onUnload: function() {
      this.$container.off(this.settings.namespace);
    }
  });

  function _enableZoom($el) {
    var zoomUrl = $el.data('zoom');
    $el.zoom({
      url: zoomUrl
    });
  }

  function _destroyZoom($el) {
    $el.trigger('zoom.destroy');
  }

  return Product;
})();

theme.Quotes = (function() {
  var config = {
    mediaQuerySmall: 'screen and (max-width: 10759px)',
    mediaQueryMediumUp: 'screen and (min-width: 10760px)',
    slideCount: 0
  };
  var defaults = {
    accessibility: true,
    arrows: false,
    dots: true,
    autoplay: false,
    touchThreshold: 20,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  function Quotes(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var wrapper = this.wrapper = '.quotes-wrapper';
    var slider = this.slider = '#Quotes-' + sectionId;
    var $slider = $(slider, wrapper);

    var sliderActive = false;
    var mobileOptions = $.extend({}, defaults, {
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    });

    config.slideCount = $slider.data('count');

    // Override slidesToShow/Scroll if there are not enough blocks
    if (config.slideCount < defaults.slidesToShow) {
      defaults.slidesToShow = config.slideCount;
      defaults.slidesToScroll = config.slideCount;
    }

    $slider.on('init', this.a11y.bind(this));

    enquire.register(config.mediaQuerySmall, {
      match: function() {
        initSlider($slider, mobileOptions);
      }
    });

    enquire.register(config.mediaQueryMediumUp, {
      match: function() {
        initSlider($slider, defaults);
      }
    });

    function initSlider(sliderObj, args) {
      if (sliderActive) {
        sliderObj.slick('unslick');
        sliderActive = false;
      }

      sliderObj.slick(args);
      sliderActive = true;
    }
  }

  Quotes.prototype = _.assignIn({}, Quotes.prototype, {
    onUnload: function() {
      enquire.unregister(config.mediaQuerySmall);
      enquire.unregister(config.mediaQueryMediumUp);

      $(this.slider, this.wrapper).slick('unslick');
    },

    onBlockSelect: function(evt) {
      // Ignore the cloned version
      var $slide = $('.quotes-slide--' + evt.detail.blockId + ':not(.slick-cloned)');
      var slideIndex = $slide.data('slick-index');

      // Go to selected slide, pause autoplay
      $(this.slider, this.wrapper).slick('slickGoTo', slideIndex);
    },

    a11y: function(event, obj) {
      var $list = obj.$list;
      var $wrapper = $(this.wrapper, this.$container);

      // Remove default Slick aria-live attr until slider is focused
      $list.removeAttr('aria-live');

      // When an element in the slider is focused set aria-live
      $wrapper.on('focusin', function(evt) {
        if ($wrapper.has(evt.target).length) {
          $list.attr('aria-live', 'polite');
        }
      });

      // Remove aria-live
      $wrapper.on('focusout', function(evt) {
        if ($wrapper.has(evt.target).length) {
          $list.removeAttr('aria-live');
        }
      });
    }
  });

  return Quotes;
})();


$(document).ready(function() {
  var sections = new theme.Sections();

  sections.register('cart-template', theme.Cart);
  sections.register('product', theme.Product);
  sections.register('collection-template', theme.Filters);
  sections.register('product-template', theme.Product);
  sections.register('header-section', theme.HeaderSection);
  sections.register('map', theme.Maps);
  sections.register('quotes', theme.Quotes);
});

theme.init = function() {
  theme.customerTemplates.init();

  slate.rte.wrapTable();
  slate.rte.iframeReset();

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  $('a[href="#"]').on('click', function(evt) {
    evt.preventDefault();
  });

};
// http://madewithenvy.com/ecosystem/articles/2015/exploring-order-flexbox-carousel/
var $carousel = $('.carousel');
var $seats = $('.carousel-seat');

$('.toggle').on('click', function(e) {
  var $newSeat;
  var $el = $('.is-ref');
  var $currSliderControl = $(e.currentTarget);
  // Info: e.target is what triggers the event dispatcher to trigger and e.currentTarget is what you assigned your listener to.

  $el.removeClass('is-ref');
  if ($currSliderControl.data('toggle') === 'next') {
    $newSeat = next($el);
    $carousel.removeClass('is-reversing');
  } else {
    $newSeat = prev($el);
    $carousel.addClass('is-reversing');
  }

  $newSeat.addClass('is-ref').css('order', 1);
  for (var i = 2; i <= $seats.length; i++) {
    $newSeat = next($newSeat).css('order', i);
  }

  $carousel.removeClass('is-set');
  return setTimeout(function() {
    return $carousel.addClass('is-set');
  }, 50);

  function next($el) {
    if ($el.next().length) {
      return $el.next();
    } else {
      return $seats.first();
    }
  }

  function prev($el) {
    if ($el.prev().length) {
      return $el.prev();
    } else {
      return $seats.last();
    }
  }
});

$(function() {
  var loc = window.location.href; // returns the full URL
  if(/challenge#contact_form/.test(loc)) {
    $('div#sticky_coupon').addClass('tech');
  }
  /*
   * Add custom class to reviews stamp
   */
  var stampedIOBadge = $('.stamped-product-reviews-badge.stamped-main-badge');
  stampedIOBadge.on('DOMSubtreeModified', function() {
    var stampedBadgeSpan = stampedIOBadge.find('.stamped-badge');
    if (stampedBadgeSpan.length > 0 && !stampedBadgeSpan.hasClass('product-section__form-reviews-stamp'))
      stampedBadgeSpan.addClass('product-section__form-reviews-stamp');
   });

  /*
   * Quantity inputs
   */
  $('.product-section__qty-input').focusout(function() {
    if ($(this).val() < 1)
    $(this).val(1);
    else if ($(this).val() > 99)
    $(this).val(99);
  });
  $('.product-section__qty-increase').on('click', function() {
    var oldVal = $(this).siblings('.product-section__qty-input').val();
    var newVal = parseInt(oldVal) + 1;
    if (newVal < 100)
      $(this).siblings('.product-section__qty-input').val(newVal);
  });
  $('.product-section__qty-decrease').on('click', function() {
    var oldVal = $(this).siblings('.product-section__qty-input').val();
    var newVal = parseInt(oldVal) - 1;
    if (newVal > 0)
      $(this).siblings('.product-section__qty-input').val(newVal);
  });
});

$(theme.init);
  
  
// fancybox.js
!function(e,t,i,n){"use strict";var a=i("html"),s=i(e),o=i(t),r=i.fancybox=function(){r.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),c=null,d=t.createTouch!==n,h=function(e){return e&&e.hasOwnProperty&&e instanceof i},p=function(e){return e&&"string"===i.type(e)},u=function(e){return p(e)&&e.indexOf("%")>0},f=function(e){return e&&!(e.style.overflow&&"hidden"===e.style.overflow)&&(e.clientWidth&&e.scrollWidth>e.clientWidth||e.clientHeight&&e.scrollHeight>e.clientHeight)},g=function(e,t){var i=parseInt(e,10)||0;return t&&u(e)&&(i=r.getViewport()[t]/100*i),Math.ceil(i)},m=function(e,t){return g(e,t)+"px"};i.extend(r,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!d,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:i.noop,beforeLoad:i.noop,afterLoad:i.noop,beforeShow:i.noop,afterShow:i.noop,beforeChange:i.noop,beforeClose:i.noop,afterClose:i.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(i.isPlainObject(t)||(t={}),!1!==r.close(!0))?(i.isArray(e)||(e=h(e)?i(e).get():[e]),i.each(e,function(a,s){var o,l,c,d,u,f,g,m={};"object"===i.type(s)&&(s.nodeType&&(s=i(s)),h(s)?(m={href:s.data("fancybox-href")||s.attr("href"),title:s.data("fancybox-title")||s.attr("title"),isDom:!0,element:s},i.metadata&&i.extend(!0,m,s.metadata())):m=s),o=t.href||m.href||(p(s)?s:null),l=t.title!==n?t.title:m.title||"",c=t.content||m.content,d=c?"html":t.type||m.type,!d&&m.isDom&&(d=s.data("fancybox-type"),d||(u=s.prop("class").match(/fancybox\.(\w+)/),d=u?u[1]:null)),p(o)&&(d||(r.isImage(o)?d="image":r.isSWF(o)?d="swf":"#"===o.charAt(0)?d="inline":p(s)&&(d="html",c=s)),"ajax"===d&&(f=o.split(/\s+/,2),o=f.shift(),g=f.shift())),c||("inline"===d?o?c=i(p(o)?o.replace(/.*(?=#[^\s]+$)/,""):o):m.isDom&&(c=s):"html"===d?c=o:d||o||!m.isDom||(d="inline",c=s)),i.extend(m,{href:o,type:d,content:c,title:l,selector:g}),e[a]=m}),r.opts=i.extend(!0,{},r.defaults,t),t.keys!==n&&(r.opts.keys=t.keys?i.extend({},r.defaults.keys,t.keys):!1),r.group=e,r._start(r.opts.index)):void 0},cancel:function(){var e=r.coming;e&&!1!==r.trigger("onCancel")&&(r.hideLoading(),r.ajaxLoad&&r.ajaxLoad.abort(),r.ajaxLoad=null,r.imgPreload&&(r.imgPreload.onload=r.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),r.coming=null,r.current||r._afterZoomOut(e))},close:function(e){r.cancel(),!1!==r.trigger("beforeClose")&&(r.unbindEvents(),r.isActive&&(r.isOpen&&e!==!0?(r.isOpen=r.isOpened=!1,r.isClosing=!0,i(".fancybox-item, .fancybox-nav").remove(),r.wrap.stop(!0,!0).removeClass("fancybox-opened"),r.transitions[r.current.closeMethod]()):(i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),r._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(r.player.timer)},i=function(){t(),r.current&&r.player.isActive&&(r.player.timer=setTimeout(r.next,r.current.playSpeed))},n=function(){t(),o.unbind(".player"),r.player.isActive=!1,r.trigger("onPlayEnd")},a=function(){r.current&&(r.current.loop||r.current.index<r.group.length-1)&&(r.player.isActive=!0,o.bind({"onCancel.player beforeClose.player":n,"onUpdate.player":i,"beforeLoad.player":t}),i(),r.trigger("onPlayStart"))};e===!0||!r.player.isActive&&e!==!1?a():n()},next:function(e){var t=r.current;t&&(p(e)||(e=t.direction.next),r.jumpto(t.index+1,e,"next"))},prev:function(e){var t=r.current;t&&(p(e)||(e=t.direction.prev),r.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,i){var a=r.current;a&&(e=g(e),r.direction=t||a.direction[e>=a.index?"next":"prev"],r.router=i||"jumpto",a.loop&&(0>e&&(e=a.group.length+e%a.group.length),e%=a.group.length),a.group[e]!==n&&(r.cancel(),r._start(e)))},reposition:function(e,t){var n,a=r.current,s=a?a.wrap:null;s&&(n=r._getPosition(t),e&&"scroll"===e.type?(delete n.position,s.stop(!0,!0).animate(n,200)):(s.css(n),a.pos=i.extend({},a.dim,n)))},update:function(e){var t=e&&e.type,i=!t||"orientationchange"===t;i&&(clearTimeout(c),c=null),r.isOpen&&!c&&(c=setTimeout(function(){var n=r.current;n&&!r.isClosing&&(r.wrap.removeClass("fancybox-tmp"),(i||"load"===t||"resize"===t&&n.autoResize)&&r._setDimension(),"scroll"===t&&n.canShrink||r.reposition(e),r.trigger("onUpdate"),c=null)},i&&!d?0:300))},toggle:function(e){r.isOpen&&(r.current.fitToView="boolean"===i.type(e)?e:!r.current.fitToView,d&&(r.wrap.removeAttr("style").addClass("fancybox-tmp"),r.trigger("onUpdate")),r.update())},hideLoading:function(){o.unbind(".loading"),i("#fancybox-loading").remove()},showLoading:function(){var e,t;r.hideLoading(),e=i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"),o.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),r.cancel())}),r.defaults.fixed||(t=r.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=r.current&&r.current.locked||!1,i={x:s.scrollLeft(),y:s.scrollTop()};return t?(i.w=t[0].clientWidth,i.h=t[0].clientHeight):(i.w=d&&e.innerWidth?e.innerWidth:s.width(),i.h=d&&e.innerHeight?e.innerHeight:s.height()),i},unbindEvents:function(){r.wrap&&h(r.wrap)&&r.wrap.unbind(".fb"),o.unbind(".fb"),s.unbind(".fb")},bindEvents:function(){var e,t=r.current;t&&(s.bind("orientationchange.fb"+(d?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),r.update),e=t.keys,e&&o.bind("keydown.fb",function(a){var s=a.which||a.keyCode,o=a.target||a.srcElement;return 27===s&&r.coming?!1:(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||o&&(o.type||i(o).is("[contenteditable]"))||i.each(e,function(e,o){return t.group.length>1&&o[s]!==n?(r[e](o[s]),a.preventDefault(),!1):i.inArray(s,o)>-1?(r[e](),a.preventDefault(),!1):void 0}),void 0)}),i.fn.mousewheel&&t.mouseWheel&&r.wrap.bind("mousewheel.fb",function(e,n,a,s){for(var o=e.target||null,l=i(o),c=!1;l.length&&!(c||l.is(".fancybox-skin")||l.is(".fancybox-wrap"));)c=f(l[0]),l=i(l).parent();0===n||c||r.group.length>1&&!t.canShrink&&(s>0||a>0?r.prev(s>0?"down":"left"):(0>s||0>a)&&r.next(0>s?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var n,a=t||r.coming||r.current;if(a){if(i.isFunction(a[e])&&(n=a[e].apply(a,Array.prototype.slice.call(arguments,1))),n===!1)return!1;a.helpers&&i.each(a.helpers,function(t,n){n&&r.helpers[t]&&i.isFunction(r.helpers[t][e])&&r.helpers[t][e](i.extend(!0,{},r.helpers[t].defaults,n),a)}),o.trigger(e)}},isImage:function(e){return p(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return p(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,n,a,s,o,l={};if(e=g(e),t=r.group[e]||null,!t)return!1;if(l=i.extend(!0,{},r.opts,t),s=l.margin,o=l.padding,"number"===i.type(s)&&(l.margin=[s,s,s,s]),"number"===i.type(o)&&(l.padding=[o,o,o,o]),l.modal&&i.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),l.autoSize&&(l.autoWidth=l.autoHeight=!0),"auto"===l.width&&(l.autoWidth=!0),"auto"===l.height&&(l.autoHeight=!0),l.group=r.group,l.index=e,r.coming=l,!1===r.trigger("beforeLoad"))return r.coming=null,void 0;if(a=l.type,n=l.href,!a)return r.coming=null,r.current&&r.router&&"jumpto"!==r.router?(r.current.index=e,r[r.router](r.direction)):!1;if(r.isActive=!0,("image"===a||"swf"===a)&&(l.autoHeight=l.autoWidth=!1,l.scrolling="visible"),"image"===a&&(l.aspectRatio=!0),"iframe"===a&&d&&(l.scrolling="scroll"),l.wrap=i(l.tpl.wrap).addClass("fancybox-"+(d?"mobile":"desktop")+" fancybox-type-"+a+" fancybox-tmp "+l.wrapCSS).appendTo(l.parent||"body"),i.extend(l,{skin:i(".fancybox-skin",l.wrap),outer:i(".fancybox-outer",l.wrap),inner:i(".fancybox-inner",l.wrap)}),i.each(["Top","Right","Bottom","Left"],function(e,t){l.skin.css("padding"+t,m(l.padding[e]))}),r.trigger("onReady"),"inline"===a||"html"===a){if(!l.content||!l.content.length)return r._error("content")}else if(!n)return r._error("href");"image"===a?r._loadImage():"ajax"===a?r._loadAjax():"iframe"===a?r._loadIframe():r._afterLoad()},_error:function(e){i.extend(r.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:r.coming.tpl.error}),r._afterLoad()},_loadImage:function(){var e=r.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,r.coming.width=this.width/r.opts.pixelRatio,r.coming.height=this.height/r.opts.pixelRatio,r._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,r._error("image")},e.src=r.coming.href,e.complete!==!0&&r.showLoading()},_loadAjax:function(){var e=r.coming;r.showLoading(),r.ajaxLoad=i.ajax(i.extend({},e.ajax,{url:e.href,error:function(e,t){r.coming&&"abort"!==t?r._error("ajax",e):r.hideLoading()},success:function(t,i){"success"===i&&(e.content=t,r._afterLoad())}}))},_loadIframe:function(){var e=r.coming,t=i(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",d?"auto":e.iframe.scrolling).attr("src",e.href);i(e.wrap).bind("onReset",function(){try{i(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(r.showLoading(),t.one("load",function(){i(this).data("ready",1),d||i(this).bind("load.fb",r.update),i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),r._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||r._afterLoad()},_preloadImages:function(){var e,t,i=r.group,n=r.current,a=i.length,s=n.preload?Math.min(n.preload,a-1):0;for(t=1;s>=t;t+=1)e=i[(n.index+t)%a],"image"===e.type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,n,a,s,o,l=r.coming,c=r.current,d="fancybox-placeholder";if(r.hideLoading(),l&&r.isActive!==!1){if(!1===r.trigger("afterLoad",l,c))return l.wrap.stop(!0).trigger("onReset").remove(),r.coming=null,void 0;switch(c&&(r.trigger("beforeChange",c),c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),r.unbindEvents(),e=l,t=l.content,n=l.type,a=l.scrolling,i.extend(r,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:c}),s=e.href,n){case"inline":case"ajax":case"html":e.selector?t=i("<div>").html(t).find(e.selector):h(t)&&(t.data(d)||t.data(d,i('<div class="'+d+'"></div>').insertAfter(t).hide()),t=t.show().detach(),e.wrap.bind("onReset",function(){i(this).find(t).length&&t.hide().replaceAll(t.data(d)).data(d,!1)}));break;case"image":t=e.tpl.image.replace("{href}",s);break;case"swf":t='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+s+'"></param>',o="",i.each(e.swf,function(e,i){t+='<param name="'+e+'" value="'+i+'"></param>',o+=" "+e+'="'+i+'"'}),t+='<embed src="'+s+'" type="application/x-shockwave-flash" width="100%" height="100%"'+o+"></embed></object>"}h(t)&&t.parent().is(e.inner)||e.inner.append(t),r.trigger("beforeShow"),e.inner.css("overflow","yes"===a?"scroll":"no"===a?"hidden":a),r._setDimension(),r.reposition(),r.isOpen=!1,r.coming=null,r.bindEvents(),r.isOpened?c.prevMethod&&r.transitions[c.prevMethod]():i(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),r.transitions[r.isOpened?e.nextMethod:e.openMethod](),r._preloadImages()}},_setDimension:function(){var e,t,n,a,s,o,l,c,d,h,p,f,v,w,b,y=r.getViewport(),x=0,_=!1,k=!1,j=r.wrap,C=r.skin,I=r.inner,T=r.current,S=T.width,W=T.height,H=T.minWidth,L=T.minHeight,D=T.maxWidth,A=T.maxHeight,P=T.scrolling,B=T.scrollOutside?T.scrollbarWidth:0,M=T.margin,R=g(M[1]+M[3]),O=g(M[0]+M[2]);if(j.add(C).add(I).width("auto").height("auto").removeClass("fancybox-tmp"),e=g(C.outerWidth(!0)-C.width()),t=g(C.outerHeight(!0)-C.height()),n=R+e,a=O+t,s=u(S)?(y.w-n)*g(S)/100:S,o=u(W)?(y.h-a)*g(W)/100:W,"iframe"===T.type){if(w=T.content,T.autoHeight&&1===w.data("ready"))try{w[0].contentWindow.document.location&&(I.width(s).height(9999),b=w.contents().find("body"),B&&b.css("overflow-x","hidden"),o=b.outerHeight(!0))}catch(E){}}else(T.autoWidth||T.autoHeight)&&(I.addClass("fancybox-tmp"),T.autoWidth||I.width(s),T.autoHeight||I.height(o),T.autoWidth&&(s=I.width()),T.autoHeight&&(o=I.height()),I.removeClass("fancybox-tmp"));if(S=g(s),W=g(o),d=s/o,H=g(u(H)?g(H,"w")-n:H),D=g(u(D)?g(D,"w")-n:D),L=g(u(L)?g(L,"h")-a:L),A=g(u(A)?g(A,"h")-a:A),l=D,c=A,T.fitToView&&(D=Math.min(y.w-n,D),A=Math.min(y.h-a,A)),f=y.w-R,v=y.h-O,T.aspectRatio?(S>D&&(S=D,W=g(S/d)),W>A&&(W=A,S=g(W*d)),H>S&&(S=H,W=g(S/d)),L>W&&(W=L,S=g(W*d))):(S=Math.max(H,Math.min(S,D)),T.autoHeight&&"iframe"!==T.type&&(I.width(S),W=I.height()),W=Math.max(L,Math.min(W,A))),T.fitToView)if(I.width(S).height(W),j.width(S+e),h=j.width(),p=j.height(),T.aspectRatio)for(;(h>f||p>v)&&S>H&&W>L&&!(x++>19);)W=Math.max(L,Math.min(A,W-10)),S=g(W*d),H>S&&(S=H,W=g(S/d)),S>D&&(S=D,W=g(S/d)),I.width(S).height(W),j.width(S+e),h=j.width(),p=j.height();else S=Math.max(H,Math.min(S,S-(h-f))),W=Math.max(L,Math.min(W,W-(p-v)));B&&"auto"===P&&o>W&&f>S+e+B&&(S+=B),I.width(S).height(W),j.width(S+e),h=j.width(),p=j.height(),_=(h>f||p>v)&&S>H&&W>L,k=T.aspectRatio?l>S&&c>W&&s>S&&o>W:(l>S||c>W)&&(s>S||o>W),i.extend(T,{dim:{width:m(h),height:m(p)},origWidth:s,origHeight:o,canShrink:_,canExpand:k,wPadding:e,hPadding:t,wrapSpace:p-C.outerHeight(!0),skinSpace:C.height()-W}),!w&&T.autoHeight&&W>L&&A>W&&!k&&I.height("auto")},_getPosition:function(e){var t=r.current,i=r.getViewport(),n=t.margin,a=r.wrap.width()+n[1]+n[3],s=r.wrap.height()+n[0]+n[2],o={position:"absolute",top:n[0],left:n[3]};return t.autoCenter&&t.fixed&&!e&&s<=i.h&&a<=i.w?o.position="fixed":t.locked||(o.top+=i.y,o.left+=i.x),o.top=m(Math.max(o.top,o.top+(i.h-s)*t.topRatio)),o.left=m(Math.max(o.left,o.left+(i.w-a)*t.leftRatio)),o},_afterZoomIn:function(){var e=r.current;e&&(r.isOpen=r.isOpened=!0,r.wrap.css("overflow","visible").addClass("fancybox-opened"),r.update(),(e.closeClick||e.nextClick&&r.group.length>1)&&r.inner.css("cursor","pointer").bind("click.fb",function(t){i(t.target).is("a")||i(t.target).parent().is("a")||(t.preventDefault(),r[e.closeClick?"close":"next"]())}),e.closeBtn&&i(e.tpl.closeBtn).appendTo(r.skin).bind("click.fb",function(e){e.preventDefault(),r.close()}),e.arrows&&r.group.length>1&&((e.loop||e.index>0)&&i(e.tpl.prev).appendTo(r.outer).bind("click.fb",r.prev),(e.loop||e.index<r.group.length-1)&&i(e.tpl.next).appendTo(r.outer).bind("click.fb",r.next)),r.trigger("afterShow"),e.loop||e.index!==e.group.length-1?r.opts.autoPlay&&!r.player.isActive&&(r.opts.autoPlay=!1,r.play()):r.play(!1))},_afterZoomOut:function(e){e=e||r.current,i(".fancybox-wrap").trigger("onReset").remove(),i.extend(r,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),r.trigger("afterClose",e)}}),r.transitions={getOrigPosition:function(){var e=r.current,t=e.element,i=e.orig,n={},a=50,s=50,o=e.hPadding,l=e.wPadding,c=r.getViewport();return!i&&e.isDom&&t.is(":visible")&&(i=t.find("img:first"),i.length||(i=t)),h(i)?(n=i.offset(),i.is("img")&&(a=i.outerWidth(),s=i.outerHeight())):(n.top=c.y+(c.h-s)*e.topRatio,n.left=c.x+(c.w-a)*e.leftRatio),("fixed"===r.wrap.css("position")||e.locked)&&(n.top-=c.y,n.left-=c.x),n={top:m(n.top-o*e.topRatio),left:m(n.left-l*e.leftRatio),width:m(a+l),height:m(s+o)}},step:function(e,t){var i,n,a,s=t.prop,o=r.current,l=o.wrapSpace,c=o.skinSpace;("width"===s||"height"===s)&&(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),r.isClosing&&(i=1-i),n="width"===s?o.wPadding:o.hPadding,a=e-n,r.skin[s](g("width"===s?a:a-l*i)),r.inner[s](g("width"===s?a:a-l*i-c*i)))},zoomIn:function(){var e=r.current,t=e.pos,n=e.openEffect,a="elastic"===n,s=i.extend({opacity:1},t);delete s.position,a?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===n&&(t.opacity=.1),r.wrap.css(t).animate(s,{duration:"none"===n?0:e.openSpeed,easing:e.openEasing,step:a?this.step:null,complete:r._afterZoomIn})},zoomOut:function(){var e=r.current,t=e.closeEffect,i="elastic"===t,n={opacity:.1};i&&(n=this.getOrigPosition(),e.closeOpacity&&(n.opacity=.1)),r.wrap.animate(n,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:r._afterZoomOut})},changeIn:function(){var e,t=r.current,i=t.nextEffect,n=t.pos,a={opacity:1},s=r.direction,o=200;n.opacity=.1,"elastic"===i&&(e="down"===s||"up"===s?"top":"left","down"===s||"right"===s?(n[e]=m(g(n[e])-o),a[e]="+="+o+"px"):(n[e]=m(g(n[e])+o),a[e]="-="+o+"px")),"none"===i?r._afterZoomIn():r.wrap.css(n).animate(a,{duration:t.nextSpeed,easing:t.nextEasing,complete:r._afterZoomIn})},changeOut:function(){var e=r.previous,t=e.prevEffect,n={opacity:.1},a=r.direction,s=200;"elastic"===t&&(n["down"===a||"up"===a?"top":"left"]=("up"===a||"left"===a?"-":"+")+"="+s+"px"),e.wrap.animate(n,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){i(this).trigger("onReset").remove()}})}},r.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!d,fixed:!0},overlay:null,fixed:!1,el:i("html"),create:function(e){e=i.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=i('<div class="fancybox-overlay"></div>').appendTo(r.coming?r.coming.parent:e.parent),this.fixed=!1,e.fixed&&r.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=i.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(s.bind("resize.overlay",i.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){return i(e.target).hasClass("fancybox-overlay")?(r.isActive?r.close():t.close(),!1):void 0}),this.overlay.css(e.css).show()},close:function(){var e,t;s.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(i(".fancybox-margin").removeClass("fancybox-margin"),e=s.scrollTop(),t=s.scrollLeft(),this.el.removeClass("fancybox-lock"),s.scrollTop(e).scrollLeft(t)),i(".fancybox-overlay").remove().hide(),i.extend(this,{overlay:null,fixed:!1})},update:function(){var e,i="100%";this.overlay.width(i).height("100%"),l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),o.width()>e&&(i=o.width())):o.width()>s.width()&&(i=o.width()),this.overlay.width(i).height(o.height())},onReady:function(e,t){var n=this.overlay;i(".fancybox-overlay").stop(!0,!0),n||this.create(e),e.locked&&this.fixed&&t.fixed&&(n||(this.margin=o.height()>s.height()?i("html").css("margin-right").replace("px",""):!1),t.locked=this.overlay.append(t.wrap),t.fixed=!1),e.showEarly===!0&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){var n,a;t.locked&&(this.margin!==!1&&(i("*").filter(function(){return"fixed"===i(this).css("position")&&!i(this).hasClass("fancybox-overlay")&&!i(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),n=s.scrollTop(),a=s.scrollLeft(),this.el.addClass("fancybox-lock"),s.scrollTop(n).scrollLeft(a)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!r.coming&&this.overlay.fadeOut(e.speedOut,i.proxy(this.close,this))}},r.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t,n,a=r.current,s=a.title,o=e.type;if(i.isFunction(s)&&(s=s.call(a.element,a)),p(s)&&""!==i.trim(s)){switch(t=i('<div class="fancybox-title fancybox-title-'+o+'-wrap">'+s+"</div>"),o){case"inside":n=r.skin;break;case"outside":n=r.wrap;break;case"over":n=r.inner;break;default:n=r.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),r.current.margin[2]+=Math.abs(g(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](n)}}},i.fn.fancybox=function(e){var t,n=i(this),a=this.selector||"",s=function(s){var o,l,c=i(this).blur(),d=t;s.ctrlKey||s.altKey||s.shiftKey||s.metaKey||c.is(".fancybox-wrap")||(o=e.groupAttr||"data-fancybox-group",l=c.attr(o),l||(o="rel",l=c.get(0)[o]),l&&""!==l&&"nofollow"!==l&&(c=a.length?i(a):n,c=c.filter("["+o+'="'+l+'"]'),d=c.index(this)),e.index=d,r.open(c,e)!==!1&&s.preventDefault())};return e=e||{},t=e.index||0,a&&e.live!==!1?o.undelegate(a,"click.fb-start").delegate(a+":not('.fancybox-item, .fancybox-nav')","click.fb-start",s):n.unbind("click.fb-start").bind("click.fb-start",s),this.filter("[data-fancybox-start=1]").trigger("click"),this},o.ready(function(){var t,s;i.scrollbarWidth===n&&(i.scrollbarWidth=function(){var e=i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),n=t.innerWidth()-t.height(99).innerWidth();return e.remove(),n}),i.support.fixedPosition===n&&(i.support.fixedPosition=function(){var e=i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),t=20===e[0].offsetTop||15===e[0].offsetTop;return e.remove(),t}()),i.extend(r.defaults,{scrollbarWidth:i.scrollbarWidth(),fixed:i.support.fixedPosition,parent:i("body")}),t=i(e).width(),a.addClass("fancybox-lock-test"),s=i(e).width(),a.removeClass("fancybox-lock-test"),i("<style type='text/css'>.fancybox-margin{margin-right:"+(s-t)+"px;}</style>").appendTo("head")})}(window,document,jQuery);

//zoom.js
!function(o){o.fn.zoomIn=function(t){try{var e=null,n=null,s=!0,a=o.extend({description:!1,message:"default message",transition:{time:"0.1s",type:"ease-out"},step:.5,zoom:2,zoomMax:10,zoomMin:1.5,rate:80,callback:null},t);return this.each(function(){var t=o(this),i=t.wrap('<div class="zoomIn"></div>').parent();a.description&&t.after('<div class="description"><h2>'+a.message+'</h2><span class="zoom">'+a.zoom+"</span></div>");var r=function(o,t){var e=t.pageX-o.offset().left,n=t.pageY-o.offset().top;return{x:Math.floor(e/o.width()*100)+"%",y:Math.floor(n/o.height()*100)+"%"}};i.on("mouseenter",function(o){n=r(i,o),t.css({"transform-origin":n.x+n.y,transform:"scale("+a.zoom+")"}),e=setInterval(function(){s=!0},a.rate)}),i.on("mousemove",function(o){s&&(n=r(i,o),t.css({transition:"transform-origin "+a.transition.time+" "+a.transition.type,"transform-origin":n.x+n.y}),s=!1)}),i.on("mouseleave",function(){t.removeAttr("style"),clearInterval(e)}),i.on("DOMMouseScroll mousewheel",function(o){return o.originalEvent.detail>0||o.originalEvent.wheelDelta/120<=0?a.zoom>a.zoomMin&&(a.zoom-=a.step):a.zoom<a.zoomMax&&(a.zoom+=a.step),t.css("transform","scale("+a.zoom+")"),i.find(".zoom").html(a.zoom.toFixed(2)),!1})})}catch(o){console.log(o)}}}(jQuery);
