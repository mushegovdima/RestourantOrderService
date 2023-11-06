using System.Collections.Generic;
using Eat.Api.Models;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eat.Api.Migrations
{
    /// <inheritdoc />
    public partial class ribboncategory4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tags",
                table: "Positions");

            migrationBuilder.AddColumn<IEnumerable<Category>>(
                name: "Categories",
                table: "Sellers",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<IEnumerable<long>>(
                name: "CategoryIds",
                table: "Positions",
                type: "jsonb",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categories",
                table: "Sellers");

            migrationBuilder.DropColumn(
                name: "CategoryIds",
                table: "Positions");

            migrationBuilder.AddColumn<IEnumerable<Category>>(
                name: "Tags",
                table: "Positions",
                type: "jsonb",
                nullable: true);
        }
    }
}
