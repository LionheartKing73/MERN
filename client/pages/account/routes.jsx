'use strict';
const App = require('./app.jsx');
const Home = require('./home.jsx');
const NotFound = require('./not-found.jsx');
const React = require('react');
const ReactRouter = require('react-router');
const Settings = require('./settings/index.jsx');

const Image = require('./image/index.jsx');
const MathData = require('./mathdata/index.jsx');


const IndexRoute = ReactRouter.IndexRoute;
const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const browserHistory = ReactRouter.browserHistory;


const Routes = (
    <Router history={browserHistory}>
        <Route path="/account" component={App}>
            <IndexRoute component={Settings} />
            <Route path="/account/settings" component={Settings} />

            <Route path="/account/image" component={Image} />
            <Route path="/account/mathdata" component={MathData} />

            <Route path="*" component={NotFound} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);


module.exports = Routes;
