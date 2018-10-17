using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using NorthwindAngular.Models;

namespace NorthwindAngular.DAL
{
    public class NorthwindContext : DbContext
    {
        // The name of the connection string is populated in Startup.cs using appsettings.json.
        public NorthwindContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Shipper> Shippers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetail>().HasKey(o => new
            {
                o.OrderID,
                o.ProductID
            });
        }
    }
}
