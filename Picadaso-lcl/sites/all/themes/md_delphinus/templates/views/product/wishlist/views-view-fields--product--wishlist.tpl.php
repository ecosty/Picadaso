<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<tr class="cart_item">
    <td class="product-thumbnail">
        <a href="<?php print $fields['path']->content;?>" class="attachment-shop_thumbnail wp-post-image"><img src="<?php print $fields['field_product_thumbnail']->content;?>" alt=""/></a>
    </td>
    <td class="product-name">
        <a href="<?php print $fields['path']->content;?>"><?php print $fields['title']->content;?></a>
    </td>
    <td class="product-price">
        <span class="amount"><?php print $cur_load['symbol'] . $price ?></span>
    </td>
    <td class="product-attribute text-center">
        <?php print $fields['add_to_cart_form']->content;?>
    </td>
    <td class="product-remove">
        <?php print flag_create_link('wishlist', $fields['nid']->content); ?>
    </td>
</tr>