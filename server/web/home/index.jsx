'use strict';
const Layout = require('../layouts/default.jsx');
const React = require('react');


class HomePage extends React.Component {
    render() {

        const neck = <link rel='stylesheet' href="/public/pages/home.min.css" />;

        return (
            <Layout
                title="Home"
                neck={neck}
                activeTab="home">

                <div className="jumbotron">
                    <h1>Welcome!</h1>

                </div>

            </Layout>
        );
    }
}


module.exports = HomePage;
