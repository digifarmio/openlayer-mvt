// Source:
// https://openlayers.org/en/latest/examples/mapbox-vector-tiles-advanced.html

import Map from "ol/Map";
import View from "ol/View";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import MVT from "ol/format/MVT";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import TileGrid from "ol/tilegrid/TileGrid";
import { get as getProjection } from "ol/proj";

var url =
  "https://api.digifarm.io/v1/delineated-fields/low-res/merc?token={token}&x={x}&y={y}&z={z}&ext=mvt&data_version=latest";

const resolutions = [];
for (let i = 0; i <= 9; ++i) {
  resolutions.push(156543.03392804097 / Math.pow(2, i * 2));
}
// Calculation of tile urls for zoom levels 1, 3, 5, 7, 9, 11, 13, 15, 18.
function tileUrlFunction(tileCoord) {
  return url
    .replace("{z}", String(tileCoord[0] * 2 - 1))
    .replace("{x}", String(tileCoord[1]))
    .replace("{y}", String(tileCoord[2]))
    .replace("{token}", process.env.token);
}

new Map({
  layers: [
    //comment below to hide a openstreetmap basemap
    new TileLayer({
      source: new OSM(),
    }),
    //
    new VectorTileLayer({
      source: new VectorTileSource({
        attributions: '© <a href="https://digifarm.io">Digifarm.io</a> ',
        format: new MVT(),
        tileGrid: new TileGrid({
          extent: getProjection("EPSG:3857").getExtent(),
          resolutions: resolutions,
          tileSize: 512,
        }),
        tileUrlFunction: tileUrlFunction,
      }),
    }),
  ],
  view: new View({
    center: [-26323.1, 6282152.4], // somewhere random in france
    zoom: 13,
  }),
  target: "map",
});
