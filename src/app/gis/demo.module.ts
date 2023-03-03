import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BicycleRoutesTableComponent } from './bicycle-routes-table/bicycle-routes-table.component';
import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MapComponent } from './map/map.component';
import { ReplaceUnderscorePipe } from '../shared/replace-underscore.pipe';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HighwayFreightNetworkTableComponent } from './highway-freight-network-table/highway-freight-network-table.component';
import { GetKeyByValue } from '../shared/get-key-by-value.pipe';

@NgModule({
  imports: [CommonModule, MaterialModule, DemoRoutingModule, LeafletModule],
  declarations: [HighwayFreightNetworkTableComponent, BicycleRoutesTableComponent, MapComponent, ReplaceUnderscorePipe, GetKeyByValue],
})
export class DemoModule {}
