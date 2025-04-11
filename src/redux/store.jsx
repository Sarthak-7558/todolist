import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk"; // ✅ default import (not destructured)

import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
