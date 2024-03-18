import { useEffect } from 'react';
import './App.css';
import LoggingComponent from './components/logging/LoggingComponent';
import WatchListComponent from './components/watchlist/WatchListComponent';
import StrategyComponent from './components/strategy/StrategyComponent';
import TradesComponent from './components/trades/TradesComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AlertComponent from './components/alert/AlertComponent';
import GraphComponent from './components/graph/GraphComponent';



function App() {
    //const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        //populateWeatherData();
    }, []);


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 left-drawer">
                    <div className="watchlist-container">
                        <WatchListComponent />
                    </div>
                    <div className="logging-container">
                        <LoggingComponent />
                    </div>
                    <div className="alert-container">
                        <AlertComponent />
                    </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 .main-screen">
                    <div className="main-screen d-flex flex-column h-100">
                        <div className="row flex-grow-1">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 h-100">
                                <GraphComponent />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 h-100">
                                <StrategyComponent />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 h-100">
                                <TradesComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    setForecasts(data);
    //}
}

export default App;