<div class="blog-post col-lg-4 col-md-4 col-sm-6">
    <a href="<?php print $fields['path']->content ?>" class="blog-post-thumbnail">
        <img src="<?php print $fields['field_news_thumbnail']->content; ?>" alt=""/>
    </a>
    <h4 class="blog-post-title">
        <a href="<?php print $fields['path']->content ?>"> <?php print $fields['title']->content ?></a>
    </h4>
    <div class="blog-post-meta">
        <span class="author vcard"><?php print t('By') ?>: <a href="#"><?php print $fields['name']->content ?></a></span>
        <span class="comments-link"><a href="#"><?php print $fields['comment_count']->content ?> <?php print t('Comments') ?></a></span>
    </div>
    <p><?php print $fields['body']->content ?></p>
</div>