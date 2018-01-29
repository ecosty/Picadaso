<ol class="comment-list">
	<li class="comment">
        <div class="comment-item">
        	<div class="comment-avatar">
                <?php if (isset($comment->picture->uri)) : ?>
                    <img src="<?php print file_create_url($comment->picture->uri); ?>" alt="<?php print $content['comment_body']['#object']->name; ?>">
                <?php else : ?>
                    <img src="http://placehold.it/100x100" alt="<?php print $content['comment_body']['#object']->name; ?>">
                <?php endif; ?>
            </div>

            <div class="comment-body">

                <footer class="comment-meta">
                    <h5 class="comment-author vcard"><?php print $content['comment_body']['#object']->name; ?></h5><!-- .comment-author -->
                    <div class="comment-metadata">
                        <span><?php print format_date($comment->created, 'custom', 'F d, Y'); ?></span>
                    </div><!-- .comment-metadata -->
                </footer><!-- .comment-meta -->

                <div class="comment-content">
                    <?php
						hide($content['links']);
						print '<p>'.$content['comment_body']['#object']->comment_body['und'][0]['value'].'</p>';
					?>
                </div><!-- .comment-content -->

                <div class="reply">
                    <a href="<?php print url($content['links']['comment']['#links']['comment-reply']['href']); ?>" class="reply-comment"><?php print t('Reply'); ?></a>
                </div>

            </div><!-- .comment-body -->
        </div>
    </li><!-- #comment-## -->
</ol>
