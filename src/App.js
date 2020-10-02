import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import CityWeatherListPage from 'domains/cityweatherlist/components/CityWeatherListPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CityWeatherListPage} />
      </Switch>
    </Router>
  );
}

export default App;
