import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Container, CustomerSection, LoaderModal } from '../../components/common';
import CategorySection from '../../components/order/CategorySection';
import DishesSection from '../../components/order/DishesSection';
import OrderSection from '../../components/order/OrderSection';
import axiosClient from '../../utils/axiosClient';
import { ICategory } from '../../interfaces/services';
import { IDish } from '../../interfaces/IOrder';
import WithScreenFocus from '../../components/order/OrderScreenWrapper';
import { AppDispatch, IRootState } from '../../app/store';
import { updateCategories, updateCustomerNumberDefinition } from '../../features/configurations/configurationSlice';
import SelectNumberCustomersModal from '../../components/order/SelectNumerCustomersModal';

type Props = {
  Isloading: boolean;
  categories: ICategory[];
  updateCategories: (categories: ICategory[]) => void;
  numCustomers: number,
  updateCustomer:(value:number) => void;
  haveNumCustDeninition:number;
  OrderID:string 
  

};

type State = {
  articles: IDish[];
  categoryId: number;
  isLoadingCategories: boolean;
  isLoadingDishes: boolean;
};

class OrderScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.changeCategory = this.changeCategory.bind(this);
    this.updateCustomerNumber = this.updateCustomerNumber.bind(this); // Bind the method
    this.state = {
      articles: [],
      categoryId: 0,
      isLoadingCategories: false,
      isLoadingDishes: false,
    };
  }

  componentDidMount() {
    lor(this);
    if (this.props.categories.length === 0) {
      this.loadCategories();
    } else {
      this.changeCategory(this.props.categories[0].CategoriaID);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.categoryId !== this.state.categoryId) {
      this.loadArticles(this.state.categoryId);
    }
  }


  loadCategories() {
    this.setState({ isLoadingCategories: true });
    axiosClient.post('/ObtenerCategorias').then(res => {
      const categories = res.data as ICategory[];
      this.props.updateCategories(categories);
      if (categories.length > 0) {
        this.changeCategory(categories[0].CategoriaID);
      }
      this.setState({ isLoadingCategories: false });
    }).catch(err => {
      this.setState({ isLoadingCategories: false });
    });
  }

  loadArticles(id: number) {
    this.setState({ isLoadingDishes: true });
    axiosClient.post('/ObtenerProductos', { CategoriaID: id }).then(res => {
      this.setState({ articles: res.data as IDish[] });
      this.setState({ isLoadingDishes: false });
    }).catch(err => {
      this.setState({ isLoadingDishes: false });
    });
  }

  changeCategory(id: number) {
    this.setState({ categoryId: id });
  }

  updateCustomerNumber(customersNumer:number){
   if(customersNumer>0){
    console.log(`oldValue: ${this.props.haveNumCustDeninition} newValue: ${customersNumer}`)
    this.props.updateCustomer(customersNumer);
   }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: wp('100%') > 700 ? 'row' : 'column',
      },
      section: {
        flex: 1,
      },
      myText: { fontSize: hp('5%') },
    });


    return (
      <Container>
        <SelectNumberCustomersModal changeCustomersNumbers={this.updateCustomerNumber} isVisible={this.props.OrderID=="" && this.props.numCustomers==0 && this.props.haveNumCustDeninition==0} />
        {this.props.Isloading && <LoaderModal />}
        <View style={styles.container}>
          <View style={styles.section}>
            <CategorySection categories={this.props.categories} changeCategory={this.changeCategory} isLoading={this.state.isLoadingCategories} />
            <CustomerSection />
            <DishesSection articles={this.state.articles} isLoading={this.state.isLoadingDishes} />
          </View>
          <View style={styles.section}>
            <OrderSection />
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  categories: state.configuration.categories,
  numCustomers: state.reservations.selectors.table.NumeroPersonas,
  haveNumCustDeninition:state.configuration.customerNumberDefinided,
  OrderID:state.order.currentOrder.OrdenID

});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateCategories: (categories: ICategory[]) => dispatch(updateCategories(categories)),
  updateCustomer:(value:number) => dispatch(updateCustomerNumberDefinition(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WithScreenFocus(OrderScreen));