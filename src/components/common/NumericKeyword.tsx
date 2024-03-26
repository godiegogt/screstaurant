import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Box from './Box'
import NumberButton from './NumberButton'
import { Input } from '@rneui/themed'
import { materialTheme } from '../../constants'

interface INumericKeyword{
    valueText:string,
    setValueText:(value:string)=>void
}

const NumericKeyword:FC<INumericKeyword> = ({valueText,setValueText}) => {

   

    const changeValue=(number:string)=>{
setValueText(valueText+number);
    }


    return (
        <Box style={styles.container}>
            <Box>
                <Input keyboardType='decimal-pad' value={valueText} containerStyle={{width:'100%'}} onChangeText={(text)=>{setValueText(text)}} inputStyle={{borderColor:materialTheme.colors.muted,borderWidth:1}}/>
            </Box>
            <Box flex row middle space='between'>
                <NumberButton onPress={changeValue} title='1'/>
                <NumberButton onPress={changeValue} title='2'/>
                <NumberButton onPress={changeValue} title='3'/>
            </Box>
            <Box flex row middle space='between'>
                <NumberButton onPress={changeValue} title='4'/>
                <NumberButton onPress={changeValue} title='5'/>
                <NumberButton onPress={changeValue} title='6'/>
            </Box>
            <Box flex row middle space='between'>
                <NumberButton onPress={changeValue} title='7'/>
                <NumberButton onPress={changeValue} title='8'/>
                <NumberButton onPress={changeValue} title='9'/>
            </Box>
            <Box flex row  center >
                <NumberButton onPress={changeValue} title='0'/>
              
            </Box>
        </Box>
    )
}

export default NumericKeyword

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 400,
        margin:materialTheme.sizes.BASE
    }
})