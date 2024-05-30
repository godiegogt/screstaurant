import { IDish, IModifiers } from "../../interfaces/IOrder";

export interface IOrderR{
    reservation_UUID:number,
    order_UUID:number,
    UUID:number
    ComensalNo:number,
    state:string
    CocinaID?:number,
    ProductoID:number
    Descripcion:string,
    Precio:number,
    Cantidad:number
    DetalleModificadores:Array<IModifiers>|[]
}