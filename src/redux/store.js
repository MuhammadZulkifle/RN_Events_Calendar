import { createStore } from "redux";

import rootReducer from "./reducers/rootReducer.js";

// mount it on the Store
const store = createStore(rootReducer);

export {store};
