import { diffieHellman } from "crypto";
import { createContext, useReducer } from "react";
import { ExitStatus } from "typescript";

const CartContext = createContext({
  items: [],
  addItem: (item: any) => {},
  removeItem: (id: any) => {},
  clearCart: () => {},
});

function cartReducer(state: any, action: any) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingItemIndex = updatedItems.findIndex(
      (item: any) => item.id === action.item.id
    );
    if (existingItemIndex === -1) {
      updatedItems.push({ ...action.item, quantity: 1 });
    } else {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];
    const existingItemIndex = updatedItems.findIndex(
      (item: any) => item.id === action.id
    );
    const existingItem = updatedItems[existingItemIndex];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }: any) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  function addItem(item: any) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id: any) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
