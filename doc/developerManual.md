This application is built using React js and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

API from [weatherstack.com](https://weatherstack.com/documentation) is used to get weather dettails. So to run this app locally a valid weather stack `api_key` is required. For security reasons `api_key` is not added in the code.

# Table of Contents
1. [Run locally](#Run-locally)
2. [Unit testing](#Unit-testing)
2. [Code flow](#Code-flow)
2. [Code Structure](#Code-Structure)

## Run locally
- `yarn install` install  dependencies
- create a `.env` file in the root of project and add below line.
 `REACT_APP_WS_API_KEY=<weatherstack_api_key>`
 - `yarn start`
  runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Unit testing
- `yarn test` to run test cases
- `yarn coverage` to collect coverage report. open `coverage/lcov-report/index.html`to view coverage report.
![coverageReport](/doc/images/coverageReport.png)

## Code flow

entry is `src/index.js` which renders `App` component in `document`.

`App` component in `src/App.js` initialize the redux store and renders `GeoLocationAwareRedirector`, `CityWeatherListPage` and `CityWeatherDetailPage` in three different different route. `react-router-dom` is used to enable client side routing.

 `GeoLocationAwareRedirector` is on default route and rendered by default. This componets check for browser geo-location and redirects to `/list` route if location permission denied. Otherwise if location permission granted it direct app to `/detail~` route.

 `CityWeatherListPage` loads the city list on render and displays.

 `CityWeatherDetailPage` get current city information from route and either get the details from redux state or load, based on availavility. It enables users to `bookmark` details page URL.

 ## Code Structure
 Only discussing the content of `src` folder.

 top level folders and usage:
 * `common` - contains common ui components and utils.
 * `domains` - domains are a slice of the entire application features, having there own state and actions. These are generally very loose coupled and can be added or modified with a minimum fuss. domain names are self-explanatory and indicates the features they have. each domain have its own reducer and actions. It also provides `selectors` to extract data from the state. If any domain need to extract data from other domain's stateSlice, its recommended to use the selectors. It will prevent any future error if the domain changes it state sliceName.
 * `services` - These contains the data access layer, kept isolated behind well defined interfaces. The services can be extended easily without(or with very minimum) modification to other codes. e.g. `userNoteService.js` currently store notes in `localStorage`, it can easily be updated to communicate with a backend api.
 * `store` - contains the `rootReducer`. `rootReducer` combines all the `reducer`s from domains against the defined `sliceName`.
