import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Container } from '../../components/common'
import CategorySection from '../../components/order/CategorySection'
import DishesSection from '../../components/order/DishesSection'
import OrderSection from '../../components/order/OrderSection'
import axiosClient from '../../utils/axiosClient';
import { ICategory,IArticles } from '../../interfaces/services';
import { IDish } from '../../interfaces/IOrder';

type propsOrder={

}

type stateOrder={
  categories:ICategory[],
  articles:IDish[]
categoryId:number
}

export default class OrderScreen extends Component<propsOrder,stateOrder> {
constructor(props:propsOrder){
  super(props);
  this.changeCategory = this.changeCategory.bind(this)
  this.state={
    categories:[],
    articles:[],
    categoryId:0
  }
}

  componentDidMount() {
    lor(this);
    this.loadCategories();
  }

  componentDidUpdate(prevProps:propsOrder, prevState:stateOrder) {
    if (
      prevState.categoryId!=this.state.categoryId
    ) {
     this.loadArticles(this.state.categoryId);
    }
  }

  loadCategories(){
    axiosClient.post('/ObtenerCategorias').then(res=>{
      this.setState({categories:(res.data as unknown) as ICategory[]});
    
     this.changeCategory(this.state.categories[0].CategoriaID);
     
     })
  }

  loadArticles(id:number){
    axiosClient.post('/ObtenerProductos',{CategoriaID:id}).then(res=>{
      this.setState({articles:(res.data as unknown) as IDish[]});
     
     
     })
  }

  changeCategory(id:number){
  
    this.setState({categoryId:id});
  }

  render() {



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: wp('100%') > 700 ? 'row' : 'column'

      },
      section: {

        // width: wp('100%')>450? '50%':'100%'
        flex: 1
      },
      myText: { fontSize: hp('5%') }
    });

    return (
      <Container>
        <View style={styles.container}>
          <View style={styles.section}>
            <CategorySection categories={this.state.categories} changeCategory={this.changeCategory}/>
            <DishesSection articles={this.state.articles}/>
          </View>
          <View style={styles.section}>
            <OrderSection />
          </View>
        </View>
      
      </Container>
    )
  }
}

