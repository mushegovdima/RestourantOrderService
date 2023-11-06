namespace Eat.SDK.Models
{
    public interface INewOrder
    {
        long SellerId { get; set; }
        long? CustomerId { get; set; }
        long? TableNumber { get; set; }
        IOrderPosition[] Positions { get; set; }
        double TotalPrice { get; set; }
    }
}

