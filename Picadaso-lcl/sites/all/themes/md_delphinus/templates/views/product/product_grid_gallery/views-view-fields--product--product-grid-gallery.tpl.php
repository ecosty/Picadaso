<?php
	$cur = commerce_multicurrency_get_user_currency_code();
    $cur_load = commerce_currency_load($cur);
	
	$price = commerce_currency_convert(substr($fields['commerce_price']->content, 1), commerce_default_currency(), $cur);
    $price = round($price, 2);
	$price = number_format($price, 2);
?>
<div class="product col-lg-4 col-md-4 col-sm-4 col-xs-6">
    <div class="product-inner">
        <div class="product-content">
            <ul class="cd-item-wrapper">
            	<?php
				  $array = explode("|",$fields['field_product_gallery']->content);
				  for($i=0; $i < count($array); $i++) :
					if($i==0) :
						print '<li class="selected"><img alt="Preview image" src="' . $array[$i] . '" /></li>';
					elseif($i==1) :
						print '<li class="move-right"><img alt="Preview image" src="' . $array[$i] . '" /></li>';
					else :
						print '<li><img alt="Preview image" src="' . $array[$i] . '" /></li>';
					endif;
				  endfor;
				?>
            </ul>
        </div>
        <div class="product-details">
            <h3 class="product-title">
                <a href="<?php print $fields['path']->content ?>"><?php print $fields['title']->content ?></a>
            </h3>
            <div class="product-price"><?php print $cur_load['symbol'] . $price ?></div>
        </div>
    </div>
</div>