<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<li>
  <a href="<?php print $fields['path']->content; ?>">
    <img src="<?php print $fields['field_product_thumbnail']->content; ?>" alt="">
    <span class="product-title bold"><?php print $fields['title']->content; ?></span>
  </a>
  <p>
    <span class="amount"><?php print $cur_load['symbol'] . $price ?></span>
  </p>
</li>