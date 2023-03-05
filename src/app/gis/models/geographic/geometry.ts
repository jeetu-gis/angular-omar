import { Point } from 'leaflet';

export interface Geometry {
  type: string;
  coordinates: [[Point, Point], [Point, Point]];
}
