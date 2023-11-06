using Eat.OrderService.Interfaces;

namespace Eat.OrderService.Dto
{
    public class OrderHandlerResponse
    {
        public OrderHandlerResponse(IOrderHandler handler)
        {
            Id = handler.Id;
            Title = handler.Title;
            Fields = handler.SettingsType.GetProperties().Select(x => x.Name);
        }

        public Guid Id { get; set; }
        public string Title { get; set; }
        public IEnumerable<string> Fields { get; set; }
    }
}

