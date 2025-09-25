using Microsoft.AspNetCore.Mvc;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfirmEmailController : ControllerBase
    {
        private readonly DataContext _context;

        public ConfirmEmailController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string email, [FromQuery] string token)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(token))
                return BadRequest(new { success = false, message = "Email or token is missing" });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return NotFound(new { success = false, message = "User not found" });

            if (user.IsEmailConfirmed)
                return BadRequest(new { success = false, message = "Email is already confirmed" });

            if (user.EmailConfirmationToken != token)
                return BadRequest(new { success = false, message = "Invalid token" });

            if (user.TokenExpiry < DateTime.UtcNow)
                return BadRequest(new { success = false, message = "Token has expired" });

            user.IsEmailConfirmed = true;
            user.EmailConfirmationToken = null;

            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Email confirmed successfully" });
        }
    }
}
