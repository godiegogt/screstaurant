import { Image, StyleSheet, View} from 'react-native'
import React from 'react'

import { Button} from '@rneui/themed';

import Box from '../../components/common/Box'
import NumericKeyword from '../../components/common/NumericKeyword';
import { materialTheme } from '../../constants';


const LoginScreen = () => {
    const [valueText, setValueText] = React.useState("");
    console.log('src',require('../../assets/img/logo.png'))
  return (
    <View style={styles.container}>
       <Box flex style={styles.logo}><Image  source={require('../../assets/img/logo.png')} width={60} height={60}/></Box>
    <Box center>
    <NumericKeyword valueText={valueText} setValueText={setValueText}/>
        <Button size='lg' title={'Entrar'} />
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