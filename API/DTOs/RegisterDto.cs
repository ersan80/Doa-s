using System.ComponentModel.DataAnnotations;

namespace RegistrationApi.DTOs
{
    public class RegisterDto
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name cannot exceed 50 characters")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        // [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$", 
        //     ErrorMessage = "Password must contain at least one uppercase, one lowercase, and one number")]
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
    }
}
