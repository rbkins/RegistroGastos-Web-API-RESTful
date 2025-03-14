namespace gestorgastospersonalesAPI.Models
{
    public class transaccionModelDTO
    {
        public int IDTRANS { get; set; }
        public decimal MONTO { get; set; }
        public string DESCRIPCION { get; set; }
        public int IDUSUARIO { get; set; }
        public int IDCATEGORIA { get; set; }

    }
}
