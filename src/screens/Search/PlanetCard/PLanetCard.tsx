import {Text, View} from 'react-native';
import {Planet} from '../../../dataTypes/Planet';

export type PlanetCardProps = {
  planet: Planet;
  hasMaxPopulation: boolean;
};

const PlanetCard = (props: PlanetCardProps) => {
  const {hasMaxPopulation, planet} = props;
  const {climate, name, population} = planet;

  return (
    <View style={{borderWidth: 1, margin: 8, borderRadius: 16, padding: 16}}>
      <Text>{name}</Text>
      <Text>{climate}</Text>
      <Text>{population}</Text>
    </View>
  );
};

export default PlanetCard;
