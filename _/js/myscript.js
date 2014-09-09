$(function() {
  //Highlight nav
  $("#home a:contains('Beranda')").parent().addClass('active');
  $("#tour a:contains('Tour')").parent().addClass('active');
  $("#lokasi a:contains('Lokasi')").parent().addClass('active');
  $("#video a:contains('Video')").parent().addClass('active');
  $("#lain a:contains('Lain')").parent().addClass('active');
  $("#tentang a:contains('Tentang')").parent().addClass('active');

  

  
  $(document).ready(function() {
    $('.carousel').carousel({interval: 7000});
  });

});


// /* google maps -----------------------------------------------------*/
// google.maps.event.addDomListener(window, 'load', initialize);

// function initialize() {

//   /* position Amsterdam */
//   var latlng = new google.maps.LatLng(52.3731, 4.8922);

//   var mapOptions = {
//     center: latlng,
//     scrollWheel: false,
//     zoom: 13
//   };
  
//   var marker = new google.maps.Marker({
//     position: latlng,
//     url: '/',
//     animation: google.maps.Animation.DROP
//   });
  
//   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//   marker.setMap(map);

// };
// /* end google maps -----------------------------------------------------*/