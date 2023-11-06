using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eat.OrderService.Migrations
{
    /// <inheritdoc />
    public partial class removeOrderTitle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
