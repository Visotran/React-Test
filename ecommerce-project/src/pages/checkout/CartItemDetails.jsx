import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function CartItemDetails({cartItem, deleteCartItem, loadCart}) {
  const [isQuantityUpdating, setIsQuantityUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (isQuantityUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      });
      await loadCart();
    }
    setIsQuantityUpdating(!isQuantityUpdating);
  }

  return (
    <>
      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            <input
              className="update-quantity-input" type="text"
              style={{display: isQuantityUpdating? 'initial' : 'none'}} 
              value={quantity} 
              onChange={(event) => setQuantity(event.target.value)} 
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  updateQuantity();
                } else if (event.key === 'Escape') {
                  setQuantity(cartItem.quantity);
                  setIsQuantityUpdating(false);
                }
              }}
            />
            <span className="quantity-label">{cartItem.quantity}</span>
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