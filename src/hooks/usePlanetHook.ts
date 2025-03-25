import {GetPlanetResponse} from '../dataTypes/GetPLanetResponse';
import {HTTP_STATUS} from '../dataTypes/HTTP_STATUS';
import {Planet} from '../dataTypes/Planet';
import {v4 as uuidv4} from 'uuid';

const usePlanetHook = () => {
  const getPlanetsByPage = async (page: number): Promise<Planet[] | null> => {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    if (response.status === HTTP_STATUS.OK) {
      const json: GetPlanetResponse = await response.json();
      const planetsArr = json.results;

      for (let i = 0; i < planetsArr.length; i++) {
        planetsArr[i] = {...planetsArr[i], id: Math.random() + ''}; // should use useuuidv4() no time
      }
      console.log('updatedPlanets,planetsArr');
      console.warn({planetsArr});
      return planetsArr;
    } else if (response.status === HTTP_STATUS.NOT_FOUND) {
      return [];
    } else {
      throw new Error('Unable to fetch planets');
      return null;
    }
  };

  return {
    getPlanetsByPage,
  };
};

export default usePlanetHook;
