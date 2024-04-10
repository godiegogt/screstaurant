import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Text } from '../common'
import CustomerItem from './CustomerItem'
import { materialTheme } from '../../constants'

const tables=[
  {
    title:'1',
    reserved:false,

  },
  {
    title:'2',
    reserved:false,

  },
  {
    title:'3',
    reserved:false,

  },
  {
    title:'4',
    reserved:false,

  }
]

type CustomersContainerState={
    customerSelected:string
}

export class CustomersContainer extends Component<{},CustomersContainerState> {
    constructor(props:any) {
        super(props);
        this.state = {customerSelected:''};
      }

       pickCustomer = (customerid:string) => {  
        this.setState({ customerSelected: customerid});
      }

  render() {
    return (
      <View style={styles.container}>
         
          <View style={styles.container}>
          {
        tables.map(item=><CustomerItem key={item.title} item={item} pickCustomer={this.pickCustomer} customerSelected={this.state.customerSelected}/>)
       }
          </View>
     
      </View>
    )
  }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-end',
    marginVertical:materialTheme.sizes.BASE/3
   
    

    }
})



export default CustomersContainer
