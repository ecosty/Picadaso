(function ($) {

    Drupal.behaviors.product2Col = {
        attach: function () {

            $(".products-sortby .item-per-page").change(function() {
                var query = Drupal.settings.md_delphinus.query;
                query.items_per_page = $(this).val();
                window.location.href = Drupal.settings.md_delphinus.baseUrl + '?' + decodeURIComponent($.param(query));
            })

            var current_min_price = Drupal.settings.md_delphinus.current_min_price,
                current_max_price = Drupal.settings.md_delphinus.current_max_price,
                min_price = Drupal.settings.md_delphinus.min_price,
                max_price = Drupal.settings.md_delphinus.max_price;

            if($( '.price_slider' ).length > 0) {

                $( '.price_slider' ).slider({
                    range: true,
                    min: min_price,
                    max: max_price,
                    values: [ current_min_price, current_max_price ],
                    create: function() {
                        $( '.price_label span.from' ).html( '$' + current_min_price );
                        $( '.price_label span.to' ).html( '$' + current_max_price );
                    },
                    slide: function( event, ui ) {
                        $( '.price_label span.from' ).html( '$' + ui.values[ 0 ] );
                        $( '.price_label span.to' ).html( '$' + ui.values[ 1 ] );

                    },
                    stop: function( event, ui ) {
                        var query = Drupal.settings.md_delphinus.query;
                        query['min-price'] = ui.values[ 0 ];
                        query['max-price'] = ui.values[ 1 ];
                        window.location.href = Drupal.settings.md_delphinus.baseUrl + '?' + decodeURIComponent($.param(query));
                    }
                });
            }
        }
    }

})(jQuery);
