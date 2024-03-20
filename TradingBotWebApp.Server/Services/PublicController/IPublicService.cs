using TradingBotWebApp.Server.Models.ContractModel;

namespace TradingBotWebApp.Server.Services.PublicController
{
    public interface IPublicService
    {
        //return all the contracts
        Task<List<string>> GetAllBinanceSymbols();

        //return contract by symbol
        Task<BinanceContractModel> GetBinanceContractBySymbol(string symbol);

        //returns latest price for symbol
        Task<List<WatchlistModel>> GetLatestPriceBySymbol(string? symbol = null);
    }
}
