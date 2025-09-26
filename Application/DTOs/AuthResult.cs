namespace Application.DTOs
{
    public class AuthResult
    {
        public bool Success { get; set; }
        public string? Token { get; set; } // Nullable
        public string? Message { get; set; } // Nullable
    }
}