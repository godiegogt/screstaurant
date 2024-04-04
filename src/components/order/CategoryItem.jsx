import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image, Tile } from '@rneui/themed'

import { materialTheme } from '../../constants'

const CategoryItem = ({item}) => {
    
  return (
    
    //   <Tile
    //   titleStyle={styles.container}
    //   style={styles.container}
    //       imageSrc={{
    //         uri:
    //           'https://i.pinimg.com/736x/c6/dc/94/c6dc940457e1a8e6fc55082fd10dd04c.jpg',
    //       }}
    //       title={item.name}
         
    //       featured
       
    //       activeOpacity={2}
    //       width={200}
    //     />
    <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
         <Image
            source={{ uri: 'https://i.pinimg.com/736x/c6/dc/94/c6dc940457e1a8e6fc55082fd10dd04c.jpg' }}
            containerStyle={styles.image}
            PlaceholderContent={<ActivityIndicator />}
            
          />
    </TouchableOpacity>
   
  )
}

export default CategoryItem

const styles = StyleSheet.create({
container:{
    margin:materialTheme.sizes.BASE,
    width:100,
    height:100,
    backgroundColor:materialTheme.colors.primary_light,
    flex:1,
    justifyContent:'flex-end',
    borderRadius:materialTheme.sizes.BASE/2
    
},
image: {
    aspectRatio: 1,
    width: '70%',
    flex: 1,
    opacity:0.1
  },
  text:{
    position:'absolute',
    zIndex:1000,
   
   
    fontWeight:'bold',
    alignSelf:'center',
    flex:1,
    textAlign:'center',
    paddingBottom:10,
    fontSize:materialTheme.sizes.BASE*1.2
    
  }
})