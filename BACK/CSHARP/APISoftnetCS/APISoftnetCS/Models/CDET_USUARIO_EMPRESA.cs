using System.ComponentModel.DataAnnotations;

namespace APISoftnetCS.Models
{
    public class CDET_USUARIO_EMPRESA
    {
        [Key]
        public int COD_EMPRESA { get; set; }

        [Required]
        public int COD_USUARIO { get; set; }
        [Required]
        public string VAR_CARGO { get; set; }
        [Required]
        public string VAR_CORREO { get; set; }
        [Required]
        public int INT_ESTADO { get; set; }
        [Required]
        public string VAR_NOM_IMAGEN { get; set; }
        [Required]
        public int INT_FLG_ELIMINADO { get; set; }
        [Required]
        public DateTime FEC_REGISTRO { get; set; }
        [Required]
        public DateTime FEC_MODIFICACION { get; set; }
    }
}
