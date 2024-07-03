import { StyleSheet, Text, View,Dimensions, ActivityIndicator, Modal } from 'react-native'
import React from 'react'
import Theme from '../../constants/Theme'
const {width,height} = Dimensions.get("screen")
const LoaderModal = () => {
    const styles = StyleSheet.create({
        container:{
        
            backgroundColor:'rgba(0,0,0,0.3)',
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            zIndex:10000000,
        
        }
    })
  return (
    <Modal     animationType="fade"
    
  transparent={true}
      
      onRequestClose={() => {
      //   Alert.alert('Modal has been closed.');
      //   setModalVisible(!modalVisible);
      }}>
        <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Theme.colors.primary}/>
        </View>
  
    </Modal>
  )
}

export default LoaderModal

