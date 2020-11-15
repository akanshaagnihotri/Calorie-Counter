import * as React from 'react';
import * as yup from 'yup';

import styled from 'styled-components/native';
import { useFormik } from 'formik';

import { UserContext, UserProviderInterface } from '@context/UserContext';
import {
  SafeAreaView,
  MainLayout,
  ScrollView,
  LottieAnimation,
  Text,
} from '@styleguide/components/index';
import { Button } from '@styleguide/components/Button';
import GoogleSignInButton from '@styleguide/components/GoogleSignInButton';
import { Input } from '@styleguide/components/Input';

import { uiColorToBaseColor } from '@styleguide/styles/color';
import { Dimensions, TextInputProps } from 'react-native';
import * as LoginScreenAnimation from './animations/LoginScreenAnimation.json';

const deviceWidth = Dimensions.get('window').width;

const CenteredStyledView = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 50px;
`;

const LoginFormActionsContainer = styled.View`
  flex: 1;
  margin: 10px 0 20px;
`;

const FlexContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const FlexOneButton = styled(Button)`
  flex: 1;
  padding: 0;
  margin: 5px 0 0;
  border-width: 0;
`;

const StyledOrText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  color: ${uiColorToBaseColor('darkPurple')};
`;

type LoginForm = {
  email: string;
  password: string;
};

// Todo: Navigator Props Types
const Login = ({ navigation }: any) => {
  const { signIn }: UserProviderInterface = React.useContext(UserContext);

  const initialFormValues = React.useMemo<LoginForm>(
    () => ({
      email: '',
      password: '',
    }),
    []
  );

  const formValidationSchema = React.useMemo(() => {
    return yup.object().shape({
      email: yup.string().email('Please enter a valid email').required("Email can't be empty"),
      password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required("Password can't be empty"),
    });
  }, []);

  const signInForm = useFormik({
    initialValues: initialFormValues,
    validationSchema: formValidationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const { email, password } = values;

      signIn(email, password)
        .then((userDataFromAuth) => {
          const { user } = userDataFromAuth;

          if (!user.emailVerified) {
            setErrors({ email: 'Please verify your email and then try signing in' });
          }
          setSubmitting(false);
        })
        .catch((e) => {
          console.log(e);
          setSubmitting(false);
        });
    },
  });

  const {
    values: { email, password },
    handleChange,
    errors,
    handleSubmit,
    isSubmitting,
  } = signInForm;

  return (
    <SafeAreaView>
      <MainLayout>
        <ScrollView>
          <CenteredStyledView>
            <LottieAnimation
              style={{
                width: deviceWidth * 0.5,
                height: deviceWidth * 0.5,
              }}
              loop
              source={LoginScreenAnimation}
            />
          </CenteredStyledView>
          <Input
            label="Enter Your Email"
            placeholder="Email"
            isInvalid={!!errors.email}
            errorMessage={errors.email}
            value={email}
            onChangeText={handleChange('email') as TextInputProps['onChangeText']}
          />
          <Input
            secureTextEntry
            label="Enter Your Password"
            placeholder="Password"
            value={password}
            isInvalid={!!errors.password}
            errorMessage={errors.password}
            textContentType="password"
            onChangeText={handleChange('password') as TextInputProps['onChangeText']}
          />
          <LoginFormActionsContainer>
            <Button
              isDisabled={isSubmitting}
              onPress={() => handleSubmit()}
              color="darkPurple"
              textColor="white"
            >
              Sign In
            </Button>
            <FlexContainer>
              <FlexOneButton
                color="transparent"
                textColor="darkPurple"
                onPress={() => navigation.navigate('SignUpPage')}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Don't have an account?
              </FlexOneButton>

              <FlexOneButton
                textColor="darkPurple"
                color="transparent"
                onPress={() => navigation.navigate('ForgotPasswordPage')}
              >
                Forgot Password?
              </FlexOneButton>
            </FlexContainer>
          </LoginFormActionsContainer>
          <StyledOrText>or</StyledOrText>
          <GoogleSignInButton />
        </ScrollView>
      </MainLayout>
    </SafeAreaView>
  );
};

Login.routeName = 'LoginPage';

export default Login;
