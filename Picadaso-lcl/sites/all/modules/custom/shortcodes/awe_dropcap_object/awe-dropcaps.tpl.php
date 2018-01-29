<div <?php if($id) print 'id="'.$id.'"'; ?>  class="<?php print $classes ?>" <?php print $attributes; ?>>
     <p class="<?php print $settings['style']; ?>"> <span class="kt_dropcap dropcap-sm first-letter"> <?php print $settings['letter'] ?> </span> <?php print $settings['description'] ?></p>
</div>