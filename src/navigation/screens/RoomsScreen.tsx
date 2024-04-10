import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../../components/common/Container';
import RoomsContainer from '../../components/rooms/RoomsContainer';
import TablesComponent from '../../components/tables/TablesComponent';
import CustomersContainer from '../../components/customers/CustomersContainer';

export default class RoomsScreen extends Component {


  render() {
    return (
    
       <Container >
        <TablesComponent/>
        {/* <CustomersContainer/> */}
      </Container>
     
    )
  }
}



