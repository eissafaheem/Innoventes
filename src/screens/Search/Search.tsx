import {FlatList, Text, View} from 'react-native';
import InnoventesInput from '../../components/InnoventesInput/InnoventesInput';
import {useEffect, useState} from 'react';
import usePlanetHook from '../../hooks/usePlanetHook';
import PlanetCard from './PlanetCard/PLanetCard';
import {Planet} from '../../dataTypes/Planet';

const Search = (): React.JSX.Element => {
  const [searchToken, setSearchToken] = useState<string>('');
  const {getPlanetsByPage} = usePlanetHook();

  const [planets, setPlanets] = useState<Planet[]>();

  useEffect(() => {
    getPlanets();
  }, []);

  const getPlanets = async () => {
    try {
      const planets = await getPlanetsByPage(1);
      console.warn(planets);
      if (planets) setPlanets(planets);
    } catch (error) {}
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
      />
    </View>
  );
};

export default Search;
