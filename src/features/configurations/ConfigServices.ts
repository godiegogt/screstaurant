import axiosClient from "../../utils/axiosClient"

export const getParams = async () => {
    const { data, status } = await axiosClient.post('/ObtenerParametros');

    return data

}