import  { Component } from 'react'
import Container from '../../components/common/Container';

import TablesComponent from '../../components/tables/TablesComponent';


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



