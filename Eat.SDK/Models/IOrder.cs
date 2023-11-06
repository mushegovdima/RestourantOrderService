using Eat.SDK.Enums;
using Eat.SDK.Interfaces;

namespace Eat.SDK.Models;

public interface IOrder : IEntity
{
    long SellerId { get; set; }
    long? CustomerId { get; set; }
    long? TableNumber { get; set; }
    DateTimeOffset CreatedAt { get; set; }
    OrderStatus Status { get; set; }
    DateTimeOffset LastStatusDate { get; set; }
    IOrderPosition[] Positions { get; set; }
    double TotalPrice { get; set; }
}
