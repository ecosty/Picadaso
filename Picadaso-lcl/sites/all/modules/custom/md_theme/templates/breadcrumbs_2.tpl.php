<?php $array = drupal_get_breadcrumb(); ?>
<ol class="breadcrumb">
    <?php for($i=0; $i < count($array); $i++) : ?>
        <li><?php print $array[$i] ?></li>
    <?php endfor; ?>
    <li class="active"><?php print drupal_get_title(); ?></li>
</ol>