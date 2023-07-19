using APISoftnetCS.Data;
using APISoftnetCS.Models;
using APISoftnetCS.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace APISoftnetCS.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SFController : ControllerBase
  {
    private readonly dbusuariosDbContext _dbContext;
    public SFController(dbusuariosDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpGet("ListUserDet")]
    public async Task<ActionResult<IEnumerable<UserCompany>>> GetUsuariosConEmpresas()
    {
      var usuariosConEmpresas = await _dbContext.MAE_USUARIO
          .Join(_dbContext.DET_USUARIO_EMPRESA,
              mu => mu.COD_USUARIO,
              due => due.COD_USUARIO,
              (mu, due) => new UserCompany
              {
                COD_USUARIO = mu.COD_USUARIO,
                TI_DOCUMENTO = mu.TI_DOCUMENTO,
                VAR_DOC_IDENTIDAD = mu.VAR_DOC_IDENTIDAD,
                VAR_APELLIDOS = mu.VAR_APELLIDOS,
                VAR_NOMBRES = mu.VAR_NOMBRES,
                VAR_PASSWORD = mu.VAR_PASSWORD,
                VAR_NUM_TELEFONO = mu.VAR_NUM_TELEFONO,
                VAR_CARGO = due.VAR_CARGO,
                VAR_CORREO = due.VAR_CORREO,
                INT_FLG_ELIMINADO = mu.INT_FLG_ELIMINADO,
                FEC_REGISTRO = mu.FEC_REGISTRO,
                FEC_MODIFICACION = mu.FEC_MODIFICACION
              })
          .ToListAsync();

      return usuariosConEmpresas;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUsuario(int id)
    {
      var usuario = await _dbContext.MAE_USUARIO.FindAsync(id);
      if (usuario == null)
      {
        return NotFound();
      }


      var detallesUsuario = _dbContext.DET_USUARIO_EMPRESA.Where(d => d.COD_USUARIO == id);
      _dbContext.DET_USUARIO_EMPRESA.RemoveRange(detallesUsuario);

      _dbContext.MAE_USUARIO.Remove(usuario);
      await _dbContext.SaveChangesAsync();

      return NoContent();
    }


    [HttpPost("AgregarUsuarioConDetalle")]
    public IActionResult AgregarUsuarioConDetalle([FromBody] UserAndDetails usuarioConDetalle)
    {
      using (var dbContextTransaction = _dbContext.Database.BeginTransaction())
      {
        try
        {
          _dbContext.MAE_USUARIO.Add(usuarioConDetalle.Usuario);
          _dbContext.SaveChanges();
          usuarioConDetalle.Detalle.COD_USUARIO = usuarioConDetalle.Usuario.COD_USUARIO;
          _dbContext.DET_USUARIO_EMPRESA.Add(usuarioConDetalle.Detalle);
          _dbContext.SaveChanges();
          dbContextTransaction.Commit();
          return Ok();
        }
        catch (Exception ex)
        {
          dbContextTransaction.Rollback();
          return BadRequest("Error al agregar el usuario y su detalle: " + ex.Message);
        }
      }
    }


    [HttpPut("ModificarUsuarioConDetalle/{coD_USUARIO}")]
    public IActionResult ModificarUsuarioConDetalle(int id, [FromBody] UserAndDetails usuarioConDetalle)
    {
      using (var dbContextTransaction = _dbContext.Database.BeginTransaction())
      {
        try
        {
          var usuarioExistente = _dbContext.MAE_USUARIO.Find(id);
          if (usuarioExistente == null)
          {
            return NotFound("Usuario no encontrado");
          }

          // Actualizar las propiedades del usuario existente con los valores del objeto usuarioConDetalle.Usuario
          usuarioExistente.TI_DOCUMENTO = usuarioConDetalle.Usuario.TI_DOCUMENTO;
          usuarioExistente.VAR_DOC_IDENTIDAD = usuarioConDetalle.Usuario.VAR_DOC_IDENTIDAD;
          usuarioExistente.VAR_APELLIDOS = usuarioConDetalle.Usuario.VAR_APELLIDOS;
          usuarioExistente.VAR_NOMBRES = usuarioConDetalle.Usuario.VAR_NOMBRES;
          usuarioExistente.VAR_PASSWORD = usuarioConDetalle.Usuario.VAR_PASSWORD;
          usuarioExistente.VAR_NUM_TELEFONO = usuarioConDetalle.Usuario.VAR_NUM_TELEFONO;

          _dbContext.SaveChanges();

          var detalleExistente = _dbContext.DET_USUARIO_EMPRESA.SingleOrDefault(d => d.COD_USUARIO == id);
          if (detalleExistente == null)
          {
            return NotFound("Detalle de usuario no encontrado");
          }

          // Actualizar las propiedades del detalle existente con los valores del objeto usuarioConDetalle.Detalle
          detalleExistente.VAR_CARGO = usuarioConDetalle.Detalle.VAR_CARGO;
          detalleExistente.VAR_CORREO = usuarioConDetalle.Detalle.VAR_CORREO;

          _dbContext.SaveChanges();

          dbContextTransaction.Commit();
          return Ok();
        }
        catch (Exception ex)
        {
          dbContextTransaction.Rollback();
          return BadRequest("Error al modificar el usuario y su detalle: " + ex.Message);
        }
      }
    }





  }
}
