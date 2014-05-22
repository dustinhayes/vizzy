;(function ( $, win ) {
    
    var vizzy = {

        defaults : {
            delay : 500
        },

        init : function ( $element, options ) {
            var settings = $.extend( {}, this.defaults, options );

            $(win)
                .on(
                    'load',
                    this.scrolling.bind($element, settings)
                )
                .on(
                    'scroll resize',
                    this.debounce(
                        this.scrolling.bind($element, settings),
                        settings.delay
                    )
                );
        },

        scrolling : function ( settings, event ) {
            var setts = settings,
                
                setts_class = setts.toggleClass,
                
                setts_fn_vis = setts.visible,
                setts_fn_invis = setts.invisible,

                $element = this,

                el_h = $element.height(),
                el_w = $element.width(),
                
                el_p = $element.position(),
                el_p_t = el_p.top,
                el_p_l = el_p.left,

                win_h = win.innerHeight,
                win_w = win.innerWidth,
                
                win_y = win.scrollY,
                win_x = win.scrollX,

                is_visible = (el_p_t <= win_y + win_h) && (el_p_t + el_h >= win_y) &&
                             (el_p_l <= win_x + win_w) && (el_p_l + el_w >= win_x);


            if ( is_visible ) {
                if ( setts_fn_vis ) setts_fn_vis.call( $element );
                if ( setts_class ) $element.addClass( setts_class );
            } else {
                if ( setts_fn_invis ) setts_fn_invis.call( $element );
                if ( setts_class ) $element.removeClass( setts_class );
            }
        },

        debounce : function( fn, ms ) {
            var timeout;
            
            return function() {
                var args = arguments,
                    
                    later = function() {
                        fn( args );
                    };

                win.clearTimeout( timeout );
                timeout = win.setTimeout( later, ms );
            };
        },

    };

    $.fn.vizzy = function ( options ) {
        return this.each(function() {
            vizzy.init.call( vizzy, $(this), options );
        });
    };

}( jQuery, window ));