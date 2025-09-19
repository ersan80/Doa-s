using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class TestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Description for product 1", "https://example.com/product1.jpg", true, "Product 1", 10.99m, 100 },
                    { 2, "Description for product 2", "https://example.com/product2.jpg", true, "Product 2", 20.99m, 50 },
                    { 3, "Description for product 3", "https://example.com/product3.jpg", false, "Product 3", 15.49m, 0 },
                    { 4, "Description for product 4", "https://example.com/product4.jpg", true, "Product 4", 5.99m, 200 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
