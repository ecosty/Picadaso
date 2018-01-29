jQuery(document).ready(function ($) {
    rangeSlider();
    function rangeSlider() {
        if ($('.slider-range').length) {
            $( "#views-exposed-form-product-grid-product input[name='min_price']" ).val(Drupal.settings.md_theme.min_price);
            $( "#views-exposed-form-product-grid-product input[name='max_price']" ).val(Drupal.settings.md_theme.max_price);
            $(".slider-range").slider({
                range: true,
                min: Drupal.settings.md_theme.min_default,
                max: Drupal.settings.md_theme.max_default,
                values: [ Drupal.settings.md_theme.min_price, Drupal.settings.md_theme.max_price ],
                slide: function( event, ui ) {
                    $( ".amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                    $( "#views-exposed-form-product-grid-product input[name='min_price']" ).val(ui.values[ 0 ]);
                    $( "#views-exposed-form-product-grid-product input[name='max_price']" ).val(ui.values[ 1 ]);
                }
            });
            $( ".amount" ).val( "$" + $( ".slider-range" ).slider( "values", 0 ) +
                " - $" + $( ".slider-range" ).slider( "values", 1 ) );

            $( "#views-exposed-form-product-grid-product .filter-btn").click(function() {
                $( "#views-exposed-form-product-grid-product .btn-none-ajax").trigger( "click" );
            })
        }
    }
});
