import { StyleSheet, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Container, FormInput, RadioButtonList, Text } from '../../components/common'
import Theme from '../../constants/Theme'
import { Button } from '@rneui/themed'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, updateURL } from '../../features/configurations/configurationSlice'
import { useNavigation } from '@react-navigation/native'

const ChangeServerScreen = () => {
  const [method, setMethod] = useState('http')
  const [isLoading, setisLoading] = useState(false)
  const navigation = useNavigation();
  const [url, seturl] = React.useState("");
  const URL = useSelector(state => state.configuration.URL)
  const dispatch = useDispatch();
  const changeUrl = () => {
    setisLoading(true)
    if (url != "" && url != undefined) {
      dispatch(updateURL(`${method}://${url}/Api`))
      setTimeout(() => {
        setisLoading(false)
        dispatch(logOut())
      }, 1500);


    } else {
      Alert.alert("Servidor inválido.")
    }
  }
  return (
    <Container>
      <FormInput onBlur={() => { }} onFocus={() => { }} color={Theme.colors.primary} title={'IP:'} type='text' placeholder={'example: 192.168.1.1:80'} val={url} onChange={seturl} />
      <RadioButtonList items={[{name:'http'},{name:'https'}]} onChange={setMethod} title={'Tipo de conexión:'} value={method}/>
      <Text>{URL}</Text>
      <Button loading={isLoading} onPress={changeUrl} title={'Guardar'} />
    </Container>
  )
}

export default ChangeServerScreen

const styles = StyleSheet.create({})