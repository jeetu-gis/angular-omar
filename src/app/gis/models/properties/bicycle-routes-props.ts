import { Maintenance } from '../enums/maintenance';
import { Status } from '../enums/status';

export interface BicycleRoutesProps {
  objectId: number;
  label: string;
  route: string;
  roadSpeed: number;
  segId: string;
  maintenance: Maintenance;
  status: Status;
  shapeLength: number;
}
