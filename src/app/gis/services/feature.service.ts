import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { BicycleRoutesProps } from '../models/properties/bicycle-routes-props';
import { HighwayFreightNetworkProps } from '../models/properties/highway-freight-network-props';
import { BicycleRoutesFeature } from '../models/features/bicycle-routes-feature';
import { HighwayFreightNetworkFeature } from '../models/features/highway-freight-network-feature';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private bicycleRoutesUrl = 'assets/Bicycle_Routes.geojson';
  private highwayFreightNetworkUrl =
    'assets/National_Highway_Freight_Network.geojson';

  bicycleRoutesProps$ = this.http.get<BicycleRoutesProps[]>(
    this.bicycleRoutesUrl
  );

  highwayFreightNetworkProps$ = this.http.get<HighwayFreightNetworkProps[]>(
    this.highwayFreightNetworkUrl
  );

  bicycleRoutesFeature$ = this.http.get<BicycleRoutesFeature[]>(
    this.bicycleRoutesUrl
  );

  highwayFreightNetworkFeature$ = this.http.get<HighwayFreightNetworkFeature[]>(
    this.highwayFreightNetworkUrl
  );

  constructor(private http: HttpClient) {}

  getBicycleRoutesProps(): Observable<BicycleRoutesProps[]> {
    return this.bicycleRoutesProps$;
  }

  getHighwayNetworkProps(): Observable<HighwayFreightNetworkProps[]> {
    return this.highwayFreightNetworkProps$;
  }

  getBicycleRoutesAndHighwayNetworkFeatures(): Observable<
    [BicycleRoutesFeature[], HighwayFreightNetworkFeature[]]
  > {
    return combineLatest([
      this.bicycleRoutesFeature$,
      this.highwayFreightNetworkFeature$,
    ]);
  }
}
