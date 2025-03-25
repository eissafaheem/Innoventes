import {GetPlanetResponse} from '../dataTypes/GetPLanetResponse';
import {HTTP_STATUS} from '../dataTypes/HTTP_STATUS';
import {Planet} from '../dataTypes/Planet';
import {v4 as uuidv4} from 'uuid';
import {PlanetDetails} from '../screens/Search/PlanetCard/PLanetCard';

const usePlanetHook = () => {
  const getPlanetsByPage = async (
    page: number,
  ): Promise<PlanetDetails[] | null> => {
    const response = await fetch(
      `https://swapi.dev/api/planets/?page=${page}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === HTTP_STATUS.OK) {
      const json: GetPlanetResponse = await response.json();
      const planetsArr = json.results;
      const planetCardPropsArr = [];

      for (let i = 0; i < planetsArr.length; i++) {
        const planetDetails: PlanetDetails = {
          planet: {...planetsArr[i], id: Math.random() + ''}, // should use useuuidv4() no time
          hasMaxPopulation: false,
        };

        planetCardPropsArr.push(planetDetails);
      }
      let planetWithMaxPopulation: Planet | null = null;

      for (let i = 0; i < planetCardPropsArr.length; i++) {
        if (
          (planetWithMaxPopulation?.population || 0) < planetCardPropsArr[i].planet.population
        ) {
          planetWithMaxPopulation = planetCardPropsArr[i].planet;
        }
      }
      console.log("here",planetWithMaxPopulation)
      for (let i = 0; i < planetCardPropsArr.length; i++) {
        if (planetWithMaxPopulation?.id === planetCardPropsArr[i].planet.id) {
          planetCardPropsArr[i].hasMaxPopulation = true;
        }
      }

      return planetCardPropsArr;
    } else if (response.status === HTTP_STATUS.NOT_FOUND) {
      return [];
    } else {
      throw new Error('Unable to fetch planets');
      return null;
    }
  };

  const searchPlanets = (
    searchToken: string,
  ): Promise<PlanetDetails[] | null> => {
    return [];
  };

  return {
    getPlanetsByPage,
    searchPlanets,
  };
};

export default usePlanetHook;
