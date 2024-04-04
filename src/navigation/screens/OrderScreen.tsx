import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Container } from '../../components/common'
import OrderContainer from '../../components/order/OrderContainer'

export default class OrderScreen extends Component {
  render() {
    return (
      <Container title={'Orden'}>
        <OrderContainer/>
      </Container>
    )
  }
}

const styles = StyleSheet.create({})