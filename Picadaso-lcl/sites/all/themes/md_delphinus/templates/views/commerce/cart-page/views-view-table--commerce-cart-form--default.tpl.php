<div class="table-responsive">
    <table class="shop_table cart">
      <thead>
          <tr>
            <th class="product-thumbnail"><?php print t('Item') ?></th>
            <th class="product-name"><?php print t('Description') ?></th>
            <th class="product-quantity"><?php print t('Quantity') ?></th>
            <th class="product-price"><?php print t('Unit price') ?></th>
            <th class="product-subtotal"><?php print t('Subtotal') ?></th>
            <th class="product-remove">&nbsp;</th>
          </tr>
      </thead>
      <tbody>
          <?php $i = 0; ?>
          <?php foreach ($rows as $row_count => $row): ?>
            <tr <?php if ($row_classes[$row_count]) { print 'class="cart-item ' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
              <?php foreach ($row as $field => $content): ?>
                <?php if ($field != 'product_id') : ?>
                    <?php
                          $product = commerce_product_load((int)$row['product_id']);
                          $query = new EntityFieldQuery;
                          $result = $query->entityCondition('entity_type', 'node', '=')
                            ->propertyCondition('type', 'product')
                            ->fieldCondition('field_product_ref', 'product_id', (int)$row['product_id'], '=')
                            ->range(0, 1)->execute();


                          $nids = array();
                          foreach ($result['node'] as $node) {
                            $nids[] = $node->nid;
                          }
                          $node = node_load((int)$nids[0]);
                    ?>
                    <?php if ($field == 'line_item_title') : ?>
                      <td class="product-thumbnail">
                        <a href="<?php print drupal_get_path_alias('node/'.$node->nid.'') ?>" class="attachment-shop_thumbnail wp-post-image"><img class="img-responsive" src="<?php print image_style_url('product_8', $node->field_product_thumbnail['und'][0]['uri']); ?>" alt=""></a>
                      </td>
                      <td class="product-name">
                        <?php if($field == 'line_item_title') : ?><a href="<?php print drupal_get_path_alias('node/'.$node->nid.'') ?>"><?php print strip_tags($content) ; ?></a><?php endif; ?>
                      </td>
                    <?php endif; ?>
                    <?php if ($field == 'edit_quantity') : ?>
                      <td class="product-quantity">
                        <?php print $content; ?>
                      </td>
                    <?php endif; ?>
                    <?php if ($field == 'commerce_unit_price') : ?>
                      <td class="product-price">
                        <span class="amount"><?php print $content; ?></span>
                      </td>
                    <?php endif; ?>
                    <?php if ($field == 'commerce_total') : ?>
                      <td class="product-subtotal">
                        <span class="total"><?php print $content; ?></span>
                      </td>
                    <?php endif; ?>
                    <?php if ($field == 'edit_delete') : ?>
                      <td class="product-remove product-attribute">
                        <?php print $content; ?>
                      </td>
                    <?php endif; ?>
                <?php endif; ?>
              <?php endforeach; ?>
            </tr>
            <?php $i++; ?>
          <?php endforeach; ?>
      </tbody>
    </table>
</div>