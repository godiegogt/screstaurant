import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, ButtonGroup, Card } from '@rneui/themed'
import { Text } from '../common'
import OrderComponent from '../order/OrderComponent'
import { materialTheme } from '../../constants'
import OrderVariationModalCustomerContainer from '../order/OrderVariationModalCustomerContainer'

import {
  BLEPrinter,
  ColumnAlignment,
  PrinterOptions,
  COMMANDS

} from "react-native-thermal-receipt-printer-image-qrv2";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../app/store'
import BillComponent from './BillComponent'
import CustomersContainer from '../customers/CustomersContainer'
import { updatePaymentType } from '../../features/reservation/reservationSlice'

const BillSection = () => {
 const dispatch = useDispatch()
  const POSBT = useSelector((state: IRootState) => state.configuration.POSBT)
  const [billingType, setBillingType] = useState(0);
  const [currentPrinter, setCurrentPrinter] = React.useState<any>();
  React.useEffect(() => {
    BLEPrinter.init().then(() => {
      BLEPrinter.connectPrinter(POSBT).then(
        setCurrentPrinter,
        error => console.warn(error))
    });
  }, []);


  const print = () => {
    const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
    const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
    let orderList = [
      ["1", "Camarones al ajillo con otras cosas raras", "Q 100"],
      ["100", "Ceviche con un poco de pollo", "Q 95"],
      [
        "500",
        "Bebida fria de orchata",
        "Q 1000",
      ],

    ];
    let columnAlignment = [
      ColumnAlignment.LEFT,
      ColumnAlignment.CENTER,
      ColumnAlignment.RIGHT,
    ];
    let columnWidth = [5, 14, 10];
    const header = ["Cant.", "Detalle", "Sub."];
    BLEPrinter.printColumnsText(header, columnWidth, columnAlignment, [
      `${BOLD_ON}`,
      "",
      "",
    ]);
    for (let i in orderList) {
      BLEPrinter.printColumnsText(orderList[i], columnWidth, columnAlignment, [
        `${BOLD_OFF}`,
        "",
        "",
      ]);
    }
    BLEPrinter.printBill(`${ColumnAlignment.CENTER}Thank you\n`);
  }


  return (
    <Card containerStyle={styles.BillSectionContainer}>
      <Card.Title><Text h4 bold>Orden</Text></Card.Title>
      <Card.Divider />
      <BillComponent billingType={billingType}/>
      <Card.Divider />
      <ButtonGroup
        buttons={['UNIFICADO', 'SEPARADO']}
        selectedIndex={billingType}
        onPress={(value) => {
          setBillingType(value);
        
          dispatch(updatePaymentType(value==0?'UNIFICADO':'DIVIDIDO'))

        }}
        containerStyle={{ marginBottom: 20 }}
      />
{
billingType==1&&<CustomersContainer />
}
      
        
      
      <Button onPress={print}>Imprimir precuenta</Button>
    </Card>
  )
}

export default BillSection

const styles = StyleSheet.create({
  BillSectionContainer: {
    marginBottom: materialTheme.sizes.BASE
  }
})