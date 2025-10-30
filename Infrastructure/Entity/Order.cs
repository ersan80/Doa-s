namespace Infrastructure.Entity
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending"; // Pending, Preparing, Shipped, Completed
        public decimal TotalPrice { get; set; } // ✅ EKLENDİ
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<OrderItem> Items { get; set; } = new();
    }

    public class OrderItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty; // ✅ EKLENDİ
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
