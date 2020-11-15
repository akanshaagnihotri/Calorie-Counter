import * as React from 'react';
import { StatusBar, Image, StyleSheet, Platform, Dimensions } from 'react-native';
import CalorieDetails from './CalorieDetails';

import { Button } from '@styleguide/components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import { ScannedContext } from '@context/ScannedContext';
import { SafeAreaView, ScrollView, Text, LottieAnimation } from '@styleguide/components/index';
import styled from 'styled-components/native';
import NutritionDetails from '../../content/NutritionDetails';
import * as UploadAnimation from './upload.json';

const deviceWidth = Dimensions.get('window').width;

const StyledText = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const InnerContainer = styled.View`
  padding: 30px;
`;

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin: 30px 0;
`;

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

const getNutritionDetails = (selectedImage) => {
  return NutritionDetails.find(
    (dish) => selectedImage.filename.toUpperCase() === dish.image.toUpperCase()
  );
};

const UploadImage = () => {
  const [image, setImage] = React.useState({});
  const { addScannedItem } = React.useContext(ScannedContext);

  const openImagePicker = () => {
    ImagePicker.openPicker({}).then((image) => {
      setImage(image);
      const details = image.filename ? getNutritionDetails(image) : {};
      if (details.name) {
        addScannedItem(details);
      }
    });
  };

  const src =
    image && image.path
      ? {
          uri: image.path,
        }
      : {};

  const details = image.filename ? getNutritionDetails(image) : {};

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <InnerContainer>
            {image.path && details ? (
              <>
                <CalorieDetails details={details} image={src} />
                <Button onPress={() => openImagePicker()} color="red" textColor="white">
                  Try Another Dish
                </Button>
              </>
            ) : (
              <>
                <StyledText>Look for the calories in your food </StyledText>
                <CenteredStyledView>
                  <LottieAnimation
                    style={{
                      width: deviceWidth * 0.8,
                      height: deviceWidth * 0.8,
                    }}
                    loop
                    source={UploadAnimation}
                  />
                </CenteredStyledView>
                <Button onPress={() => openImagePicker()} color="red" textColor="white">
                  Upload
                </Button>
              </>
            )}
          </InnerContainer>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

UploadImage.routeName = 'Scan';

export default UploadImage;
