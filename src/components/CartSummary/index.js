import {useState} from 'react'
import Popup from 'reactjs-popup'
import {IoIosClose} from 'react-icons/io'

import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const paymentMethodList = [
  {id: 'credit-or-debit-card', displayText: 'Credit or debit card'},
  {id: 'net-banking', displayText: 'Net Banking'},
  {id: 'upi', displayText: 'UPI'},
  {id: 'wallet', displayText: 'Wallet'},
  {id: 'cash-on-delivery', displayText: 'Cash on Delivery'},
]

const CartSummary = () => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderConfirmed, setOrderConfirmation] = useState(false)
  const deliveryCharge = 0

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })
        const onClickPaymentMethod = event =>
          setPaymentMethod(event.target.value)
        const onClickOrderConfirm = () => {
          if (paymentMethod !== '') {
            setOrderConfirmation(true)
          }
        }
        const renderPopupContainer = closePopup => (
          <div className="popup-container">
            <button
              type="button"
              className="close-popup-btn"
              onClick={() => closePopup()}
              aria-label="close-popup-btn"
            >
              <IoIosClose className="close-popup-icon" />
            </button>
            <div>
              <p className="confirm-order-popup-headings">Payment Methods</p>
              <ul className="payment-methods-list">
                {paymentMethodList.map(eachItem => (
                  <li key={eachItem.id} className="payment-methods-list-item">
                    <input
                      type="radio"
                      id={eachItem.id}
                      name="payment-methods"
                      className="payment-methods-input"
                      value={eachItem.displayText}
                      disabled={eachItem.id !== 'cash-on-delivery'}
                      onClick={onClickPaymentMethod}
                    />
                    <label htmlFor={eachItem.id} className="payment-methods">
                      {eachItem.displayText}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="confirm-order-popup-headings">Order Summery:</p>
              <div className="order-summary-items">
                <p className="order-summary-headings">Items:</p>
                <p className="order-summary-info">{cartList.length}</p>
              </div>
              <div className="order-summary-items">
                <p className="order-summary-headings">Subtotal:</p>
                <p className="order-summary-info">{`Rs ${total}`}</p>
              </div>
              <div className="order-summary-items">
                <p className="order-summary-headings">Delivery:</p>
                <p className="order-summary-info">{`Rs ${deliveryCharge}`}</p>
              </div>
              <div className="order-summary-items order-total-container">
                <p className="order-summary-headings order-summary-total-headings">
                  Order Total:
                </p>
                <p className="order-summary-info order-summary-total-info">{`Rs ${
                  total + deliveryCharge
                }`}</p>
              </div>
            </div>
            {isOrderConfirmed && (
              <p className="conformation-message">
                Your order has been placed successfully
              </p>
            )}
            <button
              type="button"
              className="checkout-button conformation-btn"
              onClick={onClickOrderConfirm}
              disabled={paymentMethod !== 'Cash on Delivery'}
            >
              Confirm Order
            </button>
          </div>
        )

        return (
          <>
            <div className="cart-summary-container">
              <div className="cart-summary-content">
                <h1 className="order-total-value">
                  <span className="order-total-label">Order Total:</span> Rs{' '}
                  {total}
                  /-
                </h1>
                <p className="total-items">{cartList.length} Items in cart</p>
              </div>
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button d-sm-none">
                    Checkout
                  </button>
                }
              >
                {closePopup => <>{renderPopupContainer(closePopup)}</>}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
