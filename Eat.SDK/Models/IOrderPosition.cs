using Eat.SDK.Interfaces;

namespace Eat.SDK.Models;

public interface IOrderPosition: IEntity, IHasTitle
{
    /// <summary>
    /// Количество
    /// </summary>
    int Count { get; set; }

    /// <summary>
    /// Цена (финальная)
    /// </summary>
    double Price { get; set; }

    /// <summary>
    /// Размер скидки
    /// </summary>
    double Discount { get; set; }

    /// <summary>
    /// Ссылка на продавца
    /// </summary>
    long SellerId { get; set; }
}