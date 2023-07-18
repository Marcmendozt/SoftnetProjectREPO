using System;

namespace APISoftnetCS.Models.ViewModels
{
    public class T_MAE_USUARIOS
    {
        public int COD_USUARIO { get; set; }
        public string TI_DOCUMENTO { get; set; }
        public string VAR_DOC_IDENTIDAD { get; set; }
        public string VAR_APELLIDOS { get; set; }
        public string VAR_NOMBRES { get; set; }
        public string VAR_PASSWORD { get; set; }
        public string VAR_NUM_TELEFONO { get; set; }
        public int INT_FLG_ELIMINADO { get; set; }
        public DateTime FEC_REGISTRO { get; set; }
        public DateTime FEC_MODIFICACION { get; set; }



    }
}
