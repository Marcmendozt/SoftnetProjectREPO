using System.ComponentModel.DataAnnotations;

namespace APISoftnetCS.Models
{
    public class CMAE_USUARIOS
    {
        [Key]
        public int COD_USUARIO { get; set; }
        [Required]
        public string TI_DOCUMENTO { get; set; }
        [Required]
        public string VAR_DOC_IDENTIDAD { get; set; }
        [Required]
        public string VAR_APELLIDOS { get; set; }
        [Required]
        public string VAR_NOMBRES { get; set; }
        [Required]
        public string VAR_PASSWORD { get; set; }
        [Required]
        public string VAR_NUM_TELEFONO { get; set; }
        [Required]
        public int INT_FLG_ELIMINADO { get; set; }
        [Required]
        public DateTime FEC_REGISTRO { get; set; }
        [Required]
        public DateTime FEC_MODIFICACION { get; set; }


    }
}
