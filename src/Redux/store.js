import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import signupReducer from "./Reducer/signupReducer";
import signinReducer from "./Reducer/signinReducer";
import ProductsReducer from "./Reducer/ProductsReducer";
import cartReducer from "./Reducer/cartReducer";
import emailVerifyReducer from "./Reducer/emailverifyReducer";

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  products: ProductsReducer,
  cart:cartReducer,
  emailverify:emailVerifyReducer,
});


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
