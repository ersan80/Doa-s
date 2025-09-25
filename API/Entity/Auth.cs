using System.ComponentModel.DataAnnotations;
namespace API.Entity;

public class LoginModel
{
    [Key]
    public string? Email { get; set; }
    public string? Password { get; set; }
}