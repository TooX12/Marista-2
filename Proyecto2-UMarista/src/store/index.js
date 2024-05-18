import { createStore } from "redux";

import rootReducers from "./reducers/idex";

export const store = createStore(rootReducers);