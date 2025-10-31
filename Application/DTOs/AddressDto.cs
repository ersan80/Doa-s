using Microsoft.AspNetCore.Http;

namespace Application.DTOs
{
    public class AddressDto
    {
        public string Line1 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string? Apartment { get; set; }
    }
}
