import React from 'react';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from 'store/rootReducer';

const middlewares = [thunk];
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

function App({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default App;
