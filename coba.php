<?php
function getlatlngstring($coordsArray, $splitonnewline)
{
$latlng = "";
$k = count($coordsArray);
for ($i = 0; $i < $k; $i++) {
$latlngArray = explode(",", $coordsArray[$i]);
if (count($latlngArray) == 3) {
$lat = $latlngArray[1];
$lng = $latlngArray[0];
$lat = str_replace("\r", "", $lat);
$lat = str_replace("\n", "", $lat);
$lng = str_replace("\r", "", $lng);
$lng = str_replace("\n", "", $lng);
$latlng = $latlng . "new google.maps.LatLng(" . $lat . "," . $lng . ")";
if ($splitonnewline == 1)
{
if ($i != $k - 2) $latlng = $latlng . ", ";
}
else
{
if ($i != $k - 1) $latlng = $latlng . ", ";
}
}
}
$latlng = "[".$latlng."]";
return $latlng;
}
$mine = array(
array("useful/sub/files/denmark.kml|55.912273,12.019043|6" => "Denmark"),
array("useful/sub/files/philippines.kml|11.566144,122.299805|5" => "Philippines"),
array("useful/sub/files/sightings.kml|39.249271, -119.179688|6" => "Sightings")
);
$address = "http://www.birdtheme.org/useful/sub/files/denmark.kml";
$center = "55.912273,12.019043";
$zoom = 6;
$inner = "";
$code = "";
$splitonnewline = 0;
if (isset($_REQUEST['mine'])) // find file to present on map
{
$code = $_REQUEST['mine'];
foreach ($mine as $a => $b)
{
foreach ($b as $key => $value)
{
if ($code == $value)
{
$split = explode("|",$key);
$address = "http://www.birdtheme.org/".$split[0];
$center = $split[1];
$zoom = $split[2];
continue;
}
}
}
}
$kmlfile = $address;
$l = 0;
$coordstring = "";
$found = 0;
$xml = simplexml_load_file($kmlfile) or die("url not loading");
$documentname = $xml->Document->name;
$docdescription = $xml->Document->description;
foreach($xml->Document->Placemark as $placemark) {
$placemarkname = $placemark->name;
$description = $placemark->description;
if ($coords = $placemark->Polygon->outerBoundaryIs->LinearRing->coordinates)
{
$linetype = "Polygon";
$found = 1;
if (count($coordsArray = explode("\n", $coords)) > 1)
{
$splitonnewline = 1;
}
else
{
$coordsArray = explode(" ", $coords); // split on space
}
$latlng = getlatlngstring($coordsArray, $splitonnewline); // function above
}
if ($found == 0) {
if ($coords = $placemark->LineString->coordinates)
{
$linetype = "LineString";
$found = 1;
if (count($coordsArray = explode("\n", $coords)) > 1)
$splitonnewline = 1;
}
else
{
$coordsArray = explode(" ", $coords); // split on space
}
$latlng = getlatlngstring($coordsArray, $splitonnewline); // function above
}
}
if ($found == 0) {
if ($coords = $placemark->Point->coordinates)
{
$linetype = "Point";
$pointArray = explode(",", $coords);
if (count($pointArray) == 2 || count($pointArray) == 3) {
$latlng = "new google.maps.LatLng(" . $pointArray[1] . "," . $pointArray[0] . ")";
}
}
if ($l > 0) $coordstring = $coordstring.","; // if more than 1 shape
$coordstring = $coordstring.$latlng; // to be used in js below
$overlayname[$l] = $placemarkname;
$descriptions[$l] = $description;
$overlayshape[$l] = $linetype;
$found = 0;
$latlng = "";
$splitonnewline = 0;
$l++; // to be used in js below
}
?>

<!-- // Paste these inside the javascript
// converting php variable to javascript variable
shapenumbers = <?php echo $l; ?>
// converting php arrays to javascript arrays -->



<?php
for ($i = 0; $i < $l; $i++) {
echo "<input type=\"radio\" name=\"poly\" value=".$i." onclick=\"selectedradiobutton(".$i.");\"/>\n";
echo " ".$overlayname[$i]."<br />\n";
if ($i == 24){
echo "</td><td id=\"extra\" valign=\"top\">\n";
}
}
echo "<input type=\"radio\" name=\"poly\" value=\"hide\" onclick=\"hideall();\"/> Hide all<br />\n";
echo "<input type=\"radio\" name=\"poly\" value=\"show\" onclick=\"showall();\"/> Show all\n";
?>