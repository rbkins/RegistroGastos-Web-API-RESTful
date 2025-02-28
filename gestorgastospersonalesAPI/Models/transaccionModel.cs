using Microsoft.AspNetCore.SignalR;

namespace gestorgastospersonalesAPI.Models
{
    public class transaccionModel
    {
        public int IDTRANS { get; set; }
        public decimal MONTO { get; set; }
        public string DESCRIPCION { get; set; }
        public DateTime FECHA { get; set; }
        public int IDUSUARIO { get; set; }
        public int IDCATEGORIA { get; set; }

        //realizados en consulta
        public string NOMBRE_USUARIO { get; set; }
        public string NOMBRE_CATEGORIA { get; set; }

    }
}
