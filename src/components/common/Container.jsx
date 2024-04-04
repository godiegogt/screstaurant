import { ScrollView, StyleSheet,  View } from 'react-native'
import React from 'react'
import Text from './TextComponent'
import { materialTheme } from '../../constants'

const Container = ({title,children}) => {
  return (
    <ScrollView style={styles.container}>
    
     {
      children
     }
    </ScrollView>
  )
}

export default Container

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      paddingHorizontal:materialTheme.sizes.padding_screen/2,
    }
})