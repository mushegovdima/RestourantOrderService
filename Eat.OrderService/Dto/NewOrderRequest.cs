using Eat.SDK.Models;

namespace Eat.OrderService.Dto;

public class NewOrderRequest
{
    public long SellerId { get; set; }
    public long? CustomerId { get; set; }
    public long? TableNumber { get; set; }
    public required OrderPosition[] Positions { get; set; }
    public double TotalPrice { get; set; }

    public class OrderPosition : IOrderPosition
    {
        public long Id { get; set; }
        public required string Title { get; set; }
        public int Count { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public long SellerId { get; set; }
        public long PositionId { get; set; }
    }
}

