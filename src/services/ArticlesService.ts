
import { ICategory } from "../interfaces/services";
import axiosClient from "../utils/axiosClient";

const articlesService = {
  getCategories: async (): Promise<ICategory[]> => {
    try {
      const response = await axiosClient.post('/ObtenerCategorias');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error}`);
    }
  }

};

export default articlesService;