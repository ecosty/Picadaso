<div <?php if($id) print 'id="'.$id.'"'; ?> class="<?php print $classes; ?>" <?php print $attributes; ?>>
   <div role="alert" class="alert <?php print $settings['style']; ?>">
        <button aria-label="Close" data-dismiss="alert" class="close" type="button">
            <span aria-hidden="true"><i class="fa fa-times"></i></span>
        </button>
        <h3 class="alert_title"><?php print $settings['title']; ?></h3>
        <span class="desc"><?php print $settings['description']; ?></span>
    </div>
</div>