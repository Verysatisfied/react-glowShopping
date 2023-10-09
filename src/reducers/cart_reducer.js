import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, product } = action.payload;

    // It checks if an item with the same id already exists in the cart
    const tempItem = state.cart.find((item) => item.id === id);

    if (tempItem) {
      // If an item with the same id exists, update its quantity
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount;
          // Check if the new quantity exceeds the product's stock
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      // If no item with the same id exists, add a new item to the cart
      const newItem = {
        id,
        name: product.title,
        amount,
        image: product.images[0],
        price: product.price,
        max: product.stock,
      };

      // Copy the old cart's content and add the new item to it
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    // Use the filter method to create a new cart array without the item to be removed
    const updatedCart = state.cart.filter((item) => item.id !== action.payload);

    // Return the updated state with the new cart array
    return { ...state, cart: updatedCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const updatedCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount <= 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: updatedCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_amount, total_items };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
