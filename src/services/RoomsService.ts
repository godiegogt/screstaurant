import { TableType } from "../components/tables/TablesComponent";
import { IRoom } from "../features/configurations/interfaces/IRoom";
import axiosClient from "../utils/axiosClient";

const roomsService = {
  getRooms: async (): Promise<IRoom[]> => {
    try {
      const response = await axiosClient.post('/ObtenerSalones');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch rooms: ${error}`);
    }
  },
  getTables: async (SalonID:number): Promise<TableType[]> => {
    try {
      const response = await axiosClient.post('/ObtenerMesas',{SalonID});
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch tables: ${error}`);
    }
  },
  getTablesStatus: async (SalonID:number): Promise<TableType[]> => {
    try {
      const response = await axiosClient.post('/ObtenerMesasStatus',{SalonID});
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch tables: ${error}`);
    }
  },

};

export default roomsService;