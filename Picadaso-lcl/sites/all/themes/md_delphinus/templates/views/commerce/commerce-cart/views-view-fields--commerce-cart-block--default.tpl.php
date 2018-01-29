<?php
	$terms = "";
	$product = commerce_product_load((int)$row->commerce_product_field_data_commerce_product_product_id);
	$query = new EntityFieldQuery;
	$result = $query->entityCondition('entity_type', 'node', '=')
	  ->propertyCondition('type', 'product')
	  ->fieldCondition('field_product_ref', 'product_id', (int)$row->commerce_product_field_data_commerce_product_product_id, '=')
	  ->range(0, 1)->execute();
	 
	  
	$nids = array();
	foreach ($result['node'] as $node) {
	  $nids[] = $node->nid;
	}
	$node = node_load((int)$nids[0]);
?>
<div class="bag-product">
    <figure>
        <a href="<?php print drupal_get_path_alias('node/' . $node->nid); ?>" class="bag-product-img">
            <img src="<?php print image_style_url('product_8', $node->field_product_thumbnail['und'][0]['uri']); ?>" alt="" class="img-responsive" />
        </a>
    </figure>
    <div class="bag-product-details">
        <h4 class="bag-product-title"><a href="<?php print drupal_get_path_alias('node/' . $node->nid); ?>"><?php print $node->title; ?></a></h4>
        <div class="bag-product-price"><?php print t('Price') ?>: <span class="amount"><?php print $fields['commerce_unit_price']->content ?></span></div>
        <div class="bag-product-qty"><?php print t('Quantity'); ?>: <?php print $fields['quantity']->content ?></div>
    </div>
    <?php print $fields['edit_delete']->content ?>
</div><!-- .bag-product -->