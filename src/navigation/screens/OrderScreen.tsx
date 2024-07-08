import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Container, CustomerSection, LoaderModal } from '../../components/common'
import CategorySection from '../../components/order/CategorySection'
import DishesSection from '../../components/order/DishesSection'
import OrderSection from '../../components/order/OrderSection'
import axiosClient from '../../utils/axiosClient';
import { ICategory,IArticles } from '../../interfaces/services';
import { IDish } from '../../interfaces/IOrder';
import WithScreenFocus from '../../components/order/OrderScreenWrapper';

type propsOrder={
 Isloading:boolean
}

type stateOrder={
  categories:ICategory[],
  articles:IDish[]
categoryId:number,
isLoadingCategories:boolean,
isLoadingDishes:boolean
}

class OrderScreen extends Component<propsOrder,stateOrder> {

constructor(props:propsOrder){
  super(props);
  this.changeCategory = this.changeCategory.bind(this)
  this.state={
    categories:[],
    articles:[],
    categoryId:0,
    isLoadingCategories:false,
    isLoadingDishes:false
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
    this.setState({isLoadingCategories:true});
    axiosClient.post('/ObtenerCategorias').then(res=>{
      this.setState({categories:(res.data as unknown) as ICategory[]});
     this.changeCategory(this.state.categories[0].CategoriaID);
     this.setState({isLoadingCategories:false});
     
     }).catch(err=>{
      this.setState({isLoadingCategories:false});
     })
  }

  loadArticles(id:number){
    this.setState({isLoadingDishes:true});
    axiosClient.post('/ObtenerProductos',{CategoriaID:id}).then(res=>{
      this.setState({articles:(res.data as unknown) as IDish[]});
      this.setState({isLoadingDishes:false});
     
     }).catch(err=>{
      this.setState({isLoadingDishes:false});
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
      {
        this.props.Isloading
        &&
        <LoaderModal/>
      }
        <View style={styles.container}>
          <View style={styles.section}>
            <CategorySection categories={this.state.categories} changeCategory={this.changeCategory} isLoading={this.state.isLoadingCategories}/>
            <DishesSection articles={this.state.articles} isLoading={this.state.isLoadingDishes}/>
            <CustomerSection/>
          </View>
          <View style={styles.section}>
            <OrderSection />
          </View>
        </View>
      
      </Container>
    )
  }
}

export default  WithScreenFocus(OrderScreen)