import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    AddProfilePage: { email: string };
    FindEventsPage: undefined;
};

export type AddProfileProps = NativeStackScreenProps<RootStackParamList, 'AddProfilePage'>;
export type FindEventsProps = NativeStackScreenProps<RootStackParamList, 'FindEventsPage'>;