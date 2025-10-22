using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDataContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Thursday Blend — Brazil Cascavel × Ethiopia Guji A modern twist on a centuries - old ritual.Thursday Blend brings together the depth and balance of Brazil Cascavel with the vibrant aromatics of Ethiopia Guji,creating a uniquely expressive Turkish coffee experience. Smooth and round with a touch of brightness,it captures the perfect harmony between heritage and innovation.", "blend.jpg", "Thursday Blend", 7.50m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Description for product 1", "1.jpg", "Product 1", 10.99m });
        }
    }
}
