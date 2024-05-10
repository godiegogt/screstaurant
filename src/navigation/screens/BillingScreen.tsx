import { StyleSheet, Text, View } from 'react-native'
import { Container } from '../../components/common'
import { BillSection, BillingSection } from '../../components/bill'


const BillScreen = () => {
  return (
    <Container>
      <BillSection/>
      <BillingSection/>
    </Container>
  )
}

export default BillScreen

const styles = StyleSheet.create({})