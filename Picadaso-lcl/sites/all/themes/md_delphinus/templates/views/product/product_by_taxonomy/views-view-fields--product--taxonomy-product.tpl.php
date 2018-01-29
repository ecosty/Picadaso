<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<div class="product col-lg-3 col-md-4 col-sm-6 col-xs-6">

    <div class="product-content">
        <a href="<?php print $fields['path']->content ?>" class="product-thumbnail">
            <img class="first-img" src="<?php print $fields['field_product_thumbnail']->content; ?>" alt=""/>
            <img class="second-img" src="<?php print $fields['field_product_thumbnail_alt']->content; ?>" alt=""/>
        </a>

         <div class="product-over-tool">
            <?php print flag_create_link('wishlist', $fields['nid']->content); ?>
            <?php print flag_create_link('compare', $fields['nid']->content); ?>
            <a href="#product-popup<?php print $fields['nid']->content ?>" class="quickview" data-toggle="tooltip"  data-placement="top" title="Quick view"><i class="fa fa-search"></i></a>
        </div>
        <div class="product-over-add">
            <div class="commerce-add-to-cart">
            	<a class="form-submit" href="<?php print $fields['path']->content ?>"><?php print t('View Detail'); ?></a>
            </div>
        </div>
    </div>

    <div class="product-attribute">
        <h3 class="product-title">
            <a href="<?php print $fields['path']->content ?>"><?php print $fields['title']->content ?></a>
        </h3>
        <div class="product-price"><?php print $cur_load['symbol'] . $price ?></div>
        <div class="product-description"><?php print $fields['body']->content ?></div>
        <div class="produt-tool-list clearfix">
            <?php print $fields['add_to_cart_form']->content ?>
            <div class="product-over-tool">
                <a href="#" class="add_to_wishlist" data-toggle="tooltip"  data-placement="top" title="Add to wishlist"><i class="fa fa-heart"></i></a>
                <a href="#" class="add_to_compare" data-toggle="tooltip"  data-placement="top" title="Add to compare"><i class="fa fa-exchange"></i></a>
            </div>
        </div>
    </div>
    
	<div id="product-popup<?php print $fields['nid']->content ?>" class="hidden themedev-product-popup mfp-with-anim animate-width add-content">
        <div class="product-main style1 clearfix">
          <div class="product-detail-images">
              <div class="product-detail-thumbarea">
                  <div class="single-product-main-images owl-carousel1" id="quickview-images-<?php print $fields['nid']->content ?>" data-id="<?php print $fields['nid']->content ?>">
                      <?php
                        $array = explode("|",$fields['field_product_gallery']->content);
                        for($i=0; $i < count($array); $i++) :
                          print '<div class="single-product-image"><img src="' . $array[$i] . '" class="img-responsive" alt=""/></div>';
                        endfor;
                      ?>
                  </div><!-- #sync1.single-product-main-images.owl-carousel -->
      
                  <div class="single-product-main-thumbnails owl-carousel2" id="quickview-thumbnails-<?php print $fields['nid']->content ?>" data-id="<?php print $fields['nid']->content ?>" data-items="3">
                      <?php
                        $array = explode("|",$fields['field_product_gallery']->content);
                        for($i=0; $i < count($array); $i++) :
                          print '<a href="' . $array[$i] . '"><img src="' . $array[$i] . '" class="img-responsive" alt=""/></a>';
                        endfor;
                      ?>
                  </div><!-- #sync2.single-product-main-thumbnails.owl-carousel -->
              </div><!-- .product-detail-thumbarea -->
      
          </div>
      
      
          <div class="product-details-info">
              <h1 class="product-title"><?php print $fields['title']->content ?></h1>
              <div class="product-price-wrap clearfix">
                  <div>
                      <h3 class="price"><span class="amount"><?php print $cur_load['symbol'] . $price ?></span></h3>
                  </div>                  
              </div>
      
              <?php print $fields['add_to_cart_form']->content ?>
      
              <div class="product-short">
                  <p></p>                  
                  <p></p>
              </div>
      
              <div class="product_meta">
                  <span class="sku_wrapper"><?php print t('SKU') ?>: <span itemprop="sku" class="sku"><?php print $fields['sku']->content ?></span></span>
                  <span class="posted_in"><?php print t('Category') ?>: <?php print $fields['field_product_categories']->content ?></span>
              </div>
      
          </div>
      </div>
    </div>
</div>