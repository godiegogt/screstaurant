export interface IDeleteDetailReq{
        OrdenID: number,
        UsuarioID: number,
        Terminal: string,
        DetallesEliminar:Array<IDeleteDetailReqItem>

}

export interface IDeleteDetailReqItem{
   
                DetalleID: number,
                 Tipo: string
          
}