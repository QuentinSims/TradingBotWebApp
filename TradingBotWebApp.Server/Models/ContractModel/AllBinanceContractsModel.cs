namespace TradingBotWebApp.Server.Models.ContractModel
{
    public class AllBinanceContractsModel
    {
        public List<object> exchangeFilters { get; set; }
        public List<RateLimit> rateLimits { get; set; }
        public long serverTime { get; set; }
        public List<Symbol> symbols { get; set; }
        public string timezone { get; set; }
    }


}
