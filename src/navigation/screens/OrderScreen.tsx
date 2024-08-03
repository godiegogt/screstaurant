import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from 'react-native-responsive-screen';
import { connect, useDispatch, useSelector } from 'react-redux';
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


const OrderScreen = () => {
  const dispatch=useDispatch();
  const [articles, setArticles] = useState<IDish[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
  const [isLoadingDishes, setIsLoadingDishes] = useState<boolean>(false);
const categories  = useSelector((state:IRootState)=>state.configuration.categories)
const numCustomers  = useSelector((state:IRootState)=>state.reservations.selectors.table.NumeroPersonas)
const haveNumCustDeninition  = useSelector((state:IRootState)=>state.configuration.customerNumberDefinided)
const OrderID  = useSelector((state:IRootState)=>state.order.currentOrder.OrdenID)
  



  useEffect(() => {
   
    return () => {
      // rol();
    };
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      loadCategories();
    } else {
      changeCategory(categories[0].CategoriaID);
    }
  }, [categories]);

  useEffect(() => {
    if (categoryId !== 0) {
      loadArticles(categoryId);
    }
  }, [categoryId]);

  const _updateCategories=(Newcategories: ICategory[]) =>{
    dispatch(updateCategories(Newcategories))

   };
  const updateCustomer=(value:number) => dispatch(updateCustomerNumberDefinition(value))

  const loadCategories = () => {
    setIsLoadingCategories(true);
    axiosClient
      .post('/ObtenerCategorias')
      .then((res) => {
        const categoriesData = res.data as ICategory[];
        _updateCategories(categoriesData);
        if (categoriesData.length > 0) {
          changeCategory(categoriesData[0].CategoriaID);
        }
        setIsLoadingCategories(false);
      })
      .catch((err) => {
        setIsLoadingCategories(false);
      });
  };

  const loadArticles = (id: number) => {
    setIsLoadingDishes(true);
    axiosClient
      .post('/ObtenerProductos', { CategoriaID: id })
      .then((res) => {
        setArticles(res.data as IDish[]);
        setIsLoadingDishes(false);
      })
      .catch((err) => {
        setIsLoadingDishes(false);
      });
  };

  const changeCategory = (id: number) => {
    setCategoryId(id);
  };

  const updateCustomerNumber = useCallback((customersNumer: number) => {
    if (customersNumer > 0) {
      console.log(`oldValue: ${haveNumCustDeninition} newValue: ${customersNumer}`);
      updateCustomer(customersNumer);
    }
  }, [haveNumCustDeninition, updateCustomer]);

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
      <ScrollView>
        <SelectNumberCustomersModal
          changeCustomersNumbers={updateCustomerNumber}
          isVisible={OrderID === '' && numCustomers === 0 && haveNumCustDeninition === 0}
        />
     
        <View style={styles.container}>
          <View style={styles.section}>
            <CategorySection categories={categories} changeCategory={changeCategory} isLoading={isLoadingCategories} />
            <CustomerSection />
            <DishesSection articles={articles} isLoading={isLoadingDishes} />
          </View>
          <View style={styles.section}>
            <OrderSection />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

// const mapStateToProps = (state: IRootState) => ({
//   categories: state.configuration.categories,
//   numCustomers: state.reservations.selectors.table.NumeroPersonas,
//   haveNumCustDeninition: state.configuration.customerNumberDefinided,
//   OrderID: state.order.currentOrder.OrdenID,
// });


export default WithScreenFocus(OrderScreen);