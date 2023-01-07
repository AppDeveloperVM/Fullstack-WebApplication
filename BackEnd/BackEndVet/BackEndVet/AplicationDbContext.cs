using BackEndVet.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndVet
{
  public class AplicationDbContext : DbContext
  {

    public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
    {

    }
    public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
  }
}
