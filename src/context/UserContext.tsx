import * as React from 'react';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import {
  createUserProfileDocument,
  getUserDataFromSnapShot,
  UserCollection,
} from '@api/FirebaseUser';
import { User, UserDataFromAuth, UserCredentialFromAuth } from '@types/User';

type authenticationFunction = (
  userName: string,
  password: string
) => Promise<UserCredentialFromAuth>;

export interface UserProviderInterface {
  signIn: authenticationFunction;
  signOut: () => Promise<void>;
  signUp: authenticationFunction;
  onGoogleSignIn: () => Promise<UserCredentialFromAuth>;
  forgotPassword: (email: string) => Promise<void>;
  user: User | null;
  isLoggedIn: boolean;
}

const signOut = () => auth().signOut();

const signIn: authenticationFunction = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

const signUp: authenticationFunction = (email, password) =>
  auth().createUserWithEmailAndPassword(email, password);

const onGoogleSignIn = async () => {
  const { idToken } = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
};

const forgotPassword = (email: string) => auth().sendPasswordResetEmail(email);

export const UserContext = React.createContext<UserProviderInterface>({
  user: null,
  signIn,
  signOut,
  signUp,
  forgotPassword,
  onGoogleSignIn,
  isLoggedIn: false,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authData, setAuthData] = useState<UserDataFromAuth | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const onAuthStateChanged = (userDataFromAuth: UserDataFromAuth | null) => {
    console.log('In AuthStateChanged', userDataFromAuth);
    setAuthData(userDataFromAuth);

    createUserProfileDocument(userDataFromAuth, {}).catch((e) =>
      console.error('Error Occurred While Updating the User Collection', e)
    );
  };

  useEffect(() => {
    if (!authData) {
      return setUser(null);
    }

    const { uid } = authData;
    const subscriber = UserCollection.doc(uid).onSnapshot((userSnapshot) => {
      const userData = getUserDataFromSnapShot(userSnapshot, uid);
      setUser(userData);
    });

    return () => subscriber();
  }, [authData]);

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signOut,
        signIn,
        signUp,
        forgotPassword,
        onGoogleSignIn,
        isLoggedIn: !!authData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
