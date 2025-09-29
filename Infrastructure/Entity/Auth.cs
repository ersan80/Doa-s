using System.ComponentModel.DataAnnotations;
namespace Infrastructure.Entity;

public class LoginModel
{
    [Key]
    public string? Email { get; set; }
    public string? Password { get; set; }
}