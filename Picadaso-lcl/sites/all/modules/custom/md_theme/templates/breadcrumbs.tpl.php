<?php $array = drupal_get_breadcrumb(); ?>
<div class="page-header">
	<div class="row">
        <div class="col-md-5">
            <ol class="breadcrumb">
                <?php for($i=0; $i < count($array); $i++) : ?>
                    <li><?php print $array[$i] ?></li>
                <?php endfor; ?>
                <li class="active"><?php print drupal_get_title(); ?></li>
            </ol>
        </div>
        <div class="col-md-7 text-right">
            <h1><?php print drupal_get_title(); ?></h1>
        </div>
    </div>
</div>