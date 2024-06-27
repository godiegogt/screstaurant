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

      const unsubscribeBlur = props.navigation.addListener('blur', () => {
        console.log('Screen is blurred');
        sendOrder(); // Call the sendOrder method
      });

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