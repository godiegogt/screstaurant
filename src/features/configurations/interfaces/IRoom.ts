import { TableType } from "../../../components/tables/TablesComponent";


export interface IRoom{
    Name:string,
    SalonID:number,
    tables :Array<TableType>
}