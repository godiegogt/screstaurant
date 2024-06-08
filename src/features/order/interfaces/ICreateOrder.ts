interface ICreateOrder{
    MesaID: number,
    UsuarioID: number,
    Terminal: string,
      DetalleOrden:Array<IDetailOrderItem>
}

interface IDetailOrderItem {
    ProductoID: number,
    Cantidad: number,
    Precio: number,            
    Descripcion: string,            
    ComensalNo: number,
    DetalleModificadores:Array<IDetailModifierItem>
}

interface IDetailModifierItem{
    ModificadorID: number,
    Descripcion: string,            
    Precio: number
    
}