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

<?php
    if (isset($_GET['refcode'])) {
        $_SESSION['referral_code'] = $_GET['refcode'];
    }
?>

<?php
    function get_user_first_name($user_id) {
        $user = user_load( $user_id );

        //Check if user was referenced by another user and generate the code for the referral user.
        if(isset($user->field_first_name)){
            return $user->field_first_name[LANGUAGE_NONE][0]['value'];
        }
    }
?>

<!-- header-full-center -->
<header id="header" class="header-shadow header-full-center">
    <div class="topbar">
        <div class="row">
            <div class="topbar-left col-sm-6">
              <ul class="top-navigation">
                  <?php if (!user_is_logged_in()) : ?>
                    <li class="myaccount-item">
                      <!-- Login trigger modal / Modal content inside page.tlp.php -->
                      <button type="button" id="btn-user-login" data-toggle="modal" data-target="#loginModal">Login</button>
                    </li>
                  <?php else: ?>
                    <li class="language-switcher">
                        <a href="javascript:void(0)"><?php print t('Bienvenido ')?> <span><?php print get_user_first_name($user->uid);?></span></a>
                      <ul class="top-navigation-submenu">
                        <li class="en first active">
                            <?php print l(t('Mi cuenta'), "user/{$GLOBALS['user']->uid}/edit"); ?>
                        </li>
                        <li class="en first active">
                            <?php print l(t('Mis cupones'), "user/{$GLOBALS['user']->uid}/coupons"); ?>
                        </li>
                        <li class="en first active">
                            <?php print l(t('Compras Anteriores'), "user/{$GLOBALS['user']->uid}/orders"); ?>
                        </li>
                        <li class="fr">
                          <a href="/node/71" class="language-link">Invitar amigos</a>
                        </li>
                        <li class="de last">
                          <a href="/user/logout" class="language-link">Salir</a>
                        </li>
                      </ul>
                    </li>
                  <?php endif; ?>
              </ul><!-- .top-navigation -->
              <button id="coupon-code-modal-button" type="button" data-toggle="modal" data-target="#couponCodeModal"></button>
            </div><!-- .topbar-left -->

            <div class="topbar-right col-sm-6">
                <ul class="top-navigation">
                    <li class="delivery-address-information-topbar">
                        <!-- Button trigger modal -->
                        <button id="delivery-button-topbar" type="button" data-toggle="modal" data-target="#deliveryAddressModal">
                            <?php if(!isset($_COOKIE['picadasoAddress'])) : ?>
                                <div class="delivery-address-trigger">
                                    <img alt="Gift icon" class="address-box-location-icon" src="/sites/default/files/order_icon.png" />
                                    &nbsp; Ingresa tu ubicación &nbsp;
                                </div>
                            <?php else:
                                $addressArray = explode("#", $_COOKIE['picadasoAddress']);
                            ?>
                                <div class="delivery-address-info">
                                    <div class="delivery-address-info-title-div">
                                        <span id="delivery-address-title">Dirección de entrega:</span>
                                    </div>
                                    <div class="delivery-address-info-details-div">
                                        <span id="delivery-address-details"><?php print $addressArray[0] ?></span>
                                    </div>
                                    <div class="delivery-address-info-lat-lng" style="display: none;">
                                        <input id="deliveryAddressContent" type="hidden" name="hiddenAddress"/>
                                        <input id="deliveryAddressLatitude" type="hidden" name="hiddenLatitude"/>
                                        <input id="deliveryAddressLongitude" type="hidden" name="hiddenLongitude"/>
                                    </div>
                                </div>
                            <?php endif; ?>

                            <div class="delivery-address-icon" style="display: table-cell;">
                                <i class="icon-down-arrow"></i>
                            </div>
                        </button>
                    </li>
                    <li class="shopping-bag-item">
                        <a id="shopping-cart-header-button" href="<?php print base_path() ?>cart"><?php print t('my cart') ?> <span><?php print format_plural($quantity, '1', '@count'); ?></span></a>
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
                <ul id="main-nav-tool">
                    <li class="search-action">
                        <a href="#search-fullwidth"><i class="fa fa-search"></i></a>
                    </li>
                </ul><!-- #main-nav-tool -->
                <div class="container">
                    <div class="main-navigation-outer">
                        <?php
							$menu_name = variable_get('menu_main_links_source', 'main-menu');
							$tree = menu_tree($menu_name);
							print drupal_render($tree);
						?>
                    </div>
                </div>
            </nav><!-- .main-nav -->
        </div>
    </div><!-- .navbar-container -->
    <nav class="main-nav-mobile" id="nav-mobile">
    	<?php
			$menu_name = variable_get('menu_main_links_source', 'main-menu');
			$tree = menu_tree($menu_name);
			print str_replace('id="main-navigation"','class="navigation-mobile"',drupal_render($tree));
		?>
    </nav><!-- .main-nav-mobile -->

    <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
    <meta property="og:description"        content="How much does culture influence creative thinking?" />
    <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4pQjfYaJ06qt71esl-Zk5-W_2x3qzaSU&libraries=places&sensor=false" async defer></script>
    <script src="/sites/all/themes/md_delphinus/js/front/delivery_address_script.js"></script>
    <script src="/sites/all/themes/md_delphinus/js/front/delivery_address_cookie.js"></script>
    <script src="/sites/all/themes/md_delphinus/js/front/picadaso_js_script.js"></script>
