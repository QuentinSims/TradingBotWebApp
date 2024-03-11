import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

interface Trades {
    date: string;
    message: string;
    value: number;
}

function TradesComponent() {
    const [tradesMessages, setTadesMessages] = useState<Trades[]>();

    useEffect(() => {
        populateTradesMessagesData();
    }, []);

    async function populateTradesMessagesData() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        const data: Trades[] = [
            { date: "2024-03-11", message: "Buy: BTC", value: 22 },
            { date: "2024-03-10", message: "Buy: ETH", value: 22 },
            { date: "2024-03-09", message: "Sell: BTC", value: 22 },
            { date: "2024-03-08", message: "Buy: SOL", value: 22 },
            { date: "2024-03-07", message: "Sell: SOL", value: 22 }
        ];
        setTadesMessages(data);
    }


  return (
      <div className="card">
          <div className="card-body">
              <h2 className="card-title text-left">Trades</h2>
              {tradesMessages?.map((log, index) => (
                  <p key={index}>{log.date}: {log.message}</p>
              ))}
          </div>
      </div>
  );
}

export default TradesComponent;