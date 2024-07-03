import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BLEPrinter, COMMANDS, ColumnAlignment } from 'react-native-thermal-receipt-printer-image-qrv2';
import { useSelector } from 'react-redux';
import { IRootState } from '../app/store';
import { convertDateToString, getTime } from '../utils/DatesConvert';
import { IOrder, IReservation } from '../interfaces';
import { TableType } from '../components/tables/TablesComponent';

const centerTag=['<C>','</C>'];
const jumpTag='\n';
const smallFontTag=['<D>','</D>'];
const mediumFontTag=['<M>','</M>'];
const largeFontTag=['<B>','</B>']; 
const totTextLabel="Total: Q. ";

const usePrinter = () => {
    const POSBT = useSelector((state: IRootState) => state.configuration.POSBT);
    const configuration=useSelector((state: IRootState) => state.configuration);
    const Table=useSelector((state: IRootState) => state.reservations.selectors.table);

    const [currentPrinter, setCurrentPrinter] = React.useState<any>();
    React.useEffect(() => {
      BLEPrinter.init().then(() => {
        BLEPrinter.connectPrinter(POSBT).then(
          setCurrentPrinter,
          error => console.warn(error))
      });
    }, []);
  
  
    const printPreBill = (order:IReservation) => {
  //     const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
  //     const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
  //     printHeader();
  // printDetail();
  // printPaymentDetail();
  // printSpaces()
  let text="";
  let blankSpaces=0;

  text+=centerTag[0]+"PRE-CUENTA"+centerTag[1]+jumpTag;
const date=new Date();
text+=smallFontTag[0]+"-".repeat(configuration.printerConfig.spaces)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+`Mesa: ${Table.Nombre}${" ".repeat(configuration.printerConfig.spaces-20-Table.Nombre.length)} Orden: ${Table.OrdenID}`+smallFontTag[1]+jumpTag;
//15 date, time 5
text+=smallFontTag[0]+`Fecha: ${convertDateToString(date)}${" ".repeat(configuration.printerConfig.spaces-28)}Hora: ${getTime(date)}`+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+`Mesero: ${configuration.userData.name}`+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"_".repeat(configuration.printerConfig.spaces)+smallFontTag[1]+jumpTag;
text+=itemText('#',configuration.printerConfig.amountSize,0)+itemText('Detalle',configuration.printerConfig.detailSize,0)+itemText('Subtotal',configuration.printerConfig.priceSize,0) +jumpTag;
text+=smallFontTag[0]+"_".repeat(configuration.printerConfig.spaces)+smallFontTag[1]+jumpTag;
text+=buildItemsText(order.DetalleOrden);
text+=smallFontTag[0]+"_".repeat(configuration.printerConfig.spaces)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"Subtotal:"+" ".repeat(configuration.printerConfig.spaces-(order.SubTotal?order.SubTotal?.toFixed(2).length:0)-11)+"Q."+order.SubTotal?.toFixed(2)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"Propina:"+" ".repeat(configuration.printerConfig.spaces-(order.Propina?order.Propina?.toFixed(2).length:0)-10)+"Q."+order.Propina?.toFixed(2)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"Descuento:"+" ".repeat(configuration.printerConfig.spaces-(order.Descuento?order.Descuento?.toFixed(2).length:0)-16)+"Q."+order.Descuento?.toFixed(2)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"_".repeat(configuration.printerConfig.spaces)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"Total:"+" ".repeat(configuration.printerConfig.spaces-(order.Total?order.Total?.toFixed(2).length:0)-8)+"Q."+order.Total?.toFixed(2)+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+""+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"Nombre:    "+"_____________________"+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+""+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"NIT:       "+"_____________________"+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+""+smallFontTag[1]+jumpTag;
text+=smallFontTag[0]+"Direccion: "+"_____________________"+smallFontTag[1]+jumpTag;
//console.log(text)
text=text.replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u').replace('ñ','n').replace('Á','A').replace('É','E').replace('Í','I').replace('Ó','O').replace('Ú','U').replace('Ñ','n');
BLEPrinter.printBill(text);
    }
const buildItemsText=(items:IOrder[])=>{
      let text="";
          for (let index = 0; index < items.length; index++) {
              let detailText=items[index].Descripcion;
              try {
                  text+=itemText(items[index].ComensalNo.toString(),configuration.printerConfig.amountSize,0)+itemText(detailText,configuration.printerConfig.detailSize,0)+itemText("Q."+items[index].Precio.toFixed(2),configuration.printerConfig.priceSize,2) +jumpTag;
                  text+=buildItemsTextModifiers(items[index]);
              
                } catch (error) {
                  text+=itemText(items[index].ComensalNo.toString(),configuration.printerConfig.amountSize,0)+itemText(detailText,configuration.printerConfig.detailSize,0)+itemText("Q."+items[index].Precio.toFixed(2),configuration.printerConfig.priceSize,2) +jumpTag;
              }
             // total+=items[index].SubTotal;
      
             //Print the rest of thext of detail
      
             text+=addExtraText(detailText,configuration.printerConfig.amountSize,configuration.printerConfig.detailSize,configuration.printerConfig.priceSize)
             
          }
      
          return text;
      }

      const buildItemsTextModifiers=(order:IOrder)=>{
        let text="";
            for (let index = 0; index < order.DetalleModificadores.length; index++) {
                let detailText="->"+order.DetalleModificadores[index].Descripcion;
                try {
                    text+=itemText("",configuration.printerConfig.amountSize,0)+itemText(detailText,configuration.printerConfig.detailSize,0)+itemText("Q."+order.DetalleModificadores[index].Precio.toFixed(2),configuration.printerConfig.priceSize,2) +jumpTag;
                } catch (error) {
                    text+=itemText("",configuration.printerConfig.amountSize,0)+itemText(detailText,configuration.printerConfig.detailSize,0)+itemText("Q."+order.DetalleModificadores[index].Precio.toFixed(2),configuration.printerConfig.priceSize,2) +jumpTag;
                }
               // total+=items[index].SubTotal;
        
               //Print the rest of thext of detail
        
               text+=addExtraText(detailText,configuration.printerConfig.amountSize,configuration.printerConfig.detailSize,configuration.printerConfig.priceSize)
               
            }
        
            return text;
        }

      const itemText=(parameter:string,textMustSize:number,position:number)=>{



        let text="";
        const currentSize=parameter.length;

        if(currentSize>textMustSize){
        text=parameter.substring(0, textMustSize);
        }
        else{
          //position will help to justify content
            const spacesNumber=textMustSize-currentSize;
           switch (position) {
            case 0:
              text=parameter+" ".repeat(spacesNumber);
              break;
              case 1:
                break;
           case 2:
            text=" ".repeat(spacesNumber)+parameter;
            default:
              break;
           }
            // for (let i = 0; i < spacesNumber; i++) {
            //     text=text+" ";
                
            // }
        
            // console.log("itemText",text);
        
        }
        // console.log("parameter: |",text+"|")
        return text;
        
        }
        const addExtraText=(detaltext:any,amountSize:any,detailSize:any,priceSize:any)=>{
          let text='';
             if(detaltext.length>detailSize){
                 let size=detaltext.length;
              //    console.log("Importante: "+detaltext.substring(detailSize,size))
              text+=smallFontTag[0]+itemText("",amountSize,0)+itemText(detaltext.substring(detailSize,size),detailSize+priceSize-1,0)+smallFontTag[1]+jumpTag;
              // console.log(text);
              return text;
             }else{
                 return "";
             }
             
         }
    // const printDetail=()=>{
    //   const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
    //   const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
    //   let orderList = [
    //     ["1", "Camarones al ajillo con otras cosas raras", "Q 100"],
    //     ["100", "Ceviche con un poco de pollo", "Q 95"],
    //     [
    //       "500",
    //       "Bebida fria de orchata",
    //       "Q 1000",
    //     ],
  
    //   ];
    //   let columnAlignment = [
    //     ColumnAlignment.LEFT,
    //     ColumnAlignment.CENTER,
    //     ColumnAlignment.RIGHT,
    //   ];
    //   let columnWidth = [5, 14, 10];
    //   //Print detail
    //   const header = ["Cant.", "Detalle", "Sub."];
    //   BLEPrinter.printColumnsText(header, columnWidth, columnAlignment, [
    //     `${BOLD_ON}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText(["------------------------------"], [30], [1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
  
    //   for (let index = 0; index < orderList.length; index++) {
    //     BLEPrinter.printColumnsText(orderList[index], columnWidth, columnAlignment, [
    //       `${BOLD_OFF}`,
    //       "",
    //       "",
    //     ]);
    //   }
    //    BLEPrinter.printColumnsText(["------------------------------"], [30], [1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    // }
  
    // const printHeader=()=>{
    //   const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
    //   const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
    //   BLEPrinter.printColumnsText(["PRE-CUENTA"], [30], [1], [
    //     `${BOLD_ON}`,
    //     "",
    //     "",
    //   ]);
  
    //    BLEPrinter.printColumnsText(["------------------------------"], [30], [1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
  
    //   BLEPrinter.printColumnsText(["Mesa: Mesa 1","Orden # 4952"], [15,15], [0,1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
  
    //   BLEPrinter.printColumnsText(["Fecha: 30-06-2024","Hora: 14:49"], [15,15], [0,1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText(["Mesero: ","Programador"], [15,15], [0,1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
      
    // }
  
    // const printPaymentDetail=()=>{
    //   const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
    //   const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
    //    BLEPrinter.printColumnsText(["------------------------------"], [30], [1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText(["Subtotal: ","Q 1195"], [15,15], [0,2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
  
    //   BLEPrinter.printColumnsText(["Propina: ","Q 97.50"], [15,15], [0,2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
  
    //   BLEPrinter.printColumnsText(["Descuento: ","Q 0.00"], [15,15], [0,2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //    BLEPrinter.printColumnsText(["------------------------------"], [30], [1], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText(["Total: Q 1292.50"], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    // }
  
    // const printSpaces=()=>{
    //   const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    //   BLEPrinter.printColumnsText([""], [30], [2], [
    //     `${BOLD_OFF}`,
    //     "",
    //     "",
    //   ]);
    // }

  return (
   {
    printPreBill
   }
  )
}

export default usePrinter

const styles = StyleSheet.create({})