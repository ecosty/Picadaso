<div class="row center-xs">
<div class="col-xs-12 col-sm-4">
  <div class="text-center">
    <a id="share-fb-button" class="button button-wide btn-primary social-btn fb-button">
      <i class="icon fontello icon-facebook share-coupons"></i>
      <span class="true">Facebook</span>
    </a>
  </div>
</div>

<div class="col-xs-12 col-sm-4">
  <div class="text-center">
    <a  class="button button-wide btn-primary social-btn twitter-button" href="https://twitter.com/intent/tweet?text=Here's%20$10%20in%20Saucey%20alcohol%20delivery%20credit.%20Sign%20up%20using%20my%20link:&amp;url=https://get.saucey.com/yc7e/lDFoaau47H" target="_blank">
      <i class="icon fontello icon-twitter share-coupons" data-reactid="283"></i>
      <span class="true">Twitter</span>
    </a>
  </div>
</div>

<div class="col-xs-12 col-sm-4">
  <div class="text-center">
    <a  class="button button-wide btn-primary social-btn mail-button" href="mailto:?subject=Check%20out%20Saucey!&amp;body=Hey!%20Here's%20$10%20in%20FREE%20Saucey%20alcohol%20delivery%20credit%20(good%20for%2030%20days).%20Sign%20up%20using%20my%20link%20so%20I%20get%20$10%20off%20too%20%F0%9F%98%89%20https://get.saucey.com/yc7e/bsDhQbu47H" target="_blank">
      <i class="icon fontello icon-mail-alt share-coupons"></i>
      <span class="true">Email</span>
    </a>
  </div>
</div>
</div>

<script>
jQuery(document).ready(function($) {

  var shareUserCode = "<?php getUserCode(); ?>"

  $("#share-fb-button").on("click", function () {
    var urlAddress = shareUserCode;

    FB.ui({
      method: 'share',
      display: 'popup',
      href: urlAddress,
    }, function(response){});
  });

  $("#myShareCode").val(shareUserCode);

  $("#copyClipboardButton").on("click", function () {
    copyToClipboard('#myShareCode');
    $(this).text ('Copiado').delay( 800 );
    $('#myShareCode').select();
  });

  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
  }
});
</script>

<?php
  function getUserCode()
  {
      $userShareCode = '';

      if(isset($GLOBALS['user'])){
        $userShareCode = '?refcode=' . user_crypt($GLOBALS['user']->uid);
      }

      echo $GLOBALS['base_url'] . $userShareCode;
  }

  /**
  * Encrypt and decrypt
  * @param string $string string to be encrypted/decrypted
  * @param string $action what to do with this? e for encrypt, d for decrypt
  */
  function user_crypt( $string, $action = 'e' ) {
    // you may change these values to your own
    $secret_key = '6gtWy5b9';
    $secret_iv = 'hGv8G3cB';

    $output = false;
    $encrypt_method = "AES-256-CBC";
    $key = hash( 'sha256', $secret_key );
    $iv = substr( hash( 'sha256', $secret_iv ), 0, 16 );

    if( $action == 'e' ) {
        $output = base64_encode( openssl_encrypt( $string, $encrypt_method, $key, 0, $iv ) );
    }
    else if( $action == 'd' ){
        $output = openssl_decrypt( base64_decode( $string ), $encrypt_method, $key, 0, $iv );
    }

    return $output;
  }
?>