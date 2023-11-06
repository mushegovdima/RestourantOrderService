using System.ComponentModel.DataAnnotations.Schema;
using Eat.Api.Models;
using Eat.SDK.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Eat.Api.Db
{
    public class Position : Entity, IPosition, IEntityTypeConfiguration<Position>
    {
        public string? Description { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public string Title { get; set; } = string.Empty;
        public long TotalOrderCount { get; set; } = 0;
        public long SellerId { get; set; }
        public Seller? Seller { get; set; }
        public string? Image { get; set; }
        public double Weight { get; set; }

        [Column(TypeName = "jsonb")]
        public IEnumerable<Guid> CategoryIds { get; set; } = Enumerable.Empty<Guid>();
        public string? RibbonColor { get; set; }
        public string? RibbonTitle { get; set; }

        public void Configure(EntityTypeBuilder<Position> builder)
        {
        }
    }
}

