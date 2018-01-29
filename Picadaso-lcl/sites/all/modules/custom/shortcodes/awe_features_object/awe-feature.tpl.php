<div <?php if($id) print 'id="'.$id.'"'; ?> class="<?php print $classes; ?>" <?php print $attributes; ?>>
 	<div class="feature-icon">
        <div class="feature-icon-content kt-table">
            <div class="kt-col">
                <div class="features-box-icon"><a href="<?php print $settings['buttonUrl'] ?>" target="<?php print $settings['buttonTarget'] ?>"><i class="<?php print $settings['icon']; ?>"></i></a></div>
                <h4 class="features-box-title"><a href="<?php print $settings['buttonUrl'] ?>" target="<?php print $settings['buttonTarget'] ?>" class="title"><?php print $feature['title']['value']; ?></a></h4>
            </div>
        </div>
    </div>
</div>