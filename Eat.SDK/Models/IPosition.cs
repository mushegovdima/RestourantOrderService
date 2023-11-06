using Eat.SDK.Interfaces;

namespace Eat.SDK.Models;

public interface IPosition: IEntity, IHasTitle
{
    /// <summary>
    /// Описание
    /// </summary>
    string? Description { get; set; }

    /// <summary>
    /// Цена (финальная)
    /// </summary>
    double Price { get; set; }

    /// <summary>
    /// Размер скидки
    /// </summary>
    double Discount { get; set; }

    /// <summary>
    /// Количество заказов
    /// </summary>
    long TotalOrderCount { get; set; }

    /// <summary>
    /// Ссылка на продавца
    /// </summary>
    long SellerId { get; set; }

    /// <summary>
    /// Ссылка на изображение
    /// </summary>
    string? Image { get; set; }

    /// <summary>
    /// Вес
    /// </summary>
    double Weight { get; set; }
}