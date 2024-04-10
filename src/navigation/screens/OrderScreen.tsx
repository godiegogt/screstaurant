import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

import { Container } from '../../components/common'
import OrderContainer from '../../components/order/OrderContainer'
import CategorySection from '../../components/order/CategorySection'
import DishesSection from '../../components/order/DishesSection'
import OrderSection from '../../components/order/OrderSection'

export default class OrderScreen extends Component {


  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {

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
            <CategorySection />
            <DishesSection />
          </View>

          <View style={styles.section}>
            <OrderSection />
          </View>
        </View>
      
      </Container>
    )
  }
}

