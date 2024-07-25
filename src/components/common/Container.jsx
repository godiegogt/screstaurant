import { ScrollView, StyleSheet,  View } from 'react-native'
import React from 'react'
import Text from './TextComponent'
import { materialTheme } from '../../constants'

const Container = ({children}) => {
  return (
    <View style={styles.container}>
    
     {
      children
     }
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      padding:materialTheme.sizes.padding_screen/2,
    }
})