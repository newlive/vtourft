var map, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [], wilayahSearch = [], gd01Search = [], gd02Search = [], gd03Search = [], gd04Search = [], gd05Search = [], gd06Search = [], gd07Search = [], gd08Search = [], gd09Search = [], gd10Search = [], gd11Search = []; //Edit 1

$(document).on("click", ".feature-row", function(e) {
  sidebarClick(parseInt($(this).attr('id')));
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  return false;
});

$("#full-extent-btn").click(function() {
  map.fitBounds(boroughs.getBounds());
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  return false;
});

$("#list-btn").click(function() {
  $('#sidebar').toggle();
  map.invalidateSize();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  $("#sidebar").toggle();
  map.invalidateSize();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  $('#sidebar').hide();
  map.invalidateSize();
});

function sidebarClick(id) {
  map.addLayer(theaterLayer).addLayer(museumLayer);
  var layer = markerClusters.getLayer(id);
  markerClusters.zoomToShowLayer(layer, function() {
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 19);
    layer.fire("click");
  });
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 7904) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}

/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
// var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
//   maxZoom: 18,
//   subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
//   attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
// });
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

/* Overlay Layers */
var highlight = L.geoJson(null);

var boroughs = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    boroughSearch.push({
      name: layer.feature.properties.BoroName,
      source: "Boroughs",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("data/boroughs.geojson", function (data) {
  boroughs.addData(data);
});

var wilayah = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    wilayahSearch.push({
      name: layer.feature.properties.BoroName,
      source: "wilayah",
      id: L.stamp(layer),
      bounds: layer.getBounds()
    });
  }
});
$.getJSON("data/wilayah.geojson", function (data) {
  wilayah.addData(data);
});

