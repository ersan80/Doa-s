using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedNexProductImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[] { 7, "Each piece in this handcrafted copper coffee pot set is forged by skilled artisans, carrying forward the timeless ritual of Turkish coffee with modern elegance. Made from pure copper with a tin lined interior and solid brass handle, this set ensures even heat distribution and long - lasting quality. Perfect for those who value craftsmanship and authenticity in every brew.", "blendd.png", false, "Handcrafted Copper Coffee Pot Set (3 pcs) Tradition Meets Elegance", 200.00m, 80 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
