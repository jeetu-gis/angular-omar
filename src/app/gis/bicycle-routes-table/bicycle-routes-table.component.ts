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
import { BicycleRoutesProps } from '../models/properties/bicycle-routes-props';
import { FeatureService } from '../services/feature.service';

@Component({
  selector: 'app-bicycle-routes-table',
  templateUrl: './bicycle-routes-table.component.html',
  styleUrls: ['./bicycle-routes-table.component.scss'],
})
export class BicycleRoutesTableComponent implements OnInit, AfterViewInit {
  @Input() bicycleRoutesPropsArray: BicycleRoutesProps[] = [];
  displayedColumns: string[] = [
    'label',
    'route',
    'roadSpeed',
    'maintenance',
    'status',
  ];
  dataSource: MatTableDataSource<BicycleRoutesProps>;

  constructor(private featureService: FeatureService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.featureService.getBicycleRoutesProps().subscribe({
      next: (json: any) => {
        if (!!json.features) {
          for (let i = 0; i <= 60; i++) {
            const bicycleRoutesProps: BicycleRoutesProps = {
              objectId: json.features[i]['properties']['OBJECTID'],
              label: json.features[i]['properties']['LABEL'],
              route: json.features[i]['properties']['ROUTE'],
              roadSpeed: json.features[i]['properties']['ROAD_SPEED'],
              maintenance: json.features[i]['properties']['MAINTENANCE'],
              status: json.features[i]['properties']['STATUS'],
              shapeLength: json.features[i]['properties']['Shape__Length'],
            };
            this.bicycleRoutesPropsArray.push(bicycleRoutesProps);
          }
          this.dataSource = new MatTableDataSource<BicycleRoutesProps>(
            this.bicycleRoutesPropsArray
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          return;
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log('Initial record retrieval complete.'),
    });
  }

  ngAfterViewInit() {
    this.featureService.getBicycleRoutesProps().subscribe({
      next: (json: any) => {
        if (!!json.features) {
          for (let i = 61; i < json.features.length; i++) {
            const bicycleRoutesProps: BicycleRoutesProps = {
              objectId: json.features[i]['properties']['OBJECTID'],
              label: json.features[i]['properties']['LABEL'],
              route: json.features[i]['properties']['ROUTE'],
              roadSpeed: json.features[i]['properties']['ROAD_SPEED'],
              maintenance: json.features[i]['properties']['MAINTENANCE'],
              status: json.features[i]['properties']['STATUS'],
              shapeLength: json.features[i]['properties']['Shape__Length'],
            };
            this.bicycleRoutesPropsArray.push(bicycleRoutesProps);
          }
          this.dataSource = new MatTableDataSource<BicycleRoutesProps>(
            this.bicycleRoutesPropsArray
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          return;
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log('Final record retrieval complete.'),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
