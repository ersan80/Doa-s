using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedProduct_6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[] { 6, "Description for product 6", "https://example.com/product6.jpg", false, "Product 6", 12.00m, 150 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
