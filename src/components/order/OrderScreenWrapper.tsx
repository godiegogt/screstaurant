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
const [isLoading, setisLoading] = React.useState(false)
    useEffect(() => {
    //   const unsubscribeFocus = props.navigation.addListener('focus', () => {
    //     console.log('Screen is focused');
    //   });
    const sendAndRestart = async () => {
      console.log('Screen is blurred');
     try {
      setisLoading(true);
      await sendOrder(); // Call the async enviarSolicitud method
     } catch (error) {
      
     }finally{
      setisLoading(false);
     }
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

    return <WrappedComponent {...props} isLoading={isLoading} setLoading={setisLoading}/>;
  };
};

export default WithScreenFocus;