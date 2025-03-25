import {TextInput} from 'react-native';

export type InnoventesInputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placehoolder?: string;
};

const InnoventesInput = (props: InnoventesInputProps) => {
  const {setValue, value, placehoolder} = props;

  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placehoolder}
      placeholderTextColor={'black'}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
      }}
    />
  );
};

export default InnoventesInput;
