import { TableType } from "../../../components/tables/TablesComponent";
import { IOrder, IReservation } from "../../../interfaces";
import { IReservationRequest,Orden } from "../../../interfaces/IReservationRequest";
import { IDeleteDetailReqItem,IDeleteDetailReq } from "../interfaces/IDeleteDetailReq";

export const buildCreateOrder=(table:TableType,userid:number,termianlid:string,orders:Orden[],Comensales:number)=>{
    let order:ICreateOrder={
    MesaID: table.MesaID,
    OrdenID:table.OrdenID,
    UsuarioID: userid,
    Terminal: termianlid,
    DetalleOrden:orders,
    Comensales
    }

    return order;
}

export const buildAddOrder=(table:TableType,userid:number,termianlid:string,orders:Orden[])=>{
    let order:IAddOrder={
    MesaID: table.MesaID,
    OrdenID:table.OrdenID,
    UsuarioID: userid,
    Terminal: termianlid,
    DetallesAgregar:orders
    }

    return order;
}

export const buildDetailDelete=(OrderID:number,UserID:number,TerminalName:string,orders:IDeleteDetailReqItem[])=>{
const data:IDeleteDetailReq={
    OrdenID: OrderID,
    UsuarioID: UserID,
    Terminal: TerminalName,
    DetallesEliminar:orders
}

return data;
}