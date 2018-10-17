using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindAngular.Models
{
    public class Employee
    {
        public Employee()
        {
            //this.EmployeesReportingTo = new HashSet<Employee>();
            //this.Orders = new HashSet<Order>();
            //this.Territories = new HashSet<Territory>();
        }

        public Employee ShallowCopy()
        {
            return (Employee)this.MemberwiseClone();
        }

        //[Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeID { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        //[StringLength(50, MinimumLength = 3)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        public string Title { get; set; }

        [DataType(DataType.Date)]
        public Nullable<System.DateTime> BirthDate { get; set; }

        [DataType(DataType.Date)]
        public Nullable<System.DateTime> HireDate { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string HomePhone { get; set; }
        public string Extension { get; set; }

        [DataType(DataType.MultilineText)]
        public string Notes { get; set; }

        public int? ReportsTo { get; set; }

        //[Display(Name = "Full Name")]
        //public string FullName
        //{
        //    get
        //    {
        //        return FirstName + " " + LastName;
        //    }
        //}

        //public virtual ICollection<Employee> EmployeesReportingTo { get; set; }
        //public virtual ICollection<Order> Orders { get; set; }
        //public virtual ICollection<Territory> Territories { get; set; }
        //public virtual Employee EmployeeReportsTo { get; set; }
    }
}
