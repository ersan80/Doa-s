using RegistrationApi.DTOs;
using API.Entity;
using API.Data;
using Microsoft.EntityFrameworkCore;


namespace RegistrationApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly DataContext _context;

        public AuthService(DataContext context)
        {
            _context = context;
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

            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            result.Success = true;
            result.Message = "Registration successful.";
            return result;
        }
    }
}