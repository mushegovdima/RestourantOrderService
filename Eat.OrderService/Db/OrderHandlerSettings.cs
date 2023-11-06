using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace Eat.OrderService.Db;

public class OrderHandlerSettings : Entity, IEntityTypeConfiguration<OrderHandlerSettings>
{
    public long SellerId { get; set; }

    public required Guid HandlerId { get; set; }

    [Column(TypeName = "jsonb")]
    public object? Data { get; set; }

    public void Configure(EntityTypeBuilder<OrderHandlerSettings> builder)
    {
        builder.HasIndex(x => x.SellerId).IsUnique();

        builder.Property(x => x.Data)
            .HasConversion(
            v => JsonConvert.SerializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Include }),
            v => JsonConvert.DeserializeObject(v, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Include }));
    }
}

