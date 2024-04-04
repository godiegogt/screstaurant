import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import { Container } from '../common'
import CustomersContainer from '../customers/CustomersContainer'
import CategoryComponent from './CategoryComponent'
import DishesComponent from './DishesComponent'

export default class OrderContainer extends Component {
  render() {
    return (
      <ScrollView>
       <CategoryComponent/>
       <DishesComponent/>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
