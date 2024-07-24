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
import { ICategory, IArticles } from '../../interfaces/services';
import { IDish } from '../../interfaces/IOrder';
import WithScreenFocus from '../../components/order/OrderScreenWrapper';
import { AppDispatch, IRootState } from '../../app/store';
import { updateCategories } from '../../features/configurations/configurationSlice';

type Props = {
  Isloading: boolean;
  categories: ICategory[];
  updateCategories: (categories: ICategory[]) => void;
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

  componentWillUnmount() {
    rol();
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
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateCategories: (categories: ICategory[]) => dispatch(updateCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithScreenFocus(OrderScreen));