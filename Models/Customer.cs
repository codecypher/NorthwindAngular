﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindAngular.Models
{
    public class Customer
    {
        public Customer()
        {
            //this.Orders = new HashSet<Order>();
        }

        public Customer ShallowCopy()
        {
            return (Customer)this.MemberwiseClone();
        }

        public string CustomerID { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }

        //public virtual ICollection<Order> Orders { get; set; }
    }
}
