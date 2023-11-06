using System.Text.Json.Serialization;
using Eat.AuthService.Db;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


var config = builder.Configuration;

var connString = config.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options =>
        options.UseNpgsql(connString).EnableSensitiveDataLogging())
    .AddLogging();

// Add services to the container.

builder.Services
    .AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsApi",
        builder => builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsApi");

app.UseHttpsRedirection();

app.MapControllers();

app.Run();

