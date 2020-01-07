import { combineReducers } from "redux";
// WE need to persist our reducer
import { persistReducer } from "redux-persist";
// specify the type of storage we want - local storage
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

// define a new persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"] // reducer we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer); // modified version of root reducer with persistance capabilities

// export default combineReducers({
//   user: userReducer,
//   cart: cartReducer
// });
