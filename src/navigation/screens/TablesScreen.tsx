import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Container } from '../../components/common'
import TableContainer from '../../components/tables/TablesComponent'

export class TablesScreen extends Component {
  render() {
    return (
      <Container title={'Seleccionar una mesa'}>
       <TableContainer/>
      </Container>
    )
  }
}

export default TablesScreen