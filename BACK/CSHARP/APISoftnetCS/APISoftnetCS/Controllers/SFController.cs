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

        [HttpGet("Listado-usuarios-detalle")]
        public async Task<ActionResult<IEnumerable<T_DET_USUARIO_EMPRESA>>> getUsuariosDetalle()
        {
            var elementos = await _dbContext.DET_USUARIO_EMPRESA.ToListAsync();
            return Ok(elementos);
        }

        [HttpGet("Listado-usuarios")]
        public async Task<ActionResult<IEnumerable<T_MAE_USUARIOS>>> getUsuarios()
        {
            var elementos = await _dbContext.MAE_USUARIO.ToListAsync();
            return Ok(elementos);
        }


        [HttpPost("agregar-usuario")]
        public IActionResult AgregarUsuario([FromBody] T_MAE_USUARIOS model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var nuevoRegistro = new CMAE_USUARIOS
                    {

                        TI_DOCUMENTO = model.TI_DOCUMENTO,
                        VAR_DOC_IDENTIDAD = model.VAR_DOC_IDENTIDAD,
                        VAR_APELLIDOS = model.VAR_APELLIDOS,
                        VAR_NOMBRES = model.VAR_NOMBRES,
                        VAR_PASSWORD = model.VAR_PASSWORD,
                        VAR_NUM_TELEFONO = model.VAR_NUM_TELEFONO,
                        INT_FLG_ELIMINADO = model.INT_FLG_ELIMINADO,
                        FEC_REGISTRO = model.FEC_REGISTRO,
                        FEC_MODIFICACION = model.FEC_MODIFICACION,
                    };

                    _dbContext.MAE_USUARIO.Add(nuevoRegistro);
                    _dbContext.SaveChanges();

                    return Ok();
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {

                return BadRequest("Error al agregar el recibo: " + ex.Message);
            }

        }
    }
}
