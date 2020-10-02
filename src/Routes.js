import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import CityWeatherListPage from 'domains/cityweatherlist/components/CityWeatherListPage';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={CityWeatherListPage} />
                <Route exact path="/list" component={CityWeatherListPage} />
            </Switch>
        </Router>
    );
}