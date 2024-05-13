import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import {  Text } from '../common'
import TableItem from './TableItem'
import { Card } from '@rneui/themed'
import PageNavigator from '../common/PageNavigator'

const tables=[
  {
    title:'1',
    reserved:false,

  },
  {
    title:'2',
    reserved:false,

  },
  {
    title:'3',
    reserved:false,

  },
  {
    title:'4',
    reserved:false,

  },
  {
    title:'5',
    reserved:false,

  },
  {
    title:'6',
    reserved:false,

  },
  {
    title:'7',
    reserved:false,

  },
  {
    title:'8',
    reserved:false,

  }
  ,
  {
    title:'9',
    reserved:false,

  }
  ,
  {
    title:'10',
    reserved:false,

  }
  ,
  {
    title:'11',
    reserved:false,

  }
  ,
  {
    title:'12',
    reserved:false,

  }
  ,
  {
    title:'13',
    reserved:false,

  }
]

const TablesComponent=()=> {
  
    return (
      <Card>
          <Card.Title><Text h4  bold>Mesas</Text></Card.Title>
          <Card.Divider />
          <PageNavigator/>
          <View style={styles.container}>
          {
        tables.map(table=><TableItem key={table.title} item={table}/>)
       }
          </View>
     
      </Card>
    )
  
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    

    }
})



export default TablesComponent
