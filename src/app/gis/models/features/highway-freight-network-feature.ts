import { Geometry } from '../geographic/geometry';
import { HighwayFreightNetworkProps } from '../properties/highway-freight-network-props';

export interface HighwayFreightNetworkFeature {
  properties: HighwayFreightNetworkProps;
  geometry: Geometry;
}
