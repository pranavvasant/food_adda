import { applyMiddleware,createStore } from "redux";
import thunk from "redux-thunk";
import foodRedcer from "../reducers";

const store = createStore(foodRedcer,applyMiddleware(thunk))
export default store