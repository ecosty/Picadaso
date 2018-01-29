var map, infowindow, geocoder, marker, markerLatitude, markerLongitude, infowindowContent;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -0.180, lng: -78.467},
        zoom: 13
    });
    
    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow;

    //Places autocomplete
    var input = document.getElementById('formatted_address_text');
    var autocomplete = new google.maps.places.Autocomplete(input);
    infowindowContent = document.getElementById('infowindow-content');
    
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
    infowindow.setContent(infowindowContent);
    
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } 
        else {
          map.setCenter(place.geometry.location);
          map.setZoom(15);  // Why 15? Because it looks good.
        }
        
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-name'].textContent = place.name;
        
        document.getElementById('lat_text').value = marker.getPosition().lat();
        document.getElementById('lng_text').value = marker.getPosition().lng();
        
        infowindow.open(map, marker);
    });
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            infowindow.setPosition(pos);
            map.setZoom(16);
            //infowindow.setContent(createInfoWindowContent(map, pos));
            infowindow.open(map);
            map.setCenter(pos);
            infowindow.close();
            
            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: {lat: pos.lat, lng: pos.lng}
            });
        
            document.getElementById('lat_text').value = pos.lat;
            document.getElementById('lng_text').value = pos.lng;
            geocodeLatLng(marker, geocoder, map, infowindow, pos.lat, pos.lng);
        
            marker.addListener('click', toggleBounce);
        
            google.maps.event.addListener(marker, 'dragend', function (event) {
                document.getElementById("lat_text").value = this.getPosition().lat();
                document.getElementById("lng_text").value = this.getPosition().lng();
                geocodeLatLng(marker, geocoder, map, infowindow, this.getPosition().lat(), this.getPosition().lng());
            });
        }, 
        function() {
            handleLocationError(true, infowindow, map.getCenter());
        });
    } 
    else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infowindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infowindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
  infowindow.open(map);
}

function createInfoWindowContent(map, pos) {
    return [
        'Latitude: ' + pos.lat,
        'Longitude: ' + pos.lng,
        'Zoom level: ' + map.getZoom()
    ].join('<br>');
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function geocodeLatLng(marker, geocoder, map, infowindow, markerLatitude, markerLongitude) {
    var latlng = {lat: parseFloat(markerLatitude), lng: parseFloat(markerLongitude)};
    
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(16);
                marker.setPosition(latlng);
                marker.setMap(map);
                
                infowindow.close();
                document.getElementById("formatted_address_text").value = results[0].formatted_address;
                
                infowindowContent.children['place-name'].textContent = results[0].formatted_address;
                
                infowindow.setContent(infowindowContent);
                infowindow.open(map, marker);
            } 
            else {
              window.alert('No results found');
            }
          } 
          else {
            window.alert('Geocoder failed due to: ' + status);
          }
    });
}
