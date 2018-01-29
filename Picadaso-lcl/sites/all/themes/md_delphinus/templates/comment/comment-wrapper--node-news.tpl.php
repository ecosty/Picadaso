<div class="comments-area" id="comments">
	<h4 class="comments-title single-bottom-title"><?php print $node->comment_count; ?> <?php print t('reviews'); ?></h4>
    <?php print render($content['comments']); ?>
    
    <div class="comment-respond">
    	<h4 class="comment-reply-title single-bottom-title"><?php print t('Leave a Reply') ?></h4>
        <?php print render($content['comment_form']); ?>
    </div>
</div>