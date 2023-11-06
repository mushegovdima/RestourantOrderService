using System.ComponentModel.DataAnnotations;
using Eat.SDK.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Eat.AuthService.Db
{
    public class Customer : Entity, ICustomer, IEntityTypeConfiguration<Customer>
    {
        [DataType(DataType.EmailAddress)]
        public required string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        public required string Phone { get; set; }

        public required string Name { get; set; }

        public bool IsBlocked { get; set; }

        public bool EmailConfirmed { get; set; }

        public bool PhoneConfirmed { get; set; }

        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.HasAlternateKey(x => x.Email);
        }
    }
}

