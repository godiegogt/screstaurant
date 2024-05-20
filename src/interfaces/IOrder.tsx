export default interface IOrder{
    reservation_UUID:number
    UUID:number
    customer:number,
    state:string
    dish:IDish
}

export interface IDish{
    CocinaID:number,
    ProductoID:string
    Nombre:string,
    Precio:number,
    Codigo:string,
    amount?:number
    state?:string
    variations?:Array<IModifiers>
}

export interface IModifiers{
    UUID:number
name:string
}