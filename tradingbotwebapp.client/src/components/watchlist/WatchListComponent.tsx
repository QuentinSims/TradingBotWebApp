function WatchListComponent() {
    return (
        <div>
            <div className="heading-padding">
                <h2>Watchlist</h2>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <p className="label">BTC</p>
                    <p className="label">ETH</p>
                    {/* Add more labels as needed */}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <p className="">$72000</p>
                    <p className="">$2000</p>
                    {/* Add more labels as needed */}
                </div>
            </div>
            <button type="button" className="btn btn-primary">Add More</button>
        </div>
    );
}

export default WatchListComponent;