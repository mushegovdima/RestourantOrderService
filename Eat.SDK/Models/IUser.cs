using Eat.SDK.Interfaces;

namespace Eat.SDK.Models;

public interface IUser: IEntity
{
    string Name { get; set; }
    string Email { get; set; }
    bool EmailConfirmed { get; set; }
    string Phone { get; set; }
    bool PhoneConfirmed { get; set; }
    bool IsBlocked { get; set; }
}