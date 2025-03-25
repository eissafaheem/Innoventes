import {GetPlanetResponse} from '../dataTypes/GetPLanetResponse';
import {HTTP_STATUS} from '../dataTypes/HTTP_STATUS';
import {Planet} from '../dataTypes/Planet';
import {v4 as uuidv4} from 'uuid';
import {PlanetDetails} from '../screens/Search/PlanetCard/PLanetCard';

const usePlanetHook = () => {
  const getPlanetsByPage = async (
    next: string,
    page: number,
  ): Promise<GetPlanetResponse> => {
    const response = await fetch(next, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === HTTP_STATUS.OK) {
      const getPlanetResponse: GetPlanetResponse = await response.json();
      const planetsArr = getPlanetResponse.results;
      const planetCardPropsArr = [];
      console.log('eissa', getPlanetResponse);

      for (let i = 0; i < planetsArr.length; i++) {
        const planetDetails: PlanetDetails = {
          planet: {...planetsArr[i], id: Math.random() + ''}, // should use useuuidv4() no time
          hasMaxPopulation: false,
        };

        planetCardPropsArr.push(planetDetails);
      }
      let planetWithMaxPopulation: Planet | null = null;

      for (let i = 0; i < planetCardPropsArr.length; i++) {
        if (planetCardPropsArr[i].planet.population === 'unknown') continue;

        if (
          (planetWithMaxPopulation?.population || 0) <
          planetCardPropsArr[i].planet.population
        ) {
          planetWithMaxPopulation = planetCardPropsArr[i].planet;
        }
      }
      for (let i = 0; i < planetCardPropsArr.length; i++) {
        if (planetWithMaxPopulation?.id === planetCardPropsArr[i].planet.id) {
          planetCardPropsArr[i].hasMaxPopulation = true;
        }
      }
      getPlanetResponse.results = planetCardPropsArr;
      return getPlanetResponse;
    } else if (response.status === HTTP_STATUS.NOT_FOUND) {
      return [];
    } else {
      throw new Error('Unable to fetch planets');
      return null;
    }
  };

  //simulating web response
  const searchPlanets = (
    searchToken: string,
    planets: GetPlanetResponse | null,
  ): GetPlanetResponse | null => {
    if (!planets) return null;

    let newResults = planets.results.filter(r =>
      r.planet.name.toLowerCase().includes(searchToken.toLowerCase()),
    );
    planets.results = newResults;
    return JSON.parse(JSON.stringify(planets));
  };

  return {
    getPlanetsByPage,
    searchPlanets,
  };
};

export default usePlanetHook;
