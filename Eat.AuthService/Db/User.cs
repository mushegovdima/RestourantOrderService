
using System.ComponentModel.DataAnnotations;
using Eat.SDK.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Eat.AuthService.Db
{
    public class User : Entity, IUser, IEntityTypeConfiguration<User>
    {
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; } = string.Empty;

        [DataType(DataType.PhoneNumber)]
        public required string Phone { get; set; }

        public required string Name { get; set; }

        public bool IsBlocked { get; set; }

        public bool EmailConfirmed { get; set; }

        public bool PhoneConfirmed { get; set; }

        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasAlternateKey(x => x.Email);
        }
    }
}

