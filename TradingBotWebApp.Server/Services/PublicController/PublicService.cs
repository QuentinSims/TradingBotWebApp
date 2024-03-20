using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
        public string binanceapiendpoint = "";
        #endregion

        #region contructor
        public PublicService(IOptions<ConfigSettings> configSettings, HttpClient httpClient)
        {
            _configSettings = configSettings;
            _httpClient = httpClient;
            binanceapiendpoint = _configSettings.Value.binanceapipublic;
        }
        #endregion

        #region methods
        public async Task<List<string>> GetAllBinanceSymbols()
        {
            if (binanceapiendpoint == null)
            {
                throw new ArgumentNullException("Could not retrieve endpoint for binance, please try again");
            }
            HttpResponseMessage response = await _httpClient.GetAsync($"{binanceapiendpoint}/{apiversion}/exchangeInfo");
            string content = string.Empty;
            if (response.IsSuccessStatusCode)
            {
                content = await response.Content.ReadAsStringAsync();
            }
            else
            {
                throw new Exception($"{(int)response.StatusCode},{response.ReasonPhrase},{response.Headers}");
            }

            var contracts = JsonConvert.DeserializeObject<AllBinanceContractsModel>(content);

            List<string> symbols = new List<string>();
            symbols = contracts.symbols.Select(x=>x.symbol).ToList();

            return symbols;
        }
        public async Task<BinanceContractModel> GetBinanceContractBySymbol(string symbol)
        {
            ArgumentNullException.ThrowIfNull(symbol);

            if(binanceapiendpoint == null)
            {
                throw new ArgumentNullException("Could not retrieve endpoint for binance, please try again");
            }

            HttpResponseMessage response = await _httpClient.GetAsync($"{binanceapiendpoint}/{apiversion}/exchangeInfo?symbol={symbol}");
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
        public async Task<List<WatchlistModel>> GetLatestPriceBySymbol(string? symbol = null)
        {
            if (binanceapiendpoint == null)
            {
                throw new ArgumentNullException("Could not retrieve endpoint for binance, please try again");
            }

            HttpResponseMessage response = await _httpClient.GetAsync($"{binanceapiendpoint}/{apiversion}/ticker/price?symbol={symbol}");
            string content = string.Empty;
            if (response.IsSuccessStatusCode)
            {
                content = await response.Content.ReadAsStringAsync();
            }
            else
            {
                throw new Exception($"{(int)response.StatusCode},{response.ReasonPhrase},{response.Headers}");
            }

            JToken token = JToken.Parse(content);
            var latestPrice = new List<WatchlistModel>();
            if(token.Type == JTokenType.Array)
            {
                var latestPriceInString = JsonConvert.DeserializeObject<List<DeserialisedWatchlistModel>>(content);
                latestPrice = latestPriceInString.Select(x => new WatchlistModel()
                {
                    symbol = x.symbol,
                    price = decimal.Round(Decimal.Parse(x.price), 2)
                }).ToList();
            }
            else
            {
                var latestPriceInString = JsonConvert.DeserializeObject<DeserialisedWatchlistModel>(content);
                var price = new WatchlistModel()
                {
                    symbol = latestPriceInString.symbol,
                    price = decimal.Round(Decimal.Parse(latestPriceInString.price),2)
                };
                latestPrice.Add(price);
            }

            return latestPrice;
        }
        #endregion
    }
}
