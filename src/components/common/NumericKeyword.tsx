import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import Box from './Box'
import NumberButton from './NumberButton'
import { Button, Input } from '@rneui/themed'
import { materialTheme } from '../../constants'
import Text from './Text'

interface INumericKeyword{
    valueText:string,
    setValueText:(value:string)=>void,
    login:()=>void
}

const NumericKeyword:FC<INumericKeyword> = ({valueText,setValueText,login}) => {

   

    const changeValue=(number:string)=>{
setValueText(valueText+number);
    }

const InputTextComponent=()=>{
return <Box style={styles.inputTextComponent}>
    <Text h3 styles={{textAlign:'center'}}>{valueText}</Text>
</Box>
}

const deleteCharacter=(text:string)=>{
  setValueText(valueText.substring(0, valueText.length - 1))
}
    return (
        <Box style={styles.container}>
            <InputTextComponent />
            <Box flex row middle >
                <NumberButton onPress={changeValue} title='1'/>
                <NumberButton onPress={changeValue} title='2'/>
                <NumberButton onPress={changeValue} title='3'/>
            </Box>
            <Box flex row middle >
                <NumberButton onPress={changeValue} title='4'/>
                <NumberButton onPress={changeValue} title='5'/>
                <NumberButton onPress={changeValue} title='6'/>
            </Box>
            <Box flex row middle >
                <NumberButton onPress={changeValue} title='7'/>
                <NumberButton onPress={changeValue} title='8'/>
                <NumberButton onPress={changeValue} title='9'/>
            </Box>
            <Box flex row  center bottom>
            <NumberButton onPress={changeValue} title='0'/>
            <NumberButton onPress={deleteCharacter} title='<'/>
            </Box>
            <Button size='lg' title={'Entrar'} onPress={login}/>
        </Box>
    )
}

export default NumericKeyword

const styles = StyleSheet.create({
    container: {
       
        height: 400,
        margin:materialTheme.sizes.BASE,
        justifyContent:'space-between'
    },
    inputTextComponent:{
        backgroundColor:'transparent',
        borderWidth:3,
        borderColor:materialTheme.colors.muted,
        height:40,
       
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
})