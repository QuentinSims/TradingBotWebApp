using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TradingBotWebApp.Server.Middleware;
using TradingBotWebApp.Server.Models.ContractModel;
using TradingBotWebApp.Server.Services.PublicController;

namespace TradingBotWebApp.Server.Controllers
{
    [Route("api/public")]
    [ApiController]
    public class PublicController : ControllerBase
    {
        private readonly ILogger<PublicController> _logger;
        private readonly IPublicService _publicService;

        public PublicController(ILogger<PublicController> logger, IPublicService publicService)
        {
            _logger = logger;
            _publicService = publicService;
        }

        [HttpGet]
        [Route("get-binance-contract-by-symbol")]
        [SecurityAPIKey]
        [ProducesResponseType(typeof(BinanceContractModel), 200)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<BinanceContractModel>> GetBinanceContractsBySymbol(string symbol)
        {
            try
            {
                var result = await _publicService.GetBinanceContractBySymbol(symbol);
                return Ok(result);
            }
            catch (Exception ex)
            {
                List<string> errors = new List<string>();
                string message = ex.Message;
                errors = message.Split(',').ToList();

                var problemDetails = new ProblemDetails
                {
                    Title = "An error occurred",
                    Detail = errors[1],
                    Status = Convert.ToInt32(errors[0]),
                    Instance = HttpContext.Request.Path,
                    Extensions = { { "Stack Trace", ex.InnerException } }
                };

                return StatusCode(problemDetails.Status.Value, problemDetails);
            }
        }
    }
}
