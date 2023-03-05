import * as L from 'leaflet';
import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FeatureService } from '../services/feature.service';
import { Status } from '../models/enums/status';
import { MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChildren(MatRadioGroup)
  radios?: QueryList<MatRadioGroup>;
  map: L.Map;
  featureBicycleRoutes: L.GeoJSON;
  featureBicycleRoutesFiltered: L.GeoJSON;
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
    zoom: 11.47,
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
  getScreenWidth: number;
  getScreenHeight: number;

  constructor(private featureService: FeatureService) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

    if(this.getScreenHeight > 794)
    {
      return "height: 45rem;";
    } else {
      return "height: 33rem;";
    }
  }

  onFilterChange(): void {
    const statusSelected = this.radios?.map((radio) => radio.value).join(',');

    if (statusSelected != 'CLEAR') {
      this.featureBicycleRoutes.remove();
      if (!!this.featureBicycleRoutesFiltered) {
        this.featureBicycleRoutesFiltered.remove();
      }
      this.featureService.getBicycleRoutes().subscribe({
        next: (json: any) =>
          (this.featureBicycleRoutesFiltered = L.geoJSON(json, {
            onEachFeature(feature, layer) {
              if (
                !!feature.properties['LABEL'] &&
                !!feature.properties['STATUS']
              ) {
                return layer.bindPopup(
                  `Label: ${feature.properties['LABEL'].toLowerCase()}</br>
                  Status: ${feature.properties['STATUS'].toLowerCase()}</br>
                  Road Speed: ${feature.properties['ROAD_SPEED']} mph`
                );
              } else {
                return layer.bindPopup(
                  `Label: not available</br>
                  \nStatus: ${feature.properties['STATUS'].toLowerCase()}</br>
                  \nRoad Speed: ${feature.properties['ROAD_SPEED']} mph`
                );
              }
            },
            style: function () {
              return {
                weight: 3.3,
                opacity: 0.9,
                color: '#67a9cf',
              };
            }.bind(this),
            filter: function (feature) {
              return feature.properties['STATUS'] === statusSelected;
            },
          }).addTo(this.map)),
        error: (err) => console.log(err),
        complete: () => console.log(statusSelected + ' filter applied'),
      });
    } else {
      if (!!this.featureBicycleRoutesFiltered) {
        this.featureBicycleRoutesFiltered.remove();
      }
      this.featureBicycleRoutes.addTo(this.map);
    }
  }

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.featureService.getBicycleRoutesAndHighwayNetworkFeatures().subscribe({
      next: (json: any) =>
        ((this.featureBicycleRoutes = L.geoJSON(json[0], {
          onEachFeature(feature, layer) {
            if (!!feature.properties['LABEL']) {
              return layer.bindPopup(
                `Label: ${feature.properties['LABEL'].toLowerCase()}</br>
                Status: ${feature.properties['STATUS'].toLowerCase()}</br>
                Road Speed: ${feature.properties['ROAD_SPEED']} mph`
              );
            } else {
              return layer.bindPopup(
                `Label: not available</br>
                \nStatus: ${feature.properties['STATUS'].toLowerCase()}</br>
                \nRoad Speed: ${feature.properties['ROAD_SPEED']} mph`
              );
            }
          },
          style: function () {
            return {
              weight: 3.3,
              opacity: 0.9,
              color: '#67a9cf',
            };
          }.bind(this),
        }).addTo(map)),
        map.panTo(this.featureBicycleRoutes.getBounds().getCenter()),
        (this.featureHighwayFreightNetwork = L.geoJSON(json[1], {
          style: function () {
            return {
              weight: 3.3,
              opacity: 0.9,
              color: '#ef8a62',
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
      complete: () =>
        console.log(
          'Bicycle Routes & Highway Freight Network features retrieved.'
        ),
    });
  }
}
