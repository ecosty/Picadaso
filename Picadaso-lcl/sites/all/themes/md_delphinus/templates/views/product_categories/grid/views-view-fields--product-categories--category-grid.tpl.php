<div class="col-lg-4 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="200ms">
    <div class="banner position-bottom">
        <img src="<?php print $fields['field_pro_cate_image']->content; ?>" alt=""/>
        <div class="banner-content">
            <a href="<?php print base_path() . drupal_get_path_alias('taxonomy/term/' . $fields['tid']->content) ?>" class="btn btn-light"><?php print $fields['name']->content ?></a>
        </div>
    </div>
</div>