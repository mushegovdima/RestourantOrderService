using Eat.SDK.Enums;
using Eat.SDK.Interfaces;

namespace Eat.SDK.Models;

public interface ISeller : IHasTitle
{
    long OwnerId { get; set; }
    SellerStatus Status { get; set; }
    string Login { get; set; }
    string? Image { get; set; }
}