var delimiter = "#";

function addressCookie(address, latitude, longitude) {
    var addressdata = address + delimiter + latitude + delimiter + longitude;
    createCookie("picadasoAddress", addressdata, 30);
}

function createCookie(name, value, days, path, domain, secure) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = date.toGMTString();
  } 
  else {
    var expires = "";
  } 

  cookieString = name + "=" + value;
  
  if (expires){
    cookieString += "; expires=" + expires;
  }
    
  if (path){
    cookieString += "; path=" + path;
  }
    
  if (domain){
    cookieString += "; domain=" + domain;
  }
    
  if (secure){
    cookieString += "; secure";
  }
    
  document.cookie = cookieString;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

function deleteCookie(name) {
  createCookie(name, "", -1);
}