import { Image, PermissionsAndroid, Platform, StyleSheet, View} from 'react-native'
import React, { FC } from 'react'

import { Button} from '@rneui/themed';

import Box from '../../components/common/Box'
import NumericKeyword from '../../components/common/NumericKeyword';
import { materialTheme } from '../../constants';
import { login as doLogin, updateBluetoothPermission, updateToken} from '../../features/configurations/configurationSlice'
import { useDispatch } from 'react-redux';
import { Alert } from '../../components/common';
import axios from 'axios'
import { URL_API } from '../../constants/variables';
import axiosClient from '../../utils/axiosClient';

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

const login= async ()=>{

    // axios({
    //     method: 'post',
    //     url: URL_API + 'GetToken',
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     data: qs.stringify(credentials)

// axiosClient.post('/GetToken',{username:'Administrador',password:'Admin2024$',grant_type:'password'}).then(data=>{
//     console.log(data)
// })
const credentials = {
    username: 'Administrador',
    password: 'Admin2024$',
    grant_type: 'password'
}
axios({
    method: 'post',
    url: URL_API + '/GetToken',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: credentials
}).then(data=>{
    
   dispatch(updateToken({data:data.data.access_token,expiration_date:data.data.expiration_date}))

    axiosClient.post('/ObtenerUsuarioPorCodigo',{Codigo:valueText}).then((data2:any)=>{
      
       dispatch(doLogin({name:data2.Nombre,roomDefaultId:data2.SalonDefaultID,userId:data2.UsuarioID}))
    })
})

 // dispatch(doLogin())
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