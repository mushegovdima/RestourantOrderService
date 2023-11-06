
using System.ComponentModel.DataAnnotations;

public class UserRequest
{
    public long? Id { get; set; }

    [DataType(DataType.EmailAddress)]
    public required string Email { get; set; } = string.Empty;

    [DataType(DataType.PhoneNumber)]
    public required string Phone { get; set; }

    public required string Name { get; set; }
}