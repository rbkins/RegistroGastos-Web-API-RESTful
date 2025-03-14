using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata;
using gestorgastospersonalesAPI.connection;
using gestorgastospersonalesAPI.Models;


namespace gestorgastospersonalesAPI.Data
{
    public class Dtransaccion
    {

        connectionBD cn = new connectionBD();

        public async Task<List<transaccionModel>> ListarTransaccion(int idUsuario) { 
        
            var lis = new List<transaccionModel>();
            using (var sql = new SqlConnection(cn.getconnection())) {

                using (var cmd = new SqlCommand("SP_LISTARTRANSACCION2", sql)) { 
                
                    await sql.OpenAsync();
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IDUSUARIO", idUsuario);
                    using (var item = await cmd.ExecuteReaderAsync()) {

                        while (await item.ReadAsync()) { 
                        
                            var modelo = new transaccionModel();
                            modelo.IDTRANS = (int)item["IDTRANS"];
                            modelo.NOMBRE_USUARIO = (string)item["NOMBRE_USUARIO"];
                            modelo.NOMBRE_CATEGORIA = (string)item["NOMBRE_CATEGORIA"];
                            modelo.DESCRIPCION = (string)item["DESCRIPCION"];
                            modelo.FECHA = (DateTime)item["FECHA"];
                            modelo.MONTO = (decimal)item["MONTO"];
                            modelo.IDUSUARIO = (int)item["IDUSUARIO"];
                            modelo.IDCATEGORIA = (int)item["IDCATEGORIA"];
                            lis.Add(modelo);
                        }
                    
                    }
                
                }
            
            
            }
        
            return lis;
        
        }

        public async Task insertartransaccion(transaccionModelDTO modelo) {

            using (var sql = new SqlConnection(cn.getconnection())) {


                using (var cmd = new SqlCommand("SP_INSERTARTRANSACCION", sql)) { 
                
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@MONTO", modelo.MONTO);
                    cmd.Parameters.AddWithValue("@DESCRIPCION", modelo.DESCRIPCION);
                    cmd.Parameters.AddWithValue("@IDUSUARIO", modelo.IDUSUARIO);
                    cmd.Parameters.AddWithValue("@IDCATEGORIA", modelo.IDCATEGORIA);
                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();
                }
            
            
            }
        
        
        }


        public async Task editartransaccion(transaccionModel modelo) {

            using (var sql = new SqlConnection(cn.getconnection())) {

                using (var cmd = new SqlCommand("SP_EDITARTRANSACCION", sql)) {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IDTRANS", modelo.IDTRANS);
                    cmd.Parameters.AddWithValue("@MONTO", modelo.MONTO);
                    cmd.Parameters.AddWithValue("@DESCRIPCION", modelo.DESCRIPCION);
                    cmd.Parameters.AddWithValue("@IDUSUARIO", modelo.IDUSUARIO);
                    cmd.Parameters.AddWithValue("@IDCATEGORIA", modelo.IDCATEGORIA);
                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();

                }
            
            }
        
        
        }

        public async Task elminartransaccion(transaccionModel modelo) {

            using (var sql = new SqlConnection(cn.getconnection())) {

                using (var cmd = new SqlCommand("SP_ELIMINARTRANSACCION", sql)) {

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IDTRANS", modelo.IDTRANS);

                    await sql.OpenAsync();
                    await cmd.ExecuteReaderAsync();

                }
            
            }
        
        }
    }
}
