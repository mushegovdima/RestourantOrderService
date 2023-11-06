using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eat.Api.Migrations
{
    /// <inheritdoc />
    public partial class PositionLonk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SellerId",
                table: "Positions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Positions_SellerId",
                table: "Positions",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Sellers_SellerId",
                table: "Positions",
                column: "SellerId",
                principalTable: "Sellers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Sellers_SellerId",
                table: "Positions");

            migrationBuilder.DropIndex(
                name: "IX_Positions_SellerId",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "Positions");
        }
    }
}
