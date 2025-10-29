namespace Application.DTOs
{
    public class OrderDto
    {
        public string UserId { get; set; } = string.Empty;
        public List<OrderItemDto> Items { get; set; } = new();
        public string CustomerName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";

    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}

