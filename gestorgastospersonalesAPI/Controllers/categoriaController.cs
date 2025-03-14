using System.Security.Claims;
using gestorgastospersonalesAPI.Data;
using gestorgastospersonalesAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestorgastospersonalesAPI.Controllers
{
    [Route("api/categoria")]
    [Authorize]
    [ApiController]
    public class categoriaController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<categoriaModel>>> get()
        {

            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var function = new Dcategoria();
            var listar = await function.Listarcategoria(idUsuario);
            return listar;
        }

        [HttpGet("Obtener/{IDCATEGORIA}")]
        public async Task<ActionResult<categoriaModel>> obteneridctegoria(int IDCATEGORIA) {

            var function = new Dcategoria();
            var categoriaid = await function.obteneridcategoria(IDCATEGORIA);
            if (categoriaid == null)
            {
                return NotFound("No se encontró la categoría con ese ID.");
            }

            return Ok(categoriaid);

        }

        [HttpPut("editar/{IDCATEGORIA}")]
        public async Task<ActionResult> Put(int IDCATEGORIA, [FromBody] categoriaModel modelo)
        {

            var function = new Dcategoria();
            modelo.IDCATEGORIA = IDCATEGORIA;
            await function.editarcategoria(modelo);
            return NoContent();

        }

        [HttpPost]
        [Route("Nuevo")]
        public async Task Post([FromBody] categoriaModel parametros)
        {

            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            parametros.IDUSUARIO = idUsuario;
            var function = new Dcategoria();
            await function.insertarcategoria(parametros);

        }

        [HttpDelete("{IDCATEGORIA}")]
        public async Task<ActionResult> delete(int IDCATEGORIA)
        {

            var function = new Dcategoria();
            var modelo = new categoriaModel();
            modelo.IDCATEGORIA = IDCATEGORIA;
            function.elminarcategoria(modelo);
            return NoContent();
        }
    }

}

