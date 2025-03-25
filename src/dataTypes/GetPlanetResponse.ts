import {PlanetDetails} from '../screens/Search/PlanetCard/PLanetCard';
import {Planet} from './Planet';

export interface GetPlanetResponse {
  count: number;
  next: string;
  previous: string;
  results: PlanetDetails[];
}
