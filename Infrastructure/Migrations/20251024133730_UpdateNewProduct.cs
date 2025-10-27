using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNewProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Thursday Blend — Brazil Cascavel × Ethiopia Guji A modern twist on a centuries - old ritual.Thursday Blend brings together the depth and balance of Brazil Cascavel with the vibrant aromatics of Ethiopia Guji,creating a uniquely expressive Turkish coffee experience. Smooth and round with a touch of brightness,it captures the perfect harmony between heritage and innovation.", "blend.jpg", "Thursday Blend", 7.50m, 100 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Rooted in tradition and built for daily ritual, this cezve is crafted for consistent balance and a timeless silhouette. Its smooth surface and graceful lines reflect the beauty of simplicity — a faithful companion for everyday Turkish coffee brewing. Made from 1 mm solid copper and lined with pure tin, it offers reliable heat distribution and a smooth brewing experience. Lightweight yet enduring, it represents the pure essence of the Turkish coffee craft — elegant, consistent, and built to last. This is more than a coffee pot — it’s a daily expression of heritage, made to bring authentic coffee moments to every home.", "classic_copper.jpeg", "Classic Copper Cezve — Traditional Form (1 mm)", 50.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Forged with both precision and artistry, this cezve begins with a carefully shaped copper form, then comes to life through hand-hammering and detailed finishing by skilled artisans. Each piece carries its own subtle variations in texture a perfect balance between craftsmanship and consistency. Made from 1.5 mm solid copper and lined with pure tin, it delivers exceptional heat control,durability, and depth of flavor.No two are exactly alike — every cezve bears the signature touch of its maker, blending heritage and refinement in every curve. This is more than a coffee pot — it’s craftsmanship with precision, created to honor both tradition and modernity.", "heritage.jpeg", "Heritage Copper Cezve — Hand-Finished (1.5 mm)", 65.00m, 50 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Trabzon Handcrafted Copper Cezve Forged by hand on the Black Sea coast, this cezve is crafted entirely without molds each one unique in form, balance, and soul. Every curve, every hammer mark reflects the rhythm of its maker, a master coppersmith from Trabzon continuing a tradition that has shaped copper for centuries. Made from 1.5 mm solid copper and lined with pure tin, it offers precise heat control and exceptional durability — designed for the smooth, rich foam of authentic Turkish coffee. No two are ever the same. This is more than a coffee pot — it’s a living piece of craftsmanship, where tradition meets individuality.", "trabzon.jpeg", "Trabzon Handcrafted Copper Cezve", 75.00m, 200 });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[] { 6, "Each piece in this handcrafted copper coffee pot set is forged by skilled artisans, carrying forward the timeless ritual of Turkish coffee with modern elegance. Made from pure copper with a tin lined interior and solid brass handle, this set ensures even heat distribution and long - lasting quality. Perfect for those who value craftsmanship and authenticity in every brew.", "mix_set.jpeg", true, "Handcrafted Copper Coffee Pot Set (3 pcs) Tradition Meets Elegance", 200.00m, 80 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Rooted in tradition and built for daily ritual, this cezve is crafted for consistent balance and a timeless silhouette. Its smooth surface and graceful lines reflect the beauty of simplicity — a faithful companion for everyday Turkish coffee brewing. Made from 1 mm solid copper and lined with pure tin, it offers reliable heat distribution and a smooth brewing experience. Lightweight yet enduring, it represents the pure essence of the Turkish coffee craft — elegant, consistent, and built to last. This is more than a coffee pot — it’s a daily expression of heritage, made to bring authentic coffee moments to every home.", "classic_copper.jpeg", "Classic Copper Cezve — Traditional Form (1 mm)", 50.00m, 50 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Forged with both precision and artistry, this cezve begins with a carefully shaped copper form, then comes to life through hand-hammering and detailed finishing by skilled artisans. Each piece carries its own subtle variations in texture a perfect balance between craftsmanship and consistency. Made from 1.5 mm solid copper and lined with pure tin, it delivers exceptional heat control,durability, and depth of flavor.No two are exactly alike — every cezve bears the signature touch of its maker, blending heritage and refinement in every curve. This is more than a coffee pot — it’s craftsmanship with precision, created to honor both tradition and modernity.", "heritage.jpeg", "Heritage Copper Cezve — Hand-Finished (1.5 mm)", 65.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Trabzon Handcrafted Copper Cezve Forged by hand on the Black Sea coast, this cezve is crafted entirely without molds each one unique in form, balance, and soul. Every curve, every hammer mark reflects the rhythm of its maker, a master coppersmith from Trabzon continuing a tradition that has shaped copper for centuries. Made from 1.5 mm solid copper and lined with pure tin, it offers precise heat control and exceptional durability — designed for the smooth, rich foam of authentic Turkish coffee. No two are ever the same. This is more than a coffee pot — it’s a living piece of craftsmanship, where tradition meets individuality.", "trabzon.jpeg", "Trabzon Handcrafted Copper Cezve", 75.00m, 200 });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "ImageUrl", "Name", "Price", "Stock" },
                values: new object[] { "Each piece in this handcrafted copper coffee pot set is forged by skilled artisans, carrying forward the timeless ritual of Turkish coffee with modern elegance. Made from pure copper with a tin lined interior and solid brass handle, this set ensures even heat distribution and long - lasting quality. Perfect for those who value craftsmanship and authenticity in every brew.", "mix_set.jpeg", "Handcrafted Copper Coffee Pot Set (3 pcs) Tradition Meets Elegance", 200.00m, 80 });
        }
    }
}
