import {Button} from 'react-native';

export type InnoventesButtonProps = {
  onPress: () => void;
  title: string;
};

const InnoventesButton = (props: InnoventesButtonProps) => {
  const {onPress: onPress, title} = props;
  return <Button color={'purple'} title={title} onPress={onPress} />;
};

export default InnoventesButton;
