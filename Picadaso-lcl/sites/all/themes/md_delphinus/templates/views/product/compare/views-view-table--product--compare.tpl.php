<?php $total = count($rows); ?>
<!-- TABLE CART -->
<table class="compare">
    <tbody>
        <tr>
            <td class="compare-title"><?php print t('Product Image'); ?></td>
            <?php for($i=0; $i < $total; $i++) : ?>
            	<td class="product-thumbnail">
                    <a href="<?php print $rows[$i]['path']; ?>" class="attachment-shop_thumbnail wp-post-image"><img src="<?php print $rows[$i]['field_product_thumbnail']; ?>" alt=""/><?php print $rows[$i]['title']; ?></a>
                </td>
            <?php endfor; ?>
        </tr>
        <tr>
            <td class="compare-title"><?php print t('Rating'); ?></td>
            <?php for($i=0; $i < $total; $i++) : ?>
            	<td>
                    <div class="star-rating">
                        <?php print $rows[$i]['field_product_rating']; ?>
                    </div>
                </td>
            <?php endfor; ?>
        </tr>
        <tr>
            <td class="compare-title"><?php print t('Unit Price'); ?></td>
            <?php for($i=0; $i < $total; $i++) : ?>
            	<?php
					$cur = commerce_multicurrency_get_user_currency_code();
					$cur_load = commerce_currency_load($cur);
					
					$price = commerce_currency_convert(substr($rows[$i]['commerce_price'], 1), commerce_default_currency(), $cur);
					$price = round($price, 2);
					$price = number_format($price, 2);
				?>
                <td>
                    <span class="amount"><?php print $cur_load['symbol'] . $price ?></span>
                </td>
            <?php endfor; ?>
        </tr>
        <tr>
            <td class="compare-title"><?php print t('Description'); ?></td>
            <?php for($i=0; $i < $total; $i++) : ?>
                <td>
                    <p><?php print $rows[$i]['body']; ?></p>
                </td>
            <?php endfor; ?>
        </tr>
        <tr>
            <td class="compare-title"><?php print t('Categories'); ?></td>
            <?php for($i=0; $i < $total; $i++) : ?>
                <td>
                    <?php print $rows[$i]['field_product_categories']; ?>
                </td>
            <?php endfor; ?>
        </tr>
        <tr>
            <td class="compare-title"><?php print t('Action'); ?></td>
            <?php for($i=0; $i < $total; $i++) : ?>
                <td>
                    <?php print $rows[$i]['ops']; ?>
                </td>
            <?php endfor; ?>
        </tr>
    </tbody>
</table>
<!-- END TABLE CART -->