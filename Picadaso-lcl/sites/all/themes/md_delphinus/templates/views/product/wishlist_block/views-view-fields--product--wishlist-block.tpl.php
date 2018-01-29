<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<div class="bag-products">
    <div class="bag-product">
        <figure>
            <a href="<?php print $fields['path']->content;?>" class="bag-product-img">
                <img src="<?php print $fields['field_product_thumbnail']->content;?>" alt="" class="img-responsive" />
            </a>
        </figure>
        <div class="bag-product-details">
            <h4 class="bag-product-title"><a href="<?php print $fields['path']->content;?>"><?php print $fields['title']->content;?></a></h4>
            <div class="bag-product-price"><?php print t('Price') ?>: <span class="amount"><?php print $cur_load['symbol'] . $price ?></span></div>
        </div>
        <?php print flag_create_link('wishlist', $fields['nid']->content); ?>
    </div><!-- .bag-product -->
</div><!-- .bag-products -->