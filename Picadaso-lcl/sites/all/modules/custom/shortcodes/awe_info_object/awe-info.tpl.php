<div <?php if($id) print 'id="'.$id.'"'; ?> class="<?php print $classes ?>" <?php print $attributes; ?>>
  <div class="banner banner-dark no-margin">
      <img src="<?php print $src_img; ?>" alt=""/>
      <div class="banner-content">
          <h3 class="white"><?php print $settings['title'] ?></h3>
      </div>
      <a class="banner-link" href="<?php print $settings['buttonUrl'] ?>" target="<?php print $settings['buttonTarget'] ?>"></a>
  </div>
</div>
