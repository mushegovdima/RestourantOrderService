using Telegram.Bot;
using Telegram.Bot.Exceptions;
using Telegram.Bot.Polling;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;

namespace Eat.OrderService.Services
{
    public class TelegramBotService
    {
        private readonly TelegramBotClient? _client;
        private readonly ILogger<TelegramBotService> _logger;

        public TelegramBotService(AppSettings settings, ILogger<TelegramBotService> logger)
        {
            _logger = logger;

            if (settings.TelegramBotKey is null)
            {
                _logger.LogError("telegram bot api not found!!!");
            }
            else
            {
                using var cts = new CancellationTokenSource();
                _client = new TelegramBotClient(settings.TelegramBotKey);

                _client.StartReceiving(
                    updateHandler: HandleUpdateAsync,
                    pollingErrorHandler: HandlePollingErrorAsync,
                    receiverOptions: new ReceiverOptions() { AllowedUpdates = new[] { UpdateType.Message } },
                    cancellationToken: cts.Token);
            };
        }

        public async Task<bool> SendMessage(long chatId, string text)
        {
            if (_client is null) throw new Exception();

            var response = await _client.SendTextMessageAsync(chatId, text, parseMode: ParseMode.MarkdownV2);
            _logger.LogInformation($"Bot send {text} to {chatId}. Success: {response is not null}");
            return response is not null;
        }

        async Task HandleUpdateAsync(ITelegramBotClient client, Update update, CancellationToken token)
        {
            if (update.Type is UpdateType.Message && update.Message.Text.ToLower() == "/start")
            {
                var chatId = update.Message.Chat.Id;
                await client.SendTextMessageAsync(chatId, $"Your id: `{chatId}`", parseMode: ParseMode.MarkdownV2, cancellationToken: token);
            }
        }

        Task HandlePollingErrorAsync(ITelegramBotClient botClient, Exception exception, CancellationToken cancellationToken)
        {
            var ErrorMessage = exception switch
            {
                ApiRequestException apiRequestException
                    => $"Telegram API Error:\\n[{apiRequestException.ErrorCode}]\\n{apiRequestException.Message}",
                _ => exception.ToString()
            };

            _logger.LogError(ErrorMessage);
            return Task.CompletedTask;
        }
    }
}

