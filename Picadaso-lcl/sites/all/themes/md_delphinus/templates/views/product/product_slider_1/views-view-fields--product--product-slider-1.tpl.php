<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<!-- SLIDE  -->
<li data-transition="zoomout" data-slotamount="default"  data-easein="default" data-easeout="default" data-masterspeed="default"   data-rotate="0"  data-fstransition="fade" data-fsmasterspeed="1500" data-fsslotamount="7" data-saveperformance="off" >
    <!-- MAIN IMAGE -->
    <img src="<?php print $fields['field_product_thumbnail']->content; ?>" alt="" data-bgposition="center center" data-bgfit="contain" data-bgrepeat="no-repeat" />
    <!-- LAYERS -->

    <div class="tp-caption product-attr"
         data-x="center"
         data-y="bottom"
         data-actions='[{"event":"click","action":"simplelink","target":"_self","url":"woocommerce-product-detailed1.html"}]'
         data-transform_in="opacity:0;s:10;s:10;e:Linear.easeNone;"
         data-transform_out="opacity:0;s:10;s:20;e:Linear.easeNone;">
        <h4><?php print $fields['title']->content ?></h4>
        <div><?php print $cur_load['symbol'] . $price ?></div>
    </div>
</li>