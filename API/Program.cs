using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite; // Eklendi
using API.Data;
using API.Services;
using RegistrationApi.DTOs;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.ComponentModel.DataAnnotations;
using API.Config;


var builder = WebApplication.CreateBuilder(args);
var smtpSection = builder.Configuration.GetSection("SmtpSettings");

var jwtSection = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(jwtSection);

builder.Services.Configure<SmtpSettings>(smtpSection);
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddLogging(logging => logging.AddConsole());
// Add services to the container.
builder.Services.AddLogging(logging => logging.AddConsole());
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<IJwtService, JwtService>();

// ✅ CORS Politikası ekle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React uygulamanın URL'si
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Registration API", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Registration API v1"));
}
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Bu middleware'i ekle – hataları detaylı gösterir
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Registration API v1"));
}
// ✅ CORS'u devreye al
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();
app.UseStaticFiles();


app.Run();
