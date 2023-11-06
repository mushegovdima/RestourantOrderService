using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eat.AuthService.Migrations
{
    /// <inheritdoc />
    public partial class t11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PhoneConfirmed",
                table: "Customers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_Email",
                table: "Users",
                column: "Email");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Customers_Email",
                table: "Customers",
                column: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_Email",
                table: "Users");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Customers_Email",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "PhoneConfirmed",
                table: "Customers");
        }
    }
}
