import React, { Component } from 'react'

import { Box, Container } from '../common'

import {Text} from '../common'

import DishItem from './DishItem'
import { StyleSheet, View } from 'react-native'
import { Card } from '@rneui/themed'

import CustomersContainer from '../customers/CustomersContainer'

const dishes=[
    {
        id:'1',
name:'Cafe'
    },
    {        id:'2',
        name:'Pasta'},
    {
        id:'3',
        name:'Huevos revueltos al gusto'
    },
    {
        id:'4',
        name:'Aperitivos para compartir'
    },
    {id:'5',
    name:'Aperitivos para compartir'},
    
    {id:'6',
    name:'Aperitivos para compartir'},

    
    {id:'7',
    name:'Aperitivos para compartir'},
    {id:'8',
    name:'Aperitivos para compartir'}
,{id:'9',
name:'Aperitivos para compartir'}

,{id:'10',
name:'Aperitivos para compartir'}

,{id:'11',
name:'Aperitivos para compartir'}

,{id:'12',
name:'Aperitivos para compartir'}




]

const DishesSection =()=> {
   
  

    return (
        <Card>
            <Card.Title><Text h4  bold>Platillos</Text></Card.Title>
            <Card.Divider/>
            <View>
                <CustomersContainer/>
            </View>
         <Box row flex style={styles.container}>
         {dishes.map(item=><DishItem key={item.id} item={item} />)  }
         </Box>
      
           
        </Card>
    )
  
}

export default DishesSection

const styles=StyleSheet.create({
    container:{
        flexWrap:'wrap',
        justifyContent:'space-between'
    }
})
