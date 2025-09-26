using RegistrationApi.DTOs;
using API.Entity;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.Extensions.Logging;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(DataContext context, IEmailService emailService, ILogger<AuthService> logger)
        {
            _context = context;
            _emailService = emailService;
            _logger = logger;
        }


        public async Task<AuthResult> RegisterAsync(RegisterDto model)
        {
            var result = new AuthResult();

            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                result.Success = false;
                result.Message = "This email is already in use.";
                return result;
            }

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            var token = GenerateEmailConfirmationToken();
            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = passwordHash,
                IsEmailConfirmed = false,
                EmailConfirmationToken = token,
                TokenExpiry = DateTime.UtcNow.AddHours(24)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // API/Services/AuthServices.cs
            var confirmationLink = $"http://localhost:3000/confirm-email?token={Uri.EscapeDataString(user.EmailConfirmationToken ?? string.Empty)}&email={Uri.EscapeDataString(user.Email ?? string.Empty)}";
            try
            {
                await _emailService.SendEmailAsync(
                    user.Email,
                    "Confirm Your Email",
                    $"<h3>Hello {user.Name},</h3><p>Please confirm your email by clicking <a href='{confirmationLink}'>this link</a>.</p><p>This link is valid for 24 hours.</p>"
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send email during registration for {Email}", user.Email);
                result.Success = false;
                result.Message = "Registration successful, but failed to send confirmation email. Please try again later.";
                return result;
            }

            result.Success = true;
            result.Message = "Registration successful. Please check your email to confirm your account.";
            return result;
        } 
        private string GenerateEmailConfirmationToken()
        {
            var bytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            // URL-safe token
            return Convert.ToBase64String(bytes)
                          .Replace("+", "-")
                          .Replace("/", "_")
                          .TrimEnd('=');
        }
    }
}
