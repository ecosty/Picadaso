<div class="page-section product-details">
    <div class="product-main style1">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div class="product-detail-thumbarea">
                        <div class="single-product-main-images owl-carousel1" id="sync1">
                            <?php for($i=0; $i < count($content['field_product_gallery']['#items']); $i++) : ?>
                            	<div class="easyzoom">
                                    <a href="<?php print file_create_url($content['field_product_gallery']['#items'][$i]['uri']) ?>" class="woocommerce-main-image">
                                        <img alt="" src="<?php print file_create_url($content['field_product_gallery']['#items'][$i]['uri']) ?>" />
                                    </a>
                                </div>
                            <?php endfor; ?>
                        </div><!-- #sync1.single-product-main-images.owl-carousel -->
                        <div class="single-product-main-thumbnails owl-carousel2" id="sync2" data-items="3">
                            <?php for($i=0; $i < count($content['field_product_gallery']['#items']); $i++) : ?>
                            	<a href="<?php print file_create_url($content['field_product_gallery']['#items'][$i]['uri']) ?>" class="woocommerce-main-image">
                                    <img alt="" src="<?php print image_style_url('product_4', $content['field_product_gallery']['#items'][$i]['uri']) ?>" >
                                </a>
                            <?php endfor; ?>
                        </div><!-- #sync2.single-product-main-thumbnails.owl-carousel -->
                    </div><!-- .product-detail-thumbarea -->
                </div>

                <div class="col-sm-6">
                    <?php
                        $block = module_invoke('md_theme', 'block_view', 'breadcrumbs_2');
                        print render($block['content']);
                    ?>

                    <div class="product-detail-header">
                        <h1 class="product-title"><?php print $node->title; ?></h1>
                        <span class="product-subtitle"><?php print $content['field_subtitle']['#items'][0]['value'] ?> ( <?php print $content['field_volume']['#items'][0]['value'] ?> )</span>
                    </div>

                    <div class="product-price-wrap clearfix">
                      <h3 class="price"><span class="amount"><?php print render($content['product:commerce_price']) ?></span></h3>
                    </div>

                    <div class="checkbox make-a-gift-container">
                        <img class="send-as-a-gift-img" src="<?php print '/sites/default/files/if_gift_172472.png' ?>" alt=""/>
                        <span>Puedes enviarlo como regalo al momento del checkout.</span>
                    </div>

                    <div class="product-details-info">
                      <?php print render($content['field_product_ref']); ?>
                    </div>

                    <div class="product-short">
                        <p><strong class="black"><?php print t('Descripción') ?></strong><br/><?php print $content['field_product_description']['#items'][0]['value'] ?></p>
                    </div>

                    <div class="row product-detail-features">
                      <div class="col-sm-4">
                        <p><strong class="black"><?php print t('Compañia') ?></strong><br/><?php print $content['field_company']['#items'][0]['value'] ?></p>
                      </div>
                      <div class="col-sm-4">
                        <p><strong class="black"><?php print t('Tamaño') ?></strong><br/><?php print $content['field_volume']['#items'][0]['value'] ?></p>
                      </div>
                      <div class="col-sm-4">
                        <p><strong class="black"><?php print t('Categoría') ?></strong><br/>
                                <?php for($i=0; $i < count($content['field_product_categories']['#items']); $i++) : ?>
                                  <?php if($i < count($content['field_product_categories']['#items']) - 1) : ?>
                                    <a href="<?php print base_path() . drupal_get_path_alias($content['field_product_categories'][$i]['#href']) ?>"><?php print $content['field_product_categories'][$i]['#title']; ?></a>,
                                  <?php else : ?>
                                    <a href="<?php print base_path() . drupal_get_path_alias($content['field_product_categories'][$i]['#href']) ?>"><?php print $content['field_product_categories'][$i]['#title']; ?></a>
                                  <?php endif; ?>
                                <?php endfor; ?>
                          </p>
                      </div>
                    </div>

                    <div class="row social-media-title">
                        <strong>Compartenos en tus redes sociales</strong>
                    </div>

                    <div class="product-shareit">
                        <span class="screen-reader-text"><?php print t('Share this') ?></span>
                        <ul class="social_icons clearfix">
                            <li><a onclick="window.open('https://www.facebook.com/sharer.php?s=100&amp;p[url]=<?php print drupal_get_path_alias('node/' . $node->nid); ?>','sharer', 'toolbar=0,status=0,width=620,height=280');" href="javascript:;"><i class="fa fa-facebook"></i> <span><?php print t('Facebook'); ?></span></a></li>
                            <li><a onclick="popUp=window.open('http://twitter.com/home?status=<?php print str_replace(" ","+",$node->title);?> <?php print drupal_get_path_alias('node/' . $node->nid); ?>','sharer','scrollbars=yes,width=800,height=400');popUp.focus();return false;" href="javascript:;"><i class="fa fa-twitter"></i> <span><?php print t('Twitter'); ?></span></a></li>
                            <li><a onclick="popUp=window.open('http://pinterest.com/pin/create/button/?url=<?php print drupal_get_path_alias('node/' . $node->nid); ?>&amp;description=<?php print str_replace(" ","+",$node->title);?>&amp;media=<?php print file_create_url($content['field_product_thumbnail']['#items'][0]['uri']); ?>','sharer','scrollbars=yes,width=800,height=400');popUp.focus();return false;" href="javascript:;"><i class="fa fa-pinterest"></i> <span><?php print t('Pinterest'); ?></span></a></li>
                        </ul>
                    </div>

                </div>
            </div>

            <?php if ($content['field_product_style']['#items'][0]['value'] == 'style-2') : ?>
                <div class="row cocktail-instructions">

                    <div class="col-sm-6">
                        <div class="intructions-details-frame">
                            <h4>Instrucciones</h4>
                            <?php print $content['field_instructions']['#items'][0]['value'] ?>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="intructions-video-title">
                            <h4>Video Instructivo</h4>
                        </div>
                        <div class="intructions-video-frame">
                            <iframe src="https://www.youtube.com/embed/<?php print $content['field_instructions_video']['#items'][0]['value'] ?>" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>

                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php if (count($field_product_related_products) > 0) : ?>

    <div class="page-section related-products">
        <div class="container">
            <div class="row">
                <div class="kt-heading-wrapper">
                    <div class="kt-heading-divider">
                        <svg version="1.1" x="0px" y="0px"
                            viewBox="349 274.7 1310.8 245.3" style="enable-background:new 349 274.7 1310.8 245.3;" xml:space="preserve">
                            <path d="M1222,438.9c-2.7,0-5.4,0-8.1-2.7l-210.8-129.7L792.3,436.2c-5.4,2.7-10.8,2.7-13.5,0L573.3,306.5L365.2,436.2L349,411.9
                            l216.2-132.4c5.4-2.7,10.8-2.7,13.5,0l208.1,127l210.8-129.7c5.4-2.7,10.8-2.7,13.5,0L1222,409.2l208.1-129.7
                            c5.4-2.7,10.8-2.7,13.5,0l216.2,135.1l-13.5,21.7l-208.1-129.7l-208.1,129.7C1227.4,436.2,1224.7,438.9,1222,438.9L1222,438.9z"/>
                            <path d="M1222,520c-2.7,0-5.4,0-8.1-2.7l-210.8-129.7L792.3,517.3c-5.4,2.7-10.8,2.7-13.5,0L573.3,387.6L362.5,517.3L349,493
                            l216.2-132.4c5.4-2.7,10.8-2.7,13.5,0l205.4,129.7L995,360.5c5.4-2.7,10.8-2.7,13.5,0l210.8,129.7l208.1-129.7
                            c5.4-2.7,10.8-2.7,13.5,0l216.2,135.1l-13.5,21.6l-205.4-129.7l-208.1,129.8C1227.4,517.3,1224.7,520,1222,520L1222,520z"/>
                        </svg>
                    </div>
                    <h3 class="kt-heading-title"><?php print t('Productos Relacionados') ?></h3>

    <div class="row">
    <div class="awe-col awecontent-column awe-section-33-2-1  col-lg-12 col-md-12 col-sm-12 col-xs-12 col-lg-offset-0 col-md-offset-0 col-sm-offset-0 col-xs-offset-0 col-lg-make-row-true col-md-make-row-true col-sm-make-row-true col-xs-make-row-true ">
    <div class="awe-col-content text-left">
    <div class="awe-col-wrapper">
    <div class="widget-container mb-0 pb-0 block-33-views-product-product_slider_2 block block-views animated undefined" data-animation="{&quot;type&quot;: &quot;none&quot;}" id="block-views-product-product-slider-2">
    <div class="view view-product view-id-product view-display-id-product_slider_2 view-dom-id-43683358271aeceec97082100a28c7d7">
    <div class="view-content">
    <div class="products">
    <div class="owl-carousel-kt remove-mar-bottom navigation-center">
    <div class="owl-carousel kt-owl-carousel owl-kttheme" data-options="{&quot;pagination&quot;: false, &quot;navigation&quot;: true, &quot;desktop&quot;: 4, &quot;desktopsmall&quot; : 3, &quot;tablet&quot; : 2, &quot;mobile&quot; : 1}" style="opacity: 1; display: block;">

                        <?php for($i=0; $i < count($field_product_related_products); $i++) : ?>

                            <div class="product wow fadeInUp" data-wow-delay="100ms">
                                    <div class="product-content">
                                        <a href="<?php print url('node/'. $field_product_related_products[$i]['nid']); ?>" class="product-thumbnail">
                                            <img class="first-img" src="<?php print file_create_url($field_product_related_products[$i]['node']->field_product_thumbnail['und'][0]['uri']); ?>" alt=""/>
                                            <img class="second-img" src="<?php print file_create_url($field_product_related_products[$i]['node']->field_product_thumbnail_alt['und'][0]['uri']); ?>" alt=""/>
                                        </a>
                                        <div class="product-over-add">
                                            <div class="commerce-add-to-cart">
                                                <a class="form-submit" href="<?php print url('node/'. $field_product_related_products[$i]['nid']); ?>"><?php print t('Ver Mas'); ?></a>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 class="product-title"><a href="<?php print url('node/'. $field_product_related_products[$i]['nid']); ?>"><?php print $field_product_related_products[$i]['node']->title ?></a></h3>
                                    <div class="product-price">
                                        <?php

                                            $product_commerce = commerce_product_load($field_product_related_products[$i]['node']->field_product_ref['und'][0]['product_id']);

                                            $price = entity_metadata_wrapper('commerce_product', $product_commerce)->commerce_price->value();
                                            $price_display = commerce_currency_format($price['amount'], $price['currency_code'], $product_commerce);

                                            print $price_display
                                        ?>
                                    </div>
                                </div>

                        <?php endfor; ?>

    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
                </div>
            </div>
        </div>
    </div>

<?php endif; ?>

<?php
	$path_theme = drupal_get_path('theme', 'md_delphinus');
	drupal_add_js("{$path_theme}/js/front/jquery-ui.min.js");
?>