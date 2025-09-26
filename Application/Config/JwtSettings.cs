namespace Application.Config
{
    public class JwtSettings
    {
        public string? Key { get; set; } // Nullable
        public string? Issuer { get; set; } // Nullable
        public string? Audience { get; set; } // Nullable
        public int ExpiryInHours { get; set; }
    }
}