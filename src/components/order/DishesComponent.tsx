import React, { Component } from 'react'

import { Box, Container } from '../common'

import {Text} from '../common'

import DishItem from './DishItem'
import { StyleSheet } from 'react-native'

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

export class DishesComponent extends Component {
   
  render() {

   

    return (
        <Container title={'Platillos'}>
            <Text h2 bold>Platillos</Text>
         <Box row flex style={styles.container}>
         {dishes.map(item=><DishItem key={item.id} item={item} />)  }
         </Box>
      
           
        </Container>
    )
  }
}

export default DishesComponent

const styles=StyleSheet.create({
    container:{
        flexWrap:'wrap',
        justifyContent:'space-between'
    }
})
