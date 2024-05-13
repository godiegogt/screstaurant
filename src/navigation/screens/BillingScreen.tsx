
import React, { Component } from 'react'

import { Container } from '../../components/common'
import { BillSection, BillingSection } from '../../components/bill'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export class BillingScreen extends Component {

  componentDidMount() {
    lor(this);
  }
  componentWillUnmount() {
    rol();
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
            <BillSection />
          </View>
          <View style={styles.section}>
            <BillingSection />
          </View>
        </View>
      </Container>
    )
  }
}

export default BillingScreen
