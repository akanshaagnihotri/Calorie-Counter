import * as React from 'react';
import Animation from 'lottie-react-native';

const LottieAnimation = (props: Animation['props']) => {
  const animationRef = React.useRef<any>(null);

  React.useLayoutEffect(() => {
    if (!animationRef) return;

    animationRef.current.play();
  }, [animationRef]);

  return <Animation ref={animationRef} {...props} />;
};

export default LottieAnimation;
