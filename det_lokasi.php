<!DOCTYPE html>
<html>
  <head>
    <title>Virtual Tour FT UNY -- Detail Lokasi</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href='http://fonts.googleapis.com/css?family=Bree+Serif|Merriweather:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
    <link href="_/css/bootstrap.css" rel="stylesheet" media="screen">
    <!-- <link href="_/css/bootstrap.min.css" rel="stylesheet"> -->
    <!-- <link href="_/css/mystyles.css" rel="stylesheet" media="screen"> -->
  </head>
  <body id="detail">
      <div class="container">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>No Ruang</th>
                <th>Nama Ruang</th>
                <th>Luas(m2)</th>
                <th>Ukuran</th>
                <th>Kapasitas Orang</th>
                <th>White Board</th>
                <th>LCD</th>
                <th>Internet</th>
                <th>AC</th>
                <th>Kipas Angin</th>
              </tr>    
            </thead>
            
            <tbody>
              <?php 
                  mysql_connect("localhost", "root", "") or die(mysql_error());
                  mysql_select_db("vtourft") or die(mysql_error());
                  $result = mysql_query("SELECT * FROM ruang") or die(mysql_error());
                  while($row = mysql_fetch_array($result)) {
                    echo '<tr>';
                    echo '<td>'.$row['id_ruang'].'</td>';
                    echo '<td>'.$row['kode_ruang'].'</td>';
                    echo '<td>'.$row['nama_ruang'].'</td>';
                    echo '<td>'.$row['luas'].'</td>';
                    echo '<td>'.$row['ukuran'].'</td>';
                    echo '<td>'.$row['kapasitas'].'</td>';
                    echo '<td>'.$row['w_board'].'</td>';
                    echo '<td>'.$row['lcd'].'</td>';
                    echo '<td>'.$row['internet'].'</td>';
                    echo '<td>'.$row['ac'].'</td>';
                    echo '<td>'.$row['k_angin'].'</td>';
                    
                  }
              ?>
            </tr>
          </tbody>
        </table>
      </div> <!-- container -->


    <script src="_/js/bootstrap.js"></script>
    <script src="_/js/myscript.js"></script>
    
  </body>
</html>
