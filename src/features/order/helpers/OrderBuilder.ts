import { IReservation } from "../../../interfaces";
import { IDeleteDetailReqItem,IDeleteDetailReq } from "../interfaces/IDeleteDetailReq";


export const buildDetailDelete=(OrderID:number,UserID:number,TerminalName:string,orders:IDeleteDetailReqItem[])=>{
const data:IDeleteDetailReq={
    OrdenID: OrderID,
    UsuarioID: UserID,
    Terminal: TerminalName,
    DetallesEliminar:orders
}

return data;
}