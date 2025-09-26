// API/Config/JwtSettings.cs
namespace API.Config;

public class JwtSettings
{
    public string Secret { get; set; } = string.Empty; // Null uyarılarını önler
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public int ExpiryInHours { get; set; }
}