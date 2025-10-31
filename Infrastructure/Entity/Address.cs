using System.Text.Json.Serialization;

namespace Infrastructure.Entity
{
    public class Address
    {
        public int Id { get; set; }
        public string Line1 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Zip { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Apartment { get; set; } = string.Empty;


        public int UserId { get; set; }

        // 🧩 Sonsuz döngüyü engelle
        [JsonIgnore] // ✅ Buraya da ekle
        public User? User { get; set; }
    }
}
