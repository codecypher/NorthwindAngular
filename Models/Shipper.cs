using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindAngular.Models
{
    public class Shipper
    {
        public Shipper()
        {
            //this.Orders = new HashSet<Order>();
        }

        public int ShipperID { get; set; }
        public string CompanyName { get; set; }
        public string Phone { get; set; }

        //public virtual ICollection<Order> Orders { get; set; }
    }
}
