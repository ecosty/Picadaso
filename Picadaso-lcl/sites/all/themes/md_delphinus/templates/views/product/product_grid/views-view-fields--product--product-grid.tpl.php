<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 product-widget wow fadeIn" data-wow-delay="0.2s">
    <div class="row">
        <div class="col-sm-6">
            <a title="<?php print $fields['title']->content ?>" href="<?php print $fields['path']->content ?>">
                <img alt="" src="<?php print $fields['field_product_thumbnail']->content; ?>" />
            </a>
        </div>
        <div class="col-sm-6">
            <h4 class="product-title"><a href="<?php print $fields['path']->content ?>"> <?php print $fields['title']->content ?> </a></h4>
            <div class="amount"><?php print $cur_load['symbol'] . $price ?></div>
            <div class="star-rating">
                <?php print $fields['field_product_rating']->content ?>
            </div>
        </div>
    </div>
</div>