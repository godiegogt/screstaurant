import { Image, PermissionsAndroid, Platform, StyleSheet, View} from 'react-native'
import React, { FC } from 'react'

import { Button} from '@rneui/themed';

import Box from '../../components/common/Box'
import NumericKeyword from '../../components/common/NumericKeyword';
import { materialTheme } from '../../constants';
import { login as doLogin, updateBluetoothPermission} from '../../features/configurations/configurationSlide'
import { useDispatch } from 'react-redux';
import { Alert } from '../../components/common';

const LoginScreen:FC = () => {
  const [valueText, setValueText] = React.useState("");
  const [errormessage, seterrormessage] = React.useState("")
  const dispatch = useDispatch();

  React.useEffect(() => {
    requestCameraPermission();
}, [])


const requestCameraPermission = async () => {
    console.log(Platform.Version)

    if (Number(Platform.Version) > 30) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                {
                    title: 'Utilitas',
                    message:
                        'Utilitas Necesita acceder a tu bluetooth. ',
                    buttonNeutral: 'Preguntar luego',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the bluetooth');
                dispatch(updateBluetoothPermission("yes"))
            } else {
                console.log('Bluetooth permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    } else {
        dispatch(updateBluetoothPermission("yes"))
    }
};

const login=()=>{
  dispatch(doLogin())
}
 
  return (
    <View style={styles.container}>
          <Alert setMessage={seterrormessage} type={'warning'}  message={errormessage} />
       <Box flex style={styles.logo}><Image  source={require('../../assets/img/logo.png')} width={20} height={20}/></Box>
    <Box center>
    <NumericKeyword login={login} valueText={valueText} setValueText={setValueText}/>
       
    </Box>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{ flex:1,
        flexDirection:'column',justifyContent:'center',alignItems:'center'},
        
    logo:{
       
        backgroundColor:materialTheme.colors.back_ground_color,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
       
    }
})