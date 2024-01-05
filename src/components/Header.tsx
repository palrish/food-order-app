import { useContext } from "react";
import Button from "./Button";
import CartContext from "../store/cartContext";
import UserProgressContext from "../store/userProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalQuantity = cartCtx.items.reduce((total, item: any) => {
    return total + item.quantity;
  }, 0);
  function cartHandler() {
    progressCtx.showCart();
  }
  return (
    <div id="main-header">
      <div id="title">
        <h1>Food Order App</h1>
      </div>
      <Button
        textOnly
        onClick={cartHandler}
      >{`Cart (${totalQuantity})`}</Button>
    </div>
  );
}
