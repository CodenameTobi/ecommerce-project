import { OrderProduct } from './OrderProduct'

export function OrderDetailsGrid({ order, loadCart }) {

    return (
        <div className="order-details-grid">
            {order.products.map((orderProduct, index) => {
                return (
                    <OrderProduct key={index} order={order} orderProduct={orderProduct} loadCart={loadCart} />
                )
            })}
        </div>
    )
}
