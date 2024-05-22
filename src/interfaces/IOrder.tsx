export default interface IOrder{
    reservation_UUID:number
    UUID:number
    customer:number,
    state:string
    dish:IDish
}

export interface IDish{
    CocinaID:number,
    ProductoID:number
    Nombre:string,
    Precio:number,
    Codigo:string,
    amount?:number
    state?:string
    variations?:Array<IModifiers>
}

export interface IModifiers{
UUID?:number
ModificadorID:number,
Nombre:string,
Pregunta:string,
Tipo:string,
Respuestas?:IRespuestaModifier[]
}


export interface IRespuestaModifier{
    RespuestaModificadorID:number,
    Nombre:string,
    Tipo:string,
    Precio:number
}


