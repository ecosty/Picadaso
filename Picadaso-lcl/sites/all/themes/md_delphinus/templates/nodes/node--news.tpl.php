<?php $user = user_load($node->uid); ?>
<div class="single-post">
    <article>
        <h3 class="hidden"><?php print $node->title ?></h3>
        <div class="entry-thumb">
            <figure>
                <img src="<?php print file_create_url($content['field_news_thumbnail']['#items'][0]['uri']) ?>" alt=""/>
            </figure>
        </div><!-- .entry-thumb -->
    
        <div class="entry-meta-data">
            <span class="author vcard"><?php print t('By'); ?> <a href="#" class="url"><?php print $node->name ?></a></span>
            <span class="posted-on"><span class="screen-reader-text"><?php print t('Posted on'); ?> </span><span class="entry-date published"><?php print strtolower(format_date($node->created, 'custom', 'F d, Y')); ?></span></span>
            <span class="cat-links">
                <span class="screen-reader-text"><?php print t('Categories'); ?> </span>
                <?php for($i=0; $i < count($content['field_news_categories']['#items']); $i++) : ?>
                  <?php if($i < count($content['field_news_categories']['#items']) - 1) : ?>
                      <a href="<?php print base_path() . drupal_get_path_alias($content['field_news_categories'][$i]['#href']) ?>"><?php print $content['field_news_categories'][$i]['#title']; ?></a>, 
                  <?php else : ?>
                      <a href="<?php print base_path() . drupal_get_path_alias($content['field_news_categories'][$i]['#href']) ?>"><?php print $content['field_news_categories'][$i]['#title']; ?></a>
                  <?php endif; ?>
                <?php endfor; ?>
            </span>
            <span class="comments-link"><a href="#comments"> <?php print $node->comment_count ?> <?php print t('Comments') ?> </a></span>
        </div><!-- .entry-meta-data -->
        <div class="entry-content-outer">
            <div class="entry-content clearfix">
                <?php print render($content['body']) ?>
            </div>
            <div class="share-it">
                <span class="screen-reader-text">Share this</span>
                <ul class="social_icons">
                    <li><a href="#"><i class="fa fa-facebook"></i> <span>Facebook</span></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i> <span>Twitter</span></a></li>
                    <li><a href="#"><i class="fa fa-pinterest"></i> <span>Pinterest</span></a></li>
                </ul>
            </div><!-- .share-it -->
        </div><!-- .entry-content-outer -->
    
    </article>
    <div class="related-articles">
    	<h4 class="related-title single-bottom-title"><?php print t('Related Articles'); ?></h4>
        <?php
			$block = module_invoke('views', 'block_view', 'blog-related_blog');
			print render($block['content']);
		?>
    </div>
    <div class="author-area">
        <h4 class="author-title single-bottom-title"><?php print t('About the Author'); ?></h4>
        <div class="author-info">
            <div class="author-avatar">
                <?php if(isset($user->picture)) : ?>
                    <img src="<?php print image_style_url('author', $user->picture->uri) ?>" alt="<?php print $user->name; ?>" />
                <?php else : ?>
                    <img src="http://placehold.it/165x165" alt="<?php print $user->name; ?>" class="img-responsive"/>
                <?php endif; ?>
            </div><!-- .author-avatar -->

            <div class="author-description">
                <h3 class="author-title"><a href="#"><?php print $user->name; ?></a></h3>
                <p class="author-bio">
                	<?php
						if(isset($user->field_account_about['und'])) :
							print $user->field_account_about['und'][0]['value'];
						endif;
					?>
                </p><!-- .author-bio -->
            </div><!-- .author-description -->
        </div><!-- .author-info -->
    </div>
    <?php print render($content['comments']); ?>
</div>