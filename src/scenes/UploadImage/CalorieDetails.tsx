import * as React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '@styleguide/components';

const FoodNameText = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const SectionHeading = styled(Text)`
  font-size: 26px;
  font-weight: 400;
  margin: 15px 0;
`;

const Value = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 3px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 3px;
`;

const CalorieDetails = ({ details, image }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <FoodNameText>{details.name}</FoodNameText>
      <Image
        style={{ width: '100%', resizeMode: 'cover', height: undefined, aspectRatio: 1 }}
        source={image}
      />
      <SectionHeading>Ingredients:</SectionHeading>
      <Value style={{ marginBottom: 20 }}>
        Based on Visual Detection & our proprietary ML-Detection technology, We have detected the
        usage of following ingredients with approximate weight listed next to them:
      </Value>

      {details.ingredients.map((ingredient) => (
        <Value key={ingredient}>{ingredient}</Value>
      ))}
      <SectionHeading>Nutrition:</SectionHeading>
      {details.nutrition.map((nutrition) => (
        <View
          key={'calorie-detail-' + nutrition.label}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Label>{nutrition.label}</Label>
          <Value>{nutrition.value}</Value>
        </View>
      ))}

      <SectionHeading>Daily Percentage:</SectionHeading>
      {details.dailyPercentage.map((dailyPercentage) => (
        <View
          key={'calorie-detail-' + dailyPercentage.label}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Label>{dailyPercentage.label}</Label>
          <Value>{dailyPercentage.value}</Value>
        </View>
      ))}
    </View>
  );
};

export default CalorieDetails;
