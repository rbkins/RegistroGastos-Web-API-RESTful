using gestorgastospersonalesAPI.connection;
using gestorgastospersonalesAPI.Models;
using System.Data.SqlClient;
using System.Data;

namespace gestorgastospersonalesAPI.Data
{
    public class Dcategoria
    {

        connectionBD cn = new connectionBD();

        public async Task<List<categoriaModel>> Listarcategoria()
        {

            var lis = new List<categoriaModel>();
            using (var sql = new SqlConnection(cn.getconnection()))
            {

                using (var cmd = new SqlCommand("SP_LISTARCATEGORIA", sql))
                {

                    await sql.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (var item = await cmd.ExecuteReaderAsync())
                    {

                        while (await item.ReadAsync())
                        {

                            var modelo = new categoriaModel();
                            modelo.IDCATEGORIA = (int)item["IDCATEGORIA"];
                            modelo.NOMBRE = (string)item["NOMBRE"];
                            modelo.TIPO = (string)item["TIPO"];
                            
                            lis.Add(modelo);
                        }

                    }

                }


            }

            return lis;

        }

        public async Task insertarcategoria(categoriaModel modelo)
        {

            using (var sql = new SqlConnection(cn.getconnection()))
            {


                using (var cmd = new SqlCommand("SP_INSERTARCATEGORIA", sql))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NOMBRE", modelo.NOMBRE);
                    cmd.Parameters.AddWithValue("@TIPO", modelo.TIPO);
                    
                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }


            }


        }


        public async Task editarcategoria(categoriaModel modelo)
        {

            using (var sql = new SqlConnection(cn.getconnection()))
            {

                using (var cmd = new SqlCommand("SP_EDITARCATEGORIA", sql))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IDCATEGORIA", modelo.IDCATEGORIA);
                    cmd.Parameters.AddWithValue("@NOMBRE", modelo.NOMBRE);
                    cmd.Parameters.AddWithValue("@TIPO", modelo.TIPO);
                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();

                }

            }


        }

        public async Task elminarcategoria(categoriaModel modelo)
        {

            using (var sql = new SqlConnection(cn.getconnection()))
            {

                using (var cmd = new SqlCommand("SP_ELIMINARCATEGORIA", sql))
                {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IDCATEGORIA", modelo.IDCATEGORIA);

                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();

                }

            }

        }

    }
}
