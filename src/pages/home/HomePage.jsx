import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import axios from "axios"
import Header from "../../components/Header"
import { ProductsGrid } from "./ProductsGrid"

import "./HomePage.css"

function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams()
    const search = searchParams.get("search")

    useEffect(() => {
        const fetchHomeData = async () => {
            const url = search ? `/api/products?search=${search}` : "/api/products"
            const response = await axios.get(url)
            setProducts(response.data)
        }

        fetchHomeData()
    }, [search])

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <title>ECommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}

export default HomePage
