using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using gestorgastospersonalesAPI.Models;

namespace gestorgastospersonalesAPI.custom
{
    public class utilidades
    {
        private readonly IConfiguration _configuration;
        public utilidades(IConfiguration configuration)
        {

            _configuration = configuration;

        }

        //metodo encriptar
        public string encriptarSHA256(string texto)
        {

            using (SHA256 sHA256 = SHA256.Create())
            {

                //computar el hash
                byte[] bytes = sHA256.ComputeHash(Encoding.UTF8.GetBytes(texto));
                //convertir array de bytes a string
                StringBuilder builder1 = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder1.Append(bytes[i].ToString("x2"));
                }
                return builder1.ToString();
            }

        }

        //generar Json Web Token

        public string generarJWT(usuarioModel usuariomodelo)
        {
            if (usuariomodelo == null || string.IsNullOrEmpty(usuariomodelo.EMAIL))
            {
                throw new ArgumentException("El modelo de usuario o el correo electrónico no pueden ser nulos.");
            }

            var userClaims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, usuariomodelo.IDUSUARIO.ToString()),
        new Claim(ClaimTypes.Email, usuariomodelo.EMAIL)
    };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var expiration = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("JWT:expirationInMinutes", 10));


            var token = new JwtSecurityToken(
                claims: userClaims,
                expires: expiration,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);


        }
    }
    }
