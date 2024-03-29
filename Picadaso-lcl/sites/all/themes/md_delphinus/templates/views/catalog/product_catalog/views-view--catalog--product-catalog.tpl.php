<div class="<?php print $classes; ?>">
  <?php print render($title_prefix); ?>
  <?php if ($title): ?>
    <?php print $title; ?>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($header): ?>
    <div class="view-header">
      <?php print $header; ?>
    </div>
  <?php endif; ?>

  <div class="products-tools clearfix">
	  <?php if ($exposed): ?>
        <?php ///print $exposed; ?>
      <?php endif; ?>
      <div class="products-sortby">
          <span>Nuestros productos:</span>
      </div>
      <div class="result-count">
      	<?php
			global $pager_page_array, $pager_total, $pager_limits;
			$from = ($view->query->pager->current_page * $view->query->pager->options['items_per_page']) + 1;
			$to = $from + count($view->result) - 1;
			$total = $view->total_rows;
			if($total > 0){
				if ($total <= $to) {
				  print t('Items').': '.$from.' - '.$total.' of '.$view->total_rows . ' total';
				}
				else
				{
				  print t('Items').': '.$from.' - '.$to.' of '.$view->total_rows . ' total';
				}
			}
	    ?>
      </div>
      <ul class="grid-list">
          <li><a class="active" href="#" data-layout="grid" data-remove="lists" title="Grid view"><i class="fa fa-th"></i></a></li>
          <li><a href="#" data-layout="lists" data-remove="grid" title="List view"><i class="fa fa-bars"></i></a></li>
      </ul>
  </div>

  <?php if ($attachment_before): ?>
    <div class="attachment attachment-before">
      <?php print $attachment_before; ?>
    </div>
  <?php endif; ?>

  <?php if ($rows): ?>
    <?php print $rows; ?>
  <?php elseif ($empty): ?>
    <div class="view-empty">
      <?php print $empty; ?>
    </div>
  <?php endif; ?>

  <?php if ($pager): ?>
    <?php print $pager; ?>
  <?php endif; ?>

  <?php if ($attachment_after): ?>
    <div class="attachment attachment-after">
      <?php print $attachment_after; ?>
    </div>
  <?php endif; ?>

  <?php if ($more): ?>
    <?php print $more; ?>
  <?php endif; ?>

  <?php if ($footer): ?>
    <div class="view-footer">
      <?php print $footer; ?>
    </div>
  <?php endif; ?>

  <?php if ($feed_icon): ?>
    <div class="feed-icon">
      <?php print $feed_icon; ?>
    </div>
  <?php endif; ?>

</div>