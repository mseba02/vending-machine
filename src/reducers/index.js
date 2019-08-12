// imports
import { combineReducers } from 'redux';
import { productsReducer } from "./products";

// combine reducers
const rootReducer = combineReducers({
  data: productsReducer
});

export default rootReducer;
