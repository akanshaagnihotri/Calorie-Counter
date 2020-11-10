import * as React from 'react';
import { StatusBar, Image, StyleSheet, Platform } from 'react-native';

import { UserContext, UserProviderInterface } from '@context/UserContext';
import { Button } from '@styleguide/components/Button';
import ImagePicker from 'react-native-image-picker';

import { SafeAreaView, ScrollView, Text } from '@styleguide/components/index';
import styled from 'styled-components/native';
import NutritionDetails from '../../content/NutritionDetails';

const StyledText = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const InnerContainer = styled.View`
  padding: 30px;
`;

const options = {
  title: 'Select Image',
  storageOptions: { skipBackup: true, path: 'images', cameraRoll: true, waitUntilSaved: true },
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

const UploadImage = () => {
  const { signOut, user }: UserProviderInterface = React.useContext(UserContext);

  const [image, setImage] = React.useState('');

  const showNutritionDetails = () => {
    const details = NutritionDetails.filter((dish) => dish.name === 'lasagna');
    console.log(details);
  };

  const openImagePicker = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const fileName = response.uri.substring(response.uri.indexOf('/Documents'));

        console.log(fileName.split('/').pop());
        setImage(response.uri);
        showNutritionDetails();
      }
    });
  };

  const src = image
    ? {
        uri: image,
      }
    : {};

  console.log(src);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <InnerContainer>
            <StyledText>Look for the caloriesss in your food </StyledText>
            <Button onPress={() => openImagePicker()} color="darkPurple" textColor="white">
              Upload
            </Button>
            <Image style={{ width: '100%', height: '100%' }} source={src} />
          </InnerContainer>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

UploadImage.routeName = 'UploadImage';

export default UploadImage;
