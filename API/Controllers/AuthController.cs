using Infrastructure.Data;
using Infrastructure.Entity;
using Application.Interfaces;
using Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using BCrypt.Net;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IJwtService _jwtService;

        public AuthController(DataContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Application.DTOs.LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                return BadRequest(new { success = false, message = "Invalid E-mail or Password" });

            if (!user.IsEmailConfirmed)
                return BadRequest(new { success = false, message = "Please confirm your email before login." });

            var token = _jwtService.GenerateToken(user);
            return Ok(new
            {
                success = true,
                message = "Login successful",
                email = user.Email,
                name = user.Name,
                token
            });
        }
    }
}