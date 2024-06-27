import React, { useEffect } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import useOrder from '../../hooks/useOrder';

interface WithScreenFocusProps {
  navigation: NavigationProp<ParamListBase>;
  enviarSolicitud: () => void;
}

const WithScreenFocus = (WrappedComponent: React.ComponentType<any>) => {
  return (props: WithScreenFocusProps) => {
    const { sendOrder } = useOrder();

    useEffect(() => {
    //   const unsubscribeFocus = props.navigation.addListener('focus', () => {
    //     console.log('Screen is focused');
    //   });
    const sendAndRestart = async () => {
      console.log('Screen is blurred');
      await sendOrder(); // Call the async enviarSolicitud method
    };

      const unsubscribeBlur = props.navigation.addListener('blur', () => {sendAndRestart()});

      return () => {
        // if (unsubscribeFocus) {
        //   unsubscribeFocus();
        // }
        if (unsubscribeBlur) {
          unsubscribeBlur();
        }
      };
    }, [props.navigation, sendOrder]);

    return <WrappedComponent {...props} />;
  };
};

export default WithScreenFocus;