import { FlatList, StyleSheet,  View, Text as RNText, ActivityIndicator } from 'react-native'
import { Card } from '@rneui/themed'
import Text from '../common/Text'
import CategoryItem from './CategoryItem'
import { FC, useEffect, useState } from 'react'
import {ICategory} from '../../interfaces/services'
import Theme from '../../constants/Theme'

interface ICategorySection{
categories:ICategory[],
changeCategory:(id:number)=>void,
isLoading:boolean
}
const CategorySection:FC<ICategorySection> = ({categories,changeCategory,isLoading}) => {

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.Orden < b.Orden) {
      return -1;
    }
    if (a.Orden > b.Orden) {
      return 1;
    }
    return 0;
  });


  return (
    <Card>
      <Card.Title><Text h4  bold>Categorias</Text></Card.Title>
      <Card.Divider/>

      {
        !isLoading
        ?
        <FlatList
        data={sortedCategories}
        // renderItem={({item}) => <CategoryItem pickRoom={setRoomSelected} roomSelected={roomSelected} key={item.title} title={item.title} />}
        renderItem={({item}) => <CategoryItem item={item} changeCategory={changeCategory} />}
        keyExtractor={item => item.CategoriaID.toString()}
        horizontal
      />
      :
<View style={styles.loadingSection}>
        <ActivityIndicator color={Theme.colors.primary}/>
      </View>
      }

      
     

    </Card>
  )
}

export default CategorySection

const styles = StyleSheet.create({
  loadingSection:{
    justifyContent:'center',
    alignItems:'center'
  }
})