import { IOrder, IReservation } from "../../../interfaces";

export const calcularPrecioTotal = (orders:IReservation) => {
    let total = 0;

    orders.DetalleOrden.forEach(order => {
        // Sumar el precio del detalle
        total += order.Precio;

        // Sumar los precios de los modificadores del detalle
        order.DetalleModificadores.forEach(modifier => {
            total += modifier.Precio;
        });
    });

    return total;
};