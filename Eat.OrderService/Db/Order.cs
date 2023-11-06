using System.ComponentModel.DataAnnotations.Schema;
using Eat.OrderService.Dto;
using Eat.SDK.Enums;
using Eat.SDK.Models;

namespace Eat.OrderService.Db
{
    public class Order : Entity, IOrder
    {
        public long SellerId { get; set; }
        public long? CustomerId { get; set; }
        public long? TableNumber { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public OrderStatus Status { get; set; }
        public DateTimeOffset LastStatusDate { get; set; }
        public double TotalPrice { get; set; }

        [NotMapped]
        public string Title => "Order #" + Id;

        [Column(TypeName = "jsonb")]
        public IOrderPosition[] Positions { get; set; } = Array.Empty<IOrderPosition>();

        public static Order Create(NewOrderRequest model)
        {
            var now = DateTimeOffset.UtcNow;
            return new Order()
            {
                CreatedAt = now,
                LastStatusDate = now,
                SellerId = model.SellerId,
                CustomerId = model.CustomerId,
                Positions = model.Positions,
                TableNumber = model.TableNumber,
                TotalPrice = model.TotalPrice,
                Status = OrderStatus.New,
            };
        }
    }
}

