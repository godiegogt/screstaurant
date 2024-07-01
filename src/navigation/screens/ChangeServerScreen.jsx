import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Container, FormInput, Text } from '../../components/common'
import Theme from '../../constants/Theme'
import { Button } from '@rneui/themed'
import { useDispatch, useSelector } from 'react-redux'
import { updateURL } from '../../features/configurations/configurationSlice'
import { useNavigation } from '@react-navigation/native'

const ChangeServerScreen = () => {
const navigation  =  useNavigation();
    const [url, seturl] = React.useState("");
    const URL = useSelector(state => state.configuration.URL)
   const dispatch= useDispatch();
    const changeUrl=()=>{
dispatch(updateURL(url))
navigation.navigate("ConfigurationScreen");

    }
  return (
    <Container>
     <FormInput onBlur={()=>{}} onFocus={()=>{}}  color={Theme.colors.primary} title={'URL: '} type='text' placeholder={'https://example.com'} val={url} onChange={seturl} />
   <Text>{URL}</Text>
    <Button onPress={changeUrl} title={'Guardar'}/>
    </Container>
  )
}

export default ChangeServerScreen

const styles = StyleSheet.create({})