import * as L from 'leaflet';
import { Component, OnInit } from '@angular/core';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: L.Map;
  featureBicycleRoutes: L.GeoJSON;
  featureHighwayFreightNetwork: L.GeoJSON;
  esriBaseMap = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
    {
      detectRetina: true,
      attribution: '',
    }
  );
  openStreetBaseMap = L.tileLayer(
    'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      detectRetina: true,
      attribution: '',
    }
  );
  options = {
    layers: [this.esriBaseMap],
    zoom: 11,
    center: L.latLng(38.85424655710402, -77.29905816128965),
    maxZoom: 18,
  };
  layersControl = {
    baseLayers: {
      'ESRI basemap': this.esriBaseMap,
      'Open Street basemap': this.openStreetBaseMap,
    },
    overlays: {
      'Bicycle Routes': new L.GeoJSON<any>(),
      'Highway Freight Network': new L.GeoJSON<any>(),
    },
  };

  constructor(private featureService: FeatureService) {}

  ngOnInit() {}

  onMapReady(map: L.Map) {
    this.map = map;

    this.featureService.getBicycleRoutesAndHighwayNetworkFeatures().subscribe({
      next: (json: any) =>
        ((this.featureBicycleRoutes = L.geoJSON(json[0], {
          onEachFeature(feature, layer) {
            return layer.bindPopup(`Status: ${feature.properties.status}`);
          },
          style: function () {
            return {
              weight: 1.6,
              opacity: 0.65,
              color: '#0080ff',
            };
          }.bind(this),
        }).addTo(map)),
        (this.featureHighwayFreightNetwork = L.geoJSON(json[1], {
          style: function () {
            return {
              weight: 2,
              opacity: 0.65,
              color: '#ff0040',
            };
          }.bind(this),
        }).addTo(map)),
        (this.layersControl = {
          baseLayers: {
            'ESRI basemap': this.esriBaseMap,
            'Open Street basemap': this.openStreetBaseMap,
          },
          overlays: {
            'Bicycle Routes': this.featureBicycleRoutes,
            'Highway Freight Network': this.featureHighwayFreightNetwork,
          },
        }),
        L.control.layers(
          this.layersControl.baseLayers,
          this.layersControl.overlays
        )).addTo(map),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
