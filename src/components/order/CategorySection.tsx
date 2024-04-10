import { FlatList, StyleSheet,  View, Text as RNText } from 'react-native'
import React from 'react'
import { Card } from '@rneui/themed'
import Text from '../common/Text'
import CategoryItem from './CategoryItem'
const categories=[
    {
        id:'1',
name:'Comida rapida',
icon:'hamburger'
    },
    {        id:'2',
        name:'Postres',
        
        icon:'ice-cream'},
        
    {
        id:'3',
        name:'Comida green',
        icon:'seedling'
    },
    {
        id:'4',
        name:'Botanas',
        icon:'hotdog'
    }

]
const CategorySection = () => {
  return (
    <Card>
      <Card.Title><Text h4  bold>Categoria</Text></Card.Title>
      <Card.Divider/>
     
      <FlatList
        data={categories}
        // renderItem={({item}) => <CategoryItem pickRoom={setRoomSelected} roomSelected={roomSelected} key={item.title} title={item.title} />}
        renderItem={({item}) => <CategoryItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
      />
    </Card>
  )
}

export default CategorySection

const styles = StyleSheet.create({})