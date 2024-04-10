import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome5";
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
       
         {/* <Image
            source={{ uri: 'https://i.pinimg.com/736x/c6/dc/94/c6dc940457e1a8e6fc55082fd10dd04c.jpg' }}
            containerStyle={styles.image}
            PlaceholderContent={<ActivityIndicator />}
            
          /> */}
          <View>
          <Icon
              size={50}
              name={item.icon}
              solid
              color={'#fff'}
            />
          </View>
             <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
   
  )
}

export default CategoryItem

const styles = StyleSheet.create({
container:{
    margin:materialTheme.sizes.BASE/2,
    width:80,
    height:80,
    backgroundColor:materialTheme.colors.primary,
    flex:1,
    borderRadius:materialTheme.sizes.BASE/2,
    justifyContent:'center',
    alignItems:'center'
    
},
image: {
    aspectRatio: 1,
    width: '70%',
    flex: 1,
    opacity:0.1
  },
  icon:{

  },
  text:{
   
   
    fontWeight:'bold',
    alignSelf:'center',
 
    textAlign:'center',
    paddingBottom:10,
    fontSize:12,
    color:'#fff'
    
  }
})