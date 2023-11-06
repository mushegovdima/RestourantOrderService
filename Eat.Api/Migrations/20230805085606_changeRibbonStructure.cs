using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eat.Api.Migrations
{
    /// <inheritdoc />
    public partial class changeRibbonStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RibbonColor",
                table: "Positions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RibbonTitle",
                table: "Positions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Positions",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RibbonColor",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "RibbonTitle",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Positions");
        }
    }
}
