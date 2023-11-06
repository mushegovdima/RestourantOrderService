using System.Collections.Generic;
using Eat.Api.Models;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eat.Api.Migrations
{
    /// <inheritdoc />
    public partial class categoryseller : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<IEnumerable<Category>>(
                name: "Categories",
                table: "Sellers",
                type: "jsonb",
                nullable: false,
                oldClrType: typeof(IEnumerable<Category>),
                oldType: "jsonb",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<IEnumerable<Category>>(
                name: "Categories",
                table: "Sellers",
                type: "jsonb",
                nullable: true,
                oldClrType: typeof(IEnumerable<Category>),
                oldType: "jsonb");
        }
    }
}
