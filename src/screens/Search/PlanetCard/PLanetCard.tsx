import {Text, View} from 'react-native';
import {Planet} from '../../../dataTypes/Planet';

export type PlanetDetails = {
  planet: Planet;
  hasMaxPopulation: boolean;
};

const PlanetCard = (props: PlanetDetails) => {
  const {hasMaxPopulation, planet} = props;
  const {climate, name, population} = planet;

  return (
    <View
      style={{
        borderWidth: 1,
        margin: 8,
        borderRadius: 16,
        padding: 16,

        backgroundColor: hasMaxPopulation ? 'green' : 'white',
      }}>
      <Text>{name}</Text>
      <Text>{population}</Text>
    </View>
  );
};

export default PlanetCard;
