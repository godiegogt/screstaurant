import axiosClient from "../../utils/axiosClient"

export const getParams = async () => {
    const { data, status } = await axiosClient('/ObtenerParametros');

    return data

}