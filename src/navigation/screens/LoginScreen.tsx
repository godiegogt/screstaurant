import { Image, StyleSheet, View} from 'react-native'
import React, { FC } from 'react'

import { Button} from '@rneui/themed';

import Box from '../../components/common/Box'
import NumericKeyword from '../../components/common/NumericKeyword';
import { materialTheme } from '../../constants';


const LoginScreen:FC = () => {
    const [valueText, setValueText] = React.useState("");
 
  return (
    <View style={styles.container}>
       <Box flex style={styles.logo}><Image  source={require('../../assets/img/logo.png')} width={20} height={20}/></Box>
    <Box center>
    <NumericKeyword valueText={valueText} setValueText={setValueText}/>
       
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