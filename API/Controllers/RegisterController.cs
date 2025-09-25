using Microsoft.AspNetCore.Mvc;
using RegistrationApi.DTOs;
using API.Services;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        
        private readonly IAuthService _authService;

        public RegisterController(IAuthService authService)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var validationContext = new ValidationContext(model);
            var validationResults = new List<ValidationResult>();

            if (!Validator.TryValidateObject(model, validationContext, validationResults, true))
            {
                var errorMessage = string.Join(" | ", validationResults.Select(r => r.ErrorMessage));

                // 🔹 Buraya log ekle
                Console.WriteLine("Validation failed: " + errorMessage);

                return BadRequest(new { success = false, message = errorMessage });
            }

            var result = await _authService.RegisterAsync(model);

            return result.Success
                ? Ok(new { success = true, message = result.Message })
                : BadRequest(new { success = false, message = result.Message });
        }
    }
    
}