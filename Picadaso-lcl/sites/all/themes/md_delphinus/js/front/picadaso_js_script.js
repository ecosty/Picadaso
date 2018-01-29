jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
    $('#deliveryAddressModal').on('shown.bs.modal', function(){
        initMap();
    });

    $('#formatted_address_text').on("click", function () {
        $(this).select();
    });

    $('#delivery-address-submit-button').on("click", function () {
        if($('#formatted_address_text').val() == "") {
            alert("Por favor ingrese una dirección")
        }
        else {
            var addressContent = document.getElementById('formatted_address_text').value;
            var latitudeContent = document.getElementById('lat_text').value;
            var longitudeContent = document.getElementById('lng_text').value;

            addressCookie(addressContent, latitudeContent, longitudeContent);

            $('#delivery-address-details').text(addressContent);
            //Add content to the hidden inputs.
            $("#deliveryAddressContent").val(addressContent);
            $("#deliveryAddressLatitude").val(latitudeContent);
            $("#deliveryAddressLongitude").val(longitudeContent);

            $(".delivery-address-trigger").css('display', 'none');
            $(".delivery-address-info").css('display', 'table-cell');

            $('#deliveryAddressModal').modal('hide');
        }
    });

    $('#login-fb-link').on("click", function () {
        if($('#login-fb-phone').val()=='') {
            $('#login-fb-display-message').show();
            return false;
        }
        else {
            document.cookie = "userphone=" + $('#login-fb-phone').val();
        }
    });

    $('#login-fb-link-page').on("click", function () {
        if($('#login-fb-phone-page').val()=='') {
            $('#login-fb-display-message-page').show();
            return false;
        }
        else {
            document.cookie = "userphone=" + $('#login-fb-phone-page').val();
        }
    });

    $('.login-fb-phone-number').on('keydown', '#login-fb-phone', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});

    $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    $('#edit-submit--2').on("click", function () {

        if($('#edit-field-first-name-und-0-value').val()=='' || $('#edit-field-last-name-und-0-value').val()=='' || $('#edit-field-birth-date-und-0-value').val()=='' || $('#edit-field-user-phone-number-und-0-value').val()=='' || $('#edit-mail').val()=='' || $('#edit-pass-pass1').val()=='' || $('#edit-pass-pass2').val()=='') {
            $('#login-register-display-message').show();
            return false;
        }
    });

    // If Drupal user anonymous user...
    $('#shopping-cart-header-button, #checkout-cart-popup, #view-cart-popup').on("click", function () {
        if(Drupal.settings.user_js_uid == 0) {
            // execute code for non logged in users
            $('#btn-user-login').click();
            return false;
        }
    });

    $('#btn-user-login').on("click", function () {
        var userPhoneLogged = getCookie("userphone");
        if(userPhoneLogged != ''){
            $('#login-fb-phone').val(userPhoneLogged);
        }
    });

    /*
    $('#edit-field-birth-date-und-0-value').datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        autoclose: true,
        orientation: "bottom auto",
        todayHighlight: true
    });*/
});