using Newtonsoft.Json.Linq;

namespace Eat.OrderService.Dto
{
    public class OrderHandlerSettingsRequest
    {
        public long SellerId { get; set; }

        public required Guid HandlerId { get; set; }

        public JObject? Data { get; set; }
    }
}

