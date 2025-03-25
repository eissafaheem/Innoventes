import {Planet} from './Planet';

export interface GetPlanetResponse {
  count: number;
  next: string;
  previous: string;
  results: Planet[];
}
