namespace TradingBotWebApp.Server.Models.ContractModel
{
    public class WatchlistModel
    {
        public string symbol { get; set; } = string.Empty;
        public decimal price { get; set; } = 0M;
    }

    public class DeserialisedWatchlistModel
    {
        public string symbol { get; set; } = string.Empty;
        public string price { get; set; } = string.Empty;
    }
}
