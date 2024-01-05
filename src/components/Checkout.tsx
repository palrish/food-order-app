import { useContext } from "react";
import CartContext from "../store/cartContext";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../store/userProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const config = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const { data, error, isFetching, sendReq, clearData } = useHttp(
    "http://localhost:3000/orders",
    config,
    null
  );
  const totalPrice =
    Math.round(
      cartCtx.items.reduce(
        (total, item: any) => total + item.price * item.quantity,
        0
      ) * 100
    ) / 100;

  function closeCheckoutHandler() {
    progressCtx.hideCheckout();
  }

  function finishHandler() {
    cartCtx.clearCart();
    clearData();
    closeCheckoutHandler();
  }

  function formSubmitHandler(event: any) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendReq(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={closeCheckoutHandler}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isFetching) {
    actions = <span>Sending order data... </span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={progressCtx.progress === "checkout"}
        onClose={closeCheckoutHandler}
      >
        <h2>Success!!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="model-actions">
          <Button onClick={finishHandler}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={progressCtx.progress === "checkout"}
      onClose={closeCheckoutHandler}
    >
      <form onSubmit={formSubmitHandler}>
        <h2>Checkout</h2>
        <p>Total amount: ${totalPrice}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
