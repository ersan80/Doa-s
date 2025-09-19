using System.ComponentModel.DataAnnotations;

namespace API.Entity
{
    public class User
    {
        [Key] // Primary key
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(200)]
        // Parola veritabanında düz metin olarak tutulmaz, hashlenmiş halde saklanır.
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Otomatik oluşturma tarihi
        public bool IsActive { get; set; } = true; // Kullanıcı pasif mi aktif mi
    }
}
