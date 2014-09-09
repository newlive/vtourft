google.maps.visualRefresh = true;

var map;
var infoWindow;
var historicalOverlay;
var historicalOverlay2;
var koord_tempat;
function initialize(lat, lng) {
  var myLatLng;
  var lokasiini = window.localStorage.getItem("lokasikoor");
  
  if (lokasiini!==null) {
      var lok = lokasiini.split(",");
      koord_tempat = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(lok[0]), parseFloat(lok[1])),
                title: "Lokasi"
            });
      if (parseFloat(lok[0])<-7.78 && parseFloat(lok[1])<110.0) {
         myLatLng = new google.maps.LatLng(parseFloat(lok[0]), parseFloat(lok[1]));
      } else {
         myLatLng = new google.maps.LatLng(-7.772909,110.386761); 
      }
      window.localStorage.removeItem("lokasikoor");
  } else {
      if (lat<-7.78 && lng<110.0) {
          myLatLng = new google.maps.LatLng(lat,lng);
      } else {
          myLatLng = new google.maps.LatLng(-7.772909,110.386761);
      }
  }
  
  var mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    zoom: 17,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  
  if(lokasiini!=null) {
        koord_tempat.setMap(map);
        var iconlok = 'assets/img/mapicon/office-building.png';
        var lokasicari = new google.maps.Marker({
                         animation: google.maps.Animation.DROP,
                         position: new google.maps.LatLng(lat,lng),
                         icon: iconlok
                         });
        
        lokasicari.setMap(map);
        
        var infowindowku = new google.maps.InfoWindow();
        infowindowku.setContent('Ini yang anda cari');
        infowindowku.open(map, koord_tempat);
        addInfoWindow(lokasicari, 'Anda berada disini');
  }
 
    
  if ((lat<(-7.77 + 0.005) && lat>(-7.77 - 0.005)) && ((lng<(110.387 + 0.002) && lng>(110.387 - 0.005)))) {
        var iconlok = 'assets/img/mapicon/office-building.png';
        var lokasiku = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        icon: iconlok
    });
    lokasiku.setMap(map);
    var infowindowku = new google.maps.InfoWindow();
    infowindowku.setContent('Anda berada disini');
    infowindowku.open(map, lokasiku);
    addInfoWindow(lokasiku, 'Anda berada disini');
  } else {
      alert('Anda berada di luar UNY');
  }
 
  function addInfoWindow(marker, message) {
    var info = message;

    var infoWindow = new google.maps.InfoWindow({
        content: message
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
 }
 
//Gambar kotak2

//var newark = new google.maps.LatLng(-7.773631,110.388436);
 var imageBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(-7.813032,110.326313),
      new google.maps.LatLng(-7.732412,110.445961));

 // var mapOptions = {
 //   zoom: 17,
 //   center: newark
 // };

 // var map = new google.maps.Map(document.getElementById('map-canvas'),
 //     mapOptions);

 historicalOverlay = new google.maps.GroundOverlay(
     'http://s25.postimg.org/o2bi0kxa7/kotak2.png',
     imageBounds);
 historicalOverlay.setMap(map);

//  //Gambar background

 //var newark2 = new google.maps.LatLng(-7.773631,110.388436);
  var imageBounds2 = new google.maps.LatLngBounds(
      
  new google.maps.LatLng(-7.778082,110.377914),
     new google.maps.LatLng(-7.767621,110.390585));

  historicalOverlay2 = new google.maps.GroundOverlay(
      'http://s25.postimg.org/73lvukpz3/PETA.png',
      imageBounds2);
  historicalOverlay2.setMap(map);
 
 
 // PTBB mulai 
  var MPTBB;
  var I_MPTBB = 'assets/img/mapicon/office-building.png';
  var latlngMPTBB = new google.maps.LatLng(-7.768909,110.387508);
  
  MPTBB = new google.maps.Marker({
      position: latlngMPTBB,
      map: map,
      title: 'Gedung PTBB',
      icon: I_MPTBB

  });

  MPTBB.setMap(map);
  google.maps.event.addListener(MPTBB, 'click', MPTBBf);
  infowindow = new google.maps.InfoWindow();
  
  function MPTBBf(event) {
  //var vertices = this.getPath();
  var keterangan = "<center><h7><b>Gedung PTBB</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
  } //<--- MPTBB


  // Gedung PTBB2
  var PTBB2;
  var I_PTBB2 = 'assets/img/mapicon/office-building.png';
  var latlng_PTBB2 = new google.maps.LatLng(-7.768483,110.387786);
  
  PTBB2 = new google.maps.Marker({
      position: latlng_PTBB2,
      map: map,
      title: 'Gedung PTBB2',
      icon: I_PTBB2

  });

  PTBB2.setMap(map);
  google.maps.event.addListener(PTBB2, 'click', PTBB2f);
  infowindow = new google.maps.InfoWindow();
  
  function PTBB2f(event) {
  var keterangan = "<center><h7><b>Gedung PTBB</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai PTBB2

// Gedung Halaman_KPLT
  var Halaman_KPLT;
  var I_Halaman_KPLT = 'assets/img/mapicon/forest.png';
  var latlng_Halaman_KPLT = new google.maps.LatLng(-7.768664,110.388326);
  
  Halaman_KPLT = new google.maps.Marker({
      position: latlng_Halaman_KPLT,
      map: map,
      title: 'Gedung Halaman KPLT',
      icon: I_Halaman_KPLT

  });

  Halaman_KPLT.setMap(map);
  google.maps.event.addListener(Halaman_KPLT, 'click', Halaman_KPLTf);
  infowindow = new google.maps.InfoWindow();
  
  function Halaman_KPLTf(event) {
  var keterangan = "<center><h7><b>Halaman KPLT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Halaman_KPLT

// Gedung KPLT
  var KPLT;
  var I_KPLT = 'assets/img/mapicon/conference.png';
  var latlng_KPLT = new google.maps.LatLng(-7.769196,110.388084);
  
  KPLT = new google.maps.Marker({
      position: latlng_KPLT,
      map: map,
      title: 'Gedung KPLT',
      icon: I_KPLT

  });

  KPLT.setMap(map);
  google.maps.event.addListener(KPLT, 'click', KPLTf);
  infowindow = new google.maps.InfoWindow();
  
  function KPLTf(event) {
  var keterangan = "<center><h7><b>Gedung KPLT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai KPLT

// Gedung TPA
  var TPA;
  var I_TPA = 'assets/img/mapicon/office-building.png';
  var latlng_TPA = new google.maps.LatLng(-7.768863,110.388867);
  
  TPA = new google.maps.Marker({
      position: latlng_TPA,
      map: map,
      title: 'Gedung TPA',
      icon: I_TPA

  });

  TPA.setMap(map);
  google.maps.event.addListener(TPA, 'click', TPAf);
  infowindow = new google.maps.InfoWindow();
  
  function TPAf(event) {
  var keterangan = "<center><h7><b>TPA</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai TPA

// Gedung Percetakan_UNY
  var Percetakan_UNY;
  var I_Percetakan_UNY = 'assets/img/mapicon/office-building.png';
  var latlng_Percetakan_UNY = new google.maps.LatLng(-7.769483,110.388691);
  
  Percetakan_UNY = new google.maps.Marker({
      position: latlng_Percetakan_UNY,
      map: map,
      title: 'Gedung Percetakan UNY',
      icon: I_Percetakan_UNY

  });

  Percetakan_UNY.setMap(map);
  google.maps.event.addListener(Percetakan_UNY, 'click', Percetakan_UNYf);
  infowindow = new google.maps.InfoWindow();
  
  function Percetakan_UNYf(event) {
  var keterangan = "<center><h7><b>Gedung Percetakan UNY</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Percetakan_UNY


// Gedung Mushola_KPLT
  var Mushola_KPLT;
  var I_Mushola_KPLT = 'assets/img/mapicon/mosquee.png';
  var latlng_Mushola_KPLT = new google.maps.LatLng(-7.769355,110.387833);
  
  Mushola_KPLT = new google.maps.Marker({
      position: latlng_Mushola_KPLT,
      map: map,
      title: 'Gedung Mushola KPLT',
      icon: I_Mushola_KPLT

  });

  Mushola_KPLT.setMap(map);
  google.maps.event.addListener(Mushola_KPLT, 'click', Mushola_KPLTf);
  infowindow = new google.maps.InfoWindow();
  
  function Mushola_KPLTf(event) {
  var keterangan = "<center><h7><b>Mushola KPLT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Mushola_KPLT

// Gedung Parkir_KPLT
  var Parkir_KPLT;
  var I_Parkir_KPLT = 'assets/img/mapicon/parking.png';
  var latlng_Parkir_KPLT = new google.maps.LatLng(-7.769153,110.387664);
  
  Parkir_KPLT = new google.maps.Marker({
      position: latlng_Parkir_KPLT,
      map: map,
      title: 'Gedung Parkir KPLT',
      icon: I_Parkir_KPLT

  });

  Parkir_KPLT.setMap(map);
  google.maps.event.addListener(Parkir_KPLT, 'click', Parkir_KPLTf);
  infowindow = new google.maps.InfoWindow();
  
  function Parkir_KPLTf(event) {
  var keterangan = "<center><h7><b>Parkir KPLT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Parkir_KPLT

// Gedung Kantin_KPLT
  var Kantin_KPLT;
  var I_Kantin_KPLT = 'assets/img/mapicon/fastfood.png';
  var latlng_Kantin_KPLT = new google.maps.LatLng(-7.769504,110.387921);
  
  Kantin_KPLT = new google.maps.Marker({
      position: latlng_Kantin_KPLT,
      map: map,
      title: 'Gedung Kantin KPLT',
      icon: I_Kantin_KPLT

  });

  Kantin_KPLT.setMap(map);
  google.maps.event.addListener(Kantin_KPLT, 'click', Kantin_KPLTf);
  infowindow = new google.maps.InfoWindow();
  
  function Kantin_KPLTf(event) {
  var keterangan = "<center><h7><b>Kantin KPLT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Kantin_KPLT


// Gedung sipil1
  var sipil1;
  var I_sipil1 = 'assets/img/mapicon/office-building.png';
  var latlng_sipil1 = new google.maps.LatLng(-7.769546,110.387213);
  
  sipil1 = new google.maps.Marker({
      position: latlng_sipil1,
      map: map,
      title: 'Gedung Teknik Sipil',
      icon: I_sipil1

  });

  sipil1.setMap(map);
  google.maps.event.addListener(sipil1, 'click', sipil1f);
  infowindow = new google.maps.InfoWindow();
  
  function sipil1f(event) {
  var keterangan = "<center><h7><b>Gedung Teknik Sipil</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai sipil1

// Gedung sipil2
  var sipil2;
  var I_sipil2 = 'assets/img/mapicon/office-building.png';
  var latlng_sipil2 = new google.maps.LatLng(-7.769507,110.387573);
  
  sipil2 = new google.maps.Marker({
      position: latlng_sipil2,
      map: map,
      title: 'Gedung Teknik Sipil',
      icon: I_sipil2

  });

  sipil2.setMap(map);
  google.maps.event.addListener(sipil2, 'click', sipil2f);
  infowindow = new google.maps.InfoWindow();
  
  function sipil2f(event) {
  var keterangan = "<center><h7><b>Gedung Teknik Sipil</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai sipil2


// Gedung sipil3
  var sipil3;
  var I_sipil3 = 'assets/img/mapicon/office-building.png';
  var latlng_sipil3 = new google.maps.LatLng(-7.769825,110.387366);
  
  sipil3 = new google.maps.Marker({
      position: latlng_sipil3,
      map: map,
      title: 'Gedung Teknik Sipil',
      icon: I_sipil3

  });

  sipil3.setMap(map);
  google.maps.event.addListener(sipil3, 'click', sipil3f);
  infowindow = new google.maps.InfoWindow();
  
  function sipil3f(event) {
  var keterangan = "<center><h7><b>Gedung Teknik Sipil</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai sipil3

// Gedung Lab_Sipil
  var Lab_Sipil;
  var I_Lab_Sipil = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_Sipil = new google.maps.LatLng(-7.769592,110.387908);
  
  Lab_Sipil = new google.maps.Marker({
      position: latlng_Lab_Sipil,
      map: map,
      title: 'Lab. Teknik Sipil',
      icon: I_Lab_Sipil

  });

  Lab_Sipil.setMap(map);
  google.maps.event.addListener(Lab_Sipil, 'click', Lab_Sipilf);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_Sipilf(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Sipil</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_Sipil

// Gedung Lab_Sipi2
  var Lab_Sipi2;
  var I_Lab_Sipi2 = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_Sipi2 = new google.maps.LatLng(-7.769653,110.388055);
  
  Lab_Sipi2 = new google.maps.Marker({
      position: latlng_Lab_Sipi2,
      map: map,
      title: 'Lab. Teknik Sipil',
      icon: I_Lab_Sipi2

  });

  Lab_Sipi2.setMap(map);
  google.maps.event.addListener(Lab_Sipi2, 'click', Lab_Sipi2f);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_Sipi2f(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Sipil</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_Sipi2


// Gedung Lab_Sipi3
  var Lab_Sipi3;
  var I_Lab_Sipi3 = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_Sipi3 = new google.maps.LatLng(-7.769892,110.387951);
  
  Lab_Sipi3 = new google.maps.Marker({
      position: latlng_Lab_Sipi3,
      map: map,
      title: 'Lab. Teknik Sipil',
      icon: I_Lab_Sipi3

  });

  Lab_Sipi3.setMap(map);
  google.maps.event.addListener(Lab_Sipi3, 'click', Lab_Sipi3f);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_Sipi3f(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Sipil</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_Sipi3

// Gedung mesin1
  var mesin1;
  var I_mesin1 = 'assets/img/mapicon/office-building.png';
  var latlng_mesin1 = new google.maps.LatLng(-7.770046,110.387342);
  
  mesin1 = new google.maps.Marker({
      position: latlng_mesin1,
      map: map,
      title: 'Gedung Teknik Mesin',
      icon: I_mesin1

  });

  mesin1.setMap(map);
  google.maps.event.addListener(mesin1, 'click', mesin1f);
  infowindow = new google.maps.InfoWindow();
  
  function mesin1f(event) {
  var keterangan = "<center><h7><b>Gedung Teknik Mesin</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai mesin1


// Gedung otomotif
  var otomotif;
  var I_otomotif = 'assets/img/mapicon/office-building.png';
  var latlng_otomotif = new google.maps.LatLng(-7.770431,110.387484);
  
  otomotif = new google.maps.Marker({
      position: latlng_otomotif,
      map: map,
      title: 'Gedung Teknik Otomotif',
      icon: I_otomotif

  });

  otomotif.setMap(map);
  google.maps.event.addListener(otomotif, 'click', otomotiff);
  infowindow = new google.maps.InfoWindow();
  
  function otomotiff(event) {
  var keterangan = "<center><h7><b>Gedung Teknik Otomotif</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai otomotif

// Gedung Lab_Oto
  var Lab_Oto;
  var I_Lab_Oto = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_Oto = new google.maps.LatLng(-7.770309,110.387919);
  
  Lab_Oto = new google.maps.Marker({
      position: latlng_Lab_Oto,
      map: map,
      title: 'Lab. Teknik Otomotif',
      icon: I_Lab_Oto

  });

  Lab_Oto.setMap(map);
  google.maps.event.addListener(Lab_Oto, 'click', Lab_Otof);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_Otof(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Otomotif</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_Oto

// Gedung Lab_mesin
  var Lab_mesin;
  var I_Lab_mesin = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_mesin = new google.maps.LatLng(-7.770538,110.387844);
  
  Lab_mesin = new google.maps.Marker({
      position: latlng_Lab_mesin,
      map: map,
      title: 'Lab. Teknik Mesin',
      icon: I_Lab_mesin

  });

  Lab_mesin.setMap(map);
  google.maps.event.addListener(Lab_mesin, 'click', Lab_mesinf);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_mesinf(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Mesin</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_mesin

// Gedung Lab_elko
  var Lab_elko;
  var I_Lab_elko = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_elko = new google.maps.LatLng(-7.770795,110.387771);
  
  Lab_elko = new google.maps.Marker({
      position: latlng_Lab_elko,
      map: map,
      title: 'Lab. Teknik Elektro',
      icon: I_Lab_elko

  });

  Lab_elko.setMap(map);
  google.maps.event.addListener(Lab_elko, 'click', Lab_elkof);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_elkof(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Elektro</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_elko

// Gedung Lab_elka
  var Lab_elka;
  var I_Lab_elka = 'assets/img/mapicon/office-building.png';
  var latlng_Lab_elka = new google.maps.LatLng(-7.771,110.387712);
  
  Lab_elka = new google.maps.Marker({
      position: latlng_Lab_elka,
      map: map,
      title: 'Lab. Teknik Elektronika',
      icon: I_Lab_elka

  });

  Lab_elka.setMap(map);
  google.maps.event.addListener(Lab_elka, 'click', Lab_elkaf);
  infowindow = new google.maps.InfoWindow();
  
  function Lab_elkaf(event) {
  var keterangan = "<center><h7><b>Lab. Teknik Elektronika</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Lab_elka

// Gedung Kantin_dlm
  var Kantin_dlm;
  var I_Kantin_dlm = 'assets/img/mapicon/fastfood.png';
  var latlng_Kantin_dlm = new google.maps.LatLng(-7.771186,110.387565);
  
  Kantin_dlm = new google.maps.Marker({
      position: latlng_Kantin_dlm,
      map: map,
      title: 'Gedung Kantin Dalam',
      icon: I_Kantin_dlm

  });

  Kantin_dlm.setMap(map);
  google.maps.event.addListener(Kantin_dlm, 'click', Kantin_dlmf);
  infowindow = new google.maps.InfoWindow();
  
  function Kantin_dlmf(event) {
  var keterangan = "<center><h7><b>Kantin Dalam</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Kantin_dlm

// Gedung mushola_dlm
  var mushola_dlm;
  var I_mushola_dlm = 'assets/img/mapicon/mosquee.png';
  var latlng_mushola_dlm = new google.maps.LatLng(-7.771292,110.387559);
  
  mushola_dlm = new google.maps.Marker({
      position: latlng_mushola_dlm,
      map: map,
      title: 'Gedung Mushola FT',
      icon: I_mushola_dlm

  });

  mushola_dlm.setMap(map);
  google.maps.event.addListener(mushola_dlm, 'click', mushola_dlmf);
  infowindow = new google.maps.InfoWindow();
  
  function mushola_dlmf(event) {
  var keterangan = "<center><h7><b>Mushola FT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai mushola_dlm

// Gedung Elkako1
  var Elkako1;
  var I_Elkako1 = 'assets/img/mapicon/office-building.png';
  var latlng_Elkako1 = new google.maps.LatLng(-7.77074,110.387211);
  
  Elkako1 = new google.maps.Marker({
      position: latlng_Elkako1,
      map: map,
      title: 'Gedung Elektronika dan Elektro',
      icon: I_Elkako1

  });

  Elkako1.setMap(map);
  google.maps.event.addListener(Elkako1, 'click', Elkako1f);
  infowindow = new google.maps.InfoWindow();
  
  function Elkako1f(event) {
  var keterangan = "<center><h7><b>Gedung Elektronika dan Elektro</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Elkako1

// Gedung Elkako2
  var Elkako2;
  var I_Elkako2 = 'assets/img/mapicon/office-building.png';
  var latlng_Elkako2 = new google.maps.LatLng(-7.77108,110.387157);
  
  Elkako2 = new google.maps.Marker({
      position: latlng_Elkako2,
      map: map,
      title: 'Gedung Elektronika dan Elektro',
      icon: I_Elkako2

  });

  Elkako2.setMap(map);
  google.maps.event.addListener(Elkako2, 'click', Elkako2f);
  infowindow = new google.maps.InfoWindow();
  
  function Elkako2f(event) {
  var keterangan = "<center><h7><b>Gedung Elektronika dan Elektro</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Elkako2


// Gedung Media
  var Media;
  var I_Media = 'assets/img/mapicon/office-building.png';
  var latlng_Media = new google.maps.LatLng(-7.77151,110.387428);
  
  Media = new google.maps.Marker({
      position: latlng_Media,
      map: map,
      title: 'Gedung Media',
      icon: I_Media

  });

  Media.setMap(map);
  google.maps.event.addListener(Media, 'click', Mediaf);
  infowindow = new google.maps.InfoWindow();
  
  function Mediaf(event) {
  var keterangan = "<center><h7><b>Gedung Media</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Media

// Gedung AulaTeather
  var AulaTeather;
  var I_AulaTeather = 'assets/img/mapicon/conference.png';
  var latlng_AulaTeather = new google.maps.LatLng(-7.771771,110.387229);
  
  AulaTeather = new google.maps.Marker({
      position: latlng_AulaTeather,
      map: map,
      title: 'Gedung Aula Teather',
      icon: I_AulaTeather

  });

  AulaTeather.setMap(map);
  google.maps.event.addListener(AulaTeather, 'click', AulaTeatherf);
  infowindow = new google.maps.InfoWindow();
  
  function AulaTeatherf(event) {
  var keterangan = "<center><h7><b>Gedung Aula Teather</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai AulaTeather

// Gedung RF
  var RF;
  var I_RF = 'assets/img/mapicon/office-building.png';
  var latlng_RF = new google.maps.LatLng(-7.771308,110.386851);
  
  RF = new google.maps.Marker({
      position: latlng_RF,
      map: map,
      title: 'Gedung RF',
      icon: I_RF

  });

  RF.setMap(map);
  google.maps.event.addListener(RF, 'click', RFf);
  infowindow = new google.maps.InfoWindow();
  
  function RFf(event) {
  var keterangan = "<center><h7><b>Gedung RF</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai RF


// Gedung LPTK
  var LPTK;
  var I_LPTK = 'assets/img/mapicon/office-building.png';
  var latlng_LPTK = new google.maps.LatLng(-7.771447,110.3868);
  
  LPTK = new google.maps.Marker({
      position: latlng_LPTK,
      map: map,
      title: 'Gedung LPTK',
      icon: I_LPTK

  });

  LPTK.setMap(map);
  google.maps.event.addListener(LPTK, 'click', LPTKf);
  infowindow = new google.maps.InfoWindow();
  
  function LPTKf(event) {
  var keterangan = "<center><h7><b>Gedung LPTK</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai LPTK

// Gedung Tmn_media
  var Tmn_media;
  var I_Tmn_media = 'assets/img/mapicon/forest.png';
  var latlng_Tmn_media = new google.maps.LatLng(-7.771436,110.38716);
  
  Tmn_media = new google.maps.Marker({
      position: latlng_Tmn_media,
      map: map,
      title: 'Gedung Taman Media',
      icon: I_Tmn_media

  });

  Tmn_media.setMap(map);
  google.maps.event.addListener(Tmn_media, 'click', Tmn_mediaf);
  infowindow = new google.maps.InfoWindow();
  
  function Tmn_mediaf(event) {
  var keterangan = "<center><h7><b>Taman Media</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai Tmn_media

// Gedung medianet
  var medianet;
  var I_medianet = 'assets/img/mapicon/office-building.png';
  var latlng_medianet = new google.maps.LatLng(-7.771835,110.3875);
  
  medianet = new google.maps.Marker({
      position: latlng_medianet,
      map: map,
      title: 'Gedung Medianet',
      icon: I_medianet

  });

  medianet.setMap(map);
  google.maps.event.addListener(medianet, 'click', medianetf);
  infowindow = new google.maps.InfoWindow();
  
  function medianetf(event) {
  var keterangan = "<center><h7><b>Medianet</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai medianet

// Gedung gudang
  var gudang;
  var I_gudang = 'assets/img/mapicon/ne_barn-2.png';
  var latlng_gudang = new google.maps.LatLng(-7.771436,110.387747);
  
  gudang = new google.maps.Marker({
      position: latlng_gudang,
      map: map,
      title: 'Gedung gudang',
      icon: I_gudang

  });

  gudang.setMap(map);
  google.maps.event.addListener(gudang, 'click', gudangf);
  infowindow = new google.maps.InfoWindow();
  
  function gudangf(event) {
  var keterangan = "<center><h7><b>Gudang</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
} //<--- Selesai gudang

// Gedung UKM
  var UKM;
  var I_UKM = 'assets/img/mapicon/office-building.png';
  var latlng_UKM = new google.maps.LatLng(-7.771871,110.386709);
  
  UKM = new google.maps.Marker({
      position: latlng_UKM,
      map: map,
      title: 'Gedung UKM FT',
      icon: I_UKM

  });

  UKM.setMap(map);
  google.maps.event.addListener(UKM, 'click', UKMf);
  infowindow = new google.maps.InfoWindow();
  
  function UKMf(event) {
  var keterangan = "<center><h7><b>UKM FT</b></h7>\n\
                     <br><img src='assets/img/gedung/KPLTs.png'\n\
                     style='height:100%;width:100%;'/></center>";
  infowindow.setContent(keterangan);
  infowindow.setPosition(event.latLng);
  infowindow.open(map);
  } //<--- Selesai UKM

}

//google.maps.event.addDomListener(window, 'load', initialize);