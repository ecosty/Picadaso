<a href="<?php print drupal_get_path_alias(base_path() . 'node/49'); ?>">
    <?php print t('wishlist') ?> <span><?php print count($rows); ?></span>
</a>
<div class="top-navigation-submenu">
    <div class="shopping-bag">
        <div class="shopping-bag-content">
            
            <?php foreach ($rows as $id => $row): ?>
			  <?php print $row; ?>
            <?php endforeach; ?>

            <div class="bag-buttons">
                <a class="btn btn-block btn-gray" href="<?php print drupal_get_path_alias(base_path() . 'node/49'); ?>"><?php print t('View Wishlist'); ?></a>
            </div><!-- .bag-buttons -->

        </div><!-- .shopping-bag-content -->
    </div><!-- .shopping-bag -->
</div>