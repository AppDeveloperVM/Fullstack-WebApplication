 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace BackEnd
{
  public class ApplicationDbContext: DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
    public DbSet<TarjetaCredito> tarjetaCredito { get; set; }
  }
}
