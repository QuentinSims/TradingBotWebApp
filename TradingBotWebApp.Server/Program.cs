using Microsoft.OpenApi.Models;
using TradingBotWebApp.Server.Helpers.ConfigSettings;
using TradingBotWebApp.Server.Middleware;
using TradingBotWebApp.Server.Services.PublicController;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

#region Services
builder.Services.AddTransient<IPublicService, PublicService>(); 
#endregion

#region helpers
builder.Services.Configure<ConfigSettings>(builder.Configuration.GetSection(ConfigSettings.Position));
builder.Services.AddHttpClient();
#endregion

#region CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
               builder =>
               {
                   builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
               });
});
#endregion

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {

    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Trading Center API", Version = "v1" });

    // Define the ApiKey scheme
    c.AddSecurityDefinition("ApiKeyAuth", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.ApiKey,
        In = ParameterLocation.Header,
        Name = "X-Api-Key",
        Description = "Enter your API Key"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKeyAuth"
                }
            },
            new List<string>()
        }
    });

});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");


app.UseAuthorization();
app.UseMiddleware<SecurityAPIKeyMiddleware>();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
