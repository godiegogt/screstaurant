interface IReservationRequest{
    MesaID:number,
    UsuarioID:number,
    Terminal:string,
    DetalleOrden:Array<Orden>
}

interface Orden{
    ProductoID:number,
    Cantidad:number,
    Precio:number,
    Descripcion:string,
    ComensalNo:number,
    DetalleModificadores:Array<Modificador>
}

interface Modificador{
    ModificadorID:number,
    Descripcion:string,
    Precio:number
}