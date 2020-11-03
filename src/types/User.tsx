import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type ClientGeneratedUserData = {
  createdAt: Date;
  uid: string;
};

export type UserDataFromAuth = FirebaseAuthTypes.User;

export type UserCredentialFromAuth = FirebaseAuthTypes.UserCredential;

export type AdditionalUserData = {};

export type User = UserDataFromAuth & ClientGeneratedUserData & AdditionalUserData;
