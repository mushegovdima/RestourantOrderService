using System.Text;
using Eat.OrderService.Interfaces;
using Eat.OrderService.Services;
using Eat.SDK.Models;

namespace Eat.OrderService.OrderHanders
{
    public class TelegramOrderHandler : IOrderHandler
    {
        private readonly TelegramBotService _botService;

        public TelegramOrderHandler(TelegramBotService botService)
        {
            _botService = botService;
        }

        public Guid Id => new Guid("5217ebbd-5c4a-4a5e-9a51-fb208093acc0");
        public string Title => "Telegram";
        public string? Country => null;
        public Type SettingsType => typeof(Settings);

        public async Task<string?> CheckErrors(object? data)
        {
            return data is Settings settings
                && settings.ChatId > 0
                && await _botService.SendMessage(settings.ChatId, "Hello, it\\`s EatProject\\! \n *Connection successfull\\!*")
                ? null
                : "Не смогли отправить сообщение";
        }

        public async Task<bool> SendOrder(IOrder order, object? settings)
        {
            var str = new StringBuilder();

            str.Append($"*New order \\#{order.Id}*\n");
            if (order.TableNumber.HasValue) str.Append($"table: {order.TableNumber}\n");
            str.Append($"\n{string.Join("\n", order.Positions.Select(x => $"{x.Title} x{x.Count} \\= {x.Price}"))}\n");
            str.Append($"\n*Total: {order.TotalPrice}*");
            
            return settings is Settings data
                && await _botService.SendMessage(data.ChatId, str.Replace("+", "\\+").ToString());
        }

        public class Settings
        {
            public required long ChatId { get; set; }
        }
    }
}

