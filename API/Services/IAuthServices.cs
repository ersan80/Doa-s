using RegistrationApi.DTOs;
using System.Threading.Tasks;


namespace API.Services
{
    public interface IAuthService
    {
        Task<AuthResult> RegisterAsync(RegisterDto model);
    }

    public class AuthResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}