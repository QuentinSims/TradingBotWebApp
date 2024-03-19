import { useState } from 'react';

interface WatchList {
    symbol: string;
    value: number
}



function WatchListComponent() {
    const [watchlist, setWatchList] = useState<WatchList[]>([]);
    //const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    //const [suggestions, setSuggestions] = useState<string[]>(['BTC', 'ETH', 'LTC']);


    const addWatchlist = (symbol: string, value: number) => {
        const newWatchlist = {
            symbol: symbol,
            value: value
        };
        setWatchList([...watchlist, newWatchlist]);
        setSearchText('');
    };

    //ability to remove an item
    const removeItem = (indexToRemove: number) => {
        setWatchList(watchlist.filter((_, index) => index !== indexToRemove));
    };

    // Function to handle selection of a suggestion
    const handleSuggestionSelect = async (symbol: string) => {
        if (symbol.length >= 3) {
            const data = await fetchSymbolValue(symbol);
            if (data != null) {
                addWatchlist(symbol, data?.BTC);
            }
        }
        // Clear search state regardless of the length
        setSearchText(symbol);
    };
    // Function to fetch symbol value from API
    const fetchSymbolValue = async (symbol: string) => {
        try {
            const response = await fetch(`YOUR_API_ENDPOINT/${symbol}`);
            if (!response.ok) {
                throw new Error('Failed to fetch symbol value');
            }
            const data = { "BTC": 72000 }//await response.json();
            // Assuming the value is returned in the 'value' field of the response data
            return data;
        } catch (error) {
            console.error('Error fetching symbol value:', error);
            // You can handle errors here, such as displaying an error message or returning a default value
            return null;
        }
    };

    return (
        <div>
            <h2>Crypto</h2>
            <div className="crypto-search">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => handleSuggestionSelect(e.target.value)}
                    placeholder="Search symbol..."
                    className="crypto-search-input"
                />
            </div>
            {watchlist.length === 0 ? (
                <div className="d-flex align-items-center pt-1">
                    <span>
                        Watchlist empty.
                    </span>
                </div>
            ) : (
                    <div>
                        {watchlist.map((item, index) => (
                            <div className="item-container" key={index}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-square remove-icon" viewBox="0 0 20 20" onClick={() => removeItem(index)}>
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                </svg>
                                <span className="symbol-value">{item.symbol.toUpperCase()}: {item.value}</span>
                            </div>
                        ))}
                    </div>
            )}
        </div>
    );
}

export default WatchListComponent;