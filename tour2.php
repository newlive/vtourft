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

  <div class="row">
        <?php include "_/components/php/footer.php"; ?>
  </div><!-- content -->
</div>
<!-- end template -->

  <!-- script references -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
    <script src="_/js/bootstrap.min.js"></script>
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&extension=.js&output=embed"></script>
    <script src="_/js/myscript.js"></script>
    <script src="_/js/peta2.js"></script>

    <script type="text/javascript">
                
/**
 * makeMarker() ver 0.2
 * creates Marker and InfoWindow on a Map() named 'map'
 * creates sidebar row in a DIV 'sidebar'
 * saves marker to markerArray and markerBounds
 * @param options object for Marker, InfoWindow and SidebarItem
 * @author Esa 2009
 */
var infoWindow = new google.maps.InfoWindow();
var markerBounds = new google.maps.LatLngBounds();
var markerArray = [];
 
function makeMarker(options){
  var pushPin = new google.maps.Marker({map:map});
  pushPin.setOptions(options);
  google.maps.event.addListener(pushPin, "click", function(){
    infoWindow.setOptions(options);
    infoWindow.open(map, pushPin);
    if(this.sidebarButton)this.sidebarButton.button.focus();
  });
  var idleIcon = pushPin.getIcon();
  if(options.sidebarItem){
    pushPin.sidebarButton = new SidebarItem(pushPin, options);
    pushPin.sidebarButton.addIn("sidebar");
  }
  markerBounds.extend(options.position);
  markerArray.push(pushPin);
  return pushPin;
}

google.maps.event.addListener(map, "click", function(){
  infoWindow.close();
});


/**
 * Creates a sidebar item 
 * @constructor
 * @author Esa 2009
 * @param marker
 * @param options object Supported properties: sidebarItem, sidebarItemClassName, sidebarItemWidth,
 */
function SidebarItem(marker, opts){
  var tag = opts.sidebarItemType || "button";
  var row = document.createElement(tag);
  row.innerHTML = opts.sidebarItem;
  row.className = opts.sidebarItemClassName || "sidebar_item";  
  row.style.display = "block";
  row.style.width = opts.sidebarItemWidth || "120px";
  row.onclick = function(){
    google.maps.event.trigger(marker, 'click');
  }
  row.onmouseover = function(){
    google.maps.event.trigger(marker, 'mouseover');
  }
  row.onmouseout = function(){
    google.maps.event.trigger(marker, 'mouseout');
  }
  this.button = row;
}
// adds a sidebar item to a 
SidebarItem.prototype.addIn = function(block){ if(block && block.nodeType == 1)this.div = block; else this.div = document.getElementById(block) || document.getElementById("sidebar") || document.getElementsByTagName("body")[0]; this.div.appendChild(this.button); } // deletes a sidebar item SidebarItem.prototype.remove = function(){ if(!this.div) return false; this.div.removeChild(this.button); return true; } 
    
  </script>

  </body>
</html>