using APISoftnetCS.Models;
using APISoftnetCS.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace APISoftnetCS.Data
{
    public class dbusuariosDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DbSet<CMAE_USUARIOS> MAE_USUARIO { get; set; }

        public DbSet<CDET_USUARIO_EMPRESA> DET_USUARIO_EMPRESA { get; set; }
        public dbusuariosDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("dbUsuarios"));
        }
    }
}
