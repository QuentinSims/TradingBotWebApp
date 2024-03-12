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
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6">
                    <WatchListComponent />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                    <GraphComponent/>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <LoggingComponent />
                        </div>
                    </div>
                    <div className="row row-padding">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <AlertComponent/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <StrategyComponent />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                    <TradesComponent />
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