using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {
        if (model.Email == "test@example.com" && model.Password == "password123")
        {
            return Ok(new { success = true, message = "Entry Succsess" });
        }
        return BadRequest(new { success = false, message = "Invalid E-mail or password" });
    }
}

