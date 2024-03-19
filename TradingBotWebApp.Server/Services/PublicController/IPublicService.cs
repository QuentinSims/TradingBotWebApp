using TradingBotWebApp.Server.Models.ContractModel;

namespace TradingBotWebApp.Server.Services.PublicController
{
    public interface IPublicService
    {
        Task<BinanceContractModel> GetBinanceContractBySymbol(string symbol);
    }
}
