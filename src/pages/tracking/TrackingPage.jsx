import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import dayjs from "dayjs"
import Header from "../../components/Header"

import "./TrackingPage.css"

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }

        fetchTrackingData()
    }, [orderId])

    if (!order) {
        return null
    }

    const orderProduct = order.products.find((product) => {
        return product.productId === productId
    })

    if (!orderProduct) {
        return null
    }

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100
    deliveryPercent = deliveryPercent > 100 ? 100 : deliveryPercent
    // deliveryPercent = 50; // For testing.
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <title>Track Orders</title>

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent < 100 ? "Arriving" : "Delivered"} on Monday,{" "}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
                    </div>

                    <div className="product-info">{orderProduct.product.name}</div>

                    <div className="product-info">Quantity: {orderProduct.quantity}</div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label${deliveryPercent < 33 ? " current-status" : ""}`}>Preparing</div>
                        <div className={`progress-label${deliveryPercent >= 33 && deliveryPercent < 100 ? " current-status" : ""}`}>
                            Shipped
                        </div>
                        <div className={`progress-label${deliveryPercent === 100 ? " current-status" : ""}`}>Delivered</div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
