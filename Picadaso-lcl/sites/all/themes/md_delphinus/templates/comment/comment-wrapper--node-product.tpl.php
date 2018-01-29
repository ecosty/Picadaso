<div class="row">
	<div class="col-md-6">
    	<div class="comments-area" id="comments">
        	<h3 class="comments-title"><?php print $node->comment_count; ?> <?php print t('reviews'); ?></h3>
			<?php print render($content['comments']); ?>
        </div>
    </div>
    <div class="col-md-5 col-md-offset-1">
    	<div id="review_form">
            <div id="respond" class="comment-respond">
                <h3 class="comment-reply-title"><?php print t('Here you can review this item') ?>.</h3>
				<?php print render($content['comment_form']); ?>
            </div>
        </div>
    </div>
</div>