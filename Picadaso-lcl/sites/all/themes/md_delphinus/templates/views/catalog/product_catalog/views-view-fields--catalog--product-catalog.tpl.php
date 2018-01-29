<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
    
    $path = base_path() . drupal_get_path_alias('node/' . $fields['nid']->content);
?>

  <div class="product col-lg-4 col-md-4 col-sm-6 col-xs-6">
    <div class="product-content">
        <a href="<?php print $path ?>" class="product-thumbnail">
            <img class="first-img" src="<?php print $fields['field_product_thumbnail']->content; ?>" alt=""/>
            <img class="second-img" src="<?php print $fields['field_product_thumbnail_alt']->content; ?>" alt=""/>
        </a>

        <div class="product-over-tool">
          <div class="commerce-add-to-cart">
              <?php print $fields['add_to_cart_form']->content ?>
          </div>
        </div>

        <div class="product-over-add">
          <div class="commerce-add-to-cart">
            <a class="form-submit" href="<?php print $path ?>"><?php print t('View Detail'); ?></a>
          </div>
        </div>
    </div>

    <div class="product-attribute">
        <h3 class="product-title">
            <a href="<?php print $path ?>"><?php print $fields['title']->content ?></a>
        </h3>
        <div class="product-price"><?php print $cur_load['symbol'] . $price ?></div>
        <div class="product-description"><?php print $fields['field_product_description']->content ?></div>
        <div class="produt-tool-list clearfix"><?php print $fields['add_to_cart_form']->content ?></div>
    </div>
  </div>