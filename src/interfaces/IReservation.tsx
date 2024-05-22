import { TableType } from '../components/tables/TablesComponent'
import {IOrder} from './'

export default interface IReservation{
    UUID:number
    room:number
    table:TableType
    state:string
    orders:Array<IOrder>
    paymentMethod?:string
    paymentType?:'UNIFICADO'|'DIVIDIDO'

}

