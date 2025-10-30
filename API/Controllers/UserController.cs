using Infrastructure.Data;
using Infrastructure.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using Application.DTOs;
using Microsoft.AspNetCore.Hosting;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _env;

        public UserController(DataContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // ✅ Aktif kullanıcı (JWT'den)
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var user = await _context.Users
                .Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

            if (user == null) return NotFound();

            return Ok(new
            {
                user.Id,
                user.Name,
                user.Email,
                user.AvatarUrl,
                user.DefaultAddress,
                Addresses = user.Addresses
            });
        }

        // ✅ Belirli kullanıcıyı getir (admin veya email ile çağırılabilir)
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users
                .Include(u => u.Addresses)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return NotFound();

            return Ok(user);
        }

        // ✅ Tüm kullanıcıları listele (admin erişimi)
        [HttpGet("all")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Addresses)
                .ToListAsync();
            return Ok(users);
        }

        // ✅ Kullanıcı profili güncelle (ad, varsayılan adres, avatar)
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] UserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            if (!string.IsNullOrEmpty(dto.FullName))
                user.Name = dto.FullName;

            if (!string.IsNullOrEmpty(dto.DefaultAddress))
                user.DefaultAddress = dto.DefaultAddress;

            if (dto.Avatar != null)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Avatar.FileName)}";
                var filePath = Path.Combine(_env.WebRootPath, "uploads", fileName);

                if (!Directory.Exists(Path.Combine(_env.WebRootPath, "uploads")))
                    Directory.CreateDirectory(Path.Combine(_env.WebRootPath, "uploads"));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Avatar.CopyToAsync(stream);
                }

                user.AvatarUrl = $"uploads/{fileName}";
            }

            await _context.SaveChangesAsync();
            return Ok(user);
        }

        // ✅ Kullanıcıya adres ekle
        [HttpPost("{id}/address")]
        public async Task<IActionResult> AddAddress(int id, [FromBody] AddressDto dto)
        {
            var user = await _context.Users.Include(u => u.Addresses).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();

            var newAddress = new Address
            {
                Line1 = dto.Line1,
                City = dto.City,
                State = dto.State,
                Zip = dto.Zip,
                Phone = dto.Phone
            };

            user.Addresses.Add(newAddress);
            await _context.SaveChangesAsync();

            return Ok(user.Addresses);
        }

        // ✅ Adres düzenle
        [HttpPut("{id}/address/{addressId}")]
        public async Task<IActionResult> UpdateAddress(int id, int addressId, [FromBody] AddressDto dto)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == id);
            if (address == null) return NotFound();

            address.Line1 = dto.Line1;
            address.City = dto.City;
            address.State = dto.State;
            address.Zip = dto.Zip;
            address.Phone = dto.Phone;

            await _context.SaveChangesAsync();
            return Ok(address);
        }

        // ✅ Adres sil
        [HttpDelete("{id}/address/{addressId}")]
        public async Task<IActionResult> DeleteAddress(int id, int addressId)
        {
            var address = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == addressId && a.UserId == id);
            if (address == null) return NotFound();

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Address deleted successfully." });
        }
    }
}