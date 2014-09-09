<!DOCTYPE html>
<html>
  <head>
    <title>Virtual Tour FT UNY -- Virtual Tour</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href='http://fonts.googleapis.com/css?family=Bree+Serif|Merriweather:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
<!--     <link href="_/css/bootstrap.min.css" rel="stylesheet">
 -->    <link href="_/css/bootstrap.css" rel="stylesheet">
    <link href="_/css/mystyles.css" rel="stylesheet" media="screen">
  </head>
      
  <body id="tour">

		<section class="container">
      <div class="content row">
        <?php include "_/components/php/header.php"; ?>
      </div><!-- content -->

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
      
      <div class="content row">
        <?php include "_/components/php/footer.php"; ?>
      </div><!-- content -->
    </section><!-- container -->

    <script src="_/js/bootstrap.js"></script>
    <script src="_/js/bootstrap.min.js"></script>
    <script src="_/js/myscript.js"></script>

    
    


  </body>
</html>
