import * as React from 'react';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '@styleguide/components';

const Container = styled.View`
  box-shadow: 1px 1px 10px #e1e7f2;
  width: 100%;
  backgroundColor: #fff;
  padding: 10px;
  margin-bottom: 25px;
  borderRadius: 3px;
`;

const FoodNameText = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 15px;
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

const CalorieCard = ({ detail }) => {
  return (
    <Container>
      <FoodNameText>{detail.name}</FoodNameText>
      <Image
        style={{ width: '100%', resizeMode: 'cover', height: undefined, aspectRatio: 1, marginBottom: 30 }}
        source={detail.storedImage}
      />
      {detail.dailyPercentage.map((dailyPercentage) => (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Label>{dailyPercentage.label}</Label>
          <Value>{dailyPercentage.value}</Value>
        </View>
      ))}
    </Container>
  );
};

export default CalorieCard;
