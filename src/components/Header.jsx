import { useState } from "react"
import { NavLink, useNavigate } from "react-router"
import SearchIcon from "../assets/images/icons/search-icon.png"
import CartIcon from "../assets/images/icons/cart-icon.png"
import WhiteLogo from "../assets/images/logo-white.png"
import WhiteMobileLogo from "../assets/images/mobile-logo-white.png"

import "./Header.css"

function Header({ cart }) {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchFor = () => {
        navigate(`/?search=${search}`)
    }

    const handleKeys = (e) => {
        const key = e.key
        if (key === "Enter") {
            searchFor()
        } else if (key === "Escape") {
            setSearch("")
            navigate(`/`)
        }
    }

    let totalQuantity = 0

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity
    })
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo" src={WhiteLogo} />
                        <img className="mobile-logo" src={WhiteMobileLogo} />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={updateSearch}
                        onKeyDown={handleKeys}
                    />

                    <button className="search-button" onClick={searchFor}>
                        <img className="search-icon" src={SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src={CartIcon} />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Header
