using System.ComponentModel.DataAnnotations;

namespace Infrastructure.Entity

{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [Required]
        [StringLength(200)]
        public string? PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        // 🔑 EKLEDİKLERİM
        public bool IsEmailConfirmed { get; set; } = false; // Email doğrulandı mı
        public string? EmailConfirmationToken { get; set; } // Rastgele token
        public DateTime? TokenExpiry { get; set; }          // Token geçerlilik süresi
        public DateTime? ConfirmedAt { get; set; }          // Onaylandığı tarih


        // 🆕 Yeni alanlar:
        public string? AvatarUrl { get; set; }
        public string? DefaultAddress { get; set; }

        // 🆕 Navigation property
        public ICollection<Address>? Addresses { get; set; } = new List<Address>();
    }
}
