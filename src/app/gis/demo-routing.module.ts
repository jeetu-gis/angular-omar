import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { BicycleRoutesTableComponent } from './bicycle-routes-table/bicycle-routes-table.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'bicycle-routes-table', component: BicycleRoutesTableComponent },
  { path: '**', redirectTo: 'map' },
  { path: '', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
