<div class="products">
    <div class="owl-carousel-kt remove-mar-bottom navigation-square-light navigation-center-inner visiable-navigation big-width">
        <div class="owl-carousel-kt-inner">
            <div class="owl-carousel kt-owl-carousel" data-options='{"pagination": false, "navigation": false, "desktop": 3, "desktopsmall": 2, "tablet" : 2, "mobile" : 1, "outer": true}'>
				<?php foreach ($rows as $id => $row): ?>
                    <?php print $row; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>