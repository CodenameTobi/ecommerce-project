import { useEffect, useState } from "react"
import { Routes, Route } from "react-router"
import axios from "axios"
import HomePage from "./pages/home/HomePage"
import { CheckoutPage } from "./pages/checkout/CheckoutPage"
import { OrderPage } from "./pages/orders/OrderPage"
import { TrackingPage } from "./pages/tracking/TrackingPage"

import "./App.css"
import { Page404 } from "./pages/errors/Page404"

function App() {
    const [cart, setCart] = useState([])

    const loadCart = async () => {
        const response = await axios.get("/api/cart-items?expand=product")
        setCart(response.data)
    }

    useEffect(() => {
        loadCart()
    }, [])

    return (
        <Routes>
            <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            <Route path="/orders" element={<OrderPage cart={cart} />} />
            <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
            <Route path="*" element={<Page404 cart={cart} />} />
        </Routes>
    )
}

export default App
