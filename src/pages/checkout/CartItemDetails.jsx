import axios from "axios"
import { useState } from "react"
import { formatMoney } from "../../utils/money"

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdating, setIsUpdating] = useState(false)
    const [quantity, setQuantity] = useState(cartItem.quantity)

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        await loadCart()
    }

    const updateQuantity = async () => {
        if (isUpdating) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity),
            })
            await loadCart()
        }
        setIsUpdating(!isUpdating)
    }

    const changeQuantity = (e) => {
        const text = e.target.value
        setQuantity(text)
    }

    const handleKeys = (e) => {
        const key = e.key
        if (key === "Enter") {
            updateQuantity()
        } else if (key === "Escape") {
            setQuantity(cartItem.quantity)
            setIsUpdating(false)
        }
    }

    return (
        <>
            <img className="product-image" src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                <div className="product-quantity">
                    <span>
                        Quantity:{" "}
                        {isUpdating ? (
                            <input
                                type="text"
                                className="quantity-input"
                                value={quantity}
                                onChange={changeQuantity}
                                onKeyDown={handleKeys}
                            />
                        ) : (
                            <span className="quantity-label">{cartItem.quantity}</span>
                        )}
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}
