<div class="<?php print $classes; ?>" <?php print $attributes; ?> id="<?php print $block_html_id; ?>">
	<?php print render($title_prefix); ?>
    <?php if ($block->subject): ?>
        <h3 class="widget-title"><?php print $block->subject; ?></h3>
    <?php endif;?>
    <?php print render($title_suffix); ?>
    <div class="container">
    	<?php print render($content); ?>
    </div>
</div>