/* subway*/
var subwayLines = L.geoJson(null, {
  style: function (feature) {
    if (feature.properties.route_id === "1" || feature.properties.route_id === "2" || feature.properties.route_id === "3") {
      return {
        color: "#ff3135",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "4" || feature.properties.route_id === "5" || feature.properties.route_id === "6") {
      return {
        color: "#009b2e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "7") {
      return {
        color: "#ce06cb",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "A" || feature.properties.route_id === "C" || feature.properties.route_id === "E" || feature.properties.route_id === "SI" || feature.properties.route_id === "H") {
      return {
        color: "#fd9a00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "Air") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "B" || feature.properties.route_id === "D" || feature.properties.route_id === "F" || feature.properties.route_id === "M") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "G") {
      return {
        color: "#9ace00",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "FS" || feature.properties.route_id === "GS") {
      return {
        color: "#6e6e6e",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "J" || feature.properties.route_id === "Z") {
      return {
        color: "#976900",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "L") {
      return {
        color: "#969696",
        weight: 3,
        opacity: 1
      };
    }
    if (feature.properties.route_id === "N" || feature.properties.route_id === "Q" || feature.properties.route_id === "R") {
      return {
        color: "#ffff00",
        weight: 3,
        opacity: 1
      };
    }
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Division</th><td>" + feature.properties.Division + "</td></tr>" + "<tr><th>Line</th><td>" + feature.properties.Line + "</td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Line);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([e.latlng.lat, e.latlng.lng], {
            stroke: false,
            fillColor: "#00FFFF",
            fillOpacity: 0.7,
            radius: 10
          }));
        }
      });
    }
    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {
        subwayLines.resetStyle(e.target);
      }
    });
  }
});
$.getJSON("data/subways.geojson", function (data) {
  subwayLines.addData(data);
});

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 19
});

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var theaterLayer = L.geoJson(null);
var theaters = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/theater.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
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
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/theater.png"></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      theaterSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADDRESS1,
        source: "Theaters",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/DOITT_THEATER_01_13SEPT2010.geojson", function (data) {
  theaters.addData(data);
  map.addLayer(theaterLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var museumLayer = L.geoJson(null);
var museums = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "assets/img/museum.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NAME,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NAME);
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
      $("#feature-list tbody").append('<tr class="feature-row" id="'+L.stamp(layer)+'"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">'+layer.feature.properties.NAME+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      museumSearch.push({
        name: layer.feature.properties.NAME,
        address: layer.feature.properties.ADRESS1,
        source: "Museums",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/DOITT_MUSEUM_01_13SEPT2010.geojson", function (data) {
  museums.addData(data);
});


/* layer Gedung 01 LPTK */
var gdg01Layer = L.geoJson(null);
var gdg1 = L.geoJson(null, {
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
      gd01Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "Gdg1",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_1_LPTK.geojson", function (data) {
  gdg1.addData(data);
});

/* layer gdg2 Media */
var gdg02Layer = L.geoJson(null);
var gdg2 = L.geoJson(null, {
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
      gd02Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg2",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_2_Media.geojson", function (data) {
  gdg2.addData(data);
});

/* layer gdg3  */
var gdg03Layer = L.geoJson(null);
var gdg3 = L.geoJson(null, {
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
      gd03Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg3",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_3_AulaTe.geojson", function (data) {
  gdg3.addData(data);
});

/* layer gdg5  */
var gdg04Layer = L.geoJson(null);
var gdg4 = L.geoJson(null, {
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
      gd04Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg4",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_4_Elkoka.geojson", function (data) {
  gdg4.addData(data);
});

/* layer gdg5  */
var gdg05Layer = L.geoJson(null);
var gdg5 = L.geoJson(null, {
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
      gd05Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg5",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_5_mesoto.geojson", function (data) {
  gdg5.addData(data);
});

/* layer gdg6  */
var gdg06Layer = L.geoJson(null);
var gdg6 = L.geoJson(null, {
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
      gd06Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg6",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_6_sipil.geojson", function (data) {
  gdg6.addData(data);
});

/* layer gdg7  */
var gdg07Layer = L.geoJson(null);
var gdg7 = L.geoJson(null, {
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
      gd07Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg7",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_7_PTBB.geojson", function (data) {
  gdg7.addData(data);
});

/* layer gdg8  */
var gdg08Layer = L.geoJson(null);
var gdg8 = L.geoJson(null, {
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
      gd08Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg8",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_8_lain.geojson", function (data) {
  gdg8.addData(data);
});

/* layer gdg9  */
var gdg09Layer = L.geoJson(null);
var gdg9 = L.geoJson(null, {
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
      gd09Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "gdg9",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_9_KPLT.geojson", function (data) {
  gdg9.addData(data);
});

/* layer gdg10  */
var gdg10Layer = L.geoJson(null);
var gdg10 = L.geoJson(null, {
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
      gd10Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "Gdg10",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_10_RF.geojson", function (data) {
  gdg10.addData(data);
});

/* layer gdg11  */
var gdg11Layer = L.geoJson(null);
var gdg11 = L.geoJson(null, {
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
      gd11Search.push({
        nama: layer.feature.properties.nama_gdg,
        jumlah: layer.feature.properties.jum_lantai,
        source: "Gdg11",
        id: L.stamp(layer),
        lat: layer.feature.geometry.coordinates[1],
        lng: layer.feature.geometry.coordinates[0]
      });
    }
  }
});
$.getJSON("data/gd_11_PKM.geojson", function (data) {
  gdg11.addData(data);
});

/*Map first location*/
map = L.map("map", {
  zoom: 22,
  center: [110.38771748542786, -7.7701163827156625],
  layers: [mapquestOSM, wilayah, markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer edit1 */
map.on("overlayadd", function(e) {
  if (e.layer === theaterLayer) {
    markerClusters.addLayer(theaters);
  }
  if (e.layer === museumLayer) {
    markerClusters.addLayer(museums);
  }
  if (e.layer === gdg01Layer) {
    markerClusters.addLayer(gdg1);
  }
  if (e.layer === gdg02Layer) {
    markerClusters.addLayer(gdg2);
  }
  if (e.layer === gdg03Layer) {
    markerClusters.addLayer(gdg3);
  }
  if (e.layer === gdg04Layer) {
    markerClusters.addLayer(gdg4);
  }
  if (e.layer === gdg05Layer) {
    markerClusters.addLayer(gdg5);
  }
  if (e.layer === gdg06Layer) {
    markerClusters.addLayer(gdg6);
  }
  if (e.layer === gdg07Layer) {
    markerClusters.addLayer(gdg7);
  }
  if (e.layer === gdg08Layer) {
    markerClusters.addLayer(gdg8);
  }
  if (e.layer === gdg09Layer) {
    markerClusters.addLayer(gdg9);
  }
  if (e.layer === gdg10Layer) {
    markerClusters.addLayer(gdg10);
  }
  if (e.layer === gdg11Layer) {
    markerClusters.addLayer(gdg11);
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === theaterLayer) {
    markerClusters.removeLayer(theaters);
  }
  if (e.layer === museumLayer) {
    markerClusters.removeLayer(museums);
  }
  if (e.layer === gdg01Layer) {
    markerClusters.removeLayer(gdg1);
  }
  if (e.layer === gdg02Layer) {
    markerClusters.removeLayer(gdg2);
  }
  if (e.layer === gdg03Layer) {
    markerClusters.removeLayer(gdg3);
  }
  if (e.layer === gdg04Layer) {
    markerClusters.removeLayer(gdg4);
  }
  if (e.layer === gdg05Layer) {
    markerClusters.removeLayer(gdg5);
  }
  if (e.layer === gdg06Layer) {
    markerClusters.removeLayer(gdg6);
  }
  if (e.layer === gdg07Layer) {
    markerClusters.removeLayer(gdg7);
  }
  if (e.layer === gdg08Layer) {
    markerClusters.removeLayer(gdg8);
  }
  if (e.layer === gdg09Layer) {
    markerClusters.removeLayer(gdg9);
  }
  if (e.layer === gdg10Layer) {
    markerClusters.removeLayer(gdg10);
  }
  if (e.layer === gdg11Layer) {
    markerClusters.removeLayer(gdg11);
  }
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "";
  return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "Lokasi Saya",
    popup: "Anda Berada di {distance} {unit} dari titik lokasi",
    outsideMapBoundsMsg: "Sepertinya anda berada di luar peta"
  },
  locateOptions: {
    maxZoom: 22,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseLayers = {
  // "Street Map": mapquestOSM,
  // "Aerial Imagery": mapquestOAM,
  // "Imagery with Streets": mapquestHYB
};

var groupedOverlays = {
  "Daftar Gedung ": {
    "<img src='assets/img/theater.png' width='24' height='28'>&nbsp;Teather": theaterLayer,
    "<img src='assets/img/museum.png' width='24' height='28'>&nbsp;Gedung Aula Teather": museumLayer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung LPTK": gdg01Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Media": gdg02Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Aula Teather": gdg03Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Jurusan Elektro/Elektronika": gdg04Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Jurusan Mesin/Otomotif": gdg05Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Sipil dan Perencanaan": gdg06Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung PTBB": gdg07Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Lain-lain": gdg08Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung KPLT": gdg09Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung RF": gdg10Layer,
    "<img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung PKM": gdg11Layer

  },
  "Wilayah": {
    // "Boroughs": boroughs,
    // "Subway Lines": subwayLines,
    "Wilayah":wilayah
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  $("#loading").hide();
  /* Fit map to boroughs bounds */
  map.fitBounds(wilayah.getBounds());
  featureList = new List("features", {valueNames: ["feature-name"]});
  featureList.sort("feature-name", {order:"asc"});

  var boroughsBH = new Bloodhound({
    name: "Boroughs",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: boroughSearch,
    limit: 10
  });

  var theatersBH = new Bloodhound({
    name: "Theaters",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: theaterSearch,
    limit: 10
  });

  var museumsBH = new Bloodhound({
    name: "Museums",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: museumSearch,
    limit: 10
  });

  var gdg1BH = new Bloodhound({
    name: "Gdg1",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd01Search,
    limit: 10
  });

  var gdg2BH = new Bloodhound({
    name: "Gdg2",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd02Search,
    limit: 10
  });

  var gdg3BH = new Bloodhound({
    name: "Gdg3",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd03Search,
    limit: 10
  });

var gdg4BH = new Bloodhound({
    name: "Gdg4",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd04Search,
    limit: 10
  });

var gdg5BH = new Bloodhound({
    name: "Gdg5",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd05Search,
    limit: 10
  });

var gdg6BH = new Bloodhound({
    name: "Gdg6",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd06Search,
    limit: 10
  });

var gdg7BH = new Bloodhound({
    name: "Gdg7",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd07Search,
    limit: 10
  });

var gdg8BH = new Bloodhound({
    name: "Gdg8",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd08Search,
    limit: 10
  });

var gdg9BH = new Bloodhound({
    name: "Gdg9",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd09Search,
    limit: 10
  });

var gdg10BH = new Bloodhound({
    name: "Gdg10",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd10Search,
    limit: 10
  });

var gdg11BH = new Bloodhound({
    name: "Gdg11",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.nama);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: gd11Search,
    limit: 10
  });

  var geonamesBH = new Bloodhound({
    name: "GeoNames",
    datumTokenizer: function (d) {
      return Bloodhound.tokenizers.whitespace(d.name);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
      url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
      filter: function (data) {
        return $.map(data.geonames, function (result) {
          return {
            name: result.name + ", " + result.adminCode1,
            lat: result.lat,
            lng: result.lng,
            source: "GeoNames"
          };
        });
      },
      ajax: {
        beforeSend: function (jqXhr, settings) {
          settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
          $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
        },
        complete: function (jqXHR, status) {
          $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
        }
      }
    },
    limit: 10
  });
  boroughsBH.initialize();
  theatersBH.initialize();
  museumsBH.initialize();
  geonamesBH.initialize();
  gdg1BH.initialize();
  gdg2BH.initialize();
  gdg3BH.initialize();
  gdg4BH.initialize();
  gdg5BH.initialize();
  gdg6BH.initialize();
  gdg7BH.initialize();
  gdg8BH.initialize();
  gdg9BH.initialize();
  gdg10BH.initialize();
  gdg11BH.initialize();

  /* instantiate the typeahead UI */
  $("#searchbox").typeahead({
    minLength: 3,
    highlight: true,
    hint: false
  }, {
    name: "Boroughs",
    displayKey: "name",
    source: boroughsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'>Boroughs</h4>"
    }
  }, {
    name: "Theaters",
    displayKey: "name",
    source: theatersBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/theater.png' width='24' height='28'>&nbsp;Theaters</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
    name: "Museums",
    displayKey: "name",
    source: museumsBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/museum.png' width='24' height='28'>&nbsp;Museums</h4>",
      suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
    }
  }, {
  name: "gdg1",
  displayKey: "nama_gdg",
  source: gdg1BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung LPTK</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg2",
  displayKey: "nama_gdg",
  source: gdg2BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Media</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg3",
  displayKey: "nama_gdg",
  source: gdg3BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Aula Teather</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg4",
  displayKey: "nama_gdg",
  source: gdg4BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Elektro/Elektronika</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg5",
  displayKey: "nama_gdg",
  source: gdg5BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Mesin/Otomotif</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg6",
  displayKey: "nama_gdg",
  source: gdg6BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Sipil dan Perencanaan</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg7",
  displayKey: "nama_gdg",
  source: gdg7BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung PTBB</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg8",
  displayKey: "nama_gdg",
  source: gdg8BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung Lain-lain</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg9",
  displayKey: "nama_gdg",
  source: gdg9BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung KPLT</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg10",
  displayKey: "nama_gdg",
  source: gdg10BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung RF</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
  name: "gdg11",
  displayKey: "nama_gdg",
  source: gdg11BH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/building.png' width='24' height='28'>&nbsp;Gedung PKM</h4>",
    suggestion: Handlebars.compile(["{{nama}}<br>&nbsp;<small>{{jumlah}}</small>"].join(""))
    }
  }, {
    name: "GeoNames",
    displayKey: "name",
    source: geonamesBH.ttAdapter(),
    templates: {
      header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
    }
  }).on("typeahead:selected", function (obj, datum) {
    if (datum.source === "Boroughs") {
      map.fitBounds(datum.bounds);
    }
    if (datum.source === "Theaters") {
      if (!map.hasLayer(theaterLayer)) {
        map.addLayer(theaterLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "Museums") {
      if (!map.hasLayer(museumLayer)) {
        map.addLayer(museumLayer);
      }
      map.setView([datum.lat, datum.lng], 17);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }

    if (datum.source === "gdg1") {
      if (!map.hasLayer(gdg01Layer)) {
        map.addLayer(gdg01Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg2") {
      if (!map.hasLayer(gdg02Layer)) {
        map.addLayer(gdg02Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg3") {
      if (!map.hasLayer(gdg03Layer)) {
        map.addLayer(gdg03Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg4") {
      if (!map.hasLayer(gdg04Layer)) {
        map.addLayer(gdg04Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg5") {
      if (!map.hasLayer(gdg05Layer)) {
        map.addLayer(gdg05Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg6") {
      if (!map.hasLayer(gdg06Layer)) {
        map.addLayer(gdg06Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg7") {
      if (!map.hasLayer(gdg07Layer)) {
        map.addLayer(gdg07Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg8") {
      if (!map.hasLayer(gdg08Layer)) {
        map.addLayer(gdg08Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg9") {
      if (!map.hasLayer(gdg09Layer)) {
        map.addLayer(gdg09Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg10") {
      if (!map.hasLayer(gdg10Layer)) {
        map.addLayer(gdg10Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "gdg11") {
      if (!map.hasLayer(gdg11Layer)) {
        map.addLayer(gdg11Layer);
      }
      map.setView([datum.lat, datum.lng], 19);
      if (map._layers[datum.id]) {
        map._layers[datum.id].fire("click");
      }
    }
    if (datum.source === "GeoNames") {
      map.setView([datum.lat, datum.lng], 14);
    }
    if ($(".navbar-collapse").height() > 50) {
      $(".navbar-collapse").collapse("hide");
    }
  }).on("typeahead:opened", function () {
    $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
    $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
  }).on("typeahead:closed", function () {
    $(".navbar-collapse.in").css("max-height", "");
    $(".navbar-collapse.in").css("height", "");
  });
  $(".twitter-typeahead").css("position", "static");
  $(".twitter-typeahead").css("display", "block");
});