</header><!-- #header -->

<!-- Login Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header login-button-modal">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Crea tu cuenta</h4>
        <span>Disfruta de beneficios exclusivos.</span></br>
        <span>Suscribete y obten $5 de descuento en tu primera compra.</span>
      </div>
      <div class="modal-body login-button-modal">
            <!-- Facebook Login -->
            <div class="facebook-login-section">
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                        <div class="login-fb-phone-number">
                            <label id="login-fb-phone-label">Número de teléfono <span class="form-required">*</span></label>
                            <input id="login-fb-phone" type="text" class="form-control" placeholder="Número de teléfono" aria-label="Número de teléfono">
                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>
                <div class="row">
                    <a id="login-fb-link" href="/user/simple-fb-connect">
                        <img id="login-fb-image" src="/sites/default/files/login-fb-button.png">
                    </a>
                </div>
                <div class="row">
                    <span id="login-fb-display-message">Por favor, ingresa tu número de teléfono.</span>
                </div>
            </div>

            <div class="divider">
                <div class="half-divider"></div>Ó<div class="half-divider"></div>
            </div>

            <div class="email-login-section">
                <!-- Login Button -->
                <div class="login-section">
                    <a href="/user/login" class="login-link">Login con E-mail</a>
                </div>
                <!-- Register Button -->
                <div class="login-section">
                    <a href="/user/register" class="login-link">Registrate</a>
                </div>
            </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal Delivery Address-->
<div class="modal fade" id="deliveryAddressModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header delivery-address-modal">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Dirección de entrega</h4>
                <span>Escribe tu dirección o arrastra el pin para una ubicación más específica.</span>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div id="address_box">
                        <input id="formatted_address_text" type="text" placeholder="Ingrese una dirección">
                    </div>
                </div>
                <div class="row">
                    <div id="map"></div>
                    <div id="infowindow-content">
                        <span id="place-name"  class="title"></span>
                    </div>
                </div>

                <div id="latlng_box">
                    <label>Latitude</label>
                    <input id="lat_text" type="text" value="">
                    <label>Longitude</label>
                    <input id="lng_text" type="text" value="">
                </div>
            </div>
            <div class="modal-footer delivery-address-modal">
                <button type="button" class="btn btn-default" id="delivery-address-submit-button">Aceptar</button>
                <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Coupon Code Available-->
<div class="modal fade" id="couponCodeModal" tabindex="-1" role="dialog" aria-labelledby="myCouponModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header coupon-code-modal">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myCouponModalLabel">Tienes un cupón de descuento</h4>
                <span>Utiliza este código de descuento en tu próxima compra.</span>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div id="coupon-code-obtained">
                        <h2 id="coupon-code-span"></h2>
                    </div>
                    <div id="coupon-code-modal-content">
                        <p>Tienes un cupón de $5 dolares de descuento disponibles para tu siguiente compra. El código de este cupón estará disponible al momento del Checkout.</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer delivery-address-modal">
                <button type="button" class="btn btn-default"  data-dismiss="modal">Aceptar</button>
            </div>
        </div>
    </div>
</div>


<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '2013489008915343',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.11'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

    // place this within dom ready function
    function showCouponCodePanel() {
        if ( window.location.pathname == '/' ){
            // Index (home) page
            var couponCode = "<?php echo pic_features_get_coupon_code($user->uid) ?>";

            if(couponCode != ''){
                var showCode = document.getElementById('coupon-code-span');
                showCode.textContent = couponCode;
                document.getElementById('coupon-code-modal-button').click();
            }
        }
    }

    // use setTimeout() to execute
    setTimeout(showCouponCodePanel, 10000);
</script>