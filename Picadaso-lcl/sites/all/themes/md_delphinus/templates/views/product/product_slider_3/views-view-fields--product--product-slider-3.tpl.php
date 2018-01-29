<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<div class="product wow fadeIn" data-wow-delay="200ms">
    <div class="product-content">
        <a href="<?php print $fields['path']->content ?>" class="product-thumbnail">
            <img alt="" src="<?php print $fields['field_product_thumbnail']->content; ?>" />
        </a>
    </div>
    <h3 class="product-title">
        <a href="<?php print $fields['path']->content ?>"><?php print $fields['title']->content ?></a>
    </h3>
    <div class="product-price"><?php print $cur_load['symbol'] . $price ?></div>
    <div class="star-rating">
        <?php print $fields['field_product_rating']->content ?>
    </div>
</div>