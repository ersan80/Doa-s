using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Infrastructure.Entity; // ✅ Order ve Product buradan geliyor
using Application.DTOs; // ✅ OrderDto buradan geliyor
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;



[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly DataContext _context;

    public OrderController(DataContext context)
    {
        _context = context;
    }

    // ✅ Sipariş oluşturma
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] OrderDto dto)
    {
        if (dto == null || dto.Items == null || !dto.Items.Any())
            return BadRequest("Order is empty.");

        var order = new Order
        {
            UserId = dto.UserId,
            Total = dto.Items.Sum(i => i.Price * i.Quantity),
            Items = dto.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                ProductName = i.ProductName,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        _context.Orders.Add(order);

        // ✅ Stok düşürme
        foreach (var item in dto.Items)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == item.ProductId);
            if (product != null)
            {
                product.Stock -= item.Quantity;
                if (product.Stock < 0) product.Stock = 0;
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { order.Id, Message = "Order created successfully." });
    }

    // ✅ Tüm siparişleri listeleme (admin)
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
        return Ok(orders);
    }

    // ✅ Tek sipariş detayı
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);
        if (order == null) return NotFound();
        return Ok(order);
    }
}
