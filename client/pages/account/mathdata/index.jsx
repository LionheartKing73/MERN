'use strict';

const Actions = require('./actions');

const React = require('react');
const Store = require('./store');


const script = document.createElement("script");
script.src = "http://cdnjs.cloudflare.com/ajax/libs/mathjs/0.18.1/math.min.js";
document.head.appendChild(script);

const script1 = document.createElement("script");
script1.src = "http://cdnjs.cloudflare.com/ajax/libs/mathjax/2.3/MathJax.js?config=AM_HTMLorMML";
document.head.appendChild(script1);

const script2 = document.createElement("script");
script2.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
document.head.appendChild(script2);

import './css/textdata.styl';

class MathDataPage extends React.Component {
    constructor(props) {

        super(props);

        //Actions.getDetails();
        //Actions.getUser();
        //this.state = Store.getState();        
    }


    componentDidMount() {

        //this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
 

        var expr = document.getElementById('expr'),
            pretty = document.getElementById('pretty'),
            result = document.getElementById('result');

        var math = mathjs();

        expr.value = 'sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2';
        pretty.innerHTML = '`' + expr.value + '`';
        result.innerHTML = math.eval(expr.value);


        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        var elem = null;
        try {
            var elem = MathJax.Hub.getAllJax('pretty')[0];
            MathJax.Hub.Queue(['Text', elem, expr.value]);
        }
        catch (err) {}          

        expr.oninput = function () { 

            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

            try {
                result.innerHTML = math.eval(expr.value);
            }
            catch (err) {
                result.innerHTML = err.toString();
            }

            var elem = null;
            try {
                var elem = MathJax.Hub.getAllJax('pretty')[0];
                MathJax.Hub.Queue(['Text', elem, expr.value]);
            }
            catch (err) {}
        };       
              
    }


    componentWillMount() {
               
    }    

    componentWillUnmount() {

        //this.unsubscribeStore();
    }

    onStoreChange() {

        //this.setState(Store.getState());
    }

    render() {         

        return (
            <section className="container" >
                <h1 className="page-header">Math Data Entry</h1>
                <div className="row">
                    <div className="col-sm-6">

                    </div>
                </div>

                <h2>
                  Math Calculation
                </h2>
                <table>
                    <tbody>    
                        <tr>
                            <td>Expression</td>
                            <td><input type="text" id="expr"/></td>
                        </tr>
                        <tr>
                            <td>Pretty print</td>
                            <td><div id="pretty">``</div></td>
                        </tr>
                        <tr>
                            <td>Result</td>
                            <td><div id="result"></div></td>
                        </tr>
                    </tbody>
                </table>

            </section>

        );
    }
}


module.exports = MathDataPage;
