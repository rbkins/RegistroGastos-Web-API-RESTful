using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using gestorgastospersonalesAPI.Models;
using gestorgastospersonalesAPI.Models.DTOs;
using gestorgastospersonalesAPI.custom;
using Microsoft.AspNetCore.Authorization;
using gestorgastospersonalesAPI.connection;
using gestorgastospersonalesAPI.Data;
using Microsoft.AspNetCore.Identity;

namespace gestorgastospersonalesAPI.Controllers
{
    [Route("api/[controller]")]
    //se agrega solo en caso de inicios de sesion
    [AllowAnonymous]
    [ApiController]
    public class accesoController : ControllerBase
    {
        private readonly string _connectionstring;
        private readonly utilidades _utilidades;
        public accesoController(utilidades utilidades)
        {

            connectionBD cn = new connectionBD();
            _connectionstring = cn.getconnection();
            _utilidades = utilidades;
        }

        [HttpPost]
        [Route("registrarse")]
        public async Task<IActionResult> registrarse(usuarioDTOs modelo)
        {

        
            if (modelo == null)
            {
                System.Diagnostics.Debug.WriteLine("El modelo de usuario es nulo.");
                return BadRequest(new { isSuccess = false, message = "El modelo de usuario no puede ser nulo." });
            }

           
            if (string.IsNullOrEmpty(modelo.NOMBRE) || string.IsNullOrEmpty(modelo.EMAIL) || string.IsNullOrEmpty(modelo.PASSWORDdHASH))
            {
                System.Diagnostics.Debug.WriteLine("Uno o más campos obligatorios están vacíos.");
                return BadRequest(new { isSuccess = false, message = "Todos los campos son obligatorios." });
            }

            System.Diagnostics.Debug.WriteLine($"Nombre: {modelo.NOMBRE}");
            System.Diagnostics.Debug.WriteLine($"Email: {modelo.EMAIL}");
            System.Diagnostics.Debug.WriteLine($"Rol: {modelo.ROL}");

       
            var passwordHash = _utilidades.encriptarSHA256(modelo.PASSWORDdHASH);
            System.Diagnostics.Debug.WriteLine($"Hash de la contraseña generado: {passwordHash}");

            var modelousuario = new usuarioModel
            {
                NOMBRE = modelo.NOMBRE,
                EMAIL = modelo.EMAIL,
                PASSWORDdHASH = passwordHash,
                ROL = modelo.ROL
            };

            
            System.Diagnostics.Debug.WriteLine($"Usuario creado - Nombre: {modelousuario.NOMBRE}, Email: {modelousuario.EMAIL}, Rol: {modelousuario.ROL}");

            try
            {
                
                var function = new Dusuario();
                await function.insertarusuario(modelousuario);

                
                if (modelousuario.IDUSUARIO != 0)
                {
                    System.Diagnostics.Debug.WriteLine($"Usuario registrado correctamente - ID: {modelousuario.IDUSUARIO}");
                    return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine("No se pudo registrar el usuario.");
                    return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
                }
            }
            catch (SqlException ex)
            {
             
                System.Diagnostics.Debug.WriteLine($"Error de base de datos al registrar el usuario: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { isSuccess = false, message = "Error de base de datos." });
            }
            catch (Exception ex)
            {
                
                System.Diagnostics.Debug.WriteLine($"Error inesperado al registrar el usuario: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { isSuccess = false, message = "Error inesperado." });
            }
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(loginDTOs modelo)
        {

       
            if (User.Identity.IsAuthenticated)
            {
                System.Diagnostics.Debug.WriteLine("El usuario ya está autenticado.");
                return BadRequest(new { isSuccess = false, message = "El usuario ya está autenticado." });
            }

           
            if (string.IsNullOrEmpty(modelo.EMAIL) || string.IsNullOrEmpty(modelo.PASSWORDdHASH))
            {
                System.Diagnostics.Debug.WriteLine("El correo o la contraseña están vacíos.");
                return BadRequest(new { isSuccess = false, message = "El correo o la contraseña no pueden estar vacíos." });
            }

      
            System.Diagnostics.Debug.WriteLine($"Email proporcionado: {modelo.EMAIL}");
            System.Diagnostics.Debug.WriteLine($"Contraseña proporcionada: {modelo.PASSWORDdHASH}");

           
            var hashGenerado = _utilidades.encriptarSHA256(modelo.PASSWORDdHASH);
            System.Diagnostics.Debug.WriteLine($"Hash generado: {hashGenerado}");

            var query = "SELECT * FROM USUARIO WHERE EMAIL = @Email AND PASSWORDdHASH = @Password";

            try
            {
                using (var connection = new SqlConnection(_connectionstring))
                {
                   
                    System.Diagnostics.Debug.WriteLine($"Cadena de conexión: {_connectionstring}");

                    await connection.OpenAsync();
                    System.Diagnostics.Debug.WriteLine("Conexión a la base de datos abierta.");

                    using (var command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Email", modelo.EMAIL);
                        command.Parameters.AddWithValue("@Password", hashGenerado);

                       
                        System.Diagnostics.Debug.WriteLine($"Parámetros de la consulta - Email: {modelo.EMAIL}, PasswordHash: {hashGenerado}");

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                var usuario = new usuarioModel
                                {
                                    IDUSUARIO = reader.GetInt32(reader.GetOrdinal("IDUSUARIO")),
                                    EMAIL = reader.GetString(reader.GetOrdinal("EMAIL"))
                                };
                                System.Diagnostics.Debug.WriteLine($"Usuario encontrado - ID: {usuario.IDUSUARIO}, Email: {usuario.EMAIL}");

                                var token = _utilidades.generarJWT(usuario);
                                System.Diagnostics.Debug.WriteLine($"Token generado: {token}");
                                return Ok(new { isSuccess = true, token = token });
                            }
                            else
                            {
                                
                                System.Diagnostics.Debug.WriteLine("No se encontraron resultados en la base de datos.");
                                return Unauthorized(new { isSuccess = false, message = "Credenciales incorrectas" });
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
               
                System.Diagnostics.Debug.WriteLine($"Error de base de datos: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error de base de datos." });
            }
            catch (Exception ex)
            {
              
                System.Diagnostics.Debug.WriteLine($"Error inesperado: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Error inesperado." });
            }

        }
    } }
