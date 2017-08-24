import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import createStore from "./store/createStore";
import { IntlProvider } from "react-intl";
import routeFactory from "./routes";
import AppContainer from "./containers/AppContainer"

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

let routes = routeFactory(store);

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

// ========================================================
// Go!
// ========================================================

// With this setup, HMR works but throws away local state, still it is better than nothing because you don't have to manually refresh the browser window.
const render = (AppContainer) => ReactDOM.render(
  <IntlProvider locale={navigator.language}>
    <AppContainer
      key={Math.random()}
      store={store}
      history={history}
      routes={routes}
    />
  </IntlProvider>,
  MOUNT_NODE
);

render(AppContainer);

if (module.hot) {
  module.hot.accept(undefined, () => {
      let NextAppContainer = require("./containers/AppContainer").default;
      render(NextAppContainer)
    }
  )
}

const actualErrorHandler = window.onerror;

let onErrorDecorator = (msg, url, lineNo, columnNo, error) => {
  Raven.showReportDialog();
  actualErrorHandler(msg, url, lineNo, columnNo, error)
};

window.onerror = onErrorDecorator;
