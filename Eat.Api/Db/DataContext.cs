using Microsoft.EntityFrameworkCore;

namespace Eat.Api.Db;

public class DataContext: DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<Position> Positions { get; set; }
    public DbSet<Seller> Sellers { get; set; }
}
