<div class="page-loading-wrapper">
    <div class="progress-bar-loading">
        <div class="back-loading progress-bar-inner">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path d="M3.7,12h10.6l15.1,54.6c0.4,1.6,1.9,2.7,3.6,2.7h46.4c1.5,0,2.8-0.9,3.4-2.2l16.9-38.8c0.5-1.2,0.4-2.5-0.3-3.5
                    c-0.7-1-1.8-1.7-3.1-1.7H45c-2,0-3.7,1.7-3.7,3.7s1.7,3.7,3.7,3.7h45.6L76.9,62H35.8L20.7,7.3c-0.4-1.6-1.9-2.7-3.6-2.7H3.7
                    C1.7,4.6,0,6.3,0,8.3S1.7,12,3.7,12z"/>
                <path d="M29.5,95.4c4.6,0,8.4-3.8,8.4-8.4s-3.8-8.4-8.4-8.4s-8.4,3.8-8.4,8.4C21.1,91.6,24.8,95.4,29.5,95.4z"/>
                <path d="M81.9,95.4c0.2,0,0.4,0,0.6,0c2.2-0.2,4.3-1.2,5.7-2.9c1.5-1.7,2.2-3.8,2-6.1c-0.3-4.6-4.3-8.1-8.9-7.8s-8.1,4.4-7.8,8.9
                    C73.9,91.9,77.5,95.4,81.9,95.4z"/>
            </svg>
        </div>
        <div class="front-loading progress-bar-inner">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <path d="M3.7,12h10.6l15.1,54.6c0.4,1.6,1.9,2.7,3.6,2.7h46.4c1.5,0,2.8-0.9,3.4-2.2l16.9-38.8c0.5-1.2,0.4-2.5-0.3-3.5
                    c-0.7-1-1.8-1.7-3.1-1.7H45c-2,0-3.7,1.7-3.7,3.7s1.7,3.7,3.7,3.7h45.6L76.9,62H35.8L20.7,7.3c-0.4-1.6-1.9-2.7-3.6-2.7H3.7
                    C1.7,4.6,0,6.3,0,8.3S1.7,12,3.7,12z"/>
                <path d="M29.5,95.4c4.6,0,8.4-3.8,8.4-8.4s-3.8-8.4-8.4-8.4s-8.4,3.8-8.4,8.4C21.1,91.6,24.8,95.4,29.5,95.4z"/>
                <path d="M81.9,95.4c0.2,0,0.4,0,0.6,0c2.2-0.2,4.3-1.2,5.7-2.9c1.5-1.7,2.2-3.8,2-6.1c-0.3-4.6-4.3-8.1-8.9-7.8s-8.1,4.4-7.8,8.9
                    C73.9,91.9,77.5,95.4,81.9,95.4z"/>
            </svg>
        </div>
        <div class="progress-bar-number">0%</div>
    </div>
</div>

<div id="search-fullwidth" class="mfp-hide mfp-with-anim">
    <?php
		$block = module_invoke('search', 'block_view', 'form');
		print render($block['content']);
	?>
</div><!-- #search-fullwidth -->

<div id="page-wrapper">
    <div id="page">
           <?php if($page['header']):?>
              <?php print render($page['header']);?>
           <?php endif; ?>
           <?php if($page['banner']):?>
           	  <div class="page-section no-padding" >
				  <?php print render($page['banner']);?>
              </div><!-- .page-section -->
           <?php endif; ?>
           <div id="main">
              
              <div class="page-section">
                <div class="container">
				  <?php if($messages) : ?>
                  	<?php print $messages; ?>
                  <?php endif; ?>
                  <?php print render($tabs); ?>
				  <?php print render($page['content']);?>
                </div>
              </div>
              
              
           </div><!-- #main -->
    
    
           <div id="footer">
       
			  <?php if($page['footer_top']):?>
                <div class="container">
                    <?php print render($page['footer_top']);?>
                </div>
              <?php endif; ?>
        
              <?php if($page['footer']):?>
                <?php print render($page['footer']);?>
              <?php endif; ?>
           </div><!-- #footer -->
    
    </div><!-- #page -->
</div>