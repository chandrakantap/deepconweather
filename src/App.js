import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from 'store/rootReducer';
import CityWeatherListPage from 'domains/cityweatherlist/components/CityWeatherListPage';

const middlewares = [thunk];
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={CityWeatherListPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
