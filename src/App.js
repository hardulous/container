import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import { Provider } from "react-redux";
import store from "./rtk/store.js";
import Cart from "./components/Cart.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const CakeApp = lazy(() => import("./components/CakeMF.jsx"));
const IceCreamApp = lazy(() => import("./components/IceCreamMF.jsx"));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Cart />
        <Switch>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/cake" component={CakeApp} />
            <Route exact path="/icecream" component={IceCreamApp} />
          </Suspense>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

// NOTE::

// 1. main.js:830 Initialization of sharing external failed: ScriptExternalLoadError: Loading script failed. Here let say our cake mf is currently closed so in this case fetching its remoteEntry.js will show this error. The remoteEntry.js file will be fetched only if some where in our code we have imported or use the mf code.
