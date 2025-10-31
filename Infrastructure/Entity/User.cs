using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization; // ✅ bunu ekle

namespace Infrastructure.Entity
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string? Name { get; set; }

        [Required, EmailAddress, StringLength(100)]
        public string? Email { get; set; }

        [Required, StringLength(200)]
        public string? PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        // 🔑 Email Confirmation
        public bool IsEmailConfirmed { get; set; } = false;
        public string? EmailConfirmationToken { get; set; }
        public DateTime? TokenExpiry { get; set; }
        public DateTime? ConfirmedAt { get; set; }

        // 🆕 Yeni alanlar
        public string? AvatarUrl { get; set; }
        public string? DefaultAddress { get; set; }

        // 🧩 Sonsuz döngüyü engelle
        [JsonIgnore] // ✅ Buraya ekle
        public ICollection<Address>? Addresses { get; set; } = new List<Address>();
    }
}
