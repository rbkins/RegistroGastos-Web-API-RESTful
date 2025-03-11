using gestorgastospersonalesAPI.Data;
using gestorgastospersonalesAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestorgastospersonalesAPI.Controllers
{
    [Route("api/categoria")]
    
    [ApiController]
    public class categoriaController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<categoriaModel>>> get()
        {

            var function = new Dcategoria();
            var listar = await function.Listarcategoria();
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

