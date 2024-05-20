import { FlatList, StyleSheet,  View, Text as RNText } from 'react-native'
import { Card } from '@rneui/themed'
import Text from '../common/Text'
import CategoryItem from './CategoryItem'
import { FC, useEffect, useState } from 'react'
import axiosClient from '../../utils/axiosClient'
import {ICategory} from '../../interfaces/services'

interface ICategorySection{
categories:ICategory[],
changeCategory:(id:number)=>void
}
const CategorySection:FC<ICategorySection> = ({categories,changeCategory}) => {




  return (
    <Card>
      <Card.Title><Text h4  bold>Categorias</Text></Card.Title>
      <Card.Divider/>
     
      <FlatList
        data={categories}
        // renderItem={({item}) => <CategoryItem pickRoom={setRoomSelected} roomSelected={roomSelected} key={item.title} title={item.title} />}
        renderItem={({item}) => <CategoryItem item={item} changeCategory={changeCategory} />}
        keyExtractor={item => item.CategoriaID.toString()}
        horizontal
      />
    </Card>
  )
}

export default CategorySection

const styles = StyleSheet.create({})