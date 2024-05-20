import React, { Component } from 'react'

import { Box, Container } from '../common'

import {Text} from '../common'

import DishItem from './DishItem'
import { StyleSheet, View } from 'react-native'
import { Card } from '@rneui/themed'

import CustomersContainer from '../customers/CustomersContainer'
import { useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import { IArticles } from '../../interfaces/services'
import { IDish } from '../../interfaces/IOrder'

const dishes=[
    {
        id:'1',
name:'Cafe',
price:45.45
    },
    {        id:'2',
        name:'Pasta',
        price:45.45},
    {
        id:'3',
        name:'Huevos revueltos al gusto',
        price:45.45
    },
    {
        id:'4',
        name:'Aperitivos para compartir',
        price:45.45
    },
    {id:'5',
    name:'Aperitivos para compartir',
    price:45.45},
    
    {id:'6',
    name:'Aperitivos para compartir',
    price:45.45},

    
    {id:'7',
    name:'Aperitivos para compartir',
    price:45.45},
    {id:'8',
    name:'Aperitivos para compartir',
    price:45.45}
,{id:'9',
name:'Aperitivos para compartir',
price:45.45}

,{id:'10',
name:'Aperitivos para compartir',
price:45.45}

,{id:'11',
name:'Aperitivos para compartir',
price:45.45}

,{id:'12',
name:'Aperitivos para compartir',
price:45.45}




]

type DishesSectionProps={
    articles:IDish[]
}

const DishesSection =({articles}:DishesSectionProps)=> {
   
 const reservations = useSelector((state:IRootState) => state.reservations.reservations)

    return (
        <Card>
            <Card.Title><Text h4  bold>Platillos</Text></Card.Title>
            <Card.Divider/>
            <View>
                <CustomersContainer/>
            </View>
         <Box row flex style={styles.container}>
         {articles.map(item=><DishItem  key={item.ProductoID} item={item} />)  }
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
