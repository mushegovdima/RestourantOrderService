using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Eat.Api.Models;
using Eat.SDK.Enums;
using Eat.SDK.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Eat.Api.Db
{
    public class Seller : Entity, ISeller, IEntityTypeConfiguration<Seller>
    {
        public SellerStatus Status { get; set; }

        public required string Title { get; set; }

        [DataType(DataType.Text)]
        public required string Login { get; set; }

        public string? Image { get; set;}

        public virtual IEnumerable<Position> Positions { get; set; } = Enumerable.Empty<Position>();

        [Column(TypeName = "jsonb")]
        public IEnumerable<Category> Categories { get; set; } = Enumerable.Empty<Category>();

        public required long OwnerId { get; set; }

        public void Configure(EntityTypeBuilder<Seller> builder)
        {
            builder
                .HasMany(x => x.Positions)
                .WithOne(x => x.Seller)
                .HasForeignKey(x => x.SellerId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasAlternateKey(x => x.Login);
        }
    }
}