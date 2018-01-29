<?php
	$default_value = theme_get_setting('logo_normal_file_uploaded');
	$path = base_path() . drupal_get_path("theme","md_delphinus") . "/logo.png";
	$media_file = array('fid' => isset($default_value['fid']) ? intval($default_value['fid']) : 0);
	if ($media_file['fid'] && ($media_file = file_load($media_file['fid']))) :
	  $media_file = get_object_vars($media_file);
	endif;
	
	if($media_file['fid'] != 0) :
		$path = file_create_url($media_file['uri']);
	endif;
?>
<?php
if (module_exists('commerce')) :
	global $user;
	$quantity = 0;
	$order = commerce_cart_order_load($user->uid);
	if ($order) :
		$wrapper = entity_metadata_wrapper('commerce_order', $order);
		$line_items = $wrapper->commerce_line_items;
		$quantity = commerce_line_items_quantity($line_items, commerce_product_line_item_types());
		$total = commerce_line_items_total($line_items);
		$currency = commerce_currency_load($total['currency_code']);
	endif;
endif;
?>

<!-- header-full-center -->
<header id="header" class="header-shadow navigation-right">
    <div class="topbar">
        <div class="row">
            <div class="topbar-left col-sm-6">
                <ul class="top-navigation">
                    <li class="language-switcher">
                        <a href="javascript:void(0)"><?php print t('Lang') ?></a>
                        <?php
                            $block = module_invoke('locale', 'block_view', 'language');
                            $str = render($block['content']);
                            $str = str_replace("language-switcher-locale-url","top-navigation-submenu",$str);
                            $str = str_replace('xml:lang="en"', '', $str);
                            $str = str_replace('xml:lang="fr"', '', $str);
                            $str = str_replace('xml:lang="de"', '', $str);
                            print $str;
                        ?>
                    </li><!-- .language-switcher -->

                    <li class="currency-switcher">
                        <a href="javascript:void(0)"><?php print t('Curr') ?></a>
                    <?php
                        $block = module_invoke('commerce_multicurrency', 'block_view', 'currency_menu');
                        print str_replace("currency_select_menu","top-navigation-submenu",render($block['content']));
                    ?>
                    </li><!-- .language-switcher -->

                    <li class="search-action">
                        <a href="#search-fullwidth"><i class="fa fa-search"></i></a>
                    </li>
                </ul><!-- .top-navigation -->
            </div><!-- .topbar-left -->


            <div class="topbar-right col-sm-6">
                <ul class="top-navigation">
                    <?php 
                        if (!user_is_logged_in()) :
                    ?>
                            <li class="myaccount-item">
                                <a href="javascript:void(0)"><?php print t('login') ?></a>
                                <div class="top-navigation-submenu">
                                    <h3 class="submenu-heading"><?php print t('Login') ?></h3>
                                    <?php
                                      $block = module_invoke("user", "block_view", "login");
                                      print render($block['content']);
                                    ?>
                                </div>
                            </li>
                    <?php
                        endif;
                    ?>
                    <li class="wishlist-item">
                        <?php
                          $block = module_invoke("views", "block_view", "product-wishlist_block");
                          print render($block['content']);
                        ?>
                    </li>
                    <li class="shopping-bag-item">
                        <a href="<?php print base_path() ?>cart"><?php print t('my cart') ?> <span><?php print format_plural($quantity, '1', '@count'); ?></span></a>
                        <div class="top-navigation-submenu">
                            <div class="shopping-bag">
                                <?php
                                  $block = module_invoke("commerce_cart", "block_view", "cart");
                                  print render($block['content']);
                                ?>
                            </div>
                        </div>

                    </li>
                </ul><!-- .top-navigation -->
            </div><!-- .topbar-right -->

        </div>
    </div><!-- .topbar -->
    <div class="navbar-container sticky-header">
        <div class="container">
            <div class="navbar-container-inner clearfix">
                <div class="branding">
                    <h1 class="logo">
                        <a href="<?php print base_path(); ?>"><img src="<?php print $path; ?>" alt="" /></a>
                    </h1>
                </div><!-- .branding -->
                <div class="mobile-tool">
                    <a id="hamburger-icon" href="#" title="Menu">
                        <span class="hamburger-icon-inner">
                            <span class="line line-1"></span>
                            <span class="line line-2"></span>
                            <span class="line line-3"></span>
                        </span>
                    </a>
                    <a href="<?php print base_path() . 'cart'; ?>" class="mobile-tool-cart">
                        <i class="icon-Shopping-Cart"></i>
                    </a>
                </div>
                <nav class="main-nav" id="nav">
                    <div class="main-navigation-outer">
						<?php
                            $menu_name = variable_get('menu_main_links_source', 'main-menu');
                            $tree = menu_tree($menu_name);
                            print drupal_render($tree); 
                        ?>
                    </div>
                </nav><!-- .main-nav -->
            </div>
        </div>
    </div><!-- .navbar-container -->
    <nav class="main-nav-mobile" id="nav-mobile">
        <?php
            $menu_name = variable_get('menu_main_links_source', 'main-menu');
            $tree = menu_tree($menu_name);
            print str_replace('id="main-navigation"','class="navigation-mobile"',drupal_render($tree)); 
        ?>
    </nav><!-- .main-nav-mobile -->
</header><!-- #header -->