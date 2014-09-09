<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Lokasi</title>
    <meta name="generator" content="Bootply" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="_/css/bootstrap.css" rel="stylesheet" media="screen">

<!--    <link href="_/css/bootstrap.min.css" rel="stylesheet">
 -->    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="_/css/mystyles.css" rel="stylesheet">

    <style type="text/css">
    
      html,body{
      height:100%;
      }

      body{
          padding-top:50px; 
      }

      #footer {
          margin-top: 50px;
        } 
      #peta {
          position: absolute;
          right: 250px;
      }

    </style>

  </head>
  <body id="lokasi">

    <div id="header_peta" class="content row">
      <div class="col-lg-12">
        <header class="clearfix">
          <section class="navbar navbar-inverse">
            <ul class="nav navbar-nav">
              <li><a href="#">LOGO</a></li>
              <li><a href="index.php">Beranda</a></li>
              <li><a href="tour.php">Tour</a></li>
              <li><a href="lokasi.php">Lokasi</a></li>
              <li><a href="video.php">Video</a></li>
              <li><a href="tentang.php">Tentang</a></li>
              
            </ul>
          </section>

        </header>
      </div>
    </div> <!-- header -->

<div id="map-canvas"></div>

<div class="container-fluid" id="main">
    <div class="row">
      <div class="col-lg-4">
        <div id="gedunglist"class="list-group">
          <?php
              include "_/components/php/config.php";  
              $result = mysql_query("SELECT * FROM gedung") or die(mysql_error());
              while($row = mysql_fetch_array($result)) {
              echo '<a href="'.$row['id_gdg'].'" class="list-group-item">'.$row['nama_gdg'].'</a>';
              }
          ?>
        </div>
       </div>

      </div>
      <div id="peta" class="col-lg-8"><!--map-canvas will be postioned here--></div>
      
  </div> <!-- container -->

  
</div>
<!-- end template -->

  <!-- script references -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script src="_/js/bootstrap.min.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&extension=.js&output=embed"></script>
    <script src="_/js/myscript.js"></script>
    <script src="_/js/peta2.js"></script>

    <script type="text/javascript">
                $(document).ready(function () {
                    getMenu();
                });
                $(function() {
                    if(navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position){
                                initialize(position.coords.latitude,position.coords.longitudez);

                        },
                    function showError(error)
                    {
                    switch(error.code) 
                      {
                      case error.PERMISSION_DENIED:
                        alert("Anda membatalkan penggunaan GPS");
                        initialize(-7.769184,110.388106);
                        break;
                      case error.POSITION_UNAVAILABLE:
                        alert("Informasi posisi tidak tersedia");
                        initialize(-7.769184,110.388106);
                        break;
                      case error.TIMEOUT:
                        alert("GPS tidak merespon");
                        initialize(-7.769184,110.388106);
                        break;
                      case error.UNKNOWN_ERROR:
                        alert("Kesalahan sistem");
                        initialize(-7.769184,110.388106);
                        break;
                      }
                    });
                    } 
    });
    
  </script>

  </body>
</html>