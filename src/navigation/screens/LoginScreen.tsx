import { Image, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'

import Box from '../../components/common/Box'
import NumericKeyword from '../../components/common/NumericKeyword';
import { materialTheme } from '../../constants';
import { login as doLogin, updateBluetoothPermission, updateToken } from '../../features/configurations/configurationSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '../../components/common';
import axios from 'axios'
import axiosClient from '../../utils/axiosClient';
import { IRootState } from '../../app/store';
import { Text } from '@rneui/themed';
import { appVersion } from '../../constants/variables';


const LoginScreen: FC = () => {
    const [valueText, setValueText] = React.useState("");
    const [errormessage, seterrormessage] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const dispatch = useDispatch();
    const url = useSelector((state: IRootState) => state.configuration.URL)
    const token = useSelector((state: IRootState) => state.configuration.token)
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
                        title: 'SC Restaurant',
                        message:
                            'Esta app Necesita acceder a tu bluetooth. ',
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

    const login = async () => {

       try {
        console.log('url', "'" + url + "'")
       
        const credentials = {
            username: 'Administrador',
            password: 'Admin2024$',
            grant_type: 'password'
        }
        setIsLoading(true);
        axios({
            method: 'post',
            url: url + '/GetToken',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            timeout: 10000,
            data: credentials
        }).then(data => {
            console.log('paso su primer get')
            dispatch(updateToken({ data: data.data.access_token, expiration_date: data.data.expiration_date }))

            axios({
                method: 'post',
                url: url + '/ObtenerUsuarioPorCodigo',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${data.data.access_token}`
                },
                timeout: 10000,
                data: { Codigo: valueText }
            }).then(data2 => {
                dispatch(doLogin({ name: data2.data.Nombre, roomDefaultId: data2.data.SalonDefaultID, userId: data2.data.UsuarioID }))
                setIsLoading(false);

            }).catch(err => {
                console.log(err)
                setIsLoading(false);
                seterrormessage('Hubo un error. Intentelo más tarde por favor.')
            })

        }).catch(error => {
            setIsLoading(false);
            console.log(error)
           
            seterrormessage('Hubo un error en la conexión. Revise su conexión a internet.')
        })
       } catch (error) {
        setIsLoading(false)
        seterrormessage('Error inesperado.')
       }
        

        // dispatch(doLogin())
    }



    return (
        <View style={styles.container}>
            <Alert setMessage={seterrormessage} type={'warning'} message={errormessage} />
            <View style={styles.logoContainer}><Image resizeMode='contain' style={styles.logo} source={require('../../assets/img/logo.png')} /></View>
            <Box center>
                <NumericKeyword isLoading={isLoading} login={login} valueText={valueText} setValueText={setValueText} />
                <Text>{appVersion}</Text>
            </Box>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', alignItems: 'center',
        backgroundColor: '#fff'
    },

    logoContainer: {
        backgroundColor: materialTheme.colors.back_ground_color,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 226

    },
    logo: {

        height: 210
    }

})