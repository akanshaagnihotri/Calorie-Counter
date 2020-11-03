import * as React from 'react';
import styled from 'styled-components/native';
import {
  LottieAnimation,
  MainLayout,
  SafeAreaView,
  ScrollView,
  Text,
} from '@styleguide/components/index';
import { uiColorToBaseColor } from '@styleguide/styles/color';
import { Input } from '@styleguide/components/Input';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { UserContext, UserProviderInterface } from '@context/UserContext';
import { Button } from '@styleguide/components/Button';

import { Dimensions, TextInputProps } from 'react-native';
import * as SignUpAnimation from './animations/SignUpAnimation.json';
import MessageSentConfirmationScreen from './MessageSentConfirmationScreen';

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 30px;
`;

const Heading = styled(Text)`
  margin: 10px 0;
  align-self: center;
  font-size: 28px;
  font-weight: 600;
  color: ${uiColorToBaseColor('darkPurple')};
`;

const SignUpButton = styled(Button)`
  margin-top: 20px;
`;

const deviceWidth = Dimensions.get('window').width;

const EMAIL_SENT_STATUS = 'EMAIL_SENT_STATUS';

const SignUp = () => {
  const { signUp }: UserProviderInterface = React.useContext(UserContext);

  const formValidationSchema = React.useMemo(() => {
    return yup.object().shape({
      email: yup.string().email('Please enter a valid email').required("Email can't be empty"),
      password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required("Password can't be empty"),
    });
  }, []);

  const signUpForm = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: formValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setSubmitting, setErrors, setStatus }) => {
      const { email, password } = values;

      signUp(email, password)
        .then((userDataFromAuth) => {
          const { user } = userDataFromAuth;

          if (!user) {
            return setErrors({ email: 'Please check the email you entered' });
          }

          user
            .sendEmailVerification()
            .then(() => {
              setSubmitting(false);
              setStatus(EMAIL_SENT_STATUS);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((e) => {
          setSubmitting(false);

          if (e.code === 'auth/email-already-in-use') {
            setErrors({ email: 'This e-mail is already in use' });
          } else if (e.code === 'auth/invalid-email') {
            setErrors({ email: 'This e-mail is invalid' });
          } else {
            console.log(e);
          }
        });
    },
  });

  const {
    values: { email, password },
    handleChange,
    errors,
    handleSubmit,
    isSubmitting,
    status,
  } = signUpForm;

  const isStatusEmailSent = React.useMemo(() => status === EMAIL_SENT_STATUS, [status]);

  return (
    <SafeAreaView>
      <MainLayout>
        <ScrollView>
          {isStatusEmailSent ? (
            <MessageSentConfirmationScreen
              heading="Email Verification Link Sent"
              subHeading=" We have sent you a verification link on your registered e-mail. Please verify your account and try signing in again."
            />
          ) : (
            <>
              <Heading>Sign Up</Heading>
              <CenteredStyledView>
                <LottieAnimation
                  style={{
                    width: deviceWidth * 0.5,
                    height: deviceWidth * 0.5,
                  }}
                  loop
                  source={SignUpAnimation}
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
              <Input
                placeholder="Password"
                label="Enter Your Password"
                isInvalid={!!errors.password}
                textContentType="password"
                errorMessage={errors.password}
                value={password}
                onChangeText={handleChange('password') as TextInputProps['onChangeText']}
              />
              <SignUpButton
                isDisabled={isSubmitting}
                onPress={() => handleSubmit()}
                color="darkPurple"
                textColor="white"
              >
                Sign Up
              </SignUpButton>
            </>
          )}
        </ScrollView>
      </MainLayout>
    </SafeAreaView>
  );
};
SignUp.routeName = 'SignUpPage';
export default SignUp;
