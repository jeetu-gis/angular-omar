import { StateNum } from '../enums/stateNum';

export interface HighwayFreightNetworkProps {
  nhfn: string;
  stateNum: StateNum;
  cityNum: string;
  roadClass: string;
  facilityT: string;
  urbanCode: string;
  nhs: string;
  strahnet: string;
  shapeLength: number;
}
