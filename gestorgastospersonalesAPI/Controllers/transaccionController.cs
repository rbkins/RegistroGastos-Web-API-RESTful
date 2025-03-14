using System.Security.Claims;
using gestorgastospersonalesAPI.Data;
using gestorgastospersonalesAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gestorgastospersonalesAPI.Controllers
{
    [Route("api/transaccion")]
    [Authorize]
    [ApiController]
    public class transaccionController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<transaccionModel>>> get() {

            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var function = new Dtransaccion();
            var listar = await function.ListarTransaccion(idUsuario);
            return listar;
        }

        [HttpPut("{IDTRANS}")]
        public async Task<ActionResult> Put(int IDTRANS, [FromBody] transaccionModel modelo) { 
        
            var function = new Dtransaccion();
            modelo.IDTRANS = IDTRANS;
            await function.editartransaccion(modelo);
            return NoContent();
        
        }

        [HttpPost]
        public async Task Post([FromBody] transaccionModelDTO parametros)
        {
            var idUsuario = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            parametros.IDUSUARIO = idUsuario;
            var function = new Dtransaccion();
            await function.insertartransaccion(parametros);

        }

        [HttpDelete("{IDTRANS}")]
        public async Task<ActionResult> delete(int IDTRANS) {

            var function = new Dtransaccion();
            var modelo = new transaccionModel();
            modelo.IDTRANS = IDTRANS;
            function.elminartransaccion(modelo);
            return NoContent();
        }
    }
}
