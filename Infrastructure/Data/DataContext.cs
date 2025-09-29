using Microsoft.EntityFrameworkCore;
using Infrastructure.Entity;

namespace Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Product entity'leri için başlangıç verileri
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Product 1",
                    Description = "Description for product 1",
                    Price = 10.99m,
                    IsActive = true,
                    ImageUrl = "1.jpg",
                    Stock = 100
                },
                new Product
                {
                    Id = 2,
                    Name = "Product 2",
                    Description = "Description for product 2",
                    Price = 20.99m,
                    IsActive = true,
                    ImageUrl = "2.jpg",
                    Stock = 50
                },
                new Product
                {
                    Id = 3,
                    Name = "Product 3",
                    Description = "Description for product 3",
                    Price = 15.49m,
                    IsActive = true,
                    ImageUrl = "3.jpg",
                    Stock = 0
                },
                new Product
                {
                    Id = 4,
                    Name = "Product 4",
                    Description = "Description for product 4",
                    Price = 5.99m,
                    IsActive = true,
                    ImageUrl = "4.jpg",
                    Stock = 200
                },
                new Product
                {
                    Id = 5,
                    Name = "Product 5",
                    Description = "Description for product 5",
                    Price = 8.75m,
                    IsActive = true,
                    ImageUrl = "5.jpg",
                    Stock = 80
                },
                new Product
                {
                    Id = 6,
                    Name = "Product 6",
                    Description = "Description for product 6",
                    Price = 12.00m,
                    IsActive = false,
                    ImageUrl = "6.jpg",
                    Stock = 150
                },
                new Product
                {
                    Id = 7,
                    Name = "Product 7",
                    Description = "Description for product 7",
                    Price = 30.00m,
                    IsActive = true,
                    ImageUrl = "7.jpg",
                    Stock = 20
                }
            );
        }
    }
}