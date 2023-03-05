import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BicycleRoutesTableComponent } from './bicycle-routes-table/bicycle-routes-table.component';
import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MapComponent } from './map/map.component';
import { ReplaceUnderscorePipe } from '../shared/replace-underscore.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { GetKeyByValue } from '../shared/get-key-by-value.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule, DemoRoutingModule, LeafletModule],
  declarations: [
    BicycleRoutesTableComponent,
    MapComponent,
    ReplaceUnderscorePipe,
    GetKeyByValue,
  ],
})
export class DemoModule {}
