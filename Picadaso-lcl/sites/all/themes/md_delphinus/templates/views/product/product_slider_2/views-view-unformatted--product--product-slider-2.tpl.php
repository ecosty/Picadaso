<div class="products">
    <div class="owl-carousel-kt remove-mar-bottom navigation-center">
        <div class="owl-carousel kt-owl-carousel" data-options='{"pagination": false, "navigation": true, "desktop": 4, "desktopsmall" : 3, "tablet" : 2, "mobile" : 1}'>
            <?php foreach ($rows as $id => $row): ?>
                <?php print $row; ?>
            <?php endforeach; ?>
        </div>
    </div>
</div>