export default interface IOrder{
    reservation_UUID:number
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


export interface IModifiers{
UUID?:number
ModificadorID:number,
Descripcion:string,
Pregunta?:string,
Nombre?:string,
Tipo?:string,
Precio:number,
Respuestas?:Array<IModifierResponses>|undefined
}

interface IModifierResponses{
    RespuestaModificadorID: 8,
    Nombre: string
    Tipo: string,
    Precio: 0.00,
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

