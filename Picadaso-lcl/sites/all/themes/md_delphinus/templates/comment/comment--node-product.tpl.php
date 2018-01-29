<ol class="comment-list">
	<li class="comment">
        <div class="comment-item clearfix">
            <div class="comment-avatar">
                <?php if (isset($comment->picture->uri)) : ?>
                    <img src="<?php print file_create_url($comment->picture->uri); ?>" alt="<?php print $content['comment_body']['#object']->name; ?>">
                <?php else : ?>
                    <img src="http://placehold.it/100x100" alt="<?php print $content['comment_body']['#object']->name; ?>">
                <?php endif; ?>
            </div>
            <div class="comment-content">
                <div class="comment-meta">
                    <h5 class="author_name"><?php print $content['comment_body']['#object']->name; ?></h5>
                    <span class="comment-date"><?php print format_date($comment->created, 'custom', 'F d, Y'); ?></span>
                </div>
                <div class="description" itemprop="description">
                    <?php
						hide($content['links']);
						print '<p>'.$content['comment_body']['#object']->comment_body['und'][0]['value'].'</p>';
					?>
                </div>
            </div>
        </div>
    </li><!-- #comment-## -->
</ol>
