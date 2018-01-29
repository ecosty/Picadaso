<?php if($block->region == "sidebar") : ?>
	<div class="widget <?php print $classes; ?>" <?php print $attributes; ?> id="<?php print $block_html_id; ?>">
        <?php print render($title_prefix); ?>
        <?php if ($block->subject): ?>
            <h3 class="widget-title"><?php print $block->subject; ?></h3>
        <?php endif;?>
        <?php print render($title_suffix); ?>
        <?php print render($content); ?>
    </div>
<?php elseif($block->region == "footer") : ?>
	<div class="<?php print $classes; ?>" <?php print $attributes; ?> id="<?php print $block_html_id; ?>">
		<?php print render($title_prefix); ?>
		<?php if ($block->subject): ?>
            <h3><?php print $block->subject; ?></h3>
        <?php endif;?>
        <?php print render($title_suffix); ?>
        <?php print render($content); ?>
    </div>
<?php else : ?>
    <div class="widget-container mb-0 pb-0 <?php print $classes; ?>" <?php print $attributes; ?> id="<?php print $block_html_id; ?>">
        <?php print render($title_prefix); ?>
        <?php if ($block->subject): ?>
            <h3 class="widget-title"><?php print $block->subject; ?></h3>
        <?php endif;?>
        <?php print render($title_suffix); ?>
        <?php print render($content); ?>
    </div>
<?php endif; ?>