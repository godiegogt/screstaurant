import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Container, Text } from '../common'
import CustomerItem from './CustomerItem'

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
      < >
          <Text h2 bold>Comensal</Text> 
          <View style={styles.container}>
          {
        tables.map(item=><CustomerItem key={item.title} item={item} pickCustomer={this.pickCustomer} customerSelected={this.state.customerSelected}/>)
       }
          </View>
     
      </>
    )
  }
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    

    }
})



export default CustomersContainer
