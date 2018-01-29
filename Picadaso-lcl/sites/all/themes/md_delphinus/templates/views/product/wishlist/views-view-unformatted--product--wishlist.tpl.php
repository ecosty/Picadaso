<div class="woocommerce">
	<div class="table-responsive">
    	<table class="shop_table cart">
        	<thead>
                <tr>
                    <th class="product-thumbnail"><?php print t('Item') ?></th>
                    <th class="product-name"><?php print t('Description') ?></th>
                    <th class="product-price"><?php print t('Unit price') ?></th>
                    <th class="product-remove">&nbsp;</th>
                    <th class="product-remove">&nbsp;</th>
                </tr>
                <?php foreach ($rows as $id => $row): ?>
				  <?php print $row; ?>
                <?php endforeach; ?>
            </thead>
        </table>
    </div>
</div>