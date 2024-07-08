import React, { Component } from 'react'

import { Box, Container } from '../common'

import {Text} from '../common'

import DishItem from './DishItem'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Card } from '@rneui/themed'

import CustomersContainer from '../customers/CustomersContainer'
import { IDish } from '../../interfaces/IOrder'
import Theme from '../../constants/Theme'



type DishesSectionProps={
    articles:IDish[],
    isLoading:boolean
}

const DishesSection =({articles,isLoading}:DishesSectionProps)=> {
   
 //const reservations = useSelector((state:IRootState) => state.reservations.reservations)

    return (
        <Card>
            <Card.Title><Text h4  bold>Platillos</Text></Card.Title>
            <Card.Divider/>

         <Box row flex center style={styles.container}>
         {
            !isLoading
            ?
            articles.map(item=><DishItem  key={item.ProductoID} item={item} />)  
            :
            <View style={styles.loadingSection}>
        <ActivityIndicator color={Theme.colors.primary}/>
      </View>
         }
         </Box>
      
           
        </Card>
    )
  
}

export default DishesSection

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexWrap:'wrap',
        justifyContent:'flex-start'
    },
    loadingSection:{
        justifyContent:'center',
        alignItems:'center'
      }
})
