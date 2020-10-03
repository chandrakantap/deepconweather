import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from 'store/rootReducer';

import CityWeatherListPage from 'domains/cityweatherlist/components/CityWeatherListPage';
import CityWeatherDetailPage from 'domains/weatherdetail/components/CityWeatherDetailPage';
import GeoLocationAwareRedirector from 'domains/geolocation/components/GeoLocationAwareRedirector';

const middlewares = [thunk];
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

function App({ children }) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={GeoLocationAwareRedirector} />
          <Route exact path="/list" component={CityWeatherListPage} />
          <Route exact path="/detail/:cityname/:country" component={CityWeatherDetailPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
