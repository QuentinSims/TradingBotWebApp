import { useState } from 'react';

interface WatchList {
    symbol: string;
    value: number
}



function WatchListComponent() {
    const [watchlist, setWatchList] = useState<WatchList[]>([]);


    const addWatchlist = () => {
        const newWatchlist: WatchList = {
            symbol: 'BTC',
            value: 72000
        };
        setWatchList([...watchlist, newWatchlist]);
    };

    return (
        <div>
            {/*<div className="heading-padding">*/}
            {/*    <h2>Watchlist</h2>*/}
            {/*</div>*/}
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        {watchlist.map((item, index) => (
                            <div key={index} className="row mb-3">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <p className="label">{item.symbol}</p>
                                    {/* Add more labels as needed */}
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <p className="mb-0">${item.value}</p>
                                    {/* Add more labels as needed */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-primary" onClick={addWatchlist}>Add More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WatchListComponent;