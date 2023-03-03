import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StateNum } from '../models/enums/stateNum';
import { HighwayFreightNetworkProps } from '../models/properties/highway-freight-network-props';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'highway-freight-network-table',
  templateUrl: './highway-freight-network-table.component.html',
  styleUrls: ['./highway-freight-network-table.component.scss'],
})
export class HighwayFreightNetworkTableComponent
  implements OnInit, AfterViewInit
{
  @Input() highwayFreightNetworkPropsArray: HighwayFreightNetworkProps[] = [];
  displayedColumns: string[] = [
    'nhfn',
    'stateNum',
    'cityNum',
    'roadClass',
    'facilityT',
    'urbanCode',
    'nhs',
    'strahnet',
  ];
  dataSource: MatTableDataSource<HighwayFreightNetworkProps>;

  constructor(private featureService: FeatureService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.featureService.getHighwayNetworkProps().subscribe(
      (json: any) => {
        if (!!json.features) {
          for (let i = 0; i <= 60; i++) {
            const highwayFreightNetworkProps: HighwayFreightNetworkProps = {
              nhfn: json.features[i]['properties']['NHFN'],
              stateNum: json.features[i]['properties']['STATE_NUM'],
              cityNum: json.features[i]['properties']['CITY_NUM'],
              roadClass: json.features[i]['properties']['ROAD_CLASS'],
              facilityT: json.features[i]['properties']['FACILITY_T'],
              urbanCode: json.features[i]['properties']['URBAN_CODE'],
              nhs: json.features[i]['properties']['NHS'],
              strahnet: json.features[i]['properties']['STRAHNET'],
              shapeLength: json.features[i]['properties']['Shape__Length']
            };
            this.highwayFreightNetworkPropsArray.push(
              highwayFreightNetworkProps
            );
          }

          this.dataSource =
            new MatTableDataSource<HighwayFreightNetworkProps>(
              this.highwayFreightNetworkPropsArray
            );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit() {
    this.featureService.getHighwayNetworkProps().subscribe(
      (json: any) => {
        if (!!json.features) {
          for (let i = 61; i < json.features.length; i++) {
            const highwayFreightNetworkProps: HighwayFreightNetworkProps = {
              nhfn: json.features[i]['properties']['NHFN'],
              stateNum: json.features[i]['properties']['STATE_NUM'],
              cityNum: json.features[i]['properties']['CITY_NUM'],
              roadClass: json.features[i]['properties']['ROAD_CLASS'],
              facilityT: json.features[i]['properties']['FACILITY_T'],
              urbanCode: json.features[i]['properties']['URBAN_CODE'],
              nhs: json.features[i]['properties']['NHS'],
              strahnet: json.features[i]['properties']['STRAHNET'],
              shapeLength: json.features[i]['properties']['Shape__Length']
            };
            this.highwayFreightNetworkPropsArray.push(
              highwayFreightNetworkProps
            );
          }
          this.dataSource =
            new MatTableDataSource<HighwayFreightNetworkProps>(
              this.highwayFreightNetworkPropsArray
            );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
