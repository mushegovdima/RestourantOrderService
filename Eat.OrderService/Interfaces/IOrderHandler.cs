using Eat.OrderService.Db;
using Eat.SDK.Models;

namespace Eat.OrderService.Interfaces
{
    public interface IOrderHandler
    {
        /// <summary>
        /// Id
        /// </summary>
        public Guid Id { get; }

        /// <summary>
        /// Название
        /// </summary>
        public string Title { get; }

        /// <summary>
        /// ISO country code https://countrycode.org/
        /// </summary>
        public string? Country { get; }

        /// <summary>
        /// Класс, описывающий настройки обработчика (будет храниться в Data)
        /// </summary>
        public Type SettingsType { get; }

        /// <summary>
        /// Проверяем корректность заполненных настроек
        /// </summary>
        /// <param name="data"></param>
        /// <returns>Описание ошибки, если нет, то возвращает null</returns>
        public Task<string?> CheckErrors(object? data);

        /// <summary>
        /// Отправить order по назначению
        /// </summary>
        /// <param name="order"></param>
        /// <param name="settings"></param>
        /// <returns></returns>
        public Task<bool> SendOrder(IOrder order, object? settings);
    }
}

