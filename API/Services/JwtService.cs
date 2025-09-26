using API.Entity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Config; // JwtSettings için
using System;

namespace API.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtSettings _jwtSettings;

        public JwtService(IOptions<JwtSettings> jwtOptions)
        {
            _jwtSettings = jwtOptions.Value ?? throw new ArgumentNullException(nameof(jwtOptions));
        }

        public string GenerateToken(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (string.IsNullOrEmpty(_jwtSettings.Secret)) throw new InvalidOperationException("JWT Secret is not configured.");

            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString() ?? string.Empty),
                    new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
                }),
                Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpiryInHours > 0 ? _jwtSettings.ExpiryInHours : 1),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}