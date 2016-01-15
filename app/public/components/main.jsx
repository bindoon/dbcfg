'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

require('antd/lib/index.css');

var ListApp = require('./list');


// var Routes = (
//     <Route path="/" handler={LbsAnalysisApp}>
//         <Route path="/clientanalysis" name="ClientAnalysis" handler={ClientAnalysis}/>
//         <Route path="/currentpassengers" name="CurrentPassengers" handler={CurrentPassengers}/>
//         <Route path="/neighbouranalysis" name="NeighbourAnalysis" handler={NeighbourAnalysis}/>
//         <Route path="/competitionanalysis" name="Competitionanalysis" handler={Competitionanalysis}/>
//         <Route path="/passengertrend" name="PassengerTrend" handler={PassengerTrend}/>
//         <Route path="/clientsource" name="ClientSource" handler={ClientSource}/>
//         <Route path="/clientchart" name="ClientChart" handler={ClientChart}/>
//         <Route path="/tradepoi" name="TradePOI" handler={TradePOI}/>
//         <NotFoundRoute handler={NeighbourAnalysis}/>
//     </Route>
// );

// Router.run(Routes, function (Handler) {
//     React.render(<Handler/>, document.getElementById('container'));
// });

ReactDom.render(<ListApp />, document.getElementById('container'));
