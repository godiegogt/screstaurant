import { TableType } from '../components/tables/TablesComponent'
import {IOrder} from './'

export default interface IReservation{
    UUID:number
    room:number
    table:TableType,
    MesaID:number,
    state:string
    DetalleOrden:Array<IOrder>
    paymentMethod?:string
    paymentType?:'UNIFICADO'|'DIVIDIDO'
    UsuarioID?:number,
    Terminal:string,
    OrdenID?:string,
    CodigoError?: number,
    DescripcionError?: string,
    Total?: number,
    SubTotal?:number,
    Propina?:number,
    Descuento?:number
    

}

