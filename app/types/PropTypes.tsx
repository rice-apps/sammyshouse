import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    AddProfilePage: { email: string };

};

export type AddProfileProps = NativeStackScreenProps<RootStackParamList, 'AddProfilePage'>;