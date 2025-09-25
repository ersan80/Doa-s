using RegistrationApi.DTOs;
using API.Entity;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly IEmailService _emailService;

        public AuthService(DataContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<AuthResult> RegisterAsync(RegisterDto model)
        {
            var result = new AuthResult();

            // 1. Email zaten var mı kontrolü
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                result.Success = false;
                result.Message = "This email is already in use.";
                return result;
            }

            // 2. Parola hashle
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            // 3. Token oluştur (URL-safe)
            var token = GenerateEmailConfirmationToken();

            // 4. Kullanıcı nesnesi oluştur
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

            // 5. Doğrulama linki
            var confirmationLink = $"https://localhost:3000/confirm-email?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(user.Email)}";

            // 6. Mail gönderimi try-catch ile
            try
            {
                await _emailService.SendEmailAsync(
                    user.Email,
                    "Confirm your email",
                    $"Hello {user.Name},\n\nPlease confirm your email by clicking the link below:\n{confirmationLink}\n\nThis link is valid for 24 hours."
                );
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Email could not be sent: " + ex.Message;
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
