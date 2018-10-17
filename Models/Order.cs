using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindAngular.Models
{
    public class Order
    {
        public Order()
        {
            this.OrderDetails = new HashSet<OrderDetail>();
        }

        public int OrderID { get; set; }
        public string CustomerID { get; set; }

        public Nullable<int> EmployeeID { get; set; }

        public Nullable<DateTime> OrderDate { get; set; }
        public Nullable<DateTime> RequiredDate { get; set; }
        public Nullable<DateTime> ShippedDate { get; set; }

        [ForeignKey("Shipper")]
        public Nullable<int> ShipVia { get; set; }

        public Nullable<decimal> Freight { get; set; }
        public string ShipName { get; set; }
        public string ShipAddress { get; set; }
        public string ShipCity { get; set; }
        public string ShipRegion { get; set; }
        public string ShipPostalCode { get; set; }
        public string ShipCountry { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        //public virtual Customer Customer { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual Shipper Shipper { get; set; }
    }
}
