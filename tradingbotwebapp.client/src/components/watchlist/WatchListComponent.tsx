import { useState } from 'react';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from '../../../config.js';

interface WatchList {
    symbol: string;
    value: number
}

function WatchListComponent() {
    const coins: string[] = [
        "BTC",
        "ETH",
        "BNB",
        "XRP",
        "LTC",
        "ADA",
        "DOT",
        "LINK",
        "XLM",
        "BCH",
        "DOGE",
        "UNI",
        "AAVE",
        "SOL",
        "ATOM",
        "VET",
        "TRX",
        "EOS",
        "XMR",
        "XTZ",
        "NEO",
        "FIL",
        "THETA",
        "MATIC",
        "TFUEL",
    ];
    const [watchlist, setWatchList] = useState<WatchList[]>([]);
    //const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);


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

    // handle change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value !== "") {
            const filteredSuggestions = coins.filter((itemData) => {
                const value = event.target.value.toUpperCase()
                const name = itemData.toUpperCase()

                return value && name.startsWith(value) && name !== value
            })
            setSearchText(event.target.value)
            setSuggestions(filteredSuggestions)
        }
    }

    // Function to handle selection of a suggestion
    const handleSuggestionSelect = async (symbol: string) => {
        setSearchText(symbol);

        const coin: string | undefined = coins.find(x => x === symbol);
        if (coin != undefined || coin != '') {
            const data = await fetchSymbolValue(coin);
            if (data != null) {
                addWatchlist(symbol, data?.BTC);
            }
        }
    };
    // Function to fetch symbol value from API
    const fetchSymbolValue = async (symbol: string | undefined) => {
        try {
            const response = await fetch(`${REACT_APP_API_URL}/get-binance-contract-by-symbol?symbol=${symbol}`, {
                headers: {
                    'X-Api-Key': REACT_APP_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch symbol value');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching symbol value:', error);
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
                    onChange={handleChange}
                    placeholder="Search symbol..."
                    className="crypto-search-input"
                />
                {suggestions.length > 0 && (
                    <ul className="">
                        {suggestions.map((coin, index) => (
                            <span key={index} onClick={() => handleSuggestionSelect(coin)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                </svg>
                                {coin}
                            </span>
                        ))}
                    </ul>
                )}
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