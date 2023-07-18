namespace APISoftnetCS.Models.ViewModels
{
    public class T_DET_USUARIO_EMPRESA
    {
        public int COD_EMPRESA { get; set; }
        public int COD_USUARIO { get; set; }
        public string VAR_CARGO { get; set; }
        public string VAR_CORREO { get; set; }
        public int INT_ESTADO { get; set; }
        public string VAR_NOM_IMAGEN { get; set; }
        public int INT_FLG_ELIMINADO { get; set; }
        public DateTime FEC_REGISTRO { get; set; }
        public DateTime FEC_MODIFICACION { get; set; }

    }
}
