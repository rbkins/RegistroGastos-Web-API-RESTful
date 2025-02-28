using gestorgastospersonalesAPI.Data;
using gestorgastospersonalesAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestorgastospersonalesAPI.Controllers
{
    [Route("api/usuario")]
    [Authorize]
    [ApiController]
    public class usuarioController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<usuarioModel>>> get()
        {

            var function = new Dusuario();
            var listar = await function.Listarusuario();
            return listar;
        }

        [HttpPut("{IDUSUARIO}")]
        public async Task<ActionResult> Put(int IDUSUARIO, [FromBody] usuarioModel modelo)
        {

            var function = new Dusuario();
            modelo.IDUSUARIO = IDUSUARIO;
            await function.editarusuario(modelo);
            return NoContent();

        }

        [HttpPost]
        public async Task Post([FromBody] usuarioModel parametros)
        {

            var function = new Dusuario();
            await function.insertarusuario(parametros);

        }

        [HttpDelete("{IDUSUARIO}")]
        public async Task<ActionResult> delete(int IDUSUARIO)
        {

            var function = new Dusuario();
            var modelo = new usuarioModel();
            modelo.IDUSUARIO = IDUSUARIO;
            function.eliminarusuario(modelo);
            return NoContent();
        }
    }
}

