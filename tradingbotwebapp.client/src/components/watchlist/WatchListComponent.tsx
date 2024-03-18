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
    };

    //// Function to fetch suggestions based on search text
    //const fetchSuggestions = async (searchText: string) => {
    //    // You would implement your own logic here to fetch suggestions from an API
    //    const dummySuggestions = ['BTC', 'ETH', 'LTC'];

    //    // Filter suggestions based on search text
    //    const filteredSuggestions = dummySuggestions.filter(symbol =>
    //        symbol.toLowerCase().includes(searchText.toLowerCase())
    //    );

    //    // Set filtered suggestions
    //    setSuggestions(filteredSuggestions);
    //    handleSuggestionSelect(filteredSuggestions[0])
    //};

    // Function to handle selection of a suggestion
    const handleSuggestionSelect = async (symbol: string) => {
        if (symbol.length >= 3) {
            const value = await fetchSymbolValue(symbol);
            addWatchlist(symbol, value);
            // Clear search state
            setSearchText('');
        }
    };

    // Function to fetch symbol value from API
    const fetchSymbolValue = async (symbol: string) => {
        try {
            const response = await fetch(`YOUR_API_ENDPOINT/${symbol}`);
            if (!response.ok) {
                throw new Error('Failed to fetch symbol value');
            }
            const data = await response.json();
            // Assuming the value is returned in the 'value' field of the response data
            return data.value;
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
                    {/*<button className="btn btn-link" onClick={() => setShowSearch(true)}*/}
                    {/*    data-bs-toggle="tooltip"*/}
                    {/*    data-bs-placement="top"*/}
                    {/*    data-bs-custom-class="custom-tooltip"*/}
                    {/*    data-bs-title="This top tooltip is themed via CSS variables.">*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">*/}
                    {/*        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />*/}
                    {/*        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />*/}
                    {/*    </svg>*/}
                    {/*</button>*/}
                </div>
            ) : (
                <div>
                    {watchlist.map((item, index) => (
                        <p key={index}>{item.symbol}: {item.value}</p>
                    ))}
                    {/*<div>*/}
                    {/*    <button type="button" className="btn btn-primary" onClick={() => setShowSearch(true)}>Add More</button>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    );
}

export default WatchListComponent;