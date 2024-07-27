import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Container } from '../../components/common'
import { Button } from '@rneui/themed'
import useConfiguration from '../../hooks/useConfiguration'
import useRooms from '../../hooks/useRooms'
import Theme from '../../constants/Theme'
import useArticles from '../../hooks/useArticles'

const UpdateCatalogsScreen = () => {
const configHook =useConfiguration();
const roomsHook =useRooms();
const articlesHook =useArticles();


const _updateParams=async()=>{
const response = await configHook.updateParams();
if(response!=null){
Alert.alert('Parámetros actualizados');
}else{
    Alert.alert('Hubo un error actualizando los parámetros.')
}
}

const _updateCategories= async ()=>{
    let response = null;
try {
   response = await articlesHook.updateCategories();
    if(response!=null){
        Alert.alert('Mesas actualizados.');
    }else{
        Alert.alert('Hubo un error actualizando los parámetros.')
    }
} catch (error) {
    
}

}

const _updateTables=async()=>{
    try {
        const response = await roomsHook.getRooms();
        if(response!=null){
            Alert.alert('Mesas actualizados.');
        }else{
            Alert.alert('Hubo un error actualizando los parámetros.')
        }
    } catch (error) {
        
    }
    
    }
    


  return (
    <Container>
      <View style={styles.updateParamsItem}>
      <Button loading={configHook.isLoading} disabled={configHook.isLoading} title={'Actualizar Parámetros'} onPress={_updateParams}/>
      </View>
    <View  style={styles.updateParamsItem}>
    <Button loading={roomsHook.isLoading} disabled={roomsHook.isLoading} title={'Actualizar Mesas'} onPress={_updateTables}/>
    </View>
    <View  style={styles.updateParamsItem}>
    <Button loading={articlesHook.isLoading} disabled={articlesHook.isLoading} title={'Actualizar Categorías'} onPress={_updateCategories}/>
    </View>
    </Container>
  )
}

export default UpdateCatalogsScreen

const styles = StyleSheet.create({
    updateParamsItem:{
        marginVertical:Theme.sizes.BASE
    }
})