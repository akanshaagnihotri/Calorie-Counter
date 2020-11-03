import * as React from 'react';
import styled from 'styled-components/native';
import { TextInputProps, Dimensions } from 'react-native';
import { uiColorToBaseColor } from '@styleguide/styles/color';
import { Input } from '@styleguide/components/Input';

import * as yup from 'yup';
import { useFormik } from 'formik';

import {
  MainLayout,
  SafeAreaView,
  ScrollView,
  Text,
  LottieAnimation,
} from '@styleguide/components/index';
import { UserContext, UserProviderInterface } from '@context/UserContext';
import { Button } from '@styleguide/components/Button';

import MessageSentConfirmationScreen from './MessageSentConfirmationScreen';
import * as ForgotPasswordScreenAnimation from './animations/ForgotPasswordAnimation.json';

const Heading = styled(Text)`
  margin: 10px 0;
  align-self: center;
  font-size: 28px;
  font-weight: 600;
  color: ${uiColorToBaseColor('darkPurple')};
`;

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 30px;
`;

const PasswordResetButton = styled(Button)`
  margin-top: 15px;
`;

const EMAIL_SENT_STATUS = 'EMAIL_SENT_STATUS';

const deviceWidth = Dimensions.get('window').width;

const ForgotPassword = () => {
  const { forgotPassword }: UserProviderInterface = React.useContext(UserContext);

  const formValidationSchema = React.useMemo(() => {
    return yup.object().shape({
      email: yup.string().email('Please enter a valid email').required("Email can't be empty"),
    });
  }, []);

  const passwordResetForm = useFormik({
    initialValues: { email: '' },
    validationSchema: formValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setSubmitting, setErrors, setStatus }) => {
      const { email } = values;

      forgotPassword(email)
        .then(() => {
          setSubmitting(false);
          setStatus(EMAIL_SENT_STATUS);
        })
        .catch((e) => {
          setSubmitting(false);
          setErrors({ email: 'This e-mail is not registered' });
        });
    },
  });

  const {
    values: { email },
    handleChange,
    errors,
    handleSubmit,
    isSubmitting,
    status,
  } = passwordResetForm;

  const isStatusEmailSent = React.useMemo(() => status === EMAIL_SENT_STATUS, [status]);

  return (
    <SafeAreaView>
      <MainLayout>
        <ScrollView>
          {isStatusEmailSent ? (
            <MessageSentConfirmationScreen
              heading="Password Reset Link Sent"
              subHeading="We have sent you a password reset link on your registered e-mail. Please reset your
          password and try signing in again."
            />
          ) : (
            <>
              <Heading>Forgot Password</Heading>
              <CenteredStyledView>
                <LottieAnimation
                  style={{
                    width: deviceWidth * 0.5,
                    height: deviceWidth * 0.5,
                  }}
                  loop
                  source={ForgotPasswordScreenAnimation}
                />
              </CenteredStyledView>
              <Input
                placeholder="Email"
                label="Enter Your Email"
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                value={email}
                onChangeText={handleChange('email') as TextInputProps['onChangeText']}
              />
              <PasswordResetButton
                isDisabled={isSubmitting}
                onPress={() => handleSubmit()}
                color="darkPurple"
                textColor="white"
              >
                Send Password Reset Link
              </PasswordResetButton>
            </>
          )}
        </ScrollView>
      </MainLayout>
    </SafeAreaView>
  );
};

ForgotPassword.routeName = 'ForgotPasswordPage';
export default ForgotPassword;
