<div class="category-banner">
    <img src="<?php print $fields['field_pro_cate_image']->content; ?>" alt="" />
    <div class="category-banner-content">
        <h1 class="white"><?php print $fields['name']->content ?></h1>
        <ul class="">
            <?php
			  $array = explode("|",$fields['field_pro_cate_features']->content);
			  for($i=0; $i < count($array); $i++) :
				print '<li><a href="#">' . $array[$i] . '</a></li>';
			  endfor;
			?>
        </ul>
        <a href="<?php print base_path() . drupal_get_path_alias('taxonomy/term/' . $fields['tid']->content) ?>" class="btn btn-light-b"><?php print t('View') ?></a>
    </div>
</div>