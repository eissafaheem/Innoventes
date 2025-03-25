import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import InnoventesInput from '../../components/InnoventesInput/InnoventesInput';
import {useEffect, useState} from 'react';
import usePlanetHook from '../../hooks/usePlanetHook';
import PlanetCard from './PlanetCard/PLanetCard';
import {Planet} from '../../dataTypes/Planet';

const Search = (): React.JSX.Element => {
  const [searchToken, setSearchToken] = useState<string>('');
  const {getPlanetsByPage} = usePlanetHook();

  const [planets, setPlanets] = useState<Planet[]>();
  const [page, setPage] = useState<number>(1);
  const [hasMore, sethasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlanets();
  }, [page]);

  const getPlanets = async () => {
    setIsLoading(true);
    try {
      const planets = await getPlanetsByPage(page);
      console.log(planets);
      if (!planets || !planets.length) sethasMore(false);
      if (planets) setPlanets(planets);
      setIsLoading(false);
    } catch (error) {
      //show custom toaster message, no time
      setIsLoading(false);
    }
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
        data={planets}
        renderItem={({item, index}) => (
          <PlanetCard hasMaxPopulation={false} planet={item} key={item.id} />
        )}
        keyExtractor={item => item.id}
        onEndReached={getMore}
        ListFooterComponent={
          isLoading && hasMore ? <ActivityIndicator /> : null
        }
      />
    </View>
  );
};

export default Search;
