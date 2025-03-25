import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import InnoventesInput from '../../components/InnoventesInput/InnoventesInput';
import {useEffect, useState} from 'react';
import usePlanetHook from '../../hooks/usePlanetHook';
import PlanetCard, {PlanetDetails} from './PlanetCard/PLanetCard';
import {Planet} from '../../dataTypes/Planet';
import {GetPlanetResponse} from '../../dataTypes/GetPLanetResponse';

const Search = (): React.JSX.Element => {
  const [searchToken, setSearchToken] = useState<string>('');
  const {getPlanetsByPage, searchPlanets} = usePlanetHook();

  const [planets, setPlanets] = useState<GetPlanetResponse>();
  const [page, setPage] = useState<number>(1);
  const [hasMore, sethasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>(
    `https://swapi.dev/api/planets/?page=1`,
  );

  useEffect(() => {
    getPlanets();
  }, [page]);

  useEffect(() => {}, [searchToken]);
//   useEffect(() => {
//     checklargest();
//   }, [planets]);

  const searchByToken = async () => {
    setIsLoading(true);
    try {
      const planets = await searchPlanets(searchToken);
      console.log(planets);
      if (!planets || !planets.results.length) sethasMore(false);
      if (planets) {
        setPlanets(planets);
      }
      setIsLoading(false);
    } catch (error) {
      //show custom toaster message, no time
      setIsLoading(false);
    }
  };

  const getPlanets = async () => {
    setIsLoading(true);
    try {
      const planets = await getPlanetsByPage(url, page);
      console.log('Eissa look here', url);
      console.log(planets);
      if (!planets?.results || !planets.results.length) sethasMore(false);
      if (planets) {
        setUrl(planets.next);
        setPlanets(prev => {
          planets.results = [...(prev?.results || []), ...planets.results];
          return planets;
        });
      }
      setIsLoading(false);
    } catch (error) {
      //show custom toaster message, no time
      setIsLoading(false);
    }
  };

  const checklargest = () => {
    if (!planets?.results.length) return;
    let largest: Planet | null = null;
    for (let i = 0; i < planets?.results.length; i++) {
      if (planets.results[i].planet.population === 'unknown') continue;
      if (
        largest &&
        largest.population < planets.results[i].planet.population
      ) {
        largest = planets.results[i].planet;
      }
    }

    let updatedList: GetPlanetResponse = JSON.parse(JSON.stringify(planets));
    for (let i = 0; i < updatedList?.results.length; i++) {
      if (updatedList.results[i].planet.id === largest?.id) {
        updatedList.results[i].hasMaxPopulation = true;
      }
    }

    setPlanets(updatedList);
  };

  const getMore = () => {
    if (hasMore) setPage(prev => prev + 1);
  };

  return (
    <View style={{flex: 1}}>
      <InnoventesInput
        setValue={setSearchToken}
        value={searchToken}
        placehoolder="Search planets here..."
      />
      <FlatList
        data={planets?.results}
        renderItem={({item, index}) => (
          <PlanetCard
            hasMaxPopulation={item.hasMaxPopulation}
            planet={item.planet}
            key={item.planet.id}
          />
        )}
        keyExtractor={item => item.planet.id}
        onEndReached={getMore}
        ListFooterComponent={
          isLoading && hasMore ? <ActivityIndicator /> : null
        }
      />
    </View>
  );
};

export default Search;
