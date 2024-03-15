import { useState } from 'react';

interface Strategy {
    strategy: string;
    contract: string;
    timeframe: string;
    balance: string;
    tp: string;
    sl: string;
}

function StrategyComponent() {
    const [strategies, setStrategies] = useState<Strategy[]>([]);

    const addStrategy = () => {
        const newStrategy: Strategy = {
            strategy: 'New Strategy',
            contract: 'Contract',
            timeframe: 'Timeframe',
            balance: 'Balance%',
            tp: 'TP%',
            sl: 'SL%',
        };
        setStrategies([...strategies, newStrategy]);
    };

    const openModal = () => {
        alert('Open modal here');
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Strategy</th>
                                <th>Contract</th>
                                <th>Timeframe</th>
                                <th>Balance%</th>
                                <th>TP%</th>
                                <th>SL%</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {strategies.map((strategy, index) => (
                                <tr key={index}>
                                    <td>{strategy.strategy}</td>
                                    <td>{strategy.contract}</td>
                                    <td>{strategy.timeframe}</td>
                                    <td>{strategy.balance}</td>
                                    <td>{strategy.tp}</td>
                                    <td>{strategy.sl}</td>
                                    <td>
                                        <button onClick={openModal}>
                                            {/* Render your icon here */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 15c1.66 0 2.99-1.34 2.99-3S13.66 9 12 9s-3 1.34-3 3 1.34 3 3 3zm0-10C8.69 5 6 7.69 6 11s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-1.66 0-2.99 1.34-2.99 3S10.34 21 12 21s3-1.34 3-3-1.34-3-3-3zm0-10c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={addStrategy}>Add Strategy</button>
                </div>
            </div>
        </div>
    );
}

export default StrategyComponent;