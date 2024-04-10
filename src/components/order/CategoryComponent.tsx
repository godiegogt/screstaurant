import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Container } from '../common'
import CustomersContainer from '../customers/CustomersContainer'
import {TextComponent as Text} from '../common'
import CategoryItem from './CategoryItem'

const categories=[
    {
        id:'1',
name:'Bebidas'
    },
    {        id:'2',
        name:'Platos FUertes'},
    {
        id:'3',
        name:'Desayunos'
    },
    {
        id:'4',
        name:'Aperitivos'
    }

]

export class CategoryComponent extends Component {
  render() {
    return (
        <Container >
            <Text h2 bold>Categorías</Text>
           
            <FlatList
        data={categories}
        // renderItem={({item}) => <CategoryItem pickRoom={setRoomSelected} roomSelected={roomSelected} key={item.title} title={item.title} />}
        renderItem={({item}) => <CategoryItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
      />
           
        </Container>
    )
  }
}

export default CategoryComponent
