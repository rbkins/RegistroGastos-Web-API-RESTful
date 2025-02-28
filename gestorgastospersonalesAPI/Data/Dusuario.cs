using gestorgastospersonalesAPI.connection;
using gestorgastospersonalesAPI.Models;
using System.Data.SqlClient;
using System.Data;

namespace gestorgastospersonalesAPI.Data
{
    public class Dusuario
    {

        connectionBD cn = new connectionBD();

        public async Task<List<usuarioModel>> Listarusuario()
        {

            var lis = new List<usuarioModel>();
            using (var sql = new SqlConnection(cn.getconnection()))
            {

                using (var cmd = new SqlCommand("SP_LISTARUSUARIO", sql))
                {

                    await sql.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {

                        while (await item.ReadAsync())
                        {

                            var modelo = new usuarioModel();
                            modelo.IDUSUARIO = (int)item["IDUSUARIO"];
                            modelo.NOMBRE = (string)item["NOMBRE"];
                            modelo.EMAIL = (string)item["EMAIL"];
                            modelo.PASSWORDdHASH = (string)item["PASSWORDdHASH"];
                            modelo.ROL = (string)item["ROL"];

                            lis.Add(modelo);
                        }

                    }

                }


            }

            return lis;

        }

        public async Task insertarusuario(usuarioModel modelo)
        {

            using (var sql = new SqlConnection(cn.getconnection()))
            {


                using (var cmd = new SqlCommand("SP_INSERTARUSUARIO", sql))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NOMBRE", modelo.NOMBRE);
                    cmd.Parameters.AddWithValue("@EMAIL", modelo.EMAIL);
                    cmd.Parameters.AddWithValue("@PASSWORDdHASH", modelo.PASSWORDdHASH);
                    cmd.Parameters.AddWithValue("@ROL", modelo.ROL);

                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }


            }


        }


        public async Task editarusuario(usuarioModel modelo)
        {

            using (var sql = new SqlConnection(cn.getconnection()))
            {

                using (var cmd = new SqlCommand("SP_EDITARUSUARIO", sql))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IDUSUARIO", modelo.IDUSUARIO);
                    cmd.Parameters.AddWithValue("@NOMBRE", modelo.NOMBRE);
                    cmd.Parameters.AddWithValue("@EMAIL", modelo.EMAIL);
                    cmd.Parameters.AddWithValue("@PASSWORDdHASH", modelo.PASSWORDdHASH);
                    cmd.Parameters.AddWithValue("@ROL", modelo.ROL);
                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();

                }

            }


        }

        public async Task eliminarusuario(usuarioModel modelo)
        {

            using (var sql = new SqlConnection(cn.getconnection()))
            {

                using (var cmd = new SqlCommand("SP_ELIMINARUSUARIO", sql))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IDUSUARIO", modelo.IDUSUARIO);

                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();

                }

            }

        }

    }

}

