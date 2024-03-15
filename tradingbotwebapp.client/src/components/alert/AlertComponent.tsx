import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


interface AlertMessage {
    date: string;
    subtitle: string;
    message: string;
}

function AlertComponent() {
    const [alertMessages, setAlertMessages] = useState<AlertMessage[]>();

    useEffect(() => {
        populateAlertMessagesData();
    }, []);

    async function populateAlertMessagesData() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        const data: AlertMessage[] = [
            { date: "2024-03-11 18:00", subtitle: "BTC High", message: "BTC: above high of $72000" },
            { date: "2024-03-10 14:22", subtitle: "SOL Low", message: "SOL: under love of $1000" },
        ];
        setAlertMessages(data);
    }

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {alertMessages?.map((alert, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{alert.subtitle}</h6>
                            <p className="card-text">{alert.message}</p>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
      //<div className="card">
      //    <div className="card-body">
      //        <h5 className="card-title">Alerts</h5>
      //        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      //            <div className="carousel-inner">
      //                {alertMessages?.map((alert, index) => (
      //                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
      //                        <h6 className="card-subtitle mb-2 text-body-secondary">{alert.subtitle}</h6>
      //                        <p className="card-text">{alert.message}</p>
      //                    </div>
      //                ))}
      //            </div>
      //            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      //                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      //                <span className="visually-hidden">Previous</span>
      //            </button>
      //            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      //                <span className="carousel-control-next-icon" aria-hidden="true"></span>
      //                <span className="visually-hidden">Next</span>
      //            </button>
      //        </div>
      //    </div>
      //</div>
  );
}

export default AlertComponent;