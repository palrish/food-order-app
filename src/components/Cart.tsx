import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/cartContext";
import Button from "./Button";
import UserProgressContext from "../store/userProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalPrice =
    Math.round(
      cartCtx.items.reduce(
        (total, item: any) => total + item.price * item.quantity,
        0
      ) * 100
    ) / 100;

  function cartCloseHandler() {
    progressCtx.hideCart();
  }
  function showCheckoutHandler() {
    progressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={progressCtx.progress === "cart"}
      onClose={progressCtx.progress === "cart" ? cartCloseHandler : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item: any) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">${totalPrice}</p>
      <p className="modal-actions">
        <Button textOnly onClick={cartCloseHandler}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={showCheckoutHandler}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
