using Microsoft.EntityFrameworkCore;

namespace Eat.OrderService.Db;

public class DataContext: DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderHandlerSettings> HandlerSettings { get; set; }
}

