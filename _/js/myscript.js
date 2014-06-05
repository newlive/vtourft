$(function() {
  //Highlight nav
  $("#home a:contains('Beranda')").parent().addClass('active');
  $("#virtual a:contains('Virtual')").parent().addClass('active');
  $("#lokasi a:contains('Lokasi')").parent().addClass('active');
  $("#tentang a:contains('Tentang')").parent().addClass('active');
  
  $(document).ready(function() {
    $('.carousel').carousel({interval: 7000});
  });

});