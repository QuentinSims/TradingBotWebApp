using Microsoft.AspNetCore.Http.Features;

namespace TradingBotWebApp.Server.Middleware
{
    [AttributeUsage(AttributeTargets.Method)]
    public class SecurityAPIKeyAttribute : Attribute
    {

    }

    public class SecurityAPIKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private bool next = false;
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;

        public SecurityAPIKeyMiddleware(RequestDelegate next, IConfiguration configuration, ILogger<SecurityAPIKeyMiddleware> logger)
        {
            _next = next;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, IConfiguration config)
        {
            var endpoint = context.Features.Get<IEndpointFeature>()?.Endpoint;
            var attribute = endpoint?.Metadata.GetMetadata<SecurityAPIKeyMiddleware>();
            next = false;
            if (attribute != null)
            {
                try
                {
                    string apiKey = context.Request.Headers["X-Api-Key"];
                    var localKey = _configuration.GetValue<string>("SecurityAPIKeys:X-Api-Key") ?? "";

                    if (apiKey is not null && apiKey == localKey)
                        next = true;

                    if (!next)
                    {
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = 401;
                        await context.Response.WriteAsync("Unauthorized");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in SecurityMiddleware");
                    next = false;
                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Unauthorized");
                }
            }
            else
                next = true;

            if (next)
                await _next(context);
        }
    }
}
