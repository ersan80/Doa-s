using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeededProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Rooted in tradition and built for daily ritual, this cezve is crafted for consistent balance and a timeless silhouette. Its smooth surface and graceful lines reflect the beauty of simplicity — a faithful companion for everyday Turkish coffee brewing. Made from 1 mm solid copper and lined with pure tin, it offers reliable heat distribution and a smooth brewing experience. Lightweight yet enduring, it represents the pure essence of the Turkish coffee craft — elegant, consistent, and built to last. This is more than a coffee pot — it’s a daily expression of heritage, made to bring authentic coffee moments to every home.", "classic_copper.jpeg", "Classic Copper Cezve — Traditional Form (1 mm)", 50.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Forged with both precision and artistry, this cezve begins with a carefully shaped copper form, then comes to life through hand-hammering and detailed finishing by skilled artisans. Each piece carries its own subtle variations in texture a perfect balance between craftsmanship and consistency. Made from 1.5 mm solid copper and lined with pure tin, it delivers exceptional heat control,durability, and depth of flavor.No two are exactly alike — every cezve bears the signature touch of its maker, blending heritage and refinement in every curve. This is more than a coffee pot — it’s craftsmanship with precision, created to honor both tradition and modernity.", "heritage.jpeg", "Heritage Copper Cezve — Hand-Finished (1.5 mm)", 65.00m, 50 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Trabzon Handcrafted Copper Cezve Forged by hand on the Black Sea coast, this cezve is crafted entirely without molds each one unique in form, balance, and soul. Every curve, every hammer mark reflects the rhythm of its maker, a master coppersmith from Trabzon continuing a tradition that has shaped copper for centuries. Made from 1.5 mm solid copper and lined with pure tin, it offers precise heat control and exceptional durability — designed for the smooth, rich foam of authentic Turkish coffee. No two are ever the same. This is more than a coffee pot — it’s a living piece of craftsmanship, where tradition meets individuality.", "trabzon.jpeg", "Trabzon Handcrafted Copper Cezve", 75.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Each piece in this handcrafted copper coffee pot set is forged by skilled artisans, carrying forward the timeless ritual of Turkish coffee with modern elegance. Made from pure copper with a tin lined interior and solid brass handle, this set ensures even heat distribution and long - lasting quality. Perfect for those who value craftsmanship and authenticity in every brew.", "mix_set.jpeg", "Handcrafted Copper Coffee Pot Set (3 pcs) Tradition Meets Elegance", 200.00m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Description for product 2", "2.jpg", "Product 2", 20.99m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Description for product 3", "3.jpg", "Product 3", 15.49m, 0 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Description for product 4", "4.jpg", "Product 4", 5.99m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Description for product 5", "5.jpg", "Product 5", 8.75m });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 6, "Description for product 6", "6.jpg", false, "Product 6", 12.00m, 150 },
                    { 7, "Description for product 7", "7.jpg", true, "Product 7", 30.00m, 20 }
                });
        }
    }
}
