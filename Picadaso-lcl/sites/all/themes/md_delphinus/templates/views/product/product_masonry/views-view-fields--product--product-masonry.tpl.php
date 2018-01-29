<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<div class="<?php if($fields['field_product_size']->content == "wide") { ?>col-sm-6 <?php } else { ?>col-sm-3<?php } ?> product <?php print $fields['field_product_size']->content; ?>">
    <div class="product-inner">
        <div class="product-content">
            <a class="product-thumbnail" href="<?php print $fields['path']->content ?>">
                <img src="<?php print $fields['field_product_thumbnail']->content; ?>" alt=""/>
            </a>
        </div>

        <div class="product-details">
            <h3 class="product-title">
                <a href="<?php print $fields['path']->content ?>"><?php print $fields['title']->content ?></a>
            </h3>
            <div class="product-price"><?php print $cur_load['symbol'] . $price ?></div>
        </div>
    </div>

</div>