/* layer gdgx  */
var gdg0xLayer = L.geoJson(null);
var gdgx = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/building.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.nama_gdg,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nama</th><td>" + feature.properties.nama_gdg + "</td></tr>" + "<tr><th>Jumlah Lantai</th><td>" + feature.properties.jum_lantai + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.nama_gdg);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/building.png"></td><td class="feature-name">'+layer.feature.properties.nama_gdg+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      gd0xSearch.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdgx",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_x_a.geojson", function (data) {
  gdgx.addData(data);
});


gdg0x
gd_x_a
gdxSearch
gdgx

