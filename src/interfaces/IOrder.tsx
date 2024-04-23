export default interface IOrder{
    reservation_UUID:number
    UUID:number
    customer:number,
    state:string
    dish:IDish
}

export interface IDish{
    id:string
    name:string,
    price:number,
    amount:number
    state?:string
    variations?:Array<IModifiers>
}

export interface IModifiers{
    UUID:number
name:string
}