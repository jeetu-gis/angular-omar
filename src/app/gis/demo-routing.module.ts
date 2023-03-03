import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { BicycleRoutesTableComponent } from './bicycle-routes-table/bicycle-routes-table.component';
import { HighwayFreightNetworkTableComponent } from './highway-freight-network-table/highway-freight-network-table.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'bicycle-routes-table', component: BicycleRoutesTableComponent },
  { path: 'highway-freight-network-table', component: HighwayFreightNetworkTableComponent },
  { path: '**', redirectTo: 'map' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
