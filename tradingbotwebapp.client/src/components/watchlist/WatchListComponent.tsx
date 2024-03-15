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
            {watchlist.length === 0 ? (
                <div className="d-flex">
                    <p>
                        Watchlist empty.
                    </p>
                    <button className="btn btn-link" onClick={addWatchlist}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="This top tooltip is themed via CSS variables.">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div>
                    {watchlist.map((item, index) => (
                        <p key={index}>{item.symbol}: {item.value}</p>
                    ))}
                    <div>
                        <button type="button" className="btn btn-primary" onClick={addWatchlist}>Add More</button>
                    </div>
                </div>
            )}
        </div>

    );
}

export default WatchListComponent;