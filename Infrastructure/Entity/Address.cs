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

        // Foreign Key
        public int UserId { get; set; }

        // Navigation
        public User User { get; set; }
    }
}
