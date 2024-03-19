using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using TradingBotWebApp.Server.Helpers.ConfigSettings;
using TradingBotWebApp.Server.Models.ContractModel;

namespace TradingBotWebApp.Server.Services.PublicController
{
    public class PublicService : IPublicService
    {
        #region fields
        private const string apiversion = "v3";
        private readonly IOptions<ConfigSettings> _configSettings;
        private readonly HttpClient _httpClient;
        #endregion

        #region contructor
        public PublicService(IOptions<ConfigSettings> configSettings, HttpClient httpClient)
        {
            _configSettings = configSettings;
            _httpClient = httpClient;
        }
        #endregion

        #region methods
        public async Task<BinanceContractModel> GetBinanceContractBySymbol(string symbol)
        {
            ArgumentNullException.ThrowIfNull(symbol);

            var apiendpoint = _configSettings.Value.binanceapipublic;

            if(apiendpoint == null)
            {
                throw new ArgumentNullException("Could not retrieve endpoint for binance, please try again");
            }

            HttpResponseMessage response = await _httpClient.GetAsync($"{apiendpoint}/{apiversion}/exchangeInfo?symbol={symbol}");
            string content = string.Empty;
            if (response.IsSuccessStatusCode)
            {
                content = await response.Content.ReadAsStringAsync();
            }
            else
            {
                throw new Exception($"{(int)response.StatusCode},{response.ReasonPhrase},{response.Headers}");
            }

            var contract = JsonConvert.DeserializeObject<BinanceContractModel>(content);

            return contract;

        }
        #endregion
    }
}
