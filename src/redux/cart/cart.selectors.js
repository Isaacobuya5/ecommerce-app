import { createSelector } from "reselect";

// Two types - a. input selectors, output selector
//input selector - usually takes the whole state and returns just a slice of it
const selectCart = state => state.cart;

// USING createSelectors
// takes an array of input selectors
// selectCartItems is now a memoized selector
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
