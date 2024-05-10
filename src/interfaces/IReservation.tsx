import {IOrder} from './'

export default interface IReservation{
    UUID:number
    room:number
    table:number
    state:string
    orders:Array<IOrder>
    paymentMethod?:string
    paymentType?:'UNIFICADO'|'DIVIDIDO'

}

