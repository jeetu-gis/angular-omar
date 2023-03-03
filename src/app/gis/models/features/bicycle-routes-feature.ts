import { BicycleRoutesProps } from '../properties/bicycle-routes-props';
import { Geometry } from '../geographic/geometry';

export interface BicycleRoutesFeature {
  properties: BicycleRoutesProps;
  geometry: Geometry;
}
