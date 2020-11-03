import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import type { UserDataFromAuth, AdditionalUserData, User } from '@types/User';
import { UTC } from '@utils/Date';

export const UserCollection = firestore().collection('Users');

export const getUserDataFromSnapShot = (
  userSnapshot: FirebaseFirestoreTypes.DocumentSnapshot,
  uid: string
): User | null => {
  const userData = userSnapshot.data() as any;

  if (!userData) return null;

  return { uid, ...userData };
};

export const createUserProfileDocument = async (
  user: UserDataFromAuth | null,
  additionalData: AdditionalUserData
) => {
  if (!user) return;

  const userReference = UserCollection.doc(user.uid);

  const userSnapshot = await userReference.get();

  if (!userSnapshot.exists) {
    try {
      const { displayName, photoURL, email } = user;

      await firestore()
        .doc(`Users/${user.uid}`)
        .set({
          displayName,
          photoURL,
          email,
          createdAt: UTC.getDateString(),
          ...additionalData,
        });
    } catch (err) {
      console.error('Unable to create user Document', err);
    }
  }
};
