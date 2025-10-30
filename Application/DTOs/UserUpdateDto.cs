using Microsoft.AspNetCore.Http;

namespace Application.DTOs
{
    public class UserUpdateDto
    {
        public string FullName { get; set; }
        public string DefaultAddress { get; set; }
        public IFormFile? Avatar { get; set; }
    }

   
}